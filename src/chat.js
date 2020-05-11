import React, { Component } from "react";


import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import queryString from './query-string.js';
import Functions from './helpers.js';
import ReactHtmlParser from 'react-html-parser';



class Chat extends Component {

  state = {
    all_users: '',
    my_name: '',
    my_pic: '',
    rec_id: 0,
    fetched_data: []
  }

  constructor(props) {
    super(props);


    this.fetchChat = this.fetchChat.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.loadUsersChat = this.loadUsersChat.bind(this);
  }



  componentDidUpdate(prevProps) {


    var q1 = Functions.getUrlVars()["id"];
    var fn = Functions.getUrlVars()["fn"];
    var pp = Functions.getUrlVars()["pp"];

    //alert(q1);

    if (q1 != null) {


      this.fetchChat(q1, fn, pp);

    }


  }

  componentDidMount() {

    var q1 = Functions.getUrlVars()["id"];
    var fn = Functions.getUrlVars()["fn"];
    var pp = Functions.getUrlVars()["pp"];


    //alert(q1);

    if (q1 != null) {


      this.fetchChat(q1, fn, pp);



    }

    let user = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ my_name: user.data.full_name });
    this.setState({ my_pic: user.data.profile_pic });
    //console.log('AAAAAAAAA',JSON.parse(sessionStorage.getItem("all_users")));
    this.loadUsers();

  }

  loadUsers() {
    let self = this;
    let user = JSON.parse(sessionStorage.getItem("user"));
    let auth = user.success.token;
    let endpoint = 'user/chat/all_users';
    let url = Config.baseurl2;
    let html = '';
    let request_type = 'GET';
    $.ajax(url, {
      method: 'POST',
      dataType: "json",
      data: { endpoint: endpoint, request_type: request_type, auth: auth },
      success: this.loadUsersChat,
      error: function (xhr, status, error) {
        alert(status);
      }
    });
  }

  loadUsersChat(result) {

    let html = '';
    let all_users = JSON.parse(result);
    console.log('ALL USERS', result);
    this.setState({ fetched_data: all_users.data });
    sessionStorage.setItem("all_users", JSON.stringify(all_users));



    $.each(all_users.data.reverse(), function (index, element) {

      let name_arr = element.full_name.split(" ");
      let alfa1 = element.full_name.charAt(0);
      let alfa2 = name_arr[1].charAt(0);
      let a1 = alfa1.toUpperCase();
      let a2 = alfa2.toUpperCase();
      let selid = element.phone + "_" + element.full_name + "_" + element.id;
      let mes = '';
      let cid = 0;
      if (element.messages.length) {
        mes = element.messages[element.messages.length - 1].message;
        cid = element.messages[element.messages.length - 1].conversation_id;
      }


      html += '<a style="color: inherit;text-decoration: none !important;" href="/dashboard#/chat?id=' + cid + '&rec_id=' + element.id + '&fn=' + element.full_name + '&pp=' + element.profile_pic + '" >' +

        '<li class="contact">' +
        '<div class="wrap">' +
        '<span class="contact-status online" ></span>' +
        '<img src="' + element.profile_pic + '" alt="" />' +
        '<div class="meta">' +
        '<p class="name">' + element.full_name + '</p>' +
        '<p class="preview">' + mes + '</p>' +
        '</div>' +
        '</div>' +
        '</li></a>';


    });
    //$(document).on("click", "a.selectU" , function() {
    //self.selectUserMobile(this.id);
    //});

    this.setState({ all_users: html });
    //console.log('PAYMENT USERS ',all_users);
  }

  searchName_ID = (e) => {
    let html = '';
    let new_array = [];
    this.state.fetched_data.map(element => {
      if (element.full_name.toLowerCase().includes(e.target.value.toLowerCase())) new_array.push(element);
      else if (element.id === e.target.value) new_array.push(element);
    });
    $.each(new_array.reverse(), function (index, element) {


      let name_arr = element.full_name.split(" ");
      let alfa1 = element.full_name.charAt(0);
      let alfa2 = name_arr[1].charAt(0);
      let a1 = alfa1.toUpperCase();
      let a2 = alfa2.toUpperCase();
      let selid = element.phone + "_" + element.full_name + "_" + element.id;
      let mes = '';
      let cid = 0;
      if (element.messages.length) {
        mes = element.messages[element.messages.length - 1].message;
        cid = element.messages[element.messages.length - 1].conversation_id;
      }


      html += '<a style="color: inherit;text-decoration: none !important;" href="/dashboard#/chat?id=' + cid + '&rec_id=' + element.id + '&fn=' + element.full_name + '&pp=' + element.profile_pic + '" >' +

        '<li class="contact">' +
        '<div class="wrap">' +
        '<span class="contact-status online" ></span>' +
        '<img src="' + element.profile_pic + '" alt="" />' +
        '<div class="meta">' +
        '<p class="name">' + element.full_name + '</p>' +
        '<p class="preview">' + mes + '</p>' +
        '</div>' +
        '</div>' +
        '</li></a>';


    });
    //$(document).on("click", "a.selectU" , function() {
    //self.selectUserMobile(this.id);
    //});

    this.setState({ all_users: html });
  }









  fetchChat(id, fn, pp) {

    var endpoint = 'user/chat/view_user_messages';
    var user = JSON.parse(sessionStorage.getItem("user"));
    var auth = user.success.token;
    var request_type = 'POST';
    var user_id = user.data.id;
    var my_pic = user.data.profile_pic;

    var conversation_id = id;
    //html.text = "";

    $('#rec_name').html(decodeURI(fn));
    $("#rec_img").attr('src', pp);

    $.ajax({
      url: Config.baseurl2,
      type: "POST",
      crossDomain: true,
      data: { endpoint: endpoint, request_type: request_type, auth: auth, conversation_id: conversation_id },
      dataType: "json",
      success: function (result) {

        if (conversation_id != 0) {
          var chats = JSON.parse(result);

          //console.log("CHAT LENGTH", chats.data.length);

          console.log("CHAT", chats.data);

          if (chats != null) {
            var message_length = chats.data.length;
            var html = '';



            $.each(chats.data, function (index, element) {
              console.log("mes", element.message);

              if (element.sender_id == user_id) {
                html += '<ul>' +
                  '<li class="sent">' +
                  '<img src="' + pp + '" alt="" />' +
                  '<p>' + element.message +
                  '<small><br />10:30 pm</small>' +
                  '</p>' +
                  '</li>' +
                  '</ul>';
              }
              else {

                html += '<ul>' +
                  '<li class="replies">' +
                  '<img src="' + my_pic + '" alt="" />' +
                  '<p>' + element.message +
                  '<small><br />10:30 pm</small>' +
                  '</p>' +
                  '</li>' +
                  '</ul>';

              }



            });

          }




          $('#chat_streams').html(html);
          //alert(id);
        }

        else {

          $('#chat_streams').html("");
        }

      },
      error: function (xhr, status, error) {
        alert(status);
      }
    });




  }


  sendMessage() {
    var self = this;
    var rec_id = Functions.getUrlVars()["rec_id"];
    var q1 = Functions.getUrlVars()["id"];
    var fn = Functions.getUrlVars()["fn"];
    var pp = Functions.getUrlVars()["pp"];
    var pic = '';

    var endpoint = 'user/chat/new_message';
    var user = JSON.parse(sessionStorage.getItem("user"));
    var auth = user.success.token;
    var request_type = 'POST';
    var user_id = user.data.id;
    var msg = $('#msgtext').val();
    $.ajax({
      url: Config.baseurl2,
      type: "POST",
      crossDomain: true,
      data: { endpoint: endpoint, request_type: request_type, auth: auth, receiver_id: rec_id, message: msg, image_url: pic },
      dataType: "json",
      success: function (result) {
        console.log("CHAT RESULT ........", result);
        self.fetchChat(q1, fn, pp);
        $('#msgtext').val('');

      },
      error: function (xhr, status, error) {
        alert(status);
      }
    });


  }

  render() {
    return (
      <div className="main-panel" style={{ width: "calc(100% - -29px)" }}>

        <div className="content-wrapper">
          <div className="col-md-4 d-flex align-items-center">
            <div className="d-flex flex-row align-items-center">
              <button type="button" className="btn btn-social-icon btn-youtube btn-rounded " data-toggle="modal" data-target="#exploreChats"><i className="mdi mdi-account-search" /></button>
              <h1 className="mb-0 ml-1">Chat </h1>
            </div>
          </div>
          <h1 className="text-center">
          </h1>
          <div className="clearfix" />
          <br />
          <div id="frame">
            <div id="sidepanel">
              <div id="profile">
                <div className="wrap">
                  <img id="profile-img" src={this.state.my_pic} className="online" alt="" />
                  <p>{this.state.my_name}</p>
                </div>
              </div>
              <div id="search">
                <label htmlFor><i className="mdi mdi-account-search" aria-hidden="true" /></label>
                <input type="text" placeholder="Search Name/Waya ID" onChange={this.searchName_ID} />
              </div>
              <div id="contacts">
                <ul>
                  {ReactHtmlParser(this.state.all_users)}
                </ul>
              </div>
            </div>
            <div className="content" style={{ width: '49%' }}>
              <div className="contact-profile">
                <img id="rec_img" src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                <p id="rec_name">Harvey Specter</p>
                <div className="social-media">
                  <button type="button" className="btn btn-primary btn-rounded btn-icon btn-sm">
                    <i className="mdi mdi-phone" />
                  </button>
                  <button type="button" className="btn btn-primary btn-rounded btn-icon">
                    <i className="mdi mdi-video" />
                  </button>
                  <div className="chatdrp dropdown" style={{ display: 'inline' }}>
                    <button className="btn btn-primary chatlog btn-rounded btn-icon dropdown-toggle" id="chatlog" href="#" data-toggle="dropdown" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu navbar-dropdown" aria-labelledby="chatlog">
                      <a className="dropdown-item" href="#">
                        Clear Chats </a>
                    </div>
                  </div>
                </div>
              </div>


              <div className="messages" id="chat_streams">
                <ul>
                  <li className="sent">
                    <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                    <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!
                      <small><br />10:30 pm</small>
                    </p>
                  </li>
                  <li className="replies">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>When you're backed against the wall, break the god damn thing down. <small><br />10:30
                        pm</small></p>
                  </li>
                  <li className="replies">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>Excuses don't win championships. <small><br />10:30 pm</small></p>
                  </li>
                  <li className="sent">
                    <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                    <p>Oh yeah, did Michael Jordan tell you that?
                      <small><br />10:30 pm</small>
                    </p>
                  </li>
                  <li className="replies">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>No, I told him that.
                      <small><br />10:30 pm</small>
                    </p>
                  </li>
                  <li className="replies">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>What are your choices when someone puts a gun to your head?
                      <small><br />10:30 pm</small>
                    </p>
                  </li>
                  <li className="sent">
                    <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                    <p>What are you talking about? You do what they say or they shoot you.</p>
                  </li>
                  <li className="replies">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any
                    one of a hundred and forty six other things.
                      <small><br />10:30 pm</small></p>
                  </li>
                </ul>
              </div>
              <div className="message-input">
                <div className="wrap">
                  <input type="text" id="msgtext" placeholder="Write your message..." />
                  <i className=" mdi mdi-paperclip attachment" aria-hidden="true" data-toggle="modal" data-target="#attachment" />
                  <button className="submit" onClick={this.sendMessage}><i className=" mdi mdi-telegram " aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-social-icon btn-youtube btn-rounded positionFix" data-toggle="modal" data-target="#inviteWayaChats"><i className="mdi mdi-plus-circle-outline" /></button>
        </div>
        {/* content-wrapper ends */}
      </div>


    );
  }
}

export default Chat;
