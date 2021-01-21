import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import LNNav from "../../../components/LNNav";
import Swiper from "react-native-deck-swiper";
import request from "../../../utils/request";
import { BASE_URI, FRIEND_CARDS, FRIEND_LIKE } from "../../../utils/pathMap";
import IconFont from "../../../components/IconFont";
import { pxTOdp } from "../../../utils/stylesKits";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from "../../../utils/Toast";

class Index extends Component {

	totalPages = 0;
	params = {
		page: 1,
		pagesize: 5
	};
	state = { 
		curIndex: 0,
		cards: [ ]
	}

	constructor() {
		super();
		this.swiperRef = React.createRef();  // 挂载引用
	}

	componentDidMount() {
		this.getFriendsCards();
	}

	setFeelings = async(type)=> {
		//
		this.sender(type);

		if(type === "dislike") {
			this.swiperRef.swipeLeft();
		} else {
			this.swiperRef.swipeRight();
		}
	}

	onSwipedAll = ()=> {
		if(this.params.page >= this.totalPages) {
			Toast.message("没有了", 2000, "center");
			return;
		} else {
			this.params.page++;
			this.getFriendsCards();
		}
	}

	sender = async(type)=> {
		const id = this.state.cards[this.state.curIndex].id;
		const url = FRIEND_LIKE.replace(":id", id).replace(":type", type);
		const res = await request.privateGet(url);
		Toast.message(res.data, 1000, "center");
	}

	getFriendsCards = async()=> {
		const res = await request.privateGet(FRIEND_CARDS, this.params);
		this.setState({ cards: [...this.state.cards, ...res.data] });
		this.totalPages = res.pages;
	}

	render() { 
		let { cards, curIndex } = this.state;
		if(!cards[curIndex]) {
			return <></>;
		}
		return (  
			<View style={{ flex: 1, backgroundColor: "#fff"}}>
				<LNNav title="探草" />                        
				<ImageBackground source={ require("../../../res/img/testsoul_bg.png")} style={ styles.bgImg } imageStyle={{ height: "100%" }}>
					<Swiper
				  	key={ Date.now() }
						ref={ ref => this.swiperRef =  ref }
						cards={ cards }
						renderCard={(card) => {
							return (
								<View style={ styles.cardBox }>
									<Image source={{ uri: BASE_URI+card.header }} style={ styles.card }/>
									<View style={{  marginTop: pxTOdp(25),justifyContent: "center", alignItems: "center" }}>
										<View style={ styles.detailBox }>
											<Text style= {{ ...styles.text, fontSize: pxTOdp(18), fontWeight: "bold" }}>{ card.nick_name }</Text>
											<IconFont 
												name={ card.gender === "男" ? "icontanhuanan" : "icontanhuanv" }
												style={{ fontSize: pxTOdp(20), color: card.gender === "男" ? "#66CCCC" : "#FF99CC" }}/>
											<Text style= { styles.text }>{ card.age }岁</Text>
										</View>
										<View style={ styles.detailBox }>
											<Text style= { styles.text }>{ card.marry }</Text>
											<Text style= { styles.text }>|</Text>
											<Text style= { styles.text }>{ card.xueli }</Text>
											<Text style= { styles.text }>|</Text>
											<Text style= { styles.text }>{ card.agediff < 10 ? "年龄相仿" : "很大代沟" }</Text>
										</View>
									</View>
								</View>
							)
						}}
						onSwiped={() => this.setState({ curIndex: this.state.curIndex+1 }) }
						onSwipedLeft={  this.sender.bind(this, "dislike") }
						onSwipedRight={  this.sender.bind(this, "like") }
						onSwipedAll={ this.onSwipedAll }
						cardIndex={curIndex} 
						backgroundColor={'transparent'}
						cardVerticalMargin={0 }
						stackSize={cards.length}>
					</Swiper>
				</ImageBackground>
				<View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%", alignSelf: "center", marginTop: pxTOdp(130) }}>
					<TouchableOpacity 
						onPress={ this.setFeelings.bind(this, "dislike") }
						style={{ ...styles.iconBox, backgroundColor: "#E8D566" }}>
						<IconFont style={ styles.iconStyle } name="iconbuxihuan" />
					</TouchableOpacity>
					<TouchableOpacity 
						onPress={ this.setFeelings.bind(this, "like") }
						style={{ ...styles.iconBox,backgroundColor: "#FF6666" }}>
						<IconFont style={ styles.iconStyle } name="iconxihuan" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bgImg: {
		height: "60%"
	},
	cardBox: {
		height: "75%",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white"
  },
	card: {
		width: "100%",
		height: "79%"
	},
	detailBox: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: pxTOdp(15)
	},
	text: {
		fontSize: pxTOdp(13),
		margin: pxTOdp(3),
		color: "#555"
	},
	fateValue: {
		fontSize: pxTOdp(26),
		color: "#FF6666",
		marginRight: pxTOdp(2)
	},
	iconBox: {
		backgroundColor: "black",
		width: pxTOdp(60),
		height: pxTOdp(60),
		borderRadius: pxTOdp(30),
		alignItems: "center",
		justifyContent: "center"
	},
	iconStyle: {
		fontSize: pxTOdp(30),
		color: "#fff"
	}
});

export default Index;