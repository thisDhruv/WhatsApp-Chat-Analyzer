import React, { useState } from 'react'

export const NavBar = (props) => {
  const [helpOn, setHelp] = useState(false);
  function helpClicked() {
    setHelp(!helpOn);
  }
  return (
<>
<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <a href="/" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Chat-Stats</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"clipRule="evenodd"></path></svg>
    </button>
    
    <div>
    <button
        type="button"
        id="howtobutton"
        onClick={helpClicked}
        className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
      >
        Help
      </button>
    </div>
  </div>
</nav>
 {helpOn && (
  <ol className="items-center w-full space-y-4 mb-4 sm:flex sm:space-x-8 sm:space-y-0">
    <li className="flex items-center text-black-600 dark:text-black-500 space-x-2.5">
      <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
        1
      </span>
      <span>
        <h3 className="font-medium leading-tight">Export Chat</h3>
        <p className="text-sm">In WhatsApp Chat: Three Dots → More → Export chat → Without media  </p>
      </span>
    </li>
    <li className="flex items-center text-black-500 dark:text-gray-400 space-x-2.5">
      <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
        2
      </span>
      <span>
        <h3 className="font-medium leading-tight">Mail Yourself</h3>
        <p className="text-sm">Select Gmail to mail the exported file to your email address</p>
      </span>
    </li>
    <li className="flex items-center text-black-500 dark:text-gray-400 space-x-2.5">
      <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
        3
      </span>
      <span>
        <h3 className="font-medium leading-tight">Download exported file on your machine</h3>
        <p className="text-sm">Download the file from your mail</p>
      </span>
    </li>
    <li className="flex items-center text-black-500 dark:text-gray-400 space-x-2.5">
      <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
        4
      </span>
      <span>
        <h3 className="font-medium leading-tight">Select the file</h3>
        <p className="text-sm">Select the downloaded file by clicking the below box</p>
      </span>
    </li>
  </ol>
)}
</>

  )
}
