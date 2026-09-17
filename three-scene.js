/**
 * Three.js 3D Interactive Visualizations
 * Marcos Gabriel Dias Fernandes - Data Science & Full Stack Portfolio
 */

// Global state for 3D scenes
let bgScene, bgCamera, bgRenderer, bgParticles, bgMeshGrid;
let heroScene, heroCamera, heroRenderer, heroGroup;
let isHeroDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let heroTargetRotation = { x: 0.25, y: 0.4 };
let heroCurrentRotation = { x: 0.25, y: 0.4 };
let heroRotationSpeed = 0.006;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundCanvas();
    initHero3DObject();
    setup3DEventListeners();
});

/**
 * Fullscreen Interactive 3D Cosmic Particle & Data Grid Background
 */
function initBackgroundCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    bgScene = new THREE.Scene();
    bgScene.fog = new THREE.FogExp2(0x070913, 0.0012);

    bgCamera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        2000
    );
    bgCamera.position.z = 700;

    bgRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Cloud (Data Nodes)
    const particleCount = window.innerWidth < 768 ? 900 : 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color(0x00f5d4), // Cyan
        new THREE.Color(0x8b5cf6), // Violet
        new THREE.Color(0x3b82f6), // Blue
        new THREE.Color(0x06b6d4), // Light Cyan
        new THREE.Color(0xec4899)  // Pink
    ];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 300 + Math.random() * 1100;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.7;

        positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i3 + 1] = radius * Math.sin(phi) * 0.6 + (Math.random() - 0.5) * 200;
        positions[i3 + 2] = radius * Math.cos(theta) * Math.cos(phi);

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = chosenColor.r;
        colors[i3 + 1] = chosenColor.g;
        colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular glowing particle texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,245,212,0.8)');
    grad.addColorStop(0.8, 'rgba(139,92,246,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
        size: 5,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    bgParticles = new THREE.Points(geometry, material);
    bgScene.add(bgParticles);

    // 3D Wireframe Cyber Grid Plane in the horizon
    const gridGeometry = new THREE.PlaneGeometry(2400, 2400, 32, 32);
    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    bgMeshGrid = new THREE.Mesh(gridGeometry, gridMaterial);
    bgMeshGrid.rotation.x = -Math.PI / 2.3;
    bgMeshGrid.position.y = -350;
    bgScene.add(bgMeshGrid);

    // Render loop for Background
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    });

    function animateBackground() {
        requestAnimationFrame(animateBackground);
        const scrollY = window.scrollY || window.pageYOffset;

        if (bgParticles) {
            bgParticles.rotation.y += 0.0006;
            bgParticles.rotation.x += 0.0002;
        }

        if (bgMeshGrid) {
            bgMeshGrid.position.z = (scrollY * 0.2) % 100;
        }

        bgCamera.position.x += (mouseX - bgCamera.position.x) * 0.03;
        bgCamera.position.y += (-mouseY - scrollY * 0.35 - bgCamera.position.y) * 0.03;
        bgCamera.lookAt(0, -scrollY * 0.3, 0);

        bgRenderer.render(bgScene, bgCamera);
    }

    animateBackground();
}

/**
 * 3D Futuristic Quantum Atom in the Hero Section
 * Fully contained and scaled with ample margins so it is NEVER cut off!
 */
function initHero3DObject() {
    const container = document.getElementById('hero-3d-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    heroScene = new THREE.Scene();
    
    // Perspective camera positioned with generous distance (z = 5.8) to guarantee NO clipping
    heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    heroCamera.position.z = 5.8;

    heroRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    heroRenderer.setSize(width, height);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(heroRenderer.domElement);

    heroGroup = new THREE.Group();
    heroScene.add(heroGroup);

    // ----------------------------------------------------
    // 1. ATOMIC NUCLEUS (Proton/Neutron Quantum Energy Core)
    // ----------------------------------------------------
    const nucleusGroup = new THREE.Group();
    heroGroup.add(nucleusGroup);

    // Inner glowing sphere
    const coreSphereGeom = new THREE.SphereGeometry(0.55, 32, 32);
    const coreSphereMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        emissive: 0x00c4a7,
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.85
    });
    const coreSphere = new THREE.Mesh(coreSphereGeom, coreSphereMat);
    nucleusGroup.add(coreSphere);

    // Outer faceted geometric cage (wireframe icosahedron)
    const cageGeom = new THREE.IcosahedronGeometry(0.85, 1);
    const cageMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        emissive: 0x6d28d9,
        emissiveIntensity: 0.5,
        roughness: 0.2
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageMat);
    nucleusGroup.add(cageMesh);

    // ----------------------------------------------------
    // 2. ATOMIC ORBITAL RINGS (3 Classical Quantum Ellipses)
    // Atom radius is 1.65 max, with camera at z=5.8 this fits perfectly!
    // ----------------------------------------------------
    const orbitRadius = 1.65;
    const orbitTube = 0.018;

    // Ring 1: Cyan Orbit (tilted 60 deg X)
    const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        transparent: true,
        opacity: 0.75
    });
    const ringGeom1 = new THREE.TorusGeometry(orbitRadius, orbitTube, 16, 120);
    const orbit1 = new THREE.Mesh(ringGeom1, ringMat1);
    orbit1.rotation.x = Math.PI / 3;
    orbit1.rotation.y = Math.PI / 6;
    heroGroup.add(orbit1);

    // Ring 2: Electric Violet Orbit (tilted -60 deg X, 45 deg Y)
    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.75
    });
    const ringGeom2 = new THREE.TorusGeometry(orbitRadius, orbitTube, 16, 120);
    const orbit2 = new THREE.Mesh(ringGeom2, ringMat2);
    orbit2.rotation.x = -Math.PI / 3;
    orbit2.rotation.y = -Math.PI / 5;
    heroGroup.add(orbit2);

    // Ring 3: Neon Pink Orbit (orthogonal tilt)
    const ringMat3 = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.7
    });
    const ringGeom3 = new THREE.TorusGeometry(orbitRadius, orbitTube, 16, 120);
    const orbit3 = new THREE.Mesh(ringGeom3, ringMat3);
    orbit3.rotation.y = Math.PI / 2;
    orbit3.rotation.z = Math.PI / 4;
    heroGroup.add(orbit3);

    // Outer faint stabilizer ring
    const ringMatOuter = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35,
        wireframe: true
    });
    const ringGeomOuter = new THREE.TorusGeometry(orbitRadius * 1.08, 0.01, 16, 90);
    const orbitOuter = new THREE.Mesh(ringGeomOuter, ringMatOuter);
    heroGroup.add(orbitOuter);

    // ----------------------------------------------------
    // 3. ORBITING ELECTRONS (High-speed energy nodes)
    // ----------------------------------------------------
    const electronGeom = new THREE.SphereGeometry(0.09, 16, 16);

    // Electron 1 (on Orbit 1)
    const eMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
    const electron1 = new THREE.Mesh(electronGeom, eMat1);
    orbit1.add(electron1);

    // Electron 2 (on Orbit 2)
    const eMat2 = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const electron2 = new THREE.Mesh(electronGeom, eMat2);
    orbit2.add(electron2);

    // Electron 3 (on Orbit 3)
    const eMat3 = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
    const electron3 = new THREE.Mesh(electronGeom, eMat3);
    orbit3.add(electron3);

    // Electron 4 (counter-electron on Orbit 1)
    const eMat4 = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const electron4 = new THREE.Mesh(electronGeom, eMat4);
    orbit1.add(electron4);

    // ----------------------------------------------------
    // 4. LIGHT SOURCES
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    heroScene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5d4, 3, 15);
    cyanLight.position.set(3, 4, 3);
    heroScene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3, 15);
    violetLight.position.set(-3, -3, 3);
    heroScene.add(violetLight);

    // ----------------------------------------------------
    // 5. MOUSE & TOUCH INTERACTION (DRAG TO ROTATE ATOM)
    // ----------------------------------------------------
    const domEl = heroRenderer.domElement;
    domEl.style.cursor = 'grab';

    domEl.addEventListener('mousedown', (e) => {
        isHeroDragging = true;
        domEl.style.cursor = 'grabbing';
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
        if (!isHeroDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        heroTargetRotation.y += deltaX * 0.007;
        heroTargetRotation.x += deltaY * 0.007;

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
        if (isHeroDragging) {
            isHeroDragging = false;
            domEl.style.cursor = 'grab';
        }
    });

    // Touch support for mobile devices
    domEl.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isHeroDragging = true;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isHeroDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        heroTargetRotation.y += deltaX * 0.007;
        heroTargetRotation.x += deltaY * 0.007;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isHeroDragging = false;
    });

    // Hover acceleration
    container.addEventListener('mouseenter', () => {
        heroRotationSpeed = 0.014;
    });
    container.addEventListener('mouseleave', () => {
        heroRotationSpeed = 0.006;
    });

    // ----------------------------------------------------
    // 6. ANIMATION LOOP
    // ----------------------------------------------------
    let clock = new THREE.Clock();
    let angle1 = 0, angle2 = Math.PI, angle3 = Math.PI / 2, angle4 = Math.PI * 1.5;

    function animateHero() {
        requestAnimationFrame(animateHero);
        const elapsedTime = clock.getElapsedTime();

        // Continuous natural rotation + drag lerp
        if (!isHeroDragging) {
            heroTargetRotation.y += heroRotationSpeed;
            heroTargetRotation.x += heroRotationSpeed * 0.35;
        }

        heroCurrentRotation.x += (heroTargetRotation.x - heroCurrentRotation.x) * 0.08;
        heroCurrentRotation.y += (heroTargetRotation.y - heroCurrentRotation.y) * 0.08;

        heroGroup.rotation.x = heroCurrentRotation.x;
        heroGroup.rotation.y = heroCurrentRotation.y;

        // Individual orbital ring rotations
        orbit1.rotation.z += 0.005;
        orbit2.rotation.z -= 0.006;
        orbit3.rotation.x += 0.004;
        orbitOuter.rotation.z += 0.002;

        // Nucleus energy pulsing
        const pulse = 1 + Math.sin(elapsedTime * 3) * 0.06;
        coreSphere.scale.set(pulse, pulse, pulse);
        cageMesh.rotation.y += 0.008;
        cageMesh.rotation.z += 0.004;

        // Orbiting electrons positions along circular paths
        const speed1 = 0.045;
        const speed2 = 0.038;
        const speed3 = 0.042;

        angle1 += speed1;
        angle2 += speed2;
        angle3 += speed3;
        angle4 += speed1;

        electron1.position.set(Math.cos(angle1) * orbitRadius, Math.sin(angle1) * orbitRadius, 0);
        electron4.position.set(Math.cos(angle4) * orbitRadius, Math.sin(angle4) * orbitRadius, 0);
        electron2.position.set(Math.cos(angle2) * orbitRadius, Math.sin(angle2) * orbitRadius, 0);
        electron3.position.set(Math.cos(angle3) * orbitRadius, Math.sin(angle3) * orbitRadius, 0);

        heroRenderer.render(heroScene, heroCamera);
    }

    animateHero();
}

/**
 * Handle Window Resize for 3D elements
 */
function setup3DEventListeners() {
    window.addEventListener('resize', () => {
        if (bgCamera && bgRenderer) {
            bgCamera.aspect = window.innerWidth / window.innerHeight;
            bgCamera.updateProjectionMatrix();
            bgRenderer.setSize(window.innerWidth, window.innerHeight);
        }

        const container = document.getElementById('hero-3d-canvas-container');
        if (container && heroCamera && heroRenderer) {
            const width = container.clientWidth || 460;
            const height = container.clientHeight || 460;
            heroCamera.aspect = width / height;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(width, height);
        }
    });
}
