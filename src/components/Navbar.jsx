import React from "react";

import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function Navbar() {
  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div className="flex justify-between  bg-white  p-3    dark:bg-zinc-900   shadow-xl dark:shadow-zinc-700  rounded-xl fixed  w-full  border border-slate-200 ">
      <div className="text-3xl font-bold ">short.Url</div>
      <div className="text-4xl ">
        <button onClick={() => darkModeHandler()}>
          {
            dark && <IoSunny /> // render sunny when dark is true
          }
          {
            !dark && <IoMoon /> // render moon when dark is false
          }
        </button>
      </div>
    </div>
  );
}

export default Navbar;
