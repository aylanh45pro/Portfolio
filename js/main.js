document.addEventListener('DOMContentLoaded', () => {
    // Navigation mobile
    const navIcon = document.querySelector('.nav-icon');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    navIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Création de l'effet de particules d'étoiles
    function createStarryBackground() {
        // Créer le conteneur d'étoiles s'il n'existe pas déjà
        let starsContainer = document.querySelector('.stars-container');
        if (!starsContainer) {
            starsContainer = document.createElement('div');
            starsContainer.className = 'stars-container';
            document.body.appendChild(starsContainer);
        }

        // Nombre d'étoiles à créer
        const starCount = window.innerWidth < 768 ? 50 : 100;

        // Vider le conteneur avant de créer de nouvelles étoiles
        starsContainer.innerHTML = '';

        // Créer les étoiles
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Taille aléatoire entre 1 et 3px
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Position aléatoire
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Opacité aléatoire entre 0.2 et 1
            star.style.opacity = Math.random() * 0.8 + 0.2;
            
            // Durée d'animation aléatoire entre 2 et 8 secondes
            star.style.animationDuration = `${Math.random() * 6 + 2}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // Créer l'effet d'étoiles
    createStarryBackground();

    // Recréer les étoiles lors du redimensionnement de la fenêtre
    window.addEventListener('resize', createStarryBackground);

    // Animation des sections au scroll
    function handleSectionAnimation() {
        const sections = document.querySelectorAll('.section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialiser l'animation des sections
    handleSectionAnimation();

    // Console Star Wars interactive
    function initializeConsole() {
        const consoleInput = document.querySelector('.sw-console-input');
        const consoleOutput = document.querySelector('.sw-console-output');
        
        if (!consoleInput || !consoleOutput) return;
        
        // Ajouter un message de bienvenue
        const theme = document.body.classList.contains('sith-theme') ? 'sith' : 'jedi';
        const currentLang = localStorage.getItem('language') || 'fr';
        
        // Mettre à jour le placeholder avec la traduction
        consoleInput.placeholder = translations[currentLang]['console-input-placeholder'];
        
        // Mettre à jour le titre du terminal en fonction du thème et de la langue
        const terminalTitle = document.querySelector('.sw-console-title');
        if (terminalTitle) {
            if (currentLang === 'fr') {
                terminalTitle.textContent = theme === 'sith' ? 'Terminal Impérial' : 'Terminal Rebelle';
            } else {
                terminalTitle.textContent = theme === 'sith' ? 'Imperial Terminal' : 'Rebel Terminal';
            }
        }
        
        // Mettre à jour les classes visuelles du terminal
        const terminal = document.querySelector('.sw-console');
        if (terminal) {
            terminal.classList.remove('jedi-terminal', 'sith-terminal');
            terminal.classList.add(theme === 'sith' ? 'sith-terminal' : 'jedi-terminal');
        }
        
        const welcomeMessages = {
            fr: {
                jedi: "Bienvenue dans le terminal de l'Alliance Rebelle.",
                sith: "Bienvenue dans le terminal de l'Empire Galactique."
            },
            en: {
                jedi: "Welcome to the Rebel Alliance terminal.",
                sith: "Welcome to the Galactic Empire terminal."
            }
        };
        
        const helpMessages = {
            fr: "Tapez 'help' pour voir les commandes disponibles.",
            en: "Type 'help' to see available commands."
        };
        
        addConsoleMessage(welcomeMessages[currentLang][theme], 'info');
        addConsoleMessage(helpMessages[currentLang], 'info');
        
        // Liste des commandes disponibles avec traductions
        const commandDescriptions = {
            fr: {
                help: "Affiche la liste des commandes disponibles",
                clear: "Efface le contenu de la console",
                about: "Affiche des informations sur moi",
                skills: "Affiche mes compétences principales",
                projects: "Liste mes projets",
                theme: "Change le thème (jedi/sith)",
                force: "Utilisez la Force...",
                version: "Affiche la version du site"
            },
            en: {
                help: "Display the list of available commands",
                clear: "Clear the console content",
                about: "Display information about me",
                skills: "Display my main skills",
                projects: "List my projects",
                theme: "Change theme (jedi/sith)",
                force: "Use the Force...",
                version: "Display site version"
            }
        };
        
        const consoleMessages = {
            fr: {
                commandsList: "Commandes disponibles:",
                consoleCleared: "Console effacée.",
                mainSkills: "Compétences principales:",
                myProjects: "Mes projets:",
                themeChanged: "Thème changé pour:",
                themeNotRecognized: "Thème non reconnu. Utilisez 'jedi' ou 'sith'.",
                specifyTheme: "Veuillez spécifier un thème: 'jedi' ou 'sith'",
                darkSideMessage: "Que la colère vous guide...",
                lightSideMessage: "Que la Force soit avec vous...",
                commandNotFound: "Commande non reconnue:",
                typeHelp: "Tapez 'help' pour voir les commandes disponibles.",
                lastUpdate: "Dernière mise à jour: 2023"
            },
            en: {
                commandsList: "Available commands:",
                consoleCleared: "Console cleared.",
                mainSkills: "Main skills:",
                myProjects: "My projects:",
                themeChanged: "Theme changed to:",
                themeNotRecognized: "Theme not recognized. Use 'jedi' or 'sith'.",
                specifyTheme: "Please specify a theme: 'jedi' or 'sith'",
                darkSideMessage: "Let anger guide you...",
                lightSideMessage: "May the Force be with you...",
                commandNotFound: "Command not recognized:",
                typeHelp: "Type 'help' to see available commands.",
                lastUpdate: "Last update: 2023"
            }
        };
        
        // Liste des commandes disponibles
        const commands = {
            help: {
                description: commandDescriptions[currentLang].help,
                action: () => {
                    addConsoleMessage(consoleMessages[currentLang].commandsList, 'info');
                    Object.keys(commands).forEach(cmd => {
                        addConsoleMessage(`${cmd}: ${commands[cmd].description}`, 'success');
                    });
                }
            },
            clear: {
                description: commandDescriptions[currentLang].clear,
                action: () => {
                    consoleOutput.innerHTML = '';
                    addConsoleMessage(consoleMessages[currentLang].consoleCleared, 'success');
                }
            },
            about: {
                description: commandDescriptions[currentLang].about,
                action: () => {
                    addConsoleMessage("Aylan Haddouchi", 'info');
                    addConsoleMessage(translations[currentLang]['about-highlight'], 'info');
                    addConsoleMessage(`${translations[currentLang]['about-formation']}: ${translations[currentLang]['about-formation-level']}`, 'info');
                }
            },
            skills: {
                description: commandDescriptions[currentLang].skills,
                action: () => {
                    addConsoleMessage(consoleMessages[currentLang].mainSkills, 'info');
                    const skills = [
                        "HTML/CSS",
                        "JavaScript",
                        "Python",
                        "Java",
                        "SQL"
                    ];
                    skills.forEach(skill => {
                        addConsoleMessage(`- ${skill}`, 'success');
                    });
                }
            },
            projects: {
                description: commandDescriptions[currentLang].projects,
                action: () => {
                    addConsoleMessage(consoleMessages[currentLang].myProjects, 'info');
                    const projects = [
                        currentLang === 'fr' ? "Application web avec Flask" : "Web application with Flask",
                        currentLang === 'fr' ? "Vocodeur Java" : "Java Vocoder",
                        currentLang === 'fr' ? "Site E-Commerce" : "E-Commerce Website",
                        currentLang === 'fr' ? "Site OVHCloud" : "OVHCloud Website"
                    ];
                    projects.forEach(project => {
                        addConsoleMessage(`- ${project}`, 'success');
                    });
                }
            },
            theme: {
                description: commandDescriptions[currentLang].theme,
                action: (args) => {
                    if (args.length > 0) {
                        const theme = args[0].toLowerCase();
                        if (theme === 'jedi' || theme === 'sith') {
                            changeTheme(theme);
                            addConsoleMessage(`${consoleMessages[currentLang].themeChanged} ${theme}`, 'success');
                        } else {
                            addConsoleMessage(consoleMessages[currentLang].themeNotRecognized, 'error');
                        }
                    } else {
                        addConsoleMessage(consoleMessages[currentLang].specifyTheme, 'error');
                    }
                }
            },
            force: {
                description: commandDescriptions[currentLang].force,
                action: () => {
                    const theme = document.body.classList.contains('sith-theme') ? 'sith' : 'jedi';
                    
                    if (theme === 'sith') {
                        addConsoleMessage(consoleMessages[currentLang].darkSideMessage, 'error');
                        
                        // Effet visuel côté obscur
                        const elementsToShake = document.querySelectorAll('.project-card, .stat-item');
                        elementsToShake.forEach(el => {
                            el.style.transition = 'transform 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
                            el.style.transform = 'translate3d(0, 0, 0)';
                            
                            setTimeout(() => {
                                el.style.transform = 'translate3d(-5px, 0, 0)';
                                setTimeout(() => {
                                    el.style.transform = 'translate3d(5px, 0, 0)';
                                    setTimeout(() => {
                                        el.style.transform = 'translate3d(0, 0, 0)';
                                    }, 100);
                                }, 100);
                            }, 0);
                        });
                    } else {
                        addConsoleMessage(consoleMessages[currentLang].lightSideMessage, 'success');
                        
                        // Effet visuel côté lumineux
                        const elements = document.querySelectorAll('.project-card, .stat-item');
                        elements.forEach(el => {
                            el.style.transition = 'all 0.5s ease';
                            el.style.boxShadow = `0 0 20px rgba(52, 152, 219, 0.7)`;
                            
                            setTimeout(() => {
                                el.style.boxShadow = '';
                            }, 1000);
                        });
                    }
                }
            },
            version: {
                description: commandDescriptions[currentLang].version,
                action: () => {
                    addConsoleMessage("Portfolio v1.0.0", 'info');
                    addConsoleMessage(consoleMessages[currentLang].lastUpdate, 'info');
                }
            }
        };
        
        // Fonction pour ajouter un message à la console
        function addConsoleMessage(message, type = '') {
            const p = document.createElement('p');
            p.textContent = message;
            if (type) p.classList.add(type);
            consoleOutput.appendChild(p);
            
            // Scroll to bottom
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
        
        // Gérer la saisie de commande
        consoleInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const input = this.value.trim();
                if (input) {
                    // Afficher la commande saisie
                    addConsoleMessage(`> ${input}`);
                    
                    // Analyser la commande
                    const parts = input.split(' ');
                    const command = parts[0].toLowerCase();
                    const args = parts.slice(1);
                    
                    // Exécuter la commande si elle existe
                    if (commands[command]) {
                        commands[command].action(args);
                    } else {
                        addConsoleMessage(`${consoleMessages[currentLang].commandNotFound} ${command}`, 'error');
                        addConsoleMessage(consoleMessages[currentLang].typeHelp, 'info');
                    }
                    
                    // Effacer l'entrée
                    this.value = '';
                }
            }
        });
    }
    
    // Initialiser la console Star Wars
    initializeConsole();

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
                
                // Si c'est un titre de section, mettre à jour son attribut data-text et son élément d'arrière-plan
                if (element.classList.contains('section-title')) {
                    // Mettre à jour l'attribut data-text pour correspondre au nouveau texte
                    element.setAttribute('data-text', translations[lang][key]);
                    
                    const bgElement = element.previousElementSibling;
                    if (bgElement && bgElement.classList.contains('section-title-bg')) {
                        bgElement.textContent = translations[lang][key];
                    }
                }
            });
        });
        
        // Réinitialiser la console avec la nouvelle langue
        reinitializeConsole(lang);
    }
    
    // Fonction pour réinitialiser la console avec la nouvelle langue
    function reinitializeConsole(lang) {
        const consoleOutput = document.querySelector('.sw-console-output');
        const consoleInput = document.querySelector('.sw-console-input');
        
        if (!consoleOutput || !consoleInput) return;
        
        // Vider la console
        consoleOutput.innerHTML = '';
        
        // Réinitialiser la console
        const theme = document.body.classList.contains('sith-theme') ? 'sith' : 'jedi';
        
        const welcomeMessages = {
            fr: {
                jedi: "Bienvenue dans le terminal de l'Alliance Rebelle.",
                sith: "Bienvenue dans le terminal de l'Empire Galactique."
            },
            en: {
                jedi: "Welcome to the Rebel Alliance terminal.",
                sith: "Welcome to the Galactic Empire terminal."
            }
        };
        
        const helpMessages = {
            fr: "Tapez 'help' pour voir les commandes disponibles.",
            en: "Type 'help' to see available commands."
        };
        
        // Créer une fonction d'ajout de message basée sur la fonction dans initializeConsole
        function addMessage(message, type = '') {
            const p = document.createElement('p');
            p.textContent = message;
            if (type) p.classList.add(type);
            consoleOutput.appendChild(p);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
        
        // Ajouter les messages de bienvenue
        addMessage(welcomeMessages[lang][theme], 'info');
        addMessage(helpMessages[lang], 'info');
        
        // Mettre à jour le placeholder de l'input de la console
        consoleInput.placeholder = lang === 'fr' ? "Entrez une commande..." : "Enter a command...";
        
        // Mettre à jour le titre du terminal en fonction du thème et de la langue
        const terminalTitle = document.querySelector('.sw-console-title');
        if (terminalTitle) {
            if (lang === 'fr') {
                terminalTitle.textContent = theme === 'sith' ? 'Terminal Impérial' : 'Terminal Rebelle';
            } else {
                terminalTitle.textContent = theme === 'sith' ? 'Imperial Terminal' : 'Rebel Terminal';
            }
        }
        
        // Mettre à jour les classes visuelles du terminal
        const terminal = document.querySelector('.sw-console');
        if (terminal) {
            terminal.classList.remove('jedi-terminal', 'sith-terminal');
            terminal.classList.add(theme === 'sith' ? 'sith-terminal' : 'jedi-terminal');
        }
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

    // Star Wars Animations - Version améliorée
    function initializeStarWarsAnimations() {
        // Ajout de l'attribut data-text au titre principal pour l'effet hologramme
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle && !heroTitle.hasAttribute('data-text')) {
            heroTitle.setAttribute('data-text', heroTitle.textContent);
        }

        // Ajouter la classe de base pour le thème actif
        document.body.classList.add('jedi-theme');
        
        // Ajouter une classe spéciale aux projets pour animations différenciées par thème
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('project-animation');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Initialiser les animations Star Wars
    initializeStarWarsAnimations();

    // Gestion du changement de thème
    function changeTheme(theme) {
        // Animation de transition pour le changement de thème
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = theme === 'sith' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(52, 152, 219, 0.2)';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(overlay);
        
        // Animer l'overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
            
            setTimeout(() => {
                // Mettre à jour les boutons de thème
                const themeButtons = document.querySelectorAll('.theme-btn');
                themeButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.theme === theme) {
                        btn.classList.add('active');
                    }
                });
        
                // Sauvegarder le thème choisi
                localStorage.setItem('theme', theme);
        
                // Mettre à jour le thème
                if (theme === 'sith') {
                    document.body.classList.remove('jedi-theme');
                    document.body.classList.add('sith-theme');
                    document.documentElement.style.setProperty('--primary-rgb', '231, 76, 60');
                } else {
                    document.body.classList.remove('sith-theme');
                    document.body.classList.add('jedi-theme');
                    document.documentElement.style.setProperty('--primary-rgb', '52, 152, 219');
                }
                
                // Mettre à jour le terminal avec le nouveau thème
                updateTerminalForTheme(theme);
                
                // Masquer l'overlay
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            }, 300);
        }, 10);
    }
    
    // Fonction pour mettre à jour le terminal en fonction du thème
    function updateTerminalForTheme(theme) {
        const consoleOutput = document.querySelector('.sw-console-output');
        const currentLang = localStorage.getItem('language') || 'fr';
        
        if (!consoleOutput) return;
        
        // Définir les messages de bienvenue basés sur le thème
        const welcomeMessages = {
            fr: {
                jedi: "Bienvenue dans le terminal de l'Alliance Rebelle.",
                sith: "Bienvenue dans le terminal de l'Empire Galactique."
            },
            en: {
                jedi: "Welcome to the Rebel Alliance terminal.",
                sith: "Welcome to the Galactic Empire terminal."
            }
        };
        
        // Récupérer tous les messages du terminal
        const messages = consoleOutput.querySelectorAll('p');
        
        // Mise à jour visuelle du terminal
        const terminal = document.querySelector('.sw-console');
        if (terminal) {
            // Ajouter une classe pour l'animation de transition
            terminal.classList.add('theme-transition');
            
            // Retirer l'animation après qu'elle soit terminée
            setTimeout(() => {
                terminal.classList.remove('theme-transition');
            }, 500);
            
            // Réinitialiser les classes de thème
            terminal.classList.remove('jedi-terminal', 'sith-terminal');
            
            // Ajouter la classe correspondante au thème actuel
            terminal.classList.add(theme === 'sith' ? 'sith-terminal' : 'jedi-terminal');
            
            // Mettre à jour le titre du terminal
            const terminalTitle = document.querySelector('.sw-console-title');
            if (terminalTitle) {
                if (currentLang === 'fr') {
                    terminalTitle.textContent = theme === 'sith' ? 'Terminal Impérial' : 'Terminal Rebelle';
                } else {
                    terminalTitle.textContent = theme === 'sith' ? 'Imperial Terminal' : 'Rebel Terminal';
                }
            }
            
            // Si le premier message est un message de bienvenue, le mettre à jour avec animation
            if (messages.length > 0 && messages[0].classList.contains('info')) {
                // Créer une animation de fondu pour le message
                messages[0].style.transition = 'opacity 0.3s ease';
                messages[0].style.opacity = '0';
                
                setTimeout(() => {
                    messages[0].textContent = welcomeMessages[currentLang][theme];
                    messages[0].style.opacity = '1';
                }, 300);
            }
        }
    }

    // Initialiser le thème
    const savedTheme = localStorage.getItem('theme') || 'jedi';
    changeTheme(savedTheme);

    // Écouteurs d'événements pour les boutons de thème
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            changeTheme(theme);
        });
    });

    // Écouteur d'événement pour détecter le scroll et afficher/masquer le bouton retour en haut
    window.addEventListener('scroll', () => {
        const currentPosition = window.pageYOffset;
        
        if (currentPosition > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        lastScrollPosition = currentPosition;
    });

    // Écouteur d'événement pour le bouton retour en haut
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

    // Créer les éléments d'arrière-plan pour les titres de section
    document.querySelectorAll('.section-title').forEach(title => {
        const titleText = title.getAttribute('data-text') || title.textContent;
        const bgElement = document.createElement('div');
        bgElement.className = 'section-title-bg';
        bgElement.textContent = titleText;
        title.parentNode.insertBefore(bgElement, title);
    });

    // Mettre à jour les textes initiaux
    changeLanguage(currentLang);
    
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