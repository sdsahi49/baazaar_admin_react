import React,{useState,useEffect} from "react";
import {Link, useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';
import "./style.css";
// import ReactToExcel from 'react-html-table-to-excel';


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



const Orders=() =>{

	setTimeout(function(){
    window.location.reload();
 }, 60000);

    let history = useHistory();

const [order,setOrder]=useState([]);
const [mgs,setMsg]=useState(null)



// const [use_data,setData]=useState({
//     from_date:"",
//     to_date:""
   
// });

// const{from_date,to_date}=use_data;
// const onInputChange=e=>{
// setData({...use_data,[e.target.name]:e.target.value})
// };


		useEffect(()=>{
			load_Orders();
			},[] );

			const load_Orders=async()=>{

				axios.get('http://localhost:8000/order/order_list',{
				  headers: {
					"Authorization":"Bearer "+ Cookies.get('token') 
				}       
			  } 
				).then(result => { 
                    setOrder(result.data.data);
			 
				})
				.catch(error =>{
				  console.log(error)
				  
				} )
			
			  }

              
        
			//   function handleClick(e) {
			// 	e.preventDefault();
			// 	setData({
			// 		from_date:"",
			// 		to_date:""
				   
			// 	});
			// 	load_Orders();
			
			//   }
			
			  
	//  const onSubmit =  e => {
	// 	e.preventDefault();
		  
	// 	if(use_data.from_date===""){
	// 	 alert("From Date is Required");   
	//    }
	//    else if(use_data.to_date===""){
	// 	  alert("To Date is Required");   
	// 	}
	//    else{
	  
	// 	 axios.post('http://localhost:8000/order/order_list_by_dates',{from_date:use_data.from_date,to_date:use_data.to_date},{ 
	// 	  headers: {
	// 		"Authorization":"Bearer "+ Cookies.get('token')   
	// 	} 
		   
	//   } )
	// 	.then(result =>{
		
	// 	 if(result.status===200)
	// 	 {        
	// 	  setOrder(result.data.data);

	// 	 }
	// 	 else if(result.status===404)
	// 	 {
	// 	  setMsg(result.data.message)
	 
	// 	 }
		  
	  
	// 	} )
	// 	.catch(error =>{
	// 	  console.log(error)
	  
	// 	} )
		
	//    }

	  
	//   };

 //initialize datatable
$(document).ready(function () {
	setTimeout(function(){
		
		if (! $.fn.dataTable.isDataTable( '#order' ) ) {
			$('#order').DataTable(
			{
				  pagingType: 'full_numbers',
				  order,

				  pageLength: 20,
				  processing: true,
				
				  buttons: ['csv'
				],
				dom: 'Bfrtip', 
			}
		);
	
		}
		} ,
		5000
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
    
   <div className="toolbar" >					
		<div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">	
			<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" classNameName="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">						
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Order List						
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
		  {/* <ReactToExcel table="order" filename="order" sheet="sheet1" buttonText="Export to Excel" className="btnCancel"/> */}
				 {/* <form onSubmit={e =>onSubmit(e)}>
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
              </form>  */}
												
		</div> 
		 

									{/* <br></br> */}
									<div className="card-body pt-0">
									
									<table className="table align-middle table-row-dashed fs-6 gy-5" id="order">					
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">		
													<th >Order No</th>
													<th >Store Name</th>
													<th >User Name</th>
                                                    <th >Customer Name</th>
													<th >Placed at</th>
													<th >Order Status</th>
													{/* <th >Delivery</th> */}
													<th >Payment</th>
                                                    <th >items</th>
													<th >Amount</th>
                                                    <th >Action</th>
												</tr>	
											</thead>
											
											<tbody className="fw-bold text-gray-600">


											 {order.map((item, i) => (
											 
												<tr >	
							
													<td >
														<a href="#" className="text-gray-800 text-hover-primary fw-bolder">{item.order_no}</a>
													</td>
                                                    <td className="td_set">
														<a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bolder">{item.store_name}</a>				
													</td>	
													<td className="td_set">
														<a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bolder">{item.user_name}</a>				
													</td>			
													<td>
														<a href="#" className="text-gray-800 text-hover-primary fs-5 fw-bolder">{item.customer_name}</a>				
													</td>	
													<td >
														<div className="badge badge-light-primary">{item.order_place_on}</div>		
													</td>
	
													<td >
														<span className="fw-bolder">{item.order_status}</span>
													</td>
													
													{/* <td >
														<span className="fw-bolder">{item.delivery}</span>
													</td> */}
													<td >
														<span className="fw-bolder">{item.payment_status}</span>
													</td>
													<td >
														<span className="fw-bolder">{item.items}</span>
													</td>
													<td >
														<span className="fw-bolder">₹{item.order_value}</span>
													</td>
                                                   
                                                    <td>  
                                                        <Link to={'/order_details?id='+item.id}><i class="fa fa-eye" aria-hidden="true"></i> </Link>
                                                           
                                                     </td>
                                                    
												
													
												</tr>
											 ))} 
															
											</tbody>
												
										</table>


										{/* <MDBDataTable
      striped
      bordered
      small
      data={setOrder}
    /> */}

									
										
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
export default Orders;