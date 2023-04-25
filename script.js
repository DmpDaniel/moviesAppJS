let page = 1

let global = []

const apiKey = `&api_key=04c35731a5ee918f014970082a0088b1`

let current = document.getElementById("currentPage")

const container = document.querySelector(".container")

const defaults = 'https://api.themoviedb.org/3/'

const textTh = `https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`

const jump = document.getElementById("jumpPage")

const jumpText = document.getElementById("jumpText")

const category = document.querySelectorAll(".categories")


category.forEach((categry) => {
    categry.addEventListener("click", (event) => {
        global = []
        global.push(defaults,getCategory(categry.innerHTML),apiKey)
        getMovies(global, 1)
    })
})

function getCategory (value){
let returnCateg;
    if(value === "Action"){
        returnCateg = "/discover/movie?with_genres=28&"
    }else if (value === "Comedy"){
        returnCateg = "/discover/movie?with_genres=35&"
        }
    else if (value === "Animation"){
      returnCateg = "/discover/movie?with_genres=16&"
    }
    else if (value === "Horror"){
      returnCateg = "/discover/movie?with_genres=27&"
    }
      return returnCateg
}

jump.addEventListener("submit", (eve) => {
    eve.preventDefault()
    if(isNaN(jumpText.value) || jumpText.value > 500){
        alert("Enter a Valid number")
        jumpText.value = ""
    }else{
        page = jumpText.value
        getMovies(global.join(""),page)
    }
    
})

document.getElementById("next").onclick = function (){
    container.innerHTML = ""

    page++
    
    let heloo = global.join("")

    getMovies((heloo), page)
}
document.getElementById("prev").onclick = function(){
    container.innerHTML = ""
    page--
   if(page<1){
    page = 1
   }

   let hello1 = global.join("")
    getMovies((hello1), page)
} 
 const searchses  = `search/movie?&query=`

async function getMovies (Location, page){
    console.log( global)
    container.innerHTML = ""
    const moviesNow = '/discover/movie?primary_release_date.gte=2023-03-15&primary_release_date.lte=2023-04-2'
    const popular = '/discover/movie?sort_by=popularity.desc'
    const highestRated = 'discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc'

    if(page>1){    
        Location = `${Location}&page=${page}`
    }
    console.log(Location.toString())
    const response = await fetch(Location);
    if(response.status == "422"){
        alert("Invalid amount")
    }
    const data = await response.json()
    const results = data.results

    if(data.total_results <5){
        alert("Invalid search")
        getMovies(textTh)
    }
    

    console.log(data)

    results.forEach(movie => {

const {title,poster_path,overview, genre_ids} = movie

let img = `https://image.tmdb.org/t/p/w1280${poster_path}`

if(poster_path){
   function totalPages (param){
    let totalPages;
   if(param > 500){
    totalPages = 500
   }else{
   totalPages = param
}
   return totalPages
}

page==undefined?page=1:page
    current.innerHTML = `Current Page: ${page} <br>Total Pages: ${totalPages(data.total_pages)}`

    let div = document.createElement("div")
    div.innerHTML = 
    `<img src="${img}"> ${genre_ids} ${title}`
    div.addEventListener("click", (r) => {
    r.preventDefault()
    div.innerHTML = `Description ${overview}`  
    })
    container.appendChild(div)   
}
});
}
if (global.length === 0){
    global.push(textTh,1)
    getMovies(global.join(""))
}

const form = document.getElementById("form")
const inputText = document.getElementById("inputText")

form.addEventListener("submit", (event) =>{
    event.preventDefault()
    if(inputText){
    global = []
    global.push(defaults,searchses,inputText.value,apiKey)
    getMovies(global.join(""))
    inputText.value = ""
}
})

