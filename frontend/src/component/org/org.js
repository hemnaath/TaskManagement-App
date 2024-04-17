import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Org = ()=>{
    const [orgName, orgNameUpdate] = useState('');
    const [orgType, orgTypeUpdate] = useState('');

    const navigate = useNavigate();

    const orgEntry=async(e)=>{
        e.preventDefault();
        const inputObj = {'orgName':orgName, 'orgType':orgType}
        await fetch('http://localhost:1731/org/create',{
            method:'POST',
            headers:{'content-type':'application/json', 'Authorization':'Bearer'+ ' ' + sessionStorage.token},
            body:JSON.stringify(inputObj)
        }).then(async (res)=>{
            if(res.status === 201){
                navigate('/dashboard');
            }
        })
    }
    return (
        <form onSubmit={orgEntry}>
          <div className="flex min-h-full h-screen">
            <div className="flex flex-1 flex-col w-1/3 justify-center border">
              <div className="mx-auto my-10 lg:w-1/4 2xl:w-3/6 lg:w-100 bg-OBlue border rounded-2xl p-5 space-y-3">
                <div className=" ">
                  <div>
                    <label className="text-white text-xs text-nowrap">
                      Organization Name<span className="text-red-700">*</span>
                    </label>
      
                    <input
                      name="orgName"
                      type="text"
                      value={orgName}
                      onChange={e=>orgNameUpdate(e.target.value)}
                      className="border rounded-lg  mt-2 placeholder-RBlue w-full p-1 placeholder:text-xs px-3  focus:outline-none focus:border-blue-500"
                      placeholder="RS-Techs"
                    ></input>
                  </div>
                </div>
      
                <div>
                  <label className="text-white text-xs text-nowrap">
                    Organization Type<span className="text-red-700">*</span>
                  </label>
                  <select
                    name="orgType"
                    className=" w-full p-1 mt-2  px-3 border text-RBlue text-xs rounded-lg"
                    value={orgType}
                    onChange={e=>orgTypeUpdate(e.target.value)}
                  >
                    <option value="null">Select an option</option>
                    <option value="IT / Production">IT / Production</option>
                    <option value="data">data</option>
                  </select>
                </div>
      
                <div>
                  <button
                    type="submit"
                    className="bg-RButton text-RText text-sm font-bold w-full py-2 px-4 rounded mt-4 "
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
    );
      
}

export default Org;