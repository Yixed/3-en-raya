/* Hacer un tres en raya:

1- Rellenar por JS la tabla del tablero con filas y columnas en una variable
2- Evento onClick para pintar la casilla clicada, bloquear despues
3- Al colocar ficha se cambia el jugador y mostrarlo en pantalla
4- Comprobar cuando se llena el tablero y mostrar un mensaje de tablas
5- Replay reinicia el juego
6- Extra: Comprueba si ha ganado alguien y mostrar alert */

//Hacer la tabla al cargar la pagina
const NUMBER_OF_ROWS = 5,
  NUMBER_OF_COLUMNS = 5
let winCount = 4 //Se define condiccion de victoria
const player1Id = 'X',
  player2Id = 'O' //Declaramos jugadores
var actualPlayer = 'X' //Declaramos jugador actual
var actualPlayerColor = 'red' //Color del jugador actual
let victory = false //Variable de control de fin de juego

function init() {
  tableCreation() //Se crea la tabla
  playerMove() //Cada click en celda se modifica la celda y se cambia de player
  ReplayButton() //Funcionalidad de reinicio
}

function tableCreation() {
  const table$ = document.querySelector('#board')

  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    // NUMBER_OF_ROWS
    const row = document.createElement('tr')
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      //NUMBER_OF_COLUMNS
      const column = document.createElement('td')
      column.textContent = ''
      row.appendChild(column)
    }
    table$.appendChild(row)
  }
  const NUMBER_OF_ROWS$ = document.querySelector('#NUMBER_OF_ROWS')
  NUMBER_OF_ROWS$.textContent = NUMBER_OF_ROWS + ' :nº de filas (y)'
  const NUMBER_OF_COLUMNS$ = document.querySelector('#NUMBER_OF_COLUMNS')
  NUMBER_OF_COLUMNS$.textContent = NUMBER_OF_COLUMNS + ' :nº de columnas (x)'
  const winCount$ = document.querySelector('#winCount')
  winCount$.textContent = winCount + ': Victoria'
}

//Evento onClick para jugar----------------------------
function playerMove() {
  let cells$ = document.querySelectorAll('td') //Seleccionamos las celdas de juego en cells

  const movement = event => {
    if (!event.target.textContent && !victory) {
      //Cuando se clicka se rellena segun el player
      event.target.textContent = actualPlayer //Se actualiza el valor de la celda
      event.target.style.color = actualPlayerColor
      actualPlayer = changePlayer(actualPlayer, player1Id, player2Id)
      actualPlayerColor = actualPlayer === player1Id ? 'red' : '#2eff2e' //SE podria hacer lo mismo con el player
    }
    winnerAlert() //Comprueba si alguien ha ganado
    //checkWinPro()//Solucion Hector Zaragoza
    if (!victory) {
      GameOver() //Comprueba si el tablero está lleno
    }
  }

  for (const cell$ of cells$) {
    //Se recorren los cell para hacer el evento listener
    cell$.addEventListener('click', movement)
  }
}

function changePlayer(actualPlayer_, player1Id_, player2Id_) {
  //Se define quien es el jugador actual
  if (actualPlayer_ === player1Id_) {
    actualPlayer_ = player2Id_
  } else {
    actualPlayer_ = player1Id_
  }
  const actualPlayer$ = document.querySelector('#currentPlayer')
  actualPlayer$.textContent = 'Juega: ' + actualPlayer_
  return actualPlayer_
}

//Al llenarse el tablero mostrar tablas----------------
function GameOver() {
  let cells$ = document.querySelectorAll('td') //Seleccionamos las celdas de juego en cells
  let cellsCount = 0 //Conteo de celdas vacias

  for (const cell$ of cells$) {
    if (cell$.textContent === '') {
      //alert('No hay texto, conteo: ' + cellsCount)
      cellsCount++
    }
  }
  if (cellsCount === 0 && !victory) {
    alert('GAME OVER')
    victory = true
  }
}

//Boton reinicio---------------------------------------
function ReplayButton() {
  let replayButton$ = document.querySelector('#replay')

  const clearing = event => {
    let cells$ = document.querySelectorAll('td')
    for (const cell$ of cells$) {
      cell$.textContent = ''
    }
    victory = false
  }

  replayButton$.addEventListener('click', clearing)
}

//Winner alert-----------------------------------------
function winnerAlert() {
  //RELLENAMOS UNA MATRIZ CON LOS DATOS
  let rows$ = document.querySelectorAll('tr') //Array de tr's
  //console.log(rows$) //array de tr's

  let tableMatrix = [] //Matriz completa
  let rowMatrix1 = [] //Array para ir recopilando filas

  for (let row$ of rows$) {
    //console.log(row$.cells) //row incluye los td's de un tr
    let cells$ = row$.querySelectorAll('td') //Vamos cogiendo los td
    //console.log(cells$)

    for (let cell$ of cells$) {
      rowMatrix1.push(cell$.textContent)
    }
    tableMatrix.push(rowMatrix1)
    rowMatrix1 = []
  }
  console.log(tableMatrix)

  //COMPROBAMOS EN LA MATRIZ SI ALGUIEN HA GANADO

  let count1 = 1,
    count2 = 1
  let horMaxCount1 = 0,
    horMaxCount2 = 0
  let
    verMaxCount1 = 0,
    verMaxCount2 = 0
  let
    dia1MaxCount1 = 0,
    dia1MaxCount2 = 0
  let
    dia2MaxCount1 = 0,
    dia2MaxCount2 = 0

  //Victoria horizontal
  count1 = 1
  count2 = 1
  for (i = 0; i < tableMatrix.length; i++) {
    //numero de filas
    for (let j = 1; j < tableMatrix[i].length; j++) {
      //Numero de columnas
      if (
        tableMatrix[i][j] === player1Id &&
        tableMatrix[i][j] === tableMatrix[i][j - 1]
      ) {
        //console.log('Se tiene X: count: ' + horCount1)
        count1++
        if (count1 > horMaxCount1) {
          horMaxCount1 = count1
          //if (horMaxCount1 >= winCount) {
          //  winPosition = [(i, j),(i-1,j),(i-2,j)]
          //}
        }
      } else {
        count1 = 1 //Si no están seguidas dejamos de contar
      }
      if (
        tableMatrix[i][j] === player2Id &&
        tableMatrix[i][j] === tableMatrix[i][j - 1]
      ) {
        count2++
        if (count2 > horMaxCount2) {
          horMaxCount2 = count2
        }
      } else {
        count2 = 1 //Si no están seguidas dejamos de contar
      }
    }
    count1 = 1
    count2 = 1
  }

  //Victoria vertical
  count1 = 1
  count2 = 1
  for (j = 0; j < tableMatrix[0].length; j++) {
    //numero de filas
    for (i = 1; i < tableMatrix.length; i++) {
      //Numero de columnas
      if (
        tableMatrix[i][j] === player1Id &&
        tableMatrix[i][j] === tableMatrix[i - 1][j]
      ) {
        //console.log('Se tiene X: count: ' + horCount1)
        count1++
        if (count1 > verMaxCount1) {
          verMaxCount1 = count1
        }
      } else {
        count1 = 1 //Si no están seguidas dejamos de contar
      }
      if (
        tableMatrix[i][j] === player2Id &&
        tableMatrix[i][j] === tableMatrix[i - 1][j]
      ) {
        count2++
        if (count2 > verMaxCount2) {
          verMaxCount2 = count2
        }
      } else {
        count2 = 1 //Si no están seguidas dejamos de contar
      }
    }
    count1 = 1
    count2 = 1
  }

  //Victoria diagonal 1 \
  count1 = 1
  count2 = 1
  for (i = 0; i < tableMatrix.length - (winCount - 1); i++) {
    //numero de filas, paramos en la fila donde ya no se podría ganar
    for (let j = 0; j < tableMatrix[i].length - winCount + 1; j++) {
      //Numero de columnas, paramos en la columna donde ya no se podría ganar
      if (tableMatrix[i][j] === player1Id) {
        //Se encuentra X o O
        for (let k = 1; k < winCount; k++) {
          //Bucle que cuenta desde la actual hasta donde llegue la regla
          if (tableMatrix[i][j] === tableMatrix[i + k][j + k]) {
            //Coincide con la diagonal??
            count1++
            if (count1 > dia1MaxCount1) {
              dia1MaxCount1 = count1
            }
          } else {
            count1 = 1 //Si no están seguidas dejamos de contar y salimos del bucle
            break
          }
        }
      }

      if (tableMatrix[i][j] === player2Id) {
        //Se encuentra X o O
        for (let k = 1; k < winCount; k++) {
          //Bucle que cuenta desde la actual hasta donde llegue la regla
          if (tableMatrix[i][j] === tableMatrix[i + k][j + k]) {
            //Coincide con la diagonal??
            count2++
            if (count2 > dia1MaxCount2) {
              dia1MaxCount2 = count2
            }
          } else {
            count2 = 1 //Si no están seguidas dejamos de contar y salimos del bucle
            break
          }
        }
      }
    }
    count1 = 1
    count2 = 1
  }
  //Victoria diagonal 2 /
  count1 = 1
  count2 = 1
  for (i = 0; i < tableMatrix.length - (winCount - 1); i++) {
    //numero de filas, de 0 a total-(wincount-1)
    for (let j = 0 + (winCount - 1); j < tableMatrix[i].length; j++) {
      //Numero de columnas, desde (wincount - 1) hasta el total
      if (tableMatrix[i][j] === player1Id) {
        //Se encuentra X o O
        for (let k = 1; k < winCount; k++) {
          //Bucle que cuenta desde la actual hasta donde llegue la regla
          if (tableMatrix[i][j] === tableMatrix[i + k][j - k]) {
            //Coincide con la diagonal??
            count1++
            if (count1 > dia2MaxCount1) {
              dia2MaxCount1 = count1
            }
          } else {
            count1 = 1 //Si no están seguidas dejamos de contar y salimos del bucle
            break
          }
        }
      }

      if (tableMatrix[i][j] === player2Id) {
        //Se encuentra X o O
        for (let k = 1; k < winCount; k++) {
          //Bucle que cuenta desde la actual hasta donde llegue la regla
          if (tableMatrix[i][j] === tableMatrix[i + k][j - k]) {
            //Coincide con la diagonal??
            count2++
            if (count2 > dia2MaxCount2) {
              dia2MaxCount2 = count2
            }
          } else {
            count2 = 1 //Si no están seguidas dejamos de contar y salimos del bucle
            break
          }
        }
      }
    }
    count1 = 1
    count2 = 1
  }

  //VICTORIA PLAYER 1
  if (
    (horMaxCount1 >= winCount ||
      verMaxCount1 >= winCount ||
      dia1MaxCount1 >= winCount ||
      dia2MaxCount1 >= winCount) &&
    !victory
  ) {
    alert('Las X ganan!!')
    victory = true
  }
  //VICTORIA PLAYER 2
  if (
    (horMaxCount2 >= winCount ||
      verMaxCount2 >= winCount ||
      dia1MaxCount2 >= winCount ||
      dia2MaxCount2 >= winCount) &&
    !victory
  ) {
    alert('Las O ganan!!')
    victory = true
  }

  console.log(verMaxCount1)
  console.log(verMaxCount2)
  console.log(tableMatrix)
}

function winnerResult(i_, j_, direction) {
  //Resaltar las casillas ganadoras
  //i : fila desde arriba, (NUMBER_OF_ROWS - 1) --- tr
  //j : columna desde la izquierda (NUMBER_OF_COLUMNS - 1) --- td en tr
}

function getMatrix() {
  //RELLENAMOS UNA MATRIZ CON LOS DATOS DEL TABLERO
  let rows$ = document.querySelectorAll('tr') //Array de tr's
  //console.log(rows$) //array de tr's

  let tableMatrix = [] //Matriz completa
  let rowMatrix1 = [] //Array para ir recopilando filas

  for (let row$ of rows$) {
    //console.log(row$.cells) //row incluye los td's de un tr
    let cells$ = row$.querySelectorAll('td') //Vamos cogiendo los td
    //console.log(cells$)

    for (let cell$ of cells$) {
      rowMatrix1.push(cell$.textContent)
    }
    tableMatrix.push(rowMatrix1)
    rowMatrix1 = []
  }
  console.log(tableMatrix)
  return tableMatrix
}

function winCheck(i_, j_) {
  //Comprobar la victoria cada vez que se pone ficha , hacia atras y hacia alante
  let boardMatrix = getMatrix()
  
      //Comprobación horizontal 

      //Comprobacion vertical

      //Diagonal 1 

      //Diagonal 2
    
}

//Solución Hector Zaragoza:
function getBoardArray() {
  let board$ = document.querySelector('#board');
  let trs$ = board$.querySelectorAll('tr');
  let boardArray = [];
  for (let tr$ of trs$) {
    let tds$ = tr$.querySelectorAll('td');
    let row = [];
    for (let td$ of tds$) {
      row.push(td$.textContent);
    }

    boardArray.push(row);
  }

  return boardArray;
}
function checkWinPro() {
  let boardArray = getBoardArray();
  for (let r = 0; r < boardArray.length; r++) {
    for (let c = 0; c < boardArray[r].length; c++) {
      if (boardArray[r][c] !== EMPTY_TOKEN) {
        //Horizontal
        if (c - 2 >= 0 && boardArray[r][c - 2] === boardArray[r][c - 1] && boardArray[r - 2] === boardArray[r][c]) {
          return true;
        }
        if (c - 1 >= 0 && c + 1 < boardArray[r].length && boardArray[r][c - 1] === boardArray[r][c] && boardArray[r][c] === boardArray[r][c + 1]) {
          return true;
        }
        if (c + 2 < boardArray[r].length && boardArray[r][c] === boardArray[r][c + 1] && boardArray[r][c] === boardArray[r][c + 2]) {
          return true;
        }

        //Vertical
        if (r - 2 >= 0 && boardArray[r - 2][c] === boardArray[r - 1][c] && boardArray[r - 1][c] === boardArray[r][c]) {
          return true;
        }
        if (r - 1 >= 0 && r + 1 < boardArray.length && boardArray[r - 1][c] === boardArray[r][c] && boardArray[r][c] === boardArray[r + 1][c]) {
          return true;
        }
        if (r + 2 < boardArray.length && boardArray[r][c] === boardArray[r + 1][c] && boardArray[r][c] === boardArray[r + 2][c]) {
          return true;
        }

        //Diagonal left up to right down
        if (r - 2 >= 0 && c - 2 >= 0 && boardArray[r - 2][c - 2] === boardArray[r - 1][c - 1] && boardArray[r - 1][c - 1] === boardArray[r][c]) {
          return true;
        }
        if (r - 1 >= 0 && r + 1 < boardArray.length && c - 1 >= 0 && c + 1 < boardArray[r].length && boardArray[r - 1][c - 1] === boardArray[r][c] && boardArray[r][c] === boardArray[r + 1][c + 1]) {
          return true;
        }
        if (r + 2 < boardArray.length && c + 2 < boardArray[r].length && boardArray[r][c] === boardArray[r + 1][c + 1] && boardArray[r][c] === boardArray[r + 2][c + 2]) {
          return true;
        }

        //Diagonal left down to right up
        if (r - 2 >= 0 && c + 2 < boardArray[r].length && boardArray[r - 2][c + 2] === boardArray[r - 1][c + 1] && boardArray[r - 1][c + 1] === boardArray[r][c]) {
          return true;
        }
        if (r - 1 >= 0 && r + 1 < boardArray.length && c - 1 >= 0 && c + 1 < boardArray[r].length && boardArray[r - 1][c + 1] === boardArray[r][c] && boardArray[r][c] === boardArray[r + 1][c - 1]) {
          return true;
        }
        if (r + 2 < boardArray.length && c - 2 >= 0 && boardArray[r][c] === boardArray[r + 1][c - 1] && boardArray[r][c] === boardArray[r + 2][c - 2]) {
          return true;
        }
      }
    }
  }

  return false;
}

init()
