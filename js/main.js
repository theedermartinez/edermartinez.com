const navWrap = document.querySelector(".nav-wrap");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  navWrap.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 250)}ms`;
  observer.observe(element);
});


////SLIDESHOW LOGIC
// Project image slideshow
const projectSlideImage = document.getElementById("project-slide-image");
const projectPreviousButton = document.querySelector(".slide-prev");
const projectNextButton = document.querySelector(".slide-next");
const projectCurrentCounter = document.getElementById("slide-current");
const projectTotalCounter = document.getElementById("slide-total");
const projectSlideshow = document.querySelector(".project-slideshow");

if (projectSlideImage && projectSlideshow) {

  const projectName = projectSlideshow.dataset.project;

  const projectSlides = [];
  let imageNumber = 1;

  // Find all available images automatically
  function findProjectImages() {

    const imagePath =
      `../assets/projects/${projectName}/${String(imageNumber).padStart(2, "0")}.jpg`;

    const image = new Image();

    image.onload = () => {

      projectSlides.push(imagePath);

      imageNumber++;
      findProjectImages();
    };

    image.onerror = () => {

      // Stop when the next image doesn't exist
      if (projectSlides.length > 0) {
        initializeSlideshow();
      }
    };

    image.src = imagePath;
  }

  function initializeSlideshow() {

    let projectSlideIndex = 0;

    projectTotalCounter.textContent =
      String(projectSlides.length).padStart(2, "0");

    function showProjectSlide(index) {

      projectSlideIndex =
        (index + projectSlides.length) % projectSlides.length;

      projectSlideImage.src =
        projectSlides[projectSlideIndex];

      projectSlideImage.alt =
        `${projectName} project screenshot ${projectSlideIndex + 1}`;

      projectCurrentCounter.textContent =
        String(projectSlideIndex + 1).padStart(2, "0");
    }

    projectPreviousButton?.addEventListener("click", () => {
      showProjectSlide(projectSlideIndex - 1);
    });

    projectNextButton?.addEventListener("click", () => {
      showProjectSlide(projectSlideIndex + 1);
    });

    showProjectSlide(0);
  }

  findProjectImages();
}