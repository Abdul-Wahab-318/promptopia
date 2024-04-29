import Prompt from "@models/Prompt"
import connectToDB from "@utils/db"

export const GET = async (req, res) => {

    try{
        await connectToDB()

        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const id = searchParams.get('id')
        
        let prompts = await Prompt.find({ creator : id }).populate('creator')

        return new Response(JSON.stringify({data : prompts , message : 'prompts fetched'}), { status : 200 })

    }
    catch(err)
    {
        console.log(err)
        return new Response(JSON.stringify({ error : 'cannot fetch prompts' }), { status : 400 })
    }

}