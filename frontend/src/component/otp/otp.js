import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Otp=()=>{
    const [otpNumber1, setOtpNumber1] = useState('');
    const [otpNumber2, setOtpNumber2] = useState('');
    const [otpNumber3, setOtpNumber3] = useState('');
    const [otpNumber4, setOtpNumber4] = useState('');
    const [otpNumber5, setOtpNumber5] = useState('');
    const [otpNumber6, setOtpNumber6] = useState('');

    const navigate = useNavigate();

    const otpVerification = async(e)=>{
        e.preventDefault();
        let inputData = otpNumber1+otpNumber2+otpNumber3+otpNumber4+otpNumber5+otpNumber6;
        await fetch('http://localhost:1731/user/verify-otp',{
            method:'POST',
            headers:{'content-type':'application/json', 'Authorization':'Bearer'+ ' ' + sessionStorage.token},
            body:JSON.stringify({
                "otp": inputData
            })
        }).then(async (res)=>{
            if(res.status === 200){
                if(sessionStorage.isOrgId === 'false'){
                    navigate('/org');
                }else{
                    navigate('/dashboard');
                }
            }
        })
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">
          <div>
              <input
                type="text"
                name="otp_number1"
                value={otpNumber1}
                onChange={e=>setOtpNumber1(e.target.value)}
                maxLength="1"
                className="w-8 h-10 text-center border border-gray-300 rounded bg-Otpcolor  ml-2 "
              />
              <input
                type="text"
                name="otp_number2"
                value={otpNumber2}
                onChange={e=>setOtpNumber2(e.target.value)}
                maxLength="1"
                className="w-8 h-10 text-center border border-gray-300 rounded bg-Otpcolor  ml-2 "
              />
              <input
                type="text"
                name="otp_number3"
                value={otpNumber3}
                onChange={e=>setOtpNumber3(e.target.value)}
                maxLength="1"
                className="w-8 h-10 text-center border border-gray-300 rounded bg-Otpcolor  ml-2 "
              />
              <input
                type="text"
                name="otp_number4"
                value={otpNumber4}
                onChange={e=>setOtpNumber4(e.target.value)}
                maxLength="1"
                className="w-8 h-10 text-center border border-gray-300 rounded bg-Otpcolor  ml-2 "
              />
              <input
                type="text"
                name="otp_number5"
                value={otpNumber5}
                onChange={e=>setOtpNumber5(e.target.value)}
                maxLength="1"
                className="w-8 h-10 text-center border border-gray-300 rounded bg-Otpcolor  ml-2 "
              />
              <input
                type="text"
                name="otp_number6"
                value={otpNumber6}
                onChange={e=>setOtpNumber6(e.target.value)}
                maxLength="1"
                className="w-8 h-10 text-center border border-gray-300 rounded bg-Otpcolor  ml-2 "
              />
          </div>
          <div className="mt-5">
            <button
              onClick={otpVerification}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >Submit
            </button>
          </div>
        </div>
    );
      
}

export default Otp;