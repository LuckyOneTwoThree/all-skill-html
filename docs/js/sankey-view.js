var SankeyView = (function () {
  var svg, width, height;

  var domainColors = {
    pm: '#6366F1',
    ui: '#8B5CF6',
    backend: '#0EA5E9',
    cross: '#F59E0B'
  };

  function init(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    width = container.clientWidth;
    height = container.clientHeight;

    svg = d3.select('#' + containerId);
    svg.selectAll('*').remove();

    svg.attr('viewBox', [0, 0, width, height]);

    var data = window.SKILLS_DATA;
    if (!data || !data.contracts) return;

    render(data);
  }

  function render(data) {
    var margin = { top: 30, right: 140, bottom: 30, left: 140 };
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var sourceNodes = {};
    var targetNodes = {};

    data.contracts.forEach(function (c) {
      var sInfo = findSkill(data, c.from);
      var tInfo = findSkill(data, c.to);
      if (!sInfo || !tInfo) return;

      var sKey = c.fromDomain + ':' + c.from;
      var tKey = c.toDomain + ':' + c.to;

      sourceNodes[sKey] = {
        id: c.from,
        name: sInfo.name,
        domain: c.fromDomain,
        color: domainColors[c.fromDomain] || '#94a3b8'
      };
      targetNodes[tKey] = {
        id: c.to,
        name: tInfo.name,
        domain: c.toDomain,
        color: domainColors[c.toDomain] || '#94a3b8'
      };
    });

    var leftNodes = Object.values(sourceNodes);
    var rightNodes = Object.values(targetNodes);

    var leftDuplicates = {};
    leftNodes = leftNodes.filter(function (n) {
      if (leftDuplicates[n.id]) return false;
      leftDuplicates[n.id] = true;
      return true;
    });

    var rightDuplicates = {};
    rightNodes = rightNodes.filter(function (n) {
      if (rightDuplicates[n.id]) return false;
      rightDuplicates[n.id] = true;
      return true;
    });

    var nodeHeight = 24;
    var nodePadding = 14;
    var leftTotalHeight = leftNodes.length * nodeHeight + (leftNodes.length - 1) * nodePadding;
    var rightTotalHeight = rightNodes.length * nodeHeight + (rightNodes.length - 1) * nodePadding;
    var maxTotalHeight = Math.max(leftTotalHeight, rightTotalHeight);
    var scale = innerHeight / Math.max(maxTotalHeight, 1);
    scale = Math.min(scale, 1);

    var leftStartY = (innerHeight - leftTotalHeight * scale) / 2;
    var rightStartY = (innerHeight - rightTotalHeight * scale) / 2;

    var leftPositions = {};
    leftNodes.forEach(function (node, i) {
      leftPositions[node.id] = {
        x: 0,
        y: leftStartY + i * (nodeHeight + nodePadding) * scale,
        width: 140,
        height: nodeHeight * scale
      };
    });

    var rightPositions = {};
    rightNodes.forEach(function (node, i) {
      rightPositions[node.id] = {
        x: innerWidth - 140,
        y: rightStartY + i * (nodeHeight + nodePadding) * scale,
        width: 140,
        height: nodeHeight * scale
      };
    });

    var linkData = data.contracts.filter(function (c) {
      return leftPositions[c.from] && rightPositions[c.to];
    });

    var linkGroup = g.append('g').attr('class', 'sankey-links');

    linkData.forEach(function (c) {
      var source = leftPositions[c.from];
      var target = rightPositions[c.to];
      var sourceColor = domainColors[c.fromDomain] || '#94a3b8';

      var sourceY = source.y + source.height / 2;
      var targetY = target.y + target.height / 2;
      var sourceX = source.x + source.width;
      var targetX = target.x;

      var midX = (sourceX + targetX) / 2;

      var path = d3.linkHorizontal()
        .source(function () { return [sourceX, sourceY]; })
        .target(function () { return [targetX, targetY]; });

      linkGroup.append('path')
        .attr('class', 'sankey-link')
        .attr('d', 'M' + sourceX + ',' + sourceY +
          'C' + midX + ',' + sourceY +
          ' ' + midX + ',' + targetY +
          ' ' + targetX + ',' + targetY)
        .attr('stroke', sourceColor)
        .attr('stroke-width', Math.max(2, 8 * scale))
        .attr('stroke-opacity', 0.3)
        .attr('fill', 'none')
        .on('mouseenter', function () {
          d3.select(this).attr('stroke-opacity', 0.6);
        })
        .on('mouseleave', function () {
          d3.select(this).attr('stroke-opacity', 0.3);
        })
        .append('title')
        .text(c.name + ': ' + c.description);
    });

    var leftNodeGroup = g.append('g').attr('class', 'sankey-nodes');
    leftNodes.forEach(function (node) {
      var pos = leftPositions[node.id];
      var ng = leftNodeGroup.append('g')
        .attr('transform', 'translate(' + pos.x + ',' + pos.y + ')')
        .attr('class', 'sankey-node')
        .style('cursor', 'pointer');

      ng.append('rect')
        .attr('width', pos.width)
        .attr('height', pos.height)
        .attr('rx', 4)
        .attr('fill', node.color)
        .attr('opacity', 0.85);

      ng.append('text')
        .attr('x', pos.width + 8)
        .attr('y', pos.height / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'start')
        .attr('fill', '#334155')
        .attr('font-size', '11px')
        .attr('font-weight', '500')
        .attr('font-family', 'DM Sans, Noto Sans SC, sans-serif')
        .text(node.name);
    });

    var rightNodeGroup = g.append('g').attr('class', 'sankey-nodes');
    rightNodes.forEach(function (node) {
      var pos = rightPositions[node.id];
      var ng = rightNodeGroup.append('g')
        .attr('transform', 'translate(' + pos.x + ',' + pos.y + ')')
        .attr('class', 'sankey-node')
        .style('cursor', 'pointer');

      ng.append('rect')
        .attr('width', pos.width)
        .attr('height', pos.height)
        .attr('rx', 4)
        .attr('fill', node.color)
        .attr('opacity', 0.85);

      ng.append('text')
        .attr('x', -8)
        .attr('y', pos.height / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .attr('fill', '#334155')
        .attr('font-size', '11px')
        .attr('font-weight', '500')
        .attr('font-family', 'DM Sans, Noto Sans SC, sans-serif')
        .text(node.name);
    });

    var domainLabels = [
      { label: '数据来源', x: 70, color: '#64748B' },
      { label: '数据消费', x: innerWidth - 70, color: '#64748B' }
    ];

    domainLabels.forEach(function (d) {
      g.append('text')
        .attr('x', d.x)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('fill', d.color)
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .attr('font-family', 'DM Sans, Noto Sans SC, sans-serif')
        .text(d.label);
    });
  }

  function findSkill(data, skillId) {
    for (var i = 0; i < data.domains.length; i++) {
      var domain = data.domains[i];
      if (domain.id === skillId) {
        return { name: domain.name, domain: domain.id };
      }
      if (domain.modules) {
        for (var j = 0; j < domain.modules.length; j++) {
          var mod = domain.modules[j];
          if (mod.id === skillId) {
            return { name: mod.name, domain: domain.id };
          }
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

  function resize() {
    var container = document.getElementById('sankey-container');
    if (!container) return;
    width = container.clientWidth;
    height = container.clientHeight;
    svg.attr('viewBox', [0, 0, width, height]);
    svg.selectAll('*').remove();
    var data = window.SKILLS_DATA;
    if (data && data.contracts) render(data);
  }

  return {
    init: init,
    resize: resize
  };
})();
