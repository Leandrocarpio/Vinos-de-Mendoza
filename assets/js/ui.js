// =============================================================================
// UI.JS - Módulo de interfaz de usuario
// =============================================================================
// Responsable de toda la manipulación del DOM y efectos visuales
// Implementa el patrón de diseño: Separation of Concerns
// =============================================================================

export class UI {
  
  // ===========================================================================
  // RENDERIZADO DE CONTENIDO DINÁMICO
  // ===========================================================================
  
  /**
   * Renderiza tours dinámicamente en el DOM
   * @param {Array} tours - Array de objetos Tour
   * @param {HTMLElement} contenedor - Contenedor donde se renderizarán
   */
  static renderizarTours(tours, contenedor) {
    contenedor.innerHTML = "";
    
    tours.forEach(tour => {
      const tourCard = document.createElement("div");
      tourCard.className = "tour-card";
      tourCard.innerHTML = `
        <img src="${tour.imagen}" 
             alt="${tour.nombre}" 
             loading="lazy"
             width="400"
             height="200">
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

  /**
   * Renderiza vinos dinámicamente en el DOM
   * @param {Array} vinos - Array de objetos Vino
   * @param {HTMLElement} contenedor - Contenedor donde se renderizarán
   */
  static renderizarVinos(vinos, contenedor) {
    contenedor.innerHTML = "";
    
    vinos.forEach(vino => {
      const vinoCard = document.createElement("div");
      vinoCard.className = "vino-card";
      vinoCard.innerHTML = `
        <div class="vino-img-container">
          <img src="${vino.imagen}" 
               alt="${vino.nombre}" 
               class="vino-img"
               loading="lazy"
               width="200"
               height="300">
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
  
  // ===========================================================================
  // NAVEGACIÓN Y SCROLL
  // ===========================================================================
  
  /**
   * Implementa scroll suave a una sección específica
   * @param {string} selector - Selector CSS de la sección destino
   */
  static scrollSuaveA(selector) {
    const elemento = document.querySelector(selector);
    if (elemento) {
      elemento.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  }

  /**
   * Aplica efecto de cambio al navbar cuando se hace scroll
   * Agrega/remueve clase 'scrolled' para cambiar estilos
   */
  static aplicarEfectoNavbar() {
    const navbar = document.getElementById("navbar");
    
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
  
  // ===========================================================================
  // MENÚ HAMBURGUESA (MOBILE)
  // ===========================================================================
  
  /**
   * Maneja la funcionalidad del menú hamburguesa en mobile
   * - Toggle de menú
   * - Scroll lock cuando está abierto
   * - Cierre al hacer click en links
   * - Cierre al hacer click fuera del menú
   */
  static manejarMenuHamburguesa() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    if (!navToggle || !navMenu) return;
    
    // Toggle del menú al hacer click en el botón hamburguesa
    navToggle.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      
      // Bloquear scroll del body cuando el menú está abierto
      if (isActive) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    });
    
    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
    
    // Cerrar menú al hacer click fuera de él (en el overlay)
    document.addEventListener("click", (e) => {
      const isClickInsideMenu = navMenu.contains(e.target);
      const isClickOnToggle = navToggle.contains(e.target);
      
      if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }
  
  // ===========================================================================
  // ANIMACIONES CON INTERSECTION OBSERVER
  // ===========================================================================
  
  /**
   * Aplica animaciones cuando los elementos entran en el viewport
   * Utiliza IntersectionObserver para mejor performance
   */
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
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger un poco antes
      }
    );

    // Aplicar a todas las cards
    const elementos = document.querySelectorAll(
      ".tour-card, .vino-card, .experience-card, .testimonial-card"
    );
    
    elementos.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observador.observe(el);
    });
  }
  
  // ===========================================================================
  // FORMULARIO - ESTADOS Y MENSAJES
  // ===========================================================================
  
  /**
   * Muestra mensaje de confirmación o error
   * @param {HTMLElement} contenedor - Contenedor del mensaje
   * @param {string} mensaje - Texto del mensaje
   * @param {string} tipo - 'success' o 'error'
   */
  static mostrarMensaje(contenedor, mensaje, tipo = "success") {
    if (!contenedor) return;
    
    contenedor.className = `mensaje-confirmacion ${tipo}`;
    contenedor.textContent = mensaje;
    contenedor.style.display = "block";

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      contenedor.style.display = "none";
    }, 5000);
  }

  /**
   * Limpia todos los campos del formulario
   * @param {HTMLFormElement} formulario - Formulario a limpiar
   */
  static limpiarFormulario(formulario) {
    if (!formulario) return;
    
    formulario.reset();
    
    // Limpiar mensajes de error
    const errores = formulario.querySelectorAll('.error-message');
    errores.forEach(error => error.textContent = '');
    
    // Remover clases de error de inputs
    const inputs = formulario.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.classList.remove('error'));
  }

  /**
   * Alterna el estado de loading del botón de submit
   * @param {boolean} isLoading - True para mostrar loading, false para ocultar
   */
  static toggleLoadingButton(isLoading) {
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn?.querySelector(".btn-text");
    const btnLoader = submitBtn?.querySelector(".btn-loader");
    
    if (!submitBtn || !btnText || !btnLoader) return;
    
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.style.display = "none";
      btnLoader.style.display = "inline-flex";
    } else {
      submitBtn.disabled = false;
      btnText.style.display = "inline";
      btnLoader.style.display = "none";
    }
  }
  
  // ===========================================================================
  // UTILIDADES ADICIONALES
  // ===========================================================================
  
  /**
   * Debounce function para optimizar eventos que se disparan frecuentemente
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @returns {Function} Función debounced
   */
  static debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}