import { useState } from "react"; 
import "./App.css";
import { Navbar } from "./components";
import axios from "axios";
import QRCode from "qrcode.react";
import { MdContentCopy } from "react-icons/md"; 

function App() {
  const [limit, setLimit] = useState(200);
  const [result, setResult] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [message, setMessage] = useState("");

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const linkValue = formData.get("link");
    const aliasValue = formData.get("alias");
    if (isValidUrl(linkValue)) {
      apiCall(linkValue, aliasValue);
    } else {
      setMessage("Invalid URL");
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
        setMessage("");
      }, 2000);
    }
  };

  const apiCall = (link, alias) => {
    const data = {
      url: link,
      alias: alias,
      "max-clicks": "200",
    };

    axios
      .post("https://spoo.me/", data, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })

      .then(function (response) {
        setResult(response.data.short_url);
        console.log(response.data);
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setShowPopUp(true);
    setMessage("copied to clipboard ");
    setTimeout(() => {
      setShowPopUp(false);
      setMessage("");
    }, 2000);
  };
  return (
    <div className="bg-white dark:bg-zinc-950 text-black dark:text-white h-full">
      <div className="sm:fixed sm:top-2 ">
        <Navbar /> 
      </div>
      <div className=" pt-20 ">
        <div className="text-center space-y-4 p-4  flex flex-col justify-center items-center">
          <h1 className="font-bold sm:text-5xl text-4xl  text-shadow-[0_2px_4px_#6366f1]">
            Make every connection count
          </h1>
          <p className="text-center sm:text-xl text-sm  sm:w-2/3  ">
            Create short links, QR Codes, share them anywhere. Track what's
            working, and what's not. All inside the{" "}
            <b>Cuttly Connections Platform.</b>
          </p>
        </div>
      </div>
      {showPopup && (
        <div className="fixed  right-5 bottom-10 p-2 animate-bounce sm:w-52 rounded-md font-semibold  bg-green-600  text-white">
          {message}
        </div>
      )}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          action="post"
          className=" p-4 m-3 shadow-xl sm:w-[80%] dark:bg-zinc-900 shadow-slate-700 dark:shadow-zinc-700 flex flex-wrap flex-col     border border-slate-200 rounded-xl "
        >
          <div className="flex flex-col">
            <label htmlFor="link" className="font-bold sm:text-xl text-sm m-1">
              Paste a Long Link*
            </label>
            <input
              required="true"
              name="link"
              id="link"
              type="text"
              className="w-full sm:text-lg text-xs  p-2 border  dark:bg-zinc-700  border-black rounded-lg outline-none"
              placeholder="Enter your link"
            />
          </div>
          <div className="flex  items-center gap-2  justify-between ">
            <div className="flex flex-col w-1/2 ">
              <label htmlFor="link" className="font-bold sm:text-xl text-sm m-1">
                Customize your link
              </label>
              <input
                type="text"
                name="alias"
                className="w-full sm:text-lg text-xs p-2 border  dark:bg-zinc-700  border-black   rounded-lg outline-none"
                placeholder="Custom text "
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="limit" className="font-bold sm:text-xl text-sm">
                Max Click :{limit}
              </label>
              <input
                id="limit"
                name="limit"
                type="range"
                min={10}
                max={200}
                value={limit}
                className="  p-3 cursor-pointer"
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
          </div>
          {result && (
            <div className="flex flex-col justify-center items-center w-full ">
              <QRCode
                value={result}
                size={256} // Adjust the size as needed
                level={"H"} // QR code error correction level ("L", "M", "Q", "H")
                // includeMargin={true} // Include margins around the QR code
              />
              <div className="m-2 p-2 rounded-xl sm:text-2xl  flex justify-between items-center bg-green-200 dark:text-black border border-[#3C3D37]  sm:w-1/2  w-full">
                <h1>{result}</h1>
                <MdContentCopy
                  className="sm:text-3xl text-xl cursor-pointer "
                  onClick={() => handleCopy()}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-2xl hover:bg-blue-700 text-white font-bold  p-2 w-full rounded-xl "
          >
            Shorten Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
