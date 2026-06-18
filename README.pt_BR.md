<!-- l10n-sync: source-file="README.md" -->
<div align="center">

# 🎮 Mona Mayhem

### *Batalha dos Commits* — Um Workshop de GitHub Copilot

[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-v5-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-obrigatório-000000?logo=githubcopilot&logoColor=white)](https://github.com/features/copilot)

**Coloque dois usuários do GitHub frente a frente em um épico duelo de gráficos de contribuição — e aprenda GitHub Copilot no processo.**

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)

[**🚀 Iniciar o Workshop →**](workshop/pt_BR/00-overview.md) &nbsp;|&nbsp; [**📖 Ler a Documentação →**](workshop/pt_BR/)

</div>

---

## ✨ O Que Você Vai Construir

Uma **arena de batalha estilo arcade retrô** onde dois usuários do GitHub se enfrentam, com seus gráficos de contribuição como armas. Você parte de um template vazio e chega a um app polido e pronto para deploy — totalmente impulsionado pelo GitHub Copilot.

> **Este repositório é seu ponto de partida.** Você constrói o app passo a passo com o Copilot; o resultado final é seu.

## 🧠 O Que Você Vai Aprender

| Habilidade | Onde Vai Usar |
|------------|---------------|
| Engenharia de contexto | Criar instruções e prompts de workspace eficazes |
| Plan Mode | Decompor funcionalidades antes de escrever código |
| Agent Mode | Deixar o Copilot escrever, iterar e se autocorrigir |
| Design com IA | De vibes → design → implementação em um único ciclo |
| Trabalho paralelo | Rodar múltiplos background agents simultaneamente |
| Revisão de código | Usar o Copilot para encontrar problemas e melhorar qualidade |

## 📚 Workshop

Escolha o track que melhor se adapta ao seu fluxo de trabalho — ambos cobrem as mesmas habilidades fundamentais:

- 🖥️ **Track VS Code** — Chat, Plan Mode, Agent Mode, background agents e ciclos de revisão nativos do editor
- 💻 **Track CLI** — `copilot`, contexto `@file`, `/plan`, edições autônomas, `/fleet`, `/delegate` e `/review`

| Parte | Título | Recurso do Copilot |
|-------|--------|-------------------|
| [00](workshop/pt_BR/00-overview.md) | Visão Geral | O que você vai aprender |
| [01](workshop/pt_BR/01-setup.md) | Configuração & Engenharia de Contexto | Instruções de workspace, background agents |
| [02](workshop/pt_BR/02-plan-and-scaffold.md) | Planejar & Estruturar | Plan Mode |
| [03](workshop/pt_BR/03-agent-mode.md) | Agent Mode: Construir o Jogo | Agent Mode |
| [04](workshop/pt_BR/04-design-vibes.md) | Temas Design-First | Plan + Agent Mode |
| [05](workshop/pt_BR/05-polish.md) | Polimento & Multi-Agent | Background & cloud agents |
| [06](workshop/pt_BR/06-bonus.md) | Bônus & Extensões | Desafios abertos |

## 🚀 Início Rápido

1. **Crie seu próprio repositório** — clique em **[Usar este template](../../generate)** ou faça um fork deste repositório.
2. **Escolha seu track:**
   - **VS Code** — clone seu repositório e abra no VS Code.
   - **Copilot CLI** — clone seu repositório, instale o `copilot` e trabalhe pelo terminal.
3. **Comece agora!** → [workshop/pt_BR/00-overview.md](workshop/pt_BR/00-overview.md)

## 🛠️ Pré-requisitos

<table>
<tr>
<th>Todos os tracks</th>
<th>Track VS Code</th>
<th>Track CLI</th>
</tr>
<tr>
<td>

- GitHub Copilot (Pro, Business ou Enterprise)
- Git
- Node.js 18+

</td>
<td>

- VS Code v1.107+
- Extensão do GitHub Copilot conectada

</td>
<td>

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ para instalar via npm
- Ou Homebrew / WinGet

</td>
</tr>
</table>

## ⚙️ Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Framework | [Astro](https://astro.build/) v5 |
| Runtime | Node.js + adaptador [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) |
| Fonte | Press Start 2P (estilo jogos retrô) |
| Dados | API de gráfico de contribuições do GitHub |

## Licença

MIT
