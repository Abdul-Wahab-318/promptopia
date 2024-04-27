'use client'
import Form from '@components/Form'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React , { useState } from 'react'
import { toast } from 'react-toastify'

const CreatePost = () => {

    const router = useRouter()
    const { data : session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post , setPost] = useState({
        tags : '',
        prompt : ''
    })

    const handleSubmit  = async (e) => {
      e.preventDefault()
      try{
        let prompt = await axios.post('/api/prompt' , { ...post , userID : session.user._id })
        toast.success('Prompt created')
        router.push("/")
      }
      catch(err){
        toast.success('An error occurred')
        console.log(err)
      }
    }


  return (
    <div className='create-post container mx-auto mb-16'>
        <Form 
        submitting = {submitting}
        post = {post}
        setPost={setPost}
        type={'Create'}
        handleSubmit={handleSubmit} />
    </div>
  )
}

export default CreatePost