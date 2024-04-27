import Prompt from "@models/Prompt"
import connectToDB from "@utils/db"

export const POST = async (req, res) => {

    let { prompt , tags , userID } = await req.json()

    try{
        await connectToDB()

        let newPrompt = await Prompt.create({
            prompt,
            tags,
            creator : userID
        })

        return new Response(JSON.stringify({
            prompt : newPrompt,
            message : 'prompt created'
        }) , { status : 201 })
    }
    catch(err)
    {
        console.error(err)
        return new Response(JSON.stringify({
            error : err,
            message : 'prompt creation failed'
        }) , { status : 400 })
    }
}