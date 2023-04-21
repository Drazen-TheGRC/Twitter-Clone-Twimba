// Import tweetData
import { tweetsDataFromJS } from "./data.js"
// Import uuidv4
import { v4 as uuidv4 } from "https://jspm.dev/uuid"



// Setting localStorage
let tweetsData 
if(localStorage.getItem("tweetsData") === null){
    localStorage.setItem("tweetsData", JSON.stringify(tweetsDataFromJS))
    tweetsData = JSON.parse(localStorage.getItem("tweetsData"))
}else{
    tweetsData = JSON.parse(localStorage.getItem("tweetsData"))
}
// Update local storage function
function updateLocalStorage(){
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
}


// Event listeners 
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
        handleTweetClick()
    }
    else if(e.target.dataset.mytweet){
        handleDeleteTweetClick(e.target.dataset.mytweet)
    }
    else if(e.target.dataset.myreplybtn){
        handleMyReplyClick(e.target.dataset.myreplybtn)
    }
    // Delete replay
    else if(e.target.dataset.myreplytweetid && e.target.dataset.myreplyid){
        handleDeleteReplyClick(e.target.dataset.myreplytweetid, e.target.dataset.myreplyid)
    }
})



// Opens tweet replys
function handleReplyClick(tweetId){
    // Check if the button is working 
    console.log("You clicked reply btn with uuid: ", tweetId)

    // Accessing the right tweet and its replies div and then toggling the hidden class ON/OFF
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden")
}



// Like btn updates number of likes and the look of the btn
function handleLikeClick(tweetId){
    // Check if the button is working 
    console.log("You clicked like btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Increment likes if not already liked otherwise decrement likes
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    // Update local storage
    updateLocalStorage()
    // Render after updates
    render() 
}



// Retweet btn updates number of retweets and the look of the btn
function handleRetweetClick(tweetId){
    // Check if the button is working 
    console.log("You clicked retweet btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Increment retweets if not already retweeted otherwise decrement retweets
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    // Update local storage
    updateLocalStorage()
    // Render after updates
    render()  
}



// Tweet btn to handle posting a new tweet
function handleTweetClick(){

    const tweetInput = document.getElementById("tweet-input")

    // Check if the button is working 
    console.log("You clicked Tweet btn")

    // Creates new tweet
    if(tweetInput.value){
        tweetsData.unshift(
            {
                handle: "@Drazen-TheGRC",
                profilePic: "images/drazen.drinic.jpg",
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            }
        )
    }
    
    // Update local storage
    updateLocalStorage()
    // Render after updates
    render() 
    // Clear input
    tweetInput.value = ""
}



// Creating a new reply on a specific tweet
function handleMyReplyClick(tweetId){

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    let replyInputId = "reply-input-" + targetTweetObj.uuid
    
    const replyInput = document.getElementById(replyInputId)

    // Check if the button is working 
    console.log("You clicked Reply btn")
    
    // Creates new reply
    if(replyInput.value){
        console.log("replyInput value: " + replyInput.value)
        targetTweetObj.replies.unshift(
            {
                handle: "@Drazen-TheGRC",
                profilePic: "images/drazen.drinic.jpg",
                tweetText: replyInput.value,
                uuid: uuidv4()
            }
        )
    }

    // Update local storage
    updateLocalStorage()
    // Render after updates
    render() 
    // Clear input
    replyInput.value = ""
}



// Deletes a specific tweet posted by the user
function handleDeleteTweetClick(tweetId, replyId){

    // Check if the button is working 
    console.log("You clicked delete btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Getting tweet index
    let indexOfTweet = tweetsData.indexOf(targetTweetObj)
    // Deleting tweet 
    tweetsData.splice(indexOfTweet, 1)

    // Update local storage
    updateLocalStorage()
    // Render after updates
    render() 
}



// Deletes a specific reply posted by the user
function handleDeleteReplyClick(tweetId, replyId){

    // Check if the button is working 
    console.log("You clicked delete btn with uuid: ", tweetId)

    // Get tweet object with correct uuid
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // Making it an object instead of array

    // Get reply object with correct uuid
     const targetReply = targetTweetObj.replies.filter(function(reply){
         return reply.uuid === replyId
     })[0]

    // Getting reply index
    let indexOfReply = targetTweetObj.replies.indexOf(targetReply)
    // Deleting reply 
    targetTweetObj.replies.splice(indexOfReply, 1)

    // Update local storage
    updateLocalStorage()
    // Render after updates
    render() 
}



// Creating and returning HTML to be rendered 
function getFeedHtml(){
    
    let feedHtml = ""
    
    tweetsData.forEach(function(tweet){

        // Creating reply input and btn
        let repliesHtml = ""
        repliesHtml = 
            `
            <div class="">
			    <textarea id="reply-input-${tweet.uuid}" class="reply-input" placeholder="Add a reply" ></textarea>
                <button id="reply-btn-${tweet.uuid}" class="reply-btn" data-myreplybtn="${tweet.uuid}">Reply</button>
		    </div>
            `
        
        // Displaying replys if they exist on tweet    
        if(tweet.replies.length > 0){

            tweet.replies.forEach(function(reply){
                
                let myReplyDeleteBtnClass = ""

                if( reply.handle!= "@Drazen-TheGRC"){
                    myReplyDeleteBtnClass = "hidden"
                }
                repliesHtml += 
                `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            
                            <i class="close-btn fa-solid fa-xmark ${myReplyDeleteBtnClass}" data-myreplytweetid="${tweet.uuid}" data-myreplyid="${reply.uuid}"></i>

                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="reply-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }

        // Checking if tweet is liked if it is than we add class to the icon to change icon color
        let likeIconClass = ""
        if(tweet.isLiked){
            likeIconClass = "liked"
        }
        // Checking if tweet is retweeted if it is than we add class to the icon to change icon color
        let retweetIconClass = ""
        if(tweet.isRetweeted){
            retweetIconClass = "retweeted"
        }

        // Shows a delete btn if the tweet belongs to the user
        let myTweetDeleteBtnClass = ""
        if(tweet.handle != "@Drazen-TheGRC"){
            myTweetDeleteBtnClass = "hidden"
        }
        
        // Building HTML
        feedHtml += 
        `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <i class="close-btn fa-solid fa-xmark ${myTweetDeleteBtnClass}" data-mytweet="${tweet.uuid}"></i>

                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots " data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div id="replies-${tweet.uuid}" class="hidden">
                    <!-- REPLIES HERE -->
                    ${repliesHtml}
                </div>
            </div>
        `
   })

   // Returning ready HTML to be rendered 
   return feedHtml
}



// Render tweets
function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()
}


// Initial tweet render
render()