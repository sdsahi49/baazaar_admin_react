import React,{useState,useEffect} from "react";

import ReactTOPdf from "react-to-pdf";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {Link, useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import axios from "axios";
import Cookies from 'js-cookie';

import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import Scrolltop from './Scrolltop';

import "./style.css";


const ref = React.createRef();

const Order_Details=() =>{

  setTimeout(function(){
    window.location.reload();
 }, 60000);

let history = useHistory();

const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('id');
  

  const [mgs,setMsg]=useState(null)
  const[store_name,setStore_Name]=useState(null)

  const[vendor_mobile,setVendor_Mobile]=useState(null)

  const[order_id,setOrder_Id]=useState(null)

  const[order_status,setOrder_Status]=useState(null)


  const[order_date,setOrder_Date]=useState(null)
  const[order_confirm_date,setOrder_Confirm_Date]=useState(null)
  const[order_delivered_date,setOrder_Delivered_Date]=useState(null)
  const[note,setNote]=useState(null)
  const[customer_name,setCustomer_Name]=useState(null)
  const[customer_mobile,setCustomer_mobile]=useState(null)
  const[collecting_date,setCollecting_Date]=useState(null)
  const[collecting_time,setCollecting_Time]=useState(null)
  const[payment_method,setPayment_Method]=useState(null)
  const[total_mrp,setTotal_Mrp]=useState(null)
  const[discount_amount,setDiscount_Amount]=useState(null)

  const[total_price,setTotal_Price]=useState(null)
  const[shipping_charge,setShipping_Charge]=useState(null)
  const[total_gst_amount,setTotal_Gst_Amount]=useState(null)
  const[coupon_amount,setCoupon_Amount]=useState(null)
  const[final_amount,setFinal_Amount]=useState(null)

  const[store_address,setStore_Address]=useState(null)
  const[store_landmark,setStore_Landmark]=useState(null)
  const[store_city,setStore_City]=useState(null)
  const[store_state,setStore_State]=useState(null)
  const[store_country,setStore_Country]=useState(null)
  const[store_postal_code,setStore_Postal_Code]=useState(null)

  const[store_geo_location_address,setStore_Geo_Location_Address]=useState(null)


  const[customer_house_flat_block_no,setCustomer_House_Flat_Block_No]=useState(null)
  const[customer_landmark,setCustomer_Landmark]=useState(null)
  const[customer_geo_location_address,setCustomer_Geo_Location_Address]=useState(null)


  const[vendor_otp,setVendor_Otp]=useState(null)
  const[customer_otp,setCustomer_Otp]=useState(null)

  const[delivery_mode,setDelivery_Mode]=useState(null)

  const[st_add,setSt_Add]=useState(null)
  const [ord,setOrdDet]=useState([]);



  const [use_data,setData]=useState({
    status:"",
    password:""
});


const{status,password}=use_data;
const onInputChange=e=>{
setData({...use_data,[e.target.name]:e.target.value})

};

const onSubmit =  e => {
  e.preventDefault();

  if(use_data.status==="")
  {
    alert("Please select status");
  }
  else if(use_data.password==="")
  {
    alert("Password is Required");
  }
  else
  {
    axios.post('http://localhost:8000/order/update_os',{id:id,order_status:use_data.status,password:use_data.password},{
      headers: {
        "Authorization":"Bearer "+ Cookies.get('token') 
      }    
     
    } )
     .then(result =>{
     
      if(result.status==200)
      {
       
         setData({
          status:"",
          password:""
         
      });
    
        load_Data();
        load_Ord_Det();
        alert(result.data.message)
        history.push("/order_details?id="+id)
      }
      else{
        alert(result.data.message)
      }
         
     
     } )
     .catch(error =>{
    console.log(error) 
     } )

     load_Data();
     load_Ord_Det();

     
  }


};


 

const load_Data= async()=>{
    axios.post('http://localhost:8000/order/order_details',{ id:id},{
   
      headers: {
        "Authorization":"Bearer "+ Cookies.get('token')   
    }    
   } )
     .then(result =>{
     
      if(result.status===200)
      {        
        
        setStore_Name(result.data.data[0].store_name)

        setVendor_Mobile(result.data.data[0].vendor_mobile)

        setOrder_Id(result.data.data[0].order_id)
        setOrder_Status(result.data.data[0].order_status)
        setOrder_Date(result.data.data[0].order_date)
        setOrder_Confirm_Date(result.data.data[0].order_confirm_date)
        setOrder_Delivered_Date(result.data.data[0].order_delivered_date)
        setNote(result.data.data[0].note)
        setCustomer_Name(result.data.data[0].customer_name)
        setCustomer_mobile(result.data.data[0].customer_mobile)
        setCollecting_Date(result.data.data[0].collecting_date)
        setCollecting_Time(result.data.data[0].collecting_time)
        setPayment_Method(result.data.data[0].payment_method)
        setTotal_Mrp(result.data.data[0].total_mrp)
        setDiscount_Amount(result.data.data[0].discount_amount)

         setTotal_Price(result.data.data[0].total_price)
         setShipping_Charge(result.data.data[0].shipping_charge)
         setTotal_Gst_Amount(result.data.data[0].total_gst_amount)
         setCoupon_Amount(result.data.data[0].coupon_amount)
         setFinal_Amount(result.data.data[0].final_amount)

         setStore_Address(result.data.data[0].store_address)

         setStore_Landmark(result.data.data[0].store_landmark)
         setStore_City(result.data.data[0].store_city)
         setStore_State(result.data.data[0].store_state)
         setStore_Country(result.data.data[0].store_country)
         setStore_Postal_Code(result.data.data[0].store_postal_code)

         setStore_Geo_Location_Address(result.data.data[0].store_geo_location_address)


         setCustomer_House_Flat_Block_No(result.data.data[0].customer_house_flat_block_no)
         setCustomer_Landmark(result.data.data[0].customer_landmark)
         setCustomer_Geo_Location_Address(result.data.data[0].customer_geo_location_address)

         setVendor_Otp(result.data.data[0].vendor_otp)
         setCustomer_Otp(result.data.data[0].customer_otp)

         setDelivery_Mode(result.data.data[0].delivery_mode)

         setSt_Add(result.data.data[0].st_add)


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

         
  const load_Ord_Det= async()=>{

    axios.post('http://localhost:8000/order/order_items',{order_id:id},{
      headers: {
        "Authorization":"Bearer "+ Cookies.get('token')   
    }    
       
   } )
     .then(result =>{
     
      if(result.status===200)
      {        
        setOrdDet(result.data.data);
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

 


  useEffect(()=>{
    load_Data();
    load_Ord_Det();
    
  },[] );

  const Deliv =(e) =>{
    e.preventDefault();
    var result = window.confirm("Want to action?");
    if (result) 
    {
   
      axios.post('http://localhost:8000/order/mark_delv',{order_id:id},{
        headers: {
          "Authorization":"Bearer "+ Cookies.get('token') 
        }    
       
      } )
       .then(result =>{
       
        if(result.status==200)
        {
          alert(result.data.message)
          load_Data();
          load_Ord_Det();
          history.push("/order_details?id="+id)
        }
        else{
          alert(result.data.message)
        }
           
       
       } )
       .catch(error =>{
      console.log(error) 
       } )

       load_Data();
       load_Ord_Det();

   }

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
    
   <div  className="toolbar" id="kt_toolbar">					
		<div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">	
			<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" classNameName="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">						
				<h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">Order Details						
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

      

		<div   className="card card-flush marg">								
		  <div className=" py-5 gap-2 gap-md-5">
						
                 <div className="row">

                    <div className="col-md-3">
                    <b>Vendor:</b> 
                    <br></br>
                     {store_name}
           
                    </div>
                    <div className="col-md-2">
                    <b>Order ID:</b>
                    <br></br> 
                    {order_id}
                   </div>
                    <div className="col-md-2">

                    <b>Order Status:</b>
                    <br></br> 
                    <h3>{order_status}</h3>

                    </div>
                    <div className="col-md-2">

                    <b>Delivery Mod:</b>
                    <br></br> 
                    <h3>{delivery_mode}</h3>

                    </div>
                    <div className="col-md-3">
                      
                    <Link >View Store</Link>
                    </div>
        
                 </div>  
                 <div className="col-md-12">
                    <br></br>
                </div>
        <div className="row">
           
           <div className="col-md-3">
               <b>Placed At</b>
               <br></br>
               {order_date}
          </div>
          <div className="col-md-2">
              <b>Accepted At</b>
               <br></br>
                {order_confirm_date}
          </div>
          <div className="col-md-2">
               <b>In Transit</b>
               <br></br>
                #
          </div>
          <div className="col-md-2">
               <b>Delivered</b>
               <br></br>
               {order_delivered_date}
          </div>

          <div className="col-md-3">
              
               <button   className="btn btn-light me-3" onClick={Deliv}>Mark as Delivered</button>	
          </div>




        </div>
            
												
		</div>
			
            <hr></hr>
			<div className="card-body pt-0">
            <b>Order Items</b>


	<div className="table-responsive">
													
													<table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
														
														<thead>
															<tr className="fw-bolder text-muted">
															
																<th className="min-w-200px">Product/Service</th>
																<th className="min-w-150px">MRP</th>
																<th className="min-w-150px">SP</th>
                                                                <th className="min-w-150px">Qty</th>
                                                                <th className="min-w-150px">Discount</th>
                                                                <th className="min-w-150px">Total Amt</th>
																
															</tr>
														</thead>
														
														<tbody>
                                                        {ord.map((item, i) => (
															<tr>
																
																<td>
																	<div className="d-flex align-items-center">
																		<div className="symbol symbol-45px me-5">
																			<img src={item.prod_img} alt="" />
																		</div>
																		<div className="d-flex justify-content-start flex-column">
																			<a href="#" className="text-dark fw-bolder text-hover-primary fs-6"> {item.product_name}</a>
																			<span className="text-muted fw-bold text-muted d-block fs-7"></span>
																		</div>
																	</div>
																</td>

                                                                <td className="text-end">
																	<div className="d-flex flex-column w-100 me-2">
																		<div className="d-flex flex-stack mb-2">
																			<span className="text-muted me-2 fs-7 fw-bold">₹0</span>
																		</div>
																		
																	</div>
																</td>



																<td className="text-end">
																	<div className="d-flex flex-column w-100 me-2">
																		<div className="d-flex flex-stack mb-2">
																			<span className="text-muted me-2 fs-7 fw-bold">₹{item.price}</span>
																		</div>
																		
																	</div>
																</td>
                                                                <td className="text-end">
																	<div className="d-flex flex-column w-100 me-2">
																		<div className="d-flex flex-stack mb-2">
																			<span className="text-muted me-2 fs-7 fw-bold">{item.qty}</span>
																		</div>
																		
																	</div>
																</td>
                                                                <td className="text-end">
																	<div className="d-flex flex-column w-100 me-2">
																		<div className="d-flex flex-stack mb-2">
																			<span className="text-muted me-2 fs-7 fw-bold">NA</span>
																		</div>
																		
																	</div>
																</td>
                                                                <td className="text-end">
																	<div className="d-flex flex-column w-100 me-2">
																		<div className="d-flex flex-stack mb-2">
																			<span className="text-muted me-2 fs-7 fw-bold">₹{item.final_amount}</span>
																		</div>
																		
																	</div>
																</td>
																
															</tr>
															  ))}
														</tbody>
													
													</table>
												
	</div>
															
			</div>

            <hr></hr>
              <div className="col-md-12">
             <br></br>
              </div>

              <div className="row">
             

          <div className="col-md-6">

          <div class="order_container1">
            <div class="order_header1">
                &nbsp;Order Notes
            </div> 
             
            &nbsp;{note}
            <hr></hr>
           &nbsp;<b>Customer OTP: </b>{customer_otp}
            <br></br>
            &nbsp;
           
         </div>

         <div className="col-md-12">
             <br></br>
          </div>
         <div class="order_container3">
            <div class="order_header3">
            &nbsp;Customer Details
            </div>  

        <div className="col-md-12">
            <div className="row">
                <div className="col-md-6">
                 <b>&nbsp;Name:</b>
                 <br></br> 
                 &nbsp;{customer_name}
                </div>
                <div className="col-md-6">
                <b>Mobile:</b>
                <br></br> 
                {customer_mobile}
                </div>
          </div>

<div className="row">
    <br></br>
</div>
          <div className="row">
                <div className="col-md-6">
                 <b>&nbsp;Instore Pickup:</b>
                 <br></br> 
                 &nbsp;{collecting_date}, {collecting_time}
                </div>
                <div className="col-md-6">
                <b>Status:</b>
                <br></br> 
                {payment_method}
                </div>
          </div>


       </div>

         </div>

         </div>
         
          <div className="col-md-4">
          
          <div class="order_container2">
            <div class="order_header2">
            &nbsp;Bill Details
            </div>
                  
        <div className="col-md-12">  
               <b>&nbsp;Total MRP   :</b>   ₹{total_mrp}  
         </div>
         <div className="col-md-12">  
               <b>&nbsp;Discount on MRP   :</b>   ₹{discount_amount}  
         </div>
         <div className="col-md-12">  
               <hr></hr>
         </div>
         <div className="col-md-12">  
               <b>&nbsp;Sub Total   :</b>   ₹{total_price}  
         </div>
         <div className="col-md-12">  
               <b>&nbsp;Delivery Fee   :</b>   ₹{shipping_charge}  
         </div>
         <div className="col-md-12">  
               <b>&nbsp;Taxes & Charges   :</b>   ₹{total_gst_amount}  
         </div>
         <div className="col-md-12">  
               <b>&nbsp;Coupon Discound   :</b>   ₹{coupon_amount}  
         </div>
         <div className="col-md-12">  
               <hr></hr>
         </div>
         <div className="col-md-12">  
               <b>&nbsp;Amount Receivable   :</b>   ₹{final_amount}  
              
         </div>



          </div>

<br></br>
<form className="form w-100"  onSubmit={e =>onSubmit(e)}>
          <div class="order_container2">
            <div class="order_header2">
            &nbsp;For Admin use only
            </div>
                  
        <div className="col-md-12">  
        <br></br>
        &nbsp;<b>Order Status: </b><select name="status"  value={status}  onChange={e=>onInputChange(e)}>
                         <option value="">Select Status</option>
                         <option value="Pending">Pending</option>
                         <option value="On Hold">On Hold</option>
                         <option value="Accepted">Accepted</option>
                         <option value="Rejected">Rejected</option>
                         <option value="Delivered">Delivered</option>
             </select>
         </div>
         <br></br>
         <div className="col-md-12">  
         &nbsp;<b>Password: </b><input type="password" name="password"  value={password}  onChange={e=>onInputChange(e)}/>
         </div>
         <div className="col-md-12">  
               <hr></hr>
         </div>
         <div className="col-md-12">  
        
         &nbsp;<button   >Update</button>
        
         </div>
         <br></br>
         


          </div>
</form>


          <br></br>

          </div>
          
               </div>
           
         
               <div  ref={ref}>
                  <tabe className="marg" id="1" >
                    <tr>
                        <br></br>
                       <h2>Baazaar Pickup & Delivery Details:-</h2>
                       <br></br>
                     </tr>
                    
                    <tr>
                        <b>Order No: </b>{vendor_otp}
                        <br></br>
                        <b>Payment Mode:   {payment_method}</b>
                        <br></br>
                        <b>Placed At:   {order_date}</b> 
                    </tr>
                    <tr>
                    <br></br>
                    </tr>
                    
                    <tr>
                        <b>Store Name:   </b> {store_name}<br></br><b>Vendor Mobile:    </b>{vendor_mobile}<br></br><b>Store Address:   </b>{store_address}, {store_landmark}, {store_city}, {store_state}, {store_country}<br></br><b>Pin Code:   </b>{store_postal_code}<br></br><b>Store Geo Location:    </b><a target="_blank" href={store_geo_location_address}>{store_geo_location_address}</a>    
                    </tr>
                    <tr>
                    <br></br>
                    </tr>
                   <tr>
                   <b>Customer Name:   </b> {customer_name}
                   <br></br>
                   <b>Customer Mobile No:   </b> {customer_mobile}
                   <br></br>
                   <b>Customer Address:   </b> {customer_house_flat_block_no}, {customer_landmark}
                   <br></br>
                   <b>Customer Geo Location:   </b> <a target="_blank" href={customer_geo_location_address}>{customer_geo_location_address}</a>
                  
                   <br></br>
                   <b>Amount Receivable:   </b> ₹{final_amount}
                   </tr>
                   <tr>
                   <br></br>
                   </tr>
                 
                  </tabe>
                  <h3 className="marg">Items:-</h3>
                  <table  id="2">
															
													<tbody >
                              {ord.map((item, i) => (
															<tr>		 
																<td>
                                 {i+1}) {item.product_name} x {item.qty}
																</td>
															</tr>
															  ))}
														</tbody>
													
			             	 </table>
                
               </div>

    <div className="marg">
               
                    {/* <ReactTOPdf targetRef={ref} >
          {({ toPdf }) => 
            <button onClick={toPdf} className="get_started">
              Download
            </button>
          }
        </ReactTOPdf> */}
       
        <br></br>
        &nbsp;
       
                   
   </div>
        
									
		</div>
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
export default Order_Details;