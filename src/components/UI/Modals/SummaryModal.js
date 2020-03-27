import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
import styles from './Modals.css';
import * as actions from '../../../store/actions/actions';
import * as Constants from '../../../constants/index';

class SummaryModal extends Component {
    closeModal = () => {
        this.props.onUpdateShowSummaryModal( false );
    }

    render() {
        let pointsPerCluster = [ ]; 
        let stepsMessage;
        let modalHeightID;

        // We get the points for each cluster
        for ( let i=0; i<this.props.datasets.length-1; i=i+2 ) {
            pointsPerCluster.push( this.props.datasets[ i ].data.length );
        }

        // Then, we also get the steps message
        if ( this.props.currentAlgorithmSteps < Constants.Global.STEPS_AVERAGE_MIN ) {
            // low
            stepsMessage = <span className="Steps-Message Steps-Low">(fast)</span>
        } else if ( this.props.currentAlgorithmSteps >= Constants.Global.STEPS_AVERAGE_MIN && this.props.currentAlgorithmSteps <= Constants.Global.STEPS_AVERAGE_MAX ) {
            // average
            stepsMessage = <span className="Steps-Message Steps-Average">(average)</span>
        } else {
            // high
            stepsMessage = <span className="Steps-Message Steps-High">(slow)</span>
        }

        // Then we determine the total height for the modal, based on whether we have more than 3 points
        if ( this.props.numOfClusters > 3 ) {
            modalHeightID = "Summary-Modal-Extra-Height"
        } else {
            modalHeightID = "Summary-Modal-Regular-Height";
        }

        return (
            <div>
            <Modal id={ modalHeightID } isOpen={ this.props.isOpen } closeTimeoutMS={ Constants.Global.MODAL_CLOSE_DURATION }>
            <div className="Modal-Title-Container">
                <h2>Summary</h2>
             </div>

             <div className="Modal-Content-Container">
                <div className="Modal-Section">
                    <h3>Cluster Assignments</h3>
                    { pointsPerCluster.map( ( points, index ) => { 
                        return (
                            <span className="Point-Summary"><span className="Dot" style={{ backgroundColor: Constants.Colors.Points[ index ].background }} ></span><span className="Points-Total">{ points } points</span></span>
                        )
                    })}
                </div>

                <div className="Modal-Section">
                    <h3>Algorithm Steps</h3>
                    <span>{ this.props.currentAlgorithmSteps }</span>
                    { stepsMessage }
                </div>
                <hr />
            </div>

             <div className="Modal-Btn-Container">
                <Button 
                className="Button Button3 Modal-Right-Button"
                title="Close"
                clicked={ this.closeModal }
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
        datasets: state.data.datasets,
        currentAlgorithmSteps: state.globalProps.currentAlgorithmSteps,
        numOfClusters: state.globalProps.numOfClusters,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateShowSummaryModal: ( show ) => dispatch( actions.updateShowSummaryModal( false ) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryModal);