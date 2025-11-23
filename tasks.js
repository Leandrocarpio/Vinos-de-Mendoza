// tasks.js - Lógica de negocio con POO

// Clase base para productos
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }

  obtenerPrecioFormateado() {
    return `USD $${this.precio}`;
  }
}

// Clase Tour hereda de Producto
export class Tour extends Producto {
  constructor(id, nombre, precio, duracion, descripcion, incluye, imagen) {
    super(id, nombre, precio);
    this.duracion = duracion;
    this.descripcion = descripcion;
    this.incluye = incluye;
    this.imagen = imagen;
  }

  obtenerDetalles() {
    return `${this.nombre} - ${this.duracion} - ${this.obtenerPrecioFormateado()}`;
  }
}

// Clase Vino (sin precio, solo información)
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

  obtenerDescripcion() {
    return this.descripcion;
  }
}

// Clase Reserva
export class Reserva {
  constructor(nombre, email, telefono, personas, fecha, mensaje) {
    this.id = Date.now();
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.personas = personas;
    this.fecha = fecha;
    this.mensaje = mensaje;
    this.fechaCreacion = new Date().toISOString();
  }

  obtenerResumen() {
    return `Reserva de ${this.nombre} para ${this.personas} personas el ${this.fecha}`;
  }

  validar() {
    if (!this.nombre || !this.email || !this.telefono || !this.personas || !this.fecha) {
      return false;
    }
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

// Datos de tours con imágenes de Unsplash y precios en USD
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

// Datos de vinos - SOLO 3 con tus imágenes, SIN precios
export const vinosData = [
  new Vino(
    1,
    "Malbec Premium",
    "Tinto",
    "Bodega Catena Zapata",
    "Luján de Cuyo",
    "Gran cuerpo, aromas intensos a frutos rojos maduros y notas especiadas. Ideal para carnes rojas y pastas con salsas robustas.",
    "img/Malbec premium.png"
  ),
  new Vino(
    2,
    "Blend Reserva",
    "Tinto",
    "Bodega Trapiche",
    "Maipú",
    "Mezcla equilibrada de uvas seleccionadas con crianza en barrica de roble. Perfecto para ocasiones especiales y maridajes gourmet.",
    "img/reserva.png"
  ),
  new Vino(
    3,
    "Chardonnay",
    "Blanco",
    "Bodega Luigi Bosca",
    "Valle de Uco",
    "Fresco y frutal, con notas cítricas y florales. Excelente para pescados, mariscos y quesos suaves. Un clásico mendocino.",
    "img/chardonnay.png"
  )
];

// Clase gestora de reservas
export class GestorReservas {
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

  static obtenerResumenReserva(reserva) {
    return {
      mensaje: reserva.obtenerResumen(),
      detalles: {
        id: reserva.id,
        fecha: reserva.fecha,
        personas: reserva.personas,
        contacto: reserva.email
      }
    };
  }
}