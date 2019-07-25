import React, {Component} from 'react';
import BenefitPageHeader from '../BenefitPageHeader';
import BenefitChildTable from './BenefitChildTable';
import BenefitChildAddNew from './BenefitChildAddNew';
<<<<<<< HEAD
import BenefitChildView from './BenefitChiildView';
=======
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd

class WeddingBenefitMain extends Component {
    constructor() {
        super();
        this.state = {
            isAddNew: false,
<<<<<<< HEAD
            isTable: true,
            isView:false,
            data:data
=======
            isTable: true
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd
        }
    }

    setupForm = () => {
        this.setState({
            isAddNew: true,
<<<<<<< HEAD
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

=======
            isTable: false
        });
    };

>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd
    render() {
        return(
            <div className="wedding-benefit border-bottom white-bg dashboard-header">

                <BenefitPageHeader pageTitle="Child" setupForm={this.setupForm}/>

                <br/>

                {
<<<<<<< HEAD
                    this.state.isAddNew ? <BenefitChildAddNew goToTable={this.goToTable}/> : ''
                }
                {
                    this.stae.isView ? <BenefitChildView data={this.state.data}/>:''
                }
                {
                    this.state.isTable ?
                        <BenefitChildTable goToTable={this.goToViewForm} /> : ''
                   
=======
                    this.state.isTable ?
                        <BenefitChildTable /> :
                        <BenefitChildAddNew />
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd
                }

            </div>
        )
    }
}

export default WeddingBenefitMain;