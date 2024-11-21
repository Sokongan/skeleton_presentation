import { Suspense } from 'react'
import { EmployeeList } from "@/components/EmployeeComponents/employee-list"
import { getEmployees } from "./actions"

function EmployeeListFallback() {
  return <div className="text-center py-4">Loading employees...</div>
}

// Add this to prevent automatic static optimization
export const dynamic = 'force-dynamic'
// Or use revalidate if you want to cache for a specific time
// export const revalidate = 60

export default async function EmployeeListPage() {
  const initialEmployees = await getEmployees()

  return (
    <Suspense fallback={<EmployeeListFallback />}>
      <EmployeeList initialEmployees={initialEmployees} />
    </Suspense>
  )
}
