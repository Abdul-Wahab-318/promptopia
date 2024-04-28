import User from "@models/User";
import connectToDB from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        })
    ] ,

    callbacks : {

        async session({ session })
        {
            try{
                await connectToDB()

                let user = await User.findOne({
                    email : session.user.email
                })
                
                session.user.id = user._id.toString()
                return session
            }
            catch(err)
            {
                console.log(err)
                return session
            }
        } ,
    
        async signIn({ profile })
        {
            console.log( "SIGNING IN :" , profile)
            try{
                await connectToDB()
    
                let user = await User.findOne(
                    {
                        email : profile.email
                    }
                )
    
                //if user does not exist then create
                if ( !user )
                {
                    console.log("Creating user")
                    await User.create({
                        email : profile.email ,
                        username : profile.name,
                        image : profile.picture
                    })
                }
    
                return true
            }
            catch(err)
            {
                console.error(err)
                return false
            }
        }

    }
    

})

export { handler as GET , handler as POST }