import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        // console.log("Dice state changed")
        if (checkIfWon()) {
            console.log("You won!")
            setTenzies(true)
        }

    }, [dice])
    /**
     * Challenge: Check the dice array for these winning conditions:
     * 1. All dice are held, and
     * 2. all dice have the same value
     * 
     * If both conditions are true, set `tenzies` to true and log
     * "You won!" to the console
     */

    function checkIfWon() {
        let winningValue = 2 //winning value
        let won = dice.find((die) => !(die.isHeld && die.value == winningValue)) ? false : true

        // console.log(won && setTenzies(won) ? "You won!" : "Try again!");
        return won
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }


    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}