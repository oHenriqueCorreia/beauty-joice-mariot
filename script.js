(() => {
  const config = window.SITE_CONFIG || {};
  const categories = {
    loiros: { title: "Loiros", labels: ["Loiros", "Loiros", "Loiros", "Loiros"], tones: ["#d2bba4", "#c7b09c", "#d6c0a7", "#c7ad94"] },
    morenas: { title: "Morenas iluminadas", labels: ["Morena iluminada", "Morena iluminada", "Morena iluminada", "Morena iluminada"], tones: ["#b99b7d", "#c8a47c", "#af8e70", "#d0ad88"] },
    alisamento: { title: "Alisamento & cuidados", labels: ["Brazilian keratin", "Alisamento", "Cuidado capilar", "Transformação"], tones: ["#bda58e", "#cfbba6", "#c3aa91", "#d1bba4"] },
    penteados: { title: "Penteados", labels: ["Penteado", "Penteado", "Penteado", "Penteado"], tones: ["#c5a993", "#d6c2ac", "#b99a81", "#cbb39e"] },
    maquiagem: { title: "Maquiagem", labels: ["Maquiagem", "Maquiagem", "Maquiagem", "Maquiagem"], tones: ["#c8a58f", "#d4b7a3", "#b89380", "#d1b09a"] },
  };
  const track = document.querySelector("#gallery-track");
  let currentCategory = "loiros";

  function renderGallery() {
    const category = categories[currentCategory];
    const supplied = Array.isArray(config.photos) ? config.photos.filter(photo => photo.category === currentCategory && photo.src) : [];
    if (supplied.length) {
      track.innerHTML = supplied.map(photo => `<figure class="gallery-card has-image" style="--tone:#d4c2b0;--shade:#684d3c"><img src="${escape(photo.src)}" alt="${escape(photo.alt || category.title)}" loading="lazy"><figcaption class="gallery-label">${escape(photo.caption || category.title)}</figcaption></figure>`).join("");
    } else {
      track.innerHTML = Array.from({ length: 9 }, (_, index) => {
        const tone = category.tones[index % category.tones.length];
        const shade = index % 2 ? "#73553f" : "#593d2c";
        const label = category.labels[index % category.labels.length];
        return `<article class="gallery-card is-placeholder" style="--tone:${tone};--shade:${shade}" aria-label="Espaço reservado para foto autorizada: ${label}"><span class="placeholder-icon" aria-hidden="true">＋</span><div class="gallery-label">${label.toUpperCase()}<small>FOTO AUTORIZADA A ADICIONAR</small></div></article>`;
      }).join("");
    }
    activeSlide = 0;
    arrangeSlides();
  }
  function escape(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  let activeSlide = 0;
  function arrangeSlides() {
    const slides = [...track.querySelectorAll(".gallery-card")];
    slides.forEach((slide, index) => {
      const relative = ((index - activeSlide + slides.length + Math.floor(slides.length / 2)) % slides.length) - Math.floor(slides.length / 2);
      const distance = window.innerWidth <= 700 ? 64 : Math.min(132, track.clientWidth * .115);
      const scale = Math.max(.58, 1 - Math.abs(relative) * (window.innerWidth <= 700 ? .14 : .085));
      slide.style.setProperty("--slide-x", `${relative * distance}px`);
      slide.style.setProperty("--slide-rotation", `${relative * (window.innerWidth <= 700 ? 8 : 6)}deg`);
      slide.style.setProperty("--slide-scale", scale);
      slide.style.zIndex = String(20 - Math.abs(relative));
      slide.style.opacity = Math.abs(relative) > (window.innerWidth <= 700 ? 2 : 4) ? "0" : String(Math.max(.42, 1 - Math.abs(relative) * .12));
      slide.style.pointerEvents = Math.abs(relative) > (window.innerWidth <= 700 ? 2 : 4) ? "none" : "auto";
      slide.setAttribute("aria-hidden", Math.abs(relative) > (window.innerWidth <= 700 ? 2 : 4) ? "true" : "false");
      if (relative === 0) slide.setAttribute("aria-current", "true"); else slide.removeAttribute("aria-current");
    });
    track.setAttribute("aria-label", `Trabalho ${activeSlide + 1} de ${slides.length}. Use as setas para navegar.`);
  }
  function moveGallery(direction) {
    const count = track.querySelectorAll(".gallery-card").length;
    activeSlide = (activeSlide + direction + count) % count;
    arrangeSlides();
  }
  document.querySelectorAll(".portfolio-tab").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".portfolio-tab").forEach(tab => { tab.classList.toggle("is-active", tab === button); tab.setAttribute("aria-selected", tab === button ? "true" : "false"); });
    currentCategory = button.dataset.category; renderGallery();
  }));
  document.querySelector(".gallery-prev").addEventListener("click", () => moveGallery(-1));
  document.querySelector(".gallery-next").addEventListener("click", () => moveGallery(1));
  track.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); moveGallery(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveGallery(1); }
  });
  let dragStartX = null;
  track.addEventListener("pointerdown", event => { dragStartX = event.clientX; track.setPointerCapture(event.pointerId); track.classList.add("is-dragging"); });
  track.addEventListener("pointerup", event => {
    if (dragStartX === null) return;
    const dragDistance = event.clientX - dragStartX;
    if (Math.abs(dragDistance) > 35) moveGallery(dragDistance > 0 ? -1 : 1);
    dragStartX = null; track.classList.remove("is-dragging");
  });
  track.addEventListener("pointercancel", () => { dragStartX = null; track.classList.remove("is-dragging"); });
  window.addEventListener("resize", arrangeSlides);
  renderGallery();

  const services = {
    color: { index: "01 / 03", eyebrow: "COR & PERSONALIDADE", title: "Coloração", text: "Técnicas e possibilidades de cor conversadas de forma personalizada após conhecer o seu cabelo.", tags: ["Loiros", "Morena iluminada"], who: "Converse com a Joice sobre o resultado que procura.", time: "Consultar a profissional", price: "Solicitar orçamento" },
    care: { index: "02 / 03", eyebrow: "ALINHAMENTO & CUIDADO", title: "Cuidado capilar", text: "O perfil profissional destaca serviços de Brazilian keratin e alisamento. Detalhes devem ser confirmados com a Joice.", tags: ["Brazilian keratin", "Alisamento"], who: "Indicação conforme avaliação profissional.", time: "Consultar a profissional", price: "Solicitar orçamento" },
    finish: { index: "03 / 03", eyebrow: "FINALIZAÇÃO & BELEZA", title: "Seu toque final", text: "Penteados e maquiagem aparecem no perfil. Confirme disponibilidade e detalhes diretamente com a profissional.", tags: ["Penteados", "Maquiagem*"], who: "Converse sobre a ocasião e o que você deseja.", time: "Consultar a profissional", price: "Solicitar orçamento", note: "*A maquiagem é mencionada na bio; confirme se está ativa como serviço." },
  };
  const detail = document.querySelector("#service-detail");
  function renderService(key) {
    const service = services[key];
    detail.innerHTML = `<p class="eyebrow">${service.index} &nbsp;·&nbsp; ${service.eyebrow}</p><h3>${service.title}</h3><p>${service.text}</p><div class="service-tags">${service.tags.map(tag => `<span>${tag}</span>`).join("")}</div><div class="service-facts"><div><small>PARA QUEM</small><b>${service.who}</b></div><div><small>DURAÇÃO</small><b>${service.time}</b></div><div><small>VALORES</small><b>${service.price}</b></div></div>${service.note ? `<p class="service-note">${service.note}</p>` : ""}`;
  }
  document.querySelectorAll(".service-choice").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".service-choice").forEach(tab => { tab.classList.toggle("is-active", tab === button); tab.setAttribute("aria-selected", tab === button ? "true" : "false"); });
    renderService(button.dataset.service);
  }));
  renderService("color");

  const waDigits = String(config.whatsapp || "").replace(/\D/g, "");
  const bookingTarget = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent("Olá, Joice! Gostaria de saber mais sobre os serviços e horários.")}` : (config.bookingUrl || "#contato");
  document.querySelectorAll(".booking-link").forEach(link => { link.href = bookingTarget; if (bookingTarget.startsWith("https://")) { link.target = "_blank"; link.rel = "noreferrer"; } });
  document.querySelectorAll("[data-config]").forEach(el => { const value = config[el.dataset.config]; if (value && el.dataset.config !== "whatsapp-display") el.textContent = value; });
  const waDisplay = document.querySelector('[data-config="whatsapp-display"]');
  if (waDigits && waDisplay) waDisplay.textContent = `+${waDigits}`;
  document.querySelector("#year").textContent = new Date().getFullYear();
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const setMenuOpen = open => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenuOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("click", event => {
    if (toggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) setMenuOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  const revealTargets = document.querySelectorAll(
    ".hero-copy, .hero-visual, .values-strip > div, .section-heading, .gallery-shell, .gallery-hint, .approach-visual, .approach-copy, .journey-heading, .step, .conversation-band > :not(.band-flower), .service-list, .service-detail, .about-copy, .about-photo, .principles-inner > *, .testimonial-empty, .booking-band > :not(.booking-flower), .contact-intro, .contact-card, .faq-heading, .faq-list"
  );
  revealTargets.forEach(element => element.classList.add("reveal"));
  [".values-strip > div", ".step", ".principle-grid article", ".contact-item"].forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 75}ms`));
  });
  document.documentElement.classList.add("js");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach(element => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach(element => revealObserver.observe(element));
  }

  const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const observedSections = sectionLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      const visibleSection = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleSection) return;
      sectionLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${visibleSection.target.id}`;
        link.classList.toggle("is-current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.15, 0.4] });
    observedSections.forEach(section => navObserver.observe(section));
  }
})();
