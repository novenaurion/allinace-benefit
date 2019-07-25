import React,{Component } from 'react'

class BenefitChildView extends Component{
    constructor(props){
        super(props)
        this.state={
            datasource=props.data
        }
    }

    render(){
        return(
            <div className="benefits benefit-child-add-new">
            <div className='row'>
                <form className="form-group">
                    <div className="col-md-12">
                        <div><label htmlFor="employee-name" className="col-sm-12">Employee Name</label></div>
                        <div className="col-sm-11">
                            <input type='text ' disabled className='from-control' value={}/>
                              
                        </div>
                    </div>

                 

                    <div className="col-md-6">
                        <div><label htmlFor="spouse-name" className="col-sm-12">Number Of Children</label></div>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                disabled
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3 col-xl-3">
                        <label>Attachment</label>
                        <input className="full_width" type="file" id="attach_file" multiple onChange={this.checkFiles.bind(this)}></input>
                    </div>


                </form>

            </div>

            {/* <div className="row save-btn">
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