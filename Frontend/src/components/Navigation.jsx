import React, { Component } from 'react';
import NavBar from '../components/layouts/NavBar';
import Main from '../components/Main';
import { getUserInfo, getCookieData } from '../utils/CommonFunction'

export default class Navigation extends Component {

    componentDidMount() {
        var user = getCookieData("user_info=");

        if (user === null) {
            getUserInfo();
        }
    }
    render() {
        return (
            <div id="page-wrapper" className="gray-bg dashbard-1 ownheight">
                <NavBar />
                <Main />
            </div>
        )
    }
}