import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

const Add_Brand=() =>{

 //My Tempcode start
 let history = useHistory();
 //My Tempcode end
  

 const [mgs,setMsg]=useState(null)
const [use_data,setData]=useState({
    brand_name:"",
    brand_img_url:"",
    status:""
});

const{brand_name,brand_img_url,status}=use_data;
const onInputChange=e=>{
setData({...use_data,[e.target.name]:e.target.value})
};

const onSubmit =  e => {
    e.preventDefault();

    if(use_data.brand_name.trim()===""){
     alert("Brand name is Required");   
   }
   
   else{

     axios.post('http://localhost:8000/brand/add_brand',{brand_name:use_data.brand_name,status:use_data.status},{
        headers: {
            "Authorization":"Bearer "+ Cookies.get('token') 
        }                
    } )
      .then(result =>{
      
       if(result.status===200)
       {        
        
        alert(result.data.message);

        setData({
            brand_name:"",
            brand_img_url:"",
            status:"Active"
           
        });
       }
       else 
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
    setData({
        brand_name:"",
        brand_img_url:"",
        status:"Active"   
    });
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
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Add Brand						
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
                                                                <span className="required">Brand Name</span>	
                                                            </label>
                                                            <input type="text" className="form-control form-control-solid" name="brand_name" value={brand_name}  onChange={e=>onInputChange(e)} />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col">					
															<div className="fv-row mb-7">					
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Image</span>	
																</label>		
																<input type="file" className="form-control" name="brand_img_url" value={brand_img_url}  onChange={e=>onInputChange(e)} />		
															</div>	
													</div>                   
                                                </div>

                                                    <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">	
                                                      
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
														<button   className="btn btn-primary">Save</button>
															
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
export default Add_Brand;