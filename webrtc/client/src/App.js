import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';
import Chat from './Chat';

const socket = io.connect('http://localhost:9000', { transport : ['websocket', 'polling', 'flashsocket'] })

function App() {
  
  const [message, setMessage] = useState({
    name:'user',
    text:'Hello World'
  });

  const [chat, setChat] = useState([]);

  useEffect(()=>{
    console.log('starting app');
    socket.on('message', (message)=>{
      console.log(message);
      let name = message.name;
      let text = message.text
      setChat([...chat, {name, text}]);
      console.log(chat);
    })
  },)

  const messageSubmit = ()=>{
    console.log('emitting message to socket')
    socket.emit('message', message);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(message);
    console.log('handle submit');
    messageSubmit();
  }

  return (
    <div className = "main">
      <h1 style={{color:"white"}}>CHAT APP</h1>
      <div className = "main-2">
        <div className="messenger">
          <form onSubmit = {handleSubmit}>
            <TextField onChange={(e)=>{setMessage({...message, name:e.target.value})}} id="outlined-basic" label="Name" variant="outlined" style={{alignSelf:"stretch", marginBottom:"5%"}}/><br/>
            <TextField onChange={(e)=>{setMessage({...message, text:e.target.value})}} id="outlined-basic" label="Text" variant="outlined" style={{alignSelf:"stretch", marginBottom:"5%"}}/><br/>
            <Button type="submit" color="primary" variant="contained" style={{alignSelf:"flex-end",}}>Submit</Button>
          </form>
        </div>
        <div className="chat">
          <Chat chat={chat}></Chat>
        </div>
      </div>
      
    </div>
    
  );
}

export default App;
