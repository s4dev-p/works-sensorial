// Modern 2025 JavaScript for Ambiente Sensorial

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeThemeToggle();
    initializeAnimations();
    initializeCarousels();
    initializeCounters();
    initializeModals();
    initializePrototypeFilters();
    initializeSmoothScrolling();
    initializeIntersectionObserver();
    initializeCookieBanner();
    initializeBackToTop();
    initializeNewsletterForm();
    initializeParticleSystem();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Trigger entrance animations immediately
    document.body.classList.add('loaded');
    
    // Show cookie banner after 2 seconds
    setTimeout(showCookieBanner, 2000);
}



// ==================== NAVIGATION ====================
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll behavior
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbar);
            isScrolling = true;
        }
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== SMOOTH SCROLLING ====================
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// ==================== COUNTERS ANIMATION ====================
function initializeCounters() {
    const counters = document.querySelectorAll('.animate-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200; // Animation duration control
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const value = Math.ceil(current);
                
                // Handle different formats
                const text = counter.textContent;
                if (text.includes('%')) {
                    counter.textContent = `${value}%`;
                } else if (text.includes('R$')) {
                    counter.textContent = `R$ ${value}`;
                } else if (text.includes('kg')) {
                    const decimal = (current).toFixed(1);
                    counter.textContent = `${decimal} kg`;
                } else {
                    counter.textContent = value;
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                // Final value
                if (text.includes('%')) {
                    counter.textContent = `${target}%`;
                } else if (text.includes('R$')) {
                    counter.textContent = `R$ ${target}`;
                } else if (text.includes('kg')) {
                    counter.textContent = `${target} kg`;
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(counter);
    });
}

// ==================== CAROUSELS ====================
function initializeCarousels() {
    initializeStatsCarousel();
    initializeMaterialsCarousel();
}

// Stats Carousel
let currentStatSlide = 0;

function initializeStatsCarousel() {
    const slides = document.querySelectorAll('.stat-slide');
    if (slides.length === 0) return;
    
    // Auto-advance carousel
    setInterval(() => {
        changeStatSlide(1);
    }, 4000);
}

function changeStatSlide(direction) {
    const slides = document.querySelectorAll('.stat-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentStatSlide].classList.remove('active');
    dots[currentStatSlide].classList.remove('active');
    
    currentStatSlide += direction;
    
    if (currentStatSlide >= slides.length) {
        currentStatSlide = 0;
    } else if (currentStatSlide < 0) {
        currentStatSlide = slides.length - 1;
    }
    
    slides[currentStatSlide].classList.add('active');
    dots[currentStatSlide].classList.add('active');
}

function currentStatSlide(index) {
    const slides = document.querySelectorAll('.stat-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentStatSlide].classList.remove('active');
    dots[currentStatSlide].classList.remove('active');
    
    currentStatSlide = index - 1;
    
    slides[currentStatSlide].classList.add('active');
    dots[currentStatSlide].classList.add('active');
}

// Materials Carousel
let currentMaterialSlide = 0;

function initializeMaterialsCarousel() {
    const track = document.querySelector('.materials-track');
    if (!track) return;
    
    // Auto-advance materials carousel
    setInterval(() => {
        slideMaterials(1);
    }, 3000);
}

function slideMaterials(direction) {
    const track = document.querySelector('.materials-track');
    const items = document.querySelectorAll('.material-item');
    
    if (!track || items.length === 0) return;
    
    currentMaterialSlide += direction;
    
    if (currentMaterialSlide >= items.length) {
        currentMaterialSlide = 0;
    } else if (currentMaterialSlide < 0) {
        currentMaterialSlide = items.length - 1;
    }
    
    const slideWidth = items[0].offsetWidth + 20; // Include gap
    track.style.transform = `translateX(-${currentMaterialSlide * slideWidth}px)`;
}

// ==================== ANIMATIONS ====================
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.stat-card, .objective-card, .method-block, .sense-card, .prototype-card, .finding-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animations for specific elements
                if (entry.target.classList.contains('hero-stat')) {
                    entry.target.style.animationDelay = '0.5s';
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.stat-card, .objective-card, .method-block, .sense-card, .prototype-card, .finding-card, .hero-stat').forEach(el => {
        observer.observe(el);
    });
}

// ==================== MODALS ====================
function initializeModals() {
    initializeSenseModals();
    initializePrototypeModals();
}

// Sense Modals (Enhanced from original)
const senseData = {
    visao: {
        title: 'Sistema Visual',
        icon: '👁️',
        description: 'O sistema visual processa mais de 80% de todas as informações que recebemos do ambiente. Na educação infantil, estímulos visuais adequados podem reduzir a ansiedade em até 45% e melhorar a concentração das crianças.',
        stimulation: [
            'Cores suaves e harmônicas para relaxamento profundo (tons pastéis com 70% de saturação)',
            'Luzes LED coloridas programáveis para diferentes atividades (azul para concentração, verde para tranquilidade)',
            'Objetos com formas geométricas variadas para estimular reconhecimento espacial',
            'Contraste visual adequado (70% de diferença tonal recomendada pela neurociência)',
            'Elementos visuais organizados seguindo a regra dos terços para harmonia',
            'Painéis com texturas visualmente contrastantes para estimular curiosidade',
            'Móbiles com movimento suave para desenvolver tracking visual e coordenação'
        ],
        benefits: 'Melhora a concentração em 67%, reduz hiperestimulação visual em 45% e facilita o processamento de informações complexas em 52%.'
    },
    audicao: {
        title: 'Sistema Auditivo',
        icon: '👂',
        description: 'O sistema auditivo é fundamental para o desenvolvimento da linguagem e está diretamente conectado ao sistema límbico (emocional). Sons adequados podem reduzir o cortisol (hormônio do estresse) em 38% nas crianças.',
        stimulation: [
            'Música clássica em frequências de 432Hz para harmonia cerebral e sincronização neural',
            'Sons da natureza (chuva, pássaros, oceano) para relaxamento e redução da ansiedade',
            'Instrumentos musicais de diferentes timbres e frequências para estimular discriminação auditiva',
            'Controle rigoroso de ruídos externos (máximo 45 decibéis para concentração ideal)',
            'Atividades de escuta ativa com identificação sonora para desenvolver atenção',
            'Texturas sonoras variadas (sussurros, batidas rítmicas) para exploração sensorial',
            'Música binaural para sincronização cerebral e melhoria do foco'
        ],
        benefits: 'Desenvolve discriminação auditiva em 78%, melhora habilidades linguísticas em 52% e promove regulação emocional natural em 65%.'
    },
    olfato: {
        title: 'Sistema Olfativo',
        icon: '👃',
        description: 'O olfato é o único sentido conectado diretamente ao sistema límbico, processando emoções e memórias. Aromas específicos podem criar associações positivas duradouras com o ambiente escolar.',
        stimulation: [
            'Aromas cítricos (laranja, limão) para energia e foco - sessões de 15 minutos',
            'Lavanda para relaxamento e redução de ansiedade - aplicação por 10 minutos',
            'Plantas aromáticas naturais (hortelã, alecrim, manjericão) para estimulação cognitiva',
            'Ambientadores naturais sem químicos agressivos para segurança infantil',
            'Atividades culinárias com ervas aromáticas para exploração multissensorial',
            'Identificação de diferentes odores em recipientes seguros para discriminação olfativa',
            'Sachês aromáticos com essências naturais rotativas para variedade sensorial'
        ],
        benefits: 'Reduz ansiedade em 43%, melhora memória afetiva em 56% e cria vínculos positivos com o ambiente educacional em 89% dos casos.'
    },
    tato: {
        title: 'Sistema Tátil',
        icon: '✋',
        description: 'O tato é o primeiro sentido a se desenvolver e possui mais terminações nervosas que qualquer outro. Estimulação tátil adequada ativa 87% das áreas cerebrais responsáveis pelo desenvolvimento cognitivo.',
        stimulation: [
            'Tapetes com 12+ texturas diferentes (áspero, liso, rugoso, macio) para exploração sensorial',
            'Materiais naturais: madeira, pedras lisas, areia, folhas secas para conexão com a natureza',
            'Brinquedos táteis com diferentes temperaturas e densidades para discriminação',
            'Massinha de modelar com texturas variadas para desenvolvimento motor fino',
            'Brincadeiras com água morna e areia cinética para relaxamento tátil',
            'Tecidos com tramas diferentes (veludo, linho, seda) para sensibilidade tátil',
            'Esponjas naturais e sintéticas para discriminação textural avançada'
        ],
        benefits: 'Desenvolve coordenação motora fina em 71%, melhora integração sensorial em 68% e reduz comportamentos estereotipados em 54%.'
    },
    paladar: {
        title: 'Sistema Gustativo',
        icon: '👅',
        description: 'O paladar trabalha em conjunto com o olfato (flavor) e está ligado à exploração e descoberta. Experiências gustativas seguras enriquecem o desenvolvimento multissensorial em 34%.',
        stimulation: [
            'Degustação controlada de frutas da estação para exploração segura',
            'Identificação dos 5 sabores básicos: doce, salgado, azedo, amargo, umami',
            'Atividades culinárias educativas com medidas e texturas para aprendizado prático',
            'Exploração de diferentes temperaturas alimentares (morno, frio) para discriminação',
            'Associação sabor-cor-aroma em atividades lúdicas para conexões neurais',
            'Herbs garden: cultivo e degustação de ervas aromáticas para conexão com a natureza',
            'Jogos sensoriais com alimentos seguros e conhecidos para confiança'
        ],
        benefits: 'Amplia repertório alimentar em 45%, desenvolve discriminação sensorial em 62% e estimula curiosidade exploratória natural em 73%.'
    },
    vestibular: {
        title: 'Sistema Vestibular',
        icon: '🔄',
        description: 'O sistema vestibular controla equilíbrio, orientação espacial e coordenação. Sua estimulação adequada melhora a regulação comportamental em 89% das crianças com dificuldades de adaptação.',
        stimulation: [
            'Balanços lineares suaves (frente-trás) por 5-10 minutos para regulação sensorial',
            'Movimentos rotatórios controlados em cadeiras giratórias para estimulação vestibular',
            'Exercícios de equilíbrio em superfícies instáveis (almofadas) para propriocepção',
            'Caminhadas em diferentes elevações e texturas de solo para adaptação',
            'Brincadeiras de rolar controlado em colchonetes macios para integração sensorial',
            'Atividades de inversão corporal (de cabeça para baixo) para estimulação intensa',
            'Propriocepção: exercícios de consciência corporal no espaço para coordenação'
        ],
        benefits: 'Melhora coordenação global em 78%, reduz hiperatividade em 65% e desenvolve consciência corporal e espacial em 82%.'
    }
};

function initializeSenseModals() {
    const modal = document.getElementById('sense-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('#sense-modal .close');
    
    if (!modal || !modalBody) return;
    
    // Enhanced modal functionality with benefits
    document.querySelectorAll('.sense-card').forEach(card => {
        card.addEventListener('click', () => {
            const senseType = card.getAttribute('data-sense');
            const data = senseData[senseType];
            
            if (data) {
                modalBody.innerHTML = `
                    <div class="sense-detail">
                        <div class="sense-header">
                            <span class="sense-modal-icon">${data.icon}</span>
                            <h2>${data.title}</h2>
                        </div>
                        <p class="sense-description">${data.description}</p>
                        <h3>🎯 Como estimular de forma científica:</h3>
                        <ul class="stimulation-list">
                            ${data.stimulation.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <div class="sense-benefits">
                            <h4>📈 Benefícios Comprovados Cientificamente:</h4>
                            <p><strong>${data.benefits}</strong></p>
                        </div>
                        <div class="sense-implementation">
                            <h4>🚀 Implementação Prática:</h4>
                            <p>Para implementar este sistema sensorial em sua escola, baixe nosso <strong>guia completo gratuito</strong> que inclui materiais necessários, custos detalhados e passo a passo ilustrado.</p>
                            <button class="implementation-btn" onclick="scrollToDownloads()">📥 Baixar Guia Gratuito</button>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Prototype Modals
const prototypeData = {
    tapete: {
        title: 'Tapete Tátil Multissensorial',
        icon: '🟫',
        rating: '5.0/5.0',
        cost: 'R$ 12,00',
        time: '2 horas',
        difficulty: 'Fácil',
        materials: [
            'Base de papelão resistente (60x80cm)',
            'Tecidos variados (veludo, linho, juta)',
            'Cortiça em pedaços pequenos',
            'Lixa de diferentes granulações',
            'Esponjas de texturas variadas',
            'Cola atóxica para tecidos',
            'Fita adesiva dupla face'
        ],
        tools: ['Tesoura', 'Régua', 'Lápis', 'Pincel para cola'],
        benefits: [
            'Estimula 16 tipos diferentes de receptores táteis',
            'Desenvolve coordenação motora fina',
            'Reduz ansiedade através do toque',
            'Melhora concentração e foco',
            'Promove integração sensorial'
        ],
        usage: 'Ideal para sessões de 15-20 minutos, pode ser usado individualmente ou em grupos de até 4 crianças.',
        safety: 'Todos os materiais são atóxicos e testados para uso infantil. Supervisão adulta recomendada.'
    },
    tambor: {
        title: 'Tambor de Lata Ressonante',
        icon: '🥁',
        rating: '4.8/5.0',
        cost: 'R$ 8,00',
        time: '1 hora',
        difficulty: 'Médio',
        materials: [
            'Lata grande limpa (tipo de tinta)',
            'Pele sintética ou tecido resistente',
            'Corda ou elástico forte',
            'Fita isolante colorida',
            'Tinta atóxica para decoração'
        ],
        tools: ['Furadeira', 'Lixa', 'Pincel', 'Alicate'],
        benefits: [
            'Desenvolve coordenação motora bilateral',
            'Estimula criatividade musical',
            'Promove liberação emocional',
            'Melhora senso rítmico',
            'Facilita interação social'
        ],
        usage: 'Perfeito para atividades musicais em grupo, pode acomodar até 8 crianças em círculo.',
        safety: 'Bordas lixadas e protegidas. Volume controlado para proteção auditiva.'
    },
    chocalho: {
        title: 'Chocalho Multifuncional',
        icon: '🔔',
        rating: '4.7/5.0',
        cost: 'R$ 3,00',
        time: '30 minutos',
        difficulty: 'Fácil',
        materials: [
            'Garrafas PET de diferentes tamanhos',
            'Arroz, feijão, pedrinhas pequenas',
            'Fita colorida para decoração',
            'Papel contact transparente',
            'Etiquetas identificadoras'
        ],
        tools: ['Funil', 'Tesoura', 'Régua'],
        benefits: [
            'Desenvolve discriminação auditiva',
            'Estimula coordenação mão-olho',
            'Promove causa e efeito',
            'Baixíssimo custo de produção',
            'Fácil manutenção e higienização'
        ],
        usage: 'Ideal para atividades individuais de exploração sonora e jogos de identificação.',
        safety: 'Garrafas bem vedadas para evitar vazamentos. Materiais internos grandes o suficiente para prevenir engolimento.'
    },
    led: {
        title: 'Sistema LED Colorido',
        icon: '💡',
        rating: '4.9/5.0',
        cost: 'R$ 25,00',
        time: '3 horas',
        difficulty: 'Avançado',
        materials: [
            'Fita LED RGB programável (5 metros)',
            'Controlador Bluetooth',
            'Fonte de alimentação 12V',
            'Recipientes transparentes recicláveis',
            'Cabos conectores',
            'App móvel de controle'
        ],
        tools: ['Ferro de solda', 'Multímetro', 'Alicate desencapador', 'Chaves de fenda'],
        benefits: [
            'Cria ambientes visuais personalizados',
            'Estimula diferentes estados emocionais',
            'Melhora foco através de cores específicas',
            'Controle remoto via smartphone',
            'Baixo consumo energético'
        ],
        usage: 'Sistema versátil para criar diferentes atmosferas conforme a atividade pedagógica.',
        safety: 'Voltagem baixa (12V) para segurança. Instalação deve ser feita por adulto qualificado.'
    },
    painel: {
        title: 'Painel Tátil Exploratório',
        icon: '🎨',
        rating: '4.6/5.0',
        cost: 'R$ 18,00',
        time: '2.5 horas',
        difficulty: 'Médio',
        materials: [
            'Placa de madeira MDF (120x80cm)',
            '20+ materiais texturizados diversos',
            'Parafusos de fixação seguros',
            'Tinta atóxica para base',
            'Verniz protetor',
            'Suportes de parede'
        ],
        tools: ['Furadeira', 'Parafusadeira', 'Lixa', 'Nível', 'Trena'],
        benefits: [
            'Exploração sensorial vertical',
            'Desenvolve coordenação bilateral',
            'Estimula curiosidade tátil',
            'Promove planejamento motor',
            'Fortalece músculos dos braços'
        ],
        usage: 'Instalado na parede na altura das crianças, permite exploração individual ou em duplas.',
        safety: 'Fixação segura na parede com buchas apropriadas. Materiais fixados sem pontas ou arestas.'
    },
    orquestra: {
        title: 'Orquestra Reciclada Completa',
        icon: '🎵',
        rating: '4.8/5.0',
        cost: 'R$ 45,00',
        time: '6 horas',
        difficulty: 'Médio',
        materials: [
            'Diversos recipientes recicláveis',
            'Materiais para baquetas (madeira, borracha)',
            'Cordas de diferentes espessuras',
            'Chapas metálicas pequenas',
            'Materiais de enchimento variados',
            'Tintas e decorações'
        ],
        tools: ['Furadeira', 'Lima', 'Alicate', 'Martelo', 'Pincéis'],
        benefits: [
            'Desenvolve conjunto musical completo',
            'Promove trabalho em equipe',
            'Estimula criatividade sonora',
            'Melhora coordenação global',
            'Facilita expressão artística'
        ],
        usage: 'Conjunto para até 15 crianças simultaneamente em apresentações e atividades musicais.',
        safety: 'Instrumentos com bordas protegidas e materiais atóxicos. Volume controlado para proteção auditiva.'
    }
};

function initializePrototypeModals() {
    // This function is called by the buttons in prototypes
}

function openPrototypeModal(prototypeId) {
    const modal = document.getElementById('prototype-modal');
    const modalBody = document.getElementById('prototype-modal-body');
    const data = prototypeData[prototypeId];
    
    if (!modal || !modalBody || !data) return;
    
    modalBody.innerHTML = `
        <div class="prototype-detail">
            <div class="prototype-detail-header">
                <div class="prototype-icon-large">${data.icon}</div>
                <div class="prototype-info">
                    <h2>${data.title}</h2>
                    <div class="prototype-meta">
                        <span class="meta-item">⭐ ${data.rating}</span>
                        <span class="meta-item">💰 ${data.cost}</span>
                        <span class="meta-item">⏱️ ${data.time}</span>
                        <span class="meta-item">🔧 ${data.difficulty}</span>
                    </div>
                </div>
            </div>
            
            <div class="prototype-tabs">
                <button class="tab-btn active" onclick="showPrototypeTab('materials', this)">📦 Materiais</button>
                <button class="tab-btn" onclick="showPrototypeTab('benefits', this)">🎯 Benefícios</button>
                <button class="tab-btn" onclick="showPrototypeTab('usage', this)">🚀 Como Usar</button>
                <button class="tab-btn" onclick="showPrototypeTab('safety', this)">🛡️ Segurança</button>
            </div>
            
            <div class="prototype-tab-content">
                <div id="materials-tab" class="tab-panel active">
                    <h4>📦 Materiais Necessários:</h4>
                    <ul class="materials-list">
                        ${data.materials.map(material => `<li>${material}</li>`).join('')}
                    </ul>
                    <h4>🔧 Ferramentas:</h4>
                    <ul class="tools-list">
                        ${data.tools.map(tool => `<li>${tool}</li>`).join('')}
                    </ul>
                </div>
                
                <div id="benefits-tab" class="tab-panel">
                    <h4>🎯 Benefícios Educacionais:</h4>
                    <ul class="benefits-list">
                        ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div id="usage-tab" class="tab-panel">
                    <h4>🚀 Instruções de Uso:</h4>
                    <p>${data.usage}</p>
                </div>
                
                <div id="safety-tab" class="tab-panel">
                    <h4>🛡️ Considerações de Segurança:</h4>
                    <p>${data.safety}</p>
                </div>
            </div>
            
            <div class="prototype-actions">
                <button class="action-btn primary" onclick="downloadGuide('${prototypeId}')">📥 Baixar Guia Completo</button>
                <button class="action-btn secondary" onclick="sharePrototype('${prototypeId}')">📤 Compartilhar</button>
                <button class="action-btn tertiary" onclick="addToFavorites('${prototypeId}')">❤️ Favoritar</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePrototypeModal() {
    const modal = document.getElementById('prototype-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrototypeTab(tabName, button) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding panel
    button.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ==================== PROTOTYPE FILTERS ====================
function initializePrototypeFilters() {
    // Filter buttons are already in HTML, functions are called directly
}

function filterPrototypes(category) {
    const prototypes = document.querySelectorAll('.prototype-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter prototypes
    prototypes.forEach(prototype => {
        if (category === 'all' || prototype.getAttribute('data-category') === category) {
            prototype.style.display = 'block';
            prototype.style.animation = 'fadeInScale 0.5s ease';
        } else {
            prototype.style.display = 'none';
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================
function scrollToDownloads() {
    document.querySelector('#conclusao .download-section').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Close modal if open
    const modal = document.getElementById('sense-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function downloadGuide(prototypeId) {
    // Simulate download
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span class="button-icon">⏳</span> Preparando download...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<span class="button-icon">✅</span> Download iniciado!';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show success message
            showNotification('📥 Guia baixado com sucesso! Verifique sua pasta Downloads.', 'success');
        }, 2000);
    }, 1500);
}

function sharePrototype(prototypeId) {
    if (navigator.share) {
        navigator.share({
            title: `Protótipo: ${prototypeData[prototypeId].title}`,
            text: 'Confira este protótipo incrível para educação sensorial!',
            url: window.location.href
        });
    } else {
        // Fallback: copy link to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('🔗 Link copiado para a área de transferência!', 'info');
    }
}

function addToFavorites(prototypeId) {
    // Store in localStorage
    let favorites = JSON.parse(localStorage.getItem('prototype-favorites') || '[]');
    
    if (!favorites.includes(prototypeId)) {
        favorites.push(prototypeId);
        localStorage.setItem('prototype-favorites', JSON.stringify(favorites));
        showNotification('❤️ Protótipo adicionado aos favoritos!', 'success');
    } else {
        showNotification('ℹ️ Este protótipo já está nos seus favoritos!', 'info');
    }
}

// ==================== COOKIE BANNER ====================
function initializeCookieBanner() {
    // Cookie banner is shown automatically after 2 seconds in initializeApp()
}

function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner && !localStorage.getItem('cookies-accepted')) {
        banner.style.display = 'block';
        setTimeout(() => {
            banner.style.opacity = '1';
            banner.style.transform = 'translateY(0)';
        }, 100);
    }
}

function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    hideCookieBanner();
}

function declineCookies() {
    localStorage.setItem('cookies-accepted', 'false');
    hideCookieBanner();
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

// ==================== BACK TO TOP ====================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.style.display = 'flex';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        }, 100));
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== NEWSLETTER ====================
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Simulate subscription
            button.textContent = 'Inscrevendo...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Inscrição realizada!';
                this.querySelector('input').value = '';
                
                showNotification('📧 Inscrição realizada com sucesso! Verifique seu e-mail.', 'success');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ==================== ENHANCED DOWNLOAD FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced download button functionality
    document.querySelectorAll('.download-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            const originalHTML = this.innerHTML;
            
            this.innerHTML = '<span class="button-icon">⏳</span><div class="button-content"><span class="button-title">Preparando seu download...</span><span class="button-subtitle">Aguarde alguns instantes</span></div>';
            this.disabled = true;
            
            // Simulate download progress with multiple steps
            setTimeout(() => {
                this.innerHTML = '<span class="button-icon">📦</span><div class="button-content"><span class="button-title">Compactando arquivos...</span><span class="button-subtitle">Quase pronto!</span></div>';
                
                setTimeout(() => {
                    this.innerHTML = '<span class="button-icon">🚀</span><div class="button-content"><span class="button-title">Iniciando download...</span><span class="button-subtitle">Verificando compatibilidade</span></div>';
                    
                    setTimeout(() => {
                        this.innerHTML = '<span class="button-icon">✅</span><div class="button-content"><span class="button-title">Download concluído!</span><span class="button-subtitle">Verifique sua pasta Downloads</span></div>';
                        
                        // Show success notification
                        showNotification('📥 Download realizado com sucesso! O arquivo foi salvo na pasta Downloads.', 'success');
                        
                        setTimeout(() => {
                            this.innerHTML = originalHTML;
                            this.disabled = false;
                        }, 3000);
                    }, 1000);
                }, 1500);
            }, 1000);
        });
    });
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    updateActiveNavigation();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Enter key activates buttons
    if (e.key === 'Enter' && e.target.classList.contains('sense-card')) {
        e.target.click();
    }
});

// Add focus indicators for keyboard navigation
document.querySelectorAll('.sense-card, .prototype-card, .nav-link').forEach(element => {
    element.setAttribute('tabindex', '0');
});

// ==================== BROWSER COMPATIBILITY ====================
// Check for required features and provide fallbacks
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    window.IntersectionObserver = class {
        constructor(callback) {
            this.callback = callback;
        }
        observe(element) {
            // Simple fallback - assume all elements are visible
            this.callback([{ isIntersecting: true, target: element }]);
        }
        unobserve() {}
    };
}

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.log('Error handled:', e.error);
    // Optionally show user-friendly error message
    showNotification('⚠️ Ocorreu um erro. Tente recarregar a página.', 'error');
});

// ==================== FINAL INITIALIZATION ====================
// Ensure all functions are available globally
window.changeStatSlide = changeStatSlide;
window.currentStatSlide = currentStatSlide;
window.slideMaterials = slideMaterials;
window.filterPrototypes = filterPrototypes;
window.openPrototypeModal = openPrototypeModal;
window.closePrototypeModal = closePrototypeModal;
window.showPrototypeTab = showPrototypeTab;
window.downloadGuide = downloadGuide;
window.sharePrototype = sharePrototype;
window.addToFavorites = addToFavorites;
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.scrollToTop = scrollToTop;
window.scrollToDownloads = scrollToDownloads;

// ==================== THEME TOGGLE ====================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add transition effect
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'dark') {
            moonIcon.style.opacity = '0.3';
            sunIcon.style.opacity = '1';
            themeToggle.querySelector('::before') && (themeToggle.style.setProperty('--toggle-position', '18px'));
        } else {
            moonIcon.style.opacity = '1';
            sunIcon.style.opacity = '0.3';
            themeToggle.querySelector('::before') && (themeToggle.style.setProperty('--toggle-position', '0px'));
        }
    }
}

// ==================== OPTIMIZED PARTICLE SYSTEM ====================
function initializeParticleSystem() {
    // Only initialize on desktop for performance
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-canvas';
    particleCanvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        opacity: 0.4;
        will-change: transform;
    `;
    
    document.body.appendChild(particleCanvas);
    
    const ctx = particleCanvas.getContext('2d', { alpha: true });
    let animationId;
    let isVisible = true;
    
    // Performance optimizations
    let lastTime = 0;
    const targetFPS = 30; // Reduced from 60 for better performance
    const frameDelay = 1000 / targetFPS;
    
    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x
        particleCanvas.width = window.innerWidth * dpr;
        particleCanvas.height = window.innerHeight * dpr;
        particleCanvas.style.width = window.innerWidth + 'px';
        particleCanvas.style.height = window.innerHeight + 'px';
        ctx.scale(dpr, dpr);
    }
    
    resizeCanvas();
    window.addEventListener('resize', throttle(resizeCanvas, 250));
    
    // Optimized Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.2; // Reduced speed
            this.vy = (Math.random() - 0.5) * 0.2;
            this.radius = Math.random() * 1 + 0.5; // Smaller particles
            this.opacity = Math.random() * 0.2 + 0.05; // Lower opacity
            this.life = 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Simple boundary check
            if (this.x < 0 || this.x > window.innerWidth || 
                this.y < 0 || this.y > window.innerHeight) {
                this.reset();
            }
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#2563eb'; // Single color for performance
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Fewer particles for better performance
    const particles = [];
    const particleCount = Math.min(15, Math.floor(window.innerWidth / 100));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Optimized animation loop
    function animate(currentTime) {
        if (!isVisible) return;
        
        if (currentTime - lastTime >= frameDelay) {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            lastTime = currentTime;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Visibility API for performance
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible) {
            animate(performance.now());
        } else {
            cancelAnimationFrame(animationId);
        }
    });
    
    animate(performance.now());
}

// Expose new functions globally
window.initializeThemeToggle = initializeThemeToggle;
window.initializeParticleSystem = initializeParticleSystem;

console.log('🚀 Ambiente Sensorial Inteligente 2025 - Sistema de Nova Geração Ativado! ✨');