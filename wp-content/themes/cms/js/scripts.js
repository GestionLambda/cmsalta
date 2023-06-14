/*! starter-theme - v1.0.0 - 2021-12-28 */
(function($) {
    "use strict";
    var mr = mr || {};
    mr.init = function() {
        this.$window = $(window);
        this.$body = $(document.body);
        // this.data =  mrData || {};
        this.header();
        this.nav();
        this.sliders();
        this.popups();
        this.tabs();
        this.filter();
        //this.productImagesLightbox();
        // this.reveal();
        // this.parallax(); 
        //      this.toggleModal();
        // this.instanceSearch();
        // this.loginModalAuthenticate();
        //    this.singeProductAjaxAddToCart();
        //this.openCartModalAfterAdd();
        $(document.body).trigger(" mr_init", [ mr ]);
    };
    mr.header = function() {
        /**************HEADER MENU**************/
        if ($(document).scrollTop() > 100) {
            $(".page-wrap ").removeClass("default").addClass("fijo");
        } else {
            $(".page-wrap ").removeClass("fijo").addClass("default");
        }
        $(document).on("scroll", function() {
            if ($(document).scrollTop() > 100) {
                $(".page-wrap ").removeClass("default").addClass("fijo");
            } else {
                $(".page-wrap ").removeClass("fijo").addClass("default");
            }
        });
    };
    mr.nav = function() {
        /************** NAV MENU *******************/
        // Cache selectors
        var lastId, topMenu = $(".home #std-menu"), topMenuHeight = topMenu.outerHeight() + 0, // All list items
        menuItems = topMenu.find(".link > a"), // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function(e) {
            var href = $(this).attr("href"), offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 900);
            e.preventDefault();
        });
        // Bind to scroll
        $(window).scroll(function() {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight + 1;
            // Get id of current scroll item
            var cur = scrollItems.map(function() {
                if ($(this).offset().top < fromTop) return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
            }
        });
        /************** NAV MENU *******************/
        // --- Variables: The offset required for smooth scroll.
        var offset = 90;
        // --- Function: Smooth scroll to section & apply offset.
        function navScroll(href, offset) {
            $("body,html").animate({
                scrollTop: $(href).offset().top - offset
            }, 1200);
        }
        /* Hook: Main navigation Smooth Scroll
------------------------------------------------------------------- */
        $("footer .link a, #home a.link, a.link, .link a").click(function() {
            // Enable Smooth Scroll
            navScroll($(this).attr("href"), offset);
            return false;
        });
        /************** responsive MENU *******************/
        $(document).ready(function() {
            menumob();
            submenumob();
            catmenumob();
        });
        function menumob() {
            var menuTrigger = $("#menu-trigger a.trigger");
            var menuOverlay = $(".menu_overlay");
            menuTrigger.click(function(e) {
                e.preventDefault();
                $("#responsive-menu").addClass("active");
                $(".menu_overlay").addClass("active");
            });
            menuOverlay.click(function(e) {
                e.preventDefault();
                $("#responsive-menu").removeClass("active");
                $(".menu_overlay").removeClass("active");
            });
            $("#responsive-menu .menu_container a").click(function(e) {
                $("#responsive-menu").removeClass("active");
                $(".menu_overlay").removeClass("active");
            });
        }
        function submenumob() {
            var menuTrigger = $("#submenu-trigger");
            menuTrigger.click(function(e) {
                e.preventDefault();
                $("#responsive-submenu").toggleClass("open");
            });
            $("#responsive-submenu  div").click(function(e) {
                $("#responsive-submenu").toggleClass("open");
            });
        }
        function catmenumob() {
            /*   var menuTrigger = $("#cat-menu-trigger");

    menuTrigger.click(function(e) {
        e.preventDefault();
     $("#cat-menu").slideToggle();
     $("#cat-menu ul li ").removeClass("is-selected");
    });

    $("#responsive-submenu a").click(function(e) {
        $("#cat-menu").slideToggle();
    });
*/
            var windowsize = $(window).width();
            $(window).resize(function() {
                var windowsize = $(window).width();
            });
            if (windowsize < 960) {
                $(".filtros-container").show();
                $(".filtros-container").appendTo("#responsive-submenu .filtros-m");
            } else {}
        }
        /************** go top *******************/
        $(".home #navlogo a,.home #mobile_logo , .gotop").click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 1200, "easeInOutQuad");
        });
        $("#mobile_nav").click(function(e) {
            e.preventDefault();
        });
    };
    mr.sliders = function() {
        $(".slider-images").on("init.slick", function(event, slick) {
            setTimeout(function() {
                if ($(".slider-images").hasClass("slick-initialized")) {
                    $(".slider-container").addClass("init");
                } else {
                    $(".slider-container").removeClass("init");
                }
            }, 0);
        });
        //home slider
        $(".slider-images").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: false,
            gap: 0,
            //vertical: true,
            //verticalSwiping: true,
            //adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5e3,
            speed: 600,
            pauseOnHover: false,
            asNavFor: ".slider-content"
        });
        $(".slider-content").slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: ".slider-images",
            dots: true,
            fade: true,
            // adaptiveHeight: true,
            focusOnSelect: true
        });
        $(".quienes-slider").each(function(index) {
            var randomSpeed = 2e3 * (index + 1);
            // code to calculate random speed here
            $(this).slick({
                arrows: false,
                infinite: true,
                speed: 1e3,
                autoplay: true,
                autoplaySpeed: randomSpeed,
                fade: true,
                pauseOnHover: false,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    mr.popups = function() {
        $('.single-format-standard .hentry a[href*=".jpg"], .single-format-standard a[href*=".jpeg"], .single-format-standard a[href*=".png"], .single-format-standard a[href*=".gif"],a.popup-img').each(function() {
            if ($(this).parents(".gallery").length === 0) {
                $(this).magnificPopup({
                    type: "image",
                    fixedContentPos: false,
                    closeOnContentClick: true,
                    tLoading: '<div id="loader2">Cargando...</div>',
                    mainClass: "mfp-zoom-out",
                    removalDelay: 500
                });
            }
        });
        $(".hentry .gallery, .planos-container .img-container").each(function() {
            $(this).magnificPopup({
                tLoading: '<div id="loader2">Cargando...</div>',
                mainClass: "mfp-zoom-out",
                fixedContentPos: false,
                removalDelay: 500,
                delegate: "a",
                type: "image",
                gallery: {
                    tCounter: "%curr% de %total%",
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [ 0, 1 ]
                }
            });
        });
    };
    //////
    mr.tabs = function() {};
    //////
    mr.filter = function() {
        var alm_is_animating = false;
        // No errors
        var elem = document.querySelector(".botones-nav li:first-child");
        if (elem) {
            elem.classList.add("active");
        }
        //document.querySelector('.botones-nav li:first-child').classList.add('active'); // Set initial active state
        // Click Event
        function filterClick() {
            event.preventDefault();
            // Get parent `<li/>`
            var parent = this.parentNode;
            if (parent.classList.contains("active") && !alm_is_animating) {
                // Exit if active
                return false;
            }
            alm_is_animating = true;
            // Animation flag   
            var active = document.querySelector(".botones-nav li.active");
            // Get `.active` element
            if (active) {
                active.classList.remove("active");
            }
            parent.classList.add("active");
            // Add active class
            // Set filters 
            var transition = "fade";
            var speed = 250;
            var data = this.dataset;
            // Call core Ajax Load More `filter` function
            ajaxloadmore.filter(transition, speed, data);
        }
        // Event Handlers
        var filter_buttons = document.querySelectorAll(".botones-nav li a");
        if (filter_buttons) {
            [].forEach.call(filter_buttons, function(button) {
                button.addEventListener("click", filterClick);
            });
        }
        // Callback
        window.almFilterComplete = function() {
            alm_is_animating = false;
        };
        //////////////////////
        $(document).on("facetwp-refresh", function() {
            $(".facetwp-template").animate({
                opacity: 0
            }, 200);
        });
        $(document).on("facetwp-loaded", function() {
            $(".facetwp-template").animate({
                opacity: 1
            }, 200);
        });
    };
    /**
   * Document ready
   */
    $(function() {
        mr.init();
    });
})(jQuery);