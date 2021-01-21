import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import request from "../../../utils/request";
import { BASE_URI, FRIEND_PERSON_INFO } from "../../../utils/pathMap";
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { pxTOdp } from '../../../utils/stylesKits';
import { Carousel } from "teaset";
import IconFont from "../../../components/IconFont";
import LinearGradient from "react-native-linear-gradient"
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import JMessage from '../../../utils/JMessage';
import {inject,observer } from "mobx-react";
import Toast from '../../../utils/Toast';

@inject("UserStore") 
@observer 

class Index extends Component {

	state = { 
		userDetail: {},
		trends: [],  // 方便
		isShowModal: false,
		currentIndex: 0,
		imgUrls: []
	}

	params={
		page: 1,
		pagesize: 2
	}

	totalPages = 1;
	isLoading = false; //节流

	componentDidMount() { 
		this.getDetail();
		console.log(this.luckyGetUserNameByCissy(this.props.route.params.headerStr));
	}

	goChat = ()=> {
		let { userDetail } = this.state;
		this.props.navigation.navigate("Chat", userDetail);
	}

	sendLike = async()=> {
		let guid = this.state.userDetail.guid;
		// let guid = this.luckyGetUserNameByCissy(this.props.route.params.headerStr);
		let text = `${ this.props.UserStore.user.nick_name }喜欢了你`; 
		let extras = { user: JSON.stringify(this.state.userDetail) }
		await JMessage.sendTextMessage(guid, text, extras);
		Toast.smile("喜欢成功", 1000, "center");
	}

	luckyGetUserNameByCissy = (str)=> {
		let strArr = str.substring(8).split(".");
		if(strArr[0].length === 11 ) {
			return strArr[0];
		}
		return strArr[0].substring(0, 11);
	}

	onScroll = ({ nativeEvent })=> {
		// 1. `nativeEvent.contentSize.height`  列表内容的高度
		// 2. `nativeEvent.layoutMeasurement.height` 可视区域的高度
		// 3. `nativeEvent.contentOffset.y` 滚动条距离顶部的高度 
		let bottom = nativeEvent.contentSize.height-nativeEvent.layoutMeasurement.height-nativeEvent.contentOffset.y;
		let isReachBottom = bottom < 50;
		let hasMore = this.params.page < this.totalPages;

		if(isReachBottom && hasMore && !this.isLoading) {
			this.isLoading = true;   // 发请求
			this.params.page++;
			this.getDetail();
		}
	}

	handleShowAlBum = (i, itemIndex)=> {
		const imgUrls = this.state.userDetail.trends[i].album.map(v=>({ url: BASE_URI+v.thum_img_path }));
		const currentIndex = itemIndex;
		const isShowModal = true;
		this.setState({ imgUrls, currentIndex, isShowModal })
	}

	getDetail = async()=> {
		const url = FRIEND_PERSON_INFO.replace(":id", this.props.route.params.id);
		const res = await request.privateGet(url, this.params);
		this.totalPages = res.pages;
		this.setState({ userDetail: res.data, trends: [...this.state.trends, ...res.data.trends ]  });
		this.isLoading = false;
	}

	render() { 
		let { userDetail, imgUrls, currentIndex, isShowModal, trends } = this.state;
		if(!userDetail.silder) {
			return <></>
		}
		return (  
			<HeaderImageScrollView
				maxHeight={ pxTOdp(220) }
				minHeight={ pxTOdp(40) }
				onScroll={ this.onScroll }
				style={{ backgroundColor: "#fff" }}
				headerImage={require("../../../res/img/headfriend.png")}
				renderForeground={() => (
					<Carousel control style={{height: pxTOdp(220)}}>
						{
							userDetail.silder.map((v, i)=> 
								<Image key={i} source={{ uri: BASE_URI+v.thum_img_path }} style={ styles.silderImg } />)
						}
					</Carousel>
				)}>
				
				<View>
					<View style={ rightContainer.container }>
						<View style={{ flex: 3, justifyContent: "space-around" }}>
							<View style={ rightContainer.detailBox }>
								<Text style= {{ ...rightContainer.text, fontSize: pxTOdp(16), fontWeight: "bold" }}>{ userDetail.nick_name }</Text>
								<IconFont 
									name={ userDetail.gender === "男" ? "icontanhuanan" : "icontanhuanv" }
									style={{ fontSize: pxTOdp(18), color: userDetail.gender === "男" ? "#66CCCC" : "#FF99CC" }}/>
								<Text style= { rightContainer.text }>{ userDetail.age }岁</Text>
							</View>
							<View style={ rightContainer.detailBox }>
								<Text style= { rightContainer.text }>{ userDetail.marry }</Text>
								<Text style= { rightContainer.text }>|</Text>
								<Text style= { rightContainer.text }>{ userDetail.xueli }</Text>
								<Text style= { rightContainer.text }>|</Text>
								<Text style= { rightContainer.text }>{ userDetail.agediff < 10 ? "年龄相仿" : "很大代沟" }</Text>
							</View>
						</View>
						<View style={{ flex: 1, ...rightContainer.centerBox }}>
							<View style={{ position: "relative",...rightContainer.centerBox }}>
								<IconFont name="iconxihuan" style={ rightContainer.like } />
								<Text style={ rightContainer.fateValue }>{ userDetail.fateValue }</Text>
							</View>
							<Text style={ rightContainer.fateValueText }>缘分值</Text>
						</View>
					</View>
				</View>
				{/* <动态> */}
				<View style={ styles.doingBox }>
					<View style={ styles.doingTitle }>
						<View style={{ flexDirection: "row", alignItems: "center", width: "40%"}}>
							<Text style={{ color: "#666"}}>动态</Text>
							<View style={ styles.msgWrapper }>
								<Text style={{ color: "#fff",fontSize: pxTOdp(10.5) }}>{ trends.length }</Text>
							</View>
						</View>
						<TouchableOpacity onPress={ this.goChat }>
							<LinearGradient
								start={{ x:0, y:0 }}
								end={{ x:1, y:0 }}
								style={styles.buttonStyle}
								colors={["#f2ab5a","#ec7c50"]}>
								<IconFont name="iconliaotian" style={ styles.iconText }/>
								<Text style={ styles.iconText }>聊一聊</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity onPress={ this.sendLike }>
							<LinearGradient
								start={{ x:0, y:0 }}
								end={{ x:1, y:0 }}
								style={styles.buttonStyle}
								colors={['#9b63cd', '#e0708c']}>
								<IconFont name="iconxihuan-o" style={ styles.iconText }/>
								<Text style={ styles.iconText }>喜欢</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
					<View>
						{/* 动态 */}
						{
							trends.map((v, i)=> <View key={i} style={ styles.detailContainer }>
								<View style={{ flex: 4, flexDirection: "row" }}>
									<View>
										<Image source={{ uri: BASE_URI+userDetail.header }} style={ styles.headImg }/>
									</View>
									<View>
										<View style={ styles.detailBox }>
											<Text numberOfLines={1} style= {{ ...styles.text, fontSize: pxTOdp(14), fontWeight: "bold" }}>{ userDetail.nick_name }</Text>
											<IconFont 
												name={ userDetail.gender === "男" ? "icontanhuanan" : "icontanhuanv" }
												style={{ fontSize: pxTOdp(14), color: userDetail.gender === "男" ? "#66CCCC" : "#FF99CC" }}/>
											<Text style= { styles.text }>{ userDetail.age }</Text>
										</View>
										<View style={ styles.detailBox }>
											<Text style= { styles.text }>{ userDetail.marry }</Text>
											<Text style= { styles.text }>|</Text>
											<Text style= { styles.text }>{ userDetail.xueli }</Text>
											<Text style= { styles.text }>|</Text>
											<Text style= { styles.text }>{ userDetail.agediff < 10 ? "年龄相仿" : "很大代沟" }</Text>
										</View>
									</View>
								</View>
								{/*  */}
								<Text style={ styles.contentText }>{ v.content }</Text>
								<View style={{ flexDirection: "row", marginTop: pxTOdp(15), flexWrap: "wrap" }}>
									{
										v.album.map((itemV, itemIndex)=> 
											<TouchableOpacity key={itemIndex} onPress={ ()=> this.handleShowAlBum(i, itemIndex) }>
												<Image source={{ uri: BASE_URI+itemV.thum_img_path }} style={ styles.trendImg }/>
											</TouchableOpacity>
										)
									}
								</View>
							</View>)
						}
					</View>
					<Modal visible={ isShowModal } transparent={true}>
						<ImageViewer imageUrls={ imgUrls } index={ currentIndex } onClick={ ()=> this.setState({ isShowModal: false })}/>
					</Modal>
				</View>
				{/* </动态> */}
			</HeaderImageScrollView>
		);
	}
}

const styles = StyleSheet.create({ 
	silderImg: {
		width: "100%",
		height: pxTOdp(220)
	},
	doingBox: {
	},
	doingTitle: {
		padding: pxTOdp(10),
		flexDirection: "row",
		justifyContent: "space-between"
	},
	msgWrapper: {
		backgroundColor: "red",
		width: pxTOdp(16),
		height: pxTOdp(16),
		borderRadius: pxTOdp(8),
		alignItems: "center",
		justifyContent: "center",
		marginLeft: pxTOdp(2)
	},
	buttonStyle: {
		width: pxTOdp(100),
		height: pxTOdp(30),
		borderRadius: pxTOdp(15),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		padding: pxTOdp(7)
	},
	iconText: {
		color: "#fff",
		fontSize: pxTOdp(14)
	},
	detailContainer: { 
		padding: pxTOdp(10), 
		paddingBottom: pxTOdp(5),
		paddingRight: pxTOdp(35), 
		marginBottom: pxTOdp(10),
		borderTopColor: "#ccc",
		borderTopWidth: pxTOdp(0.5)
	},
	headImg: {
		width: pxTOdp(46),
		height: pxTOdp(46),
		borderRadius: pxTOdp(23)
	},
	detailBox: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: pxTOdp(10)
	},
	text: {
		fontSize: pxTOdp(12),
		margin: pxTOdp(3),
		color: "#555"
	},
	contentText: {
		marginTop: pxTOdp(20),
		fontSize: pxTOdp(15),
		letterSpacing: pxTOdp(0.4),
		lineHeight: pxTOdp(20)
	},
	trendImg: {
		width: pxTOdp(130),
		height: pxTOdp(130),
		marginRight: pxTOdp(7),
		marginBottom: pxTOdp(4)
	}
});

const rightContainer = StyleSheet.create({
	centerBox: {
		justifyContent: "center", 
		alignItems: "center"
	},
	container: {
		flex: 1,
		flexDirection: "row",
		padding: pxTOdp(7),
		borderBottomWidth: pxTOdp(1),
		borderBottomColor: "#ccc"
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