(() => {
  const config = window.SITE_CONFIG || {};
  const course = config.course || {};
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Galeria de resultados
  const gallery = document.querySelector("#gallery");
  function renderGallery(category) {
    const photos = (config.photos || []).filter(photo => photo.category === category && photo.src);
    gallery.innerHTML = photos.map((photo, index) => `<figure class="gallery-item" style="--i:${index}"><img src="${escape(photo.src)}" alt="${escape(photo.alt || "")}" loading="lazy"><figcaption>${escape(photo.caption || "")}</figcaption></figure>`).join("");
    gallery.scrollLeft = 0;
  }
  document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(other => { other.classList.toggle("is-active", other === tab); other.setAttribute("aria-selected", String(other === tab)); });
    renderGallery(tab.dataset.category);
  }));
  const scrollGallery = direction => {
    const item = gallery.querySelector(".gallery-item");
    gallery.scrollBy({ left: direction * (item ? item.offsetWidth + 20 : 300), behavior: "smooth" });
  };
  document.querySelectorAll(".arrow").forEach(arrow => arrow.addEventListener("click", () => scrollGallery(Number(arrow.dataset.dir))));
  gallery.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); scrollGallery(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); scrollGallery(1); }
  });
  renderGallery("loiros");

  // Depoimentos: a seção só aparece quando houver depoimentos cadastrados
  const testimonials = Array.isArray(config.testimonials) ? config.testimonials.filter(item => item.text) : [];
  if (testimonials.length) {
    document.querySelector("#testimonial-grid").innerHTML = testimonials.map(item => `<article class="testimonial"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><blockquote>“${escape(item.text)}”</blockquote><cite>${escape(item.name || "")}${item.role ? `<small>${escape(item.role)}</small>` : ""}</cite></article>`).join("");
    document.querySelector("#depoimentos").hidden = false;
  }

  // Links de WhatsApp e checkout
  const waDigits = String(config.whatsapp || "").replace(/\D/g, "");
  const waLink = message => waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(message)}` : "";
  function setLinks(selector, target) {
    document.querySelectorAll(selector).forEach(link => { link.href = target; if (target.startsWith("https://")) { link.target = "_blank"; link.rel = "noreferrer"; } });
  }
  setLinks(".booking-link", waLink("Olá, Joice! Gostaria de agendar um horário no salão.") || config.bookingUrl || "#contato");
  setLinks(".course-online-link", (course.online && course.online.checkoutUrl) || waLink("Olá, Joice! Quero comprar o curso online.") || "#inscricao");
  setLinks(".course-presencial-link", waLink("Olá, Joice! Quero garantir minha vaga no curso presencial.") || "#inscricao");
  setLinks(".course-question-link", waLink("Olá, Joice! Tenho uma dúvida sobre o curso.") || "#contato");

  // Textos vindos do site-config.js
  document.querySelectorAll("[data-config]").forEach(el => { const value = config[el.dataset.config]; if (value) el.textContent = value; });
  document.querySelectorAll("[data-course]").forEach(el => { const value = el.dataset.course.split(".").reduce((obj, key) => obj && obj[key], course); if (value) el.textContent = value; });
  const waDisplay = document.querySelector('[data-config="whatsapp-display"]');
  if (waDigits && waDisplay) waDisplay.textContent = `+${waDigits}`;

  // Mapa
  if (config.address) {
    const query = encodeURIComponent(config.address);
    const iframe = document.querySelector("#map iframe");
    iframe.src = `https://www.google.com/maps?q=${query}&output=embed`;
    iframe.hidden = false;
    document.querySelector("#map").classList.add("has-map");
    const mapLink = document.querySelector(".map-link");
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    mapLink.hidden = false;
  }

  document.querySelector("#year").textContent = new Date().getFullYear();

  // Arrastar a galeria com o mouse
  let drag = null;
  gallery.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse") return;
    drag = { x: event.clientX, left: gallery.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", event => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    if (Math.abs(dx) > 4) { drag.moved = true; gallery.classList.add("is-dragging"); }
    gallery.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => { drag = null; gallery.classList.remove("is-dragging"); });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Header, barra de progresso, WhatsApp e parallax (um único loop de rolagem)
  const header = document.querySelector(".header");
  const progress = document.querySelector(".scroll-progress");
  const whatsapp = document.querySelector(".whatsapp-float");
  const parallaxItems = finePointer && !reduceMotion ? [...document.querySelectorAll(".hero-frame, .split-media img")] : [];
  let lastY = window.scrollY;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 10);
    const menuOpen = toggle.getAttribute("aria-expanded") === "true";
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 400);
    lastY = y;
    progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
    whatsapp.classList.toggle("is-visible", y > window.innerHeight * .6);
    parallaxItems.forEach(el => {
      const rect = el.getBoundingClientRect();
      const offset = Math.max(-28, Math.min(28, (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.05));
      el.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
    });
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  // Cards: brilho que segue o cursor e leve inclinação 3D nos planos
  if (finePointer) {
    document.querySelectorAll(".pain-card, .plan, .service-card, .fit-card, .credentials li, .testimonial").forEach(card => {
      card.classList.add("spotlight");
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
    if (!reduceMotion) {
      document.querySelectorAll(".plan").forEach(plan => {
        plan.addEventListener("pointermove", event => {
          const rect = plan.getBoundingClientRect();
          const rx = ((event.clientY - rect.top) / rect.height - .5) * -6;
          const ry = ((event.clientX - rect.left) / rect.width - .5) * 6;
          plan.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
        });
        plan.addEventListener("pointerleave", () => { plan.style.transform = ""; });
      });
    }
  }

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav");
  const setMenuOpen = open => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenuOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("click", event => { if (!event.target.closest(".header")) setMenuOpen(false); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenuOpen(false); toggle.focus(); }
  });

  onScroll();

  // Animações de entrada ao rolar: [seletor, direção]
  const revealGroups = [
    [".authority-item, .section-head, .pain-card, .pains-bridge, .modules li, .pillars li, .fit-card, .plan, .faq-list details, .service-card, .testimonial, .offer-note, .salon-cta, .contact-list div", "up"],
    [".split-media, .map", "clip"],
    [".method .split-copy, .faq-head, .curriculum-head", "right"],
    [".instructor .split-copy, .location-info", "left"],
    [".final-cta-inner, .marquee", "scale"],
  ];
  const revealTargets = [];
  revealGroups.forEach(([selector, direction]) => document.querySelectorAll(selector).forEach(el => {
    el.classList.add("reveal");
    el.dataset.reveal = direction;
    revealTargets.push(el);
  }));
  [".authority-item", ".pain-card", ".modules li", ".pillars li", ".fit-card", ".plan", ".faq-list details", ".service-card", ".contact-list div", ".testimonial"].forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => el.style.setProperty("--delay", `${Math.min(index, 5) * 90}ms`));
  });
  document.documentElement.classList.add("js");
  // Ao terminar a entrada, remove as classes para liberar os efeitos de hover
  const settle = el => {
    el.classList.remove("reveal", "is-visible");
    el.removeAttribute("data-reveal");
    el.style.removeProperty("--delay");
  };
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(settle);
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        const delay = parseFloat(el.style.getPropertyValue("--delay")) || 0;
        setTimeout(() => settle(el), delay + 1800);
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // Link ativo no menu
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle("is-current", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-30% 0px -60% 0px" });
    navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean).forEach(section => navObserver.observe(section));
  }
})();
