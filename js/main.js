////////////////////
// HEADER LOADER //
////////////////////

fetch("../components/nav.html")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Navigation failed to load: ${response.status}`);
    }

    return response.text();
  })
  .then(data => {

    const siteNav = document.getElementById("site-nav");

    if (!siteNav) {
      throw new Error("site-nav element not found");
    }

    // Insert navigation
    siteNav.innerHTML = data;


    ///////////////////////
    // NAVIGATION LOGIC //
    ///////////////////////

    // These must be selected AFTER nav.html is inserted
    const navWrap = document.querySelector(".nav-wrap");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");


    // Navigation scroll effect
    window.addEventListener("scroll", () => {

      navWrap?.classList.toggle(
        "scrolled",
        window.scrollY > 10
      );

    }, { passive: true });


    // Mobile hamburger menu
    menuToggle?.addEventListener("click", () => {

      const open = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    });


    // Close mobile menu when a link is clicked
    navLinks?.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle?.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  })
  .catch(error => {

    console.error("NAV ERROR:", error);

  });



/////////////////////////
// REVEAL ANIMATIONS //
/////////////////////////

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document.querySelectorAll(".reveal").forEach(
  (element, index) => {

    element.style.transitionDelay =
      `${Math.min(index * 45, 250)}ms`;

    observer.observe(element);

  }
);



/////////////////////////
// SLIDESHOW LOGIC //
/////////////////////////

const projectSlideImage =
  document.getElementById("project-slide-image");

const projectPreviousButton =
  document.querySelector(".slide-prev");

const projectNextButton =
  document.querySelector(".slide-next");

const projectCurrentCounter =
  document.getElementById("slide-current");

const projectTotalCounter =
  document.getElementById("slide-total");

const projectSlideshow =
  document.querySelector(".project-slideshow");


if (projectSlideImage && projectSlideshow) {

  const projectName =
    projectSlideshow.dataset.project;

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
        (index + projectSlides.length) %
        projectSlides.length;


      projectSlideImage.src =
        projectSlides[projectSlideIndex];


      projectSlideImage.alt =
        `${projectName} project screenshot ${projectSlideIndex + 1}`;


      projectCurrentCounter.textContent =
        String(projectSlideIndex + 1).padStart(2, "0");

    }


    // Previous button
    projectPreviousButton?.addEventListener(
      "click",
      () => {

        showProjectSlide(
          projectSlideIndex - 1
        );

      }
    );


    // Next button
    projectNextButton?.addEventListener(
      "click",
      () => {

        showProjectSlide(
          projectSlideIndex + 1
        );

      }
    );


    // Show first slide
    showProjectSlide(0);

  }


  // Start finding images
  findProjectImages();

}