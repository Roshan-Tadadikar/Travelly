import React from 'react'


export const loginUser = async (body) => {
    try {
        const data = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(body)

        })
        const { encodedToken } = await data.json()
        if (data.ok) {
            return encodedToken
        }
    } catch (e) {
        console.log(e)
    }
}