import React, { Component } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';

const $ = require('jquery');
const jzip = require('jzip');
window.JSZip = jzip;
$.DataTable = require('datatables.net-bs4');
$.DataTable = require('datatables.net-responsive-bs4');

$.DataTable = require('datatables.net');
require('datatables.net-buttons/js/dataTables.buttons.min');
require('datatables.net-buttons/js/buttons.html5.min');


export default class BenefitChildTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: props.data,
            selectedRequest: '',
        }
    }
    componentDidMount() {
        this.$el = $(this.el);

        this.setState({
            dataSource: this.props.data
        }, () => {
            this._setTableData(this.state.dataSource)
        });

        let that = this;
        $("#dataTables-table").on('click', '#toView', function () {

            var data = $(this).find("#view").text();
            data = $.parseJSON(data);
            that.props.goToViewForm(data);

        });

        $("#dataTables-table").on('click', '#toEdit', function () {

            var data = $(this).find("#edit").text();
            data = $.parseJSON(data);
            that.props.goToEditForm(data);

        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                dataSource: this.props.data
            }, () => {
                this._setTableData(this.state.dataSource);

            })
        }
    }


    _setTableData = (data) => {

        var table;
        if ($.fn.dataTable.isDataTable('#dataTables-table')) {
            table = $('#dataTables-table').dataTable();
            table.fnClearTable();
            table.fnDestroy();
            $('#dataTables-table').empty();
            var l = [];
            var status;
            for (var i = 0; i < data.length; i++) {
                let result = data[i];
                let obj = [];
                if (result.status === 0) {
                    status = '<small class="label label-warning" style="background-color:#509aed"> Request </small>'

                }
                else if (result.status === 1) {
                    status = '<small class="label label-warning" style="background-color:#b33ce0"> Check By </small>'
                }
                else if (result.status === 2) {
                    status = '<small class="label label-warning" style="background-color:#f2a509"> Approve By </small>'
                }
                else if (result.status === 3) {
                    status = '<small class="label label-warning" style="background-color:#29a50a"> Verify By </small>'
                }
                else if (result.status === 4) {

                    status = '<small class="label label-warning" style="background-color:#f60e2f"> Reject By </small>'
                }
                if (result.status === 0 || result.status === 4) {
                    obj = {
                        no: i + 1,
                        form_no: data[i].form_no,
                        employee_name: data[i].employee_name,
                        designation: data[i].designation,
                        deadPerson: data[i].deadPerson,
                        headNo: data[i].headNo,
                        attachment: data[i].attachment,
                        status: status,
                        action:
                            '<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id="toView" ><span id="view" class="hidden" >' + JSON.stringify(result) + '</span>  <i className="fa fa-cogs"></i>&nbsp;View</button>' +
                            '<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id="toEdit" ><span id="edit" class="hidden" >' + JSON.stringify(result) + '</span>  <i className="fa fa-cogs"></i>&nbsp;Edit</button>'
                    }

                }
                else {
                    obj = {
                        no: i + 1,
                        form_no: data[i].form_no,
                        employee_name: data[i].employee_name,
                        designation: data[i].designation,
                        deadPerson: data[i].deadPerson,
                        headNo: data[i].headNo,
                        attachment: data[i].attachment,
                        status: status,
                        action:
                            '<button style="margin-right:10px" class="btn btn-primary btn-sm own-btn-edit" id="toView" ><span id="view" class="hidden" >' + JSON.stringify(result) + '</span>  <i className="fa fa-cogs"></i>&nbsp;View</button>'

                    }

                }


                l.push(obj)

            }
            this.setState({
                dataSource: l,

            });


            table = $("#dataTables-table").DataTable({

                autofill: true,
                bLengthChange: false,
                bInfo: false,
                responsive: true,
                paging: true,
                // buttons: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf'
                ],

                data: l,
                columns: [
                    { title: "No", data: "no" },
                    { title: "Employee Name", data: "employeeName" },
                    { title: "Designation", data: "designation" },
                    { title: "Dead Person", data: "deadPerson" },
                    { title: "Head Number", data: "headNo" },
                    { title: "Attachment", data: "attachment" },
                    { title: "Status", data: "status" },
                    { title: "Action", data: "action" }
                ],
            });
        }

        else {

            table = $("#dataTables-table").DataTable({
                autofill: true,
                bLengthChange: false,
                bInfo: true,
                responsive: true,
                paging: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf'
                ],
                data: l,

                columns: [
                    { title: "Employee Name", data: "employeeName" },
                    { title: "Designation", data: "designation" },
                    { title: "Dead Person", data: "deadPerson" },
                    { title: "Head Number", data: "headNo" },
                    { title: "Attachment", data: "attachment" },
                    { title: "Status", data: "status" },
                    { title: "Action", data: "action" }
                ],

            });
        }
    }


    render() {
        return (

            <div>
                <h3 className="col-md-12">Wedding Benefit Table</h3>
                <table width="99%"
                       className="table table-striped table-bordered table-hover table-responsive nowrap dt-responsive"
                       id="dataTables-table"
                />
            </div >
        )
    }
}