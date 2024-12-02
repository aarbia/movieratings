document.addEventListener('DOMContentLoaded', function() {
    // Fetch the movie data from the /movies route
    fetch('/movies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(movies => {
        const movieList = document.getElementById('movie-list');
        
        // If there are movies, loop through them and create list items
        if (movies.length > 0) {
          movies.forEach(movie => {
            const li = document.createElement('div');
            
            // Default poster URL and a function to check if the image exists
            var moviePosterUrl = `../images/${movie.movie_id}.jpg`;

            // Create an image to check if it exists
            var img = new Image();
            img.onload = function() {
                // Image loaded successfully
                li.innerHTML = `
                <a href="/movie/${movie.movie_id}">
                    <img src="${moviePosterUrl}" alt="${movie.title}" style="width:100px;">
                    <h3>${movie.title}</h3>
                </a>
                `;
                movieList.appendChild(li);
            };
            img.onerror = function() {
                // If the image fails to load, use the default image
                moviePosterUrl = '../images/default.jpg';
                li.innerHTML = `
                <a href="/movie/${movie.movie_id}">
                    <img src="${moviePosterUrl}" alt="${movie.title}" style="width:100px;">
                    <h3>${movie.title}</h3>
                </a>
                `;
                movieList.appendChild(li);
            };
            img.src = moviePosterUrl;  // Start the image loading process
            });
        } else {
            movieList.innerHTML = '<p>No movies found</p>';
        }
        })
        .catch(function(err) {
        console.error('Error fetching movies:', err);
        });
});