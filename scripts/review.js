import { getLocalStorage, setLocalStorage } from "./storage.js";
import { getMovieIdFromUrl, } from "./utils.js";
import { getMovieDetails } from "./api.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // localStorage.removeItem("votes");
        const movieId = getMovieIdFromUrl();
        const movieDetails = await getMovieDetails(movieId);
        let votesLocal = getLocalStorage("votes");

        renderMovieReview(movieDetails, votesLocal); 
        
        let submitVoteBtn = document.getElementById("submit-vote-btn");
        submitVoteBtn.addEventListener("click", function() {
            voting(movieId, votesLocal);

            if (document.getElementById("movie-rating-input").value > 0) {
                console.log(votesLocal); 
                location.reload();
            } else {
                const movieReview = document.getElementById("movie-review");
                const emptyFieldsMessage = document.createElement("p");

                emptyFieldsMessage.textContent = "You should enter a rating from 1-10";
                movieReview.textContent = "";
                movieReview.appendChild(emptyFieldsMessage);
            }
        });
        
      } catch (error) {
        console.error('Error loading movie details:', error);
    }
});

function renderMovieReview(movie, votesLocal) {    

    const voteDetailsContainer = document.getElementById("vote-details-container");

    const movieReview = document.createElement('div');
    movieReview.setAttribute("class", "movie-review"); 
    movieReview.setAttribute("id", "movie-review"); 

    const movieReviewInput = document.createElement('div');
    movieReviewInput.setAttribute("class", "movie-review-input");
    movieReviewInput.setAttribute("id", "movie-review-input");

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
    rating.setAttribute("placeholder", "Enter a rating (1-10)");
    movieReviewInput.appendChild(rating);

    const comment = document.createElement('textarea');
    comment.setAttribute("id", "movie-comment-input");
    comment.setAttribute("class", "movie-comment-input");
    comment.setAttribute("placeholder", "Comment");
    movieReviewInput.appendChild(comment);

    const submitVote = document.createElement('button');
    submitVote.textContent = `Submit Vote`;
    submitVote.setAttribute("class", "primary-btn");
    submitVote.setAttribute("id", "submit-vote-btn");
    movieReviewInput.appendChild(submitVote);    

    const noVote = document.createElement('p');
    const userVoteHeader = document.createElement('h2');
    const voteRating = document.createElement('h3');
    const voteComment = document.createElement('p');

    if (votesLocal != null) {

        console.log(votesLocal); 

        let index = 0;
        
        votesLocal.allVotes.forEach(movieVote => {
            if (parseInt(votesLocal.allVotes[index].id) == movie.id) { 
                              
                
                voteRating.textContent = votesLocal.allVotes[index].rating;
                console.log(voteRating.textContent);
                userVoteHeader.textContent = "Your Vote"
                movieReview.appendChild(userVoteHeader);

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

    // voteDetailsContainer.textContent = "";

    voteDetailsContainer.appendChild(movieReviewInput);
    voteDetailsContainer.appendChild(movieReview);
}



function voting(movieId, votesLocal) {

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
            let found = false;        

            votesLocal.allVotes.forEach(item => {
                if (parseInt(votesLocal.allVotes[counter].id) == movieId) { 
                    found = true;
                    votesLocal.allVotes[counter].rating = movieRating;                    
                    votesLocal.allVotes[counter].comment = voteComment;
                }

                counter++;
            });

            if (!found) {

                votes.allVotes.push(vote);
                console.log(votes); 

                setLocalStorage("votes", votes);
            }

        } else {           

            votes.allVotes.push(vote);
            console.log(votes); 
        }

        setLocalStorage("votes", votes);
    }
}