// ===============================
//  UTILITY FUNCTIONS
// ===============================

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
    const href = link.getAttribute("href");

    // Kalau link mengarah ke halaman lain (misal index.html#about), biarkan browser navigasi biasa
    if (href.includes("index.html")) {
      return; // tidak perlu preventDefault, biarkan berpindah halaman
    }

    // Kalau link adalah anchor di halaman yang sama (#home, #about, dll)
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
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
//  LANGUAGE SYSTEM
// ===============================

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

// SIMPAN TEKS INDONESIA
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
  },

  // ── TAMBAHAN: Teks halaman about.html ──
  about: {
    backText: "Kembali",
    skill1Desc: "Membuat website responsif dan interaktif agar bisnis terlihat lebih profesional dan terpercaya.",
    skill2Desc: "Merancang antarmuka yang ramah pengguna dan modern dengan Figma",
    skill3Desc: "Optimasi tampilan untuk berbagai ukuran layar dan device",
    skill4Desc: "Mengelola data dengan MySQL dan PHP untuk aplikasi web",
    skill5Desc: "Membuat desain grafis menarik dengan Canva dan tools lainnya",
    skill6Desc: "Implementasi animasi dan transisi untuk pengalaman user yang lebih baik",
    exp1Title: "Pelatihan Bootcamp",
    exp1Desc: "Mengikuti pelatihan intensif untuk meningkatkan kemampuan dalam pengembangan web modern dan praktik terbaik dalam coding.",
    cert1Btn: "Lihat Sertifikat",
    exp2Title: "Web Development",
    exp2Desc: "Berpartisipasi dalam kompetisi web development, mengembangkan website dengan fitur lengkap dan desain yang menarik dalam waktu terbatas.",
    cert2Btn: "Lihat Sertifikat",
    exp3Title: "Desain UI/UX",
    exp3Desc: "Mengikuti kompetisi desain UI/UX untuk aplikasi mobile, fokus pada user experience dan visual design yang modern dan intuitif.",
    cert3Btn: "Lihat Sertifikat",
    edu1Year: "2012 - 2018",
    edu1Name: "SDN Sukamaju Baru 2",
    edu1Desc: "Menempuh pendidikan dasar dengan mempelajari fondasi akademik seperti matematika, bahasa Indonesia, IPA, IPS, dan berbagai mata pelajaran dasar lainnya yang menjadi bekal untuk jenjang selanjutnya.",
    edu2Year: "2018 - 2021",
    edu2Name: "SMPN 24 Depok",
    edu2Desc: "Melanjutkan pendidikan menengah dengan memperdalam ilmu pengetahuan umum, sains, dan mulai mengembangkan minat di bidang teknologi dan komputer.",
    edu3Year: "2023 - Sekarang",
    edu3Name: "SMK Telkom Purwokerto",
    edu3Major: "Rekayasa Perangkat Lunak (RPL)",
    edu3Desc: "Fokus pada pengembangan software, web development, mobile app development, database management, UI/UX design, dan berbagai teknologi terkini dalam dunia pemrograman.",
    toolboxDesc: "Tools dan teknologi yang saya gunakan dalam pengembangan dan desain"
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
    { title: "E-commerce Website", desc: "A simple and responsive online store website that uses PHP and MySQL, to make it easy for users to find the tools they need.", detail: "View Details", btn: "View Project" },
    { title: "Job Portal Website", desc: "Job vacancy websites to make it easier for people to find the jobs they want and to reduce unemployment rates.", detail: "View Details", btn: "View Project" },
    { title: "Mobile UI/UX Design", desc: "Figma based mobile application design with the theme of waste sorting, the aim is to build a culture of environmental care in the community that is able to turn waste into valuable assets.", detail: "View Details", btn: "View Design" }
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
  },

  // ── TAMBAHAN: Teks halaman about.html (Inggris) ──
  about: {
    backText: "Back",
    skill1Desc: "Building responsive and interactive websites to make your business look more professional and trustworthy.",
    skill2Desc: "Designing user-friendly and modern interfaces with Figma",
    skill3Desc: "Optimizing layouts for various screen sizes and devices",
    skill4Desc: "Managing data with MySQL and PHP for web applications",
    skill5Desc: "Creating attractive graphic designs with Canva and other tools",
    skill6Desc: "Implementing animations and transitions for a better user experience",
    exp1Title: "Bootcamp Training",
    exp1Desc: "Attended an intensive training program to improve skills in modern web development and coding best practices.",
    cert1Btn: "View Certificate",
    exp2Title: "Web Development",
    exp2Desc: "Participated in a web development competition, building a fully-featured website with an attractive design within a limited time.",
    cert2Btn: "View Certificate",
    exp3Title: "UI/UX Design",
    exp3Desc: "Participated in a UI/UX design competition for a mobile application, focusing on user experience and modern, intuitive visual design.",
    cert3Btn: "View Certificate",
    edu1Year: "2012 - 2018",
    edu1Name: "SDN Sukamaju Baru 2",
    edu1Desc: "Completed primary education, building academic foundations in mathematics, Indonesian language, science, social studies, and other core subjects that prepared me for the next level.",
    edu2Year: "2018 - 2021",
    edu2Name: "SMPN 24 Depok",
    edu2Desc: "Continued secondary education, deepening knowledge in general science, and began developing an interest in technology and computers.",
    edu3Year: "2023 - Present",
    edu3Name: "SMK Telkom Purwokerto",
    edu3Major: "Software Engineering",
    edu3Desc: "Focused on software development, web development, mobile app development, database management, UI/UX design, and the latest technologies in the world of programming.",
    toolboxDesc: "Tools and technologies I use in development and design"
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

// ── Helper: apply teks about.html ──
function applyAboutLang(t) {
  // Tombol kembali
  safeSetText("back-text", t.backText);

  // Skills
  safeSetText("skill1-desc", t.skill1Desc);
  safeSetText("skill2-desc", t.skill2Desc);
  safeSetText("skill3-desc", t.skill3Desc);
  safeSetText("skill4-desc", t.skill4Desc);
  safeSetText("skill5-desc", t.skill5Desc);
  safeSetText("skill6-desc", t.skill6Desc);

  // Experience
  safeSetText("exp1-title", t.exp1Title);
  safeSetText("exp1-desc", t.exp1Desc);
  safeSetText("cert1-btn", t.cert1Btn);
  safeSetText("exp2-title", t.exp2Title);
  safeSetText("exp2-desc", t.exp2Desc);
  safeSetText("cert2-btn", t.cert2Btn);
  safeSetText("exp3-title", t.exp3Title);
  safeSetText("exp3-desc", t.exp3Desc);
  safeSetText("cert3-btn", t.cert3Btn);

  // Education
  safeSetText("edu1-year", t.edu1Year);
  safeSetText("edu1-name", t.edu1Name);
  safeSetText("edu1-desc", t.edu1Desc);
  safeSetText("edu2-year", t.edu2Year);
  safeSetText("edu2-name", t.edu2Name);
  safeSetText("edu2-desc", t.edu2Desc);
  safeSetText("edu3-year", t.edu3Year);
  safeSetText("edu3-name", t.edu3Name);
  safeSetText("edu3-major", t.edu3Major);
  safeSetText("edu3-desc", t.edu3Desc);

  // Toolbox
  safeSetText("toolbox-desc", t.toolboxDesc);
}

// APPLY ENGLISH
function setEnglish() {
  // Nav links
  getNavLinks().forEach((a, i) => {
    const span = a.querySelector("span");
    if (span && enText.nav[i]) span.textContent = enText.nav[i];
  });

  safeSetInnerHTML("home-desc", enText.homeDesc);
  safeSetInnerHTML("about-intro", enText.aboutIntro);

  const isExpanded = aboutDetail?.classList.contains('active');
  if (learnMoreText) {
    learnMoreText.textContent = isExpanded ? enText.learnMoreClose : enText.learnMore;
  }

  safeSetText("skills-title", enText.skillsTitle);
  safeSetText("experience-title", enText.experienceTitle);
  safeSetText("education-title", enText.educationTitle);
  safeSetText("toolbox-title", enText.toolboxTitle);

  safeSetText("exp1-role", enText.exp1.role);
  safeSetText("exp1-year", enText.exp1.year);
  safeSetText("exp1-desc", enText.exp1.desc);
  safeSetText("exp2-role", enText.exp2.role);
  safeSetText("exp2-year", enText.exp2.year);
  safeSetText("exp2-desc", enText.exp2.desc);

  safeSetText("edu1-school", enText.edu1.school);
  safeSetText("edu1-year", enText.edu1.year);
  safeSetText("edu1-major", enText.edu1.major);
  safeSetText("edu1-desc", enText.edu1.desc);

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

  safeSetText("contact-title", enText.contactTitle);
  safeSetText("contact-desc", enText.contactDesc);
  safeSetPlaceholder("contact-name", enText.form.name);
  safeSetPlaceholder("contact-email", enText.form.email);
  safeSetPlaceholder("contact-message", enText.form.message);
  safeSetText("contact-btn", enText.form.button);
  safeSetText("download-cv", enText.downloadCV);

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

  // ── TAMBAHAN: terapkan ke about.html ──
  applyAboutLang(enText.about);
}

// APPLY INDONESIA
function setIndonesia() {
  getNavLinks().forEach((a, i) => {
    const span = a.querySelector("span");
    if (span && originalText.nav[i]) span.textContent = originalText.nav[i];
  });

  safeSetInnerHTML("home-desc", originalText.homeDesc);
  safeSetInnerHTML("about-intro", originalText.aboutIntro);

  const isExpanded = aboutDetail?.classList.contains('active');
  if (learnMoreText) {
    learnMoreText.textContent = isExpanded ? originalText.learnMoreClose : originalText.learnMore;
  }

  safeSetText("skills-title", enText.skillsTitle);
  safeSetText("experience-title", enText.experienceTitle);
  safeSetText("education-title", enText.educationTitle);
  safeSetText("toolbox-title", enText.toolboxTitle);

  safeSetText("exp1-role", originalText.exp1.role);
  safeSetText("exp1-year", originalText.exp1.year);
  safeSetText("exp1-desc", originalText.exp1.desc);
  safeSetText("exp2-role", originalText.exp2.role);
  safeSetText("exp2-year", originalText.exp2.year);
  safeSetText("exp2-desc", originalText.exp2.desc);

  safeSetText("edu1-school", originalText.edu1.school);
  safeSetText("edu1-year", originalText.edu1.year);
  safeSetText("edu1-major", originalText.edu1.major);
  safeSetText("edu1-desc", originalText.edu1.desc);

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

  safeSetText("contact-title", originalText.contactTitle);
  safeSetText("contact-desc", originalText.contactDesc);
  safeSetPlaceholder("contact-name", originalText.form.name);
  safeSetPlaceholder("contact-email", originalText.form.email);
  safeSetPlaceholder("contact-message", originalText.form.message);
  safeSetText("contact-btn", originalText.form.button);
  safeSetText("download-cv", originalText.downloadCV);

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

  // ── TAMBAHAN: terapkan ke about.html ──
  applyAboutLang(originalText.about);
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

// ── SINKRONISASI BAHASA ANTAR HALAMAN ──
// Saat about.html dibuka, cek apakah user sudah pilih EN sebelumnya
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang === "en") {
    currentLang = "en";
    // Tandai tombol EN sebagai aktif
    safeGetElements(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === "en");
    });
    setEnglish();
  }
});

// Simpan pilihan bahasa ke localStorage saat berganti
safeGetElements(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.setItem("preferredLang", btn.dataset.lang);
  });
});

// ===============================
//  SCROLL REVEAL
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
    { threshold: 0.15 }
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
