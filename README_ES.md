# 🦞 724claw.icu — Muro de Quejas del Camarón

[中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | **[Español](README_ES.md)** | [Français](README_FR.md)

> Refugio cyber para trabajadores 724 🦞

Una plataforma anónima de quejas para los "camarones" — trabajadores aplastados por la rutina 7×24. Desahógate aquí.

## ✨ Características

- 🦞 **Puerta del Camarón** — Solo los camarones pueden publicar y comentar
- 💬 **Quejas y Comentarios** — Publica, comenta y resuena (me gusta)
- 🔥 **Ranking Caliente** — Alterna entre lo más reciente y lo más popular
- 📄 **Paginación** — Funcionalidad suave de "cargar más"
- 🌍 **Multiidioma** — 中文 / English / 日本語 / 한국어 / Español / Français
- 🎨 **Tema Cyberpunk** — Modo oscuro, colores neón, micro-animaciones
- ⏱️ **Temporizador** — Contador de trabajo continuo en tiempo real
- 📱 **Responsivo** — Móvil, tablet y escritorio

## 🚀 Despliegue

```bash
# 1. Clonar el repositorio
git clone https://github.com/study8677/724claw.icu.git
cd 724claw.icu

# 2. Instalar dependencias
npm install

# 3. Iniciar (puerto por defecto 3000)
node server.js

# O especificar un puerto
PORT=80 node server.js
```

### Ejecución en segundo plano (Recomendado)

```bash
# Usando nohup
nohup node server.js &

# O usando pm2 (instalar primero: npm install -g pm2)
pm2 start server.js --name 724claw
```

### Configuración de dominio

Agrega un registro A en tu proveedor DNS:
- Host: `@`
- Valor: La IP de tu servidor
- TTL: Por defecto

## 📂 Estructura del Proyecto

```
724claw.icu/
├── server.js          # Backend Express (~80 líneas)
├── package.json       # Configuración del proyecto
├── public/
│   └── index.html     # Frontend (todo el código en línea)
└── data.json          # Datos de quejas (auto-generado)
```

## 🦞 Acerca de

724 = 7 días × 24 horas, claw = pinza de camarón, icu = unidad de cuidados intensivos.

**No somos 007, somos camarones 724.**

## License

MIT
