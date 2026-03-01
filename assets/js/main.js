(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const toggleLabel = themeToggle ? themeToggle.querySelector(".toggle-label") : null;
  const languageButtons = Array.from(document.querySelectorAll("[data-lang-option]"));
  const metaDescription = document.querySelector('meta[name="description"]');
  const currentYear = document.getElementById("current-year");
  const darkPreference = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  const themeStorageKey = "portfolio-theme";
  const languageStorageKey = "portfolio-language";

  let activeLanguage = "zh";

  const i18n = {
    zh: {
      "meta.title": "Joey Chui | AI 工程师作品集",
      "meta.description": "Joey Chui 的个人作品集，展示 AI 软件项目、摄影作品、技能与联系方式。",
      "skip.link": "跳转到主要内容",
      "brand.homeAria": "返回首页",
      "nav.aria": "主导航",
      "nav.blog": "博客",
      "nav.about": "关于",
      "nav.projects": "软件",
      "nav.photos": "摄影",
      "nav.skills": "技能专长",
      "nav.contact": "联系方式",
      "lang.switchAria": "切换语言",
      "theme.toggleAria": "切换明暗模式",
      "hero.eyebrow": "AI 工程师与创意技术实践者",
      "hero.title": "构建实用、可靠且富有体验感的 AI 产品。",
      "hero.body": "我是 Joey Chui，一名专注于应用型 AI 与机器学习系统的软件工程师。我致力于打造可投入生产的工具，覆盖对话式 AI、多模态工作流与自动化平台，帮助团队更快交付价值。",
      "hero.ctaProjects": "查看项目",
      "hero.ctaContact": "联系合作",
      "hero.highlight1": "端到端 AI 系统设计",
      "hero.highlight2": "LLM 应用工程化落地",
      "hero.highlight3": "兼顾产品体验的软件交付",
      "hero.panelAria": "职业聚焦",
      "hero.panelTitle": "当前关注方向",
      "hero.panel1": "面向真实业务场景设计高可靠 AI 流程",
      "hero.panel2": "融合 Python、MLOps 与云原生工程能力",
      "hero.panel3": "将数据与模型转化为高质量产品体验",
      "projects.eyebrow": "软件作品",
      "projects.title": "精选 AI 软件项目",
      "projects.body": "这里展示了我在 AI 产品工程、模型编排以及自动化工作流方向的代表性项目。",
      "projects.p1.desc": "多模态智能助手，支持图像理解与报告生成，并可按速度与效果动态路由模型。",
      "projects.p2.desc": "一个用于管理提示词全生命周期的工具，包含模板版本管理、评测流程与发布规则。",
      "projects.p3.desc": "实时分析引擎，结合模型推理与事件流处理，为智能产品提供可执行运营洞察。",
      "projects.link": "GitHub 仓库",
      "photos.eyebrow": "摄影作品集",
      "photos.title": "按主题组织的时间序摄影瀑布流",
      "photos.body": "作品按城市、自然、人像分主题展示，并在每个主题内按照拍摄时间正序排列。",
      "photos.orderNote": "每个主题内：按拍摄时间由早到晚。",
      "photos.theme.nature.title": "自然旅途",
      "photos.theme.nature.desc": "从山野到星空，记录光线与地形的变化。",
      "photos.theme.city.title": "城市几何",
      "photos.theme.city.desc": "记录街道秩序、建筑线条与蓝调夜色。",
      "photos.theme.portrait.title": "人像叙事",
      "photos.theme.portrait.desc": "聚焦人物状态与情绪氛围，保留真实与克制。",
      "photos.tag.nature": "自然",
      "photos.tag.city": "城市",
      "photos.tag.portrait": "人像",
      "photos.alt1": "阳光下穿行于城市街道的人物",
      "photos.alt2": "戏剧性云层下的山地风光",
      "photos.alt3": "蓝调时刻水面倒映的城市天际线",
      "photos.alt4": "群山之上铺满星空的夜晚",
      "photos.alt5": "具有几何线条感的桥梁建筑",
      "photos.alt6": "自然光下的人像特写",
      "skills.eyebrow": "技能与专长",
      "skills.title": "交互式技术栈展示",
      "skills.body": "我的能力覆盖编码开发、AI/ML 系统构建与产品交付流程，适配现代云与数据平台。",
      "skills.tabsAria": "技能分类",
      "skills.tab.ai": "AI / ML",
      "skills.tab.engineering": "工程开发",
      "skills.tab.tools": "开发工具",
      "skills.ai1.name": "Python",
      "skills.ai2.name": "深度学习（PyTorch）",
      "skills.ai3.name": "LLM 应用设计",
      "skills.eng1.name": "TypeScript / Node.js",
      "skills.eng2.name": "API 与后端架构",
      "skills.eng3.name": "系统设计",
      "skills.tools1.name": "Docker 与 Kubernetes",
      "skills.tools2.name": "GitHub Actions",
      "skills.tools3.name": "数据与实验追踪",
      "skills.level.advanced": "高级",
      "skills.level.proficient": "熟练",
      "contact.eyebrow": "联系方式",
      "contact.title": "一起打造有意义的产品",
      "contact.body": "我开放 AI 产品合作、工程咨询与摄影委托。你可以通过社交平台联系我，或直接发送留言。",
      "form.name.label": "姓名",
      "form.name.placeholder": "你的名字",
      "form.email.label": "邮箱",
      "form.email.placeholder": "you@example.com",
      "form.message.label": "留言",
      "form.message.placeholder": "欢迎告诉我你的项目想法...",
      "form.submit": "发送留言",
      "footer.tagline": "以简洁代码与清晰思路持续创造。",
      "footer.top": "回到顶部",
      "form.error.required": "请先填写邮箱和留言内容。",
      "form.success": "感谢留言！已为你打开默认邮件客户端。",
      "form.subjectPrefix": "来自作品集网站的咨询：",
      "form.fromLabel": "姓名",
      "form.emailFieldLabel": "邮箱",
      "form.visitor": "网站访客",
      "form.anonymous": "匿名",
    },
    en: {
      "meta.title": "Joey Chui | AI Engineer Portfolio",
      "meta.description": "Joey Chui's portfolio featuring AI software projects, photography, skills, and contact details.",
      "skip.link": "Skip to content",
      "brand.homeAria": "Go to homepage",
      "nav.aria": "Primary navigation",
      "nav.blog": "Blog",
      "nav.about": "About",
      "nav.projects": "Software",
      "nav.photos": "Photography",
      "nav.skills": "Skills",
      "nav.contact": "Contact",
      "lang.switchAria": "Switch language",
      "theme.toggleAria": "Toggle color mode",
      "hero.eyebrow": "AI Engineer & Creative Technologist",
      "hero.title": "Building AI products that are practical, reliable, and delightful to use.",
      "hero.body": "I am Joey Chui, a software engineer focused on applied AI and machine learning systems. I design production-ready tools spanning conversational AI, multimodal workflows, and automation platforms that help teams move faster.",
      "hero.ctaProjects": "Explore Projects",
      "hero.ctaContact": "Work With Me",
      "hero.highlight1": "End-to-end AI system design",
      "hero.highlight2": "LLM application engineering",
      "hero.highlight3": "Product-minded software delivery",
      "hero.panelAria": "Professional snapshot",
      "hero.panelTitle": "Currently focused on",
      "hero.panel1": "Designing resilient AI pipelines for real-world deployment",
      "hero.panel2": "Integrating Python, MLOps, and cloud-native tooling",
      "hero.panel3": "Turning data and models into polished user experiences",
      "projects.eyebrow": "Software Portfolio",
      "projects.title": "Selected AI Software Projects",
      "projects.body": "A snapshot of my key software work in AI product engineering, model orchestration, and workflow automation.",
      "projects.p1.desc": "A multimodal assistant for image understanding and report generation with customizable model routing for speed and quality trade-offs.",
      "projects.p2.desc": "A prompt lifecycle toolkit that supports template versioning, evaluation harnesses, and deployment rules for LLM-powered features.",
      "projects.p3.desc": "A real-time analytics engine that combines model inference and event processing to produce operational insights for intelligent products.",
      "projects.link": "GitHub Repository",
      "photos.eyebrow": "Photography",
      "photos.title": "Themed Waterfall Gallery in Chronological Order",
      "photos.body": "Photos are grouped into city, nature, and portrait themes, with each theme sorted in ascending shooting time.",
      "photos.orderNote": "Inside each theme: arranged from oldest to newest.",
      "photos.theme.nature.title": "Nature Journey",
      "photos.theme.nature.desc": "From mountains to starry skies, capturing shifting light and terrain.",
      "photos.theme.city.title": "Urban Geometry",
      "photos.theme.city.desc": "Street rhythm, architectural lines, and blue-hour city scenes.",
      "photos.theme.portrait.title": "Portrait Narratives",
      "photos.theme.portrait.desc": "Focused on human mood and expression with a restrained visual style.",
      "photos.tag.nature": "Nature",
      "photos.tag.city": "City",
      "photos.tag.portrait": "Portrait",
      "photos.alt1": "Woman walking through sunlit urban street",
      "photos.alt2": "Mountain landscape under dramatic clouds",
      "photos.alt3": "Blue hour city skyline reflected on water",
      "photos.alt4": "Night sky filled with stars above mountains",
      "photos.alt5": "Bridge architecture with geometric lines",
      "photos.alt6": "Close-up portrait with natural light",
      "skills.eyebrow": "Skills & Expertise",
      "skills.title": "Interactive Technical Stack",
      "skills.body": "My toolkit spans coding, AI/ML development, and product shipping workflows across modern cloud and data platforms.",
      "skills.tabsAria": "Skill categories",
      "skills.tab.ai": "AI / ML",
      "skills.tab.engineering": "Engineering",
      "skills.tab.tools": "Dev Tools",
      "skills.ai1.name": "Python",
      "skills.ai2.name": "Deep Learning (PyTorch)",
      "skills.ai3.name": "LLM Application Design",
      "skills.eng1.name": "TypeScript / Node.js",
      "skills.eng2.name": "API & Backend Architecture",
      "skills.eng3.name": "System Design",
      "skills.tools1.name": "Docker & Kubernetes",
      "skills.tools2.name": "GitHub Actions",
      "skills.tools3.name": "Data & Experiment Tracking",
      "skills.level.advanced": "Advanced",
      "skills.level.proficient": "Proficient",
      "contact.eyebrow": "Contact",
      "contact.title": "Let's Build Something Meaningful",
      "contact.body": "I am open to AI product collaborations, engineering consulting, and photography commissions. Reach out through social channels or send a message directly.",
      "form.name.label": "Name",
      "form.name.placeholder": "Your name",
      "form.email.label": "Email",
      "form.email.placeholder": "you@example.com",
      "form.message.label": "Message",
      "form.message.placeholder": "Tell me about your project or idea...",
      "form.submit": "Send Message",
      "footer.tagline": "Crafted with clean code and clear intent.",
      "footer.top": "Back to top",
      "form.error.required": "Please provide an email and a message before sending.",
      "form.success": "Thanks! Your email client should open now.",
      "form.subjectPrefix": "Portfolio inquiry from ",
      "form.fromLabel": "From",
      "form.emailFieldLabel": "Email",
      "form.visitor": "Website visitor",
      "form.anonymous": "Anonymous",
    },
  };

  const getThemeToggleText = (theme) => {
    if (activeLanguage === "en") {
      return theme === "dark" ? "Light" : "Dark";
    }
    return theme === "dark" ? "浅色" : "深色";
  };

  const applyTranslations = (dictionary) => {
    const title = dictionary["meta.title"];
    const description = dictionary["meta.description"];

    if (title) {
      document.title = title;
    }

    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.setAttribute("placeholder", dictionary[key]);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.setAttribute("aria-label", dictionary[key]);
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.dataset.i18nAlt;
      if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.setAttribute("alt", dictionary[key]);
      }
    });
  };

  const updateThemeToggleLabel = () => {
    const theme = root.getAttribute("data-theme") || "light";
    if (toggleLabel) {
      toggleLabel.textContent = getThemeToggleText(theme);
    }
  };

  const setLanguageButtonsState = (language) => {
    languageButtons.forEach((button) => {
      const isActive = button.dataset.langOption === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const applyTheme = (theme, shouldPersist) => {
    const normalizedTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", normalizedTheme);
    updateThemeToggleLabel();

    if (shouldPersist) {
      localStorage.setItem(themeStorageKey, normalizedTheme);
    }
  };

  const applyLanguage = (language, shouldPersist) => {
    activeLanguage = language === "en" ? "en" : "zh";
    const dictionary = i18n[activeLanguage];

    root.setAttribute("lang", activeLanguage === "zh" ? "zh-CN" : "en");
    root.setAttribute("data-lang", activeLanguage);

    applyTranslations(dictionary);
    setLanguageButtonsState(activeLanguage);
    updateThemeToggleLabel();

    if (shouldPersist) {
      localStorage.setItem(languageStorageKey, activeLanguage);
    }
  };

  const storedLanguage = localStorage.getItem(languageStorageKey);
  const initialLanguage = storedLanguage === "en" ? "en" : "zh";
  applyLanguage(initialLanguage, false);

  const storedTheme = localStorage.getItem(themeStorageKey);
  const initialTheme = storedTheme === "dark" || storedTheme === "light"
    ? storedTheme
    : (darkPreference && darkPreference.matches ? "dark" : "light");
  applyTheme(initialTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const activeTheme = root.getAttribute("data-theme") || "light";
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetLanguage = button.dataset.langOption === "en" ? "en" : "zh";
      if (targetLanguage !== activeLanguage) {
        applyLanguage(targetLanguage, true);
      }
    });
  });

  if (darkPreference) {
    const preferenceHandler = (event) => {
      if (!localStorage.getItem(themeStorageKey)) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };

    if (typeof darkPreference.addEventListener === "function") {
      darkPreference.addEventListener("change", preferenceHandler);
    } else if (typeof darkPreference.addListener === "function") {
      darkPreference.addListener(preferenceHandler);
    }
  }

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const parseShotDate = (value) => {
    const timestamp = Date.parse(String(value || ""));
    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
  };

  document.querySelectorAll("[data-photo-theme]").forEach((themeGallery) => {
    const cards = Array.from(themeGallery.querySelectorAll(".photo-card[data-shot-date]"));
    cards
      .sort((firstCard, secondCard) => {
        const firstDate = parseShotDate(firstCard.dataset.shotDate);
        const secondDate = parseShotDate(secondCard.dataset.shotDate);
        return firstDate - secondDate;
      })
      .forEach((card) => {
        themeGallery.appendChild(card);
      });
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const tabs = Array.from(document.querySelectorAll(".skill-tab"));
  const panels = Array.from(document.querySelectorAll(".skill-panel"));

  const setActiveTab = (selectedTab) => {
    tabs.forEach((tab) => {
      const isActive = tab === selectedTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    panels.forEach((panel) => {
      const shouldShow = panel.id === selectedTab.dataset.target;
      panel.classList.toggle("is-active", shouldShow);
      panel.hidden = !shouldShow;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab));
  });

  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (contactForm && status) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const dictionary = i18n[activeLanguage];
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!email || !message) {
        status.textContent = dictionary["form.error.required"];
        return;
      }

      const visitorName = name || dictionary["form.visitor"];
      const senderName = name || dictionary["form.anonymous"];
      const subject = encodeURIComponent(`${dictionary["form.subjectPrefix"]}${visitorName}`);
      const bodyText = [
        message,
        "",
        `${dictionary["form.fromLabel"]}: ${senderName}`,
        `${dictionary["form.emailFieldLabel"]}: ${email}`,
      ].join("\n");

      const body = encodeURIComponent(bodyText);
      window.location.href = `mailto:hello@joeychui.dev?subject=${subject}&body=${body}`;

      status.textContent = dictionary["form.success"];
      contactForm.reset();
    });
  }
})();
