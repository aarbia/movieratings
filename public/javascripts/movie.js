document.addEventListener('DOMContentLoaded', function() {
    const movieId = window.location.pathname.split('/')[2];  // Extract movie ID from the URL
  
    fetch(`/movieDetails/${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(movie => {
            const movieDetails = document.getElementById('movie-details');
            const movieDetailsHTML = document.createElement('div');
        
            // Create the movie details section
            movieDetailsHTML.innerHTML = `
                <h2>${movie.title} (${movie.release_year})</h2>
                <img src="/images/${movie.movie_poster}" alt="${movie.title}" style="width:200px; max-width: 100%;">
                <p><strong>Director:</strong> ${movie.director_name}</p>
                <p><strong>Production Company:</strong> ${movie.production_company_name}</p>
            `;
            movieDetails.appendChild(movieDetailsHTML);
        
             // Add Cast Information
            const castDetails = document.getElementById('cast-details');
            const castHTML = document.createElement('div');
            if (Array.isArray(movie.cast) && movie.cast.length > 0) {
                castHTML.innerHTML = '<h3>Cast:</h3><ul>';
                movie.cast.forEach(castMember => {
                castHTML.innerHTML += `
                    <li><strong>${castMember.actor_name}</strong> as ${castMember.character_name}</li>
                `;
                });
                castHTML.innerHTML += '</ul>';
                castDetails.appendChild(castHTML);
            } else {
                castHTML.innerHTML += '<p>No cast information available.</p>';
                castDetails.appendChild(castHTML);
            }

            // Add Ratings Information
            const ratingsDetails = document.getElementById('ratings-details');
            const ratingsHTML = document.createElement('div');
            if (Array.isArray(movie.ratings) && movie.ratings.length > 0) {
                ratingsHTML.innerHTML = '<h3>Ratings:</h3><ul>';
                movie.ratings.forEach(rating => {
                ratingsHTML.innerHTML += `
                    <li><strong>${rating.source}:</strong> ${rating.rating} (Top 25 Rank: ${rating.top_25_rank || 'N/A'})</li>
                `;
                });
                ratingsHTML.innerHTML += '</ul>';
                ratingsDetails.appendChild(ratingsHTML);
            } else {
                ratingsHTML.innerHTML += '<p>No rating information available.</p>';
                ratingsDetails.appendChild(ratingsHTML);
            }

            const websiteDetails = document.getElementById('website-details');
            const websiteDetailsHTML = document.createElement('div');
            websiteDetailsHTML.innerHTML = `
                <p><strong>IMDb:</strong> <a href="${movie.imdb_url}" target="_blank">${movie.imdb_url}</a></p>
                <p><strong>Metacritic:</strong> <a href="${movie.metacritic_url}" target="_blank">${movie.metacritic_url}</a></p>
                <p><strong>Rotten Tomatoes:</strong> <a href="${movie.rotten_tomatoes_url}" target="_blank">${movie.rotten_tomatoes_url}</a></p>
                <p><strong>Wikipedia:</strong> <a href="${movie.wikipedia_url}" target="_blank">${movie.wikipedia_url}</a></p>
            `;
            websiteDetails.appendChild(websiteDetailsHTML);
        })
        .catch(err => {
            console.error('Error fetching movie details:', err);
        });
});
  