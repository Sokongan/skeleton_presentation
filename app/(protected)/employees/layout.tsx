'use client'

import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from 'lucide-react'
import { CreateEmployeeForm } from "@/components/EmployeeComponents/create-employee-form"

export default function EmployeesLayout({ children }: { children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isDetailsPage = pathname.includes('/employees/') && pathname !== '/employees'
  
  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          {isDetailsPage ? (
            <>
              <div>
                <CardDescription>Employee Details</CardDescription>
              </div>
            </>
          ) : (
            <CardTitle className="text-2xl font-bold">Employee List</CardTitle>
          )}
          {!isDetailsPage && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Employee</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new employee record.
                  </DialogDescription>
                </DialogHeader>
                <CreateEmployeeForm onSuccess={() => setIsOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
      </Card>
      {children}
    </div>
  )
}