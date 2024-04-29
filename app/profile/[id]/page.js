//import axios from "axios"

import PromptCard from "@components/PromptCard"
import PromptCardList from "@components/PromptCardList"
import Image from "next/image"

const Profile = async (props) => {

  const id = props.params.id
  const { data : profile } = await getProfile(id)
  const { data : prompts } = await getUserPrompts(id)

  return (
    <section className="container w-max-lg">
      <div className="flex flex-col sm:flex-row text-center sm:text-left items-center gap-5 mt-10 sm:mt-0">
        <div>
          <Image src={profile.image} alt="profile pic" width={70} height={70} className="rounded-full" />
        </div>
        <div>
          <h2 className="blue_gradient font-bold">{profile.username}</h2>
          <h4>{profile.email}</h4>
        </div>
      </div>
      <div>
        <PromptCardList data={prompts} />
      </div>
      
    </section>
  )
}

// const PromptCardList = ({ data }) => {

//   const [ state , useState ] = useState([])

//   return (
//       <section className="prompt-card-list mt-5 sm:mt-14 prompt_layout">
//           {
//               data.map( (post, ind) => <PromptCard post={post} key={ind} />)
//           }
//       </section>
//   )
// }

async function getProfile(id) {
  try{
    const data = await fetch( `http://localhost:3000/api/user?id=${id}` , { cache : 'no-cache' })
    return data.json()
  }
  catch(err)
  {
    console.error(err)
  }
} 

async function getUserPrompts(id) {
  try{
    const data = await fetch( `http://localhost:3000/api/prompt/by-user?id=${id}` , { cache : 'no-cache' })
    return data.json()
  }
  catch(err)
  {
    console.error(err)
  }
} 

export default Profile