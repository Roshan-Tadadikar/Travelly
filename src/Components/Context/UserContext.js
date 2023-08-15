import React, { createContext, useEffect, useReducer, useState } from 'react'
import { getSingleUserService } from '../Service/UserService';
export const ProvideUserContext = createContext()

export const UserContext = ({ children }) => {

    const updatedPost = (PostArr, post) => {
        const newPostArr = [...PostArr];
        for (let i = 0; i < newPostArr.length; i++) {
            if (newPostArr[i]._id === post._id) {
                newPostArr[i].content = post.content
                newPostArr[i].img = post.img
                break
            }
        }

        return newPostArr
    }

    let val;
    let userInfoOld;

    try {
        val = JSON.parse(localStorage.getItem("userInfo"))
        userInfoOld = JSON.parse(val._bodyInit).foundUser
    } catch (e) {
        val = ""
        userInfoOld = ""
    }

    const[userInfo, setUserInfo] = useState(userInfoOld)


    const handleReducer = (userState, action) => {
        switch (action.type) {
            case "follow_user":
                return { ...userState, following: [...userState.following, action.payload] }
            case "add_all_post":
                return { ...userState, Post: action.payload }
            case "create_post":
                return { ...userState, Post: [...userState.Post,action.payload] }
            case "delete_post":
                return { ...userState, Post: userState.Post.filter(ele => ele._id != action.payload._id) }
            case "update_post":
                return { ...userState, Post: updatedPost(userState.Post, action.payload) }
            case "add_to_bookmark":
                return { ...userState, bookmark: [...userState.bookmark, action.payload] }
            case "remove_from_bookmark":
                return { ...userState, bookmark: userState.bookmark.filter(ele => ele._id != action.payload._id) }
            case "toggle_like":
                return { ...userState, liked: userState.liked.includes(action.payload) ? userState.liked.filter(ele => ele != action.payload) : [...userState.liked, action.payload] }
            case "toggle_popUpForEdit":
                return { ...userState, popUpForEdit: userState.popUpForEdit.includes(action.payload) ? userState.popUpForEdit.filter(ele => ele != action.payload) : [...userState.liked, action.payload] }
            case "set_common_user":
                return {...userState, commonUser:action.payload}
        }
    }

    const [userState, userDispatch] = useReducer(handleReducer, { following: [], Post: [], bookmark: [], liked: [], popUpForEdit: [], commonUser: {} })

    return (
        <ProvideUserContext.Provider value={{ userState, userDispatch, userInfo,setUserInfo }}>{children}</ProvideUserContext.Provider>
    )
}
