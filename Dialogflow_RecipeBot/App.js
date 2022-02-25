//necessary imports
import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
//setails of key for dialogflow integration
import { dialogflowConfig } from './env';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BOT_USER = {
  _id: 2,
  name: 'RecipeBot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
}

class App extends Component{
  state = {
    messages : [
      {
        _id: 1,
        text: `Hi! I am Recipebot, your personal cooking assistant.`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }
  handleGoogleResponse(result){
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }
  sendBotResponse(text){
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }
  onSend(messages = []){
    this.setState((previousState) => ({ 
      messages : GiftedChat.append(previousState.messages, messages)
    }));
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }
  render(){
    return(
      // flex : 1 the size of all of the other elements will have the same width as their content
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text>
        hhjhh ehhg4rjh ehkhe
        </Text>
        <GiftedChat messages={this.state.messages} 
        onSend = {messages => this.onSend(messages)}
        user = {{_id : 1}}
        />
      </View>
    );
  };
}
export default App;
