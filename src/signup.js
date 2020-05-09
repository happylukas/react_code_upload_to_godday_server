import React, { Component } from "react";

import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';
import Functions from './helpers.js';
 
class Signup extends Component {
	
	switch_registration(){
		if($('#checkmerchant'). is(":checked")){
			window.location = "/signupm";
		}
		else{
			window.location = "/signup";
		}
	}
	
	switch_login(){
		window.location = "/login"
	}
	
	do_register(){
		
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
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth bgsign">
              <div className="row flex-grow">
                <div className="col-lg-5 mx-auto">
                  <div className="auth-form-light text-left p-5">
                    <div className="avatar">
                      <img src="assets/images/avatar.png" alt="Avatar" />
                    </div>
                    <div className="brand-logo text-center">
                      <img src="assets/images/logo.png" />
                    </div>
                    <h6 className="font-weight-light">Regester with Mobile Number</h6>
                    <div className="form-check form-check-info">
                      <label className="form-check-label">
                        <input type="checkbox"  onClick={this.switch_registration} className="form-check-input" id="checkmerchant" /> I am  Merchant <i className="input-helper" /></label>
                    </div>
                   
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-surname" placeholder="Surname Name" />
                        <label htmlFor="label-surname">Surname Name</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-firstname" placeholder="First Name" />
                        <label htmlFor="label-firstname">First Name</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-phoneno" placeholder="Phone number" />
                        <label htmlFor="label-phoneno">Phone number</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-password" placeholder="Password" />
                        <label htmlFor="label-password">Password</label>
                      </div>
                      <div className="form-label-group">
                        <input type="password" className="form-control form-control-lg" id="label-cpassword" placeholder="Confirm Password" />
                        <label htmlFor="label-cpassword">Confirm Password</label>
                      </div>
                      <div className="mt-3">
                        <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="#" onClick={this.do_register}>SIGN UP</a>
                      </div>
                      <div className="text-center mt-4 font-weight-light"> Not a new User ? Login<a href="#" onClick={this.switch_login} className="text-primary">Here</a>
                      </div>
                    
                    </div>
                      
                </div>
              </div>
            </div>
            {/* content-wrapper ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
        {/* container-scroller */}
        {/* plugins:js */}
        {/* endinject */}
		
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
 
export default Signup;

