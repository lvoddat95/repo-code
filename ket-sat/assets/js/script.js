$(function () {

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

// Show pass
var show_password = function (p_this) {
	var x = document.getElementById("password-input");
	if (x.type === "password") {
		x.type = "text";
		$(p_this).addClass("show");
	} else {
		x.type = "password";
		$(p_this).removeClass("show");
	}
};

var fancybox_modal = function (source, closeMethod = "true") {
	if (closeMethod == false) {
		clickSlide = false;
		clickOutside = false;
	} else {
		clickSlide = "close";
		clickOutside = "close";
	}

	$.fancybox.open({
		src: source,
		opts: {
			// btnTpl: {
			//     smallBtn: "",
			// },
			touch: false,                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			clickSlide: clickSlide,
			clickOutside: clickOutside,
		},
	});
};

var AlertMessage = function (source, urlBack) {
	Swal.fire({
		template: "#alert-message-template",
		title: "<strong>THÔNG BÁO</strong>",
		html: $(source).html(),
		width: 600,
		backdrop: `rgba(0,0,0,.8)`,
		position: "center",
		showCancelButton: false,
		showDenyButton: false,
		customClass: {
			htmlContainer: "entry_content",
			confirmButton: "btn ci-btn ci-bg-sub-color",
		},
		buttonsStyling: false,
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = urlBack;
		}
	});
};

var PopupMessage = function (source, urlBack) {
	Swal.fire({
		title: "<strong class='fz-24'><i class='fad fa-bullhorn me-3' style='color:orange;'></i>THÔNG BÁO</strong>",
		html: $(source).html(),
		width: 600,
		backdrop: `rgba(0,0,0,.4)`,
		position: "top",
		showCancelButton: true,
		showDenyButton: false,
		showConfirmButton: false,
		cancelButtonText: "Đóng",
		customClass: {
			htmlContainer: "entry_content",
			cancelButton: "btn ci-btn ci-btn-outline",
		},
		buttonsStyling: false,
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = urlBack;
		}
	});
};