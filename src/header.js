import React, { Component } from "react";


class Header extends Component {


  render() {

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
                  <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-email-outline" /> Chats <i className="mdi mdi-chevron-down " />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Messages</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item" href="chat.html">
                      <div className="preview-thumbnail">
                        <img src="assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                        <p className="text-gray mb-0"> 1 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item" href="chat.html">
                      <div className="preview-thumbnail">
                        <img src="assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                        <p className="text-gray mb-0"> 15 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item" href="chat.html">
                      <div className="preview-thumbnail">
                        <img src="assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                        <p className="text-gray mb-0"> 18 Minutes ago </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="chat.html">
                      <h6 className="p-3 mb-0 text-center">4 new messages</h6>
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
                    <a href="contact.html">
                      <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                    </a>
                  </div>
                </li>
                <li className="nav-item nav-logout d-none d-lg-block">
                  <a className="nav-link" href="wayagram.html">
                    <i className=" mdi mdi-window-maximize " /> Waya Gram
                  </a>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                  <a className="nav-link" href="wayapay.html">
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
                      <img src="assets/images/faces/face1.jpg" alt="profile" />
                      <span className="login-status online" />
                      {/*change to offline or busy as needed*/}
                    </div>
                    <div className="nav-profile-text d-flex flex-column">
                      <span className="font-weight-bold mb-2">Jude Jonathan</span>
                      <span className="text-secondary text-small">ID:77FFFF0TGDVB</span>
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
                  <a className="nav-link" href="notification.html">
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
                    <span className="menu-title">Log Out</span>
                    <i className=" mdi mdi-logout  menu-icon" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

