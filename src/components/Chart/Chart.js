import React, {Component} from 'react';
//import {Scatter} from 'react-chartjs-2';
import Chart from 'chart.js';

class MyChart extends Component {
    chartRef = React.createRef();
    myChart;
    

    // TODO: move to Redux
    constructor(props) {
        super(props);

        Chart.defaults.global.defaultFontFamily = 'Poppins';

        

        this.state = {
            doneClustering: false,
            currentStep: 0,
            datasets: [
                {
                  label: 'Group A',
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  pointRadius: 10,
                  data: []
                },
                {
                    label: 'Group B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointRadius: 10,
                    data: []
                },
                {
                    label: 'Unassigned',
                    borderColor: 'rgb(237,204,119)',
                    backgroundColor: 'rgba(237, 204, 119, 0.2)',
                    pointRadius: 10,
                    data: []
                },
                {
                    label: 'Centroid A',
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    pointRadius: 20,
                    data: []
                }, 
                {
                    label: 'Centroid B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    pointRadius: 20,
                    data: []
                },
              ]
        };
    }

    componentDidMount() {
        // console.log(this.chartReference); // returns a Chart.js instance reference

        const myChartRef = this.chartRef.current.getContext("2d");

        this.myChart = new Chart(myChartRef, {
            type: "scatter",
            //data: {
                datasets: [],
                options: {
                    scales: {
                      xAxes: [{
                          ticks: {
                              max: 100,
                              min: 0,
                              stepSize: 10
                          }
                      }
      
                      ],
                      yAxes: [{
                          ticks: {
                              max: 125,
                              min: 0,
                              stepSize: 10
                          }
                      }]
                  },
                  
                  animation: {
                      duration: 500,
                      easing: 'easeInOutCubic'
                  }
              }
            //} 
        });
      }

    initializeData = () => {
        let prevState = { ...this.state };

        // Then, we set the initial state of the data
        // 1) Generate random points for group A
        // 2) Place 2 centroids (A and B) randomly

        // We start by generating random points for the unassigned group
        prevState.datasets[2].data = this.generateRandomPoints(100, true);

        // Then, we assign centroids A and B random positions
        prevState.datasets[3].data = this.generateRandomPoints(1, false);
        prevState.datasets[4].data = this.generateRandomPoints(1, false);

        // Finally, we update the state and the cart as well
        const newState = { doneClustering: false, currentStep: 0, datasets: [ ...prevState.datasets ] };
        this.setState( { newState } )
       this.updateChart();
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
        let doneClustering = true; // is set to false if no points move from one group to the next

        // We start with 1 by calculating the distance of each point to all centroids
        // to assign the point to its closest centroid
        // We first check if this is the first assignment. If so, we'll get all points from dataset C (unassigned)
        if (this.state.currentStep == 0) {
             points = this.state.datasets[2].data;

             // We clear the unassigned points, as they are in the process of being assigned
             this.state.datasets[2].data = [];

            // 1) We assign each point into its corresponding centroid
            [groupA.data, groupB.data] = this.assignPointsToCentroids(points, centroidA, centroidB);
        } else {
            // Otherwise, we use points from A and B, so we merge all points
            // points = [ ...groupA.data, ...groupB.data ];
            
            // For both groups A and B, we traverse their points. If a point is closer to the centroid of the other group,
            // we remove it from one and add it on the other one
            // TODO: iteration/deletion bug
            console.log(groupA.data.slice(0));
            groupA.data.forEach( ( point, index ) => {
                if (this.getDistanceBetweenPoints( point, centroidB ) < this.getDistanceBetweenPoints( point, centroidA )) {
                    // The A point is closer to centroid B, so we remove it from group A and add it to group B
                    
                    console.log('A to B');
                    groupB.data.push(groupA.data.splice(index, 1)[0]);
                    doneClustering = false;
                }
            });

            groupB.data.forEach( ( point, index ) => {
                if (this.getDistanceBetweenPoints( point, centroidA ) < this.getDistanceBetweenPoints( point, centroidB )) {
                    // The A point is closer to centroid B, so we remove it from group A and add it to group B
                    console.log('B to A');
                    groupA.data.push(groupB.data.splice(index, 1)[0]);
                    doneClustering = false;
                }
            });

        }

        // If we are still in the first (zeroth) step, we are obviously not done clustering
        if (this.state.currentStep == 0) {
            doneClustering = false;
        }

        this.setState( { doneClustering: doneClustering, currentStep: this.state.currentStep, datasets: [ groupA, groupB, { ...this.state.datasets[2] }, centroidDatasetA, centroidDatasetB ] } );

        this.updateChart();

        setTimeout(() => {
        // 2) Reposition centroids based on the new average of all of its points
        centroidDatasetA.data = [this.getAveragePositionOfPoints(groupA.data)];
        centroidDatasetB.data = [this.getAveragePositionOfPoints(groupB.data)];

        this.setState( { doneClustering: doneClustering, currentStep: this.state.currentStep + 1, datasets: [ groupA, groupB, { ...this.state.datasets[2] }, centroidDatasetA, centroidDatasetB ] } );
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
                points.push({ x: parseFloat( Math.abs( Math.random() * 10 + i ).toFixed( 2 ) ), y: parseFloat(Math.abs( Math.random() * 25 + i ).toFixed( 2 ) ) });
            }
        } else {
            // We generate points randomly
            for ( let i=0; i<num; i++ ) {
                points.push({ x: parseFloat( Math.abs( Math.random() ).toFixed( 2 ) * 100 ), y: parseFloat(Math.abs( Math.random() ).toFixed( 2 ) ) * 100 });
            }
        }

        return points;
    }

    updateChart = () => {
        this.myChart.data.datasets = this.state.datasets;

        this.myChart.update();
    }

    // Continues each step until clustering is finished
    performAutomatically = () => {
        console.log('performing automatically');

        /*
        while (!this.state.doneClustering ) {
            setTimeout(() => {
                console.log('performing...');
                this.performStep();
            }, 3000);
        }
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
          /*
          // TODO: later on, make conditional so that graph appears with data points with animation
          let scatter;
          if (this.state.currentStep) {
              scatter = <Scatter data={this.state} options={options} />
          }
          */

          if (this.state.doneClustering === true) {
            alert('truly done');
          }

        return (
            <div>
                <div className="Chart">
                 <canvas 
                    id="myChart"
                    ref={this.chartRef}
                    />
                </div>
                <button onClick={this.initializeData}>Randomize</button>
                <button onClick={this.performStep}>Perform Step</button>
                <button onClick={this.performAutomatically}>Automatic</button>
            </div>
        );
    }
}

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

export default MyChart;