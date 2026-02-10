// Lista com NOMES COMPLETOS e os ARQUIVOS DE IMAGEM locais
const projects = [
    { title: "MAPA GEOELÉTRICO DO PIAUÍ", url: "https://sumer-seplan.github.io/QGIS_ENERGIA/", imgFile: "energia_pi.png" },
    { title: "MAPA DE MINERAÇÃO DO PIAUÍ", url: "https://sumer-seplan.github.io/QGIS_MINERACAO/", imgFile: "mineracao_pi.png" },
    { title: "ATLAS RECURSOS HÍDRICOS", url: "https://sumer-seplan.github.io/QGIS_HIDRICO/", imgFile: "hidrico_pi.png" },
    { title: "MAPA AGRÍCOLA DO PIAUÍ", url: "https://sumer-seplan.github.io/QGIS_AGRO/", imgFile: "agricola_pi.png" },
    { title: "RESÍDUOS SÓLIDOS", url: "https://sumer-seplan.github.io/QGIS_RESIDUOS/", imgFile: "residuos_pi.png" },
    { title: "MAPA DE OBRAS", url: "https://sumer-seplan.github.io/QGIS_OBRAS/", imgFile: "obras_pi.png" },
    { title: "POLÍTICA DESENV. RURAL", url: "https://sumer-seplan.github.io/QGIS_POLI_DES_RURAL/", imgFile: "politica_desv_rural.png" },
    { title: "MAPA DE TURISMO DO PIAUÍ", url: "https://sumer-seplan.github.io/QGIS_TURISMO/", imgFile: "turismo_pi.png" },
    { title: "GEOELÉTRICO DE SERGIPE", url: "https://sumer-seplan.github.io/QGIS_ENERGIA_SE", imgFile: "energia_se.png" },
    { title: "MINERAÇÃO DE SERGIPE", url: "https://sumer-seplan.github.io/QGIS_MINERACAO_SE/", imgFile: "mineracao_se.png" }
];

const leftStack = document.getElementById('left-stack');
const rightStack = document.getElementById('right-stack');
const mapFrame = document.getElementById('map-frame');
const bgLayer = document.getElementById('bg-layer');

let currentIndex = 0;

function renderTabs() {
    leftStack.innerHTML = '';
    rightStack.innerHTML = '';

    projects.forEach((project, index) => {
        const btn = document.createElement('div');
        btn.className = 'tab-button';
        
        if (index === currentIndex) {
            btn.classList.add('active');
        }

        btn.innerHTML = `<span>${project.title}</span>`;
        btn.onclick = () => updateSelection(index);

        if (index <= currentIndex) {
            leftStack.appendChild(btn);
        } else {
            rightStack.appendChild(btn);
        }
    });
}

function updateSelection(index) {
    if (index === currentIndex) return;

    currentIndex = index;
    renderTabs();
    // Passa o nome do arquivo para a função
    changeBackground(projects[index].imgFile);
    
    // Pequeno delay no iframe para suavizar a troca
    mapFrame.style.opacity = '0.5';
    setTimeout(() => {
        mapFrame.src = projects[index].url;
        setTimeout(() => mapFrame.style.opacity = '1', 300);
    }, 200);
}

// --- FUNÇÃO DE TRANSIÇÃO DO BACKGROUND (Para imagens locais) ---
function changeBackground(filename) {
    // 1. Embaça a imagem atual
    bgLayer.classList.add('blur-effect');

    // 2. Espera o tempo do blur (sincronizado com o CSS)
    setTimeout(() => {
        // Constrói o caminho correto para a sua pasta local
        const newImagePath = `imagens/${filename}`;
        
        // Mantemos o pré-carregador para garantir que a imagem
        // esteja pronta antes de ser exibida, evitando piscas.
        const imgLoader = new Image();
        imgLoader.onload = () => {
            // Aplica a nova imagem
            bgLayer.style.backgroundImage = `url('${newImagePath}')`;
            // 3. Remove o embaçado para mostrar a nova imagem nitidamente
            bgLayer.classList.remove('blur-effect');
        };
        // Se der erro ao carregar a imagem (caminho errado), avisa no console
        imgLoader.onerror = () => {
             console.error("Erro ao carregar imagem:", newImagePath);
             bgLayer.classList.remove('blur-effect'); // Remove blur mesmo com erro
        }
        imgLoader.src = newImagePath;
        
    }, 400); // Tempo do efeito de blur
}

// --- FUNÇÃO DE TELA CHEIA ---
function toggleFullscreen() {
    const mapArea = document.getElementById('map-area');
    const iconExpand = document.getElementById('icon-expand');
    const iconCompress = document.getElementById('icon-compress');
    const btn = document.getElementById('btn-fullscreen');

    mapArea.classList.toggle('map-fullscreen');
    const isFullscreen = mapArea.classList.contains('map-fullscreen');

    if (isFullscreen) {
        iconExpand.style.display = 'none';
        iconCompress.style.display = 'block';
        btn.title = "Sair da Tela Cheia";
    } else {
        iconExpand.style.display = 'block';
        iconCompress.style.display = 'none';
        btn.title = "Tela Cheia";
    }
}

// Inicializa
renderTabs();
mapFrame.src = projects[0].url;

// Carrega a primeira imagem local imediatamente
const initialImagePath = `imagens/${projects[0].imgFile}`;
bgLayer.style.backgroundImage = `url('${initialImagePath}')`;