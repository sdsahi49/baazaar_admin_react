import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

const Edit_Unit=() =>{

 //My Tempcode start
 let history = useHistory();
 //My Tempcode end

 const search = window.location.search;
 const params = new URLSearchParams(search);
 const id = params.get('id');
  

 const [mgs,setMsg]=useState(null)
const [use_data,setData]=useState({
    singular_unit:"",
    plural_unit:"",
    front_singular_unit:"",
    front_plural_unit:"",
    is_popular:"",
    status:""
});

useEffect(()=>{
    load_Data();
},[] );


const load_Data= async()=>{

    axios.post('http://localhost:8000/unit_type/unit_type_on_id',{id:id},{
    
        headers: {
            "Authorization":"Bearer "+ Cookies.get('token') 
        }   
   } )
     .then(result =>{
     
      if(result.status===200)
      {        
        setData(result.data.data[0]);
      }
      else if(result.status===404)
      {
       setMsg(result.data.message)
      }

    
     } )
     .catch(error =>{
       console.log(error)
   
     } )


  }

const{singular_unit,plural_unit,front_singular_unit,front_plural_unit,is_popular,status}=use_data;
const onInputChange=e=>{
setData({...use_data,[e.target.name]:e.target.value})
};

const onSubmit =  e => {
    e.preventDefault();

    if(use_data.singular_unit.trim()===""){
     alert("Singular Unit is Required");   
   }
   else if(use_data.plural_unit.trim()==="")
   {
     alert("Plural Unit is Required");
   }
   else if(use_data.front_singular_unit.trim()==="")
   {
     alert("Front Singular Unit is Required");
   }
   else if(use_data.front_plural_unit.trim()==="")
   {
     alert("Front Plural Unit is Required");
   }
   else{

    

     axios.post('http://localhost:8000/unit_type/update_unit_type',{id:id,singular_unit:use_data.singular_unit,plural_unit:use_data.plural_unit,front_singular_unit:use_data.front_singular_unit,front_plural_unit:use_data.front_plural_unit,is_popular:use_data.is_popular,status:use_data.status},{
        headers: {
            "Authorization":"Bearer "+ Cookies.get('token') 
        }                
    } )
      .then(result =>{
      
       if(result.status===200)
       {        
        
        history.push("/unit_list")

       }
       else if(result.status===404)
       {
        alert(result.data.message);

       }
        
  
      } )
      .catch(error =>{
        console.log(error)
    
      } )



   }


    
 };

 const Cancel =(e) =>{
    e.preventDefault();
    history.push("/unit_list")
  }	
            
        

return(
<>

<body id="kt_body" className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed">
      <div className="d-flex flex-column flex-root ">
			<div className="page d-flex flex-row flex-column-fluid">
       <Aside/>
       <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <Header/>


   {/* begin::Content */}
    
   <div className="toolbar" id="kt_toolbar">					
		<div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">	
			<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" classNameName="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">						
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Edit Unit						
				 {/* <span className="h-20px border-1 border-gray-200 border-start ms-3 mx-2 me-1"></span>					
				 <span className="text-muted fs-7 fw-bold mt-2">#</span> */}
			   </h1>					
		  </div>
		 </div>						
	 </div>		
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

	 <div className="content d-flex flex-column flex-column-fluid" >
	 <div className="post d-flex flex-column-fluid" >	
	 <div  className="container-xxl">

      
     {/* begin::Products */}
		<div className="card card-flush">															
			<div className="card-body pt-0">
                <br></br>
              
                                                        						
            <form  className="form" onSubmit={e =>onSubmit(e)}>											
            <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
													
                                                    <div className="col">  
                                                        <div className="fv-row mb-7">   
                                                            <label className="fs-6 fw-bold form-label mt-3">
                                                                <span className="required">Singular Unit</span>	
                                                            </label>
                                                            <input type="text" className="form-control form-control-solid" name="singular_unit" value={singular_unit}  onChange={e=>onInputChange(e)} />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col">					
															<div className="fv-row mb-7">					
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Plural Unit</span>	
																</label>		
																<input type="text" className="form-control form-control-solid" name="plural_unit" value={plural_unit}  onChange={e=>onInputChange(e)} />		
															</div>	
													</div>                   
                                                </div>

                                             		
													<div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
														<div className="col">	
															<div className="fv-row mb-7">				
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Front Singular Unit</span>	
																</label>	
																<input type="text" className="form-control form-control-solid" name="front_singular_unit" value={front_singular_unit}  onChange={e=>onInputChange(e)} />		
															</div>				
														</div>
														
														<div className="col">	
															<div className="fv-row mb-7">				
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Front Plural Unit</span>	
																</label>	
																<input type="text" className="form-control form-control-solid" name="front_plural_unit" value={front_plural_unit}  onChange={e=>onInputChange(e)} />	
															</div>
														</div>	
													</div>

                                                    <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">	
                                                    <div className="col"> 
                                                                <div className="fv-row mb-7">                       
                                                                    <label className="fs-6 fw-bold form-label mt-3">
                                                                        <span >Is Popular?</span>
                                                                    </label>               
                                                                    <div className="w-100">
                                                                        <div className="form-floating border rounded">   
                                                                       
                                                                            <select  className="form-select form-select-solid lh-1 py-3" name="is_popular" value={is_popular}  onChange={e=>onInputChange(e)} >    
                                                                                <option value="Yes" >Yes</option>
                                                                                <option value="No" >No</option>
                                                                        </select>                           
                                                                        </div>
                                                                    </div>
                                                              </div>  
                                                            </div>
                                                            
                                                            <div className="col">    
                                                                <div className="fv-row mb-7">        
                                                                    <label className="fs-6 fw-bold form-label mt-3">
                                                                        <span >Status</span>
                                                                    </label>    
                                                                    <div className="w-100">
                                                                        <div className="form-floating border rounded">      
                                                                            <select id="status" className="form-select form-select-solid lh-1 py-3" name="status"  value={status}  onChange={e=>onInputChange(e)}>  
                                                                                <option value="Active" >Active</option>
                                                                                <option value="Deactive">Deactive</option>
                                                                            </select>      
                                                                        </div>
                                                                    </div>
                                                                </div>                
                                                            </div>                  
                                                        </div>
																
													<div className="separator mb-6"></div>		
													<div className="d-flex justify-content-end">		
														<button   className="btn btn-light me-3" onClick={Cancel}>Cancel</button>	
														<button   className="btn btn-primary">Update</button>
															
													</div>										
												</form>			
				
			</div>
									
		</div>
		{/* end::Products */}


      </div>
      </div>
      </div>

											
	{/* end::Content */}

	<Footer/>
     </div>
    </div>
 </div>
 <Scrolltop/>
 </body> 
</>
)
    
}
export default Edit_Unit;