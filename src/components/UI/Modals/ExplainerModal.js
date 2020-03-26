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
        let btnRightProps;



        if ( this.state.currentPage == 0 ) {
            modalContent =
            <div className="Modal-Content-Container">                 
            <div className="Modal-Section">
                <h3>K-Means Clustering</h3>
                <p>This project is an implementation of the k-means clustering algorithm, a popular machine learning algorithm.</p>
            </div>
    
            <div className="Modal-Section">
                <h3>What Does K-Means Clustering Do?</h3>
                <p>The k-means algorithm is used to group similar data points into clusters (groups). Clusters are composed
                    of a centroid and a collection of points.</p>
            </div>
            </div>

            btnLeftProps = {
                title: "Steps",
                classes: Constants.Global.BUTTON_LEFT_CLASSES,
                clickFn: this.advancePage
            }

            btnRightProps = {
                title: "Close",
                classes: Constants.Global.BUTTON_RIGHT_CLASSES + " hide",
            }
        } else if ( this.state.currentPage == 1 ) {
            modalContent =    
            <div className="Modal-Content-Container">                 
            <div className="Modal-Section">
                <h3>What are the algorithm steps?</h3>
                <p>After creating data points and placing centroids randomly, the first step consists of assigning points to the closest centroid.</p> <br />
                <p>The second step consists of re-calculating the position of the centroids and moving each to its corresponding new position.</p>
            </div>

            <div className="Modal-Section">
                <h3>In this project...</h3>
                <p>A full step consists of performing the 2 steps above in conjunction.</p>
            </div>
            </div>

            btnLeftProps = {
                title: "Tips",
                classes: Constants.Global.BUTTON_LEFT_CLASSES,
                clickFn: this.advancePage
            }

            btnRightProps = {
                title: "Close",
                classes: Constants.Global.BUTTON_RIGHT_CLASSES + " hide",
            }
        } else {
            modalContent =
            <div className="Modal-Content-Container">                 
            <div className="Modal-Section">
                <h3>Settings</h3>
                <p>In the settings, you can change the points distribution and the number of clusters to use.</p>
            </div>

            <div className="Modal-Section">
            <h3>Steps</h3>
            <p>You can choose to perform a manual step (assignment + repositioning) or have it done automatically (all steps) until the algorithm is done.</p>
            </div>

            <div className="Modal-Section">
                <h3>Have fun clustering!</h3>
            </div>
            </div>

            btnLeftProps = {
                title: "Let's go!",
                classes: Constants.Global.BUTTON_LEFT_CLASSES,
                clickFn: this.closeModal
            }

            btnRightProps = {
                title: "Close",
                classes: Constants.Global.BUTTON_RIGHT_CLASSES + " hide",
            }
        }

        console.log(btnLeftProps);

        return (
            <div>
                <Modal id="Explainer-Modal" isOpen={ this.props.isOpen } closeTimeoutMS={ Constants.Global.MODAL_CLOSE_DURATION }>
                <div className="Modal-Title-Container">
                    <h2>How It Works</h2>
                </div>
                <div >
                <Motion key={ this.state.currentPage } defaultStyle={ { opacity: 0 } } style={ { opacity: spring(1 , { stiffness: Constants.ReactMotion.BTN_STIFFNESS, damping: Constants.ReactMotion.BTN_DAMPING })} }>
                { style => (
                    <div style={{ opacity: style.opacity }}>{ modalContent }</div>
                )}
                </Motion>

                <div>
                    <div className="Pagination-Container">
                        <span className={ "Pagination-Dot " + ( this.state.currentPage == 0 ? "Active" : "" ) }></span>
                        <span className={ "Pagination-Dot " + ( this.state.currentPage == 1 ? "Active" : "" ) }></span>
                        <span className={ "Pagination-Dot " + ( this.state.currentPage == 2 ? "Active" : "" ) }></span>
                    </div>
                </div>

                    <div className="Modal-Btn-Container">

                    <Button
                        title={ btnRightProps.title }
                        className={ btnRightProps.classes }
                        clicked={ btnRightProps.clickFn }
                    />

                    <Button
                        title={ btnLeftProps.title }
                        className={ btnLeftProps.classes }
                        clicked={ btnLeftProps.clickFn }
                    />
                    </div>
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