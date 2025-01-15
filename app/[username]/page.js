import React from 'react'
import PaymentPage from '../component/PaymentPage'


const Username = async ({params}) => {
  const { username } = await params; // await params
  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username
