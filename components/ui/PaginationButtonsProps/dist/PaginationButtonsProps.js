'use client';
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var PaginationButtons = function (_a) {
    var totalPages = _a.totalPages, currentPage = _a.currentPage, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, onLoadingChange = _a.onLoadingChange, route = _a.route, className = _a.className;
    var router = navigation_1.useRouter();
    var changePage = function (newPage) {
        if (newPage === currentPage || newPage < 1 || newPage > totalPages)
            return;
        onLoadingChange === null || onLoadingChange === void 0 ? void 0 : onLoadingChange(true);
        router.push(route + "?page=" + newPage);
    };
    var getPageButtons = function (totalPages, currentPage) {
        if (totalPages <= 5)
            return Array.from({ length: totalPages }, function (_, i) { return i + 1; });
        var pages = [1];
        if (currentPage > 3)
            pages.push('...');
        var start = Math.max(2, currentPage - 1);
        var end = Math.min(totalPages - 1, currentPage + 1);
        for (var i = start; i <= end; i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2)
            pages.push('...');
        if (totalPages > 1)
            pages.push(totalPages);
        return pages;
    };
    var pageButtons = getPageButtons(totalPages, currentPage);
    return (React.createElement("div", { className: "flex items-center justify-center gap-1 md:gap-2 " + (className || '') },
        React.createElement("button", { onClick: function () { return changePage(1); }, disabled: currentPage === 1 || isLoading, "aria-label": "Go to first page", className: "hidden h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 sm:flex" },
            React.createElement(lucide_react_1.ChevronsLeft, { className: "h-6 w-6" })),
        React.createElement("button", { onClick: function () { return changePage(currentPage - 1); }, disabled: currentPage === 1 || isLoading, "aria-label": "Go to previous page", className: "flex h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600" },
            React.createElement(lucide_react_1.ChevronLeft, { className: "h-6 w-6" })),
        React.createElement("div", { className: "flex items-center gap-1 md:gap-2" }, pageButtons.map(function (pageNumber, index) {
            return typeof pageNumber === 'number' ? (React.createElement("button", { key: index, className: "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors " + (currentPage === pageNumber
                    ? 'bg-white shadow-md shadow-gray-500 dark:bg-calculatorLight dark:text-white dark:shadow-gray-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-calculatorLight') + " disabled:cursor-not-allowed disabled:opacity-50", onClick: function () { return changePage(pageNumber); }, disabled: isLoading || currentPage === pageNumber, "aria-label": "Go to page " + pageNumber, "aria-current": currentPage === pageNumber ? 'page' : undefined }, pageNumber)) : (React.createElement("span", { key: index, className: "flex h-8 w-8 items-center justify-center text-gray-500 dark:text-gray-400" }, "\u2026"));
        })),
        React.createElement("button", { onClick: function () { return changePage(currentPage + 1); }, disabled: currentPage === totalPages || isLoading, "aria-label": "Go to next page", className: "flex h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600" },
            React.createElement(lucide_react_1.ChevronRight, { className: "h-6 w-6" })),
        React.createElement("button", { onClick: function () { return changePage(totalPages); }, disabled: currentPage === totalPages || isLoading, "aria-label": "Go to last page", className: "hidden h-8 w-8 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 sm:flex" },
            React.createElement(lucide_react_1.ChevronsRight, { className: "h-6 w-6" }))));
};
exports["default"] = PaginationButtons;
