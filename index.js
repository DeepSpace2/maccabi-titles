let championshipsChartCanvas = document.getElementById("championships-chart");
let cupsChartCanvas = document.getElementById("cups-chart");

Chart.defaults.global.defaultFontColor = '#FFFFFFDE';
Chart.defaults.global.defaultFontSize = 16;
Chart.plugins.register(ChartDataLabels);
Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
    align: 'bottom',
    anchor: 'end',
    color: '#121212',
    font: {
        weight: 'bold'
    }
  });

let graphOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    title: {
        display: true,
        text: ""
    },
    scales: {
        yAxes: [{
            ticks: {
                display: false
            },
            gridLines: {
                display: false
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}


async function iterateYears(data) {

    let yearsToTeams = data["titles"];
    let teamsToColors = data["teams_colors"];

    let championshipsChart = new Chart(championshipsChartCanvas, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'מספר אליפויות',
                data: [],
                backgroundColor: context => {
                    let teamColors = teamsToColors[championshipsIndexToTeamsInData[context.dataIndex]];
                    if (!teamColors) {
                        teamColors = "rgba(255, 255, 255, 1)";
                    }
                    return teamColors;
                }
            }]
        },
        options: graphOptions
    });
    
    let cupsChart = new Chart(cupsChartCanvas, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'מספר גביעים',
                data: [],
                backgroundColor: context => {
                    let teamColors = teamsToColors[cupsIndexToTeamsInData[context.dataIndex]];
                    if (!teamColors) {
                        teamColors = "rgba(255, 255, 255, 1)";
                    }
                    return teamColors;
                }
            }]
        },
        options: graphOptions
    });
    
    const timer = ms => new Promise(res => setTimeout(res, ms));
    let championshipsGraphLabels = championshipsChart.data.labels;
    let championshipsGraphData = championshipsChart.data.datasets[0].data;
    let cupsGraphLabels = cupsChart.data.labels;
    let cupsGraphData = cupsChart.data.datasets[0].data;
    
    
    let championshipsTeamsToIndexInData = {};
    let championshipsIndexToTeamsInData = {};
    let cupsTeamsToIndexInData = {};
    let cupsIndexToTeamsInData = {};

    let {fromYear, toYear} = getQueryParams();
    
    for (const [year, yearData] of Object.entries(yearsToTeams)) {

        if ((fromYear && year < fromYear) || (toYear && year > toYear)) {
            continue
        }   

        let champion = yearData["champion"];
        if (champion) {
            if (championshipsTeamsToIndexInData.hasOwnProperty(champion)) {
                championshipsGraphData[championshipsTeamsToIndexInData[champion]] += 1
            } else {
                championshipsGraphLabels.push(champion);
                let teamIndex = championshipsGraphLabels.length - 1;
                championshipsTeamsToIndexInData[champion] = teamIndex
                championshipsGraphData[teamIndex] = 1
            }
        }

        championshipsChart.options.title.text = `מספר אליפויות בתום עונת ${year}`;

        let sortableTempDict = Object.fromEntries(championshipsGraphLabels.map((_, i) => [championshipsGraphLabels[i], championshipsGraphData[i]]))
        sortedData = Object.entries(sortableTempDict).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        championshipsChart.data.labels = [];
        championshipsChart.data.datasets[0].data = [];
        for (const [team, champs] of Object.entries(sortedData)) {
            championshipsChart.data.labels.push(team)
            championshipsChart.data.datasets[0].data.push(champs)
            championshipsIndexToTeamsInData[championshipsChart.data.labels.length - 1] = team
        }

        championshipsChart.update()

        let cupHolder = yearData["cup"];
        if (cupHolder) {
            if (cupsTeamsToIndexInData.hasOwnProperty(cupHolder)) {
                cupsGraphData[cupsTeamsToIndexInData[cupHolder]] += 1
            } else {
                cupsGraphLabels.push(cupHolder);
                teamIndex = cupsGraphLabels.length - 1;
                cupsTeamsToIndexInData[cupHolder] = teamIndex
                cupsGraphData[teamIndex] = 1
            }
        }

        cupsChart.options.title.text = `מספר גביעים בתום עונת ${year}`;

        sortableTempDict = Object.fromEntries(cupsGraphLabels.map((_, i) => [cupsGraphLabels[i], cupsGraphData[i]]))
        sortedData = Object.entries(sortableTempDict).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        cupsChart.data.labels = [];
        cupsChart.data.datasets[0].data = [];
        for (const [team, cups] of Object.entries(sortedData)) {
            cupsChart.data.labels.push(team)
            cupsChart.data.datasets[0].data.push(cups)
            cupsIndexToTeamsInData[cupsChart.data.labels.length - 1] = team
        }

        cupsChart.update()

        await timer(750);
    }
}


function loadData() {
    iterateYears(data)
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