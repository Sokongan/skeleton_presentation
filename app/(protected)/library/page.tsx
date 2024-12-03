import { Metadata } from 'next'
import LibraryList from '@/components/LibraryComponents/LibraryList'
import LibraryCategories from '@/components/LibraryComponents/LibraryCategories'
import React from 'react'

export const metadata: Metadata = {
  title: 'Library',
  description: 'Library page description',
}

export default function LibraryPage() {
  return (
    <div className="mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Library</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <LibraryCategories />
        </div>
        <div className="col-span-9">
          <LibraryList />
        </div>
      </div>
    </div>
  )
} 