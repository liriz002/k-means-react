import React, { Component } from 'react';
import './App.css';
import MyChart from './components/Chart/Chart';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';
import SummaryModal from './components/UI/Modals/SummaryModal';
import ExplainerModal from './components/UI/Modals/ExplainerModal';
import SettingsModal from './components/UI/Modals/SettingsModal';
import MobileModal from './components/UI/Modals/MobileModal';
import * as Constants from './constants/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth
    }
  }

  // Updates the state's window width
  updateWidth = () => {
    console.log('update width');
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  // Below, we add and remove an event listener for resizing
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  render() {
      return (
        <div className="App">
          <MobileModal isOpen={ this.state.windowWidth < Constants.Global.MIN_WINDOW_WIDTH } />
          <SummaryModal isOpen={ this.props.showSummaryModal } />
          <ExplainerModal isOpen={ this.props.showExplainerModal } />
          <SettingsModal isOpen={ this.props.showSettingsModal } />
          <MyChart />
        </div>
      );
    }
  }

const mapStateToProps = state => {
  return {
    applicationState: state.globalProps.applicationState,
    showSettingsModal: state.globalProps.showSettingsModal,
    showSummaryModal: state.globalProps.showSummaryModal,
    showExplainerModal: state.globalProps.showExplainerModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateShowSettingsModal: ( show ) => dispatch( actions.updateShowSettingsModal( show ) ),
    onUpdateGlobalProps: ( props ) => dispatch( actions.updateGlobalProps( props ) ),
    onResetApplicationState: () => dispatch( actions.resetApplicationState() ),
    onUpdateChartData: ( datasets ) => dispatch(actions.updateChartData( datasets ))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
