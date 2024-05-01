'use client'

import React , { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import useDebounce from '@app/hooks/useDebounce'

const Feed = () => {

    const [searchText, setSearchText] = useState("")
    const [searchTimeout , setSearchTimeout ] = useState(null)
    const [filteredResults, setFilteredResults] = useState([])
    const [posts , setPosts] = useState([])

    function filter(text) {
        if ( text === '' )
            return posts
        else
        return  posts.filter( post => post.prompt.includes(text) || post.tags.includes(text) )
    }

    const handleSearchTextChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        // debounce method
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filter(e.target.value);
            setFilteredResults(searchResult);
          }, 500)
        );
    }

    useEffect(() => {

        const fetchPrompts = async () => {        
            try{
                const {data} = await axios.get("/api/prompt")
                console.log(data)
                setPosts(data)
                setFilteredResults(data)
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
        onChange={handleSearchTextChange}
        required
        placeholder='Search prompt tags or username'
        className='w-full py-2 px-3 rounded shadow-md' />
        <ToastContainer/>
        <PromptCardList data={filteredResults} />
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