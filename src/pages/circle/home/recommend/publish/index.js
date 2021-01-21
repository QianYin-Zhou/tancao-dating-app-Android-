import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LNNav from "../../../../../components/LNNav";
import IconFont from "../../../../../components/IconFont";
import Emotion from "../../../../../components/Emotion";
import { pxTOdp } from '../../../../../utils/stylesKits';
import Geo from "../../../../../utils/position";
import request from "../../../../../utils/request";
import { QZ_TREND_SUBMIT } from "../../../../../utils/pathMap";
import Toast from '../../../../../utils/Toast';

class Index extends Component {

	constructor() {
		super();
		this.refInput = React.createRef();
	}

	state = {
		textContent: "",
		longitude: "",
		latitude: "",
		location: "",
		imageContent: [
			{
				"headImgShortPath": "/upload/160976914799518665777777.jpg"
			}
		],
		isShowEmotionPanel: false
	}
	

	componentDidMount() { 

	}
	
	sendTrend = async()=> {
		const { textContent, location, longitude, latitude, imageContent } = this.state;
		if(!textContent || !location || !longitude || !latitude) {
			Toast.message("输入不合法");
			return;
		}

		const params = { textContent, location, longitude, latitude, imageContent }
		await request.privatePost(QZ_TREND_SUBMIT, params);
		Toast.smile("动态发布成功");
		setTimeout(() => {
			this.props.navigation.reset({
				routes: [{ name: "Tabbar", params: { pagename: "circle"} }]
			})
		}, 2000)
	} 

	handleEmotion = (emotionObj)=> {
		this.setState({ textContent: this.state.textContent+ emotionObj.key });
	}

	getLocation = async()=> {
		let res = await Geo._getCityByLocation();
		this.setState({
			location: res.regeocode.formatted_address,
			longitude: res.regeocode.addressComponent.streetNumber.location.split(",")[0],
			latitude: res.regeocode.addressComponent.streetNumber.location.split(",")[1]
		});

	}

	handleSetInputFocus = ()=> {
		if(!this.refInput.isFocused()) {
			this.setState({ isShowEmotionPanel: false });
		}
	}
	
	render() { 
		let { textContent, location, isShowEmotionPanel } = this.state;
		return (  
			<View style={{ backgroundColor: "#ffffff9a", flex: 1 }}>
				<LNNav title="发布动态" rightText="发帖" onRightPress={ this.sendTrend } />
				<TouchableOpacity style={ styles.textInputBox } onPress={ this.handleSetInputFocus }>
					<TextInput 
						ref={ r=> this.refInput = r}
						value={textContent}
						onChangeText={ (v)=> this.setState({ textContent: v }) }
						multiline
						placeholder="请填写动态（140字以内）"
						style={ styles.textInput } />
				</TouchableOpacity>
				<TouchableOpacity style={ styles.locationBox } onPress={ this.getLocation }>
					<IconFont name="iconlocation" style={ styles.iconText } />
					<Text style={{ ...styles.iconText, maxWidth: "90%"}} numberOfLines={1}>{ location || "你在哪里？" }</Text>
				</TouchableOpacity>
				<View style={{ backgroundColor: "#F5F5F5", 
					padding: pxTOdp(4), paddingLeft: pxTOdp(12), flexDirection: "row" }}>
					<TouchableOpacity>
						<IconFont name="icontanhuatupian" style={{ fontSize: pxTOdp(26), color: "#696969", margin: pxTOdp(5) }}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={ ()=> this.setState({ isShowEmotionPanel: !this.state.isShowEmotionPanel }) }>
						<IconFont name="iconbiaoqing" 
							style={{ fontSize: pxTOdp(26), color: isShowEmotionPanel?"#df6a88":"#696969", margin: pxTOdp(5)  }}/>
					</TouchableOpacity>
				</View>
				{/*  */}
				<View>
					{ isShowEmotionPanel ? <Emotion onPress={ this.handleEmotion }/> : <></> }
					
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({ 
	textInputBox: {
		height: "37%",
		padding: pxTOdp(6)
	},
	textInput: {
		color: "#555",
		fontSize: pxTOdp(14),
		lineHeight: pxTOdp(15),
		letterSpacing: pxTOdp(0.4)
	},
	locationBox: {
		height: pxTOdp(50),
		flexDirection: "row",
		alignSelf: "flex-end",
		alignItems: "center",
		marginRight: pxTOdp(10)
	},
	iconText: {
		color: "#666",
		fontSize: pxTOdp(14),
		margin: pxTOdp(4)
	}
});

export default Index;