/* Kubex 3D — Modelador 3D móvel inspirado no Blender */
(function () {
  "use strict";

  // --- Elementos DOM ---
  const container = document.getElementById("canvas-container");
  const panel = {
    name: document.getElementById("propName"),
    type: document.getElementById("propType"),
    locX: document.getElementById("pLocX"),
    locY: document.getElementById("pLocY"),
    locZ: document.getElementById("pLocZ"),
    rotX: document.getElementById("pRotX"),
    rotY: document.getElementById("pRotY"),
    rotZ: document.getElementById("pRotZ"),
    scaX: document.getElementById("pScaX"),
    scaY: document.getElementById("pScaY"),
    scaZ: document.getElementById("pScaZ"),
  };
  const toastEl = document.getElementById("toast");
  const modalAdd = document.getElementById("modalAdd");
  const btnCloseAdd = document.getElementById("btnCloseAdd");

  // --- Estado ---
  let selectedObject = null;
  let tool = "move"; // select | move | rotate | scale
  let isDragging = false;
  let dragStart = new THREE.Vector2();
  let dragPlane = new THREE.Plane();
  let dragPlaneNormal = new THREE.Vector3();
  let dragStartPos = new THREE.Vector3();
  let dragStartRot = new THREE.Euler();
  let dragStartSca = new THREE.Vector3();
  let pointerId = null;

  // --- Cena Three.js ---
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1;
  controls.maxDistance = 40;

  // Luzes (branco)
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);
  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight2.position.set(-5, -5, -5);
  scene.add(dirLight2);

  // Grade no chão (estilo Blender)
  const grid = new THREE.GridHelper(40, 40, 0x444444, 0x222222);
  grid.position.y = 0;
  scene.add(grid);

  // Círculo de orientação no centro
  const centerRing = new THREE.RingGeometry(0.05, 0.07, 32);
  const centerRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const centerRingMesh = new THREE.Mesh(centerRing, centerRingMat);
  centerRingMesh.rotation.x = -Math.PI / 2;
  centerRingMesh.renderOrder = 2;
  scene.add(centerRingMesh);

  // Materiais
  const matDefault = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, metalness: 0.15 });
  const matSelected = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x333333, roughness: 0.35, metalness: 0.2 });

  // Objetos da cena
  const objects = [];

  function createObject(type) {
    let geometry;
    switch (type) {
      case "box": geometry = new THREE.BoxGeometry(1, 1, 1); break;
      case "sphere": geometry = new THREE.SphereGeometry(0.5, 32, 32); break;
      case "cylinder": geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32); break;
      case "cone": geometry = new THREE.ConeGeometry(0.5, 1, 32); break;
      case "torus": geometry = new THREE.TorusGeometry(0.4, 0.15, 32, 64); break;
      default: geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    const mesh = new THREE.Mesh(geometry, matDefault.clone());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { type, name: type.charAt(0).toUpperCase() + type.slice(1), color: 0xffffff };
    scene.add(mesh);
    objects.push(mesh);

    // Posiciona um pouco acima do chão
    mesh.position.y = 0.5;
    if (type === "torus") mesh.position.y = 0.3;
    selectObject(mesh);
    return mesh;
  }

  // --- Seleção ---
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function selectObject(mesh) {
    if (selectedObject === mesh) return;
    selectedObject = mesh;
    objects.forEach((o) => {
      o.material.emissive.setHex(o === mesh ? 0x333333 : 0x000000);
    });
    updatePanel();
    toast(selectedObject ? "Selecionado: " + selectedObject.userData.name : "Nenhum objeto selecionado");
  }

  function deleteSelected() {
    if (!selectedObject) return;
    scene.remove(selectedObject);
    const idx = objects.indexOf(selectedObject);
    if (idx !== -1) objects.splice(idx, 1);
    selectedObject = null;
    updatePanel();
    toast("Objeto excluído");
  }

  // --- Painel de propriedades ---
  function updatePanel() {
    if (!selectedObject) {
      panel.name.value = "";
      panel.type.textContent = "-";
      [panel.locX, panel.locY, panel.locZ, panel.rotX, panel.rotY, panel.rotZ, panel.scaX, panel.scaY, panel.scaZ].forEach((i) => (i.value = ""));
      return;
    }
    const o = selectedObject;
    panel.name.value = o.userData.name;
    panel.type.textContent = o.userData.type.toUpperCase();
    panel.locX.value = o.position.x.toFixed(2);
    panel.locY.value = o.position.y.toFixed(2);
    panel.locZ.value = o.position.z.toFixed(2);
    panel.rotX.value = THREE.MathUtils.radToDeg(o.rotation.x).toFixed(1);
    panel.rotY.value = THREE.MathUtils.radToDeg(o.rotation.y).toFixed(1);
    panel.rotZ.value = THREE.MathUtils.radToDeg(o.rotation.z).toFixed(1);
    panel.scaX.value = o.scale.x.toFixed(2);
    panel.scaY.value = o.scale.y.toFixed(2);
    panel.scaZ.value = o.scale.z.toFixed(2);
  }

  function applyPanel() {
    if (!selectedObject) return;
    selectedObject.position.set(parseFloat(panel.locX.value || 0), parseFloat(panel.locY.value || 0), parseFloat(panel.locZ.value || 0));
    selectedObject.rotation.set(
      THREE.MathUtils.degToRad(parseFloat(panel.rotX.value || 0)),
      THREE.MathUtils.degToRad(parseFloat(panel.rotY.value || 0)),
      THREE.MathUtils.degToRad(parseFloat(panel.rotZ.value || 0))
    );
    selectedObject.scale.set(parseFloat(panel.scaX.value || 1), parseFloat(panel.scaY.value || 1), parseFloat(panel.scaZ.value || 1));
  }

  Object.values(panel).forEach((input) => {
    input.addEventListener("change", applyPanel);
    input.addEventListener("input", applyPanel);
  });

  // --- Ferramentas ---
  const toolBtns = document.querySelectorAll(".tool");
  function setTool(t) {
    tool = t;
    toolBtns.forEach((b) => b.classList.toggle("active", b.dataset.tool === t));
    controls.enabled = t === "select";
    if (selectedObject) toast("Ferramenta: " + t.toUpperCase());
  }
  toolBtns.forEach((b) => b.addEventListener("click", () => setTool(b.dataset.tool));

  document.getElementById("btnAddCube").addEventListener("click", () => {
    modalAdd.classList.add("show");
  });
  document.getElementById("btnDelete").addEventListener("click", deleteSelected);

  btnCloseAdd.addEventListener("click", () => modalAdd.classList.remove("show"));
  modalAdd.addEventListener("click", (e) => { if (e.target === modalAdd) modalAdd.classList.remove("show"); });
  document.querySelectorAll(".add-opt").forEach((b) => b.addEventListener("click", () => {
    createObject(b.dataset.type);
    modalAdd.classList.remove("show");
  }));

  // --- Toast ---
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }

  // --- Interação (pointer) ---
  function getPointerPos(e) {
    const t = e.changedTouches ? e.changedTouches[0] : e;
    return { x: t.clientX, y: t.clientY, id: e.pointerId !== undefined ? e.pointerId : t.identifier };
  }

  function onPointerDown(e) {
    e.preventDefault();
    const p = getPointerPos(e);
    pointerId = p.id;
    dragStart.set(p.x, p.y);

    if (tool === "select") {
      rayFromPointer(p.x, p.y);
      const intersects = raycaster.intersectObjects(objects);
      if (intersects.length > 0) {
        selectObject(intersects[0].object);
        controls.enabled = false;
      } else {
        selectObject(null);
        controls.enabled = true;
      }
      return;
    }

    if (!selectedObject) return;
    isDragging = true;
    dragStartPos.copy(selectedObject.position);
    dragStartRot.copy(selectedObject.rotation);
    dragStartSca.copy(selectedObject.scale);

    // Plano de arrasto perpendicular à direção da câmera
    dragPlaneNormal.copy(camera.position).sub(new THREE.Vector3(0, 0, 0)).normalize();
    dragPlane.setFromNormalAndCoplanarPoint(dragPlaneNormal, selectedObject.position);

    toast(tool.toUpperCase() + " ativo");
  }

  function onPointerMove(e) {
    if (!isDragging && tool !== "select") return;
    const p = getPointerPos(e);
    const dx = p.x - dragStart.x;
    const dy = p.y - dragStart.y;

    if (tool === "select") return;

    if (tool === "move") {
      moveOnPlane(selectedObject, dragStartPos, dx, dy);
    } else if (tool === "rotate") {
      selectedObject.rotation.copy(dragStartRot);
      selectedObject.rotateX(dy * 0.005);
      selectedObject.rotateY(dx * 0.005);
    } else if (tool === "scale") {
      const s = 1 + (dx - dy) * 0.005;
      selectedObject.scale.copy(dragStartSca).multiplyScalar(Math.max(0.01, s));
    }
    updatePanel();
  }

  function onPointerUp(e) {
    if (e.changedTouches) {
      const found = e.changedTouches.some((t) => t.identifier === pointerId);
      if (!found) return;
    }
    isDragging = false;
    pointerId = null;
    if (tool === "select") controls.enabled = true;
  }

  function rayFromPointer(x, y) {
    pointer.x = (x / window.innerWidth) * 2 - 1;
    pointer.y = -(y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
  }

  function moveOnPlane(obj, startPos, dx, dy) {
    // Converte movimento da tela em movimento no plano de arrasto
    const worldStart = new THREE.Vector3();
    const worldEnd = new THREE.Vector3();
    const raycaster2 = new THREE.Raycaster();
    const pointer2 = new THREE.Vector2();

    // Ponto inicial (onde começou o drag) projetado no plano
    pointer2.set(
      (dragStart.x / window.innerWidth) * 2 - 1,
      -(dragStart.y / window.innerHeight) * 2 + 1
    );
    raycaster2.setFromCamera(pointer2, camera);
    raycaster2.ray.intersectPlane(dragPlane, worldStart);

    // Ponto final (posição atual do pointer)
    pointer2.set(
      (dragStart.x / window.innerWidth) * 2 - 1,
      -(dragStart.y / window.innerHeight) * 2 + 1
    );
    // Usamos delta: reproject a partir da posição atual do mouse
    const mx = (dragStart.x / window.innerWidth) * 2 - 1;
    const my = -(dragStart.y / window.innerHeight) * 2 + 1;
    // Simples: mover com base no desvio do mouse em relação ao plano da câmera
    // Recalcula raio na posição atual do ponteiro
    pointer2.set(
      ((dragStart.x + dx) / window.innerWidth) * 2 - 1,
      -((dragStart.y + dy) / window.innerHeight) * 2 + 1
    );
    raycaster2.setFromCamera(pointer2, camera);
    raycaster2.ray.intersectPlane(dragPlane, worldEnd);

    const delta = new THREE.Vector3().subVectors(worldEnd, worldStart);
    obj.position.copy(startPos).add(delta);
    // Mantém na altura do chão se quiser (opcional). Deixamos livre.
  }

  // Listeners unificados
  window.addEventListener("pointerdown", onPointerDown, { passive: false });
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  // Também suporte mouse para desktop
  window.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  // --- Resize ---
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Inicializa com um cubo
  createObject("box");

  // --- Loop de animação ---
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  toast("Kubex 3D pronto — toque no cubo para selecionar");

})();
