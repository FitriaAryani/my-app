import { useId } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };
  return (
    <nav className='sticky top-0 z-50 grid grid-cols-3 justify-between px-24 py-4 bg-[#543310] items-center'>
      <ul>
        <li className='flex items-center justify-center'>
          <Link
            to='/'
            className='text-xl font-bold text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277] mr-[120px]'
          >
            Cakery
          </Link>
          <Link
            to='/'
            className='text-lg text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277] mr-[100px]'
          >
            Home
          </Link>
        </li>
      </ul>
      <ul className='flex justify-center items-center'>
        <li className='w-full'>
          <input
            type='text'
            className='text-black active:text-black focus:text-black px-4 py-2 w-full rounded-lg'
            name='search'
            id={inputId}
            placeholder='Search product...'
            onChange={handleSearchInput}
          />
        </li>
      </ul>
      {!isLoggedIn ? (
        <ul className='flex gap-20 justify-end'>
          <li className='text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277]'>
            {/* <Link to="">Sign in</Link> */}
            <button onClick={login}>Sign in</button>
          </li>
          <li>
            <Link
              className='text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277]'
              to='/singup'
            >
              Sign up
            </Link>
          </li>
        </ul>
      ) : (
        <ul className='flex justify-end gap-10'>
          <li>
            <Link className='text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277]' to='/cart'>
              Cart
            </Link>
          </li>
          <li>
            <Link
              to='/orders'
              className='text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277]'
            >
              My Orders
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className='text-[#F2F4FF] hover:text-[#A79277] active:text-[#A79277]'
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
