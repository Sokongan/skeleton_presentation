import { getEmployee } from '@/app/(protected)/employees/actions'
import { EmployeeDetailsTabs } from '@/components/EmployeeComponents/employee-details-tabs'
import { Card, CardContent } from "@/components/ui/card"
import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EmployeePage({ params }: PageProps) {
  const employee = await getEmployee(params.id)
  
  if (!employee) {
    return <div>Employee not found</div>
  }
  
  return (
    <div className="container py-2 space-y-2">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {employee.firstName} {employee.middleName ? `${employee.middleName} ` : ''}{employee.lastName}
              </h1>
              <p className="text-muted-foreground">
                {employee.position} • {employee.department}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Employee ID: {employee.employeeId}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <EmployeeDetailsTabs employee={employee} />
    </div>
  )
}