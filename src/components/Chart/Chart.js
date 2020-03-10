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
                  data: [
                    { x: 0.30, y: 0.40},
                    { x: 0.25, y: 0.30 },
                    { x: 0.15, y: 0.25 },
                    { x: 0.30, y: 0.30 },
                    { x: 0.33, y: 0.42 }
                  ],
                },
                {
                    label: 'Group B',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointRadius: 5,
                    data: [
                        { x: 0.45, y: 0.50},
                        { x: 0.55, y: 0.55 },
                        { x: 0.35, y: 0.25 },
                        { x: 0.40, y: 0.50 },
                        { x: 0.33, y: 0.40 },
                    ]
                  }, 
              ]
          };
    }
    
    generateData = () => {
        // We generate random points for group A and for group B
        let groupA = { ...this.state.datasets[0] };
        let groupB = { ...this.state.datasets[1] };

        let groupAPoints = [];
        let groupBPoints = [];

        for ( let i=0; i<50; i++) {
            groupAPoints.push({ x: Math.abs( Math.random() - 0.5 ).toFixed( 2 ), y: Math.abs( Math.random() - 0.5 ).toFixed(2)});
            groupBPoints.push({ x: Math.abs( Math.random() + 0.5 ).toFixed( 2 ), y: Math.abs( Math.random() + 0.5 ).toFixed( 2 ) });
        }

        groupA.data = groupAPoints;
        groupB.data = groupBPoints;

        const newState = { datasets: [groupA, groupB] };
    
        this.setState({ ...newState });
    }

    render() {
        const options = {
            animation: {
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