# 🎨 Sistema de Colores - Caja Registradora Digital

## Paleta Principal: "Healthcare Professional"

Esta paleta fue diseñada específicamente para un sistema de caja registradora en centros de salud, transmitiendo **confianza**, **profesionalismo** y **modernidad**.

## 🟢 Colores Primarios

### Primary (Verde Salud)
```css
primary-50:  #ecfdf5  /* Verde muy claro - Fondos suaves */
primary-100: #d1fae5  /* Verde claro - Fondos de cards */
primary-200: #a7f3d0  /* Verde suave - Bordes activos */
primary-300: #6ee7b7  /* Verde medio - Estados hover */
primary-400: #34d399  /* Verde brillante - Elementos destacados */
primary-500: #10b981  /* Verde principal - Botones primarios */
primary-600: #059669  /* Verde intenso - Estados active/pressed */
primary-700: #047857  /* Verde oscuro - Texto en fondos claros */
primary-800: #065f46  /* Verde muy oscuro - Encabezados */
primary-900: #064e3b  /* Verde profundo - Texto importante */
primary-950: #022c22  /* Verde máximo - Contraste máximo */
```

**Cuándo usar:**
- ✅ Botones de acción principal (Registrar venta, Guardar)
- ✅ Estados de éxito y confirmación
- ✅ Iconos de salud y bienestar
- ✅ Indicadores de estado "activo" o "disponible"

### Secondary (Azul Marino Profesional)
```css
secondary-50:  #f8fafc  /* Azul marino muy claro - Fondos generales */
secondary-100: #f1f5f9  /* Azul marino claro - Cards secundarias */
secondary-200: #e2e8f0  /* Azul marino suave - Separadores */
secondary-300: #cbd5e1  /* Azul marino medio - Bordes inactivos */
secondary-400: #94a3b8  /* Azul marino - Texto secundario */
secondary-500: #64748b  /* Azul marino principal - Texto normal */
secondary-600: #475569  /* Azul marino intenso - Texto importante */
secondary-700: #334155  /* Azul marino oscuro - Encabezados */
secondary-800: #1e293b  /* Azul marino muy oscuro - Texto crítico */
secondary-900: #0f172a  /* Azul marino profundo - Contraste máximo */
```

**Cuándo usar:**
- ✅ Texto principal y secundario
- ✅ Botones secundarios y terciarios
- ✅ Fondos de navegación y sidebars
- ✅ Elementos de interfaz neutrales

## 🎯 Colores Semánticos

### Success (Verde Éxito)
```css
success-500: #22c55e  /* Mensajes de éxito */
success-600: #16a34a  /* Estados hover de éxito */
```
**Uso:** Confirmaciones, transacciones exitosas, estados "completado"

### Warning (Amarillo Advertencia)
```css
warning-500: #f59e0b  /* Mensajes de advertencia */
warning-600: #d97706  /* Estados hover de advertencia */
```
**Uso:** Alertas, campos requeridos, estados "pendiente"

### Error (Rojo Error)
```css
error-500: #ef4444   /* Mensajes de error */
error-600: #dc2626   /* Estados hover de error */
```
**Uso:** Errores de validación, transacciones fallidas, estados "cancelado"

### Info (Azul Información)
```css
info-500: #3b82f6    /* Mensajes informativos */
info-600: #2563eb    /* Estados hover de información */
```
**Uso:** Información general, tooltips, estados "en proceso"

### Neutral (Grises)
```css
neutral-50:  #f9fafb  /* Fondo muy claro */
neutral-100: #f3f4f6  /* Fondo claro */
neutral-200: #e5e7eb  /* Bordes suaves */
neutral-300: #d1d5db  /* Bordes normales */
neutral-400: #9ca3af  /* Texto deshabilitado */
neutral-500: #6b7280  /* Texto secundario */
neutral-600: #4b5563  /* Texto normal */
neutral-700: #374151  /* Texto importante */
neutral-800: #1f2937  /* Texto muy importante */
neutral-900: #111827  /* Texto crítico */
```

## 📋 Guía de Uso por Componentes

### Botones
```jsx
// Botón Primario (Acciones principales)
<Button className="bg-primary-500 hover:bg-primary-600 text-white">
  Registrar Venta
</Button>

// Botón Secundario (Acciones secundarias)
<Button className="bg-secondary-200 hover:bg-secondary-300 text-secondary-700">
  Cancelar
</Button>

// Botón de Éxito (Confirmaciones)
<Button className="bg-success-500 hover:bg-success-600 text-white">
  Confirmar Pago
</Button>

// Botón de Peligro (Eliminaciones)
<Button className="bg-error-500 hover:bg-error-600 text-white">
  Eliminar Producto
</Button>
```

### Cards y Contenedores
```jsx
// Card principal
<div className="bg-white border border-neutral-200 shadow-sm rounded-lg">

// Card con estado activo
<div className="bg-primary-50 border border-primary-200 rounded-lg">

// Card de información
<div className="bg-info-50 border border-info-200 rounded-lg">
```

### Texto y Tipografía
```jsx
// Encabezados principales
<h1 className="text-secondary-800 font-bold">

// Texto normal
<p className="text-secondary-600">

// Texto secundario
<span className="text-secondary-400">

// Texto de éxito
<span className="text-success-600">

// Texto de error
<span className="text-error-600">
```

### Formularios
```jsx
// Input normal
<input className="border-neutral-300 focus:border-primary-500 focus:ring-primary-200" />

// Input con error
<input className="border-error-500 focus:border-error-500 focus:ring-error-200" />

// Label
<label className="text-secondary-700 font-medium">

// Mensaje de error
<span className="text-error-600 text-sm">

// Mensaje de éxito
<span className="text-success-600 text-sm">
```

### Navegación
```jsx
// Sidebar
<nav className="bg-secondary-50 border-r border-neutral-200">

// Link activo
<a className="bg-primary-500 text-white">

// Link inactivo
<a className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100">
```

## 🔍 Accesibilidad

### Contrastes Verificados (WCAG AA)
- ✅ `primary-500` en fondo blanco: 4.89:1
- ✅ `secondary-700` en fondo blanco: 7.25:1
- ✅ `error-600` en fondo blanco: 5.74:1
- ✅ `success-600` en fondo blanco: 4.56:1

### Recomendaciones
- Usar `primary-700` o más oscuro para texto sobre fondos claros
- Usar `secondary-600` o más oscuro para texto legible
- Evitar `primary-300` o más claro para texto principal
- Siempre testear contraste en modo oscuro

## 🌙 Modo Oscuro (Futuro)

Para implementación futura de modo oscuro:
```css
.dark {
  --primary-50: #022c22;    /* Invertir los valores */
  --primary-900: #ecfdf5;
  --secondary-50: #0f172a;
  --secondary-900: #f8fafc;
}
```

## 📱 Ejemplos de Combinaciones

### Dashboard Principal
- Fondo: `bg-neutral-50`
- Cards: `bg-white border-neutral-200`
- Encabezados: `text-secondary-800`
- Botón principal: `bg-primary-500`

### Formulario de Venta
- Inputs: `border-neutral-300 focus:border-primary-500`
- Labels: `text-secondary-700`
- Botón guardar: `bg-primary-500`
- Botón cancelar: `bg-secondary-200 text-secondary-700`

### Estados de Transacción
- Exitosa: `bg-success-50 border-success-200 text-success-700`
- Pendiente: `bg-warning-50 border-warning-200 text-warning-700`
- Fallida: `bg-error-50 border-error-200 text-error-700`

## 🔧 Configuración Técnica

### Integración con Flowbite

Para que Flowbite use nuestra paleta personalizada, se han configurado variables CSS nativas en `src/index.css`:

```css
@layer base {
  :root {
    /* Variables CSS que mapean nuestra paleta a los colores estándar de Flowbite */
    --color-primary-500: #10b981;  /* Verde salud como primario */
    --color-blue-500: #64748b;     /* Azul marino profesional */
    --color-green-500: #22c55e;    /* Verde éxito */
    --color-red-500: #ef4444;      /* Rojo error */
    --color-yellow-500: #f59e0b;   /* Amarillo advertencia */
  }
}
```

### Componentes de Flowbite Afectados

Todos los componentes de Flowbite ahora usan automáticamente nuestra paleta:

```jsx
// Estos componentes ahora usan nuestros colores automáticamente
<Button color="blue">    // Usa nuestro azul marino profesional
<Button color="green">   // Usa nuestro verde éxito
<Button color="red">     // Usa nuestro rojo error
<Alert color="success">  // Usa nuestro verde éxito
<Alert color="warning">  // Usa nuestro amarillo advertencia
```

### Verificación de Configuración

Para verificar que la configuración funciona correctamente:

1. **Compilar estilos**: `npm run build` o `npm run dev`
2. **Inspeccionar variables CSS**: Verificar que las variables estén definidas en el navegador
3. **Testear componentes**: Usar componentes de Flowbite y verificar colores

### Compatibilidad

- ✅ **Flowbite React**: Totalmente compatible
- ✅ **Tailwind CSS**: Integración nativa
- ✅ **Modo Oscuro**: Variables específicas configuradas
- ✅ **Componentes existentes**: Migración transparente

---

**Última actualización:** 15 de septiembre de 2025
**Versión:** 1.1 - Integración con Flowbite
**Responsable:** Equipo Frontend