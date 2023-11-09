  /**
   * Enables drag scroll functionality on the banners element.
   */
  function enableDragScroll() {
    // Variables to track dragging state and scroll position
    let isDragging = false;
    let startPositionX = 0;
    let walk = 0;
    let pagePos = 0;
    let translateXpos= 0;
    let leftScroll, rightScroll = false 
    const pageWidth = window.innerWidth;
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
      banners.style.transform = `translateX(${(pageWidth * currentPage) * 0.99}px)`;
      pagePos = pageWidth * Math.round(currentPage);
      activePageSwitch(switches[(currentPage) * -1]);
      resetInterval();
    }
    
    function breakPointR() {
      currentPage = 0;
      banners.style.transition = 'transform 0.3s ease-in-out';
      banners.style.transform = `translateX(${(pageWidth * currentPage)*0.99}px)`;
      pagePos = pageWidth * Math.round(currentPage);
      activePageSwitch(switches[(currentPage)*-1])
      resetInterval()
      resetListener()
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
        banners.style.transform = `translateX(${(pageWidth * currentPage)*0.99}px)`;
        pagePos = pageWidth * currentPage;
      }
      if (leftScroll) {
        banners.style.transform = `translateX(${(pageWidth * currentPage)*0.99}px)`;
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
      banners.style.transform = `translateX(${(pageWidth * currentPage)*0.99}px)`;
      pagePos = pageWidth * Math.round(currentPage);
      activePageSwitch(switches[(currentPage)*-1]);
    }

    function clickChangeBanner(pageIndex) {
      activePageSwitch(switches[pageIndex]);
      currentPage = -pageIndex;
      banners.style.transition = 'transform 0.3s ease-in-out';
      banners.style.transform = `translateX(${(pageWidth * currentPage)*0.99}px)`;
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

  enableDragScroll();
  headerScroll();