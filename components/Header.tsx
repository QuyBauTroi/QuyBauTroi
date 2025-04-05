import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel,faMagnifyingGlass,faCircleUser,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header = () => {
  const currentUser = { name: 'John Doe' }; // Replace with actual user fetching logic

  return (
    <header className='heading flex pr-20 pl-20 justify-between items-center p-3 border-b-black-500 border-b-1 '>
        <div className=''>
          <Link href="/" className='logo flex text-2xl font-bold items-center gap-2'>
            <FontAwesomeIcon icon={faHotel} width={30} height={30} />Hotel Solution.
          </Link>
        </div>

        <div className='search flex gap-5 border-1 border-black  rounded-2xl p-2'>
        <FontAwesomeIcon icon={faMagnifyingGlass} width={20} height={20} />
          <input type="text"  placeholder='Search...'className='ml-2 bg-transparent border-none focus:outline-none' />
        </div>

        <div className='search flex gap-5'>
          <Link href="/info" className=' font-bold flex items-center gap-2'>
            <FontAwesomeIcon icon={faCircleUser} width={30} height={30} />{currentUser?.name}
          </Link>
          <div className=' font-bold flex items-center gap-2'>
          <FontAwesomeIcon icon={faArrowRightFromBracket} width={30} height={30} />
          </div>

        </div>
    </header>
  )
}

export default Header