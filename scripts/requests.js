// promise version, chaining
const getPuzzlefunc = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        // console.log  ('async getpuzzle')
        const respjson = await response.json();
        return respjson.puzzle
    }
    else {
        throw new Error('_____unable to fetch at new getPuzzle!');
    }
}

const getCountry = async (countryCode) => {
    const response = await fetch('//restcountries.eu/rest/v2/all')
    if (response.status === 200) {
        const countries = await response.json()
        // console.log ('getCountry parameter: countryCode', countryCode)
        return countries.find( country => country.alpha2Code === countryCode).name
    } 
    else throw new Error ('Error getting country info')
}


const getLocation = async () => {
    const response = await fetch ('//ipinfo.io/json?token=aecc36971dcaba')
    if (response.status === 200)  return response.json()
    else throw new Error ('Error getting location!')
}


const getCurrentCountry = async () => {
    const location = await getLocation()
    // console.log('getCurrentCountry location',location)
    // location is an object, having the .name (for example 'HU')
    return getCountry(location.country)
}


// promise version, chaining
const getPuzzlefuncOld = (wordCount) => {
    return fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`).then( (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('_____unable to fetch at new getPuzzle!')
        }
    }).then( (data) => data.puzzle)
}


const getCountryOld = (countryCode) => {
    return fetch('//restcountries.eu/rest/v2/all').then( (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error ('Could not get country list from server')
        }
    }).then( countries => {
        let position = countries.findIndex((e)=>e.alpha2Code === countryCode)
        if (position >= 0) {
            // we have the position
            return countries[position].name     // the new version wants only the .name back, not the whole country obj.
        } else {
            // not found
            throw new Error ('Whahh! I can not find the country!')
        }
    })
}


const getLocationOld = () => {
    return fetch ('//ipinfo.io/json?token=aecc36971dcaba').then( response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error ('Error getting location!')
        }
    })
}




    //     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then( (rawData) => {
        //         if (rawData.status === 200) {
//             console.log ('Most lesz return')
//             return (rawData.json())
//         } else {
    //             trhow new Error('Something is wrong with fetch');
    //         }
    //     })
    // }
    



    // return new Promise ( (resolve,reject) => {
    //     resolve ("Ez az én megoldásom")
    // })
    // }
    



// // promise version -- first
// const getPuzzle = (wordCount) => new Promise ( (resolve, reject) => {
//     const request = new XMLHttpRequest()
//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) { /// 4 = Done with the transaction
//             const data=JSON.parse(e.target.responseText)
//             resolve(data.puzzle)
//         } else if (e.target.readyState === 4){
//             reject('Something is wrong!')
//         }
//     })
//     request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount='+wordCount)
//     request.send()
// })




// const getCountryOLD = (countryCode) => new Promise ( (resolve, reject) =>{
//     const request2 = new XMLHttpRequest()
//     request2.addEventListener('readystatechange', (e) => {
//         let countries = []
//         if (e.target.readyState === 4 && e.target.status === 200) { /// 4 = Done with the transaction
//             countries=JSON.parse(e.target.responseText)
//             console.log(countries.length + " elements.")
//             let position = countries.findIndex((e)=>e.alpha2Code === countryCode)
//             if (position >= 0) {
//                 // we have the position
//                 resolve(countries[position])
//             } else {
//                 // not found
//                 reject('Whahh! I can not find the country!')
//             }
//         } else if (e.target.readyState === 4){
//             callback('Something is wrong!')
//         }
//     })

//     request2.open('GET', 'http://restcountries.eu/rest/v2/all')
//     request2.send()
// })


// callback version
// const getPuzzle = (wordCount, callback) => {
//     // callback (undefined, "My new puzzle")  // for dummy testing
//     const request = new XMLHttpRequest()
//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) { /// 4 = Done with the transaction
//             const data=JSON.parse(e.target.responseText)
//             callback(undefined, data.puzzle)
//         } else if (e.target.readyState === 4){
//             callback('Something is wrong!')
//         }
//     })
//     request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount='+wordCount)
//     request.send()
// }


// const getCountry = (countryCode, callback) => {
//     const request2 = new XMLHttpRequest()
//     request2.addEventListener('readystatechange', (e) => {
//         let countries = []
//         if (e.target.readyState === 4 && e.target.status === 200) { /// 4 = Done with the transaction
//             countries=JSON.parse(e.target.responseText)
//             console.log(countries.length + " elements.")
//             let position = countries.findIndex((e)=>e.alpha2Code === countryCode)
//             if (position >= 0) {
//                 // we have the position
//                 callback(undefined, countries[position])
//             } else {
//                 // not found
//                 callback('Whahh! I can not find the country!')
//             }

//         } else if (e.target.readyState === 4){
//             callback('Something is wrong!')
//         }
//     })

//     request2.open('GET', 'http://restcountries.eu/rest/v2/all')
//     request2.send()
// }
