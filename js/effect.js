$(document).ready(function () {
    const el = $('#header-portfolio-wrapper'),
        s = $('#scrollup'),
        scroll = $('#header-main-arrow, .icon-angle-double-down'),
        show = $('#button-main-portfolio'),
        nav = $('.nav-works-items'),
        tab = [$('#home-nav'), $('#about-nav'), $('#career-nav'), $('#works-nav'), $('#contact-nav')],
        t = [$('#home'), $('#about'), $('#career'), $('#works'), $('#contact')];

    let h = 70;

    //---------- Media height nav ----------//
    const media = window.matchMedia("(min-width: 768px)");
    (media.matches) ? h = 68 : h = 55;

    media.addListener(function (media) {
        (media.matches) ? h = 68 : h = 55;
    });

    //---------- Security scroll and menu ----------//
    if ($(window).scrollTop() > 250) {
        s.fadeIn();
    }

    if ($(window).scrollTop() > 250) {
        el.addClass('menu-bg');
    }

    //---------- Scroll up efect ----------//
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 250) {
            s.fadeIn();
        } else {
            s.fadeOut();
        }
    });

    //---------- Scroll up ----------//
    s.on('click', function () {
        $("html, body").stop().animate({ scrollTop: 0 }, 1000);
    });

    //---------- Menu efect ----------//
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 250) {
            el.addClass('menu-bg');
        } else {
            el.removeClass('menu-bg');
        }
    })

    //---------- Scroll to element ----------//
    tab.forEach(function (n, i) {
        n.on('click', function (e) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: t[i].offset().top - h
            }, 1000);
        });
    });

    //---------- Scroll to about me ----------//
    scroll.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#about').offset().top - h
        }, 1000);
    });
    /*
        //---------- Show project ----------
        show.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('#works').offset().top - h
            }, 1000);
        });
    */
    //---------- Change box of active nav by section ----------//
    $(window).on("scroll", function () {
        let st = $(this).scrollTop();
        t.forEach(function (el, i) {
            if (el.offset().top <= st + 220) {
                tab[i].addClass('active');
                tab[i].prev('.nav-items').removeClass('active');
            }
            else {
                tab[i].removeClass('active');
                //Security change box - contact
                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                    tab[tab.length - 1]
                    tab[i].addClass('active');
                    tab[i].prev('.nav-items').removeClass('active');
                }
            }
        });
    });

    //---------- Portfolio gallery ----------//
    let project = $('.works-portfolio-explame-wrapper');
    nav.each(function () {
        $(this).on("click", function () {
            nav.removeClass('active-w');
            $(this).addClass('active-w');

            let data = $(this).data();

            //Filter - Isotope v2
            $grid.isotope({
                filter: data.filter
            })
            /*
            project.each(function () {

                if ($(this).attr("class").indexOf(data.filter) != -1) {
                    $(this).show();
                    $(this).removeClass('hide');
                }
                else {
                    $(this).addClass('hide');
                    setTimeout(function(){$(this).hide()}.bind(this),500)
                }
            */

            //Gallery
            setTimeout(function () {
                max = $('.works-portfolio-explame:visible').length;
                $('.works-icons-show:visible').each(function (i, el) {
                    $(el).unbind();
                    $(el).on('click', function () {
                        $('body').removeClass('scrollbar-show');
                        $('#gallery-show-wrapper').addClass('show-wrapper');
                        addImage(i);
                    });
                });
            }, 500);
        })
    })

    //---------- Smooth gallery - Isotope v2 ----------//
    var $grid = $('#works-portfolio-explame-cnt').isotope({
        // options
        itemSelector: '.works-portfolio-explame-wrapper',
        layoutMode: 'fitRows'
    });

    //----------Efect show menu----------//
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler") && !clickover.hasClass("navbar-collapse")) {
            $("button.navbar-toggler").click();
        }
    });

    $(window).on("scroll", function () {
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true) {
            $("button.navbar-toggler").click();
        }
    });

    //--------- Gallery -------------//
    let max = $('.works-portfolio-explame:visible').length;
    $('.works-icons-show:visible').each(function (i, el) {
        $(el).on('click', function () {
            $('body').removeClass('scrollbar-show');
            $('#gallery-show-wrapper').addClass('show-wrapper');
            addImage(i);
        });
    });

    $('.prev-gallery-photo').on('click', function () {
        $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
        $('.loader-photo').removeClass('hide-ele-gallery');
        let i = $('.gallery-photo-cnt').attr('data-number') * 1 - 1;
        if (i === -1) i = max - 1;
        $('.gallery-photo-cnt').remove();

        addImage(i);
    });

    $('.next-gallery-photo').on('click', function () {
        $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
        $('.loader-photo').removeClass('hide-ele-gallery');
        let i = $('.gallery-photo-cnt').attr('data-number') * 1 + 1;
        if (i === max) i = 0;
        $('.gallery-photo-cnt').remove();

        addImage(i);
    });

    function addImage(i) {
        const image = new Image();
        $(image).one('load', function () {
            $('.gallery-photo-wrapper').removeClass('hide-ele-gallery');
            $('.loader-photo').addClass('hide-ele-gallery');
        });

        $(image).one('click', function () {
            $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
            $('.loader-photo').removeClass('hide-ele-gallery');
            let i = $('.gallery-photo-cnt').attr('data-number') * 1 + 1;
            if (i === max) i = 0;
            $('.gallery-photo-cnt').remove();

            addImage(i);
        });

        let src = $(".works-portfolio-explame:visible").eq(i).find('.gallery-photo').attr('src');
        image.src = src;
        image.className = "gallery-photo-cnt"
        image.dataset.number = i;

        clearTimeout(timer);
        $('.gallery-show button').css('opacity', '1');
        timer = setTimeout(function () { $('.gallery-show button').css('opacity', '0') }, 1500);

        $('.gallery-photo-explame figcaption').before(image);
        $('.gallery-counter button').html(i + 1 + ' z ' + max)

        /*Dots - mobile gallery*/
        $('.dots-gallery-photo').remove();
        for (let j = 0; j < max; j++) {
            if (j == i) $('.gallery-photo-explame figcaption').append('<div class="dots-gallery-photo dots-active" data-number-slide="' + j + '"></div>');
            else $('.gallery-photo-explame figcaption').append('<div class="dots-gallery-photo" data-number-slide="' + j + '"></div>');
        }

        $('.dots-gallery-photo').one('click', function () {
            let i = $(this).attr('data-number-slide') * 1;
            let v = $('.gallery-photo-cnt').attr('data-number') * 1;

            if (i !== v) {
                $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
                $('.loader-photo').removeClass('hide-ele-gallery');
                $('.gallery-photo-cnt').remove();

                addImage(i);
            }
        });

        // Swipe Up / Down / Left / Right
        image.addEventListener("touchstart", startTouch, false);
        image.addEventListener("touchmove", moveTouch, false);

        // Swipe Up / Down / Left / Right
        var initialX = null;
        var initialY = null;

        function startTouch(e) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        };

        function moveTouch(e) {
            if (initialX === null) {
                return;
            }

            if (initialY === null) {
                return;
            }

            var currentX = e.touches[0].clientX;
            var currentY = e.touches[0].clientY;

            var diffX = initialX - currentX;
            var diffY = initialY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                // sliding horizontally
                if (diffX > 0) {
                    let i = $('.gallery-photo-cnt').attr('data-number') * 1 + 1;
                    if (i === max) i = 0;
                    $('.gallery-photo-cnt').remove();

                    addImage(i);
                } else {
                    let i = $('.gallery-photo-cnt').attr('data-number') * 1 - 1;
                    if (i === -1) i = max - 1;
                    $('.gallery-photo-cnt').remove();

                    addImage(i);
                }
            }

            initialX = null;
            initialY = null;

            e.preventDefault();
        };
    }

    $('.gallery-show').on('click', function (e) {
        var click = $(e.target);
        if (click.hasClass('gallery-show')) {
            $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
            $('.loader-photo').removeClass('hide-ele-gallery');
            $('.gallery-photo-cnt').remove();

            $('body').addClass('scrollbar-show');
            $('#gallery-show-wrapper').removeClass('show-wrapper');
        }
    });

    $('.cancel-button').on('click', function () {
        $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
        $('.loader-photo').removeClass('hide-ele-gallery');
        $('.gallery-photo-cnt').remove();

        $('body').addClass('scrollbar-show');
        $('#gallery-show-wrapper').removeClass('show-wrapper');
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 27) $('.gallery-show').click();   // esc
    });

    let timer = 0;
    $('#gallery-show-wrapper').on('mousemove', function () {
        clearTimeout(timer);
        $('.gallery-show button').css('opacity', '1');
        timer = setTimeout(function () { $('.gallery-show button').css('opacity', '0') }, 1500);
    });

    //------------ Resume efect --------------//
    $('.career-portfolio-choose').each(function (i, el) {
        $(el).on('click', function () {
            let position = $(this).position();
            $("#career-portfolio-background").css({ "left": + position.left });
            $('.career-portfolio-wrapper').not(":eq(" + i + ")").stop().fadeOut(0);
            if (!$('.career-portfolio-wrapper:eq(' + i + ')').is(':animated'))
                $('.career-portfolio-wrapper:eq(' + i + ')').stop().fadeIn(1000);
        });
    })

    //------------ Animate nav -----------------/
    $('.navbar-toggler').on('click', function () {
        $('body').toggleClass('scrollbar-show');
        $('nav').toggleClass('navbar-active');
        $('.navbar-toggler .icon-menu').toggleClass('hide-icon-nav');
        $('.navbar-toggler .icon-cancel-1').toggleClass('hide-icon-nav');
        $('.navbar-active').one('click', function () {
            $('nav').removeClass('navbar-active');
            $('body').addClass('scrollbar-show');
            $('.navbar-toggler .icon-menu').removeClass('hide-icon-nav');
            $('.navbar-toggler .icon-cancel-1').addClass('hide-icon-nav');
        })
    })

});

$(window).on('load', function () {

    //---------- The effect of showing the text----------//
    let count = $('.animate-el-hidden:visible').length;
    $('.animate-el-hidden:visible').each(function (i, el) {
        setTimeout(function () { $(el).addClass('animate-el'); }, 500 + (i * 500));
    });

    $('.animate-el-hidden-last').each(function (i, el) {
        setTimeout(function () { $(el).addClass('animate-el'); }, 500 + count * 500 + (i * 500));
    });

    $('#header-main-arrow-mobile').each(function (i, el) {
        setTimeout(function () { $(el).css('opacity', '1'); }, 700 + count * 500 + (i * 500));
    });

    //---------- Preloader ----------//
    $('#preloader').remove();
    $('body').addClass('scrollbar-show');

});

//Disable div_pop
window.open = function (url, windowName, windowFeatures) { };