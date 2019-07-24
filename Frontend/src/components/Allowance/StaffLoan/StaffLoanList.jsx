import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { main_url, getCookieData, setCookieData } from '../../../utils/CommonFunction';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-buttons';

const $ = require('jquery');
$.DataTable = require('datatables.net-bs4');
$.DataTable = require('datatables.net-responsive-bs4');


export default class StaffLoanList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getCookieData("user_info="),
            staff_loan_list: []
        }
    }

    componentDidMount() {
        this.getStaffLoanList();
        $('#dataTables').on('click', '#toView', function () {
            var data = $(this).find('#view').text();
            setCookieData('staff_loan', data);
            window.location.replace('/staff_loan_view');
        })

        $('#dataTables').on('click', 'toEdit', function () {
            var data = $(this).find('#edit').text();
            setCookieData('staff_loan', data);
            window.location.replace('/staff_loan_applyform');
        })
    }

    getStaffLoanList() {
        var user = this.state.user;
        let id = 0;
        if (user.role_id === 1 || user.role_id === 2 || user.role_id === 3) {
            id = 0;
        }
        else {
            id = user.user_id;
        }
        fetch(`${main_url}staff_loan/getStaffLoanList/user_id=${id}`)
            .then(res => res.json())
            .then(data => {
                this.showTable(data);
                this.setState({
                    staff_loan_list: data
                })
            })
    }

    showTable(data) {
        var table;
        var list = [];
        var obj = [];

        var user = this.state.user;
        let btn_id, text_id = "";

        if (user.role_id === 1 || user.role_id === 2 || user.role_id === 3) {
            btn_id = 'toView';
            text_id = 'view';
            // '<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id="toEdit" ><span id="edit" class="hidden" >' + JSON.stringify(obj) + '</span>  <i className="fa fa-cogs"></i>&nbsp;Edit</button>'
        }
        else {
            btn_id = 'toEdit';
            text_id = 'edit';
            // action = '<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id="toEdit" ><span id="edit" class="hidden" >' + JSON.stringify(obj) + '</span>  <i className="fa fa-cogs"></i>&nbsp;Edit</button>'
        }

        if ($.fn.dataTable.isDataTable('#dataTables')) {
            table = $('#dataTables').dataTable();
            table.fnClearTable();
            table.fnDestroy();
            $('#dataTables').empty();
        }

        for (let i = 0; i < data.length; i++) {
            obj = data[i];
            list.push({
                applicant_name: obj.applicant_name,
                institution_name: obj.institution_name,
                outstanding_amount: obj.outstanding_amount,
                installment_amount: obj.installment_amount,
                maturity_date: obj.maturity_date,
                repayment_period: obj.repayment_period,
                action: `<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id=${btn_id} ><span id=${text_id} class="hidden" >${JSON.stringify(obj)}</span>  <i className="fa fa-cogs"></i>&nbsp;Edit</button>`
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
                { title: "Applicant Name", data: "applicant_name" },
                { title: "Institution Name", data: "institution_name" },
                { title: "Outstanding Amount", data: "outstanding_amount" },
                { title: "Installment Amount", data: "installment_amount" },
                { title: "Maturity Date", data: "maturity_date" },
                { title: "Repayment Repriod", data: "repayment_period" },
                { title: "Action", data: "action" }
            ]
        })
    }

    render() {
        return (
            <div className="container staff_loan main-container">
                <div className="content">
                    <div className="row m-b-10">
                        <div className="col-sm-6 col-lg-6">
                            <h2>Staff Loan List</h2>
                        </div>
                        <div className="col-sm-6 col-lg-6">
                            <Link to="/staff_loan_applyform">
                                <button className="btn btn-success title_float_btn">
                                    <span className="add_new_icon"><i className="fa fa-plus-square"></i></span>
                                    Add New
                                    </button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered table-hover responsive nowrap dt-responsive"
                            id="dataTables"
                        />
                    </div>
                </div>
            </div>
        )
    }

}