class ProjectModal {
    constructor() {
        console.log('Initializing ProjectModal...');
        this.modal = document.getElementById('projectModal');
        if (!this.modal) {
            console.error('Modal element not found!');
            return;
        }
        this.modalContent = this.modal.querySelector('.modal-content');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.carouselTrack = this.modal.querySelector('.carousel-track');
        this.prevBtn = this.modal.querySelector('.prev-btn');
        this.nextBtn = this.modal.querySelector('.next-btn');
        this.carouselTitle = this.modal.querySelector('.carousel-title');
        this.carouselText = this.modal.querySelector('.carousel-text');
        this.currentSlide = 0;
        this.slides = [];
        this.projectData = null;

        this.init();
    }

    init() {
        console.log('Setting up event listeners...');
        // Fermeture de la modal
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Navigation du carrousel
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        // Initialisation des cartes de projet
        this.initProjectCards();
    }

    initProjectCards() {
        console.log('Initializing project cards...');
        const projectCards = document.querySelectorAll('.project-card');
        console.log(`Found ${projectCards.length} project cards`);
        
        projectCards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                console.log(`Card ${index + 1} clicked`);
                e.preventDefault();
                e.stopPropagation();
                const projectData = this.getProjectData(card);
                console.log('Project data:', projectData);
                this.open(projectData);
            });
        });
    }

    getProjectData(card) {
        console.log('Getting project data from card...');
        const front = card.querySelector('.project-card-front');
        const back = card.querySelector('.project-card-back');
        
        let images = [];
        let details = {};
        try {
            if (card.dataset.images) {
                images = JSON.parse(card.dataset.images);
                console.log('Parsed images:', images);
            }
            if (card.dataset.details) {
                details = JSON.parse(card.dataset.details);
                console.log('Parsed details:', details);
            }
        } catch (error) {
            console.error('Error parsing data:', error);
        }
        
        return {
            title: front.querySelector('h3').textContent,
            brief: front.querySelector('.project-brief').textContent,
            description: back.querySelector('.project-description').textContent,
            images: images,
            details: details
        };
    }

    open(projectData) {
        console.log('Opening modal with data:', projectData);
        this.projectData = projectData;
        this.updateCarousel(projectData.images);
        this.updateDescription(projectData);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        console.log('Closing modal...');
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentSlide = 0;
    }

    updateCarousel(images) {
        console.log('Updating carousel with images:', images);
        this.slides = images;
        this.currentSlide = 0;
        
        if (images && images.length > 0) {
            this.carouselTrack.innerHTML = images.map(image => `
                <div class="carousel-slide">
                    <img src="${image.url}" alt="${image.alt || ''}" loading="lazy" onerror="this.onerror=null; this.src='assets/placeholder.png';">
                </div>
            `).join('');
            this.carouselTrack.parentElement.style.display = 'block';
        } else {
            this.carouselTrack.innerHTML = '';
            this.carouselTrack.parentElement.style.display = 'none';
        }

        this.carouselTrack.style.transform = 'translateX(0)';
        this.updateCarouselButtons();
    }

    updateDescription(projectData) {
        const currentImage = this.slides[this.currentSlide];
        if (currentImage) {
            this.carouselTitle.textContent = currentImage.title || projectData.title;
            this.carouselText.textContent = currentImage.description || projectData.description;
        } else {
            this.carouselTitle.textContent = projectData.title;
            this.carouselText.textContent = projectData.description;
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarouselPosition();
            this.updateDescription(this.projectData);
        }
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.updateCarouselPosition();
            this.updateDescription(this.projectData);
        }
    }

    updateCarouselPosition() {
        const offset = -this.currentSlide * 100;
        this.carouselTrack.style.transform = `translateX(${offset}%)`;
        this.updateCarouselButtons();
    }

    updateCarouselButtons() {
        this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentSlide === this.slides.length - 1 ? '0.5' : '1';
    }
}

// Initialisation de la modal
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating ProjectModal instance...');
    new ProjectModal();
}); 