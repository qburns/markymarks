import React, { Component } from 'react';
import { connect } from 'react-redux';


export class ActionBar extends Component {

    render() {
        return (
            <div className="action-bar">
                <ul className="actions">
                    <li className="toggleview folder">LIST</li>
                    <li className="alphabetical">A/Z</li>
                </ul>
            </div>
        )
    }
}