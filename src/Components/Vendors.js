import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';



const Vendors=() =>{

 //My Tempcode start
 let history = useHistory();
 //My Tempcode end

const [vndrs,setVndrs]=useState([]);
const [mgs,setMsg]=useState(null)

const [use_data,setData]=useState({
    store_name:"",
    
   
});

const{store_name}=use_data;
const onInputChange=e=>{
setData({...use_data,[e.target.name]:e.target.value})
};


			const load_Vendors=async()=>{

				axios.get('http://localhost:8000/store/store_list',{
				  headers: {
					"Authorization":"Bearer "+ Cookies.get('token') 
				}       
			  } 
				).then(result => { 
                    setVndrs(result.data.data);
					
				})
				.catch(error =>{
				  console.log(error)
				  
				} )
			
			  }		
			   
	
			  useEffect(()=>{
				load_Vendors();
				},[] );


				function handleClick(e) {
					e.preventDefault();
					setData({
						store_name:"",
			
					   
					});
					load_Vendors();
				
				  }
				
				  
				
				const onSubmit =  e => {
				  e.preventDefault();
				
				
				  if(use_data.store_name===""){
				   alert("Store is Required");   
				 }
				
				 else{
				
				   axios.post('http://localhost:8000/store/store_list_by_store_name',{store_name:use_data.store_name},{ 
					headers: {
					  "Authorization":"Bearer "+ Cookies.get('token')   
				  } 
					 
				} )
				  .then(result =>{
				  
				   if(result.status===200)
				   {        
					setVndrs(result.data.data);
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
				
				};
	


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
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Vendor List						
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
		  <form onSubmit={e =>onSubmit(e)}>
                   <div className="row">
                    <div className="col-md-6">
                     <label><b>Store Name</b> <span>*</span></label>
                     <input className="form-control form-control-solid" name="store_name" value={store_name}  onChange={e=>onInputChange(e)} placeholder="Search by store"   />    
                    </div>
                    
                    <div className="col-md-6">       
                       <br></br>
                     <button className="btn btn-sm btn-primary me-2" >Search</button>
                      &nbsp;
                     <button className="btn btn-sm btn-light" onClick={handleClick}>Reset</button> 
					  &nbsp;
					 <spam>{mgs}</spam>             
                    </div>

                    </div>  
              </form>
         
        									
				</div>
									
									<div className="card-body pt-0">
									
									<table className="table align-middle table-row-dashed fs-6 gy-5">					
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">		
                                                <th>Sr No</th>
												<th>Logo</th>
                                                <th>Store Name</th>
                                                <th>Status</th>
                                                <th>Markt Place Status</th>
                                                <th>Status</th>
                                                {/* <th>Action</th> */}
												</tr>	
											</thead>
											
											<tbody className="fw-bold text-gray-600" >
											
									
											 {vndrs.map((item, i) => (
											 
												<tr >	
							                         <td>{i+1}</td>
													 <td>
                                                     <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
																<a href="#">
																	<div className="symbol-label">
																		<img src={item.logo_img} className="w-100" />
																	</div>
																</a>
															</div>

                                                    </td>
													<td >
                                                    {item.store_name}
													</td>		
													<td>
													{item.status}			
													</td>	
													<td >
														{item.m_p_s}		
													</td>
	
													<td>  
                                                        {/* <Link to={'/vendor_order_list?user_id='+item.user_id}><i class="fa fa-eye" aria-hidden="true"></i> </Link> */}

														<Link to={'/vendor_order_list?user_id='+item.user_id+"/"+item.store_name}><i class="fa fa-eye" aria-hidden="true"></i></Link>
                                                           
                                                     </td>
													
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
export default Vendors;