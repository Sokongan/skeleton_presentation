"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addWorkExperience } from '@/app/(protected)/employees/actions'
import { Employee } from "@prisma/client"

export default function WorkExperienceTab({ employee }: { employee: Employee }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const isGovernmentService = formData.get('isGovernmentService') === 'on'
    formData.set('isGovernmentService', isGovernmentService.toString())
    
    startTransition(async () => {
      try {
        const result = await addWorkExperience(employee.id, Object.fromEntries(formData))
        if (result.success) {
          toast({
            title: "Success",
            description: "Work experience added successfully.",
            className: "bg-green-50 text-green-900 border-green-200",
          })
          setIsDialogOpen(false)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to add work experience.",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>View and add work experience records.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Work Experience</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Work Experience</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position Title</Label>
                  <Input 
                    id="position" 
                    name="position" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Department/Agency/Office/Company</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">From</Label>
                  <Input 
                    id="startDate" 
                    name="startDate" 
                    type="date"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">To</Label>
                  <Input 
                    id="endDate" 
                    name="endDate" 
                    type="date"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Monthly Salary</Label>
                  <Input 
                    id="salary" 
                    name="salary" 
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryGrade">Salary Grade & Step (if applicable)</Label>
                  <Input 
                    id="salaryGrade" 
                    name="salaryGrade" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointmentStatus">Status of Appointment</Label>
                <Select name="appointmentStatus">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                    <SelectItem value="contractual">Contractual</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="isGovernmentService" name="isGovernmentService" />
                <Label htmlFor="isGovernmentService">Government Service</Label>
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Adding..." : "Add Record"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Monthly Salary</TableHead>
              <TableHead>Salary Grade</TableHead>
              <TableHead>Appointment Status</TableHead>
              <TableHead>Gov't Service</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee.workExperiences?.map((record: WorkExperience) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.position}</TableCell>
                <TableCell>{record.company}</TableCell>
                <TableCell>
                  {record.startDate.toLocaleDateString()} - {record.endDate?.toLocaleDateString() || 'Present'}
                </TableCell>
                <TableCell>{record.salary?.toLocaleString()}</TableCell>
                <TableCell>{record.salaryGrade}</TableCell>
                <TableCell>{record.appointmentStatus}</TableCell>
                <TableCell>{record.isGovernmentService ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
            {!employee.workExperiences?.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No work experience records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 