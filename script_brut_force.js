function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
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
                    
function brutForce(adjacencyMatrix) {
    let crawlPath = [];
    let pathLength = [];
    let minPathLength = [];

    let shortestPathNumbers = [];
    let minPathLengths = []; 

    //заполняем массив числами от 0 до n-1
    let initialArray = Array(adjacencyMatrix.length).fill().map((e, i) => i);
    crawlPath[0] = initialArray.slice();
    pathLength[0] = travelLength(crawlPath[0], adjacencyMatrix);
    minPathLength[0] = pathLength[0];
    let shortestPathNumber = 0;
    let i = 1;
    while(nextSet(initialArray)) {
        crawlPath[i] = initialArray.slice();
        pathLength[i] = travelLength(crawlPath[i], adjacencyMatrix);
        if (pathLength[shortestPathNumber] > pathLength[i]) {
            shortestPathNumber = i;
            minPathLength[i] = pathLength[i];

            shortestPathNumbers.push(i);
            minPathLengths.push(pathLength[i]);

        } else {
            minPathLength[i] = pathLength[shortestPathNumber];
        }
        i++;
    }
    return {
        crawlPath: crawlPath,
        pathLength: pathLength,
        minPathLength: minPathLength,
        shortestPathNumbers: shortestPathNumbers,
        minPathLengths: minPathLengths
    };
}



let brutForceRes = brutForce(adjacencyMatrix);

let brutForceShortestPathNumbers = brutForceRes.shortestPathNumbers;
let brutForceMinPathLengths = brutForceRes.minPathLengths;


new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: brutForceShortestPathNumbers,
      datasets: [{ 
          data: brutForceMinPathLengths,
          label: "BrutForce",
          borderColor: "#3e95cd",
          fill: false,
          //cubicInterpolationMode: 'monotone'
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: 'Comparison of algorithms for finding the shortest path in a graph'
      },
      scales: {
        x: {
            ticks: {
                font: {
                    size: 20,
                }
            }
        },
        y: {
          ticks: {
              font: {
                  size: 20,
              }
          }
      }
    }
    }
  });


/*
new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: Array(30000).fill().map((e, i) => i),
      datasets: [{ 
          data: brutForceResMin.slice(0,30000),
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
  */