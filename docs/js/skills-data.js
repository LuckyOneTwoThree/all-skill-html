var SKILLS_DATA = {
  domains: [
    {
      id: "pm",
      name: "产品方法论",
      tagline: "从探索到增长的全链路产品方法论",
      color: "#6366F1",
      icon: "target",
      modules: [
        {
          id: "pm-00-guide",
          name: "导航入口",
          description: "根据场景推荐合适的技能路径",
          orchestrators: [],
          skills: [
            {
              id: "pm-guide",
              name: "PM技能导航",
              type: "guide",
              brief: "根据场景推荐合适的技能组合",
              input: ["用户场景描述"],
              output: ["推荐技能路径"]
            }
          ]
        },
        {
          id: "pm-01-discovery",
          name: "产品探索与发现",
          description: "用户研究、需求洞察、市场分析、机会识别",
          orchestrators: [
            {
              id: "user-research-orchestrator",
              name: "用户研究指挥官",
              type: "orchestrator",
              description: "调度用户研究全流程：声音分析、行为分析、用户建模、访谈辅助、研究报告",
              children: [
                "user-research-voice-analysis",
                "user-research-behavior-analysis",
                "user-research-user-modeling",
                "user-research-interview-assist",
                "user-research-report"
              ]
            },
            {
              id: "insight-orchestrator",
              name: "需求洞察指挥官",
              type: "orchestrator",
              description: "调度需求洞察全流程：JTBD、5Whys、需求分层、Kano、优先级评分",
              children: [
                "insight-jtbd",
                "insight-5whys",
                "insight-requirement-layers",
                "insight-kano",
                "insight-priority-scoring"
              ]
            },
            {
              id: "market-orchestrator",
              name: "市场分析指挥官",
              type: "orchestrator",
              description: "调度市场分析全流程：市场规模、PEST、竞品情报、竞品象限、竞品报告",
              children: [
                "market-tam-som",
                "market-pest",
                "market-competitor-intel",
                "market-competitor-quadrant",
                "market-competitor-report"
              ]
            },
            {
              id: "opportunity-orchestrator",
              name: "机会识别指挥官",
              type: "orchestrator",
              description: "调度机会识别全流程：机会评分、HMW、问题陈述、机会简报",
              children: [
                "opportunity-scoring",
                "opportunity-hmw",
                "opportunity-problem-statement",
                "opportunity-brief"
              ]
            }
          ],
          skills: [
            {
              id: "user-research-voice-analysis",
              name: "用户声音分析",
              type: "pipeline",
              brief: "分析用户声音与反馈情感",
              input: ["用户反馈数据"],
              output: ["声音分析报告"]
            },
            {
              id: "user-research-behavior-analysis",
              name: "用户行为分析",
              type: "pipeline",
              brief: "分析用户行为数据与模式",
              input: ["行为事件数据"],
              output: ["行为分析报告"]
            },
            {
              id: "user-research-user-modeling",
              name: "用户建模",
              type: "pipeline",
              brief: "构建用户画像与分群模型",
              input: ["声音分析", "行为分析"],
              output: ["用户画像"]
            },
            {
              id: "user-research-interview-assist",
              name: "访谈辅助",
              type: "pipeline",
              brief: "辅助用户访谈与记录提取",
              input: ["访谈提纲"],
              output: ["访谈记录"]
            },
            {
              id: "user-research-report",
              name: "用户研究报告",
              type: "pipeline",
              brief: "生成用户研究综合报告",
              input: ["研究数据"],
              output: ["研究报告"]
            },
            {
              id: "insight-jtbd",
              name: "JTBD分析",
              type: "pipeline",
              brief: "识别用户待办任务与场景",
              input: ["用户访谈记录"],
              output: ["JTBD地图"]
            },
            {
              id: "insight-5whys",
              name: "五问法分析",
              type: "pipeline",
              brief: "五问法深挖需求根因",
              input: ["问题描述"],
              output: ["根因分析"]
            },
            {
              id: "insight-requirement-layers",
              name: "需求分层",
              type: "pipeline",
              brief: "分层解析需求结构",
              input: ["原始需求"],
              output: ["需求层次图"]
            },
            {
              id: "insight-kano",
              name: "Kano模型分析",
              type: "pipeline",
              brief: "Kano模型分类需求属性",
              input: ["需求列表"],
              output: ["Kano分类结果"]
            },
            {
              id: "insight-priority-scoring",
              name: "优先级评分",
              type: "pipeline",
              brief: "量化评估需求优先级",
              input: ["需求列表"],
              output: ["优先级评分"]
            },
            {
              id: "market-tam-som",
              name: "市场规模估算",
              type: "pipeline",
              brief: "估算市场容量与可触达规模",
              input: ["市场数据"],
              output: ["市场规模报告"]
            },
            {
              id: "market-pest",
              name: "PEST分析",
              type: "pipeline",
              brief: "PEST分析宏观环境因素",
              input: ["行业信息"],
              output: ["PEST分析"]
            },
            {
              id: "market-competitor-intel",
              name: "竞品情报采集",
              type: "pipeline",
              brief: "采集竞争对手情报信息",
              input: ["竞品名称"],
              output: ["竞品情报"]
            },
            {
              id: "market-competitor-quadrant",
              name: "竞争格局象限",
              type: "pipeline",
              brief: "绘制竞争格局象限图",
              input: ["竞品数据"],
              output: ["竞争象限图"]
            },
            {
              id: "market-competitor-report",
              name: "竞品分析报告",
              type: "pipeline",
              brief: "生成竞品分析综合报告",
              input: ["竞品情报"],
              output: ["竞品分析报告"]
            },
            {
              id: "opportunity-scoring",
              name: "机会评分",
              type: "pipeline",
              brief: "评估机会可行性与吸引力",
              input: ["机会列表"],
              output: ["机会评分"]
            },
            {
              id: "opportunity-hmw",
              name: "HMW重构",
              type: "pipeline",
              brief: "HMW重构问题寻找创新方向",
              input: ["问题陈述"],
              output: ["HMW问题"]
            },
            {
              id: "opportunity-problem-statement",
              name: "问题陈述",
              type: "pipeline",
              brief: "定义清晰的问题陈述",
              input: ["调研数据"],
              output: ["问题陈述"]
            },
            {
              id: "opportunity-brief",
              name: "机会简报",
              type: "pipeline",
              brief: "撰写机会简报与行动建议",
              input: ["机会评估结果"],
              output: ["机会简报"]
            }
          ]
        },
        {
          id: "pm-02-strategy",
          name: "产品商业与战略",
          description: "商业模式、战略规划、产品定位、利益相关者",
          orchestrators: [
            {
              id: "business-orchestrator",
              name: "商业分析指挥官",
              type: "orchestrator",
              description: "调度商业分析全流程：商业模式画布、价值匹配、定价、战略报告",
              children: [
                "business-model-canvas",
                "business-value-fit",
                "business-pricing",
                "business-strategy-report"
              ]
            },
            {
              id: "planning-orchestrator",
              name: "战略规划指挥官",
              type: "orchestrator",
              description: "调度战略规划全流程：SWOT、波特五力、OKR、北极星、路线图、Ansoff",
              children: [
                "planning-swot",
                "planning-porter-five-forces",
                "planning-okr",
                "planning-north-star",
                "planning-roadmap",
                "planning-ansoff"
              ]
            },
            {
              id: "positioning-orchestrator",
              name: "产品定位指挥官",
              type: "orchestrator",
              description: "调度产品定位全流程：定位陈述、价值曲线、差异化、排除清单",
              children: [
                "positioning-statement",
                "positioning-value-curve",
                "positioning-differentiation",
                "positioning-exclusion"
              ]
            },
            {
              id: "stakeholder-orchestrator",
              name: "利益相关者指挥官",
              type: "orchestrator",
              description: "调度利益相关者管理全流程：利益相关者地图、策略文档、沟通简报、立项提案",
              children: [
                "stakeholder-map",
                "stakeholder-strategy-doc",
                "stakeholder-brief",
                "product-proposal"
              ]
            }
          ],
          skills: [
            {
              id: "business-model-canvas",
              name: "商业模式画布",
              type: "pipeline",
              brief: "绘制商业模式画布",
              input: ["业务信息"],
              output: ["商业模式画布"]
            },
            {
              id: "business-value-fit",
              name: "价值匹配评估",
              type: "pipeline",
              brief: "评估价值主张与市场匹配度",
              input: ["价值主张"],
              output: ["匹配度评估"]
            },
            {
              id: "business-pricing",
              name: "定价策略",
              type: "pipeline",
              brief: "制定产品定价策略",
              input: ["成本与竞品数据"],
              output: ["定价策略"]
            },
            {
              id: "business-strategy-report",
              name: "商业战略报告",
              type: "pipeline",
              brief: "生成商业战略综合报告",
              input: ["商业分析"],
              output: ["战略报告"]
            },
            {
              id: "positioning-statement",
              name: "定位陈述",
              type: "pipeline",
              brief: "撰写产品定位陈述",
              input: ["市场与用户信息"],
              output: ["定位陈述"]
            },
            {
              id: "positioning-value-curve",
              name: "价值曲线",
              type: "pipeline",
              brief: "绘制价值曲线对比图",
              input: ["竞品与自身数据"],
              output: ["价值曲线"]
            },
            {
              id: "positioning-differentiation",
              name: "差异化策略",
              type: "pipeline",
              brief: "提炼差异化竞争优势",
              input: ["竞品分析"],
              output: ["差异化策略"]
            },
            {
              id: "positioning-exclusion",
              name: "排除清单",
              type: "pipeline",
              brief: "明确产品不做什么的边界",
              input: ["需求范围"],
              output: ["排除清单"]
            },
            {
              id: "planning-swot",
              name: "SWOT分析",
              type: "pipeline",
              brief: "SWOT分析内外部态势",
              input: ["业务数据"],
              output: ["SWOT矩阵"]
            },
            {
              id: "planning-porter-five-forces",
              name: "波特五力分析",
              type: "pipeline",
              brief: "波特五力分析行业竞争",
              input: ["行业数据"],
              output: ["五力分析"]
            },
            {
              id: "planning-okr",
              name: "OKR制定",
              type: "pipeline",
              brief: "制定OKR目标与关键结果",
              input: ["战略方向"],
              output: ["OKR"]
            },
            {
              id: "planning-north-star",
              name: "北极星指标",
              type: "pipeline",
              brief: "定义产品北极星指标",
              input: ["业务目标"],
              output: ["北极星指标"]
            },
            {
              id: "planning-roadmap",
              name: "产品路线图",
              type: "pipeline",
              brief: "规划产品路线图",
              input: ["需求与目标"],
              output: ["路线图"]
            },
            {
              id: "planning-ansoff",
              name: "Ansoff矩阵",
              type: "pipeline",
              brief: "Ansoff矩阵分析增长方向",
              input: ["市场与产品数据"],
              output: ["增长矩阵"]
            },
            {
              id: "stakeholder-map",
              name: "利益相关者地图",
              type: "pipeline",
              brief: "绘制利益相关者地图",
              input: ["项目信息"],
              output: ["利益相关者地图"]
            },
            {
              id: "stakeholder-strategy-doc",
              name: "利益相关者策略",
              type: "pipeline",
              brief: "制定利益相关者策略",
              input: ["利益相关者地图"],
              output: ["策略文档"]
            },
            {
              id: "stakeholder-brief",
              name: "利益相关者简报",
              type: "pipeline",
              brief: "生成利益相关者沟通简报",
              input: ["策略文档"],
              output: ["沟通简报"]
            },
            {
              id: "product-proposal",
              name: "产品立项提案",
              type: "pipeline",
              brief: "撰写产品立项提案",
              input: ["商业与用户分析"],
              output: ["立项提案"]
            }
          ]
        },
        {
          id: "pm-03-design",
          name: "产品构思与设计",
          description: "需求分析、创意构思、方案设计、验证测试",
          orchestrators: [
            {
              id: "requirements-orchestrator",
              name: "需求分析指挥官",
              type: "orchestrator",
              description: "调度需求分析全流程：需求采集、需求理解、需求排序、需求规格",
              children: [
                "requirements-collection",
                "requirements-understanding",
                "requirements-prioritization",
                "requirements-srs"
              ]
            },
            {
              id: "ideation-orchestrator",
              name: "创意构思指挥官",
              type: "orchestrator",
              description: "调度创意构思全流程：HMW、SCAMPER、逆向思维、收敛",
              children: [
                "ideation-hmw",
                "ideation-scamper",
                "ideation-inversion",
                "ideation-convergence"
              ]
            },
            {
              id: "design-orchestrator",
              name: "方案设计指挥官",
              type: "orchestrator",
              description: "调度方案设计全流程：PRD、信息架构、用户流程、原型、交付规范、交互规格",
              children: [
                "design-prd",
                "design-ia",
                "design-userflow",
                "design-prototype",
                "design-handoff-spec",
                "interaction-spec"
              ]
            },
            {
              id: "validation-orchestrator",
              name: "验证测试指挥官",
              type: "orchestrator",
              description: "调度验证测试全流程：假设地图、MVP、实验方案、可用性测试",
              children: [
                "validation-assumption-map",
                "validation-mvp",
                "validation-experiment",
                "validation-usability"
              ]
            }
          ],
          skills: [
            {
              id: "requirements-collection",
              name: "需求采集",
              type: "pipeline",
              brief: "系统化采集与整理需求",
              input: ["需求来源"],
              output: ["需求池"]
            },
            {
              id: "requirements-understanding",
              name: "需求理解",
              type: "pipeline",
              brief: "深度理解需求背景与意图",
              input: ["需求描述"],
              output: ["需求理解文档"]
            },
            {
              id: "requirements-prioritization",
              name: "需求排序",
              type: "pipeline",
              brief: "多维度排序需求优先级",
              input: ["需求池"],
              output: ["优先级列表"]
            },
            {
              id: "requirements-srs",
              name: "需求规格说明书",
              type: "pipeline",
              brief: "编写软件需求规格说明书",
              input: ["需求理解文档"],
              output: ["SRS文档"]
            },
            {
              id: "ideation-hmw",
              name: "HMW创意",
              type: "pipeline",
              brief: "HMW法激发创意解决方案",
              input: ["问题定义"],
              output: ["创意方案"]
            },
            {
              id: "ideation-scamper",
              name: "SCAMPER创新",
              type: "pipeline",
              brief: "SCAMPER法系统化创新",
              input: ["现有方案"],
              output: ["创新方案"]
            },
            {
              id: "ideation-inversion",
              name: "逆向思维",
              type: "pipeline",
              brief: "逆向思维寻找突破点",
              input: ["问题陈述"],
              output: ["逆向方案"]
            },
            {
              id: "ideation-convergence",
              name: "创意收敛",
              type: "pipeline",
              brief: "收敛创意形成可行方案",
              input: ["创意列表"],
              output: ["收敛方案"]
            },
            {
              id: "design-prd",
              name: "PRD生成",
              type: "pipeline",
              brief: "编写产品需求文档",
              input: ["需求与方案"],
              output: ["PRD文档"]
            },
            {
              id: "design-ia",
              name: "信息架构",
              type: "pipeline",
              brief: "设计信息架构与内容组织",
              input: ["需求文档"],
              output: ["信息架构图"]
            },
            {
              id: "design-userflow",
              name: "用户流程",
              type: "pipeline",
              brief: "设计用户操作流程",
              input: ["信息架构"],
              output: ["用户流程图"]
            },
            {
              id: "design-prototype",
              name: "交互原型",
              type: "pipeline",
              brief: "生成交互原型",
              input: ["用户流程"],
              output: ["交互原型"]
            },
            {
              id: "design-handoff-spec",
              name: "设计交付规范",
              type: "pipeline",
              brief: "生成设计交付规范",
              input: ["设计稿"],
              output: ["交付规范"]
            },
            {
              id: "interaction-spec",
              name: "交互规格说明",
              type: "pipeline",
              brief: "编写交互规格说明",
              input: ["交互原型"],
              output: ["交互规格"]
            },
            {
              id: "validation-assumption-map",
              name: "假设地图",
              type: "pipeline",
              brief: "识别与映射核心假设",
              input: ["产品方案"],
              output: ["假设地图"]
            },
            {
              id: "validation-mvp",
              name: "MVP定义",
              type: "pipeline",
              brief: "定义最小可行产品范围",
              input: ["假设地图"],
              output: ["MVP范围"]
            },
            {
              id: "validation-experiment",
              name: "验证实验",
              type: "pipeline",
              brief: "设计验证实验方案",
              input: ["核心假设"],
              output: ["实验方案"]
            },
            {
              id: "validation-usability",
              name: "可用性测试",
              type: "pipeline",
              brief: "执行可用性测试与评估",
              input: ["原型"],
              output: ["可用性报告"]
            }
          ]
        },
        {
          id: "pm-04-metrics-design",
          name: "产品度量设计",
          description: "指标体系、埋点方案、数据看板",
          orchestrators: [
            {
              id: "metrics-orchestrator",
              name: "度量设计指挥官",
              type: "orchestrator",
              description: "调度度量设计全流程：指标体系、埋点方案、数据看板",
              children: [
                "metrics-system",
                "tracking-plan",
                "metrics-dashboard"
              ]
            }
          ],
          skills: [
            {
              id: "metrics-system",
              name: "指标体系",
              type: "pipeline",
              brief: "设计产品指标体系框架",
              input: ["业务目标"],
              output: ["指标体系"]
            },
            {
              id: "tracking-plan",
              name: "埋点方案",
              type: "pipeline",
              brief: "制定埋点方案与采集规范",
              input: ["指标体系"],
              output: ["埋点方案"]
            },
            {
              id: "metrics-dashboard",
              name: "数据看板",
              type: "pipeline",
              brief: "设计数据看板与可视化",
              input: ["指标体系"],
              output: ["看板设计"]
            }
          ]
        },
        {
          id: "pm-05-development",
          name: "产品开发与上线",
          description: "开发执行、质量保障、发布交付、迭代回顾",
          orchestrators: [
            {
              id: "development-orchestrator",
              name: "开发执行指挥官",
              type: "orchestrator",
              description: "调度开发执行全流程：任务拆解、自动审查、PRD同步、架构决策、数据字典",
              children: [
                "development-task-breakdown",
                "development-auto-review",
                "development-prd-sync",
                "architecture-decision-record",
                "data-dictionary"
              ]
            },
            {
              id: "quality-orchestrator",
              name: "质量保障指挥官",
              type: "orchestrator",
              description: "调度质量保障全流程：自动测试、自动验收、验收报告",
              children: [
                "quality-auto-test",
                "quality-auto-acceptance",
                "quality-acceptance-report"
              ]
            },
            {
              id: "release-orchestrator",
              name: "发布交付指挥官",
              type: "orchestrator",
              description: "调度发布交付全流程：灰度发布、发布检查清单、发布说明",
              children: [
                "release-gradual",
                "release-auto-checklist",
                "release-notes"
              ]
            },
            {
              id: "retrospective-orchestrator",
              name: "迭代回顾指挥官",
              type: "orchestrator",
              description: "调度迭代回顾全流程：自动回顾、需求变更日志、隐私合规、安全需求、技术债务",
              children: [
                "retrospective-auto",
                "requirements-change-log",
                "privacy-compliance-assessment",
                "security-requirements",
                "tech-debt-register"
              ]
            }
          ],
          skills: [
            {
              id: "development-task-breakdown",
              name: "任务拆解",
              type: "pipeline",
              brief: "拆解开发任务与排期",
              input: ["PRD文档"],
              output: ["任务列表"]
            },
            {
              id: "development-auto-review",
              name: "自动审查",
              type: "pipeline",
              brief: "自动审查代码与设计一致性",
              input: ["代码变更"],
              output: ["审查报告"]
            },
            {
              id: "development-prd-sync",
              name: "PRD同步",
              type: "pipeline",
              brief: "同步PRD与开发实现状态",
              input: ["PRD文档"],
              output: ["同步状态"]
            },
            {
              id: "architecture-decision-record",
              name: "架构决策记录",
              type: "pipeline",
              brief: "记录架构决策与理由",
              input: ["架构方案"],
              output: ["ADR文档"]
            },
            {
              id: "data-dictionary",
              name: "数据字典",
              type: "pipeline",
              brief: "维护数据字典与字段定义",
              input: ["数据模型"],
              output: ["数据字典"]
            },
            {
              id: "quality-auto-test",
              name: "自动测试",
              type: "pipeline",
              brief: "自动生成与执行测试用例",
              input: ["功能需求"],
              output: ["测试报告"]
            },
            {
              id: "quality-auto-acceptance",
              name: "自动验收",
              type: "pipeline",
              brief: "自动化验收测试与判定",
              input: ["验收标准"],
              output: ["验收结果"]
            },
            {
              id: "quality-acceptance-report",
              name: "验收报告",
              type: "pipeline",
              brief: "生成验收测试综合报告",
              input: ["验收结果"],
              output: ["验收报告"]
            },
            {
              id: "release-gradual",
              name: "灰度发布",
              type: "pipeline",
              brief: "规划灰度发布策略",
              input: ["发布计划"],
              output: ["灰度策略"]
            },
            {
              id: "release-auto-checklist",
              name: "发布检查清单",
              type: "pipeline",
              brief: "自动生成发布检查清单",
              input: ["发布内容"],
              output: ["检查清单"]
            },
            {
              id: "release-notes",
              name: "发布说明",
              type: "pipeline",
              brief: "自动生成版本发布说明",
              input: ["变更记录"],
              output: ["发布说明"]
            },
            {
              id: "retrospective-auto",
              name: "自动回顾",
              type: "pipeline",
              brief: "自动回顾与总结迭代",
              input: ["迭代数据"],
              output: ["回顾报告"]
            },
            {
              id: "requirements-change-log",
              name: "需求变更日志",
              type: "pipeline",
              brief: "记录需求变更与影响",
              input: ["变更请求"],
              output: ["变更日志"]
            },
            {
              id: "privacy-compliance-assessment",
              name: "隐私合规评估",
              type: "pipeline",
              brief: "评估隐私合规风险",
              input: ["产品方案"],
              output: ["合规评估"]
            },
            {
              id: "security-requirements",
              name: "安全需求",
              type: "pipeline",
              brief: "提取安全需求与规范",
              input: ["产品方案"],
              output: ["安全需求"]
            },
            {
              id: "tech-debt-register",
              name: "技术债务登记",
              type: "pipeline",
              brief: "登记技术债务与优先级",
              input: ["代码分析"],
              output: ["技术债务清单"]
            }
          ]
        },
        {
          id: "pm-06-metrics-ops",
          name: "产品度量运营",
          description: "数据分析、实验验证、数据驱动决策",
          orchestrators: [
            {
              id: "analysis-orchestrator",
              name: "数据分析指挥官",
              type: "orchestrator",
              description: "调度数据分析全流程：异常检测、漏斗分析、留存分析、分析报告",
              children: [
                "analysis-anomaly",
                "analysis-funnel",
                "analysis-retention",
                "data-analysis-report"
              ]
            },
            {
              id: "experiment-orchestrator",
              name: "实验验证指挥官",
              type: "orchestrator",
              description: "调度实验验证全流程：实验设计、实验执行、实验报告",
              children: [
                "experiment-design",
                "experiment-execution",
                "experiment-report"
              ]
            },
            {
              id: "decision-orchestrator",
              name: "数据决策指挥官",
              type: "orchestrator",
              description: "调度数据决策全流程：DACE评估、数据洞察、决策文化",
              children: [
                "decision-dace",
                "decision-insight",
                "decision-culture"
              ]
            }
          ],
          skills: [
            {
              id: "analysis-anomaly",
              name: "异常检测",
              type: "pipeline",
              brief: "检测数据异常与波动",
              input: ["指标数据"],
              output: ["异常报告"]
            },
            {
              id: "analysis-funnel",
              name: "漏斗分析",
              type: "pipeline",
              brief: "分析转化漏斗与流失",
              input: ["用户行为数据"],
              output: ["漏斗分析"]
            },
            {
              id: "analysis-retention",
              name: "留存分析",
              type: "pipeline",
              brief: "分析用户留存与生命周期",
              input: ["用户数据"],
              output: ["留存分析"]
            },
            {
              id: "data-analysis-report",
              name: "数据分析报告",
              type: "pipeline",
              brief: "生成数据分析综合报告",
              input: ["分析结果"],
              output: ["分析报告"]
            },
            {
              id: "experiment-design",
              name: "实验设计",
              type: "pipeline",
              brief: "设计A/B测试实验方案",
              input: ["假设与指标"],
              output: ["实验方案"]
            },
            {
              id: "experiment-execution",
              name: "实验执行",
              type: "pipeline",
              brief: "执行实验与监控数据",
              input: ["实验方案"],
              output: ["实验数据"]
            },
            {
              id: "experiment-report",
              name: "实验报告",
              type: "pipeline",
              brief: "生成实验结果分析报告",
              input: ["实验数据"],
              output: ["实验报告"]
            },
            {
              id: "decision-dace",
              name: "DACE决策评估",
              type: "pipeline",
              brief: "数据驱动决策评估",
              input: ["数据与选项"],
              output: ["决策建议"]
            },
            {
              id: "decision-insight",
              name: "数据洞察",
              type: "pipeline",
              brief: "提炼数据洞察与行动建议",
              input: ["分析报告"],
              output: ["数据洞察"]
            },
            {
              id: "decision-culture",
              name: "决策文化",
              type: "pipeline",
              brief: "建立数据驱动决策文化",
              input: ["组织信息"],
              output: ["文化建议"]
            }
          ]
        },
        {
          id: "pm-07-growth",
          name: "产品增长与运营",
          description: "增长模型、获客、激活、留存、营收",
          orchestrators: [
            {
              id: "growth-orchestrator",
              name: "增长总指挥",
              type: "orchestrator",
              description: "调度增长战略全流程：增长模型、增长报告、GTM策略、运营手册",
              children: [
                "growth-model",
                "growth-strategy-report",
                "gtm-strategy",
                "product-operations-manual"
              ]
            },
            {
              id: "acquisition-orchestrator",
              name: "获客指挥官",
              type: "orchestrator",
              description: "调度获客全流程：渠道评估、获客优化",
              children: [
                "acquisition-channel",
                "acquisition-optimize"
              ]
            },
            {
              id: "activation-orchestrator",
              name: "激活指挥官",
              type: "orchestrator",
              description: "调度激活全流程：Aha时刻、用户引导",
              children: [
                "activation-aha",
                "activation-onboarding"
              ]
            },
            {
              id: "retention-orchestrator",
              name: "留存指挥官",
              type: "orchestrator",
              description: "调度留存全流程：流失分析、参与度提升",
              children: [
                "retention-churn",
                "retention-engagement"
              ]
            },
            {
              id: "revenue-orchestrator",
              name: "营收指挥官",
              type: "orchestrator",
              description: "调度营收全流程：营收漏斗、净收入留存、增购策略",
              children: [
                "revenue-funnel",
                "revenue-nrr",
                "revenue-upsell"
              ]
            }
          ],
          skills: [
            {
              id: "growth-model",
              name: "增长模型",
              type: "pipeline",
              brief: "构建产品增长模型",
              input: ["业务数据"],
              output: ["增长模型"]
            },
            {
              id: "growth-strategy-report",
              name: "增长战略报告",
              type: "pipeline",
              brief: "生成增长战略综合报告",
              input: ["增长模型"],
              output: ["增长报告"]
            },
            {
              id: "gtm-strategy",
              name: "GTM策略",
              type: "pipeline",
              brief: "制定产品上市策略",
              input: ["产品与市场信息"],
              output: ["GTM策略"]
            },
            {
              id: "product-operations-manual",
              name: "产品运营手册",
              type: "pipeline",
              brief: "编写产品运营手册",
              input: ["运营流程"],
              output: ["运营手册"]
            },
            {
              id: "acquisition-channel",
              name: "获客渠道",
              type: "pipeline",
              brief: "评估与选择获客渠道",
              input: ["用户画像"],
              output: ["渠道策略"]
            },
            {
              id: "acquisition-optimize",
              name: "获客优化",
              type: "pipeline",
              brief: "优化获客效率与成本",
              input: ["渠道数据"],
              output: ["优化方案"]
            },
            {
              id: "activation-aha",
              name: "Aha时刻",
              type: "pipeline",
              brief: "识别与优化Aha时刻",
              input: ["用户行为数据"],
              output: ["Aha时刻"]
            },
            {
              id: "activation-onboarding",
              name: "用户引导",
              type: "pipeline",
              brief: "设计用户引导流程",
              input: ["产品功能"],
              output: ["引导方案"]
            },
            {
              id: "retention-churn",
              name: "流失分析",
              type: "pipeline",
              brief: "分析流失原因与预警",
              input: ["用户数据"],
              output: ["流失分析"]
            },
            {
              id: "retention-engagement",
              name: "参与度提升",
              type: "pipeline",
              brief: "提升用户参与度策略",
              input: ["用户数据"],
              output: ["参与策略"]
            },
            {
              id: "revenue-funnel",
              name: "营收漏斗",
              type: "pipeline",
              brief: "分析营收漏斗与转化",
              input: ["营收数据"],
              output: ["营收漏斗"]
            },
            {
              id: "revenue-nrr",
              name: "净收入留存",
              type: "pipeline",
              brief: "计算净收入留存率",
              input: ["客户数据"],
              output: ["NRR分析"]
            },
            {
              id: "revenue-upsell",
              name: "增购策略",
              type: "pipeline",
              brief: "制定增购与交叉销售策略",
              input: ["客户数据"],
              output: ["增购策略"]
            }
          ]
        },
        {
          id: "pm-08-monitoring",
          name: "产品监控与迭代",
          description: "监控预警、问题诊断、迭代优化",
          orchestrators: [
            {
              id: "monitoring-orchestrator",
              name: "监控预警指挥官",
              type: "orchestrator",
              description: "调度监控预警全流程：监控体系、异常检测、监控看板、异常升级",
              children: [
                "monitoring-system",
                "monitoring-anomaly",
                "monitoring-dashboard",
                "monitoring-escalation"
              ]
            },
            {
              id: "diagnosis-orchestrator",
              name: "问题诊断指挥官",
              type: "orchestrator",
              description: "调度问题诊断全流程：健康度诊断、竞争态势诊断",
              children: [
                "diagnosis-health",
                "diagnosis-competition"
              ]
            },
            {
              id: "iteration-orchestrator",
              name: "迭代优化指挥官",
              type: "orchestrator",
              description: "调度迭代优化全流程：迭代需求池、优先级排序、迭代回顾、竞品监控、反馈闭环、退市计划",
              children: [
                "iteration-backlog",
                "iteration-prioritization",
                "iteration-retrospective",
                "competitor-monitoring-report",
                "user-feedback-loop-report",
                "product-sunset-plan"
              ]
            }
          ],
          skills: [
            {
              id: "monitoring-system",
              name: "监控体系",
              type: "pipeline",
              brief: "搭建产品监控体系",
              input: ["关键指标"],
              output: ["监控体系"]
            },
            {
              id: "monitoring-anomaly",
              name: "异常检测",
              type: "pipeline",
              brief: "实时检测异常与告警",
              input: ["监控数据"],
              output: ["异常告警"]
            },
            {
              id: "monitoring-dashboard",
              name: "监控看板",
              type: "pipeline",
              brief: "构建监控数据看板",
              input: ["监控指标"],
              output: ["监控看板"]
            },
            {
              id: "monitoring-escalation",
              name: "异常升级",
              type: "pipeline",
              brief: "异常升级与响应流程",
              input: ["异常告警"],
              output: ["升级工单"]
            },
            {
              id: "diagnosis-health",
              name: "健康度诊断",
              type: "pipeline",
              brief: "诊断产品健康度",
              input: ["监控数据"],
              output: ["健康报告"]
            },
            {
              id: "diagnosis-competition",
              name: "竞争态势诊断",
              type: "pipeline",
              brief: "诊断竞争态势变化",
              input: ["竞品动态"],
              output: ["竞争诊断"]
            },
            {
              id: "iteration-backlog",
              name: "迭代需求池",
              type: "pipeline",
              brief: "管理迭代需求池",
              input: ["反馈与数据"],
              output: ["迭代需求池"]
            },
            {
              id: "iteration-prioritization",
              name: "迭代优先级",
              type: "pipeline",
              brief: "排序迭代需求优先级",
              input: ["需求池"],
              output: ["优先级列表"]
            },
            {
              id: "iteration-retrospective",
              name: "迭代回顾",
              type: "pipeline",
              brief: "迭代回顾与经验总结",
              input: ["迭代数据"],
              output: ["回顾报告"]
            },
            {
              id: "competitor-monitoring-report",
              name: "竞品监控报告",
              type: "pipeline",
              brief: "生成竞品监控报告",
              input: ["竞品数据"],
              output: ["监控报告"]
            },
            {
              id: "user-feedback-loop-report",
              name: "用户反馈闭环报告",
              type: "pipeline",
              brief: "生成用户反馈闭环报告",
              input: ["反馈数据"],
              output: ["反馈报告"]
            },
            {
              id: "product-sunset-plan",
              name: "产品退市计划",
              type: "pipeline",
              brief: "制定产品退市计划",
              input: ["产品数据"],
              output: ["退市计划"]
            }
          ]
        },
        {
          id: "pm-09-project",
          name: "项目管理与执行",
          description: "项目规划、敏捷执行、风险管理",
          orchestrators: [
            {
              id: "project-planning-orchestrator",
              name: "项目规划指挥官",
              type: "orchestrator",
              description: "调度项目规划全流程：项目章程、资源规划、项目启动",
              children: [
                "planning-project-charter",
                "planning-resource",
                "planning-kickoff"
              ]
            },
            {
              id: "agile-orchestrator",
              name: "敏捷执行指挥官",
              type: "orchestrator",
              description: "调度敏捷执行全流程：Sprint规划、每日同步、Sprint评审、回顾报告",
              children: [
                "agile-sprint-planning",
                "agile-daily-sync",
                "agile-review",
                "sprint-retrospective-report"
              ]
            },
            {
              id: "risk-orchestrator",
              name: "风险管理指挥官",
              type: "orchestrator",
              description: "调度风险管理全流程：风险识别、风险监控、风险升级",
              children: [
                "risk-identification",
                "risk-monitoring",
                "risk-escalation"
              ]
            }
          ],
          skills: [
            {
              id: "planning-project-charter",
              name: "项目章程",
              type: "pipeline",
              brief: "编写项目章程与授权",
              input: ["项目信息"],
              output: ["项目章程"]
            },
            {
              id: "planning-resource",
              name: "资源规划",
              type: "pipeline",
              brief: "规划项目资源与分配",
              input: ["项目章程"],
              output: ["资源计划"]
            },
            {
              id: "planning-kickoff",
              name: "项目启动",
              type: "pipeline",
              brief: "组织项目启动会",
              input: ["项目章程"],
              output: ["启动会议程"]
            },
            {
              id: "agile-sprint-planning",
              name: "Sprint规划",
              type: "pipeline",
              brief: "规划Sprint目标与任务",
              input: ["需求池"],
              output: ["Sprint计划"]
            },
            {
              id: "agile-daily-sync",
              name: "每日同步",
              type: "pipeline",
              brief: "同步每日进展与阻碍",
              input: ["Sprint数据"],
              output: ["站会纪要"]
            },
            {
              id: "agile-review",
              name: "Sprint评审",
              type: "pipeline",
              brief: "组织Sprint评审与演示",
              input: ["Sprint成果"],
              output: ["评审记录"]
            },
            {
              id: "sprint-retrospective-report",
              name: "Sprint回顾报告",
              type: "pipeline",
              brief: "生成Sprint回顾报告",
              input: ["Sprint数据"],
              output: ["回顾报告"]
            },
            {
              id: "risk-identification",
              name: "风险识别",
              type: "pipeline",
              brief: "识别项目风险与等级",
              input: ["项目信息"],
              output: ["风险清单"]
            },
            {
              id: "risk-monitoring",
              name: "风险监控",
              type: "pipeline",
              brief: "监控风险状态与变化",
              input: ["风险清单"],
              output: ["风险状态"]
            },
            {
              id: "risk-escalation",
              name: "风险升级",
              type: "pipeline",
              brief: "风险升级与应急响应",
              input: ["风险状态"],
              output: ["升级工单"]
            }
          ]
        }
      ]
    },
    {
      id: "ui",
      name: "UI设计与前端",
      tagline: "设计系统到前端生成的完整链路",
      color: "#8B5CF6",
      icon: "palette",
      modules: [
        {
          id: "ui-01-design-system",
          name: "UI设计系统",
          description: "设计令牌、组件库、设计系统文档",
          orchestrators: [
            {
              id: "design-system-orchestrator",
              name: "设计系统指挥官",
              type: "orchestrator",
              description: "调度设计系统全流程：设计令牌、组件库、系统文档",
              children: [
                "design-token",
                "component-library",
                "design-system-doc"
              ]
            }
          ],
          skills: [
            {
              id: "design-token",
              name: "设计令牌",
              type: "pipeline",
              brief: "定义设计令牌与变量体系",
              input: ["品牌规范"],
              output: ["设计令牌"]
            },
            {
              id: "component-library",
              name: "组件库",
              type: "pipeline",
              brief: "构建UI组件库",
              input: ["设计令牌"],
              output: ["组件库"]
            },
            {
              id: "design-system-doc",
              name: "设计系统文档",
              type: "pipeline",
              brief: "编写设计系统文档",
              input: ["组件库"],
              output: ["系统文档"]
            }
          ]
        },
        {
          id: "ui-02-ui-frontend",
          name: "UI前端生成",
          description: "组件生成、页面组装、交互设计、UI审查、前端测试",
          orchestrators: [
            {
              id: "ui-frontend-orchestrator",
              name: "UI前端指挥官",
              type: "orchestrator",
              description: "调度UI前端生成全流程：组件生成、页面组装、交互设计、UI审查、前端测试",
              children: [
                "ui-component-gen",
                "page-assembly",
                "interaction-design",
                "ui-review",
                "frontend-test"
              ]
            }
          ],
          skills: [
            {
              id: "ui-component-gen",
              name: "组件生成",
              type: "pipeline",
              brief: "生成UI组件代码",
              input: ["设计规范"],
              output: ["组件代码"]
            },
            {
              id: "page-assembly",
              name: "页面组装",
              type: "pipeline",
              brief: "组装页面与布局",
              input: ["页面结构", "组件代码"],
              output: ["页面代码"]
            },
            {
              id: "interaction-design",
              name: "交互设计",
              type: "pipeline",
              brief: "设计交互行为与动效",
              input: ["交互规格"],
              output: ["交互代码"]
            },
            {
              id: "ui-review",
              name: "UI审查",
              type: "pipeline",
              brief: "审查UI实现质量与一致性",
              input: ["页面代码"],
              output: ["审查报告"]
            },
            {
              id: "frontend-test",
              name: "前端测试",
              type: "pipeline",
              brief: "前端自动化测试",
              input: ["页面代码"],
              output: ["测试报告"]
            }
          ]
        },
        {
          id: "ui-03-frontend-integration",
          name: "前端集成",
          description: "API对接、构建部署、性能优化",
          orchestrators: [
            {
              id: "frontend-integration-orchestrator",
              name: "前端集成指挥官",
              type: "orchestrator",
              description: "调度前端集成全流程：API对接、构建部署、性能优化",
              children: [
                "api-contract-consume",
                "frontend-build-deploy",
                "frontend-performance"
              ]
            }
          ],
          skills: [
            {
              id: "api-contract-consume",
              name: "API对接",
              type: "pipeline",
              brief: "消费API契约对接后端",
              input: ["API契约"],
              output: ["对接代码"]
            },
            {
              id: "frontend-build-deploy",
              name: "构建部署",
              type: "pipeline",
              brief: "前端构建与部署",
              input: ["页面代码"],
              output: ["部署产物"]
            },
            {
              id: "frontend-performance",
              name: "性能优化",
              type: "pipeline",
              brief: "前端性能优化",
              input: ["性能数据"],
              output: ["优化方案"]
            }
          ]
        }
      ]
    },
    {
      id: "backend",
      name: "后端架构与开发",
      tagline: "API设计到架构落地的工程体系",
      color: "#0EA5E9",
      icon: "server",
      modules: [
        {
          id: "backend-01-api-design",
          name: "API设计",
          description: "API契约、API安全、认证授权",
          orchestrators: [
            {
              id: "api-design-orchestrator",
              name: "API设计指挥官",
              type: "orchestrator",
              description: "调度API设计全流程：API契约、API安全、认证授权",
              children: [
                "api-contract",
                "api-security",
                "auth-design"
              ]
            }
          ],
          skills: [
            {
              id: "api-contract",
              name: "API契约",
              type: "pipeline",
              brief: "定义API契约与接口规范",
              input: ["PRD文档"],
              output: ["API契约"]
            },
            {
              id: "api-security",
              name: "API安全",
              type: "pipeline",
              brief: "设计API安全策略",
              input: ["API契约"],
              output: ["安全策略"]
            },
            {
              id: "auth-design",
              name: "认证授权",
              type: "pipeline",
              brief: "设计认证授权方案",
              input: ["安全需求"],
              output: ["认证方案"]
            }
          ]
        },
        {
          id: "backend-02-data-architecture",
          name: "数据架构",
          description: "数据模型、缓存策略、数据迁移",
          orchestrators: [
            {
              id: "data-architecture-orchestrator",
              name: "数据架构指挥官",
              type: "orchestrator",
              description: "调度数据架构全流程：数据模型、缓存策略、数据迁移",
              children: [
                "data-model",
                "cache-strategy",
                "data-migration"
              ]
            }
          ],
          skills: [
            {
              id: "data-model",
              name: "数据模型",
              type: "pipeline",
              brief: "设计数据模型与表结构",
              input: ["业务需求"],
              output: ["数据模型"]
            },
            {
              id: "cache-strategy",
              name: "缓存策略",
              type: "pipeline",
              brief: "制定缓存策略与方案",
              input: ["访问模式"],
              output: ["缓存策略"]
            },
            {
              id: "data-migration",
              name: "数据迁移",
              type: "pipeline",
              brief: "规划数据迁移方案",
              input: ["数据模型变更"],
              output: ["迁移方案"]
            }
          ]
        },
        {
          id: "backend-03-backend-architecture",
          name: "后端架构",
          description: "架构模式、服务设计、后端审查",
          orchestrators: [
            {
              id: "backend-architecture-orchestrator",
              name: "后端架构指挥官",
              type: "orchestrator",
              description: "调度后端架构全流程：架构模式、服务设计、后端审查",
              children: [
                "architecture-pattern",
                "service-design",
                "backend-review"
              ]
            }
          ],
          skills: [
            {
              id: "architecture-pattern",
              name: "架构模式",
              type: "pipeline",
              brief: "选择与设计架构模式",
              input: ["系统需求"],
              output: ["架构方案"]
            },
            {
              id: "service-design",
              name: "服务设计",
              type: "pipeline",
              brief: "设计服务划分与通信",
              input: ["架构方案"],
              output: ["服务设计"]
            },
            {
              id: "backend-review",
              name: "后端审查",
              type: "pipeline",
              brief: "后端代码审查与评估",
              input: ["代码变更"],
              output: ["审查报告"]
            }
          ]
        }
      ]
    },
    {
      id: "cross",
      name: "跨领域协调",
      tagline: "跨领域编排与全局协调",
      color: "#F59E0B",
      icon: "link",
      modules: [],
      orchestrators: [
        {
          id: "product-launch-orchestrator",
          name: "产品启动总指挥",
          type: "orchestrator",
          description: "从0到1做新产品时使用，协调PM/UI/Backend三大领域子编排器的全流程并行构建与集成",
          children: [
            "insight-orchestrator",
            "market-orchestrator",
            "business-orchestrator",
            "positioning-orchestrator",
            "design-orchestrator",
            "metrics-orchestrator",
            "api-design-orchestrator",
            "design-system-orchestrator",
            "data-architecture-orchestrator",
            "backend-architecture-orchestrator",
            "ui-frontend-orchestrator",
            "frontend-integration-orchestrator",
            "quality-orchestrator",
            "release-orchestrator",
            "retrospective-orchestrator"
          ]
        },
        {
          id: "product-iteration-orchestrator",
          name: "产品迭代总指挥",
          type: "orchestrator",
          description: "对已有产品进行功能迭代时使用，根据需求变更影响范围协调PM/UI/Backend子编排器的增量更新和集成交付",
          children: [
            "requirements-orchestrator",
            "design-orchestrator",
            "api-design-orchestrator",
            "design-system-orchestrator",
            "data-architecture-orchestrator",
            "backend-architecture-orchestrator",
            "ui-frontend-orchestrator",
            "frontend-integration-orchestrator",
            "quality-orchestrator",
            "release-orchestrator"
          ]
        }
      ]
    }
  ],
  contracts: [
    {
      id: "contract-prd-api",
      name: "PRD",
      from: "design-prd",
      to: "api-contract",
      fromDomain: "pm",
      toDomain: "backend",
      description: "PRD传递产品需求到API契约设计"
    },
    {
      id: "contract-prd-page",
      name: "PRD",
      from: "design-prd",
      to: "page-assembly",
      fromDomain: "pm",
      toDomain: "ui",
      description: "PRD传递产品需求到页面组装"
    },
    {
      id: "contract-positioning-token",
      name: "定位陈述",
      from: "positioning-statement",
      to: "design-token",
      fromDomain: "pm",
      toDomain: "ui",
      description: "定位陈述传递品牌基因到设计令牌"
    },
    {
      id: "contract-ia-page",
      name: "IA/原型",
      from: "design-ia",
      to: "page-assembly",
      fromDomain: "pm",
      toDomain: "ui",
      description: "信息架构传递页面结构到页面组装"
    },
    {
      id: "contract-userflow-interaction",
      name: "用户流程",
      from: "design-userflow",
      to: "interaction-design",
      fromDomain: "pm",
      toDomain: "ui",
      description: "用户流程传递交互逻辑到交互设计"
    },
    {
      id: "contract-prototype-component",
      name: "原型",
      from: "design-prototype",
      to: "ui-component-gen",
      fromDomain: "pm",
      toDomain: "ui",
      description: "交互原型传递组件规格到组件生成"
    },
    {
      id: "contract-api-consume",
      name: "OpenAPI契约",
      from: "api-contract",
      to: "api-contract-consume",
      fromDomain: "backend",
      toDomain: "ui",
      description: "API契约传递接口规范到前端对接"
    },
    {
      id: "contract-datamodel-api",
      name: "数据模型",
      from: "data-model",
      to: "api-contract",
      fromDomain: "backend",
      toDomain: "backend",
      description: "数据模型约束API契约的数据结构"
    },
    {
      id: "contract-metrics-analysis",
      name: "指标体系",
      from: "metrics-system",
      to: "analysis-anomaly",
      fromDomain: "pm",
      toDomain: "pm",
      description: "指标体系定义异常检测的监控基准"
    },
    {
      id: "contract-tracking-page",
      name: "埋点方案",
      from: "tracking-plan",
      to: "page-assembly",
      fromDomain: "pm",
      toDomain: "ui",
      description: "埋点方案传递采集规范到页面组装"
    },
    {
      id: "contract-acceptance-review",
      name: "验收标准",
      from: "quality-auto-acceptance",
      to: "backend-review",
      fromDomain: "pm",
      toDomain: "backend",
      description: "验收标准传递质量要求到后端审查"
    },
    {
      id: "contract-token-page",
      name: "设计令牌",
      from: "design-token",
      to: "page-assembly",
      fromDomain: "ui",
      toDomain: "ui",
      description: "设计令牌传递样式变量到页面组装"
    }
  ]
};
