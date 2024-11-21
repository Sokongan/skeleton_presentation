"use client"

import { useState } from "react"
import { format } from "date-fns"
import { FileText, Upload, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import AttachmentCard from "@/components/AttachmentCard"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
export default function EmployeeDetailsPage() {
  const [attachments, setAttachments] = useState([
    { id: 1, fileName: "resume.pdf", fileSize: 1500000, uploadDate: new Date("2023-01-15"), fileType: "pdf" },
    { id: 2, fileName: "profile_picture.jpg", fileSize: 500000, uploadDate: new Date("2023-02-20"), fileType: "jpg" },
  ])

  const educationRecords = [
    {
      level: "Tertiary",
      school: "XYZ University",
      course: "Computer Science",
      yearGraduated: "2020",
      units: "120",
      yearsAttended: "2016 - 2020",
      honors: "Cum Laude",
    },
  ];

  const eligibilityRecords = [
    {
      eligibility: "RA 1080 - BAR",
      rating: "77.95",
      examDate: "",
      place: "Manila",
      licenseNumber: "",
      releaseDate: "03/21/2012",
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newAttachment = {
        id: attachments.length + 1,
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date(),
        fileType: file.type.split("/")[1],
      }
      setAttachments([...attachments, newAttachment])
    }
  }

  return (
    <Tabs defaultValue="personal-info" className="w-full max-w-12xl mx-auto">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
        <TabsTrigger value="office-info">Office Information</TabsTrigger>
        <TabsTrigger value="educational-background">Educational Background</TabsTrigger>
        <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
        <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
        <TabsTrigger value="training">Training Programs</TabsTrigger>
        <TabsTrigger value="references">References</TabsTrigger>
        <TabsTrigger value="attachments">Attachments</TabsTrigger>
      </TabsList>
    
      <TabsContent value="personal-info">      
        <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>View and edit personal information here.</CardDescription>
        </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
          <Input id="employeeId" defaultValue="EMP001" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" defaultValue="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input id="middleName" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue="Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="suffix">Suffix</Label>
          <Input id="suffix" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select defaultValue="male">
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
          <Input id="birthplace" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthdate">Birthdate</Label>
          <Input id="birthdate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="civilStatus">Civil Status</Label>
          <Select defaultValue="single">
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
          <Select>
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
          <Input id="citizenship" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <Input id="religion" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobileNo">Mobile No.</Label>
          <Input id="mobileNo" type="tel" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input id="height" type="number" defaultValue="" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="residentialAddress">Residential Address</Label>
        <Textarea id="residentialAddress" placeholder="No. Street, Barangay, City/Municipality, Province, Zipcode" rows={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" defaultValue="Software Engineer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input id="department" defaultValue="Engineering" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" defaultValue="Experienced software engineer with a passion for building scalable web applications." rows={4} />
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
              <Input id="spouseLastname" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseFirstname">Firstname</Label>
              <Input id="spouseFirstname" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseMiddlename">Middlename</Label>
              <Input id="spouseMiddlename" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseOccupation">Occupation</Label>
              <Input id="spouseOccupation" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseEmployer">Employer</Label>
              <Input id="spouseEmployer" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spouseTelephone">Telephone</Label>
              <Input id="spouseTelephone" type="tel" defaultValue="" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="spouseEmployerAddress">Address (Employer)</Label>
            <Textarea id="spouseEmployerAddress" rows={2} />
          </div>
        </div>

        {/* Parents Information */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Parents</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fatherLastname">Father's Lastname</Label>
              <Input id="fatherLastname" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherFirstname">Father's Firstname</Label>
              <Input id="fatherFirstname" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherMiddlename">Father's Middlename</Label>
              <Input id="fatherMiddlename" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherLastname">Mother's Lastname</Label>
              <Input id="motherLastname" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherFirstname">Mother's Firstname</Label>
              <Input id="motherFirstname" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherMiddlename">Mother's Middlename</Label>
              <Input id="motherMiddlename" defaultValue="" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
    </Card>
    </TabsContent>
      <TabsContent value="office-info">
      <Card>
        <CardHeader>
          <CardTitle>Office Information</CardTitle>
          <CardDescription>View and edit office information here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="plantilla">Plantilla</Label>
            <Input id="plantilla" defaultValue="" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="office">Office / Original Plantilla</Label>
              <Input id="office" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detailedTo">Detailed to</Label>
              <Input id="detailedTo" defaultValue="" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="directLine">Direct Line</Label>
              <Input id="directLine" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="local">Local</Label>
              <Input id="local" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facsimile">Facsimile</Label>
              <Input id="facsimile" defaultValue="" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryGrade">Salary Grade</Label>
              <Input id="salaryGrade" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="step">Step</Label>
              <Input id="step" defaultValue="" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="premiums">Premiums</Label>
              <Input id="premiums" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tin">TIN</Label>
              <Input id="tin" defaultValue="" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gsis">GSIS</Label>
              <Input id="gsis" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phic">PHIC</Label>
              <Input id="phic" defaultValue="" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pagibig">Pag-ibig</Label>
              <Input id="pagibig" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="umid">UMID</Label>
              <Input id="umid" defaultValue="" />
            </div>
          </div>

          {/* Appointment Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Appointment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="otherGovAgency">Appointment in Other Gov't Agency</Label>
                <Input id="otherGovAgency" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dojAppointment">Original Appointment in DOJ</Label>
                <Input id="dojAppointment" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="presentPositionAppointment">Appointment Present Position</Label>
                <Input id="presentPositionAppointment" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assumptionPresentPosition">Assumption Present Position</Label>
                <Input id="assumptionPresentPosition" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noGap">No Gap?</Label>
                <Input id="noGap" defaultValue="" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terminationDate">Termination Date</Label>
                <Input id="terminationDate" type="date" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="educational-background">
      <Card>
        <CardHeader>
          <CardTitle>Educational Background</CardTitle>
          <CardDescription>View and add educational background information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form for adding new educational background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select defaultValue="Tertiary">
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elementary">Elementary</SelectItem>
                  <SelectItem value="Secondary">Secondary</SelectItem>
                  <SelectItem value="Tertiary">Tertiary</SelectItem>
                  <SelectItem value="Vocational/Trade Course">Vocational/Trade Course</SelectItem>
                  <SelectItem value="Graduate School">Graduate School</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input id="schoolName" placeholder="Enter school name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input id="course" placeholder="Enter course or field of study" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearGraduated">Year Graduated (if applicable)</Label>
              <Input id="yearGraduated" type="number" placeholder="YYYY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitsEarned">Units Earned</Label>
              <Input id="unitsEarned" placeholder="Enter units earned" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearFrom">Year (from)</Label>
              <Input id="yearFrom" type="number" placeholder="YYYY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearTo">Year (to)</Label>
              <Input id="yearTo" type="number" placeholder="YYYY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="honors">Academic Honors / Scholarship</Label>
              <Textarea id="honors" placeholder="Enter any honors or scholarships" rows={2} />
            </div>
          </div>
          <Button className="mt-4">Add Education Record</Button>

          {/* Table displaying educational records */}
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold">Education History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Degree Course</TableHead>
                  <TableHead>Year Graduated</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Years Attended</TableHead>
                  <TableHead>Honors / Scholarships</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {educationRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.level}</TableCell>
                    <TableCell>{record.school}</TableCell>
                    <TableCell>{record.course}</TableCell>
                    <TableCell>{record.yearGraduated}</TableCell>
                    <TableCell>{record.units}</TableCell>
                    <TableCell>{record.yearsAttended}</TableCell>
                    <TableCell>{record.honors}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="eligibility">
      <Card>
        <CardHeader>
          <CardTitle>Eligibility Information</CardTitle>
          <CardDescription>Manage your eligibility details and certifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form for adding new eligibility record */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eligibility">Eligibility</Label>
              <Select>
                <SelectTrigger id="eligibility">
                  <SelectValue placeholder="Select eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Barangay Official">Barangay Official</SelectItem>
                  <SelectItem value="Barangay Official Eligibility">Barangay Official Eligibility</SelectItem>
                  <SelectItem value="BOARD OF ELECTRONS & COMM. ENGINEERING">BOARD OF ELECTRONS & COMM. ENGINEERING</SelectItem>
                  <SelectItem value="Career Executive Service">Career Executive Service</SelectItem>
                  <SelectItem value="Career Service Executive Eligibility">Career Service Executive Eligibility</SelectItem>
                  <SelectItem value="Career Service Professional">Career Service Professional</SelectItem>
                  <SelectItem value="Career Service Sub-Professional">Career Service Sub-Professional</SelectItem>
                  <SelectItem value="CSC-M2 #42 S. 1993">CSC-M2 #42 S. 1993</SelectItem>
                  <SelectItem value="CSC-MC 2 s. 1996 amended CSC MC 3 s. 2008">CSC-MC 2 s. 1996 amended CSC MC 3 s. 2008</SelectItem>
                  <SelectItem value="CUSTOM BROKER LICENSURE EXAM">CUSTOM BROKER LICENSURE EXAM</SelectItem>
                  <SelectItem value="Data Encoder">Data Encoder</SelectItem>
                  <SelectItem value="Electronic Data Processing Specialist Eligibility">Electronic Data Processing Specialist Eligibility</SelectItem>
                  <SelectItem value="LET licensure examination">LET licensure examination</SelectItem>
                  <SelectItem value="Licensure Exam for Criminologists">Licensure Exam for Criminologists</SelectItem>
                  <SelectItem value="Licensure Exam for Midwifery">Licensure Exam for Midwifery</SelectItem>
                  <SelectItem value="MAIL MASSAGER">MAIL MASSAGER</SelectItem>
                  <SelectItem value="NATIONAL TELECOMMUNICATION COMMISSION BOARD EXAM">NATIONAL TELECOMMUNICATION COMMISSION BOARD EXAM</SelectItem>
                  <SelectItem value="NO ELIGIBILITY">NO ELIGIBILITY</SelectItem>
                  <SelectItem value="Non-Professional Driver License">Non-Professional Driver License</SelectItem>
                  <SelectItem value="Police Officer (NAPOLCOM)">Police Officer (NAPOLCOM)</SelectItem>
                  <SelectItem value="Presidential Decree No. 907">Presidential Decree No. 907</SelectItem>
                  <SelectItem value="Professional Driver License">Professional Driver License</SelectItem>
                  <SelectItem value="RA 10156 - SANGGUNIAN MEMBER SECOND LEVEL ELIGIBILITY">RA 10156 - SANGGUNIAN MEMBER SECOND LEVEL ELIGIBILITY</SelectItem>
                  <SelectItem value="RA 1080 - Agricultural Engineer">RA 1080 - Agricultural Engineer</SelectItem>
                  <SelectItem value="RA 1080 - BAR">RA 1080 - BAR</SelectItem>
                  <SelectItem value="RA 1080 - CPA">RA 1080 - CPA</SelectItem>
                  <SelectItem value="RA 1080 - DENTIST">RA 1080 - DENTIST</SelectItem>
                  <SelectItem value="RA 1080 - DOCTOR">RA 1080 - DOCTOR</SelectItem>
                  <SelectItem value="RA 1080 - ENGINEER">RA 1080 - ENGINEER</SelectItem>
                  <SelectItem value="RA 1080 - NURSE">RA 1080 - NURSE</SelectItem>
                  <SelectItem value="RA 1080 - PHARMACIST">RA 1080 - PHARMACIST</SelectItem>
                  <SelectItem value="RA 1080 - PSYCHOMETRICIAN">RA 1080 - PSYCHOMETRICIAN</SelectItem>
                  <SelectItem value="RA 1080 - REAL ESTATE BROKER">RA 1080 - REAL ESTATE BROKER</SelectItem>
                  <SelectItem value="RA 1080 - SHARIA BAR">RA 1080 - SHARIA BAR</SelectItem>
                  <SelectItem value="RA 1080 - SOCIAL WORKER">RA 1080 - SOCIAL WORKER</SelectItem>
                  <SelectItem value="RA 1080 - TEACHER">RA 1080 - TEACHER</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" placeholder="Enter rating" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examDate">Date of Examination</Label>
              <Input id="examDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="place">Place of Examination</Label>
              <Input id="place" placeholder="Enter place of examination" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number (if applicable)</Label>
              <Input id="licenseNumber" placeholder="Enter license number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Date of Release</Label>
              <Input id="releaseDate" type="date" />
            </div>
          </div>
          <Button className="mt-4">Add Eligibility Record</Button>

          {/* Table displaying eligibility records */}
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold">Eligibility History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ELIGIBILITY</TableHead>
                  <TableHead>RATING</TableHead>
                  <TableHead>EXAM DATE</TableHead>
                  <TableHead>PLACE OF EXAMINATION</TableHead>
                  <TableHead>LICENSE NUMBER</TableHead>
                  <TableHead>DATE OF RELEASE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eligibilityRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.eligibility}</TableCell>
                    <TableCell>{record.rating}</TableCell>
                    <TableCell>{record.examDate}</TableCell>
                    <TableCell>{record.place}</TableCell>
                    <TableCell>{record.licenseNumber}</TableCell>
                    <TableCell>{record.releaseDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
      <TabsContent value="attachments">
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Upload and manage employee documents here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                        <span>Upload a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </Label>
            </div>
            <div className="space-y-4">
              {attachments.map((attachment) => (
                <AttachmentCard
                  key={attachment.id}
                  fileName={attachment.fileName}
                  fileSize={attachment.fileSize}
                  uploadDate={attachment.uploadDate}
                  fileType={attachment.fileType}
                  downloadUrl={`/api/download/${attachment.id}`}
                  previewUrl={`/api/preview/${attachment.id}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="work-experience">
        <Card>
          <CardHeader>
            <CardTitle>Employee History</CardTitle>
            <CardDescription>Recent activities and changes related to this employee.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { date: "2023-06-15", action: "Position updated to Senior Software Engineer" },
                { date: "2023-05-01", action: "Completed annual performance review" },
                { date: "2023-03-10", action: "Attended leadership training workshop" },
                { date: "2023-01-15", action: "Submitted updated resume" },
                { date: "2022-12-01", action: "Received end-of-year bonus" },
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-500">{format(new Date(item.date), "MMMM d, yyyy")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}