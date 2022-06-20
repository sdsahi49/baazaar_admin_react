import React  from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from 'js-cookie';

 const ProtectedRoute =({component:Component,...rest})=>{
    return (
         <Route
          {...rest}
           render={props =>{
  
           if(Cookies.get('token')!=null)
            {
                return<Component {...props}/>;                          
            }
            else
            {
                return<Redirect to={
                    {
                        pathname:"/",
                        state:{
                            from:props.location
                        }
                    }
                    }/>


            }
              
          }

         }
          />
     );
};

export default ProtectedRoute;