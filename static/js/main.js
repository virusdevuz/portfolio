/* =========================================================
   VIRUS Portfolio — interactions
   Small, dependency-free enhancements for every page.
   ========================================================= */

(() => {
  "use strict";

  const doc = document;
  const body = doc.body;
  const root = doc.documentElement;

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const supportsObserver = "IntersectionObserver" in window;

  const $ = (selector, scope = doc) => scope.querySelector(selector);
  const $$ = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));
  const on = (target, type, handler, options) => target.addEventListener(type, handler, options);

  const prefersReducedMotion = () => reduceMotionQuery.matches;
  const hasFinePointer = () => finePointerQuery.matches;

  const state = {
    menuOpen: false,
  };

  const safe = (name, fn) => {
    try {
      fn();
    } catch (error) {
      // Keep one broken enhancement from taking down the rest of the page.
      console.error(`[VIRUS] ${name} could not be initialised.`, error);
    }
  };

  const setText = (element, text) => {
    if (element) element.textContent = text;
  };

  const getDelay = (element) => {
    const value = Number.parseInt(element.dataset.delay || "0", 10);
    if (!Number.isFinite(value)) return 0;
    return Math.min(Math.max(value, 0), 10);
  };

  const updateBodyLock = () => {
    const anyModalOpen = Boolean($(".modal.is-open"));
    body.classList.toggle("is-locked", state.menuOpen || anyModalOpen);
  };

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(", ");

  const getFocusable = (container) =>
    $$(focusableSelector, container).filter((element) => {
      if (element.hidden || element.getAttribute("aria-hidden") === "true") return false;
      const style = window.getComputedStyle(element);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        element.getClientRects().length > 0
      );
    });

  const trapTab = (event, container) => {
    if (event.key !== "Tab" || !container) return;

    const focusable = getFocusable(container);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = doc.activeElement;

    if (event.shiftKey && (active === first || !container.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !container.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  };

  const restoreFocus = (element) => {
    if (element && typeof element.focus === "function" && element.isConnected) {
      element.focus({ preventScroll: true });
    }
  };

  /* -------------------------------------------------------
     Page loader
     ------------------------------------------------------- */

  const initLoader = (onReady) => {
    const loader = $("[data-loader]");
    if (!loader) {
      onReady();
      return;
    }

    const startedAt = performance.now();
    let hidden = false;

    const hide = () => {
      if (hidden) return;
      hidden = true;

      loader.classList.add("is-hidden");
      loader.setAttribute("aria-hidden", "true");
      body.classList.add("is-ready");
      onReady();

      window.setTimeout(() => loader.remove(), 900);
    };

    const scheduleHide = () => {
      const elapsed = performance.now() - startedAt;
      window.setTimeout(hide, Math.max(0, 650 - elapsed));
    };

    if (doc.readyState === "complete") {
      scheduleHide();
    } else {
      on(window, "load", scheduleHide, { once: true });
    }

    // Never trap the page behind the loader, even if an image stalls.
    window.setTimeout(hide, 2800);
  };

  /* -------------------------------------------------------
     Header, scroll progress and back-to-top
     ------------------------------------------------------- */

  const initHeader = () => {
    const header = $("[data-header]");
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 24);

      const overlayOpen = state.menuOpen || Boolean($(".modal.is-open"));
      if (!overlayOpen && y > lastY + 6 && y > 420) {
        header.classList.add("is-hidden");
      } else if (y < lastY - 6 || y < 180) {
        header.classList.remove("is-hidden");
      }

      lastY = y;
      ticking = false;
    };

    on(
      window,
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );

    on(header, "focusin", () => header.classList.remove("is-hidden"));
    update();
  };

  const initScrollProgress = () => {
    const bar = $("[data-scroll-progress]");
    if (!bar) return;

    let ticking = false;

    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      ticking = false;
    };

    on(
      window,
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );

    on(window, "resize", update);
    update();
  };

  const initBackToTop = () => {
    const button = $("[data-to-top]");
    if (!button) return;

    let ticking = false;

    const update = () => {
      button.classList.toggle("is-visible", window.scrollY > 680);
      ticking = false;
    };

    on(
      window,
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );

    on(button, "click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });

    update();
  };

  /* -------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------- */

  const initMobileMenu = () => {
    const menu = $("[data-mobile-menu]");
    const toggle = $("[data-nav-toggle]");
    if (!menu || !toggle) return;

    const header = $("[data-header]");
    const panel = $(".mobile-menu__panel", menu);
    let lastFocus = null;

    const setOpen = (open) => {
      if (state.menuOpen === open) return;

      state.menuOpen = open;
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      header?.classList.remove("is-hidden");
      updateBodyLock();

      if (open) {
        lastFocus = doc.activeElement;
        requestAnimationFrame(() => {
          const closeButton = $(".mobile-menu__top .icon-btn", menu);
          const firstFocusable = closeButton || getFocusable(panel)[0];
          firstFocusable?.focus({ preventScroll: true });
        });
      } else {
        restoreFocus(lastFocus);
        lastFocus = null;
      }
    };

    on(toggle, "click", () => setOpen(!state.menuOpen));
    $$("[data-menu-close]", menu).forEach((element) =>
      on(element, "click", () => setOpen(false))
    );
    $$("[data-menu-link]", menu).forEach((element) =>
      on(element, "click", () => setOpen(false))
    );

    on(doc, "keydown", (event) => {
      if (!state.menuOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Tab") {
        trapTab(event, panel);
      }
    });

    on(window, "resize", () => {
      if (window.innerWidth > 1080 && state.menuOpen) setOpen(false);
    });
  };

  /* -------------------------------------------------------
     Background spotlight and card spotlights
     ------------------------------------------------------- */

  const initSpotlight = () => {
    const spotlight = $("[data-spotlight]");
    if (!spotlight || !hasFinePointer() || prefersReducedMotion()) return;

    let x = 50;
    let y = 22;
    let raf = 0;

    const render = () => {
      spotlight.style.setProperty("--mx", `${x}%`);
      spotlight.style.setProperty("--my", `${y}%`);
      raf = 0;
    };

    on(
      doc,
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;
        x = (event.clientX / window.innerWidth) * 100;
        y = (event.clientY / window.innerHeight) * 100;
        if (!raf) raf = requestAnimationFrame(render);
      },
      { passive: true }
    );
  };

  const initSpotlightCards = () => {
    const cards = $$("[data-spotlight-card]");
    if (!cards.length || !hasFinePointer() || prefersReducedMotion()) return;

    cards.forEach((card) => {
      let x = 0;
      let y = 0;
      let raf = 0;

      const render = () => {
        card.style.setProperty("--spot-x", `${x}px`);
        card.style.setProperty("--spot-y", `${y}px`);
        raf = 0;
      };

      on(
        card,
        "pointermove",
        (event) => {
          const rect = card.getBoundingClientRect();
          x = event.clientX - rect.left;
          y = event.clientY - rect.top;
          if (!raf) raf = requestAnimationFrame(render);
        },
        { passive: true }
      );
    });
  };

  /* -------------------------------------------------------
     Subtle 3D tilt on portrait / photo frames
     ------------------------------------------------------- */

  const initTilt = () => {
    const items = $$("[data-tilt]");
    if (!items.length || !hasFinePointer() || prefersReducedMotion()) return;

    items.forEach((item) => {
      let targetX = 0;
      let targetY = 0;
      let raf = 0;

      const render = () => {
        item.style.transform = `perspective(1100px) rotateX(${targetY.toFixed(
          2
        )}deg) rotateY(${targetX.toFixed(2)}deg)`;
        raf = 0;
      };

      on(item, "pointerenter", () => {
        item.style.transition = "transform 0.15s linear";
      });

      on(
        item,
        "pointermove",
        (event) => {
          const rect = item.getBoundingClientRect();
          const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
          const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
          targetX = relativeX * 7;
          targetY = -relativeY * 7;
          if (!raf) raf = requestAnimationFrame(render);
        },
        { passive: true }
      );

      on(item, "pointerleave", () => {
        item.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
        item.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      });
    });
  };

  /* -------------------------------------------------------
     Typewriter
     ------------------------------------------------------- */

  const initTypewriter = () => {
    const element = $("[data-typewriter]");
    if (!element) return;

    let words = [];
    try {
      words = JSON.parse(element.dataset.words || "[]");
    } catch {
      words = [];
    }

    if (!Array.isArray(words) || !words.length) return;

    if (prefersReducedMotion()) {
      element.textContent = words[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = false;
    let timer = 0;

    element.textContent = words[0];

    const schedule = (delay) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(tick, delay);
    };

    function tick() {
      const word = words[wordIndex];

      if (!deleting) {
        if (charIndex >= word.length) {
          deleting = true;
          schedule(1900);
          return;
        }

        charIndex += 1;
        element.textContent = word.slice(0, charIndex);
        schedule(52 + Math.random() * 38);
        return;
      }

      charIndex -= 1;
      element.textContent = word.slice(0, charIndex);

      if (charIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        schedule(380);
        return;
      }

      schedule(26);
    }

    schedule(1900);
  };

  /* -------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------- */

  const initReveal = () => {
    const items = $$("[data-reveal]");
    if (!items.length) return;

    if (!supportsObserver || prefersReducedMotion()) {
      items.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const delay = getDelay(element) * 80;

          if (delay) {
            element.style.transitionDelay = `${delay}ms`;
            window.setTimeout(() => {
              element.style.transitionDelay = "";
            }, delay + 1000);
          }

          element.classList.add("is-visible");
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((element) => observer.observe(element));
  };

  /* -------------------------------------------------------
     Animated counters and skill bars
     ------------------------------------------------------- */

  const initCounters = () => {
    const counters = $$("[data-counter]");
    if (!counters.length) return;

    const animate = (element) => {
      const target = Number.parseFloat(element.dataset.counter);
      if (!Number.isFinite(target)) return;

      if (prefersReducedMotion()) {
        element.textContent = String(target);
        return;
      }

      const duration = 1500;
      const startedAt = performance.now();

      const frame = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          element.textContent = String(target);
        }
      };

      requestAnimationFrame(frame);
    };

    if (!supportsObserver) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((element) => observer.observe(element));
  };

  const initSkillBars = () => {
    const bars = $$("[data-skill-fill]");
    if (!bars.length) return;

    if (!supportsObserver || prefersReducedMotion()) {
      bars.forEach((bar) => bar.classList.add("is-filled"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-filled");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach((bar) => observer.observe(bar));
  };

  /* -------------------------------------------------------
     Local time in Bukhara (Asia/Tashkent, UTC+5)
     ------------------------------------------------------- */

  const initLocalTime = () => {
    const elements = $$("[data-local-time]");
    if (!elements.length) return;

    let formatter = null;

    try {
      formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tashkent",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
    } catch {
      formatter = null;
    }

    const update = () => {
      const now = new Date();
      const text = formatter
        ? formatter.format(now)
        : now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      elements.forEach((element) => {
        element.textContent = text;
      });
    };

    update();
    window.setInterval(update, 30000);
  };

  /* -------------------------------------------------------
     Flash notifications
     ------------------------------------------------------- */

  const initFlash = () => {
    const stack = $("[data-flash-stack]");
    if (!stack) return;

    const dismiss = (flash) => {
      if (!flash.isConnected || flash.classList.contains("is-leaving")) return;
      flash.classList.add("is-leaving");
      window.setTimeout(() => {
        flash.remove();
        if (!stack.children.length) stack.remove();
      }, 420);
    };

    $$("[data-flash]", stack).forEach((flash) => {
      const close = $("[data-flash-close]", flash);
      if (close) on(close, "click", () => dismiss(flash));
      window.setTimeout(() => dismiss(flash), 6500);
    });
  };

  /* -------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------- */

  const initAccordion = () => {
    const accordion = $("[data-accordion]");
    if (!accordion) return;

    const items = $$("[data-accordion-item]", accordion);
    if (!items.length) return;

    const setOpen = (item, open) => {
      item.classList.toggle("is-open", open);
      const trigger = $(".accordion__trigger", item);
      const panel = $(".accordion__panel", item);

      if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) panel.setAttribute("aria-hidden", open ? "false" : "true");
    };

    items.forEach((item) => {
      setOpen(item, false);
      const trigger = $(".accordion__trigger", item);
      if (!trigger) return;

      on(trigger, "click", () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((other) => setOpen(other, false));
        setOpen(item, willOpen);
      });
    });
  };

  /* -------------------------------------------------------
     Certificate / project filtering
     ------------------------------------------------------- */

  const initFilters = () => {
    const groups = $$("[data-filter-group]");

    groups.forEach((group) => {
      const key = group.dataset.filterGroup;
      const grid = key ? $(`[data-filter-grid="${key}"]`) : null;
      if (!grid) return;

      const buttons = $$("[data-filter]", group);
      const cards = $$("[data-category]", grid);
      const statics = $$("[data-filter-static]", grid);
      const empty = key ? $(`[data-filter-empty="${key}"]`) : null;

      if (!buttons.length || !cards.length) return;

      if (empty) empty.setAttribute("aria-live", "polite");

      const counts = cards.reduce((accumulator, card) => {
        const category = card.dataset.category || "";
        accumulator[category] = (accumulator[category] || 0) + 1;
        return accumulator;
      }, {});

      buttons.forEach((button) => {
        const filter = button.dataset.filter || "All";
        const count = filter === "All" ? cards.length : counts[filter] || 0;
        let countElement = $(".filter-btn__count", button);

        if (!countElement) {
          countElement = doc.createElement("span");
          countElement.className = "filter-btn__count";
          button.append(countElement);
        }

        countElement.textContent = String(count);
      });

      const apply = (value) => {
        let visible = 0;

        cards.forEach((card) => {
          const matches = value === "All" || card.dataset.category === value;
          card.classList.toggle("is-filtered", !matches);
          if (matches) visible += 1;
        });

        statics.forEach((element) => {
          element.classList.toggle("is-filtered", value !== "All");
        });

        buttons.forEach((button) => {
          const active = button.dataset.filter === value;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        if (empty) empty.hidden = visible > 0;
      };

      buttons.forEach((button) => {
        on(button, "click", () => apply(button.dataset.filter || "All"));
      });

      const initial =
        buttons.find((button) => button.classList.contains("is-active")) || buttons[0];
      apply(initial.dataset.filter || "All");
    });
  };

  /* -------------------------------------------------------
     Certificate lightbox
     ------------------------------------------------------- */

  const initCertificateModal = () => {
    const modal = $("[data-cert-modal]");
    const triggers = $$("[data-cert-open]");
    if (!modal || !triggers.length) return;

    const dialog = $(".modal__dialog", modal);
    const image = $("[data-cert-modal-image]", modal);
    const category = $("[data-cert-modal-category]", modal);
    const id = $("[data-cert-modal-id]", modal);
    const issuer = $("[data-cert-modal-issuer]", modal);
    const title = $("[data-cert-modal-title]", modal);
    const description = $("[data-cert-modal-description]", modal);
    const skills = $("[data-cert-modal-skills]", modal);
    const counter = $("[data-cert-modal-counter]", modal);
    const info = $(".cert-modal__info", modal);
    const visual = $(".cert-modal__visual", modal);
    const previousButton = $("[data-cert-prev]", modal);
    const nextButton = $("[data-cert-next]", modal);

    let activeTriggers = [];
    let currentIndex = 0;
    let lastFocus = null;
    let isOpen = false;

    const visibleTriggers = () =>
      triggers.filter((trigger) => {
        const card = trigger.closest("[data-category]");
        return !card || !card.classList.contains("is-filtered");
      });

    const render = () => {
      const trigger = activeTriggers[currentIndex];
      if (!trigger) return;

      const data = trigger.dataset;
      const issuerName = data.certIssuer || "Mohirdev";

      if (image) {
        image.src = data.certImage || "";
        image.alt = `${data.certTitle || "Certificate"} certificate issued by ${issuerName}`;
      }

      setText(category, data.certCategory || "Certificate");
      setText(id, data.certId || "");
      setText(issuer, issuerName);
      setText(title, data.certTitle || "");
      setText(description, data.certDescription || "");
      setText(
        counter,
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(
          activeTriggers.length
        ).padStart(2, "0")}`
      );

      if (skills) {
        const list = (data.certSkills || "").split("|").filter(Boolean);
        skills.replaceChildren(
          ...list.map((skill) => {
            const tag = doc.createElement("span");
            tag.className = "tag";
            tag.textContent = skill;
            return tag;
          })
        );
      }

      // Warm up the neighbouring certificates for instant arrow navigation.
      [currentIndex + 1, currentIndex - 1].forEach((offset) => {
        const neighbour =
          activeTriggers[(offset + activeTriggers.length) % activeTriggers.length];
        if (neighbour && neighbour !== trigger) {
          const preload = new Image();
          preload.src = neighbour.dataset.certImage || "";
        }
      });
    };

    const show = (nextIndex) => {
      if (!activeTriggers.length) return;
      currentIndex = (nextIndex + activeTriggers.length) % activeTriggers.length;
      render();
      if (info) info.scrollTop = 0;
    };

    function onKeydown(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(currentIndex + 1);
      } else if (event.key === "Tab") {
        trapTab(event, dialog);
      }
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      doc.removeEventListener("keydown", onKeydown);
      updateBodyLock();
      restoreFocus(lastFocus);
      lastFocus = null;
    }

    const open = (trigger) => {
      activeTriggers = visibleTriggers();
      currentIndex = Math.max(0, activeTriggers.indexOf(trigger));
      if (!activeTriggers.length) return;

      lastFocus = doc.activeElement;
      isOpen = true;
      render();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      updateBodyLock();
      doc.addEventListener("keydown", onKeydown);

      requestAnimationFrame(() => {
        const closeButton = $("[data-cert-close]", dialog);
        closeButton?.focus({ preventScroll: true });
      });
    };

    triggers.forEach((trigger) => {
      on(trigger, "click", () => open(trigger));
    });

    $$("[data-cert-close]", modal).forEach((element) => {
      on(element, "click", close);
    });

    if (previousButton) on(previousButton, "click", () => show(currentIndex - 1));
    if (nextButton) on(nextButton, "click", () => show(currentIndex + 1));

    if (visual) {
      let startX = 0;
      let startY = 0;

      on(
        visual,
        "touchstart",
        (event) => {
          const touch = event.changedTouches[0];
          startX = touch.clientX;
          startY = touch.clientY;
        },
        { passive: true }
      );

      on(
        visual,
        "touchend",
        (event) => {
          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - startX;
          const deltaY = touch.clientY - startY;

          if (Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            show(currentIndex + (deltaX < 0 ? 1 : -1));
          }
        },
        { passive: true }
      );
    }
  };

  /* -------------------------------------------------------
     Project case-study modal
     ------------------------------------------------------- */

  const initProjectModal = () => {
    const modal = $("[data-project-modal]");
    const triggers = $$("[data-project-open]");
    if (!modal || !triggers.length) return null;

    const dialog = $(".modal__dialog", modal);
    const cover = $("[data-project-modal-cover]", modal);
    const url = $("[data-project-modal-url]", modal);
    const monogram = $("[data-project-modal-monogram]", modal);
    const icon = $("[data-project-modal-icon]", modal);
    const chips = $("[data-project-modal-chips]", modal);
    const category = $("[data-project-modal-category]", modal);
    const year = $("[data-project-modal-year]", modal);
    const status = $("[data-project-modal-status]", modal);
    const title = $("[data-project-modal-title]", modal);
    const tagline = $("[data-project-modal-tagline]", modal);
    const description = $("[data-project-modal-description]", modal);
    const features = $("[data-project-modal-features]", modal);
    const stack = $("[data-project-modal-stack]", modal);
    const scrollArea = $(".project-modal__scroll", modal);

    let lastFocus = null;
    let isOpen = false;
    let currentSlug = "";

    const render = (trigger) => {
      const data = trigger.dataset;
      const theme = data.projectTheme || "violet";
      const projectStack = (data.projectStack || "").split("|").filter(Boolean);
      const projectFeatures = (data.projectFeatures || "").split("|").filter(Boolean);

      if (cover) {
        cover.className = `project-cover project-cover--${theme}`;
      }

      setText(url, `${data.projectSlug || "project"}.dev`);
      setText(monogram, data.projectMonogram || "PR");
      setText(category, data.projectCategory || "Project");
      setText(year, data.projectYear || "");
      setText(status, data.projectStatus || "Personal project");
      setText(title, data.projectTitle || "");
      setText(tagline, data.projectTagline || "");
      setText(description, data.projectDescription || "");

      if (icon) icon.setAttribute("href", `#i-${data.projectIcon || "code"}`);

      if (chips) {
        chips.replaceChildren(
          ...projectStack.slice(0, 3).map((technology) => {
            const chip = doc.createElement("span");
            chip.textContent = technology;
            return chip;
          })
        );
      }

      if (features) {
        features.replaceChildren(
          ...projectFeatures.map((feature) => {
            const item = doc.createElement("li");
            const bullet = doc.createElement("span");
            bullet.className = "feature-list__icon";
            bullet.innerHTML =
              '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';
            item.append(bullet, doc.createTextNode(feature));
            return item;
          })
        );
      }

      if (stack) {
        stack.replaceChildren(
          ...projectStack.map((technology) => {
            const tag = doc.createElement("span");
            tag.className = "tag";
            tag.textContent = technology;
            return tag;
          })
        );
      }
    };

    function onKeydown(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "Tab") {
        trapTab(event, dialog);
      }
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      doc.removeEventListener("keydown", onKeydown);
      updateBodyLock();
      restoreFocus(lastFocus);
      lastFocus = null;

      if (currentSlug && window.location.hash.slice(1) === currentSlug) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }

      currentSlug = "";
    }

    const open = (trigger) => {
      if (!trigger) return;

      currentSlug = trigger.dataset.projectSlug || "";
      render(trigger);

      lastFocus = doc.activeElement;
      isOpen = true;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      updateBodyLock();
      doc.addEventListener("keydown", onKeydown);

      if (scrollArea) scrollArea.scrollTop = 0;

      requestAnimationFrame(() => {
        const closeButton = $("[data-project-close]", dialog);
        closeButton?.focus({ preventScroll: true });
      });
    };

    const openFromHash = () => {
      if (isOpen) return;

      let hash = window.location.hash.slice(1);
      if (!hash) return;

      try {
        hash = decodeURIComponent(hash);
      } catch {
        return;
      }

      const trigger = triggers.find(
        (candidate) => candidate.dataset.projectSlug === hash
      );

      if (trigger) {
        window.setTimeout(() => open(trigger), 260);
      }
    };

    triggers.forEach((trigger) => {
      on(trigger, "click", () => open(trigger));
    });

    $$("[data-project-close]", modal).forEach((element) => {
      on(element, "click", close);
    });

    on(window, "hashchange", openFromHash);

    return openFromHash;
  };

  /* -------------------------------------------------------
     Contact form
     ------------------------------------------------------- */

  const initContactForm = () => {
    const form = $("[data-contact-form]");
    if (!form) return;

    const message = $("textarea[name='message']", form);
    const counter = $("#messageCounter");
    const submit = $("[data-submit-btn]", form);
    const maxLength = Number(message?.getAttribute("maxlength")) || 4000;

    const updateCounter = () => {
      if (!message || !counter) return;
      const length = message.value.length;
      counter.textContent = `${length} / ${maxLength}`;
      counter.style.color = length >= maxLength * 0.95 ? "var(--pink)" : "";
    };

    if (message) {
      updateCounter();
      on(message, "input", updateCounter);
    }

    const resetSubmit = () => {
      delete form.dataset.submitting;
      if (!submit) return;
      submit.classList.remove("is-loading");
      submit.removeAttribute("aria-busy");
      const label = $("span", submit);
      if (label) label.textContent = "Send message";
    };

    on(form, "submit", (event) => {
      if (form.dataset.submitting === "true") {
        event.preventDefault();
        return;
      }

      if (!form.checkValidity()) return;

      form.dataset.submitting = "true";

      if (submit) {
        submit.classList.add("is-loading");
        submit.setAttribute("aria-busy", "true");
        const label = $("span", submit);
        if (label) label.textContent = "Sending…";
      }
    });

    on(window, "pageshow", (event) => {
      if (event.persisted) resetSubmit();
    });
  };

  /* -------------------------------------------------------
     Custom cursor
     ------------------------------------------------------- */

  const initCursor = () => {
    const cursor = $("[data-cursor]");
    if (!cursor || !hasFinePointer() || prefersReducedMotion()) return;

    const dot = $(".cursor__dot", cursor);
    const ring = $(".cursor__ring", cursor);
    if (!dot || !ring) return;

    body.classList.add("has-custom-cursor");
    cursor.style.opacity = "0";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let visible = false;

    const render = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(render);
    };

    on(
      doc,
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;

        targetX = event.clientX;
        targetY = event.clientY;

        if (!visible) {
          visible = true;
          cursor.style.opacity = "1";
        }
      },
      { passive: true }
    );

    on(doc, "pointerover", (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const target = event.target instanceof Element ? event.target : null;
      body.classList.toggle(
        "cursor-hover",
        Boolean(target?.closest("a, button, [role='button'], [data-tilt]"))
      );
      body.classList.toggle(
        "cursor-field",
        Boolean(target?.closest("input, textarea, select"))
      );
    });

    on(root, "mouseleave", () => {
      visible = false;
      cursor.style.opacity = "0";
      body.classList.remove("cursor-hover", "cursor-field");
    });

    requestAnimationFrame(render);
  };

  /* -------------------------------------------------------
     Boot
     ------------------------------------------------------- */

  const init = () => {
    safe("header", initHeader);
    safe("scroll progress", initScrollProgress);
    safe("back to top", initBackToTop);
    safe("mobile menu", initMobileMenu);
    safe("background spotlight", initSpotlight);
    safe("card spotlight", initSpotlightCards);
    safe("tilt", initTilt);
    safe("typewriter", initTypewriter);
    safe("local time", initLocalTime);
    safe("cursor", initCursor);
    safe("accordion", initAccordion);
    safe("filters", initFilters);
    safe("certificate lightbox", initCertificateModal);
    safe("flash messages", initFlash);
    safe("contact form", initContactForm);

    let openProjectFromHash = null;
    safe("project modal", () => {
      openProjectFromHash = initProjectModal();
    });

    safe("page loader", () => {
      initLoader(() => {
        safe("reveal", initReveal);
        safe("counters", initCounters);
        safe("skill bars", initSkillBars);
        safe("project deep link", () => {
          if (openProjectFromHash) window.setTimeout(openProjectFromHash, 300);
        });
      });
    });
  };

  if (doc.readyState === "loading") {
    on(doc, "DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
