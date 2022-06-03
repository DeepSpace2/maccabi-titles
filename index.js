let championshipsChartCanvas = document.getElementById("championships-chart").getContext("2d");
let cupsChartCanvas = document.getElementById("cups-chart").getContext("2d");

let championshipsTeamsToIndexInData = {};
let championshipsIndexToTeamsInData = {};

let cupsTeamsToIndexInData = {};
let cupsIndexToTeamsInData = {};

Chart.defaults.color = '#FFFFFFDE';
Chart.defaults.font.size = 16;
Chart.register(ChartDataLabels);
Chart.helpers.merge(Chart.defaults.plugins.datalabels, {
    align: 'bottom',
    anchor: 'end',
    color: '#121212',
    font: {
        weight: 'bold'
    }
  });

var graphOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: ""
        }
    },
    scales: {
        y: {
            ticks: {
                display: false
            },
            gridLines: {
                display: false
            }
        },
        x: {
            gridLines: {
                display: false
            }
        }
    }
}


function getTeamColors(teamsToColors, teamsData, dataIndex) {
    let teamColors = teamsToColors[teamsData[dataIndex]];
    if (!teamColors) {
        teamColors = "rgba(255, 255, 255, 1)";
    }
    return teamColors;
}

function createChart(canvas, label, teamsToColors, teamsData) {
    let chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: [],
                backgroundColor: context => {
                    return getTeamColors(teamsToColors, teamsData, context.dataIndex)
                }
            }]
        },
        options: graphOptions
    });

    return [
        chart,
        chart.data.labels,
        chart.data.datasets[0].data
    ];
}

function populateChart(chart, chartLabels, chartData, year, titleHolder, indexedData, titlePluralHebrewName) {
    if (titleHolder) {
        if (indexedData.hasOwnProperty(titleHolder)) {
            chartData[indexedData[titleHolder]] += 1;
        } else {
            chartLabels.push(titleHolder);
            let teamIndex = chartLabels.length - 1;
            indexedData[titleHolder] = teamIndex;
            chartData[teamIndex] = 1;
        }
    }

    chart.options.plugins.title.text = `מספר ${titlePluralHebrewName} בתום עונת ${year}`;

    let sortableTempDict = Object.fromEntries(chartLabels.map((_, i) => [chartLabels[i], chartData[i]]));
    sortedData = Object.entries(sortableTempDict).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    for (const [team, numberOfTitles] of Object.entries(sortedData)) {
        chart.data.labels.push(team);
        chart.data.datasets[0].data.push(numberOfTitles);
        indexedData[chart.data.labels.length - 1] = team;
    }

    chart.update();
}

async function iterateYears(data) {

    let yearsToTeams = data["titles"];
    let teamsToColors = data["teams_colors"];
    
    let [ championshipsChart, championshipsChartLabels, championshipsChartData ] = createChart(championshipsChartCanvas, 'מספר אליפויות', teamsToColors, championshipsIndexToTeamsInData);
    let [ cupsChart, cupsChartLabels, cupsChartData ] = createChart(cupsChartCanvas, 'מספר גביעים', teamsToColors, cupsIndexToTeamsInData);
    
    const timer = ms => new Promise(res => setTimeout(res, ms));

    let {fromYear, toYear} = getQueryParams();

    for (const [year, yearData] of Object.entries(yearsToTeams)) {

        if ((fromYear && year < fromYear) || (toYear && year > toYear)) {
            continue;
        }   

        populateChart(championshipsChart, championshipsChartLabels, championshipsChartData, year, yearData["champion"], championshipsIndexToTeamsInData, "אליפויות");

        populateChart(cupsChart, cupsChartLabels, cupsChartData, year, yearData["cup"], cupsIndexToTeamsInData, "גביעים");

        await timer(750);
    }
}


function loadData() {
    iterateYears(data);
}


function getQueryParams() {
       let queryParams = window.location.search.substring(1).split("&");
       let params = {};
       for (let queryParam of queryParams ) {
               let [key, value] =queryParam.split("=");
               params[key] = value
               
       }
       return params;
}