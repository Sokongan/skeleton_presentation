export const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "/home.png",
                label: "Home",
                href: "/",
                visible: ["admin", "user"],
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: "/profile.png",
                label: "Profile",
                href: "/profile",
                visible: ["admin", 'user'],
            },
            {
                icon: "/setting.png",
                label: "Settings",
                href: "/settings",
                visible: ["admin", "user"],
            },
            {
                icon: "/logout.png",
                label: "Logout",
                href: "/logout",
                visible: ["admin", "user"],
            },
        ],
    },
];
