import { useState } from "react"
import { useNavigate } from "react-router-dom";
import llog from "../image/login.png"

const Login = () =>{
    const [identifier, setIdentifier] = useState(null);
    // const [response, setResponse] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const ProceedLoginusingAPI = async (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj={"identifier": identifier,
            "password": password};
            await fetch("http://localhost:1731/user/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then(async (res)=>{
                if(res.status === 200){
                    const dataVat = await res.json();
                    sessionStorage.setItem('token', dataVat.token);
                    sessionStorage.setItem('isVerificationRequired', dataVat.isVerificationRequired);
                    sessionStorage.setItem('isOrgId', dataVat.isOrgId);
                    if(dataVat.isVerificationRequired){
                        navigate('/otp-validate');
                    }else if(!dataVat.isOrgId){
                        navigate('/org');
                    }else{
                        navigate('/dashboard');
                    }
                }
            })
            
        }
    }
    const validate = () => {
        let result = true;
        if (identifier === '' || identifier === null) {
            result = false;
        }
        if (password === '' || password === null) {
            result = false;
        }
        return result;
    }
    return (
        <form onSubmit={ProceedLoginusingAPI}>
          <div className="flex min-h-full h-screen">
            <div className="flex flex-1 flex-col w-1/2 justify-center border  ">
              <div className="mx-auto my-10 lg:w-3/5  2xl:w-3/6 lg:w-100 bg-white border rounded-2xl">
                <div className="grid grid-cols-2">
                  <div className="self-center">
                    <img src={llog} alt="rlog" />
                  </div>
                  <div className=" bg-RBlue  p-12 rounded-r-2xl">
                    <h2 className=" textxl  font-bold text-white">SIGN-IN</h2>
                    <p className="text-white text-xs">
                      welcome back! Sign in with your email / username and password below
                    </p>
                    <div className="space-y-2 mt-3 text-left">
                      <div>
                        <label className="text-white text-xs text-nowrap">
                          E-mail / User name<span className="text-red-700">*</span>
                        </label>
      
                        <div>
                          <input name="identifier" type="text" value={identifier} onChange={e=>setIdentifier(e.target.value)} className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3  focus:outline-none focus:border-blue-500" placeholder="Email"/>
                        </div>
                      </div>
                      <div>
                        <label className="text-white text-xs">
                          Password <span className="text-red-700">*</span>
                        </label>
                        <div>
                          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3 focus:outline-none focus:border-blue-500 " placeholder="*********"/>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="bg-RButton text-RText text-sm font-bold w-full py-2 px-4 rounded mt-4 ">SIGN IN</button>
                      </div>
                      <div className="text-white text-xs text-center">Or</div>
                      <div className="text-center">
                        <a href="/register" className=" text-white text-xs text-center">Create account</a>
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

export default Login;