import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import LNNav from "../../../components/LNNav";
import LNButton from "../../../components/LNButton";
import request from "../../../utils/request";
import { BASE_URI, FRIEND_QUESTIONS } from "../../../utils/pathMap";
import Swiper from "react-native-deck-swiper";
import { pxTOdp } from '../../../utils/stylesKits';


class Index extends Component {
	state = { 
		questions: [],
		curIndex: 0
	}

	componentDidMount() {
		this.getList();
	}

	goAskPage = ()=> {
		const { questions, curIndex } = this.state;
		this.props.navigation.navigate("TestQA", questions[curIndex]);
	}

	getList = async()=> {
		const res = await request.privateGet(FRIEND_QUESTIONS);
		this.setState({ questions: res.data });
	}

	render() { 
		const { questions, curIndex } = this.state;
		return (  
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<LNNav title="测灵魂" />
				<ImageBackground source={ require("../../../res/img/testsoul_bg.png")} style={ styles.bgImg } imageStyle={{ height: "100%" }}>
					{
						 questions.length ? <Swiper
								cards={ questions }
								renderCard={(card) => {
									return (
										<View style={styles.card}>
											<Image source={{ uri: BASE_URI+card.imgpath }} style={ styles.testImg } />
										</View>
									)
								}}
								onSwiped={(cardIndex) => this.setState({ curIndex: this.state.curIndex+1 }) }
								onSwipedAll={() => {console.log('onSwipedAll')}}
								cardIndex={0}
								backgroundColor={'transparent'}
								cardVerticalMargin={0}
								stackSize={1} /> : <></>
					}
				</ImageBackground>
				<View style={ styles.footer }>
					<LNButton style={{ borderRadius: 10 }} onPress={ this.goAskPage }>开始测试</LNButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bgImg: {
		height: "60%"
	},
	container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    height: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
	},
	testImg: {
		width: "100%",
		height: "100%"
	},
	footer: {
		position: "absolute",
		bottom: pxTOdp(28),
		width: '43%', 
		height: pxTOdp(36), 
		alignSelf: 'center'
	}
});

export default Index;