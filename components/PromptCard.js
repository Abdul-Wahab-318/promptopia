'use client'
import React , { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname , useRouter } from 'next/navigation'

const PromptCard = ({ post , handleTagClick , handleEdit , handleDelete }) => {

    const router = useRouter()
    const [copied , setCopied] = useState(false)
    const handleCopy = () => {

        setCopied(true)
        navigator.clipboard.writeText(post.prompt)

        setTimeout(() => {
            setCopied(false)
        },3000)
    }

  return (
    <div className='prompt_card'>
        <div className='flex justify-between gap-3 items-center'>
            <div className='flex gap-4 items-center' style={{cursor:'pointer'}} onClick={()=>router.push(`/profile/${post.creator._id}`)}>
                <Image src={post.creator.image} alt='profile pic' width={35} height={35} className='rounded-full' />
                <div>
                    <p className="font-bold text-sm">{post.creator.username}</p>
                    <p className="text-gray-600 text-sm">{post.creator.email}</p>
                </div>
            </div>
            <button onClick={handleCopy} className='copy_btn'>
                <Image src={ copied ?  '/assets/icons/tick.svg' : '/assets/icons/copy.svg'  } alt='copy icon' width={14} height={14} />
            </button>
        </div>
        <p className="mt-4">
            {post.prompt}
        </p>
        <p className='mt-4' onClick={() => handleTagClick && handleTagClick(post.tags) }>{post.tags.split(",").map( tag => " #" + tag.trim())}</p>
    </div>
  )
}

export default PromptCard