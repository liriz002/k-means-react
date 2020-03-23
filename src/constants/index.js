export const Global = {
    FONT: 'Quicksand',
    NUM_OF_DATA_POINTS: 100,
    LINEAR_DATA_X_MULTIPLIER: 10,
    LINEAR_DATA_Y_MULTIPLIER: 30,
    AUTOMATIC_STEPS_INTERVAL: 1000,
    INITIAL_NUM_OF_CLUSTERS: 3,
    INITIAL_POINTS_DISTRIBUTION: "linear"
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

export const Styles = {
    Group: [
        {
            label: 'Cluster 1',
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_1_POINT_STYLE
        },
        {
            label: 'Cluster 2',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_2_POINT_STYLE
        },
        {
            label: 'Cluster 3',
            borderColor: 'rgb(86, 52, 255)',
            backgroundColor: 'rgba(86, 52, 255, 0.3)',
            pointRadius: ChartProps.POINT_RADIUS,
            borderWidth: ChartProps.POINT_BORDER_WIDTH,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE
        }
    ],
    Centroid: [
        {
            label: 'Centroid 1',
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_1_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        },
        {
            label: 'Centroid 2',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_2_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        },
        {
            label: 'Centroid 3',
            borderColor: 'rgb(86, 52, 255)',
            backgroundColor: 'rgb(86, 52, 255, 0.7)',
            pointRadius: ChartProps.CENTROID_RADIUS,
            pointStyle: ChartProps.GROUP_3_POINT_STYLE,
            borderWidth: ChartProps.CENTROID_BORDER_WIDTH,
        }
    ],
    Unassigned: [
        {
            label: 'Unassigned',
            borderColor: 'rgb(237,204,119)',
            backgroundColor: 'rgba(237, 204, 119, 0.2)',
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