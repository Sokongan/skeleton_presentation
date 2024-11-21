'use client'

import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardContent } from "@/components/ui/card"
import type { Employee } from '@/app/(protected)/employees/actions'

interface EmployeeListProps {
  initialEmployees: Employee[]
}

export function EmployeeList({ initialEmployees }: EmployeeListProps) {
  const router = useRouter()

  const handleRowClick = (employeeId: number) => {
    router.push(`/employees/${employeeId}`, { scroll: false })
  }

  return (
    <CardContent>
      {initialEmployees.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Employee ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialEmployees.map((employee) => (
              <TableRow 
                key={employee.id} 
                onClick={() => handleRowClick(employee.id)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{employee.employeeId}</TableCell>
                <TableCell>{`${employee.lastName}, ${employee.firstName}`}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center py-4">No employees found.</p>
      )}
    </CardContent>
  )
}