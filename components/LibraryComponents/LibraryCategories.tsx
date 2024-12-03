import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function LibraryCategories() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Categories</h2>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Button variant="ghost" className="justify-start">All Items</Button>
          <Button variant="ghost" className="justify-start">Books</Button>
          <Button variant="ghost" className="justify-start">Articles</Button>
          <Button variant="ghost" className="justify-start">Videos</Button>
        </div>
      </CardContent>
    </Card>
  )
}