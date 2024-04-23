import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import otpnew from '../image/otpnew.png';
import otpnew from '../image/otpnew.png';
import alertMessage from '../alert/alert';

const Otp = () => {
  const [otpNumber, setOtpNumber] = useState('');

  const navigate = useNavigate();

  const otpVerification = async (e) => {
    e.preventDefault();
    let inputData = otpNumber;
    await fetch('http://localhost:1731/user/verify-otp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer' + ' ' + sessionStorage.token,
      },
      body: JSON.stringify({
        otp: inputData,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        if (sessionStorage.isOrgId === 'false') {
          navigate('/org');
        } else {
          navigate('/dashboard');
        }
      }else if(res.status === 400){
        alertMessage('Invalid OTP');
      }
    });
  };
  return (
    <div>
      <form onSubmit={otpVerification}>
        <div className="flex min-h-full h-screen">
          <div className="flex flex-1 flex-col w-1/2 justify-center border  ">
            <div className="mx-auto my-10 lg:w-3/5  2xl:w-3/6 lg:w-100 bg-white border rounded-2xl">
              <div className="grid grid-cols-2">
                <div className="self-center">
                  <img src={otpnew} alt="rlog" />
                </div>
                <div className=" bg-RBlue flex items-center p-12 rounded-r-2xl">
                  <div className="w-full">
                    <h2 className=" textxl  font-bold text-white">
                      OTP Verification
                    </h2>
                    <p className="text-white text-md">
                      Enter OTP sent to Registered mail ID
                    </p>
                    <div className="space-y-2 mt-3">
                      <div>
                        <div>
                          <input
                            type="text"
                            className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3 focus:outline-none focus:border-blue-500 "
                            placeholder="*********"
                            value={otpNumber}
                            onChange={(e)=>{setOtpNumber(e.target.value)}}
                          />
                        </div>
                        <p className="text-white text-md py-2">
                          Didn’t receive OTP code ?
                        </p>
                        <span className="text-white text-md">
                          <a href="#"> Resend Code</a>
                        </span>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="bg-RButton text-RText text-sm font-bold w-full py-2 px-4 rounded mt-4 "
                        >
                          Verify & Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Otp;
