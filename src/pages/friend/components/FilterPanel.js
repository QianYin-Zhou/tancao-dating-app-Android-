import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconFont from "../../../components/IconFont";
import { pxTOdp } from "../../../utils/stylesKits";
import LNButton from "../../../components/LNButton";
import Svg from 'react-native-svg-uri';
import { boy, girl, boy_active, girl_active } from "../../../res/font/svg";
import Picker from 'react-native-picker';
import { Slider } from 'react-native-elements';
import CityJson from "../../../res/city.json";

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = JSON.parse(JSON.stringify(this.props.params)); // 深拷贝
	}

	filterSubmitting = ()=> {
		this.props.onSubmitFilter(this.state);
		this.props.onClose();
	}

	changeEducation = ()=> {
		Picker.init({
			pickerData: ["博士后","博士","硕士","本科", "大专", "高中", "留学", "其他"],
			selectedValue: [this.state.education],
			pickerTitleText: "选择学历",
			pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
			onPickerConfirm: data => {
				this.setState({ education: data[0] });
			}
		});
		Picker.show();
	}

	changeCity = ()=> {
		Picker.init({
      pickerData: CityJson,
      selectedValue: ["广东", "广州"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择居住地",
      onPickerConfirm: data => { 
				// data =  [广东，广州，天河]
				this.setState({ city:  data[1] });
      }
    });
    Picker.show();
	}

	changeLastLoginTime = ()=> {
		Picker.init({
			pickerData: ["15分钟","1小时","1天","不限制"],
			selectedValue: [this.state.lastLogin],
			pickerTitleText: "选择近期登录时间",
			pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
			onPickerConfirm: data => {
				this.setState({ lastLogin: data[0] });
			}
		});
		Picker.show();
	}

	changeGender = (gender)=> {
		this.setState({ gender });
	}

	render() { 
		let { gender, distance, lastLogin, city, education } = this.state;
		return (  
			<View style={ styles.panel }>
				{/* <头部> */}
				<View style={ styles.header }>
					<Text style={{ width: pxTOdp(60) }}></Text>
					<Text style={ styles.headerText }>筛选</Text>
					<IconFont name="iconshibai" style={ styles.closeIcon } onPress={ this.props.onClose } />
				</View>
				{/* </头部> */}
				{/* <身体> */}
				<View style={ styles.body }>
					<View style={ styles.itemBox }>
					<Text style={{ ...styles.text, width: pxTOdp(60) }}>性别：</Text>
						<View style={{ ...styles.centerLayout, flexDirection: "row" }}>
							<TouchableOpacity onPress={ ()=> this.changeGender("男") } style={[styles.genderSvgBox, styles.centerLayout]}>
								<Svg svgXmlData={ gender === "男" ? boy_active : boy }  width={ styles.genderSvg.width }  height={ styles.genderSvg.height } />
							</TouchableOpacity>
							<TouchableOpacity onPress={ ()=> this.changeGender("女") } style={[styles.genderSvgBox, styles.centerLayout]}>
								<Svg svgXmlData={ gender === "女" ? girl_active : girl }  width={ styles.genderSvg.width }  height={ styles.genderSvg.height } />
							</TouchableOpacity>
						</View>
					</View>
					<View style={ styles.itemBox }>
						<Text style={{ ...styles.text, width: pxTOdp(120) }}>近期登录时间：</Text>
						<Text onPress={ this.changeLastLoginTime }>{ lastLogin || "请选择" }</Text>
					</View>
					<View style={{ ...styles.itemBox, flexDirection: "column", alignItems: "flex-start"}}>
						<Text style={ styles.text }>距离：  { distance || 0 } km</Text>
						<Slider 
							style={ styles.slider } 
							thumbStyle={ styles.thumbStyle } 
							value={ distance } 
							minimumValue={0} 
							maximumValue={10} 
							step={0.5} 
							thumbTintColor="#4c669f"
							onValueChange={ (v)=> this.setState({ distance: v})} />
					</View>
					<View style={ styles.itemBox }>
						<Text style={{ ...styles.text, width: pxTOdp(80) }}>居住地：</Text>
						<Text onPress={ this.changeCity }>{ city || "请选择" }</Text>
					</View>
					<View style={ styles.itemBox }>
						<Text style={{ ...styles.text, width: pxTOdp(60) }}>学历：</Text>
						<Text onPress={ this.changeEducation }>{ education || "请选择" }</Text>
					</View>
				</View>
				{/* </身体> */}
				{/* <底部按钮> */}
				<View style={ styles.footer }>
					<LNButton style={{ borderRadius: 8 }} onPress={ this.filterSubmitting }>确认</LNButton>
				</View>
				{/* </底部按钮> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	centerLayout: {
		alignItems: "center",
		justifyContent: "center"
	},
	panel: {
		position: "absolute",
		width: "100%",
		height: "58%",
		left: 0,
		bottom: 0,
		backgroundColor: "#fff",
		justifyContent: "flex-start"
	},
	header: {
		padding: pxTOdp(10),
		flexDirection: "row",
		justifyContent: "space-between",
		height: pxTOdp(48),
		alignItems: "center"
	},
	headerText: {
		fontSize: pxTOdp(19),
		color: "#999",
		fontWeight: "bold"
	},
	closeIcon: {
		width: pxTOdp(60),
		fontSize: pxTOdp(25)
	},
	body: {
		width: "80%",
		alignSelf: "center",
		marginTop: pxTOdp(5)
	},
	itemBox: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: pxTOdp(13)
	},
	text: {
		color: "#777",
		fontSize: pxTOdp(15)
	},
	genderSvgBox: {
		width: pxTOdp(72),
		height:pxTOdp(72)
	},
	genderSvg: {
		width: pxTOdp(52),
		height: pxTOdp(52)
	},
	slider: {
		marginTop: pxTOdp(8),
		width: pxTOdp(280),
		borderColor: "#3b5998"
	},
	thumbStyle: { 
		height: pxTOdp(15), 
		width: pxTOdp(15)
	},
	footer: {
		position: "absolute",
		bottom: pxTOdp(20),
		width: '35%', 
		height: pxTOdp(36), 
		alignSelf: 'center'
	}
});
export default Index;