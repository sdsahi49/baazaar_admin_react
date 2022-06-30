import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

const Countries=() =>{

 //My Tempcode start
 let history = useHistory();
 //My Tempcode end

const [country,setCountry]=useState([]);
const [mgs,setMsg]=useState(null)


		useEffect(()=>{
			load_Country();
			},[] );

			const load_Country=async()=>{

				axios.get('http://localhost:8000/country/country_list',{
				  headers: {
					"Authorization":"Bearer "+ Cookies.get('token') 
				}       
			  } 
				).then(result => { 
                    setCountry(result.data.data);
			 
				})
				.catch(error =>{
				  console.log(error)
				  
				} )
			
			  }

			
			   
			const deleteCountry=async id =>{
				
			var result = window.confirm("Want to delete?");
             if (result) {
				
					axios.post('http://localhost:8000/country/delete_country',{id:id},{
						headers: {
							"Authorization":"Bearer "+ Cookies.get('token') 
						}    
					 
				  } )
				   .then(result =>{
					 
					  //alert(result.data.message)
				   
				   } )
				   .catch(error =>{
					console.log(error) 
				   } )

}
				  
               load_Country();	  
				  }

  
              const addNew =() =>{
                history.push("/add_country")
              }


			  $(document).ready(function () {
				setTimeout(function(){
					
					if (! $.fn.dataTable.isDataTable( '#country' ) ) {
						$('#country').DataTable(
						{
							  pagingType: 'full_numbers',
							  pageLength: 10,
							  processing: true,
							  dom: 'Bfrtip',
								  buttons: ['csv', 'print'
								  ]
						}
					);
				
					}
					} ,
					1000
					);
				});
				
	
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
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Country List						
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
									<table className="table align-middle table-row-dashed fs-6 gy-5" id="country">					
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">		
                                                <th>Sr No</th>
                                                <th>Image</th>
                                                <th>Country Name</th>
                                                <th>Is Popular?</th>
                                                <th>Status</th>
                                                <th>Action</th>
												</tr>	
											</thead>
											
											<tbody className="fw-bold text-gray-600">
											 {country.map((item, i) => (
											 
												<tr >	
							                         <td>{i+1}</td>
                                                     <td>
                                                     <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
																<a href="#">
																	<div className="symbol-label">
																		<img src={item.country_flag_img} className="w-100" />
																	</div>
																</a>
															</div>

                                                    </td>
													<td >
                                                    {item.country_name}
													</td>		
													<td>
													{item.is_popular}			
													</td>	
													
													<td >
														{item.status}
													</td>

                                                    <td>
													<Link className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" to={'/edit_country?id='+item.id}>
													<span className="svg-icon svg-icon-3">
																				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																					<path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black" />
																					<path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black" />
																				</svg>
																			</span>
													</Link>
         
				  
                                                       &nbsp;&nbsp;
                                                       <Link className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={()=>deleteCountry(item.id)}>
													   <span className="svg-icon svg-icon-3">
																				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																					<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
																					<path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
																					<path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
																				</svg>
																			</span>
													   </Link>
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
export default Countries;