import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import request from "../../../../utils/request";
import { BASE_URI, FRIEND_QUESTIONS_SECTION, FRIEND_QUESTIONS_ANS } from "../../../../utils/pathMap";
import LNNav from "../../../../components/LNNav";
import { pxTOdp } from '../../../../utils/stylesKits';
import {inject,observer } from "mobx-react";
import LinearGradient from "react-native-linear-gradient"

@inject("UserStore") 
@observer 
class Index extends Component {

	titleImgMap= {
		"初级": require("../../../../res/img/leve1.png"),
		"中级": require("../../../../res/img/leve2.png"),
		"高级": require("../../../../res/img/leve3.png")
	}

	state = { 
		questionList: [],
		titleID: 0,
		ansArr: []
	}

	componentDidMount() { 
		this.getList();
	}

	chooseAns = async(ans_No)=> {
		let { titleID, questionList } = this.state;
		this.state.ansArr.push(ans_No);
		if(titleID >= questionList.length-1) {
			const url = FRIEND_QUESTIONS_ANS.replace(":id", this.props.route.params.qid);
			const answers = this.state.ansArr.join(",");
			const res = await request.privatePost(url, { answers });
			this.props.navigation.navigate("TestResult", res.data);
		} else {
			this.setState({ titleID: titleID+1 });
		}
	}

	getList = async()=> {
		const url = FRIEND_QUESTIONS_SECTION.replace(":id", this.props.route.params.qid);
		const res = await request.privateGet(url);
		this.setState({ questionList: res.data });
	}

	render() { 
		let navTitle = this.props.route.params.title;
		let question = this.props.route.params;
		let user = this.props.UserStore.user;
		let { titleID, questionList } = this.state;

		if(!questionList[titleID]) {
			return <></>;
		}

		return (  
			<View style={{ position: "relative" }}>
				<LNNav title={ navTitle } />
				<ImageBackground source={ require("../../../../res/img/qabg.png") } style={ styles.bgImg }>
					<View style={ styles.tagsContainer }>
						<ImageBackground source={ require("../../../../res/img/qatext.png") } style={{ ...styles.tag }}>
							<Image source={{ uri: BASE_URI+user.header }} style={ styles.headImg } />
						</ImageBackground>
						<ImageBackground source={ this.titleImgMap[question.type] } style={{ ...styles.tag }}>
						</ImageBackground>
					</View>
					{/* <测试题> */}
					<View style={ styles.titleBox }>
						<View>
							<Text style={ styles.title }>第{ titleID+1 }题</Text>
							<Text style={ styles.count }>({ titleID+1 }/{questionList.length })</Text>
						</View>
						<Text style={ styles.content }>{ questionList[titleID].question_title }</Text>
						<View style={ styles.buttonContainer}>
							{
								questionList[titleID].answers.map((v, i)=> 
									<TouchableOpacity key={i} onPress={ this.chooseAns.bind(this, v.ans_No) }>
										<LinearGradient
											colors={["#6f45f3","#6f45f31a"]} 
											start={{ x:0, y:0 }}
											end={{ x:1, y: 0 }}
											style={ styles.button }>
												<Text style={ styles.buttonText }>{ v.ans_title }</Text>
											</LinearGradient>
									</TouchableOpacity>)
							}
						</View>
					</View>
					{/* </测试题> */}
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bgImg: {
		width: "100%",
		height: "100%"
	},
	tagsContainer: {
		marginTop: pxTOdp(70),
		flexDirection: "row",
		justifyContent: "space-between"
	},
	tag: {
		width: pxTOdp(66),
		height: pxTOdp(52),
		justifyContent: "center",
		alignItems: "flex-end"
	},
	headImg: {
		width: pxTOdp(46),
		height: pxTOdp(46),
		borderRadius: pxTOdp(23),
		marginRight: pxTOdp(3)
	},
	titleBox: {
		position: "absolute",
		width: "84%",
		top: pxTOdp(95),
		alignSelf: "center",
		alignItems: "center"
	},
	title: {
		color: "#fff",
		fontSize: pxTOdp(26),
		fontWeight: "bold"
	},
	count: {
		color: "#ffffff9a",
		textAlign: "center"
	},
	content: {
		marginTop: pxTOdp(26),
		fontSize: pxTOdp(15),
		color: "#fff",
		letterSpacing: pxTOdp(2),
		lineHeight: pxTOdp(25)
	},
	buttonContainer: {
		width: "100%",
		marginTop: pxTOdp(30),
	},
	button: {
		height: pxTOdp(40),
		borderRadius: pxTOdp(6),
		alignItems: "center",
		justifyContent: "center",
		margin: pxTOdp(6)
	},
	buttonText: {
		color: "#fff",
		fontSize: pxTOdp(14)
	}
});

export default Index;