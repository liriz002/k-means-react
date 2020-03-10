import React, {Component} from 'react';
import {Bar, Line, Pie, Scatter} from 'react-chartjs-2';

class Chart extends Component {
    // TODO: move to Redux
    constructor(props) {
        super(props);
        this.state = {
            datasets: [
              {
                label: 'Group A',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                data: [
                  { x: 1, y: 1},
                  { x: 0.5, y: 0.5 },
                  { x: 0.75, y: 0.75 },
                  { x: 0.85, y: 0.85 }
                ]
              }
            ]
          
          
          };
 
    }
    

    render() {
        const data = {
            
          };

        return (
                <div className="Chart">
                    <Scatter
                        data={this.state}
                    />
                </div>
        );
    }
}

export default Chart;