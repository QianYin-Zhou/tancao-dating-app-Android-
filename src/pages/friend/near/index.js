import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { pxTOdp, screenHeight, screenWidth } from '../../../utils/stylesKits';
import request from "../../../utils/request";
import { BASE_URI, FRIEND_SEARCH } from "../../../utils/pathMap";


class Index extends Component {
	params = {
		gender: "男",
		distance: 10000
	}

	WidthHeightMap = {
		i1: { width: pxTOdp(70), height: pxTOdp(95) },
		i2: { width: pxTOdp(60), height: pxTOdp(85) },
		i3: { width: pxTOdp(50), height: pxTOdp(75) },
		i4: { width: pxTOdp(40), height: pxTOdp(65) },
		i5: { width: pxTOdp(30), height: pxTOdp(55) },
		i6: { width: pxTOdp(20), height: pxTOdp(45) },
	}

	state = { 
		list: []
	}

	componentDidMount() {
		this.getList();
	}

	getWidthHeight = (dist)=> {
		if(dist < 10) { return this.WidthHeightMap.i1; }
		if(dist < 20) { return this.WidthHeightMap.i2; }
		if(dist < 50) { return this.WidthHeightMap.i3; }
		if(dist < 60) { return this.WidthHeightMap.i4; }
		if(dist < 70) { return this.WidthHeightMap.i5; }
		return this.WidthHeightMap.i6;
	}

	getList = async()=> {
		const res = await request.privateGet(FRIEND_SEARCH, this.params);
		this.setState({ list: res.data })
	}

	render() { 
		const { list } = this.state;	
		return (  
			<ImageBackground source={require("../../../res/img/search.gif")} style={ styles.bgImg }>
				<StatusBar backgroundColor={"transparent"} translucent={true} />
				{/* <附近的人> */}
					{
						list.map((v,i)=> {
							let whObj = this.getWidthHeight(v.dist);
							let rLeft = Math.random()*(screenWidth-whObj.width);
							let rTop = Math.random()*(screenHeight-whObj.height);
							return <TouchableOpacity key={i} style={{	position: "absolute", left: rLeft, top: rTop}}>
								<ImageBackground 
									source={require("../../../res/img/showfirend.png")} 
									style={{ ...whObj, position: "relative", alignItems: "center" }} 
									resizeMode="stretch">
									<Text numberOfLines={1} style={ styles.nickName }>{ v.nick_name }</Text>
									<Image source={{ uri: BASE_URI+v.header }} style={{ width: whObj.width, height: whObj.width, borderRadius:  whObj.width/2 }} />
								</ImageBackground>
							</TouchableOpacity>
						})
					}
				{/* </附近的人> */}
				<View style={ styles.footerView }>
					<Text style={ styles.footerText }>您附近有
						<Text style={{ fontSize: pxTOdp(21),fontWeight: "bold", color: "#FF6464" }}>{ list.length }</Text>
						个好友</Text>
					<Text style={ styles.footerText }>选择聊聊吧</Text>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	bgImg: {
		flex: 1
	},
	nickName: {
		position: "absolute",
		color: "#ffffff9a",
		top: -pxTOdp(17),
		fontSize: pxTOdp(11)
	},
	footerView: {
		width: "100%",
		position: "absolute",
		bottom: pxTOdp(30),
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column"
	},
	footerText: {
		fontSize: pxTOdp(16),
		color: "#fff"
	}
});

export default Index;