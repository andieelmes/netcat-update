$(function() {
    if (navigator.platform.indexOf('Win') > -1) {
        $('html').addClass('is-windows')
    }

    // scope

    //copied animations

    // graceful degradation

    var gd = false;

    function defineGD() {
        gd = $(window).width() <= 960;
        if (gd)
            $('html').addClass('is-gd');
        else
            $('html').removeClass('is-gd');
        }
    ;

    defineGD();
    $(window).resize(function() {
        defineGD()
    });

    // animations

    var anims = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        offsets = [],
        classes = '.update_first, .update_safety, .update_safety-item:nth-child(1), .update_safety-item:nth-child(2), .update_safety-item:nth-child(3), .update_safety-item:nth-child(4), .update_able, .update_able-items, .update_async, .update_add, .update_reviews, .update_choose';

    if (!gd) {
        $(classes).addClass('is-ready');
    }

    function defineOffsets() {
        var wh = $(window).height() * 4 /5;
        console.log(wh)
        var last = Math.min($('.update_first').offset().top - wh, $('#all').height() - $(window).height());
        offsets = [
            5, $('.update_safety').offset().top - (wh),
            $('.update_safety-item:nth-child(1)').offset().top - (wh)/2,
            $('.update_safety-item:nth-child(2)').offset().top - (wh)/2,
            $('.update_safety-item:nth-child(3)').offset().top - (wh)/2,
            $('.update_safety-item:nth-child(4)').offset().top - (wh)/2,
            $('.update_able').offset().top - (wh),
            $('.update_able-items').offset().top - (wh),
            $('.update_async').offset().top - (wh),
            $('.update_add').offset().top - (wh),
            $('.update_reviews').offset().top - (wh),
            last
        ];
    }
    

    function anim1(sct) {
        if (!gd && !anims[0] && sct >= offsets[0]) {
            anims[0] = true;
            $('.update_first').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim2(sct) {
        if (!gd && !anims[1] && sct >= offsets[1]) {
            anims[1] = true;
            $('.update_safety').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim3(sct) {
        if (!gd && !anims[2] && sct >= offsets[2]) {
            anims[2] = true;
            $('.update_safety-item:nth-child(1)').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim4(sct) {
        if (!gd && !anims[3] && sct >= offsets[3]) {
            anims[3] = true;
            $('.update_safety-item:nth-child(2)').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim5(sct) {
        if (!gd && !anims[4] && sct >= offsets[4]) {
            anims[4] = true;
            $('.update_safety-item:nth-child(3)').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim6(sct) {
        if (!gd && !anims[5] && sct >= offsets[5]) {
            anims[5] = true;
            $('.update_safety-item:nth-child(4)').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim7(sct) {
        if (!gd && !anims[6] && sct >= offsets[6]) {
            anims[6] = true;
            $('.update_able').removeClass('is-ready');
        } else
            return;
        }

    ;
    function anim8(sct) {
        if (!gd && !anims[7] && sct >= offsets[7]) {
            anims[7] = true;
            $('.update_able-items').removeClass('is-ready');
        } else
            return;
        }
       
    ;
      function anim9(sct) {
          
        if (!gd && !anims[8] && sct >= offsets[8]) {
            anims[8] = true;
            $('.update_async').removeClass('is-ready');
        } else
            return;
        }
    ;
      function anim10(sct) {
        if (!gd && !anims[9] && sct >= offsets[9]) {
            anims[9] = true;
            $('.update_add').removeClass('is-ready');
        } else
            return;
        }
    ;
      function anim11(sct) {
        if (!gd && !anims[10] && sct >= offsets[10]) {
            anims[10] = true;
            $('.update_reviews').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim12(sct) {
        if (!gd && !anims[11] && sct >= offsets[11]) {
            anims[11] = true;
            $('.update_choose').removeClass('is-ready');
        } else
            return;
        }
    ;

    defineOffsets();

    setTimeout(function() {
        anim1(6);
    }, 500);

    $(window).scroll(function() {
        var sct = $(this).scrollTop();
        anim1(sct);
        anim2(sct);
        anim3(sct);
        anim4(sct);
        anim5(sct);
        anim6(sct);
        anim7(sct);
        anim8(sct);
        anim9(sct);
        anim10(sct);
        anim11(sct);
        anim12(sct);

    });

    $(window).resize(function() {
        defineOffsets();

        if (gd)
            $(classes).removeClass('is-ready');
        }
    )

    // new Vivus('.update_first-image svg', {duration: 200});
    // console.log($('.update_first-image svg'))

    // go to the next slide

    var $arrowBtn = $('.update_first-go')
    var $nextSlide = $('.update_safety')

    $arrowBtn.on('click', function(e){
        e.preventDefault();
        $("body, html").animate({
            scrollTop: $nextSlide.offset().top
        }, 500);
    })

    //fotorama

     $(function () {
    // 1. Initialize fotorama manually.
    var $fotoramaDiv = $('.fotorama').fotorama();

    // 2. Get the API object.
    var fotorama = $fotoramaDiv.data('fotorama');

    //get the tallest review
    var height = $('.update_reviews-item').height()

    $(function () {
    $('.fotorama')
        // Listen to the events
        .on(
            'fotorama:showend',
            function (e, fotorama, extra) {
                console.log('active frame', fotorama.activeFrame);
                var height =  $(fotorama.activeFrame.html).outerHeight()
                console.log(height)
                fotorama.resize({            
                    height: height
                });
            }
        )
        // Initialize fotorama manually
        .fotorama();
  });


});



})
