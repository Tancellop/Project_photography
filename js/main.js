const nav = document.querySelector('.nav');

if (nav) {
  // на внутрішніх сторінках немає хіро, тому навбар завжди має бути з фоном —
  // інакше при прокрутці вгору він стає прозорим прямо над контентом
  var heroSection = document.querySelector('.hero');

  window.addEventListener('scroll', function() {
    if (!heroSection) {
      nav.classList.add('nav--scrolled');
      return;
    }
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  if (!heroSection) {
    nav.classList.add('nav--scrolled');
  }
}

const burger = document.querySelector('.nav__burger');
const drawer = document.querySelector('.nav__drawer');

if (burger && drawer) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    drawer.classList.toggle('is-open', isOpen);
    if (isOpen) {
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key == 'Escape' && burger.classList.contains('is-open')) {
      burger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length > 0) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // спрацьовує один раз, далі не стежимо
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));
}

const lightbox = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox__img');
const lbClose = document.querySelector('.lightbox__close');
const lbPrev = document.querySelector('.lightbox__prev');
const lbNext = document.querySelector('.lightbox__next');
const lbCounter = document.querySelector('.lightbox__counter');
const galleryItems = document.querySelectorAll('.gallery-full .grid-item');

if (lightbox && galleryItems.length > 0) {
  let current = 0;

  const open = (index) => {
    current = index;
    const src = galleryItems[index].querySelector('img').src;
    lbImg.src = src;
    lbCounter.textContent = `${index + 1} / ${galleryItems.length}`;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const prev = () => {
    let prevIndex = current - 1;
    if (prevIndex < 0) prevIndex = galleryItems.length - 1;
    open(prevIndex);
  };

  const next = () => {
    let nextIndex = current + 1;
    if (nextIndex >= galleryItems.length) nextIndex = 0;
    open(nextIndex);
  };

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // клік по фону (не по фото і не по кнопках) закриває лайтбокс
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     close();
  });
}

const form = document.querySelector('.contact-form');
const successMsg = document.querySelector('.form-success-msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // TODO: додати реальне відправлення форми (наприклад через Formspree)
    console.log('form submitted');

    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }

    form.reset();
  });
}
