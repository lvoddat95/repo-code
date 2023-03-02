
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


	var swiper = new Swiper(".ks-product-thumbnail", {
		spaceBetween: 10,
		slidesPerView: 6,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var swiper2 = new Swiper(".ks-product-img-main", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
	});


	if ($('[data-fancybox="gallery"]').length > 0) {
		Fancybox.bind('[data-fancybox="gallery"]', {
			// Your custom options
		});
	}

	if ($(".ks-adv-slider").length > 0) {
		var main_slider = new Swiper(".ks-adv-slider", {
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

	$(document).on("click", "#clickShowSendReview", function () {
		$("#ks_review_pdp_show_npv").css("display", "none");
		$("#clickShowSendReview").css("display", "none");
		$("#send_vote_npv").css("display", "flex");
		$(".wrap_post_composer_pdp").css("display", "block");
	});

	if ($(".ks-products-slider").length > 0) {
		var product_slider = new Swiper(".ks-products-slider", {
			slidesPerView: 2,
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 5,
				},
			},
		});
	}


	if ($(".ks-category-list").length > 0) {
		var category_slider = new Swiper(".ks-category-list", {
			slidesPerView: 10,
			spaceBetween: 10,
			freeMode: true,
			// pagination: {
			//     el: ".cate-swiper-pagination",
			//     type: "progressbar",
			// },
		});
	};


	var swiper = new Swiper(".nav-newscate", {
		slidesPerView: "auto",
		freeMode: true,
	});

	// Len dau trang
	$(".go-top").on("click", function () {
		$("html, body").animate({
			scrollTop: 0,
		},
			500
		);
	});


});


// Mobile JS
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
