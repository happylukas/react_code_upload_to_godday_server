import React, { Component } from "react";

import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';
import Functions from './helpers.js';
import ReactHtmlParser from 'react-html-parser';

class Gram extends Component {

  constructor(props) {
    super(props);
    this.state = {
      all_posts: []
    }
  }

  componentDidMount() {
    this.get_all_posts();
  }

  get_all_posts = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let auth = user.success.token;
    let endpoint = 'user/social/posts/all';
    let url = Config.baseurl2;
    let html = '';
    let request_type = 'GET';
    $.ajax(url, {
      method: 'POST',
      dataType: "json",
      data: { endpoint: endpoint, request_type: request_type, auth: auth },
      success: this.load_data,
      error: function (xhr, status, error) {
        alert(status);
      }
    });
  }

  load_data = (result) => {
    this.setState({ all_posts: JSON.parse(result).data });
  }

  isJSON = (data) => {
    var ret = true;
    try {
       JSON.parse(data);
    }catch(e) {
       ret = false;
    }
    return ret;
 }

  render() {
    console.log(this.state.all_posts);
    return (
      <div>
        {/* partial */}
        <div className="main-panel" style={{ width: "175%" }}>
          <div className="content-wrapper">
            <div className="col-md-12">
              <h1 className="mb-0 ml-1 text-center">Waya Gram </h1>
              <br />
              <br />
              <div className=" template-demo pull-right">
                <br />
                <button type="button" className="btn btn-social-icon btn-youtube btn-rounded " data-toggle="modal" data-target="#searchpeople"><i className="mdi mdi-account-search" /></button>
                <button type="button" className="btn btn-gradient-danger" data-toggle="modal" data-target="#posttextmodal">POST</button>
              </div>
            </div>
            <div className="btn-group" id="wayagramUsers" role="group" aria-label="Basic example">
              <button type="button" className="btn ">
                <img className="rounded-circle" src="assets/images/faces/face1.jpg" alt="" width={45} />
                <i className="mdi mdi-plus btnbottom text-white" data-toggle="modal" data-target="#mometnmodal" />
              </button>
              <button type="button" className="btn " data-toggle="modal" data-target="#postmodal">
                <img className="rounded-circle" src="assets/images/faces/face1.jpg" alt="" width={45} /> <br /> Daniel
              </button>
              <button type="button" className="btn" data-toggle="modal" data-target="#postmodal">
                <img className="rounded-circle" src="assets/images/faces/face1.jpg" alt="" width={45} /> <br /> Daniel
              </button>
              <button type="button" className="btn " data-toggle="modal" data-target="#postmodal">
                <img className="rounded-circle" src="assets/images/faces/face1.jpg" alt="" width={45} /> <br /> Daniel
              </button>
            </div>
            <div className="clearfix">
            </div>
            <br />
            {/*- \\\\\\\Post*/}
            {this.state.all_posts.map(element => {
              return (
                <div className="card gedf-card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                          <a href="editProfile.html"><img src={element.user ? element.user.profile_pic : 'http://emilcarlsson.se/assets/danielhardman.png'} alt="" /></a>
                        </div>
                        <div className="ml-2">
                          <div className="h5 m-0">{element.user ? element.user.first_name : ''}</div>
                          <div className="h7 text-muted">{element.user ? element.user.full_name : ''}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="h7 text-muted">{this.isJSON(element.body)?JSON.parse(element.body).title:element.title}</div><br />
                    <div className="thumbnail">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="mr-2">
                            <a href="editProfile.html"><img src={element.user ? element.user.profile_pic : 'http://emilcarlsson.se/assets/danielhardman.png'} alt="" /></a>
                          </div>
                          <div className="ml-2">
                            <div className="h5 m-0">{element.user ? element.user.first_name : ''}</div>
                            <div className="h7 text-muted">{element.user ? element.user.full_name : ''}</div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted" style={{ fontSize: '12px' }}>{element.updated_at}</span>
                        </div>
                      </div>
                      <div className="card-body">
                        {element.post_images[0]&&<img src={element.post_images[0]?element.post_images[0].image_url:''} alt="" style={{width:"200px", height:"150px"}}/>}
                        <p>{this.isJSON(element.body)?JSON.parse(element.body).body:element.body}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <a href className="text-danger">
                      <i className="mdi mdi-heart-outline icon-md" />
                    </a>
                    <div className="dropdown chatdrp " style={{ display: 'inline' }}>
                      <a className="chatlogo icon-md dropdown-toggle" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="mdi mdi-refresh" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                        <a className="dropdown-item" href="#">Repost</a>
                        <a className="dropdown-item" href="#">Repost with Comment</a>
                      </div>
                    </div>
                    <a href className="pull-right"><i className="mdi icon-md mdi-share-variant " /></a>
                  </div>
                </div>
              )
            })}

            {/* Post /////*/}
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* main-panel ends */}
        {/* page-body-wrapper ends */}
        {/* container-scroller */}
        {/*Post Modal*/}
        <div className="modal fade" id="postmodal" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content bgimg ">
              <div className="modal-body mx-3 template-demo">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <button type="button" className="btn btn-round">
                  <img className="rounded-circle" src="assets/images/faces/face1.jpg" alt="" width={45} />
                  <span className="text-white">Waya Official</span>
                </button>
                <p className="bottom text-white">How has your day been?</p>
              </div>
            </div>
          </div>
        </div>
        {/*New Moment*/}
        <div className="modal fade" id="mometnmodal" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content  ">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">New Moment</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3 template-demo">
                <textarea className="form-control border-0 h-100" rows={15} defaultValue={"Type Something...."} />
              </div>
              <div className="modal-footer">
                <hr />
                <button className="btn btn-gradient-danger btn-rounded btn-icon">
                  <i className="mdi mdi-camera" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*New Post*/}
        <div className="modal fade" id="posttextmodal" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content  ">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">New Post</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3 template-demo">
                <textarea className="form-control border-0 h-100" rows={15} id="inputPost" defaultValue={"Type Something...."} />
              </div>
              <div className="modal-footer">
                <hr />
                <button className="hide btn btn-post btn-sm" id="btnpost">
                  Upload Post
                </button>
                <button className="btn btn-dark btn-rounded btn-icon">
                  <i className="mdi mdi-camera" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Search People */}
        <div className="modal fade" id="searchpeople" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content  ">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Search</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3 template-demo">
                <div id="custom-search-input" className="postlist ">
                  <div className="input-group col-md-12">
                    <input id="contactsearch" type="text" className="form-control input-lg" placeholder="Search..." />
                    <span className="input-group-btn">
                      <button className="btn btn-primary btn-lg" type="button">
                        <i className="mdi mdi-account-search" />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="full-width-tabs">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home-1" role="tab" aria-controls="home" aria-selected="true">PEOPLE</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile-1" role="tab" aria-controls="profile" aria-selected="false">POST</a>
                    </li>
                  </ul>
                  <div className="tab-content contactlist">
                    <div className="tab-pane fade show active" id="home-1" role="tabpanel" aria-labelledby="home-tab">
                      <div className="media">
                        <div className="media-body">
                          <div className="errormsg text-center p-3">
                            <i className=" mdi mdi-block-helper text-center" />
                            <p className="text-center">No result</p>
                          </div>
                          <ul className="list-group">
                            <li className="contact list-group-item">
                              <div className="row">
                                <div className="col col-md-2">
                                  <a href="follower.html"> <img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" /></a>
                                </div>
                                <div className="col">
                                  <h4 className="name m-0">Jonathan</h4>
                                  <span>@judenathan</span>
                                </div>
                                <div className="col">
                                  <button className="btn btn-warning btn-sm pull-right follow">Follow</button>
                                </div>
                              </div>
                            </li>
                            <li className="contact list-group-item">
                              <div className="row">
                                <div className="col col-md-2">
                                  <a href="follower.html"> <img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" /></a>
                                </div>
                                <div className="col">
                                  <h4 className="name m-0">Daniel Hardman</h4>
                                  <span>@judenathan</span>
                                </div>
                                <div className="col">
                                  <button className="btn btn-warning btn-sm pull-right follow">Follow</button>
                                </div>
                              </div>
                            </li>
                            <li className="contact list-group-item">
                              <div className="row">
                                <div className="col col-md-2">
                                  <a href="follower.html"> <img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" /></a>
                                </div>
                                <div className="col">
                                  <h4 className="name m-0">Daniel Jonatha</h4>
                                  <span>@judenathan</span>
                                </div>
                                <div className="col">
                                  <button className="btn btn-warning btn-sm pull-right follow">Follow</button>
                                </div>
                              </div>
                            </li>
                            <li className="contact list-group-item">
                              <div className="row">
                                <div className="col col-md-2">
                                  <a href="fallowing.html"><img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" /></a>
                                </div>
                                <div className="col">
                                  <h4 className="name m-0">Jonathan Daniel</h4>
                                  <span>@judenathan</span>
                                </div>
                                <div className="col">
                                  <button className="btn btn-success btn-sm pull-right following">Following</button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="profile-1" role="tabpanel" aria-labelledby="profile-tab">
                      <div className="media">
                        <div className="media-body">
                          <ul className="list-group">
                            <li className="contact list-group-item">
                              <div className="card gedf-card list-group-item">
                                <div className="card-header">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="mr-2">
                                        <img className="rounded-circle" width={45} src="assets/images/faces/face1.jpg" alt="" />
                                      </div>
                                      <div className="ml-2">
                                        <div className="h5 m-0">Daniel</div>
                                        <div className="h7 text-muted">Miracles Lee Cross</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="h7 text-muted">test</div><br />
                                  <div className="thumbnail">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="mr-2">
                                          <img className="rounded-circle" width={45} src="assets/images/faces/face1.jpg" alt="" />
                                        </div>
                                        <div className="ml-2">
                                          <div className="h5 m-0">Daniel</div>
                                          <div className="h7 text-muted">Miracles Lee Cross</div>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="text-muted" style={{ fontSize: '12px' }}>about a month ago</span>
                                      </div>
                                    </div>
                                    <div className="card-body">
                                      <p>This is test</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-footer">
                                  <a href className="text-danger">
                                    <i className="mdi mdi-heart-outline icon-md" />
                                  </a>
                                  <div className="dropdown chatdrp " style={{ display: 'inline' }}>
                                    <a className="chatlogo icon-md dropdown-toggle" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="mdi mdi-refresh" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                      <a className="dropdown-item" href="#">Repost</a>
                                      <a className="dropdown-item" href="#">Repost with Comment</a>
                                    </div>
                                  </div>
                                  <a href className="pull-right"><i className="mdi icon-md mdi-share-variant " /></a>
                                </div>
                              </div>
                            </li>
                            <li className="contact list-group-item">
                              <div className="card gedf-card list-group-item">
                                <div className="card-header">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="mr-2">
                                        <img className="rounded-circle" width={45} src="assets/images/faces/face1.jpg" alt="" />
                                      </div>
                                      <div className="ml-2">
                                        <div className="h5 m-0">Jonathan</div>
                                        <div className="h7 text-muted">Miracles</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="h7 text-muted">test</div><br />
                                  <div className="thumbnail">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="mr-2">
                                          <img className="rounded-circle" width={45} src="assets/images/faces/face1.jpg" alt="" />
                                        </div>
                                        <div className="ml-2">
                                          <div className="h5 m-0">Daniel</div>
                                          <div className="h7 text-muted">Jonathan</div>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="text-muted" style={{ fontSize: '12px' }}>about a month ago</span>
                                      </div>
                                    </div>
                                    <div className="card-body">
                                      <p>This is test</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-footer">
                                  <a href className="text-danger">
                                    <i className="mdi mdi-heart-outline icon-md" />
                                  </a>
                                  <div className="dropdown chatdrp " style={{ display: 'inline' }}>
                                    <a className="chatlogo icon-md dropdown-toggle" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="mdi mdi-refresh" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                      <a className="dropdown-item" href="#">Repost</a>
                                      <a className="dropdown-item" href="#">Repost with Comment</a>
                                    </div>
                                  </div>
                                  <a href className="pull-right"><i className="mdi icon-md mdi-share-variant " /></a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <hr />
                <button className="btn btn-gradient-danger btn-rounded btn-icon">
                  <i className="mdi mdi-camera" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gram;

