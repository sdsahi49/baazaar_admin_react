import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

const Brands=() =>{

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
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Brand List						
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
		  <div className="card-header align-items-center py-5 gap-2 gap-md-5">
					
          
          <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
          <button className="btn btn-sm btn-light"  onClick={addNew}>Add New</button> 
          </div>
                  
             
												
				</div>
									
									<div className="card-body pt-0">
									
									<table className="table align-middle table-row-dashed fs-6 gy-5">					
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">		
                                                <th>Sr No</th>
                                                {/* <th>Id</th> */}
                                                <th>Brand</th>
                                                <th>Status</th>
                                                <th>Image</th>
                                                {/* <th>Action</th> */}
												</tr>	
											</thead>
											
											<tbody className="fw-bold text-gray-600">
											 {brands.map((item, i) => (
											 
												<tr >	
							                         <td>{i+1}</td>
                                                     {/* <td>{item.Id}</td>  */}
                                                     <td>{item.brand_name}</td>
													 
                                                     <td>{item.status}</td>
                                                     <td>
                                                     <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
																<a href="#">
																	<div className="symbol-label">
																		<img src={item.brand_img_url} className="w-100" />
																	</div>
																</a>
															</div>

                                                    </td>
                                                    {/* <td>
                                                     <Link to={'/edit_brand/'+item.Id}>Edit</Link>
                                                     &nbsp;&nbsp;
                                                    <Link onClick={()=>deleteBrand(item.Id)}>Delete</Link>
                                                    </td> */}
													
												</tr>
											 ))} 
															
											</tbody>
												
										</table>
				
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
export default Brands;