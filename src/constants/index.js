export const Global = {
    FONT: 'Quicksand',
    NUM_OF_DATA_POINTS: 100,
    LINEAR_DATA_X_MULTIPLIER: 15,
    LINEAR_DATA_Y_MULTIPLIER: 50,
    AUTOMATIC_STEPS_INTERVAL: 1000,
    INITIAL_NUM_OF_CLUSTERS: 3,
    INITIAL_POINTS_DISTRIBUTION: "linear",
    SCATTERED_DATA_X_MULTIPLIER: 119,
    SCATTERED_DATA_Y_MULTIPLIER: 139,
    MODAL_CLOSE_DURATION: 500
}

export const ChartProps = {
    POINT_RADIUS : 10,
    POINT_BORDER_WIDTH: 1,
    CENTROID_RADIUS : 25,
    CENTROID_BORDER_WIDTH: 5,
    GROUP_1_POINT_STYLE: 'circle',
    GROUP_2_POINT_STYLE: 'circle',
    GROUP_3_POINT_STYLE: 'circle',
    ANIMATION_DURATION: 1000,
    ANIMATION_TYPE: 'easeInOutQuart',
    AXIS_MIN: 0,
    AXIS_MAX: 120,
    AXIS_STEP: 10
};

export const Colors = {
    Points: [
        { border: 'rgb(54, 162, 235)', background: 'rgba(54, 162, 235, 0.3)' },
        { border: 'rgb(255, 99, 132)', background: 'rgba(255, 99, 132, 0.3)' },
        { border: 'rgb(255, 187, 51)', background: 'rgba(255, 187, 51, 0.3)' },
        { border: 'rgb(0, 195, 79)', background: 'rgb(0, 195, 79, 0.3)' },
        { border: 'rgb(86, 52, 255)', background: 'rgb(86, 52, 255, 0.3)' }
    ],
    Centroids: [
        { border: 'rgb(54, 162, 235)', background: 'rgba(54, 162, 235, 0.7)' },
        { border: 'rgb(255, 99, 132)', background: 'rgba(255, 99, 132, 0.7)' },
        { border: 'rgb(255, 187, 51)', background: 'rgba(255, 187, 51, 0.7)' },
        { border: 'rgb(0, 195, 79)', background: 'rgb(0, 195, 79, 0.7)' },
        { border: 'rgb(86, 52, 255)', background: 'rgb(86, 52, 255, 0.7)' }
    ]
};

export const Styles = {
    Group: [
        {
            label: 'Cluster 1',
            //borderColor: Colors.Points[0].border,
            backgroundColor: Colors.Points[0].background,
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_1_POINT_STYLE
        },
        {
            label: 'Cluster 2',
            //borderColor: Colors.Points[1].border,
            backgroundColor: Colors.Points[1].background,
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_2_POINT_STYLE,
        },
        {
            label: 'Cluster 3',
            //borderColor: Colors.Points[2].border,
            backgroundColor: Colors.Points[2].background,
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE
        },
        {
            label: 'Cluster 4',
            //borderColor: Colors.Points[3].border,
            backgroundColor: Colors.Points[3].background,
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE
        },
        {
            label: 'Cluster 5',
            //borderColor: Colors.Points[4].border,
            backgroundColor: Colors.Points[4].background,
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE
        }
    ],
    Centroid: [
        {
            label: 'Centroid 1',
            borderColor: Colors.Centroids[0].border,
            backgroundColor: Colors.Centroids[0].background,
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_1_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH
        },
        {
            label: 'Centroid 2',
            borderColor: Colors.Centroids[1].border,
            backgroundColor: Colors.Centroids[1].background,
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_2_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        },
        {
            label: 'Centroid 3',
            borderColor: Colors.Centroids[2].border,
            backgroundColor: Colors.Centroids[2].background,
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        },
        {
            label: 'Centroid 4',
            borderColor: Colors.Centroids[3].border,
            backgroundColor: Colors.Centroids[3].background,
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        },
        {
            label: 'Centroid 5',
            borderColor: Colors.Centroids[4].border,
            backgroundColor: Colors.Centroids[4].background,
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        }
    ],
    Unassigned: [
        {
            label: 'Unassigned',
            borderColor: 'rgb(135, 140, 145)',
            backgroundColor: 'rgba(135, 140, 145, 0.2)',
            pointRadius: ChartProps.POINT_RADIUS,
            pointStyle: 'circle'
        }
    ]
}

export const ApplicationStates = {
    BEGIN: 0,
    RANDOMIZE: 1,
    STEPS: 2,
    FINISHED: 3
}

export const ReactMotion = {
    BTN_STIFFNESS: 60,
    BTN_DAMPING: 7
}

  /* TODO: move this later
        // Then, we assign centroids A and B random positions
        // To do that, we will get 2 distinct random points from the created points. We then find
        // 2 numbers in [0, # of points - 1]
        // We use this logic: https://stackoverflow.com/a/7228322/3659145
        let randomA = -1;
        let randomB = -1;

        // We do a while loop to ensure that randomA and randomB are different
        while (randomB == -1) {
            // First, we assign a random number to random A if needed
            if (randomA == -1) {
                randomA = Math.floor( ( Math.random() * ( prevState.datasets[2].data.length - 1 ) ));
            }

            // We generate a second random number for B
            let tempB = Math.floor( ( Math.random() * ( prevState.datasets[2].data.length - 1 ) ) );

            // If it's different than randomA, we assign it to randomA then
            if (randomA != tempB) {
                randomB = tempB;
            }
        }
    */