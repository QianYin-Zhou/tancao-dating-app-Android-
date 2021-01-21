import React, { Component } from 'react';
import { View,Text, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomBar from "./components/Custombar";
import Recommend from "./recommend";
import Latest from "./latest";

class Index extends Component {
	state = {  }
	render() { 
		return (  
			<ScrollableTabView
				initialPage={1}
				renderTabBar={() => <CustomBar />}>
				<Latest tabLabel='更新' />
				<Recommend tabLabel='推荐' />
				<Text tabLabel='猪猪'>强迫症</Text>
			</ScrollableTabView>
		); 
	}
}
 
export default Index;