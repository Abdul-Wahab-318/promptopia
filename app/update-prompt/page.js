'use client'
import Form from '@components/Form'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter , useSearchParams} from 'next/navigation'
import React , { useState , useEffect } from 'react'
import { toast } from 'react-toastify'

const UpdatePost = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const { data : session } = useSession()
    console.log(session)
    const [submitting, setSubmitting] = useState(false)
    const [post , setPost] = useState({
        tags : '',
        prompt : ''
    })

    const handleSubmit  = async (e) => {
      setSubmitting(true)
      e.preventDefault()
      try{
        let prompt = await axios.patch(`/api/prompt/${searchParams.get('id')}` , post)
        toast.success('Prompt Updated')
        router.push(`/profile/${session.user.id}`)
      }
      catch(err){
        toast.error('An error occurred')
        console.log(err)
      }
      setSubmitting(false)
    }

    useEffect(() => {
      
      const fetchPost = async () => {
        try{
          let { data } = await axios.get(`/api/prompt/${searchParams.get('id')}`)
          setPost(data.data)
        }
        catch(err)
        {
          console.log(err)
        }
      }

      fetchPost()

    },[])


  return (
    <div className='update-post container mx-auto mb-16'>
        <Form 
        submitting = {submitting}
        post = {post}
        setPost={setPost}
        type={'Update'}
        handleSubmit={handleSubmit} />
    </div>
  )
}

export default UpdatePost