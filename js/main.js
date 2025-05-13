document.addEventListener('DOMContentLoaded', () => {
    // Navigation mobile
    const navIcon = document.querySelector('.nav-icon');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    navIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Ferme le menu mobile si ouvert
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Animation du scroll pour la navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll vers le bas
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll vers le haut
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Animation du texte glitch
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.animation = 'none';
            void glitchText.offsetWidth;
            glitchText.style.animation = null;
        }, 2500);
    }

    // Effet parallaxe sur le scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Gestion du filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techTags = document.querySelectorAll('.tech-tag');
    const projectCards = document.querySelectorAll('.project-card');
    let activeFilters = new Set(['all']);
    let activeTechs = new Set();

    // Fonction pour mettre à jour l'affichage des projets
    function updateProjects() {
        projectCards.forEach(card => {
            const languages = card.dataset.languages.split(',');
            const shouldShow = 
                activeFilters.has('all') || 
                languages.some(lang => activeFilters.has(lang));
            
            // Vérifier aussi les technologies si des filtres tech sont actifs
            const techMatch = activeTechs.size === 0 || 
                Array.from(card.querySelectorAll('.tag')).some(tag => 
                    activeTechs.has(tag.dataset.tech)
                );

            if (shouldShow && techMatch) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight; // Force reflow
                card.style.animation = null;
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Gestionnaire pour les boutons de filtre
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Gérer la classe active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Mettre à jour les filtres actifs
            activeFilters.clear();
            activeFilters.add(filter);

            updateProjects();
        });
    });

    // Gestionnaire pour les tags de technologies
    techTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tech = tag.dataset.tech;
            
            // Toggle la classe active
            tag.classList.toggle('active');

            // Mettre à jour les technologies actives
            if (tag.classList.contains('active')) {
                activeTechs.add(tech);
            } else {
                activeTechs.delete(tech);
            }

            updateProjects();
        });
    });

    // Animation au survol des cartes
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '0';
        });
    });

    // Gestion du changement de langue
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'fr';

    // Fonction pour changer la langue
    function changeLanguage(lang) {
        // Mettre à jour les boutons de langue
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Sauvegarder la langue choisie
        localStorage.setItem('language', lang);

        // Mettre à jour tous les textes
        Object.keys(translations[lang]).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else if (element.querySelector('span')) {
                    // Si l'élément contient un span, mettre à jour uniquement le span
                    element.querySelector('span').textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            });
        });
    }

    // Initialiser la langue
    changeLanguage(currentLang);

    // Écouteurs d'événements pour les boutons de langue
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            changeLanguage(lang);
        });
    });

    // Gestion du bouton retour en haut
    const backToTopButton = document.getElementById('back-to-top');
    let lastScrollPosition = 0;

    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        
        // Afficher le bouton quand on scrolle vers le bas et qu'on dépasse 300px
        if (currentScrollPosition > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        lastScrollPosition = currentScrollPosition;
    }

    // Écouter le scroll
    window.addEventListener('scroll', handleScroll);

    // Gérer le clic sur le bouton retour en haut
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Ajouter les attributs data-translate aux éléments
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text').toLowerCase();
        element.setAttribute('data-translate', `nav-${key}`);
    });

    // Mettre à jour les textes initiaux
    changeLanguage(currentLang);
    
    // Gestion du changement de thème
    const themeButtons = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'jedi';
    
    // Fonction pour changer le thème
    function changeTheme(theme) {
        // Mettre à jour les boutons de thème
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            }
        });
        
        // Appliquer le thème
        if (theme === 'sith') {
            document.body.classList.add('sith-theme');
        } else {
            document.body.classList.remove('sith-theme');
        }
        
        // Sauvegarder le thème choisi
        localStorage.setItem('theme', theme);
    }
    
    // Initialiser le thème
    changeTheme(currentTheme);
    
    // Écouteurs d'événements pour les boutons de thème
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            changeTheme(theme);
        });
    });

    // Gestion du formulaire de contact avec AJAX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formStatus = document.querySelector('.form-status');
            formStatus.textContent = 'Envoi en cours...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            
            const formData = new FormData(this);
            
            fetch('process_form.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    formStatus.textContent = data.message;
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.classList.add('error');
                    let errorMessage = '';
                    
                    if (Array.isArray(data.errors)) {
                        errorMessage = data.errors.join('<br>');
                    } else {
                        errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
                    }
                    
                    formStatus.innerHTML = errorMessage;
                }
            })
            .catch(error => {
                formStatus.textContent = 'Une erreur est survenue lors de l\'envoi du formulaire: ' + error.message;
                formStatus.classList.add('error');
                console.error('Erreur:', error);
            });
        });
    }

    // Solution pour le problème d'affichage sur Samsung S21
    function fixThemeSwitcherPosition() {
        // Détecter si nous sommes sur mobile et en orientation portrait
        const isMobile = window.innerWidth <= 412;
        const isPortrait = window.innerHeight > window.innerWidth;
        
        const languageSwitcher = document.querySelector('.language-switcher');
        const themeSwitcher = document.querySelector('.theme-switcher');
        
        if (isMobile && isPortrait) {
            // Créer un conteneur pour les deux switchers s'il n'existe pas déjà
            let container = document.querySelector('.switchers-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'switchers-container';
                container.style.position = 'fixed';
                container.style.top = '10px';
                container.style.left = '10px';
                container.style.zIndex = '2000';
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.gap = '10px';
                
                // Retirer les éléments de leur position actuelle
                languageSwitcher.parentNode.removeChild(languageSwitcher);
                themeSwitcher.parentNode.removeChild(themeSwitcher);
                
                // Ajouter au nouveau conteneur
                container.appendChild(languageSwitcher);
                container.appendChild(themeSwitcher);
                
                // Injecter au début du body
                document.body.insertBefore(container, document.body.firstChild);
                
                // Réinitialiser les styles qui pourraient interférer
                languageSwitcher.style.position = 'relative';
                languageSwitcher.style.top = 'auto';
                languageSwitcher.style.left = 'auto';
                languageSwitcher.style.right = 'auto';
                
                themeSwitcher.style.position = 'relative';
                themeSwitcher.style.top = 'auto';
                themeSwitcher.style.left = 'auto';
                themeSwitcher.style.right = 'auto';
            }
        }
    }

    // Exécuter la fonction au chargement
    fixThemeSwitcherPosition();

    // Exécuter à nouveau si la fenêtre est redimensionnée
    window.addEventListener('resize', fixThemeSwitcherPosition);
}); 