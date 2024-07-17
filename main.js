//Hacer la tabla al cargar la pagina
const player1Id = 'X',
  player2Id = 'O' //Declaramos jugadores
var actualPlayer = 'X' //Declaramos jugador actual
var actualPlayerColor = 'red' //Color del jugador actual
let victory = false //Variable de control de fin de juego

const rows = 10,
  columns = 10
let winCount = 5

init()

function init () {
  playerMove() //Cada click en celda se modifica la celda y se cambia de player
  replayButton() //Funcionalidad de reinicio
  configButton()
}

function tableCreation (rows, columns, victory) {
  const table$ = document.querySelector('#board')
  table$.innerHTML=""

  for (let i = 0; i < rows; i++) {
    // NUMBER_OF_ROWS
    const row = document.createElement('tr')
    for (let j = 0; j < columns; j++) {
      //NUMBER_OF_COLUMNS
      const column = document.createElement('td')
      column.textContent = ''
      row.appendChild(column)
    }
    table$.appendChild(row)
  }
  const NUMBER_OF_ROWS$ = document.querySelector('#NUMBER_OF_ROWS')
  NUMBER_OF_ROWS$.textContent = rows + ' :nº de filas (y)'
  const NUMBER_OF_COLUMNS$ = document.querySelector('#NUMBER_OF_COLUMNS')
  NUMBER_OF_COLUMNS$.textContent = columns + ' :nº de columnas (x)'
  const winCount$ = document.querySelector('#winCount')
  winCount$.textContent = victory + ': Victoria'
}

//Evento onClick para jugar----------------------------
function playerMove () {
  let cells$ = document.querySelectorAll('td') //Seleccionamos las celdas de juego en cells

  const movement = event => {
    if (!event.target.textContent && !victory) {
      //Cuando se clicka se rellena segun el player
      event.target.textContent = actualPlayer //Se actualiza el valor de la celda
      event.target.style.color = actualPlayerColor
      //actualPlayer = changePlayer(actualPlayer, player1Id, player2Id)
      actualPlayer = actualPlayer === player1Id ? player2Id : player1Id
      const actualPlayer$ = document.querySelector('#currentPlayer')
      actualPlayer$.textContent = 'Juega: ' + actualPlayer
      actualPlayerColor = actualPlayer === player1Id ? 'red' : '#2eff2e' //SE podria hacer lo mismo con el player
    }
    winnerAlert() //Comprueba si alguien ha ganado
    if (!victory) {
      gameOver() //Comprueba si el tablero está lleno (tablas)
    }
  }

  for (const cell$ of cells$) {
    //Se recorren los cell para hacer el evento listener
    cell$.addEventListener('click', movement)
  }
}

//Comprobación de tablas -------------------------------
function gameOver () {
  let cells$ = document.querySelectorAll('td') //Seleccionamos las celdas de juego en cells
  let cellsCount = 0 //Conteo de celdas vacias

  for (const cell$ of cells$) {
    if (cell$.textContent === '') {
      cellsCount++
    }
  }

  if (cellsCount === 0 && !victory) {
    alert('GAME OVER')
    victory = true
  }
}

//Boton reinicio---------------------------------------
function replayButton () {
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

//Boton config ---------------------------------------
function configButton () {
  let configButton$ = document.querySelector('#config')

  const loadNewTable = event => {
    console.log('clicked')
    const rowInput$ = document.querySelector('#rowInput')
    const columnInput$ = document.querySelector('#columnInput')
    const victoryInput$ = document.querySelector('#victoryInput')

    let cells$ = document.querySelectorAll('td')
    for (const cell$ of cells$) {
      cell$.textContent = ''
    }
    victory = false

    tableCreation(
      rowInput$.value ? rowInput$.value : 4,
      columnInput$.value ? columnInput$.value : 4,
      victoryInput$.value ? victoryInput$.value : 4
    )
    playerMove() //Se vuelven a cargar los eventlistener de la nueva tabla
  }

  configButton$.addEventListener('click', loadNewTable)
}

//Winner alert-----------------------------------------
function winnerAlert () {
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
  let verMaxCount1 = 0,
    verMaxCount2 = 0
  let dia1MaxCount1 = 0,
    dia1MaxCount2 = 0
  let dia2MaxCount1 = 0,
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

//COMPROBAR DESDE LA CASILLA CLICADA PARA RESALTARLA ---------------------------------------
function getMatrix () {
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

function winCheck (i_, j_) {
  //Comprobar la victoria cada vez que se pone ficha , hacia atras y hacia alante
  let boardMatrix = getMatrix()

  //Comprobación horizontal

  //Comprobacion vertical

  //Diagonal 1 /

  //Diagonal 2 \
}

function winnerResult (i_, j_) {
  //Resaltar las casillas ganadoras
  //i : fila desde arriba, (NUMBER_OF_ROWS - 1) --- tr
  //j : columna desde la izquierda (NUMBER_OF_COLUMNS - 1) --- td en tr
}
