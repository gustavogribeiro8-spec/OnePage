// script.js - versão mínima: ano e tratamento simples do formulário
document.addEventListener('DOMContentLoaded', function () {
  // inserir ano no rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // manipulação simples do formulário
  var form = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    feedback.textContent = '';

    // validação HTML5
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      feedback.className = 'small text-danger';
      feedback.textContent = 'Por favor, corrija os campos destacados.';
      return;
    }

    // coletar valores
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    // fallback simples: abrir cliente de e-mail
    var subject = encodeURIComponent('Contato via site - ' + name);
    var body = encodeURIComponent('Nome: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = 'mailto:contato@advogadoexemplo.com?subject=' + subject + '&body=' + body;

    // feedback e reset
    feedback.className = 'small text-success';
    feedback.textContent = 'Pronto — seu cliente de e-mail será aberto.';
    form.reset();
    form.classList.remove('was-validated');
  });
});