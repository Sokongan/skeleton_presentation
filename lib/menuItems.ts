// menuItems.ts
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    ShieldCheck,
    GalleryVerticalEnd,
    SquareTerminal,
    FileStack,
    Users,
} from "lucide-react";

export const menuItems = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    applications: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        }
    ],
    navMain: [
        {
            name: "Employees",
            url: "/employees",
            icon: Users
        },
    ],
    system: [
        {
            name: "Access Management",
            url: "/access-management",
            icon: ShieldCheck,
        },
    ],
}
