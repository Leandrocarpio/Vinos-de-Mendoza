// =============================================================================
// STORAGE.JS - Módulo de persistencia de datos
// =============================================================================
// Maneja todas las operaciones con localStorage
// Implementa: Try-Catch, Validaciones, Métodos estáticos
// =============================================================================

/**
 * Clase para manejar la persistencia de datos en localStorage
 * Todos los métodos son estáticos (no requiere instanciación)
 */
export class Storage {
  
  // ===========================================================================
  // CONSTANTES DE CLAVES
  // ===========================================================================
  
  static KEYS = {
    RESERVAS: 'mendoza_wine_reservas',
    FAVORITOS: 'mendoza_wine_favoritos',
    PREFERENCIAS: 'mendoza_wine_preferencias'
  };
  
  // ===========================================================================
  // GESTIÓN DE RESERVAS
  // ===========================================================================
  
  /**
   * Guarda una reserva en localStorage
   * @param {Object} reserva - Objeto de reserva a guardar
   * @returns {boolean} True si se guardó correctamente
   */
  static guardarReserva(reserva) {
    try {
      const reservas = this.obtenerReservas();
      reservas.push(reserva);
      localStorage.setItem(this.KEYS.RESERVAS, JSON.stringify(reservas));
      return true;
    } catch (error) {
      console.error("Error al guardar reserva:", error);
      return false;
    }
  }

  /**
   * Obtiene todas las reservas guardadas
   * @returns {Array} Array de reservas (vacío si no hay)
   */
  static obtenerReservas() {
    try {
      const reservasJSON = localStorage.getItem(this.KEYS.RESERVAS);
      return reservasJSON ? JSON.parse(reservasJSON) : [];
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      return [];
    }
  }

  /**
   * Obtiene la última reserva realizada
   * @returns {Object|null} Última reserva o null si no hay
   */
  static obtenerUltimaReserva() {
    const reservas = this.obtenerReservas();
    return reservas.length > 0 ? reservas[reservas.length - 1] : null;
  }

  /**
   * Busca una reserva por su ID
   * @param {number} id - ID de la reserva
   * @returns {Object|null} Reserva encontrada o null
   */
  static buscarReservaPorId(id) {
    const reservas = this.obtenerReservas();
    return reservas.find(r => r.id === id) || null;
  }

  /**
   * Elimina una reserva por su ID
   * @param {number} id - ID de la reserva a eliminar
   * @returns {boolean} True si se eliminó correctamente
   */
  static eliminarReserva(id) {
    try {
      const reservas = this.obtenerReservas();
      const reservasFiltradas = reservas.filter(r => r.id !== id);
      localStorage.setItem(this.KEYS.RESERVAS, JSON.stringify(reservasFiltradas));
      return true;
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      return false;
    }
  }

  /**
   * Actualiza una reserva existente
   * @param {number} id - ID de la reserva
   * @param {Object} datosActualizados - Nuevos datos
   * @returns {boolean} True si se actualizó correctamente
   */
  static actualizarReserva(id, datosActualizados) {
    try {
      const reservas = this.obtenerReservas();
      const index = reservas.findIndex(r => r.id === id);
      
      if (index === -1) return false;
      
      reservas[index] = { ...reservas[index], ...datosActualizados };
      localStorage.setItem(this.KEYS.RESERVAS, JSON.stringify(reservas));
      return true;
    } catch (error) {
      console.error("Error al actualizar reserva:", error);
      return false;
    }
  }

  /**
   * Limpia todas las reservas
   * @returns {boolean} True si se limpiaron correctamente
   */
  static limpiarReservas() {
    try {
      localStorage.removeItem(this.KEYS.RESERVAS);
      return true;
    } catch (error) {
      console.error("Error al limpiar reservas:", error);
      return false;
    }
  }
  
  // ===========================================================================
  // GESTIÓN DE FAVORITOS
  // ===========================================================================

  /**
   * Guarda un item favorito (tour o vino)
   * @param {Object} item - Item a guardar como favorito
   * @returns {boolean} True si se guardó correctamente
   */
  static guardarFavorito(item) {
    try {
      const favoritos = this.obtenerFavoritos();
      
      // Evitar duplicados
      const existe = favoritos.some(f => f.id === item.id);
      if (!existe) {
        favoritos.push({
          ...item,
          fechaAgregado: new Date().toISOString()
        });
        localStorage.setItem(this.KEYS.FAVORITOS, JSON.stringify(favoritos));
      }
      
      return true;
    } catch (error) {
      console.error("Error al guardar favorito:", error);
      return false;
    }
  }

  /**
   * Obtiene todos los favoritos
   * @returns {Array} Array de favoritos
   */
  static obtenerFavoritos() {
    try {
      const favoritosJSON = localStorage.getItem(this.KEYS.FAVORITOS);
      return favoritosJSON ? JSON.parse(favoritosJSON) : [];
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [];
    }
  }

  /**
   * Elimina un favorito por su ID
   * @param {number} id - ID del favorito a eliminar
   * @returns {boolean} True si se eliminó correctamente
   */
  static eliminarFavorito(id) {
    try {
      const favoritos = this.obtenerFavoritos();
      const favoritosFiltrados = favoritos.filter(f => f.id !== id);
      localStorage.setItem(this.KEYS.FAVORITOS, JSON.stringify(favoritosFiltrados));
      return true;
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      return false;
    }
  }

  /**
   * Verifica si un item es favorito
   * @param {number} id - ID del item
   * @returns {boolean} True si es favorito
   */
  static esFavorito(id) {
    const favoritos = this.obtenerFavoritos();
    return favoritos.some(f => f.id === id);
  }

  /**
   * Alterna el estado de favorito de un item
   * @param {Object} item - Item a alternar
   * @returns {boolean} True si ahora es favorito, false si se eliminó
   */
  static toggleFavorito(item) {
    if (this.esFavorito(item.id)) {
      this.eliminarFavorito(item.id);
      return false;
    } else {
      this.guardarFavorito(item);
      return true;
    }
  }
  
  // ===========================================================================
  // PREFERENCIAS DE USUARIO
  // ===========================================================================

  /**
   * Guarda preferencias del usuario
   * @param {Object} preferencias - Objeto con preferencias
   * @returns {boolean} True si se guardaron correctamente
   */
  static guardarPreferencias(preferencias) {
    try {
      const preferenciasActuales = this.obtenerPreferencias();
      const preferenciasActualizadas = {
        ...preferenciasActuales,
        ...preferencias,
        ultimaActualizacion: new Date().toISOString()
      };
      localStorage.setItem(this.KEYS.PREFERENCIAS, JSON.stringify(preferenciasActualizadas));
      return true;
    } catch (error) {
      console.error("Error al guardar preferencias:", error);
      return false;
    }
  }

  /**
   * Obtiene preferencias del usuario
   * @returns {Object} Objeto con preferencias
   */
  static obtenerPreferencias() {
    try {
      const preferenciasJSON = localStorage.getItem(this.KEYS.PREFERENCIAS);
      return preferenciasJSON ? JSON.parse(preferenciasJSON) : {
        idioma: 'es',
        tema: 'light',
        notificaciones: true
      };
    } catch (error) {
      console.error("Error al obtener preferencias:", error);
      return {};
    }
  }
  
  // ===========================================================================
  // ESTADÍSTICAS Y UTILIDADES
  // ===========================================================================

  /**
   * Obtiene estadísticas generales del almacenamiento
   * @returns {Object} Objeto con estadísticas
   */
  static obtenerEstadisticas() {
    const reservas = this.obtenerReservas();
    const favoritos = this.obtenerFavoritos();
    
    return {
      totalReservas: reservas.length,
      totalFavoritos: favoritos.length,
      ultimaReserva: this.obtenerUltimaReserva(),
      espacioUtilizado: this.calcularEspacioUtilizado(),
      reservasPorMes: this.contarReservasPorMes()
    };
  }

  /**
   * Calcula el espacio utilizado en localStorage
   * @returns {string} Espacio utilizado en KB
   */
  static calcularEspacioUtilizado() {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return `${(total / 1024).toFixed(2)} KB`;
    } catch (error) {
      console.error("Error al calcular espacio:", error);
      return "0 KB";
    }
  }

  /**
   * Cuenta reservas agrupadas por mes
   * @returns {Object} Objeto con conteo por mes
   */
  static contarReservasPorMes() {
    const reservas = this.obtenerReservas();
    const porMes = {};
    
    reservas.forEach(reserva => {
      const fecha = new Date(reserva.fechaCreacion);
      const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      porMes[mes] = (porMes[mes] || 0) + 1;
    });
    
    return porMes;
  }

  /**
   * Limpia todo el localStorage de la aplicación
   * @returns {boolean} True si se limpió correctamente
   */
  static limpiarTodo() {
    try {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error("Error al limpiar storage:", error);
      return false;
    }
  }

  /**
   * Exporta todos los datos como JSON
   * @returns {string} JSON con todos los datos
   */
  static exportarDatos() {
    try {
      const datos = {
        reservas: this.obtenerReservas(),
        favoritos: this.obtenerFavoritos(),
        preferencias: this.obtenerPreferencias(),
        exportadoEn: new Date().toISOString()
      };
      return JSON.stringify(datos, null, 2);
    } catch (error) {
      console.error("Error al exportar datos:", error);
      return null;
    }
  }

  /**
   * Importa datos desde un JSON
   * @param {string} jsonDatos - String JSON con los datos
   * @returns {boolean} True si se importaron correctamente
   */
  static importarDatos(jsonDatos) {
    try {
      const datos = JSON.parse(jsonDatos);
      
      if (datos.reservas) {
        localStorage.setItem(this.KEYS.RESERVAS, JSON.stringify(datos.reservas));
      }
      if (datos.favoritos) {
        localStorage.setItem(this.KEYS.FAVORITOS, JSON.stringify(datos.favoritos));
      }
      if (datos.preferencias) {
        localStorage.setItem(this.KEYS.PREFERENCIAS, JSON.stringify(datos.preferencias));
      }
      
      return true;
    } catch (error) {
      console.error("Error al importar datos:", error);
      return false;
    }
  }
  
  // ===========================================================================
  // VALIDACIONES Y VERIFICACIONES
  // ===========================================================================

  /**
   * Verifica si localStorage está disponible
   * @returns {boolean} True si localStorage funciona
   */
  static esLocalStorageDisponible() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el tamaño límite de localStorage
   * @returns {number} Tamaño máximo en MB (aproximado)
   */
  static obtenerLimiteStorage() {
    // La mayoría de navegadores tienen 5-10MB
    // Este es un valor aproximado
    return 5;
  }
}