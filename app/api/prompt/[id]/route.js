import Prompt from "@models/Prompt"
import connectToDB from "@utils/db"

export const PATCH = async (req, { params }) => {

    let { prompt , tags } = await req.json()
    let { id } = params 

    try{
        await connectToDB()

        let existingPrompt = await Prompt.findById(id)

        if ( !existingPrompt )
            return new Response(JSON.stringify({
                error : 'prompt not found',
                message : 'not found'
            }) , { status : 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tags = tags

        await existingPrompt.save()

        return new Response(JSON.stringify({
            data : existingPrompt,
            message : 'prompt updated'
        }) , { status : 201 })
    }
    catch(err)
    {
        console.error(err)
        return new Response(JSON.stringify({
            error : err,
            message : 'prompt update failed'
        }) , { status : 400 })
    }
}

export const GET = async (req, {params}) => {

    try{
        await connectToDB()
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let { id } = params 
        let prompt = await Prompt.findById(id).populate('creator')

        if(!prompt)
            return new Response(JSON.stringify({ error : 'prompt not found' }), { status : 404 })

        return new Response(JSON.stringify({data : prompt}), { status : 200 })

    }
    catch(err)
    {
        console.log(err)
        return new Response(JSON.stringify({ error : 'cannot fetch prompts' }), { status : 400 })
    }

}

export const DELETE = async (req, { params }) => {

    try{
        await connectToDB()

        let { id } = params 
        let prompt = await Prompt.findOneAndDelete(id)

        if(!prompt)
            return new Response(JSON.stringify({ error : 'prompt not found' }), { status : 404 })

        return new Response(JSON.stringify({ message : 'prompt deleted' , data : null }), { status : 200 })

    }
    catch(err)
    {
        console.log(err)
        return new Response(JSON.stringify({ error : 'could not delete prompt' }), { status : 400 })
    }

}