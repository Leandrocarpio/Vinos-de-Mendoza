// ui.js - Manipulación del DOM y efectos visuales

export class UI {
  // Renderizar tours en el DOM
  static renderizarTours(tours, contenedor) {
    contenedor.innerHTML = "";
    
    tours.forEach(tour => {
      const tourCard = document.createElement("div");
      tourCard.className = "tour-card";
      tourCard.innerHTML = `
        <img src="${tour.imagen}" alt="${tour.nombre}">
        <div class="tour-info">
          <h3 class="tour-title">${tour.nombre}</h3>
          <p class="tour-desc">${tour.descripcion}</p>
          <div class="tour-price">${tour.obtenerPrecioFormateado()}</div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            <strong>Duración:</strong> ${tour.duracion}
          </p>
          <button class="tour-btn" data-tour-id="${tour.id}">Reservar Tour</button>
        </div>
      `;
      contenedor.appendChild(tourCard);
    });
  }

 // Renderizar vinos en el DOM
  static renderizarVinos(vinos, contenedor) {
    contenedor.innerHTML = "";
    
    vinos.forEach(vino => {
      const vinoCard = document.createElement("div");
      vinoCard.className = "vino-card";
      vinoCard.innerHTML = `
        <div class="vino-img-container">
          <img src="${vino.imagen}" alt="${vino.nombre}" class="vino-img">
        </div>
        <div class="vino-content">
          <h3 class="vino-name">${vino.nombre}</h3>
          <p class="vino-type">${vino.tipo}</p>
          <p class="vino-bodega">${vino.bodega}</p>
          <p class="vino-region"><i class="bi bi-geo-alt-fill"></i> ${vino.region}</p>
          <p class="vino-desc">${vino.obtenerDescripcion()}</p>
        </div>
      `;
      contenedor.appendChild(vinoCard);
    });
  }
  
  // Mostrar mensaje de confirmación
  static mostrarMensaje(contenedor, mensaje, tipo = "success") {
    contenedor.className = `mensaje-confirmacion ${tipo}`;
    contenedor.textContent = mensaje;
    contenedor.style.display = "block";

    setTimeout(() => {
      contenedor.style.display = "none";
    }, 5000);
  }

  // Limpiar formulario
  static limpiarFormulario(formulario) {
    formulario.reset();
  }

  // Scroll suave a sección
  static scrollSuaveA(selector) {
    const elemento = document.querySelector(selector);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Efecto navbar al hacer scroll
  static aplicarEfectoNavbar() {
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Animación al hacer scroll para elementos
  static animarAlScroll() {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            entrada.target.style.opacity = "1";
            entrada.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    // Aplicar a todas las cards
    const elementos = document.querySelectorAll(".tour-card, .vino-card, .benefit-card, .testimonial-card");
    elementos.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observador.observe(el);
    });
  }

  // Manejar clics en botones de tour
  static manejarClicTours() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("tour-btn")) {
        UI.scrollSuaveA("#reserva");
      }
    });
  }

  // Manejar botón hero
  static manejarBotonHero() {
    const botonHero = document.getElementById("explorBtn");
    if (botonHero) {
      botonHero.addEventListener("click", () => {
        UI.scrollSuaveA("#tours");
      });
    }
  }
}