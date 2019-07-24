import React, {Component} from 'react';
import BenefitPageHeader from '../BenefitPageHeader';
import BenefitChildTable from './BenefitChildTable';
import BenefitChildAddNew from './BenefitChildAddNew';

class WeddingBenefitMain extends Component {
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

                <BenefitPageHeader pageTitle="Child" setupForm={this.setupForm}/>

                <br/>

                {
                    this.state.isTable ?
                        <BenefitChildTable /> :
                        <BenefitChildAddNew />
                }

            </div>
        )
    }
}

export default WeddingBenefitMain;