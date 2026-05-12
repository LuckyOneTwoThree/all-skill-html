var GraphView = (function () {
  var svg, g, simulation, zoom, width, height;
  var nodes = [], links = [];
  var currentView = 'full';
  var activeDomains = new Set(['pm', 'ui', 'backend', 'cross']);
  var onNodeClick = null;
  var nodeMap = {};
  var animFrameId = null;
  var particleGroup = null;
  var contractPaths = [];

  var domainColors = {
    pm: '#6366F1',
    ui: '#8B5CF6',
    backend: '#0EA5E9',
    cross: '#F59E0B'
  };

  var domainLightColors = {
    pm: '#EEF2FF',
    ui: '#F5F3FF',
    backend: '#F0F9FF',
    cross: '#FFFBEB'
  };

  function init(container, options) {
    if (options && options.onNodeClick) onNodeClick = options.onNodeClick;

    var el = document.getElementById(container);
    width = el.clientWidth;
    height = el.clientHeight;

    svg = d3.select('#' + container);
    svg.selectAll('*').remove();

    svg.attr('viewBox', [0, 0, width, height]);

    var defs = svg.append('defs');

    Object.keys(domainColors).forEach(function (domain) {
      var grad = defs.append('radialGradient')
        .attr('id', 'grad-' + domain)
        .attr('cx', '35%').attr('cy', '35%').attr('r', '65%');
      grad.append('stop').attr('offset', '0%').attr('stop-color', lightenColor(domainColors[domain], 30)).attr('stop-opacity', 1);
      grad.append('stop').attr('offset', '100%').attr('stop-color', domainColors[domain]).attr('stop-opacity', 0.85);

      var shadowGrad = defs.append('radialGradient')
        .attr('id', 'shadow-' + domain)
        .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
      shadowGrad.append('stop').attr('offset', '0%').attr('stop-color', domainColors[domain]).attr('stop-opacity', 0.25);
      shadowGrad.append('stop').attr('offset', '100%').attr('stop-color', domainColors[domain]).attr('stop-opacity', 0);
    });

    defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    var glowFilter = d3.select('#glow');
    glowFilter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    glowFilter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

    defs.append('filter').attr('id', 'soft-shadow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    var shadowFilter = d3.select('#soft-shadow');
    shadowFilter.append('feDropShadow').attr('dx', '0').attr('dy', '2').attr('stdDeviation', '4').attr('flood-color', '#000').attr('flood-opacity', '0.08');

    zoom = d3.zoom()
      .scaleExtent([0.3, 4])
      .on('zoom', function (event) {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    g = svg.append('g');

    buildData();
    render();

    var loading = document.getElementById('graph-loading');
    if (loading) loading.style.display = 'none';
  }

  function lightenColor(hex, percent) {
    var num = parseInt(hex.replace('#', ''), 16);
    var r = Math.min(255, (num >> 16) + Math.round(255 * percent / 100));
    var g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100));
    var b = Math.min(255, (num & 0x0000FF) + Math.round(255 * percent / 100));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  }

  function buildData() {
    nodes = [];
    links = [];
    nodeMap = {};

    var data = window.SKILLS_DATA;
    if (!data) return;

    data.domains.forEach(function (domain) {
      if (domain.id === 'cross') {
        if (domain.orchestrators) {
          domain.orchestrators.forEach(function (orch) {
            nodeMap[orch.id] = {
              id: orch.id,
              name: orch.name,
              type: 'orchestrator',
              domain: 'cross',
              description: orch.description,
              children: orch.children
            };
            nodes.push(nodeMap[orch.id]);
          });
        }
        return;
      }

      nodeMap[domain.id] = {
        id: domain.id,
        name: domain.name,
        type: 'domain',
        domain: domain.id,
        color: domain.color,
        tagline: domain.tagline
      };
      nodes.push(nodeMap[domain.id]);

      if (domain.modules) {
        domain.modules.forEach(function (mod) {
          var modId = mod.id;
          nodeMap[modId] = {
            id: modId,
            name: mod.name,
            type: 'module',
            domain: domain.id,
            description: mod.description
          };
          nodes.push(nodeMap[modId]);

          links.push({
            source: domain.id,
            target: modId,
            type: 'domain-module',
            domain: domain.id
          });

          if (mod.orchestrators) {
            mod.orchestrators.forEach(function (orch) {
              nodeMap[orch.id] = {
                id: orch.id,
                name: orch.name,
                type: 'orchestrator',
                domain: domain.id,
                description: orch.description,
                children: orch.children,
                moduleId: modId
              };
              nodes.push(nodeMap[orch.id]);

              links.push({
                source: modId,
                target: orch.id,
                type: 'module-orchestrator',
                domain: domain.id
              });
            });
          }

          if (mod.skills) {
            mod.skills.forEach(function (skill) {
              nodeMap[skill.id] = {
                id: skill.id,
                name: skill.name,
                type: skill.type || 'pipeline',
                domain: domain.id,
                brief: skill.brief,
                input: skill.input,
                output: skill.output,
                moduleId: modId
              };
              nodes.push(nodeMap[skill.id]);

              links.push({
                source: modId,
                target: skill.id,
                type: 'module-skill',
                domain: domain.id
              });
            });
          }
        });
      }
    });

    if (data.contracts) {
      data.contracts.forEach(function (contract) {
        if (nodeMap[contract.from] && nodeMap[contract.to]) {
          links.push({
            source: contract.from,
            target: contract.to,
            type: 'contract',
            name: contract.name,
            description: contract.description,
            fromDomain: contract.fromDomain,
            toDomain: contract.toDomain
          });
        }
      });
    }

    if (data.domains) {
      var crossDomain = data.domains.find(function (d) { return d.id === 'cross'; });
      if (crossDomain && crossDomain.orchestrators) {
        crossDomain.orchestrators.forEach(function (orch) {
          if (orch.children) {
            orch.children.forEach(function (childId) {
              if (nodeMap[childId]) {
                links.push({
                  source: orch.id,
                  target: childId,
                  type: 'cross-orchestration',
                  domain: 'cross'
                });
              }
            });
          }
        });
      }
    }
  }

  function getVisibleData() {
    var filteredNodes, filteredLinks;

    if (currentView === 'domain') {
      filteredNodes = nodes.filter(function (n) {
        return n.type === 'domain';
      });
      filteredLinks = links.filter(function (l) {
        var sType = typeof l.source === 'object' ? l.source.type : (nodeMap[l.source] ? nodeMap[l.source].type : '');
        var tType = typeof l.target === 'object' ? l.target.type : (nodeMap[l.target] ? nodeMap[l.target].type : '');
        return sType === 'domain' && tType === 'domain';
      });
    } else if (currentView === 'module') {
      filteredNodes = nodes.filter(function (n) {
        return n.type === 'domain' || n.type === 'module' || n.type === 'orchestrator';
      });
      filteredLinks = links.filter(function (l) {
        var sId = typeof l.source === 'object' ? l.source.id : l.source;
        var tId = typeof l.target === 'object' ? l.target.id : l.target;
        var sNode = filteredNodes.find(function (n) { return n.id === sId; });
        var tNode = filteredNodes.find(function (n) { return n.id === tId; });
        return sNode && tNode;
      });
    } else {
      filteredNodes = nodes.slice();
      filteredLinks = links.slice();
    }

    filteredNodes = filteredNodes.filter(function (n) {
      return activeDomains.has(n.domain);
    });

    var nodeIds = new Set(filteredNodes.map(function (n) { return n.id; }));
    filteredLinks = filteredLinks.filter(function (l) {
      var sId = typeof l.source === 'object' ? l.source.id : l.source;
      var tId = typeof l.target === 'object' ? l.target.id : l.target;
      return nodeIds.has(sId) && nodeIds.has(tId);
    });

    return { nodes: filteredNodes, links: filteredLinks };
  }

  function getNodeRadius(node) {
    if (node.type === 'domain') return 36;
    if (node.type === 'module') return 20;
    if (node.type === 'orchestrator') return 13;
    return 6;
  }

  function getNodeColor(node) {
    return domainColors[node.domain] || '#94a3b8';
  }

  function render() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    g.selectAll('*').remove();
    contractPaths = [];

    var visible = getVisibleData();

    var linkGroup = g.append('g').attr('class', 'links');
    particleGroup = g.append('g').attr('class', 'particles');
    var nodeGroup = g.append('g').attr('class', 'nodes');

    var contractLinks = visible.links.filter(function (l) { return l.type === 'contract'; });
    var regularLinks = visible.links.filter(function (l) { return l.type !== 'contract'; });

    var linkElements = linkGroup.selectAll('.link-line')
      .data(regularLinks)
      .join('line')
      .attr('class', 'link-line')
      .attr('stroke', function (d) {
        return domainColors[d.domain] || '#94a3b8';
      })
      .attr('stroke-width', function (d) {
        if (d.type === 'domain-module') return 1.5;
        if (d.type === 'module-orchestrator') return 1.2;
        return 0.6;
      })
      .attr('stroke-opacity', function (d) {
        if (d.type === 'domain-module') return 0.2;
        if (d.type === 'module-orchestrator') return 0.25;
        if (d.type === 'cross-orchestration') return 0.15;
        return 0.1;
      });

    var contractPathElements = linkGroup.selectAll('.contract-path')
      .data(contractLinks)
      .join('path')
      .attr('class', 'contract-path')
      .attr('fill', 'none')
      .attr('stroke', function (d) {
        return '#06B6D4';
      })
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.35)
      .attr('stroke-dasharray', '6 4');

    var nodeElements = nodeGroup.selectAll('g')
      .data(visible.nodes, function (d) { return d.id; })
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded))
      .on('click', function (event, d) {
        event.stopPropagation();
        var rect = document.getElementById('graph-svg').getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var clickY = event.clientY - rect.top;
        if (onNodeClick) onNodeClick(d, clickX, clickY);
      })
      .on('mouseenter', function (event, d) {
        var r = getNodeRadius(d);
        var color = getNodeColor(d);

        d3.select(this).select('.node-glow')
          .transition().duration(200)
          .attr('r', r + 12)
          .attr('opacity', 0.3);

        d3.select(this).select('.node-circle')
          .transition().duration(200)
          .attr('r', r * 1.15)
          .attr('stroke-width', d.type === 'domain' ? 4 : 3);

        d3.select(this).select('.node-label')
          .transition().duration(200)
          .attr('font-weight', '700');

        linkElements.attr('stroke-opacity', function (l) {
          var sId = typeof l.source === 'object' ? l.source.id : l.source;
          var tId = typeof l.target === 'object' ? l.target.id : l.target;
          return (sId === d.id || tId === d.id) ? 0.6 : 0.05;
        });

        contractPathElements.attr('stroke-opacity', function (l) {
          var sId = typeof l.source === 'object' ? l.source.id : l.source;
          var tId = typeof l.target === 'object' ? l.target.id : l.target;
          return (sId === d.id || tId === d.id) ? 0.7 : 0.1;
        });

        nodeElements.style('opacity', function (n) {
          if (n.id === d.id) return 1;
          var connected = regularLinks.some(function (l) {
            var sId = typeof l.source === 'object' ? l.source.id : l.source;
            var tId = typeof l.target === 'object' ? l.target.id : l.target;
            return (sId === d.id && tId === n.id) || (tId === d.id && sId === n.id);
          });
          var contractConnected = contractLinks.some(function (l) {
            var sId = typeof l.source === 'object' ? l.source.id : l.source;
            var tId = typeof l.target === 'object' ? l.target.id : l.target;
            return (sId === d.id && tId === n.id) || (tId === d.id && sId === n.id);
          });
          return (connected || contractConnected) ? 1 : 0.2;
        });
      })
      .on('mouseleave', function (event, d) {
        var r = getNodeRadius(d);

        d3.select(this).select('.node-glow')
          .transition().duration(300)
          .attr('r', r + 4)
          .attr('opacity', 0.15);

        d3.select(this).select('.node-circle')
          .transition().duration(300)
          .attr('r', r)
          .attr('stroke-width', d.type === 'domain' ? 3 : 2);

        d3.select(this).select('.node-label')
          .transition().duration(300)
          .attr('font-weight', d.type === 'domain' ? '700' : '500');

        linkElements.attr('stroke-opacity', function (l) {
          if (l.type === 'domain-module') return 0.2;
          if (l.type === 'module-orchestrator') return 0.25;
          if (l.type === 'cross-orchestration') return 0.15;
          return 0.1;
        });

        contractPathElements.attr('stroke-opacity', 0.35);

        nodeElements.style('opacity', 1);
      });

    nodeElements.append('circle')
      .attr('class', 'node-glow')
      .attr('r', function (d) { return getNodeRadius(d) + 4; })
      .attr('fill', function (d) { return 'url(#shadow-' + d.domain + ')'; })
      .attr('opacity', 0.15);

    nodeElements.append('circle')
      .attr('class', 'node-circle')
      .attr('r', function (d) { return getNodeRadius(d); })
      .attr('fill', function (d) {
        if (d.type === 'domain') return 'url(#grad-' + d.domain + ')';
        if (d.type === 'module') return domainLightColors[d.domain] || '#F1F5F9';
        if (d.type === 'orchestrator') return '#FFFFFF';
        return domainLightColors[d.domain] || '#F8FAFC';
      })
      .attr('stroke', function (d) { return getNodeColor(d); })
      .attr('stroke-width', function (d) { return d.type === 'domain' ? 3 : 2; })
      .attr('stroke-dasharray', function (d) { return d.type === 'orchestrator' ? '5 3' : 'none'; })
      .attr('filter', function (d) { return d.type === 'domain' ? 'url(#soft-shadow)' : null; });

    nodeElements.append('text')
      .attr('class', 'node-label')
      .attr('dy', function (d) { return getNodeRadius(d) + 16; })
      .attr('text-anchor', 'middle')
      .attr('fill', function (d) {
        if (d.type === 'domain') return '#1E293B';
        return '#475569';
      })
      .attr('font-size', function (d) {
        if (d.type === 'domain') return '13px';
        if (d.type === 'module') return '10px';
        if (d.type === 'orchestrator') return '9px';
        return '8px';
      })
      .attr('font-weight', function (d) {
        return d.type === 'domain' ? '700' : '500';
      })
      .attr('font-family', 'DM Sans, Noto Sans SC, sans-serif')
      .text(function (d) {
        if (d.type === 'pipeline' && currentView === 'full') return '';
        var name = d.name;
        if (name.length > 8 && d.type !== 'domain') return name.substring(0, 7) + '…';
        return name;
      });

    simulation = d3.forceSimulation(visible.nodes)
      .force('link', d3.forceLink(visible.links).id(function (d) { return d.id; }).distance(function (d) {
        if (d.type === 'contract') return 200;
        if (d.type === 'domain-module') return 90;
        if (d.type === 'module-orchestrator') return 55;
        if (d.type === 'module-skill') return 35;
        return 70;
      }).strength(function (d) {
        if (d.type === 'contract') return 0.15;
        return 0.5;
      }))
      .force('charge', d3.forceManyBody().strength(function (d) {
        if (d.type === 'domain') return -500;
        if (d.type === 'module') return -250;
        if (d.type === 'orchestrator') return -120;
        return -50;
      }))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force('collision', d3.forceCollide().radius(function (d) { return getNodeRadius(d) + 12; }))
      .on('tick', ticked);

    for (var i = 0; i < 200; i++) simulation.tick();
    simulation.alpha(0.8).restart();

    function ticked() {
      linkElements
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });

      contractPathElements.attr('d', function (d) {
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var dr = Math.sqrt(dx * dx + dy * dy) * 0.6;
        return 'M' + d.source.x + ',' + d.source.y +
          'A' + dr + ',' + dr + ' 0 0,1 ' +
          d.target.x + ',' + d.target.y;
      });

      nodeElements.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    }

    startParticleAnimation(contractLinks);
  }

  function startParticleAnimation(contractLinks) {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (!particleGroup || contractLinks.length === 0) return;

    particleGroup.selectAll('*').remove();

    var particles = [];
    contractLinks.forEach(function (link, idx) {
      for (var i = 0; i < 3; i++) {
        particles.push({
          link: link,
          offset: i / 3,
          speed: 0.004 + Math.random() * 0.002,
          size: 2.5 + Math.random() * 1.5
        });
      }
    });

    var particleElements = particleGroup.selectAll('circle')
      .data(particles)
      .join('circle')
      .attr('r', function (d) { return d.size; })
      .attr('fill', '#06B6D4')
      .attr('opacity', 0.7);

    function animate() {
      particleElements.each(function (d) {
        d.offset = (d.offset + d.speed) % 1;
        var src = d.link.source;
        var tgt = d.link.target;
        if (typeof src !== 'object' || typeof tgt !== 'object') return;

        var t = d.offset;
        var x = src.x + (tgt.x - src.x) * t;
        var y = src.y + (tgt.y - src.y) * t;

        var dx = tgt.x - src.x;
        var dy = tgt.y - src.y;
        var dr = Math.sqrt(dx * dx + dy * dy) * 0.6;
        var angle = Math.atan2(dy, dx);
        var curveOffset = Math.sin(t * Math.PI) * dr * 0.15;
        x += Math.cos(angle + Math.PI / 2) * curveOffset;
        y += Math.sin(angle + Math.PI / 2) * curveOffset;

        d3.select(this).attr('cx', x).attr('cy', y);
      });
      animFrameId = requestAnimationFrame(animate);
    }

    animate();
  }

  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function setView(view) {
    currentView = view;
    render();
  }

  function toggleDomain(domain) {
    if (activeDomains.has(domain)) {
      if (activeDomains.size > 1) {
        activeDomains.delete(domain);
      }
    } else {
      activeDomains.add(domain);
    }
    render();
  }

  function search(query) {
    if (!query) {
      g.selectAll('.node').style('opacity', 1);
      g.selectAll('.link-line').attr('stroke-opacity', function (d) {
        if (d.type === 'domain-module') return 0.2;
        if (d.type === 'module-orchestrator') return 0.25;
        return 0.1;
      });
      g.selectAll('.contract-path').attr('stroke-opacity', 0.35);
      return;
    }
    var q = query.toLowerCase();
    g.selectAll('.node').style('opacity', function (d) {
      var match = d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
      return match ? 1 : 0.12;
    });
    g.selectAll('.link-line').attr('stroke-opacity', 0.03);
    g.selectAll('.contract-path').attr('stroke-opacity', 0.05);
  }

  function zoomIn() {
    svg.transition().duration(300).call(zoom.scaleBy, 1.3);
  }

  function zoomOut() {
    svg.transition().duration(300).call(zoom.scaleBy, 0.7);
  }

  function zoomReset() {
    svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
  }

  function resize() {
    var el = document.getElementById('graph-container');
    if (!el) return;
    width = el.clientWidth;
    height = el.clientHeight;
    svg.attr('viewBox', [0, 0, width, height]);
    if (simulation) {
      simulation.force('center', d3.forceCenter(width / 2, height / 2));
      simulation.alpha(0.3).restart();
    }
  }

  function destroy() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (simulation) simulation.stop();
  }

  return {
    init: init,
    setView: setView,
    toggleDomain: toggleDomain,
    search: search,
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    zoomReset: zoomReset,
    resize: resize,
    destroy: destroy
  };
})();
