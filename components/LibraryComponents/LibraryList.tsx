'use client'

import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function LibraryList() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Library Items</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="hover:bg-accent transition-colors">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">Item Title 1</h3>
            <p className="text-sm text-muted-foreground">Description of the item</p>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent transition-colors">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">Item Title 2</h3>
            <p className="text-sm text-muted-foreground">Description of the item</p>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent transition-colors">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">Item Title 3</h3>
            <p className="text-sm text-muted-foreground">Description of the item</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
