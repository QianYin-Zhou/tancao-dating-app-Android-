import React, { Component } from 'react';
import {  Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { pxTOdp } from '../../utils/stylesKits'

// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
    paddingLeft: pxTOdp(15),
    paddingRight: pxTOdp(9),
		borderRadius: pxTOdp(5),
		width: '100%',
		height: '100%',
  },
  buttonText: {
    fontSize: pxTOdp(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
}); 

class Index extends Component {
	static defaultProps = {
		style: {},
		textStyle: {},
		disabled: false
	}

	render() { 
		return (  
			<TouchableOpacity
				disabled={this.props.disabled} 
				onPress={ this.props.onPress }
				style={{ width:'100%', height:'100%',overflow: 'hidden', ...this.props.style }}>
				<LinearGradient 
					start={{ x:0, y:0 }}
					end={{ x:1, y:0 }}
					colors={['#9b63cd', '#e0708c']} 
					style={ styles.linearGradient }>
					<Text style={{ ...styles.buttonText, ...this.props.textStyle }}>
						{ this.props.children }
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}
 
export default Index;

 
