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
            false
        ],
        offsets = [],
        classes = '.portf_first, .portf_history-main, .portf_history-items, .portf_history-buttons.portf_project-buttons, .portf_stores, .portf_corp, .portf_social';

    if (!gd) {
        $(classes).addClass('is-ready');
    }

    function defineOffsets() {
        var wh = $(window).height() * 3 / 4;
        var last = Math.min($('.portf_social').offset().top - wh, $('#all').height() - $(window).height());

        offsets = [
            5, $('.portf_history-main').offset().top - (wh),
            $('.portf_history-items').offset().top - (wh),
            $('.portf_history-items').offset().top - (wh),
            $('.portf_stores').offset().top - (wh),
            $('.portf_corp').offset().top - (wh),
            last
        ];
    }
    

    function anim1(sct) {
        if (!gd && !anims[0] && sct >= offsets[0]) {
            anims[0] = true;
            $('.portf_first').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim2(sct) {
        if (!gd && !anims[1] && sct >= offsets[1]) {
            anims[1] = true;
            $('.portf_history-main').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim3(sct) {
        if (!gd && !anims[2] && sct >= offsets[2]) {
            anims[2] = true;
            $('.portf_history-items').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim4(sct) {
        if (!gd && !anims[3] && sct >= offsets[3]) {
            anims[3] = true;
            $('.portf_history-buttons.portf_project-buttons').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim5(sct) {
        if (!gd && !anims[4] && sct >= offsets[4]) {
            anims[4] = true;
            $('.portf_stores').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim6(sct) {
        if (!gd && !anims[5] && sct >= offsets[5]) {
            anims[5] = true;
            $('.portf_corp').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim7(sct) {
        if (!gd && !anims[6] && sct >= offsets[6]) {
            anims[6] = true;
            $('.portf_social').removeClass('is-ready');
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

    });

    $(window).resize(function() {
        defineOffsets();

        if (gd)
            $(classes).removeClass('is-ready');
        }
    )

    // fotorama custom arrows
    var fotorama = $('.fotorama').data('fotorama');
    var arrowLeft = $('.portf_first-arrow--left');
    var arrowRight = $('.portf_first-arrow--right');

    arrowLeft.click(function() {
        fotorama.show('<')
    })

    arrowRight.click(function() {
        fotorama.show('>')
    })





    var prefixes = ['.portf_stores', '.portf_corp', '.portf_social ', '.portf_history']

    function createCollection(selector, closest) {
      closest = closest || null
      selector = selector || ''

      return $.map(prefixes, function(el){
        return closest
          ? $(el + selector).closest(closest)
          : $(el + selector)
      })
    }

	var itemsInPackage = 3
    var buttons = createCollection(' .js-show-all')
    var buttonAreas = createCollection(' .js-show-all', '.portf_project-buttons')
    var lessButtons = createCollection(' .portf_project-showLess')
    var loadedContainers = createCollection(' .portf_project-showMore')
    var containers = createCollection()

    var loadUrls = $.map(containers, function(el) {
      return el.attr("dataURL")
    })


    function showMoreSites(moreBtn, moreBtnArea, lessBtn, loadContainer, root, loadUrl) {
        var state = {
            clickCount: 0,
            hiddenPackagesCount: 0,
            maxClicks: 4
        }

        moreBtn.on('click', function(e) {
          e.preventDefault();

            if (state.clickCount >= state.maxClicks) {
                moreBtn.addClass('is-hidden')
                moreBtnArea.addClass('is-hidden')
                lessBtn.addClass('is-single')
            } else {
                lessBtn.removeClass('is-single')
            }

            state.clickCount++;
            var toScroll = $(moreBtn).offset().top

            if (state.hiddenPackagesCount) {
                for (var i = 0; i < itemsInPackage; i++) {
                    loadContainer.find('.is-hidden:first').removeClass('is-hidden')
                }
                state.hiddenPackagesCount--;

            } else {
                // TODO: add AJAX request to loadUrl, and append HTML-response to page like this:
                loadContainer.append('<a href="#" class="portf_project-item"><div class="portf_project-picture"><div class="portf_project-wrapper"><img class="portf_project-image" src="portfolio_stuff/social.png"/></div></div><div class="portf_project-caption"><div class="portf_project-name">Оптовые поставки ТД «Калинов Мост»</div><div class="portf_project-copy">Создан <span href="#" class="portf_link portf_project-link">Super Studio Web</span></div></div></a><a href="#" class="portf_project-item"><div class="portf_project-picture"><div class="portf_project-wrapper"><img class="portf_project-image" src="portfolio_stuff/social.png"/></div></div><div class="portf_project-caption"><div class="portf_project-name">Оптовые поставки ТД «Калинов Мост»</div><div class="portf_project-copy">Создан <span href="#" class="portf_link portf_project-link">Super Studio Web</span></div></div></a><a href="#" class="portf_project-item"><div class="portf_project-picture"><div class="portf_project-wrapper"><img class="portf_project-image" src="portfolio_stuff/social.png"/></div></div><div class="portf_project-caption"><div class="portf_project-name">Кратко</div><div class="portf_project-copy">Создан <span href="#" class="portf_link portf_project-link">Super Studio Web</span></div></div></a>')
                equalHeights()
            }

			scrollTo(toScroll, 600)
            lessBtn.removeClass('is-hidden')
        })

        lessBtn.on('click', function(e) {
	        e.preventDefault();
	        
            state.clickCount = 0;
            state.hiddenPackagesCount = loadContainer.children().length / 3;

            loadContainer.children().addClass('is-hidden')
            lessBtn.addClass('is-hidden')
            moreBtnArea.removeClass('is-hidden')
            moreBtn.removeClass('is-hidden')

            var toScroll = $(root).offset().top;
			scrollTo(toScroll, 600)
        })

    }

    for (var i in prefixes) {
      showMoreSites(
        buttons[i],
        buttonAreas[i],
        lessButtons[i],
        loadedContainers[i],
        containers[i],
        loadUrls[i]
      )
    }
    
    
    function scrollTo(toScroll, time) {
	    $("body, html").animate({
            scrollTop: toScroll
        }, time);
    }

    // detect IE and Edge

    function detectIEAndEdge() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            $('html').addClass('is-ieOrEdge')
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            $('html').addClass('is-ieOrEdge')
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            $('html').addClass('is-ieOrEdge')
        }

        // other browser
        return false;
    }

    detectIEAndEdge();

    //making sites height the same on one row

    function equalHeights() {
        var $projectItems = $('.portf_project-item')
        $projectItems.each(function() {
            $(this).removeAttr('style')
        })

        function changeHeight(index, element) {
			var $el = $(element)
            if (index % itemsInPackage === 0) {
				var set = [$el],
					heights = [],
					max = 0
					
				for (var i = 1; i < itemsInPackage; i++) {
					set.push(set[set.length - 1].next())
				}

                $.each(set, function(i, el) {
                    heights.push($(el).height())
                })

                max = Math.max.apply(null, heights)
                $.each(set, function(i, el) {
                    el.height(max)
                })

            }

        };
        
        $projectItems.each(changeHeight)
    }
    equalHeights();

    $(window).resize(function() {
        equalHeights()
    })

})
