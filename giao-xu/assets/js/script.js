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



	if ($("#main-menu").length > 0) {
		if (typeof hcOffcanvasNav == "undefined") {
			console.warn("Warning - hcOffcanvasNav Js is not loaded.");
			return;
		}
		if ($(".navbar-toggle").length == 0) {
			console.warn(
				"Warning - Thieu button sidebar-mobile-main-toggle. Kiem tra lai HTML!"
			);
			return;
		}
		var $nav = $("#main-menu").hcOffcanvasNav({
			disableAt: 1200,
			customToggle: ".navbar-toggle",
			levelSpacing: 0,
			navTitle: "Danh Sách Menu",
			levelTitles: true,
			levelTitleAsBack: true,
			// pushContent: '#ci-content',
			labelBack: "Quay lại",
			labelClose: "",
		});
		var Nav = $nav.data("hcOffcanvasNav");
	}

	$(".ci-btn-mua-bh").on("click", function () {
		$("html, body").animate({
				scrollTop: $("#ci-package-block").offset().top,
			},
			900
		);
	});

	// Len dau trang
	$(".go-top").on("click", function () {
		$("html, body").animate({
				scrollTop: 0,
			},
			500
		);
	});

	SlickSlider();

	function SlickSlider() {
		if ($(".data-slick-slider").length > 0) {
			$(".data-slick-slider").each(function (e) {
				var seff = $(this);
				var otps = JSON.parse(JSON.stringify(seff.data("slick")));
				seff.not(".slick-initialized").slick(otps);
			});
		}
	}

	FLoatLabel();

	function FLoatLabel() {
		$(".float-label input")
			.on("focus", function () {
				var _parent = $(this).parent();
				var _label = _parent.find("label");
				_label.addClass("label-focus");
			})
			.blur(function () {
				var _label = $(this).parent().find("label");
				if ($(this).val().trim() === "") {
					_label.stop().removeClass("label-focus");
				}
			});
	}

	$(".package-select-control").on("change", function () {
		var val = $(this).val();
		var sotienbh = $("#package-sotienbh").find(".sotienbh > span");
		var phibh = $("#package-phibh").find(".phibh > span");

		switch (val) {
			case "100":
				sotienbh.html("100.000.000");
				phibh.html("100.000");
				break;
			case "200":
				sotienbh.html("200.000.000");
				phibh.html("200.000");
				break;
			case "300":
				sotienbh.html("300.000.000");
				phibh.html("300.000");
				break;
			case "400":
				sotienbh.html("400.000.000");
				phibh.html("400.000");
				break;
			case "500":
				sotienbh.html("500.000.000");
				phibh.html("500.000");
				break;

			default:
				break;
		}
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

if ($(".prgoress_indicator").length) {
	if ($(".prgoress_indicator path").length) {
		var progressPath = document.querySelector(".prgoress_indicator path");
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition =
			"none";
		progressPath.style.strokeDasharray = pathLength + " " + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition =
			"stroke-dashoffset 10ms linear";
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength) / height;
			progressPath.style.strokeDashoffset = progress;
		};
		updateProgress();
		$(window).on("scroll", updateProgress);
	}
	var offset = 250;
	var duration = 550;
	jQuery(window).on("scroll", function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery(".prgoress_indicator").addClass("active-progress");
		} else {
			jQuery(".prgoress_indicator").removeClass("active-progress");
		}
	});
	// jQuery('.prgoress_indicator').on('click', function (event) {
	//     event.preventDefault();
	//     jQuery('html, body').animate({
	//         scrollTop: 0
	//     }, duration);
	//     return false;
	// });
}

var fancybox_new_modal = function (source) {
	parent.jQuery.fancybox.getInstance().close();
	fancybox_modal(source, false);
};

var show_package_select = function (p_this) {
	$(".package-select").slideToggle("fast");
};

var chose_payment = function (p_this) {
	var input = $(p_this).find("input[type=radio]");
	input.prop("checked", true);
	$(".payment-menthod-box").removeClass('active');
	$(p_this).addClass('active');
	var payment = input.val();
	var payment_info = $("#payment-info").data("info");

	if (payment == payment_info) {
		$("#payment-info").slideDown('fast');
	} else {
		$("#payment-info").slideUp('fast');
	}
};

var chosse_bank = function (p_this) {};

$("#payment-info .img-bank").on("click", function (e) {
	$("#payment-info .img-bank").removeClass("active");
	$(this).addClass("active");
	let currentTab = $(this).attr("href");
	$(".bank-info ul").hide().removeClass("active");
	$(currentTab).show().addClass("active");
	return false;
});

var copy_text = function (element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).prev().text()).select();
	document.execCommand("copy");
	$(element).text("Đã sao chép");
	$temp.remove();
};

$(window).on("scroll", function (e) {
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
	if ($(".ci-about-block").length > 0) {
		if (
			$(window).scrollTop() >=
			$(".ci-about-block").offset().top - $(window).height()
		) {
			if (!$(".ci-about-block").hasClass("animated")) {
				$(".ci-count").each(function () {
					$(this)
						.prop("Counter", 0)
						.animate({
							Counter: $(this).text(),
						}, {
							duration: 4000,
							easing: "swing",
							step: function (now) {
								$(this).text(numberWithCommas(Math.ceil(now)));
							},
						});
				});
				// $("#triggered").addClass("show");
				$(".ci-about-block").addClass("animated");
			}
		}
	}
});

// UPload file
$(document).ready(function () {
	function padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}

	function formatDate(date) {
		return [
			padTo2Digits(date.getMonth() + 1),
			padTo2Digits(date.getDate()),
			date.getFullYear(),
		].join("/");
	}

	$(".input-file").each(function (index, elem) {
		let file_list = $(elem).closest("tr").find(".input-list-files");
		$(elem).on("change", function (event) {
			var files = event.target.files;
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				console.log(file);
				var html = `<div class="file-item">
                                <div class="file-item__text">${file.name}</div>
                                <div class="file-item__datetime">Ngày tải lên: ${formatDate(
					file.lastModifiedDate
				)}</div>
                                <div class="file-item__remove" data-id="${file.name
					}">Xoá</div>
                            </div>`;
				file_list.append(html);
			}
		});
	});

	$("body").on("click", ".file-item__remove", function () {
		$(this).parent(".file-item").remove();
	});
});

$(function () {
	$(".btn-toc").on("click", function () {
		$(".ftoc").toggleClass("open");
	});

	// if($(this).width() <= 1600){
	//     $(".ftoc").removeClass('open');
	// }

	$(window).resize((event) => {
		const screenWidth = window.screen.width;
		let windowWidth = $(this).width(); //this = window

		// console.log(screenWidth)
		// console.log(windowWidth)

		// Window width
		if (windowWidth <= 1600) {
			$(".ftoc").removeClass("open");
		} else {
			$(".ftoc").addClass("open");
		}

		// Window width
		if (screenWidth <= 1600) {
			$(".ftoc").removeClass("open");
		}
	});

	if ($('[data-tooltip="tipsy"]').length > 0) {
		if (!$().tipsy) {
			console.warn("Warning - Tipsy js is not loaded.");
			return;
		}
		$('[data-tooltip="tipsy"]').each(function (index) {
			var $this = $(this);
			var v_gravity = "";
			var v_pos = $this.data("position");

			// Mac dinh hien thi "top"
			if (!v_pos || v_pos == "top") {
				v_gravity = "s";
			} else if (v_pos == "bottom") {
				v_gravity = "n";
			} else if (v_pos == "left") {
				v_gravity = "e";
			} else if (v_pos == "right") {
				v_gravity = "w";
			} else if (v_pos == "bottom-left") {
				v_gravity = "ne";
			} else if (v_pos == "bottom-right") {
				v_gravity = "nw";
			} else if (v_pos == "top-left") {
				v_gravity = "se";
			} else if (v_pos == "top-right") {
				v_gravity = "sw";
			}

			$this.tipsy({
				gravity: v_gravity,
				html: true,
			});
		});
	}

	if ($(".toc").length > 0) {
		var toc = document.querySelector(".toc");
		var tocPath = document.querySelector(".toc-marker path");
		var tocItems;

		// Factor of screen size that the element must cross
		// before it's considered visible
		var TOP_MARGIN = 0.1,
			BOTTOM_MARGIN = 0.2;

		var pathLength;

		var lastPathStart, lastPathEnd;

		window.addEventListener("resize", drawPath, false);
		window.addEventListener("scroll", sync, false);

		drawPath();

		function drawPath() {
			tocItems = [].slice.call(toc.querySelectorAll("li"));

			// Cache element references and measurements
			tocItems = tocItems.map(function (item) {
				var anchor = item.querySelector("a");
				var target = document.getElementById(
					anchor.getAttribute("href").slice(1)
				);

				return {
					listItem: item,
					anchor: anchor,
					target: target,
				};
			});

			// Remove missing targets
			tocItems = tocItems.filter(function (item) {
				return !!item.target;
			});

			var path = [];
			var pathIndent;

			tocItems.forEach(function (item, i) {
				var x = item.anchor.offsetLeft - 5,
					y = item.anchor.offsetTop,
					height = item.anchor.offsetHeight;

				if (i === 0) {
					path.push("M", x, y, "L", x, y + height);
					item.pathStart = 0;
				} else {
					// Draw an additional line when there's a change in
					// indent levels
					if (pathIndent !== x) path.push("L", pathIndent, y);

					path.push("L", x, y);

					// Set the current path so that we can measure it
					tocPath.setAttribute("d", path.join(" "));
					item.pathStart = tocPath.getTotalLength() || 0;

					path.push("L", x, y + height);
				}

				pathIndent = x;

				tocPath.setAttribute("d", path.join(" "));
				item.pathEnd = tocPath.getTotalLength();
			});

			pathLength = tocPath.getTotalLength();

			sync();
		}

		function sync() {
			var windowHeight = window.innerHeight;

			var pathStart = pathLength,
				pathEnd = 0;

			var visibleItems = 0;

			tocItems.forEach(function (item) {
				var targetBounds = item.target.getBoundingClientRect();

				if (
					targetBounds.bottom > windowHeight * TOP_MARGIN &&
					targetBounds.top < windowHeight * (1 - BOTTOM_MARGIN)
				) {
					pathStart = Math.min(item.pathStart, pathStart);
					pathEnd = Math.max(item.pathEnd, pathEnd);

					visibleItems += 1;

					item.listItem.classList.add("visible");
				} else {
					item.listItem.classList.remove("visible");
				}
			});

			// Specify the visible path or hide the path altogether
			// if there are no visible items
			if (visibleItems > 0 && pathStart < pathEnd) {
				if (pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
					tocPath.setAttribute("stroke-dashoffset", "1");
					tocPath.setAttribute(
						"stroke-dasharray",
						"1, " + pathStart + ", " + (pathEnd - pathStart) + ", " + pathLength
					);
					tocPath.setAttribute("opacity", 1);
				}
			} else {
				tocPath.setAttribute("opacity", 0);
			}

			lastPathStart = pathStart;
			lastPathEnd = pathEnd;
		}
	}
});

var show_thanh_vien_gioi_thieu = function (p_this) {
	if ($(p_this).is(":checked")) {
		$("#thanh-vien-gioi-thieu").slideDown("fast");
	} else {
		$("#thanh-vien-gioi-thieu").slideUp("fast");
	}
};
var _toggle_elem = function (selector) {
	let emo_count = parseInt($(selector).find(".cmt_emo_count").text());
	if (!$(selector).hasClass("active")) {
		$(selector).find(".cmt_emo_count").text(emo_count + 1);
	}
	$(selector).closest(".cmt_action").find(".cmt_emo").removeClass("active");

	$(selector).addClass("active");

}

var comment_reply = function (selector) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		let rep = $(selector).closest(".comment_ask").find(".cmt_info");
		let rep_form = rep.find(".cmt_rep_form");
		let rep_form_html = '<form id="comment_reply_form" class="cmt_rep_form">' +
			'<div class="cmt_sub"><textarea class="form-control" placeholder="Nhập nội dung ý kiến..." name="" id="" rows="2"></textarea>' +
			'</div></form>';
		if (rep_form.length == 0) {
			rep.append(rep_form_html);
		} else {
			rep_form.remove();
		}
	}
}

// Banner video
if ($('.banner-video').length > 0) {
	$('.banner-video').each(function () {
		var self = $(this);
		var this_video = self.find('.video-play');
		var attr_video = this_video.attr('poster');
		var video = this_video.get(0);

		if (typeof attr_video !== typeof undefined && attr_video !== false) {
			video.pause();
		}

		self.find('.video-button').on('click', function (event) {
			event.preventDefault();
			this_video.attr('poster', '');
			self.toggleClass('clicked');
			$(this).toggleClass('active');
			if (video.paused) {
				video.play();
				// $(this).attr({
				// 	"title": "Pause"
				// });
			} else {
				video.pause();
				// $(this).attr({
				// 	"title": "Play"
				// });
			}
		});


		// self.find('.mute-video').on('click', function (event) {
		// 	event.preventDefault();
		// 	if (this_video.prop('muted')) {
		// 		this_video.prop('muted', false);
		// 		$(this).removeClass('muted');
		// 	} else {
		// 		this_video.prop('muted', true);
		// 		$(this).addClass('muted');
		// 	}

		// });

	});
}