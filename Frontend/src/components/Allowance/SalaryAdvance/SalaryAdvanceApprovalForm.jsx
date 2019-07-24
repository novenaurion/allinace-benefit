import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { main_url, getUserId, getCookieData, getActionStatus } from '../../../utils/CommonFunction';

export default class SalaryAdvanceRequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advance_data: getCookieData('salary_advance'),
            one_advance: [],
            employee_list: [],
            selected_employee: [],
            employee_name: '',
            department: '',
            location: '',
            requested_amount: 0,
            purpose: '',
            duration: 0,
            monthly_installment: 0,
            approved_amount: 0,
            verifier_comment: '',
            sataus: 0,
            created_user: getUserId("user_info=")
        }
    }

    componentDidMount() {
        if (this.state.advance_data !== null) {
            this.getSalaryAdvance(this.state.advance_data);
        }
        // this.getEmployeeList();
    }

    getSalaryAdvance(data) {
        fetch(`${main_url}salary_advance/getOneSalaryAdvance/advance_id=${data.salary_advance_id}`)
            .then(res => res.json())
            .then(list => {
                var one = list[0];
                this.setState({
                    one_advance: one,
                    employee_name: one.employee_name,
                    requested_amount: one.requested_amount,
                    purpose: one.purpose,
                    department: one.department,
                    // selected_employee: { label: one.employee_name, value: one.user_id },
                    location: one.location,
                    salary: one.salary,
                    verifier_comment: one.verifier_comment,
                    approved_amount: one.approved_amount,
                    duration: one.duration,
                    monthly_installment: one.monthly_installment

                })
            })

    }

    getEmployeeList() {
        fetch(`${main_url}staff_loan/getEmployeeList`)
            .then(res => { if (res.ok) return res.json() })
            .then(list => {
                this.setState({
                    employee_list: list
                })
            })
    }

    save(action_status) {
        let createdBy = this.state.created_user;
        let updatedBy = this.state.created_user;
        let one_advance = this.state.one_advance;
        let path = 'saveSalaryAdvance';
        if (!Array.isArray(one_advance)) {
            createdBy = one_advance.createdBy;
            path = `editSalaryAdvance/advance_id=${one_advance.salary_advance_id}`
        }
        var action = getActionStatus(action_status, one_advance, createdBy);
        var data = {
            user_id: one_advance.user_id,
            requested_amount: this.state.requested_amount,
            purpose: this.state.purpose,
            duration: this.state.duration,
            monthly_installment: this.state.monthly_installment,
            approved_amount: this.state.approved_amount,
            verifier_comment: this.state.verifier_comment,
            createdBy: createdBy,
            updatedBy: updatedBy,
            status: action.status,
            checked_by: action.checked_by,
            verified_by: action.verified_by,
            approved_by: action.approved_by,
            rejected_by: action.rejected_by
        };
        let status = 0;
        fetch(`${main_url}salary_advance/${path}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: `advance=${JSON.stringify(data)}`
        })
            .then(res => {
                status = res.status;
                return res.text()
            })
            .then(text => {
                if (status === 200) {
                    toast.success(text);
                    // window.location.replace('/staff_loan_repayment');
                }
                else toast.error(text);


            })
    }

    render() {
        return (
            <div className='container staff_loan main-container'>
                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                <div className='row m-b-10'>
                    <div className="col-sm-6 col-lg-6">
                        <h2>Salary Advance View</h2>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                        <Link to="/salary_advance">
                            <button className="btn btn-primary title_float_btn">
                                <span className="add_new_icon"></span>
                                Back To List
                                    </button>
                        </Link>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Employee Name</label>
                            {/* <Select
                                options={employee_list}
                                value={selected_employee}
                                onChange={(e) => this.setState({ selected_employee: e })}
                            /> */}
                            <input className="full_width" type="text" value={this.state.employee_name} onChange={(e) => this.setState({ employee_name: e.target.value })} disabled></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Department</label>
                            <input className="full_width" type="text" value={this.state.department} onChange={(e) => this.setState({ requested_amount: e.target.value })} disabled></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Location</label>
                            <input className="full_width" type="text" value={this.state.location} onChange={(e) => this.setState({ requested_amount: e.target.value })} disabled></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Monthly Salary</label>
                            <input className="full_width" type="number" step={0.01} min={0} value={this.state.salary} onChange={(e) => this.setState({ salary: e.target.value })} disabled></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Requested Amount</label>
                            <input className="full_width" type="number" step={0.01} min={0} value={this.state.requested_amount} onChange={(e) => this.setState({ requested_amount: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Approved Amount</label>
                            <input className="full_width" type="number" step={0.01} min={0} value={this.state.approved_amount} onChange={(e) => this.setState({ approved_amount: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Duration</label>
                            <input className="full_width" type="number" step={0.01} min={0} value={this.state.duration} onChange={(e) => this.setState({ duration: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Monthly Installment</label>
                            <input className="full_width" type="number" step={0.01} min={0} value={this.state.monthly_installment} onChange={(e) => this.setState({ monthly_installment: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Purpose</label>
                            <input className="full_width" type="textarea" value={this.state.purpose} onChange={(e) => this.setState({ purpose: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Verifier Comment</label>
                            <input className="full_width" type="textarea" value={this.state.verifier_comment} onChange={(e) => this.setState({ verifier_comment: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row m-20 f-right">
                        {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                        {/* <button className="btn btn-primary m-r-10"><i className="fa fa-check"></i> Check By</button> */}
                        {/* </div> */}
                        {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                        <button className="btn btn_verified" onClick={this.save.bind(this, "verified")}><i className="fa fa-check"></i> Verify By</button>
                        {/* </div> */}
                        {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                        <button className="btn btn_approved" onClick={this.save.bind(this, "approved")}><i className="fa fa-check"></i> Approve By</button>
                        {/* </div> */}
                        {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                        <button className="btn btn_reject" onClick={this.save.bind(this, "rejected")}><i className="fa fa-times"></i> Rejected By</button>
                        {/* </div> */}

                    </div>

                    {/* <div className="row m-20 f-right">
                        <a href="/staff_loan_repayment"><button className="btn btn-success m-r-10">Cancel</button></a>
                        <button className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
                    </div> */}
                </div>
            </div>
        )
    }
}

