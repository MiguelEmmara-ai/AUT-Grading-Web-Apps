import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          AUT Grading
        </Link>
      </div>
    </div>
  );
};

export default Header;
