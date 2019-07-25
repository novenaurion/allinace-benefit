import React, {Component} from 'react';
import BenefitPageHeader from '../BenefitPageHeader';
import BenefitWeddingTable from './BenefitWeddingTable';
import BenefitWeddingAddNew from './BenefitWeddingAddNew';
import BenefitWeddingView from './BeneffitWeddingView';
import {main_url} from "../../../utils/CommonFunction";
class WeddingBenefitMain extends Component {
    constructor() {
        super();
        this.state = {
            isAddNew: false,
            isTable: true,
            isView:false,
            datasource:[],
            
        }
    }

    componentDidMount(){
        this._getWeddingBenefit();
    }

    _getWeddingBenefit(){
        fetch(main_url + "wedding_benefit/getWeddingBenefit")
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(res => {

                if (res) {
                    this.setState({ datasource: res })
                  
                
                }
            })
            .catch(error => console.error(`Fetch Error =\n`, error));

    }

    setupForm = () => {
        this.setState({
            isAddNew: true,
            isTable: false
        });
    };

  goToTable = () =>{
      this.setState({
          isAddNew:false,
          isTable:true 
            })
  }

  goToViewForm =(data) =>{
      this.setState({
          isAddNew:false,
          isTable:false,
          isView:true,
          datasource:data
      })
  }

    render() {
        return(
            <div className="wedding-benefit border-bottom white-bg dashboard-header">

                <BenefitPageHeader pageTitle="Wedding" setupForm={this.setupForm}/>

                <br/>
                {this.state.isAddNew ?
                    <BenefitWeddingAddNew goToTable={this.state.goToTable}/> : ''
                }    

                {
                    this.state.isTable ?
                        <BenefitWeddingTable data={this.state.datasource}  goToViewForm={this.goToViewForm}/> : ''
                         
                }
                {
                    this.state.isView ? 
                    <BenefitWeddingView data={this.state.data} /> : ''

                }

            </div>
        )
    }
}

export default WeddingBenefitMain;