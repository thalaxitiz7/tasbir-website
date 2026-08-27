/**
 * TASBIR — Core JavaScript Engine
 * Handles configuration, theme rendering, navigation, carousel logic,
 * scroll observers, and static form submissions.
 */

'use strict';

/* ==========================================================================
   CENTRALIZED EDITABLE CONFIGURATION
   ========================================================================== */
const TASBIR_CONFIG = {
  // Store Links
  PLAY_STORE_URL: 'YOUR_PLAY_STORE_LINK_HERE',

  // Contact & Support Emails
  SUPPORT_EMAIL: 'support.tasbir@gmail.com',
  BUSINESS_EMAIL: 'ads.tasbir@gmail.com',

  // Social Media Channels
  SOCIAL_URLS: {
    INSTAGRAM: 'YOUR_INSTAGRAM_URL',
    FACEBOOK: 'YOUR_FACEBOOK_URL',
    X: 'YOUR_X_URL',
    WEBSITE: 'YOUR_WEBSITE_URL'
  },

  // Screenshots Central Data Registry
// Screenshots Central Data Registry
SCREENSHOTS: [
  {
    id: 1,
    image: '01.png',
    fileName: '01.png',
    title: 'Home',
    description: 'Explore visual content effortlessly.'
  },
  {
    id: 2,
    image: '02.png',
    fileName: '02.png',
    title: 'Explore',
    description: 'Find images matching your vision.'
  },
  {
    id: 3,
    image: '03.png',
    fileName: '03.png',
    title: 'Category',
    description: 'Browse organized visual collections.'
  },
  {
    id: 4,
    image: '04.png',
    fileName: '04.png',
    title: 'Free Images',
    description: 'High resolution direct exports.'
  },
  {
    id: 5,
    image: '05.png',
    fileName: '05.png',
    title: 'Upload',
    description: 'Share your photography seamlessly.'
  },
  {
    id: 6,
    image: '06.png',
    fileName: '06.png',
    title: 'Light Mode',
    description: 'Experience clean, adaptable themes.'
  },
  {
    id: 7,
    image: '07.png',
    fileName: '07.png',
    title: 'Profile',
    description: 'Manage preferences and account settings.'
  }
]
};

/* ==========================================================================
   INITIALIZATION & DOM LOADING
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initGlobalConfig();
  initThemeToggle();
  initNavigation();
  initScrollObserver();
  initAppShowcase();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. GLOBAL CONFIGURATION BINDING
   ========================================================================== */
function initGlobalConfig() {
  // Bind Play Store Link to all CTAs
  document.querySelectorAll('.js-playstore-btn').forEach(btn => {
    btn.setAttribute('href', TASBIR_CONFIG.PLAY_STORE_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Bind Emails
  document.querySelectorAll('.js-support-email').forEach(elem => {
    elem.setAttribute('href', `mailto:${TASBIR_CONFIG.SUPPORT_EMAIL}`);
    elem.textContent = TASBIR_CONFIG.SUPPORT_EMAIL;
  });

  document.querySelectorAll('.js-business-email').forEach(elem => {
    elem.setAttribute('href', `mailto:${TASBIR_CONFIG.BUSINESS_EMAIL}`);
    elem.textContent = TASBIR_CONFIG.BUSINESS_EMAIL;
  });

  // Bind Social Links
  const socialMap = [
    { selector: '.js-instagram-url', url: TASBIR_CONFIG.SOCIAL_URLS.INSTAGRAM },
    { selector: '.js-facebook-url', url: TASBIR_CONFIG.SOCIAL_URLS.FACEBOOK },
    { selector: '.js-x-url', url: TASBIR_CONFIG.SOCIAL_URLS.X }
  ];

  socialMap.forEach(({ selector, url }) => {
    document.querySelectorAll(selector).forEach(elem => {
      elem.setAttribute('href', url);
    });
  });
}

/* ==========================================================================
   2. THEME SYSTEM MANAGEMENT
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('tasbir_theme', newTheme);
  });
}

/* ==========================================================================
   3. NAVIGATION LOGIC & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Blur Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Hamburger Toggle
  if (menuToggle && navMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : !navMenu.classList.contains('active');
      navMenu.classList.toggle('active', isExpanded);
      menuToggle.classList.toggle('active', isExpanded);
      menuToggle.setAttribute('aria-expanded', isExpanded.toString());
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }
}

/* ==========================================================================
   4. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollObserver() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. APP SHOWCASE / CAROUSEL IMPLEMENTATION
   ========================================================================== */
function initAppShowcase() {
  const track = document.getElementById('appCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (!track) return;

  // Render Screenshot Nodes
  track.innerHTML = TASBIR_CONFIG.SCREENSHOTS.map(item => `
    <article class="showcase-card">
      <div class="showcase-frame">
        <img 
          src="${item.image}" 
          alt="${item.title} Screenshot" 
          class="showcase-img"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="showcase-meta">
        <h3 class="showcase-title font-editorial">${item.title}</h3>
        <p class="showcase-desc">${item.description}</p>
      </div>
    </article>
  `).join('');

  // Controls
  const scrollAmount = 300;
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Mouse Drag to Scroll
  let isDown = false;
  let startX, scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => { isDown = false; });
  track.addEventListener('mouseup', () => { isDown = false; });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
}

/* ==========================================================================
   6. CONTACT FORM HANDLING (STATIC HONESTY)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatus');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Static Website Notification Simulation
    statusMsg.className = 'form-status-message success';
    statusMsg.textContent = 'Demo Mode: Form validation passed. Static site configuration required to transmit messages.';
    
    form.reset();

    setTimeout(() => {
      statusMsg.textContent = '';
      statusMsg.className = 'form-status-message';
    }, 6000);
  });
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}