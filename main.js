/**
 * Main Application Logic
 * Portfolio of Marcos Gabriel Dias Fernandes
 * Data Science Student (Fatec Ourinhos) & Full Stack Developer
 */

// Embedded initial repository data (ensures instantaneous load and offline reliability)
const REPOS_DATA = [
  {
    "name": "worldbank-wipo-processor",
    "description": "Processamento e pipeline analítico de indicadores de desenvolvimento mundial e inovação. Tratamento de séries temporais, limpeza de dados econômicos e rankings automatizados para inteligência competitiva entre países.",
    "language": "Python",
    "url": "https://github.com/MarcosGabrielDF/worldbank-wipo-processor",
    "stars": 1,
    "updated": "2026-04-13",
    "category": "dados",
    "featured": true,
    "tags": ["Python", "Data Science", "Pandas", "Séries Temporais", "ETL"]
  },
  {
    "name": "TCC-Heron-shelly1pm",
    "description": "Trabalho de Conclusão de Curso (TCC): Sistema web para automação da sinalização sonora da Escola Professor Mário Antônio Verza integrado ao hardware Shelly 1PM com painel de horários e acionamento inteligente via relé.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/TCC-Heron-shelly1pm",
    "stars": 0,
    "updated": "2025-07-09",
    "category": "iot",
    "featured": true,
    "tags": ["IoT", "Shelly 1PM", "PHP", "Automação", "Hardware Integration"]
  },
  {
    "name": "Sabores_da_Paty",
    "description": "Aplicação web de e-commerce e cardápio digital reativo. O cliente explora os pratos, adiciona ao carrinho dinâmico e conclui o pedido gerando uma comanda estruturada enviada automaticamente para o WhatsApp do estabelecimento.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/Sabores_da_Paty",
    "stars": 0,
    "updated": "2025-10-13",
    "category": "backend",
    "featured": true,
    "tags": ["PHP", "JavaScript", "E-Commerce", "WhatsApp API", "UX/UI"]
  },
  {
    "name": "php-python-docker",
    "description": "Arquitetura base de microsserviços conteinerizada com Docker Compose, orquestrando backend híbrido em PHP e Python integrados a banco de dados MySQL com isolamento e alta reprodutibilidade.",
    "language": "Python",
    "url": "https://github.com/MarcosGabrielDF/php-python-docker",
    "stars": 0,
    "updated": "2025-05-22",
    "category": "devops",
    "featured": true,
    "tags": ["Docker", "Docker Compose", "Python", "PHP", "MySQL", "DevOps"]
  },
  {
    "name": "Fatec-ourinhos-python",
    "description": "Projetos, análises exploratórias e algoritmos desenvolvidos na graduação em Ciência de Dados da Fatec Ourinhos, aplicando manipulação de dados, computação científica e lógica avançada.",
    "language": "Python",
    "url": "https://github.com/MarcosGabrielDF/Fatec-ourinhos-python",
    "stars": 0,
    "updated": "2026-09-01",
    "category": "dados",
    "featured": true,
    "tags": ["Python", "Fatec Ourinhos", "Ciência de Dados", "Algoritmos"]
  },
  {
    "name": "Estat-stica-discreta-com-Python-",
    "description": "Implementação prática com Python dos conceitos de Estatística Discreta e Probabilidade baseados nas diretrizes do curso Enap, unindo teoria matemática e código.",
    "language": "Python",
    "url": "https://github.com/MarcosGabrielDF/Estat-stica-discreta-com-Python-",
    "stars": 0,
    "updated": "2026-03-31",
    "category": "dados",
    "featured": true,
    "tags": ["Python", "Estatística", "Probabilidade", "Matemática"]
  },
  {
    "name": "sw2-php-slim-2025",
    "description": "Construção de APIs RESTful estruturadas utilizando o framework micro PHP Slim, com injeção de dependências, middlewares e roteamento otimizado.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/sw2-php-slim-2025",
    "stars": 0,
    "updated": "2025-03-20",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "Slim Framework", "REST API", "Composer"]
  },
  {
    "name": "Python-do-zero-ao-avan-ado",
    "description": "Estudos aprofundados cobrindo estruturas de dados (listas, tuplas, dicionários), orientação a objetos, manipulação de arquivos, funções de alta ordem e bibliotecas essenciais em Python.",
    "language": "Python",
    "url": "https://github.com/MarcosGabrielDF/Python-do-zero-ao-avan-ado",
    "stars": 0,
    "updated": "2024-10-14",
    "category": "dados",
    "featured": false,
    "tags": ["Python", "OOP", "Data Structures", "Clean Code"]
  },
  {
    "name": "SW2-2025-lib",
    "description": "Biblioteca e módulos reutilizáveis para serviços web em PHP, implementando abstrações de banco de dados e utilitários de backend.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/SW2-2025-lib",
    "stars": 0,
    "updated": "2025-05-22",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "Library", "Backend"]
  },
  {
    "name": "swq-2025-slim-certo",
    "description": "Implementação com Slim Framework para rotas e controladores em arquitetura de microsserviços.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/swq-2025-slim-certo",
    "stars": 0,
    "updated": "2025-03-26",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "Slim", "API"]
  },
  {
    "name": "sw1-2025-slim",
    "description": "Serviço de backend modular construído com PHP Slim Framework e Composer.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/sw1-2025-slim",
    "stars": 0,
    "updated": "2025-03-26",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "Slim", "Backend"]
  },
  {
    "name": "biblioteca-php-2025",
    "description": "Sistema de gestão bibliográfica desenvolvido em PHP moderno com persistência em MySQL.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/biblioteca-php-2025",
    "stars": 0,
    "updated": "2025-04-10",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "MySQL", "CRUD"]
  },
  {
    "name": "Lanchonete-do-Bar-o",
    "description": "Sistema de pedidos e gestão comercial para lanchonete em PHP com controle de estoque e fluxo de pedidos.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/Lanchonete-do-Bar-o",
    "stars": 0,
    "updated": "2025-04-24",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "Gestão", "E-commerce"]
  },
  {
    "name": "sw2-2025-primeiro-exemplo",
    "description": "Introdução a TypeScript aplicada a serviços web com tipagem estática e interfaces modernas.",
    "language": "TypeScript",
    "url": "https://github.com/MarcosGabrielDF/sw2-2025-primeiro-exemplo",
    "stars": 0,
    "updated": "2025-02-20",
    "category": "frontend",
    "featured": false,
    "tags": ["TypeScript", "Frontend", "Types"]
  },
  {
    "name": "Canvas",
    "description": "Alternativa dinâmica, intuitiva e ágil a ferramentas gráficas de Canvas interativo no navegador.",
    "language": "HTML",
    "url": "https://github.com/MarcosGabrielDF/Canvas",
    "stars": 0,
    "updated": "2026-03-30",
    "category": "frontend",
    "featured": false,
    "tags": ["HTML5", "Canvas", "UI Design"]
  },
  {
    "name": "iniciando-bash",
    "description": "Scripts de automação shell bash para administração de servidores Linux e gerenciamento de tarefas recorrentes.",
    "language": "Shell",
    "url": "https://github.com/MarcosGabrielDF/iniciando-bash",
    "stars": 0,
    "updated": "2024-05-18",
    "category": "devops",
    "featured": false,
    "tags": ["Bash", "Linux", "Shell Script", "Automação"]
  },
  {
    "name": "exemplo-bash",
    "description": "Exemplos práticos de scripting em Bash para fluxo de trabalho em sistemas operacionais Unix.",
    "language": "Shell",
    "url": "https://github.com/MarcosGabrielDF/exemplo-bash",
    "stars": 0,
    "updated": "2024-05-10",
    "category": "devops",
    "featured": false,
    "tags": ["Bash", "Shell", "DevOps"]
  },
  {
    "name": "exemplo-docker",
    "description": "Estruturação de Dockerfile e composição de containers para padronização de ambientes de desenvolvimento.",
    "language": "Docker",
    "url": "https://github.com/MarcosGabrielDF/exemplo-docker",
    "stars": 0,
    "updated": "2024-06-08",
    "category": "devops",
    "featured": false,
    "tags": ["Docker", "Containers", "DevOps"]
  },
  {
    "name": "exercicio-container",
    "description": "Exercícios práticos de isolamento de serviços e comunicação entre containers.",
    "language": "HTML",
    "url": "https://github.com/MarcosGabrielDF/exercicio-container",
    "stars": 0,
    "updated": "2024-06-15",
    "category": "devops",
    "featured": false,
    "tags": ["Docker", "Containers"]
  },
  {
    "name": "Jogo-do-JP",
    "description": "Jogo web interativo construído com JavaScript nativo, implementando física de colisão, renderização e controle por teclado.",
    "language": "JavaScript",
    "url": "https://github.com/MarcosGabrielDF/Jogo-do-JP",
    "stars": 0,
    "updated": "2024-01-20",
    "category": "frontend",
    "featured": false,
    "tags": ["JavaScript", "Game Dev", "DOM", "Animação"]
  },
  {
    "name": "Relembrando-Python",
    "description": "Consolidação e revisão de conceitos fundamentais e avançados de Python.",
    "language": "Python",
    "url": "https://github.com/MarcosGabrielDF/Relembrando-Python",
    "stars": 0,
    "updated": "2026-03-03",
    "category": "dados",
    "featured": false,
    "tags": ["Python", "Prática"]
  },
  {
    "name": "Lamechas",
    "description": "Site institucional responsivo desenvolvido sob encomenda com design adaptável a dispositivos móveis.",
    "language": "HTML",
    "url": "https://github.com/MarcosGabrielDF/Lamechas",
    "stars": 0,
    "updated": "2026-02-25",
    "category": "frontend",
    "featured": false,
    "tags": ["HTML5", "CSS3", "Freelance"]
  },
  {
    "name": "site-jornal-etec",
    "description": "Portal de notícias e comunicação para a Etec de Palmital, integrando publicações dinâmicas e design responsivo.",
    "language": "HTML",
    "url": "https://github.com/MarcosGabrielDF/site-jornal-etec",
    "stars": 0,
    "updated": "2023-05-22",
    "category": "frontend",
    "featured": false,
    "tags": ["HTML5", "CSS3", "Etec", "Jornalismo"]
  },
  {
    "name": "login",
    "description": "Sistema de autenticação seguro em PHP com hash de senhas, validação de sessões e proteção contra SQL Injection.",
    "language": "PHP",
    "url": "https://github.com/MarcosGabrielDF/login",
    "stars": 0,
    "updated": "2022-10-16",
    "category": "backend",
    "featured": false,
    "tags": ["PHP", "Segurança", "Auth", "MySQL"]
  },
  {
    "name": "projeto-cordel",
    "description": "Página com efeitos visuais e efeito parallax estilizado apresentando a literatura de cordel brasileira.",
    "language": "HTML",
    "url": "https://github.com/MarcosGabrielDF/projeto-cordel",
    "stars": 0,
    "updated": "2023-08-12",
    "category": "frontend",
    "featured": false,
    "tags": ["CSS Parallax", "HTML5", "Cultura"]
  },
  {
    "name": "projeto-android",
    "description": "Interface web inspirada na evolução do sistema operacional Android com animações interativas.",
    "language": "HTML",
    "url": "https://github.com/MarcosGabrielDF/projeto-android",
    "stars": 0,
    "updated": "2022-08-23",
    "category": "frontend",
    "featured": false,
    "tags": ["Design", "CSS3", "Responsividade"]
  },
  {
    "name": "cursoJS",
    "description": "Exercícios e desafios práticos de JavaScript moderno cobrindo manipulação do DOM e assincronismo.",
    "language": "JavaScript",
    "url": "https://github.com/MarcosGabrielDF/cursoJS",
    "stars": 0,
    "updated": "2022-08-09",
    "category": "frontend",
    "featured": false,
    "tags": ["JavaScript", "DOM", "ES6+"]
  }
];

// Current filter and search states
let currentCategory = 'all';
let currentSearch = '';
let showAllRepos = false;
const INITIAL_REPOS_LIMIT = 6;

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initVanillaTilt();
    renderRepositories();
    initFiltersAndSearch();
    initMobileMenu();
    initNavbarScroll();
    initClipboard();
    fetchLiveGitHubStats();

    // Re-initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

/**
 * Typewriter effect for Hero section
 */
function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const phrases = [
        "Estudante de Ciência de Dados (Fatec Ourinhos)",
        "Desenvolvedor Backend (Python & PHP Slim)",
        "Especialista em Automações IoT (Shelly 1PM)",
        "DevOps & Conteinerização com Docker",
        "Construindo Soluções de Alta Performance"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2200; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/**
 * Initialize VanillaTilt 3D physics on cards
 */
function initVanillaTilt() {
    if (typeof VanillaTilt === 'undefined') return;

    // Apply tilt to cards with 3D depth
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 12,
        speed: 400,
        glare: true,
        'max-glare': 0.22,
        scale: 1.02,
        perspective: 1000,
        gyroscope: true
    });

    // Subtler tilt on hero interactive element
    VanillaTilt.init(document.querySelectorAll('.hero-card-3d'), {
        max: 8,
        speed: 600,
        glare: true,
        'max-glare': 0.15,
        perspective: 1200
    });
}

/**
 * Filter and search repositories
 */
function getFilteredRepositories() {
    return REPOS_DATA.filter(repo => {
        // Category filter
        const matchCategory = currentCategory === 'all' || repo.category === currentCategory;

        // Search filter
        const query = currentSearch.toLowerCase().trim();
        const matchSearch = !query || 
            repo.name.toLowerCase().includes(query) ||
            repo.description.toLowerCase().includes(query) ||
            repo.language.toLowerCase().includes(query) ||
            (repo.tags && repo.tags.some(t => t.toLowerCase().includes(query)));

        return matchCategory && matchSearch;
    });
}

/**
 * Render Repositories in the Grid
 */
function renderRepositories() {
    const container = document.getElementById('repos-grid');
    const countBadge = document.getElementById('repo-count-badge');
    const toggleBtn = document.getElementById('toggle-all-repos');
    if (!container) return;

    const filtered = getFilteredRepositories();

    if (countBadge) {
        countBadge.textContent = `${filtered.length} projetos encontrados`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-repos-state">
                <div class="empty-icon"><i data-lucide="search-x"></i></div>
                <h3>Nenhum repositório encontrado</h3>
                <p>Tente ajustar sua busca ou selecionar outra categoria.</p>
                <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Limpar Filtros</button>
            </div>
        `;
        if (toggleBtn) toggleBtn.style.display = 'none';
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    const itemsToDisplay = showAllRepos ? filtered : filtered.slice(0, INITIAL_REPOS_LIMIT);

    container.innerHTML = itemsToDisplay.map(repo => {
        const langColor = getLanguageColor(repo.language);
        const tagsHtml = (repo.tags || [repo.language]).map(tag => 
            `<span class="tag-pill">${tag}</span>`
        ).join('');

        return `
            <div class="repo-card tilt-card" data-category="${repo.category}">
                <div class="repo-card-inner">
                    <div class="repo-card-header">
                        <div class="repo-type-icon">
                            <i data-lucide="${getCategoryIcon(repo.category)}"></i>
                        </div>
                        <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-external-link" title="Ver no GitHub">
                            <i data-lucide="external-link"></i>
                        </a>
                    </div>
                    <h3 class="repo-title">
                        <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                    </h3>
                    <p class="repo-description">${repo.description}</p>
                    <div class="repo-tags-wrapper">
                        ${tagsHtml}
                    </div>
                    <div class="repo-card-footer">
                        <div class="repo-lang">
                            <span class="lang-dot" style="background-color: ${langColor};"></span>
                            <span>${repo.language}</span>
                        </div>
                        <div class="repo-meta-right">
                            ${repo.stars > 0 ? `
                                <span class="repo-stars">
                                    <i data-lucide="star"></i> ${repo.stars}
                                </span>
                            ` : ''}
                            <span class="repo-date">${formatDate(repo.updated)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Toggle button visibility & label
    if (toggleBtn) {
        if (filtered.length <= INITIAL_REPOS_LIMIT) {
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'inline-flex';
            toggleBtn.innerHTML = showAllRepos 
                ? `<span>Ver Menos Projetos</span> <i data-lucide="chevron-up"></i>` 
                : `<span>Ver Todos (${filtered.length})</span> <i data-lucide="chevron-down"></i>`;
        }
    }

    // Initialize Tilt on newly rendered cards
    initVanillaTilt();

    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Reset filters helper
 */
window.resetFilters = function() {
    currentCategory = 'all';
    currentSearch = '';
    const searchInput = document.getElementById('repo-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
    });

    renderRepositories();
};

/**
 * Filter & Search event listeners
 */
function initFiltersAndSearch() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category || 'all';
            showAllRepos = false;
            renderRepositories();
        });
    });

    const searchInput = document.getElementById('repo-search-input');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                currentSearch = e.target.value;
                showAllRepos = false;
                renderRepositories();
            }, 200);
        });
    }

    const toggleBtn = document.getElementById('toggle-all-repos');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            showAllRepos = !showAllRepos;
            renderRepositories();
            if (!showAllRepos) {
                const target = document.getElementById('repos');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Language colors for badges
 */
function getLanguageColor(lang) {
    switch ((lang || '').toLowerCase()) {
        case 'python': return '#3572A5';
        case 'php': return '#4F5D95';
        case 'javascript': return '#f1e05a';
        case 'typescript': return '#3178c6';
        case 'shell': return '#89e051';
        case 'docker': return '#384d54';
        case 'html': return '#e34c26';
        case 'css': return '#563d7c';
        default: return '#00f5d4';
    }
}

/**
 * Category icons
 */
function getCategoryIcon(cat) {
    switch (cat) {
        case 'dados': return 'database';
        case 'backend': return 'server';
        case 'devops': return 'container';
        case 'iot': return 'cpu';
        case 'frontend': return 'layout';
        default: return 'folder-git-2';
    }
}

/**
 * Date formatting (e.g. "Ago 2026")
 */
function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length < 2) return dateStr;
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return `${months[monthNum - 1] || ''} ${year}`;
    } catch (e) {
        return dateStr;
    }
}

/**
 * Fetch Live GitHub Stats and optionally refresh repo stars
 */
async function fetchLiveGitHubStats() {
    try {
        const userResp = await fetch('https://api.github.com/users/MarcosGabrielDF');
        if (userResp.ok) {
            const userData = await userResp.json();
            const repoCounter = document.getElementById('stat-repos-count');
            if (repoCounter && userData.public_repos) {
                repoCounter.textContent = `${userData.public_repos}+`;
            }
        }

        // Attempt to fetch fresh repos
        const reposResp = await fetch('https://api.github.com/users/MarcosGabrielDF/repos?per_page=100&sort=pushed');
        if (reposResp.ok) {
            const freshRepos = await reposResp.json();
            freshRepos.forEach(fresh => {
                const existing = REPOS_DATA.find(r => r.name.toLowerCase() === fresh.name.toLowerCase());
                if (existing) {
                    existing.stars = fresh.stargazers_count;
                    if (fresh.pushed_at) existing.updated = fresh.pushed_at.substring(0, 10);
                }
            });
            renderRepositories();
        }
    } catch (err) {
        // Quiet fallback to embedded data
        console.log('GitHub API live fetch skipped, using embedded data.');
    }
}

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('nav-links');
    const overlay = document.getElementById('menu-overlay');

    if (!toggle || !menu) return;

    function openMenu() {
        toggle.classList.add('active');
        menu.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close on navigation link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

/**
 * Navbar blur and scroll styling
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Copy to clipboard with toast
 */
function initClipboard() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.dataset.email || 'mgdiasfernandes@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast('E-mail copiado: ' + email);
            }).catch(() => {
                showToast('E-mail: ' + email);
            });
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
