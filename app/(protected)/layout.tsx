'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@radix-ui/react-separator';
import { ModeToggle } from '@/components/ModeToggle';

export default function ProtectedLayout({ children }: { children?: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const generateBreadcrumbs = () => {
    const pathParts = pathname.split('/').filter(part => part);
    const breadcrumbs: JSX.Element[] = [];
    
    // Special case for employee details
    if (pathname.match(/^\/employees\/[^/]+$/)) {
      return [
        <BreadcrumbItem key="/employees">
          <BreadcrumbLink href="/employees">Employees</BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbSeparator key="separator" />,
        <BreadcrumbItem key={pathname}>
          <BreadcrumbPage>Employee Details</BreadcrumbPage>
        </BreadcrumbItem>
      ];
    }
    
    // Regular breadcrumb generation
    pathParts.forEach((part, index) => {
      const href = `/${pathParts.slice(0, index + 1).join('/')}`;
      const isLast = index === pathParts.length - 1;
      
      // Skip certain routes if needed
      if (part === 'protected') return;

      // Format the display text
      let displayText = capitalizeFirstLetter(decodeURIComponent(part));
      
      // Special cases for specific routes
      switch (part) {
        case 'employees':
          displayText = 'Employees';
          break;
        // Add more cases as needed
      }

      if (isLast) {
        breadcrumbs.push(
          <BreadcrumbItem key={href}>
            <BreadcrumbPage>{displayText}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        breadcrumbs.push(
          <BreadcrumbItem key={href}>
            <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
          </BreadcrumbItem>
        );
        breadcrumbs.push(
          <BreadcrumbSeparator key={`${href}-separator`} />
        );
      }
    });

    return breadcrumbs;
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {pathname !== '/' && (
                <Breadcrumb>
                  <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
                </Breadcrumb>
              )}
            </div>
            <div className="flex items-center gap-4 px-4">
              <div className="flex items-center gap-2">
                {session?.user?.name && (
                  <span className="text-sm font-medium">
                    Welcome, {session.user.name}
                  </span>
                )}
              </div>
              <ModeToggle />
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return null;
}
