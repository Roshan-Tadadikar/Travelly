import React, { useContext, useEffect } from 'react'
import { AiOutlineHome } from "react-icons/ai"
import { BsRocket } from "react-icons/bs"
import { BsBookmark } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { useLocation, Link, useNavigate, json } from 'react-router-dom'
import { ProvideUserContext } from '../Context/UserContext'
import image from "../Images/ot.png"

const LeftSideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname
    const Logout = () => {
        console.log("logout clicked")
        localStorage.removeItem("encodedToken");
        localStorage.removeItem("userInfo");
        navigate("/login")
    }

    const { userInfo, userState } = useContext(ProvideUserContext)


    return (
        <div>

            <aside id="separator-sidebar" class="lg:visible fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium p-4">
                        <li className='mb-20'>
                            <Link to="/" class="text-3xl flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img src={image} class="w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span class="ml-3">Travelly</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineHome className={path == "/" ? "text-blue-500" : ""} />
                                <span class={path == "/" ? "ml-3 text-blue-500" : "ml-3"}>Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/explore" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsRocket className={path == "/explore" ? "text-blue-500" : ""} />
                                <span class={path == "/explore" ? "ml-3 text-blue-500" : "ml-3"}>Explore</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookmark" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsBookmark className={path == "/bookmark" ? "text-blue-500" : ""} />
                                <span class={path == "/bookmark" ? "ml-3 text-blue-500" : "ml-3"}>Bookmark</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => Logout()} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                                <BiLogOut />
                                <span className='ml-3'>Logout</span>
                            </Link>
                        </li>
                    </ul>


                    <Link className='flex mt-56 p-4 dark:hover:bg-gray-700 rounded cursor-pointer' to="/profile">
                        <div className='p-2'>
                            {console.log("user info image ==>"+JSON.stringify(userInfo))}
                            <img class="w-10 h-10 rounded-full" src={userInfo.img} alt="Rounded avatar" />
                        </div>
                        <div className='flex flex-col p-2'>
                            <p className='text-white'>{userInfo.firstName}</p>
                            <p className='text-slate-600'>@{userInfo.username}</p>
                        </div>
                    </Link>
                </div>
            </aside>



            <div class="lg:hidden md:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white p-2">

                <nav class="flex justify-around list-none">
                    <li>
                        <Link to="/" class="mt-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <AiOutlineHome className={path == "/" ? "text-blue-500" : ""} />
                        </Link>
                    </li>

                    <li>
                        <Link to="/explore" class="mt-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BsRocket className={path == "/explore" ? "text-blue-500" : ""} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/bookmark" class="mt-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BsBookmark className={path == "/bookmark" ? "text-blue-500" : ""} />
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => Logout()} class="mt-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BiLogOut className='text-xl' />
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            <div className='p-2'>
                                <img class="w-10 h-10 rounded-full" src={userInfo.img} alt="Rounded avatar" />
                            </div>
                        </Link>
                    </li>
                </nav>
            </div>

        </div >
    )
}

export default LeftSideBar