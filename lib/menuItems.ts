// menuItems.ts
import {
    Home,
    LineChart,
    Package,
    ShoppingCart,
    Users,
} from "lucide-react";

export const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: Home,
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
                icon: Users,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "user"],
            },
            {
                icon: ShoppingCart,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "user"],
            },
            {
                icon: Package,
                label: "Logout",
                href: "/logout",
                visible: ["admin", "user"],
            },
            {
                icon: LineChart,
                label: "Analytics",
                href: "/analytics",
                visible: ["admin", "user"],
            },
        ],
    },
];
