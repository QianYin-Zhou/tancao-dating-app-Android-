import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BASE_URI, FRIEND_TODAY_BEST } from '../../../utils/pathMap';
import request from "../../../utils/request";
import { pxTOdp } from "../../../utils/stylesKits";
import IconFont from "../../../components/IconFont";

class Index extends Component {
	state = { 
		perfectData: {
			// "id": 83,
			// "header": "/upload/18665333333.jpg",
			// "nick_name": "33333",
			// "gender": "女",
			// "age": 20,
			// "marry": "单身",
			// "xueli": "大专",
			// "dist": 962.9,
			// "agediff": -3,
			// "fateValue": 69
		}
	}
	async componentDidMount() {
		const res = await request.privateGet(FRIEND_TODAY_BEST);
		this.setState({ perfectData: res.data[0] });
	}

	render() { 
		const { perfectData } = this.state;
		return (  
			<View style={{ flexDirection: "row" }}>
				{/* <左边盒子> */}
				<View style={ LeftContainer.container }>
					<Image source={{ uri: BASE_URI+perfectData.header }} style={ LeftContainer.header }/>
					<View style={ LeftContainer.tag }>
						<Text style={ LeftContainer.tagText }>今日帅哥</Text>
					</View>
				</View>
				{/* <左边盒子/> */}
				{/* <右边盒子> */}
				<View style={ rightContainer.container }>
					<View style={{ flex: 3, justifyContent: "space-around" }}>
						<View style={ rightContainer.detailBox }>
							<Text style= {{ ...rightContainer.text, fontSize: pxTOdp(16), fontWeight: "bold" }}>{ perfectData.nick_name }</Text>
							<IconFont 
								name={ perfectData.gender === "男" ? "icontanhuanan" : "icontanhuanv" }
								style={{ fontSize: pxTOdp(18), color: perfectData.gender === "男" ? "#66CCCC" : "#FF99CC" }}/>
							<Text style= { rightContainer.text }>{ perfectData.age }岁</Text>
						</View>
						<View style={ rightContainer.detailBox }>
							<Text style= { rightContainer.text }>{ perfectData.marry }</Text>
							<Text style= { rightContainer.text }>|</Text>
							<Text style= { rightContainer.text }>{ perfectData.xueli }岁</Text>
							<Text style= { rightContainer.text }>|</Text>
							<Text style= { rightContainer.text }>{ perfectData.agediff < 10 ? "年龄相仿" : "很大代沟" }</Text>
						</View>
					</View>
					<View style={{ flex: 1, ...rightContainer.centerBox }}>
						<View style={{ position: "relative",...rightContainer.centerBox }}>
							<IconFont name="iconxihuan" style={ rightContainer.like } />
							<Text style={ rightContainer.fateValue }>{ perfectData.fateValue }</Text>
						</View>
						<Text style={ rightContainer.fateValueText }>缘分值</Text>
					</View>
				</View>
				{/* <右边盒子/> */}
			</View>
		);
	}
}

const LeftContainer = StyleSheet.create({
	container: {
		flexDirection: "row",
		position: "relative"
	},
	header: {
		width: pxTOdp(100),
		height: pxTOdp(100)
	},
	tag: {
		width: pxTOdp(70),
		height: pxTOdp(25),
		backgroundColor: "#6699CC",
		borderTopEndRadius: pxTOdp(5),
		borderBottomEndRadius: pxTOdp(5),
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		left: 0,
		bottom: pxTOdp(7)
	},
	tagText: {
		color: "#fff",
		fontSize: pxTOdp(12)
	}
});

const rightContainer = StyleSheet.create({
	centerBox: {
		justifyContent: "center", 
		alignItems: "center"
	},
	container: {
		flex: 1,
		flexDirection: "row"
	},
	detailBox: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: pxTOdp(10)
	},
	text: {
		fontSize: pxTOdp(13),
		margin: pxTOdp(3),
		color: "#555"
	},
	like: {
		fontSize: pxTOdp(57),
		color: "#FF6666"
	},
	fateValue: {
		position: "absolute",
		color: "#fff",
		fontSize: pxTOdp(15),
		fontWeight: "bold"
	},
	fateValueText: {
		fontSize: pxTOdp(10),
		color: "#FF6666"
	}
});
export default Index;