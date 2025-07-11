'use client';
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var themeProvider_1 = require("@/components/ui/theme-Provider/themeProvider");
var clsx_1 = require("clsx");
function ButtonBack() {
    var router = navigation_1.useRouter();
    var isDark = themeProvider_1.useDarkTheme().isDark;
    var handleBack = function () {
        router.back();
    };
    return (React.createElement("button", { onClick: handleBack, className: window.innerWidth > 768
            ? clsx_1["default"](isDark ? 'buttonSecondDark' : 'buttonSecond', 'mt-2 w-full max-w-[100px] rounded-full bg-custom-blue-800 px-[14px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD')
            : clsx_1["default"](isDark ? 'buttonSecondDark' : 'buttonSecond', 'mt-1 w-full max-w-[50px] rounded-full bg-custom-blue-800 px-[10px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD') }, window.innerWidth > 768 ? 'Volver' : '←'));
}
exports["default"] = ButtonBack;
