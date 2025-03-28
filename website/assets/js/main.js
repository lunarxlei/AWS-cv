
(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default hash behavior
      let targetHref = navmenu.getAttribute('href'); // Get the full href (including the page)
      
      if (targetHref.startsWith('#')) { // If it's an anchor link on the same page
        let targetId = targetHref.substring(1); // Get section ID without '#'
        let section = document.getElementById(targetId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
          });
        }
      } else { // For external page navigation, like 'index.html#portfolio'
        window.location.href = targetHref;
      }
  
      // Close mobile navigation after clicking a link
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  // Correct scrolling position upon page load for URLs containing hash links
window.addEventListener('load', function() {
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);
    if (section) {
      setTimeout(() => {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// Ensure smooth scrolling when opening a page with a hash
window.addEventListener('load', function() {
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);
    if (section) {
      setTimeout(() => {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  navmenulinks.forEach(navmenulink => {
    navmenulink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the hash from being added to the URL
      let targetId = navmenulink.getAttribute('href').substring(1); // Get section ID without '#'
      let section = document.getElementById(targetId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();

window.onload=function(){

  const audioPlayer = document.querySelector('#footer-audio-player');
  const playBtn = document.querySelector('#playBtn')
  const pauseBtn = document.querySelector('#pauseBtn');
  
  var songPlaying = false;

  playBtn.addEventListener('click',function(){
      if (audioPlayer.src === '') {
          loadSong(currentSongIndex, true);
      } else {
          togglePlayPause();
      }
  });

  pauseBtn.addEventListener('click',function(){
      togglePlayPause();
  })

  const togglePlayPause = function(){
      if(songPlaying){
          songPlaying = false;
          audioPlayer.pause();
          playBtn.style.display = 'inline';
          pauseBtn.style.display = 'none'
      } else {
          songPlaying = true;
          audioPlayer.play();
          playBtn.style.display = 'none';
          pauseBtn.style.display = 'inline'
      }
  }
}


//Javascript Code
const counter = document.querySelector(".counter-number");
async function updateCounter() {
  let response =  await fetch("https://jpswrmrlsuq3xbeh7tkacpd7aq0wuqou.lambda-url.us-east-1.on.aws/");
  let data = await response.json();
  counter.innerHTML = ` Views: ${data} `;
}


