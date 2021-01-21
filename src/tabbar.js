import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import { circle, circle_selected, friend, friend_selected, message, message_selected, self, self_selected } from './res/font/svg';
import FriendPage from "./pages/friend/home";
import CirclePage from "./pages/circle/home";
import MessagePage from "./pages/message/home";
import SelfPage from "./pages/self/home";
import request from "./utils/request";
import { MY_INFO } from "./utils/pathMap";
import { inject, observer } from "mobx-react";
import JMessage from './utils/JMessage';
import { pxTOdp } from './utils/stylesKits';

@inject("UserStore") 
@observer 

class App extends Component {

	constructor(props) {
		super(props);
		let selectedTab =  "friend";
		if(this.props.route.params && this.props.route.params.pagename) {
			selectedTab = this.props.route.params.pagename;
		}
		this.state.selectedTab = selectedTab;
	}

	state = {
		pages: [
			{
				selected: "friend",
				title: "交友",
				renderIcon: () => <Svg svgXmlData={ friend } width={ svgStyles.width } height={ svgStyles.height} />,
				renderSelectedIcon: () => <Svg svgXmlData={ friend_selected } width={ svgStyles.width } height={ svgStyles.height} />,
				onPress: () => this.setState({ selectedTab: 'friend' }),
				component: <FriendPage></FriendPage>
			},
			{
				selected: "circle",
				title: "圈子",
				renderIcon: () => <Svg svgXmlData={ circle } width={ svgStyles.width } height={ svgStyles.height} />,
				renderSelectedIcon: () => <Svg svgXmlData={ circle_selected } width={ svgStyles.width } height={ svgStyles.height} />,
				onPress: () => this.setState({ selectedTab: 'circle' }),
				component: <CirclePage></CirclePage>
			},
			{
				selected: "message",
				title: "消息",
				renderIcon: () => <Svg svgXmlData={ message } width={ svgStyles.width } height={ svgStyles.height} />,
				renderSelectedIcon: () => <Svg svgXmlData={ message_selected } width={ svgStyles.width } height={ svgStyles.height} />,
				onPress: () => this.setState({ selectedTab: 'message' }),
				component: <MessagePage></MessagePage> 
			},
			{
				selected: "self",
				title: "我的",
				renderIcon: () => <Svg svgXmlData={ self } width={ svgStyles.width } height={ svgStyles.height} />,
				renderSelectedIcon: () => <Svg svgXmlData={ self_selected } width={ svgStyles.width } height={ svgStyles.height} />,
				onPress: () => this.setState({ selectedTab: 'self' }),
				component: <SelfPage></SelfPage>
			}
		]
	}

	async componentDidMount() {
		const res = await request.privateGet(MY_INFO);
		this.props.UserStore.setUser(res.data);

		console.log(`获取我的个人信息：${JSON.stringify(res.data, null, 2)}`);
		// 极光登录
		await JMessage.login(res.data.guid, res.data.mobile);
	}

	render() { 
		const { selectedTab, pages } = this.state;
		return ( 
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<TabNavigator>
					{ pages.map((v, i)=> <TabNavigator.Item key={i}
							selected={ selectedTab === v.selected }
							title={ v.title }
							titleStyle={{ marginTop: -pxTOdp(5) }}
							selectedTitleStyle= {{ color: "#df6a88" }}
							tabStyle= {{
								backgroundColor: "#F5F5F5",
								justifyContent:"center"
							}}
							renderIcon={ v.renderIcon }
							renderSelectedIcon={ v.renderSelectedIcon }
							onPress={ v.onPress }>
								{ v.component }		
						</TabNavigator.Item>)}
				</TabNavigator>
			</View>
		);
	}
}

const svgStyles = StyleSheet.create({
	width: 38,
	height: 38
});
 
export default App;