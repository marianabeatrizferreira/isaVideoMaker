const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 850);
});

const menuToggle = document.getElementById("menuToggle");
const sideNav = document.getElementById("sideNav");

if (menuToggle && sideNav) {
  menuToggle.addEventListener("click", () => {
    sideNav.classList.toggle("open");
  });

  sideNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1180) {
        sideNav.classList.remove("open");
      }
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.14
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

const cursorLight = document.getElementById("cursorLight");

window.addEventListener("mousemove", (event) => {
  if (!cursorLight || window.innerWidth <= 1180) return;

  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const form = document.getElementById("whatsappForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const tipo = document.getElementById("tipo").value;
    const pacote = document.getElementById("pacote").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    const numeroWhatsapp = "5598984288039";

    const texto =
      `Olá, Isa! Vim pelo site e gostaria de solicitar um orçamento.%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*Telefone:* ${telefone}%0A` +
      `*Tipo de serviço:* ${tipo}%0A` +
      `*Pacote:* ${pacote}%0A` +
      `*Detalhes:* ${mensagem}`;

    const url = `https://wa.me/${numeroWhatsapp}?text=${texto}`;
    window.open(url, "_blank");
  });
}
 const carousel = document.getElementById("testimonialsCarousel");
  const cards = Array.from(carousel.querySelectorAll(".testimonial-card"));
  const prevBtn = document.querySelector(".testimonial-btn.prev");
  const nextBtn = document.querySelector(".testimonial-btn.next");
  const dotsContainer = document.getElementById("testimonialDots");

  let currentIndex = 0;
  let autoPlay;
  let cardsPerView = getCardsPerView();

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(cards.length - cardsPerView, 0);
  }

  function updateCarousel() {
    cardsPerView = getCardsPerView();

    if (currentIndex > getMaxIndex()) {
      currentIndex = getMaxIndex();
    }

    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;
    const moveX = currentIndex * (cardWidth + gap);

    carousel.style.transform = `translateX(-${moveX}px)`;

    cards.forEach((card, index) => {
      card.classList.remove("active");
      if (index >= currentIndex && index < currentIndex + cardsPerView) {
        card.classList.add("active");
      }
    });

    updateDots();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const totalDots = getMaxIndex() + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Ir para grupo ${i + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    if (currentIndex >= getMaxIndex()) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      currentIndex = getMaxIndex();
    } else {
      currentIndex--;
    }
    updateCarousel();
  }

  function startAutoplay() {
    autoPlay = setInterval(() => {
      nextSlide();
    }, 3500);
  }

  function stopAutoplay() {
    clearInterval(autoPlay);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  window.addEventListener("resize", () => {
    createDots();
    updateCarousel();
  });

  createDots();
  updateCarousel();
  startAutoplay();