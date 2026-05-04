// Softree Rebrand: runs after Framer hydration and replaces text in DOM
(function () {
  "use strict";

  // Pairs of [pattern, replacement]. Order matters — longer/specific first.
  var REPLACEMENTS = [
    // Title / hero
    [/Fizens - The Ultimate Finance SAAS Framer Template/g, "Softree - Creative Technology Studio"],
    [/Start Managing/g, "Build Beautiful"],
    [/Your Finance/g, "Your Software"],
    [/With Our Tool/g, "With Softree"],
    [/Simplify your financial life\.?/g, "Accelerate your digital journey."],
    [/Our intuitive app makes managing your money effortless\.?/gi, "Our intuitive platform makes shipping products effortless."],
    [/Trusted to use by millions users over 140 countries/gi, "Trusted by leading brands in over 40 countries"],

    // Pills / categories
    [/FINANCE MANAGEMENT/g, "TECH STUDIO"],
    [/Finance Management/g, "Tech Studio"],
    [/Personal Finance/g, "Digital Solutions"],

    // Sections
    [/Partnering with top tier brands to revolutionize financial services/gi, "Partnering with leading brands to deliver world-class digital products"],
    [/all-in-one solution for managing your money and financial goals/gi, "all-in-one studio for crafting websites, apps, and digital experiences"],
    [/peace of mind that comes with having your finances under control/gi, "confidence that comes with having a partner who delivers"],

    // Features
    [/Key Features/g, "What We Do"],
    [/Explore Our/g, "Crafted For"],
    [/Standout Features/g, "Modern Teams"],
    [/Expense & Income Tracking/g, "Web Development"],
    [/Record and categorize expense & income automatically or manually\.?/gi, "Modern, performant websites built with Next.js and React."],
    [/Smart Savings Goals/g, "Mobile Apps"],
    [/Set specific savings goals and track progress towards them\.?/gi, "Native and cross-platform apps for iOS and Android."],
    [/Financial Analytics/g, "UI\/UX Design"],
    [/Generate reports and visualizations to analyze spending habits\.?/gi, "Beautiful interfaces with delightful interactions and motion."],
    [/Get the app/gi, "Get in touch"],
    [/\.\.\.and more additional features/gi, "...and more capabilities"],

    // More features
    [/Budgeting/g, "Branding"],
    [/Track budgets for different categories\.?/gi, "Logos, identity systems, and visual direction."],
    [/Debt Management/g, "SEO Optimization"],
    [/Track debt balances, interest rates, and create plans\.?/gi, "On-page SEO, performance audits, and content strategy."],
    [/Investment Tracking/g, "API Integration"],
    [/Track investments, including stocks, bonds, and funds\.?/gi, "Connect any service with custom REST and GraphQL APIs."],
    [/Bill Payment/g, "E-commerce"],
    [/Pay bills directly through the app\. One stop for all\.?/gi, "Shopify, Stripe, and custom commerce solutions."],
    [/Tax Preparation/g, "DevOps"],
    [/Get assistance with tax preparation and filing\.?/gi, "CI\/CD, cloud infrastructure, and deployment automation."],
    [/VARIETY/g, "SERVICES"],
    [/^FEATURES$/gm, "CAPABILITIES"],

    // Benefit
    [/Benefit/g, "Why Softree"],
    [/Future of Finance/g, "Future of Software"],
    [/Time and Stress Reduction/g, "Speed & Efficiency"],
    [/Save your time and reduce financial anxiety/gi, "Save weeks of dev time with proven workflows"],
    [/Automate tasks like budgeting, tracking, and saving, freeing up your time for more important things\.?/gi, "Automate repetitive work with reusable components and design systems, so you can focus on what matters."],
    [/Stay on top of your budget\.?/gi, "Stay on top of your roadmap."],
    [/Automate your finances for less stress\.?/gi, "Automate your workflow for less stress."],
    [/Financial Growth/g, "Business Growth"],
    [/Take control of your financial future/gi, "Scale your product the right way"],
    [/Provide valuable insights into your spending habits, helping you identify areas where you can cut back and save more\.?/gi, "Get actionable insights into product performance, helping you identify and prioritize what drives growth."],
    [/Reach your financial goals/gi, "Reach your product goals"],
    [/Make informed decisions/gi, "Make data-driven decisions"],
    [/Security and Privacy/g, "Security & Reliability"],
    [/Experience the ultimate in financial security/gi, "Built with security as a first principle"],
    [/Protect your information from unauthorized access, focus on managing your money without worry\.?/gi, "Protect your data and your users with industry-standard practices, so you can ship with confidence."],
    [/Protect your data/gi, "Protect your users"],

    // Stats
    [/^Statistics$/gm, "Our Impact"],
    [/See Your\s*\nWealth Grow/g, "Watch Your\nProduct Scale"],
    [/Wealth Grow/g, "Product Scale"],
    [/See Your/g, "Watch Your"],
    [/Transactions are processed successfully/gi, "Projects delivered on time and on budget"],
    [/Our users[''']?? average saving amount/gi, "Average performance gain after Softree rebuild"],
    [/Effective in financial growth than before/gi, "More efficient than traditional agency workflows"],

    // How it works
    [/How Fizens/g, "How Softree"],
    [/Can Help You/g, "Helps You Ship"],
    [/Connect Your Accounts/g, "Discovery & Strategy"],
    [/Securely link your bank, credit cards, and investments to get a complete financial overview in one place\.?/gi, "We collaborate with you to understand goals, audience, and constraints — then craft a roadmap."],
    [/Track Expenses/g, "Design & Prototype"],
    [/Set budget/g, "Build & Ship"],

    // Testimonials
    [/Our Users/g, "What Clients"],
    [/Talk About Us/g, "Say About Us"],
    [/Based on 14K\+ reviews/gi, "Based on 200+ projects delivered"],
    [/I was skeptical at first, but then I have completely transformed my relationship with money\.?/gi, "I was skeptical at first, but Softree completely transformed how our team ships product."],
    [/I[''']ve finally taken control of my finances\. It[''']s so easy to use and has helped me save more money than ever before\.?/gi, "We finally have a partner that gets it. They shipped our app in half the time we expected."],
    [/It has been a game-changer for my financial life\. I love how it helps me stay organized my spending\.?/gi, "It has been a game-changer for our brand. They keep our roadmap focused and clean."],
    [/The app is intuitive and easy to navigate, and it[''']s helped me reach my financial goals faster than I ever thought possible\.?/gi, "Their work is intuitive and pixel-perfect. They helped us reach our product goals faster than I ever thought possible."],
    [/I[''']ve been able to pay off debt, save for a down payment, and even start investing\.?/gi, "We launched our SaaS, raised our seed round, and shipped v2 — all with Softree by our side."],

    // Pricing
    [/Try For Free And/gi, "Choose The Plan"],
    [/Start Controlling Your Finances/gi, "That Fits Your Team"],
    [/Standard Plan/g, "Growth Plan"],
    [/Advanced Plan/g, "Enterprise Plan"],
    [/Starter Plan grants you access to exclusive features/gi, "Starter Plan for solo founders and small teams"],
    [/Growth Plan grants you access to exclusive features/gi, "Growth Plan for scaling startups and product teams"],
    [/Enterprise Plan grants you access to all exclusive features/gi, "Enterprise Plan with full access to our team and tools"],
    [/Access 14\+ Features/gi, "Landing Page Build"],
    [/Access 23\+ Features/gi, "Full Website Build"],
    [/Access All Features/gi, "Full Product Build"],
    [/Support 24\/7/gi, "Email Support"],
    [/Get Personalized Insights/gi, "Free Design Audit"],
    [/Get Financial Analytics/gi, "Brand Identity Kit"],
    [/Get Financial Advice/gi, "Dedicated Team Lead"],
    [/3 Months Data Storage/gi, "30 Days Free Iteration"],
    [/Unlimited Data Storage/gi, "Unlimited Iterations"],

    // Blog
    [/Read the Articles/gi, "Read Insights"],
    [/Written By Professionals/gi, "From Our Team"],
    [/Navigating the Stock Market: A Beginner[''']s Guide/gi, "Building Modern Web Apps: A Founder's Guide"],
    [/Why You Should Not Invest Your Emergency Fund/gi, "Why You Should Not Skip Design Systems"],
    [/Adjusting The Sails Of Your Investment To The Weather/gi, "Adjusting Your Stack To The Demands Of Scale"],
    [/3 Essential Questions You Need to Ask Your Insurance Advisor/gi, "3 Essential Questions To Ask Before Hiring A Studio"],

    // CTA
    [/Your First Step To Financial Freedom Begins Here/gi, "Your First Step To A Better Product Begins Here"],
    [/Watch your money grow\. Download the app now and start/gi, "Watch your product grow. Get in touch and start"],
    [/taking control of your money today/gi, "shipping with confidence today"],

    // Footer
    [/Job detail/gi, "Careers"],
    [/Team Member/gi, "Our Team"],
    [/© 2025 Copyright - Fizens \| Designed by LoganCee Studio \| /gi, "© 2026 Softree | Crafted with care | "],
    [/Made by Kota \| Powered by Framer/gi, "Built by Softree | Powered by Next.js"],

    // Generic — last so we don't break specific phrases above
    [/Fizens/g, "Softree"],
    [/financial/gi, "digital"],
    [/finance/gi, "technology"],
    [/Finance/g, "Technology"],
  ];

  function applyToTextNode(node) {
    var text = node.nodeValue;
    if (!text || text.trim().length === 0) return;
    var changed = text;
    for (var i = 0; i < REPLACEMENTS.length; i++) {
      changed = changed.replace(REPLACEMENTS[i][0], REPLACEMENTS[i][1]);
    }
    if (changed !== text) {
      node.nodeValue = changed;
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      applyToTextNode(root);
      return;
    }
    if (root.nodeType !== 1) return;
    // skip script/style
    var tag = root.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
    applyToAttributes(root);
    var children = root.childNodes;
    for (var i = 0; i < children.length; i++) {
      walk(children[i]);
    }
  }

  var HERO_IMAGE_NEW = "/fizens-html/Adobe%20Express%20-%20file.png";
  // Image IDs to swap with the Softree phone mockup
  var HERO_IMAGE_IDS = [
    "2PJCBW3k14Gd59z05NimgBmXjSA", // Phone Hero (main)
    "jeTeBuKnPiniPEixLqRGnCCPP6U", // Dashboard
  ];

  function isHeroImage(url) {
    if (!url) return false;
    for (var i = 0; i < HERO_IMAGE_IDS.length; i++) {
      if (url.indexOf(HERO_IMAGE_IDS[i]) !== -1) return true;
    }
    return false;
  }

  function swapHeroImage() {
    var imgs = document.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (isHeroImage(img.src) || isHeroImage(img.srcset)) {
        img.src = HERO_IMAGE_NEW;
        img.removeAttribute("srcset");
        // Show full phone (no crop)
        img.style.objectFit = "contain";
        img.style.objectPosition = "center";
        img.style.background = "transparent";
      }
    }
  }

  // Replace text in element attributes (alt, aria-label, placeholder, title, value)
  var TEXT_ATTRS = ["alt", "aria-label", "placeholder", "title", "value", "data-framer-name"];
  function applyToAttributes(el) {
    if (!el || el.nodeType !== 1) return;
    for (var i = 0; i < TEXT_ATTRS.length; i++) {
      var name = TEXT_ATTRS[i];
      if (!el.hasAttribute(name)) continue;
      var val = el.getAttribute(name);
      if (!val) continue;
      var changed = val;
      for (var j = 0; j < REPLACEMENTS.length; j++) {
        changed = changed.replace(REPLACEMENTS[j][0], REPLACEMENTS[j][1]);
      }
      if (changed !== val) el.setAttribute(name, changed);
    }
  }

  // Framer splits text into per-character spans for animations.
  // For these containers, we need to look at full textContent and replace whole element if matched.
  function normalizeWhitespace(s) {
    return s.replace(/\s+/g, " ").trim();
  }

  function applyToCharSplitContainers() {
    var containers = document.querySelectorAll(
      '[data-framer-component-type="RichTextContainer"], h1, h2, h3, h4, h5, h6, p'
    );
    for (var i = 0; i < containers.length; i++) {
      var el = containers[i];
      if (el.getAttribute("data-softree-applied") === "1") continue;
      var raw = el.textContent;
      if (!raw || raw.length < 3) continue;
      var normalized = normalizeWhitespace(raw);
      if (normalized.length < 3) continue;
      var changed = normalized;
      for (var j = 0; j < REPLACEMENTS.length; j++) {
        changed = changed.replace(REPLACEMENTS[j][0], REPLACEMENTS[j][1]);
      }
      if (changed !== normalized) {
        el.textContent = changed;
        el.setAttribute("data-softree-applied", "1");
      }
    }
  }

  function applyAll() {
    walk(document.body);
    applyToCharSplitContainers();
    swapHeroImage();
    // Also update document title
    if (document.title.indexOf("Fizens") !== -1 || document.title.indexOf("Finance") !== -1) {
      document.title = "Softree - Creative Technology Studio";
    }
  }

  // Run multiple times to catch hydration
  function start() {
    applyAll();
    // Re-apply on every DOM mutation (debounced)
    var pending = false;
    var observer = new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        applyAll();
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    // Safety re-applies
    setTimeout(applyAll, 500);
    setTimeout(applyAll, 1500);
    setTimeout(applyAll, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
