$(function () {

	if ($('#ks_filter_total').length > 0) {
		$('#ks_filter_total').on('show.bs.collapse', function () {
			$("body").addClass("overlay-filter");
			$('html, body').animate({
				scrollTop: $(".ks-combination").offset().top
			}, 500);
		});
		$('#ks_filter_total').on('hide.bs.collapse', function () {
			$("body").removeClass("overlay-filter");
		});

		$(".close-popup-total").click(function (e) {
			e.preventDefault();
			$('#ks_filter_total').collapse('hide');
		});
	};

	$('.comment-btn__item blue').on('click', function () {
		$('.read-assess').addClass('showR');
		return false;
	});


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

	if ($('[data-fancybox="review"]').length > 0) {
		Fancybox.bind('[data-fancybox="review"]', {
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
			loop: false,
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

	// Lấy thẻ div cần theo dõi
	const div = document.querySelector('#product-actions-fieldset');

	// Lắng nghe sự kiện cuộn
	window.addEventListener('scroll', () => {
		if (isInViewport(div)) {
			document.body.classList.remove('show-buynow');
		} else {
			document.body.classList.add('show-buynow');
		}
	});

	// Hàm kiểm tra xem một phần tử có hiển thị trên màn hình hay không
	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

});

function do_active_slt(elem) {
	// get all 'a' elements
	var li = document.querySelectorAll('ul.ul-star > li');
	// loop through all 'a' elements
	for (i = 0; i < li.length; i++) {
		// Remove the class 'active' if it exists
		li[i].classList.remove('active-slt')
	}
	// add 'active' classs to the element that was clicked
	elem.classList.add('active-slt');
}

var showInputRating = function () {
	$(".read-assess").show();
	$("body").addClass("overlay");
}

var hideInputRating = function () {
	$(".read-assess").hide();
	$("body").removeClass("overlay");
}

var show_search_box = function (p_this) {
	$(p_this).focus();
	$("#ks_mb_search").show();
}

var hide_search_box = function (p_this) {
	$(p_this).focus();
	$("#ks_mb_search").hide();
}
var likeRating = function () {
	$(".click-like").find("i").removeClass('icondetail-likewhite');
	$(".click-like").find("i").addClass('icondetail-like');
}

var showRatingCmtChild = function (pid) {
	$(".r" + pid).show();
}
var ratingRelply = function (pid) {
	$(".rRepPopup").show();
	$("body").addClass("overlay");
}
var hideReplyConfirmPopup = function (pid) {
	$(".rRepPopup").hide();
	$("body").removeClass("overlay");
}