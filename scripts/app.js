'use strict'
const textEl = document.getElementById('hangman-text')
const statusEl = document.getElementById('statusmessage')
const resetEl = document.getElementById('reset')

let countryName // will be the name from the ip location service
let game1  // will be the object for the game
 

const displayPuzzle = function (game) {
    if (game1 === undefined) {
        // the new game puzzle had not yet been downloaded. Wait!
        textEl.textContent='Please wait! Puzzle is loading...'
    } else {
        // puzzle line
        textEl.textContent=''
        game.puzzle.split('').forEach(letter => {
            const letterEl = document.createElement('span')
            letterEl.textContent = letter
            textEl.appendChild(letterEl)
        })

        // message line
        if (countryName === undefined) statusEl.textContent=game.status
        else statusEl.textContent=game.status + `  (And by the way, you are from ${countryName}.)`
    }
}

const startGame = async () => {
    const puzzle = await getPuzzlefunc(2)
    game1 = new Hangman(puzzle, 5)
    // console.log('startGame starts with new game:',game1)
    displayPuzzle(game1)
}

startGame()  // will start in async
console.log("First game initiated.")


// get the current country, and put the value into countryName
// will start async
getCurrentCountry()
.then(country => {
    countryName=country
    game1 && displayPuzzle(game1)  // only refresh, if game1 is not undefined
})
.catch( (err)  => console.log("Error with country: "+err))



window.addEventListener('keypress', function (e) {
    const guess = String.fromCharCode(e.charCode)
    game1.guess(guess)
    displayPuzzle(game1)
    console.log(game1.Puzzle +' '+ game1.remainingGuesses)
})

resetEl.addEventListener('click',startGame)

// getPuzzlefunc(2)
// .then((puzzle)=> console.log('FIRST PUZZLE: '+puzzle))
// .catch( (err) => console.log ('We could not get puzzle. Error:'+err))

// getCurrentCountry()
// .then(country => console.log('Your current country is',country))
// .catch( (err)  => console.log("Error with country: "+err))

// // a getCurrentCountry helyett mi magunt oldjuk meg:
// getLocation()
// .then( locObj => getCountry(locObj.country))
// .then( country => console.log(`Your current country is ${country}`))
// .catch( (err)  => console.log("Error with country: "+err))

// // a getpuzzlefunc most éppen egy promise-t ad vissza
// // paraméternek a puzzle leendő szószámát várja
// // EZ A VÁLTOZAT: a függvény visszatérő értéke maga az új puzzle! (Tehát nem promise, hanem string)
// getPuzzlefunc(2).then( (puzzle) => {
//     // we got the new puzzle
//     console.log('FIRST PUZZLE: '+puzzle)
// }).catch((err) => {
//     console.log ('We could not get puzzle. Error:'+err)
// })


// getCountry("HU")
// .then( country => console.log(country))
// .catch( (err)  => console.log("Error with country: "+err))

// getLocation()
// .then( locObj => console.log(`Location info: ${locObj.country} ${locObj.city} ${locObj.region}`))
// .catch( (err)  => console.log("Error with location: "+err))


// // a getpuzzlefunc most éppen egy promise-t ad vissza
// // paraméternek a puzzle leendő szószámát várja
// // EZ A VÁLTOZAT: a tárolt objektumot adja vissza, tehát a puzzle az objektum egy argumentuma lesz
// // (nem pedig a visszatérő érték!)
// getPuzzlefunc(2).then( (newPuzzle) => {
//     // we got the new puzzle
//     console.log('FIRST PUZZLE: '+newPuzzle.puzzle)
// }).catch((err) => {
//     console.log ('We could not get puzzle. Error:'+err)
// })


// if I want to run this myNewPuzzle.this only once, I could chain up:
// getPuzzle('2').then(....



// callback version
// hardcode first element: two-letter code for the country we are looking for
// getCountry ("HU", (error,country) =>{
//     if (error) console.log ('We got no Country names')
//     else console.log(`Country name is ${country.name}`)
// })

// // promise version (short)
// getCountryOLD("HU").then( (country) => {
//     console.log(`old function: Country name:`+country.name)
// }, (err) => {
//     console.log(`old function: there is an error with getCountry: ${err}`)
// })


// közvetlen fetch egyben, példának
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     if (response.status === 200) {
//         // we have a new puzzle
//         return response.json()  // továbbadjuk a láncon, ez egy promise-t ad vissza
//     } else {
//         throw new Error ('status is  not 200, unable to fetch')
//     }
// }).then ( (data) => {
//     console.log ('FETCH ---> '+data.puzzle)
// }).catch( (e)=> {console.log('error: '+e)})

