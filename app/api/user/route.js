import User from "@models/User"
import connectToDB from "@utils/db"

export const GET = async (req, res) => {
    try{
        await connectToDB()
        
        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const id = searchParams.get('id')

        let user = await User.findById(id)
        console.log("user : " + user ) 
        if(!user)
            return new Response(JSON.stringify({ data : null , message : 'user not found' }) , {status: 404})

        return new Response( JSON.stringify({ data : user , message : 'user found' }) , {status: 200 })
    }
    catch(err)
    {
        console.log(err)
        return new Response(JSON.stringify("failed") , {status: 400 })

    }
}