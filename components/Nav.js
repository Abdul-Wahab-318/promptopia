'use client'
import React , { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn , signOut , useSession , getProviders } from 'next-auth/react'

const Nav = () => {

  const { data : session } = useSession()
  const isUserLoggedIn = session?.user || false
  const [providers , setProviders] = useState({})
  const [toggleDropDown , setToggleDropDown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
       const resp = await getProviders()
        setProviders(resp)
    }

    setUpProviders()

  },[])
  console.log(session)
  return (
    <nav className='flex-between sm:mb-16 py-5 w-full container mx-auto'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image src={"/assets/images/logo.svg"} width={32} height={32} alt='logo' />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* desktop nav */}
        <div className='sm:flex hidden'>
            {
                isUserLoggedIn ? 
                (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={'/create-prompt'} className='black_btn'>Create Post</Link>
                        <button className='outline_btn' onClick={signOut} type='button'>Sign out</button>
                        <Link href={'/profile'}>
                            <Image src={session?.user.image} alt='profile' className='rounded-full' width={30} height={30} />
                        </Link>
                    </div>
                )
                :
                (
                    Object.values(providers).map((provider) => {
                    return ( 
                        <button key={provider.name} onClick={() => signIn(provider.id)} className='black_btn' >
                            Sign in
                        </button>
                    )
                    })
                    
                )
            }
        </div>

        {/*MOBILE NAV*/}
        <div className='flex sm:hidden'>
            {
                isUserLoggedIn ? 
                (
                    <div className="flex gap-3 md:gap-5 relative" >
                        <button type='button' onClick={ () => setToggleDropDown( state => !state ) }>
                            <Image src={session?.user.image} alt='profile' className='rounded-full' width={30} height={30} />
                        </button>
                        {
                            toggleDropDown && (
                                <div className='dropdown'>
                                    <Link href={'profile'} className='dropdown_link' onClick={() => setToggleDropDown(false)}>My Profile</Link>
                                    <Link href={'create-prompt'} className='dropdown_link' onClick={() => setToggleDropDown(false)}>Create Prompt</Link>
                                    <button type='button' onClick={signOut} className='outline_btn mt-5'>Sign out</button>

                                </div>
                            )
                        }
                    </div>
                )
                :
                (
                    Object.values(providers).map((provider) => {
                    return ( 
                        <button key={provider.name} onClick={() => signIn(provider.id)} className='black_btn' >
                            Sign in
                        </button>
                    )
                    })
                    
                )
            }
        </div>

    </nav>
  )
}

export default Nav