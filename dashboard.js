document.addEventListener('DOMContentLoaded', () => {

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('.dash-section');

  /* ---------- Mobile sidebar open/close ---------- */
  const openSidebar = () => {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  };
  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  };

  menuToggle?.addEventListener('click', openSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  /* ---------- Section routing (sidebar acts as in-page nav) ---------- */
  const showSection = (id) => {
    sections.forEach(sec => sec.classList.toggle('active', sec.id === id));
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      showSection(id);
      history.replaceState(null, '', `#${id}`);
      closeSidebar();
    });
  });

  /* Load section from URL hash on first paint, default to overview */
  const initialId = window.location.hash.replace('#', '');
  const validIds = Array.from(sections).map(s => s.id);
  showSection(validIds.includes(initialId) ? initialId : 'overview');

  /* ---------- Track shipment form (demo) ---------- */
  const trackForm = document.getElementById('trackForm');
  trackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
   ;
  });

  /* ---------- Notification bell (stub) ---------- */
  const notifBtn = document.getElementById('notifBtn');
  notifBtn?.addEventListener('click', () => {
    ;
  });
});

const email = localStorage.getItem("userEmail");

document.getElementById("userEmail").textContent = email;