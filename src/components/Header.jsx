import React from 'react'
import './Header.css'
import Link from 'next/link'

const Header = () => {

  const headerMenu = [
    {
      id: 1,
      link: '/',
      name: 'Home'
    },
    {
      id: 2,
      link: '/about',
      name: 'About'
    }
  ]
  
  return (
    <div className='Header-main-container'>
      <div className='Header-sub-top-container'>
        <div className='Header-sub-top-sub-container'>

        </div>
        <div className='Header-sub-top-sub-container'>

        </div>
      </div>
      <div className='Header-sub-bottom-container'>
          {
            headerMenu.map((item) => {
              return (
                <Link href={item.link} key={item.id} className='inter transition Header-links'>
                  {item.name}
                </Link>
              )
            })
          }
      </div>
    </div>
  )
}

export default Header