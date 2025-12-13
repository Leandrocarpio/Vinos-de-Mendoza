// =============================================================================
// TASKS.JS - Lógica de negocio con Programación Orientada a Objetos
// =============================================================================
// Define las clases del dominio y los datos de la aplicación
// Implementa: Herencia, Encapsulación, Polimorfismo
// =============================================================================

// =============================================================================
// CLASE BASE: PRODUCTO
// =============================================================================

/**
 * Clase base para todos los productos (Tours, Vinos)
 * Implementa propiedades y métodos comunes
 */
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }

  /**
   * Formatea el precio con el símbolo de moneda
   * @returns {string} Precio formateado (ej: "USD $100")
   */
  obtenerPrecioFormateado() {
    return `USD $${this.precio}`;
  }
}

// =============================================================================
// CLASE: TOUR (Hereda de Producto)
// =============================================================================

/**
 * Representa un tour vitivinícola
 * @extends Producto
 */
export class Tour extends Producto {
  constructor(id, nombre, precio, duracion, descripcion, incluye, imagen) {
    super(id, nombre, precio);
    this.duracion = duracion;
    this.descripcion = descripcion;
    this.incluye = incluye; // Array de servicios incluidos
    this.imagen = imagen;
  }

  /**
   * Obtiene un resumen completo del tour
   * @returns {string} Resumen formateado del tour
   */
  obtenerDetalles() {
    return `${this.nombre} - ${this.duracion} - ${this.obtenerPrecioFormateado()}`;
  }

  /**
   * Verifica si el tour incluye un servicio específico
   * @param {string} servicio - Servicio a verificar
   * @returns {boolean} True si el servicio está incluido
   */
  incluyeServicio(servicio) {
    return this.incluye.some(item => 
      item.toLowerCase().includes(servicio.toLowerCase())
    );
  }
}

// =============================================================================
// CLASE: VINO
// =============================================================================

/**
 * Representa un vino del catálogo
 * No hereda de Producto porque no tiene precio (solo informativo)
 */
export class Vino {
  constructor(id, nombre, tipo, bodega, region, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.bodega = bodega;
    this.region = region;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }

  /**
   * Obtiene la descripción del vino
   * @returns {string} Descripción del vino
   */
  obtenerDescripcion() {
    return this.descripcion;
  }

  /**
   * Genera un resumen corto del vino
   * @returns {string} Resumen con tipo, bodega y región
   */
  obtenerResumen() {
    return `${this.tipo} - ${this.bodega} (${this.region})`;
  }
}

// =============================================================================
// CLASE: RESERVA
// =============================================================================

/**
 * Representa una reserva de tour
 * Incluye validación de datos
 */
export class Reserva {
  constructor(nombre, email, telefono, personas, fecha, mensaje) {
    this.id = Date.now(); // ID único basado en timestamp
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.personas = personas;
    this.fecha = fecha;
    this.mensaje = mensaje;
    this.fechaCreacion = new Date().toISOString();
    this.estado = 'pendiente'; // pendiente, confirmada, cancelada
  }

  /**
   * Genera un resumen legible de la reserva
   * @returns {string} Resumen de la reserva
   */
  obtenerResumen() {
    return `Reserva de ${this.nombre} para ${this.personas} personas el ${this.formatearFecha()}`;
  }

  /**
   * Formatea la fecha de la reserva
   * @returns {string} Fecha formateada en español
   */
  formatearFecha() {
    const fecha = new Date(this.fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-AR', opciones);
  }

  /**
   * Valida que todos los campos requeridos sean correctos
   * @returns {boolean} True si la reserva es válida
   */
  validar() {
    // Verificar campos requeridos
    if (!this.nombre || !this.email || !this.telefono || !this.personas || !this.fecha) {
      return false;
    }
    
    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return false;
    }
    
    // Validar que la fecha sea futura
    const fechaReserva = new Date(this.fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaReserva < hoy) {
      return false;
    }
    
    return true;
  }

  /**
   * Marca la reserva como confirmada
   */
  confirmar() {
    this.estado = 'confirmada';
  }

  /**
   * Cancela la reserva
   */
  cancelar() {
    this.estado = 'cancelada';
  }
}

// =============================================================================
// DATOS: TOURS DISPONIBLES
// =============================================================================

/**
 * Catálogo de tours disponibles
 * @type {Tour[]}
 */
export const toursData = [
  new Tour(
    1,
    "Tour Clásico",
    100,
    "Día completo",
    "Visitá 2 bodegas tradicionales con degustación incluida y almuerzo campestre",
    ["Transporte", "Guía experto", "Degustación", "Almuerzo"],
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop"
  ),
  new Tour(
    2,
    "Tour Premium",
    250,
    "Día completo",
    "Experiencia VIP en bodegas boutique con maridaje gourmet y sommelier privado",
    ["Transporte privado", "Sommelier", "Maridaje gourmet", "Cena"],
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop"
  ),
  new Tour(
    3,
    "Tour Deluxe",
    500,
    "2 días / 1 noche",
    "Experiencia exclusiva con alojamiento en bodega, catas privadas y tour en helicóptero",
    ["Transporte luxury", "Alojamiento 5★", "Heli-tour", "Chef privado"],
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop"
  )
];

// =============================================================================
// DATOS: CATÁLOGO DE VINOS
// =============================================================================

/**
 * Catálogo de vinos mendocinos
 * @type {Vino[]}
 */
export const vinosData = [
  new Vino(
    1,
    "Malbec Premium",
    "Tinto",
    "Bodega Catena Zapata",
    "Luján de Cuyo",
    "Gran cuerpo, aromas intensos a frutos rojos maduros y notas especiadas. Ideal para carnes rojas y pastas con salsas robustas.",
    "assets/img/Malbec premium.png"
  ),
  new Vino(
    2,
    "Blend Reserva",
    "Tinto",
    "Bodega Trapiche",
    "Maipú",
    "Mezcla equilibrada de uvas seleccionadas con crianza en barrica de roble. Perfecto para ocasiones especiales y maridajes gourmet.",
    "assets/img/reserva.png"
  ),
  new Vino(
    3,
    "Chardonnay",
    "Blanco",
    "Bodega Luigi Bosca",
    "Valle de Uco",
    "Fresco y frutal, con notas cítricas y florales. Excelente para pescados, mariscos y quesos suaves. Un clásico mendocino.",
    "assets/img/chardonnay.png"
  )
];

// =============================================================================
// CLASE: GESTOR DE RESERVAS
// =============================================================================

/**
 * Clase gestora para manejar operaciones con reservas
 * Utiliza métodos estáticos (no requiere instanciación)
 */
export class GestorReservas {
  
  /**
   * Crea una nueva reserva validada
   * @param {Object} datosFormulario - Datos del formulario de reserva
   * @returns {Reserva} Instancia de Reserva validada
   * @throws {Error} Si los datos son inválidos
   */
  static crearReserva(datosFormulario) {
    const reserva = new Reserva(
      datosFormulario.nombre,
      datosFormulario.email,
      datosFormulario.telefono,
      datosFormulario.personas,
      datosFormulario.fecha,
      datosFormulario.mensaje || ""
    );

    if (!reserva.validar()) {
      throw new Error("Datos de reserva inválidos");
    }

    return reserva;
  }

  /**
   * Obtiene un resumen formateado de la reserva
   * @param {Reserva} reserva - Instancia de Reserva
   * @returns {Object} Objeto con mensaje y detalles
   */
  static obtenerResumenReserva(reserva) {
    return {
      mensaje: reserva.obtenerResumen(),
      detalles: {
        id: reserva.id,
        fecha: reserva.formatearFecha(),
        personas: reserva.personas,
        contacto: reserva.email,
        estado: reserva.estado
      }
    };
  }

  /**
   * Busca un tour por su ID
   * @param {number} id - ID del tour
   * @returns {Tour|null} Tour encontrado o null
   */
  static buscarTourPorId(id) {
    return toursData.find(tour => tour.id === id) || null;
  }

  /**
   * Filtra tours por rango de precio
   * @param {number} min - Precio mínimo
   * @param {number} max - Precio máximo
   * @returns {Tour[]} Tours dentro del rango
   */
  static filtrarToursPorPrecio(min, max) {
    return toursData.filter(tour => 
      tour.precio >= min && tour.precio <= max
    );
  }

  /**
   * Obtiene tours que incluyen un servicio específico
   * @param {string} servicio - Servicio a buscar
   * @returns {Tour[]} Tours que incluyen el servicio
   */
  static buscarToursPorServicio(servicio) {
    return toursData.filter(tour => 
      tour.incluyeServicio(servicio)
    );
  }
}

// =============================================================================
// EXPORTACIONES ADICIONALES
// =============================================================================

/**
 * Objeto con estadísticas del catálogo
 * Útil para debugging y dashboard
 */
export const estadisticasCatalogo = {
  totalTours: toursData.length,
  totalVinos: vinosData.length,
  precioMinimoTour: Math.min(...toursData.map(t => t.precio)),
  precioMaximoTour: Math.max(...toursData.map(t => t.precio)),
  bodegasRepresentadas: [...new Set(vinosData.map(v => v.bodega))].length
};