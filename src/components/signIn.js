import React, { useState } from "react";
import { auth } from "../firebase";
import background from "./background.jpeg";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/todolist");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative flex flex-col w-screen justify-center align-middle text-center m-0 h-screen items-center">
      <img
        src={background}
        alt="background"
        className="h-screen w-screen bg-cover bg-center"
      />
      <div className="flex flex-col max-w-lg absolute">
        <div className="flex border-4 border-white flex-col p-4">
          <h2 className="text-white flex font-black align-middle justify-center p-1 bg-black border-white border-4 uppercase text-5xl">
            START YOUR OWN TO-DO LIST TODAY!
          </h2>
          <form
            className="
        flex
        flex-col
        gap-4
        text-xl
        "
            onSubmit={handleSignIn}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-7 p-2 border-4 bg-black text-white "
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-4 p-2 bg-black text-white "
            />
            <div className="flex justify-between text-center ">
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="
            bg-white
            text-black
            hover:bg-black
            hover:text-white
            border-2
            border-black
            hover:border-white
            uppercase
            text-base
            font-bold
            py-2
            px-4
            rounded-none
            cursor-pointer
            max-w-max
            "
                >
                  GO !
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="
            bg-black
            text-white
            hover:bg-white
            hover:text-black
            border-2
            border-white
            hover:border-black
            uppercase
            text-base
            font-bold
            py-2
            px-4
            rounded-none
            cursor-pointer
            max-w-max
            "
                >
                Create an account
                </button>
              </div>
              <div className="flex text-center align-middle justify-center text-base">
                <a
                  href="/forgot-password"
                  className="text-white hover:underline w-full h-full flex text-center align-middle justify-center p-0 m-0 hover:text-purple-700"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </form>
          {error && <p className="text-red-500 text-center w-lg">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
