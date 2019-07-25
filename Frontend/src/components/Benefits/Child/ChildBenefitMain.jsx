import React, {Component} from 'react';
import BenefitPageHeader from '../BenefitPageHeader';
import BenefitChildTable from './BenefitChildTable';
import BenefitChildAddNew from './BenefitChildAddNew';
import BenefitChildView from './BenefitChiildView';

class WeddingBenefitMain extends Component {
    constructor() {
        super();
        this.state = {
            isAddNew: false,
            isTable: true,
            isView:false,
            data:data
        }
    }

    setupForm = () => {
        this.setState({
            isAddNew: true,
            isTable: false,
            isView:false
        });
    };

    goToTable =( ) =>{
        this.setState  ({
            isAddNew:false,
            isTable:true,
            isView:false
        })
    }

    goToViewForm = (data) =>[
        this.setState({
            data:data,
            isAddNew:false,
            isView:true,
            isTable:false
        })
    ]

    render() {
        return(
            <div className="wedding-benefit border-bottom white-bg dashboard-header">

                <BenefitPageHeader pageTitle="Child" setupForm={this.setupForm}/>

                <br/>

                {
                    this.state.isAddNew ? <BenefitChildAddNew goToTable={this.goToTable}/> : ''
                }
                {
                    this.stae.isView ? <BenefitChildView data={this.state.data}/>:''
                }
                {
                    this.state.isTable ?
                        <BenefitChildTable goToTable={this.goToViewForm} /> : ''
                   
                }

            </div>
        )
    }
}

export default WeddingBenefitMain;