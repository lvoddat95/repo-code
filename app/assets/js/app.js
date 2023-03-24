// // On page load or when changing themes, best to add inline in `head` to avoid FOUC
// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.documentElement.classList.add('dark');
// } else {
//     document.documentElement.classList.remove('dark');
// };

// function setDarkTheme() {
//     document.documentElement.classList.add("dark");
//     localStorage.theme = "dark";
// };

// function setLightTheme() {
//     document.documentElement.classList.remove("dark");
//     localStorage.theme = "light";
// };

// function onThemeSwitcherItemClick(event) {
//     const theme = event.target.dataset.theme;

//     if (theme === "system") {
//         localStorage.removeItem("theme");
//         setSystemTheme();
//     } else if (theme === "dark") {
//         setDarkTheme();
//     } else {
//         setLightTheme();
//     }
// };

// const themeSwitcherItems = document.querySelectorAll("#theme-switcher");
// themeSwitcherItems.forEach((item) => {
//     item.addEventListener("click", onThemeSwitcherItemClick);
// });


Vue.component("custom-input", {
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: [String, Number],
            default: "",
        },
        isRequired: {
            type: Boolean,
            default: true,
        },
        "data-type": {
            type: String,
            default: "",
        },
        "label-class": {
            type: String,
            default: "col-sm-4 col-form-label",
        },
        "content-class": {
            type: String,
            default: "col-sm-8",
        },
    },
    data() {
        return {
            error: null,
            controlClass: "form-control bg-gray-50 text-gray-900 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ",
            // Thêm một data property mới để giữ giá trị của prop "value"
            inputValue: this.value,
            initialValue: this.value, // Giá trị ban đầu của prop "value"
        };
    },
    watch: {
        // Theo dõi sự thay đổi của data property mới thay vì prop "value"
        inputValue(newValue) {
            // Kiểm tra nếu giá trị mới khác với giá trị ban đầu thì reset error về null
            if (this.isRequired && !newValue && newValue.length == 0) {
                this.error = `${this.label} bắt buộc nhập.`;
            } else if (newValue && this.dataType === "date" && !this.validateDate(newValue)) {
                this.error = `Định dạng ngày không hợp lệ. Vui lòng nhập ngày theo định dạng dd/mm/yyyy`;
            } else if (newValue && this.dataType === "email" && !this.validateEmail(newValue)) {
                this.error = `Định dạng Email không hợp lệ.`;
            } else if (newValue !== this.initialValue) {
                this.error = null;
                return
            }
            // Giữ giá trị mới này đồng bộ với prop "value"
            this.$emit("input", newValue);
        },
    },
    methods: {
        setError(message) {
            this.error = message;
        },
        resetError() {
            this.error = null;
        },
        resetInput() {
            this.inputValue = null;
        },
        reset: function() {
            // Reset giá trị của inputValue và error về giá trị ban đầu
            this.inputValue = this.initialValue;
            this.error = null;
        },
        validateDate(dateString) {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regex.test(dateString)) {
                return false;
            }
            const dateParts = dateString.split("/");
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);
            if (year < 1000 || year > 9999 || month == 0 || month > 12) {
                return false;
            }
            const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                monthLength[1] = 29;
            }
            return day > 0 && day <= monthLength[month - 1];
        },
        validateEmail(emailString) {
            // regular expression for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // check if email matches the regular expression
            if (emailRegex.test(emailString)) {
                // email is valid
                return true;
            } else {
                // email is invalid
                return false;
            }
        },
        validate() {
            if (this.isRequired && !this.inputValue) {
                this.setError(`${this.label} bắt buộc nhập.`);
                return false;
            } else if (this.dataType === "date" && !this.validateDate(this.inputValue)) {
                this.setError(
                    `Định dạng ngày không hợp lệ. Vui lòng nhập ngày theo định dạng dd/mm/yyyy`
                );
                return false;
            } else if (this.dataType === "email" && !this.validateEmail(this.inputValue)) {
                this.setError(`Định dạng Email không hợp lệ.`);
                return false;
            } else {
                this.resetError();
            }
            return true;
        },
    },
    template: `
    <div class="row mb-3">
        <label :for="id" :class="[labelClass]">{{ label }} <span class="text-danger">*</span></label>
        <div :class="[contentClass]">
            <input :id="id" :type="type" :name="name" :data-type="dataType" v-model="inputValue" :required="isRequired" 
            v-bind:class="[{ 'is-invalid': error }, controlClass]" >
            <div v-if="error" class="invalid-feedback position-static">
                {{ error }}
            </div>
        </div>
    </div>`,
});