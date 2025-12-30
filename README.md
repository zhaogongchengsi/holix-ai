# Holix-AI

Holix-AI 是一个基于 Holix 框架的跨平台桌面 AI 聊天应用，由 zhaogongchengsi 开发维护。目标是为用户提供流畅、私密且可扩展的本地或云端对话式 AI 体验。

## 项目简介

该项目使用 Holix + React 构建桌面应用，结合 Electron 打包能力。项目已包含用于打包的 electron-builder 配置与数据库/ORM 的 drizzle 配置。仓库使用 pnpm 作为包管理器。

## 主要特性

- 即时聊天：多轮对话、上下文保留、历史回溯
- 多模型支持：可配置接入云端（例如 OpenAI）或本地推理后端（视配置而定）
- 隐私优先：支持本地优先模式（在本地推理时对话不需上传云端）
- 跨平台桌面：Windows / macOS / Linux 原生体验（系统托盘、快捷键等）
- 会话管理：会话保存、导出（Markdown / JSON）以及标签管理
- 可扩展：支持插件/自定义提示/扩展技能

## 仓库顶层结构

仓库根目录的主要文件和目录：

```
.
├── .github/
├── .gitignore
├── biome.json
├── components.json
├── drizzle.config.ts
├── electron-builder.config.json
├── holix.config.ts
├── index.html
├── package.json
├── pnpm-lock.yaml
├── resources/
├── src/
└── tsconfig.json
```

src 目录概要（仓库实际文件）：

```
src/
├── App.tsx
├── env.d.ts
├── index.tsx
├── main.ts
├── routeTree.gen.ts
├── router.tsx
├── node/       # node 相关代码（如果存在）
├── lib/        # 公共库代码
├── components/ # UI 组件
├── routes/     # 页面路由组件
└── styles/     # 样式文件
```

> 注：上述 src 子目录项根据仓库实际存在的目录列出。你可以在本地或通过 GitHub UI 展开这些目录查看详细文件。

## 快速开始（开发）

先决条件：
- Node.js 16+ 或兼容版本
- pnpm（仓库中使用 pnpm，推荐使用 pnpm 安装依赖）

安装依赖并启动开发：

```bash
git clone https://github.com/zhaogongchengsi/holix-ai.git
cd holix-ai
pnpm install

# 启动开发（使用项目提供的脚本）
pnpm run dev
```

可用的 package.json 脚本（来自仓库）：

- `dev` — `holix dev`（启动开发模式）
- `build` — `holix build`（构建应用）
- `type-check` — `tsc --noEmit`（类型检查）
- `gen:db` — `drizzle-kit generate`（生成数据库/ORM 代码）
- `studio` — `drizzle-kit studio`（Drizzle Studio）
- `lint` — `eslint . --fix`（代码风格检查并修复）
- `postinstall` — `electron-builder install-app-deps`（安装 Electron 原生依赖）

## 打包与发布

仓库包含 `electron-builder.config.json`，可使用 electron-builder 生成安装包。示例打包命令：

```bash
# 先构建应用
pnpm run build

# 使用 electron-builder 打包（在构建后执行）
pnpm exec electron-builder -c electron-builder.config.json
```

根据目标平台和配置，electron-builder 会生成对应的安装程序（.exe/.dmg/.AppImage 等）。

## 配置与环境

应用可能需要配置云端 API Key（例如 OpenAI）或本地模型路径。推荐使用环境变量或系统密钥管理器来保存凭据，避免将密钥写入受版本控制的文件。

常见配置项示例（仅示例，实际键名请参考项目代码或设置页面）：

```
# 模型后端: openai | huggingface | local
MODEL_BACKEND=openai

# 使用 OpenAI 时
OPENAI_API_KEY=sk-...

# 使用本地模型时（示例路径）
LOCAL_MODEL_PATH=/path/to/model.bin
```

## 故障排查

- 依赖安装失败：确认 Node 与 pnpm 版本，清理缓存后重新安装（`pnpm install --shamefully-hoist` 或 `pnpm store prune` 等）
- 无法启动开发：查看终端日志，确认 `holix` CLI 可用（`pnpm run dev` 会执行 `holix dev`）
- 打包失败：检查 `electron-builder.config.json` 中的配置，确认已安装原生依赖（`pnpm run postinstall`）

## 贡献

欢迎贡献！建议流程：

1. Fork 仓库并新建分支（`feature/xxx` 或 `fix/xxx`）
2. 提交并推送到你的 fork
3. 提交 PR 并在 PR 描述中说明变更与测试步骤

在贡献前请检查项目是否已有 CONTRIBUTING.md 或 CODE_OF_CONDUCT，并遵守相关规范。

## 许可证

仓库中如有 LICENSE 文件请参考该文件。若无，请联系作者或根据需要添加合适的许可证（例如 MIT）。

## 致谢

感谢 Holix、Electron、Drizzle、pnpm 以及所有开源项目提供的支持.