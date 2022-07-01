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
import ReactToExcel from 'react-html-table-to-excel';



const Vendor_Order_List=() =>{

	
let history = useHistory();
const search = window.location.search;
  const params = new URLSearchParams(search);
  const user_id = params.get('user_id');

  var u_ids = user_id.split('/')[0];
  var sto_name = user_id.split('/')[1];

const [store_name,setStore_Name]=useState([]);

useEffect(()=>{
    load_vndr_name();
},[] );


  const load_vndr_name=async()=>{
  setStore_Name(sto_name)
  }

const [order,setOrder]=useState([]);
const [mgs,setMsg]=useState(null)



const [use_data,setData]=useState({
    from_date:"",
    to_date:"",
    status:""
   
});

const{from_date,to_date,status}=use_data;
const onInputChange=e=>{
setData({...use_data,[e.target.name]:e.target.value})
};


	

              
        
		
			
			  
	 const onSubmit =  e => {
		e.preventDefault();
		  
		if(use_data.from_date===""){
		 alert("From Date is Required");   
	   }
	   else if(use_data.to_date===""){
		  alert("To Date is Required");   
		}
        else if(use_data.status===""){
            alert("Status is Required");   
          }
	   else{
	  
		 axios.post('http://localhost:8000/order/order_list_by_dates_status',{user_id:u_ids,from_date:use_data.from_date,to_date:use_data.to_date,status:use_data.status},{ 
		  headers: {
			"Authorization":"Bearer "+ Cookies.get('token')   
		} 
		   
	  } )
		.then(result =>{
            if(result.status===200)
            {        
             setOrder(result.data.data);
            
            }
            if(result.status===400)
            { 
            setOrder([])
               
            }
		} )
		.catch(error =>{
		  console.log(error)
	  
		} )
		
        setOrder([])


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
    
   <div className="toolbar" >					
		<div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">	
			<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" classNameName="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">						
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Vendor Order List						
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
        <br></br>
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vendor: {store_name}</b>
        
		  <div className="card-header align-items-center py-5 gap-2 gap-md-5">
         
          
		  {/* <ReactToExcel table="order" filename="order" sheet="sheet1" buttonText="Export to Excel" className="btnCancel"/> */}
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

                    <div className="col-md-3">
                    <label><b>Status</b> <span>*</span></label>
                    <br></br>
                    <select name="status" className="form-control form-control-solid"  value={status}  onChange={e=>onInputChange(e)}>
                         <option value="">Select Status</option>
                         <option value="All">All</option>
                         <option value="Pending">Pending</option>
                         <option value="On Hold">On Hold</option>
                         <option value="Accepted">Accepted</option>
                         <option value="Rejected">Rejected</option>
                         <option value="Delivered">Delivered</option>
             </select>
                    </div>
                
                    <div className="col-md-1">       
                       <br></br>
                     <button className="btn btn-sm btn-primary me-2" >Search</button>
                      &nbsp;
                     {/* <button className="btn btn-sm btn-light" onClick={handleClick}>Reset</button>  */}
					  &nbsp;
					 <spam>{mgs}</spam>             
                    </div>

                    </div>  
                 </form>
                 <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                  <ReactToExcel table="vndrorder" filename="vendor_order" sheet="sheet1" buttonText="Export to Excel" className="btnCancel"/>
                </div>
						
		 </div> 
		 

									{/* <br></br> */}
									<div className="card-body pt-0">
									
									<table className="table align-middle table-row-dashed fs-6 gy-5" id="vndrorder">					
											<thead>
												<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">		
													<th >Order No</th>
													<th >Store Name</th>
													<th >User Name</th>
                                                    <th >Cust Name</th>
													<th >Placed at</th>
													<th >Status</th>
													{/* <th >Delivery</th> */}
													<th >Payment</th>
                                                    <th >Items</th>
                                                    <th >After Discount</th>
													<th >Amount</th>
                                                   
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
														<span className="fw-bolder">₹{item.final_amount}</span>
													</td>
													<td >
														<span className="fw-bolder">₹{item.order_value}</span>
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
export default Vendor_Order_List;