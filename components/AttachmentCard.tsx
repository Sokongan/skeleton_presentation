import { useState } from "react"
import { File, MoreVertical, Eye, Download } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface AttachmentCardProps {
  fileName: string
  fileSize: number
  uploadDate: Date
  fileType: string
  downloadUrl: string
  previewUrl?: string
}

export default function AttachmentCard({
  fileName,
  fileSize,
  uploadDate,
  fileType,
  downloadUrl,
  previewUrl,
}: AttachmentCardProps) {
  const [downloadProgress, setDownloadProgress] = useState(0)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDownload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setDownloadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        // Actual download logic would go here
        window.open(downloadUrl, "_blank")
      }
    }, 200)
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-primary/10 p-3">
            <File className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium leading-none">{fileName}</p>
            <p className="text-sm text-muted-foreground">
              {formatFileSize(fileSize)} • {fileType.toUpperCase()}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {previewUrl && (
                <DropdownMenuItem asChild>
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </a>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex w-full flex-col space-y-2">
          {downloadProgress > 0 && downloadProgress < 100 && (
            <Progress value={downloadProgress} className="h-2 w-full" />
          )}
          <p className="text-xs text-muted-foreground">
            Uploaded {formatDistanceToNow(uploadDate, { addSuffix: true })}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}