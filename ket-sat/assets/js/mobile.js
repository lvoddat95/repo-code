$(function () {


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
            spaceBetween: 5,
            loop: true,
            navigation: {
                nextEl: ".mb-products-button-next",
                prevEl: ".mb-products-button-prev",
            },
        });
    }


});
