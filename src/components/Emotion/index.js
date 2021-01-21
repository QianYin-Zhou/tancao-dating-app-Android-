import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { EmotionData } from "./datasource";
import { pxTOdp, screenWidth } from "../../utils/stylesKits";

class Index extends Component {

	state = {  }
	componentDidMount() { 

	}

	render() { 
		let width = screenWidth / 9 - pxTOdp(9);
		return (  
			<ScrollView contentContainerStyle={{ flexDirection: "row", 
				flexWrap: "wrap", justifyContent: "center" }}>
				{
					EmotionData.map((v, i)=> 
						<TouchableOpacity 
							onPress={ ()=> this.props.onPress(v) }
							key={i}>
							<Image style={{ width, height: width, margin: pxTOdp(3.5) }}  source={ v.value }/>
						</TouchableOpacity>)
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({ 

});

export default Index;