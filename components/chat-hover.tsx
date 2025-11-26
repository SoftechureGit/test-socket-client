"use client";

import React from "react";
import { MdAddReaction } from "react-icons/md";
import { IoPinSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { RiReplyFill } from "react-icons/ri";

export default function ChatHover() {
  const items = [
    { icon: <MdAddReaction />, label: "Reaction" },
    { icon: <RiReplyFill />, label: "Reply" },
    { icon: <IoPinSharp />, label: "Pin" },
    { icon: <RiShareForwardFill />, label: "Forword" },
    { icon: <FaRegEdit />, label: "Edit" },
    { icon: <MdDeleteForever />, label: "Delete" },
  ];

  return (
    <div className="flex gap-2 w-fit h-fit py-1 px-2 rounded-2xl bg-white shadow border border-gray-200">
      {items.map((item, i) => (
        <div key={i} className="relative group">
          {/* Icon */}
          <div className="p-1 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer active:scale-90">
            {React.cloneElement(item.icon, {
              size: 18,
              className: "text-gray-700",
            })}
          </div>

          {/* Tooltip */}
          <span
            className="
              absolute -bottom-10 left-1/2 -translate-x-1/2 
              py-1 px-2 text-xs rounded-md 
              bg-black text-white 
              opacity-0 group-hover:opacity-100 
              transition-all duration-200  "
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
