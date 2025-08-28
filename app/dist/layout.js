"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var themeProvider_1 = require("../components/ui/theme-Provider/themeProvider");
var next_1 = require("@vercel/speed-insights/next");
var google_1 = require("@next/third-parties/google");
var react_1 = require("@vercel/analytics/react");
var MarginProvider_1 = require("@/context/MarginProvider");
require("./globals.css");
var react_2 = require("next-auth/react");
var Footerblog_1 = require("@/components/footerblog/Footerblog");
var imgDatabaseCloudinary_1 = require("@/utils/assets/imgDatabaseCloudinary");
/**
 * Metadatos globales de la aplicación.
 *
 * Define el título, la descripción y los íconos del sitio, optimizando su visibilidad en buscadores y en dispositivos con diferentes temas.
 */
exports.metadata = {
    title: 'SwaplyAr | Pasar dólares de PayPal a pesos argentinos',
    description: 'Descubre cómo Swaplyar simplifica tus Transferencias internacionales, billeteras virtuales o Cripto y gestión de pagos de manera segura, rápida y eficiente.',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: imgDatabaseCloudinary_1.iconoMetadata,
                href: imgDatabaseCloudinary_1.iconoMetadata
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: imgDatabaseCloudinary_1.iconoMetadataDark,
                href: imgDatabaseCloudinary_1.iconoMetadataDark
            },
        ]
    }
};
/**
 * RootLayout - Layout global de la aplicación.
 *
 * @param children - Contenido de la página renderizada.
 * @returns Estructura principal del HTML y elementos globales.
 */
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "es", className: "theme-ready hydrated", suppressHydrationWarning: true },
        React.createElement("head", null,
            React.createElement("style", { id: "critical-theme-css" }, "\n          html.dark { color-scheme: dark; }\n          html.dark, html.dark body { background: #121212; color: #f5f5f5; }\n          html.dark .bg-white { background-color: #121212 !important; }\n          html.dark .text-darkText { color: #f5f5f5 !important; }\n        "),
            React.createElement("script", { dangerouslySetInnerHTML: {
                    __html: "\n              (function() {\n                try {\n                  const theme = localStorage.getItem('theme');\n                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n                  const isDark = theme === 'dark' || (!theme && systemPrefersDark);\n\n                  if (isDark) {\n                    document.documentElement.classList.add('dark');\n                    document.documentElement.style.backgroundColor = '#1a1a1a';\n                    document.documentElement.style.color = '#ffffff';\n                  } else {\n                    document.documentElement.classList.remove('dark');\n                  }\n\n                  document.documentElement.classList.add('theme-ready', 'hydrated');\n                } catch (e) {\n                  console.error('Error applying theme script', e);\n                }\n              })();\n            "
                } }),
            React.createElement(google_1.GoogleTagManager, { gtmId: "GTM-WMGWHJ7J" }),
            React.createElement("meta", { name: "google-site-verification", content: "TDYMmlsmcxOohMXHebZJtRXZ-Y0otZk006ExVzrbPqs" })),
        React.createElement("body", { className: "theme-ready hydrated bg-white text-lightText dark:bg-lightText dark:text-darkText" },
            React.createElement(react_2.SessionProvider, null,
                React.createElement(google_1.GoogleAnalytics, { gaId: "G-PX1MMJCPQL" }),
                React.createElement(themeProvider_1["default"], null,
                    React.createElement(MarginProvider_1.MarginProvider, null,
                        React.createElement(next_1.SpeedInsights, null),
                        React.createElement(react_1.Analytics, null),
                        children,
                        React.createElement(Footerblog_1["default"], null)))))));
}
exports["default"] = RootLayout;
