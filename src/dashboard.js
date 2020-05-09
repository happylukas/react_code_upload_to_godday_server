import React, { Component } from "react";

import Config from './config.js';
import Mid from "./mid.js";
import Models from "./models.js";
import $ from 'jquery';
import Popper from 'popper.js';




class Dashboard extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>

				<Mid />
				<Models />

			</div>

		);
	}
}

export default Dashboard;

