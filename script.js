let page = 1
console.log("kf")

const apiKey = `api_key=04c35731a5ee918f014970082a0088b1`

const container = document.querySelector(".container")
const defaults = 'https://api.themoviedb.org/3/'

const textTh = `https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`

document.getElementById("next").onclick = function (){
    container.innerHTML = ""
    page+=1
    getMovies(textTh, page)
}
document.getElementById("prev").onclick = function(){
    container.innerHTML = ""
   page-=1
   if(page<1){
    page = 1
   }
   getMovies(textTh, page)
} 

//  = `https://api.themoviedb.org/3/search/movie?&${apiKey}&query=`

 const searchses  = `https://api.themoviedb.org/3/search/movie?&${apiKey}&query=`

async function getMovies (Location, page){
    container.innerHTML = ""
    const moviesNow = '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22'
    const popular = '/discover/movie?sort_by=popularity.desc'
    const highestRated = 'discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc'

    if(page>1){
        Location = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}&page="+${page}`
    }

    const response = await fetch(Location);
    const data = await response.json()
    const results = data.results

    results.forEach(movie => {

const {title,poster_path,overview} = movie
let img = `https://image.tmdb.org/t/p/w1280${poster_path}`

if(poster_path){
    document.getElementById("currentPage").innerHTML = `Current Page ${page}`

        let div = document.createElement("div")
        div.innerHTML = 
        `<img src="${img}"> ${movie.title} `
    div.addEventListener("click", () => {
        div.innerHTML = `Description ${overview}`
    })
    container.appendChild(div)   
}
});
}

getMovies(textTh, 1)

const form = document.getElementById("form")
const inputText = document.getElementById("inputText")

form.addEventListener("submit", (event) =>{
    event.preventDefault()
    if(inputText){
        getMovies(searchses+inputText.value, 1)
        inputText.value = ""
    }
})

