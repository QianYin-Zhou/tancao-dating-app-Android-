import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { pxTOdp } from '../../../utils/stylesKits';
import FriendHead from "../components/FriendHead.js";
import Visitors from '../components/visitors.js';
import PerfectBoy from "../components/PerfectBoy";
import request from "../../../utils/request";
import { BASE_URI, FRIEND_RECOMMEND } from "../../../utils/pathMap";
import IconFont from "../../../components/IconFont";
import FilterPanel from "../components/FilterPanel";
import { Overlay } from "teaset";
import { NavigationContext } from "@react-navigation/native";

class Index extends Component {

	static contextType = NavigationContext;

	params =  {
		page: 1,
		pagesize: 12,
		gender: "男",
		distance: 2,
		lastLogin: "",
		city: "",
		education: ""
	}

	state = {  
		recommends: []
	}

	componentDidMount() {
		this.getRecommends();
	}

	filter = ()=> {
		let { page, pagesize, ...others } = this.params;
		let overlayViewRef = null;
		let overlayView = (
			<Overlay.View
				modal={true}
				overlayOpacity={0.7}
				ref={v => overlayViewRef = v}>
				<FilterPanel params={ others } onClose={ ()=> overlayViewRef.close() } onSubmitFilter={ this.handleSubmitFilter } />
			</Overlay.View>
		);
		Overlay.show(overlayView);
	}

	handleSubmitFilter = (filterParams)=> {
		//  参数合并
		this.getRecommends(filterParams);
	}
	
	getRecommends = async(filterParams={})=> {
		const res = await request.privateGet(FRIEND_RECOMMEND, { ...this.params,...filterParams });
		this.setState({ recommends: res.data });
	}

	render() {
		let { recommends } = this.state;
		return (
			<HeaderImageScrollView
				maxHeight={ pxTOdp(145) }
				minHeight={ pxTOdp(44) }
				headerImage={require("../../../res/img/headfriend.png")}
				renderForeground={() => (
					<View style={{ height: pxTOdp(145), justifyContent: "center", alignItems: "center" }} >
						<StatusBar backgroundColor={"transparent"} translucent={true} />
						<FriendHead />
					</View>
				)}
			>
				<View style={{ height: 1130 }}>
					<Visitors></Visitors>
					<PerfectBoy></PerfectBoy>
					{/* <推荐模块> */}
					<View style={ styles.container }>
						<View style={ styles.titleBox }>
							<Text style={{ color: "#666" }}>推荐帅哥</Text>
							<IconFont name="iconshaixuan" style={{ color: "#666" }} onPress={ this.filter }/>
						</View>
						<View style={ styles.listBox }>
							{
								recommends.map((v, i)=> 
								<TouchableOpacity
									onPress={ ()=> this.context.navigate("Detail", {id: v.id, headerStr: v.header }) } 
									key={i} style={styles.item}>
										<View style={{ flex: 4, flexDirection: "row" }}>
											<View>
												<Image source={{ uri: BASE_URI+v.header }} style={ styles.headImg }/>
											</View>
											<View>
												<View style={ styles.detailBox }>
													<Text numberOfLines={1} style= {{ ...styles.text, fontSize: pxTOdp(14), fontWeight: "bold" }}>{ v.nick_name }</Text>
													<IconFont 
														name={ v.gender === "男" ? "icontanhuanan" : "icontanhuanv" }
														style={{ fontSize: pxTOdp(14), color: v.gender === "男" ? "#66CCCC" : "#FF99CC" }}/>
													<Text style= { styles.text }>{ v.age }</Text>
												</View>
												<View style={ styles.detailBox }>
													<Text style= { styles.text }>{ v.marry }</Text>
													<Text style= { styles.text }>|</Text>
													<Text style= { styles.text }>{ v.xueli }</Text>
													<Text style= { styles.text }>|</Text>
													<Text style= { styles.text }>{ v.agediff < 10 ? "年龄相仿" : "很大代沟" }</Text>
												</View>
											</View>
										</View>
										<View style={{ flex: 1, flexDirection: "row",alignItems: "center" }}>
											<IconFont name="iconxihuan" style={styles.fateValue}/>
											<Text>{ v.fateValue }</Text>
										</View>
									</TouchableOpacity>
								)
							}
						</View>
					</View>
					{/* <推荐模块 /> */}
					<Text style={ styles.footerText }>没有你要的帅哥了喔...[哭唧唧]</Text>
				</View>
			</HeaderImageScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	titleBox: {
		height: pxTOdp(35),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: pxTOdp(3),
		paddingRight: pxTOdp(13),
		backgroundColor: "#F5F5F5"
	},
	listBox: {
		flexDirection: "column"
	},
	item: {
		width: "100%",
		height: pxTOdp(80),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		borderBottomColor: "#F5F5F5",
		borderBottomWidth: pxTOdp(2),
		paddingLeft: pxTOdp(10)
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
	fateValue: {
		fontSize: pxTOdp(26),
		color: "#FF6666",
		marginRight: pxTOdp(2)
	},
	footerText: {
		marginTop: pxTOdp(20),
		marginBottom: pxTOdp(90),
		color: "#ccc",
		fontSize: pxTOdp(12),
		alignSelf: "center"
	}
});
export default Index;