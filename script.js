const leftButton = document.querySelector('.courses-carousel-btn.left');
const rightButton = document.querySelector('.courses-carousel-btn.right');

const bottomMenus = document.querySelectorAll('.footer-list');

  /**
   * Enables drag scroll functionality on the banners element.
   */
  function dragScrollBanners() {
    // Variables to track dragging state and scroll position
    let isDragging = false;
    let startPositionX = 0;
    let walk = 0;
    let pagePos = 0;
    let translateXpos= 0;
    let leftScroll, rightScroll = false 
    let pageWidth = window.innerWidth;
    let currentPage = 0;
    let walkSize = 0;
    const switches = document.getElementsByClassName('switch-page');
    let intervalId = setInterval(changeBanner, 3000);


    // Get the banners element
    const banners = document.getElementById('banners');

    // Function to reset the interval
    function resetInterval() {
      clearInterval(intervalId);
      intervalId = setInterval(changeBanner, 3000);
    }
    
    // Get each switch and add a onclick event
    function addClickEvent() {
      for (let i = 0; i < switches.length; i++) {
        switches[i].addEventListener('click', () => {
          clickChangeBanner(i);
        });
      }
    }
    function activePageSwitch(trigger) {
      for (let i = 0; i < switches.length; i++) {
        switches[i].classList.remove('current-page-active');
      }
      trigger.classList.add('current-page-active');
      resetInterval()
    }

    function breakPointL() {
      currentPage = -2;
      banners.style.transition = 'transform 0.3s ease-in-out';
      banners.style.transform = `translateX(${(pageWidth * currentPage)}px)`;
      pagePos = pageWidth * Math.round(currentPage);
      activePageSwitch(switches[(currentPage) * -1]);
      resetInterval();
    }
    
    function breakPointR() {
      currentPage = 0;
      banners.style.transition = 'transform 0.3s ease-in-out';
      banners.style.transform = `translateX(${(pageWidth * currentPage)}px)`;
      pagePos = pageWidth * Math.round(currentPage);
      activePageSwitch(switches[(currentPage)*-1])
      resetInterval()
    }
    
    function adjustScroll() {
      walkSize = walk / pageWidth;
      currentPage = translateXpos / pageWidth;
    
      if (walkSize < 0.2) {
        currentPage = Math.floor(currentPage);
      }
      else if (walkSize > 0.2) {
        currentPage = Math.ceil(currentPage);
      }
    
      if (rightScroll) {
        banners.style.transform = `translateX(${(pageWidth * currentPage)}px)`;
        pagePos = pageWidth * currentPage;
      }
      if (leftScroll) {
        banners.style.transform = `translateX(${(pageWidth * currentPage)}px)`;
        pagePos = pageWidth * currentPage;
      }

      // Update the conditions for breakpoints
      if (translateXpos < -pageWidth * 2) {
        breakPointR();
      } else if (translateXpos > 0) {
        breakPointL();
      }

      activePageSwitch(switches[(currentPage)*-1]);
    }

    // Function to change banner automatically
    function changeBanner() {
      currentPage = (currentPage - 1) % banners.children.length;
      banners.style.transition = 'transform 0.3s ease-in-out';
      banners.style.transform = `translateX(${(pageWidth * currentPage)}px)`;
      pagePos = pageWidth * Math.round(currentPage);
      activePageSwitch(switches[(currentPage)*-1]);
      pageWidth = window.innerWidth;
    }

    function clickChangeBanner(pageIndex) {
      activePageSwitch(switches[pageIndex]);
      currentPage = -pageIndex;
      banners.style.transition = 'transform 0.3s ease-in-out';
      banners.style.transform = `translateX(${(pageWidth * currentPage)}px)`;
      pagePos = pageWidth * Math.round(currentPage);
    }

    function resetListener()
    {
      isDragging = false;
      banners.style.transition = 'transform 0.3s ease-in';
      pagePos += walk;
      adjustScroll();
      walk = 0;
      leftScroll = false;
      rightScroll = false;
    }
    // Event listener to start dragging on mousedown
    banners.addEventListener('mousedown', (e) => {
      banners.style.transition = '';
      isDragging = true;
      startPositionX = e.pageX;
      e.preventDefault();
    });

    // Event listener to stop dragging on mouseup
    banners.addEventListener('mouseup', () => {
      resetListener()
    });

    // Event listener to stop dragging on mouseleave
    banners.addEventListener('mouseleave', () => {
      resetListener()
    });

  // Event listener to move banners on mousemove
  banners.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    walk = (x - startPositionX);
    translateXpos = (walk + pagePos);

    // Update the conditions for leftScroll and rightScroll
    if (walk > 0) {
      leftScroll = true;
      rightScroll = false;
    } else if (walk < 0) {
      rightScroll = true;
      leftScroll = false;
    }
    banners.style.transform = `translateX(${translateXpos}px)`;
  });

  // Update the resetListener function
  function resetListener() {
    isDragging = false;
    banners.style.transition = 'transform 0.3s ease-in';
    pagePos += walk;

    // Reset leftScroll and rightScroll appropriately
    if (leftScroll) {
      adjustScroll();
      leftScroll = false;
    } else if (rightScroll) {
      adjustScroll();
      rightScroll = false;
    }

    walk = 0;
  }
    addClickEvent();

     banners.addEventListener('touchstart', (e) => {
    banners.style.transition = '';
    isDragging = true;
    startPositionX = e.touches[0].clientX; // Captura a posição inicial do toque
    e.preventDefault();
  });

  // Event listener para parar o arrastar no fim do toque
  banners.addEventListener('touchend', () => {
    resetListener();
  });

  // Event listener para parar o arrastar ao sair da área do elemento
  banners.addEventListener('touchcancel', () => {
    resetListener();
  });

  // Event listener para mover os banners no toque
  banners.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    walk = (x - startPositionX);
    translateXpos = (walk + pagePos);

    // Atualiza as condições para leftScroll e rightScroll
    if (walk > 0) {
      leftScroll = true;
      rightScroll = false;
    } else if (walk < 0) {
      rightScroll = true;
      leftScroll = false;
    }
    banners.style.transform = `translateX(${translateXpos}px)`;
  });

  // Atualização da função resetListener
  function resetListener() {
    isDragging = false;
    banners.style.transition = 'transform 0.3s ease-in';
    pagePos += walk;

    // Reseta leftScroll e rightScroll apropriadamente
    if (leftScroll) {
      adjustScroll();
      leftScroll = false;
    } else if (rightScroll) {
      adjustScroll();
      rightScroll = false;
    }

    walk = 0;
  }

  }


  function dragScroll(carrossel, itensCarrossel) {
    let isDragging = false;
    let initialX;
    let scrollXStart;
  
    const draggable = document.querySelector(carrossel);
    const carrosselItems = document.querySelectorAll(itensCarrossel);
  
    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        for (let index = 0; index < carrosselItems.length; index++) {
            const element = carrosselItems[index];
            element.style.scrollSnapAlign = 'none';
        }
        initialX = e.clientX;
        scrollXStart = draggable.scrollLeft;
        draggable.style.cursor = 'grabbing';
    });
  
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
            const xOffset = e.clientX - initialX;
            draggable.scrollLeft = scrollXStart - xOffset;
        }
    });
  
    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
        for (let index = 0; index < carrosselItems.length; index++) {
            const element = carrosselItems[index];
            element.style.scrollSnapAlign = 'start';
        }
        // Perform any other operations after mouse up if needed
    });
}

function bottomMenuMobile() {
  const windowWidth = window.innerWidth;
  const bottomMenus = document.querySelectorAll('.footer-list');
  const titles = document.querySelectorAll('.footer-title');

  if (windowWidth < 768) {
      for (let index = 0; index < bottomMenus.length; index++) {
          const element = bottomMenus[index];
          const title = element.parentElement.querySelector('.footer-title');
          const icon = title.querySelector('i.bi');
          
          element.classList.add('retracted');
          title.addEventListener('click', () => {
              element.classList.toggle('retracted');
              icon.classList.toggle('bi-chevron-down');
              icon.classList.toggle('bi-chevron-up');
          });
      }
  } else {
      for (let index = 0; index < bottomMenus.length; index++) {
          const element = bottomMenus[index];
          element.classList.remove('retracted');
      }
  }

  
}
  
  function scrollRight() {
    const draggable = document.querySelector('.courses-carousel');
    const itemWidth = draggable.scrollWidth / draggable.children.length;
    draggable.scrollLeft += itemWidth;
    if (draggable.scrollLeft == 0) {
      leftButton.classList.add('hidden');
    }
    else {
      leftButton.classList.remove('hidden');
    }
    
  }
  
  function scrollLeft() {
    const draggable = document.querySelector('.courses-carousel');
    const itemWidth = draggable.scrollWidth / draggable.children.length;
    draggable.scrollLeft -= itemWidth;
    if (draggable.scrollLeft == 0) {
      leftButton.classList.add('hidden');
    }
    else {
      leftButton.classList.remove('hidden');
    }
  }

  function headerScroll(){
    var headerNav = document.getElementById('header-nav');

    if (window.scrollY > 0) {
      headerNav.classList.add('toggled');
    } else {
      headerNav.classList.remove('toggled');
    }
  }

  document.addEventListener('DOMContentLoaded', headerScroll);
  window.addEventListener('scroll', headerScroll);
  leftButton.addEventListener('click', scrollLeft);
  rightButton.addEventListener('click', scrollRight);

  

  dragScrollBanners();
  dragScroll('.courses-carousel', '.course-item');
  dragScroll('.testimonials', '.testimonials-item');		
  headerScroll();
  // Chamando a função para execução
  bottomMenuMobile();
  // Atualizando a visibilidade ao redimensionar a janela
  window.addEventListener('resize', bottomMenuMobile);