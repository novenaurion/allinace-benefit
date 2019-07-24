import React, {Component} from 'react';
import Select from 'react-select';
import CustomFileInput from '../CustomFileInput';
import { ToastContainer, toast } from 'react-toastify';
import '../../Benefits/Benefits.css';
import {main_url} from "../../../utils/CommonFunction";

class BenefitChildAddNew extends Component {
    constructor() {
        super();
        this.state = {
        
                employeeName: [],
                user_id:'',
                designation: '',
                noOfChildren: '',
                
        
        }
    }

    componentDidMount() {
        fetch(`${main_url}benefit/getEmployeeList`)
            .then(res => { if (res.ok) return res.json() })
            .then(list => {
                this.setState({
                    employeeNameList: list
                })
            })
    }

    handleEmployeeName = (event) => {
     
        this.setState({
            user_id:event.value
        });
    };


    handleNoOfChildren = (event) => {
        this.setState({
            noOfChildren:event.target.value
        })
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


    // save = () => {
    //     let data = this.state.dataSource;
    //     data.push(this.state.childBenefitsData);

    //     this.setState({
    //         dataSource: data,

    //         childBenefitsData: {
    //             employeeName: '',
    //             designation: '',
    //             noOfChildren: '',
                
    //         }

    //     });

    // };

    // handleRemove = (event) => {
    //     let data = this.state.dataSource;
    //     data.splice(event, 1);
    //     this.setState({
    //         dataSource: data
    //     });
    // };


    save() {
       
        var data = {
           user_id:this.state.employee_id,
           child_count:this.state.noOfChildren
        }

        const formdata = new FormData();

        var obj = document.querySelector("#attach_file").files.length;
        for (var i = 0; i < obj; i++) {
            var imagedata = document.querySelector("#attach_file").files[i];
            formdata.append('uploadfile', imagedata);
        }

        formdata.append('child_benefit', JSON.stringify(data))
        alert(JSON.stringify(data,2,undefined))

        let status = 0;
        fetch(`${main_url}child_benefit/saveChildBenefit`, {
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
                

            })
    }

    render() {
        return (
            <div className="benefits benefit-child-add-new">
                <div className='row'>
                    <form className="form-group">
                        <div className="col-md-12">
                            <div><label htmlFor="employee-name" className="col-sm-12">Employee Name</label></div>
                            <div className="col-sm-11">
                                <Select
                                    options={this.state.childBenefitsData.employeeName}
                                    placeholder="Please Choose The Employee Name"
                                    onChange={this.handleEmployeeName}
                                    value={this.state.employeeName}
                                />
                            </div>
                        </div>

                     

                        <div className="col-md-6">
                            <div><label htmlFor="spouse-name" className="col-sm-12">Number Of Children</label></div>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    placeholder="Please Provide The Number Of Your Children"
                                    className="form-control"
                                    onChange={this.handleNoOfChildren}
                                    value={this.state.noOfChildren}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label>Attachment</label>
                            <input className="full_width" type="file" id="attach_file" multiple onChange={this.checkFiles.bind(this)}></input>
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
                                <th>No Of Children</th>
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
                                                    <td>{item.noOfChildren}</td>
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

export default BenefitChildAddNew;