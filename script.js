// script.js - mínimo: inserir ano, tratar formulário e botões "Comprar"
document.addEventListener('DOMContentLoaded', function () {
  // inserir ano no rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // FORM: validação HTML5 e fallback mailto
  var form = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.textContent = '';
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        feedback.className = 'small text-danger';
        feedback.textContent = 'Por favor, corrija os campos destacados.';
        return;
      }
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var subject = encodeURIComponent('Pedido / Contato — GameHub — ' + name);
      var body = encodeURIComponent('Nome: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:contato@gamehubexemplo.com?subject=' + subject + '&body=' + body;
      feedback.className = 'small text-success';
      feedback.textContent = 'Pronto — seu cliente de e-mail será aberto.';
      form.reset();
      form.classList.remove('was-validated');
    });
  }

  // BUY buttons: abrir mailto com produto (mínimo e direto)
  var buys = document.querySelectorAll('.buy-btn');
  buys.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var product = btn.getAttribute('data-product') || 'Produto';
      var price = btn.getAttribute('data-price') || '';
      var subject = encodeURIComponent('Compra: ' + product);
      var bodyText = 'Tenho interesse no produto: ' + product + (price ? ('\nPreço: ' + price) : '') + '\n\nPor favor, informem disponibilidade e procedimento de compra.';
      var body = encodeURIComponent(bodyText);
      window.location.href = 'mailto:contato@gamehubexemplo.com?subject=' + subject + '&body=' + body;
    });
  });
});