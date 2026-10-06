# 阿萝拉 · 灵界之间

阿萝拉主题的响应式静态同人网页。纯 HTML、CSS、JavaScript，无依赖、无构建步骤；图片、站标和样式均在本地，不依赖 CDN 或在线字体。

## 查看页面

直接双击 `index.html` 即可浏览。如果需要本地 HTTP 预览，在这个文件夹运行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

浏览器打开 `http://127.0.0.1:4173/`。

## 上传到 GitHub Pages

1. 将本文件夹的 `index.html`、`404.html`、`styles.css`、`script.js`、`.nojekyll` 和整个 `assets` 文件夹上传到仓库根目录。
2. 在 GitHub 仓库的 **Settings → Pages** 选择 **Deploy from a branch**，然后选你的分支（通常是 `main`）和 **/(root)**，保存。
3. 用户主页仓库通常命名为 `你的用户名.github.io`；普通项目仓库也可以使用，图片和样式都使用相对路径。
4. 发布完成后访问 Pages 提供的网址。

参考：[GitHub 官方发布源设置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

压缩包里的文件已经直接位于根目录。请上传解压后的内容，不要把 zip 文件本身当成网站。

## 页面内容与交互

- 三张全幅冰原 Hero 每 6 秒自动循环滚动，支持左右按钮、底部圆点和暂停 / 继续；悬浮玻璃导航与紫色灵光按钮。
- 故事 / 能力 / 画廊三个入口、角色背景、五项技能切换。
- 八个独立画廊场景，桌面四列、平板和手机两列；所有图片卡片统一为 4:3 比例；分类筛选、大图弹窗、左右切换。
- 三篇完整的同人随笔，点击列表卡片阅读。
- 极光页脚、兔子站标、独立 404 页面。
- 手机折叠菜单、单列特色卡片、纵向 Hero 按钮。
- 支持键盘操作、弹窗 Esc 关闭、焦点恢复和系统减少动态效果设置。
- 顶部星形按钮控制飘雪效果。

## 常见修改

- 文案与导航：`index.html`。
- 色彩、字体、间距、响应式布局：`styles.css`。主色定义在文件开头的 `:root` 中。
- 技能介绍与三篇文章：`script.js` 中的 `abilities` 和 `articles`。
- 页脚 GitHub 图标目前指向 GitHub 首页；将 `index.html` 中 `https://github.com/` 换成你的个人主页或仓库链接。也可以按需添加你的邮箱链接。
- 主视觉：`assets/hero.png`，来自你提供的「Hero 主视觉图.png」。
- 新增轮播主视觉：`assets/hero-spirit-girl.png`（极光冰原的兔灵少女）和 `assets/hero-snow-mage.png`（极光雪境与灵兔魔法少女）。自动切换间隔可在 `script.js` 的 `HERO_INTERVAL` 中修改，单位是毫秒。
- 轮播在鼠标悬停、键盘焦点位于 Hero、页面隐藏或 Hero 滚出屏幕时暂时停止；系统设置减少动态效果时默认关闭自动轮播，仍可手动切换。
- 技能区右侧配图：`assets/ability-mage.png`，来自你提供的「极光冰境兔耳魔法师.png」。
- 画廊：`assets/gallery-atlas-1.png` 和 `assets/gallery-atlas-2.png`。两张图片各包含四个独立场景，CSS 根据原始比例裁切显示，避免拉伸，也不需要额外图片处理。

若要换成八张独立图片，替换样式中 `.scene-*` 的 `--scene-image`，并将对应背景尺寸由 `200% 200%` 改为 `100% 100%`；同时将 `--scene-ratio` 改为新图片的宽高比。

## 内容来源

- 技能简体名称、简介和背景依据 [Riot Data Dragon 16.19.1](https://ddragon.leagueoflegends.com/cdn/16.19.1/data/zh_CN/champion/Aurora.json)。页面以概览形式呈现，不包含数值攻略。游戏更新后可自行更新。
- [阿萝拉官方英雄页面](https://www.leagueoflegends.com/zh-tw/champions/aurora/)。
- 画廊的八个场景是为本项目生成的 AI 幻想配图；三篇「雪原手记」为本站同人创作，非官方剧情。
- 你提供的桌面、手机设计稿用于视觉与布局参考，网页未把整张设计稿作为可点击页面。

《英雄联盟》及相关角色属于 Riot Games。本站为非官方同人主题展示，与 Riot Games 无关联。
