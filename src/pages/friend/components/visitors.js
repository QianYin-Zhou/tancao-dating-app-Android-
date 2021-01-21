import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import request from "../../../utils/request";
import { BASE_URI, FRIEND_VISITORS } from "../../../utils/pathMap"
import { pxTOdp } from '../../../utils/stylesKits';

class Index extends Component {

	state = {
		visitors: [
			// {
			// 	"target_uid": 7,
			// 	"uid": 8,
			// 	"nick_name": "雾霭朦胧",
			// 	"age": 21,
			// 	"xueli": "大专",
			// 	"marry": "未婚",
			// 	"gender": "女",
			// 	"Distance": 0,
			// 	"header": "/upload/13828459782.png",
			// 	"agediff": -2,
			// 	"fateValue": 82
			// }
		]
	}

	async componentDidMount() {
		const res = await request.privateGet(FRIEND_VISITORS);
		this.setState({ visitors: res.data });
	}

	render() { 
		let { visitors } = this.state;
		return (  
			<View style={ styles.view }>
				<Text style={ styles.text }>最近有{ visitors.length }人来访，快去查看</Text> 
				<View style={ styles.headImgBox }>
					{
						visitors.map((v, i)=> 
							<Image style={ styles.headImg } source={{uri: BASE_URI+v.header}} key={i}/>
						)
					}
					<Text style={ styles.icon }>&gt;</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		paddingLeft: pxTOdp(5),
		paddingRight: pxTOdp(5),
		flexDirection: "row",
		marginTop: pxTOdp(20),
		alignItems: "center",
		marginTop: pxTOdp(20),
		marginBottom: pxTOdp(13)
	},
	text: {
		flex: 1,
		color: "#777",
		fontSize: pxTOdp(12)
	},
	headImgBox: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center"
	},
	headImg: {
		width: pxTOdp(34),
		height: pxTOdp(34),
		borderRadius: pxTOdp(17)
	},
	icon: {
		fontSize: pxTOdp(16),
		color: "#777"
	}
})
 
export default Index;