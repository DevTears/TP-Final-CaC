document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', function (event) {
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje').value;
  
      if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos.');
        event.preventDefault();
      }
    });
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
  });

document.addEventListener("DOMContentLoaded", function () {
    
});