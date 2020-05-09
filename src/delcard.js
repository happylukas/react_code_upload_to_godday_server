import React, { Component } from "react";

import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';
import Functions from './helpers.js';
 
class Delcard extends Component {
	
	constructor(props){
		super(props);
		
			
	}
	
	 componentDidMount() {
     window.addEventListener('load', this.do_del);
	 
    }
	
	
	do_del(){
		
		var sname = $('#label-surname').val();
		var fname = $('#label-firstname').val();
		var phone = $('#label-phoneno').val();
		var password = $('#label-password').val();
		var cpassword = $('#label-cpassword').val();
		var fullname =  fname + " " + sname;

        var endpoint = "user/auth/register" ; 		
		
		 $.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,phone:phone,password:password,fullname:fullname,cpassword:cpassword},
        dataType: "json",
        success:function(result){
            //alert(result);
			var res = JSON.parse(result);
		    console.log(res);
			if(res.error==true)
			{
				$('#errormessage').html(Functions.printError(res.msg));
				$('#errormodel').modal();
			}
			else{
				$('#resetotp').modal();
			}
			
        //(result.data);
  
		  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
	}
	
	
	confirmOtp(){
		var otp = $('#passwordotp').val();
		var phone = $('#label-phoneno').val();
		
		var endpoint = 'user/auth/verify_account';
		var out;
		
		$.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,phone:phone,otp:otp},
        dataType: "json",
        success:function(result){
            console.log(result);
			var res = JSON.parse(result);
		if(res.error == true){
			
			$('#errormessage').html(Functions.printError(result.msg));
			$('#errormodel').modal();
		}
		else{
			
			$('#errormessage').html('your registration has been completed .Please click <a href="/login"><u>here</u></a> to login');
			$('#resetotp').modal("hide");
			$('#errormodel').modal();
		} 
			
	 
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
		
		
		
		
		
	}
	
  render() {
    return (
        
      <div>
        
		
		<div className="modal fade" id="errormodel" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 id="errormessage" className="modal-title w-100 font-weight-bold"></h4>
                <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
				</div>
				</div>
				</div>
				</div>
				
				
				{/*password otp Modal*/}			
			<div className="modal fade" id="resetotp" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Please enter verification OTP sent to your mobile</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
            
                  <div className="form-label-group">
                    <input type="password" className="form-control form-control-lg" id="passwordotp" placeholder="Current Password" />
                   
                  </div>
                  
                
              </div>
              <div className="modal-footer d-flex justify-content-center">
                
                <button onClick={this.confirmOtp} className="btn btn-gradient-primary btn-lg ">Confirm</button>
              </div>
            </div>
          </div>
        </div>	
		
		
      </div>
    );
  }
}
 
export default Delcard;

