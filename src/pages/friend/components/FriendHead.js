import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg from 'react-native-svg-uri';
import { near, tanhua, testSoul } from '../../../res/font/svg';
import { pxTOdp } from '../../../utils/stylesKits';
import { NavigationContext } from "@react-navigation/native";

class Index extends Component {
	
	static contextType = NavigationContext;

	goPage = (pageName)=> {
		this.context.navigate(pageName);
	}

	render() { 
		return (  
			<View style={ styles.headView }>
				{/* 探花 */}
				<TouchableOpacity style={{ alignItems: "center" }} onPress={ ()=> this.goPage("TanCao") }>
					<View style={{ ...styles.item }}>
						<Svg svgXmlData={ tanhua } width={ styles.svg.width } height={ styles.svg.height } fill={ styles.svg.color } />
					</View>
					<Text style={ styles.text }>探草</Text>
				</TouchableOpacity>
				{/* 附近的人 */}
				<TouchableOpacity style={{ alignItems: "center" }} onPress={ ()=> this.goPage("Near") }>
					<View style={{ ...styles.item, backgroundColor: "#2db3f8" }}>
						<Svg svgXmlData={ near } width={ styles.svg.width } height={ styles.svg.height } fill={ styles.svg.color } />
					</View>
					<Text style={ styles.text }>搜附近</Text>
				</TouchableOpacity>
				{/* 灵魂 */}
				<TouchableOpacity style={{ alignItems: "center" }} onPress={ ()=> this.goPage("TestSoul") }>
					<View style={{ ...styles.item, backgroundColor: "#ecc768" }}>
						<Svg svgXmlData={ testSoul } width={ styles.svg.width } height={ styles.svg.height } fill={ styles.svg.color } />
					</View>
					<Text style={ styles.text }>测灵魂</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headView: {
		flexDirection: "row",
		width: "60%",
		justifyContent: "space-around"
	},
	item: {
		width: pxTOdp(50),
		height: pxTOdp(50),
		borderRadius: pxTOdp(25),
		backgroundColor: "darkorange",
		justifyContent: "center",
		alignItems: "center"
	},
	svg: {
		width: 30,
		height: 30,
		color: "#fff"
	},
	text: {
		fontSize: pxTOdp(12),
		marginTop: pxTOdp(4),
		color: "#ffffff9a"
	}
})
export default Index;