//flex-> dono cheezen agal bagal aa gai naam aur links
//items-center justify-between ->LINKS ko sahi jagah pohochane ke liye
//me->margin end, py->padding y,px->padding x,
//key={i}->loop ki values print karane ke liye, md->medium devices
import React from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';
import { useSelector} from 'react-redux';
const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/",
        },
        {
            title:"About Us",
            link:"/about-us",
        },
        {
            title:"All Books",
            link:"/all-books",
        },
        {
            title:"Cart",
            link:"/cart",
        },
        {
            title:"Profile",
            link:"/profile",
        },
    ];
    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn=== false)
    {
        links.splice(3,2)
    }
    const [MobileNav, setMobileNav] = useState("hidden")
  return (
    <>
    <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <div className="flex items-center">
            <img className="h-10 me-4"src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="FableNest Logo"></img>
            <Link to="/" className="text-2xl font-semibold">FableNest</Link>
            </div>
        <div className="nav-links-FableNest block md:flex gap-4 items-center">
           <div className="hidden md:flex gap-4">
           {links.map((items,i)=>(
            <div className='flex items-center'>
            {items.title==="Profile" ? (
                <Link to={items.link}
                className=" px-2 py-1 hover:text-blue-500 border border-blue-500 rounded transition-all duration-300"
                key={i}>
                    {items.title}{" "}
                    </Link>
            ):(
                <Link to={items.link}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}>
                    {items.title}{" "}
                    </Link>
            )}
            </div>
            ))}
            </div> 
            {isLoggedIn===false && <div className="hidden md:flex gap-4">
                <Link to="/LogIn" className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">LogIn</Link>
                <Link to="/SignUp" className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
            </div>
            }  
            <button className='block md:hidden text-white text-2xl hover:text-zinc-400'onClick={()=>setMobileNav(MobileNav==="hidden" ? "block":"hidden")}><FaGripLines/></button>
        </div>
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items,i)=>(
        <>
           {items.title==="Profile" ? (<Link to={items.link}
           className="px-8 py-2 mb-8 text-3xl text-white font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"key={i}
           onClick={()=>setMobileNav(MobileNav==="hidden" ? "block":"hidden")}>
               {items.title}{" "}   
               </Link> 
           ): (<Link to={items.link}
                className=" text-white text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"key={i}
                onClick={()=>setMobileNav(MobileNav==="hidden" ? "block":"hidden")}>
                    {items.title}{" "}
                    </Link>
               ) }
            </>
            ))}

            {isLoggedIn===false && (
                <>
                <Link to="/LogIn" className="px-8 py-2 mb-8 text-3xl text-white font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">LogIn</Link>
                <Link to="/SignUp" className="px-8 py-2 mb-8 text-3xl text-white font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
                </>
            )}

            </div>
    </>
  )
}

export default Navbar