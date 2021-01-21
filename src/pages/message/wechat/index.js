
import React, { Component } from 'react';
import 'dayjs/locale/zh-cn'; // 引入中文语言包
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { pxTOdp } from "../../../utils/stylesKits";
import JMessage from '../../../utils/JMessage';
import { BASE_URI } from '../../../utils/pathMap';
import {inject,observer } from "mobx-react";

@inject("UserStore") 
@observer

class Index extends Component {
  state = {
    messages: [],
  }
 
  //  渲染前
  componentWillMount() {
		this.getHistoryMsg();
  }
 

	getHistoryMsg = async()=> {
		let username = this.props.route.params.guid;
		let from = 1;
		let limit = 100;
		let historyMsg = await JMessage.getHistoryMessages(username, from, limit);


	  // 处理数据
		let messageList = [];
		for(let i = 0; i < historyMsg.length; i++) {
			let obj = {
				_id: 0,     
				text: '',  
				createdAt: '',    
				user: {
					_id: 0,        
					name: '',
					avatar: '',
				}
			}
			obj["_id"] = historyMsg[i].target.username+i; 
			obj["text"] = historyMsg[i].text;
			obj["createdAt"] = historyMsg[i].createTime;
			obj["user"] = { 
				_id: this.props.route.params.guid,
				name: this.props.route.params.nick_name,
				avatar: BASE_URI+this.props.route.params.header,
			} 
			messageList.push(obj); // push
		}
		
		this.setState({ messages: messageList.reverse() });
	} 

  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
		}));
		// await JMessage.sendTextMessage()
		let guid = this.props.route.params.guid;
		let text = messages[0].text; 
		let extras = { user: JSON.stringify(this.props.route.params) }
		await JMessage.sendTextMessage(guid, text, extras);
	}
	
  // 自定义消息的内容View
  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;
 
    let messageTextStyle;
 
    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: 34,
      };
    }
 
    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }
 
 
    //  自定义气泡
     _renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { //对方的气泡
						backgroundColor: '#F5F7F7',
						padding: pxTOdp(4),
						margin: pxTOdp(3)
          },
          right:{ //我方的气泡
						backgroundColor:'#95ec69',
						padding: pxTOdp(4),
						margin: pxTOdp(3)
          }
        }}
      />
    );
  }
 
  //  最终渲染
  render() {
		let myID = this.props.UserStore.user.guid
    return (
			<GiftedChat
				messages={this.state.messages}   // 点击send时这个state的message作为参数加到previousstate的message里
				//点击send时的回调
				onSend={messages => this.onSend(messages)}
				//  定义用户的id 如果消息消息的发送方的id和此id相同，则显示在右边
				user={{ _id: myID }}
				// 有这条则返回自定义的，否则使用系统默认
			// renderMessage={this.renderMessage}
				showUserAvatar 
				renderAvatarOnTop 
				locale={"zh-cn"}
				placeholder={"开始聊天吧"}
				renderBubble={this._renderBubble}/>
    );
  }
}

export default Index;
