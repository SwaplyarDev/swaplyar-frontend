'use client';
"use strict";
exports.__esModule = true;
var imgDatabaseCloudinary_1 = require("@/utils/assets/imgDatabaseCloudinary");
var image_1 = require("next/image");
var react_1 = require("react");
var flowbite_react_1 = require("flowbite-react");
var switch_1 = require("@/components/ui/top-menu/switch");
var themeProvider_1 = require("@/components/ui/theme-Provider/themeProvider");
var CerrarSesion_1 = require("@/components/icons-internal/CerrarSesion/CerrarSesion");
var SolicitudIcon_1 = require("@/components/icons-internal/icons-desktop/solicitud/SolicitudIcon");
var HistorialIcon_1 = require("@/components/icons-internal/icons-desktop/historial/HistorialIcon");
var PlusRewardsIcon_1 = require("@/components/icons-internal/icons-desktop/PlusRewards/PlusRewardsIcon");
var CuentasAsociadasIcon_1 = require("@/components/icons-internal/icons-desktop/CuentasAsociadas/CuentasAsociadasIcon");
var CentroDeAyudaIcon_1 = require("@/components/icons-internal/icons-desktop/CentroDeAyuda/CentroDeAyudaIcon");
var gi_1 = require("react-icons/gi");
var IconsTablet_1 = require("@/components/icons-internal/icons-tablet/IconsTablet");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var PerfilIcon_1 = require("@/components/icons-internal/icons-desktop/perfil/PerfilIcon");
var react_2 = require("next-auth/react");
var NavIcons_1 = require("./NavIcons");
var NavbarInternal = function () {
    var _a = themeProvider_1.useDarkTheme(), isDark = _a.isDark, mounted = _a.mounted;
    var _b = react_1.useState(false), showNavbar = _b[0], setShowNavbar = _b[1];
    var pathname = navigation_1.usePathname();
    var _c = react_1.useState(false), drawerMenu = _c[0], setDrawerMenu = _c[1];
    var _d = react_1.useState(false), isClosing = _d[0], setIsClosing = _d[1];
    var session = react_2.useSession().data;
    var closeDrawerMenu = function () {
        setIsClosing(true);
        setTimeout(function () {
            setDrawerMenu(false);
            setIsClosing(false);
        }, 400);
    };
    var isActive = pathname.split('/')[3];
    if (!mounted) {
        return (React.createElement("div", { className: "sticky top-0 z-[1000] w-full", style: {
                backgroundColor: 'inherit',
                visibility: 'hidden',
                height: '128px'
            } }));
    }
    return (React.createElement("header", { className: "sticky top-0 z-[1000] w-full bg-white dark:bg-lightText" },
        React.createElement("div", { className: "max-width-screen mx-auto md:max-w-[1300px]" },
            React.createElement("div", { className: "flex h-16 items-center justify-around mini-phone:mx-8 mini-phone:justify-between xs:mx-10 md:mx-20" },
                React.createElement(link_1["default"], { href: "/es/auth/solicitud" },
                    React.createElement(image_1["default"], { src: isDark ? imgDatabaseCloudinary_1.SwaplyArlogoMobileWhite : imgDatabaseCloudinary_1.SwaplyArLogoComplete, className: "hidden max-h-14 w-full max-w-14 mini-phone:block mini-phone:max-w-[200px]", alt: "Cambiar saldo online", width: 200, height: 80 }),
                    React.createElement(image_1["default"], { src: isDark ? imgDatabaseCloudinary_1.SwaplyArlogoWhite : imgDatabaseCloudinary_1.SwaplyArLogoSolo, className: "max-h-14 w-full max-w-14 mini-phone:hidden", alt: "Cambiar saldo online", width: 200, height: 80 })),
                React.createElement("div", null,
                    React.createElement(switch_1["default"], null)))),
        React.createElement("div", { className: "bg-nav-blue dark:bg-white" },
            React.createElement("div", { className: "flex h-16 flex-grow xs:px-0 md:justify-between md:px-20" },
                React.createElement("div", { className: "mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4" },
                    React.createElement("div", { className: (isDark ? 'montanaDark' : 'montana') + " relative top-1 ml-10 flex h-full w-full xs:ml-0" },
                        React.createElement(link_1["default"], { href: "/es/auth/perfil", className: (isActive === 'perfil' ? 'bg-gradient-to-t' : '') + " relative left-4 top-1 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] hover:bg-gradient-to-t xs:-left-1 xs:ml-5" },
                            React.createElement(image_1["default"], { src: imgDatabaseCloudinary_1.swaplyArAvatar, alt: "Foto perfil Usuario", width: 100, height: 100, className: "h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText" })),
                        React.createElement("p", { className: "hidden pl-2 pt-4 font-sans text-white dark:text-black xs:block lg:ml-4 lg:hidden lg2:block" }, session === null || session === void 0 ? void 0 : session.user.fullName)),
                    React.createElement("div", { className: "hidden lg:mr-10 lg:flex lg:max-w-[460px]" },
                        React.createElement(NavIcons_1.NavIcons, null)),
                    React.createElement("button", { onClick: function () { return react_2.signOut(); }, className: "block xs:hidden lg:block" },
                        React.createElement(CerrarSesion_1["default"], null)),
                    React.createElement("div", { onClick: function () { return setDrawerMenu(true); }, className: "hidden xs:block xs:pr-10 md:pr-0 lg:hidden" },
                        React.createElement(gi_1.GiHamburgerMenu, { className: "size-8 text-white dark:text-black" })),
                    drawerMenu && (React.createElement(flowbite_react_1.Drawer, { open: drawerMenu, onClose: closeDrawerMenu, position: "right", className: "duration-400 mt-[4.5rem] w-40 transform overflow-visible bg-transparent p-0 transition-all ease-in-out dark:bg-transparent " + (isClosing ? 'opacity-0' : 'opacity-100') },
                        React.createElement(flowbite_react_1.Drawer.Items, null,
                            React.createElement("div", { className: "absolute mt-14 flex h-[500px] w-40 flex-col items-end justify-between overflow-visible rounded-l-3xl bg-nav-blue dark:bg-white" },
                                React.createElement("div", { className: "max-w-56 pr-5 pt-7" },
                                    React.createElement(link_1["default"], { href: "/es/auth/perfil", onClick: closeDrawerMenu }, isActive === 'perfil' ? (React.createElement(IconsTablet_1["default"], { classname: "w-44 justify-between", text: "Perfil" },
                                        React.createElement(PerfilIcon_1["default"], null))) : (React.createElement(PerfilIcon_1["default"], { classname: "flex justify-end" }))),
                                    React.createElement(link_1["default"], { href: '/es/auth/solicitud', onClick: closeDrawerMenu }, isActive === NavIcons_1.ActiveTab.SOLICITUD ? (React.createElement(IconsTablet_1["default"], { classname: "w-44 justify-between", text: "Solicitud" },
                                        React.createElement(SolicitudIcon_1["default"], null))) : (React.createElement(SolicitudIcon_1["default"], { classname: "flex justify-end" }))),
                                    React.createElement(link_1["default"], { href: '/es/auth/historial', onClick: closeDrawerMenu }, isActive === NavIcons_1.ActiveTab.HISTORIAL ? (React.createElement(IconsTablet_1["default"], { classname: "w-44 justify-between", text: "Historial" },
                                        React.createElement(HistorialIcon_1["default"], null))) : (React.createElement(HistorialIcon_1["default"], { classname: "flex justify-end" }))),
                                    React.createElement(link_1["default"], { href: '/es/auth/plus-rewards', onClick: closeDrawerMenu }, isActive === NavIcons_1.ActiveTab.PLUSREWARDS ? (React.createElement(IconsTablet_1["default"], { classname: "w-44 justify-between", text: "Plus Rewards" },
                                        React.createElement(PlusRewardsIcon_1["default"], null))) : (React.createElement(PlusRewardsIcon_1["default"], { classname: "flex justify-end" }))),
                                    React.createElement(link_1["default"], { href: '/es/auth/cuentas', onClick: closeDrawerMenu }, isActive === NavIcons_1.ActiveTab.CUENTASASOCIADAS ? (React.createElement(IconsTablet_1["default"], { classname: "w-44 justify-between", text: "Cuentas" },
                                        React.createElement(CuentasAsociadasIcon_1["default"], null))) : (React.createElement(CuentasAsociadasIcon_1["default"], { classname: "flex justify-end" }))),
                                    React.createElement(link_1["default"], { href: '/es/auth/ayuda', onClick: closeDrawerMenu }, isActive === NavIcons_1.ActiveTab.CENTRODEAYUDA ? (React.createElement(IconsTablet_1["default"], { classname: "w-44 justify-between", text: "Ayuda" },
                                        React.createElement(CentroDeAyudaIcon_1["default"], null))) : (React.createElement(CentroDeAyudaIcon_1["default"], { classname: "flex justify-end" })))),
                                React.createElement("button", { onClick: function () { return react_2.signOut(); }, className: "h-16 xs:hidden lg:block" },
                                    React.createElement(CerrarSesion_1["default"], null)))))))))));
};
exports["default"] = NavbarInternal;
