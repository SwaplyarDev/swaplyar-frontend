"use strict";
exports.__esModule = true;
var FooterInternal_1 = require("@/components/auth/layout-components/FooterInternal");
var NavbarInternal_1 = require("@/components/auth/layout-components/NavbarInternal");
function layout(_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "min-h-screen bg-inherit" },
        React.createElement(NavbarInternal_1["default"], null),
        React.createElement("main", { className: "min-h-screen bg-inherit" }, children),
        React.createElement(FooterInternal_1.FooterInternal, null)));
}
exports["default"] = layout;
