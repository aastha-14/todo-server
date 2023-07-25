import Login from '@/components/Login'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Register = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth?.currentUser) {
      router.push('/')
    }
  }, [])
  return (
    <div className='m-auto'>
      <Login title="Sign up" type="register" />
    </div>
  )
}

export default Register