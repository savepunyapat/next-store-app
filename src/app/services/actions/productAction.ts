"use server"

import { cookies } from 'next/headers'

let token: string | undefined

function getToken() {
    if (token) {
        return token
    }
    
    const tokenCookie = cookies().get('token')
    if (tokenCookie) {
        token = tokenCookie.value
        return token
    }
    
    return undefined
}

//crud product
async function getAllProducts() {
    getToken()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.ok) {
          return response.json()
      } else {
         throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('An error occurred while fetching products:', error)
      throw new Error('Failed to fetch products');
    }
}

async function createProduct(payload: any) {
  getToken()
  try {

    console.log(payload)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: payload,
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return { success: true }
    } else {
       throw new Error('Failed to create product')
    }
    
  } catch (error) {
    console.error('An error occurred while creating product:', error)
  }
}

export { getAllProducts, createProduct }