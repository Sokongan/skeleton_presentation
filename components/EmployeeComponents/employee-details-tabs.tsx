"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoTab } from "./Tabs/PersonalInfoTab"
import OfficeInfoTab from "@/components/EmployeeComponents/Tabs/OfficeInfoTab"
import AttachmentsTab from "@/components/EmployeeComponents/Tabs/AttachmentsTab"
import ReferencesTab from "@/components/EmployeeComponents/Tabs/ReferencesTab"
import TrainingProgramsTab from "@/components/EmployeeComponents/Tabs/TrainingProgramsTab"
import WorkExperienceTab from "@/components/EmployeeComponents/Tabs/WorkExperienceTab"
import EducationalBackgroundTab from "./Tabs/EducationalBackgroundTab"
import EligibilityTab from "@/components/EmployeeComponents/Tabs/EligibilityTab"
import { Employee } from "@prisma/client"
import { 
  UserCircle,
  Building2,
  GraduationCap, 
  Award, 
  Briefcase, 
  BookOpen, 
  Users, 
  FileText 
} from "lucide-react"
import React from "react"

export function EmployeeDetailsTabs({ employee }: { employee: Employee }) {
  return (
    <Tabs defaultValue="personal-info" className="w-full">
      <TabsList className="grid grid-cols-4 lg:grid-cols-8 h-auto gap-4 bg-transparent">
        <TabsTrigger 
          value="personal-info" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <UserCircle className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Personal Info</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="office-info"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Building2 className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Office Info</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="educational"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Education</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="eligibility"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Award className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Eligibility</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="work"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Briefcase className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Work Experience</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="training"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Training</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="references"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Users className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">References</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="attachments"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <FileText className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Attachments</span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="personal-info">
          <PersonalInfoTab employee={employee} />
        </TabsContent>

        <TabsContent value="office-info">
          <OfficeInfoTab employee={employee} />
        </TabsContent>

        <TabsContent value="educational">
          <EducationalBackgroundTab employee={employee} />
        </TabsContent>

        <TabsContent value="eligibility">
          <EligibilityTab employee={employee} />
        </TabsContent>

        <TabsContent value="work">
          <WorkExperienceTab employee={employee} />
        </TabsContent>

        <TabsContent value="training">
          <TrainingProgramsTab employee={employee} />
        </TabsContent>

        <TabsContent value="references">
          <ReferencesTab employee={employee} />
        </TabsContent>

        <TabsContent value="attachments">
          <AttachmentsTab employee={employee} />
        </TabsContent>
      </div>
    </Tabs>
  )
} 