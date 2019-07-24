import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { main_url, getCookieData } from '../../../utils/CommonFunction';

export default class StaffLoanView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loan_data: getCookieData('staff_loan'),
            one_loan_info: []
        }
    }

    componentDidMount() {
        this.getLoanInfo();
    }

    getLoanInfo() {
        fetch(`${main_url}staff_loan/getOneLoanInfo/${this.state.loan_data.staff_loan_id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    one_loan_info: res[0]
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        const { one_loan_info } = this.state;
        return (
            <div className='container staff_loan main-container'>
                <div className='content'>
                    <div className='row m-b-10'>
                        <div className="col-sm-6 col-lg-6">
                            <h2>Staff Loan View</h2>
                        </div>
                        <div className="col-sm-6 col-lg-6">
                            <Link to="/staff_loan">
                                <button className="btn btn-primary title_float_btn">
                                    <span className="add_new_icon"></span>
                                    Back To List
                                    </button>
                            </Link>
                        </div>
                    </div>

                    {
                        one_loan_info !== null ?
                            <div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Name</label>
                                        <input type="text" className="full_width" value={one_loan_info.guarantor_name}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Branch</label>
                                        <input className="full_width" type="text" value={one_loan_info.branch_name} ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Department</label>
                                        <input className="full_width" type="text" value={one_loan_info.deptname} onChange={(e) => this.setState({ family_member_name: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Job Title</label>
                                        <input className="full_width" type="text" value={one_loan_info.additional_jd} onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Bank Account</label>
                                        <input type="text" className="full_width" value={one_loan_info.thapyay_account} ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>NRC</label>
                                        <input className="full_width" type="text" value={one_loan_info.nrc}  ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Telephone</label>
                                        <input className="full_width" type="text" value={one_loan_info.phone} onChange={(e) => this.setState({ family_member_name: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Date of Birth</label>
                                        <input className="full_width" type="date" value={one_loan_info.date_of_birth} onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Join Date</label>
                                        <input type="date" className="full_width" value={one_loan_info.joining_date}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Applicant Current Salary</label>
                                        <input className="full_width" type="text" value={one_loan_info.applicant_name} ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Applicant Net Salary</label>
                                        <input className="full_width" type="text" value={one_loan_info.branch_name} onChange={(e) => this.setState({ family_member_name: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Guarantor Salary</label>
                                        <input className="full_width" type="text" value={one_loan_info.branch_name} onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Family Member Name</label>
                                        <input type="text" className="full_width" value={one_loan_info.family_member_name}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Family Member NRC</label>
                                        <input className="full_width" type="text" value={one_loan_info.family_member_nrc} ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Name of Institution</label>
                                        <input className="full_width" type="text" value={one_loan_info.institution_name} onChange={(e) => this.setState({ family_member_name: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Outstanding Amount</label>
                                        <input className="full_width" type="number" value={one_loan_info.outstanding_amount} onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Installment Term</label>
                                        <input type="number" className="full_width" value={one_loan_info.installment_amount}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Installment Amount</label>
                                        <input className="full_width" type="number" value={one_loan_info.installment_amount} ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Maturity Date</label>
                                        <input className="full_width" type="date" value={one_loan_info.maturity_date} onChange={(e) => this.setState({ family_member_name: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Amount Request</label>
                                        <input className="full_width" type="number" value={one_loan_info.amount_requested} onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Purposed Repayment Period</label>
                                        <input type="number" className="full_width" value={one_loan_info.repayment_period}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Loan Purpose</label>
                                        <input className="full_width" type="text" value={one_loan_info.loan_purpose} ></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Performance Recommened</label>
                                        <input className="full_width" type="text" value={one_loan_info.performance} onChange={(e) => this.setState({ institution_name: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Target Achievement</label>
                                        <input className="full_width" type="text" value={one_loan_info.target_achieve} onChange={(e) => this.setState({ family_member_nrc: e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <div className="pretty p-default">
                                            <input type="checkbox" value={one_loan_info.salary_advance} name="other_loan"
                                                checked={one_loan_info.salary_advance === 1 ? "checked" : ""}
                                                onChange={(e) => this.setState({ salary_advance: e.target.checked })} />
                                            <div className="state p-primary">
                                                <label>Salary Advance</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <div className="pretty p-default">
                                            <input type="checkbox" name="other_loan" value={one_loan_info.personal_loan}
                                                checked={one_loan_info.personal_loan === 1 ? "checked" : ""}
                                                onChange={(e) => this.setState({ personal_loan: e.target.checked })} />
                                            <div className="state p-primary">
                                                <label>Personal Loan</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <div className="pretty p-default">
                                            <input type="checkbox" value={one_loan_info.collateral_loan} name="other_loan"
                                                checked={one_loan_info.collateral_loan === 1 ? "checked" : ""}
                                                onChange={(e) => this.setState({ collateral_loan: e.target.checked })} />
                                            <div className="state p-primary">
                                                <label>Collateral Loan</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <div className="pretty p-default">
                                            <input type="checkbox" value={one_loan_info.other_outstanding_debts} name="other_loan"
                                                checked={one_loan_info.other_outstanding_debts === 1 ? "checked" : ""}
                                                onChange={(e) => this.setState({ other_outstanding_debts: e.target.checked })} />
                                            <div className="state p-primary">
                                                <label>Other outstanding debts</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row margin-top-20">

                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Recommened By</label>
                                        <input className="full_width" type="text" value={one_loan_info.recommened_user_name} onChange={(e) => this.setState({ outstanding_amount: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Comment</label>
                                        <div>
                                            <input className="full_width" type="text" value={one_loan_info.comment} onChange={(e) => this.setState({ installment_term: e.target.value })}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Previous Staff Loan Info</label>
                                        <input className="full_width" type="text" value={one_loan_info.branch_name} onChange={(e) => this.setState({ installment_amount: e.target.value })}></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <label>Attachment</label>
                                        <input className="full_width" type="file"></input>
                                    </div>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                                        <div className="pretty p-default">
                                            <input type="checkbox" value={one_loan_info.term_and_condition} name="other_loan"
                                                checked={one_loan_info.term_and_condition === 1 ? "checked" : ""}
                                                onChange={(e) => this.setState({ term_and_condition: e.target.checked })} />
                                            <div className="state p-primary">
                                                <label>Term and condition</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-20 f-right">
                                    {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                                    <button className="btn btn-primary m-r-10"><i className="fa fa-check"></i> Check By</button>
                                    {/* </div> */}
                                    {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                                    <button className="btn btn_verified" ><i className="fa fa-check"></i> Verify By</button>
                                    {/* </div> */}
                                    {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                                    <button className="btn btn_approved" ><i className="fa fa-check"></i> Approve By</button>
                                    {/* </div> */}
                                    {/* <div className="col-12 col-sm-6 col-lg-3 col-xl-3"> */}
                                    <button className="btn btn_reject"><i className="fa fa-times"></i> Rejected By</button>
                                    {/* </div> */}

                                </div>

                            </div>
                            : <h3> There is no data found!</h3>
                    }
                </div>
            </div>
        )
    }
}