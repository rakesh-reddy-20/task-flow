import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../layouts/AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/20";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col justify-between h-full"
      onClick={onClick}
    >
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3 justify-between">
        <span
          className={`text-[10px] uppercase font-semibold ${getStatusTagColor()} px-3 py-0.5 rounded-full tracking-wide`}
        >
          {status}
        </span>
        <span
          className={`text-[10px] uppercase font-semibold ${getPriorityTagColor()} px-3 py-0.5 rounded-full tracking-wide`}
        >
          {priority} Priority
        </span>
      </div>

      {/* Main content + bottom */}
      <div className="flex flex-col justify-between flex-1">
        <p
          className="text-sm font-medium text-gray-800 mt-1 line-clamp-2"
          title={title}
        >
          {title}
        </p>
        <p
          className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]"
          title={description}
        >
          {description}
        </p>
        <p className="text-[13px] text-gray-700/80 font-medium mt-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-indigo-600">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>
        <Progress progress={progress} status={status} />

        {/* Footer (dates + avatars + attachment) */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-xs text-gray-500">Start Date</label>
              <p className="text-[13px] font-medium text-gray-900">
                {moment(createdAt).format("Do MMM YYYY")}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500">Due Date</label>
              <p className="text-[13px] font-medium text-gray-900">
                {moment(dueDate).format("Do MMM YYYY")}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <AvatarGroup avatars={assignedTo || []} />
            {attachmentCount > 0 && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <LuPaperclip className="text-blue-700 text-sm" />
                <span className="text-xs text-gray-900">{attachmentCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
