import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styles from './Modals.css';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/actions';
import * as Constants from '../../../constants/index';
import { Motion, spring } from 'react-motion';

class ExplainerModal extends Component {

    state = {
        currentPage: 0
    };

    closeModal = () => {
        this.props.onAdvanceState();
        this.props.onUpdateShowExplainerModal( false )

        // We wait a bit to change the state back to 0 so that the modal can close with the last screen
        setTimeout(() => {
            this.setState({
                currentPage: 0
            });
        }, Constants.Global.MODAL_CLOSE_DURATION )
    }

    advancePage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
    }

    render() {
        let modalContent;
        let btnLeftProps;
        let btnClasses = Constants.Global.BUTTON_LEFT_CLASSES + " Modal-Right-Button"

        if ( this.state.currentPage === 0 ) {
            modalContent =
            <div>                 
            <div className="Modal-Section">
                <h3>K-Means Clustering</h3>
                <p>This project is an implementation of the k-means clustering algorithm, a popular machine learning algorithm.</p>
            </div>
    
            <div className="Modal-Section">
                <h3>What Does K-Means Clustering Do?</h3>
                <p>K-means clustering is used to group similar data points into clusters (groups). Similarity between points is given by their distance to a given cluster center (centroid).</p><br />
                <p>Clusters are represented by different colors in the chart.</p>
            </div>
            </div>

            btnLeftProps = {
                title: "Next",
                classes: btnClasses,
                clickFn: this.advancePage
            }
        } else if ( this.state.currentPage === 1 ) {
            modalContent =    
            <div>                 
            <div className="Modal-Section">
                <h3>Initializing Data</h3>
                <p>To start, 100 unassigned data points and K centroids (3 by default) are placed. You can shuffle this data as you see fit.</p>
            </div>
            <div className="Modal-Section">
                <h3>Algorithm Steps</h3>
                <p>The first step consists of assigning points to the closest centroid. The second step consists of re-calculating the average position of all centroids.</p><br />
                <p>Once points stop switching clusters, the algorithm ends.</p>
            </div>
            </div>

            btnLeftProps = {
                title: "Next",
                classes: btnClasses,
                clickFn: this.advancePage
            }
        } else {
            modalContent =
            <div>                 
            <div className="Modal-Section">
                <h3>Settings</h3>
                <p>In the settings, you can change the points' distribution and the number of clusters to use.</p>
            </div>

            <div className="Modal-Section">
            <h3>Managing Steps</h3>
            <p>You can choose to perform a full step (assignment + repositioning) manually,  or you can have all steps complete automatically until the algorithm is done.</p>
            </div>

            <div className="Modal-Section">
                <h3>Have fun clustering!</h3>
            </div>
            </div>

            btnLeftProps = {
                title: "Let's go!",
                classes: btnClasses,
                clickFn: this.closeModal
            }
        }

        return (
            <div>
                <Modal id="Explainer-Modal" isOpen={ this.props.isOpen } closeTimeoutMS={ Constants.Global.MODAL_CLOSE_DURATION }>
                <div className="Modal-Title-Container">
                    <h2>How It Works</h2>
                </div>
                <div className="Modal-Content-Container"> 
                <Motion key={ this.state.currentPage } defaultStyle={ { opacity: 0 } } style={ { opacity: spring(1 , { stiffness: Constants.ReactMotion.BTN_STIFFNESS, damping: Constants.ReactMotion.BTN_DAMPING })} }>
                { style => (
                    <div style={{ opacity: style.opacity }}>{ modalContent }</div>
                )}
                </Motion>

                <div>
                    <div className="Pagination-Container">
                        <span className={ "Pagination-Dot " + ( this.state.currentPage === 0 ? "Active" : "" ) }></span>
                        <span className={ "Pagination-Dot " + ( this.state.currentPage === 1 ? "Active" : "" ) }></span>
                        <span className={ "Pagination-Dot " + ( this.state.currentPage === 2 ? "Active" : "" ) }></span>
                    </div>
                </div>
                <br />
                <hr />
                </div>


                    <div className="Modal-Btn-Container">
                        <Button
                            title={ btnLeftProps.title }
                            className={ btnLeftProps.classes }
                            clicked={ btnLeftProps.clickFn }
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateShowExplainerModal: ( show ) => dispatch( actions.updateShowExplainerModal( show ) ),
        onAdvanceState: () => dispatch(actions.advanceState()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplainerModal);