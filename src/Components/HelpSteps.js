import React, { useState } from "react";

export const HelpSteps = (props) => {
  
  return (
    <>
      {props.helpOn && (
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
  );
};
