//import axios from "axios"

const Profile = async (props) => {

  const id = props.params.id
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
    return data
    //return data.json()
  }
  catch(err)
  {
    console.error(err)
  }
} 


export default Profile