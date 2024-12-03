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
import { addReference } from '@/app/(protected)/employees/actions'
import { Employee } from "@prisma/client"

export default function ReferencesTab({ employee }: { employee: Employee }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    startTransition(async () => {
      try {
        const result = await addReference(employee.id, Object.fromEntries(formData))
        if (result.success) {
          toast({
            title: "Success",
            description: "Reference added successfully.",
            className: "bg-green-50 text-green-900 border-green-200",
          })
          setIsDialogOpen(false)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to add reference.",
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
          <CardTitle>Character References</CardTitle>
          <CardDescription>View and add character references.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Reference</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Character Reference</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="First Name M.I. Last Name"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position/Title</Label>
                <Input 
                  id="position" 
                  name="position" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input 
                  id="company" 
                  name="company" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input 
                    id="contactNumber" 
                    name="contactNumber" 
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Adding..." : "Add Reference"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee.references?.map((reference: Reference) => (
              <TableRow key={reference.id}>
                <TableCell className="font-medium">{reference.name}</TableCell>
                <TableCell>{reference.position}</TableCell>
                <TableCell>{reference.company}</TableCell>
                <TableCell>{reference.contactNumber}</TableCell>
                <TableCell>{reference.email}</TableCell>
              </TableRow>
            ))}
            {!employee.references?.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No references found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 