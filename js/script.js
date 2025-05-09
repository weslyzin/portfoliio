// Elementos do DOM
const mobileMenuBtn = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');
const loading = document.querySelector('.loading');
const particlesContainer = document.querySelector('.particles-container');

// Criar partículas
function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 10 + 5;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    document.body.appendChild(particle);
    
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = x;
    let posY = y;
    
    const animate = () => {
      posX += vx;
      posY += vy;
      
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      
      if (posX > 0 && posX < window.innerWidth && posY > 0 && posY < window.innerHeight) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Criar partículas 3D
function create3DParticles() {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle-3d';
    
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const z = Math.random() * 100;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.transform = `translateZ(${z}px)`;
    
    particlesContainer.appendChild(particle);
  }
}

// Atualizar partículas 3D
function updateParticles(e) {
  const particles = document.querySelectorAll('.particle-3d');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  particles.forEach(particle => {
    const x = (mouseX - 0.5) * 50;
    const y = (mouseY - 0.5) * 50;
    
    particle.style.transform = `translate3d(${x}px, ${y}px, 0) rotate3d(${mouseX}, ${mouseY}, 1, 45deg)`;
  });
}

// Efeito 3D nos cards
function add3DEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
}

// Remover loading após carregar a página
window.addEventListener('load', () => {
  setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 1000);
});

// Toggle do menu mobile com partículas
mobileMenuBtn.addEventListener('click', (e) => {
  createParticles(e.clientX, e.clientY);
  mobileMenuBtn.classList.toggle('active');
  sidebar.classList.toggle('active');
});

// Fechar sidebar ao clicar em um link
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    sidebar.classList.remove('active');
  });
});

// Atualizar link ativo no sidebar
function updateActiveLink() {
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Revelar elementos no scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    }
  });
}

// Event listeners
window.addEventListener('scroll', () => {
  updateActiveLink();
  revealOnScroll();
});

window.addEventListener('mousemove', updateParticles);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Form validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // If validation passes, redirect to WhatsApp
    const message = `Olá! Me chamo ${nameInput.value}. ${messageInput.value}`;
    const whatsappUrl = `https://wa.me/5594984389536?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  create3DParticles();
  
  document.querySelectorAll('.service-card, .portfolio-card, .skill-item').forEach(add3DEffect);
  
  // Adicionar classe reveal aos elementos
  document.querySelectorAll('section, .service-card, .portfolio-card, .skill-item').forEach(el => {
    el.classList.add('reveal');
  });
  
  updateActiveLink();
  revealOnScroll();
});
