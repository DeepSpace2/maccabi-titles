let championshipsChartCanvas = document.getElementById("championships-chart");
let cupsChartCanvas = document.getElementById("cups-chart");

let yearsToTeams = {
        "1932": {
            "champion": "המשטרה הבריטית",
            "cup": "המשטרה הבריטית"
        },
        "1933": {
            "cup": "מכבי תל אביב"
        },
        "1934": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל תל אביב"
        },
        "1935": {
            "champion": "הפועל תל אביב",
            "cup": "מכבי פתח תקווה"
        },
        "1936": {
            "champion": "מכבי תל אביב"
        },
        "1937": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל תל אביב"
        },
        "1938": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל תל אביב"
        },
        "1939": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל תל אביב"
        },
        "1940": {
            "champion": "הפועל תל אביב",
            "cup": "ביתר תל אביב"
        },
        "1941": {
            "cup": "מכבי תל אביב"
        },
        "1942": {
            "champion": "מכבי תל אביב",
            "cup": "ביתר תל אביב"
        },
        "1944": {
            "champion": "הפועל תל אביב"
        },
        "1945": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל תל אביב"
        },
        "1946": {
            "cup": "מכבי תל אביב"
        },
        "1947": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1950": {
            "champion": "מכבי תל אביב"
        },
        "1952": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי פתח תקווה"
        },
        "1954": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1955": {
            "champion": "הפועל פתח תקווה",
            "cup": "מכבי תל אביב"
        },
        "1956": {
            "champion": "מכבי תל אביב"
        },
        "1957": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל פתח תקווה"
        },
        "1958": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1959": {
            "champion": "הפועל פתח תקווה",
            "cup": "מכבי תל אביב"
        },
        "1960": {
            "champion": "הפועל פתח תקווה"
        },
        "1961": {
            "champion": "הפועל פתח תקווה",
            "cup": "הפועל תל אביב"
        },
        "1962": {
            "champion": "הפועל פתח תקווה",
            "cup": "מכבי חיפה"
        },
        "1963": {
            "champion": "הפועל פתח תקווה",
            "cup": "הפועל חיפה"
        },
        "1964": {
            "champion": "הפועל רמת גן",
            "cup": "מכבי תל אביב"
        },
        "1965": {
            "champion": "הכח רמת גן",
            "cup": "מכבי תל אביב"
        },
        "1966": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל חיפה"
        },
        "1967": {
            "cup": "מכבי תל אביב"
        },
        "1968": {
            "champion": "מכבי תל אביב",
            "cup": "בני יהודה"
        },
        "1969": {
            "champion": "הפועל תל אביב",
            "cup": "הכח רמת גן"
        },
        "1970": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1971": {
            "champion": "מכבי נתניה",
            "cup": "הכח רמת גן"
        },
        "1972": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל תל אביב"
        },
        "1973": {
            "champion": "הכח רמת גן",
            "cup": "הפועל ירושלים"
        },
        "1974": {
            "champion": "מכבי נתניה",
            "cup": "הפועל חיפה"
        },
        "1975": {
            "champion": "הפועל באר שבע",
            "cup": "הפועל כפר סבא"
        },
        "1976": {
            "champion": "הפועל באר שבע",
            "cup": "ביתר ירושלים"
        },
        "1977": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1978": {
            "champion": "מכבי נתניה",
            "cup": "מכבי נתניה"
        },
        "1979": {
            "champion": "מכבי תל אביב",
            "cup": "ביתר ירושלים"
        },
        "1980": {
            "champion": "מכבי נתניה",
            "cup": "הפועל כפר סבא"
        },
        "1981": {
            "champion": "הפועל תל אביב",
            "cup": "בני יהודה"
        },
        "1982": {
            "champion": "הפועל כפר סבא",
            "cup": "הפועל יהוד"
        },
        "1983": {
            "champion": "מכבי נתניה",
            "cup": "הפועל תל אביב"
        },
        "1984": {
            "champion": "מכבי חיפה",
            "cup": "הפועל לוד"
        },
        "1985": {
            "champion": "מכבי חיפה",
            "cup": "ביתר ירושלים"
        },
        "1986": {
            "champion": "הפועל תל אביב",
            "cup": "ביתר ירושלים"
        },
        "1987": {
            "champion": "ביתר ירושלים",
            "cup": "מכבי תל אביב"
        },
        "1988": {
            "champion": "הפועל תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1989": {
            "champion": "מכבי חיפה",
            "cup": "ביתר ירושלים"
        },
        "1990": {
            "champion": "בני יהודה",
            "cup": "הפועל כפר סבא"
        },
        "1991": {
            "champion": "מכבי חיפה",
            "cup": "מכבי חיפה"
        },
        "1992": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל פתח תקווה"
        },
        "1993": {
            "champion": "ביתר ירושלים",
            "cup": "מכבי חיפה"
        },
        "1994": {
            "champion": "מכבי חיפה",
            "cup": "מכבי תל אביב"
        },
        "1995": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי חיפה"
        },
        "1996": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "1997": {
            "champion": "ביתר ירושלים",
            "cup": "הפועל באר שבע"
        },
        "1998": {
            "champion": "ביתר ירושלים",
            "cup": "מכבי חיפה"
        },
        "1999": {
            "champion": "הפועל חיפה",
            "cup": "הפועל תל אביב"
        },
        "2000": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל תל אביב"
        },
        "2001": {
            "champion": "מכבי חיפה",
            "cup": "מכבי תל אביב"
        },
        "2002": {
            "champion": "מכבי חיפה",
            "cup": "מכבי תל אביב"
        },
        "2003": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל רמת גן"
        },
        "2004": {
            "champion": "מכבי חיפה",
            "cup": "בני סכנין"
        },
        "2005": {
            "champion": "מכבי חיפה",
            "cup": "מכבי תל אביב"
        },
        "2006": {
            "champion": "מכבי חיפה",
            "cup": "הפועל תל אביב"
        },
        "2007": {
            "champion": "ביתר ירושלים",
            "cup": "הפועל תל אביב"
        },
        "2008": {
            "champion": "ביתר ירושלים",
            "cup": "ביתר ירושלים"
        },
        "2009": {
            "champion": "מכבי חיפה",
            "cup": "ביתר ירושלים"
        },
        "2010": {
            "champion": "הפועל תל אביב",
            "cup": "הפועל תל אביב"
        },
        "2011": {
            "champion": "מכבי חיפה",
            "cup": "הפועל תל אביב"
        },
        "2012": {
            "champion": "עירוני קריית שמונה",
            "cup": "הפועל תל אביב"
        },
        "2013": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל רמת גן"
        },
        "2014": {
            "champion": "מכבי תל אביב",
            "cup": "עירוני קריית שמונה"
        },
        "2015": {
            "champion": "מכבי תל אביב",
            "cup": "מכבי תל אביב"
        },
        "2016": {
            "champion": "הפועל באר שבע",
            "cup": "מכבי חיפה"
        },
        "2017": {
            "champion": "הפועל באר שבע",
            "cup": "בני יהודה"
        },
        "2018": {
            "champion": "הפועל באר שבע",
            "cup": "הפועל חיפה"
        },
        "2019": {
            "champion": "מכבי תל אביב",
            "cup": "בני יהודה"
        },
        "2020": {
            "champion": "מכבי תל אביב",
            "cup": "הפועל חיפה"
        }
}

let teamsToColors = {
    "המשטרה הבריטית": "rgba(54, 162, 235, 1)",
    "בני יהודה": "rgba(255, 159, 64, 1)",
    "מכבי חיפה": "rgba(11, 156, 49, 1)",
    "הכח רמת גן": "rgba(153, 102, 255, 1)",
    "הפועל פתח תקווה": "rgba(54, 162, 235, 1)",
    "הפועל באר שבע": "rgba(255, 99, 132, 1)",
    "הפועל כפר סבא": "rgba(11, 156, 49, 1)",
    "הפועל תל אביב": "rgba(255, 99, 132, 1)",
    "ביתר ירושלים": "rgba(255, 206, 86, 1)",
    "עירוני קריית שמונה": "rgba(54, 162, 235, 1)",
    "מכבי נתניה": "rgba(255, 206, 86, 1)",
    "הפועל חיפה": "rgba(255, 99, 132, 1)",
    "מכבי תל אביב": "rgba(255, 206, 86, 1)",
    "הפועל רמת גן": "rgba(255, 99, 132, 1)",
    "ביתר תל אביב": "rgba(54, 162, 235, 1)",
    "מכבי פתח תקווה": "rgba(54, 162, 235, 1)",
    "בני סכנין": "rgba(255, 99, 132, 1)",
    "הפועל יהוד": "rgba(54, 162, 235, 1)",
    "הפועל לוד": "rgba(255, 99, 132, 1)",
    "הפועל ירושלים": "rgba(255, 99, 132, 1)",
}

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

async function iterateYears() {
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

iterateYears();