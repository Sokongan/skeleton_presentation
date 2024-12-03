"use client"

import { useState, useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addEducationRecord, updateEducationRecord } from '@/app/(protected)/employees/actions'
import { Employee } from "@prisma/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, X, Check } from "lucide-react"

export default function EducationalBackgroundTab({ employee }: { employee: Employee }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<EducationRecord>>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        const result = await addEducationRecord(employee.id, Object.fromEntries(formData))
        if (result.success) {
          toast({
            title: "Success",
            description: "Education record added successfully.",
            className: "bg-green-50 text-green-900 border-green-200",
          })
          setIsDialogOpen(false)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to add education record.",
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

  const startEditing = (record: EducationRecord) => {
    setEditingId(record.id)
    setEditForm({
      ...record,
      level: record.level || '',
      school: record.school || '',
      course: record.course || '',
      yearFrom: record.yearFrom || '',
      yearTo: record.yearTo || '',
      units: record.units || '',
      yearGraduated: record.yearGraduated || '',
      honors: record.honors || ''
    })
  }

  const handleSave = async (id: string) => {
    if (!id || !editForm) {
      console.log('Missing id or form data');
      return;
    }

    try {
      // Prepare the data
      const updateData = {
        level: editForm.level || '',
        school: editForm.school || '',
        course: editForm.course || '',
        yearFrom: editForm.yearFrom || '',
        yearTo: editForm.yearTo || '',
        units: editForm.units || '',
        yearGraduated: editForm.yearGraduated || '',
        honors: editForm.honors || ''
      };

      console.log('Sending update with data:', updateData);

      const result = await updateEducationRecord(id, updateData);

      if (result?.success) {
        toast({
          title: "Success",
          description: "Education record updated successfully.",
          className: "bg-green-50 text-green-900 border-green-200",
        });
        setEditingId(null);
        router.refresh();
      } else {
        throw new Error(result?.error || 'Update failed');
      }
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Educational Background</CardTitle>
          <CardDescription>View and add educational background information.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Education Record</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Education Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select name="level" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level of education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">Elementary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="vocational">Vocational</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="graduate">Graduate Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">School Name</Label>
                <Input id="school" name="school" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course/Degree</Label>
                <Input id="course" name="course" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearFrom">Year From</Label>
                  <Input id="yearFrom" name="yearFrom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearTo">Year To</Label>
                  <Input id="yearTo" name="yearTo" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Units Earned</Label>
                <Input id="units" name="units" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearGraduated">Year Graduated</Label>
                <Input id="yearGraduated" name="yearGraduated" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="honors">Honors/Awards</Label>
                <Input id="honors" name="honors" />
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
              <TableHead>Level</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Year Graduated</TableHead>
              <TableHead>Honors</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee.educationRecords?.map((record: EducationRecord) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {editingId === record.id ? (
                    <Select
                      value={editForm.level || ''}
                      onValueChange={(value) => setEditForm({ ...editForm, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elementary">Elementary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="vocational">Vocational</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="graduate">Graduate Studies</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    record.level
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <Input
                      value={editForm.school || ''}
                      onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                    />
                  ) : (
                    record.school
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <Input
                      value={editForm.course || ''}
                      onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                    />
                  ) : (
                    record.course
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editForm.yearFrom || ''}
                        onChange={(e) => setEditForm({ ...editForm, yearFrom: e.target.value })}
                        className="w-20"
                      />
                      -
                      <Input
                        value={editForm.yearTo || ''}
                        onChange={(e) => setEditForm({ ...editForm, yearTo: e.target.value })}
                        className="w-20"
                      />
                    </div>
                  ) : (
                    `${record.yearFrom || ''} - ${record.yearTo || ''}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <Input
                      value={editForm.units || ''}
                      onChange={(e) => setEditForm({ ...editForm, units: e.target.value })}
                    />
                  ) : (
                    record.units
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <Input
                      value={editForm.yearGraduated || ''}
                      onChange={(e) => setEditForm({ ...editForm, yearGraduated: e.target.value })}
                    />
                  ) : (
                    record.yearGraduated
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <Input
                      value={editForm.honors || ''}
                      onChange={(e) => setEditForm({ ...editForm, honors: e.target.value })}
                    />
                  ) : (
                    record.honors
                  )}
                </TableCell>
                <TableCell>
                  {editingId === record.id ? (
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSave(record.id)}
                        disabled={isPending}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEditing(record)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {!employee.educationRecords?.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No education records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 