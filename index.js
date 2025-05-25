const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');

    // remove any in-progress close-animation
    nav.classList.remove('close');

    if (!isOpen) {
        // OPENING
        document.body.classList.add('blurred');
        nav.classList.add('open');
    } else {
        // CLOSING
        nav.classList.remove('open');
        nav.classList.add('close');

        nav.addEventListener('animationend', function handler() {
            nav.classList.remove('close');
            document.body.classList.remove('blurred');
            nav.removeEventListener('animationend', handler);
        });
    }
});

// shrink header on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// FAQ dropdown functionality
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const isActive = this.classList.contains('active');
        // Close all open answers in the same list
        this.closest('.faq-list').querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            if (q.nextElementSibling) q.nextElementSibling.style.display = 'none';
        });
        // Toggle current
        if (!isActive) {
            this.classList.add('active');
            answer.style.display = 'block';
        }
    });
});

// Smooth scroll with slide animation and active nav highlighting
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section[id]');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();

            // Remove active from all links, add to clicked
            navLinks.forEach(a => a.classList.remove('active'));
            this.classList.add('active');

            // Slide animation (smooth scroll)
            const yOffset = 0; // adjust for your header height
            const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight nav on scroll
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const offsetTop = section.offsetTop - 90; // adjust for header height
        const offsetBottom = offsetTop + section.offsetHeight;
        const navLink = document.querySelector(`nav ul li a[href="#${section.id}"]`);
        if (navLink) {
            if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                navLinks.forEach(a => a.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
});

// Vanilla scroll reveal animation for .reveal and .footer
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .footer');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 60) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}

// Initial check and on scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Scroll to Discussion on button click
const oneButton = document.querySelector('.one button');
if (oneButton) {
    oneButton.addEventListener('click', function (e) {
        e.preventDefault();
        const discussion = document.getElementById('Discussion');
        if (discussion) {
            const yOffset = 0; // adjust for header height
            const y = discussion.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    });
}

// Typing animation for About section
const typedSpan = document.getElementById('typed-name');
if (typedSpan) {
    const texts = [
        "Luigi Miguel S. Nalzaro",
        "A Tech Enthusiast",
        "A Frontend Developer",
        "A UI/UX Designer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type() {
        if (typing) {
            if (charIndex < texts[textIndex].length) {
                typedSpan.textContent += texts[textIndex][charIndex];
                charIndex++;
                setTimeout(type, 90);
            } else {
                typing = false;
                setTimeout(type, 1200); // Pause before erasing
            }
        } else {
            if (charIndex > 0) {
                typedSpan.textContent = texts[textIndex].slice(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 40);
            } else {
                typing = true;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 400); // Pause before typing next
            }
        }
    }
    type();
}