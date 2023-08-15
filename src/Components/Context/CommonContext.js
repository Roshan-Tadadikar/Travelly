import React, { createContext, useContext, useReducer, useState } from 'react'
import { editPost, deletePost, getSinglePost, likePost, dislikePost } from "../Service/PostService"
import { addBookmarkService, removeBookmarkService } from "../Service/UserService"
import { addComment } from '../Service/PostService'
import { toast } from 'react-toastify'
import { ProvideUserContext } from './UserContext'



export const ProvideCommonContext = createContext()

export const CommonContext = ({ children }) => {
    const [oldPost, setOldPost] = useState()
    const[tryToDelete,setDelete] = useState(false)


    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenTwo, setModalOpenTwo] = useState(false);
    const [modalAvatarOpen, setAvatarModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        console.log("Open modal triggered")
        setModalOpen(true);
    };

    const closeModalTwo = () => {
        setModalOpenTwo(false);
    };

    const openModalTwo = () => {
        console.log("Open modal triggered")
        setModalOpenTwo(true);
    };

    const closeAvatarModal = () => {
        setAvatarModalOpen(false);
    };

    const openAvatarModal = () => {
        console.log("Open modal triggered")
        setAvatarModalOpen(true);
    };

    const { userDispatch } = useContext(ProvideUserContext)

    const addToBookMark = async (post) => {
        try {
            console.log("Inside addToBookMark" + JSON.stringify(post))
            const bookmarkResponse = await addBookmarkService(localStorage.getItem("encodedToken"), post._id)
            userDispatch({ type: "add_to_bookmark", payload: post._id })
            if (bookmarkResponse.status == 200) {
                toast.success("Added to bookmark")
            } else toast.error("something went wrong!")
        } catch (e) {
            toast.error("Something went wrong")
        }
    }

    const removeFromBookMark = async (post) => {
        const bookmarkResponse = await removeBookmarkService(localStorage.getItem("encodedToken"), post._id)
        userDispatch({ type: "remove_from_bookmark", payload: post._id })
        if (bookmarkResponse.status == 200) {
            toast.success("Removed from bookmark")
        } else toast.error("something went wrong!")
    }

    const addcomment = async (postId, commentData) => {
        const commentResposne = await addComment(postId, commentData, localStorage.getItem("encodedToken"))
        if (commentResposne.status == 200) {
            toast.success("Comment Added")
        }
        return commentResposne
    }

    const editUserPost = async (post) => {
       
        const getUserPostData = await getSinglePost(post._id);
        console.log("Edit response ===>" + JSON.stringify(getUserPostData))
        if (getUserPostData.status == 200) {
            post.single?setModalOpenTwo(!modalOpenTwo) :setModalOpen(!modalOpen)
            console.log("Inside edit Pist")
            const imageLink = getUserPostData.data.post.img
            document.getElementById("content").value = getUserPostData.data.post.content
            document.getElementById("image").src = imageLink
            setOldPost(getUserPostData.data.post)
        }
    }

    const updateUserPost = async (updatedPost) => {
        const newPost = { ...oldPost }
        newPost.content = updatedPost.content;
        newPost.img = updatedPost.img
        console.log("New USerPost===>" + JSON.stringify(newPost))
        const getUpdatePost = await editPost({ token: localStorage.getItem("encodedToken"), postImage: newPost.img, id: newPost._id, input: newPost.content })
        if (getUpdatePost.status == 201) {
            userDispatch({ type: "update_post", payload: newPost })
            toast.success("Post Updated!")
            closeModal()
        } else {
            toast.error("Something went wrong")
        }
    }

    const deleteUserPost = async (post) => {
        console.log("Inside delete")
        const deleteUserResponse = await deletePost({ _id: post._id, token: localStorage.getItem("encodedToken") })
        console.log("delte response==>" + JSON.stringify(deleteUserResponse))
        if (deleteUserResponse.status == 201) {
            setDelete(true)
            userDispatch({ type: "delete_post", payload: post })
            toast.success("Post Deleted!")
        } else {
            toast.error("error while delteing the post!")
        }
    }

    const likeUserPost = async (post) => {
        try {
            console.log("Inside" + JSON.stringify(post))
            const likeResponse = await likePost(post._id, localStorage.getItem("encodedToken"))
            if (likeResponse.status == 201) {
                userDispatch({ type: "toggle_like", payload: post._id })
                userDispatch({ type: "add_all_post", payload:likeResponse.data.posts })
                toast.success("You liked ")
            }
        } catch (e) {
            console.error(e)
            toast.error("Something went wrong")
        }
    }

    const disLikeUserPost = async (post) => {
        try {
            const dislikeResponse = await dislikePost(post._id, localStorage.getItem("encodedToken"))
            if (dislikeResponse.status == 201) {
                userDispatch({ type: "toggle_like", payload: post._id })
                userDispatch({ type: "add_all_post", payload:dislikeResponse.data.posts })
                toast.success("You unliked ")
            }
        } catch (e) {
            toast.error("Something went wrong")
        }
    }


    return (
        <ProvideCommonContext.Provider
            value={{
                addToBookMark,
                removeFromBookMark,
                addcomment,
                editUserPost,
                deleteUserPost,
                likeUserPost,
                disLikeUserPost,
                modalOpen,
                closeModal,
                openModal,
                updateUserPost,
                modalAvatarOpen,
                setAvatarModalOpen,
                closeAvatarModal,
                openAvatarModal,
                tryToDelete,
                modalOpenTwo
                , setModalOpenTwo,
                closeModalTwo,
                openModalTwo
            }}>{children}</ProvideCommonContext.Provider>
    )
}
