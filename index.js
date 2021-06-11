let championshipsChartCanvas = document.getElementById("championships-chart");
let cupsChartCanvas = document.getElementById("cups-chart");

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 16;

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
        xAxes: [{
            ticks: {
                beginAtZero: true,
                precision: 0
            },
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
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: 'מספר אליפויות',
                data: [],
                backgroundColor: context => teamsToColors[championshipsIndexToTeamsInData[context.dataIndex]]
            }]
        },
        options: graphOptions
    });
    
    let cupsChart = new Chart(cupsChartCanvas, {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: 'מספר גביעים',
                data: [],
                backgroundColor: context => teamsToColors[cupsIndexToTeamsInData[context.dataIndex]]
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

    for (const [year, yearData] of Object.entries(yearsToTeams)) {
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
                cupsGraphData[cupsTeamsToIndexInData[champion]] += 1
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
