/* ============================================
   OLIVE YOUR LIFE — Main JavaScript
   ============================================ */

// ---- Navbar: scroll effect ----
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ---- Navbar: mobile toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Smooth active nav highlighting ----
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < top + height) {
      link.style.color = '';
      link.style.fontWeight = '700';
    } else {
      link.style.fontWeight = '';
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

// ---- Scroll-reveal animation ----
const revealElements = document.querySelectorAll(
  '.class-card, .testimonial-card, .gallery-item, .about-grid, .contact-grid'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.revealed, .class-card, .testimonial-card, .gallery-item, .about-grid, .contact-grid').forEach(el => {
    if (el.classList.contains('revealed')) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});

// Listen via MutationObserver to apply style when class is added
const styleObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(() => {});
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const el = mutation.target;
      if (el.classList.contains('revealed')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    }
  });
});

revealElements.forEach(el => {
  styleObserver.observe(el, { attributes: true });
});

// ---- Contact Form ----
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = contactForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    // Basic email validation
    const emailField = contactForm.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = 'Send Booking Request';
      submitBtn.disabled = false;
      formSuccess.style.display = 'block';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1200);
  });

  // Remove error state on input
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}
