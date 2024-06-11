"use server"

import { cookies } from 'next/headers'

type User = {
  username: string
  password: string
}

async function login(data: User) {

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if(response.ok) {
            const data = await response.json()
            cookies().set('token', data.token, {
                maxAge: 60 * 60 * 24,
            })
            return { success: true, data }
        } else {
            const data = await response.json()
            return { success: false, error: data }
        }

    } catch (error) {
        console.error('An error occurred during the login process:', error)
        return { success: false, error }
    }

}

async function logout() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {

        cookies().set('token', '', {
          maxAge: 0,
        })

        return { success: true }
      } else {
        return { success: false }
      }      
    } catch (error) {
        console.error('An error occurred during the logout process:', error)
        return { success: false, error }
    }
}

export { login, logout }