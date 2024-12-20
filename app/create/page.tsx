'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function CreateMeme() {
  const [caption, setCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('/placeholder.svg?height=500&width=500')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImageUrl(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the meme data to your backend
    console.log('Meme created:', { caption, imageUrl })
    // Reset form or redirect user
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-14">
      <h1 className="text-3xl font-bold">Create a Meme</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="caption" className="block text-sm font-medium mb-1">Caption</label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter your meme caption"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">Upload Image</label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Image src={imageUrl} alt="Meme preview" width={500} height={500} className="w-full h-auto" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-lg font-bold">{caption || 'Your caption here'}</p>
            </div>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full">Generate Meme</Button>
      </form>
    </div>
  )
}

