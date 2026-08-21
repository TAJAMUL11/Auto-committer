/**
 * Whiskers & Paws — Cat Landing Page Scripts
 * Handles: typing animation, stats counter, carousel, theme toggle,
 *          floating paws, scroll animations, breed filter/search,
 *          accordion tips, scroll progress, back to top button, and newsletter form.
 */

(function () {
  'use strict';

  // ─── Typing Animation ───────────────────────────────────
  const heroDescriptions = [
    "Cats have been our companions for over 10,000 years — mysterious, graceful, and endlessly entertaining.",
    "From ancient Egypt to your living room, cats continue to captivate hearts around the world.",
    "Whether they're napping in a sunbeam or chasing laser dots, cats make every day brighter.",
    "A house is not a home without a cat curled up somewhere, purring contentedly."
  ];

  function typeWriter(element, text, speed = 30) {
    return new Promise((resolve) => {
      let i = 0;
      element.textContent = '';
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          resolve();
        }
      }
      type();
    });
  }

  async function runTypingLoop() {
    const el = document.getElementById('heroDesc');
    if (!el) return;

    let index = 0;
    while (true) {
      await typeWriter(el, heroDescriptions[index], 28);
      await sleep(4000);

      // Fade out text
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
      await sleep(500);

      index = (index + 1) % heroDescriptions.length;
      el.style.opacity = '1';
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ─── Stats Counter ──────────────────────────────────────
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      function update() {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      update();
    });
  }

  // ─── Facts Carousel ─────────────────────────────────────
  function initCarousel() {
    const track = document.getElementById('factsTrack');
    const cards = document.querySelectorAll('.fact-card');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevFact');
    const nextBtn = document.getElementById('nextFact');
    let currentIndex = 0;
    let autoPlayInterval;

    if (!track || !cards.length || !dotsContainer) return;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to fact ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      resetAutoPlay();
    }

    function next() {
      goTo((currentIndex + 1) % cards.length);
    }

    function prev() {
      goTo((currentIndex - 1 + cards.length) % cards.length);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(next, 5000);
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    resetAutoPlay();
  }

  // ─── Theme Toggle ──────────────────────────────────────
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle?.querySelector('.toggle-icon');
    if (!toggle || !icon) return;

    // Check saved preference
    const savedTheme = localStorage.getItem('cat-landing-theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.textContent = '☀️';
    }

    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        icon.textContent = '🌙';
        localStorage.setItem('cat-landing-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
        localStorage.setItem('cat-landing-theme', 'dark');
      }
    });
  }

  // ─── Floating Paw Prints ────────────────────────────────
  function initFloatingPaws() {
    const container = document.getElementById('pawContainer');
    if (!container) return;

    const paws = ['🐾', '🐾', '🐾', '🐾', '🐾'];

    function spawnPaw() {
      const paw = document.createElement('span');
      paw.classList.add('paw');
      paw.textContent = paws[Math.floor(Math.random() * paws.length)];
      paw.style.left = Math.random() * 100 + 'vw';
      paw.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
      paw.style.animationDuration = (8 + Math.random() * 8) + 's';
      paw.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(paw);

      // Remove after animation completes
      setTimeout(() => {
        paw.remove();
      }, 18000);
    }

    // Initial batch
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnPaw, i * 600);
    }

    // Continuous spawning
    setInterval(spawnPaw, 2500);
  }

  // ─── Scroll Animations ─────────────────────────────────
  function initScrollAnimations() {
    const breedCards = document.querySelectorAll('.breed-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    breedCards.forEach((card) => observer.observe(card));
  }

  // ─── Breed Search & Filtering ───────────────────────────
  function initBreedFilter() {
    const searchInput = document.getElementById('breedSearch');
    const filterTags = document.querySelectorAll('.filter-tag');
    const breedCards = document.querySelectorAll('.breed-card');
    let currentFilter = 'all';

    function applyFilter() {
      const query = (searchInput?.value || '').toLowerCase().trim();

      breedCards.forEach((card) => {
        const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        const traits = (card.getAttribute('data-traits') || '').toLowerCase();

        const matchesQuery = !query || name.includes(query) || desc.includes(query) || traits.includes(query);
        const matchesTag = currentFilter === 'all' || traits.includes(currentFilter);

        if (matchesQuery && matchesTag) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    searchInput?.addEventListener('input', applyFilter);

    filterTags.forEach((tag) => {
      tag.addEventListener('click', () => {
        filterTags.forEach((t) => t.classList.remove('active'));
        tag.classList.add('active');
        currentFilter = tag.getAttribute('data-filter') || 'all';
        applyFilter();
      });
    });
  }

  // ─── Care Tips Accordion ────────────────────────────────
  function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach((item) => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');

      header?.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other items
        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
            const otherBody = other.querySelector('.accordion-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
          if (body) body.style.maxHeight = null;
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          if (body) body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  // ─── Scroll Progress & Back to Top ─────────────────────
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTop');
    const circle = document.querySelector('.progress-ring-circle');
    const circumference = 125.6; // 2 * PI * r (r=20)

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

      // Update top progress bar
      if (progressBar) {
        progressBar.style.width = `${scrollPercent * 100}%`;
      }

      // Update back-to-top button
      if (backToTopBtn) {
        if (scrollTop > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      if (circle) {
        const offset = circumference - (scrollPercent * circumference);
        circle.style.strokeDashoffset = offset;
      }
    }, { passive: true });

    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ─── Newsletter Form ─────────────────────────────────────
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput?.value;
      if (email) {
        const btn = form.querySelector('button');
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = '<span>Subscribed!</span> <span class="btn-icon">🎉</span>';
          setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = '<span>Subscribe</span> <span class="btn-icon">✨</span>';
            if (emailInput) emailInput.value = '';
          }, 3000);
        }
      }
    });
  }

  // ─── Navbar Scroll Effect ───────────────────────────────
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      navbar.classList.toggle('scrolled', currentScroll > 50);
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ─── Mobile Menu ────────────────────────────────────────
  function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      const isOpen = links.style.display === 'flex';
      links.style.display = isOpen ? 'none' : 'flex';
      links.style.position = 'absolute';
      links.style.top = 'var(--nav-height)';
      links.style.left = '0';
      links.style.right = '0';
      links.style.flexDirection = 'column';
      links.style.padding = '1.5rem';
      links.style.gap = '1rem';
      links.style.background = 'var(--glass-bg)';
      links.style.backdropFilter = 'blur(20px)';
      links.style.borderBottom = '1px solid var(--glass-border)';
    });

    // Close on link click
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          links.style.display = 'none';
        }
      });
    });
  }

  // ─── Initialize Everything ──────────────────────────────
  function init() {
    initThemeToggle();
    initFloatingPaws();
    initCarousel();
    initScrollAnimations();
    initBreedFilter();
    initAccordion();
    initScrollProgress();
    initNewsletter();
    initNavbar();
    initMobileMenu();
    animateCounters();
    runTypingLoop();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
