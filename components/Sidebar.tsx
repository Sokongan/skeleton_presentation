// Sidebar.tsx
import Link from "next/link";
import { useSession } from "next-auth/react"; // Import the session hook
import { menuItems } from "../lib/menuItems"; // Adjust the import path as needed

export function Sidebar() {
    const { data: session } = useSession(); // Get session data

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="">DOJ Skeleton App</span>
                    </Link>
                </div>
                <div className="flex-1">
                    {menuItems.map((menu) => (
                        <div key={menu.title} className="px-2">
                            <h2 className="font-semibold text-sm">{menu.title}</h2>
                            <nav className="grid items-start gap-1 text-sm font-medium lg:px-4">
                                {menu.items.map((item) => {
                                    // Check if the current user has permission to see the item
                                    const isVisible = item.visible.includes(session?.user?.role); // Adjust according to how roles are structured

                                    return (
                                        isVisible && (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        )
                                    );
                                })}
                            </nav>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
