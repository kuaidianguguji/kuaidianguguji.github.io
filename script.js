'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');
function closeMenu() { navMenu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '打开导航菜单'); }
menuButton.addEventListener('click', () => { const open = navMenu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单'); });
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!event.target.closest('.navigation')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const snow = document.querySelector('.snow');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const atmosphereButton = document.querySelector('.atmosphere-button');
let snowEnabled = !reduceMotion.matches;
for (let i = 0; i < 28; i++) { const flake = document.createElement('span'); flake.className = 'snowflake'; flake.style.left = `${Math.random() * 100}%`; flake.style.animationDuration = `${9 + Math.random() * 13}s`; flake.style.animationDelay = `${-Math.random() * 22}s`; snow.append(flake); }
function updateSnow() { snow.hidden = !snowEnabled; atmosphereButton.setAttribute('aria-pressed', String(snowEnabled)); atmosphereButton.setAttribute('aria-label', snowEnabled ? '关闭飘雪效果' : '开启飘雪效果'); }
atmosphereButton.addEventListener('click', () => { snowEnabled = !snowEnabled; updateSnow(); });
reduceMotion.addEventListener('change', event => { if (event.matches) { snowEnabled = false; updateSnow(); } });
updateSnow();

// Three real slides plus edge clones allow seamless movement in either direction.
const hero = document.querySelector('.hero');
const heroTrack = document.querySelector('.hero-track');
const heroSlides = [...heroTrack.querySelectorAll('.hero-image')];
const heroDots = [...document.querySelectorAll('[data-hero-slide]')];
const heroPrevious = document.querySelector('.hero-previous');
const heroNext = document.querySelector('.hero-next');
const heroPlay = document.querySelector('.hero-play-toggle');
const HERO_INTERVAL = 6000;
let heroIndex = 0;
let heroPosition = 1;
let heroAnimating = false;
let heroPlaying = !reduceMotion.matches;
let heroHovered = false;
let heroFocused = false;
let heroExplicitPlay = false;
let heroVisible = true;
let heroTimer = null;
let heroTransitionTimer = null;

function edgeClone(image) {
  const clone = image.cloneNode(true);
  clone.alt = '';
  clone.setAttribute('aria-hidden', 'true');
  clone.removeAttribute('fetchpriority');
  clone.dataset.heroClone = 'true';
  return clone;
}
heroTrack.prepend(edgeClone(heroSlides[heroSlides.length - 1]));
heroTrack.append(edgeClone(heroSlides[0]));
heroTrack.style.transform = 'translateX(-100%)';
// Commit the initial position before enabling transitions.
void heroTrack.offsetWidth;
heroTrack.classList.add('is-ready');
[heroPrevious, heroNext, document.querySelector('.hero-carousel-controls')].forEach(control => { control.hidden = false; });

function updateHeroControls() {
  heroSlides.forEach((image, index) => image.setAttribute('aria-hidden', String(index !== heroIndex)));
  heroDots.forEach((dot, index) => { dot.setAttribute('aria-pressed', String(index === heroIndex)); dot.setAttribute('aria-disabled', String(heroAnimating)); });
  heroPrevious.setAttribute('aria-disabled', String(heroAnimating));
  heroNext.setAttribute('aria-disabled', String(heroAnimating));
  document.querySelector('.hero-slide-count').textContent = `${String(heroIndex + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`;
  heroPlay.setAttribute('aria-label', heroPlaying ? '暂停自动轮播' : '开启自动轮播');
  heroPlay.setAttribute('aria-pressed', String(!heroPlaying));
  heroPlay.querySelector('span').textContent = heroPlaying ? 'Ⅱ' : '▷';
}

function scheduleHero() {
  clearTimeout(heroTimer);
  heroTimer = null;
  if (!heroPlaying || heroAnimating || document.hidden || !heroVisible || ((heroHovered || heroFocused) && !heroExplicitPlay)) return;
  heroTimer = setTimeout(() => moveHero(1, false), HERO_INTERVAL);
}

function finishHeroTransition() {
  if (!heroAnimating) return;
  clearTimeout(heroTransitionTimer);
  if (heroPosition === 0 || heroPosition === heroSlides.length + 1) {
    heroPosition = heroPosition === 0 ? heroSlides.length : 1;
    heroTrack.classList.remove('is-ready');
    heroTrack.style.transform = `translateX(-${heroPosition * 100}%)`;
    void heroTrack.offsetWidth;
    heroTrack.classList.add('is-ready');
  }
  heroAnimating = false;
  updateHeroControls();
  scheduleHero();
}

function showHero(index, position, manual) {
  if (heroAnimating || index === heroIndex) return;
  clearTimeout(heroTimer);
  heroIndex = index;
  heroPosition = position;
  heroAnimating = true;
  if (manual) {
    heroExplicitPlay = false;
    document.querySelector('#hero-slide-status').textContent = `第 ${heroIndex + 1} 张，共 ${heroSlides.length} 张。${heroSlides[heroIndex].alt}`;
  }
  updateHeroControls();
  heroTrack.style.transform = `translateX(-${heroPosition * 100}%)`;
  if (reduceMotion.matches) finishHeroTransition();
  else heroTransitionTimer = setTimeout(finishHeroTransition, 950);
}

function moveHero(direction, manual = true) {
  showHero((heroIndex + direction + heroSlides.length) % heroSlides.length, heroPosition + direction, manual);
}
heroTrack.addEventListener('transitionend', event => { if (event.target === heroTrack && event.propertyName === 'transform') finishHeroTransition(); });
heroPrevious.addEventListener('click', () => moveHero(-1));
heroNext.addEventListener('click', () => moveHero(1));
heroDots.forEach(dot => dot.addEventListener('click', () => {
  const index = Number(dot.dataset.heroSlide);
  let position = index + 1;
  if (heroIndex === heroSlides.length - 1 && index === 0) position = heroSlides.length + 1;
  if (heroIndex === 0 && index === heroSlides.length - 1) position = 0;
  showHero(index, position, true);
}));
heroPlay.addEventListener('click', () => {
  heroPlaying = !heroPlaying;
  heroExplicitPlay = heroPlaying;
  updateHeroControls();
  scheduleHero();
});
hero.addEventListener('mouseenter', () => { heroHovered = true; heroExplicitPlay = false; scheduleHero(); });
hero.addEventListener('mouseleave', () => { heroHovered = false; scheduleHero(); });
hero.addEventListener('focusin', () => { heroFocused = true; scheduleHero(); });
hero.addEventListener('focusout', () => { queueMicrotask(() => { heroFocused = hero.contains(document.activeElement); if (!heroFocused) heroExplicitPlay = false; scheduleHero(); }); });
hero.addEventListener('keydown', event => {
  if (event.target.closest('.hero-carousel-controls, .hero-arrow') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    event.preventDefault();
    moveHero(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
document.addEventListener('visibilitychange', scheduleHero);
reduceMotion.addEventListener('change', event => {
  if (event.matches) { heroPlaying = false; finishHeroTransition(); updateHeroControls(); scheduleHero(); }
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; scheduleHero(); }, { threshold: 0.1 }).observe(hero);
}
updateHeroControls();
scheduleHero();

const abilities = {
  passive: { label: 'PASSIVE · 被动技能', name: '驱灵奇术', text: '普攻与技能能从敌人体内抽离灵物，灵物随她同行并恢复生命值。' },
  q: { label: 'Q · 灵界魔法', name: '飞去来咒', text: '发射飞弹诅咒敌人，再次施放或持续时间结束时收回诅咒，对沿途敌人造成伤害。' },
  w: { label: 'W · 灵界漫步', name: '灵纱洞开', text: '朝指定方向跃起，落地后短暂隐形并提高移动速度，参与击杀英雄可重置冷却。' },
  e: { label: 'E · 灵界魔法', name: '怪奇喷涌', text: '释放灵魂魔法洪流，对前方敌人造成伤害与减速，同时向后跃开。' },
  r: { label: 'R · 灵界领域', name: '双界合一', text: '跃向指定方向，造成伤害并展开交界领域；阿萝拉可在边缘之间穿梭，敌人跨越边界时受到减速。' }
};
const abilityTabs = [...document.querySelectorAll('[data-ability]')];
function activateAbility(tab, focus = false) { abilityTabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; }); const data = abilities[tab.dataset.ability]; document.querySelector('#ability-label').textContent = data.label; document.querySelector('#ability-name').textContent = data.name; document.querySelector('#ability-description').textContent = data.text; document.querySelector('#ability-content').setAttribute('aria-labelledby', tab.id); if (focus) tab.focus(); }
abilityTabs.forEach((tab, index) => { tab.addEventListener('click', () => activateAbility(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % abilityTabs.length; if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + abilityTabs.length) % abilityTabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = abilityTabs.length - 1; if (next !== undefined) { event.preventDefault(); activateAbility(abilityTabs[next], true); } }); });

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(filter => filter.addEventListener('click', () => { filters.forEach(item => { const selected = item === filter; item.classList.toggle('selected', selected); item.setAttribute('aria-pressed', String(selected)); }); galleryItems.forEach(item => { item.hidden = filter.dataset.filter !== 'all' && item.dataset.category !== filter.dataset.filter; }); }));

const galleryDialog = document.querySelector('#gallery-dialog');
const lightboxImage = document.querySelector('#lightbox-image');
let visibleScenes = [];
let sceneIndex = 0;
let previousFocus = null;
function openDialog(dialog) { previousFocus = document.activeElement; dialog.showModal(); document.body.classList.add('modal-open'); }
function renderScene() { const scene = visibleScenes[sceneIndex]; const title = scene.querySelector('strong').textContent; lightboxImage.className = `lightbox-image scene-${scene.dataset.scene}`; lightboxImage.setAttribute('aria-label', title); document.querySelector('#lightbox-title').textContent = title; document.querySelector('#lightbox-counter').textContent = `${String(sceneIndex + 1).padStart(2, '0')} / ${String(visibleScenes.length).padStart(2, '0')}`; }
function moveScene(amount) { sceneIndex = (sceneIndex + amount + visibleScenes.length) % visibleScenes.length; renderScene(); }
galleryItems.forEach(item => item.addEventListener('click', () => { visibleScenes = galleryItems.filter(scene => !scene.hidden); sceneIndex = visibleScenes.indexOf(item); renderScene(); openDialog(galleryDialog); }));
document.querySelector('#gallery-prev').addEventListener('click', () => moveScene(-1));
document.querySelector('#gallery-next').addEventListener('click', () => moveScene(1));
galleryDialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { event.preventDefault(); moveScene(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); moveScene(1); } });

const articles = [
  { title: '如果极光也有声音', scene: 7, paragraphs: ['天色完全暗下来以后，雪原才慢慢显出另一种轮廓。白昼里锋利的山脊融进深蓝的夜，只有一条柔软的光，在群山上方舒展开来。它先是青色，接着有了紫，像有人在天空里翻动一本很大的书。', '我试着听它。风吹过兜帽的绒毛，冰面发出细碎的响声，远处有什么轻轻踩进雪里。极光本身并没有回答，却把这些声音一起收进了夜色。也许这就是它的语言：让你终于听见，身旁那些原本被忽略的小事。', '一只兔子灵体停在我的靴子旁。它的耳尖几乎是透明的，像染上了紫色的雪。我没有问它从哪里来，只往旁边挪了一点，让它也能看见天空。', '那一晚，我们待了很久。极光一遍遍经过，而雪原并不催促谁继续赶路。', '手记 / 这是一篇受阿萝拉与弗雷尔卓德视觉意象启发的同人随笔。'] },
  { title: '和一只灵体兔子交朋友', scene: 2, paragraphs: ['第一条经验是，不要着急。你向前走一步，它就可能退后两步；你静静坐下来，它反而会想知道，你为什么忽然不走了。', '它们的身体像光，又比光更有自己的脾气。有一只喜欢绕着魔法书跑，另一只总是在我打算出发时，把自己团成一小团，睡在斗篷边上。我分不清那是不是睡眠，但我决定尊重它的安排。', '我没有为它们准备什么宏大的见面仪式。只是把雪上的脚步放轻，给那一点点紫色的光留出位置。有时，我会讲讲今天看见的东西：一棵被风吹歪的松树，一片特别好看的冰晶，或一盏远远亮着的灯。', '它们未必明白每个字。不过，当一双耳朵向你转过来，你就知道，有什么正在认真听。', '手记 / 灵体兔子与相遇情节为同人创作，非官方角色剧情。'] },
  { title: '风雪尽头，有一盏灯', scene: 4, paragraphs: ['从树林里看见那扇窗的时候，我先闻到了木柴的气味。光是温暖的琥珀色，把窗沿积着的雪照得像糖。门前只有几枚脚印，旁边还有几行更小的，我猜那是另一位访客留下的。', '屋子里没有什么了不起的宝物。一张桌子，一把有些旧的椅子，炉火边放着一只水壶。却正好够我把斗篷晾开，把魔法书摊在桌上，让赶了一天路的手指慢慢暖起来。', '窗外，极光依旧流动。风把雪吹过来，又吹走。炉火噼啪响了一声，我抬起头，看见一只小小的灵体在门边试探着探出耳朵。', '于是我又添了一把柴，把另一把椅子向炉火挪了挪。明天的路还很长，但今晚，先留在这里吧。', '手记 / 雪原小屋与旅途片段为本站的幻想随笔，非官方角色剧情。'] }
];
const articleDialog = document.querySelector('#article-dialog');
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => { const article = articles[Number(button.dataset.article)]; document.querySelector('#article-title').textContent = article.title; document.querySelector('#article-cover').className = `article-cover scene-${article.scene}`; const content = document.querySelector('#article-content'); content.replaceChildren(...article.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; })); openDialog(articleDialog); articleDialog.scrollTop = 0; }));
[galleryDialog, articleDialog].forEach(dialog => { dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target !== dialog) return; const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); }); dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (previousFocus) previousFocus.focus({ preventScroll: true }); }); });

document.querySelector('#copyright-year').textContent = new Date().getFullYear();
const navLinks = [...navMenu.querySelectorAll('a')];
if ('IntersectionObserver' in window) { const sections = [document.querySelector('#home'), document.querySelector('#story-detail'), document.querySelector('#ability-detail'), document.querySelector('#gallery'), document.querySelector('#contact')]; const targets = ['#home', '#story-detail', '#ability-detail', '#gallery', '#contact']; const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { const target = targets[sections.indexOf(entry.target)]; navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === target)); } }); }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 }); sections.forEach(section => observer.observe(section)); }
