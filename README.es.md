<!-- l10n-sync: source-file="README.md" -->
<div align="center">

# 🎮 Mona Mayhem

### *Batalla de los Commits* — Un Workshop de GitHub Copilot

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-v5-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-requerido-000000?logo=githubcopilot&logoColor=white)](https://github.com/features/copilot)

**Enfrenta a dos usuarios de GitHub en un épico duelo de gráficos de contribución — y aprende GitHub Copilot en el camino.**

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)

[**🚀 Comenzar el Workshop →**](workshop/es/00-overview.md) &nbsp;|&nbsp; [**📖 Leer la Documentación →**](workshop/es/)

</div>

---

## ✨ Qué Construirás

Una **arena de batalla estilo arcade retro** donde dos usuarios de GitHub se enfrentan, con sus gráficos de contribución como armas. Partirás de una plantilla vacía y llegarás a una app pulida y lista para desplegar — impulsada por GitHub Copilot.

> **Este repositorio es tu punto de partida.** Construyes la app paso a paso con Copilot; el resultado final es tuyo.

## 🧠 Qué Aprenderás

| Habilidad | Dónde la Usarás |
|-----------|-----------------|
| Ingeniería de contexto | Crear instrucciones y prompts de workspace efectivos |
| Plan Mode | Descomponer funcionalidades antes de escribir código |
| Agent Mode | Dejar que Copilot escriba, itere y se autocorrija |
| Diseño con IA | De vibes → diseño → implementación en un solo ciclo |
| Trabajo paralelo | Ejecutar múltiples background agents simultáneamente |
| Revisión de código | Usar Copilot para detectar problemas y mejorar calidad |

## 📚 Taller

Elige el camino que mejor se adapte a tu flujo de trabajo — ambos cubren las mismas habilidades fundamentales:

- 🖥️ **Track VS Code** — Chat, Plan Mode, Agent Mode, background agents y ciclos de revisión nativos del editor
- 💻 **Track CLI** — `copilot`, contexto `@file`, `/plan`, ediciones autónomas, `/fleet`, `/delegate` y `/review`

| Parte | Título | Característica de Copilot |
|-------|--------|--------------------------|
| [00](workshop/es/00-overview.md) | Visión General | Lo que aprenderás |
| [01](workshop/es/01-setup.md) | Configuración e Ingeniería de Contexto | Instrucciones de workspace, background agents |
| [02](workshop/es/02-plan-and-scaffold.md) | Planificar y Estructurar | Plan Mode |
| [03](workshop/es/03-agent-mode.md) | Agent Mode: Construir el Juego | Agent Mode |
| [04](workshop/es/04-design-vibes.md) | Temas Design-First | Plan + Agent Mode |
| [05](workshop/es/05-polish.md) | Pulido & Multi-Agent | Background & cloud agents |
| [06](workshop/es/06-bonus.md) | Bonus y Extensiones | Desafíos abiertos |

## 🚀 Inicio Rápido

1. **Crea tu propio repositorio** — haz clic en **[Usar esta plantilla](../../generate)** o haz un fork de este repositorio.
2. **Elige tu track:**
   - **VS Code** — clona tu repositorio y ábrelo en VS Code.
   - **Copilot CLI** — clona tu repositorio, instala `copilot` y trabaja desde tu terminal.
3. **¡Comienza!** → [workshop/es/00-overview.md](workshop/es/00-overview.md)

## 🛠️ Requisitos Previos

<table>
<tr>
<th>Todos los tracks</th>
<th>Track VS Code</th>
<th>Track CLI</th>
</tr>
<tr>
<td>

- GitHub Copilot (Pro, Business o Enterprise)
- Git
- Node.js 18+

</td>
<td>

- VS Code v1.107+
- Extensión de GitHub Copilot conectada

</td>
<td>

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ para instalar vía npm
- O Homebrew / WinGet

</td>
</tr>
</table>

## ⚙️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | [Astro](https://astro.build/) v5 |
| Runtime | Node.js + adaptador [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) |
| Fuente | Press Start 2P (estilo juegos retro) |
| Datos | API de gráfico de contribuciones de GitHub |

## Licencia

MIT
