import Chart from 'chart.js/auto';

$(document).ready(function () {
    let ctx = $('#chartStatisticsPost');
    let categoryNameList = JSON.parse($('#chartStatisticsPost').attr('category-name'));
    let countPostsInMonth = JSON.parse($('#chartStatisticsPost').attr('count-posts-in-month'));
    let chartDatasets = [];

    for (let index = 0; index < categoryNameList.length; index++) {
        chartDatasets.push({
            data: countPostsInMonth[index],
            label: categoryNameList[index],
            borderColor: Samples.utils.color(index),
            backgroundColor: Samples.utils.transparentize(Samples.utils.color(index)),
            fill: false,
        });
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: chartDatasets,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: window.chartColors.red,
                        padding: 20,
                    },
                },
            }, scales: {
                y: {
                    ticks: {
                        stepSize: 1,
                    }
                },
            },
        },
    });
});
