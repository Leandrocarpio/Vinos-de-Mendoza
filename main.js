// main.js - Punto de entrada principal

import { toursData, vinosData, GestorReservas } from './tasks.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
  inicializarApp();
});

function inicializarApp() {
  // Renderizar contenido inicial
  cargarContenido();
  
  // Configurar efectos visuales
  configurarEfectos();
  
  // Configurar eventos
  configurarEventos();
  
  // Mostrar estadísticas en consola (para demostración)
  mostrarEstadisticas();
}

// Cargar todo el contenido dinámico
function cargarContenido() {
  const toursContainer = document.getElementById("toursContainer");
  const vinosContainer = document.getElementById("vinosContainer");
  
  if (toursContainer) {
    UI.renderizarTours(toursData, toursContainer);
  }
  
  if (vinosContainer) {
    UI.renderizarVinos(vinosData, vinosContainer);
  }
}

// Configurar efectos visuales
function configurarEfectos() {
  UI.aplicarEfectoNavbar();
  
  // Aplicar animaciones después de que se cargue el contenido
  setTimeout(() => {
    UI.animarAlScroll();
  }, 100);
}

// Configurar todos los eventos
function configurarEventos() {
  // Botón hero
  UI.manejarBotonHero();
  
  // Botones de tours
  UI.manejarClicTours();
  
  // Formulario de reserva
  configurarFormularioReserva();
}

// Configurar formulario de reserva
function configurarFormularioReserva() {
  const formulario = document.getElementById("reservaForm");
  const mensajeContainer = document.getElementById("mensajeConfirmacion");
  
  if (!formulario) return;
  
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    try {
      // Obtener datos del formulario
      const datosFormulario = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        personas: document.getElementById("personas").value,
        fecha: document.getElementById("fecha").value,
        mensaje: document.getElementById("mensaje").value
      };
      
      // Crear reserva usando la clase GestorReservas
      const reserva = GestorReservas.crearReserva(datosFormulario);
      
      // Guardar en localStorage
      const guardado = Storage.guardarReserva(reserva);
      
      if (guardado) {
        // Mostrar mensaje de éxito
        UI.mostrarMensaje(
          mensajeContainer,
          `¡Reserva confirmada! Te contactaremos a ${reserva.email} pronto.`,
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
        "Error al procesar la reserva. Por favor, verificá los datos.",
        "error"
      );
      
      console.error("❌ Error en reserva:", error);
    }
  });
}

// Mostrar estadísticas en consola
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

// Exportar funciones útiles para debugging
export { inicializarApp, cargarContenido };