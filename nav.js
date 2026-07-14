/* ============ TOAST HELPER ============ */
const toast = document.getElementById('toast');
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}


/* ============ BEST SELLER TABS ============ */
const tabs = document.getElementById('tabs');
if (tabs) {
  const labels = { best: 'Best Seller', new: 'New In', popular: 'Popular' };
  tabs.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showToast(`Showing ${labels[tab.dataset.tab] || tab.textContent}`);
  });
}

/* ============ COUNTDOWN TIMER ============ */
(function startCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');
  if (!daysEl) return;

  let total =
    parseInt(daysEl.textContent, 10) * 86400 +
    parseInt(hoursEl.textContent, 10) * 3600 +
    parseInt(minsEl.textContent, 10) * 60 +
    parseInt(secsEl.textContent, 10);

  setInterval(() => {
    if (total <= 0) return;
    total -= 1;
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
})();

/* ============ RECENTLY VIEWED CAROUSEL ============ */
const rvGrid = document.getElementById('rvGrid');
const rvLeft = document.getElementById('rvLeft');
const rvRight = document.getElementById('rvRight');
if (rvGrid && rvLeft && rvRight) {
  const scrollAmount = 240;
  rvLeft.addEventListener('click', () => rvGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  rvRight.addEventListener('click', () => rvGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
}

/* ============ FORMS ============ */
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Subscribed — check your inbox for 10% off');
    subscribeForm.reset();
  });
}

const appForm = document.getElementById('appForm');
if (appForm) {
  appForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Download link sent to your phone');
    appForm.reset();
  });
}

/* ============ CART / WISHLIST QUICK ACTIONS ============ */
document.querySelectorAll('.quick-nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const icon = a.querySelector('i');
    if (icon && icon.classList.contains('fa-cart-shopping')) showToast('Cart is empty — go add something nice');
    if (icon && icon.classList.contains('fa-heart')) showToast('Wishlist is empty for now');
  });
});