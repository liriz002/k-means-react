import React, {Component} from 'react';
import {Scatter} from 'react-chartjs-2';

class Chart extends Component {
    // TODO: move to Redux
    constructor(props) {
        super(props);

        this.state = {};
    }

    initializeData = () => {
        // We build the initial state using datasets
        let initialState = {
            currentStep: 0,
            datasets: [
                {
                  label: 'Group A',
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  pointRadius: 5
                },
                {
                    label: 'Group B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointRadius: 5
                },
                {
                    label: 'Unassigned',
                    borderColor: 'rgb(237,204,119)',
                    backgroundColor: 'rgba(237, 204, 119, 0.2)',
                    pointRadius: 5
                },
                {
                    label: 'Centroid A',
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    pointRadius: 12
                }, 
                {
                    label: 'Centroid B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    pointRadius: 12
                },
              ]
          };

        // Then, we set the initial state of the data
        // 1) Generate random points for group A
        // 2) Place 2 centroids (A and B) randomly

        // We start by generating random points for group A
        //const datasetA = { ...initialState.datasets[2] };
        initialState.datasets[2].data = this.generateRandomPoints(40);

        // Then, we pick centroids based on 2 random points from the generated points
        //const centroidA = { ...initialState.datasets[3] };
        //const centroidB = { ...initialState.datasets[4] };
        initialState.datasets[3].data = [{ ...initialState.datasets[2].data[0] }];
        initialState.datasets[4].data = [{ ...initialState.datasets[2].data[1] }];

        console.log(initialState);
        // const newState = { counter: this.state.counter + 1, datasets: [ datasetA, {}, centroidA, centroidB ] };
        this.setState({ ...initialState });
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
        let points;
        let centroidA = this.state.datasets[3].data[0];
        let centroidB = this.state.datasets[4].data[0];
        let groupA = { ...this.state.datasets[0] };
        let groupB = { ...this.state.datasets[1] };
        let centroidDatasetA = { ...this.state.datasets[3] };
        let centroidDatasetB = { ...this.state.datasets[4] };

        // We start with 1 by calculating the distance of each point to all centroids
        // to assign the point to its closest centroid
        // We first check if this is the first assignment. If so, we'll get all points from dataset C (unassigned)
        if (this.state.currentStep == 0) {
             points = this.state.datasets[2].data;

             // We clear the unassigned points, as they are in the process of being assigned
             this.state.datasets[2].data = [];
        } else {
            // Otherwise, we use points from A and B, so we merge all points
            console.log('1+ step');
            points = [ ...groupA.data, ...groupB.data ];
            console.log(points);
        }

        // 1) We assign each point into its corresponding centroid
        [groupA.data, groupB.data] = this.assignPointsToCentroids(points, centroidA, centroidB);

        this.setState( { currentStep: this.state.currentStep + 1, datasets: [ groupA, groupB, { ...this.state.datasets[2] }, centroidDatasetA, centroidDatasetB ] } );
        console.log(this.state);

        setTimeout(() => {
        // 2) Reposition centroids based on the new average of all of its points
        centroidDatasetA.data = [this.getAveragePositionOfPoints(groupA.data)];
        centroidDatasetB.data = [this.getAveragePositionOfPoints(groupB.data)];

        this.setState( { currentStep: this.state.currentStep + 1, datasets: [ groupA, groupB, { ...this.state.datasets[2] }, centroidDatasetA, centroidDatasetB ] } );
        }, 2000);
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
    
    generateRandomPoints = (num) => {
        let points = [];

        for ( let i=0; i<num; i++ ) {
            points.push({ x: parseFloat( Math.abs( Math.random() ).toFixed( 2 ) * 100 ), y: parseFloat(Math.abs( Math.random() ).toFixed( 2 ) ) * 100 });
        }

        return points;
    }

    generateData = () => {
        /*
        let groupA = { ...this.state.datasets[0] };
        let groupB = { ...this.state.datasets[1] };
        let centroidA = { ...this.state.datasets[2] };
        let centroidB = { ...this.state.datasets[3] };

        let groupAPoints = this.generateRandomPoints(20);
        let groupBPoints = this.generateRandomPoints(20);

        
        for ( let i=0; i<20; i++ ) {
            groupAPoints.push({ x: parseFloat( Math.abs( Math.random() - 0.5 ).toFixed( 2 ) ), y: parseFloat(Math.abs( Math.random() - 0.5 ).toFixed( 2 )) });
            groupBPoints.push({ x: parseFloat( Math.abs( Math.random() + 0.5 ).toFixed( 2 ) ), y: parseFloat(Math.abs( Math.random() + 0.5 ).toFixed( 2 )) });
        }
        

        groupA.data = groupAPoints;
        groupB.data = groupBPoints;

        
        if (this.state.counter == 2) {
            let removedEl = groupAPoints.pop();
            groupB.data.push({ x: 0.5, y: 0.5 });
        }
        

        // Get new centroid positions
        centroidA.data = [this.getAveragePositionOfPoints(groupAPoints)];
        centroidB.data = [this.getAveragePositionOfPoints(groupBPoints)];

        const newState = { counter: this.state.counter + 1, datasets: [ groupA, groupB, centroidA, centroidB ] };

        this.setState({ ...newState });

        console.log(this.state.counter);
        */
    }

    // This returns the average position of all points in a group
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
        const options = {
            scales: {
                xAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 20
                    }
                }

                ],
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 20
                    }
                }]
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutCubic',
                onProgress: function(animation) {
                    console.log(animation);
                }
            }
          };

          /*
          // TODO: later on, make conditional so that graph appears with data points with animation
          let scatter;
          if (this.state.currentStep) {
              scatter = <Scatter data={this.state} options={options} />
          }
          */

        return (
            <div>
                <div className="Chart">
                 <Scatter data={this.state} options={options} />
                </div>
                <button onClick={this.initializeData}>Randomize</button>
                <button onClick={this.performStep}>Perform Step</button>
            </div>
        );
    }
}

/*

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

export default Chart;