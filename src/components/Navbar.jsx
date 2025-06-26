import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'
const Navbar = () => {
    const {searchQuery, setSearchQuery, navigate} = useAppContext();
    useEffect(() => {
        if(searchQuery.length > 0) {
            navigate('/tools')
        }
    },[searchQuery])
  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all h-[8vh]'>
        <h1
        onClick={() => navigate('/')}
         className='text-3xl font-semibold cursor-pointer'><span className='text-primary font-bold'>WebTools</span> Hub</h1>
         <div className='hidden sm:flex items-center gap-8'>
            <Link to='/'>Home</Link>
            <Link to='/tools'>All Tools</Link>
            {/* <Link to='/categories'>Categories</Link> */}
            <Link to='/contact'>Contact</Link>
        </div>
        <div className='hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-4 rounded-full w-100'>
            <input
            onChange={(e) => {
                setSearchQuery(e.target.value)
            }}
             className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
            type="text" placeholder='Search Tools here...'/>
            <i className="ri-search-line"></i>
        </div>
        

        

    </nav>
  )
}

export default Navbar