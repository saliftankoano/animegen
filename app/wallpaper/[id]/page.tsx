"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Send, ThumbsUp, ThumbsDown } from 'lucide-react'

// This would typically come from an API call
const getMemeById = (id: string) => ({
  id: parseInt(id),
  imageUrl: '/placeholder.svg?height=500&width=500',
  caption: 'When the code finally works',
  creator: 'CodeNinja',
  creatorAvatar: '/placeholder.svg?height=40&width=40',
  createdAt: '2023-06-15',
  likes: 1337,
  comments: [
    { id: 1, user: 'User1', avatar: '/placeholder.svg?height=40&width=40', text: 'Great meme!', createdAt: '2023-06-16', likes: 24, dislikes: 1 },
    { id: 2, user: 'User2', avatar: '/placeholder.svg?height=40&width=40', text: 'LOL so true', createdAt: '2023-06-17', likes: 15, dislikes: 0 },
  ],
})

export default function MemePage() {
  const params = useParams()
  const meme = getMemeById(params.id as string)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(meme.likes)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(meme.comments)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      setComments([
        ...comments,
        { 
          id: comments.length + 1, 
          user: 'CurrentUser', 
          avatar: '/placeholder.svg?height=40&width=40',
          text: commentText, 
          createdAt: new Date().toISOString(),
          likes: 0,
          dislikes: 0
        },
      ])
      setCommentText('')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="overflow-hidden border-2 border-primary">
        <CardContent className="p-0 relative">
          <Image src={meme.imageUrl} alt={meme.caption} width={500} height={500} className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm p-4">
            <p className="text-lg font-bold text-primary-foreground">{meme.caption}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-card">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={meme.creatorAvatar} alt={meme.creator} />
              <AvatarFallback>{meme.creator.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{meme.creator}</p>
              <p className="text-xs text-muted-foreground">{meme.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-foreground hover:text-foreground/80 ${isLiked ? 'text-red-500 hover:text-red-600' : ''}`}
              onClick={handleLike}
            >
              <Heart className="w-4 h-4 mr-1" fill={isLiked ? "currentColor" : "none"} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground/80">
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments.length}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">{comments.length} Comments</h2>
        <form onSubmit={handleComment} className="flex items-start space-x-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full min-h-[80px]"
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Comment
              </Button>
            </div>
          </div>
        </form>
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.avatar} alt={`${comment.user}'s avatar`} />
              <AvatarFallback>{comment.user.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-foreground">{comment.user}</p>
                <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
              </div>
              <p className="text-foreground mt-1">{comment.text}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground/80">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {comment.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground/80">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {comment.dislikes}
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground/80">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

