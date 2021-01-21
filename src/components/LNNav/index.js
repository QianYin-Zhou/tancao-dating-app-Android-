import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pxTOdp } from '../../utils/stylesKits';
import IconFont from "../IconFont";
import { NavigationContext } from "@react-navigation/native";

class Index extends Component {

	static contextType = NavigationContext;
	state = {  }
	render() { 
		return (  
			<View>
				<StatusBar backgroundColor="transparent" translucent={true} />
				<ImageBackground source={ require("../../res/img/headbg.png") } style={ styles.bgImg }>
					<TouchableOpacity style={ styles.backUpBox } onPress={ this.context.goBack }>
						<IconFont name="iconfanhui" style={ styles.navText } />
						<Text style={ styles.navText }>返回</Text>
					</TouchableOpacity>
					<Text style={{ ...styles.navText, fontSize: pxTOdp(17), fontWeight: "bold" }}>{ this.props.title }</Text>
					<TouchableOpacity onPress={ this.props.onRightPress }>
						<Text style={{ fontWeight: "bold",textAlign: "center",
								width: pxTOdp(80), ...styles.navText, }}>{ this.props.rightText }</Text>
					</TouchableOpacity>
				</ImageBackground>
			</View>
		); 
	}
}

const styles = StyleSheet.create({
	bgImg: {
		height: pxTOdp(67),
		paddingTop: pxTOdp(15),
		paddingBottom: pxTOdp(9),
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	},
	backUpBox: {
		width: pxTOdp(80),
		flexDirection: "row",
		alignItems: "center",
		marginLeft: pxTOdp(6)
	},
	navText: { 
		color: "#fff",
		fontSize: pxTOdp(14)
	}
});

export default Index;