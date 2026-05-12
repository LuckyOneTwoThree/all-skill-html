var DetailPanel = (function () {
  var modal, panel, titleEl, contentEl, backdrop;
  var isOpen = false;

  var domainColors = {
    pm: '#6366F1',
    ui: '#8B5CF6',
    backend: '#0EA5E9',
    cross: '#F59E0B'
  };

  var domainNames = {
    pm: '产品方法论',
    ui: 'UI设计与前端',
    backend: '后端架构',
    cross: '跨领域协调'
  };

  var typeLabels = {
    domain: '领域',
    module: '模块',
    orchestrator: '编排器',
    pipeline: '流水线',
    guide: '导航'
  };

  function init() {
    modal = document.getElementById('detail-modal');
    panel = document.getElementById('detail-panel');
    backdrop = document.getElementById('detail-backdrop');
    titleEl = document.getElementById('detail-title');
    contentEl = document.getElementById('detail-content');

    var closeBtn = document.getElementById('detail-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    if (backdrop) {
      backdrop.addEventListener('click', close);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    });
  }

  function open(node, clickX, clickY) {
    if (!modal || !panel || !titleEl || !contentEl) return;

    titleEl.textContent = node.name;
    var color = domainColors[node.domain] || '#94a3b8';
    var domainName = domainNames[node.domain] || node.domain;
    var typeLabel = typeLabels[node.type] || node.type;

    var html = '';

    html += '<div class="flex flex-col gap-4">';

    html += '<div class="flex items-center gap-2 flex-wrap">';
    html += '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style="background:' + color + '">';
    html += '<span class="w-1.5 h-1.5 rounded-full bg-white/60"></span>' + domainName;
    html += '</span>';
    html += '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">' + typeLabel + '</span>';
    html += '</div>';

    if (node.description) {
      html += '<div class="p-3 rounded-xl bg-slate-50/80 border border-slate-100">';
      html += '<p class="text-sm text-slate-600 leading-relaxed">' + node.description + '</p>';
      html += '</div>';
    }

    if (node.brief) {
      html += '<div>';
      html += '<h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">简介</h4>';
      html += '<p class="text-sm text-slate-700">' + node.brief + '</p>';
      html += '</div>';
    }

    if (node.type === 'domain') {
      var domain = findDomainById(node.id);
      if (domain) {
        var stats = getDomainStats(domain);
        html += '<div class="grid grid-cols-4 gap-2">';
        html += '<div class="p-2 rounded-xl bg-slate-50/80 text-center">';
        html += '<div class="font-sora font-bold text-base" style="color:' + color + '">' + stats.modules + '</div>';
        html += '<div class="text-xs text-slate-500">模块</div>';
        html += '</div>';
        html += '<div class="p-2 rounded-xl bg-slate-50/80 text-center">';
        html += '<div class="font-sora font-bold text-base" style="color:' + color + '">' + stats.orchestrators + '</div>';
        html += '<div class="text-xs text-slate-500">编排器</div>';
        html += '</div>';
        html += '<div class="p-2 rounded-xl bg-slate-50/80 text-center">';
        html += '<div class="font-sora font-bold text-base" style="color:' + color + '">' + stats.skills + '</div>';
        html += '<div class="text-xs text-slate-500">Skill</div>';
        html += '</div>';
        html += '<div class="p-2 rounded-xl bg-slate-50/80 text-center">';
        html += '<div class="font-sora font-bold text-base" style="color:' + color + '">' + stats.total + '</div>';
        html += '<div class="text-xs text-slate-500">总计</div>';
        html += '</div>';
        html += '</div>';
      }
    }

    if (node.input && node.input.length > 0) {
      html += '<div>';
      html += '<h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">输入</h4>';
      html += '<div class="flex flex-wrap gap-1.5">';
      node.input.forEach(function (inp) {
        html += '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">';
        html += '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
        html += inp + '</span>';
      });
      html += '</div>';
      html += '</div>';
    }

    if (node.output && node.output.length > 0) {
      html += '<div>';
      html += '<h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">输出</h4>';
      html += '<div class="flex flex-wrap gap-1.5">';
      node.output.forEach(function (out) {
        html += '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">';
        html += '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';
        html += out + '</span>';
      });
      html += '</div>';
      html += '</div>';
    }

    if (node.children && node.children.length > 0) {
      html += '<div>';
      html += '<h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">调度 Skill (' + node.children.length + ')</h4>';
      html += '<div class="flex flex-wrap gap-1.5">';
      node.children.forEach(function (childId) {
        var childSkill = findSkillById(childId);
        var childColor = childSkill ? domainColors[childSkill.domain] || '#94a3b8' : '#94a3b8';
        var childName = childSkill ? childSkill.name : childId;
        html += '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer hover:opacity-80" style="background:' + childColor + '10;color:' + childColor + ';border:1px solid ' + childColor + '25" data-skill-id="' + childId + '">';
        html += '<span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:' + childColor + '"></span>';
        html += childName + '</span>';
      });
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';

    contentEl.innerHTML = html;
    panel.scrollTop = 0;

    panel.style.setProperty('--card-accent', color);

    positionPanel(clickX, clickY);

    modal.classList.add('detail-modal-open');
    modal.setAttribute('aria-hidden', 'false');

    isOpen = true;
  }

  function positionPanel(clickX, clickY) {
    if (!panel) return;

    var svg = document.getElementById('graph-svg');
    var svgRect = svg ? svg.getBoundingClientRect() : { left: 0, top: 0 };

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var cardW = 420;
    var cardH = Math.min(panel.scrollHeight || 400, vh * 0.7);
    var gap = 20;

    var mouseX = svgRect.left + clickX;
    var mouseY = svgRect.top + clickY;

    var left = mouseX + gap;
    var top = mouseY - cardH / 2;

    if (left + cardW > vw - 16) {
      left = mouseX - cardW - gap;
    }
    if (left < 16) {
      left = 16;
    }
    if (top < 16) {
      top = 16;
    }
    if (top + cardH > vh - 16) {
      top = vh - cardH - 16;
    }

    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
  }

  function close() {
    if (!modal) return;

    modal.classList.remove('detail-modal-open');
    modal.setAttribute('aria-hidden', 'true');

    isOpen = false;
  }

  function findSkillById(skillId) {
    var data = window.SKILLS_DATA;
    if (!data) return null;
    for (var i = 0; i < data.domains.length; i++) {
      var domain = data.domains[i];
      if (domain.modules) {
        for (var j = 0; j < domain.modules.length; j++) {
          var mod = domain.modules[j];
          if (mod.orchestrators) {
            for (var k = 0; k < mod.orchestrators.length; k++) {
              if (mod.orchestrators[k].id === skillId) {
                return { name: mod.orchestrators[k].name, domain: domain.id };
              }
            }
          }
          if (mod.skills) {
            for (var k = 0; k < mod.skills.length; k++) {
              if (mod.skills[k].id === skillId) {
                return { name: mod.skills[k].name, domain: domain.id };
              }
            }
          }
        }
      }
      if (domain.orchestrators) {
        for (var j = 0; j < domain.orchestrators.length; j++) {
          if (domain.orchestrators[j].id === skillId) {
            return { name: domain.orchestrators[j].name, domain: domain.id };
          }
        }
      }
    }
    return null;
  }

  function findDomainById(domainId) {
    var data = window.SKILLS_DATA;
    if (!data) return null;
    return data.domains.find(function (d) { return d.id === domainId; });
  }

  function getDomainStats(domain) {
    var modules = 0, orchestrators = 0, skills = 0;
    if (domain.modules) {
      modules = domain.modules.length;
      domain.modules.forEach(function (mod) {
        if (mod.orchestrators) orchestrators += mod.orchestrators.length;
        if (mod.skills) skills += mod.skills.length;
      });
    }
    if (domain.orchestrators) {
      orchestrators += domain.orchestrators.length;
    }
    return { modules: modules, orchestrators: orchestrators, skills: skills, total: modules + orchestrators + skills };
  }

  return {
    init: init,
    open: open,
    close: close
  };
})();
