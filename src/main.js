// ===========================
// RPL – Navigation & Init
// ===========================

const API_BASE = 'http://localhost:4000';

// ---- Page Router ----
function showPage(pageId) {
  const pages = document.querySelectorAll('main > div');
  pages.forEach(page => {
    page.classList.toggle('active', page.id === pageId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNavHighlight(pageId);
}

function handleNavigation() {
  const hash = window.location.hash || '#home';
  const rawId = hash.substring(1);
  const parts = rawId.split('/');
  const pageId = parts[0];

  if (pageId === 'dettaglio-ristorante') {
    const id = parseInt(parts[1], 10);
    if (!isNaN(id)) renderDettaglioRistorante(id);
    showPage('dettaglio-ristorante');
  } else if (pageId === 'dettaglio-catena') {
    const id = parseInt(parts[1], 10);
    if (!isNaN(id)) renderDettaglioCatena(id);
    showPage('dettaglio-catena');
  } else if (document.getElementById(pageId)) {
    showPage(pageId);
  } else {
    showPage('home');
  }
}

// ---- Active Nav Highlight ----
function updateNavHighlight(pageId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const target = link.getAttribute('href')?.substring(1);
    link.classList.toggle('nav-active', target === pageId);
  });
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close on mobile nav link click
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ---- Login Modal ----
function initLoginModal() {
  const modal        = document.getElementById('loginModal');
  const loginBtn     = document.getElementById('loginBtn');
  const loginBtnMob  = document.getElementById('loginBtnMobile');
  const heroBtn      = document.getElementById('heroLoginBtn');
  const closeBtn     = document.getElementById('closeModal');
  const ristoBtn     = document.getElementById('loginRistoratore');
  const lavBtn       = document.getElementById('loginLavoratore');
  const form         = document.getElementById('loginForm');
  const formTitle    = document.getElementById('loginFormTitle');
  const submitBtn    = document.getElementById('submitLogin');
  const errorEl      = document.getElementById('loginError');
  const successEl    = document.getElementById('loginSuccess');
  const registerLink = document.getElementById('registerLink');

  if (!modal) return;

  let selectedRole = null;

  function openModal() { modal.classList.add('modal-open'); }
  function closeModal() {
    modal.classList.remove('modal-open');
    if (form) form.classList.add('hidden');
    if (errorEl)   { errorEl.classList.add('hidden'); errorEl.textContent = ''; }
    if (successEl) { successEl.classList.add('hidden'); successEl.textContent = ''; }
    selectedRole = null;
  }

  loginBtn    && loginBtn.addEventListener('click', openModal);
  loginBtnMob && loginBtnMob.addEventListener('click', () => { openModal(); document.getElementById('mobile-menu')?.classList.remove('open'); });
  heroBtn     && heroBtn.addEventListener('click', openModal);
  closeBtn    && closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Register link closes modal and navigates
  registerLink && registerLink.addEventListener('click', () => { closeModal(); });

  function selectRole(role, titleText) {
    selectedRole = role;
    if (formTitle) formTitle.textContent = titleText;
    if (form) form.classList.remove('hidden');
    if (errorEl)   errorEl.classList.add('hidden');
    if (successEl) successEl.classList.add('hidden');
  }

  ristoBtn && ristoBtn.addEventListener('click', () => {
    selectRole('restaurant', 'Login Ristoratore');
  });

  lavBtn && lavBtn.addEventListener('click', () => {
    selectRole('worker', 'Login Professionista');
  });

  // Submit login – tries API, falls back to demo mode
  submitBtn && submitBtn.addEventListener('click', async () => {
    const email    = document.getElementById('loginEmail')?.value?.trim();
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) {
      showError('Inserisci email e password.'); return;
    }

    submitBtn.textContent = 'Accesso in corso…';
    submitBtn.disabled = true;
    if (errorEl)   errorEl.classList.add('hidden');
    if (successEl) successEl.classList.add('hidden');

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: AbortSignal.timeout(4000),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showSuccess('✅ Login effettuato! Reindirizzamento…');
        const targetRole = selectedRole;
        setTimeout(() => {
          closeModal();
          window.location.hash = targetRole === 'restaurant' ? '#dashboard-ristoratore' : '#dashboard-lavoratore';
        }, 1000);
      } else {
        showError(data.message || 'Credenziali non valide.');
      }
    } catch (_err) {
      // API not reachable – use demo mode
      showSuccess('✅ Demo: accesso simulato. Reindirizzamento…');
      const targetRole = selectedRole;
      setTimeout(() => {
        closeModal();
        window.location.hash = targetRole === 'restaurant' ? '#dashboard-ristoratore' : '#dashboard-lavoratore';
      }, 1000);
    } finally {
      submitBtn.textContent = 'Entra';
      submitBtn.disabled = false;
    }
  });

  function showError(msg)   { if (errorEl)   { errorEl.textContent = msg;   errorEl.classList.remove('hidden'); } }
  function showSuccess(msg) { if (successEl) { successEl.textContent = msg; successEl.classList.remove('hidden'); } }
}

// ---- Search & Filter ----
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const filterLega  = document.getElementById('filter-lega');
  const searchBtn   = document.getElementById('search-btn');
  const resetBtn    = document.getElementById('reset-btn');

  function doSearch() {
    const query = searchInput?.value?.toLowerCase().trim() || '';
    const lega  = filterLega?.value?.toUpperCase() || '';
    renderRestaurantList(query, lega);
  }

  searchBtn  && searchBtn.addEventListener('click', doSearch);
  resetBtn   && resetBtn.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (filterLega)  filterLega.value  = '';
    renderRestaurantList('', '');
  });
  // Live search on input
  searchInput && searchInput.addEventListener('input', doSearch);
  filterLega  && filterLega.addEventListener('change', doSearch);
}

// ---- Animated Counters ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-counter[data-target]');
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current >= 1000
        ? current.toLocaleString('it-IT')
        : current.toString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ---- API Status Check ----
async function checkApiStatus() {
  const dots   = document.querySelectorAll('.api-status-dot');
  const labels = [document.getElementById('api-label'), document.getElementById('api-label-footer')];

  try {
    const res = await fetch(`${API_BASE}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      dots.forEach(d  => { d.className = 'api-status-dot online'; });
      labels.forEach(l => { if (l) l.textContent = 'API Online'; });
    } else {
      throw new Error('non-ok');
    }
  } catch (_) {
    dots.forEach(d   => { d.className = 'api-status-dot offline'; });
    labels.forEach(l => { if (l) l.textContent = 'API Offline (Demo)'; });
  }
}

// ---- Init ----
window.addEventListener('DOMContentLoaded', () => {
  // Init Lucide icons
  if (window.lucide?.createIcons) window.lucide.createIcons();

  // Populate dynamic sections
  if (typeof renderRestaurantList === 'function') renderRestaurantList('', '');
  if (typeof renderStaffList      === 'function') renderStaffList();
  if (typeof renderCateneFood     === 'function') renderCateneFood();

  // Router
  handleNavigation();
  window.addEventListener('hashchange', handleNavigation);

  // UI features
  initLoginModal();
  initMobileMenu();
  initSearch();

  // Animate counters when home is visible
  if ((window.location.hash || '#home') === '#home') {
    animateCounters();
  }
  window.addEventListener('hashchange', () => {
    if ((window.location.hash || '#home') === '#home') animateCounters();
  });

  // Re-init icons after dynamic renders
  setTimeout(() => {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }, 100);

  // Check API status
  checkApiStatus();
});
