import { useNavigate } from "react-router-dom";

const Logout = () =>{
    const navigate = useNavigate();
    const logoutUsingApi = (e)=>{
        e.preventDefault();
        fetch('http://localhost:1731/user/logout',{
            method:'POST',
            headers:{'content-type':'application/json', 'Authorization':'Bearer'+ ' ' + sessionStorage.token}
        }).then((res)=>{
            if(res.status === 200){
                sessionStorage.clear();
                navigate('/');
            }
        })
    }

    return(
        <div>
            <form onSubmit={logoutUsingApi}>
                <button type="submit">logout</button>
            </form>
        </div>
    );
}

export default Logout;