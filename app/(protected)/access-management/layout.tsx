"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccessManagementLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if the session is loading
        if (status === "loading") return;

        // If the user is not authenticated or does not have the required role, redirect
        if (status === "unauthenticated" || !session?.user?.roles.includes("Admin")) {
            router.push("/unauthorized");
        } else {
            setIsLoading(false);
        }
    }, [status, session, router]);

    // If still loading, return null or a loading state
    if (isLoading || status === "loading") {
        return <p>Loading...</p>;
    }

    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  } 