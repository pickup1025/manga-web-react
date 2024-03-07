import React, { useRef } from "react";
import Dashborad from "./Dashborad";
function Login(){
    const email=useRef()
    const password=useRef()
    const getEmail=localStorage.getItem("emailData")
    const getPassword=localStorage.getItem("passwordData")
    const handleSubmit=()=>{
        if(email.current.value=="12345"&&password.current.value=="12345"){
            localStorage.setItem("emailData","12345")
            localStorage.setItem("passwordData","12345")
        }
    }
   
    return(
        <div >
            
            {getEmail && getPassword ? (
                <Dashborad />
            ) : (
                
                <form onSubmit={handleSubmit} className="h-screen flex justify-center items-center bg-gray-100 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            
                            type="text"
                            ref={email}
                        />
                    </div>
                    <div className="mb-4">
                        <label className=" block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                           
                            type="password"
                            ref={password}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            )}
            
        </div>
    );
}
export default Login;