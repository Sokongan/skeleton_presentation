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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addTrainingProgram } from '@/app/(protected)/employees/actions'
import { Employee } from "@prisma/client"

export default function TrainingProgramsTab({ employee }: { employee: Employee }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    startTransition(async () => {
      try {
        const result = await addTrainingProgram(employee.id, Object.fromEntries(formData))
        if (result.success) {
          toast({
            title: "Success",
            description: "Training program added successfully.",
            className: "bg-green-50 text-green-900 border-green-200",
          })
          setIsDialogOpen(false)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to add training program.",
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
          <CardTitle>Learning and Development</CardTitle>
          <CardDescription>View and add training programs, seminars, and other L&D interventions attended.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Training Program</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Training Program</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title of Learning and Development Intervention/Training Program</Label>
                <Input 
                  id="title" 
                  name="title" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type of L&D</Label>
                <Select name="type">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="managerial">Managerial</SelectItem>
                    <SelectItem value="supervisory">Supervisory</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                  </SelectContent>
                </Select>
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
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Number of Hours</Label>
                  <Input 
                    id="hours" 
                    name="hours" 
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conductor">Conducted/Sponsored By</Label>
                  <Input 
                    id="conductor" 
                    name="conductor" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input 
                  id="venue" 
                  name="venue" 
                />
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
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Conducted By</TableHead>
              <TableHead>Venue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee.trainingPrograms?.map((record: TrainingProgram) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.title}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>
                  {record.startDate.toLocaleDateString()} - {record.endDate.toLocaleDateString()}
                </TableCell>
                <TableCell>{record.hours}</TableCell>
                <TableCell>{record.conductor}</TableCell>
                <TableCell>{record.venue}</TableCell>
              </TableRow>
            ))}
            {!employee.trainingPrograms?.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No training programs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 