import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory,useParams} from "react-router-dom";



import axios from "axios";
import Cookies from 'js-cookie';


const Login=() =>{

	

	function createCookie(name,value,minutes) {
		if (minutes) {
			var date = new Date();
			date.setTime(date.getTime()+(minutes*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+value+expires+"; path=/";
	  }
	  

	let history = useHistory();

	const [mgs,setMsg]=useState(null)
	const [use_data,setData]=useState({
		email:"",
		password:"",
	});
	const{email,password}=use_data;

	const onInputChange=e=>{
	setData({...use_data,[e.target.name]:e.target.value})
	};

	const onSubmit =  e => {
		e.preventDefault();

		if(use_data.email==="")
		{
		  alert("Email is Required");
		}
		else if(use_data.password==="")
		{
		  alert("Password is Required");
		}
		else
		{

		axios.post('http://localhost:8000/admin/admin_login',{
			email:use_data.email,
			password:use_data.password   
	   } )
		 .then(result =>{
		 
		  if(result.status===200)
		  {	
			 localStorage.setItem('userName',result.data.Name);	 
			 createCookie("token", result.data.Token, 60)  //1 hour
			 createCookie("adminId", result.data.AdminId, 60)  //1 hour
			 history.push("/dashboard")	
			
		  }
		  else
		  {
		   setMsg(result.data.message) 
		  }
		  
		 } )
		 .catch(error =>{
		   console.log(error)
	   
		 } )
		 
	}
	
	};


return(

<>

  <div className="d-flex flex-column flex-root">
		
			<div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: "url(assets/media/illustrations/sketchy-1/14.png"}}>	
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">	
					<a href="#" className="mb-12">
						<img alt="Logo" src="assets/media/logos/logo-1.svg" className="h-40px" />
					</a>
				
					<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">	

                       <form className="form w-100"  onSubmit={e =>onSubmit(e)}>	
							<div className="text-center mb-10">	
								<h1 className="text-dark mb-3">Sign In to Baazaar</h1>		
							</div>	
							<div className="fv-row mb-10">	
								<label className="form-label fs-6 fw-bolder text-dark">Email <span style={{color:"red"}}>*</span></label>
								<input className="form-control form-control-lg form-control-solid" type="text" name="email"  value={email}  onChange={e=>onInputChange(e)} />
							</div>	
							<div className="fv-row mb-10">	
								<div className="d-flex flex-stack mb-2">	
									<label className="form-label fw-bolder text-dark fs-6 mb-0">Password <span style={{color:"red"}}>*</span></label>
									<a href="#" className="link-primary fs-6 fw-bolder">Forgot Password ?</a>	
								</div>	
								<input className="form-control form-control-lg form-control-solid" type="password" name="password"  value={password}  onChange={e=>onInputChange(e)}/>	
							</div>	
							<div className="text-center">	
								<button  className="btn btn-lg btn-primary w-100 mb-5">Submit</button>	
							    <spam style={{color:"red"}}>{mgs}</spam>
							</div>		
						</form>

					</div>	
				</div>	
		</div>
    </div>  
</>

 
    
)
    
}

export default Login;