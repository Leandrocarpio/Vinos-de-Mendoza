# 🍷 Mendoza Wine - Experiencia Vitivinícola

Sitio web profesional de turismo vitivinícola desarrollado con JavaScript moderno, ES Modules y Programación Orientada a Objetos.

![Mendoza Wine](img/portada.png)

## 📋 Descripción

**Mendoza Wine** es una landing page interactiva diseñada para promover el turismo del vino en Mendoza, Argentina. El proyecto implementa las mejores prácticas de desarrollo frontend, incluyendo arquitectura modular, POO y almacenamiento local.

## 🚀 Características

- ✅ **Diseño Responsivo**: Adaptado a todos los dispositivos
- ✅ **Hero Full-Screen**: Portada impactante con imagen de viñedos
- ✅ **Tours Interactivos**: Tarjetas de tours con información detallada
- ✅ **Catálogo de Vinos**: Selección premium de vinos mendocinos
- ✅ **Sistema de Reservas**: Formulario funcional con validación
- ✅ **LocalStorage**: Persistencia de datos de reservas
- ✅ **Animaciones**: Efectos suaves al hacer scroll
- ✅ **ES Modules**: Código modular y organizado
- ✅ **POO**: Clases Tour, Vino, Reserva con herencia

## 📁 Estructura de Archivos

```
mendoza-wine/
├── index.html          # Página principal
├── about.html          # Sobre el desarrollador
├── styles.css          # Estilos globales
├── main.js            # Punto de entrada (imports)
├── tasks.js           # Lógica de negocio (Clases POO)
├── ui.js              # Manipulación del DOM
├── storage.js         # Manejo de localStorage
├── img/               # Imágenes del proyecto
│   ├── portada.png
│   ├── Malbec premium.png
│   ├── reserva.png
│   └── chardonnay.png
└── README.md          # Documentación
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, Grid y Flexbox
- **JavaScript ES6+**: Sintaxis moderna

### Características JavaScript
- **ES Modules**: `import/export` para modularización
- **POO**: Clases, herencia, métodos estáticos
- **localStorage**: Persistencia de datos
- **DOM Manipulation**: Renderizado dinámico
- **Event Handling**: Gestión de eventos
- **Async/Await**: Operaciones asíncronas (preparado para APIs)

## 📦 Módulos del Proyecto

### `tasks.js` - Lógica de Negocio
Contiene las clases principales del proyecto:

```javascript
class Producto              // Clase base
class Tour extends Producto // Tours vitivinícolas
class Vino extends Producto // Catálogo de vinos
class Reserva              // Sistema de reservas
class GestorReservas       // Métodos estáticos para gestión
```

**Funcionalidades:**
- Creación de objetos Tour y Vino
- Validación de reservas
- Formateo de precios
- Obtención de detalles

### `ui.js` - Interfaz de Usuario
Maneja toda la manipulación del DOM:

```javascript
class UI {
  static renderizarTours()    // Renderiza tours dinámicamente
  static renderizarVinos()    // Renderiza catálogo de vinos
  static mostrarMensaje()     // Mensajes de confirmación
  static scrollSuaveA()       // Navegación suave
  static aplicarEfectoNavbar() // Efecto scroll navbar
  static animarAlScroll()     // Animaciones con IntersectionObserver
}
```

### `storage.js` - Persistencia de Datos
Gestión de localStorage:

```javascript
class Storage {
  static guardarReserva()      // Guarda reserva en localStorage
  static obtenerReservas()     // Recupera todas las reservas
  static obtenerUltimaReserva() // Última reserva realizada
  static eliminarReserva()     // Elimina por ID
  static guardarFavorito()     // Sistema de favoritos
  static obtenerEstadisticas() // Stats del sitio
}
```

### `main.js` - Punto de Entrada
Inicializa la aplicación y conecta todos los módulos:

```javascript
import { toursData, vinosData, GestorReservas } from './tasks.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';

// Inicialización, eventos y carga de contenido
```

## 💻 Instalación y Uso

### Requisitos
- Navegador web moderno con soporte para ES6 Modules
- Servidor local (Live Server, Python SimpleHTTPServer, etc.)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/mendoza-wine.git
cd mendoza-wine
```

2. **Ejecutar con Live Server**
- Opción 1: Extensión "Live Server" de VS Code
- Opción 2: Python
```bash
python -m http.server 8000
```

3. **Abrir en el navegador**
```
http://localhost:8000
```

> ⚠️ **Importante**: No abrir `index.html` directamente. Los ES Modules requieren servidor HTTP.

## 🎨 Características de Diseño

### Paleta de Colores
- **Primary**: `#8B0000` (Rojo vino)
- **Secondary**: `#FFD700` (Dorado)
- **Dark**: `#1a1a1a` (Negro elegante)
- **Light**: `#f8f9fa` (Blanco suave)

### Tipografía
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Títulos**: Bold 700-800
- **Texto**: Regular 400-500

### Efectos Visuales
- Hero full-screen con overlay
- Navbar con efecto scroll
- Cards con hover elevado
- Animaciones con Intersection Observer
- Smooth scroll entre secciones

## 📊 Programación Orientada a Objetos

### Herencia
```javascript
Producto (clase base)
   ↓
   ├── Tour (hereda de Producto)
   └── Vino (hereda de Producto)
```

### Encapsulación
- Métodos privados para validación
- Getters para formateo de datos
- Métodos estáticos en GestorReservas

### Polimorfismo
- Método `obtenerDetalles()` personalizado en cada clase
- Método `obtenerPrecioFormateado()` heredado y usado

## 🔄 Flujo de Datos

```
Usuario interactúa
    ↓
main.js captura evento
    ↓
tasks.js crea objeto (POO)
    ↓
storage.js guarda en localStorage
    ↓
ui.js actualiza la vista
    ↓
Mensaje de confirmación
```

## 📈 Futuras Mejoras

- [ ] Integración con backend (Node.js/Express)
- [ ] Pasarela de pagos
- [ ] Sistema de login de usuarios
- [ ] Panel de administración
- [ ] API REST para gestión de tours
- [ ] Galería de fotos avanzada
- [ ] Sistema de reseñas verificadas
- [ ] Multiidioma (ES/EN)

## 👨‍💻 Autor

**Leandro Carpio**  
Desarrollador Frontend & Diseñador Web

- Portfolio: [tu-portfolio.com](#)
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Nombre](https://linkedin.com/in/tu-perfil)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

⭐ **Si te gustó este proyecto, dale una estrella en GitHub!**

🍷 **Mendoza Wine** - Donde la tradición se encuentra con la tecnología moderna.

