"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Dashboard from '../component/Dashboard'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  React.useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    document.title = "Dashboard - Get Me A Chai"
  }, [session, router]);
  

  return (
    <>
      <Dashboard/>
    </>
  )
}

export default DashboardPage
