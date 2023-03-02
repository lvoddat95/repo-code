$(function () {
    if ($('#ks_filter_total').length > 0) {
		$('#ks_filter_total').on('show.bs.collapse', function () {
			$("body").addClass("overlay-filter");
		});
		$('#ks_filter_total').on('hide.bs.collapse', function () {
			$("body").removeClass("overlay-filter");
		});

		$(".close-popup-total").click(function (e) { 
			e.preventDefault();
			$('#ks_filter_total').collapse('hide');
		});
	};

	if ($('[data-sticky]').length > 0) {
		var sticky = new Sticky('[data-sticky]');
	};


    if ($(".ks-mb-banner-slider").length > 0) {
        var main_slider = new Swiper(".ks-mb-banner-slider", {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    if ($(".ks-mb-category-slider").length > 0) {
        var category_slider = new Swiper(".ks-mb-category-slider", {
            slidesPerView: 4,
            spaceBetween: 5,
            freeMode: true,
            pagination: {
                el: ".cate-swiper-pagination",
                type: "progressbar",
            },
        });
    };



    if ($(".ks-mb-products-slider").length > 0) {
        var product_slider = new Swiper(".ks-mb-products-slider", {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: ".mb-products-button-next",
                prevEl: ".mb-products-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },
            },
        });
    }

});


var show_search_box = function(p_this){
    $(p_this).focus();
    $("#ks_mb_search").show();
    console.log("show");
}

var hide_search_box = function(p_this){
    $(p_this).focus();
    $("#ks_mb_search").hide();
    console.log("hide");
}

// $(".ks_close_search_box").click(function(e) {
//     $("#ks_search_box").hide();
// });