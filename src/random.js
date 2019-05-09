// problème pour récupérer la clef dans un autre fichier
const config = {
    API_KEY : "e0c090ad9289504f572875f449a5f944"
}
const API_KEY = config.API_KEY;


// console.log("je suis chargé")

// Random movie / Random TV Show
const randomMovie = document.querySelector("#randomMovie");
const randomContainer = document.querySelector(".randomContainer");
// If randomMovie element exsists..
if(randomMovie){
	randomMovie.addEventListener("click", ()=>{
    // console.log("click")
	// Run random movie function.
	getRandomMovie();
	})
}

function getRandomMovie(){
	// Display the random container.
	randomContainer.style.display = "block";

	// Get a random page for the API search.
	let minPage = 1;
    let maxPage = 20;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
	let randomPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

	// Get a random page for the response result.
	let minResult = 1;
	let maxResult = 20;
	minResult = Math.ceil(minResult);
	maxResult = Math.floor(maxResult);
	let randomResult = Math.floor(Math.random() * (maxResult - minResult +1)) + minResult;
	
	// Make an api call for a random movie.
	axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+'&language=fr&page='+randomPage)
		.then( (response) =>{
            //console.log(response);
			const movie = response.data.results[randomResult];
			const output = 
			`<div class="smallCard">
			<h2>${movie.title}</h2>
			<div class="smallMovie">
					<div class="smallCard_img">
						<img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
                    <div class="smallMovie_info">
                    <p><strong>VO:</strong> <span>${movie.original_language}</span></p>
						<p id="p_rating"><strong>Note:</strong> <span>${movie.vote_average} / 10</span> </p>
                        <p><strong>Date de sortie:</strong> <span>${movie.release_date}</span></p>
                        <p><strong>Détailles:</strong> <span>${movie.overview}</span></p>
					</div>
			</div>
			</div>`;
			randomContainer.innerHTML = output;
		})
}

// Random movie / Random TV Show
const randomTvShow = document.querySelector("#randomTvShow");

// If randomTvShow element exsist..
if(randomTvShow) {
	randomTvShow.addEventListener("click", ()=>{
	// Run random tv show function.
	getRandomTvShow();
	})
}

function getRandomTvShow(){
	// Display the random container.
	randomContainer.style.display = "block";

	// Get a random page for the API search.
	let minPage = 1;
    let maxPage = 20;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
	let randomPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

	// Get a random page for the response result.
	let minResult = 1;
	let maxResult = 20;
	minResult = Math.ceil(minResult);
	maxResult = Math.floor(maxResult);
	let randomResult = Math.floor(Math.random() * (maxResult - minResult +1)) + minResult;
	axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+API_KEY+'&language=fr&page='+randomPage)
		.then((response)=>{
			//console.log(response);
			const show = response.data.results[randomResult];
			const output = 
			`<div class="smallCard">
			<h2>${show.name}</h2>
			<div class="smallMovie">
					<div class="smallCard_img">
						<img src="http://image.tmdb.org/t/p/w185/${show.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="smallMovie_info">
                    <p><strong>VO:</strong> <span>${show.original_language}</span></p>
						<p id="p_rating"><strong>Note:</strong> <span>${show.vote_average} / 10</span> </p>
                        <p><strong>Date de sortie:</strong> <span>${show.first_air_date}</span></p>
                        <p><strong>Détailles:</strong> <span>${show.overview}</span></p>
					</div>
			</div>
			</div>`;
			randomContainer.innerHTML = output;
			
		})
}