import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';

const Chat = (props) => {
    return (
       <List className="List">
            {(()=>{
                if(props.chat !== null || props.chat!== undefined){
                    return props.chat.map((message, index)=>{
                        console.log(message)
                        return<ListItem key={index} className="ListItem">
                            <ListItemText primary={message.name} secondary={<Typography variant="h6" style={{ color: 'black' }}>{message.text}</Typography>} className="messageBlock"></ListItemText>
                        </ListItem>
                    })
                }
            
            })()}
                
            
       </List>
    );
}

export default Chat;
