(function () {
  'use strict';

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

  function initCountUp() {
    var counters = document.querySelectorAll('.count-up');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCount(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCount(el, target) {
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  function initMobileMenu() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      menu.classList.toggle('hidden');
    });

    var links = menu.querySelectorAll('.mobile-nav-link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.add('hidden');
      });
    });
  }

  function initViewToggle() {
    var btns = document.querySelectorAll('.view-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) {
          b.classList.remove('active-view');
          b.classList.add('text-slate-500');
        });
        btn.classList.add('active-view');
        btn.classList.remove('text-slate-500');

        var view = btn.getAttribute('data-view');
        if (GraphView) GraphView.setView(view);
      });
    });
  }

  function initDomainToggle() {
    var btns = document.querySelectorAll('.domain-toggle');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var domain = btn.getAttribute('data-domain');
        btn.classList.toggle('active-domain');

        if (GraphView) GraphView.toggleDomain(domain);
      });
    });
  }

  function initSearch() {
    var input = document.getElementById('graph-search');
    if (!input) return;

    var debounceTimer;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        if (GraphView) GraphView.search(input.value.trim());
      }, 250);
    });
  }

  function initZoomControls() {
    var zoomIn = document.getElementById('zoom-in');
    var zoomOut = document.getElementById('zoom-out');
    var zoomReset = document.getElementById('zoom-reset');

    if (zoomIn) zoomIn.addEventListener('click', function () { if (GraphView) GraphView.zoomIn(); });
    if (zoomOut) zoomOut.addEventListener('click', function () { if (GraphView) GraphView.zoomOut(); });
    if (zoomReset) zoomReset.addEventListener('click', function () { if (GraphView) GraphView.zoomReset(); });
  }

  function initModuleTabs() {
    var tabs = document.querySelectorAll('.domain-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('active-tab');
          t.className = t.className.replace(/bg-\S+/g, 'bg-white').replace(/text-white/g, 'text-slate-600').replace(/shadow-\S+/g, '');
          if (!t.classList.contains('border')) t.classList.add('border', 'border-slate-200');
        });

        var domain = tab.getAttribute('data-tab');
        var color = domainColors[domain] || '#6366F1';
        tab.classList.add('active-tab');
        tab.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
        tab.style.backgroundColor = color;
        tab.style.color = 'white';
        tab.style.boxShadow = '0 4px 14px ' + color + '33';

        tabs.forEach(function (t) {
          if (t !== tab) {
            t.style.backgroundColor = '';
            t.style.color = '';
            t.style.boxShadow = '';
          }
        });

        renderModuleCards(domain);
      });
    });
  }

  function renderModuleCards(domainId) {
    var grid = document.getElementById('modules-grid');
    if (!grid) return;

    var data = window.SKILLS_DATA;
    if (!data) return;

    var domain = data.domains.find(function (d) { return d.id === domainId; });
    if (!domain) return;

    var color = domainColors[domainId] || '#94a3b8';
    var html = '';

    if (domain.modules && domain.modules.length > 0) {
      domain.modules.forEach(function (mod) {
        html += '<div class="module-card fade-in-up" data-domain="' + domainId + '">';
        html += '<div class="pl-3">';
        html += '<h3 class="font-sora font-bold text-base text-slate-900 mb-1">' + mod.name + '</h3>';
        html += '<p class="text-sm text-slate-500 mb-4">' + mod.description + '</p>';

        if (mod.orchestrators && mod.orchestrators.length > 0) {
          html += '<div class="mb-3">';
          html += '<div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">编排器</div>';
          html += '<div class="flex flex-wrap gap-1.5">';
          mod.orchestrators.forEach(function (orch) {
            html += '<span class="orchestrator-tag" style="color:' + color + ';border-color:' + color + '40;background:' + color + '08">';
            html += '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
            html += orch.name + '</span>';
          });
          html += '</div>';
          html += '</div>';
        }

        if (mod.skills && mod.skills.length > 0) {
          html += '<div>';
          html += '<div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Skill (' + mod.skills.length + ')</div>';
          html += '<div class="flex flex-wrap gap-1.5">';
          mod.skills.forEach(function (skill) {
            html += '<span class="skill-tag" style="color:' + color + ';background:' + color + '10;border:1px solid ' + color + '20">';
            html += skill.name + '</span>';
          });
          html += '</div>';
          html += '</div>';
        }

        html += '</div>';
        html += '</div>';
      });
    }

    if (domain.orchestrators && domain.orchestrators.length > 0) {
      domain.orchestrators.forEach(function (orch) {
        html += '<div class="module-card fade-in-up" data-domain="' + domainId + '">';
        html += '<div class="pl-3">';
        html += '<h3 class="font-sora font-bold text-base text-slate-900 mb-1">' + orch.name + '</h3>';
        html += '<p class="text-sm text-slate-500 mb-4">' + orch.description + '</p>';

        if (orch.children && orch.children.length > 0) {
          html += '<div>';
          html += '<div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">调度编排器 (' + orch.children.length + ')</div>';
          html += '<div class="flex flex-wrap gap-1.5">';
          orch.children.forEach(function (childId) {
            var childName = childId.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
            html += '<span class="skill-tag" style="color:' + color + ';background:' + color + '10;border:1px solid ' + color + '20">';
            html += childName + '</span>';
          });
          html += '</div>';
          html += '</div>';
        }

        html += '</div>';
        html += '</div>';
      });
    }

    grid.innerHTML = html;
  }

  function initSmoothScroll() {
    var navOffset = 80;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      });
    });
  }

  function initResize() {
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (GraphView) GraphView.resize();
        if (SankeyView) SankeyView.resize();
      }, 250);
    });
  }

  function initNavScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.03)';
      }
      lastScroll = currentScroll;
    });
  }

  function initIntersectionObserver() {
    var sections = document.querySelectorAll('section[id]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav-link').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('text-primary', 'bg-primary/5');
              link.classList.remove('text-slate-600');
            } else {
              link.classList.remove('text-primary', 'bg-primary/5');
              link.classList.add('text-slate-600');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function init() {
    lucide.createIcons();

    DetailPanel.init();

    GraphView.init('graph-svg', {
      onNodeClick: function (node, clickX, clickY) {
        DetailPanel.open(node, clickX, clickY);
      }
    });

    SankeyView.init('sankey-svg');

    renderModuleCards('pm');

    initCountUp();
    initMobileMenu();
    initViewToggle();
    initDomainToggle();
    initSearch();
    initZoomControls();
    initModuleTabs();
    initSmoothScroll();
    initResize();
    initNavScroll();
    initIntersectionObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
