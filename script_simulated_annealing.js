function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / (10 * temperature))));
}

function minIndexArray(array) {
    let min = array[0];
    let minIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (min > array[i]) {
            min = array[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function changeTwoRandom(crawlPath) {    
    let tempCrawlPath = crawlPath.slice();
    let x = getRandomInt(crawlPath.length);
    let y = getRandomInt(crawlPath.length);
    do {
        y = getRandomInt(crawlPath.length);
    } while (x == y);
    swap(tempCrawlPath, x, y);
    return tempCrawlPath;
}

function shufflePath(crawlPath) {
    tempCrawlPath = crawlPath.slice();
    for (let i = 0; i < crawlPath.length; i ++) {
        tempCrawlPath = changeTwoRandom(tempCrawlPath);
    }
    return tempCrawlPath;
}

function maxIndexArray(array) {
    let max = array[0];
    let maxIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

function travelLength(crawlPath, adjacencyMatrix) {
    let sum = 0;
    for (let i = 0; i < crawlPath.length - 1; i++) {
        sum = sum + adjacencyMatrix[crawlPath[i]][crawlPath[i + 1]];
    }
    return sum;
}


function swap(array, i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

let adjacencyMatrix = [[0, 3, 4, 10, 10, 10, 5, 4, 3, 2],
                       [3, 0, 10, 3, 10, 2, 4, 2, 2, 3], 
                       [4, 10, 0, 10, 10, 3, 3, 10, 10, 5],
                       [10, 3, 10, 0, 10, 4, 2, 2, 3, 10],
                       [10, 10, 10, 10, 0, 5, 10, 4, 2, 3],
                       [10, 2, 3, 4, 5, 0, 10, 10, 2, 5],
                       [5, 4, 3, 2, 10, 10, 0, 3, 4, 2],
                       [4, 2, 10, 2, 4, 10, 3, 0, 2, 10],
                       [3, 2, 10, 3, 2, 2, 4, 2, 0, 2],
                       [2, 3, 5, 10, 3, 5, 2, 10, 2, 0]];
                    
function simulationAnnealingMethod(adjacencyMatrix) {
    let crawlPath = [];
    crawlPath[0] = [];
    
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        crawlPath[0][i] = i;
    } 
    
    let pathLength = [];
    pathLength[0] = travelLength(crawlPath[0], adjacencyMatrix);

    let temperature = 100;
    let alpha = 0.999;
    let p = 0;
    let i = 1;
    let testP = Math.random() * 100;
    let res = 0;
    let deltaLengthPath = 0;

    while (temperature >= 0.01) {
        crawlPath[i] = changeTwoRandom(crawlPath[i - 1]);
        pathLength[i] = travelLength(crawlPath[i], adjacencyMatrix);
        deltaLengthPath = pathLength[i] - pathLength[i - 1];

        if (deltaLengthPath <= 0) {
            res = i;
            i++;
        } else {
            p = probability(deltaLengthPath, temperature);
            testP = Math.random() * 100;
            if (p > testP) {
                res = i;
                i++;
            }
        }
        temperature *= alpha;
    }
    return {
        crawlPath,
        pathLength,
        res
    }; 
    
}

simulationAnnealingMethod(adjacencyMatrix);

simulatedAnnealingRes1 = simulationAnnealingMethod(adjacencyMatrix);
simulatedAnnealingRes2 = simulationAnnealingMethod(adjacencyMatrix);
simulatedAnnealingRes3 = simulationAnnealingMethod(adjacencyMatrix);
simulatedAnnealingRes4 = simulationAnnealingMethod(adjacencyMatrix);
simulatedAnnealingRes5 = simulationAnnealingMethod(adjacencyMatrix);


crawlPath1 = simulatedAnnealingRes1.crawlPath;
crawlPath2 = simulatedAnnealingRes2.crawlPath;
crawlPath3 = simulatedAnnealingRes3.crawlPath;
crawlPath4 = simulatedAnnealingRes4.crawlPath;
crawlPath5 = simulatedAnnealingRes5.crawlPath;

res1 = simulatedAnnealingRes1.res;
res2 = simulatedAnnealingRes2.res;
res3 = simulatedAnnealingRes3.res;
res4 = simulatedAnnealingRes4.res;
res5 = simulatedAnnealingRes5.res;

console.log(crawlPath1[res1] + " имеет длину " + travelLength(crawlPath1[res1], adjacencyMatrix) + " и найдена за " + crawlPath1.length + " итераций");
console.log(crawlPath2[res2] + " имеет длину " + travelLength(crawlPath2[res2], adjacencyMatrix) + " и найдена за " + crawlPath2.length + " итераций");
console.log(crawlPath3[res3] + " имеет длину " + travelLength(crawlPath3[res3], adjacencyMatrix) + " и найдена за " + crawlPath3.length + " итераций");
console.log(crawlPath4[res4] + " имеет длину " + travelLength(crawlPath4[res4], adjacencyMatrix) + " и найдена за " + crawlPath4.length + " итераций");
console.log(crawlPath5[res5] + " имеет длину " + travelLength(crawlPath5[res5], adjacencyMatrix) + " и найдена за " + crawlPath5.length + " итераций");

new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: Array(crawlPath1.length).fill().map((e, i) => i),
      datasets: [{ 
          data: simulatedAnnealingRes1.pathLength,
          label: "Simulated Annealing",
          borderColor: "#3e95cd",
          fill: false,
          cubicInterpolationMode: 'monotone'
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Comparison of algorithms for finding the shortest path in a graph'
      }
    }
  });