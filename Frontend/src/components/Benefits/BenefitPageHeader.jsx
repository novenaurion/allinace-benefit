import React, {Component} from 'react';

class BenefitPageHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>HR Management System</h2>
                    <ol className="breadcrumb">
                        <li>
                            Allowance
                        </li>
                        <li className="active">
                            <a href="#"> {this.props.pageTitle} Benefit</a>
                        </li>

                    </ol>
                </div>

                <div className="col-lg-2">
                    <button className="btn btn-primary" onClick={this.props.setupForm}>Add New</button>
                </div>

            </div>
        )
    }
}

export default BenefitPageHeader;