import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { pxTOdp } from "../../../utils/stylesKits";
import {inject,observer } from "mobx-react";
import { BASE_URI } from '../../../utils/pathMap';

@inject("UserStore") 
@observer

class Index extends Component {

	state = { 
		myInfo: this.props.UserStore.user
	}

	componentDidMount() { 

	}

	render() { 
		let { myInfo } = this.state;
		return (  
			<View style={{ flex: 1, backgroundColor: "#F5F5F5"}}>
				<View style={ styles.bgBox }>
					<StatusBar backgroundColor="transparent" translucent={true} />
					<View style={{ flexDirection: "row", width: "89%" }}>
						<Image source={{ uri: BASE_URI+myInfo.header }} style={ styles.headImg } />
						<Text style={{ color: "#fff", marginLeft: pxTOdp(13) }}>{ myInfo.nick_name }</Text>
					</View> 
				</View>
				<View style={ styles.stateBox }>
					<TouchableOpacity styles={ styles.stateMiniBox }>
						<Text style={{ textAlign: "center"}}>999</Text>
						<Text style={{ color: "#666", marginTop: pxTOdp(5)}}>关注</Text>
					</TouchableOpacity>
					<TouchableOpacity styles={ styles.stateMiniBox }>
						<Text style={{ textAlign: "center"}}>1</Text>
						<Text style={{ color: "#666", marginTop: pxTOdp(5)}}>喜欢</Text>
					</TouchableOpacity>
					<TouchableOpacity styles={ styles.stateMiniBox }>
						<Text style={{ textAlign: "center", marginTop: pxTOdp(5)}}>999</Text>
						<Text style={{ color: "#666", marginTop: pxTOdp(5)}}>粉丝</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({ 
	bgBox: {
		width: "100%",
		height: pxTOdp(160), 
		backgroundColor: "#c7689f",
		alignItems: "center",
		justifyContent: "center"
	},
	stateBox: {
		width: "88%",
		borderRadius: pxTOdp(12),
		height: pxTOdp(100),
		backgroundColor: "#fff",
		alignSelf: "center",
		marginTop: -pxTOdp(12),
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around"
	},
	stateMiniBox: {
		width: pxTOdp(80),
		justifyContent: "center",
		alignItems:"center",
		backgroundColor: "red"
	},
	headImg: {
		width: pxTOdp(60),
		height: pxTOdp(60),
		borderRadius: pxTOdp(30) 
	}
});

export default Index;