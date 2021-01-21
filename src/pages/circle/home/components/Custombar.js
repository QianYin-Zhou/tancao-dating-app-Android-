import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { pxTOdp } from '../../../../utils/stylesKits';


class Index extends Component {

	state = {  }
	componentDidMount() { 

	}

	render() { 
		const { goToPage, tabs, activeTab } = this.props;
		return (  
			<ImageBackground source={ require("../../../../res/img/rectanglecopy.png")} style={ styles.bar }>
				{
					tabs.map((v, i)=> 
					<TouchableOpacity key={i} 
						onPress={ ()=> goToPage(i)}
						style={{ ...styles.tabStyle, borderBottomWidth:activeTab === i?pxTOdp(3):0 }}>
						<Text style={{ ...styles.tabText, fontSize:activeTab === i ? pxTOdp(23):pxTOdp(17) }}>{v}</Text>  
					</TouchableOpacity>)
				}
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({ 
	bar: {
		height: pxTOdp(75),
		flexDirection: "row",
		paddingLeft: pxTOdp(20),
		paddingRight: pxTOdp(20),
		justifyContent: "space-evenly"
	},
	tabStyle: {
		justifyContent: "center",
		borderBottomColor: "#fff"
	},
	tabText: { 
		color:"#fff"
	}
});

export default Index;