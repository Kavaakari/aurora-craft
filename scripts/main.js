document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.header__burger');
  const menuDrawer = document.querySelector('.menu');
  const closeBtn = document.querySelector('.menu__close');
  const menuLinks = document.querySelectorAll('.menu__link');

  const toggleMenu = (isOpen) => {
    menuDrawer.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    burgerBtn.setAttribute('aria-expanded', isOpen);
  };

  burgerBtn?.addEventListener('click', () => toggleMenu(true));
  closeBtn?.addEventListener('click', () => toggleMenu(false));

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    toggleMenu(false);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    if (!document.querySelector('.modal.is-open')) {
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.modal);
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.modal.is-open');
      if (activeModal) closeModal(activeModal);
    }
  });

  const registerForm = document.querySelector('#modal-register form');
  registerForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    closeModal(document.getElementById('modal-register'));
    openModal('modal-success');
  });

  document.querySelectorAll('.faq__item').forEach((item) => {
    const question = item.querySelector('.faq__item-question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', (event) => {
      event.preventDefault();

      if (item.open) {
        const closingAnim = answer.animate(
          [
            { height: `${answer.offsetHeight}px`, opacity: 1 },
            { height: '0px', opacity: 0 }
          ],
          { duration: 250, easing: 'ease' }
        );

        closingAnim.onfinish = () => item.removeAttribute('open');
      } else {
        item.setAttribute('open', '');
        answer.animate(
          [
            { height: '0px', opacity: 0 },
            { height: `${answer.offsetHeight}px`, opacity: 1 }
          ],
          { duration: 250, easing: 'ease' }
        );
      }
    });
  });

  const cookieBanner = document.getElementById('cookies-banner');
  const cookieConsent = localStorage.getItem('aurora_cookie_consent');

  if (cookieBanner && !cookieConsent) {
    setTimeout(() => {
      cookieBanner.classList.add('is-show');
      cookieBanner.setAttribute('aria-hidden', 'false');
    }, 600);
  }

  document.querySelectorAll('[data-cookie-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.cookieAction;
      localStorage.setItem('aurora_cookie_consent', action);

      if (cookieBanner) {
        cookieBanner.classList.remove('is-show');
        cookieBanner.setAttribute('aria-hidden', 'true');
      }
    });
  });
});