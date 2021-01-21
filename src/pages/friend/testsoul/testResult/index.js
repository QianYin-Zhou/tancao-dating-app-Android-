import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import LNNav from "../../../../components/LNNav";
import LNButton from "../../../../components/LNButton";
import { BASE_URI } from '../../../../utils/pathMap';
import { pxTOdp } from '../../../../utils/stylesKits';

class Index extends Component {

	state = {  }
	componentDidMount() { 
 	}

	render() { 
		const resObj = this.props.route.params;

		return (  
			<ImageBackground source={ require("../../../../res/img/qabg.png") } style={ styles.bgImg }>
					<LNNav title="测试结果" />
					<ImageBackground source={ require("../../../../res/img/result.png") } style={ styles.resBgImg } resizeMode="stretch">
						<Text style={ styles.headerText }>灵魂基因鉴定单</Text>
						<View style={ styles.nameBox } >
							<Text style={ styles.nameText }>[</Text>
							<Text style={{ ...styles.nameText, width: "80%" }} numberOfLines={1}>{ resObj.currentUser.nick_name }</Text>
							<Text style={ styles.nameText }>]</Text>
						</View>
						<ScrollView style={ styles.contentBox }>
							<Text style={ styles.content }>{ resObj.content }</Text>
						</ScrollView>
						<View style={{...styles.publicBox, left: "7%",top: "46%" }}>
							<Text style={ styles.publicText }>外向：{ resObj.extroversion }%</Text>
						</View>
						<View style={{...styles.publicBox, left: "7%",top: "52.1%" }}>
							<Text style={ styles.publicText }>判断：{ resObj.judgment }%</Text>
						</View>
						<View style={{...styles.publicBox, left: "7%",top: "58.6%" }}>
							<Text style={ styles.publicText }>抽象：{ resObj.abstract }%</Text>
						</View>
						<View style={{...styles.publicBox, right: "6%",top: "46.6%" }}>
							<Text style={ styles.publicText }>理性：{ resObj.abstract }%</Text>
						</View>
						<Text style={[styles.publicBox, styles.uText]}>与你相似</Text>
						<ScrollView 
							style={ styles.likeHeadImgBox } 
							horizontal={true} 
							contentContainerStyle={{ flexDirection: "row", alignItems: "center"}}>
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
							<Image source={{ uri: BASE_URI+resObj.currentUser.header }}  style={ styles.headImg } />
						</ScrollView>
					</ImageBackground>
					<View style={ styles.footer }>
						<LNButton style={{ borderRadius: 5 }} onPress={ ()=> this.props.navigation.navigate("TestSoul") }>重新测试</LNButton>
					</View>
				</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({ 
	bgImg: {
		width: "100%",
		height: "100%"
	},
	resBgImg: {
		width: "100%",
		flex: 1,
		position: "relative"
	},
	headerText: {
		position: "absolute",
		top: "1.3%",
		left: "5%",
		color: "#ffffff9a",
		letterSpacing: pxTOdp(5),
		fontWeight: "bold"
	},
	nameBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "46%",
		position: "absolute",
		top: "5%",
		right: "4%"
	},
	nameText: {
		color: "#fff",
		fontSize: pxTOdp(16)
	},
	contentBox: {
		width: "47%",
		position: "absolute",
		top: "12%",
		right: "4%",
		height: "26%"
	},
	content: {
		color: "#ffffff9a",
		fontSize: pxTOdp(13),
		letterSpacing: pxTOdp(1.2),
		lineHeight: pxTOdp(17)
	},
	publicBox: {
		position: "absolute"
	},
	publicText: {
		color: "#fff",
		fontSize: pxTOdp(12),
		fontWeight: "bold"
	},
	uText: {
		color: "#ffffff9a",
		top: "69.5%",
		left: "2%",
		letterSpacing: pxTOdp(2),
		fontWeight: "bold"
	},
	likeHeadImgBox: {
		width: "96%",
		height: "11%",
		position: "absolute",
		left: "2%",
		top: "72%"
	},
	headImg: {
		width: pxTOdp(50),
		height: pxTOdp(50),
		borderRadius: pxTOdp(25),
		margin: pxTOdp(7)
	},
	footer: {
		position: "absolute",
		bottom: pxTOdp(28),
		width: '90%', 
		height: pxTOdp(36), 
		alignSelf: 'center'
	}
});

export default Index;