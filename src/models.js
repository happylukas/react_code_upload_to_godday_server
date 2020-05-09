import React, { Component } from "react";
import Mid from "./mid.js";
import Config from './config.js';

import $ from 'jquery';
import Popper from 'popper.js';

class Models extends Component {
	
	constructor(props){
		super(props);
		
		this.resendOtp = this.resendOtp.bind(this);
        this.getOtpWindow = this.getOtpWindow.bind(this); 
		 
		
	}
	
	 componentDidMount() {
     window.addEventListener('load', this.handleLoad);
	 
    }
	
	
  
  handleLoad(){
	  
	  
	 
	  var user = JSON.parse(sessionStorage.getItem("user"));
	 
	   if (user.error != "true") {
	  
		$('#full_name').val(user.data.full_name);		
		$("#priview").css('background-image','url('+user.data.profile_pic+')');
		$('#email').val(user.data.email);
		$('#country').val(user.data.country);
		
	  }
	  
  }
  
  getOtpWindow(){
	  
	   var current_pass = $("#current_pass").val();
	   var new_pass     = $("#new_pass").val();
	   var conf_new_pass = $("#conf_new_pass").val();
	    var password = sessionStorage.getItem("password");
	   
	   if(current_pass != password){
		  $('#errormessage').text("Current Password is not correct!"); 
		  $('#errormodel').modal();
	   }
	   else if(new_pass != conf_new_pass){
		  $('#errormessage').text("Confirm password does not match!"); 
		  $('#errormodel').modal();
	   }
	   else
	   {
	   $('#resetotp').modal();
	   this.resendOtp();
	   }
  }
  
    changePassword(){
		
		
	   var endpoint = 'user/auth/password/update_password_otp';
	
	   var current_pass = $("#current_pass").val();
	   var new_pass     = $("#new_pass").val();
	   var otp = $("#passwordotp").val();
	   var conf_new_pass = $("#conf_new_pass").val();
	   	   var user = JSON.parse(sessionStorage.getItem("user"));
		   var phone =  sessionStorage.getItem("phone");

	   
	   var auth = user.success.token;
	   
	      
	   var password = sessionStorage.getItem("password");
	   
	    $.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,current_pass:current_pass,new_pass:new_pass,phone:phone,otp:otp},
        dataType: "json",
        success:function(result){
            console.log(result);
			
			var successcode = JSON.parse(result);
			$('#errormessage').text(successcode.msg);
			$('#errormodel').modal();
			
        //(result.data);
  
		  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
		
	}
	
	
	resendOtp(){
		//alert('kkk');
		var endpoint = 'user/auth/resend_pass_otp';
		var phone =  sessionStorage.getItem("phone");
		$.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,phone:phone},
        dataType: "json",
        success:function(result){
            console.log(result);
			
			//var endpoint = 'user/account/profile/update';
	   var endpoint = 'user/account/profile/details';
	   var user = JSON.parse(sessionStorage.getItem("user"));
	   var profile_pic = sessionStorage.getItem("tempImg");
	   //var auth = user.data.fcm_token;
	   var auth = user.success.token;
	   console.log(auth);
	   
	   var email  = $('#email').val();
	   var full_name = $('#full_name').val();
	   var country =  $('#country').val();
	   var password = sessionStorage.getItem("password");
	    $.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,auth:auth},
        dataType: "json",
        success:function(result){
            console.log(result);
			//$('#updateprofilesuccess').modal();
			
			
        //(result.data);
  
		  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
			
			
			
				  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
		
	}
	
	
	
	updateOk(){
		
		
		var endpoint = 'user/auth/login';
	    var phone =  sessionStorage.getItem('phone');
		var password = sessionStorage.getItem('password');
	   
		
       	 $.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,phone:phone,password:password},
        dataType: "json",
        success:function(result){
            //alert(result);
			var user = JSON.parse(result);
			sessionStorage.setItem("user", JSON.stringify(user));
			sessionStorage.setItem("password", password);
			//console.log(sessionStorage.getItem("user"));
			
			 window.location.reload(false);
			
        //(result.data);
  
		  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
	}
	
	logout(){
	  sessionStorage.removeItem("user");
	  window.location = '/login';
   }
   
   upload_pic(){
	   
	

    
        var fd = new FormData();
        var files = $('#imageUpload')[0].files[0];
         
		var endpoint = '/upload';
		fd.append('file',files);
		fd.append('endpoint',endpoint);

        $.ajax({
            url: Config.baseurl,
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                   // alert(response);
                    $("#priview").css('background-image','url('+response+')'); // Display image element
					sessionStorage.setItem("tempImg", response);
                }else{
                    alert('some thing went wrong !');
                }
            },
        });
    

   }
   
   update_profile(){
	   
	   var endpoint = 'user/account/profile/update';
	   //var endpoint = 'user/account/profile/details';
	   var user = JSON.parse(sessionStorage.getItem("user"));
	   var profile_pic = sessionStorage.getItem("tempImg");
	   //var auth = user.data.fcm_token;
	   var auth = user.success.token;
	   console.log(auth);
	   
	   var email  = $('#email').val();
	   var full_name = $('#full_name').val();
	   var country =  $('#country').val();
	   var password = sessionStorage.getItem("password");
	    $.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,email:email,full_name:full_name,country:country,profile_pic:profile_pic,auth:auth,password:password},
        dataType: "json",
        success:function(result){
            console.log(result);
			$('#updateprofilesuccess').modal();
			
			
        //(result.data);
  
		  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
	   
	   
   }
   
   
   getProfile(){
	   
	   //var endpoint = 'user/account/profile/update';
	   var endpoint = 'user/account/profile/details';
	   var user = JSON.parse(sessionStorage.getItem("user"));
	   var profile_pic = sessionStorage.getItem("tempImg");
	   //var auth = user.data.fcm_token;
	   var auth = user.success.token;
	   console.log(auth);
	   
	   var email  = $('#email').val();
	   var full_name = $('#full_name').val();
	   var country =  $('#country').val();
	   var password = sessionStorage.getItem("password");
	    $.ajax({
        url: Config.baseurl,
        type: "POST",
        crossDomain: true,
        data: {endpoint:endpoint,auth:auth},
        dataType: "json",
        success:function(result){
            console.log(result);
			//$('#updateprofilesuccess').modal();
			
			
        //(result.data);
  
		  
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
   }
   
   
 
  render() {
	 
	
	  
    return (
	  
	    
        
        <div>
        {/*Invite User via WayaChat*/}
        <div className="modal fade contactlist" id="inviteWayaChats" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Invite User WayaChat</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <div id>
                  <span className="text-muted">eg John Doe</span>
                  <div className="clearfix" />
                  <br />
                  <ul className="list-group pull-down" id="contact-list">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                          <h4 className="name lead"> <span className="mdi mdi-account text-success " title="online now" />
                            Mike Anamendolla</h4>
                          <span className="mdi mdi-phone  text-muted" data-toggle="tooltip" title data-original-title="5842 Hillcrest Rd" />
                          <span className="text-muted">(870) 288-4149</span>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center text-sm-left">
                          <button type="button" className="btn  btn-sm btn-success btn-icon-text">
                            INVITE </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                          <h4 className="name lead"> <span className="mdi mdi-account text-success " title="online now" />
                            Mike Anamendolla</h4>
                          <span className="mdi mdi-phone  text-muted" data-toggle="tooltip" title data-original-title="5842 Hillcrest Rd" />
                          <span className="text-muted">(870) 288-4149</span>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center text-sm-left">
                          <button type="button" className="btn btn-sm btn-success btn-icon-text">
                            INVITE </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                          <h4 className="name lead"> <span className="mdi mdi-account text-success " title="online now" />
                            Mike Anamendolla</h4>
                          <span className="mdi mdi-phone  text-muted" data-toggle="tooltip" title data-original-title="5842 Hillcrest Rd" />
                          <span className="text-muted">(870) 288-4149</span>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center text-sm-left">
                          <button type="button" className="btn  btn-sm btn-sm btn-success btn-icon-text">
                            INVITE </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                          <h4 className="name lead"> <span className="mdi mdi-account text-success " title="online now" />
                            Mike Anamendolla</h4>
                          <span className="mdi mdi-phone  text-muted" data-toggle="tooltip" title data-original-title="5842 Hillcrest Rd" />
                          <span className="text-muted">(870) 288-4149</span>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center text-sm-left">
                          <button type="button" className="btn  btn-sm btn-sm btn-success btn-icon-text">
                            INVITE </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="attachment" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">attachment</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3 template-demo">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-outline-secondary btn-icon-text">
                    <i className=" mdi mdi-camera  btn-icon-append" /> Camera
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-icon-text">
                    <i className=" mdi mdi-youtube  btn-icon-append" /> Video
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-icon-text">
                    <i className=" mdi mdi-file  btn-icon-append" /> File
                  </button>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-outline-secondary btn-icon-text"> <i className=" mdi mdi-phone  btn-icon-append" /> Voice Call
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-icon-text">
                    <i className=" mdi mdi-video  btn-icon-append" /> Video Call
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-icon-text">
                    <i className="mdi mdi-repeat   btn-icon-append" /> Transfer
                  </button></div>
              </div>
            </div>
          </div>
        </div>
        {/*Profile Modal*/}
        <div className="modal fade" id="QRModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Profile QR Code</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3 text-center">
                <img src="assets/images/barcode.jpg" className="img-responsive" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="paywithphoneNo" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Transfer to Phone</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <p>
                  Send money to , They would recieve an SMS of your Transfer and once
                  they sign in/sign up to Waya the money would be deposited into their wallet
                </p>
                <form>
                  <div className="form-label-group">
                    <input type="text" className="form-control form-control-lg" id="label-surname" placeholder="Mobile Number" />
                    <label htmlFor="label-surname">Mobile Number</label>
                  </div>
                  <div className="form-label-group">
                    <table className="table">
                      <tbody><tr>
                          <td>
                            <span>Transfer Amount</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2>N</h2>
                          </td>
                          <td>
                            <h2>0.00</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Charge: N20.00
                          </td>
                          <td>
                            Total: N20.0
                          </td>
                        </tr>
                      </tbody></table>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-gradient-primary btn-lg btn-block">Send NGN 0.00 to</button>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Setting model*/}
        <div className="modal fade" id="profileSettings" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">My Profile</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <form>
                  <div className="avatar-upload">
                    <div className="avatar-edit">
                      <input type="file" id="imageUpload" name="file" onChange={this.upload_pic} accept=".png, .jpg, .jpeg" />
                      <label htmlFor="imageUpload" />
                    </div>
                    <div className="avatar-preview">
                      <div id="priview" style={{backgroundImage: 'url(assets/images/faces/face1.jpg)'}}>
                      </div>
                    </div>
                  </div>
				  <label>Full Name </label>
                  <div className="form-label-group">
				    
                    <input type="text" className="form-control form-control-lg" id="full_name" placeholder="Surname Name" />
                    
                  </div>
				  <label>Email</label>
                  <div className="form-label-group">
                    <input type="email" className="form-control form-control-lg" id="email" placeholder="Email" />
                    
                  </div>
				  <label>Country</label>
                  <div className="form-label-group">
                    <input type="text" className="form-control form-control-lg" id="country" placeholder="Phone number" />
                    
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-gradient-primary btn-lg btn-block" onClick={this.update_profile}>Edit Details</button>
              </div>
            </div>
          </div>
        </div>
        {/* Manage Password model*/}
        <div className="modal fade" id="managePassword" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Your Password is Required</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <form>
                  <div className="form-label-group">
				    <p>Current Password</p>
                    <input type="password" className="form-control form-control-lg" id="current_pass" placeholder="Current Password" />
                    
                  </div>
                  <div className="form-label-group">
				    <p> New Password </p>
                    <input type="password" className="form-control form-control-lg" id="new_pass" placeholder="New Password" />
                    
                  </div>
                  <div className="form-label-group">
				  <p>Confirm New Password</p>
                    <input type="password" className="form-control form-control-lg" id="conf_new_pass" placeholder="Confirm New Password" />
                    
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                
                <button onClick={this.getOtpWindow} className="btn btn-gradient-primary btn-lg ">Confirm</button>
              </div>
            </div>
          </div>
        </div>
        {/* SMS ALERT*/}
        <div className="modal fade" id="smsAlert" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">SMS Alert Charges</h4>
                <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <p>
                  This enables you receive SMS alerts for each
                  transaction, with you bearing SMS charge of N3 per sms
                </p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button onClick={this.resendOtp} className="btn btn-primary btn-lg btn-block">ENABLE SMS CHARGES</button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete ALERT*/}
        <div className="modal fade" id="deleteAccount" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Are You Sure you want to delete you account </h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
			  
			  
			  
	   	  
			  
			  
              <div className="modal-body mx-3">
                <form>
                  <p>
                    All your data will be cleared
                  </p>
                  <div className="form-label-group">
                    <input type="password" className="form-control form-control-lg" id="label-password" placeholder="Enter Password" />
                    <label htmlFor="label-password">Enter Password</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-gradient-danger btn-lg ">Cancel</button>
                <button className="btn btn-gradient-primary btn-lg ">Confirm &amp; Delete</button>
              </div>
            </div>
          </div>
        </div>
        {/* Post Setting*/}
        <div className="modal fade" id="postSettingModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Post Settings</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <form>
                  <div className="card-body bg-w">
                    <h4 className="card-title"> Post</h4>
                    <div className="wrapper  preview-thumbnail d-flex align-items-center py-2 border-bottom">
                      <i className=" mdi mdi-lead-pencil " />
                      <div className="wrapper ml-3">
                        <h6 className="ml-1 mb-1  mdi mdi-dots-horizontal"> </h6>
                        <small className="text-muted mb-0">
                          good</small>
                      </div>                
                    </div>
                    <div className="wrapper  preview-thumbnail d-flex align-items-center py-2 border-bottom">
                      <i className=" mdi mdi-lead-pencil " />
                      <div className="wrapper ml-3">
                        <h6 className="ml-1 mb-1  mdi mdi-dots-horizontal"> </h6>
                        <small className="text-muted mb-0">
                          good</small>
                      </div>                
                    </div>
                    <div className="wrapper  preview-thumbnail d-flex align-items-center py-2 border-bottom">
                      <i className=" mdi mdi-lead-pencil " />
                      <div className="wrapper ml-3">
                        <h6 className="ml-1 mb-1  mdi mdi-dots-horizontal"> </h6>
                        <small className="text-muted mb-0">
                          good</small>
                      </div>                
                    </div>
                    <div className="wrapper  preview-thumbnail d-flex align-items-center py-2 border-bottom">
                      <i className=" mdi mdi-lead-pencil " />
                      <div className="wrapper ml-3">
                        <h6 className="ml-1 mb-1  mdi mdi-dots-horizontal"> </h6>
                        <small className="text-muted mb-0">
                          good</small>
                      </div>                
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-gradient-danger btn-lg ">Cancel</button>
                <button className="btn btn-gradient-primary btn-lg ">Confirm &amp; Delete</button>
              </div>
            </div>
          </div>
        </div>
        {/*Logout Modal*/}
        <div className="modal fade" id="logoutAlert" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Are you sure you want to Logout</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-gradient-danger btn-sm" data-dismiss="modal">Cancel</button>
                <button className="btn btn-primary btn-sm " onClick={this.logout}>Sure</button>
              </div>
            </div>
          </div>
        </div>
		
		 <div className="modal fade" id="updateprofilesuccess" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Your profile details has been updated . </h4>
                <button type="button" onClick={this.updateOk} className="close" data-dismiss="modal" aria-label="Close">
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
                <h4 className="modal-title w-100 font-weight-bold">Enter OTP</h4>
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
                
                <button onClick={this.changePassword} className="btn btn-gradient-primary btn-lg ">Confirm</button>
              </div>
            </div>
          </div>
        </div>	
		
		
		
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
		
				
              
      </div>
      
    );
  }
}
 
export default Models;

