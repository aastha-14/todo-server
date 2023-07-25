import Login from '@/components/Login'
import TodoDashboard from '@/components/TodoDashboard'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const HomePage = () => {
  const auth = useAuth()
  const router = useRouter()
  console.log(auth)
  useEffect(() => {
    if (!auth?.currentUser) {
      router.push('/login')
      return;
    }
  }, [])
  return (
    <div className='m-auto'>
      {!auth?.currentUser && <Login title="Sign in to your account" type="login" />}
      {auth?.currentUser && <TodoDashboard />}
    </div>
  )
}

export default HomePage