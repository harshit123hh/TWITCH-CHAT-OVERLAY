console.log("this is twitch thread");

const socket = require('socket.io-client')('http://localhost:8085')
const wash = require('washyourmouthoutwithsoap');



const axios = require('axios');
const FormData = require('form-data');


const tmi = require('tmi.js');

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
  },

	channels: [ 'jadeyAnh' ]
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
    
      // if(check(message)==true)
      // {
      //   socket.emit('msg',message)
      // }
      // else
      // {
      //   socket.emit('msg',"Message blocked "+message)
      // }
      if(!checkUsingNodeModule(message))
      {
        socket.emit('msg' ,{message,tags,channel,self})
      }
      else
      {
       
      }

});
     





















function check(text)
{

data = new FormData();
data.append('text', text);
data.append('lang', 'en');
data.append('mode', 'standard');
data.append('api_user', '1735980987');
data.append('api_secret', 'a4fXjbSmp7gFpiMcxGg2');

axios({
  url: 'https://api.sightengine.com/1.0/text/check.json',
  method:'post',
  data: data,
  headers: data.getHeaders()
})
.then(function (response) {
  // on success: handle response
  if(response.data.profanity.matches.length==0)
  {
      return true
  }
  else
  {
      return false
  }
})
.catch(function (error) {
  // handle error
  if (error.response) console.log(error.response.data);
  else console.log(error.message);
  return true
});
return false;

}




function checkUsingNodeModule(text)
{
  return wash.check('en', text)
}

