import Prompt from "@models/Prompt"
import connectToDB from "@utils/db"

export const POST = async (req, res) => {

    let { prompt , tags , userID } = await req.json()
    console.log("id : " + userID)
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

export const GET = async (req, res) => {

    try{
        await connectToDB()

        let prompts = await Prompt.find({}).populate('creator').limit(30)

        return new Response(JSON.stringify(prompts), { status : 200 })

    }
    catch(err)
    {
        console.log(err)
        return new Response(JSON.stringify({ error : 'cannot fetch prompts' }), { status : 400 })
    }

}