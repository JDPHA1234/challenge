# Challenge Técnico: Software Engineer Web - AranguriApps

## 📝 Descripción del Proyecto
>[Este proyecto es una plataforma ágil de **Búsqueda de Empleos** enfocada en optimizar la experiencia del usuario (postulante). Con el objetivo de mitigar la complejidad del dominio dentro del tiempo establecido para el challenge, el sistema se centra exclusivamente en la **perspectiva y los flujos del cliente/usuario final** (Búsqueda, visualización de ofertas y gestión de postulaciones).]
>Casos de uso 
<img width="631" height="725" alt="imagen" src="https://github.com/user-attachments/assets/9a965355-663c-47e5-a4f5-55c532b407c9" />

La aplicación está diseñada bajo un enfoque funcional, robusto y escalable, priorizando la experiencia de usuario (UI/UX) y la consistencia del estado global en el frontend.

---

## 🛠️ Stack Tecnológico y Arquitectura

Para el desarrollo de este ecosistema se seleccionaron tecnologías modernas que garantizan un alto rendimiento y un workflow ágil:

* **Frontend:** `React` (v18+) con `Vite` como empaquetador por su velocidad de compilación y Hot Module Replacement eficiente.
* **Enrutado:** `React Router` para gestionar una experiencia SPA (Single Page Application) fluida a través de múltiples vistas.
* **Estado Global:** `Zustand`, elegido por su enfoque minimalista, atómico y sin la sobrecarga (*boilerplate*) de Redux, ideal para mantener un flujo de datos limpio con Supabase.
* **Backend & Base de Datos (BaaS):** `Supabase`, aprovechando el poder de PostgreSQL, la autenticación nativa y la facilidad para interactuar mediante su cliente de JS.

### 📐 Arquitectura de Carpetas
Se optó por una arquitectura modular basada en características (*feature-driven/clean structure*), separando la lógica de negocio de los componentes visuales:
```text
src/
├── components/        # Componentes atómicos y reutilizables de UI
├── context/           # Context for auth test
├── hooks/             # Custom hooks para encapsular lógica de Supabase/fetching
├── pages/             # Vistas principales de la aplicación 
├── store/             # Stores de Zustand para el manejo del estado global
├── supabase-client.js # Configuración del cliente de Supabase y tipos
└── App.jsx            # Enrutador y punto de entrada
```
