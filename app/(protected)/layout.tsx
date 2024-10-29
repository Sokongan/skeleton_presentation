'use client'; // Mark the layout as a client component because we're using hooks

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import AuthLayout from '@/components/AuthLayout'; // Adjust the path if necessary

export default function ProtectedLayout({ children }: { children?: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login if the user is not authenticated
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // Display loading state while session is being fetched
  }

  if (status === 'authenticated') {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          {/* Render children content here */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
          
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return null; // Return nothing while redirecting
}
