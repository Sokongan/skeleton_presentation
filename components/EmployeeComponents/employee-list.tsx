'use client'

import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardContent } from "@/components/ui/card"
import { Employee } from '@prisma/client'

interface EmployeeListProps {
  initialEmployees: Employee[]
}

export function EmployeeList({ initialEmployees }: EmployeeListProps) {
  return (
    <CardContent className="p-0">
      {initialEmployees.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
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
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  <Link 
                    href={`/employees/${employee.id}`}
                    className="block w-full h-full"
                  >
                    {employee.employeeId}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/employees/${employee.id}`}
                    className="block w-full h-full"
                  >
                    {`${employee.lastName}, ${employee.firstName}`}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/employees/${employee.id}`}
                    className="block w-full h-full"
                  >
                    {employee.position}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/employees/${employee.id}`}
                    className="block w-full h-full"
                  >
                    {employee.department}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/employees/${employee.id}`}
                    className="block w-full h-full"
                  >
                    {employee.email}
                  </Link>
                </TableCell>
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