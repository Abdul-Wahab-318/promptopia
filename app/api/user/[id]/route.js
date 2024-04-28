import User from "@models/User"
import connectToDB from "@utils/db"

export const GET = async (req, res) => {
    try{
        await connectToDB()
        console.log("params + :" , req.query)
        let user = await User.findById(req.params.id)

        if(!user)
            return new Response(JSON.stringify({ data : null , message : 'user not found' }) , {status: 404})

        return new Response(JSON.stringify("success") , {status: 200 })
    }
    catch(err)
    {
        console.log(err)
        return new Response(JSON.stringify("failed") , {status: 400 })

    }
}