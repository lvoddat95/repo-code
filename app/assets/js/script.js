$(function () {
	
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


	if ($(".post-box-slider").length > 0) {
		var swiper_slider = new Swiper(".post-box-slider", {
			slidesPerView: 1,
			// spaceBetween: 10,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay: {
				delay: 3500,
				disableOnInteraction: false
			},
		});
	}

	if ($().datepicker) {
		$("#datepicker").datepicker({
			showButtonPanel: true,
			changeMonth: true,
			changeYear: true,
			dateFormat: 'dd/mm/yy',
			onSelect: function (dateText, inst) {
				if (dateText !== inst.lastVal) {
					$(this).trigger("change");
				}

				$.ajax({
					url: "modal.html",
					data: {
						LiturgyDateTime: dateText
					},
					contentType: "html",
					success: function (response) {
						console.log(response);
						$("#myCalendar").html(response);
						var myCalendar = new bootstrap.Modal($('#myCalendar'));
						myCalendar.show()
					},
					error: function () {
						alert(dateText + "Không có dữ liệu.");
					}
				});
			}
		});
	}


	// if ($('#lich-cong-giao').length > 0) {

	// 	$('#lich-cong-giao').datetimepicker({
	// 		language: 'vi',
	// 		date: new Date(),
	// 		viewMode: 'YMDHMS',
	// 		//date selection event
	// 		onDateChange: function () {
	// 			console.log(this.getText());
	// 			console.log(this.getValue());

	// 			return

	// 			$.ajax({
	// 				url: "modal.html",
	// 				data: {
	// 					LiturgyDateTime: this.getText()
	// 				},
	// 				contentType: "html",
	// 				success: function (response) {
	// 					console.log(response);
	// 					$("#myCalendar").html(response);
	// 					var myCalendar = new bootstrap.Modal($('#myCalendar'));
	// 					myCalendar.show()
	// 				},
	// 				error: function () {
	// 					alert(this.getText() + "Không có dữ liệu.");
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	if ($('#myCalendar').length > 0) {
		$('#myCalendar').on('hidden.bs.modal', function (e) {
			$(this).html("");
		});
	}

	// Len dau trang
	$(".back-to-top").on("click", function () {
		$("html, body").animate({
				scrollTop: 0,
			},
			500
		);
	});

	window.addEventListener("scroll", function () {
		var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
		if (currentScroll >= 100) {
			document.getElementById("back-to-top").style.display = "block";
		} else {
			document.getElementById("back-to-top").style.display = "none";
		}
	});


});