// script.js - funcionalidades: smooth scroll, form validation + mailto fallback, simple entrance animation
document.addEventListener("DOMContentLoaded", function () {
  // Inserir ano no rodapé
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links and collapse navbar on mobile when link clicked
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // collapse bootstrap navbar if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (
          navbarCollapse &&
          navbarCollapse.classList.contains("show") &&
          navbarToggler
        ) {
          navbarToggler.click();
        }
      }
    });
  });

  // Entrance animations for sections (simple, no library)
  const revealEls = document.querySelectorAll(
    "section, .hero-figure, .stat-card, .card"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.08 }
  );

  revealEls.forEach((el) => {
    el.classList.add("fade-in-up");
    revealObserver.observe(el);
  });

  // Form validation + submit handler (simulated)
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();
      feedback.textContent = "";
      // Bootstrap validation visuals
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        feedback.className = "small text-danger";
        feedback.textContent = "Por favor, corrija os campos em destaque.";
        return;
      }

      // Gather form values
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim() || "-";
      const message = form.message.value.trim();

      // Option A (default): open mail client with prefilled content (mailto)
      const subject = encodeURIComponent("Contato via site - " + name);
      const body = encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\n${message}`
      );
      // Use mailto as fallback; change to server integration below if desired
      window.location.href = `mailto:contato@advogadoexemplo.com?subject=${subject}&body=${body}`;

      // Show local feedback
      feedback.className = "small text-success";
      feedback.textContent =
        "Mensagem preparada. Seu cliente de e-mail deve abrir. Também podemos integrar um serviço de envio (Formspree, EmailJS, webhook).";
      form.reset();
      form.classList.remove("was-validated");

      // Option B (example): integrate EmailJS or fetch POST to your backend.
      // Example (EmailJS): uncomment and configure your userID and templateID:
      // emailjs.send('service_xxx', 'template_xxx', { from_name: name, from_email: email, phone, message })
      //   .then(() => { feedback.className='small text-success'; feedback.textContent='Mensagem enviada com sucesso.'; })
      //   .catch(() => { feedback.className='small text-danger'; feedback.textContent='Erro ao enviar. Tente por e-mail.'; });
    });
  }

  // Improve keyboard accessibility: enable focus outline for keyboard users only
  (function manageFocusOutline() {
    let mouseDown = false;
    document.body.addEventListener("mousedown", () => (mouseDown = true));
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Tab") mouseDown = false;
    });
    document.body.addEventListener("focusin", (e) => {
      if (mouseDown) e.target.classList.add("mouse-focused");
    });
  })();
});
