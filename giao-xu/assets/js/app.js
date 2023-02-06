var App = function () {

    // Select2
    var _component_select2 = function (p_select, p_otps) {
        if (!$().select2) {
            console.warn('Warning - Select2 Js is not loaded.');
            return;
        }

        let select = $('[select2]');
        let otps = {
            language: "vi",
            minimumResultsForSearch: 5,
        };

        if (p_select) select = p_select;
        if (p_otps) otps = p_otps;

        if (select.length > 0) {

            $(select).select2(otps);

            $(select).each(function (index, element) {
                let attr_add_new_item = $(element).attr('select2-add-new-item');

                if (typeof attr_add_new_item != 'undefined') {
                    if (attr_add_new_item == "") {
                        attr_add_new_item = "Nhập giá trị thêm mới: ";
                    }

                    $(element).on("select2:close", function (e) {
                        let el = $(this);
                        if (el.val() === "new") {
                            let newval = prompt(attr_add_new_item);
                            if (newval !== null) {
                                el.append('<option>' + newval + '</option>')
                                    .val(newval);
                            }
                        }
                    });
                }

            });
        }
    }

    // Datepicker
    var _component_datepicker = function (p_datepicker) {

        if (!$().datepicker) {
            console.warn('Warning - Datepicker Js is not loaded.');
            return;
        }

        var datepicker = $('.datepicker');
        if (p_datepicker) datepicker = p_datepicker;

        if ($().datepicker) {

            $.datepicker._gotoToday = function (id) {
                var target = $(id);
                var inst = this._getInst(target[0]);
                if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                    inst.selectedDay = inst.currentDay;
                    inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                    inst.drawYear = inst.selectedYear = inst.currentYear;
                } else {
                    var date = new Date();
                    inst.selectedDay = date.getDate();
                    inst.drawMonth = inst.selectedMonth = date.getMonth();
                    inst.drawYear = inst.selectedYear = date.getFullYear();
                    // the below two lines are new
                    this._setDateDatepicker(target, date);
                    this._selectDate(id, this._getDateDatepicker(target));
                }
                this._notifyChange(inst);
                this._adjustDate(target);
            }

            $(datepicker).datepicker({
                firstDay: 1,
                showButtonPanel: true,
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy',
                onSelect: function (date, obj) {},
                beforeShow: function (input, obj) {
                    var picker = $(obj.dpDiv);
                    var v_type = $(input).attr('type');
                    var btn_today = picker.find('.ui-datepicker-current');

                    if (v_type == 'date') {
                        $(input).datepicker('option', 'dateFormat', 'yy-mm-dd');
                    }

                },

            })

        }
    }

    // Cleave js: dinh dang kieu nhap du lieu input
    var _component_input_type = function () {

        if (typeof Cleave == 'undefined') {
            console.warn('Warning - Cleave Js is not loaded.');
            return;
        }


        $('.input-money').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalScale: 5
            });
        });

        $('.input-date').toArray().forEach(function (field) {
            if ($(field).attr('type') == 'date') {
                return;
            }
            var input_date = new Cleave(field, {
                date: true,
                delimiter: '/',
                datePattern: ['d', 'm', 'Y'],
                // dateMin: '2000-01-01',
                // dateMax: '2099-01-01',
                copyDelimiter: true,
            });
        });

        $('.input-day').toArray().forEach(function (field) {
            new Cleave(field, {
                date: true,
                datePattern: ['d'],
                copyDelimiter: true,
            });
        });

        $('.input-month').toArray().forEach(function (field) {
            new Cleave(field, {
                date: true,
                datePattern: ['m'],
                copyDelimiter: true,
            });
        });

        $('.input-year').toArray().forEach(function (field) {
            new Cleave(field, {
                date: true,
                datePattern: ['Y'],
                copyDelimiter: true,
            });
        });


        $('.input-time').toArray().forEach(function (field) {
            new Cleave(field, {
                time: true,
                timePattern: ['h', 'm'],
                copyDelimiter: true,
            });
        });

        $('.input-float').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalScale: 5
            });
        });
        $('.input-number').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalMark: '',
                delimiter: ''
            });
        });
        $('.input-phone').toArray().forEach(function (field) {
            new Cleave(field, {
                phone: true,
                phoneRegionCode: 'VN',
            });
        });
        $('.input-bsx').toArray().forEach(function (field) {
            new Cleave(field, {
                blocks: [4, 5],
                uppercase: true
            });
        });
    }

    return {

        // Init truoc khi load trang
        initBeforeLoad: function () {

        },

        // Init sau khi load trang
        initAfterLoad: function () {},

        // Init Resize Trang
        initResize: function () {

        },

        // Initialize all components
        initComponents: function () {
            _component_select2();
            _component_datepicker();
            _component_input_type();
        },


        // Initialize core
        initCore: function () {
            App.initComponents();
        },

        // Initialize Select2
        initSelect2: function (p_select, p_otps) {
            _component_select2(p_select, p_otps);
        },

        // Initialize Datepicker
        initDatepicker: function () {
            _component_datepicker();
        }
    }
}();



// Initialize module
// ------------------------------

// When content is loaded
document.addEventListener('DOMContentLoaded', function () {
    App.initBeforeLoad();
    App.initCore();



});

// When page is fully loaded
window.addEventListener('load', function () {
    App.initAfterLoad();
});

// When page is resized
window.addEventListener('resize', function () {});