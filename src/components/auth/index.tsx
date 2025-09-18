
import { useState } from "react";

import Login from "./login";
import Signup from "./signup";
import { useDispatch,  } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { reset } from "../../redux/slice/user";

const Auth = () => {
  // const { t } = useTranslation();
  const [isLogin, setLogin] = useState(true)
  const [isSignup, setSignup] = useState(false)
  const dispatch: AppDispatch = useDispatch();

  const OpenLogin = (() => {
    setLogin(true)
    setSignup(false)
    dispatch(reset());
  })
  const OpenSignup = (() => {
    setLogin(false)
    setSignup(true)
    dispatch(reset());
  })
 
  return (
    <div className="py-5">
      <div className="text-white flex cursor-pointer ">
        <div onClick={OpenLogin} className={`p-3 ${isLogin ? "text-grey border-b-4 border-white" : ""}`}>LOGIN</div>
        <div onClick={OpenSignup} className={`p-3 ${isSignup ? " text-grey border-b-4 border-white" : ""}`}>SIGNUP</div>
      </div>
      <hr className="border border-white"/>
      {
        isLogin && (
          <div>
            <Login />
            <div className="flex flex-col items-center">
              <p className="text-sm flex text-center text-white">
                Don't have an account?{"  "}
                <span className="text-blue-500 font-semibold cursor-pointer">
                  <p onClick={OpenSignup}>  Signup</p>
                </span>
              </p>
            </div>
          </div>
        )}
      {
        isSignup && (

          <div className=" flex flex-col items-center">

            <Signup />
            <p className="font-bold flex gap-2 text-sm p-2 text-white">
              Already have an account?{" "}
              <span className="text-blue-500 font-semibold cursor-pointer">
                
                <p onClick={OpenLogin}> Login</p>
              </span>
            </p>
          </div>



        )
      }

    </div>
  );
};

export default Auth;
