import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";

function AuthLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full md:w-[60vw] h-full flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 shrink-0">
          <h2 className="text-lg font-semibold text-black">Task Flow</h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:flex w-[40vw] h-full items-center justify-center bg-blue-50 bg-[url('/bg-img.jpg')] bg-cover bg-no-repeat bg-center p-8"></div>
    </div>
  );
}

export default AuthLayout;
