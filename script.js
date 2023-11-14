const leftButton = document.querySelector('.courses-carousel-btn.left');
const rightButton = document.querySelector('.courses-carousel-btn.right');
let windowWidth = window.innerWidth;
  // Atualizando a visibilidade ao redimensionar a janela
  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
  });
const bottomMenus = document.querySelectorAll('.footer-list');

  /**
   * Enables drag scroll functionality on the banners element.
   */

  function dragScrollWithAutoscroll(carrossel, itensCarrossel, buttonTriggers, time, scrollSpeed, infiniteScroll) {
    let isDragging = false;
    let initialX;
    let scrollXStart;
    let intervalId = null;
    let currentPage = 0;

    const draggable = document.querySelector(carrossel);
    const carrosselItems = document.querySelectorAll(itensCarrossel);
    const buttons = document.querySelectorAll(buttonTriggers);

    function resetInterval() {
        clearInterval(intervalId);
        if (time > 0) {
            intervalId = setInterval(changeBanner, time);
        }
    }

    function updateIndex(newIndex) {
        currentPage = newIndex;
        updatePageButtons();
    }

    function changeBanner() {
        currentPage = (currentPage + 1) % carrosselItems.length;
        updateBanner(currentPage);
    }

    function updateBanner(newIndex) {
        currentPage = newIndex % carrosselItems.length;
        updatePageButtons();
        draggable.scrollLeft = currentPage * windowWidth;
        resetInterval();
    }

    function clickChangeBanner(pageIndex) {
        updateBanner(pageIndex);
    }

    function addClickEvent() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => {
                clickChangeBanner(i);
            });
        }
    }

    function updatePageButtons() {
        buttons.forEach((button, index) => {
            if (index === currentPage) {
                button.classList.add('current-page-active');
            } else {
                button.classList.remove('current-page-active');
            }
        });
    }

    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        for (let index = 0; index < carrosselItems.length; index++) {
            const element = carrosselItems[index];
            element.style.scrollSnapAlign = 'none';
        }
        initialX = e.clientX;
        scrollXStart = draggable.scrollLeft;
        draggable.style.cursor = 'grabbing';
        clearInterval(intervalId);
    });

    draggable.addEventListener('scroll', (e) => {
      currentPage = Math.round(draggable.scrollLeft / windowWidth);
      buttons.forEach((button, index) => {
        if (index === currentPage) {
            button.classList.add('current-page-active');
        } else {
            button.classList.remove('current-page-active');
        }
    });
      clearInterval(intervalId);
    })

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
            const xOffset = e.clientX - initialX;
            draggable.scrollLeft = scrollXStart - xOffset * scrollSpeed;
            updateIndex(Math.round(draggable.scrollLeft / windowWidth));
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
        for (let index = 0; index < carrosselItems.length; index++) {
            const element = carrosselItems[index];
            element.style.scrollSnapAlign = 'start';
        }
        resetInterval();
    });

    addClickEvent();
    resetInterval();

    if (time > 0) {
        draggable.addEventListener('mouseenter', () => {
            resetInterval();
        });

        draggable.addEventListener('mouseleave', () => {
            resetInterval();
        });
    }
    function handleDragScroll(e) {
      e.preventDefault();
      const xOffset = e.clientX - initialX;
      const newScrollLeft = scrollXStart - xOffset * 3;

      // Verifica se ultrapassou para a direita
      if (newScrollLeft > carrosselItems.length * windowWidth && infiniteScroll) {
          draggable.scrollLeft = 0;
      }
      // Verifica se ultrapassou para a esquerda
      else if (newScrollLeft < 0 && infiniteScroll) {
          draggable.scrollLeft = newScrollLeft + carrosselItems.length * windowWidth;
      } else {
          draggable.scrollLeft = newScrollLeft;
      }

      updateIndex(Math.round(draggable.scrollLeft / windowWidth));
  }

  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          handleDragScroll(e);
      }
  });

}


function bottomMenuMobile() {
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

  
  dragScrollWithAutoscroll('.carousel', '.carousel-item', '.switch-page', 3000, 1, true);
  dragScrollWithAutoscroll('.courses-carousel', '.course-item', null, null, 1, false);
  dragScrollWithAutoscroll('.testimonials', '.testimonials-item', null, null, 1, false);		
  headerScroll();
  // Chamando a função para execução
  bottomMenuMobile();