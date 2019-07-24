import React, { Component } from 'react';
import { setupMaster } from 'cluster';


class WeddingBenefit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datasource=props.data
        }
    }
    render() {
        return (
            <div className="container">
                <div className='row'>
                    <form>
                        <div className="form-group col-md-12">
                            <div><label htmlFor="employee-name" className="col-sm-12">Employee Name</label></div>
                            <div className="col-sm-11">
                            <input type='text' disabled className='from-control' value={this.state.datasource.fullname}/>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <div><label htmlFor="designation" className="col-sm-12">Designation</label></div>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    disabled
                                    
                                />
                            </div>
                        </div>


                        <div className="form-group col-md-6">
                            <div><label htmlFor="spouse-name" className="col-sm-12">Spouse Name</label></div>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    disabled
                                    className="form-control"  
                                    value={this.state.datasource.spouce_name}
                                />
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <div><label htmlFor="employee-name" className="col-sm-12">Is Your Spouse An Alliance Staff
                                ?</label></div>
                            <div className="col-sm-10">
                             <input type='text' disabled value={this.state.datasource.is_alliance_staff} className='from_control'/>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-lg-3 col-xl-3">
                            <label className='col-sm-12'>Attachment</label>
                            <input className="full_width col-sm-10" type="file" id="attach_file" multiple onChange={this.checkFiles.bind(this)}></input>
                        </div>

                    </form>

                </div>
{/* 
                <div className="row save-btn">
                    <div className="float-right">
                        <div>
                            <button className="btn btn-info" type="button" onClick={this.save.bind(this)}>Save</button>
                        </div>

                    </div>
                </div> */}
            </div>
        )
    }
}