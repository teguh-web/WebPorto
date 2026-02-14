// ===============================
//  UTILITY FUNCTIONS
// ===============================

// Fungsi helper untuk get elemen dengan aman
function safeGetElement(id) {
  return document.getElementById(id);
}

function safeGetElements(selector) {
  return document.querySelectorAll(selector);
}

// ===============================
//  NAVBAR ENTRY ON FIRST LOAD
// ===============================
window.addEventListener("load", () => {
  const header = document.querySelector("header");
  if (header) header.classList.add("show");
});

// ===============================
//  ANIMASI NAME + ROLE
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const nameEl = safeGetElement('name');
  const roleEl = safeGetElement('role');

  if (!nameEl || !roleEl) return;

  const nameText = "Arya Teguh Bagus Prayoga";
  const roles = ["Frontend Developer", "UI/UX Designer"];

  function typeText(el, text, speed = 150) {
    return new Promise(resolve => {
      let i = 0;
      el.textContent = '';
      el.classList.add('caret');

      function step() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(step, speed);
        } else {
          resolve();
        }
      }
      step();
    });
  }

  function deleteText(el, speed = 80) {
    return new Promise(resolve => {
      let text = el.textContent;
      function step() {
        if (text.length > 0) {
          text = text.slice(0, -1);
          el.textContent = text;
          setTimeout(step, speed);
        } else {
          resolve();
        }
      }
      step();
    });
  }

  (async function run() {
    await Promise.all([
      typeText(nameEl, nameText),
      typeText(roleEl, roles[0])
    ]);

    let index = 1;
    while (true) {
      await new Promise(r => setTimeout(r, 1500));
      await deleteText(roleEl);
      await typeText(roleEl, roles[index]);
      index = (index + 1) % roles.length;
    }
  })();
});

// ===============================
//  HAMBURGER MENU
// ===============================
const hamburger = safeGetElement('hamburger');
const navbar = safeGetElement('navbar');
const overlay = safeGetElement('overlay');

function getNavLinks() {
  return safeGetElements('.navbar a');
}

const navLinks = getNavLinks();

if (hamburger && navbar && overlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

function closeMenu() {
  if (hamburger) hamburger.classList.remove('active');
  if (navbar) navbar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

// ===============================
//  NAVBAR ACTIVE ON SCROLL
// ===============================
const sections = safeGetElements("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

// ===============================
//  SMOOTH SCROLL
// ===============================
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===============================
//  LEARN MORE BUTTON - ABOUT SECTION
// ===============================
const learnMoreBtn = safeGetElement('learnMoreBtn');
const aboutDetail = safeGetElement('aboutDetail');
const learnMoreText = safeGetElement('learn-more-text');
const learnMoreIcon = safeGetElement('learn-more-icon');

let currentLang = "id";

if (learnMoreBtn && aboutDetail) {
  learnMoreBtn.addEventListener('click', () => {
    aboutDetail.classList.toggle('active');
    learnMoreBtn.classList.toggle('active');
    
    if (aboutDetail.classList.contains('active')) {
      learnMoreText.textContent = currentLang === 'id' ? 'Tutup' : 'Close';
      learnMoreIcon.className = 'fas fa-chevron-up';
    } else {
      learnMoreText.textContent = currentLang === 'id' ? 'Selengkapnya Tentang Saya' : 'Learn More About Me';
      learnMoreIcon.className = 'fas fa-chevron-down';
    }
  });
}

// ===============================
//  LANGUAGE SYSTEM - SAFE VERSION
// ===============================

// Fungsi untuk get text dengan aman
function safeGetText(id, defaultValue = "") {
  const el = safeGetElement(id);
  return el ? el.textContent : defaultValue;
}

function safeGetInnerHTML(id, defaultValue = "") {
  const el = safeGetElement(id);
  return el ? el.innerHTML : defaultValue;
}

function safeGetPlaceholder(id, defaultValue = "") {
  const el = safeGetElement(id);
  return el ? el.placeholder : defaultValue;
}

// SIMPAN TEKS INDONESIA dengan pengecekan aman
const originalText = {
  nav: Array.from(navLinks).map(a => {
    const span = a.querySelector("span");
    return span ? span.textContent : "";
  }),
  homeDesc: safeGetInnerHTML("home-desc"),
  aboutIntro: safeGetInnerHTML("about-intro"),
  learnMore: "Selengkapnya Tentang Saya",
  learnMoreClose: "Tutup",
  skillsTitle: "Skills",
  experienceTitle: "Experience",
  educationTitle: "Education",
  toolboxTitle: "Toolbox",
  exp1: {
    role: safeGetText("exp1-role"),
    year: safeGetText("exp1-year"),
    desc: safeGetText("exp1-desc")
  },
  exp2: {
    role: safeGetText("exp2-role"),
    year: safeGetText("exp2-year"),
    desc: safeGetText("exp2-desc")
  },
  edu1: {
    school: safeGetText("edu1-school"),
    year: safeGetText("edu1-year"),
    major: safeGetText("edu1-major"),
    desc: safeGetText("edu1-desc")
  },
  portfolioTitle: safeGetText("portfolio-title", "Project Unggulan"),
  portfolioDesc: safeGetText("portfolio-desc"),
  portfolioCards: Array.from(safeGetElements(".portfolio-box")).map(box => ({
    title: box.querySelector(".portfolio-card-title")?.textContent || "",
    desc: box.querySelector(".portfolio-card-desc")?.textContent || "",
    detail: box.querySelector(".detail-btn")?.textContent || "Lihat detail",
    btn: box.querySelector(".result-btn")?.textContent || ""
  })),
  contactTitle: safeGetText("contact-title", "Hubungi Saya"),
  contactDesc: safeGetText("contact-desc"),
  form: {
    name: safeGetPlaceholder("contact-name", "Nama Lengkap"),
    email: safeGetPlaceholder("contact-email", "Alamat Email"),
    message: safeGetPlaceholder("contact-message", "Pesan Anda"),
    button: safeGetText("contact-btn", "Kirim Pesan")
  },
  downloadCV: safeGetText("download-cv", "Download CV"),
  footer: {
    title: safeGetText("footer-title", "Lokasi & Status"),
    location: safeGetText("footer-location"),
    edu: safeGetText("footer-edu"),
    work: safeGetText("footer-work"),
    brandName: safeGetText("footer-brand-name", "Arya Teguh"),
    brandDesc: safeGetText("footer-brand-desc"),
    socialTitle: safeGetText("footer-social-title", "Hubungkan"),
    github: safeGetText("footer-github", "GitHub"),
    linkedin: safeGetText("footer-linkedin", "LinkedIn"),
    instagram: safeGetText("footer-instagram", "Instagram")
  }
};

// TEKS INGGRIS
const enText = {
  nav: ["Home", "About", "Portfolio", "Contact"],
  homeDesc: "I am a student at Telkom Purwokerto vocational school, majoring in Software Engineering, specializing in Graphic Design, UI/UX, and Frontend Development. I help create visually appealing and user-friendly websites that enhance a business professionalism and build customer trust.",
  aboutIntro: "Hi! I'm <strong>Arya Teguh Bagus Prayoga</strong>, a student at SMK Telkom Purwokerto majoring in Software Engineering. I'm passionate about developing modern websites and user-friendly UI/UX designs.",
  learnMore: "Learn More About Me",
  learnMoreClose: "Close",
  skillsTitle: "Skills",
  experienceTitle: "Experience",
  educationTitle: "Education",
  toolboxTitle: "Toolbox",
  exp1: {
    role: "Freelance Web Developer",
    year: "2024 - Present",
    desc: "Developing various websites for local clients using HTML, CSS, JavaScript, PHP, and MySQL."
  },
  exp2: {
    role: "UI/UX Designer",
    year: "2023 - 2024",
    desc: "Creating mobile and web application interface designs using Figma with a focus on user experience."
  },
  edu1: {
    school: "SMK Telkom Purwokerto",
    year: "2023 - Present",
    major: "Software Engineering (RPL)",
    desc: "Focus on web development, mobile apps, and database management."
  },
  portfolioTitle: "Featured Projects",
  portfolioDesc: "Here are some of the projects I have worked on during my learning period.",
  portfolioCards: [
    { 
      title: "E-commerce Website", 
      desc: "A simple and responsive online store website that uses PHP and MySQL, to make it easy for users to find the tools they need.", 
      detail: "View Details", 
      btn: "View Project" 
    },
    { 
      title: "Job Portal Website", 
      desc: "Job vacancy websites to make it easier for people to find the jobs they want and to reduce unemployment rates.", 
      detail: "View Details", 
      btn: "View Project" 
    },
    { 
      title: "Mobile UI/UX Design", 
      desc: "Figma based mobile application design with the theme of waste sorting, the aim is to build a culture of environmental care in the community that is able to turn waste into valuable assets.", 
      detail: "View Details", 
      btn: "View Design" 
    }
  ],
  contactTitle: "Contact Me",
  contactDesc: "Interested in collaborating or just saying hello? Send me a message below!",
  form: {
    name: "Full Name",
    email: "Email Address",
    message: "Your Message",
    button: "Send Message"
  },
  downloadCV: "Download Resume",
  footer: {
    title: "Location & Status",
    location: "📍 Purwokerto, Central Java, Indonesia",
    edu: "🎓 Software Engineering Student",
    work: "💼 Open for collaboration & learning",
    brandName: "Arya Teguh",
    brandDesc: "Frontend Developer & UI/UX Designer focused on building modern, interactive, and user-friendly web experiences.",
    socialTitle: "Connect",
    github: "GitHub",
    linkedin: "LinkedIn",
    instagram: "Instagram"
  }
};

// Fungsi helper untuk set text dengan aman
function safeSetText(id, text) {
  const el = safeGetElement(id);
  if (el) el.textContent = text;
}

function safeSetInnerHTML(id, html) {
  const el = safeGetElement(id);
  if (el) el.innerHTML = html;
}

function safeSetPlaceholder(id, text) {
  const el = safeGetElement(id);
  if (el) el.placeholder = text;
}

// APPLY ENGLISH
function setEnglish() {
  // Nav links
  getNavLinks().forEach((a, i) => {
    const span = a.querySelector("span");
    if (span && enText.nav[i]) span.textContent = enText.nav[i];
  });

  // Home
  safeSetInnerHTML("home-desc", enText.homeDesc);

  // About
  safeSetInnerHTML("about-intro", enText.aboutIntro);
  
  // Learn More Button
  const isExpanded = aboutDetail?.classList.contains('active');
  if (learnMoreText) {
    learnMoreText.textContent = isExpanded ? enText.learnMoreClose : enText.learnMore;
  }

  // About Detail Sections
  safeSetText("skills-title", `💻 ${enText.skillsTitle}`);
  safeSetText("experience-title", `💼 ${enText.experienceTitle}`);
  safeSetText("education-title", `🎓 ${enText.educationTitle}`);
  safeSetText("toolbox-title", `🛠️ ${enText.toolboxTitle}`);

  // Experience
  safeSetText("exp1-role", enText.exp1.role);
  safeSetText("exp1-year", enText.exp1.year);
  safeSetText("exp1-desc", enText.exp1.desc);
  safeSetText("exp2-role", enText.exp2.role);
  safeSetText("exp2-year", enText.exp2.year);
  safeSetText("exp2-desc", enText.exp2.desc);

  // Education
  safeSetText("edu1-school", enText.edu1.school);
  safeSetText("edu1-year", enText.edu1.year);
  safeSetText("edu1-major", enText.edu1.major);
  safeSetText("edu1-desc", enText.edu1.desc);

  // Portfolio
  safeSetText("portfolio-title", enText.portfolioTitle);
  safeSetText("portfolio-desc", enText.portfolioDesc);
  
  safeGetElements(".portfolio-box").forEach((box, i) => {
    if (enText.portfolioCards[i]) {
      const titleEl = box.querySelector(".portfolio-card-title");
      const descEl = box.querySelector(".portfolio-card-desc");
      const detailBtn = box.querySelector(".detail-btn");
      const resultBtn = box.querySelector(".result-btn");
      
      if (titleEl) titleEl.textContent = enText.portfolioCards[i].title;
      if (descEl) descEl.textContent = enText.portfolioCards[i].desc;
      if (detailBtn) detailBtn.textContent = enText.portfolioCards[i].detail;
      if (resultBtn) resultBtn.textContent = enText.portfolioCards[i].btn;
    }
  });

  // Contact
  safeSetText("contact-title", enText.contactTitle);
  safeSetText("contact-desc", enText.contactDesc);
  safeSetPlaceholder("contact-name", enText.form.name);
  safeSetPlaceholder("contact-email", enText.form.email);
  safeSetPlaceholder("contact-message", enText.form.message);
  safeSetText("contact-btn", enText.form.button);
  safeSetText("download-cv", enText.downloadCV);

  // Footer
  const f = enText.footer;
  safeSetText("footer-title", f.title);
  safeSetText("footer-location", f.location);
  safeSetText("footer-edu", f.edu);
  safeSetText("footer-work", f.work);
  safeSetText("footer-brand-name", f.brandName);
  safeSetText("footer-brand-desc", f.brandDesc);
  safeSetText("footer-social-title", f.socialTitle);
  safeSetText("footer-github", f.github);
  safeSetText("footer-linkedin", f.linkedin);
  safeSetText("footer-instagram", f.instagram);
}

// APPLY INDONESIA
function setIndonesia() {
  // Nav links
  getNavLinks().forEach((a, i) => {
    const span = a.querySelector("span");
    if (span && originalText.nav[i]) span.textContent = originalText.nav[i];
  });

  // Home
  safeSetInnerHTML("home-desc", originalText.homeDesc);

  // About
  safeSetInnerHTML("about-intro", originalText.aboutIntro);

  // Learn More Button
  const isExpanded = aboutDetail?.classList.contains('active');
  if (learnMoreText) {
    learnMoreText.textContent = isExpanded ? originalText.learnMoreClose : originalText.learnMore;
  }

  // About Detail Sections
  safeSetText("skills-title", `💻 ${originalText.skillsTitle}`);
  safeSetText("experience-title", `💼 ${originalText.experienceTitle}`);
  safeSetText("education-title", `🎓 ${originalText.educationTitle}`);
  safeSetText("toolbox-title", `🛠️ ${originalText.toolboxTitle}`);

  // Experience
  safeSetText("exp1-role", originalText.exp1.role);
  safeSetText("exp1-year", originalText.exp1.year);
  safeSetText("exp1-desc", originalText.exp1.desc);
  safeSetText("exp2-role", originalText.exp2.role);
  safeSetText("exp2-year", originalText.exp2.year);
  safeSetText("exp2-desc", originalText.exp2.desc);

  // Education
  safeSetText("edu1-school", originalText.edu1.school);
  safeSetText("edu1-year", originalText.edu1.year);
  safeSetText("edu1-major", originalText.edu1.major);
  safeSetText("edu1-desc", originalText.edu1.desc);

  // Portfolio
  safeSetText("portfolio-title", originalText.portfolioTitle);
  safeSetText("portfolio-desc", originalText.portfolioDesc);
  
  safeGetElements(".portfolio-box").forEach((box, i) => {
    if (originalText.portfolioCards[i]) {
      const titleEl = box.querySelector(".portfolio-card-title");
      const descEl = box.querySelector(".portfolio-card-desc");
      const detailBtn = box.querySelector(".detail-btn");
      const resultBtn = box.querySelector(".result-btn");
      
      if (titleEl) titleEl.textContent = originalText.portfolioCards[i].title;
      if (descEl) descEl.textContent = originalText.portfolioCards[i].desc;
      if (detailBtn) detailBtn.textContent = originalText.portfolioCards[i].detail;
      if (resultBtn) resultBtn.textContent = originalText.portfolioCards[i].btn;
    }
  });

  // Contact
  safeSetText("contact-title", originalText.contactTitle);
  safeSetText("contact-desc", originalText.contactDesc);
  safeSetPlaceholder("contact-name", originalText.form.name);
  safeSetPlaceholder("contact-email", originalText.form.email);
  safeSetPlaceholder("contact-message", originalText.form.message);
  safeSetText("contact-btn", originalText.form.button);
  safeSetText("download-cv", originalText.downloadCV);

  // Footer
  const f = originalText.footer;
  safeSetText("footer-title", f.title);
  safeSetText("footer-location", f.location);
  safeSetText("footer-edu", f.edu);
  safeSetText("footer-work", f.work);
  safeSetText("footer-brand-name", f.brandName);
  safeSetText("footer-brand-desc", f.brandDesc);
  safeSetText("footer-social-title", f.socialTitle);
  safeSetText("footer-github", f.github);
  safeSetText("footer-linkedin", f.linkedin);
  safeSetText("footer-instagram", f.instagram);
}

// BUTTON EVENT
safeGetElements(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    safeGetElements(".lang-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentLang = btn.dataset.lang;
    btn.dataset.lang === "en" ? setEnglish() : setIndonesia();
  });
});

// ===============================
//  SCROLL REVEAL (UP & DOWN)
// ===============================
const revealItems = safeGetElements(
  ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
);

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach(item => revealObserver.observe(item));
}

// ===============================
//  PORTFOLIO DETAIL BUTTON
// ===============================
safeGetElements(".detail-btn").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const desc = btn.parentElement.querySelector(".portfolio-desc");
    if (!desc) return;

    desc.classList.toggle("active");

    const isActive = desc.classList.contains("active");
    
    if (currentLang === "en") {
      btn.textContent = isActive 
        ? "Close Details" 
        : (enText.portfolioCards[i]?.detail || "View Details");
    } else {
      btn.textContent = isActive 
        ? "Tutup detail" 
        : (originalText.portfolioCards[i]?.detail || "Lihat detail");
    }
  });
});

// ===============================
//  CURSOR EFFECT
// ===============================
const aurora = document.querySelector(".cursor-aurora");

if (aurora) {
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateAurora() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    aurora.style.left = currentX + "px";
    aurora.style.top = currentY + "px";

    requestAnimationFrame(animateAurora);
  }

  animateAurora();
}

// ===============================
//  PORTFOLIO FILTER SYSTEM
// ===============================
const filterButtons = safeGetElements(".filter-btn");
const portfolioItems = safeGetElements(".portfolio-box");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === "all") {
        item.classList.remove("hide");
      } else {
        item.dataset.category === filter
          ? item.classList.remove("hide")
          : item.classList.add("hide");
      }
    });
  });
});
