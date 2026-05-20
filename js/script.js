const canvas = document.getElementById('circuitos');
const ctx = canvas.getContext('2d');

function resize() {
  const wrapper = document.querySelector('.page-wrapper');
  if (wrapper) {
    // El ancho sigue siendo el de la ventana
    canvas.width = window.innerWidth;
    // El alto ahora es el del contenedor completo (Hero + Frase)
    canvas.height = wrapper.offsetHeight;
  } else {
    // Por si acaso no encuentra el wrapper, usa el alto normal
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}
window.addEventListener('resize', resize);
resize();

const nodes = [];
const nodeCount = 120;

// Crear nodos
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: 2 + Math.random() * 2
  });          
}

function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        let opacity = 1 - dist / 120;

        ctx.strokeStyle = `rgba(192,132,252,${opacity})`; 
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawConnections();

  nodes.forEach(n => {
    // Dibujar nodo
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#d03ad883";
    ctx.fill();

    // Movimiento
    n.x += n.vx;
    n.y += n.vy;

    // Rebote
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  });

  requestAnimationFrame(animate);
}

animate();


// DESPLEGAR INFORMACIÓN DE ROLES
function toggleRol(card) {
  // Cierra las demás tarjetas
  document.querySelectorAll(".rol-card").forEach(c => {
    if (c !== card) {
      c.classList.remove("activo");
    }
  });

  // Alterna la tarjeta seleccionada
  card.classList.toggle("activo");
}