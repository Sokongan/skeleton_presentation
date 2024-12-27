'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-dropdown-menu'
import { Card } from "../ui/card"

export default function EmployeeFormToggle() {

  return (
    <Card>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                Name
                </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                Username
                </Label>
            </div>
            </div>
            <DialogFooter>
            <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </Card>
  )
} 