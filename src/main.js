// --- LOGICA DI NAVIGAZIONE E INIZIALIZZAZIONE ---

function showPage(pageId) {
  const mainContent = document.querySelector('main');
  const pages = mainContent.querySelectorAll('main > div');
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
  window.scrollTo(0, 0);
}

function handleNavigation() {
  const hash = window.location.hash || '#home';
  const pageId = hash.substring(1).split('/')[0];

  if (pageId.startsWith('dettaglio-ristorante')) {
    const ristoranteId = parseInt(hash.split('/')[1]);
    if (!Number.isNaN(ristoranteId)) {
      renderDettaglioRistorante(ristoranteId);
    }
    showPage('dettaglio-ristorante');
  } else if (document.getElementById(pageId)) {
    showPage(pageId);
  } else {
    showPage('home');
  }
}

function initLoginModal() {
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModalBtn = document.getElementById('closeModal');
  const loginRistoratoreBtn = document.getElementById('loginRistoratore');
  const loginLavoratoreBtn = document.getElementById('loginLavoratore');

  if (!loginBtn || !loginModal) return;

  loginBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
  closeModalBtn && closeModalBtn.addEventListener('click', () => loginModal.classList.add('hidden'));
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.add('hidden');
    }
  });

  loginRistoratoreBtn && loginRistoratoreBtn.addEventListener('click', () => {
    window.location.hash = '#dashboard-ristoratore';
    loginModal.classList.add('hidden');
  });

  loginLavoratoreBtn && loginLavoratoreBtn.addEventListener('click', () => {
    window.location.hash = '#dashboard-lavoratore';
    loginModal.classList.add('hidden');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Inizializza icone
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  // Popola sezioni dinamiche
  if (typeof renderRestaurantList === 'function') renderRestaurantList();
  if (typeof renderStaffList === 'function') renderStaffList();
  // Router
  handleNavigation();
  window.addEventListener('hashchange', handleNavigation);
  // Modale login
  initLoginModal();
});

