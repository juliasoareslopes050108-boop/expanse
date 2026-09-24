/* =====================================================
   EXPANSE
   SCRIPT.JS
===================================================== */


/* =========================
   MENU MOBILE
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


/* =========================
   MÚSICA
========================= */

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let musicPlaying = false;


if (musicButton && music) {

    music.volume = 0.18;


    musicButton.addEventListener("click", async () => {

        if (!musicPlaying) {

            try {

                await music.play();

                musicPlaying = true;

                musicIcon.textContent = "♫";
                musicText.textContent = "Som ligado";

                musicButton.classList.add("music-playing");

            } catch (error) {

                musicText.textContent =
                    "Coloque expanse.mp3";

            }

        } else {

            music.pause();

            musicPlaying = false;

            musicIcon.textContent = "♫";
            musicText.textContent = "Ativar som";

            musicButton.classList.remove("music-playing");

        }

    });

}


/* =========================
   CARROSSEL
========================= */

const experiences = {

    aventura: {

        title: "Sinta a adrenalina.",

        description:
            "Paraquedismo e experiências que transformam um simples passeio em uma lembrança para a vida.",

        category: "AVENTURA",

        images: [
            "img/aventura1.jpg",
            "img/aventura2.jpg",
            "img/aventura3.jpg",
            "img/aventura4.jpg"
        ]

    },


    sabores: {

        title: "Descubra pelos sabores.",

        description:
            "Uma pausa para experimentar sabores e transformar cada parada em parte da viagem.",

        category: "SABORES",

        images: [
            "img/sabores1.jpg",
            "img/sabores2.jpg",
            "img/sabores3.jpg",
            "img/sabores4.jpg"
        ]

    },


    cultura: {

        title: "Conheça as histórias.",

        description:
            "Museus, patrimônio e lugares que ajudam a entender a identidade de Boituva.",

        category: "CULTURA",

        images: [
            "img/cultura1.jpg",
            "img/cultura2.jpg",
            "img/cultura3.jpg",
            "img/cultura4.jpg"
        ]

    },


    natureza: {

        title: "Respire Boituva.",

        description:
            "Natureza, tranquilidade e tempo para aproveitar cada paisagem com calma.",

        category: "NATUREZA",

        images: [
            "img/natureza1.jpg",
            "img/natureza2.jpg",
            "img/natureza3.jpg",
            "img/natureza4.jpg"
        ]

    }

};


let currentCategory = "aventura";
let currentIndex = 0;


const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryDescription =
    document.getElementById("galleryDescription");

const galleryCategory =
    document.getElementById("galleryCategory");

const currentImage =
    document.getElementById("currentImage");

const dots =
    document.querySelectorAll(".dot");

const nextImage =
    document.getElementById("nextImage");

const previousImage =
    document.getElementById("previousImage");


function updateGallery() {

    if (!galleryImage) return;

    const data = experiences[currentCategory];

    galleryImage.classList.add("changing");


    setTimeout(() => {

        galleryImage.src =
            data.images[currentIndex];

        galleryImage.alt =
            `${data.category} - imagem ${currentIndex + 1}`;

        galleryTitle.textContent =
            data.title;

        galleryDescription.textContent =
            data.description;

        galleryCategory.textContent =
            data.category;

        currentImage.textContent =
            String(currentIndex + 1).padStart(2, "0");


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });


        galleryImage.classList.remove("changing");

    }, 180);

}


/* TROCAR CATEGORIA */

document.querySelectorAll(".experience-item").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".experience-item")
            .forEach(item => {
                item.classList.remove("active");
            });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;

        currentIndex = 0;

        updateGallery();

    });

});


/* PRÓXIMA FOTO */

if (nextImage) {

    nextImage.addEventListener("click", () => {

        const total =
            experiences[currentCategory].images.length;

        currentIndex =
            (currentIndex + 1) % total;

        updateGallery();

    });

}


/* FOTO ANTERIOR */

if (previousImage) {

    previousImage.addEventListener("click", () => {

        const total =
            experiences[currentCategory].images.length;

        currentIndex =
            (currentIndex - 1 + total) % total;

        updateGallery();

    });

}


/* =========================
   SWIPE NO CELULAR
========================= */

let touchStartX = 0;
let touchEndX = 0;


if (galleryImage) {

    galleryImage.addEventListener("touchstart", event => {

        touchStartX =
            event.changedTouches[0].screenX;

    });


    galleryImage.addEventListener("touchend", event => {

        touchEndX =
            event.changedTouches[0].screenX;


        if (touchEndX < touchStartX - 50) {

            nextImage.click();

        }


        if (touchEndX > touchStartX + 50) {

            previousImage.click();

        }

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".intro, .experience-layout, .timeline-item, .reservation-content, .contact-grid"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   TIMELINE
========================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");

const timelineProgress =
    document.getElementById("timelineProgress");


function updateTimeline() {

    const timeline =
        document.querySelector(".timeline");

    if (!timeline || !timelineProgress) return;


    const rect =
        timeline.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;


    const progress =
        Math.min(
            Math.max(
                (windowHeight * 0.65 - rect.top) /
                rect.height,
                0
            ),
            1
        );


    timelineProgress.style.height =
        `${progress * 100}%`;


    timelineItems.forEach(item => {

        const itemRect =
            item.getBoundingClientRect();


        if (
            itemRect.top <
            windowHeight * 0.75
        ) {

            item.classList.add("visible");

        }

    });

}


window.addEventListener(
    "scroll",
    updateTimeline
);

window.addEventListener(
    "load",
    updateTimeline
);


/* =========================
   RESERVA
========================= */

const reservationForm =
    document.getElementById("reservationForm");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const date =
                document.getElementById("date").value;

            const people =
                document.getElementById("people").value;


            if (!date) {

                showToast(
                    "Escolha uma data para continuar."
                );

                return;

            }


            const formattedDate =
                new Date(
                    date + "T00:00:00"
                ).toLocaleDateString(
                    "pt-BR"
                );


            showToast(
                `Data: ${formattedDate} • ${people} viajante(s).`
            );


            reservationForm.reset();

        }
    );

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    if (!toast) return;

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


/* =========================
   DATA MÍNIMA
========================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.min = today;

}


/* =========================
   ATALHOS DO TECLADO
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            nextImage?.click();

        }


        if (
            event.key === "ArrowLeft" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            previousImage?.click();

        }

    }
);