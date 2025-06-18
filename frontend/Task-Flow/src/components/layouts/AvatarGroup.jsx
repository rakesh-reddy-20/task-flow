import React from "react";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  const validAvatars = avatars.filter(
    (avatar) => avatar && avatar.trim() !== ""
  );

  return (
    <div className="flex items-center">
      {validAvatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
        />
      ))}

      {validAvatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{validAvatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
