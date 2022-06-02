function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
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







/*let adjacencyMatrix = [[0, 3, 4, 1, 1, 1, 5, 4, 3, 2],
                       [3, 0, 1, 3, 1, 2, 4, 2, 2, 3], 
                       [4, 1, 0, 1, 1, 3, 3, 1, 1, 5],
                       [1, 3, 1, 0, 1, 4, 2, 2, 3, 1],
                       [1, 1, 1, 1, 0, 5, 1, 4, 2, 3],
                       [1, 2, 3, 4, 5, 0, 1, 1, 2, 5],
                       [5, 4, 3, 2, 1, 1, 0, 3, 4, 2],
                       [4, 2, 1, 2, 4, 1, 3, 0, 2, 1],
                       [3, 2, 1, 3, 2, 2, 4, 2, 0, 2],
                       [2, 3, 5, 1, 3, 5, 2, 1, 2, 0]];*/
                    
let   adjacencyMatrix = [[0,  3,  4,  10, 10, 10, 5],
                         [3,  0,  10, 3,  10, 2,  4], 
                         [4,  10, 0,  10, 10, 3,  3],
                         [10, 3,  10, 0,  10, 4,  2],
                         [10, 10, 10, 10, 0,  5,  10],
                         [10, 2,  3,  4,  5,  0,  5],
                         [5,  4,  3,  2,  10, 5,  0]];


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
    //выбираются первые две вершины обхода как минимальный элемент матрицы
    
    

    for (let i = 0; i < adjacencyMatrix.length; i++) {
        for (let j = 0; j < adjacencyMatrix.length, i != j; j++) {
            if (adjacencyMatrix[i][j] < adjacencyMatrix[crawlPath[0]][crawlPath[1]]) {
                crawlPath = [i, j];
            }
        }
    }

    let min;
    let minVertex;
    let last;

    while (crawlPath.length < adjacencyMatrix.length) {
        
        last = crawlPath[crawlPath.length - 1];
        
        min = 9999999999;
        minVertex = 1;

        //проходим все вершины в цикле
        for (let i = 0; i < adjacencyMatrix.length; i++) {
            //проходим все вершины пути
            for (let j = 0; j < crawlPath.length; j++) {
                //смотрим, есть вершина, которую мы проходим среди посещённых
                if (i != crawlPath[j] && adjacencyMatrix[last][i] < min) {
                    //почему-то тут выбирается посещённая вершина (????)
                    console.log("i: " + i + " crawlPath: " + crawlPath);
                    min = adjacencyMatrix[last][i];
                    minVertex = i;
                }
            }
        }
        crawlPath.push(minVertex);
        console.log(crawlPath);
        //console.log(travelLength(crawlPath, adjacencyMatrix));
    }
}

greedy(adjacencyMatrix);


let iterations = Array(factorial(adjacencyMatrix.length)).fill().map((e, i) => i);

//brutForcePath = brutForce(adjacencyMatrix).crawlPath;
//brutForceLength = brutForce(adjacencyMatrix).pathLength;

//console.log(brutForcePath[0] + " : " + brutForceLength[0]);

//console.log(brutForcePath[iterations.length - 1] + " : " + brutForceLength[iterations.length - 1]);





/*
new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: iterations,
      datasets: [{ 
          data: brutForce(adjacencyMatrix).minPathLength,
          label: "BrutForce",
          borderColor: "#3e95cd",
          fill: false,
          //cubicInterpolationMode: 'monotone'
        },
        { 
            data: iterations,
            label: "Simulated annealing",
            borderColor: "#8e5ea2",
            fill: false
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
         */