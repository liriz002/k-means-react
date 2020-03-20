import React, {Component} from 'react';
//import {Scatter} from 'react-chartjs-2';
import Chart from 'chart.js';
import * as Constants from '../../constants/index';
import Button from '../UI/Button/Button';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { createStore } from 'redux';


class MyChart extends Component {
    chartRef = React.createRef();
    myChart;
  
    constructor(props) {
        super(props);

        Chart.defaults.global.defaultFontFamily = Constants.Global.FONT;
        this.state = {
            doneClustering: false,
            currentStep: 0
        };
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        this.myChart = new Chart(myChartRef, {
            type: "scatter",
            //data: {
                datasets: [],
                options: {
                    
                    scales: {
                      xAxes: [{
                          ticks: {
                              max: Constants.ChartProps.AXIS_MAX - 10,
                              min: Constants.ChartProps.AXIS_MIN,
                              stepSize: Constants.ChartProps.AXIS_STEP
                          }
                      }
      
                      ],
                      yAxes: [{
                          ticks: {
                              max: Constants.ChartProps.AXIS_MAX,
                              min: Constants.ChartProps.AXIS_MIN,
                              stepSize: Constants.ChartProps.AXIS_STEP
                          }
                      }]
                  },
                  
                  animation: {
                      duration: Constants.ChartProps.ANIMATION_DURATION,
                      easing: Constants.ChartProps.ANIMATION_TYPE
                  }
              }
            //} 
        });
      }

    // Initializes the data in the cart
    initializeData = () => {
        const datasets = [];

        // We start off by generating the points for the chart for the unassigned category
        const points = this.generateRandomPoints(Constants.Global.NUM_OF_DATA_POINTS, true);

        // For each cluster we have, we:
        // 1) Push a dataset for the points associated with the cluster
        // 2) Push a dataset for the cluster itself, setting a random position for it

        for ( let i=0; i<this.props.totalClusters; i++ ) {
            // We get the corresponding group dataset and initialize the data as an empty array
            const groupDataset = { ...Constants.Styles.Group[ i ] };
            groupDataset.data = [];

            // And then the corresponding centroid dataset
            const centroidDataset = { ...Constants.Styles.Centroid[ i ]  };

            // We give the centroid a starting position based on an existing points
            // TODO: maybe have this so that they're always different for each point
            centroidDataset.data = [ points[ Math.floor( Math.random() * ( points.length - 1 ) ) ] ];

            // Finally, we push both the group and centroid datasets
            datasets.push( groupDataset, centroidDataset );
        }

        // Finally, we push push an unassigned dataset which will contain all the points initially
        const unassignedDataset = { ...Constants.Styles.Unassigned[0] };
        unassignedDataset.data = points;
        datasets.push( unassignedDataset );

        // We store this initial data
        this.props.onInitializeChartData( datasets );
    }

    performStep = () => {
        if (this.state.currentStep === undefined) {
            alert('There\'s no data to work with!');

            return;
        }

        // We perform a step of the k-means algorithm, which involves two things:
        // 1) Assign each point to its closest centroid
        // 2) Re-position the centroids according to the average position of all its points

        // Declare some variables
        let newState = { ...this.state };
        let points;
        let centroidA = newState.datasets[3].data[0];
        let centroidB = newState.datasets[4].data[0];
        let doneClustering = true; // is set to false if no points move from one group to the next

        // We start with 1 by calculating the distance of each point to all centroids
        // to assign the point to its closest centroid
        // We first check if this is the first assignment. If so, we'll get all points from dataset C (unassigned)
        if (newState.currentStep == 0) {
             points = newState.datasets[2].data;

             // We clear the unassigned points, as they are in the process of being assigned
             newState.datasets[2].data = [];

            // 1) We assign each point into its corresponding centroid
            [newState.datasets[0].data, newState.datasets[1].data] = this.assignPointsToCentroids(points, centroidA, centroidB);
        } else {
            // Otherwise, we use points from A and B, so we merge all points
            // For both groups A and B, we traverse their points. If a point is closer to the centroid of the other group,
            // we remove it from one and add it on the other one
            for ( let i=newState.datasets[0].data.length-1; i>=0; i-- ) {
                let point = newState.datasets[0].data[i];

                if ( this.getDistanceBetweenPoints( point, centroidB ) < this.getDistanceBetweenPoints( point, centroidA ) ) {
                    // The A point is closer to centroid B, so we remove it from group A and add it to group B
                    newState.datasets[1].data.push(newState.datasets[0].data.splice(i, 1)[0]);
                    doneClustering = false;
                }
            }

           for ( let i=newState.datasets[1].data.length-1; i>=0; i-- ) {
                let point = newState.datasets[1].data[i];

                if ( this.getDistanceBetweenPoints( point, centroidA ) < this.getDistanceBetweenPoints( point, centroidB ) ) {
                    // The B point is closer to centroid A, so we remove it from group B and add it to group A
                    newState.datasets[0].data.push(newState.datasets[1].data.splice(i, 1)[0]);
                    doneClustering = false;
                }
           }
        }

        // If we are still in the first (zeroth) step, we are obviously not done clustering
        if (newState.currentStep == 0) {
            doneClustering = false;
        }

        newState.doneClustering = doneClustering;

        this.setState( { ...newState } );
        this.updateChart();

        setTimeout(() => {
            // 2) Reposition centroids based on the new average of all of its points
            newState.datasets[3].data = [this.getAveragePositionOfPoints(newState.datasets[0].data)];
            newState.datasets[4].data = [this.getAveragePositionOfPoints(newState.datasets[1].data)];

            newState.currentStep += 1;

            this.setState( { ...newState } );
            this.updateChart();
        }, 0);

    }

    // Traverses through a list of points, assigning points to the group of the centroid to which
    // they are closest to (either A or B), returning the points in the form of two arrays
    assignPointsToCentroids = (points, centroidA, centroidB) => {
        let groupA = [];
        let groupB = [];

        points.forEach( point => {
            // If the point is closer to centroid A, we place it in group A
            if ( this.getDistanceBetweenPoints( point, centroidA ) <= this.getDistanceBetweenPoints( point, centroidB ) ) {
                groupA.push(point);
            } else {
                // Otherwise, we place it in group B
                groupB.push(point);
            }
        });

        return [groupA, groupB];
    }

    // Returns the Cartesian, 2D distance between 2 points
    getDistanceBetweenPoints = (pointA, pointB) => {
        return Math.sqrt( Math.pow( ( pointB.x - pointA.x ), 2 ) + Math.pow( ( pointB.y - pointA.y ), 2 ) );
    }
    
    generateRandomPoints = (num, ordered) => {
        let points = [];

        if (ordered) {
            // We generate points in an orderly (somewhat linear) fashion (we allow x and y coordinates to be up to z points away in the positive direction for both)
            // logic here: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript (i + 5 - i + 1) = (5+1) = (6)
            for ( let i=0; i<num; i++ ) {
                points.push({ x: parseFloat( Math.abs( Math.random() * Constants.Global.LINEAR_DATA_X_MULTIPLIER + i ).toFixed( 2 ) ), y: parseFloat(Math.abs( Math.random() * Constants.Global.LINEAR_DATA_Y_MULTIPLIER + i ).toFixed( 2 ) ) });
            }
        } else {
            // We generate points randomly
            for ( let i=0; i<num; i++ ) {
                points.push({ x: parseFloat( Math.abs( Math.random() ).toFixed( 2 ) * 100 ), y: parseFloat(Math.abs( Math.random() ).toFixed( 2 ) ) * 100 });
            }
        }

        return points;
    }

    // Updates the chart based on the given datasets
    updateChart = () => {
        this.myChart.data.datasets = this.props.datasets;
        this.myChart.update();
    }

    // Continues each step until clustering is finished
    performAutomatically = () => {
        // TODO: here we advance to the next application state, but ensure this cannot be called
        // if the user is FINISHED (buttons are blocked)
        //this.advanceState();


        // We perform a step immediately
        this.performStep();

        // Then, we set up an interval that performs steps every certain time
        let stepInterval = window.setInterval(() => {

            // If there are no more steps, we stop the interval
            if (this.state.doneClustering === true) {
                clearInterval(stepInterval);

                return;
            }

            this.performStep();
        }, Constants.Global.AUTOMATIC_STEPS_INTERVAL);
    }


    // This returns the average position of all points in a cluster
    getAveragePositionOfPoints = (points) => {
        if (points.length == 0) {
            return { x: 0, y: 0 };
        }

        // TODO: account for length 0 and 1
        // We traverse each point, keeping track of the sums of the X and Y coordinates
        let xSum = 0;
        let ySum = 0;

        points.forEach(point => {
            xSum += point.x;
            ySum += point.y;
        });

        // Then, we return a point that contains the average of all points in the team
        return { x: ( xSum/points.length ).toFixed( 2 ), y: ( ySum/points.length ).toFixed( 2 ) };
    }

    render() {
        let btn1Props = {};
        let btn2Props = {};
        let button1Classes = "Button Button1";
        let button2Classes = "Button Button2";
        let btnStyle = { opacity: 0 };
        let btnDefaultStyle = { opacity: spring(1 , { stiffness: Constants.ReactMotion.BTN_STIFFNESS, damping: Constants.ReactMotion.BTN_DAMPING })};
        let isDisabled = false;

        console.log('chart ready');
        console.log( this.props );

        // Creates properties for buttons depending on the application state we're in
        switch( this.props.applicationState ) {

            case Constants.ApplicationStates.BEGIN:
                btn1Props = {
                    title: "Begin",
                    classes: button1Classes,
                    clickFn: this.props.onAdvanceState
                }

                btn2Props = {
                    title: "",
                    classes: "hide",
                    clickFn: (() =>{})
                }
                break;

            case Constants.ApplicationStates.RANDOMIZE:
                btn1Props = {
                    title: "Shuffle Data",
                    classes: button1Classes,
                    clickFn: this.initializeData
                }

                btn2Props = {
                    title: "Continue",
                    classes: button2Classes,
                    clickFn: this.props.onAdvanceState
                }

                // TODO: add the below back when we have Redux

                /*
                if (this.state.datasets[2].data.length == 0) {
                    isDisabled = true;
                }
                */

                this.updateChart();

                break;

            case Constants.ApplicationStates.STEPS:
                btn1Props = {
                    title: "Manual Step",
                    classes: button1Classes,
                    clickFn: this.performStep
                }

                btn2Props = {
                    title: "All Steps",
                    classes: button2Classes,
                    clickFn: this.performAutomatically
                }

                this.updateChart();
            break;
            }

            // TODO: possibly use this as an application state instead
          if (this.state.doneClustering === true) {
            console.log('done');
          }

        return (
            <div>                
                <div className="Chart">
                 <canvas 
                    id="myChart"
                    ref={this.chartRef}
                    />
                </div> 

                <Motion key={ this.props.applicationState + '_' + '1' } defaultStyle={ btnStyle } style={ btnDefaultStyle }>
                { style => (
                    <Button 
                        style={{ opacity: style.opacity }}
                        title={ btn1Props.title }
                        className={ btn1Props.classes }
                        clicked={ btn1Props.clickFn }
                    />
                )}
                </Motion>

                <Motion key={ this.props.applicationState + '_' + '2' } defaultStyle={ btnStyle } style={ btnDefaultStyle }>
                { style => (
                    <Button 
                        style={{ opacity: style.opacity }}
                        title={ btn2Props.title }
                        className={ btn2Props.classes }
                        clicked={ btn2Props.clickFn }
                        disabled = { isDisabled }
                    />
                )}
                </Motion>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        applicationState: state.globalProps.applicationState,
        totalClusters: state.globalProps.totalClusters,
        datasets: state.chartData.datasets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdvanceState: () => dispatch(actions.advanceState()),
        onInitializeChartData: ( datasets ) => dispatch(actions.initializeChartData( datasets ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChart);

/*
<Scatter ref={ref => this.chartReference = ref} data={this.state} options={options} />
https://www.youtube.com/watch?v=_aWzGGNrcic

K-means clustering 

Input: K (a set of points x1 ... xn)

Steps:
1) Place centroids c1...ck at random locations

Repeat until convergence:
    for each point xi:
    a) find nearest centroid cj
    b) assign the point xi to cluster j

    for each cluster j = 1...K
    c) new centroid cj = mean of all points xi assigned to cluster j in previous step




*/