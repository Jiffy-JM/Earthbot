/*


Created by

      .o8               .o8       oooo   o8o      .   
     "888              "888       `888   `"'    .o8   
 .oooo888  oooo  oooo   888oooo.   888  oooo  .o888oo 
d88' `888  `888  `888   d88' `88b  888  `888    888   
888   888   888   888   888   888  888   888    888   
888   888   888   888   888   888  888   888    888 . 
`Y8bod88P"  `V88V"V8P'  `Y8bod8P' o888o o888o   "888"        


Authors: Scott Baker & Joseph Mennillo

*/

document.addEventListener('DOMContentLoaded', async() => {

  // dublit branding
  async function getConsoleArt(){
  const filePath = '../static/console.txt'; // Replace with the path to your text file
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error('Error reading the file');
      }
      const content = await response.text();
      console.log(content,'\n\nThis chatbot was created by Dublit! Learn more at https://dublit.org/');
    } 
    catch (err) {
      console.error('Error reading the file: ', err);
    }
  }
  await getConsoleArt();


// INJECT THE BOT HTML
  var bottle = `
   <a id="chatbot">
   <div id="chat-header">
        <svg id="chatIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>
        <h2 id="chatTitle">Earthbot</h2>
        <div id="prompts">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
          </div>
         <div id="closeButton">
          <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
         </div>
        </div>
        <div id="injection_section">
            <div id="suggestions">
            </div>
        </div>
        <div id="message_section">
            <label id="messageInputLabel">
                <textarea placeholder="Ask me about Earthshot!" id="messageInput"></textarea>
            </label>
            <button id="sendMessage" type="submit" title="send message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
            </button>
        </div>
        
    </a>
  `

  document.body.innerHTML += bottle
  


  
  // INTERACTIONS SECTION

var chatButton = document.getElementById('chatbot');
var injectionSection = document.getElementById('injection_section');
var chatIcon = document.getElementById('chatIcon');
var closeButton = document.getElementById('closeButton');
var messageSection = document.getElementById('message_section');
var chatTitle = document.getElementById('chatTitle');
var sendMessage = document.getElementById('sendMessage');
var suggestions = document.getElementById('suggestions');
var prompts = document.getElementById('prompts');
var opened = false;
var promptArray = []
  
closeButton.style.display = 'none';
prompts.style.display = 'none';

function pickRandomElements(arr, numElements) {
    // Copy the original array to avoid modifying it
    const copyArray = [...arr];
    
    // Array to store the selected elements
    const randomElements = [];
    
    // Loop to pick random elements
    for (let i = 0; i < numElements; i++) {
      // Generate a random index within the remaining array length
      const randomIndex = Math.floor(Math.random() * copyArray.length);
      
      // Retrieve the element at the random index and remove it from the array
      const selectedElement = copyArray.splice(randomIndex, 1)[0];
      
      // Add the selected element to the randomElements array
      randomElements.push(selectedElement);
    }
    
    return randomElements;
  }

chatButton.addEventListener('click', async(e) => {

    if(opened === false){
      // depending on size of screen at time of opening, we will adjust the size of the chatbot bubble
      var screenWidth = window.innerWidth;
      if(screenWidth < 500){
        chatButton.style.width = '95%';
        chatButton.style.height = '99%';
        chatButton.style.borderRadius = '14px';
        chatButton.style.top = '0%'
      }
      else {
        chatButton.style.width = '300px';
        chatButton.style.height = '420px';
        chatButton.style.borderRadius = '14px';
        chatButton.style.top = '40%'
      }
      

      // same no matter what screen size
      opened = true;
      chatIcon.style.opacity = '0';
      chatButton.style.textAlign = 'none';
      injectionSection.style.display = 'flex'
      chatIcon.style.display = 'none';
      closeButton.style.display = 'inline';
      messageSection.style.display = 'flex';
      chatButton.style.cursor = 'default'
      chatTitle.style.display = 'inline';
      closeButton.style.display = 'inline';
      prompts.style.display = 'inline';

        
    }
    
});

closeButton.addEventListener('click', async(e) => {
    injectionSection.style.display = 'none';
    chatButton.style.width = '52px';
    chatButton.style.height = '52px';
    chatButton.style.borderRadius = '100px';
    chatButton.style.top = '80%';
    chatIcon.style.opacity = '1';
    chatButton.style.textAlign = 'center';
    
    chatIcon.style.display = 'inline';

    closeButton.style.display = 'none';

    messageSection.style.display = 'none';

    chatButton.style.cursor = 'pointer'
    
    chatTitle.style.display = 'none';

    closeButton.style.display = 'none';

    prompts.style.display = 'none';

    setTimeout(async function(){
        opened = false;
    },500);
});

var message_id = 1;
sendMessage.addEventListener('click', async(e) => {
    var curr_message = document.getElementById('messageInput').value;
    var curr_response;
    console.log(curr_message)

    // if not empty, sned to API
    if(curr_message !== "" && curr_message !== " " && curr_message !== null){
        //clear suggs
        suggestions.style.display = 'none';
        
        //clear message
        document.getElementById('messageInput').value = "";
        //loading animation
        sendMessage.innerHTML = `<svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>`

        //disable button
        sendMessage.disabled = true;

        // show user message
        injectionSection.innerHTML += `<div class="userMessage">${curr_message}</div>`
       
        //scroll
        injectionSection.scrollBy({top:message_id * 1200, behavior: 'smooth'});

        //send to API
        curr_response = await sendToChat(curr_message);
        // array pos 0 is response, array pos 1 is random messages
        var currResponseMsg = curr_response[0];
        var currResponseQuestions = curr_response[1];

        //show response message
        var resText = currResponseMsg;
        resText = resText.replace(/<(.+?)>/g, "&lt$1&gt") //replaces all tags 
        resText = resText.replace(/(?:\r\n|\r|\n)/g, '<br>') //replaces all new lines 
        resText = resText.replace(/```(.+?)```/g, "<pre><code>$1</code></pre>") //repalces backticks to be pre/code
        injectionSection.innerHTML += await `<div class="responseMessage">${resText}</div>`
        await injectSimilarPrompts(currResponseQuestions);
        await addSuggListener();
        //end animation
        sendMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>`
        
        //scroll
        injectionSection.scrollBy({top:message_id * 1200, behavior: 'smooth'});
        message_id += 1;
        
        //enable button
        sendMessage.disabled = false;
    }
    


});

  async function awakeMessage(result) {
          //disable button
          sendMessage.disabled = true;

          // array pos 0 is response, array pos 1 is random messages
          var currResponseMsg = result[0];
          var currResponseQuestions = result[1];
    
          //show response message
          var resText = currResponseMsg;
          resText = resText.replace(/<(.+?)>/g, "&lt$1&gt") //replaces all tags 
          resText = resText.replace(/(?:\r\n|\r|\n)/g, '<br>') //replaces all new lines 
          resText = resText.replace(/```(.+?)```/g, "<pre><code>$1</code></pre>") //repalces backticks to be pre/code
          injectionSection.innerHTML += await `<div class="responseMessage">${resText}</div>`
          await injectSimilarPrompts(currResponseQuestions);
          await addSuggListener();
          //end animation
          sendMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>`

          //enable button
          sendMessage.disabled = false;
      



  }

//click a suggestion
suggestions.addEventListener('click', async(e) => {
    var clickedSugg = e.target.closest('p').innerText;
    suggestions.style.display = 'none';
    document.getElementById('messageInput').value = clickedSugg;
    sendMessage.click()
});

async function addSuggListener(){
    
    var suggs = document.getElementById('suggestions');
    
    console.log('initialized listener')
    //click a suggestion
    suggs.addEventListener('click', async(e) => {
        console.log('clicked sugg')
        var clickedSugg = e.target.closest('p').innerText;
        
        document.getElementById('messageInput').value = clickedSugg;
        sendMessage.click()
    });
}

var createPrompts = async function createPromptArray() {
    try {
        var ret = [];
        var res = [];

        // Use await to wait for the fetch to complete
        var response = await fetch('/get-QA-Pairs');
        var myJson = await response.json();
        res = myJson.message;

        for (var i = 0; i < res.length; i++) {
            ret.push(res[i].input_text);
        }

        var counter = 0;
        var retArray = [];
        ret.forEach((o) => {
            retArray.push(`<p id="sugg${counter}">${o}</p>`);
            counter += 1;
        });

        // Return the result as a Promise
        return retArray;
    } catch (error) {
        // Handle any errors that occur during the fetch or processing here
        console.error(error);
    }
}
async function promptFetch(){
    promptArray = await createPrompts()
}


async function injectSimilarPrompts(returnedSuggs){
    tempRandos = returnedSuggs;
    let injectionString;
    // show the suggs
    suggestions.style.display = 'flex';

    // inject sugg div header
    injectionString = `<div id='suggestions' class="suggestions">`
    // inject the suggs
    var counter = 0
    tempRandos.forEach(async o => {
        injectionString += (`<p id="sugg${counter}">${o}</p>`);
        counter+=1;
    });
    // inject sugg div footer
    injectionString += `</div>`

    // inject
    injectionSection.innerHTML += injectionString
}
//bring the suggs back up
prompts.addEventListener('click', async(e) => {
    tempRandos = pickRandomElements(promptArray,3);
    let injectionString
    // clear the seciton
    injectionSection.innerHTML = '';
    // show the suggs
    suggestions.style.display = 'flex';

    // inject sugg div header
    injectionString = `<div id='suggestions'>`
    // inject the suggs
    tempRandos.forEach(async o => {
        injectionString += o;
    });
    // inject sugg div footer
    injectionString += `</div>`

    // inject
    injectionSection.innerHTML = injectionString

    // add listeners for new suggs
    await addSuggListener();
});



// send message on enter
document.getElementById('messageInput').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendMessage.click();
    }
  });


// API SECTION // injection 


// request responds from python script
async function sendToChat(query){
    let txt;

    // send an http request to python script
    await fetch('/process-request', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
        
    }).then((response) => {
        console.log(response)
        return response.json()
    })
    .then((myJson) => {
        console.log(myJson.message); 
        txt = [myJson.message,myJson.responses]
    })
    .catch((error) => {
        console.log(error)
        txt = error
    })

    document.getElementById('suggestions').remove();
    return txt
}


  // inject random elements into the suggestions box on boot
  await promptFetch();
  var tempSuggs = pickRandomElements(promptArray,3);
  var tempInjection = ''
  tempSuggs.forEach(async (o) => {
      tempInjection += o;
  });
  document.getElementById('suggestions').innerHTML = tempInjection


 async function bootMessage(){
   var query = 'Explain that messages can be innacurate or irrelevant because you are a chatbot that is in development, and that you will try to not do it again. Keep it under two sentences'
   var response = await sendToChat(query)

   await awakeMessage(response);
 }
  await bootMessage();
     
  
 

});
