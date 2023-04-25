let page = 1
console.log("kf")

const apiKey = `api_key=04c35731a5ee918f014970082a0088b1`
let current = document.getElementById("currentPage")

const container = document.querySelector(".container")
const defaults = 'https://api.themoviedb.org/3/'

const textTh = `https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`
const jumpThis = `https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`

const jump = document.getElementById("jumpPage")
const jumpText = document.getElementById("jumpText")

const category = document.querySelectorAll(".categories")


category.forEach((categry) => {
    categry.addEventListener("click", () => {
        getMovies(`${defaults}${getCategory(categry.innerHTML)}${apiKey}`)
    })
})

function getCategory (value){
let returnCateg;
    if(value === "Action"){
        returnCateg = "/discover/movie?with_genres=28&"
    }else if
      (value === "Comedy"){
        returnCateg = "/discover/movie?with_genres=35&"
      }
    else if
    (value === "Animation"){
      returnCateg = "/discover/movie?with_genres=16&"
    }
    else if
    (value === "Horror"){
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
        getMovies(jumpThis,jumpText.value)
    }
    
})


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
    const moviesNow = '/discover/movie?primary_release_date.gte=2023-03-15&primary_release_date.lte=2023-04-2'
    const popular = '/discover/movie?sort_by=popularity.desc'
    const highestRated = 'discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc'

    if(page>1){
        Location = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}&page=${page}`
    }

    const response = await fetch(Location);
    if(response.status == "422"){
        alert("Invalid amount")
    }
    const data = await response.json()
    const results = data.results

    if(data.total_results <5){
        alert("Invalid search")
        getMovies(textTh, 1)
    }
    

    console.log(data.total_pages)

    results.forEach(movie => {

const {title,poster_path,overview} = movie
let img = `https://image.tmdb.org/t/p/w1280${poster_path}`

if(poster_path){
    current.innerHTML = `Current Page: ${page} <br>Total Pages: 500`

        let div = document.createElement("div")
        div.innerHTML = 
        `<img src="${img}"> ${title} `

        div.addEventListener("click", (r) => {
            r.preventDefault()
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

