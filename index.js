import { tweetsData } from "./data.js"

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")



document.addEventListener("click", function(e){

    if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
        
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.id === "tweet-btn"){
        handleTweetClick(e.target.id)
    }

})

function handleReplyClick(tweetId){
    // Check if the button is working 
    console.log("You clicked reply btn with uuid: ", tweetId)
}

function handleLikeClick(tweetId){
    // Check if the button is working 
    console.log("You clicked like btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Check if object exists
    console.log(targetTweetObj)

    // Increment likes if not already liked otherwise decrement likes
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    // Render after updates
    render() 
}

function handleRetweetClick(tweetId){
    // Check if the button is working 
    console.log("You clicked retweet btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Check if object exists
    console.log(targetTweetObj)

    // Increment likes if not already liked otherwise decrement likes
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    // Render after updates
    render() 
}

function handleTweetClick(tweetId){
    // Check if the button is working 
    console.log("You clicked Tweet btn with id: ", tweetId)
}


function getFeedHtml(){
    
    let feedHtml = ""
    
    tweetsData.forEach(function(tweet){
        
        feedHtml += 
        `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
        `
   })

   return feedHtml

}



function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()
}



render()