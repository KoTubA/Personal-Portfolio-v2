$(document).ready(function () {
    const el = $('#header-portfolio-wrapper'),
        s = $('#scrollup'),
        scroll = $('#header-main-arrow'),
        show = $('#button-main-portfolio'),
        nav = $('.nav-works-items'),
        tab = [$('#home-nav'), $('#about-nav'), $('#career-nav'), $('#works-nav'), $('#contact-nav')],
        t = [$('#home'), $('#about'), $('#career'), $('#works'), $('#contact')];

    let h = 70;

    //---------- Media height nav ----------//
    const media = window.matchMedia("(min-width: 768px)");
    (media.matches) ? h = 70 : h = 55;

    media.addListener(function (media) {
        (media.matches) ? h = 70 : h = 55;
    });

    //---------- Security scroll and menu ----------//
    if ($(window).scrollTop() > 250) {
        s.fadeIn();
    }

    if ($(window).scrollTop() > 150) {
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
        if ($(this).scrollTop() > 150) {
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
            setTimeout(function() {
                max = $('.works-portfolio-explame:visible').length;
                $('.works-icons-show:visible').each(function(i, el) {
                    $(el).unbind();
                    $(el).on('click', function() {
                        $('body').removeClass('scrollbar-show');
                        $('#gallery-show-wrapper').addClass('show-wrapper');
                        addImage(i);
                    });
                });
            },500);
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
    $('.works-icons-show:visible').each(function(i, el) {
        $(el).on('click', function() {
            $('body').removeClass('scrollbar-show');
            $('#gallery-show-wrapper').addClass('show-wrapper');
            addImage(i);
        });
    });

    $('.prev-gallery-photo').on('click', function() {
        $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
        $('.loader-photo').removeClass('hide-ele-gallery');
        let i = $('.gallery-photo-cnt').attr('data-number')*1-1;
        if(i===-1) i=max-1;
        $('.gallery-photo-cnt').remove();

        addImage(i);
    });

    $('.next-gallery-photo').on('click', function() {
        $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
        $('.loader-photo').removeClass('hide-ele-gallery');
        let i = $('.gallery-photo-cnt').attr('data-number')*1+1;
        if(i===max) i=0;
        $('.gallery-photo-cnt').remove();

        addImage(i);
    });

    function addImage(i) {
        const image = new Image();
        $(image).one('load',function() {
            $('.gallery-photo-wrapper').removeClass('hide-ele-gallery');
            $('.loader-photo').addClass('hide-ele-gallery');
        });
        
        $(image).one('click',function() {
            $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
            $('.loader-photo').removeClass('hide-ele-gallery');
            let i = $('.gallery-photo-cnt').attr('data-number')*1+1;
            if(i===max) i=0;
            $('.gallery-photo-cnt').remove();

            addImage(i);
        });

        let src = $(".works-portfolio-explame:visible").eq(i).find('.gallery-photo').attr('src');
        image.src = src;
        image.className = "gallery-photo-cnt"
        image.dataset.number = i;

        clearTimeout(timer);
        $('.gallery-show button').css('opacity','1');
        timer = setTimeout(function() {$('.gallery-show button').css('opacity','0')},1500);

        $('.gallery-photo-explame figcaption').before(image);
        $('.gallery-counter button').html(i+1+' z '+max)
    }

    $('.gallery-show').on('click', function(e) {
        var click = $(e.target);
        if(click.hasClass('gallery-show')) {
            $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
            $('.loader-photo').removeClass('hide-ele-gallery');
            $('.gallery-photo-cnt').remove();

            $('body').addClass('scrollbar-show');
            $('#gallery-show-wrapper').removeClass('show-wrapper');
        }
    });

    $('.cancel-button').on('click', function() {
            $('.gallery-photo-wrapper').addClass('hide-ele-gallery');
            $('.loader-photo').removeClass('hide-ele-gallery');
            $('.gallery-photo-cnt').remove();

            $('body').addClass('scrollbar-show');
            $('#gallery-show-wrapper').removeClass('show-wrapper');
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 27) $('.gallery-show').click();   // esc
    });


    let timer = 0;
    $('#gallery-show-wrapper').on('mousemove', function(){
        clearTimeout(timer);
        $('.gallery-show button').css('opacity','1');
        timer = setTimeout(function() {$('.gallery-show button').css('opacity','0')},1500);
    })


});

$(window).on('load', function () {

    //---------- The effect of showing the text----------//
    $('.animate-el-hidden').each(function (i, el) {
        setTimeout(function () { $(el).addClass('animate-el'); }, 500 + (i*500));
    });

    $('.animate-el-hidden-last').each(function (i, el) {
        setTimeout(function () { $(el).addClass('animate-el'); }, 1500 + (i*500));
    });

    //---------- Preloader ----------//
    $('#preloader').remove();
    $('body').addClass('scrollbar-show');

});