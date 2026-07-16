/* =========================================================
   PAGES.JS — About, Services, Contact, Login, Signup
   Assumes navbar.js already handles: hamburger drawer, nav
   overlay, scroll-reveal (.reveal / IntersectionObserver),
   and the scroll-to-top button. This file only powers the
   new page-specific widgets.
========================================================= */
(function(){
  "use strict";

  /* ---------- helpers ---------- */
  const NAME_RE   = /^[A-Za-z\s]{2,50}$/;
  const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  const PHONE_RE  = /^\+?[0-9]{7,15}$/;

  function setError(group, msg){
    if(!group) return;
    group.classList.add("error");
    const m = group.querySelector(".field-msg");
    if(m) m.textContent = msg;
    const field = group.querySelector("input, textarea, select");
    if(field){
      field.classList.remove("shake");
      void field.offsetWidth; /* restart animation */
      field.classList.add("shake");
    }
  }

  function clearError(group){
    if(!group) return;
    group.classList.remove("error");
    const m = group.querySelector(".field-msg");
    if(m) m.textContent = "";
  }

  function showToast(title, text, icon){
    let toast = document.querySelector(".toast");
    if(!toast){
      toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = `<i class="fa-solid ${icon || 'fa-circle-check'}"></i>
        <div><div class="t-title"></div><div class="t-text"></div></div>`;
      document.body.appendChild(toast);
    }
    toast.querySelector("i").className = `fa-solid ${icon || 'fa-circle-check'}`;
    toast.querySelector(".t-title").textContent = title;
    toast.querySelector(".t-text").textContent = text;
    toast.classList.add("show");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove("show"), 3600);
  }

  /* ---------- password show/hide ---------- */
  document.querySelectorAll(".password-field .toggle-eye").forEach(eye => {
    eye.addEventListener("click", () => {
      const input = eye.previousElementSibling;
      const hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      eye.classList.toggle("fa-eye", !hidden);
      eye.classList.toggle("fa-eye-slash", hidden);
    });
  });

  /* ---------- password strength meter ---------- */
  const pwInput = document.querySelector('[data-pw-strength]');
  const pwMeter = document.querySelector(".pw-strength");
  if(pwInput && pwMeter){
    pwInput.addEventListener("input", () => {
      const v = pwInput.value;
      let score = 0;
      if(v.length >= 8) score++;
      if(/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
      if(/[0-9]/.test(v)) score++;
      if(/[^A-Za-z0-9]/.test(v)) score++;
      pwMeter.className = "pw-strength" + (v ? " w-" + score : "");
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    if(!q) return;
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item.closest(".faq-wrap")?.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if(!wasOpen) item.classList.add("open");
    });
  });

  /* ---------- animated counters (About page stats) ---------- */
  const counters = document.querySelectorAll(".stat-num[data-target]");
  if(counters.length){
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10) || 0;
        const duration = 1400;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if(p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById("contactForm");
  if(contactForm){
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const name = contactForm.querySelector("#c-name");
      const email = contactForm.querySelector("#c-email");
      const subject = contactForm.querySelector("#c-subject");
      const message = contactForm.querySelector("#c-message");

      [name, email, subject, message].forEach(f => clearError(f.closest(".form-group")));

      if(!NAME_RE.test(name.value.trim())){
        setError(name.closest(".form-group"), "Enter a valid name (letters only)");
        valid = false;
      }
      if(!EMAIL_RE.test(email.value.trim())){
        setError(email.closest(".form-group"), "Enter a valid email address");
        valid = false;
      }
      if(subject.value.trim().length < 3){
        setError(subject.closest(".form-group"), "Subject is too short");
        valid = false;
      }
      if(message.value.trim().length < 10){
        setError(message.closest(".form-group"), "Message should be at least 10 characters");
        valid = false;
      }

      if(!valid) return;

      const btn = contactForm.querySelector("button[type=submit]");
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner"></i> Sending...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        contactForm.reset();
        showToast("Message sent!", "We'll get back to you within 24 hours.");
      }, 1100);
    });

    contactForm.querySelectorAll("input, textarea").forEach(f => {
      f.addEventListener("input", () => clearError(f.closest(".form-group")));
    });
  }

  

  /* ---------- SIGNUP FORM ---------- */
  const signupForm = document.getElementById("signupForm");
  if(signupForm){
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const name = signupForm.querySelector("#s-name");
      const email = signupForm.querySelector("#s-email");
      const phone = signupForm.querySelector("#s-phone");
      const pass = signupForm.querySelector("#s-password");
      const confirm = signupForm.querySelector("#s-confirm");
      const terms = signupForm.querySelector("#s-terms");

      [name, email, phone, pass, confirm].forEach(f => clearError(f.closest(".form-group")));
      terms.closest(".form-group")?.classList.remove("error");

      if(!NAME_RE.test(name.value.trim())){
        setError(name.closest(".form-group"), "Enter a valid full name (letters only)");
        valid = false;
      }
      if(!EMAIL_RE.test(email.value.trim())){
        setError(email.closest(".form-group"), "Enter a valid email address");
        valid = false;
      }
      if(!PHONE_RE.test(phone.value.trim())){
        setError(phone.closest(".form-group"), "Enter a valid phone number");
        valid = false;
      }
      if(pass.value.length < 8){
        setError(pass.closest(".form-group"), "Password must be at least 8 characters");
        valid = false;
      }
      if(confirm.value !== pass.value || confirm.value === ""){
        setError(confirm.closest(".form-group"), "Passwords do not match");
        valid = false;
      }
      if(!terms.checked){
        showToast("Almost there", "Please accept the Terms & Conditions to continue.", "fa-triangle-exclamation");
        valid = false;
      }

      if(!valid) return;

      const btn = signupForm.querySelector("button[type=submit]");
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner"></i> Creating account...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        showToast("Account created!", "Redirecting you to login...");
        setTimeout(() => { window.location.href = "./login.html"; }, 1200);
      }, 1100);
    });

    signupForm.querySelectorAll("input").forEach(f => {
      f.addEventListener("input", () => clearError(f.closest(".form-group")));
    });
  }

  /* ---------- BLOG: category filter pills ---------- */
  const filterPills = document.querySelectorAll(".filter-pill");
  const blogCards = document.querySelectorAll(".blog-card");
  if(filterPills.length){
    filterPills.forEach(pill => {
      pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const cat = pill.getAttribute("data-filter");
        blogCards.forEach(card => {
          const show = cat === "all" || card.getAttribute("data-category") === cat;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- BLOG: pagination (cosmetic, swaps active state) ---------- */
  const pageButtons = document.querySelectorAll(".page-btn[data-page]");
  if(pageButtons.length){
    pageButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        pageButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelector(".blog-layout")?.scrollIntoView({ behavior:"smooth", block:"start" });
      });
    });
  }

  /* ---------- NEWSLETTER form (sidebar + footer) ---------- */
  document.querySelectorAll(".side-newsletter form, .app-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const val = (input?.value || "").trim();
      if(input && input.type === "email" && !EMAIL_RE.test(val)){
        input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
        showToast("Invalid email", "Please enter a valid email address.", "fa-triangle-exclamation");
        return;
      }
      if(input) input.value = "";
      showToast("Subscribed!", "You'll hear from us with new posts and deals.");
    });
  });

})();