$(function () {
	if ($(".box-post-slider").length > 0) {
		var swiper_slider = new Swiper(".box-post-slider", {
			slidesPerView: 1,
			// spaceBetween: 10,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});
	}

	if ($("#menu-nav").length > 0) {
		if (typeof hcOffcanvasNav == "undefined") {
			console.warn("Warning - hcOffcanvasNav Js is not loaded.");
			return;
		}
		if ($(".navbar-toggle").length == 0) {
			console.warn(
				"Warning - Thieu button navbar-toggle. Kiem tra lai HTML!"
			);
			return;
		}
		var $nav = $("#menu-nav").hcOffcanvasNav({
			disableAt: 1200,
			customToggle: ".navbar-toggle",
			levelSpacing: 0,
			levelTitles: true,
			levelTitleAsBack: true,
			labelBack: "Quay lại",
			labelClose: "",
			// expanded: true,
			levelOpen: 'expand'
		});
		var Nav = $nav.data("hcOffcanvasNav");
	}

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