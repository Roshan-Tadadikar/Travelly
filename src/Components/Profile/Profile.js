import React, { useContext, useEffect, useReducer, useState } from 'react'
import LeftSideBar from '../Navabars/LeftSideBar'
import RightSideBar from '../Navabars/RightSideBar'
import { useLocation } from 'react-router-dom'
import Post from '../Post/Post'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleUserService, followUserService, unfollowUserService, updateProfileService } from "../Service/UserService"
import { ProvideCommonContext } from '../Context/CommonContext'
import { BsGlobe } from "react-icons/bs"
import { ProvideUserContext } from '../Context/UserContext'
import EditModal from '../Modals/EditModal'
import AvatarModal from '../Modals/AvatarModal'

const Profile = () => {
    const avatar = [
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1598875706250-21faaf804361?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1608096299210-db7e38487075?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1572566830488-069bcc7fbcec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1612940960267-4549a58fb257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1529831129093-0fa4866281ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
    ]

    const location = useLocation()
    const { modalOpen, openModal, closeModal, modalAvatarOpen, openAvatarModal, closeAvatarModal } = useContext(ProvideCommonContext)
    const val = JSON.parse(localStorage.getItem("userInfo"))
    const userInfo = location.state == undefined ? JSON.parse(val._bodyInit).foundUser : location?.state?.value
    const { userState, setTrigger, setUserInfo } = useContext(ProvideUserContext)

    const [state, setState] = useState([])
    const [user, setUser] = useState(null)

    console.log("userInfot ==>" + JSON.stringify(userInfo))
    useEffect(() => {
        const usersPost = async () => {
            try {
                const userResponse = await fetch(`/api/posts/user/${userInfo.username}`)
                const readyToUser = await userResponse.json()
                // console.log("user response ===>" + JSON.stringify(readyToUser))
                if (userResponse.status == 200) {
                    setState(readyToUser.posts);
                }
            } catch (e) {
                console.error(e)
            }
        }

        const getUserInfo = async () => {
            try {
                const userResponse = await getSingleUserService(userInfo._id)
                if (userResponse.status == 200) {
                    console.log("user Info==> api===>" + JSON.stringify(userResponse))
                    setUser(userResponse.data.user)
                }
            } catch (e) {
                console.error(e)
            }
        }

        usersPost()
        getUserInfo()
    }, [userState.Post])

    const newVal = JSON.parse(localStorage.getItem("userInfo"))
    const userProfile = JSON.parse(newVal._bodyInit).foundUser

    const handleReducer = (state, action) => {
        switch (action.type) {
            case "set_bio":
                return { ...state, bio: action.payload }
            case "set_img":
                return { ...state, img: action.payload }
            case "set_link":
                return { ...state, link: action.payload }
            default:
                return state
        }
    }

    const [avatarState, avatarDispatch] = useReducer(handleReducer, { img: "", bio: "", link: "" })

    const updateProfile = async () => {
        const newUser = { ...user }
        newUser.img = avatarState.img
        newUser.about = avatarState.bio
        newUser.link = avatarState.link
        setUser(newUser)
        setUserInfo(newUser)
        const response = await updateProfileService(newUser, localStorage.getItem("encodedToken"))
        console.log(" update response ==>" + JSON.stringify(response))
        if (response.status == 201) {
            closeModal()
            toast.success("Profile Updated")
        }
    }

    const unFollowUser = async (id) => {
        const response = await unfollowUserService(localStorage.getItem("encodedToken"), id)
        if (response.status == 200) {
            const unfollowUserName = user.firstName
            const newUser = { ...user }
            newUser.followers = user.followers.filter(ele => ele._id != userProfile._id)
            setUser(newUser)
            toast.success(`You unfollowed ${unfollowUserName}`)
        }
    }

    const FollowUser = async(userId) => {
        const response = await followUserService(localStorage.getItem("encodedToken"), userId);
        if (response.status == 200) {
            const userFollowed = response.data.followUser;
           const newUser = {...user}
           const followers = [...user.followers, ...[userProfile]]
           newUser.followers = followers
           setUser(newUser)
            toast.success(`You're following ${userFollowed.firstName}`)
        }

    }


    if (user == null) {
        return (
            <div class="flex justify-center items-center min-h-screen bg-gray-100">

                <div class="w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>

            </div>
        )
    }
    else
        return (
            <div>
                <LeftSideBar />
                <div class="p-4 sm:ml-64 h-full bg-gray-900">
                    <section class="text-gray-600 body-font lg:h-screen md:h-full">
                        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                <img class="object-cover object-center rounded w-96" alt="hero" src={user.img} />
                            </div>
                            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                                <h1 class="title-font sm:text-4xl text-3xl mb-1 font-medium text-slate-200">{user.firstName} {user.lastName}</h1>
                                <span className='text-xl mb-2'>@{user.username}</span>
                                <p class="mb-4 lg:text-3xl sm:xl leading-relaxed">{user.about}</p>
                                <span className='text-slate-300 mb-2 flex w-34 justify-between hover:text-slate-100 cursor-pointer'><BsGlobe className='mt-1' /> <a to={user.link}>{user.link}</a></span>
                                <section class="text-gray-600 body-font mb-4">
                                    <div class="container mx-auto">
                                        <div class="flex flex-wrap -m-4 text-center">
                                            <div class="p-4 sm:w-1/3 w-1/2">
                                                <h2 class="title-font font-medium sm:text-4xl text-3xl text-slate-400">{user.following.length}</h2>
                                                <p class="leading-relaxed">Following</p>
                                            </div>
                                            <div class="p-4 sm:w-1/3 w-1/2">
                                                <h2 class="title-font font-medium sm:text-4xl text-3xl text-slate-400">{state.length}</h2>
                                                <p class="leading-relaxed">Posts</p>
                                            </div>
                                            <div class="p-4 sm:w-1/3 w-1/2">
                                                <h2 class="title-font font-medium sm:text-4xl text-3xl text-slate-400">{user.followers.length}</h2>
                                                <p class="leading-relaxed">Followers</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div class="flex justify-center">
                                    {
                                        userInfo._id == userProfile._id ?
                                            <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                onClick={() => openModal()}
                                            >Edit</button>
                                            :
                                            (

                                                user.followers.find(obj => obj._id == userProfile._id) ?
                                                    <button class="inline-flex text-black bg-white border-2 border-indigo-500 py-2 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg" onClick={() => unFollowUser(user._id)}>Unfollow</button>
                                                    :
                                                    <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => FollowUser(user._id)}>Follow</button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>

                        <EditModal>

                            <div class=" mx-auto">
                                <img class="w-20 h-20 p-2 mx-auto rounded-full hover:shadow-xl cursor-pointer" src={user.img} alt="Rounded avatar" onClick={() => openAvatarModal()} />
                            </div>
                            <div class="mb-4">
                                <label for="bio" class="block text-sm font-medium text-gray-700 text-left">Bio</label>
                                <input type="text" id="bio" name="bio" class="mt-1 p-2 w-full border rounded-md" onChange={(e) => avatarDispatch({ type: "set_bio", payload: e.target.value })}
                                    defaultValue={user.about}
                                />
                            </div>
                            <div class="mb-4">
                                <label for="link" class="block text-sm font-medium text-gray-700 text-left">Link</label>
                                <input type="text" id="link" name="link" class="mt-1 p-2 w-full border rounded-md" onChange={(e) => avatarDispatch({ type: "set_link", payload: e.target.value })}
                                    defaultValue={user.link}
                                />
                            </div>

                            <div className='flex w-40 justify-between'>
                                <button className='bg-blue-700 p-2 rounded text-white hover:bg-blue-400' onClick={() => updateProfile()}>Submit</button>
                                <button className='bg-gray-400 p-2 rounded text-white hover:bg-red-400'
                                    onClick={() => closeModal()}
                                >Cancel</button>
                            </div>
                        </EditModal>

                        <AvatarModal>
                            <div className='flex flex-wrap lg:w-96 sm:62 justify-around h-20 p-2'>
                                {

                                    avatar.map(
                                        avt => <img class="w-10 h-10 rounded-full hover:w-12 hover:h-12 cursor-pointer" src={avt} alt="Rounded avatar" onClick={() => {
                                            avatarDispatch({ type: "set_img", payload: avt })
                                            closeAvatarModal()
                                        }} />
                                    )
                                }
                            </div>
                        </AvatarModal>
                    </section>
                    <div className=' h-full mx-auto'>
                        <h1 className='text-4xl text-slate-300 text-left'> Posts</h1>
                        <div className='bg-gray-800'>
                        {
                            (state)?.map(post => <Post post={post} />)
                        }
                        </div>
                    </div>
                    <ToastContainer theme="dark"
                        hideProgressBar
                    />
                </div>
            </div>
        )
}

export default Profile