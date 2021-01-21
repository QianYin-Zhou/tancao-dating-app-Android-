// In App.js in a new project
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/account/login';
import UserInfo from './pages/account/userinfo';
import Tabbar from './tabbar.js';
import TanCao from "./pages/friend/tancao";
import Near from "./pages/friend/near";
import TestSoul from "./pages/friend/testsoul";
import TestQA from "./pages/friend/testsoul/testQA";
import TestResult from "./pages/friend/testsoul/testResult";
import Detail from "./pages/friend/detail";
import Chat from "./pages/message/chat";
import WeChat from "./pages/message/wechat";
import Comment from "./pages/circle/home/recommend/comment";
import Publish from "./pages/circle/home/recommend/publish";
import { inject,observer } from "mobx-react";
import Test from './pages/TestPage';
const Stack = createStackNavigator();

@inject("RootStore") 
@observer 
class Nav extends Component {
	constructor(props) {   // 不存在token就返回登录界面
		super(props);
		this.state = {
			_initialRouteName: this.props.RootStore.token ? "Login" : "Login"
		} 
	} 

	render() { 
		console.log(this.props.RootStore.token);
		return ( 
			<NavigationContainer>
				<Stack.Navigator headerMode="none" initialRouteName={ this.state._initialRouteName }>
					<Stack.Screen name="Test" component={Test} />
					<Stack.Screen name="Publish" component={Publish} />
					<Stack.Screen name="Comment" component={Comment} />
					<Stack.Screen name="WeChat" component={WeChat} />
					<Stack.Screen name="Chat" component={Chat} />
					<Stack.Screen name="Detail" component={Detail} />
					<Stack.Screen name="TestResult" component={TestResult} />
					<Stack.Screen name="TestQA" component={TestQA} />
					<Stack.Screen name="TestSoul" component={TestSoul} />
					<Stack.Screen name="Near" component={Near} />
					<Stack.Screen name="TanCao" component={TanCao} />
					<Stack.Screen name="Tabbar" component={Tabbar} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="UserInfo" component={UserInfo} />
				</Stack.Navigator>
    </NavigationContainer>
		);
	}
}

export default Nav;