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
import { addEligibilityRecord } from '@/app/(protected)/employees/actions'
import { Employee } from "@prisma/client"

export default function EligibilityTab({ employee }: { employee: Employee }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        const result = await addEligibilityRecord(employee.id, Object.fromEntries(formData))
        if (result.success) {
          toast({
            title: "Success",
            description: "Eligibility record added successfully.",
            className: "bg-green-50 text-green-900 border-green-200",
          })
          setIsDialogOpen(false)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to add eligibility record.",
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
          <CardTitle>Eligibility Records</CardTitle>
          <CardDescription>View and add civil service eligibility and other professional licenses.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Eligibility</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Eligibility Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eligibility">Eligibility/License Name</Label>
                <Input 
                  id="eligibility" 
                  name="eligibility" 
                  placeholder="e.g., Civil Service Professional"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input 
                  id="rating" 
                  name="rating" 
                  placeholder="e.g., 85.23"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="examDate">Date of Examination</Label>
                  <Input 
                    id="examDate" 
                    name="examDate" 
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="place">Place of Examination</Label>
                  <Input 
                    id="place" 
                    name="place" 
                    placeholder="City/Municipality"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input 
                    id="licenseNumber" 
                    name="licenseNumber"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Date of Release</Label>
                  <Input 
                    id="releaseDate" 
                    name="releaseDate" 
                    type="date"
                  />
                </div>
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
              <TableHead>Eligibility</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date of Exam</TableHead>
              <TableHead>Place of Exam</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Date Released</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee.eligibilityRecords?.map((record: EligibilityRecord) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.eligibility}</TableCell>
                <TableCell>{record.rating}</TableCell>
                <TableCell>{record.examDate?.toLocaleDateString()}</TableCell>
                <TableCell>{record.place}</TableCell>
                <TableCell>{record.licenseNumber}</TableCell>
                <TableCell>{record.releaseDate?.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {!employee.eligibilityRecords?.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No eligibility records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 