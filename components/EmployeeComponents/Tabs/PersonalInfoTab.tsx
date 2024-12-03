"use client"

import { useToast } from "@/hooks/use-toast"
import { useTransition, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { updateEmployee } from '@/app/(protected)/employees/actions'
import { Employee } from "@prisma/client"
import { debounce } from 'lodash'

interface PersonalInfoTabProps {
  employee: Employee
}

export function PersonalInfoTab({ employee }: PersonalInfoTabProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  // Create a debounced save function
  const debouncedSave = useCallback(
    debounce(async (name: string, value: string) => {
      startTransition(async () => {
        try {
          const result = await updateEmployee(String(employee.id), { [name]: value })
          
          if (result.success) {
            toast({
              title: "Saved",
              description: "Changes saved successfully.",
              className: "bg-green-50 text-green-900 border-green-200",
            })
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
    [employee.id, toast]
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    debouncedSave(name, value)
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    debouncedSave(name, value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Changes are saved automatically.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              name="employeeId"
              defaultValue={employee?.employeeId || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={employee?.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              name="middleName"
              defaultValue={employee?.middleName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={employee?.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="suffix">Suffix</Label>
            <Input
              id="suffix"
              name="suffix"
              defaultValue={employee?.suffix || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              name="gender" 
              defaultValue={employee?.gender || ""}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
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
            <Input
              id="birthplace"
              name="birthplace"
              defaultValue={employee?.birthplace || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="date"
              defaultValue={employee?.birthdate || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="civilStatus">Civil Status</Label>
            <Select 
              name="civilStatus" 
              defaultValue={employee?.civilStatus || ""}
              onValueChange={(value) => handleSelectChange("civilStatus", value)}
            >
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
            <Select 
              name="bloodType" 
              defaultValue={employee?.bloodType || ""}
              onValueChange={(value) => handleSelectChange("bloodType", value)}
            >
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
            <Input
              id="citizenship"
              name="citizenship"
              defaultValue={employee?.citizenship || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="religion">Religion</Label>
            <Input
              id="religion"
              name="religion"
              defaultValue={employee?.religion || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNo">Mobile No.</Label>
            <Input
              id="mobileNo"
              name="mobileNo"
              type="tel"
              defaultValue={employee?.mobileNo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={employee?.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              defaultValue={employee?.weight || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              defaultValue={employee?.height || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="residentialAddress">Residential Address</Label>
          <Textarea 
            id="residentialAddress" 
            name="residentialAddress"
            placeholder="No. Street, Barangay, City/Municipality, Province, Zipcode" 
            defaultValue={employee?.residentialAddress || ""}
            onChange={handleInputChange}
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
                <Input
                  id="spouseLastname"
                  name="spouseLastname"
                  defaultValue={employee?.spouseLastname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseFirstname">Firstname</Label>
                <Input
                  id="spouseFirstname"
                  name="spouseFirstname"
                  defaultValue={employee?.spouseFirstname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseMiddlename">Middlename</Label>
                <Input
                  id="spouseMiddlename"
                  name="spouseMiddlename"
                  defaultValue={employee?.spouseMiddlename || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseOccupation">Occupation</Label>
                <Input
                  id="spouseOccupation"
                  name="spouseOccupation"
                  defaultValue={employee?.spouseOccupation || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseEmployer">Employer</Label>
                <Input
                  id="spouseEmployer"
                  name="spouseEmployer"
                  defaultValue={employee?.spouseEmployer || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouseTelephone">Telephone</Label>
                <Input
                  id="spouseTelephone"
                  name="spouseTelephone"
                  type="tel"
                  defaultValue={employee?.spouseTelephone || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseEmployerAddress">Address (Employer)</Label>
              <Textarea 
                id="spouseEmployerAddress" 
                name="spouseEmployerAddress"
                defaultValue={employee?.spouseEmployerAddress || ""}
                onChange={handleInputChange}
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
                <Input
                  id="fatherLastname"
                  name="fatherLastname"
                  defaultValue={employee?.fatherLastname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherFirstname">Father's Firstname</Label>
                <Input
                  id="fatherFirstname"
                  name="fatherFirstname"
                  defaultValue={employee?.fatherFirstname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherMiddlename">Father's Middlename</Label>
                <Input
                  id="fatherMiddlename"
                  name="fatherMiddlename"
                  defaultValue={employee?.fatherMiddlename || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherLastname">Mother's Lastname</Label>
                <Input
                  id="motherLastname"
                  name="motherLastname"
                  defaultValue={employee?.motherLastname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherFirstname">Mother's Firstname</Label>
                <Input
                  id="motherFirstname"
                  name="motherFirstname"
                  defaultValue={employee?.motherFirstname || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherMiddlename">Mother's Middlename</Label>
                <Input
                  id="motherMiddlename"
                  name="motherMiddlename"
                  defaultValue={employee?.motherMiddlename || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}