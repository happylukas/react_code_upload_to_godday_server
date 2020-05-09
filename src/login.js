import React, { Component } from "react";
import Signup from "./signup.js";
import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';




import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";



class Login extends Component {


  constructor(props, context) {
    super(props, context);

    this.loadUsers = this.loadUsers.bind(this);

  }


  // contextTypes: {
  //   router: React.PropTypes.func.isRequired,
  // };


  loadUsers() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let auth = user.success.token;
    let endpoint = 'user/chat/all_users';
    let url = Config.baseurl2;
    let request_type = 'GET';
    $.ajax(url, {
      method: 'POST',
      dataType: "json",
      data: { endpoint: endpoint, request_type: request_type, auth: auth },
      success: function (result) {

        //et all_users = JSON.parse(result);
        //console.log('ALL USERS',all_users);
        sessionStorage.setItem("all_users", JSON.stringify(result));

      },
      error: function (xhr, status, error) {
        alert(status);
      }
    });
  }

  dologin() {
    var self = this;
    var endpoint = 'user/auth/login';
    var phone = $('#tel').val();
    var password = $('#password').val();


    $.ajax({
      url: Config.baseurl,
      type: "POST",
      crossDomain: true,
      data: { endpoint: endpoint, phone: phone, password: password },
      dataType: "json",
      success: function (result) {
        //alert(result);
        var user = JSON.parse(result);
        console.log(user);
        if (user.success) {
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("phone", phone);
          console.log(sessionStorage.getItem("user"));

          window.location = 'dashboard#/chat';
        }
        else {
          if (user.error == true) {

            $("#errormessage").text('invalid login');
            $('#errormodel').modal();

          }
          else {

            $('#errormessage').text(user.error);
            $('#errormodel').modal();
            self.loadUsers();
          }
        }
        //(result.data);


      },
      error: function (xhr, status, error) {
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
                    <h4 className="text-center">Welcome Back, <br /> Jude</h4>
                    <form className="pt-3">
                      <div className="form-group">
                        <label htmlFor="label-mno">Phone number</label>
                        <input id="tel" type="tel" className="form-control form-control-lg" placeholder="Phone Number" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="label-password">Password</label>
                        <input type="password" className="form-control form-control-lg" id="password" placeholder="Password" />
                      </div>
                      <div className="mt-4 font-weight-light"> <a href="resetPassword.html" className="text-primary">Forgot
                          Password?</a>
                      </div>
                      <div className="mt-3">
                        <input type="button" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" onClick={this.dologin} value="Login" />
                      </div>
                      <div className="text-center mt-4 font-weight-light"> Need User ? Signup <a href="/signup" className="text-primary">Here</a>
                      </div>
                    </form>
                    <div id='result'></div>
                  </div>
                </div>
              </div>
            </div>
            {/* content-wrapper ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
        {/* endinject */}
        <div className="se-pre-con">
          <div className="col-md-12 text-center">
            <h1 className="display-1">WEL-COME WAYA</h1>
            <img src="assets/images/logo.png" />
          </div>
        </div>


        <div className="modal fade" id="errormodel" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 id="errormessage" className="modal-title w-100 font-weight-bold"></h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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

export default Login;