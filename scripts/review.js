import { getLocalStorage, setLocalStorage } from "./storage.js";
import { getMovieIdFromUrl, } from "./utils.js";
import { getMovieDetails } from "./api.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // localStorage.removeItem("votes");
        const movieId = getMovieIdFromUrl();
        const movieDetails = await getMovieDetails(movieId);
        let votesLocal = getLocalStorage("votes");
        console.log(votesLocal);

        renderMovieReview(movieDetails, votesLocal);

        let submitVote = document.getElementById("submit-vote-btn");
        submitVote.addEventListener("click", function() {
            voting(votesLocal);
            votesLocal = getLocalStorage("votes");
            renderMovieReview(movieDetails, votesLocal); 

        });

        submitVote = "";        
        
      } catch (error) {
        console.error('Error loading movie details:', error);
    }
});



function renderMovieReview(movie, votesLocal) {    

    const voteDetailsContainer = document.getElementById("vote-details-container");

    const movieReview = document.createElement('div');
    movieReview.setAttribute("class", "movie-review"); 

    const movieReviewInput = document.createElement('div');
    movieReviewInput.setAttribute("class", "movie-review-input");

    const moviePoster = document.createElement('img');
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieReviewInput.appendChild(moviePoster);

    const title = document.createElement('h3');
    title.textContent = movie.title;
    movieReviewInput.appendChild(title);

    const rating = document.createElement('input');    
    rating.setAttribute("id", "movie-rating-input");
    rating.setAttribute("class", "movie-rating-input");
    rating.setAttribute("type", "number");
    movieReviewInput.appendChild(rating);

    const comment = document.createElement('textarea');
    comment.setAttribute("id", "movie-comment-input");
    comment.setAttribute("class", "movie-comment-input");
    movieReviewInput.appendChild(comment);


    const submitVote = document.createElement('button');
    submitVote.textContent = `Submit Vote`;
    submitVote.setAttribute("class", "primary-btn");
    submitVote.setAttribute("id", "submit-vote-btn");
    movieReviewInput.appendChild(submitVote);
    console.log(typeof(movie.id));

    const noVote = document.createElement('p');
    const voteRating = document.createElement('p');
    const voteComment = document.createElement('p');

    if (votesLocal != null) {
        votesLocal.allVotes.forEach(movieVote => {

        });

        console.log(votesLocal); 

        let index = 0;
        
        votesLocal.allVotes.forEach(movieVote => {
            console.log(`Yeah ${votesLocal.allVotes[index].id}`)
            if (parseInt(votesLocal.allVotes[index].id) == movie.id) {  
                console.log("Im here");              
                
                voteRating.textContent = votesLocal.allVotes[index].rating;
                console.log(voteRating.textContent);
                movieReview.appendChild(voteRating);
                
                voteComment.textContent = votesLocal.allVotes[index].comment;
                console.log(voteComment.textContent);
                movieReview.appendChild(voteComment);
            }            
            index++;
        });
        
        if (voteRating.textContent == "") {
            noVote.textContent = "You haven't voted on this movie yet";
            movieReview.appendChild(noVote);

        };
    } 
    
    else {        
        noVote.textContent = "You haven't voted on this movie yet";
        movieReview.appendChild(noVote);
    }

    voteDetailsContainer.textContent = ""

    voteDetailsContainer.appendChild(movieReviewInput);
    voteDetailsContainer.appendChild(movieReview);
}



function voting(votesLocal) {

    const movieId = getMovieIdFromUrl();
    let movieRating = document.getElementById("movie-rating-input").value;
    let voteComment = document.getElementById("movie-comment-input").value;
    
    let votes = { allVotes: [] }

    let vote = {
        id: movieId,
        rating: movieRating,
        comment: voteComment,
    } 

    if (Number(movieRating) > 0) {              
        
        if (votesLocal != null) { 
            
            votes = votesLocal;
            let counter = 0;        

            votesLocal.allVotes.forEach(item => {
                if (parseInt(votesLocal.allVotes[counter].id) == movieId) {   
                    votesLocal.allVotes[counter].rating = movieRating;
                    votesLocal.allVotes[counter].comment = voteComment;
                }

                counter++;
            });
        } else {

            votes.allVotes.push(vote);
            console.log(votes); 
        }

        setLocalStorage("votes", votes);

    } else {
        const voteDetailsContainer = document.getElementById("vote-details-container");
        const emptyFieldsMessage = document.createElement("p");

        emptyFieldsMessage.textContent = "You should enter a rating from 1-10"
        voteDetailsContainer.appendChild(emptyFieldsMessage);
    }
}