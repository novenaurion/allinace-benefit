import React, {Component} from 'react';
import Select from 'react-select';
import CustomFileInput from '../CustomFileInput';
import '../../Benefits/Benefits.css';
import { ToastContainer, toast } from 'react-toastify';
import {main_url} from "../../../utils/CommonFunction";
import { timingSafeEqual } from 'crypto';

const SpouseCompanyOptions = [
    {value: 1, label: 'Yes'},
    {value: 2, label: 'No'}
];

class BenefitWeddingAddNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
                employeeName: [],
                designation: '',
                spouseName: '',
                employee_id:'',
                spouseCompanyOption: '',
            
            dataSource: {
                employeeName:'',
                designation:'',
                spouseName:'',
                spouseCompanyOption:''
            },
            selectedSpouseCompany: ''
        }
    }

    componentDidMount() {

        fetch(`${main_url}staff_loan/getEmployeeList`)
            .then(res => { if (res.ok) return res.json() })
            .then(list => {
                this.setState({
                    employeeName: list
                })
            })
    }

    handleEmployeeName = (event) => {
       
       this.setState({
           employee_id:event.value
       })
        
    };

    handleDesignation = (event) => {
       
        
        this.setState({
            designation:event.target.value
        })
    };

    handleSpouseName = (event) => {
      
        this.setState({
          spouseName:event.target.value
        });
    };

    handleSpouseCompanyOptions = (event) => {
     
        this.setState({
            spouseCompanyOption:event.value,
            selectedSpouseCompany: event
        });
    };

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
           user_id:this.state.employee_id,
           designationo:this.state.designation,
<<<<<<< HEAD
           spouse_name:this.state.spouseName,
           is_alliance_staff:this.state.spouseCompanyOption
=======
           spouse_name:this.state.spouseName
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd
        }

        const formdata = new FormData();

        var obj = document.querySelector("#attach_file").files.length;
        for (var i = 0; i < obj; i++) {
            var imagedata = document.querySelector("#attach_file").files[i];
            formdata.append('uploadfile', imagedata);
        }

        formdata.append('wedding_benefit', JSON.stringify(data))
<<<<<<< HEAD
    
=======
        alert(JSON.stringify(data,2,undefined))
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd

        let status = 0;
        fetch(`${main_url}wedding_benefit/saveWeddingBenefit`, {
            method: "POST",
            body: formdata
        })
            .then(res => {
                status = res.status;
                return res.text()
            })
            .then(text => {
<<<<<<< HEAD
                if (status === 200) {
                    toast.success(text);
                    this.props.goToTable()
                
                }
=======
                if (status === 200) toast.success(text);
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd

                else toast.error(text);
                

            })
    }



    render() {
        
        return (
            <div className="container">
                <div className='row'>
                    <form>
                        <div className="form-group col-md-12">
                            <div><label htmlFor="employee-name" className="col-sm-12">Employee Name</label></div>
                            <div className="col-sm-11">
                                <Select
                                    options={this.state.employeeName}
                                    placeholder="Please Choose Employee Name"
                                    onChange={this.handleEmployeeName.bind(this)}
                                />
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <div><label htmlFor="designation" className="col-sm-12">Designation</label></div>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="Please Provide The Designation"
                                    className="form-control"
                                    onChange={this.handleDesignation.bind(this)}
                                    value={this.state.designation}
                                />
                            </div>
                        </div>


                        <div className="form-group col-md-6">
                            <div><label htmlFor="spouse-name" className="col-sm-12">Spouse Name</label></div>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="Please Provide The Employee Name"
                                    className="form-control"
                                    onChange={this.handleSpouseName}
                                    value={this.state.spouseName}
                                />
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <div><label htmlFor="employee-name" className="col-sm-12">Is Your Spouse An Alliance Staff
                                ?</label></div>
                            <div className="col-sm-10">
                                <Select
                                    placeholder="Please Choose An Option"
                                    options={SpouseCompanyOptions}
                                    onChange={this.handleSpouseCompanyOptions.bind(this)}
                                    value={this.state.selectedSpouseCompany}
                                />
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label className='col-sm-12'>Attachment</label>
                            <input className="full_width col-sm-10" type="file" id="attach_file" multiple onChange={this.checkFiles.bind(this)}></input>
                        </div>

                    </form>

                </div>

                <div className="row save-btn">
                    <div className="float-right">
                        <div>
                            <button className="btn btn-info" type="button" onClick={this.save.bind(this)}>Save</button>
                        </div>

                    </div>
                </div>

                <hr/>

                {/* <div className="row">
                    <div className="result-area col-md-12">
                        <table className="table table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Designation</th>
                                    <th>Spouse Name</th>
                                    <th>Is Spouse An Alliance Employee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>

                                    {
                                        (this.state.dataSource.length <= 0) ?
                                            ( <tr><td colSpan="8" className="text-center font-weight-bold text-white bg-danger">
                                                No Data To Show
                                            </td></tr> ) :
                                            (this.state.dataSource.map((item, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.designation}</td>
                                                        <td>{item.spouseName}</td>
                                                        <td>{item.spouseCompanyOption}</td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={this.handleRemove.bind(this, index)}>Remove</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })

                                        )
                                    }
                            </tbody>

                        </table>
                    </div>
                </div> */}
              
            </div>
        )
    }
}

export default BenefitWeddingAddNew;