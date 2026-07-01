# Challenge Técnico: Software Engineer Web - AranguriApps

## 📝 Descripción del Proyecto
>[Este proyecto es una plataforma ágil de **Búsqueda de Empleos** enfocada en optimizar la experiencia del usuario (postulante). Con el objetivo de mitigar la complejidad del dominio dentro del tiempo establecido para el challenge, el sistema se centra exclusivamente en la **perspectiva y los flujos del cliente/usuario final** (Búsqueda, visualización de ofertas y gestión de postulaciones).]
>Casos de uso 
<img width="631" height="725" alt="imagen" src="https://github.com/user-attachments/assets/9a965355-663c-47e5-a4f5-55c532b407c9" />

La aplicación está diseñada bajo un enfoque funcional, robusto y escalable, priorizando la experiencia de usuario (UI/UX) y la consistencia del estado global en el frontend.

---

## 🛠️ Stack Tecnológico y Arquitectura

Para el desarrollo de este ecosistema se seleccionaron tecnologías modernas que garantizan un alto rendimiento y un workflow ágil:

* **Frontend:** `React` (v18+) con `Vite` como empaquetador. 
  > **Criterio de Selección (Vite vs. Next.js):** Se optó intencionalmente por Vite por encima de Next.js debido a la naturaleza y el alcance del proyecto. Al tratarse de una aplicación enfocada exclusivamente en la vista del usuario y la simulación de flujos de postulación, la arquitectura de una **SPA (Single Page Application)** es óptima y suficiente. Next.js introduce características avanzadas como SSR (Server-Side Rendering) y optimización SEO en el servidor que no son críticas para este dashboard privado, añadiendo una sobrecarga (*overhead*) innecesaria de configuración y despliegue. Con Vite se garantiza la máxima velocidad de desarrollo, compilación instantánea y una experiencia de usuario fluida delegando el almacenamiento y estado de sesión liviano en el cliente de forma eficiente.
* **Enrutado:** `React Router` para gestionar una experiencia SPA (Single Page Application) fluida a través de múltiples vistas.
* **Estado Global:** `Zustand`, elegido por su enfoque minimalista, atómico y sin la sobrecarga (*boilerplate*) de Redux, ideal para mantener un flujo de datos limpio con Supabase.
* **Backend & Base de Datos (BaaS):** `Supabase`, aprovechando el poder de PostgreSQL, la autenticación nativa y la facilidad para interactuar mediante su cliente de JS.
## 🗄️ Arquitectura y Diseño de la Base de Datos

Para soportar el sistema de búsqueda de empleos enfocado en el usuario, se diseñó una base de datos relacional robusta en **Supabase (PostgreSQL)**, optimizando las consultas de ofertas de trabajo y el historial de aplicaciones del postulante.

### 📐 Diagramas del Sistema

#### 1. Diagrama Entidad-Relación (DER)
Este diagrama representa el modelo conceptual y las reglas de negocio establecidas para el dominio del proyecto (Relaciones Uno a Muchos entre Usuarios, Solicitudes y Trabajos).

<img width="1202" height="420" alt="imagen" src="https://github.com/user-attachments/assets/d2de0d12-35c9-4c06-9e11-1a4fc6d715e6" />


#### 2. Modelo Relacional (Esquema de Tablas)
Abstracción técnica que detalla las claves primarias (`PK`), claves foráneas (`FK`), tipos de datos y restricciones (*constraints*) aplicadas en la base de datos.

<img width="988" height="580" alt="imagen" src="https://github.com/user-attachments/assets/e14d1d40-1c77-4372-b174-2320970399e5" />



### 🚀 Implementación en Supabase

A continuación, se detalla la estructura física y la configuración de las tablas principales directamente desde el panel de Supabase:

#### 📊 Vista General de las Tablas (Schema Visual)
El esquema se compone de las tablas esenciales para mitigar la complejidad del dominio: `usuario`, `trabajo` (ofertas laborales) y `solicitud` (postulaciones).

<img width="988" height="775" alt="imagen" src="https://github.com/user-attachments/assets/350d2090-aea6-428a-95a5-a6cc1e29adf4" />




#### 🔐 Seguridad y Políticas (RLS - Row Level Security)
Se habilitó RLS en Supabase para asegurar que un usuario postulante solo pueda visualizar y gestionar sus propias postulaciones, protegiendo la integridad de los datos.

<img width="1226" height="633" alt="imagen" src="https://github.com/user-attachments/assets/e98e3129-4a53-4b86-a48f-5921cdcb789b" />

### Restricion de solicitudes(No duplicadas)

<img width="539" height="42" alt="imagen" src="https://github.com/user-attachments/assets/75c81471-c9d8-4771-be8d-de9a2e4b2da9" />

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
## 🤖 Orquestación de IA y Aceleración de Desarrollo

De acuerdo con los requerimientos del challenge, el desarrollo se ejecutó bajo un enfoque de **IA-Driven Development**, utilizando un entorno híbrido de asistentes avanzados para optimizar tiempos de entrega y focalizar el esfuerzo humano en la arquitectura, la lógica de negocio y el control de calidad.

### 🛠️ Tooling Utilizado
1. **Gemini Pro (Modelo Fundacional Principal):** Utilizado como arquitecto y consultor técnico de cabecera. Actuó en el diseño del modelo de datos de Supabase, la estructuración de las stores atómicas en Zustand y la resolución de abstracciones complejas en el enrutado con React Router.
2. **GitHub Copilot (Copiloto):** Integrado directamente en el IDE como motor de autocompletado predictivo y generación pragmática de *boilerplate* (componentes de UI repetitivos, tipados implícitos y esqueleto de funciones de fetching).
3. **Stitch IA (Diseño y UI/UX):** Herramienta clave utilizada para el prototipado rápido, la definición del sistema de diseño (paleta de colores, espaciados y consistencia visual) y la estructuración estética de la interfaz. Esto permitió alcanzar una alta fidelidad visual y atención al detalle en las vistas sin comprometer el tiempo de desarrollo lógico.

### 📈 Estrategia de Orquestación y Criterio de Auditoría
La velocidad de desarrollo se multiplicó delegando tareas mecánicas a la IA, manteniendo siempre el rol de **Auditor Principal del Código**:

* **Generación vs. Contexto:** Se utilizó Gemini Pro mediante *prompts* modulares para escribir código limpio, evitando ventanas de contexto saturadas que introdujeran alucinaciones.
* **Refactorización y QA Activo:** Cada bloque sugerido por Copilot o Gemini fue estrictamente auditado. Se corrigieron manualmente comportamientos inesperados en las re-renderizaciones de React, la sincronización de estados asíncronos y la sanitización de errores provenientes de las llamadas a Supabase.
* **Resolución de Edge Cases:** El diseño del control de accesos, las rutas protegidas del flujo de postulantes y el manejo de estados de carga (*loading states*) se implementaron bajo criterio propio, complementando las limitaciones lógicas de los modelos.

* ### ⚖️ Decisiones de Tooling y Trade-offs
Frente a alternativas de agentes autónomos (como Claude Code o frameworks de OpenCode con agentes), se optó intencionalmente por un enfoque híbrido y **sin costos** de **Gemini Pro + GitHub Copilot** . Esta combinación permitió un control granular y directo sobre el flujo de datos y la arquitectura del código, mitigando el riesgo de alucinaciones en bucle o la generación de código redundante (*bloatware*), garantizando así un desarrollo ágil, limpio y auditable en el corto plazo del challenge.

## 🚀 Instalación y Ejecución Local

Seguí estos pasos para clonar el repositorio y levantar el entorno de desarrollo en tu máquina:

### 📋 Prerrequisitos
Asegurate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y `npm`.

### 1. Clonar el repositorio
Cloná el proyecto utilizando SSH o HTTPS y unite a la carpeta raíz:
```bash
git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
cd TU_REPOSITORIO
```
### 2. Instalar dependencias

Instalá los paquetes necesarios para React, Vite, Zustand y Supabase:
```bash
npm install 
```
### 3. Configurar variables de entorno

El proyecto requiere conectarse a tu instancia de Supabase.

    Creá un archivo llamado .env en la raíz del proyecto.

    Copiá y completá las siguientes variables con tus credenciales del panel de Supabase (Project Settings > API):
    VITE_SUPABASE_URL=tu_supabase_url_aqui
    VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
### 4. Ejecutar la aplicación

Levantá el servidor de desarrollo local de Vite:
```Bash
npm run dev
```
###Scripts Disponibles

    npm run dev: Arranca el servidor de desarrollo con Hot Module Replacement (HMR).

    npm run build: Compila y optimiza la aplicación para producción (genera la carpeta dist/).

    npm run preview: Permite previsualizar de forma local la configuración de producción.
