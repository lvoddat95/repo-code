$(function () {

	if ($(".post-box-slider").length > 0) {
		var swiper_slider = new Swiper(".post-box-slider", {
			slidesPerView: 1,
			// spaceBetween: 10,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
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
		// Lấy vị trí hiện tại của trang web
		var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
		// Nếu vị trí hiện tại lớn hơn hoặc bằng 100px, hiển thị nút "Lên đầu trang"
		if (currentScroll >= 100) {
			document.getElementById("back-to-top").style.display = "block";
		}
		// Ngược lại, ẩn nút "Lên đầu trang"
		else {
			document.getElementById("back-to-top").style.display = "none";
		}
	});


});