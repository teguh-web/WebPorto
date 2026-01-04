// ===============================
//  NAVBAR ENTRY ON FIRST LOAD
// ===============================
window.addEventListener("load", () => {
  document.querySelector("header").classList.add("show");
});


// ===============================
//  ANIMASI NAME + ROLE
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('name');
  const roleEl = document.getElementById('role');

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
//  ANIMASI ABOUT (P1 → P2 → P3)
// ===============================


// Ambil teks Indonesia dari HTML
const aboutText = {
  p1: document.getElementById("p1").innerHTML,
  p2: document.getElementById("p2").innerHTML,
  p3: document.getElementById("p3").innerHTML
};




// ===============================
//  HAMBURGER MENU
// ===============================
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.navbar a');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay?.addEventListener('click', closeMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));

function closeMenu() {
  hamburger?.classList.remove('active');
  navbar?.classList.remove('active');
  overlay?.classList.remove('active');
}


// ===============================
//  NAVBAR ACTIVE ON SCROLL
// ===============================
const sections = document.querySelectorAll("section");

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
    document.querySelector(link.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});


// ===============================
//  LANGUAGE SYSTEM
// ===============================

// SIMPAN TEKS INDONESIA
const originalText = {
  nav: [...navLinks].map(a => a.textContent),
  homeDesc: document.querySelector(".home-content p").innerHTML,
  about: { ...aboutText },
  portfolioTitle: document.querySelector("#portfolio h2").textContent,
  portfolioCards: [...document.querySelectorAll(".portfolio-box")].map(box => ({
    title: box.querySelector("h4").textContent,
    desc: box.querySelector("p").textContent,
    btn: box.querySelector("a").textContent
  })),
  contactTitle: document.querySelector("#contact h2").textContent,
  contactDesc: document.querySelector(".contact-container p").textContent,
  form: {
    name: document.querySelector('input[name="name"]').placeholder,
    email: document.querySelector('input[name="email"]').placeholder,
    message: document.querySelector('textarea[name="message"]').placeholder,
    button: document.querySelector(".contact-form button").textContent
  },
  downloadCV: document.querySelector(".btn-box a").textContent
};

// TEKS INGGRIS
const enText = {
  nav: ["Home", "About", "Portfolio", "Contact"],
  homeDesc: "I am a student at Telkom Purwokerto vocational school, majoring in Software Engineering, specializing in Graphic Design, UI/UX, and Frontend Development. Im skilled at creating websites using JS, PHP, and MYSQL",
  about: {
    p1: "Hi! My name is <strong> Arya Teguh Bagus Prayoga</strong>. I'm a <strong>student at Telkom Vocational High School in Purwokerto</strong>, majoring in Software Engineering. I have a year of experience, specializing in website development using <em>basic programming</em> and <em>UI/UX design</em> experience.",
    p2: "With experience in <em>Frontend Development</em> and <em>UI/UX Design</em>, I like creating modern, interactive, and responsive designs that deliver the best user experience.",
    p3: "I also have a great interest in <em>web animation and minimalist design</em>, to deliver elegant and professional results."
  },
  portfolioTitle: "Featured Projects",
  portfolioCards: [
    { title: "E-commerce Website", desc: "A simple and responsive online store website that uses PHP and MySQL, to make it easy for users to find the tools they need.", btn: "View Project" },
    { title: "Job Portal Website", desc: "Job vacancy websites to make it easier for people to find the jobs they want and to reduce unemployment rates.", btn: "View Project" },
    { title: "Mobile UI/UX Design", desc: "Figma based mobile application design with the theme of waste sorting, the aim is to build a culture of environmental care in the community that is able to turn waste into valuable assets.", btn: "View Design" }
  ],
  contactTitle: "Contact Me",
  contactDesc: "SInterested in collaborating or just saying hello? Send me a message below!",
  form: {
    name: "Full Name",
    email: "Email Address",
    message: "Your Message",
    button: "Send Message"
  },
  downloadCV: "Download Resume"
};


// APPLY ENGLISH
function setEnglish() {
  navLinks.forEach((a, i) => a.textContent = enText.nav[i]);
  document.querySelector(".home-content p").innerHTML = enText.homeDesc;

  aboutText.p1 = enText.about.p1;
  aboutText.p2 = enText.about.p2;
  aboutText.p3 = enText.about.p3;
  runAboutTyping();

  document.querySelector("#portfolio h2").textContent = enText.portfolioTitle;
  document.querySelectorAll(".portfolio-box").forEach((box, i) => {
    box.querySelector("h4").textContent = enText.portfolioCards[i].title;
    box.querySelector("p").textContent = enText.portfolioCards[i].desc;
    box.querySelector("a").textContent = enText.portfolioCards[i].btn;
  });

  document.querySelector("#contact h2").textContent = enText.contactTitle;
  document.querySelector(".contact-container p").textContent = enText.contactDesc;
  document.querySelector('input[name="name"]').placeholder = enText.form.name;
  document.querySelector('input[name="email"]').placeholder = enText.form.email;
  document.querySelector('textarea[name="message"]').placeholder = enText.form.message;
  document.querySelector(".contact-form button").textContent = enText.form.button;
  document.querySelector(".btn-box a").textContent = enText.downloadCV;
}


// APPLY INDONESIA
function setIndonesia() {
  navLinks.forEach((a, i) => a.textContent = originalText.nav[i]);
  document.querySelector(".home-content p").innerHTML = originalText.homeDesc;

  aboutText.p1 = originalText.about.p1;
  aboutText.p2 = originalText.about.p2;
  aboutText.p3 = originalText.about.p3;
  runAboutTyping();

  document.querySelector("#portfolio h2").textContent = originalText.portfolioTitle;
  document.querySelectorAll(".portfolio-box").forEach((box, i) => {
    box.querySelector("h4").textContent = originalText.portfolioCards[i].title;
    box.querySelector("p").textContent = originalText.portfolioCards[i].desc;
    box.querySelector("a").textContent = originalText.portfolioCards[i].btn;
  });

  document.querySelector("#contact h2").textContent = originalText.contactTitle;
  document.querySelector(".contact-container p").textContent = originalText.contactDesc;
  document.querySelector('input[name="name"]').placeholder = originalText.form.name;
  document.querySelector('input[name="email"]').placeholder = originalText.form.email;
  document.querySelector('textarea[name="message"]').placeholder = originalText.form.message;
  document.querySelector(".contact-form button").textContent = originalText.form.button;
  document.querySelector(".btn-box a").textContent = originalText.downloadCV;
}


// BUTTON EVENT
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    btn.dataset.lang === "en" ? setEnglish() : setIndonesia();
  });
});

// ===============================
//  ANIMASI ABOUT (ANTI TABRAKAN)
// ===============================
let aboutAnimationId = 0;

function typeParagraph(id, text, animId, callback) {
  let i = 0;
  const speed = 15;
  const el = document.getElementById(id);

  function step() {
    if (animId !== aboutAnimationId) return;

    if (i < text.length) {
      el.innerHTML = text.substring(0, i + 1);
      i++;
      setTimeout(step, speed);
    } else if (callback) {
      callback();
    }
  }

  step();
}

function runAboutTyping() {
  aboutAnimationId++;
  const currentId = aboutAnimationId;

  p1.innerHTML = "";
  p2.innerHTML = "";
  p3.innerHTML = "";

  typeParagraph("p1", aboutText.p1, currentId, () => {
    typeParagraph("p2", aboutText.p2, currentId, () => {
      typeParagraph("p3", aboutText.p3, currentId);
    });
  });
}
// JALANKAN SAAT LOAD
runAboutTyping();

// ===============================
//  SCROLL REVEAL (UP & DOWN)
// ===============================
const revealItems = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
);

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
