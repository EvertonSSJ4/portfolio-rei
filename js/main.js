// Typewriter, scroll reveal, toggle PT/EN, mobile nav
// Sem dependencia externa, tudo vanilla
(function () {
  var currentLang = localStorage.getItem('lang') || 'pt';

  var roles = {
    pt: ['Head de Produto', 'Head de Inovação', 'Gerente DevOps', 'Senior Product Owner'],
    en: ['Head of Product', 'Head of Innovation', 'DevOps Manager', 'Senior Product Owner']
  };

  // TYPEWRITER
  var typewriterEl = document.getElementById('typewriter');
  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 80;

  function typewrite() {
    var currentRoles = roles[currentLang];
    var currentRole = currentRoles[roleIndex % currentRoles.length];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex++;
      typeSpeed = 300;
    }

    setTimeout(typewrite, typeSpeed);
  }

  typewrite();

  // SCROLL REVEAL
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // LANGUAGE TOGGLE
  var langToggle = document.getElementById('langToggle');
  var ptOption = langToggle.querySelector('[data-lang="pt"]');
  var enOption = langToggle.querySelector('[data-lang="en"]');

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    if (lang === 'pt') {
      ptOption.classList.add('lang-toggle__option--active');
      enOption.classList.remove('lang-toggle__option--active');
    } else {
      enOption.classList.add('lang-toggle__option--active');
      ptOption.classList.remove('lang-toggle__option--active');
    }

    var translatables = document.querySelectorAll('[data-pt][data-en]');
    translatables.forEach(function (el) {
      el.classList.add('lang-switching');
    });

    setTimeout(function () {
      translatables.forEach(function (el) {
        var text = el.getAttribute('data-' + lang);
        if (el.tagName === 'PRE') {
          el.textContent = text;
        } else if (el.tagName === 'IMG') {
          el.alt = text;
        } else {
          el.textContent = text;
        }
        el.classList.remove('lang-switching');
      });
    }, 150);

    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typewriterEl.textContent = '';
  }

  langToggle.addEventListener('click', function () {
    setLanguage(currentLang === 'pt' ? 'en' : 'pt');
  });

  if (currentLang !== 'pt') {
    setLanguage(currentLang);
  }

  // HAMBURGER MENU
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.mobile-nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // SMOOTH SCROLL FOR HEADER LINKS
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
