/* ==========================================================================
   BRINDHA B - PORTFOLIO INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. Dynamic Cursor Glow Follower
    // ----------------------------------------------------------------------
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // ----------------------------------------------------------------------
    // 2. Reading Scroll Progress Bar & Navbar Scroll Style
    // ----------------------------------------------------------------------
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Nav Link Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 4. Hero Typewriter Text Effect
    // ----------------------------------------------------------------------
    const typedTextElement = document.getElementById('typedText');
    if (typedTextElement) {
        const roles = [
            "Python Developer",
            "AI/ML & Data Science Specialist",
            "Frontend Web Developer (HTML, CSS, JS)"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // ----------------------------------------------------------------------
    // 5. Skills Category Filter Tabs
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. Interactive Toast & Copy-to-Clipboard
    // ----------------------------------------------------------------------
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    document.querySelectorAll('.copyable').forEach(elem => {
        elem.addEventListener('click', () => {
            const textToCopy = elem.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied: "${textToCopy}"`);
                }).catch(() => {
                    showToast('Copied to clipboard!');
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 7. Modals (Resume Modal & Project Quick View)
    // ----------------------------------------------------------------------
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
        });
    }

    if (closeResumeBtn && resumeModal) {
        closeResumeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
        });
    }

    // Project Quick View Modal
    const projectModal = document.getElementById('projectModal');
    const closeProjectBtn = document.getElementById('closeProjectBtn');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalImg = document.getElementById('modalProjectImg');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalTech = document.getElementById('modalProjectTech');

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const img = btn.getAttribute('data-img');
            const desc = btn.getAttribute('data-desc');
            const tech = btn.getAttribute('data-tech');

            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalTech) modalTech.textContent = tech;

            if (img && img.trim() !== '') {
                modalImg.src = img;
                modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
            }

            if (projectModal) projectModal.classList.add('active');
        });
    });

    if (closeProjectBtn && projectModal) {
        closeProjectBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (resumeModal && e.target === resumeModal) {
            resumeModal.classList.remove('active');
        }
        if (projectModal && e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });

    // ----------------------------------------------------------------------
    // 8. Contact Form Client-Side Handling
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            showToast(`Thank you ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 9. 3D Tilt Card Effect
    // ----------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (window.innerWidth > 992) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
});
