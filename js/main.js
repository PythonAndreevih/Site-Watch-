var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
  });




////// кнопка языка
  $(() => {
    $('.header .button').on('click', function() {
        if ($(this).hasClass('open')) { 
            $(this).removeClass('open');
        } else { 
            $(this).addClass('open');   
        }
    });
});


///////кнопка вверх
function backToTop(){
  let button = $('.back_to_top');

  $(window).on('scroll', () => {
    if($(this).scrollTop() >= 50) {
      button.fadeIn();
    }else {
      button.fadeOut();
    }
  });

  button.on('click',(e) => {
    e.preventDefault();
    $('html').animate({scrollTop:0},1000)
  });

}

backToTop()






// добалние в избранное
$(() => {
  const products = [                                         /////////Значения Наших продуктов/////////
      {
          id: 1,
          title: 'Product 1',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 2,
          title: 'Product 2',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 3,
          title: 'Product 3',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 4,
          title: 'Product 4',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 5,
          title: 'Product 5',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 6,
          title: 'Product 6',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 7,
          title: 'Product 7',
          price: 150000,
          image: 'img/wath.jpg'
      },
      {
          id: 8,
          title: 'Product 8',
          price: 150000,
          image: 'img/wath.jpg'
      }
  ]

  let favorites = localStorage.getItem('favorites'); /// Добовляем переменную фаворитес в локал сторедж 
  if (favorites) {   //// если///
      favorites = JSON.parse(favorites); /// переводим в джейсон добавляем в локал сторедж
  } else {
      favorites = [];  //// если нет то просто массив ?
  }

  console.log(favorites,products); /////// проверяем /////

  if (favorites.length) { ////// переводим в значение ленгхт///
      favorites.forEach((id) => {   //// цикл перебирает айдишники и по клику добавляет класс/////
          $(`.item__like[data-product="${id}"]`).addClass('liked');
      });

      // for (let i = 0; i < favorites.length; i++) {
      //     $(`.item__like[data-product="${favorites[i]}"]`).addClass('liked');
      // }
  }



  $(document).on('click', '.item__like', function() { /////// обращение к документу ///////
      const productID = +$(this).data('product'); //// созда6ем переменную продукт айди делаем функцию на класс продукт в другой штимлке ////
      if (!favorites.includes(productID)) { /////// если фаворитес не равно продукт айди фаворитес добавляем в массив
          favorites = [...favorites, productID];
          $(this).addClass('liked'); /// и добовляем класс лайкед
      } else {
          favorites = favorites.filter((id) => +id !== +productID); /// фильтруем  и удаляем из спика
          $(this).removeClass('liked');

          if ($('#favorites').length) {
              $(this).parents('.col-lg-3').remove(); 

              if (!favorites.length) {
                  $('#favorites').html('<div class="col-12">Нет товаров в избранном</div>');
              }
          }
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
  });




  if ($('#favorites').length) {  /// работа с html структурой через джаву  ///
    if (favorites.length) {
        let elements = [];

        products.forEach((product) => {
            if (favorites.includes(product.id)) {
                elements = [...elements, `
                    <div class="col-lg-3">
                    <div class="cards">
                        <div class="cards_item">
                            <img src="${[product.image]}" alt="">
                            <span class="cards_info">
                                <span class="item__title">${[product.title]}</span>
                                <span class="item__price">${[product.price]}</span>
                            </span>
                            <button type="button" class="item__like" data-product="${[product.id]}">
                                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4629 4.97148L14.9964 5.51284L15.5306 4.97219L17.7185 2.75784L18.2578 2.26695L18.8321 1.8464L19.4419 1.48574L20.0851 1.19613L20.7575 0.977296L21.4535 0.827315L22.1542 0.75H22.8547L23.5581 0.827315L24.2506 0.977112L24.9204 1.19595L25.5652 1.48632L26.18 1.84682L26.7504 2.2664L27.2756 2.74449L27.7491 3.27729L28.1688 3.85698L28.5195 4.476L28.8087 5.13405L29.0307 5.81587L29.1758 6.51577L29.25 7.22871V7.94927L29.1758 8.6649L29.0308 9.36169L28.8087 10.0438L28.5198 10.7012L28.1688 11.318L27.7486 11.9012L27.2624 12.4482L14.9972 24.8612L2.73622 12.4468L2.24584 11.9012L1.83228 11.32L1.48025 10.7012L1.19126 10.0438L0.969236 9.36168L0.824154 8.6649L0.75 7.94927V7.22871L0.824154 6.51576L0.969325 5.81588L1.19126 5.13404L1.48053 4.47601L1.83228 3.85502L2.24529 3.27729L2.72288 2.74588L3.2496 2.26639L3.82054 1.8464L4.43296 1.48574L5.07354 1.19613L5.74859 0.977296L6.44193 0.827315L7.14528 0.75H7.84577L8.54649 0.827315L9.24205 0.977205L9.91156 1.19595L10.5558 1.48603L11.1684 1.84682L11.7422 2.26695L12.2811 2.75751L14.4629 4.97148Z" stroke="black" stroke-width="1.5"></path>
                                </svg>
                            </button>
                            <button type="button" class="basket_item" data-basket="5" >
                                <span class="basket_text">Заказать</span>
                            </button>
                        </div>
                    </div>
                </div>
                `];
            }
        });

        $('#favorites').html(elements);
    } else {
        $('#favorites').html('<div class="col-12">Нет товаров в избранном</div>');
    }
}


});




$(() => {
    $('.header .burger').on('click', function() {
        if ($(this).hasClass('open')) { // закрываем меню
            $(this).removeClass('open');
            $('html, body').css({ overflow: 'auto' });
            $('.header_menu-mobile').removeClass('open');
        } else { // открываем меню
            $(this).addClass('open');
            $('html, body').css({ overflow: 'hidden' });
            $('.header_menu-mobile').addClass('open');
        }
    });
});


