//==================================
//          TYPING EFFECT
//==================================

const tecnologias = [
    "Java",
    "Spring Boot",
    "REST APIs",
    "Spring Security",
    "MySQL",
    "Docker",
    "Microservicios"
];

let indiceTecnologia = 0;
let indiceLetra = 0;
let textoActual = "";
let borrando = false;

const elementoTyping = document.getElementById("typing");

function typingEffect() {

    if (!elementoTyping) return;

    const palabraActual = tecnologias[indiceTecnologia];

    if (!borrando) {

        textoActual = palabraActual.substring(0, indiceLetra + 1);
        elementoTyping.textContent = textoActual;
        indiceLetra++;

        if (indiceLetra === palabraActual.length) {

            borrando = true;
            setTimeout(typingEffect, 1800);
            return;

        }

    } else {

        textoActual = palabraActual.substring(0, indiceLetra - 1);
        elementoTyping.textContent = textoActual;
        indiceLetra--;

        if (indiceLetra === 0) {

            borrando = false;
            indiceTecnologia++;

            if (indiceTecnologia >= tecnologias.length) {
                indiceTecnologia = 0;
            }

        }

    }

    setTimeout(typingEffect, borrando ? 60 : 110);

}

typingEffect();


//==================================
//      SCROLL SUAVE (FALLBACK)
//==================================

document
    .querySelectorAll("a[href^='#']")
    .forEach((link) => {

        link.addEventListener("click", (e) => {

            const destino = document.querySelector(
                link.getAttribute("href")
            );

            if (!destino) return;

            e.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


//==================================
//          NAVBAR DINAMICA
//==================================

const navbar = document.getElementById("navbar");

function actualizarNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", actualizarNavbar);


//==================================
//          CONTADORES
//==================================

function animarContador(id, objetivo, velocidad = 40) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    let numero = 0;

    const incremento = Math.max(
        1,
        Math.ceil(objetivo / 80)
    );

    const intervalo = setInterval(() => {

        numero += incremento;

        if (numero >= objetivo) {

            numero = objetivo;
            clearInterval(intervalo);

        }

        elemento.textContent = `${numero}+`;

    }, velocidad);

}

let contadoresEjecutados = false;

function iniciarContadores() {

    if (contadoresEjecutados) return;

    animarContador("proyectos-contador", 15);
    animarContador("tecnologias-contador", 8);
    animarContador("apis-contador", 25);

    contadoresEjecutados = true;

}


//==================================
//      OBSERVER DE ANIMACIONES
//==================================

const elementosAnimados = document.querySelectorAll(".animacion");

const observer = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("show");

            // Iniciar contadores una sola vez
            if (!contadoresEjecutados) {

                iniciarContadores();

            }

        }

    });

}, {
    threshold: 0.15
});

elementosAnimados.forEach((elemento) => {

    observer.observe(elemento);

});


//==================================
//      BARRAS DE PROGRESO
//==================================

const progressBars = document.querySelectorAll(".progress-bar");

progressBars.forEach((barra) => {

    const porcentaje = barra.style.width;

    barra.style.width = "0%";

    setTimeout(() => {

        barra.style.width = porcentaje;

    }, 600);

});


//==================================
//      BOTON VOLVER ARRIBA
//==================================

const botonArriba = document.getElementById(
    "volver-arriba"
);

function actualizarBotonArriba() {

    if (!botonArriba) return;

    if (window.scrollY > 500) {

        botonArriba.classList.add("show");

    } else {

        botonArriba.classList.remove("show");

    }

}

window.addEventListener("scroll", actualizarBotonArriba);

if (botonArriba) {

    botonArriba.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


//==================================
//      EFECTO PARALLAX HERO
//==================================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const desplazamiento = window.scrollY * 0.25;

    hero.style.backgroundPositionY =
        `${desplazamiento}px`;

});


//==================================
//      FORMULARIO DE CONTACTO
//==================================

const formulario = document.getElementById(
    "formulario"
);

if (formulario) {

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        alert(
            "¡Gracias por tu mensaje! Me pondré en contacto contigo pronto."
        );

        formulario.reset();

    });

}


//==================================
//      EFECTO HOVER PROYECTOS
//==================================

const proyectos = document.querySelectorAll(
    ".proyecto"
);

proyectos.forEach((proyecto) => {

    proyecto.addEventListener("mouseenter", () => {

        proyecto.style.transition =
            "all .4s ease";

    });

});


//==================================
//      RESALTAR MENU ACTIVO
//==================================

const secciones = document.querySelectorAll("section");
const enlacesMenu = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let seccionActual = "";

    secciones.forEach((seccion) => {

        const posicion =
            seccion.offsetTop - 200;

        if (window.scrollY >= posicion) {

            seccionActual = seccion.getAttribute("id");

        }

    });

    enlacesMenu.forEach((enlace) => {

        enlace.classList.remove("active");

        if (
            enlace.getAttribute("href") ===
            `#${seccionActual}`
        ) {

            enlace.classList.add("active");

        }

    });

});


//==================================
//          INICIALIZACION
//==================================

actualizarNavbar();
actualizarBotonArriba();