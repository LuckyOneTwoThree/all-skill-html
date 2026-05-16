var SKILLS_DATA = {
  domains: [
    {
      id: "pm",
      name: "产品方法论",
      tagline: "做正确的事：从探索发现到增长运营",
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
          description: "从市场、用户、需求、机会四个维度探索产品方向",
          orchestrators: [
            {
              id: "insight-orchestrator",
              name: "需求洞察指挥官",
              type: "orchestrator",
              description: "调度需求洞察全流程",
              children: ["insight-analysis"]
            },
            {
              id: "market-orchestrator",
              name: "市场分析指挥官",
              type: "orchestrator",
              description: "调度市场分析全流程",
              children: ["market-tam-som", "market-pest", "market-competitor-analysis"]
            },
            {
              id: "opportunity-orchestrator",
              name: "机会识别指挥官",
              type: "orchestrator",
              description: "调度机会识别全流程",
              children: ["opportunity-definition"]
            },
            {
              id: "user-research-orchestrator",
              name: "用户研究指挥官",
              type: "orchestrator",
              description: "调度用户研究全流程",
              children: ["user-research-voice-analysis", "user-research-behavior-analysis", "user-research-user-modeling", "user-research-interview-assist", "user-research-report"]
            }
          ],
          skills: [
            { id: "insight-analysis", name: "需求洞察分析", type: "pipeline", brief: "需求优先级", input: ["用户反馈"], output: ["需求优先级"] },
            { id: "market-tam-som", name: "市场规模估算", type: "pipeline", brief: "TAM/SOM/SAM分析", input: ["市场数据"], output: ["市场规模报告"] },
            { id: "market-pest", name: "PEST分析", type: "pipeline", brief: "宏观环境分析", input: ["行业信息"], output: ["PEST分析"] },
            { id: "market-competitor-analysis", name: "竞品分析", type: "pipeline", brief: "竞品分析报告+差异化策略", input: ["竞品数据"], output: ["竞品分析报告"] },
            { id: "opportunity-definition", name: "机会定义", type: "pipeline", brief: "机会简报", input: ["调研数据"], output: ["机会简报"] },
            { id: "user-research-voice-analysis", name: "用户声音分析", type: "pipeline", brief: "分析用户声音与反馈情感", input: ["用户反馈数据"], output: ["声音分析报告"] },
            { id: "user-research-behavior-analysis", name: "用户行为分析", type: "pipeline", brief: "分析用户行为数据与模式", input: ["行为事件数据"], output: ["行为分析报告"] },
            { id: "user-research-user-modeling", name: "用户建模", type: "pipeline", brief: "构建用户画像与分群模型", input: ["声音分析", "行为分析"], output: ["用户画像"] },
            { id: "user-research-interview-assist", name: "访谈辅助", type: "pipeline", brief: "辅助用户访谈与记录提取", input: ["访谈提纲"], output: ["访谈记录"] },
            { id: "user-research-report", name: "用户研究报告", type: "pipeline", brief: "生成用户研究综合报告", input: ["研究数据"], output: ["用户研究报告"] }
          ]
        },
        {
          id: "pm-02-strategy",
          name: "产品商业与战略",
          description: "从商业模式、战略规划、产品定位、Stakeholder对齐四个维度确定战略方向",
          orchestrators: [
            {
              id: "business-orchestrator",
              name: "商业分析指挥官",
              type: "orchestrator",
              description: "调度商业分析全流程",
              children: ["business-model-canvas", "business-value-fit", "business-pricing", "business-strategy-report"]
            },
            {
              id: "planning-orchestrator",
              name: "战略规划指挥官",
              type: "orchestrator",
              description: "调度战略规划全流程",
              children: ["product-proposal", "strategic-analysis", "planning-okr", "planning-north-star", "planning-roadmap"]
            },
            {
              id: "positioning-orchestrator",
              name: "产品定位指挥官",
              type: "orchestrator",
              description: "调度产品定位全流程",
              children: ["positioning-strategy"]
            },
            {
              id: "stakeholder-orchestrator",
              name: "Stakeholder指挥官",
              type: "orchestrator",
              description: "调度Stakeholder对齐全流程",
              children: ["stakeholder-analysis"]
            }
          ],
          skills: [
            { id: "business-model-canvas", name: "商业模式画布", type: "pipeline", brief: "绘制商业模式画布", input: ["业务信息"], output: ["商业模式画布"] },
            { id: "business-value-fit", name: "价值匹配评估", type: "pipeline", brief: "评估价值主张与市场匹配度", input: ["价值主张"], output: ["匹配度评估"] },
            { id: "business-pricing", name: "定价策略", type: "pipeline", brief: "制定产品定价策略", input: ["成本与竞品数据"], output: ["定价策略"] },
            { id: "business-strategy-report", name: "商业战略报告", type: "pipeline", brief: "生成商业战略综合报告", input: ["商业分析"], output: ["战略报告"] },
            { id: "product-proposal", name: "产品提案", type: "pipeline", brief: "产品提案+OKR+路线图", input: ["战略方向"], output: ["产品提案"] },
            { id: "strategic-analysis", name: "战略分析", type: "pipeline", brief: "战略规划分析", input: ["业务数据"], output: ["战略分析"] },
            { id: "planning-okr", name: "OKR制定", type: "pipeline", brief: "制定OKR目标与关键结果", input: ["战略方向"], output: ["OKR"] },
            { id: "planning-north-star", name: "北极星指标", type: "pipeline", brief: "定义产品北极星指标", input: ["业务目标"], output: ["北极星指标"] },
            { id: "planning-roadmap", name: "产品路线图", type: "pipeline", brief: "规划产品路线图", input: ["需求与目标"], output: ["路线图"] },
            { id: "positioning-strategy", name: "定位策略", type: "pipeline", brief: "定位陈述 → 消费方：ui project-init", input: ["市场与用户信息"], output: ["定位陈述"] },
            { id: "stakeholder-analysis", name: "Stakeholder分析", type: "pipeline", brief: "战略简报", input: ["项目信息"], output: ["战略简报"] }
          ]
        },
        {
          id: "pm-03-design",
          name: "产品构思与设计",
          description: "从创意发散、产品设计、方案验证、变更影响分析四个维度将战略转化为可执行方案",
          orchestrators: [
            {
              id: "ideation-orchestrator",
              name: "创意发散指挥官",
              type: "orchestrator",
              description: "调度创意发散全流程",
              children: ["ideation-workshop"]
            },
            {
              id: "design-orchestrator",
              name: "产品设计指挥官",
              type: "orchestrator",
              description: "调度产品设计全流程",
              children: ["design-prd", "design-ia", "design-userflow", "design-prototype", "interaction-spec", "design-handoff-spec", "change-impact-analysis"]
            },
            {
              id: "validation-orchestrator",
              name: "方案验证指挥官",
              type: "orchestrator",
              description: "调度方案验证全流程",
              children: ["validation-assumption-map", "validation-mvp", "validation-experiment", "validation-usability"]
            }
          ],
          skills: [
            { id: "ideation-workshop", name: "创意工作坊", type: "pipeline", brief: "Top5方案", input: ["问题定义"], output: ["创意方案"] },
            { id: "design-prd", name: "PRD生成", type: "pipeline", brief: "编写产品需求文档 → 消费方：ui page-builder / backend api-design", input: ["需求与方案"], output: ["PRD文档"] },
            { id: "design-ia", name: "信息架构", type: "pipeline", brief: "设计信息架构与内容组织", input: ["需求文档"], output: ["信息架构图"] },
            { id: "design-userflow", name: "用户流程", type: "pipeline", brief: "设计用户操作流程", input: ["信息架构"], output: ["用户流程图"] },
            { id: "design-prototype", name: "交互原型", type: "pipeline", brief: "生成交互原型", input: ["用户流程"], output: ["交互原型"] },
            { id: "interaction-spec", name: "交互规格说明", type: "pipeline", brief: "编写交互规格说明", input: ["交互原型"], output: ["交互规格"] },
            { id: "design-handoff-spec", name: "设计交接规范", type: "pipeline", brief: "生成设计交付规范", input: ["设计稿"], output: ["交付规范"] },
            { id: "change-impact-analysis", name: "变更影响分析", type: "pipeline", brief: "分析变更影响范围", input: ["变更请求"], output: ["影响分析报告"] },
            { id: "validation-assumption-map", name: "假设地图", type: "pipeline", brief: "识别与映射核心假设", input: ["产品方案"], output: ["假设地图"] },
            { id: "validation-mvp", name: "MVP定义", type: "pipeline", brief: "定义最小可行产品范围", input: ["假设地图"], output: ["MVP范围"] },
            { id: "validation-experiment", name: "验证实验", type: "pipeline", brief: "设计验证实验方案", input: ["核心假设"], output: ["实验方案"] },
            { id: "validation-usability", name: "可用性测试", type: "pipeline", brief: "执行可用性测试与评估", input: ["原型"], output: ["可用性报告"] }
          ]
        },
        {
          id: "pm-04-metrics-design",
          name: "产品度量设计",
          description: "在开发前建立度量体系，确保上线后可量化可追踪",
          orchestrators: [
            {
              id: "metrics-orchestrator",
              name: "度量设计指挥官",
              type: "orchestrator",
              description: "调度度量设计全流程",
              children: ["metrics-system", "tracking-plan", "metrics-dashboard"]
            }
          ],
          skills: [
            { id: "metrics-system", name: "指标体系", type: "pipeline", brief: "设计产品指标体系框架 → 消费方：pm analysis / monitoring", input: ["业务目标"], output: ["指标体系"] },
            { id: "tracking-plan", name: "埋点方案", type: "pipeline", brief: "制定埋点方案与采集规范 → 消费方：ui page-builder", input: ["指标体系"], output: ["埋点方案"] },
            { id: "metrics-dashboard", name: "数据看板", type: "pipeline", brief: "设计数据看板与可视化", input: ["指标体系"], output: ["看板设计"] }
          ]
        },
        {
          id: "pm-05-metrics-ops",
          name: "产品度量运营",
          description: "上线后通过数据分析、决策闭环、实验验证持续优化",
          orchestrators: [
            {
              id: "analysis-orchestrator",
              name: "数据分析指挥官",
              type: "orchestrator",
              description: "调度数据分析全流程",
              children: ["analysis-anomaly", "analysis-funnel", "analysis-retention", "data-analysis-report"]
            },
            {
              id: "decision-orchestrator",
              name: "决策闭环指挥官",
              type: "orchestrator",
              description: "调度决策闭环全流程",
              children: ["decision-dace", "decision-culture"]
            },
            {
              id: "experiment-orchestrator",
              name: "实验验证指挥官",
              type: "orchestrator",
              description: "调度实验验证全流程",
              children: ["experiment-design", "experiment-execution"]
            }
          ],
          skills: [
            { id: "analysis-anomaly", name: "异常检测", type: "pipeline", brief: "检测数据异常与波动", input: ["指标数据"], output: ["异常报告"] },
            { id: "analysis-funnel", name: "漏斗分析", type: "pipeline", brief: "分析转化漏斗与流失", input: ["用户行为数据"], output: ["漏斗分析"] },
            { id: "analysis-retention", name: "留存分析", type: "pipeline", brief: "分析用户留存与生命周期", input: ["用户数据"], output: ["留存分析"] },
            { id: "data-analysis-report", name: "数据分析报告", type: "pipeline", brief: "生成数据分析综合报告", input: ["分析结果"], output: ["数据洞察报告"] },
            { id: "decision-dace", name: "DACE决策评估", type: "pipeline", brief: "数据驱动决策评估", input: ["数据与选项"], output: ["决策建议"] },
            { id: "decision-culture", name: "决策文化", type: "pipeline", brief: "建立数据驱动决策文化", input: ["组织信息"], output: ["文化建议"] },
            { id: "experiment-design", name: "实验设计", type: "pipeline", brief: "设计A/B测试实验方案", input: ["假设与指标"], output: ["实验方案"] },
            { id: "experiment-execution", name: "实验执行", type: "pipeline", brief: "执行实验与监控数据", input: ["实验方案"], output: ["A/B测试报告"] }
          ]
        },
        {
          id: "pm-06-growth",
          name: "产品增长与运营",
          description: "围绕AARRR模型的获客、激活、留存、变现四个维度驱动增长",
          orchestrators: [
            {
              id: "growth-orchestrator",
              name: "增长总指挥",
              type: "orchestrator",
              description: "调度增长战略全流程",
              children: ["growth-model", "growth-strategy-report", "gtm-strategy", "product-operations-manual"]
            },
            {
              id: "acquisition-orchestrator",
              name: "获客指挥官",
              type: "orchestrator",
              description: "调度获客全流程",
              children: ["acquisition-analysis"]
            },
            {
              id: "activation-orchestrator",
              name: "激活指挥官",
              type: "orchestrator",
              description: "调度激活全流程",
              children: ["activation-aha", "activation-onboarding"]
            },
            {
              id: "retention-orchestrator",
              name: "留存指挥官",
              type: "orchestrator",
              description: "调度留存全流程",
              children: ["retention-management"]
            },
            {
              id: "revenue-orchestrator",
              name: "变现指挥官",
              type: "orchestrator",
              description: "调度变现全流程",
              children: ["revenue-funnel", "revenue-nrr", "revenue-upsell"]
            }
          ],
          skills: [
            { id: "growth-model", name: "增长模型", type: "pipeline", brief: "构建产品增长模型", input: ["业务数据"], output: ["增长模型"] },
            { id: "growth-strategy-report", name: "增长策略报告", type: "pipeline", brief: "增长策略报告+GTM策略+运营手册", input: ["增长模型"], output: ["增长策略报告"] },
            { id: "gtm-strategy", name: "GTM策略", type: "pipeline", brief: "制定产品上市策略", input: ["产品与市场信息"], output: ["GTM策略"] },
            { id: "product-operations-manual", name: "产品运营手册", type: "pipeline", brief: "编写产品运营手册", input: ["运营流程"], output: ["运营手册"] },
            { id: "acquisition-analysis", name: "获客分析", type: "pipeline", brief: "渠道评估+漏斗优化", input: ["用户画像"], output: ["渠道策略"] },
            { id: "activation-aha", name: "Aha时刻", type: "pipeline", brief: "识别与优化Aha时刻", input: ["用户行为数据"], output: ["Aha时刻"] },
            { id: "activation-onboarding", name: "用户引导", type: "pipeline", brief: "设计用户引导流程", input: ["产品功能"], output: ["引导方案"] },
            { id: "retention-management", name: "留存管理", type: "pipeline", brief: "流失预警+分层运营", input: ["用户数据"], output: ["留存策略"] },
            { id: "revenue-funnel", name: "营收漏斗", type: "pipeline", brief: "分析营收漏斗与转化", input: ["营收数据"], output: ["营收漏斗"] },
            { id: "revenue-nrr", name: "净收入留存", type: "pipeline", brief: "计算净收入留存率", input: ["客户数据"], output: ["NRR分析"] },
            { id: "revenue-upsell", name: "增购策略", type: "pipeline", brief: "制定增购与交叉销售策略", input: ["客户数据"], output: ["增购策略"] }
          ]
        },
        {
          id: "pm-07-monitoring",
          name: "产品监控与迭代",
          description: "通过监控预警、问题诊断、迭代优化、质量验收、发布管理形成持续改进闭环",
          orchestrators: [
            {
              id: "monitoring-orchestrator",
              name: "监控预警指挥官",
              type: "orchestrator",
              description: "调度监控预警全流程",
              children: ["monitoring-pipeline", "user-feedback-loop-report", "quality-acceptance"]
            },
            {
              id: "diagnosis-orchestrator",
              name: "问题诊断指挥官",
              type: "orchestrator",
              description: "调度问题诊断全流程",
              children: ["diagnosis-health", "diagnosis-competition", "competitor-monitoring-report", "product-sunset-plan"]
            },
            {
              id: "iteration-orchestrator",
              name: "迭代优化指挥官",
              type: "orchestrator",
              description: "调度迭代优化全流程",
              children: ["iteration-decision", "release-gradual", "release-auto-checklist", "release-notes"]
            }
          ],
          skills: [
            { id: "monitoring-pipeline", name: "监控体系", type: "pipeline", brief: "搭建产品监控体系", input: ["关键指标"], output: ["监控体系"] },
            { id: "user-feedback-loop-report", name: "用户反馈闭环", type: "pipeline", brief: "用户反馈闭环报告", input: ["反馈数据"], output: ["反馈报告"] },
            { id: "quality-acceptance", name: "质量验收", type: "pipeline", brief: "质量验收", input: ["验收标准"], output: ["验收报告"] },
            { id: "diagnosis-health", name: "健康度诊断", type: "pipeline", brief: "诊断产品健康度", input: ["监控数据"], output: ["健康报告"] },
            { id: "diagnosis-competition", name: "竞争态势诊断", type: "pipeline", brief: "诊断竞争态势变化", input: ["竞品动态"], output: ["竞争诊断"] },
            { id: "competitor-monitoring-report", name: "竞品监控报告", type: "pipeline", brief: "生成竞品监控报告", input: ["竞品数据"], output: ["监控报告"] },
            { id: "product-sunset-plan", name: "产品下线方案", type: "pipeline", brief: "制定产品退市计划", input: ["产品数据"], output: ["下线方案"] },
            { id: "iteration-decision", name: "迭代决策", type: "pipeline", brief: "Backlog优化", input: ["反馈与数据"], output: ["迭代决策"] },
            { id: "release-gradual", name: "灰度发布", type: "pipeline", brief: "规划灰度发布策略", input: ["发布计划"], output: ["灰度策略"] },
            { id: "release-auto-checklist", name: "发布检查清单", type: "pipeline", brief: "自动生成发布检查清单", input: ["发布内容"], output: ["检查清单"] },
            { id: "release-notes", name: "发布说明", type: "pipeline", brief: "自动生成版本发布说明", input: ["变更记录"], output: ["发布说明"] }
          ]
        },
        {
          id: "pm-08-project",
          name: "项目管理与执行",
          description: "贯穿全程的项目规划、敏捷执行和风险管理",
          orchestrators: [
            {
              id: "project-planning-orchestrator",
              name: "项目规划指挥官",
              type: "orchestrator",
              description: "调度项目规划全流程",
              children: ["planning-project-charter", "planning-resource", "planning-kickoff"]
            },
            {
              id: "agile-orchestrator",
              name: "敏捷执行指挥官",
              type: "orchestrator",
              description: "调度敏捷执行全流程",
              children: ["agile-sprint-planning", "agile-daily-sync", "agile-review"]
            },
            {
              id: "risk-orchestrator",
              name: "风险管理指挥官",
              type: "orchestrator",
              description: "调度风险管理全流程",
              children: ["risk-identification", "risk-management"]
            }
          ],
          skills: [
            { id: "planning-project-charter", name: "项目章程", type: "pipeline", brief: "编写项目章程与授权", input: ["项目信息"], output: ["项目章程"] },
            { id: "planning-resource", name: "资源规划", type: "pipeline", brief: "规划项目资源与分配", input: ["项目章程"], output: ["资源计划"] },
            { id: "planning-kickoff", name: "项目启动", type: "pipeline", brief: "组织项目启动会", input: ["项目章程"], output: ["启动会议程"] },
            { id: "agile-sprint-planning", name: "Sprint规划", type: "pipeline", brief: "规划Sprint目标与任务", input: ["需求池"], output: ["Sprint计划"] },
            { id: "agile-daily-sync", name: "每日同步", type: "pipeline", brief: "同步每日进展与阻碍", input: ["Sprint数据"], output: ["站会纪要"] },
            { id: "agile-review", name: "迭代复盘", type: "pipeline", brief: "迭代复盘（含迭代复盘）", input: ["Sprint成果"], output: ["复盘记录"] },
            { id: "risk-identification", name: "风险识别", type: "pipeline", brief: "识别项目风险与等级", input: ["项目信息"], output: ["风险清单"] },
            { id: "risk-management", name: "风险管理", type: "pipeline", brief: "风险登记册+监控+升级", input: ["风险清单"], output: ["风险状态"] }
          ]
        }
      ]
    },
    {
      id: "ui",
      name: "UI设计与前端",
      tagline: "正确地呈现：设计即实现，令牌驱动",
      color: "#8B5CF6",
      icon: "palette",
      modules: [
        {
          id: "ui-01-design-system",
          name: "设计系统",
          description: "项目初始化+视觉风格：框架选型、目录结构、依赖安装、从品牌规范推导设计令牌",
          orchestrators: [],
          skills: [
            { id: "project-init", name: "项目初始化", type: "pipeline", brief: "项目初始化+设计系统建立 → 输入：pm PRD + positioning-strategy + 品牌规范", input: ["PRD", "定位策略", "品牌规范"], output: ["项目骨架", "设计令牌", "PRODUCT.md", "DESIGN.md"] }
          ]
        },
        {
          id: "ui-02-ui-frontend",
          name: "UI前端",
          description: "组件生成+页面组装+UI审查：基于设计系统生成前端组件，组装为完整页面",
          orchestrators: [],
          skills: [
            { id: "page-builder", name: "页面构建", type: "pipeline", brief: "组件生成+页面组装+UI审查 → 输入：project-init + pm PRD/原型/IA + pm tracking-plan", input: ["设计系统", "PRD", "原型", "IA", "埋点方案"], output: ["页面代码", "审查报告"] }
          ]
        },
        {
          id: "ui-03-frontend-integration",
          name: "前端集成",
          description: "API联调+生产就绪：基于OpenAPI生成前端请求层+类型+Mock",
          orchestrators: [],
          skills: [
            { id: "api-integration", name: "API集成", type: "pipeline", brief: "前后端联调桥梁 → 输入：backend api-design-spec", input: ["OpenAPI契约"], output: ["请求层", "类型定义", "Mock"] },
            { id: "production-ready", name: "生产就绪", type: "pipeline", brief: "构建配置+CI/CD+CDN + 性能优化 + 自动测试", input: ["页面代码"], output: ["生产构建", "测试报告"] }
          ]
        },
        {
          id: "ui-orchestrator",
          name: "UI统一编排器",
          description: "UI全流程统一编排，支持 express/prototype/full/progressive 四种执行模式",
          orchestrators: [
            {
              id: "ui-orchestrator",
              name: "ui-orchestrator",
              type: "orchestrator",
              description: "统一编排器，按需跳过：已完成或不需要的阶段可直接跳过",
              children: ["project-init", "page-builder", "api-integration", "production-ready"]
            }
          ],
          skills: []
        },
        {
          id: "ui-extensions",
          name: "外部扩展",
          description: "4个外部扩展Skill：ext-frontend-design / ext-impeccable / ext-interaction-design / ext-ui-ux-pro-max",
          orchestrators: [],
          skills: [
            { id: "ext-frontend-design", name: "ext-frontend-design", type: "extension", brief: "视觉差异化设计 → stage-2必调", input: ["设计系统"], output: ["视觉设计"] },
            { id: "ext-impeccable", name: "ext-impeccable", type: "extension", brief: "colorize/typeset/layout/shape/animate/bolder/quieter/delight/clarify/onboard/distill/audit/critique/harden/polish/optimize", input: ["页面代码"], output: ["优化代码"] },
            { id: "ext-interaction-design", name: "ext-interaction-design", type: "extension", brief: "交互动效模式 → stage-4 / stage-e express模式", input: ["交互规格"], output: ["动效代码"] },
            { id: "ext-ui-ux-pro-max", name: "ext-ui-ux-pro-max", type: "extension", brief: "数据驱动设计推荐 → stage-2 --design-system / stage-4 --domain / stage-e express模式", input: ["设计需求"], output: ["设计推荐"] }
          ]
        }
      ]
    },
    {
      id: "backend",
      name: "后端架构与开发",
      tagline: "正确地构建：设计先行，审查后实现",
      color: "#0EA5E9",
      icon: "server",
      modules: [
        {
          id: "backend-01-api-design",
          name: "API设计",
          description: "契约驱动开发，安全内建而非外挂。资源识别→接口设计→安全设计→认证鉴权→合规检查",
          orchestrators: [
            {
              id: "api-design-orchestrator",
              name: "API设计指挥官",
              type: "orchestrator",
              description: "调度API设计全流程",
              children: ["api-design-spec", "api-design-impl"]
            }
          ],
          skills: [
            { id: "api-design-spec", name: "API设计规范", type: "pipeline", brief: "资源识别→接口设计→安全设计→认证鉴权→合规检查 → 人类审查", input: ["PRD", "前端页面数据需求"], output: ["openapi.yaml", "安全策略", "认证鉴权方案"] },
            { id: "api-design-impl", name: "API设计实现", type: "pipeline", brief: "代码骨架→Service实现→中间件→对齐检查→测试生成", input: ["api-design-spec产出"], output: ["代码写入{project_dir}/src/"] }
          ]
        },
        {
          id: "backend-02-data-architecture",
          name: "数据架构",
          description: "模型决定上限，缓存决定下限，迁移可回滚。数据字典→ER建模→表结构索引→缓存策略→迁移方案",
          orchestrators: [
            {
              id: "data-architecture-orchestrator",
              name: "数据架构指挥官",
              type: "orchestrator",
              description: "调度数据架构全流程",
              children: ["data-architecture-spec", "data-architecture-impl"]
            }
          ],
          skills: [
            { id: "data-architecture-spec", name: "数据架构规范", type: "pipeline", brief: "数据字典→ER建模→表结构索引→缓存策略→迁移方案 → 人类审查", input: ["PRD", "api-design-spec"], output: ["er_model.json", "缓存策略", "迁移方案"] },
            { id: "data-architecture-impl", name: "数据架构实现", type: "pipeline", brief: "Model→Migration→Repository→缓存层→对齐检查→测试生成", input: ["data-architecture-spec产出"], output: ["代码写入{project_dir}/src/"] }
          ]
        },
        {
          id: "backend-03-backend-architecture",
          name: "后端架构",
          description: "架构服务业务，简单方案优先，按需演进。架构模式→ADR→服务设计→后端审查→技术债登记",
          orchestrators: [
            {
              id: "backend-architecture-orchestrator",
              name: "后端架构指挥官",
              type: "orchestrator",
              description: "调度后端架构全流程",
              children: ["backend-architecture-spec", "backend-architecture-impl"]
            }
          ],
          skills: [
            { id: "backend-architecture-spec", name: "后端架构规范", type: "pipeline", brief: "架构模式→ADR→服务设计→后端审查→技术债登记 → 人类审查", input: ["PRD", "api-design-spec", "data-architecture-spec"], output: ["review_report.json"] },
            { id: "backend-architecture-impl", name: "后端架构实现", type: "pipeline", brief: "app.ts+配置→服务层→基础设施→Docker+CI→对齐检查→测试生成", input: ["backend-architecture-spec产出", "api-design-impl", "data-architecture-impl"], output: ["代码写入{project_dir}/"] }
          ]
        }
      ]
    },
    {
      id: "cross",
      name: "跨领域协调",
      tagline: "全局编排：产品迭代与产品启动",
      color: "#F59E0B",
      icon: "link",
      modules: [],
      orchestrators: [
        {
          id: "product-iteration-orchestrator",
          name: "产品迭代总指挥",
          type: "orchestrator",
          description: "产品迭代总指挥，根据需求变更影响范围调度各领域编排器",
          children: ["requirements", "design", "api-design", "data-architecture", "backend-architecture", "ui", "monitoring", "iteration"]
        },
        {
          id: "product-launch-orchestrator",
          name: "产品启动总指挥",
          type: "orchestrator",
          description: "产品启动总指挥，协调从0到1的全流程并行构建",
          children: ["insight", "market", "business", "positioning", "design", "metrics", "api-design", "data-architecture", "backend-architecture", "ui", "monitoring", "iteration", "agile"]
        }
      ]
    }
  ],
  contracts: [
    { id: "contract-prd", name: "PRD", from: "design-prd", to: "page-builder", fromDomain: "pm", toDomain: "ui", description: "产品需求是UI和后端设计的共同输入" },
    { id: "contract-prd-api", name: "PRD", from: "design-prd", to: "api-design-spec", fromDomain: "pm", toDomain: "backend", description: "PRD传递产品需求到API契约设计" },
    { id: "contract-positioning", name: "定位陈述", from: "positioning-strategy", to: "project-init", fromDomain: "pm", toDomain: "ui", description: "产品定位决定品牌基因和视觉风格" },
    { id: "contract-brand", name: "品牌规范", from: "positioning-strategy", to: "project-init", fromDomain: "pm", toDomain: "ui", description: "品牌色彩/字体推导设计令牌" },
    { id: "contract-ia", name: "IA/路由结构", from: "design-ia", to: "page-builder", fromDomain: "pm", toDomain: "ui", description: "信息架构决定页面路由和导航" },
    { id: "contract-userflow", name: "用户流程", from: "design-userflow", to: "page-builder", fromDomain: "pm", toDomain: "ui", description: "用户流程定义交互状态机" },
    { id: "contract-prototype", name: "原型", from: "design-prototype", to: "page-builder", fromDomain: "pm", toDomain: "ui", description: "原型指导组件生成和页面组装" },
    { id: "contract-design-token", name: "设计令牌", from: "project-init", to: "api-integration", fromDomain: "ui", toDomain: "ui", description: "令牌驱动错误样式和一致性检查" },
    { id: "contract-design-brief", name: "设计简报", from: "page-builder", to: "ui-orchestrator", fromDomain: "ui", toDomain: "ui", description: "预生成页面级设计决策供编排器调度" },
    { id: "contract-page-manifest", name: "页面清单", from: "ui-orchestrator", to: "page-builder", fromDomain: "ui", toDomain: "ui", description: "预生成页面结构清单指导组件生成" },
    { id: "contract-lang", name: "目标语言", from: "user", to: "ui-orchestrator", fromDomain: "pm", toDomain: "ui", description: "全链路传递，影响字体/排版/文案/i18n" },
    { id: "contract-openapi", name: "OpenAPI契约", from: "api-design-spec", to: "api-integration", fromDomain: "backend", toDomain: "ui", description: "API契约是前后端联调的桥梁" },
    { id: "contract-data-model", name: "数据模型", from: "data-architecture-spec", to: "api-design-spec", fromDomain: "backend", toDomain: "backend", description: "数据模型是API设计的基础" },
    { id: "contract-metrics", name: "指标体系", from: "metrics-system", to: "analysis-anomaly", fromDomain: "pm", toDomain: "pm", description: "度量体系驱动数据分析和监控" },
    { id: "contract-tracking", name: "埋点方案", from: "tracking-plan", to: "page-builder", fromDomain: "pm", toDomain: "ui", description: "埋点方案指导前端数据采集" },
    { id: "contract-backend-review", name: "后端审查报告", from: "backend-architecture-spec", to: "quality-acceptance", fromDomain: "backend", toDomain: "pm", description: "后端审查结果作为验收参考" },
    { id: "contract-api-coverage", name: "API覆盖报告", from: "api-design-spec", to: "quality-acceptance", fromDomain: "backend", toDomain: "pm", description: "PRD/前端对齐覆盖报告" }
  ]
};
