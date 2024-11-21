'use server'

import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'

export type Employee = {
  id: number
  employeeId: string
  firstName: string
  lastName: string
  position: string
  department: string
  email: string
}

export const getEmployees = unstable_cache(
  async () => {
    try {
      const employees = await prisma.employee.findMany({
        select: {
          id: true,
          employeeId: true,
          firstName: true,
          lastName: true,
          position: true,
          department: true,
          email: true,
        },
        orderBy: {
          lastName: 'asc',
        },
        take: 100,
      })
      return employees
    } catch (error) {
      console.error('Failed to fetch employees:', error)
      throw new Error('Failed to fetch employees')
    }
  },
  ['employees-list'],  // cache key
  {
    revalidate: 60,   // cache for 60 seconds
    tags: ['employees']  // cache tag for manual invalidation
  }
)

const createEmployeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  position: z.string().min(2),
  department: z.string().min(2),
})

export async function createEmployee(data: z.infer<typeof createEmployeeSchema>) {
  const validatedData = createEmployeeSchema.parse(data)
  
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        ...validatedData,
        employeeId: `EMP${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random 4-digit employee ID
        gender: 'PREFER_NOT_TO_SAY', // Add required gender field with default value
        civilStatus: 'SINGLE', // Add required civilStatus field with default value
      },
    })
    return newEmployee
  } catch (error) {
    console.error('Failed to create employee:', error)
    throw new Error('Failed to create employee')
  }
}