import React, { Component } from 'react';
import './App.css';
import MyChart from './components/Chart/Chart';
import RadioButton from './components/UI/RadioButton/RadioButton';
import Modal from 'react-modal';
import { Connect, connect } from 'react-redux';
import * as Constants from './constants/index';
import Button from './components/UI/Button/Button';
import * as actions from './store/actions/actions';

class App extends Component {

  state = {
    pointsDistribution: this.props.globalProps.pointsDistribution,
    numOfClusters: this.props.globalProps.numOfClusters
  };

  updatePointsDistribution = (event) => {
    this.setState({
      pointsDistribution: event.target.value
    });
  }

  updateNumberOfClusters = ( event ) => {
    this.setState({
      numOfClusters: event.target.value
    })
  }

  // TODO: this is repeated from Chart.js
  // Resets the chart data and puts the app in the "Randomize" application state
  reset = () => {
    this.props.onUpdateChartData( [] );
    this.props.onResetApplicationState();
}

  saveSettings = () => {
    let newProps = { ...this.props.globalProps };
    newProps.numOfClusters = this.state.numOfClusters;
    newProps.pointsDistribution = this.state.pointsDistribution;
    newProps.showSettingsModal = false;

    this.props.onUpdateGlobalProps( newProps );
    this.reset();
  }

  cancelSettings = () => {
    this.props.onUpdateGlobalProps({ showSettingsModal: false });
  }

  render() {
    // IMPROVEMENT: save these repeated values in an object and iterate using "map"
    let modal = <Modal isOpen={ this.props.showSettingsModal }>
      <h2>Chart Settings</h2>
      <hr /><br /><br />
      <h3>Graph Type</h3>
      <div className="radio-btn-container" style={{ display: "flex" }}>
        <RadioButton
          changed={ this.updatePointsDistribution }
          id="linear"
          isSelected={ this.state.pointsDistribution === "linear" }
          label="Linear"
          value="linear"
        />

        <RadioButton
          changed={ this.updatePointsDistribution }
          id="scattered"
          isSelected={ this.state.pointsDistribution === "scattered" }
          label="Scattered"
          value="scattered"
        />
      </div>

      <h3>Number of Clusters</h3>
      <div className="radio-btn-container" style={{ display: "flex" }}>
        <RadioButton
          changed={ this.updateNumberOfClusters }
          id="2"
          isSelected={ this.state.numOfClusters == 2 }
          label="2"
          value="2"
        />

        <RadioButton
          changed={ this.updateNumberOfClusters }
          id="3"
          isSelected={ this.state.numOfClusters == 3 }
          label="3"
          value="3"
        />

        <RadioButton
          changed={ this.updateNumberOfClusters }
          id="4"
          isSelected={ this.state.numOfClusters == 4 }
          label="4"
          value="4"
        />
      </div>


      <Button 
        className="Button Button1"
        title="Save & Restart"
        clicked={ this.saveSettings }
        />

      <Button 
        className="Button Button3"
        title="Cancel"
        clicked={ this.cancelSettings }
        />
        
    </Modal>;

      return (
        <div className="App">
          <MyChart />
          { modal }
        </div>
      );
    }
  }

const mapStateToProps = state => {
  return {
    applicationState: state.globalProps.applicationState,
    showSettingsModal: state.globalProps.showSettingsModal,
    globalProps: state.globalProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowSettingsModal: ( show ) => dispatch( actions.showSettingsModal( show ) ),
    onUpdateGlobalProps: ( props ) => dispatch( actions.updateGlobalProps( props ) ),
    onResetApplicationState: () => dispatch( actions.resetApplicationState() ),
    onUpdateChartData: ( datasets ) => dispatch(actions.updateChartData( datasets ))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
