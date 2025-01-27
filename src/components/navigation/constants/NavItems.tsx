/**
 * Navigation items configuration for the main menu.
 *
 * This array defines the structure of the navigation menu, including main items and their submenus.
 * Each item in the array represents a main navigation link, and can optionally include a submenu.
 *
 * @type {Array<{to: string, label: string, submenu?: Array<{to: string, label: string}>}>}
 *
 * @property {string} to - The URL path for the navigation item.
 * @property {string} label - The display text for the navigation item.
 * @property {Array<{to: string, label: string}>} [submenu] - Optional submenu items for dropdown navigation.
 */

const navItems: Array<{
    to: string;
    label: string;
    submenu?: Array<{ to: string; label: string }>;
}> = [
    {
        to: "/",
        label: "Home",
        submenu: [
            { to: "/products/category1", label: "Category 1" },
            { to: "/products/category2", label: "Category 2" },
        ],
    },
    {
        to: "/products",
        label: "Products",
        submenu: [
            { to: "/products/category1", label: "Category 1" },
            { to: "/products/category2", label: "Category 2" },
        ],
    },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export default navItems;
