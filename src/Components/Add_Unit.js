import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

const Add_Unit=() =>{

 //My Tempcode start
 let history = useHistory();
 //My Tempcode end
  

const [brands,setBrands]=useState([]);
const [mgs,setMsg]=useState(null)


		useEffect(()=>{
			load_Brands();
			},[] );

			const load_Brands=async()=>{

				axios.get('http://localhost:8000/brand/brand_list',{
				  headers: {
					"Authorization":"Bearer "+ Cookies.get('token') 
				}       
			  } 
				).then(result => { 
                    setBrands(result.data.data);
			 
				})
				.catch(error =>{
				  console.log(error)
				  
				} )
			
			  }

			
			
			  
              const deleteBrand=async Id =>{

                axios.post('http://localhost:8000/brand/delete_brand',{  Id:Id},{
                    headers: {
                        "Authorization":"Bearer "+ Cookies.get('token') 
                    }    
                 
              } )
               .then(result =>{
                 
                  setMsg(result.data.message)
               
               } )
               .catch(error =>{
                 setMsg(error)
              
               } )
              
            
               load_Brands();
              
              
              }
            
            
            
              const addNew =() =>{
                history.push("/add_brand")
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
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Add Unit						
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

	 <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
	 <div className="post d-flex flex-column-fluid" id="kt_post">	
	 <div id="kt_content_container" className="container-xxl">

      
     {/* begin::Products */}
		<div className="card card-flush">															
			<div className="card-body pt-0">
                <br></br>
									
            <form  className="form" >											
            <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
													
                                                    <div className="col">  
                                                        <div className="fv-row mb-7">   
                                                            <label className="fs-6 fw-bold form-label mt-3">
                                                                <span className="required">Singular Unit</span>	
                                                            </label>
                                                            <input type="text" className="form-control form-control-solid" name="singular_unit" value="" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col">					
															<div className="fv-row mb-7">					
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Plural Unit</span>	
																</label>		
																<input type="text" className="form-control form-control-solid" name="plural_unit" value="" />		
															</div>	
													</div>                   
                                                </div>

                                             		
													<div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
														<div className="col">	
															<div className="fv-row mb-7">				
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Front Singular Unit</span>	
																</label>	
																<input type="text" className="form-control form-control-solid" name="front_singular_unit" value="" />		
															</div>				
														</div>
														
														<div className="col">	
															<div className="fv-row mb-7">				
																<label className="fs-6 fw-bold form-label mt-3">
																	<span className="required">Front Plural Unit</span>	
																</label>	
																<input type="text" className="form-control form-control-solid" name="front_plural_unit" value="" />	
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
                                                                            <select id="is_popular" className="form-select form-select-solid lh-1 py-3" name="is_popular"  >    
                                                                                <option value="True" >Yes</option>
                                                                                <option value="False" >No</option>
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
                                                                            <select id="status" className="form-select form-select-solid lh-1 py-3" name="status"  >  
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
														<button type="reset" data-kt-contacts-type="cancel" className="btn btn-light me-3">Cancel</button>	
														<button type="submit" data-kt-contacts-type="submit" className="btn btn-primary">Save</button>
															{/* <span className="indicator-label">Save</span> */}
														

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
export default Add_Unit;