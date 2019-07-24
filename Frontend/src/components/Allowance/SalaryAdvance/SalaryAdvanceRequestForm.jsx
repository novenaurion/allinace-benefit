import React, { Component } from 'react'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { main_url, getUserId } from '../../../utils/CommonFunction';

export default class SalaryAdvanceRequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee_list: [],
            selected_employee: [],
            one_advance: [],
            requested_amount: 0,
            purpose: '',
            created_user: getUserId("user_info=")
        }
    }

    componentDidMount() {
        if (!Array.isArray(this.state.one_advance)) {
            this.setSalaryAdvance(this.state.one_advance);
        }
        this.getEmployeeList();
    }

    setSalaryAdvance(one) {
        this.setState({
            requested_amount: one.requested_amount,
            purpose: one.purpose,
            selected_employee: { label: one.employee_name, value: one.user_id, employment_id: one.employment_id }
        })
    }

    getEmployeeList() {
        console.log(main_url);
        fetch(`${main_url}staff_loan/getEmployeeList`)
            .then(res => { if (res.ok) return res.json() })
            .then(list => {
                this.setState({
                    employee_list: list
                })
            })
    }

    save() {
        let createdBy = this.state.created_user;
        let updatedBy = this.state.created_user;
        let path = 'saveSalaryAdvance';
        if (!Array.isArray(this.state.one_advance)) {
            createdBy = this.state.one_advance.createdBy;
            path = `editSalaryAdvance/${this.state.one_advance.schedule_id}`
        }
        var data = {
            user_id: this.state.selected_employee.value,
            requested_amount: this.state.requested_amount,
            purpose: this.state.purpose,
            createdBy: createdBy,
            updatedBy: updatedBy
        }
        console.log(data)
        let status = 0;
        console.log(`${main_url}salary_advance/${path}`)
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
        let { employee_list, selected_employee } = this.state;
        return (
            <div className='container staff_loan main-container'>
                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                <h2>New Salary Advance</h2>
                <div className="content">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Employee Name</label>
                            <Select
                                options={employee_list}
                                value={selected_employee}
                                onChange={(e) => this.setState({ selected_employee: e })}
                            />
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Employee ID</label>
                            <input className="full_width" type="text" value={!Array.isArray(selected_employee) ? selected_employee.employment_id : ""} disabled></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Amount</label>
                            <input className="full_width" type="number" min={0} value={this.state.requested_amount} onChange={(e) => this.setState({ requested_amount: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Purpose</label>
                            <input className="full_width" type="textarea" value={this.state.purpose} onChange={(e) => this.setState({ purpose: e.target.value })}></input>
                        </div>
                    </div>

                    <div className="row m-20 f-right">
                        <a href="/salary_advance"><button className="btn btn-success m-r-10">Cancel</button></a>
                        <button className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

