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

    goBackPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }

    render() {
        let modalContent;
        let btnLeftProps;
        let btnRightProps;
        let btnLeftClasses = Constants.Global.BUTTON_LEFT_CLASSES
        let btnRightClasses = Constants.Global.BUTTON_RIGHT_CLASSES + " Modal-Right-Button"

        if ( this.state.currentPage === 0 ) {
            modalContent =
            <div>                 
            <div className="Modal-Section">
                <h3>K-Means Clustering</h3>
                <p>This project is an implementation of the k-means clustering algorithm, a popular machine learning algorithm.</p>
            </div>
    
            <div className="Modal-Section">
                <h3>What Does K-Means Clustering Do?</h3>
                <p>K-means clustering is used to group similar data points into clusters (groups). Points are similar if they're close to each other in the chart.</p><br />
            </div>
            </div>

            btnLeftProps = {
                title: "",
                classes: "hide",
                clickFn: (()=>{})
            }

            btnRightProps = {
                title: "Next",
                classes: btnRightClasses,
                clickFn: this.advancePage
            }
        } else if ( this.state.currentPage === 1 ) {
            modalContent =    
            <div>                 
            <div className="Modal-Section">
                <h3>Initializing Data</h3>
                <p>Data is initialized to 100 points and 3 clusters. You can shuffle this data as you see fit.</p>
            </div>
            <div className="Modal-Section">
                <h3>Algorithm Steps</h3>
                <p>The first step consists of assigning points to the closest centroid. The second step consists of calculating the average position of each cluster and moving each centroid there.</p><br />
            </div>
            </div>

            btnLeftProps = {
                title: "Back",
                classes: btnLeftClasses,
                clickFn: this.goBackPage
            }

            btnRightProps = {
                title: "Next",
                classes: btnRightClasses,
                clickFn: this.advancePage
            }
        } else {
            modalContent =
            <div>                 
            <div className="Modal-Section">
                <h3>On Finishing</h3>
                <p>The algorithm ends once points stop switching clusters.</p>
            </div>

            <div className="Modal-Section">
            <h3>Customizations</h3>
            <p>In the settings panel, you can change the points' distribution and the number of clusters to use. Also, you can perform steps automatically or manually with the main buttons.</p> <br />
            <p>Have fun clustering!</p>
            </div>

            </div>

            btnLeftProps = {
                title: "Back",
                classes: btnLeftClasses,
                clickFn: this.goBackPage
            }

            btnRightProps = {
                title: "Let's go!",
                classes: btnRightClasses,
                clickFn: this.closeModal
            }
        }

        return (
            <div>
                <Modal id="Explainer-Modal" isOpen={ this.props.isOpen } closeTimeoutMS={ Constants.Global.MODAL_CLOSE_DURATION } ariaHideApp={false}>
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