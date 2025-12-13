// =============================================================================
// MAIN.JS - Punto de entrada principal
// =============================================================================
// Orquesta la inicialización de la aplicación y conecta todos los módulos
// Arquitectura: Separación de responsabilidades con ES Modules
// =============================================================================

import { toursData, vinosData, GestorReservas } from './tasks.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';

// =============================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM cargado - Inicializando aplicación...');
  inicializarApp();
});

/**
 * Función principal de inicialización
 * Coordina la carga de contenido, efectos visuales y eventos
 */
function inicializarApp() {
  console.log('🚀 Inicializando aplicación...');
  
  try {
    // 1. Renderizar contenido dinámico
    cargarContenido();
    
    // 2. Configurar efectos visuales y animaciones
    configurarEfectos();
    
    // 3. Configurar manejadores de eventos
    configurarEventos();
    
    // 4. Mostrar estadísticas en consola (útil para debugging)
    mostrarEstadisticas();
    
    console.log('✅ Aplicación inicializada correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar aplicación:', error);
  }
}

// =============================================================================
// CARGA DE CONTENIDO DINÁMICO
// =============================================================================

/**
 * Renderiza tours y vinos desde los datos importados
 * Utiliza el módulo UI para la manipulación del DOM
 */
function cargarContenido() {
  console.log('📦 Cargando contenido dinámico...');
  
  const toursContainer = document.getElementById("toursContainer");
  const vinosContainer = document.getElementById("vinosContainer");
  
  if (toursContainer && toursData.length > 0) {
    console.log(`🎯 Renderizando ${toursData.length} tours`);
    UI.renderizarTours(toursData, toursContainer);
  } else {
    console.error('❌ No se encontró toursContainer o toursData está vacío');
  }
  
  if (vinosContainer && vinosData.length > 0) {
    console.log(`🍷 Renderizando ${vinosData.length} vinos`);
    UI.renderizarVinos(vinosData, vinosContainer);
  } else {
    console.error('❌ No se encontró vinosContainer o vinosData está vacío');
  }
}

// =============================================================================
// CONFIGURACIÓN DE EFECTOS VISUALES
// =============================================================================

/**
 * Aplica efectos visuales progresivos
 * - Navbar sticky con efecto scroll
 * - Animaciones con IntersectionObserver
 */
function configurarEfectos() {
  UI.aplicarEfectoNavbar();
  
  // Aplicar animaciones después de que se cargue el contenido
  setTimeout(() => {
    UI.animarAlScroll();
  }, 100);
}

// =============================================================================
// CONFIGURACIÓN DE EVENTOS
// =============================================================================

/**
 * Configura todos los event listeners de la aplicación
 * Delega responsabilidades a módulos específicos
 */
function configurarEventos() {
  console.log('🎮 Configurando eventos...');
  
  // Botón Hero - Scroll a tours
  const explorBtn = document.getElementById("explorBtn");
  if (explorBtn) {
    explorBtn.addEventListener('click', () => {
      console.log('🎯 Botón Hero clickeado - Scroll a tours');
      UI.scrollSuaveA("#tours");
    });
  }
  
  // Menú hamburguesa
  UI.manejarMenuHamburguesa();
  
  // Botones de tours - Scroll a reserva
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tour-btn")) {
      console.log('🎯 Botón de tour clickeado - Scroll a reserva');
      UI.scrollSuaveA("#reserva");
    }
  });
  
  // Formulario de reserva con validación
  configurarFormularioReserva();
  
  console.log('✅ Eventos configurados correctamente');
}

// =============================================================================
// FORMULARIO DE RESERVA CON VALIDACIÓN
// =============================================================================

/**
 * Configura el formulario con validación en tiempo real
 * Utiliza las clases GestorReservas y Storage para la lógica de negocio
 */
function configurarFormularioReserva() {
  const formulario = document.getElementById("reservaForm");
  const mensajeContainer = document.getElementById("mensajeConfirmacion");
  
  if (!formulario) return;
  
  // Validación en tiempo real para cada campo
  const campos = ['nombre', 'email', 'telefono', 'personas', 'fecha'];
  campos.forEach(campo => {
    const input = document.getElementById(campo);
    if (input) {
      input.addEventListener('blur', () => validarCampo(campo));
      input.addEventListener('input', () => limpiarError(campo));
    }
  });
  
  // Manejo del submit
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const camposValidos = campos.every(campo => validarCampo(campo));
    
    if (!camposValidos) {
      UI.mostrarMensaje(
        mensajeContainer,
        "Por favor, completá todos los campos correctamente.",
        "error"
      );
      return;
    }
    
    try {
      // Mostrar loading state
      UI.toggleLoadingButton(true);
      
      // Simular delay de envío (como si fuera una API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Obtener datos del formulario
      const datosFormulario = obtenerDatosFormulario();
      
      // Crear reserva usando la clase GestorReservas
      const reserva = GestorReservas.crearReserva(datosFormulario);
      
      // Guardar en localStorage
      const guardado = Storage.guardarReserva(reserva);
      
      if (guardado) {
        // Mostrar mensaje de éxito con animación
        UI.mostrarMensaje(
          mensajeContainer,
          `¡Reserva confirmada! 🎉 Te contactaremos pronto a ${reserva.email}. Recordá revisar tu casilla de SPAM.`,
          "success"
        );
        
        // Limpiar formulario
        UI.limpiarFormulario(formulario);
        
        // Log para demostración
        console.log("✅ Reserva guardada:", reserva);
        console.log("📊 Total de reservas:", Storage.obtenerReservas().length);
      } else {
        throw new Error("No se pudo guardar la reserva");
      }
      
    } catch (error) {
      // Mostrar mensaje de error
      UI.mostrarMensaje(
        mensajeContainer,
        "Error al procesar la reserva. Por favor, verificá los datos e intentá nuevamente.",
        "error"
      );
      
      console.error("❌ Error en reserva:", error);
      
    } finally {
      // Restaurar botón
      UI.toggleLoadingButton(false);
    }
  });
}

/**
 * Obtiene los datos del formulario
 * @returns {Object} Objeto con los datos del formulario
 */
function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    personas: document.getElementById("personas").value,
    fecha: document.getElementById("fecha").value,
    mensaje: document.getElementById("mensaje").value.trim()
  };
}

/**
 * Valida un campo individual del formulario
 * @param {string} campo - Nombre del campo a validar
 * @returns {boolean} True si el campo es válido
 */
function validarCampo(campo) {
  const input = document.getElementById(campo);
  const errorSpan = document.getElementById(`error${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
  
  if (!input || !errorSpan) return false;
  
  let esValido = true;
  let mensajeError = '';
  
  // Validaciones específicas por campo
  switch(campo) {
    case 'nombre':
      if (input.value.trim().length < 3) {
        esValido = false;
        mensajeError = 'El nombre debe tener al menos 3 caracteres';
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        esValido = false;
        mensajeError = 'Ingresá un email válido';
      }
      break;
      
    case 'telefono':
      const telefonoRegex = /^[0-9]{8,15}$/;
      if (!telefonoRegex.test(input.value.replace(/\s/g, ''))) {
        esValido = false;
        mensajeError = 'Ingresá un teléfono válido (8-15 dígitos)';
      }
      break;
      
    case 'personas':
      if (!input.value) {
        esValido = false;
        mensajeError = 'Seleccioná la cantidad de personas';
      }
      break;
      
    case 'fecha':
      const fechaSeleccionada = new Date(input.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (!input.value || fechaSeleccionada < hoy) {
        esValido = false;
        mensajeError = 'Seleccioná una fecha válida (hoy o posterior)';
      }
      break;
  }
  
  // Aplicar estilos de error/éxito
  if (esValido) {
    input.classList.remove('error');
    errorSpan.textContent = '';
  } else {
    input.classList.add('error');
    errorSpan.textContent = mensajeError;
  }
  
  return esValido;
}

/**
 * Limpia el mensaje de error de un campo
 * @param {string} campo - Nombre del campo
 */
function limpiarError(campo) {
  const input = document.getElementById(campo);
  const errorSpan = document.getElementById(`error${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
  
  if (input && errorSpan && input.value.trim()) {
    input.classList.remove('error');
    errorSpan.textContent = '';
  }
}

// =============================================================================
// ESTADÍSTICAS Y DEBUGGING
// =============================================================================

/**
 * Muestra estadísticas útiles en consola
 * Útil para debugging y demostración del funcionamiento
 */
function mostrarEstadisticas() {
  const stats = Storage.obtenerEstadisticas();
  
  console.log("=== 📊 MENDOZA WINE - Estadísticas ===");
  console.log(`Tours disponibles: ${toursData.length}`);
  console.log(`Vinos en catálogo: ${vinosData.length}`);
  console.log(`Reservas registradas: ${stats.totalReservas}`);
  console.log(`Favoritos guardados: ${stats.totalFavoritos}`);
  
  if (stats.ultimaReserva) {
    console.log("Última reserva:", stats.ultimaReserva.nombre);
  }
  
  console.log("=====================================");
}

// =============================================================================
// EXPORTACIONES
// =============================================================================
// Exportar funciones útiles para testing o debugging externo

export { inicializarApp, cargarContenido };