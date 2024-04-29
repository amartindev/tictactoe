import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './components/constant'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
    // Estado del juego
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.X
    })

    const [mode, setMode] = useState(false)

    const [winner, setWinner] = useState(null)
    const [xMoveIndex, setXMoveIndex] = useState([])
    const [oMoveIndex, setOMoveIndex] = useState([])

    // Función para reiniciar el juego
    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setXMoveIndex([])
        setOMoveIndex([])
        setTurn(TURNS.X)
        setWinner(null)
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }

    // Función para verificar si el juego ha terminado
    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square !== null)
    }

    // Función para manejar clics en el tablero clásico
    const classicBoard = (index) => {
        if (board[index] || winner) return
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        // window.localStorage.setItem('board', JSON.stringify(newBoard))
        // window.localStorage.setItem('turn', newTurn)
        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }
    }

    // Función para manejar clics en el tablero infinito
    const infinityBoard = (index) => {
        if (board[index] || winner) return
        let newBoard = [...board]

        // Manejo de índices de movimiento para el tablero infinito
        if (turn === TURNS.X) {
            setXMoveIndex([...xMoveIndex, index])
        } else {
            setOMoveIndex([...oMoveIndex, index])
        }

        newBoard[index] = turn
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

        // Eliminación de movimientos antiguos del tablero infinito
        if (xMoveIndex.length > 2) {
            newBoard[xMoveIndex[0]] = TURNS.Xo
            const newArray = xMoveIndex.slice(1)
            setXMoveIndex(newArray)
            newBoard = newBoard.map((element) => {
                if (element === TURNS.Ox) {
                    return null
                }
                return element
            })
        }
        if (oMoveIndex.length > 2) {
            newBoard[oMoveIndex[0]] = TURNS.Ox
            const newArray = oMoveIndex.slice(1)
            setOMoveIndex(newArray)
            newBoard = newBoard.map((element) => {
                if (element === TURNS.Xo) {
                    return null
                }
                return element
            })
        }

        setBoard(newBoard)
        setTurn(newTurn)
        // window.localStorage.setItem('board', JSON.stringify(newBoard))
        // window.localStorage.setItem('turn', newTurn)

        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }
    }

    // Función para cambiar entre modos de juego
    const handleChangeMode = () => {
        const newMode = !mode
        setMode(newMode)
        resetGame()
    }

    return (
        <main className="board">
            <div className="mode">
                <h2 className="title-mode">Mode:</h2>
                <div className="checkbox-wrapper-10">
                    <input
                        checked={mode}
                        type="checkbox"
                        id="cb5"
                        className="tgl tgl-flip"
                        onChange={handleChangeMode}
                    />
                    <label htmlFor="cb5" data-tg-on="Infinite" data-tg-off="Classic" className="tgl-btn"></label>
                </div>
            </div>
            <div className="title">
                <h1>Tic Tac Toe</h1>
                <div className="title-span">
                    {mode ? (
                        <img className="title-image" src="./public/assets/infinity.png" alt="" />
                    ) : (
                        <span className="title-classic">Classic</span>
                    )}
                </div>
            </div>
            <section className="game">
                {board.map((square, index) => {
                    return (
                        <Square key={index} index={index} updateBoard={mode ? infinityBoard : classicBoard}>
                            {square}
                        </Square>
                    )
                })}
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            <section>
                <button onClick={resetGame}>Reset Game</button>
            </section>
            <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
        </main>
    )
}

export default App
