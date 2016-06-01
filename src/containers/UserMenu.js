import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/driveAccess';

export class UserMenu extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {active: false};
    }

    handleClick() {
        let toggle = !this.state.active;
        console.log(toggle);
        this.setState({active: toggle});
    }

    render() {

        let divClass = 'user-profile';
        let dropClass = 'dropdown';

        if (this.state.active) {
            divClass = 'user-profile active';
            dropClass = 'dropdown active';
        }

        if(this.props.id) {
            return (
                <div onClick={this.handleClick} className={divClass}>
                    <img src={this.props.avatar} />
                    <div><span>{this.props.name}</span></div>
                    <ul className={dropClass}>
                        <li className="usermenu-icon settings">Settings</li>
                        <li className="usermenu-icon signout" onClick={this.props.logoutUser}>Sign Out</li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        id: state.userInfo.id,
        name: state.userInfo.name,
        avatar: state.userInfo.avatar,
    };
}


export default connect(mapStateToProps, {logoutUser})(UserMenu);
