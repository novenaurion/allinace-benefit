import React, {Component} from 'react';
import Select from 'react-select';
import CustomFileInput from '../CustomFileInput';
import '../../Benefits/Benefits.css';
import { ToastContainer, toast } from 'react-toastify';
import {main_url} from "../../../utils/CommonFunction";

const deadPersonOptions = [
    {value: 1, label: 'Parent'},
    {value: 2, label: 'Children'},
    {value: 3, label: 'Sibling'},
    {value: 4, label: 'Employee Oneself'}
];

class BenefitFuneralAddNew extends Component {
    constructor() {
        super();
        this.state = {
            
                employeeName: [],
                user_id:'',
                
                deadPerson: '',
                headNo: '',
                attachment: '',
            
            dataSource: [],
            selectedDeadPerson: ''
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
            user_id: event.value
        });
    };


    handleDeadPersonOptions = (event) => {
        
        this.setState({
            deadPerson:event.value
        });
    };

    handleHeadNo = (event) => {
      

        this.setState({
           headNo:event.target.value
        });
    };

    // handleAttachment = (event) => {
    //     let data = this.state.funeralBenefitsData;
    //     data.attachment = event.target.value;
    //     this.setState({
    //         funeralBenefitsData: data
    //     });
    // };

    // save = () => {
    //     let data = this.state.dataSource;
    //     data.push(this.state.funeralBenefitsData);

    //     this.setState({
    //         dataSource: data,

    //         funeralBenefitsData: {
    //             employeeName: '',
    //             designation: '',
    //             spouseName: '',
    //             attachment: '',
    //         },

    //         selectedSpouseCompany: ''

    //     });

    // };
    
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

    // handleRemove = (event) => {
    //     let data = this.state.dataSource;
    //     data.splice(event, 1);
    //     this.setState({
    //         dataSource: data
    //     });
    // };

    save() {
       
        var data = {
           user_id:this.state.user_id,
           funeral_type:this.state.deadPerson,
           head_no:this.state.headNo
        }

        const formdata = new FormData();

        var obj = document.querySelector("#attach_file").files.length;
        for (var i = 0; i < obj; i++) {
            var imagedata = document.querySelector("#attach_file").files[i];
            formdata.append('uploadfile', imagedata);
        }

        formdata.append('funeral_benefit', JSON.stringify(data))
        alert(JSON.stringify(data,2,undefined))

        let status = 0;
        fetch(`${main_url}funeral_benefit/saveFuneralBenefit`, {
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
            <div className="benefits benefit-funeral-add-new">
                <div className='row'>
                    <form className="form-group">
                        <div className="col-md-12">
                            <div><label htmlFor="employee-name" className="col-sm-12">Employee Name</label></div>
                            <div className="col-sm-11">
                                <Select
                                    options={this.state.employeeName}
                                    placeholder="Please Choose The Employee Name"
                                    onChange={this.handleEmployeeName}
                                    value={this.state.employeeName}
                                />
                            </div>
                        </div>

                        


                        <div className="col-md-6">
                            <div><label htmlFor="dead-person" className="col-sm-12">Please Choose Whose Funeral Is It ? </label></div>
                            <div className="col-sm-10">
                                <Select
                                    placeholder="Please Choose An Option"
                                    options={deadPersonOptions}
                                    onChange={this.handleDeadPersonOptions}
                                    value={this.state.deadPersonOption}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div><label htmlFor="head-no" className="col-sm-12">Head Number</label></div>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    placeholder="Please Provide The Head Number"
                                    className="form-control"
                                    onChange={this.handleHeadNo}
                                    value={this.state.headNo}
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
                                <th>Dead Person</th>
                                <th>Head Number</th>
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
                                                    <td>{item.deadPerson}</td>
                                                    <td>{item.headNo}</td>
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
                </div>
                 */}

            </div>
        )
    }
}

export default BenefitFuneralAddNew;