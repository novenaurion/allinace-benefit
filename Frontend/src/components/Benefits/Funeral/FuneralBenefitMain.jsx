import React, {Component} from 'react';
import BenefitPageHeader from '../BenefitPageHeader';
import BenefitFuneralTable from './BenefitFuneralTable';
import BenefitFuneralAddNew from './BenefitFuneralAddNew';

class FuneralBenefitMain extends Component {
    constructor() {
        super();
        this.state = {
            isAddNew: false,
            isTable: true
        }
    }

    setupForm = () => {
        this.setState({
            isAddNew: true,
            isTable: false
        });
    };

    render() {
        return(
            <div className="wedding-benefit border-bottom white-bg dashboard-header">

                <BenefitPageHeader pageTitle="Funeral" setupForm={this.setupForm}/>

                <br/>

                {
                    this.state.isTable ?
                        <BenefitFuneralTable /> :
                        <BenefitFuneralAddNew />
                }

            </div>
        )
    }
}

export default FuneralBenefitMain;