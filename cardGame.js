var emojis = [
    '😀', '😀', // Smile
    '🛹', '🛹', // Skateboard
    '💻', '💻', // Laptop
    '🖥️', '🖥️', // Desktop computer
    '⌨️', '⌨️', // Keyboard
    '🖱️', '🖱️', // Mouse
    '📱', '📱', // Smartphone
    '🔌', '🔌'  // Plug
  ];

var flippedCard1 = null
var cardMap = new Map()
var matches = 0

function getKeyByValue(value) {
    return Object.keys(cardMap).find(key => cardMap[key] === value)
}

function divOnClick(num){
    div = document.getElementById(num)
    if (num >= 0 || num <= 16){
        div.innerHTML = cardMap.get(num)
    }else{
        div.innerHTML = getKeyByValue(num)
    }

    mainGameplay(num)
}

function createCards(){
    for (var i = 1; i < 17; i++){
        // get random emoji choice
        choice = emojis[Math.floor(Math.random() * emojis.length)]
        // add choice to a hashmap
        cardMap.set(i, choice)
        // remove that choice from future choices
        emojis.splice(emojis.indexOf(choice), 1)

        // create divs
        div = document.createElement("div")
        div.innerHTML = i
        // set div id to card number
        div.setAttribute("id", i)
        // set onClick event with passed threw value to make it easy
        div.setAttribute("onclick", "divOnClick("+ i +")")
        document.getElementById("flex-container").appendChild(div)
    }
}

window.onload = function() {
    createCards()
}

function mainGameplay(recentFlippedCard){   
    if (flippedCard1 == null){  // if not a first flipped card set it
        flippedCard1 = recentFlippedCard

        console.log("set flippedCard1: ",flippedCard1)
    }else{   // if there is a first flipped card
        if (flippedCard1 == recentFlippedCard){
            // if same card, break to not compare same card
            return
        }
        card1 = document.getElementById(flippedCard1)
        card2 = document.getElementById(recentFlippedCard)

        if (cardMap.get(flippedCard1) === cardMap.get(recentFlippedCard)){  // compare flipped cards, if matching cards
            // set card boarders to green
            card1.style.background = "green"
            card2.style.background = "green"
            // remove onclick attributes / remove from game
            card1.removeAttribute("onclick")
            card2.removeAttribute("onclick")
            document.getElementById("score").textContent = ++matches + "/8" // have this set an innerHTML element with ++matches
            flippedCard1 = null

            console.log("match")
        }else{  // if not matching cards
            // turn red, buffer the reflip/set white
            card1.style.background = "red"
            card2.style.background = "red"
            
            console.log("NO match")
            
            setTimeout(() => {
                card1.style.background = "white"
                card2.style.background = "white"

                card1.innerHTML = flippedCard1
                card2.innerHTML = recentFlippedCard
                flippedCard1 = null     // There is a problem with people playing while in this timeout, FIX: make game unplayable during timeout. OR be lazy and set the timeout to a really low time 
                
            }, "1000");
        }
    }
    if (matches == 8){
        // if game is won, restart by refreshing the page. LMAO not a good way to do this
        document.getElementById("score").innerHTML = "<div><p>You Win!</p><button onclick='location.reload()'>Play again</button></div>"
    }
}