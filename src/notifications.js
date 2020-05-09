import React, { Component } from "react";


import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import queryString from './query-string.js';
import Functions from './helpers.js';
import ReactHtmlParser from 'react-html-parser';



class Notifications extends Component {
	
	state = {
		notifications : ''
    }
	constructor(props){
		super(props);
		
       this.handleLoad = this.handleLoad.bind(this); 
		
	}
	
	componentDidMount() {
            			 
			 this.handleLoad();
			 
			 
			 
 
    }
	
	
	handleLoad(){
		
	let user = JSON.parse(sessionStorage.getItem("user"));	   
	let auth = user.success.token;
	let endpoint = 'user/notification/all';
	
	let url = Config.baseurl2;
	let request_type = 'GET';
	let self = this;
	var html = '';
	  $.ajax(url, {
      method: 'POST',  
      dataType: "json",
	  data : {endpoint:endpoint,request_type:request_type,auth:auth},
	  success:function(result){
		 
		console.log("notification..........",result);
		
		let myreq = JSON.parse(result);
		$.each(myreq.data, function(index, element) {
			
			let dt = new Date(element.updated_at);
			let reqdate = dt.toLocaleString();
			
			if(element.is_for_admin == 0){
				
				html += '<li class="list">'+
                  '<div class="filter read">'+
                    '<div class>'+
                      '<h6>'+ element.title+'</h6>'+
                      '<p class="text-muted">'+element.content+'</p><p style="float:right">'+reqdate+'</P>'+
                    '</div>'+
                  '</div>'+
                '</li>';
				
			}
		});
		 self.setState({notifications:html});
	  },
	  error:function(xhr,status,error){
            //alert(status);
      }
    });
	
	
	}
	
	
	getAll()
	{
		
		let user = JSON.parse(sessionStorage.getItem("user"));	   
	let auth = user.success.token;
	let endpoint = 'user/notification/all';
	
	let url = Config.baseurl2;
	let request_type = 'GET';
	let self = this;
	var html = '';
	  $.ajax(url, {
      method: 'POST',  
      dataType: "json",
	  data : {endpoint:endpoint,request_type:request_type,auth:auth},
	  success:function(result){
		 
		console.log("notification..........",result);
		
		let myreq = JSON.parse(result);
		$.each(myreq.data, function(index, element) {
			
			let dt = new Date(element.updated_at);
			let reqdate = dt.toLocaleString();
			
			if(element.is_for_admin == 0){
				
				html += '<li class="list">'+
                  '<div class="filter read">'+
                    '<div class>'+
                      '<h6>'+ element.title+'</h6>'+
                      '<p class="text-muted">'+element.content+'</p><p style="float:right">'+reqdate+'</P>'+
                    '</div>'+
                  '</div>'+
                '</li>';
				
			}
		});
		 self.setState({notifications:html});
	  },
	  error:function(xhr,status,error){
            //alert(status);
      }
    });
	
		
	}
	
	
	getRead(){
		let user = JSON.parse(sessionStorage.getItem("user"));	   
	let auth = user.success.token;
	let endpoint = 'user/notification/mark_as_read';
	
	let url = Config.baseurl2;
	let request_type = 'POST';
	let self = this;
	var html = '';
	  $.ajax(url, {
      method: 'POST',  
      dataType: "json",
	  data : {endpoint:endpoint,request_type:request_type,auth:auth},
	  success:function(result){
		 
		console.log("notification..........",result);
		
		let myreq = JSON.parse(result);
		$.each(myreq.data, function(index, element) {
			
			let dt = new Date(element.updated_at);
			let reqdate = dt.toLocaleString();
			
			if(element.is_for_admin == 0){
				
				html += '<li class="list">'+
                  '<div class="filter read">'+
                    '<div class>'+
                      '<h6>'+ element.title+'</h6>'+
                      '<p class="text-muted">'+element.content+'</p><p style="float:right">'+reqdate+'</P>'+
                    '</div>'+
                  '</div>'+
                '</li>';
				
			}
		});
		 self.setState({notifications:html});
	  },
	  error:function(xhr,status,error){
            //alert(status);
      }
    });
	
		
		
	}
	
	
	getUnread(){
		
		let user = JSON.parse(sessionStorage.getItem("user"));	   
	let auth = user.success.token;
	let endpoint = 'user/notification/unread';
	
	let url = Config.baseurl2;
	let request_type = 'GET';
	let self = this;
	var html = '';
	  $.ajax(url, {
      method: 'POST',  
      dataType: "json",
	  data : {endpoint:endpoint,request_type:request_type,auth:auth},
	  success:function(result){
		 
		console.log("notification..........",result);
		
		let myreq = JSON.parse(result);
		$.each(myreq.data, function(index, element) {
			
			let dt = new Date(element.updated_at);
			let reqdate = dt.toLocaleString();
			
			if(element.is_for_admin == 0){
				
				html += '<li class="list">'+
                  '<div class="filter read">'+
                    '<div class>'+
                      '<h6>'+ element.title+'</h6>'+
                      '<p class="text-muted">'+element.content+'</p><p style="float:right">'+reqdate+'</P>'+
                    '</div>'+
                  '</div>'+
                '</li>';
				
			}
		});
		 self.setState({notifications:html});
	  },
	  error:function(xhr,status,error){
            //alert(status);
      }
    });
	
		
	}
	 
	
	
		
  render() {
    return (
        <div >
        <div className="content-wrapper" style={{width : "151%"}}>
          {/*  Way Pay Content */}
          <div align="center" id="notificationActive">
            <button className="btn btn-default filter-button" onClick={ ()=> this.getAll()} data-filter="all">All</button>
            <button className="btn btn-default filter-button" onClick={()=> this.getUnread()}  data-filter="unread">UnRead</button>
          </div>
          <div className="row ">
          </div>
          <div className="card card-default" id="card_contacts">
            <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" style={{}}>
              <ul className="list-group pull-down" id="contact-list">
                
				 {ReactHtmlParser(this.state.notifications)}
              </ul>
              {/*/contacts list*/}
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}
 
export default Notifications;
