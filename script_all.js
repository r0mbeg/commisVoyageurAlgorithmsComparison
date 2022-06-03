function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}



function probability(deltaLengthPath, temperature) {
    return (100 * Math.exp(- (deltaLengthPath / (temperature))));
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

function travelLength_incorrect(crawlPath, adjacencyMatrix) {
    if (crawlPath == null) {
        return null;
    } else {
        let sum = 0;
        let tempCrawlPath = crawlPath.slice();
        let crawlSequnce = [];
        for (let i = 0; i < tempCrawlPath.length; i++) {
            crawlSequnce[i] =  minIndexArray(tempCrawlPath);
            tempCrawlPath[crawlSequnce[i]] = 999999;  
        }
        for (let i = 0; i < crawlPath.length - 1; i++) {
            sum = sum + adjacencyMatrix[crawlSequnce[i]][crawlSequnce[i + 1]];
            
        }
        return sum;
    }
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

function nextSet(array) {
    let n = array.length;
    let j = n - 2;
    while (j != -1 && array[j] >= array[j + 1]) j--;
    if (j == -1)
    return false; // больше перестановок нет
    let k = n - 1;
    while (array[j] >= array[k]) k--;
    swap(array, j, k);
    let l = j + 1;
    let r = n - 1;
    while (l < r) 
        swap(array, l++, r--);
    return true;
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
                    
/*let   adjacencyMatrix = [[0,  3,  4,  1, 1, 1, 5],
                         [3,  0,  1, 3,  1, 2,  4], 
                         [4,  1, 0,  1, 1, 3,  3],
                         [1, 3,  1, 0,  1, 4,  2],
                         [1, 1, 1, 1, 0,  5,  1],
                         [1, 2,  3,  4,  5,  0,  5],
                         [5,  4,  3,  2,  1, 5,  0]];*/


//crawlPath = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];





//console.log("Путь:" + crawlPath);
//console.log("Длина пути: " + travelLength(crawlPath, adjacencyMatrix));

//console.log(factorial(adjacencyMatrix.length));
//document.write("Длина пути: " + str);

function brutForce(adjacencyMatrix) {
    let crawlPath = [];
    let pathLength = [];
    let minPathLength = [];
    //заполняем массив числами от 0 до n-1
    let initialArray = Array(adjacencyMatrix.length).fill().map((e, i) => i);
    crawlPath[0] = initialArray.slice();
    pathLength[0] = travelLength(crawlPath[0], adjacencyMatrix);
    minPathLength[0] = pathLength[0];
    let shortestPathNumber = 0;

    //console.log("Начальный путь  [" + crawlPath[shortestPathNumber] + "] : " + pathLength[shortestPathNumber]);

    let i = 1;
    while(nextSet(initialArray)) {
        crawlPath[i] = initialArray.slice();
        pathLength[i] = travelLength(crawlPath[i], adjacencyMatrix);
        if (pathLength[shortestPathNumber] > pathLength[i]) {
            shortestPathNumber = i;
            minPathLength[i] = pathLength[i];
        } else {
            minPathLength[i] = pathLength[shortestPathNumber];
        }
        i++;
    }
    //console.log("Кротчайший путь [" + crawlPath[shortestPathNumber] + "] : " + pathLength[shortestPathNumber]);

    return {
        crawlPath: crawlPath,
        pathLength: pathLength,
        minPathLength: minPathLength
    };


}

function greedy(adjacencyMatrix) {
    let crawlPath = [0, 1];
    let unvisitedVertex = Array(adjacencyMatrix.length).fill().map((e, i) => i);
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        for (let j = 0; j < adjacencyMatrix.length, i != j; j++) {
            if (adjacencyMatrix[i][j] < adjacencyMatrix[crawlPath[0]][crawlPath[1]]) {
                crawlPath = [i, j];
            }
        }
    }
    for (let i = 0; i < unvisitedVertex.length; i++) {
        if (crawlPath[0] == unvisitedVertex[i] || crawlPath[1] == unvisitedVertex[i]) {
            unvisitedVertex.splice(i, 1);
        }
    }
    let min = 9999999999;
    let minVertex = 1;
    let last = crawlPath[crawlPath.length - 1];
    while (crawlPath.length < adjacencyMatrix.length) {
        last = crawlPath[crawlPath.length - 1];
        min = 9999999999;
        minVertex = 1;
        for (let i = 0; i < unvisitedVertex.length; i++) {
                        if (adjacencyMatrix[last][unvisitedVertex[i]] < min && last != unvisitedVertex[i]) {
                //console.log(adjacencyMatrix[last][unvisitedVertex[i]] + " < " + min);
                min = adjacencyMatrix[last][unvisitedVertex[i]];
                minVertex = unvisitedVertex[i];
            }
        }
        crawlPath.push(minVertex);
        for (let i = 0; i < unvisitedVertex.length; i++) {
            if (unvisitedVertex[i] == minVertex) {
                unvisitedVertex.splice(i, 1);
            }
        }
        last = minVertex;
    }
    return crawlPath;
}

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
    return crawlPath[res];
}
//brutForceRes = brutForce(adjacencyMatrix).crawlPath;
//brutForceResNum = brutForce(adjacencyMatrix).shortestPathNumber;

//greedyRes = greedy(adjacencyMatrix);
//simulatedAnnealingRes = simulationAnnealingMethod(adjacencyMatrix);




//console.log("Путь найденный полным перебором " + brutForceRes[brutForceResNum] + " имеет длину " + travelLength(brutForceRes[brutForceResNum], adjacencyMatrix));

//console.log("Путь найденный жадным алгоритмом " + greedyRes + " имеет длину " + travelLength(greedyRes, adjacencyMatrix));

//console.log("Путь найденный методом отжига " + simulatedAnnealingRes + " имеет длину " + travelLength(simulatedAnnealingRes, adjacencyMatrix));

//let iterations = Array(factorial(adjacencyMatrix.length)).fill().map((e, i) => i);
let greedyResMin = brutForce(adjacencyMatrix).minPathLength;


//console.log(brutForcePath[0] + " : " + brutForceLength[0]);

//console.log(brutForcePath[iterations.length - 1] + " : " + brutForceLength[iterations.length - 1]);






new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: Array(30000).fill().map((e, i) => i),
      datasets: [{ 
          data: greedyResMin.slice(0,30000),
          label: "BrutForce",
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