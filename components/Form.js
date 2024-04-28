import React from 'react'
import Link from 'next/link'
const Form = ({ submitting , post , setPost , handleSubmit , type }) => {
  return (
    <section className='max-w-xl mx-auto'>
        <h1 className='blue_gradient head_text text-left'>{type} Post</h1>
        <p className='desc'>{type} and share prompts with the world and let your imagintation run wild with any AI-powered platform </p>

        <form onSubmit={handleSubmit} className='mt-10 glassmorphism flex flex-col gap-7' >
            <div className='flex flex-col gap-5'>
                <label htmlFor="">
                    <span className='text-gray-700 font-semibold'>Your AI prompt</span>
                </label>
                <textarea name="prompt"
                required
                placeholder='Write your prompt here...'
                value={post.prompt} 
                onChange={ e => setPost({ ...post , prompt: e.target.value }) }
                id="prompt" 
                rows="4" 
                className='w-full rounded p-3'></textarea>
            </div>
            <div className='flex flex-col gap-5'>
                <label htmlFor="">
                    <span className='text-gray-700 font-semibold'>Tags ( #web , #coding )</span>
                </label>
                <input name="tags"
                placeholder='Write prompt tags here'
                required
                value={post.tags} 
                onChange={ e => setPost({ ...post , tags : e.target.value }) }
                id="tags" 
                className='w-full rounded p-3'/>
            </div>
            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className="text-gray-600 text-sm">Cancel</Link>
                <button type='submit'  disabled={submitting} className="bg-orange-700 text-sm rounded-full px-5 py-2 text-white"> {submitting ? 'Submitting' : type } </button>

            </div>
        </form>

    </section>
  )
}

export default Form