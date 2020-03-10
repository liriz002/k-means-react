import React, {Component} from 'react';
import {Scatter} from 'react-chartjs-2';

class Chart extends Component {

    // TODO: move to Redux
    constructor(props) {
        super(props);

        this.state = {
            datasets: [
                {
                  label: 'Group A',
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  pointRadius: 5,
                  data: [],
                },
                {
                    label: 'Group B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointRadius: 5,
                    data: []
                },
                {
                    label: 'Centroid A',
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    pointRadius: 10,
                    data: []
                }, 
                {
                    label: 'Centroid B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointRadius: 10,
                    data: []
                },
              ]
          };
    }
    
    generateData = () => {
        // We generate random points for group A and for group B
        let groupA = { ...this.state.datasets[0] };
        let groupB = { ...this.state.datasets[1] };
        let centroidA = { ...this.state.datasets[2] };
        let centroidB = { ...this.state.datasets[3] };

        let groupAPoints = [];
        let groupBPoints = [];

        for ( let i=0; i<20; i++) {
            groupAPoints.push({ x: parseFloat(Math.abs( Math.random() - 0.5 ).toFixed( 2 )), y: parseFloat(Math.abs( Math.random() - 0.5 ).toFixed( 2 )) });
            groupBPoints.push({ x: parseFloat(Math.abs( Math.random() + 0.5 ).toFixed( 2 )), y: parseFloat(Math.abs( Math.random() + 0.5 ).toFixed( 2 )) });
        }

        groupA.data = groupAPoints;
        groupB.data = groupBPoints;

        // Get new centroid positions
        centroidA.data = [this.getAveragePosition('A')];
        centroidB.data = [this.getAveragePosition('B')];

        const newState = { datasets: [ groupA, groupB, centroidA, centroidB ] };

        this.setState({ ...newState });
    }

    // This returns the average position of all points in a group
    getAveragePosition = (group) => {
        let points = {};

        if (group == '') {
            return {x: 0, y: 0};
        }

        if (group == 'A') {
            points = this.state.datasets[0].data;
        } else if (group == 'B') {
            points = this.state.datasets[1].data;
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
            animation: {
                duration: 2000,
                easing: 'easeInOutCubic'
            }
          };

        return (
            <div>
                <div className="Chart">
                    <Scatter
                        data={this.state}
                        options={options}
                    />
                </div>
                <button onClick={this.generateData}>Randomize</button>
            </div>
        );
    }
}

export default Chart;