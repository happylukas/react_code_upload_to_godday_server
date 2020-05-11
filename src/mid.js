import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Chat from "./chat.js";
import Payment from "./payment.js";
import Notifications from "./notifications.js";
import Gram from "./wayagram.js";




import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import queryString from './query-string.js';
import Functions from './helpers.js';



class Mid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.loadChat = this.loadChat.bind(this);
    this.changeState = this.changeState.bind(this);
    //this.fetchChat = this.fetchChat.bind(this);
  }




  componentDidMount() {
    window.addEventListener('load', this.handleLoad);

    this.loadChat();


  }







  handleLoad() {



    var user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    if (user.error != "true") {

      $('#fname').text(user.data.full_name);
      $("#profile_image").attr("src", user.data.profile_pic);
      $('#userid').text(user.data.user_id);
    }
    else {
      window.location = '/login';
    }


  }


  loadChat() {

    var endpoint = 'user/chat/chat_list';
    var user = JSON.parse(sessionStorage.getItem("user"));
    var auth = user.success.token;
    var request_type = 'GET';
    var tata = "";
    //html.text = "";

    $.ajax({
      url: Config.baseurl2,
      type: "POST",
      crossDomain: true,
      data: { endpoint: endpoint, request_type: request_type, auth: auth },
      dataType: "json",
      success: this.changeState,
      error: function (xhr, status, error) {
        alert(status);
      }
    });

    //this.changeState(tata);

    //console.log("jhjhhjhjhjhjhjh",html.text);
  }

  dothis() {
    alert('ddddd');
  }

  changeState(result) {

    var res = JSON.parse(result);
    var html = "";
    var user = JSON.parse(sessionStorage.getItem("user"));
    var auth = user.success.token;
    var fn = '';
    var pp = '';
    console.log("USERRRRRRR", user.data.user_id);

    $.each(res.data.reverse(), function (index, element) {












      html += '<div class="dropdown-divider" />' +
        '<a class="dropdown-item preview-item" href="/dashboard#/chat?id=' + element.conversation_id + '&rec_id=' + element.id + '&fn=' + element.full_name + '&pp=' + element.profile_pic + '" >' +
        '<div class="preview-thumbnail">' +
        '<img src="' + element.profile_pic + '" alt="image" class="profile-pic" >' +
        '</div>' +
        '<div class="preview-item-content d-flex align-items-start flex-column justify-content-center">' +
        '<h6 class="preview-subject ellipsis mb-1 font-weight-normal">' + element.last_message + '</h6>' +
        '<p class="text-gray mb-0">' + element.full_name + '</p>' +
        '</div>' +
        '</a>';




    });



    $('#msg').html(html);

  }




  render() {

    if (sessionStorage.getItem("user") === null) {
      window.location = '/login';
    }
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user.error == true) {
      window.location = '/login';
    }
    return (

      <div>

        <div className="container-scroller">
          {/* partial:partials/_navbar.html */}
          <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="index.html">
                <img src="assets/images/logo.png" />
              </a>
              <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-menu" />
              </button>
              <div className="search-field d-none d-md-block">
              </div>


              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown">
                  <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" data-toggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-email-outline" /> Messages <i className="mdi mdi-chevron-down " />
                  </a>
                  <div style={{ "overflow-y": "scroll", "height": "360px" }} className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Messages</h6>
                    <div id="msg">
                      Wait Loading...
					</div>
                    <div className="dropdown-divider" />
                    <a href="chat.html">

                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                    <i className="mdi mdi-phone " /> Contacts <i className="mdi mdi-chevron-down " />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Contacts</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item" href="contact.html">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-phone" />
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">ABC Singh</h6>
                        <p className="text-gray ellipsis mb-0"> 123456789 </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item" href="contact.html">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-phone" />
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">ABC Singh</h6>
                        <p className="text-gray ellipsis mb-0"> 123456789 </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item" href="contact.html">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-phone" />
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">ABC Singh</h6>
                        <p className="text-gray ellipsis mb-0"> 123456789 </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="/dashboard#/notifications">
                      <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                    </a>
                  </div>
                </li>
                <li className="nav-item nav-logout d-none d-lg-block">
                  <a className="nav-link" href="/dashboard#/wayagram">
                    <i className=" mdi mdi-window-maximize " /> Waya Gram
                  </a>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                  <a className="nav-link" href="/dashboard#/wayapay">
                    <i className=" mdi mdi-currency-usd" /> Waya Pay
                  </a>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-menu" />
              </button>
            </div>
          </nav>
          {/* partial */}




          <div className="container-fluid page-body-wrapper">
            {/* partial:partials/_sidebar.html */}
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <ul className="nav">
                <li className="nav-item nav-profile">
                  <a href="#" className="nav-link">
                    <div className="nav-profile-image">
                      <img id="profile_image" src="assets/images/faces/face1.jpg" alt="profile" />
                      <span className="login-status online" />
                      {/*change to offline or busy as needed*/}
                    </div>
                    <div className="nav-profile-text d-flex flex-column">
                      <span id='fname' className="font-weight-bold mb-2">ddddd</span>
                      <span id='userid' className="text-secondary text-small">ID:77FFFF0TGDVB</span>
                    </div>
                    <i className="mdi mdi-barcode-scan nav-profile-badge" data-toggle="modal" data-target="#QRModal" />
                    <i className="mdi mdi-arrow-right-drop-circle " data-toggle="modal" data-target="#QRModal" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#ui-paymerchant" aria-expanded="false" aria-controls="ui-paymerchant">
                    <span className="menu-title">Pay Merchant</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-currency-usd menu-icon" />
                  </a>
                  <div className="collapse" id="ui-paymerchant">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href data-toggle="modal" data-target="#QRModal">Scan to Pay</a></li>
                      <li className="nav-item"> <a className="nav-link" data-toggle="modal" data-target="#paywithphoneNo" href>Pay
                          with Phone Number</a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <span className="menu-title">Settings</span>
                    <i className="menu-arrow" />
                    <i className=" mdi mdi-settings-box  menu-icon" />
                  </a>
                  <div className="collapse" id="ui-basic">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className="nav-link" href data-toggle="modal" data-target="#profileSettings">Profile Settings</a></li>
                      <li className="nav-item"> <a className="nav-link" data-toggle="modal" data-target="#managePassword" href>Manage Password</a></li>
                      <li className="nav-item"> <a className="nav-link" data-toggle="modal" data-target="#smsAlert" href>SMS Alert
                          Charges</a></li>
                      <li className="nav-item"> <a className="nav-link" href>Feedback</a></li>
                      <li className="nav-item"> <a className="nav-link" href>About </a></li>
                      <li className="nav-item"> <a className="nav-link" href data-toggle="modal" data-target="#deleteAccount">Delete Account </a></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard#/notifications">
                    <span className="menu-title">Notifications</span>
                    <i className="mdi mdi-bell-outline menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span className="menu-title" data-target="#postSettingModal" data-toggle="modal">Posts</span>
                    <i className="mdi mdi-format-list-bulleted menu-icon" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" data-target="#logoutAlert" data-toggle="modal">
                    <span className="menu-title" >Log Out</span>
                    <i className=" mdi mdi-logout  menu-icon" />
                  </a>
                </li>
              </ul>
            </nav>

            <div>

              <HashRouter>

                <div className="content">
				 <Route path="/wayagram" component={Gram} />
                  <Route path="/chat" component={Chat} />
                  <Route path="/wayapay" component={Payment} />
                  <Route path="/notifications" component={Notifications} />

                </div>

              </HashRouter>
            </div>


            {/* content-wrapper ends */}
          </div>
          {/* main-panel ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>










    );
  }
}

export default Mid;









