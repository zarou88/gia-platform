$(function() {
    'use strict';

    var newCust = [
        [0, 2],
        [1, 3],
        [2, 6],
        [3, 5],
        [4, 7],
        [5, 8],
        [6, 10]
    ];
    var retCust = [
        [0, 1],
        [1, 2],
        [2, 5],
        [3, 3],
        [4, 5],
        [5, 6],
        [6, 9]
    ];

    var plot = $.plot($('#flotArea1'), [{
        data: newCust,
        label: 'New Customer',
        color: '#f7557a '
    }, {
        data: retCust,
        label: 'Returning Customer',
        color: '#007bff'
    }], {
        series: {
            lines: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0
                    }, {
                        opacity: 0.8
                    }]
                }
            },
            shadowSize: 0
        },
        points: {
            show: false,
        },
        legend: {
            noColumns: 1,
            position: 'nw'
        },
        grid: {
            borderWidth: 1,
            borderColor: 'rgba(171, 167, 167,0.2)',
            hoverable: true
        },
        yaxis: {
            min: 0,
            max: 15,
            color: '#eee',
            tickColor: 'rgba(171, 167, 167,0.2)',
            font: {
                size: 10,
                color: '#999'
            }
        },
        xaxis: {
            color: '#eee',
            tickColor: 'rgba(171, 167, 167,0.2)',
            font: {
                size: 10,
                color: '#999'
            }
        }
    });

});
