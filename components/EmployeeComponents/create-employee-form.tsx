'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createEmployee } from "@/app/(protected)/employees/actions"

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  middleName: z.string().optional(),
  suffix: z.string().optional(),
  email: z.string().email(),
  position: z.string().min(2),
  department: z.string().min(2),
  gender: z.string(),
  birthplace: z.string(),
  birthdate: z.string(),
  civilStatus: z.string(),
  bloodType: z.string().optional(),
  citizenship: z.string(),
  religion: z.string().optional(),
  mobileNo: z.string(),
  weight: z.string().optional(),
  height: z.string().optional(),
  residentialAddress: z.string(),
  
  // Office Information
  plantilla: z.string().optional(),
  office: z.string().optional(),
  detailedTo: z.string().optional(),
  // ... add other fields as needed
})

export function CreateEmployeeForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      // ... initialize other fields
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await createEmployee(values)
      form.reset()
      onSuccess()
    } catch (error) {
      console.error("Failed to create employee:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
            <TabsTrigger value="office-info">Office Information</TabsTrigger>
            <TabsTrigger value="family-info">Family Information</TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add other personal information fields */}
            </div>
          </TabsContent>

          <TabsContent value="office-info">
            <div className="grid grid-cols-2 gap-4">
              {/* Add office information fields */}
            </div>
          </TabsContent>

          <TabsContent value="family-info">
            <div className="grid grid-cols-2 gap-4">
              {/* Add family information fields */}
            </div>
          </TabsContent>
        </Tabs> 

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Employee"}
          </Button>
        </div>
      </form>
    </Form>
  )
}