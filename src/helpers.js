import React, { Component } from "react";

import $ from 'jquery';
import Popper from 'popper.js';
import Config from './config.js';

class Functions extends Component {
	
static printError(obj) {
 var string = ''; 
  
                for(var prop in obj) { 
                    if(typeof obj[prop] == 'string') { 
                        string+= prop + ': ' + obj[prop]+'; </br>'; 
                    } 
                    else { 
                        string+=   obj[prop] + "<br>"; 
                    } 
                } 
  
                return string; 
}


  static verifyOtp(otp,phone){
		//alert('kkk');
		
		
	}
	
	static getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


}
export default Functions;