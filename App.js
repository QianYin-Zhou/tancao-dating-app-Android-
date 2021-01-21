// In App.js in a new project

import React, { Component } from 'react';
import { View } from 'react-native';
import Nav from './src/nav.js';
import Geo from './src/utils/position.js';
import RootStore from './src/mobx';
import UserStore from './src/mobx/userStore.js';
import { Provider} from "mobx-react";
import JMessage from './src/utils/JMessage.js'
import { AsyncStorage } from 'react-native';

class Index extends Component {
	state = {
		isInitGeo: false  // 是否初始化地图
	}

	async componentDidMount() {
		const strUserInfo = await AsyncStorage.getItem("userinfo");
		const userinfo = strUserInfo ? JSON.parse(strUserInfo): {};
		if(userinfo.token) {
			RootStore.setUserInfo(userinfo.phone, userinfo.token, userinfo.userID);
			await JMessage.init();  // 初始化
		}
		await Geo._init(); 
		this.setState({ isInitGeo: true })
	}

	render() { 
		return ( 
			<View style={{ flex: 1 }}>
				<Provider RootStore={ RootStore } UserStore={ UserStore }>
					{ this.state.isInitGeo ? <Nav></Nav> : <></>}
				</Provider>
			</View>
		);
	}
}
 
export default Index;