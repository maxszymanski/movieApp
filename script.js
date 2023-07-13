const API_URL =
	'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pl-PL&page=3&sort_by=popularity.desc&api_key=cfa5a07d9d0c1d3329c40064a4ab835f'
const movieCard = document.querySelector('.template-box')
const movieBox = document.querySelector('.main')
const search = document.getElementById('search')

let id, movieTitle, movieRating, movieOverview, movieImg, rating, cards, titles

const addMovieInfo = id => {
	axios
		.get(API_URL)
		.then(res => {
			const movie = movieCard.content.cloneNode(true)
			const title = movie.querySelector('h2')
			const img = movie.querySelector('img')
			const overviev = movie.querySelector('.overview p')
			rating = movie.querySelector('span')
			movieTitle = res.data.results[id].original_title
			movieRating = res.data.results[id].vote_average
			movieOverview = res.data.results[id].overview
			movieImg = res.data.results[id].backdrop_path
			title.innerText = movieTitle
			rating.innerText = movieRating
			overviev.innerText = movieOverview
			img.setAttribute('src', `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieImg}`)
			checkColor()
			movieBox.appendChild(movie)
			cards = movie.querySelectorAll('.movie')
		})
		.catch(err => console.error(err))
}
const checkColor = () => {
	if (rating.innerText >= 7.7) {
		rating.classList.add('green')
	} else if (rating.innerText < 7.7 && rating.innerText > 6) {
		rating.classList.add('orange')
	} else {
		rating.classList.add('red')
	}
}
const addCards = () => {
	for (let i = 0; i < 18; i++) {
		addMovieInfo(i)
	}
}

addCards()

const movieSearch = () => {
	const text = search.value.toLowerCase()
	cards = document.querySelectorAll('.movie')
	titles = document.querySelectorAll('h2')
	titles.forEach(title => {
		if (title.innerText.toLowerCase().indexOf(text) === -1) {
			title.parentElement.parentElement.classList.add('hide')
		} else {
			title.parentElement.parentElement.classList.remove('hide')
		}
	})
}
search.addEventListener('keyup', movieSearch)
