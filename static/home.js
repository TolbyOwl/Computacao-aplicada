(function () {
  "use strict";

  // essa parte é o negocinho de carregar a tela no começo
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add("hidden");
    }, 600);
  });

  // joga o html do loading pelo javascript msm pq é mais facil
  if (preloader) {
    preloader.innerHTML = `
      <div class="preloader-inner">
        <div class="preloader-logo"><i class="fa-solid fa-brain"></i></div>
        <div class="preloader-bar"><div class="preloader-fill"></div></div>
      </div>
    `;
  }

  // menu de celular
  const mobileToggle = document.getElementById("mobileNavToggle");
  const navMenu = document.getElementById("navmenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      mobileToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
    });

    // tem que fechar quando clica no link senão fica bugado
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
      });
    });

    // fecha qunado clica pra fora da caixa
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
      }
    });
  }

  // pinta o menu de cima dependendo da onde vc rolou na pagina
  const sections = document.querySelectorAll("section[id], main section[id]");
  const navLinks = document.querySelectorAll(".navmenu ul a");

  function updateActiveLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });

  // carrosel de imagens grandes na tela inicial.
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroIndicators = document.getElementById("heroIndicators");
  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");

  let heroIndex = 0;
  let heroTimer = null;
  const HERO_DELAY = 5000;

  if (heroSlides.length > 0 && heroIndicators) {
    // cria as bolinhas do carrosel
    heroSlides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "hero-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => goToHeroSlide(i));
      heroIndicators.appendChild(dot);
    });

    function goToHeroSlide(index) {
      heroSlides[heroIndex].classList.remove("active");
      document
        .querySelectorAll(".hero-dot")
        [heroIndex].classList.remove("active");

      heroIndex = (index + heroSlides.length) % heroSlides.length;

      heroSlides[heroIndex].classList.add("active");
      document.querySelectorAll(".hero-dot")[heroIndex].classList.add("active");

      resetHeroTimer();
    }

    function nextHeroSlide() {
      goToHeroSlide(heroIndex + 1);
    }
    function prevHeroSlide() {
      goToHeroSlide(heroIndex - 1);
    }

    function resetHeroTimer() {
      if (heroTimer) clearInterval(heroTimer);
      heroTimer = setInterval(nextHeroSlide, HERO_DELAY);
    }

    if (heroPrev) heroPrev.addEventListener("click", prevHeroSlide);
    if (heroNext) heroNext.addEventListener("click", nextHeroSlide);

    // arrastar no dedo no celular
    let heroTouchStartX = 0;
    const sliderEl = document.getElementById("heroSlider");
    if (sliderEl) {
      sliderEl.addEventListener(
        "touchstart",
        (e) => {
          heroTouchStartX = e.changedTouches[0].clientX;
        },
        { passive: true },
      );
      sliderEl.addEventListener(
        "touchend",
        (e) => {
          const diff = heroTouchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? nextHeroSlide() : prevHeroSlide();
        },
        { passive: true },
      );
    }

    resetHeroTimer();
  }

  // numeros que ficam subindo exemplo: (0 a 100).
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const stepTime = Math.max(Math.floor(duration / target), 4);
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / 16));
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString("pt-BR");
    }, 16);
  }

  const counterEls = document.querySelectorAll(".stat-number[data-target]");
  let countersStarted = false;

  function checkCounters() {
    if (countersStarted) return;
    const statsSection = document.querySelector(".stats-section");
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      countersStarted = true;
      counterEls.forEach((el) => animateCounter(el));
    }
  }

  window.addEventListener("scroll", checkCounters, { passive: true });
  checkCounters(); // já checa logo que abre a pagina

  // script de animação quando rola a pagina pra baixo
  function aosInit() {
    const elements = document.querySelectorAll("[data-aos]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
  }

  aosInit();

  // abas clicaveis das abordagens. esconde as outras e mostra a que clicou
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const pane = document.getElementById(`tab-${targetTab}`);
      if (pane) pane.classList.add("active");
    });
  });

  // outro carrosel
  const testimoniTrack = document.getElementById("testimonialsTrack");
  const testimoniPrev = document.getElementById("testimoniPrev");
  const testimoniNext = document.getElementById("testimoniNext");
  const testiDotsEl = document.getElementById("testiDots");

  if (testimoniTrack) {
    const cards = testimoniTrack.querySelectorAll(".testimonial-card");
    let testiIndex = 0;
    let visibleCount = getVisibleCount();

    function getVisibleCount() {
      if (window.innerWidth <= 580) return 1;
      if (window.innerWidth <= 860) return 2;
      return 3;
    }

    const totalPages = Math.ceil(cards.length / getVisibleCount());

    // criar bolinha dos depoimentos
    if (testiDotsEl) {
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("button");
        dot.className = "testi-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Página ${i + 1}`);
        dot.addEventListener("click", () => goToTesti(i));
        testiDotsEl.appendChild(dot);
      }
    }

    function getCardWidth() {
      const card = cards[0];
      if (!card) return 0;
      const style = getComputedStyle(card);
      const gap = parseFloat(getComputedStyle(testimoniTrack).gap) || 24;
      return card.offsetWidth + gap;
    }

    function goToTesti(index) {
      visibleCount = getVisibleCount();
      const pages = Math.ceil(cards.length / visibleCount);
      testiIndex = Math.max(0, Math.min(index, pages - 1));

      const cardW = getCardWidth();
      const offset = testiIndex * visibleCount * cardW;
      testimoniTrack.style.transform = `translateX(-${offset}px)`;

      document.querySelectorAll(".testi-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === testiIndex);
      });
    }

    if (testimoniPrev)
      testimoniPrev.addEventListener("click", () => goToTesti(testiIndex - 1));
    if (testimoniNext)
      testimoniNext.addEventListener("click", () => goToTesti(testiIndex + 1));

    window.addEventListener("resize", () => {
      goToTesti(0);
    });

    // mobile
    let tTouchStartX = 0;
    const tSlider = document.querySelector(".testimonials-slider");
    if (tSlider) {
      tSlider.addEventListener(
        "touchstart",
        (e) => {
          tTouchStartX = e.changedTouches[0].clientX;
        },
        { passive: true },
      );
      tSlider.addEventListener(
        "touchend",
        (e) => {
          const diff = tTouchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            diff > 0 ? goToTesti(testiIndex + 1) : goToTesti(testiIndex - 1);
          }
        },
        { passive: true },
      );
    }
  }

  // perguntas frequentes
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // fechando primeiro
      faqItems.forEach((i) => i.classList.remove("open"));

      // se tava fechado, abrir
      if (!isOpen) item.classList.add("open");
    });
  });

  // validacao do form de agendamento
  const appointmentForm = document.getElementById("appointmentForm");
  const formFeedbackEl = document.getElementById("formFeedback");
  let response_request;

  if (appointmentForm) {
    // travar preencher data
    const dateInput = document.getElementById("appt-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }

    appointmentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = document.getElementById("submitBtn");
      btn.disabled = true;
      btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

      try {
        const formData = new FormData(appointmentForm);
        const response = await fetch("", {
          method: "POST",
          body: formData,
        });
        response_request = await response.json();
        console.log(response_request);
      } catch (error) {
        console.error(error);
        response_request.message = error.message || "Erro desconhecido";
        response_request.status = "fail";
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML =
          '<i class="bi bi-calendar-plus"></i> Solicitar Agendamento';

        console.log(response_request.status);
        console.log(response_request.message);

        if (response_request.status === "success") {
          formFeedbackEl.className = "form-feedback success";
          formFeedbackEl.innerHTML =
            "✅ Solicitação enviada! Entraremos em contato em até 24 horas úteis para confirmar seu agendamento.";
          formFeedbackEl.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });

          appointmentForm.reset();

          // apaga e joga a data hoje
          const dateInput = document.getElementById("appt-date");
          if (dateInput) {
            const today = new Date().toISOString().split("T")[0];
            dateInput.setAttribute("min", today);
          }
        } else if (
          response_request.status === "fail" &&
          response_request.message.includes("Agendamento já existente")
        ) {
          formFeedbackEl.className = "form-feedback error";
          formFeedbackEl.innerHTML =
            "⚠️ Parece que já existe um agendamento para este email e data. Por favor, verifique seus dados ou inicie sessão para gerenciar seus agendamentos.";
          formFeedbackEl.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        } else {
          formFeedbackEl.className = "form-feedback error";
          formFeedbackEl.innerHTML =
            "❌ Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde ou entre em contato conosco.";
          formFeedbackEl.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }

        setTimeout(() => {
          if (formFeedbackEl) formFeedbackEl.className = "form-feedback";
        }, 8000);
      }, 1200);
    });
  }

  // o botao q volta pro topo qdo vc desce a pagina

  const scrollTopBtn = document.getElementById("scrollTop");

  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );
  }

  // descida suave qdo clica nos menus
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerH =
          document.querySelector(".site-header")?.offsetHeight || 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - headerH - 10;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // mascara telefone
  const handlePhone = (event) => {
    let input = event.target;
    input.value = maskPhone(input.value);
  };

  const maskPhone = (v) => {
    v = v.replace(/\D/g, "");
    v = v.substring(0, 11);

    if (v.length === 0) return "";
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 6) return `(${v.substring(0, 2)}) ${v.substring(2)}`;
    if (v.length <= 10)
      return `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
    return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
  };

  const apptPhoneInput = document.getElementById("appt-phone");
  const apptPhoneAltInput = document.getElementById("appt-phone-alternative");

  if (apptPhoneInput) {
    apptPhoneInput.addEventListener("input", handlePhone);
  }
  if (apptPhoneAltInput) {
    apptPhoneAltInput.addEventListener("input", handlePhone);
  }
})();
