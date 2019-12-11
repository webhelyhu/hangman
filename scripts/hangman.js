'use strict'

class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word
        this.wordLower = word.toLowerCase().split('')
        this._puzzle = "*".repeat(word.length)          // the get puzzle handles this variable
        this.remainingGuesses = remainingGuesses
        this.askedLetters = [' ', ',', '.']             // by default, these chars are "already guessed"
        this._status = "playing"
    }

    guess (gotLetter) {
        // if an already asked letter: just skip
        // if new letter:
        //    push into the array of asked letters
        //    -- if it's not in the puzzle: decrease guesses

        const letter = gotLetter.toLowerCase()
        console.log(`___guessed: ${letter}`)

        if (this._status !== "playing") {
            console.log('The game is over, you can not guess more')
            return
        }

        if (this.askedLetters.includes(letter)) {
            // the character was asked before, ignoring
            console.log('Ignoring already asked letter')
        } else if (letter === ' ') {
            console.log('Ignoring space')
        } else {
            this.askedLetters.push (letter)
            if (!this.wordLower.includes(letter)) {
                // wrong letter
                this.remainingGuesses--
            }
        }
        this.recalculate()
    }

    get puzzle () {
        // returning the status, in a format like: "***s**e* ***es"
        this._puzzle = ''
        this.wordLower.forEach(element => {
            this._puzzle += this.askedLetters.includes(element) || element === ' ' ? element : '*'
        });
        return this._puzzle
    }

    get status  () {
        // returns the text for the status line
        if (this._status === 'finished') {
            // player has won the game:
            return "Congratulations! You did it!"
        } else if (this._status === 'failed') {
            // if the game is over:
            return `Nice try! The word was ${this.word}`
        } else {
            // any other situations:
            return `You have ${this.remainingGuesses} guesses left.`
        }
    }

    recalculate () {
        // recalculate is called only by guess()
        // three state: playing, finished, failed
        // state changing only if in 'playing' state
        if (this._status === 'playing') {
            if (this.wordLower.every( element => this.askedLetters.includes(element) )) {
                // if all the letters are in the askedLetters array, so the puzzle is solved:
                this._status = 'finished'
            } else if (this.remainingGuesses < 1) {
                // if not all the letters are guessed, but there are no more guesses:
                this._status = 'failed'
            }
        }
        // returning status, maybe the caller wants to use it
        return this._status
    }
}