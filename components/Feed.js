'use client'

import React , { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Feed = () => {

    const [searchText, setSearchText] = useState("")
    const [posts , setPosts] = useState([])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {

        const fetchPrompts = async () => {        
            try{
                const {data} = await axios.get("/api/prompt")
                console.log(data)
                setPosts(data)
            }
            catch(err){
                console.log(err)
                toast.error('Failed to fetch feed')
            }
        }

        fetchPrompts()

    }, [])

return (
    <section className='feed mt-16'>
        <input type="text"
        value={searchText}
        onChange={handleSearchChange}
        required
        placeholder='Search prompt tags or username'
        className='w-full py-2 px-3 rounded shadow-md' />
        <ToastContainer/>
        <PromptCardList data={posts} />
    </section>
  )
}

const PromptCardList = ({ data , handleTagClick , }) => {

    return (
        <section className="prompt-card-list mt-14 prompt_layout">
            {
                data.map( (post, ind) => <PromptCard post={post} key={ind} />)
            }
        </section>
    )
}

export default Feed