# Canvas Key — Sistema Integral de Gestión Estudiantil

Plataforma integral de gestión académica para estudiantes de El Salvador, diseñada para articular el **Instituto** (Bachillerato MINED), **FGK** (Programa de Becas Oportunidades Fundación Gloria Kriete) y **UNIVO** (Universidad de Oriente), con un módulo **General** consolidado.

---

## 🚀 Despliegue en GitHub Pages

Este proyecto ya viene preconfigurado para desplegarse automáticamente en **GitHub Pages** mediante GitHub Actions.

### Pasos para activar GitHub Pages en tu repositorio:
1. Sube tu código al repositorio en GitHub (`main` o `master`).
2. En GitHub, ve a **Settings** > **Pages** (en la barra lateral izquierda).
3. En la sección **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. ¡Listo! El flujo de trabajo en `.github/workflows/deploy.yml` compilará y publicará tu aplicación automáticamente cada vez que hagas un push.

> **Nota técnica:** En `vite.config.ts` se encuentra configurado `base: './'`, lo cual garantiza que los estilos y scripts se carguen correctamente bajo la subcarpeta de GitHub Pages (`https://<usuario>.github.io/<repositorio>/`). Además, incluye `.nojekyll` para evitar conflictos con el motor de Jekyll.

---

## 💻 Desarrollo Local

### Requisitos previos
* **Node.js** (versión 18 o superior)
* **npm** (versión 9 o superior)

### Instalación y ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/<tu-repositorio>.git
cd <tu-repositorio>

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Compilación para producción
```bash
npm run build
```
Los archivos optimizados para producción se generarán en la carpeta `dist/`.

---

## 🧩 Estructura de Módulos

* **General**: Centro de mando con promedio consolidado (GPA), semáforo de permanencia en beca, agenda semanal integrada (Lunes a Sábado) y tareas pendientes.
* **Instituto**: Gestión de materias, ponderaciones y cortes evaluativos de 1º, 2º y 3º año de bachillerato (horario fijo Lunes a Viernes).
* **FGK**: Control del ciclo sabatino de 10 semanas rotativas + 1 semana de descanso interciclo, seguimiento de promedio $\ge 8.0$, 60 horas de voluntariado y 90% de asistencia.
* **UNIVO**: Módulo de proyección para educación superior en la Universidad de Oriente (UNIVO).
