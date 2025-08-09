import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'
const Navbar = () => {
    const {searchQuery, setSearchQuery, navigate} = useAppContext();
    useEffect(() => {
        if(searchQuery.length > 0) {
            navigate('/tools')
            
        }
    },[searchQuery])

    const [isOpen, setIsOpen] = useState(false)

    const handlMenuToggle = () => {
        setIsOpen(!isOpen)
    }
  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all h-[8vh]'>

        {/* Logo */}
        <h1 onClick={() => navigate('/')} className='text-2xl md:text-3xl font-semibold cursor-pointer'><span className='text-primary font-bold'>WebTools</span> Hub</h1>

         {/* Menu Items (Mobile) */}
         {
            isOpen && 
                <div className='flex flex-col absolute z-50 w-60 shadow-2xl top-[8vh] bg-white left-0 px-6 transition all duration-200 gap-4 h-screen py-6 items-start md:hidden '>
                    <Link className='w-full text-primary border-b py-2 px-3 rounded ' onClick={() => setIsOpen(false)} to='/'>Home</Link>
                    <Link className='w-full text-primary border-b py-2 px-3 rounded ' onClick={() => setIsOpen(false)} to='/tools'>All Tools</Link>
                    <Link className='w-full text-primary border-b py-2 px-3 rounded ' onClick={() => setIsOpen(false)} to='/contact'>Contact</Link>
                    {/* <Link to='/categories'>Categories</Link> */}
                </div>
         }


        {/* Menu Items (Web) */}
         <div className='hidden md:flex shadow-2xl top-[8vh] bg-white gap-12 items-start '>
            <Link to='/'>Home</Link>
            <Link to='/tools'>All Tools</Link>
            {/* <Link to='/categories'>Categories</Link> */}
            <Link to='/contact'>Contact</Link>
        </div>

        {/* Search Bar */}
        <div className='hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-4 rounded-full w-100'>
            <input
            onChange={(e) => {
                setSearchQuery(e.target.value)
            }}
             className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
            type="text" placeholder='Search Tools here...'/>
            <i className="ri-search-line"></i>
        </div>

            
        <div className='md:hidden text-2xl' onClick={handlMenuToggle}>
            {isOpen ? <IoMdClose /> : <FaBars />}
            
        </div>

        

    </nav>
  )
}

export default Navbar