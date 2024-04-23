import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import rlog from '../image/Mobile.png'

const Register = () =>{
    const [name, nameUpdate] = useState('');
    const [username, usernameUpdate] = useState('');
    const [email, emailUpdate] = useState('');
    const [password, passwordUpdate] = useState('');

    const navigate = useNavigate();

    const registerUsingAPI = async (e)=>{
        e.preventDefault();
        if(validate()){
            const objData = {'name':name, 'username':username, 'email':email, 'password':password}
            await fetch('http://localhost:1731/user/register', {
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(objData)
            }).then((res) => {
                if(res.status === 201){
                    sessionStorage.setItem('username', objData.username);
                    navigate('/');
                }else{
                    toast.error('Registration Failed');
                }
            })
        }
    }

    const validate = () => {
        let result = true;
        if (name === '' || name === null) {
            result = false;
        }
        if (username === '' || username === null) {
            result = false;
        }
        if (email === '' || email === null) {
            result = false;
        }
        if (password === '' || password === null) {
            result = false;
        }
        return result;
    }

    return (
        <form onSubmit={registerUsingAPI}>
          <div className="flex min-h-full h-screen">
            <div className="flex flex-1 flex-col w-1/2 justify-center border  ">
              <div className="mx-auto my-10 lg:w-3/5 2xl:w-3/6 lg:w-100 bg-white border rounded-2xl">
                <div className="grid grid-cols-2  ">
                  <div className="self-center">
                    <img src={rlog} alt="rlog" />
                  </div>
                  <div className=" bg-RBlue  p-12 rounded-r-2xl self-center">
                    <h2 className=" textxl  font-bold text-white">REGISTER</h2>
                    <p className="text-white text-xs">
                      Create an account for faster and easier checkout.
                    </p>
                    <div className="space-y-2 mt-3 text-left">
                      <div>
                        <div>
                          <label className="text-white text-xs">
                            Name <span className="text-red-700">*</span>
                          </label>
      
                          <div>
                            <input
                              name="name"
                              type="text"
                              value = {name}
                              onChange={e=>nameUpdate(e.target.value)}
                              className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 px-3 placeholder:text-xs focus:outline-none focus:border-blue-500"
                              placeholder="Name "
                            />
                          </div>
                        </div>
                      </div>
      
                      <div>
                        <label className="text-white text-xs">
                          E-mail <span className="text-red-700">*</span>
                        </label>
      
                        <div>
                          <input
                            name="email"
                            type="text"
                            value={email}
                            onChange={e=>emailUpdate(e.target.value)}
                            className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3 focus:outline-none focus:border-blue-500 "
                            placeholder="Email"
                          />
                        </div>
                      </div>
      
                      <div>
                        <label className="text-white text-xs">
                          User name <span className="text-red-700">*</span>
                        </label>
      
                        <div>
                          <input
                            name="username"
                            type="text"
                            value={username}
                            onChange={e=>usernameUpdate(e.target.value)}
                            className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3 focus:outline-none focus:border-blue-500 "
                            placeholder="Username"
                          />
                        </div>
                      </div>
      
                      <div>
                        <label className="text-white text-xs">
                          Password <span className="text-red-700">*</span>
                        </label>
      
                        <div>
                          <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={e=>passwordUpdate(e.target.value)}
                            className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3  focus:outline-none focus:border-blue-500"
                            placeholder="*********"
                          />
                        </div>
                      </div>
      
                      <div>
                        <label className="text-white text-xs">
                          Confirm Password <span className="text-red-700">*</span>
                        </label>
      
                        <div>
                          <input
                            name="cpassword"
                            type="password"
                            className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3 focus:outline-none focus:border-blue-500 "
                            placeholder="*********"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="bg-RButton text-RText text-sm font-bold w-full py-2 px-4 rounded mt-4 "
                        >
                          REGISTER
                        </button>
                      </div>
      
                      <div className="text-white text-xs text-center">Or</div>
      
                      <div className="text-center">
                        <a href="/" className=" text-white text-xs text-center">
                          Login to your account
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
      
}

export default Register;