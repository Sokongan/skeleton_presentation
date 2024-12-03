"use client"

import { useTransition } from 'react'
import { updateEmployee, addEducationRecord, addEligibilityRecord, uploadAttachment } from '@/app/(protected)/employees/actions'
import { useToast } from "@/hooks/use-toast"
import { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { updateEmployee } from '@/app/(protected)/employees/actions'

export function PersonalInfoTab({ employee }: { employee: any }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handlePersonalInfoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        const result = await updateEmployee(employee.id, Object.fromEntries(formData))
        if (result.success) {
          toast({
            title: "Success",
            description: "Personal information updated successfully.",
            className: "bg-green-50 text-green-900 border-green-200",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to update personal information. Please try again.",
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
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>View and edit personal information here.</CardDescription>
      </CardHeader>
      <form onSubmit={handlePersonalInfoSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" name="employeeId" defaultValue={employee?.employeeId || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" defaultValue={employee?.firstName || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input id="middleName" name="middleName" defaultValue={employee?.middleName || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" defaultValue={employee?.lastName || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suffix">Suffix</Label>
              <Input id="suffix" name="suffix" defaultValue={employee?.suffix || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" defaultValue={employee?.gender || ""}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthplace">Birthplace</Label>
              <Input id="birthplace" name="birthplace" defaultValue={employee?.birthplace || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input id="birthdate" name="birthdate" type="date" defaultValue={employee?.birthdate || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="civilStatus">Civil Status</Label>
              <Select name="civilStatus" defaultValue={employee?.civilStatus || ""}>
                <SelectTrigger id="civilStatus">
                  <SelectValue placeholder="Select civil status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select name="bloodType" defaultValue={employee?.bloodType || ""}>
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="citizenship">Citizenship</Label>
              <Input id="citizenship" name="citizenship" defaultValue={employee?.citizenship || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Input id="religion" name="religion" defaultValue={employee?.religion || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile No.</Label>
              <Input id="mobileNo" name="mobileNo" type="tel" defaultValue={employee?.mobileNo || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={employee?.email || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" type="number" defaultValue={employee?.weight || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" name="height" type="number" defaultValue={employee?.height || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="residentialAddress">Residential Address</Label>
            <Textarea 
              id="residentialAddress" 
              name="residentialAddress"
              placeholder="No. Street, Barangay, City/Municipality, Province, Zipcode" 
              defaultValue={employee?.residentialAddress || ""}
              rows={3} 
            />
          </div>

          {/* Family Background Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Family Background</h3>
            
            {/* Spouse Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">Spouse (leave blank if not married)</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spouseLastname">Lastname</Label>
                  <Input id="spouseLastname" name="spouseLastname" defaultValue={employee?.spouseLastname || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouseFirstname">Firstname</Label>
                  <Input id="spouseFirstname" name="spouseFirstname" defaultValue={employee?.spouseFirstname || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouseMiddlename">Middlename</Label>
                  <Input id="spouseMiddlename" name="spouseMiddlename" defaultValue={employee?.spouseMiddlename || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouseOccupation">Occupation</Label>
                  <Input id="spouseOccupation" name="spouseOccupation" defaultValue={employee?.spouseOccupation || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouseEmployer">Employer</Label>
                  <Input id="spouseEmployer" name="spouseEmployer" defaultValue={employee?.spouseEmployer || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouseTelephone">Telephone</Label>
                  <Input id="spouseTelephone" name="spouseTelephone" type="tel" defaultValue={employee?.spouseTelephone || ""} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseEmployerAddress">Address (Employer)</Label>
                <Textarea 
                  id="spouseEmployerAddress" 
                  name="spouseEmployerAddress"
                  defaultValue={employee?.spouseEmployerAddress || ""}
                  rows={2} 
                />
              </div>
            </div>

            {/* Parents Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">Parents</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fatherLastname">Father's Lastname</Label>
                  <Input id="fatherLastname" name="fatherLastname" defaultValue={employee?.fatherLastname || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherFirstname">Father's Firstname</Label>
                  <Input id="fatherFirstname" name="fatherFirstname" defaultValue={employee?.fatherFirstname || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherMiddlename">Father's Middlename</Label>
                  <Input id="fatherMiddlename" name="fatherMiddlename" defaultValue={employee?.fatherMiddlename || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherLastname">Mother's Lastname</Label>
                  <Input id="motherLastname" name="motherLastname" defaultValue={employee?.motherLastname || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherFirstname">Mother's Firstname</Label>
                  <Input id="motherFirstname" name="motherFirstname" defaultValue={employee?.motherFirstname || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherMiddlename">Mother's Middlename</Label>
                  <Input id="motherMiddlename" name="motherMiddlename" defaultValue={employee?.motherMiddlename || ""} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}