var slideThumbnail = new Swiper(".slide-thumbnail", {
  slidesPerView: 5,
  direction: 'vertical',
  spaceBetween: 20,
  watchSlidesProgress: true,
});

var slideHero = new Swiper(".slide-principal", {
  effect: 'fade',
  thumbs: {
    swiper: slideThumbnail,
  },
  // autoplay: {
  //   delay: 8000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    480: {
      slidesPerView: 1,
    }
  }
});

const tabs = document.querySelectorAll('.tab-page-games');
const buttonsTabs = document.querySelectorAll('.js-table');

buttonsTabs.forEach((button, index)=> {
  button.addEventListener('click', ()=> {
    
    buttonsTabs.forEach(b => {
      b.classList.remove('active')
    })

    tabs.forEach(t => {
      t.classList.remove('active')
    })

    button.classList.add('active')
    tabs[index].classList.add('active')
  })
})