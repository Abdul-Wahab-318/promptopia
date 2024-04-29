'use client'
import { useState } from 'react'
import PromptCard from './PromptCard'
import { toast , ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const PromptCardList = ({ data }) => {

    const router = useRouter()
    const [ prompts , setPrompts ] = useState(data)

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        try{
            let data = await axios.delete(`/api/prompt/${post._id}`)
            
            setPrompts( prompts => prompts.filter(prompt => prompt._id !== post._id) )
            toast.success('Prompt deleted')

        }
        catch(err)
        {
            console.error(err)
            toast.error("Could not delete prompt")
        }
    }
    
    return (
        <>
            <section className="prompt-card-list mt-5 sm:mt-14 prompt_layout">
                {
                    prompts.map( (post, ind) => <PromptCard post={post} key={ind} handleDelete={handleDelete} handleEdit={handleEdit} />)
                }
            </section>
            {
                prompts.length === 0 &&
                <h5 className='text-center font-bold block'>No Prompts</h5>
            }
            <ToastContainer/>
        </>
    )
}

export default PromptCardList