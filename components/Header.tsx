import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel,faMagnifyingGlass,faCircleUser,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header = () => {
  const currentUser = { name: 'John Doe' }; // Replace with actual user fetching logic

  return (
    <header className='heading flex pr-20 pl-20 justify-between items-center p-4 bg-gray-400 text-white '>
        <div className=''>
          <Link href="/" className='logo flex text-2xl font-bold align-items-center gap-2'>
            <FontAwesomeIcon icon={faHotel} width={40} height={40} />Hotel Solution.
          </Link>
        </div>

        <div className='search flex gap-5 border-2 border-gray-500 border rounded-2xl p-2'>
        <FontAwesomeIcon icon={faMagnifyingGlass} width={30} height={30} />
          <input type="text"  placeholder='Search...'className='ml-2 bg-transparent border-none focus:outline-none' />
        </div>

        <div className='search flex gap-5'>
          <Link href="/info" className=' text-white font-bold flex items-center gap-2'>
            <FontAwesomeIcon icon={faCircleUser} width={30} height={30} />{currentUser?.name}
          </Link>
          <div className=' text-white font-bold flex items-center gap-2'>
          <FontAwesomeIcon icon={faArrowRightFromBracket} width={30} height={30} />
          </div>

        </div>
    </header>
  )
}

export default Header