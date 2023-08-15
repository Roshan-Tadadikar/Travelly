import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { getAllUserService, followUserService } from "../Service/UserService"
import { loginUser } from "../Service/AuthService"
import { ProvideUserContext } from '../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RightSideBar = () => {

    const { userState, userDispatch } = useContext(ProvideUserContext)
    const [users, setUsers] = useState();
    const [unAlteredUsers, setUnAlteredUsers] = useState();
    const{userInfo} = useContext(ProvideUserContext)

    const filterUser = (ele, data) => {
        console.log("Inside " + JSON.stringify(userState.following))
        for (var i = 0; i < data.length; i++) {
            console.log("data===>" + data[i]._id)
            if (ele.username == data[i].username) {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        const handleUserData = async () => {
            try {
                const response = await getAllUserService();
                const users = response?.data?.users;
                const filteredData = users.filter(ele => filterUser(ele, userState.following) && ele._id!=userInfo._id) 
                console.log("new filtered data==>" + JSON.stringify(filteredData))
                setUsers(filteredData)
                setUnAlteredUsers(filteredData)
            } catch (e) {
                console.log(e);
            }
        }
        handleUserData()
    }, [userState?.following])



    const followUserFunction = async (userId, token) => {
        console.log("encodedToke-->" + token)
        const response = await followUserService(token, userId);
        if (response.status == 200) {
            const userFollowed = response.data.followUser;
            userDispatch({ type: "follow_user", payload: userFollowed })
            toast.success(`You're following ${userFollowed.firstName}`)
        }

    }

    const handleUsers=(name)=>{
        setUsers(unAlteredUsers.filter(ele=>ele.firstName.includes(name)))
    }




    return (
        <div className={users?.length==0?'hidden':'hidden lg:block'}>
            <div className=''>

                <aside id="logo-sidebar" class="lg:visible fixed top-0 right-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-transparent">
                        <div>
                            <input onChange={(e) => handleUsers(e.target.value)} type='search' class="mb-8 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-primary-300" placeholder='Search users' />
                        </div>
                        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h1 className='text-white font-bold mb-2'>Suggested Users</h1>
                            <div class="flow-root">
                                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li class="py-3 sm:py-4">
                                        {
                                            users?.map(user => <div>

                                                <div class="flex items-center space-x-4 mb-6 mt-6 hover:bg-gray-900 p-4 hover:shadow-xl">
                                                    <div class="flex-shrink-0" key={user.id}>
                                                        <img class="w-8 h-8 rounded-full" src={user.img} alt="Neil image" />
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {user.firstName}
                                                        </p>
                                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            @{user.username}
                                                        </p>
                                                    </div>
                                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                            onClick={() => followUserFunction(user._id,localStorage.getItem("encodedToken") )}
                                                        >Follow</button>
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </aside>
            </div>
            <ToastContainer
                theme="dark"
                hideProgressBar
                autoClose={2000}
            />
        </div>
    )
}

export default RightSideBar