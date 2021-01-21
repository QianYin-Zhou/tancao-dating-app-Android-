
import React, { Component } from 'react';
import 'dayjs/locale/zh-cn'; // 引入中文语言包
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { pxTOdp } from "../utils/stylesKits";
import JMessage from '../utils/JMessage';
 
class Index extends Component {
  state = {
    messages: [],
  }
 
  //  渲染前
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,     //消息的ID，用于标示，必须唯一
          text: 'Hello developer',  
          createdAt: new Date(),    //发送的时间
          user: {
            _id: 2,        //发送方的ID 如果是自己的ID 则在右边，否则在左边
            name: 'React Native',
            avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201909%2F30%2F20190930010141_tfozs.thumb.700_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3493007551,2193538457&fm=26&gp=0.jpg=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612511232&t=5084c5832b1850395242ff84f1312e54',
          },
				},
				{
          _id: 2,     //消息的ID，用于标示，必须唯一
          text: 'Hello developer 3543',  
          createdAt: new Date(),    //发送的时间
          user: {
            _id: 2,        //发送方的ID 如果是自己的ID 则在右边，否则在左边
            name: 'React Native',
            avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201909%2F30%2F20190930010141_tfozs.thumb.700_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3493007551,2193538457&fm=26&gp=0.jpg=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612511232&t=5084c5832b1850395242ff84f1312e54',
          },
				},
				{
          _id: 3,     //消息的ID，用于标示，必须唯一
          text: 'Hello developer 3543',  
          createdAt: new Date(),    //发送的时间
          user: {
            _id: 857,        //发送方的ID 如果是自己的ID 则在右边，否则在左边
            name: 'React Native',
            avatar: 'http://157.122.54.189:9089/upload/160976914799518665777777.jpg',
          },
        },
      ],
    })
  }
 

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
						padding: pxTOdp(5)
          }
        }}
      />
    );
  }
 
  //  最终渲染
  render() {
    return (
			<GiftedChat
				messages={this.state.messages}   // 点击send时这个state的message作为参数加到previousstate的message里
				//点击send时的回调
				onSend={messages => this.onSend(messages)}
				//  定义用户的id 如果消息消息的发送方的id和此id相同，则显示在右边
				user={{ _id: 857 }}
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
