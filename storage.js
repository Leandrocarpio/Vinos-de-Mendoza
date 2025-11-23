// storage.js - Manejo de localStorage

export class Storage {
  // Guardar reserva en localStorage
  static guardarReserva(reserva) {
    try {
      const reservas = this.obtenerReservas();
      reservas.push(reserva);
      localStorage.setItem("mendoza_wine_reservas", JSON.stringify(reservas));
      return true;
    } catch (error) {
      console.error("Error al guardar reserva:", error);
      return false;
    }
  }

  // Obtener todas las reservas
  static obtenerReservas() {
    try {
      const reservasJSON = localStorage.getItem("mendoza_wine_reservas");
      return reservasJSON ? JSON.parse(reservasJSON) : [];
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      return [];
    }
  }

  // Obtener última reserva
  static obtenerUltimaReserva() {
    const reservas = this.obtenerReservas();
    return reservas.length > 0 ? reservas[reservas.length - 1] : null;
  }

  // Eliminar reserva por ID
  static eliminarReserva(id) {
    try {
      const reservas = this.obtenerReservas();
      const reservasFiltradas = reservas.filter(r => r.id !== id);
      localStorage.setItem("mendoza_wine_reservas", JSON.stringify(reservasFiltradas));
      return true;
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      return false;
    }
  }

  // Limpiar todas las reservas
  static limpiarReservas() {
    try {
      localStorage.removeItem("mendoza_wine_reservas");
      return true;
    } catch (error) {
      console.error("Error al limpiar reservas:", error);
      return false;
    }
  }

  // Guardar favoritos (para funcionalidad futura)
  static guardarFavorito(item) {
    try {
      const favoritos = this.obtenerFavoritos();
      
      // Evitar duplicados
      const existe = favoritos.some(f => f.id === item.id);
      if (!existe) {
        favoritos.push(item);
        localStorage.setItem("mendoza_wine_favoritos", JSON.stringify(favoritos));
      }
      
      return true;
    } catch (error) {
      console.error("Error al guardar favorito:", error);
      return false;
    }
  }

  // Obtener favoritos
  static obtenerFavoritos() {
    try {
      const favoritosJSON = localStorage.getItem("mendoza_wine_favoritos");
      return favoritosJSON ? JSON.parse(favoritosJSON) : [];
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [];
    }
  }

  // Eliminar favorito
  static eliminarFavorito(id) {
    try {
      const favoritos = this.obtenerFavoritos();
      const favoritosFiltrados = favoritos.filter(f => f.id !== id);
      localStorage.setItem("mendoza_wine_favoritos", JSON.stringify(favoritosFiltrados));
      return true;
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      return false;
    }
  }

  // Verificar si un item es favorito
  static esFavorito(id) {
    const favoritos = this.obtenerFavoritos();
    return favoritos.some(f => f.id === id);
  }

  // Obtener estadísticas
  static obtenerEstadisticas() {
    return {
      totalReservas: this.obtenerReservas().length,
      totalFavoritos: this.obtenerFavoritos().length,
      ultimaReserva: this.obtenerUltimaReserva()
    };
  }
}