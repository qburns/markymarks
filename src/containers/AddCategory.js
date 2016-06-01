import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputtingCategoryName } from '../actions/interactions';
import { addCategory } from '../actions/bookmarks';

class AddCategory extends Component {


    constructor(props) {
        super(props);
        this.doAddCategory = this.doAddCategory.bind(this);
    }

    doAddCategory(name) {
        this.props.addCategory(name);
    }

    render() {

        return (
            <div>
                <h3>Add Category</h3>
                <form>
                    <label forHtml="addName">Name:</label>
                    <input id="addName" type="text" value={this.props.addCat} onChange={e => {this.props.inputtingCategoryName(e.target.value)} }/>
                    <br />
                    <button onClick={(e) => {e.preventDefault(); this.doAddCategory(this.props.addCat)}}>Add Category</button>
                </form>
            </div>
        );

    }
}




function mapStateToProps(state) {
    return {
        addCat: state.interactions.addCategory.name
    };
}

export default connect(mapStateToProps, {addCategory, inputtingCategoryName})(AddCategory);


