'use client';
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var themeProvider_1 = require("@/components/ui/theme-Provider/themeProvider");
function convertDate(date) {
    var listDate = date.split('-').reverse();
    return listDate[0] + "/" + listDate[1] + "/" + listDate[2];
}
var BlogPostCard = function (_a) {
    var blog_id = _a.blog_id, title = _a.title, description = _a.description, image = _a.image, category = _a.category, date = _a.date, slug = _a.slug;
    var isDark = themeProvider_1.useDarkTheme().isDark;
    return (React.createElement(link_1["default"], { href: "blog/" + slug, className: "flex h-full w-full" },
        React.createElement("div", { className: "flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-custom-blue bg-white shadow-md shadow-black/25 transition-transform hover:scale-[1.02] hover:text-white dark:border-inputDark dark:bg-[#323232]" },
            React.createElement("div", { className: "relative h-0 w-full pb-[56.25%]" },
                ' ',
                React.createElement(image_1["default"], { src: image, className: "absolute left-0 top-0 h-full w-full rounded-t-[28px] object-cover p-3", alt: title, fill: true, sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" })),
            React.createElement("div", { className: "flex flex-grow flex-col" },
                React.createElement("div", { className: "p-4" },
                    React.createElement("p", { className: "font-roboto mb-2 text-xs font-normal text-black transition-colors dark:text-darkText md:text-sm" }, category),
                    React.createElement("h3", { className: "font-roboto mb-2 line-clamp-2 text-lg font-semibold text-black transition-colors dark:text-darkText md:text-xl" }, title),
                    React.createElement("p", { className: "font-roboto mb-4 line-clamp-3 text-sm font-light text-black transition-colors dark:text-darkText md:text-base" }, description)),
                React.createElement("div", { className: "mt-auto border-t border-gray-300 p-4 pt-3" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2" },
                        React.createElement("div", { className: "group flex items-center gap-1 p-1 transition duration-300 group-hover:scale-105" },
                            React.createElement(link_1["default"], { href: "blog/" + slug, className: "inline-block" },
                                React.createElement("div", { className: "px-4 py-2 text-sm text-[#969696] transition duration-300 ease-in-out hover:font-bold hover:text-custom-blue hover:underline dark:hover:text-white md:text-base" }, "M\u00E1s informaci\u00F3n")),
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faArrowRight, className: "ease ml-2 text-[#969696] transition duration-50 ease-in-out group-hover:font-bold  " + (isDark ? 'group-hover:text-white' : 'group-hover:text-custom-blue') + " " })),
                        React.createElement("p", { className: "text-sm text-[#969696] md:text-base" }, date ? convertDate(date) : 'Fecha no disponible')))))));
};
exports["default"] = BlogPostCard;
