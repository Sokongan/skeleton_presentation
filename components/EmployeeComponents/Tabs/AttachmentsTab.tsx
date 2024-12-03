"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { uploadAttachment } from '@/app/(protected)/employees/actions'
import { Employee, Attachment } from "@prisma/client"
import { FileIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AttachmentsTab({ employee }: { employee: Employee }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()
  const [attachments, setAttachments] = useState(employee.attachments)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFile) return

    startTransition(async () => {
      try {
        const result = await uploadAttachment(employee.id, selectedFile)
        if (result.success) {
          toast({
            title: "Success",
            description: "File uploaded successfully.",
          })
          setIsDialogOpen(false)
          setSelectedFile(null)
          router.refresh()
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to upload file.",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        })
      }
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = async (attachment: Attachment) => {
    try {
      // Fetch the file from our API endpoint
      const response = await fetch(`/api/documents/${attachment.id}`)
      
      if (!response.ok) {
        throw new Error('Failed to download file')
      }

      // Get the blob from the response
      const blob = await response.blob()
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)
      
      // Create a temporary link and click it
      const link = document.createElement('a')
      link.href = url
      link.download = attachment.fileName // This will be the downloaded file's name
      document.body.appendChild(link)
      link.click()
      
      // Clean up
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download file",
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Upload and manage employee documents.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Upload Document</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>

                {selectedFile && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <FileIcon className="h-4 w-4" />
                    <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setSelectedFile(null)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <Button type="submit" disabled={isPending || !selectedFile} className="w-full">
                  {isPending ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attachments?.map((attachment: Attachment) => (
                <TableRow 
                  key={attachment.id} 
                  onClick={(e) => e.preventDefault()}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4" />
                      {attachment.fileName}
                    </div>
                  </TableCell>
                  <TableCell>{attachment.fileType}</TableCell>
                  <TableCell>{formatFileSize(attachment.fileSize)}</TableCell>
                  <TableCell>{attachment.uploadDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleDownload(attachment)
                        }}
                        disabled={!attachment.storageUrl}
                      >
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!attachments?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No attachments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
} 