const socket = require('socket.io-client')('http://localhost:8085')
let timeInterval;
let targetScroll
socket.on('newMsg', (msg) => {
    let div = document.createElement('div')
    div.innerHTML = `   <h4 id="userName">
    ${msg.tags.username}
    <div id="line"></div>
    <div class="messageDiv">
    <p id="message">
        ${msg.message}
    </p>
    </div><div id="separtor><div>`
    div.id = "frame"
    document.body.appendChild(div)
    let currentScroll = document.scrollingElement.scrollTop;
    let totalScroll = document.scrollingElement.scrollHeight
   


    document.scrollingElement.scrollTo(0,totalScroll)
    
    console.log(currentScroll, totalScroll)

})