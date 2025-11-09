# NetStart 2.0 — TIS Prediction Demo

一个用于演示 NetStart 2.0（翻译起始位点预测）的交互式前端 Demo，配合 BINF3020 小组展示使用。

- 在线地址（稳定别名）：
  - https://netstart2-0-demo.vercel.app
- 近期部署（可能包含随机后缀，仅作参考）：
  - https://netstart2-0-demo-git-main-all666666all1s-projects.vercel.app

## 功能特点
- 交互式预测：粘贴 FASTA 或原始核苷酸序列，选择物种，浏览预测结果
- 三种输出模式：All ATGs / Top‑1 / ≥ Threshold（阈值可调，展示通过/未通过的对比）
- 可下载 CSV：导出当前可见结果（与模式一致）
- 可解释信息：物种、ATG 总数、阈值下可见数，1‑based 位置提示
- 轻量 UI：Hero 空气感网格、磨砂玻璃 About 卡片、统一 Meta/Legend 视觉

## 技术栈
- 构建：Vite + React + TypeScript
- 样式：Tailwind CSS v4、shadcn/ui 组件
- 部署：Vercel（静态产物位于 `dist/public`）

## 本地开发
- 需要 Node.js 18+（建议 LTS）
- 推荐使用 pnpm（已在 package.json 中声明 `packageManager`）

```
pnpm i
pnpm dev     # 本地启动（Vite，默认 3000）
```

## 构建
```
pnpm run build  # 产物输出到 dist/public（前端静态）与 dist/index.js（可选服务端入口）
```

## 部署（Vercel）
- 方式 A：直接从静态目录部署（最省心）
```
npx vercel --prod --yes --cwd dist/public
```
- 方式 B：预构建 + 预构建部署（避免云端二次安装/构建）
```
npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod --yes
```

> 说明：本仓库 `vite.config.ts` 的 root 指向 `client/`，构建输出为 `dist/public`，Vercel 会自动识别或可通过 `--cwd dist/public` 明确指定。

## 环境变量
- `client/index.html` 中包含 `%VITE_*%` 占位符（如 `%VITE_APP_TITLE%`）。若未设置，只会出现构建警告，不影响演示功能。

## 作者 / 致谢
- Author: all666666all
- Contributors: Chengzong Guo, Dingyi Cao
- Upstream: NetStart 2.0 — Nielsen et al. (2025)

## 许可证
- MIT（详见 `package.json`）

