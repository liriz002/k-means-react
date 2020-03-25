import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
import styles from './Modals.css';
import * as actions from '../../../store/actions/actions';
import * as Constants from '../../../constants/index';

class SummaryModal extends Component {
    closeSummaryModal = () => {
        this.props.onUpdateShowSummaryModal( false );
    }

    render() {
        let pointsPerCluster = [ ];

        for ( let i=0; i<this.props.datasets.length-1; i=i+2 ) {
            pointsPerCluster.push( this.props.datasets[ i ].data.length );
        }

        console.log( pointsPerCluster );

        return (
            <div>
            <Modal id="Summary-Modal" isOpen={ this.props.isOpen } closeTimeoutMS={ Constants.Global.MODAL_CLOSE_DURATION }>
            <div className="Modal-Title-Container">
                <h2>Summary</h2>
             </div>

             <div className="Modal-Content-Container">
                <h3>Cluster Assignments</h3>
                { pointsPerCluster.map( ( points, index ) => { 
                    return (
                        <span className="Point-Summary"><span className="Dot" style={{ backgroundColor: Constants.Colors.Points[ index ].background }} ></span><span className="Points-Total">{ points } points</span></span>
                    )
                })}
            </div>
            

             <div className="Modal-Btn-Container">
                <Button 
                className="Button Button2"
                title="Close"
                clicked={ this.closeSummaryModal }
                />
             </div>
            </Modal>
            </div>
        );
    }
}

/*

                <p><span className="Dot"></span>First</p>

                <h3>Steps</h3>
                <p>23</p>

*/

const mapStateToProps = state => {
    return {
        datasets: state.data.datasets
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateShowSummaryModal: ( show ) => dispatch( actions.updateShowSummaryModal( false ) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryModal);