import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView , RefreshControl } from 'react-native';
import { pxTOdp } from '../../../utils/stylesKits';
import IconFont from "../../../components/IconFont";
import JMessage from '../../../utils/JMessage';
import request from "../../../utils/request";
import { FRIEND_PERSON_INFO_GUID, BASE_URI } from "../../../utils/pathMap";
import date from "../../../utils/date";
import { NavigationContext } from "@react-navigation/native";

class Index extends Component {

	static contextType = NavigationContext;

	state = { 
		list: [],
		refreshing: false
	}

	componentDidMount() {
		this.getMessage();
	}

	onRefresh = async()=> {
		this.setState({ refreshing: true });
		await this.getMessage();
		this.setState({ refreshing: false });
	}

	getMessage = async ()=> {
		let res = await JMessage.getConversations();
		if(res.length) {
			let guidListData = res.map(v=> v.target.username.length < 12 ? null : v.target.username);  //为自己犯的错负责
			let guidList = guidListData.filter(n => n);
			let url = FRIEND_PERSON_INFO_GUID.replace(":ids", guidList.join(","));
			let users = await request.privateGet(url);
			this.setState({ list: res.map((v, i) => ({ ...v, user: Object.assign({}, users.data[i]) })) }); 
			console.log(JSON.stringify(res, null, 2));
			return Promise.resolve();
		}
	}

	render() { 
		let { list, refreshing } = this.state;
		console.log(list);
		if(!list) {
			return <></>
		}
		return (  
			<ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={ this.onRefresh } />}>
				<StatusBar backgroundColor="transparent" translucent={true} />
				<ImageBackground source={ require("../../../res/img/headbg.png") } style={ styles.bgImg }>
					<TouchableOpacity style={ styles.backUpBox }></TouchableOpacity>
					<Text style={{ ...styles.navText, fontSize: pxTOdp(16), fontWeight: "bold" }}>我的消息</Text>
					<TouchableOpacity>
						<IconFont name="icontanhuaxiaoxi" style={{ width: pxTOdp(80), ...styles.navText,textAlign: "center" }} />
					</TouchableOpacity>
				</ImageBackground>
				{/*  */}
				<View>
					{
						list.map((v, i) => 
						<TouchableOpacity style={ styles.msgBox } 
							onPress={ ()=> this.context.navigate("WeChat", v.user)}
							key={i}>
							<View style={{ flex: 4, flexDirection: "row", alignItems: "center" }}>
								<Image style={ styles.headImg } source={{ uri: BASE_URI + v.user.header }} />
								<View style={{ flexDirection: "column", justifyContent: "space-between" }}>
									<Text style={ styles.nameText }>{ v.user.nick_name }</Text>
									<Text style={ styles.msg }>{ v.latestMessage.text}</Text>
								</View>
							</View>
							<Text style={{ flex: 1, alignSelf: "flex-start", textAlign: "center"}}>{ date(v.latestMessage.createTime).fromNow() }</Text>
						</TouchableOpacity> )
					} 
				</View>
			</ScrollView>
		); 
	}
}

const styles = StyleSheet.create({
	bgImg: {
		height: pxTOdp(60),
		paddingTop: pxTOdp(15),
		paddingBottom: pxTOdp(9),
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	},
	backUpBox: {
		width: pxTOdp(80),
		// flexDirection: "row",
		// alignItems: "center",
		// marginLeft: pxTOdp(6)
	},
	navText: { 
		color: "#fff",
		fontSize: pxTOdp(14)
	},
	msgBox: {
		height: pxTOdp(85), 
		padding: pxTOdp(10),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopColor: "#ccc",
		borderTopWidth: pxTOdp(0.8)
	},
	headImg: {
		width: pxTOdp(42),
		height: pxTOdp(42),
		borderRadius: pxTOdp(21),
		marginRight: pxTOdp(10)
	},
	nameText: {
		fontSize: pxTOdp(14.5)
	},
	msg: {
		color: "#666",
		fontSize: pxTOdp(13),
		marginTop: pxTOdp(5)
	}
});

export default Index;