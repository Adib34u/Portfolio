// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Lenis RAF
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// ADVANCED ANIMATED CURSOR
// ============================================

// Create custom cursor elements
const cursorOuter = document.createElement('div');
cursorOuter.className = 'cursor-outer';
document.body.appendChild(cursorOuter);

const cursorInner = document.createElement('div');
cursorInner.className = 'cursor-inner';
document.body.appendChild(cursorInner);

const cursorTrail = [];
for (let i = 0; i < 12; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.cssText = `
    position: fixed;
    width: ${30 - i * 2}px;
    height: ${30 - i * 2}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(78, 205, 196, ${0.8 - i * 0.06}), rgba(78, 205, 196, 0));
    pointer-events: none;
    z-index: ${9997 - i};
    filter: blur(${i * 1.5}px);
    border: 2px solid rgba(78, 205, 196, ${0.4 - i * 0.03});
  `;
  document.body.appendChild(trail);
  cursorTrail.push({ element: trail, x: 0, y: 0 });
}

// Cursor styles
const cursorStyles = `
  .cursor-outer {
    position: fixed;
    width: 50px;
    height: 50px;
    border: 4px solid #4ECDC4;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.2s ease;
    box-shadow: 0 0 30px rgba(78, 205, 196, 0.8),
                0 0 60px rgba(255, 107, 107, 0.4),
                inset 0 0 15px rgba(78, 205, 196, 0.3);
    background: radial-gradient(circle, rgba(78, 205, 196, 0.1), transparent);
  }
  
  .cursor-inner {
    position: fixed;
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #FFE66D, #4ECDC4, #FF6B6B);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 0 20px rgba(78, 205, 196, 1),
                0 0 40px rgba(255, 107, 107, 0.8),
                0 0 60px rgba(255, 230, 109, 0.4);
    border: 2px solid rgba(255, 230, 109, 0.5);
  }
  
  .cursor-outer.hover {
    width: 80px;
    height: 80px;
    border-color: #FFE66D;
    border-width: 5px;
    box-shadow: 0 0 50px rgba(78, 205, 196, 1),
                0 0 100px rgba(255, 107, 107, 0.6),
                inset 0 0 30px rgba(78, 205, 196, 0.4);
    background: radial-gradient(circle, rgba(78, 205, 196, 0.2), transparent);
  }
  
  .cursor-inner.hover {
    width: 18px;
    height: 18px;
    box-shadow: 0 0 30px rgba(78, 205, 196, 1),
                0 0 60px rgba(255, 107, 107, 1),
                0 0 90px rgba(255, 230, 109, 0.6);
    border-width: 3px;
  }
  
  .cursor-click {
    animation: cursorClick 0.3s ease;
  }
  
  @keyframes cursorClick {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

let mouseX = 0;
let mouseY = 0;
let cursorOuterX = 0;
let cursorOuterY = 0;
let cursorInnerX = 0;
let cursorInnerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Click animation
document.addEventListener('mousedown', () => {
  cursorOuter.classList.add('cursor-click');
  cursorInner.classList.add('cursor-click');
  
  gsap.to(cursorOuter, {
    scale: 0.85,
    duration: 0.15,
    ease: 'power2.out'
  });
  
  gsap.to(cursorInner, {
    scale: 0.7,
    duration: 0.15,
    ease: 'power2.out'
  });
});

document.addEventListener('mouseup', () => {
  setTimeout(() => {
    cursorOuter.classList.remove('cursor-click');
    cursorInner.classList.remove('cursor-click');
  }, 300);
  
  gsap.to(cursorOuter, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out'
  });
  
  gsap.to(cursorInner, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out'
  });
});

function animateCursor() {
  // Smooth cursor movement with better easing
  cursorOuterX += (mouseX - cursorOuterX) * 0.12;
  cursorOuterY += (mouseY - cursorOuterY) * 0.12;
  cursorInnerX += (mouseX - cursorInnerX) * 0.3;
  cursorInnerY += (mouseY - cursorInnerY) * 0.3;
  
  cursorOuter.style.transform = `translate(${cursorOuterX - 25}px, ${cursorOuterY - 25}px)`;
  cursorInner.style.transform = `translate(${cursorInnerX - 6}px, ${cursorInnerY - 6}px)`;
  
  // Animate trail with improved spacing
  cursorTrail.forEach((trail, index) => {
    const delay = index * 0.04;
    trail.x += (mouseX - trail.x) * (0.25 - delay);
    trail.y += (mouseY - trail.y) * (0.25 - delay);
    const size = 30 - index * 2;
    trail.element.style.transform = `translate(${trail.x - size / 2}px, ${trail.y - size / 2}px)`;
  });
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .btn, .view-btn, .project-card, .contact-card, .skill-item, .education-content, .badge');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOuter.classList.add('hover');
    cursorInner.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorOuter.classList.remove('hover');
    cursorInner.classList.remove('hover');
  });
});

// ============================================
// NAVBAR & NAVIGATION
// ============================================

// Navbar scroll effect
lenis.on('scroll', ({ scroll }) => {
  const navbar = document.getElementById('navbar');
  if (scroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// Update active nav on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

lenis.on('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================

// Hero Section Animations
gsap.from('.hero-content h1', {
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: 'power4.out',
  delay: 0.2
});

gsap.from('.subtitle', {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.out',
  delay: 0.6
});

gsap.from('.cta-buttons', {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.out',
  delay: 1
});

// Floating shapes continuous animation with gold glow
gsap.to('.shape-1', {
  y: -40,
  x: 30,
  rotation: 360,
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.shape-2', {
  y: -50,
  x: -30,
  rotation: -360,
  duration: 12,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 1
});

gsap.to('.shape-3', {
  y: -45,
  x: 25,
  rotation: 360,
  duration: 11,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 2
});

// About Section - Image Animation
ScrollTrigger.create({
  trigger: '.about-image',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.about-image', {
      scale: 0.7,
      rotation: -15,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    });
  },
  once: true
});

// About Section - Text Animation
ScrollTrigger.create({
  trigger: '.about-text',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.about-text p', {
      x: -80,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: 'power3.out'
    });
  },
  once: true
});

// Page Titles Animation
gsap.utils.toArray('.page-title').forEach(title => {
  ScrollTrigger.create({
    trigger: title,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(title, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      });
    },
    once: true
  });
});

// Projects Section - Cards Animation
ScrollTrigger.create({
  trigger: '.projects-grid',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.project-card', {
      y: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.25,
      ease: 'power3.out'
    });
  },
  once: true
});

// Skills Section - Items Animation
ScrollTrigger.create({
  trigger: '.skills-list',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.skill-item', {
      x: -120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    // Animate skill bars with gold effect
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const level = bar.getAttribute('data-level');
        gsap.to(bar, {
          width: level + '%',
          duration: 2,
          ease: 'power2.out'
        });
      });
    }, 600);
  },
  once: true
});

// Contact Section - Cards Animation
ScrollTrigger.create({
  trigger: '.contact-grid',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.contact-card', {
      scale: 0.7,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: 'back.out(1.7)'
    });
  },
  once: true
});

// Education Section - Timeline Animation
ScrollTrigger.create({
  trigger: '.education-timeline',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.education-item', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: 'power3.out'
    });
  },
  once: true
});

// Parallax effect for mouse movement
let parallaxMouseX = 0;
let parallaxMouseY = 0;
let currentParallaxX = 0;
let currentParallaxY = 0;

document.addEventListener('mousemove', (e) => {
  parallaxMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  parallaxMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateParallax() {
  currentParallaxX += (parallaxMouseX - currentParallaxX) * 0.1;
  currentParallaxY += (parallaxMouseY - currentParallaxY) * 0.1;
  
  gsap.to('.floating-shape', {
    x: (i) => currentParallaxX * (30 + i * 15),
    y: (i) => currentParallaxY * (30 + i * 15),
    duration: 0.5,
    ease: 'power2.out'
  });
  
  requestAnimationFrame(animateParallax);
}
animateParallax();

// Enhanced hover effects
const buttons = document.querySelectorAll('.btn, .view-btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    gsap.to(this, {
      y: -20,
      scale: 1.03,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', function() {
    gsap.to(this, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// Contact cards hover effect
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    gsap.to(this, {
      y: -15,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', function() {
    gsap.to(this, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    gsap.to(this, {
      x: 15,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  item.addEventListener('mouseleave', function() {
    gsap.to(this, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// About image hover effect
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
  aboutImage.addEventListener('mouseenter', function() {
    gsap.to('.about-image img', {
      scale: 1.08,
      rotation: 3,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  aboutImage.addEventListener('mouseleave', function() {
    gsap.to('.about-image img', {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
}

// About text paragraphs hover effect
const aboutParagraphs = document.querySelectorAll('.about-text p');
aboutParagraphs.forEach(p => {
  p.addEventListener('mouseenter', function() {
    gsap.to(this, {
      x: 15,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  p.addEventListener('mouseleave', function() {
    gsap.to(this, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// Education content hover effect
const educationContents = document.querySelectorAll('.education-content');
educationContents.forEach(content => {
  content.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  content.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// Badge hover effect
const badges = document.querySelectorAll('.badge');
badges.forEach(badge => {
  badge.addEventListener('mouseenter', function() {
    gsap.to(this, {
      y: -3,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  badge.addEventListener('mouseleave', function() {
    gsap.to(this, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Performance optimization
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(0.5);
}

console.log('✨ Colorful Modern Portfolio Loaded!');
console.log('🌈 Vibrant Multi-Color Theme Activated');
console.log('🎨 Advanced Cursor Enabled');
console.log('⚡ Lenis Smooth Scroll Active');
