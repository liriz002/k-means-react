import React, { Component } from 'react';
import './App.css';
import MyChart from './components/Chart/Chart';
import RadioButton from './components/UI/RadioButton/RadioButton';
import Modal from 'react-modal';
import { Connect, connect } from 'react-redux';
import * as Constants from './constants/index';
import Button from './components/UI/Button/Button';

class App extends Component {

  state = {
    graphType: 'linear',
    graphTypeOptions: {
      // TODO: add options here for each type of options and then map to elements below
    }
  }

  changeGraphType = (event) => {
    this.setState({
      graphType: event.target.value
    });
  }

  render() {

    let modal = <Modal isOpen={ this.props.applicationState === Constants.ApplicationStates.FINISHED }>
      <h2>Graph Type</h2>
      <div className="radio-btn-container" style={{ display: "flex" }}>
        <RadioButton
          changed={ this.changeGraphType }
          id="linear"
          isSelected={ this.state.graphType === "linear" }
          label="Linear"
          value="linear"
        />

        <RadioButton
          changed={ this.changeGraphType }
          id="random"
          isSelected={ this.state.graphType === "random" }
          label="Random"
          value="random"
        />
      </div>

      <Button className="Button Button1" />
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
    applicationState: state.globalProps.applicationState
  };
};

export default connect(mapStateToProps)(App);
