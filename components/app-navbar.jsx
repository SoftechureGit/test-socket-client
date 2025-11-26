"use client"

import React from "react";
import { FiMenu } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaRegWindowMinimize } from "react-icons/fa";
import { CiSearch, CiCircleQuestion } from "react-icons/ci";
import { VscChromeRestore } from "react-icons/vsc";
import { IoIosClose } from "react-icons/io";

export default function AppNavbar() {
  return (
    <header className="w-full bg-[#3b0d3b] fixed top-0 z-1">
      <div className="mx-auto max-w-8xl px-3 sm:px-6">
        <div className="flex items-center h-12 sm:h-14 justify-between">


          <button
            aria-label="menu"
            className="p-2 rounded-md hover:bg-white/10 text-white"
          >
            <FiMenu size={22} />
          </button>
          <div className="hidden sm:flex items-center gap-3 flex-1 justify-center">
            {/* arrows */}
            <button className="p-1 rounded-md hover:bg-white/10 text-white" aria-label="back">
              <FaArrowLeft size={16} />
            </button>
            <button className="p-1 rounded-md hover:bg-white/10 text-white" aria-label="forward">
              <FaArrowRight size={16} />
            </button>

            {/* search */}
            <div className="relative w-full max-w-xl">
              <input
                type="search"
                placeholder="Search SOFTECHURE IT SERVICES"
                className="w-full h-10 bg-white/10 placeholder:text-white/70 text-white rounded-full pl-4 pr-10 outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-1 rounded-full">
                <CiSearch size={20} />
              </button>
            </div>
          </div>
          <button className="sm:hidden p-2 rounded-md text-white hover:bg-white/10" aria-label="search">
            <CiSearch size={22} />
          </button>
          <div className="hidden sm:flex items-center gap-2">
           
          </div>

        </div>
      </div>
    </header>
  );
}
