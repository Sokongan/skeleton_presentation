"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Employee } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
import { useTransition, useCallback } from 'react'
import { updateEmployee } from "@/app/(protected)/employees/actions"
import debounce from 'lodash/debounce'
import { useRouter } from "next/navigation"

export default function OfficeInfoTab({ employee }: { employee: Employee }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Create a debounced save function
  const debouncedSave = useCallback(
    debounce(async (name: string, value: string | null) => {
      startTransition(async () => {
        try {
          const result = await updateEmployee(String(employee.id), { [name]: value })
          
          if (result.success) {
            toast({
              title: "Saved",
              description: "Changes saved successfully.",
              className: "bg-green-50 text-green-900 border-green-200",
            })
            router.refresh()
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: result.error || "Failed to save changes.",
            })
          }
        } catch (error) {
          console.error('Update Error:', error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save changes.",
          })
        }
      })
    }, 1000),
    [employee.id, toast, router]
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Convert empty strings to null
    const processedValue = value.trim() === '' ? null : value
    debouncedSave(name, processedValue)
  }

  // Format date for input
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Office Information</CardTitle>
        <CardDescription>Changes are saved automatically.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="office">Office/Unit</Label>
            <Input 
              id="office" 
              name="office"
              defaultValue={employee.office || ""} 
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position" 
              name="position"
              defaultValue={employee.position || ""} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Input 
              id="employmentStatus" 
              name="employmentStatus"
              defaultValue={employee.employmentStatus || ""} 
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hireDate">Date Hired</Label>
            <Input 
              id="hireDate" 
              name="hireDate"
              type="date"
              defaultValue={formatDate(employee.hireDate)} 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}