/* =========================================

   LOGICA DEL SITIO - AROMA & GRANO

   Manipulación de estados SMACSS (is-*)

   ========================================= */



document.addEventListener('DOMContentLoaded', () => {

   

    // ---------------------------------------------

    

    // Objetivo: Añadir sombra cuando el usuario baja

    // ---------------------------------------------

    const header = document.querySelector('.l-header');



    window.addEventListener('scroll', () => {

        // Si bajamos más de 50px, añadimos la clase de estado

        if (window.scrollY > 50) {

            header.classList.add('is-scrolled');

        } else {

            header.classList.remove('is-scrolled');

        }

    });



    // ---------------------------------------------

    // 2. INTERACCIÓN BOTONES DE PEDIDO

    // Objetivo: Dar feedback visual al hacer clic

    // ---------------------------------------------

   

    // Seleccionamos todos los botones pequeños de las cards

    const orderButtons = document.querySelectorAll('.card .btn-small');



    orderButtons.forEach(btn => {

        btn.addEventListener('click', (e) => {

            const currentBtn = e.target;

            const originalText = currentBtn.innerText;



            // Evitamos que den clic muchas veces seguidas

            if(currentBtn.classList.contains('is-added')) return;



            // Cambiamos el estado visual

            currentBtn.classList.add('is-added');

            currentBtn.innerText = "¡Agregado! ✔";



            // Simulamos que pasaron 2 segundos y volvemos a la normalidad

            setTimeout(() => {

                currentBtn.classList.remove('is-added');

                currentBtn.innerText = originalText;

            }, 2000);

        });

    });



});



/// efecto alerta toast//
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-button');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const id = this.id;
            const servicio = this.querySelector('.service-name').innerText;
            const icono = this.querySelector('.card-image-container').parentNode.innerText.includes('☕') ? '☕' : 
                          id === 'reposteria-card' ? '🥐' : 
                          id === 'karaoke-card' ? '🎤' : '📖';

            // Definir clase de color según el ID
            let typeClass = '';
            if(id === 'especialidad-card') typeClass = 'toast-cafe';
            if(id === 'reposteria-card') typeClass = 'toast-reposteria';
            if(id === 'karaoke-card') typeClass = 'toast-karaoke';
            if(id === 'manga-card') typeClass = 'toast-manga';

            // Ejecutar la notificación
            showToast(`${icono} ¡Genial gran elección! Abriendo sección ${servicio}...`, typeClass);
            
            // Efecto visual de clic en la card
            this.style.transform = "scale(0.95)";
            setTimeout(() => this.style.transform = "", 150);
        });
    });
});

function showToast(message, typeClass) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.className = `custom-toast ${typeClass}`;
    toast.innerHTML = `<span>${message}</span>`;
    
    container.appendChild(toast);

    // Desaparecer después de 3 segundos
    setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}


function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



// formulario de reserva // 
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       FORMULARIO DE RESERVA
    ========================================= */

    const formulario = document.getElementById('form-reserva');
    const inputFecha = document.getElementById('fecha');
    const inputHora  = document.getElementById('hora');

    // Fecha mínima = hoy
    const hoy = new Date();
    const hoyFormateado = hoy.toISOString().split('T')[0];
    inputFecha.min = hoyFormateado;
    inputFecha.value = hoyFormateado;

    formulario.addEventListener('submit', (e) => {

        const fechaSeleccionada = new Date(inputFecha.value + 'T00:00:00');
        const dia = fechaSeleccionada.getDay(); // 0 = domingo, 1 = lunes

        // ❌ cerrado los lunes
        if (dia === 1) {
            e.preventDefault();
            alert("Lo sentimos, el restaurante permanece cerrado los lunes.");
            return;
        }

        // ❌ horario
        if (inputHora.value) {
            const [hora] = inputHora.value.split(':').map(Number);

            if (hora < 10 || hora >= 19) {
                e.preventDefault();
                alert("Horario de reservas: 10:00 a 19:00 hrs.");
                return;
            }
        }
    });

    /* =========================================
       EFECTO SCROLL HEADER
    ========================================= */

    const header = document.querySelector('.l-header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scrolled', window.scrollY > 50);
        });
    }

    /* =========================================
       BOTONES DE PEDIDO
    ========================================= */

    document.querySelectorAll('.card .btn-small').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-added')) return;

            const textoOriginal = btn.innerText;
            btn.classList.add('is-added');
            btn.innerText = "¡Agregado! ✔";

            setTimeout(() => {
                btn.classList.remove('is-added');
                btn.innerText = textoOriginal;
            }, 2000);
        });
    });

});
// fin formulario de reserva //



//Historia//
// Detectar cuando el elemento entra en pantalla
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.history-container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  // Estilo inicial para la animación
  container.style.opacity = "0";
  container.style.transform = "translateY(30px)";
  container.style.transition = "all 1s ease-out";

  observer.observe(container);
});

//fin de secciòn historia//

//Footer//
// Efecto simple para avisar que se sale del sitio (opcional)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.getAttribute('aria-label');
        console.log(`Redirigiendo a ${platform} de Tomioka Café...`);
        
        // Si tienes una función toast configurada, podrías usarla aquí:
        // showToast(`Abriendo ${platform}...`);
    });
});
//Fin del Footer//

// Inicio de opiniones//
const testimonials = [
    {
        name: "Shinobu",
        role: "La diosa",
        feedback: "Increíble atención a todos los detalles de la cafetería nunca pensé que sería tan linda, volveré luego.",
        stars: 5,
        img: "https://i.pinimg.com/736x/e4/61/5c/e4615cec0e441309da374106183f0b23.jpg"
    }
];

function loadTestimonials() {
    const container = document.getElementById('testimonial-container');
    
    testimonials.forEach(t => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="stars">${'★'.repeat(t.stars)}</div>
            <p class="feedback">"${t.feedback}"</p>
            <div class="client-info">
                <img src="${t.img}" alt="${t.name}">
                <div>
                    <span class="name">${t.name}</span>
                    <span class="role">${t.role}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Ejecutar al cargar la página
window.onload = loadTestimonials;
//Fin de opiniones//









// ===============================
// MAPA SUCURSALES - TEMUCO
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const centroTemuco = [-38.7359, -72.5904];

  const mapa = L.map('mapa-temuco').setView(centroTemuco, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  const sucursales = [
    {
      nombre: "Tomioka Centro",
      coords: [-38.7359, -72.5904]
    },
    {
      nombre: "Tomioka Av. Alemania",
      coords: [-38.7412, -72.6031]
    },
    {
      nombre: "Tomioka Portal Temuco",
      coords: [-38.7298, -72.5753]
    }
  ];

  sucursales.forEach(sucursal => {
    L.circleMarker(sucursal.coords, {
      radius: 8,
      color: "#d32f2f",
      fillColor: "#d32f2f",
      fillOpacity: 0.9
    })
    .addTo(mapa)
    .bindPopup(`
      <strong>${sucursal.nombre}</strong><br>
      📍 Temuco, Chile
    `);
  });

});

// menu de promociones y eventos //
document.addEventListener('DOMContentLoaded', () => {
    // ... tu código anterior ...

    // Lógica para las nuevas Promo Cards
    const promoButtons = document.querySelectorAll('.btn-promo');

    promoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Obtenemos el título de la card donde está el botón
            const titulo = this.parentElement.querySelector('.promo-title').innerText;
            
            // Elegimos un emoji según el título
            let emoji = '✨';
            if (titulo.includes('Reserva')) emoji = '📅';
            if (titulo.includes('Estudiantes')) emoji = '🎓';
            if (titulo.includes('Eventos')) emoji = '🎉';

            // Llamamos a tu función de Toast (la que ya creamos antes)
            // Usamos 'toast-cafe' por defecto o puedes crear una nueva clase en CSS
            showToast(`${emoji} ¡Perfecto! Redirigiendo a: ${titulo}`, 'toast-cafe');

            // Efecto visual de pulsación en el botón
            this.style.transform = "scale(0.9)";
            setTimeout(() => this.style.transform = "", 100);
        });
    });
});

// fin de menu de promociones y eventos // 



