"use client";

import { useEffect, useState } from "react";
import { CiViewList, CiTextAlignJustify } from "react-icons/ci";
import { FaFileAlt } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
import { FaComputer } from "react-icons/fa6";

export default function FileUploadToggle() {
  const [open, setOpen] = useState<boolean>(false);

useEffect(() => {
  const openHandler = () => setOpen((o) => !o);
  const closeHandler = () => setOpen(false);

 const outsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  // Check if click is outside the popup and the toggle button
  if (
    !target.closest(".file-upload-popup") &&
    !target.closest(".upload-toggle-btn")
  ) {
    setOpen(false);
  }
};


  window.addEventListener("toggleFileUpload", openHandler);
  window.addEventListener("closeFileUpload", closeHandler);
  window.addEventListener("mousedown", outsideClick);
  window.addEventListener("blur", closeHandler);

  return () => {
    window.removeEventListener("toggleFileUpload", openHandler);
    window.removeEventListener("closeFileUpload", closeHandler);
    window.removeEventListener("mousedown", outsideClick);
    window.removeEventListener("blur", closeHandler);
  };
}, []);



  if (!open) return null;

  return (
<div className="file-upload-popup absolute bottom-15 left-1 z-50 rounded-xl text-gray-500 bg-white">
      <div className="border border-gray-200 shadow-md py-3 px-7 w-90 rounded-lg gap-3">
        {/* <p className="flex col-flex text-black text-md items-center gap-3 mt-2">
          <CiViewList size={20} />
          <span className="text-md">List</span>
        </p>

        <p className="flex col-flex text-black text-md items-center gap-3 mt-2">
          <FaFileAlt size={20} />
          <span className="text-md">Recent file</span>
        </p>

        <p className="flex col-flex text-black text-md items-center gap-3 mt-2">
          <CiTextAlignJustify size={20} />
          <span className="text-md">Text snippet</span>
        </p>

        <p className="flex col-flex text-black text-md items-center gap-3 mt-2">
          <GoWorkflow size={20} />
          <span className="text-md">Workflow</span>
        </p> */}

        {/* ✅ THIS IS THE ONLY FUNCTIONAL LINE */}
        <p
          onClick={() => {
            const input = document.getElementById(
              "file-upload"
            ) as HTMLInputElement | null;

            input?.click();
          }}
          className="flex col-flex text-black text-md items-center gap-3 mt-2 cursor-pointer"
        >
          <FaComputer size={20} />
          <span className="text-md">Upload from computer</span>
        </p>
      </div>
    </div>
  );
}
