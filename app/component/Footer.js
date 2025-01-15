import React from 'react'

const Footer = () => {

  const currenYear = new Date().getFullYear();

  return (
    <footer className='flex text-sm w-full bg-gray-900 text-white p-3 justify-center items-center'>
        Copywrite &copy; {currenYear} Get Me A Chai - all rights reserved!
    </footer>
  )
}

export default Footer
