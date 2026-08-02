import React from "react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <Link
        className=" px-3 py-2 bg-purple-700 m-3 rounded-md font-bold cursor-pointer"
        to={"/login"}
      >
        Signin/ Signup
      </Link>
      <Link
        className=" px-3 py-2 bg-purple-700 m-3 rounded-md font-bold cursor-pointer"
        to={"/chat"}
      >
        chats
      </Link>
    </div>
  );
};

export default HomePage;
