import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, TextInput } from 'react-native';
import LNNav from "../../../../../components/LNNav";
import LNButton from "../../../../../components/LNButton";
import { pxTOdp } from '../../../../../utils/stylesKits';
import request from '../../../../../utils/request';
import { BASE_URI, QZ_COMMENT, QZ_COMMENT_SUBMIT } from '../../../../../utils/pathMap';
import IconFont from "../../../../../components/IconFont";
import Toast from '../../../../../utils/Toast';

class Index extends Component {

	params = {
		page: 1,
		pagesize: 5
	}

	state = { 
		list: [],
		isShowModel: false,
		text: ""
	}

	componentDidMount() { 
		this.getCommentList()
	}

	handleSubmit = async()=> {
		const { text } = this.state;
		if(!text.trim()) {
			Toast.message("评论不能为空", 1000, "center");
			return;
		}

		let url = QZ_COMMENT_SUBMIT.replace(":id", this.props.route.params.tid);
		console.log(url);
		await request.privatePost(url, { comment: text });
		this.handleEditingEnd();
		this.getCommentList();
		Toast.smile("评论成功", 2000, "center");
		setTimeout(() => {
			this.props.navigation.reset({
				routes: [{ name: "Tabbar", params: { pagename: "circle"} }]
			})
		}, 2000)
	}

	handleEditingEnd = ()=> {
		this.setState({ isShowModel: false, text: "" });
	}

	getCommentList = async()=> {
		let url = QZ_COMMENT.replace(":id", this.props.route.params.tid);
		const res = await request.privateGet(url, this.params);
		this.setState({ list: res.data });
	}

	render() { 
		const { list, isShowModel, text } = this.state;
		return (  
			<View style={{ position: "relative", height: "100%" }}>
				<LNNav title="评论列表" />
				<View style={{ flexDirection: "row", width: "95%", justifyContent: "space-between", height: pxTOdp(45), alignItems: "center", alignSelf: "center" }}>
					<Text>所有评论 { list.length }</Text>
					<View style={ styles.footer }> 
						<LNButton style={{ borderRadius: 18 }} onPress={ ()=> this.setState({ isShowModel: true }) }>
							<Text style={{ fontSize: pxTOdp(13) }}>发表评论</Text>
						</LNButton>
					</View>
				</View> 
				<View>
					{
						list.map((v, i)=> <View key={i} style={ styles.commentDetail }>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<View>
									<Image source={{ uri: BASE_URI+v.header }} style={ styles.headImg }/>
								</View>
								<View style={{ flexDirection: "column", marginLeft: pxTOdp(10) }}>
									<Text>{ v.nick_name }</Text>
									<Text style={{ fontSize: pxTOdp(12), color: "#555" }}>{ v.create_time }</Text>
									<Text style={{ marginTop: pxTOdp(5) }}>{ v.content }</Text>
								</View>
							</View>
							<IconFont name="icondianzan" style={{ fontSize: pxTOdp(17) }}/>
						</View>)
					}
				</View>
				{/*  */}
				<Modal visible={isShowModel} transparent={true} animationType="slide">
					<TouchableOpacity
						onPress={ this.handleEditingEnd } 
						style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}>
						<View style={{ position: "absolute", width: "100%", left: 0, bottom: 0 , 
							backgroundColor: "#eee", flexDirection: "row", padding: pxTOdp(10), alignItems: "center" }}>
							<TextInput style={{ backgroundColor: "#fff", flex: 5, paddingLeft: pxTOdp(15), 
									borderRadius: pxTOdp(18), height: pxTOdp(36), color: "#666" }} 
									value={text}
									onChangeText={ t => this.setState({ text: t}) }
									onSubmitEditing={ this.handleSubmit }
									autoFocus
									placeholder="发表评论"/>
							<Text style={{ margin: pxTOdp(10) }} onPress={ this.handleSubmit }>发布</Text>
						</View>
					</TouchableOpacity>
				</Modal>
			</View> 
		);
	}
}

const styles = StyleSheet.create({ 
	commentDetail: {
		height: pxTOdp(100),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: pxTOdp(10),
		borderTopColor: "#ccc",
		borderTopWidth: pxTOdp(0.5)
	},
	headImg: {
		width: pxTOdp(40),
		height: pxTOdp(40),
		borderRadius: pxTOdp(20)
	},
	footer: {
		width: pxTOdp(80), 
		height: pxTOdp(30), 
		alignSelf: 'center'
	}
});

export default Index;