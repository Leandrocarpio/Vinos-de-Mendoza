# 🍷 Mendoza Wine - Landing Page Profesional

> Landing page moderna y responsiva para emprendimientos vitivinícolas. Desarrollada con JavaScript ES6+, arquitectura modular y programación orientada a objetos.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-100%25-brightgreen)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Demo en Vivo](#-demo-en-vivo)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Arquitectura](#️-arquitectura)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso](#-uso)
- [Características Técnicas](#-características-técnicas)
- [Roadmap](#️-roadmap)
- [Autor](#-autor)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**Mendoza Wine** es una landing page profesional diseñada para promover el turismo vitivinícola en Mendoza, Argentina. Este proyecto representa un ejemplo real de desarrollo frontend moderno, implementando:

✅ **Arquitectura modular** con ES Modules  
✅ **Programación Orientada a Objetos** (POO)  
✅ **Diseño responsive mobile-first**  
✅ **Persistencia de datos** con localStorage  
✅ **Validaciones en tiempo real**  
✅ **Animaciones optimizadas**  
✅ **SEO y accesibilidad**  

### 🎯 Objetivo del Proyecto

Servir como **portfolio profesional** que demuestre:
- **Para reclutadores:** Código limpio, buenas prácticas y arquitectura escalable
- **Para clientes:** Diseño moderno, UX fluida y conversión optimizada

---

## 🚀 Demo en Vivo

**[Ver Demo →](https://github.com/Leandrocarpio/Mendoza-Wine/)**

> 📝 **Nota:** Reemplazá con tu link de GitHub Pages una vez desplegado.

---

## ✨ Características

### 🎨 Diseño y UX
- ✅ Hero full-screen con call-to-action claro
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Menú hamburguesa animado para mobile
- ✅ Scroll suave entre secciones
- ✅ Animaciones con IntersectionObserver
- ✅ Micro-interacciones en hover

### 🛠️ Funcionalidades
- ✅ Catálogo dinámico de tours y vinos
- ✅ Sistema de reservas con validación en tiempo real
- ✅ Persistencia de datos (localStorage)
- ✅ Formulario con loading states y feedback visual
- ✅ Testimonios con fotos reales (Unsplash)
- ✅ Footer con redes sociales integradas
- ✅ Botón WhatsApp flotante con mensaje pre-cargado

### ⚡ Performance y SEO
- ✅ Lazy loading de imágenes
- ✅ CSS optimizado con variables
- ✅ JavaScript modular (mejor caching)
- ✅ Meta tags completos (Open Graph)
- ✅ HTML semántico
- ✅ Touch targets accesibles (44px mínimo)

---

## 🛠️ Tecnologías

### Frontend
- **HTML5** → Estructura semántica
- **CSS3** → Variables, Grid, Flexbox, `clamp()`
- **JavaScript ES6+** → Modules, Classes, Arrow Functions, Async/Await

### Librerías
- **Bootstrap Icons** → Iconografía profesional
- **Unsplash** → Imágenes de alta calidad

### Herramientas
- **Git** → Control de versiones
- **GitHub Pages** → Hosting gratuito
- **Live Server** → Desarrollo local

---

## 🏗️ Arquitectura

El proyecto implementa **separación de responsabilidades** con módulos independientes:

```
┌─────────────────────────────────────────┐
│           index.html                    │
│  (Estructura y contenido estático)      │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴───────┐
       │   main.js     │ ← Punto de entrada
       └───────┬───────┘
               │
   ┌───────────┼───────────┐
   │           │           │
┌──▼──┐   ┌───▼───┐   ┌──▼──────┐
│ui.js│   │tasks.js│  │storage.js│
└─────┘   └────────┘  └──────────┘
  │           │            │
  ▼           ▼            ▼
 DOM      Lógica de    localStorage
         Negocio
```

### Módulos

#### 📄 `main.js`
- Inicializa la aplicación
- Coordina todos los módulos
- Maneja eventos del formulario
- Validaciones en tiempo real

#### 🎨 `ui.js`
- Renderizado dinámico (tours, vinos)
- Menú hamburguesa funcional
- Animaciones con IntersectionObserver
- Feedback visual (loading, mensajes)

#### 🧠 `tasks.js`
- **Clases del dominio:**
  - `Producto` (clase base)
  - `Tour` (hereda de Producto)
  - `Vino` 
  - `Reserva`
  - `GestorReservas` (métodos estáticos)
- Datos del catálogo (tours y vinos)

#### 💾 `storage.js`
- CRUD de reservas
- Gestión de favoritos
- Estadísticas
- Importar/exportar datos

---

## 📦 Instalación

### Requisitos Previos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (Live Server, Python, Node.js)

> ⚠️ **Importante:** Los ES Modules requieren servidor HTTP. No abrir `index.html` directamente.

### Opción 1: Live Server (VS Code)

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/mendoza-wine.git

# 2. Abrir con VS Code
cd mendoza-wine
code .

# 3. Instalar extensión "Live Server"
# 4. Click derecho en index.html → "Open with Live Server"
```

### Opción 2: Python

```bash
# Clonar y navegar
git clone https://github.com/tu-usuario/mendoza-wine.git
cd mendoza-wine

# Iniciar servidor
python -m http.server 8000

# Abrir: http://localhost:8000
```

### Opción 3: Node.js

```bash
# Clonar y navegar
git clone https://github.com/tu-usuario/mendoza-wine.git
cd mendoza-wine

# Instalar http-server (una sola vez)
npm install -g http-server

# Iniciar servidor
http-server

# Abrir: http://localhost:8080
```

---

## 📁 Estructura del Proyecto

```
mendoza-wine/
│
├── index.html              # Página principal
├── about.html              # Sobre el desarrollador
├── styles.css              # Estilos globales
├── README.md               # Documentación
├── LICENSE                 # Licencia MIT
│
└── assets/
    ├── css/
    │   └── about.css       # Estilos específicos about
    │
    ├── js/
    │   ├── main.js         # Punto de entrada
    │   ├── ui.js           # Módulo de interfaz
    │   ├── tasks.js        # Lógica de negocio (POO)
    │   └── storage.js      # Persistencia de datos
    │
    └── img/
        ├── portada.png           # Hero principal
        ├── Malbec premium.png    # Vino 1
        ├── reserva.png           # Vino 2
        ├── chardonnay.png        # Vino 3
        └── Img diseñando.png     # Foto perfil
```

---

## 🎮 Uso

### Para Usuarios

1. **Explorar tours** → Navegá por las opciones disponibles
2. **Ver catálogo de vinos** → Conocé los vinos mendocinos
3. **Hacer una reserva** → Completá el formulario (valida en tiempo real)
4. **Contactar por WhatsApp** → Click en botón flotante

### Para Desarrolladores

```javascript
// Acceder a datos desde consola
import { toursData, vinosData } from './assets/js/tasks.js';
console.log(toursData); // Ver tours disponibles

// Ver estadísticas
import { Storage } from './assets/js/storage.js';
console.log(Storage.obtenerEstadisticas());

// Exportar reservas
const backup = Storage.exportarDatos();
console.log(backup);
```

---

## 🔥 Características Técnicas

### POO - Programación Orientada a Objetos

```javascript
// HERENCIA
Producto (clase base)
   ↓
   ├── Tour (hereda precio y métodos)
   └── Vino (clase independiente)

// ENCAPSULACIÓN
class Reserva {
  constructor() { /* privado */ }
  validar() { /* validación interna */ }
  confirmar() { /* método público */ }
}

// POLIMORFISMO
tour.obtenerDetalles()  // Implementación específica
vino.obtenerResumen()   // Implementación diferente
```

### Validación en Tiempo Real

El formulario valida **al perder foco** cada campo:

| Campo | Validación |
|-------|-----------|
| **Nombre** | Mínimo 3 caracteres |
| **Email** | Formato válido con regex |
| **Teléfono** | 8-15 dígitos numéricos |
| **Fecha** | No puede ser anterior a hoy |
| **Personas** | Campo obligatorio |

### Responsive Mobile-First

```css
/* Base: Mobile (< 768px) */
.hero-title { 
  font-size: clamp(2.5rem, 8vw, 5rem); 
}

/* Tablet y Desktop */
@media (min-width: 768px) {
  .tours-grid { 
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  }
}
```

### LocalStorage - Persistencia

```javascript
// Guardar reserva
const reserva = GestorReservas.crearReserva(datos);
Storage.guardarReserva(reserva);

// Obtener todas las reservas
const reservas = Storage.obtenerReservas();

// Estadísticas
const stats = Storage.obtenerEstadisticas();
// → { totalReservas, totalFavoritos, ultimaReserva }
```

---

## 🗺️ Roadmap

### Versión 2.0 - Mejoras Futuras

#### Backend e Integración
- [ ] Integración con backend (Node.js + Express)
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] API REST para gestión de tours
- [ ] Pasarela de pagos (MercadoPago/Stripe)
- [ ] Sistema de autenticación (JWT)
- [ ] Panel de administración

#### Funcionalidades
- [ ] Sistema de reseñas verificadas
- [ ] Calendario de disponibilidad
- [ ] Notificaciones por email
- [ ] Blog de noticias vitivinícolas
- [ ] Multiidioma (ES/EN/PT)
- [ ] PWA (Progressive Web App)

#### Mejoras Técnicas
- [ ] Tests unitarios (Jest)
- [ ] Tests E2E (Cypress)
- [ ] CI/CD con GitHub Actions
- [ ] TypeScript
- [ ] Bundler (Webpack/Vite)
- [ ] Lighthouse score 100/100
- [ ] WebP con fallback
- [ ] Service Worker (cache)

---

## 👨‍💻 Autor

**Leandro Carpio**  
Frontend Developer & Web Designer

- 📧 Email: leo_gabriel_carpio@hotmail.com
- 📱 WhatsApp: [+54 9 261 612-3777](https://wa.me/5492616123777)
- 💼 LinkedIn: [linkedin.com/in/leandrocarpio](https://linkedin.com/in/leandrocarpio)

---

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 Leandro Carpio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **Unsplash** - Imágenes de alta calidad
- **Bootstrap Icons** - Iconografía profesional
- **Claude AI** - Asistencia en desarrollo
- **Mi profe de Frontend** - Base del proyecto

---

## 📞 Contacto

### ¿Te interesa una landing page profesional para tu emprendimiento?

**Contactame:**

- 📱 **WhatsApp:** [+54 9 261 612-3777](https://wa.me/5492616123777?text=Hola,%20vi%20tu%20landing%20Mendoza%20Wine%20y%20me%20interesa%20tu%20servicio)
- 📧 **Email:** leo_gabriel_carpio@hotmail.com

---

## 💡 Características Destacadas para Reclutadores

### 🎯 Buenas Prácticas Implementadas

✅ **Arquitectura Modular**
- Separación clara de responsabilidades
- ES Modules para mejor organización
- Código reutilizable y escalable

✅ **POO (Programación Orientada a Objetos)**
- Herencia, encapsulación, polimorfismo
- Clases bien estructuradas
- Métodos estáticos donde corresponde

✅ **Clean Code**
- Nombres descriptivos
- Comentarios estratégicos (no obviedades)
- Funciones con responsabilidad única

✅ **Responsive Real**
- Mobile-first approach
- Touch targets accesibles
- Menú hamburguesa funcional

✅ **Performance**
- Lazy loading
- Animaciones optimizadas
- CSS con variables
- JavaScript modular

✅ **Accesibilidad**
- HTML semántico
- ARIA labels
- Contraste de colores
- Navegación por teclado

---

<div align="center">

### ⭐ Si te gustó este proyecto, dale una estrella en GitHub!

**Mendoza Wine** © 2025 - Diseñado y desarrollado por **Leandro Carpio**

[⬆ Volver arriba](#-mendoza-wine---landing-page-profesional)

</div>
