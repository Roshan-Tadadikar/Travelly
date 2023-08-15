import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getSinglePost } from "../Service/PostService"
import { getSingleUserService } from "../Service/UserService"
import { Link, useNavigate } from "react-router-dom"
import { RxDotsHorizontal } from "react-icons/rx"
import { AiOutlineHeart } from "react-icons/ai"
import { BiComment } from "react-icons/bi"
import { BsBookmark, BsFillHeartFill, BsBookmarkFill, BsDash } from "react-icons/bs"
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai"
import { ProvideCommonContext } from '../Context/CommonContext'
import { ProvideUserContext } from '../Context/UserContext'
import LeftSideBar from '../Navabars/LeftSideBar'
import RightSideBar from '../Navabars/RightSideBar'
import EditModal from '../Modals/EditModal'
import { toast } from 'react-toastify'
import EditModalTwo from '../Modals/EditModalTwo'

const SinglePost = () => {
    var count = 100
    const location = useLocation()
    console.log("location===> " + JSON.stringify(location))
    const data = location.state
    const navigate = useNavigate()

    const { addToBookMark, removeFromBookMark, closeModalTwo, editUserPost, deleteUserPost, likeUserPost, disLikeUserPost, tryToDelete, modalOpen,updateUserPost, closeModal, openModal } = useContext(ProvideCommonContext)

    const { userInfo } = useContext(ProvideUserContext)
    const [popUp, setPopUp] = useState([])
    const { userState, userDispatch } = useContext(ProvideUserContext)
    const [user, setUser] = useState()
    const [post, setPost] = useState()
    const [state, setState] = useState([])
    const [comments, setComments] = useState(null)
    const [imageUrl, setImageUrl] = useState("");

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
        console.log("input Date ==>"+inputDate)
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




    useEffect(() => {
        console.log("SIngle post data===>" + JSON.stringify(data))
        const handleSinglePostData = async () => {
            const postResponse = await getSinglePost(data._id);
            const userResponse = await getSingleUserService(data.userId)

            if (postResponse.status == 200) {
                setPost(postResponse.data.post)
                setComments(postResponse.data.post.comments)
            }
            if (userResponse.status == 200) {
                setUser(userResponse.data.user)
            }
        }

        handleSinglePostData()

    }, [userState?.liked])


    const editComment = () => {

    }

    const addNewComment = (commentData) => {
        console.log("comment data==> " + JSON.stringify(comments))
        setComments(() => comments != null ? [...comments, commentData] : [commentData])
        toast.success("Comment added")
        closeModal()
    }

    const getNum = () => {
        count = count + 1;
        return count
    }

    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
          var imageUrl = URL.createObjectURL(uploadedImage);
          setImageUrl(imageUrl);
          console.log("Image URL:", imageUrl);
        }
      };
    


    if (user == null) {
        return (
            <div class="flex justify-center items-center min-h-screen bg-gray-100">

                <div class="w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>

            </div>
        )
    }
    else if (tryToDelete) {
        return (
            <div>
                <LeftSideBar />
                <div className='text-2xl font-bold mx-auto'>
                    No Post Exist's
                </div>
            </div>
        )
    }
    else
        return (
            <div>
                <LeftSideBar />
                <RightSideBar />
                <div className='lg:ml-44 lg:p-4 lg:w-4/6 '>
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
                                {/* {post.userId == (userInfo._id)
                                    ? <RxDotsHorizontal className='text-slate-300 lg:ml-40 cursor-pointer' onClick={() => setPopUp([...popUp, post._id])} /> : ""} */}
                                {popUp?.includes(post._id) ?
                                    <div class=" absolute z-10 ml-96 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                            <li className='flex p-4 mx-auto  cursor-pointer' onClick={() => setPopUp(popUp.filter(ele => ele != post._id))} >
                                                <span className='text-xl'>-</span>
                                            </li>
                                            <li className='flex p-4 mx-auto hover:bg-gray-600 cursor-pointer' onClick={() => {
                                                setPopUp(popUp.filter(ele => ele != post._id))
                                                editUserPost({...post,single:true})
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
                                navigate("/post")
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
                                <img class="h-auto max-w-full mx-auto p-1" src={post?.img} id="image" />
                            </div>
                            <div className='mt-6 flex lg:w-72 sm:w-48 justify-between'>

                                {
                                    userState?.liked?.includes(post._id) ?
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

                                <p className='flex' onClick={() => openModal()}>
                                    <BiComment className='text-blue-500 hover:text-blue-400' />
                                    <span className='mb-4 text-white text-sm'>{comments?.length}</span>
                                </p>

                                <p>
                                    {userState?.bookmark?.includes(post._id)
                                        ?
                                        <BsBookmarkFill className='text-green-500 hover:text-green-400 ' onClick={() => removeFromBookMark(post)} />
                                        :
                                        <BsBookmark className='text-green-500 hover:text-green-400' onClick={() => addToBookMark(post)} />
                                    }

                                </p>
                            </div>

                            <div className='mt-8'>
                                {
                                    comments?.map(comment =>
                                        <div className='bg-gray-800 flex hover:shadow-xl mb-4 md:mb-8 sm:mb-20'>
                                            <p className='p-2'>
                                                <img class="w-10 h-10 rounded-full mr-2" src={comment.img} alt="Rounded avatar" />
                                            </p>
                                            <p className='flex flex-col'>
                                                <h1 className='font-bold text-white flex lg:w-80 justify-between p-2'>{comment.firstName} <span className='font-medium text-sm text-slate-600'>@{comment.username}</span>
                                                    {

                                                        comment._id == userInfo._id ?
                                                            <>
                                                                <RxDotsHorizontal onClick={() => {
                                                                    setState([...state, comment.cId])
                                                                }

                                                                }
                                                                    className='cursor-pointer'
                                                                />

                                                                <div style={{ display: state.includes(comment.cId) ? "block" : "none" }} id="dropdown" class="absolute z-999 ml-4 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                                        <li className='p-2 text-xl cursor-pointer' onClick={() => setState(state.filter(ele => ele != comment.cId))}><BsDash /></li>
                                                                        <li onClick={() => setComments(comments.filter(c => c.cId != comment.cId))}>
                                                                            <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>



                                                            </>

                                                            : ""
                                                    }
                                                </h1>
                                                <span className='text-slate-300 p-2'>{comment.comment}</span>
                                            </p>
                                        </div>
                                    )

                                }
                            </div>

                        </div>


                        <EditModal>
                            <h2 class="text-xl font-semibold mb-4">Add comment</h2>
                            <label for="content" class="block font-medium mb-2">Comment</label>
                            <textarea id="content" name="content" class="w-full h-28 border rounded focus:ring focus:ring-blue-300 px-2 py-1"></textarea>
                            <div class="mt-6 flex justify-end space-x-4">
                                <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded" onClick={() => closeModal()}>Cancel</button>
                                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => addNewComment({
                                    cId: getNum(),
                                    _id: userInfo._id,
                                    firstName: userInfo.firstName,
                                    lastName: userInfo.lastName,
                                    username: userInfo.username,
                                    img: userInfo.img,
                                    comment: document.getElementById("content").value,
                                    postId: post._id,

                                })}>Add</button>
                            </div>

                        </EditModal>

                        <EditModalTwo>
                            <h2 class="text-xl font-semibold mb-4">Update Post</h2>


                            <label for="content" class="block font-medium mb-2">Content:</label>
                            <textarea id="content" name="content" class="w-full h-28 border rounded focus:ring focus:ring-blue-300 px-2 py-1"></textarea>

                            <label for="image" class="block font-medium mt-4 mb-2">Upload Image:</label>
                            <img id="image" />
                            <input type="file" id="newimage" name="image" class="w-full border rounded focus:ring focus:ring-blue-300 px-2 py-1" onChange={handleImageUpload} />

                            <div class="mt-6 flex justify-end space-x-4">
                                <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded" onClick={closeModalTwo}>Cancel</button>
                                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => updateUserPost({
                                    content: document.getElementById("content").value,
                                    img: imageUrl
                                })}>Update</button>
                            </div>

                        </EditModalTwo>


                    </div>
                </div>
            </div>
        )
}

export default SinglePost