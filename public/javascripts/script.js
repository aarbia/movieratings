document.addEventListener('DOMContentLoaded', function() {
    fetch('/movies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(movies => {
        const movieList = document.getElementById('movie-list');
        
        //loop through movies to create cards
        if (movies.length > 0) {
          movies.forEach(movie => {
            const movieHTML = document.createElement('div');
            movieHTML.classList.add('col-md-2', 'mb-4'); //bootstraps columns
            
            //grab poster from images via movie_id
            var moviePosterUrl = `../images/${movie.movie_id}.jpg`;

            //check to see if image exists
            var img = new Image();
            img.onload = function() {
                //image exists
                movieHTML.innerHTML = `
                <div class="card">
                    <a href="/movie/${movie.movie_id}">
                        <img src="${moviePosterUrl}" alt="${movie.title}" class="card-img-top" style="width:100%; height: auto;">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                        </div>
                    </a>
                </div>
                `;
                movieList.appendChild(movieHTML);
            };
            img.onerror = function() {
                //failed, use the default image
                moviePosterUrl = '../images/default.jpg';
                movieHTML.innerHTML = `
                <div class="card">
                    <a href="/movie/${movie.movie_id}">
                        <img src="${moviePosterUrl}" alt="${movie.title}" class="card-img-top" style="width:100%; height: auto;">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                        </div>
                    </a>
                </div>
                `;
                movieList.appendChild(movieHTML);
            };
            img.src = moviePosterUrl;
            });
        } else {
            movieList.innerHTML = '<p>No movies found</p>';
        }
        })
        .catch(function(err) {
        console.error('Error fetching movies:', err);
        });
});