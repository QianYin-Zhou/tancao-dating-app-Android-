import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import request from "../../../../utils/request";
import { BASE_URI, QZ_RECOMMEND, QZ_STAR } from "../../../../utils/pathMap";
import IconFont from "../../../../components/IconFont";
import { pxTOdp } from '../../../../utils/stylesKits';
import Toast from '../../../../utils/Toast';
import JMessage from '../../../../utils/JMessage';
import {inject,observer } from "mobx-react";
import { NavigationContext } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import validator from "../../../../utils/validator";
import { EMOTIONS_DATA  } from "../../../../components/Emotion/datasource";
import date from "../../../../utils/date";

@inject("UserStore") 
@observer 

class Index extends Component {

	static contextType = NavigationContext;
	state = { 
		list: []
	}

	params = {
		page: 1,
		pagesize: 5
	}

	totalPages = 2;
	isLoading = false;

	componentDidMount() { 
		this.getList();
	}

	goComment = (item)=> {
		this.context.navigate("Comment", item);
	}

	handleStar = async(item)=> {
		const url = QZ_STAR.replace(":id", item.tid);
		const res = await request.privateGet(url);
		if(res.data.iscancelstar) {
			Toast.message("取消喜欢", 1000, "center");
		} else {
			const extras = { user: JSON.stringify(this.props.UserStore.user)}
			await JMessage.sendTextMessage(item.guid, `${ this.props.UserStore.user.nick_name} 点赞了你的动态`, extras);
			Toast.smile("喜欢成功", 2000, "center");
		}

		this.params.page = 1;
		this.getList(true);
	}

	onEndReached = ()=> {
		// console.log("onEndReached");
		if(this.params.page >= this.totalPages || this.isLoading) {
			return;
		} else {
			this.isLoading = true;
			this.params.page++;
			this.getList();
		}
	}

	getList = async(isNew=false)=> {  //是否
		const res = await request.privateGet(QZ_RECOMMEND, this.params);
		if(isNew) {
			this.setState({ list: res.data });
		} else {
			this.setState({ list: [ ...this.state.list, ...res.data] });
		}
		
		this.totalPages = res.pages;
		this.isLoading = false;
	} 

	renderRichText = (text)=> {
		const list = validator.parseRichText(text);
		return list.map((v, i)=> {
			if(v.text) {
				return <Text key={i} style={{ fontSize: pxTOdp(15.3)}}>{ v.text }</Text>
			}else if(v.imgKey) {
				return <Image key={i}
					style={{ width: pxTOdp(21), height: pxTOdp(21) }} 
					source={ EMOTIONS_DATA[v.imgKey]} />
			} else {
				return <></>
			}
		})
	}

	render() { 
		const { list } = this.state;
		return (  
			<>
				<FlatList 
					onEndReachedThreshold={0.1}
					onEndReached={ this.onEndReached }
					keyExtractor={ v=> v.tid+"" }
					renderItem={ ({ item, index})=> <View key={index} style={ styles.detailContainer }>
								<View style={{ justifyContent: "space-between", flexDirection: "row"}}>
									<View style={{ flex: 4, flexDirection: "row" }}>
										<View>
											<Image source={{ uri: BASE_URI+item.header }} style={ styles.headImg }/>
										</View>
										<View>
											<View style={ styles.detailBox }>
												<Text numberOfLines={1} style= {{ ...styles.text, fontSize: pxTOdp(14), fontWeight: "bold" }}>{ item.nick_name }</Text>
												<IconFont 
													name={ item.gender === "男" ? "icontanhuanan" : "icontanhuanv" }
													style={{ fontSize: pxTOdp(14), color: item.gender === "男" ? "#66CCCC" : "#FF99CC" }}/>
												<Text style= { styles.text }>{ item.age }</Text>
											</View>
											<View style={ styles.detailBox }>
												<Text style= { styles.text }>{ item.marry }</Text>
												<Text style= { styles.text }>|</Text>
												<Text style= { styles.text }>{ item.xueli }</Text>
												<Text style= { styles.text }>|</Text>
												<Text style= { styles.text }>{ item.agediff < 10 ? "年龄相仿" : "很大代沟" }</Text>
											</View>
										</View>
									</View>
									<TouchableOpacity>
										<IconFont name="icongengduo" style={{ fontSize: pxTOdp(15) }}/>
									</TouchableOpacity>
								</View>
								{/*  */}
								<View style={ styles.contentTextBox }>
									{ this.renderRichText(item.content) }
								</View>
								<View style={{ flexDirection: "row", marginTop: pxTOdp(15), flexWrap: "wrap" }}>
									{
										item.images.map((itemV, itemIndex)=> 
											<TouchableOpacity key={itemIndex}>
												<Image source={{ uri: BASE_URI+itemV.thum_img_path }} style={ styles.trendImg }/>
											</TouchableOpacity>
										)
									}
								</View>
								<View style={{ flexDirection: "row", alignItems: "center", marginTop: pxTOdp(16) }}>
									<Text style={{ color: "#555", fontSize: pxTOdp(12)  }}>距离 {item.dist} m</Text>
									<Text style={{ color: "#666", fontSize: pxTOdp(12), marginLeft: pxTOdp(9) }}> {date(item.create_time).fromNow() } </Text>
								</View>
								<View style={styles.detailFoot }>
									<TouchableOpacity 
									  onPress={ this.handleStar.bind(this, item) }
										style={{ flexDirection: "row", alignItems: "center" }}>
										<IconFont name="icondianzan-o" style={{ fontSize: pxTOdp(14)}} />
										<Text style={{ marginLeft: pxTOdp(3), fontSize: pxTOdp(14) }}>{ item.star_count }</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={ this.goComment.bind(this, item) }
										style={{ flexDirection: "row", alignItems: "center", justifyContent:"center" }}>
										<IconFont name="iconpinglun" style={{ fontSize: pxTOdp(14)}} />
										<Text style={{ marginLeft: pxTOdp(3), fontSize: pxTOdp(14) }}>{ item.comment_count }</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{ flexDirection: "row", alignItems: "center" }}>
										<IconFont name="iconxihuan-o" style={{ fontSize: pxTOdp(14)}}/>
										<Text style={{ marginLeft: pxTOdp(3), fontSize: pxTOdp(14) }}>{ item.like_count }</Text>
									</TouchableOpacity>
								</View>
							</View>}
				 	data={ list }/>
					{/*  */}
					<TouchableOpacity
						onPress={ ()=> this.context.navigate("Publish") }
						style={{ position: "absolute", right: "5%", bottom: "10%" }}>
						<LinearGradient
							colors={["#da6c8b", "#9b65cc"]}
							start={{ x:0, y:0 }} 
							end={{ x:1, y:1 }}
							style={{ width: pxTOdp(60), height: pxTOdp(60), borderRadius: pxTOdp(30),
								alignItems:"center", justifyContent: "center" }}>
							<Text style={{ color: "#fff", fontSize: pxTOdp(17) }}>发布</Text>
						</LinearGradient>
					</TouchableOpacity>
			</>
		);
	}
}

const styles = StyleSheet.create({ 
	detailContainer: { 
		padding: pxTOdp(13),
		paddingTop: pxTOdp(22), 
		paddingBottom: -pxTOdp(9),
		paddingRight: pxTOdp(8), 
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
	contentTextBox: {
		marginTop: pxTOdp(20),
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center"
	},
	trendImg: {
		width: pxTOdp(100),
		height: pxTOdp(100),
		marginRight: pxTOdp(7),
		marginBottom: pxTOdp(4)
	},
	detailFoot: { 
		flexDirection: "row", 
		alignItems: "center", 
		marginTop: pxTOdp(8), 
		justifyContent: "space-around",
		height: pxTOdp(30),
		marginTop: pxTOdp(20)
	}
});

export default Index;