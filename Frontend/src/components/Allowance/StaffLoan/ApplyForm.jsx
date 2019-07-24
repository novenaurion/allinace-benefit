import React, { Component } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { main_url, getCookieData, getUserId } from '../../../utils/CommonFunction';
import 'react-toastify/dist/ReactToastify.css';
// const $ = require('jquery');

export default class ApplyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: getUserId("user_info="),
            loan_data: getCookieData('staff_loan'),
            guarantor_list: [],
            selected_guarantor: [],
            recommended_user_list: [],
            selected_recommended: []
        }
    }

    componentDidMount() {
        fetch(`${main_url}staff_loan/getEmployeeList`)
            .then(res => { if (res.ok) return res.json() })
            .then(list => {
                this.setState({
                    guarantor_list: list,
                    recommended_user_list: list
                })
            })
    }

    handleSelectedGuarantor(e) {
        this.setState({
            selected_guarantor: e
        })
    }

    handleSelectedRecommendedBy(e) {
        this.setState({
            selected_recommended: e
        })
    }

    checkFiles(e) {
        var files = document.getElementById("attach_file").files;
        var attachment = [];
        if (files.length > 5) {
            toast.warning('You can only upload a maximum of 5 files!')
        }
        else {
            for (let i = 0; i < files.length; i++) {
                attachment.push(files[i])
            }
        }
        this.setState({
            attachment: attachment
        })

    }

    save() {
        
        var data = {
            guarantor_id: this.state.selected_guarantor.value,
            recommended_by: this.state.selected_recommended.value,
            applicant_id: this.state.user_id,
            family_member_name: this.state.family_member_name,
            family_member_nrc: this.state.family_member_nrc,
            institution_name: this.state.institution_name,
            outstanding_amount: this.state.outstanding_amount,
            installment_amount: this.state.installment_amount,
            installment_term: this.state.installment_term,
            maturity_date: this.state.maturity_date,
            amount_requested: this.state.amount_requested,
            repayment_period: this.state.repayment_period,
            loan_purpose: this.state.loan_purpose,
            salary_advance: this.state.salary_advance,
            personal_loan: this.state.personal_loan,
            collateral_loan: this.state.collateral_loan,
            other_outstanding_debts: this.state.other_outstanding_debts,
            target_achieve: this.state.target_achieve,
            performance: this.state.performance,
            comment: this.state.comment,
            term_and_condition: this.state.term_and_condition
        }

        const formdata = new FormData();

        var obj = document.querySelector("#attach_file").files.length;
        for (var i = 0; i < obj; i++) {
            var imagedata = document.querySelector("#attach_file").files[i];
            formdata.append('uploadfile', imagedata);
        }

        formdata.append('staff_loan', JSON.stringify(data))
        let status = 0;
        fetch(`${main_url}staff_loan/saveStaffLoan`, {
            method: "POST",
            body: formdata
        })
            .then(res => {
                status = res.status;
                return res.text()
            })
            .then(text => {
                if (status === 200) toast.success(text);

                else toast.error(text);
                // window.location.replace("/staff_loan");

            })
    }

    render() {
        let { guarantor_list, selected_guarantor, recommended_user_list, selected_recommended } = this.state;
        return (
            <div className="container staff_loan main-container">
                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                <h2>Staff Loan Apply Form</h2>
                <div className="content">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Guarantor Name</label>
                            <Select
                                options={guarantor_list}
                                value={selected_guarantor}
                                onChange={this.handleSelectedGuarantor.bind(this)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Guarantor NRC</label>
                            <input className="full_width" type="text" value={!Array.isArray(selected_guarantor) ? selected_guarantor.nrc : ""} disabled></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Family Member Guarantor Name</label>
                            <input className="full_width" type="text" onChange={(e) => this.setState({ family_member_name: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Family Member Guarantor NRC</label>
                            <input className="full_width" type="text" onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <div className="pretty p-default">
                                <input type="checkbox" value={1} name="other_loan" onChange={(e) => this.setState({ salary_advance: e.target.checked })} />
                                <div className="state p-primary">
                                    <label>Salary Advance</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <div className="pretty p-default">
                                <input type="checkbox" name="other_loan" onChange={(e) => this.setState({ personal_loan: e.target.checked })} />
                                <div className="state p-primary">
                                    <label>Personal Loan</label>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <div className="pretty p-default">
                                <input type="checkbox" value={3} name="other_loan" onChange={(e) => this.setState({ collateral: e.target.checked })} />
                                <div className="state p-primary">
                                    <label>Collateral Loan</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <div className="pretty p-default">
                                <input type="checkbox" value={4} name="other_loan" onChange={(e) => this.setState({ other_outstanding_debts: e.target.checked })} />
                                <div className="state p-primary">
                                    <label>Other outstanding debts</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Name of Institution</label>
                            <input className="full_width" type="text" onChange={(e) => this.setState({ institution_name: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Outstanding Amount</label>
                            <input className="full_width" type="number" onChange={(e) => this.setState({ outstanding_amount: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Installment Term</label>
                            <div>
                                <input className="full_width" type="number" onChange={(e) => this.setState({ installment_term: e.target.value })}></input>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Installment Amount</label>
                            <input className="full_width" type="number" onChange={(e) => this.setState({ installment_amount: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Maturity Date</label>
                            <input className="full_width" type="date" onChange={(e) => this.setState({ maturity_date: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Amount Requested</label>
                            <input className="full_width" type="number" onChange={(e) => this.setState({ amount_requested: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Proposed Repayment Period</label>
                            <input className="full_width" type="number" onChange={(e) => this.setState({ repayment_period: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Loan Purpose</label>
                            <input className="full_width" type="text" onChange={(e) => this.setState({ loan_purpose: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Target Achievement</label>
                            <input className="full_width" type="text" onChange={(e) => this.setState({ target_achieve: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Performance Recommendation</label>
                            <input className="full_width" type="text" onChange={(e) => this.setState({ performance: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Recommend By</label>
                            <Select
                                options={recommended_user_list}
                                value={selected_recommended}
                                onChange={this.handleSelectedRecommendedBy.bind(this)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Comment</label>
                            <div>
                                <input className="full_width" type="textarea" onChange={(e) => this.setState({ comment: e.target.value })}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Attachment</label>
                            <input className="full_width" type="file" id="attach_file" multiple onChange={this.checkFiles.bind(this)}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3 margin-top-20">
                            <div className="pretty p-default">
                                <input type="checkbox" name="term_and_condition" onChange={(e) => this.setState({ term_and_condition: e.target.checked })} />
                                <div className="state p-primary">
                                    <label>Term and Condition</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-20 f-right">
                        <a href="/staff_loan"><button className="btn btn-success m-r-10">Cancel</button></a>
                        <button className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
                    </div>
                </div >
            </div>

        )
    }
}