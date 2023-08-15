import React, { useContext, useEffect, useState } from 'react'
import { getSingleUserService } from "../Service/UserService"
import { Link, useNavigate } from "react-router-dom"
import { RxDotsHorizontal } from "react-icons/rx"
import { AiOutlineHeart } from "react-icons/ai"
import { BiComment } from "react-icons/bi"
import { BsBookmark, BsFillHeartFill, BsBookmarkFill } from "react-icons/bs"
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai"

import { ProvideUserContext } from '../Context/UserContext'
import { ProvideCommonContext } from '../Context/CommonContext'



const Post = (newPost) => {
    const post = newPost.post
    const { addToBookMark, removeFromBookMark, addcomment, editUserPost, deleteUserPost, likeUserPost, disLikeUserPost } = useContext(ProvideCommonContext)
    const [popUp, setPopUp] = useState([])
    const navigate = useNavigate()
    const { userState, userDispatch, userInfo } = useContext(ProvideUserContext)
    const [user, setUser] = useState()
    const getSpecificUser = async () => {
        const response = await getSingleUserService(post.userId)
        if (response.status == 200) {
            console.log("some value===<" + JSON.stringify(response.data.user))
            setUser(response.data.user)
        }
    }

    useEffect(() => {
        getSpecificUser()
    }, [userState.Post])


    const formatDate = (dateString) => {
        if(dateString.indexOf("T")!=-1){
           return  formatDateTwo(dateString)
        }else{
        const parts = dateString.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
      
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const formattedMonth = months[Number(month) - 1];
      
        return `${day} ${formattedMonth} ${year}`;
        }
    };


    const formatDateTwo=(inputDate)=> {
        const date = new Date(inputDate);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
      
        // Define an array of month names
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        // Format the date in the desired format
        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
      
        return formattedDate;
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
            <div className='lg:ml-30 lg:p-4 lg:w-4/6 '>
                <div className='flex flex-col sm:ml-6 ' >
                    <div className='flex flex-col w-10/12 lg:ml-20 ml-8 mt-8 p-4  bg-gray-900'>
                        <div className='flex w-full'>
                            <Link to="/profile" state={{
                                value: user
                            }} > <img class="w-10 h-10 rounded-full mr-2" src={user.img} alt="Rounded avatar" />
                            </Link>
                            <p className='flex flex-col'>
                                <h1 className='text-xl text-white font-bold'>{user.firstName} {user.lastName}</h1>
                                <span className='text-slate-700'>@{user.username}</span>
                            </p>
                            <span className='text-slate-400 ml-4 mt-1 text-sm'> {formatDate(post.createdAt)}</span>
                            {post.userId == (userInfo._id)
                                ? <RxDotsHorizontal className='text-slate-300 lg:ml-40 cursor-pointer' onClick={() => setPopUp([...popUp, post._id])} /> : ""}
                            {popUp?.includes(post._id) ?
                                <div class=" absolute z-10 ml-96 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" >
                                        <li className='flex p-4 mx-auto  cursor-pointer' onClick={() => setPopUp(popUp.filter(ele => ele != post._id))} >
                                            <span className='text-xl'>-</span>
                                        </li>
                                        <li className='flex p-4 mx-auto hover:bg-gray-600 cursor-pointer' onClick={() => {
                                            setPopUp(popUp.filter(ele => ele != post._id))
                                            editUserPost(post)
                                        }
                                        }>
                                            <AiTwotoneEdit className='mt-1 mr-1' /> <span>Edit</span>
                                        </li>
                                        <li className='flex p-4 mx-auto hover:bg-gray-600 cursor-pointer' onClick={() => deleteUserPost(post)}>
                                            <AiFillDelete className='mt-1 mr-1' /> <span>Delete</span>
                                        </li>
                                    </ul>
                                </div>
                                :
                                ""
                            }


                        </div>
                        <div className='text-white  cursor-pointer' onClick={() => {
                            console.log("clicked on post")
                            navigate("/post", { state: post })
                            userDispatch({
                                type: "set_post", payload: {
                                    postId: post._id,
                                    user: user,
                                    post: post
                                }
                            })
                        }} >
                            {post.content} </div>
                        <div className=' cursor-pointer' onClick={() => { navigate("/post", { state: post }) }}>
                            <img class="h-auto max-w-full mx-auto p-1" src={post.img} />
                        </div>
                        <div className='mt-6 flex lg:w-72 sm:w-48 justify-between'>
                            {
                                userState.liked?.includes(post._id) ?
                                    (
                                        <div className='flex '>
                                            <BsFillHeartFill className='text-red-500 hover:text-red-400 ' onClick={() => disLikeUserPost(post)} />
                                            <span className='text-white text-sm'>{post?.likes?.likedBy?.length}</span>
                                        </div>
                                    )
                                    : (
                                        <div className='flex'>
                                            <AiOutlineHeart className='text-red-500 hover:text-red-400' onClick={() => likeUserPost(post)} />
                                            <span className='text-white text-sm'>{post?.likes?.likedBy?.length}</span>
                                        </div>
                                    )
                            }

                            <p className='flex'>
                                <BiComment className='text-blue-500 hover:text-blue-400' />
                                <span className='mb-4 text-white text-sm'>{post.comments?.length}</span>
                            </p>

                            <p>
                                {userState.bookmark.includes(post._id)
                                    ?
                                    <BsBookmarkFill className='text-green-500 hover:text-green-400 ' onClick={() => removeFromBookMark(post)} />
                                    :
                                    <BsBookmark className='text-green-500 hover:text-green-400' onClick={() => addToBookMark(post)} />
                                }

                            </p>
                        </div>

                    </div>
                </div>
            </div>
        )
}

export default Post