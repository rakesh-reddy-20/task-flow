import React, { useState } from "react";
import { HiOutlineTrash, HiMiniPlus } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Function to handle adding a new attachment
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // Function to delete an attachment
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div className="w-full">
      {/* Existing attachments */}
      {attachments.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex items-center gap-3">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black break-all">{item}</p>
          </div>
          <button
            className="cursor-pointer ml-3"
            onClick={() => handleDeleteOption(index)}
            aria-label="Delete attachment"
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Add new attachment */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add file link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white py-2"
          />
        </div>
        <button
          className="card-btn flex items-center gap-2 mt-2 md:mt-0"
          onClick={handleAddOption}
          type="button"
        >
          <HiMiniPlus className="text-lg" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
