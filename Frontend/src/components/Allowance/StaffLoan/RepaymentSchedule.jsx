import React, { Component } from 'react'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { main_url, getUserInfo, getUserId } from '../../../utils/CommonFunction';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-buttons';
import 'react-toastify/dist/ReactToastify.css';

const $ = require('jquery');
$.DataTable = require('datatables.net-bs4');
$.DataTable = require('datatables.net-responsive-bs4');

export default class ApplyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule_list: [],
            one_schedule: [],
            new_schedule: false
        }
    }

    componentDidMount() {
        getUserInfo();
        var that = this;
        this.getScheduleList();
        $('#dataTables').on('click', '#toEdit', function () {
            var data = $(this).find('#edit').text();
            that.setState({
                new_schedule: true,
                one_schedule: JSON.parse(data)
            })
        })

        $('#dataTables').on('click', '#toRemove', function () {
            var data = $(this).find('#remove').text();
            that.setState({
                one_schedule: JSON.parse(data)
            })
        })
    }

    getScheduleList() {
        fetch(`${main_url}staff_loan/getScheduleList`)
            .then(res => res.json())
            .then(data => {
                this.showTable(data);
                this.setState({
                    schedule_list: data
                })
            })
    }

    showTable(data) {
        var table;
        var list = [];
        var obj = [];

        if ($.fn.dataTable.isDataTable('#dataTables')) {
            table = $('#dataTables').dataTable();
            table.fnClearTable();
            table.fnDestroy();
            $('#dataTables').empty();
        }

        for (let i = 0; i < data.length; i++) {
            obj = data[i];
            list.push({
                employee_name: obj.employee_name,
                employment_id: obj.employment_id,
                amount: obj.amount,
                installment_amount: obj.installment_amount,
                installment_date: obj.installment_date,
                kantkaw_account: obj.kantkaw_account,
                action: '<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id="toEdit" ><span id="edit" class="hidden" >' + JSON.stringify(obj) + '</span>  <i className="fa fa-cogs"></i>&nbsp;Edit</button>' +
                    '<button style="margin-right:10px" class="btn btn-danger btn-sm own-btn-edit" id="toRemove" data-toggle="modal" data-target="#deleteModal"><span id="remove" class="hidden" >' + JSON.stringify(obj) + '</span>  <i className="fa fa-cogs"></i>&nbsp;Remove</button>'
            })
        }
        table = $("#dataTables").DataTable({
            autofill: false,
            bLengthChange: false,
            bInfo: false,
            responsive: true,
            paging: false,
            buttons: false,
            data: list,
            columns: [
                { title: "Employee Name", data: "employee_name" },
                { title: "Employee ID", data: "employment_id" },
                { title: "Amount", data: "amount" },
                { title: "Installment Amount", data: "installment_amount" },
                { title: "Installment Date", data: "installment_date" },
                { title: "Kant Kaw Account", data: "kantkaw_account" },
                { title: "Action", data: "action" }
            ]
        })
    }

    deleteConfirm() {
        let id = this.state.one_schedule.schedule_id;
        fetch(`${main_url}staff_loan/deleteSchedule`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: `id=${id}`
        })
            .then(res => res.text())
            .then(text => {
                if (text === 'Success!') {
                    toast.success('Deleting the information is successful!');
                    window.location.reload();
                }
                else {
                    toast.error('Something is wrong!')
                }
            })
    }

    render() {
        return (
            this.state.new_schedule ?
                <NewRepaymentSchedule one_schedule={this.state.one_schedule} />
                :
                <div className="container staff-loan main-container">
                    <div className="content">
                        <div className="row m-b-10">
                            <div className="col-sm-6 col-lg-6">
                                <h2>Repayment Schedule List</h2>
                            </div>
                            <div className="col-sm-6 col-lg-6">
                                <button className="btn btn-success title_float_btn" onClick={(e) => this.setState({ new_schedule: true })}>
                                    <span className="add_new_icon"><i className="fa fa-plus-square"></i></span>
                                    Add New
                                    </button>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table table-striped table-bordered table-hover responsive nowrap dt-responsive"
                                id="dataTables"
                            />
                        </div>
                    </div>
                    <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header" >
                                    <h3 className="modal-title" id="exampleModalLabel">Confirmation</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ marginTop: '-30px' }}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body ">
                                    <div>
                                        <div>
                                            <i className="fa fa-exclamation-triangle fa-2x"></i>
                                        </div>
                                        <div>
                                            <p>
                                                Are you sure you want to delete this schedule? <br></br>
                                                You can't undo this action.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer" >
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-danger delete-width" data-dismiss="modal" onClick={this.deleteConfirm.bind(this)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

class NewRepaymentSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee_list: [],
            selected_employee: [],
            one_schedule: this.props.one_schedule,
            amount: 0,
            installment_amount: 0,
            installment_date: new Date(),
            kantkaw_account: "",
            created_user: getUserId("user_info=")
        }
    }

    componentDidMount() {
        if (!Array.isArray(this.state.one_schedule)) {
            this.setSchedule(this.state.one_schedule);
        }
        this.getEmployeeList();
    }

    setSchedule(one) {
        this.setState({
            amount: one.amount,
            installment_amount: one.installment_amount,
            installment_date: one.installment_date,
            kantkaw_account: one.kantkaw_account,
            selected_employee: { label: one.employee_name, value: one.user_id, employment_id: one.employment_id }
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

    save() {
        let createdBy = this.state.created_user;
        let updatedBy = this.state.created_user;
        let path = 'saveSchedule';
        if (!Array.isArray(this.state.one_schedule)) {
            createdBy = this.state.one_schedule.createdBy;
            path = `editSchedule/${this.state.one_schedule.schedule_id}`
        }
        var data = {
            user_id: this.state.selected_employee.value,
            amount: this.state.amount,
            installment_amount: this.state.installment_amount,
            installment_date: this.state.installment_date,
            kantkaw_account: this.state.kantkaw_account,
            createdBy: createdBy,
            updatedBy: updatedBy
        }
        let status = 0;
        fetch(`${main_url}staff_loan/${path}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: `schedule=${JSON.stringify(data)}`
        })
            .then(res => {
                status = res.status;
                return res.text()
            })
            .then(text => {
                if (status === 200) {
                    toast.success(text);
                    window.location.replace('/staff_loan_repayment');
                }
                else toast.error(text);


            })
    }

    render() {
        let { employee_list, selected_employee } = this.state;
        return (
            <div className='container staff_loan main-container'>
                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                <h2>New Repayment Schedule</h2>
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
                            <input className="full_width" type="number" min={0} value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Installment Amount</label>
                            <input className="full_width" type="number" value={this.state.installment_amount} min={0} onChange={(e) => this.setState({ installment_amount: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Installment Date</label>
                            <input className="full_width" type="date" value={this.state.installment_date} onChange={(e) => this.setState({ installment_date: e.target.value })}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-6 col-xl-6">
                            <label>Kant Kaw Account</label>
                            <input className="full_width" type="text" value={this.state.kantkaw_account} onChange={(e) => this.setState({ kantkaw_account: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row m-20 f-right">
                        <a href="/staff_loan_repayment"><button className="btn btn-success m-r-10">Cancel</button></a>
                        <button className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}