import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

const Users=() =>{

const [user,setUser]=useState([]);
const [mgs,setMsg]=useState(null)


const [use_data,setData]=useState({
    from_date:"",
    to_date:""
   
});

const{from_date,to_date}=use_data;
const onInputChange=e=>{
setData({...use_data,[e.target.name]:e.target.value})
};


		useEffect(()=>{
			load_Users();
			},[] );

			const load_Users=async()=>{

				axios.get('http://localhost:8000/user/user_list',{
				  headers: {
					"Authorization":"Bearer "+ Cookies.get('token') 
				}       
			  } 
				).then(result => { 
				setUser(result.data.data);
			 
				})
				.catch(error =>{
				  console.log(error)
				  
				} )
			
			  }

			  function handleClick(e) {
				e.preventDefault();
				setData({
					from_date:"",
					to_date:""
				   
				});
				load_Users();
			
			  }
			
			  
			
			const onSubmit =  e => {
			  e.preventDefault();
			
			
			  if(use_data.from_date===""){
			   alert("From Date is Required");   
			 }
			 else if(use_data.to_date===""){
				alert("To Date is Required");   
			  }
			 else{
			
			   axios.post('http://localhost:8000/user/user_list_by_dates',{from_date:use_data.from_date,to_date:use_data.to_date},{ 
				headers: {
				  "Authorization":"Bearer "+ Cookies.get('token')   
			  } 
				 
			} )
			  .then(result =>{
			  
			   if(result.status===200)
			   {        
				setUser(result.data.data);
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
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">User List						
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
                    <div className="col-md-4">
                     <label><b>From Date</b> <span>*</span></label>
                     <input className="form-control form-control-solid" name="from_date" value={from_date}  onChange={e=>onInputChange(e)}  type="date"  />    
                    </div>
                     <div className="col-md-4">
                     <label><b>To Date</b> <span>*</span></label>
                     <input className="form-control form-control-solid" name="to_date" value={to_date}  onChange={e=>onInputChange(e)}  type="date" />
                        
                    </div>
                
                    <div className="col-md-4">       
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
									
									<table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_customers_table">					
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">		
													<th >ID</th>
													<th >Full Name</th>
													<th >Contact</th>
													<th >Email Id</th>
													<th >Created At</th>
													<th >Updated At</th>
													<th >Status</th>
												</tr>	
											</thead>
											
											<tbody className="fw-bold text-gray-600">


											 {user.map((item, i) => (
											 
												<tr >	
							
													<td >
														<a href="#" className="text-gray-800 text-hover-primary fw-bolder">{item.id}</a>
													</td>		
													<td>
														<a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bolder">{item.full_name}</a>				
													</td>	
													<td >
														<div className="badge badge-light-primary">{item.contact_no}</div>		
													</td>
	
													<td >
														<span className="fw-bolder">{item.email}</span>
													</td>
													
													<td >
														<span className="fw-bolder">{item.created_at}</span>
													</td>
													<td >
														<span className="fw-bolder">{item.updated_at}</span>
													</td>
													
													<td >
														<span className="fw-bolder">{item.status}</span>
													</td>
												
													
												</tr>
											 ))} 
															
											</tbody>
												
										</table>




										{/* <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_sales_table">	
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
													<th className="w-10px pe-2">
														<div className="form-check form-check-sm form-check-custom form-check-solid me-3">
															<input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_ecommerce_sales_table .form-check-input" value="1" />
														</div>
													</th>
													<th className="min-w-100px">ID</th>
													<th className="min-w-175px">Full Name</th>
													<th className="text-end min-w-70px">Contact</th>
													<th className="text-end min-w-100px">Email Id</th>
													<th className="text-end min-w-100px">Created At</th>
													<th className="text-end min-w-100px">Status</th>
													<th className="text-end min-w-100px">Actions</th>
												</tr>
												
											</thead>
											
											<tbody className="fw-bold text-gray-600">
											{user.map((item, i) => (
												<tr>
												
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													
													<td data-kt-ecommerce-order-filter="order_id">
														<a href="#" className="text-gray-800 text-hover-primary fw-bolder">{item.id}</a>
													</td>
													
													<td>
														<div className="d-flex align-items-center">
															
															<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
																<a href="#">
																	<div className="symbol-label">
																		<img src="assets/media/avatars/300-13.jpg" alt="John Miller" className="w-100" />
																	</div>
																</a>
															</div>
															
															<div className="ms-5">
																
																<a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bolder">{item.full_name}</a>
																
															</div>
														</div>
													</td>
													
													<td className="text-end pe-0" data-order="Delivering">
													
														<div className="badge badge-light-primary">{item.contact_no}</div>
														
													</td>
												
													<td className="text-end pe-0">
														<span className="fw-bolder">{item.email}</span>
													</td>
													
													<td className="text-end" data-order="2022-01-19">
														<span className="fw-bolder">{item.created_at}</span>
													</td>
													
													<td className="text-end" data-order="2022-01-26">
														<span className="fw-bolder">{item.status}</span>
													</td>
													
													<td className="text-end">
														<a href="#" className="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black" />
															</svg>
														</span>
														</a>
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
														
															<div className="menu-item px-3">
																<a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="menu-link px-3">View</a>
															</div>
														
															<div className="menu-item px-3">
																<a href="../../demo1/dist/apps/ecommerce/sales/edit-order.html" className="menu-link px-3">Edit</a>
															</div>
														
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-ecommerce-order-filter="delete_row">Delete</a>
															</div>
															
														</div>
														
													</td> 
													
												</tr>
											 ))} 	
												
												
												
											</tbody>
											
										</table> */}
										
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
export default Users;