//import axios from "axios"

const Profile = async (props) => {

  const id = props.params.id
  console.log("id in profile page : " + id )

  const profileData = await getProfile(id)
  console.log("data :" + profileData)

  return (
    <section>
        Profile page
    </section>
  )
}

async function getProfile(id) {
  try{
    const data = await fetch( `http://localhost:3000/api/user?id=${id}` )
    return data.json()
  }
  catch(err)
  {
    console.error(err)
  }
} 


export default Profile