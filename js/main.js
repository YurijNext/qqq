$(document).ready(function () {

    // Sliders initalization Plugin: Slick-slider
    $('.story__slider').slick({
        prevArrow: '<button type="button" class="slick-prev arrow-left--colored"></button>',
        nextArrow: '<button type="button" class="slick-next arrow-right--colored"></button>',
        autoplay: true,
        infinite: true
    });

    $('.slick__slider').slick({
        centerMode: true,
        centerPadding: '100px',
        prevArrow: '<button type="button" class="slick-prev arrow-left--colored"></button>',
        nextArrow: '<button type="button" class="slick-next arrow-right--colored"></button>',
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    arrows: true ,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 840,
                settings: {
                    arrows: true,
                    centerMode: false,
                    centerPadding: '0px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                arrows: true,
                centerMode: false,
                centerPadding: '0px',
                slidesToShow: 1
                }
            }
        ]
    });
    // END sliders initalization Plugin: Slick-slider

    //Custom slick slider pugination
    (function slidesPugination() {
        const   pagcurrentSlide = $('.current-slide'),
                pagAllSlides    = $('.all-slides'),
                sliderItem      = $('.slider__item'),
                slickArrow      = $('.slick-arrow'),
                lastItemData    = sliderItem.last().attr('data-id');
    
            pagAllSlides.html(lastItemData);
    
            slickArrow.on('click', function() {
                pagcurrentSlide.html($('.slick-current').last().attr('data-id'));
            })
            
    }())
    //END slick slider pugination

    // Scroll to ID  
    function scrollToId(str) {
        $(str + '[href*="#"]').on('click', function(e) {
            e.preventDefault()
    
            $('html, body').animate(
                {
                    scrollTop: $($(this).attr('href')).offset().top,
                },
                500,
                'linear'
            )
        })
    }

    //Scroll to ID init
    scrollToId('.navigation__link');
    scrollToId('.header__button');
    // END scroll to ID

    //Mobile menu
    (function mobileMenu() {

        const   openBtn  = $('.mobile-menu__button'),
                closeBtn = $('.mobile-menu__close'),
                menu     = $('.mobile-menu'),
                navList  = $('.mobile-navigation__list');

        
        openBtn.on('click', function(e) {

            e.preventDefault();
            menu.fadeIn(300);

        });

        closeBtn.on('click', function(e) {

            e.preventDefault();
            menu.fadeOut(300);

        });

        $(document).keypress(function(e) {

            if(e.which == 27)
                menu.fadeOut(300)

        });

        navList.on('click', function(e) {

            let target = e.target;

            if(target.tagName === 'A') {
                menu.fadeOut(300);
                setTimeout( scrollToId('.mobile-navigation__link'), 500);
            }
        });
    }());
    //END mobile menu

    //Countdown initalization Plugin: jquery.downCount.js
    $('.countdown').downCount({
        date: '09/25/2020 12:00:00',
        offset: +10
    });
    //END countdown initalization Plugin: jquery.downCount.js

    //Scroll Top
    (function scrollTop() {

        const btn = $('#toTop');

        $(window).scroll(function() {
            if ($(window).scrollTop() > 300) {
                btn.fadeIn();
            } else {
                btn.fadeOut();
            }
        });

        btn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop:0}, '300');
        });

    }());
    //END scroll top

    //Feedback form controller
    (function inputsViewController() {

        let placeholder = '';

        $('.dropdown').on('click', function() {
            $(this).attr('tabindex', 1).focus();
            $(this).toggleClass('active');
            $(this).find('.dropdown-menu').slideToggle(300);
        });
    
        $('.dropdown').focusout(function () {
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').slideUp(300);
        });
    
        $('.dropdown .dropdown-menu li').click(function () {
            $(this).parents('.dropdown').find('span').text($(this).text());
            $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        });
        
        $('input').focusin(function() {
            placeholder = $(this).attr('placeholder');
            $(this).attr('placeholder', '');
            $(this).siblings('label').css('visibility', 'visible');
        });
    
        $('input').focusout(function() {
            $(this).attr('placeholder', placeholder);
            $(this).siblings('label').css('visibility', 'hidden');
        });
    
    }());
    //END feedback form controller

    // Inite Yandex Maps
    (function initeMap() {

        let ceremonyMap,
        receptionMap;

        $('.styleswitch').on('click', function() {
            $('.map').empty();
            init();
        });

        ymaps.ready(init);
    
        function init () {

            // Switch map icon
            let defaultIcon = 'img/map/icon--' + $('head link[id="skins"]').attr('data-color') + '.svg';
            console.log(defaultIcon);

            //Ceremony address map
            ceremonyMap = new ymaps.Map('address__map--ceremony', {
                    center: [40.760873, -73.976398],
                    zoom: 17,
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                })

                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),
                
                myPlacemark = new ymaps.Placemark(ceremonyMap.getCenter(), {
                    hintContent: 'Mark',
                    balloonContent: 'Mark'
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: defaultIcon,
                    iconImageSize: [63, 83],
                })

                ceremonyMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
            
            ceremonyMap.geoObjects
                .add(myPlacemark);

            //END ceremony address map


            //Reception address map
            receptionMap = new ymaps.Map('address__map--reception', {
                    center: [40.760873, -73.976398],
                    zoom: 17,
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                });

                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),
                
                myPlacemark = new ymaps.Placemark(receptionMap.getCenter(), {
                    hintContent: 'Mark',
                    balloonContent: 'Mark'
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: defaultIcon,
                    iconImageSize: [63, 83],
                }),

                receptionMap.panes.get('ground').getElement().style.filter = 'grayscale(80%)';

            receptionMap.geoObjects
                .add(myPlacemark);
            
            //END reception address map
        }

    }());
    // END Yandex Maps


});