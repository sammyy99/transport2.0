import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="w-[70%] h-screen overflow-hidden mx-auto font-serif">
      <div className="">
        <div className="flex text-sky-600 font-bold font-serif pt-2 text-2xl items-center">
            <img alt="" src="logo.svg" className="w-16"></img> <p>Solution Point</p>
            </div>
      </div>

      <div className="grid grid-cols-2 pt-16">
        <div className="col-span-1 ">
          <img alt="" src="login.svg"></img>
        </div>
        <div className="col-span-1 flex items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
