import React, { useContext, useEffect } from 'react'
import LeftSideBar from '../Navabars/LeftSideBar'
import RightSideBar from '../Navabars/RightSideBar'
import { FcAddImage } from 'react-icons/fc';
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProvideUserContext } from '../Context/UserContext';
import { createPost, getAllPosts } from "../Service/PostService"
import { GiSettingsKnobs } from 'react-icons/gi';
import { BsBookmark, BsFillHeartFill, BsBookmarkFill, BsDash } from "react-icons/bs"

import Post from '../Post/Post';
import { ProvideCommonContext } from '../Context/CommonContext';
import EditModal from '../Modals/EditModal';
import { useLocation } from 'react-router-dom';
import { getBookmarkService } from "../Service/UserService"

const Home = () => {
  const { deleteUserPost, closeModal, updateUserPost } = useContext(ProvideCommonContext)
  const location = useLocation()
  const { userState, userDispatch, userInfo } = useContext(ProvideUserContext)
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState([])
  const [render, setRender] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const ref = useRef(null)
  const handleImage = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file))
    console.log("image-->" + image)
  }

  const handleIconClick = () => {
    ref.current.click();
  }

  const getTodaysDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    console.log(`${day}/${month}/${year}`)
    return `${day}/${month}/${year}`;
  }

  const addPost = async () => {
    const posts = {
      _id: uuidv4(),
      content: document.getElementById("message").value,
      createdAt: '15/08/2023',
      updatedAt: '15/08/2023',
      userId: userInfo._id,
      img: image,
      username: userInfo.username,
      trending: 4,
      likes: {},
      comments: [],
      token: localStorage.getItem("encodedToken"),
      likes: {
        likeCount: 0,
        likedBy: [],
        dislikedBy: [],
      }
    }
    const postResponse = await createPost(posts)
    userDispatch({ type: "create_post", payload: posts })
    document.getElementById("message").value = ''
    setImage([])
    toast.success("Post added")
    console.log("user post--->" + JSON.stringify(postResponse))

  }

  const getAllPost = async () => {
    const response = await getAllPosts()
    console.log("triggegred")
    if (response.status == 200) {
      const requiredData = response?.data?.posts
      //  setPost(requiredData)
      userDispatch({ type: "add_all_post", payload: requiredData })
    } else {
      toast.error("Error while fetching the posts")
    }
  }

  const getBookmarkPost = async () => {
    const response = await getBookmarkService(localStorage.getItem("encodedToken"))
    console.log("triggegred get Bookmark")
    console.log("response ==>" + JSON.stringify(response))
    if (response.status == 200) {
      const requiredData = response?.data?.bookmarks
      //  setPost(requiredData)
      userDispatch({ type: "add_all_post", payload: requiredData })
    } else {
      toast.error("Error while fetching the posts")
    }
  }


  useEffect(() => {
    if (location.pathname == "/" || location.pathname == "/explore") {
      getAllPost()
    } else {
      getBookmarkPost()
    }
  }, [location.pathname])

  const Filter = (val) => {
    if (val == 1) {
      const newData = userState.Post
      const data = newData.slice().sort((a, b) => b.likes.likedBy.length - a.likes.likedBy.length);
      console.log("sorted data===> " + JSON.stringify(data))
      userDispatch({ type: "add_all_post", payload: data })
    } else {
      const newData = userState.Post
      const data = [...newData.sort(compareDates)];
      console.log("new data==>" + JSON.stringify(data))
      userDispatch({ type: "add_all_post", payload: data })
    }


  }

  function compareDates(a, b) {
    const datePartsA = a.createdAt.split('/').reverse();
    const datePartsB = b.createdAt.split('/').reverse();
    const dateA = new Date(datePartsA.join('-'));
    const dateB = new Date(datePartsB.join('-'));
    return dateB - dateA;
  }

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      var imageUrl = URL.createObjectURL(uploadedImage);
      setImageUrl(imageUrl);
      console.log("Image URL:", imageUrl);
    }
  };

  return (
    <div >
      <LeftSideBar />
      <div>
        <div class="p-4 sm:ml-64 h-full">
          {/* Create Post */}
          {
            location.pathname == "/" ?
              <div>
                <div class="p-4 rounded-lg dark:border-gray-700 sm:w-8/12">
                  <div class="w-12/12  p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-fixed gap-4 mb-4">
                    <a className='flex'>
                      <img to="/profile" class="w-10 h-10 rounded-full mr-4 mt-4" src={userInfo?.img} alt="Rounded avatar" />
                      <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                        onChange={(e) => setInput(e.target.value)}
                      ></textarea>
                    </a>
                    <div className='flex w-full flex-row justify-between'>
                      <div className='lg:text-3xl lg:ml-16  sm:ml-8 mt-4 cursor-pointer' >
                        <input type='file' accept='image/*' className='hidden' onChange={handleImage} ref={ref} />
                        <FcAddImage onClick={handleIconClick} />
                      </div>
                      <button disabled={input.length == 0} onClick={addPost} class={input.length > 0 ? "self-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2 justify-end" : "self-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2 justify-end cursor-not-allowed"} >
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-center h-16 mb-4 rounded bg-gray-50 dark:bg-gray-900 lg:w-8/12 md:w-8/12 sm:w-full">
                  <div class="p-2 lg:w-full">
                    <div class="bg-gray-900 rounded flex p-4 h-full text-white justify-between">
                      <GiSettingsKnobs className='lg:text-2xl cursor-pointer' onClick={() => setOpen(true)} />
                      <span class="title-font font-medium self-start">Latest Post</span>
                      {
                        open ?
                          <div id="dropdown" class="absolute z-999 ml-4 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                              <li className='p-2 text-xl' onClick={() => setOpen(false)}><BsDash /></li>
                              <li>
                                <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => Filter(1)}>Trending</a>
                              </li>
                              <li onClick={() => Filter(2)}>
                                <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >Latest</a>
                              </li>
                            </ul>
                          </div> : ""
                      }
                    </div>
                  </div>
                </div>
              </div>
              :
              ""
          }


          <EditModal>
            <h2 class="text-xl font-semibold mb-4">Update Post</h2>


            <label for="content" class="block font-medium mb-2">Content:</label>
            <textarea id="content" name="content" class="w-full h-28 border rounded focus:ring focus:ring-blue-300 px-2 py-1"></textarea>

            <label for="image" class="block font-medium mt-4 mb-2">Upload Image:</label>
            <img id="image" />
            <input type="file" id="newimage" name="image" class="w-full border rounded focus:ring focus:ring-blue-300 px-2 py-1" onChange={handleImageUpload} />

            <div class="mt-6 flex justify-end space-x-4">
              <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded" onClick={closeModal}>Cancel</button>
              <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => updateUserPost({
                content: document.getElementById("content").value,
                img: imageUrl
              })}>Update</button>
            </div>

          </EditModal>

          <div>
            {
              userState.Post?.length > 0
                ?
                (userState.Post?.map(ele => <Post post={ele} />))
                :
                (
                  <div>
                    <h1 className='text-4xl  mx-auto text-black-500'>Oops No Data found!</h1>
                  </div>
                )
            }
          </div>
        </div>
      </div>
      <RightSideBar />
      <ToastContainer
        theme="dark"
        hideProgressBar
        autoClose={2000}
      />
    </div>
  )
}

export default Home