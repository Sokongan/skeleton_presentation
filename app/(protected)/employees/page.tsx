import { Suspense } from 'react'
import { EmployeeList } from "@/components/EmployeeComponents/employee-list"
import { getEmployees } from "./actions"
import EmployeesLoading from '@/app/(protected)/employees/loading'
import EmployeeFormToggle from "@/components/EmployeeComponents/EmployeeFormToggle"
import { Card, CardContent } from '@/components/ui/card'

async function EmployeeListWrapper() {
  const employees = await getEmployees()
  return <EmployeeList initialEmployees={employees} />
}

export default function EmployeesPage() {
  return (
    <div>
      <div>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Employee List
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  <EmployeeFormToggle/>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
      <Suspense fallback={<EmployeesLoading />}>
        <EmployeeListWrapper />
      </Suspense>
    </div>
  )
}
