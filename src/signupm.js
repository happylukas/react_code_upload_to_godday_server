import React, { Component } from "react";

import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';

class Signupm extends Component {

  switch_registration() {
    if ($('#checkmerchant').is(":checked")) {
      window.location = "/signup";
    }
    else {
      window.location = "/signupm";
    }
  }

  render() {
    return (

      <div>
        <title>WAYA : Register</title>
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
                    <h6 className="font-weight-light">Signup Merchent</h6>
                    <div className="form-check form-check-info">
                      <label className="form-check-label">
                        <input type="checkbox" onClick={this.switch_registration} className="form-check-input" id="checkmerchant" /> I am not Merchant <i className="input-helper" /></label>
                    </div>
                    <form className="pt-3" id="not_merchant">
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
                        <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="index.html">SIGN UP</a>
                      </div>
                      <div className="text-center mt-4 font-weight-light"> Not a new User ? Login<a href="index.html" className="text-primary">Here</a>
                      </div>
                    </form>
                    <form className="pt-3 hide" id="merchant">
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-mname" placeholder="Merchant Name" />
                        <label htmlFor="label-mname">Merchant Name</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-msurname" placeholder="Surname Name" />
                        <label htmlFor="label-msurname">Surname Name</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-mfname" placeholder="First Name" />
                        <label htmlFor="label-mfname">First Name</label>
                      </div>
                      <div className="form-label-group">
                        <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                          <option>Please choose a nationality</option>
                          <option>United States of America</option>
                          <option>United Kingdom</option>
                          <option>India</option>
                          <option>Germany</option>
                          <option>Argentina</option>
                        </select>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-mphone" placeholder="Mobile number" />
                        <label htmlFor="label-mphone">Mobile number</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-state" placeholder="State/Region/Province" />
                        <label htmlFor="label-state">State/Region/Province</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-city" placeholder="City" />
                        <label htmlFor="label-city">City</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-street" placeholder="Street" />
                        <label htmlFor="label-street">Street</label>
                      </div>
                      <div className="form-label-group">
                        <input type="text" className="form-control form-control-lg" id="label-mpassword" placeholder="Password" />
                        <label htmlFor="label-mpassword">Password</label>
                      </div>
                      <div className="form-label-group">
                        <input type="password" className="form-control form-control-lg" id="label-mcpassword" placeholder="Confirm Password" />
                        <label htmlFor="label-mcpassword">Confirm Password</label>
                      </div>
                      <div className="mt-3">
                        <a className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="index.html">SIGN UP</a>
                      </div>
                      <div className="text-center mt-4 font-weight-light"> Not a new User ? Login<a href="index.html" className="text-primary">Here</a>
                      </div>
                    </form>
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
      </div>
    );
  }
}

export default Signupm;

