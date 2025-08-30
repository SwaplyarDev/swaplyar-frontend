// /components/ui/theme-Provider/themeProvider.tsx
'use client';
"use strict";
exports.__esModule = true;
exports.useDarkTheme = void 0;
var react_1 = require("react");
var ThemeContext = react_1.createContext(undefined);
exports.useDarkTheme = function () {
    var context = react_1.useContext(ThemeContext);
    if (!context) {
        throw new Error('useDarkTheme must be used within a ThemeProvider');
    }
    return context;
};
function ThemeProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(false), isDark = _b[0], setIsDark = _b[1];
    var _c = react_1.useState(false), mounted = _c[0], setMounted = _c[1];
    react_1.useEffect(function () {
        var currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
            setIsDark(currentTheme === 'dark');
        }
        else {
            var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(systemPrefersDark);
        }
        setMounted(true);
    }, []);
    var changeTheme = function () {
        var newTheme = !isDark ? 'dark' : 'light';
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark', !isDark);
        localStorage.setItem('theme', newTheme);
    };
    return React.createElement(ThemeContext.Provider, { value: { isDark: isDark, changeTheme: changeTheme, mounted: mounted } }, children);
}
exports["default"] = ThemeProvider;
