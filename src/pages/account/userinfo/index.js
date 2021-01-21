import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import { pxTOdp } from "../../../utils/stylesKits";
import { boy, girl, boy_active, girl_active } from "../../../res/font/svg.js";
import Geo from "../../../utils/position.js";
import CityJson from "../../../res/city.json";
import LNButton from '../../../components/LNButton';
import Toast from '../../../utils/Toast.js';
import ImagePicker from 'react-native-image-crop-picker';
import { Overlay } from 'teaset';
import { inject,observer } from "mobx-react";
import request from '../../../utils/request';
import { USER_CHECKHEADIMAGE, USER_REGISTER } from '../../../utils/pathMap';
import JMessage from '../../../utils/JMessage.js';

@inject("RootStore") // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据


class Index extends Component {
	state = { 
		user: {
			nickname: "",
			gender: "女",
			birthday: "",
			city: "",
			header: "",
			lng: "",
			lat: "",
			address: ""
		},
		overlayViewRef: null
	}

	async componentDidMount() {
		const res = await Geo._getCityByLocation();
		// console.log(JSON.stringify(res, null, 2));
		let address = res.regeocode.formatted_address;
		let city = res.regeocode.addressComponent.city;
		let lng = res.regeocode.addressComponent.streetNumber.location.split(",")[0];
		let lat = res.regeocode.addressComponent.streetNumber.location.split(",")[1];
		this.changeUserState("city", city);
		this.changeUserState("address", address);
		this.changeUserState("lng", lng);
		this.changeUserState("lat", lat)
	}

	showCityPicker = ()=> {
		Picker.init({
      pickerData: CityJson,
      selectedValue: ["广东", "广州"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择城市",
      onPickerConfirm: data => { 
				// data =  [广东，广州，天河]
				this.changeUserState("city", data[1]);
      }
    });
    Picker.show();
	}

	chooseHeadImg = async ()=> {
		/*
			1.校验
			2. 使用图片裁剪工具
			3. 图片上传到后台
			4. 全部信息提交到后台
			5. 成功之后：
				5.1 执行极光注册
				5.2 跳转到交友首页
		 */
		let { nickname, birthday, city }  = this.state.user;
		if(!nickname || !birthday || !city) {
			Toast.sad("昵称或生日或城市不合法", 2000, "center");
			return;
		}

		let image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    });
		
		let overlayView = this.scanHeadImg(image.path);
		Overlay.show(overlayView);

		const uploadHeadImgRes = await this.uploadHeadImg(image);
		if(uploadHeadImgRes.code !== "10000") {
			return
		} 
		// 提交个人资料
		this.changeUserState("header", uploadHeadImgRes.data.headImgPath);
		let params = this.state.user;
		const userInfoRes = await request.privatePost(USER_REGISTER, params);

		//注册极光
		if(userInfoRes.code !== "10000") {
			return;
		}
		await this.JMRegister(this.props.RootStore.userID, this.props.RootStore.phone);  //极光注册
		this.state.overlayViewRef.close();
		Toast.smile("恭喜 操作成功", 2000, "center");
		setTimeout(()=> {
			this.props.navigation.navigate("Tabbar");
		}, 2000);
	}

	changeUserState = (k, v)=> {
		let copyUser = Object.assign({}, this.state.user, { [k]: v });  // 深拷贝 //不懂啊还有bind
		this.setState({
			user: copyUser
		}) 
	}

	scanHeadImg = (imgPath)=> {
		let overlayView = (
			<Overlay.View
				style={{ flex: 1, backgroundColor: "#000"}}
				modal={true}
				overlayOpacity={0}
				ref={v => this.state.overlayViewRef = v}
				>
				<View style={{
					marginTop: pxTOdp(80),
					alignSelf: "center",
					width: pxTOdp(334),
					height: pxTOdp(334),
					position: "relative",
					justifyContent: "center",
					alignItems: "center"
				}}>
					<Image 
						style={{ width: "100%", height: "100%", position: "absolute", left: 0, top: 0, zIndex: 100 }}
						source={ require('../../../res/img/scan.gif') } />
						<Image style={{ width: "65%", height: "65%", marginTop: pxTOdp(20) }} source={{ uri: imgPath }}/>
				</View>
			</Overlay.View>
		);
		return overlayView;
	}

	uploadHeadImg = async(image)=> {
		let formData = new FormData();
		formData.append("headPhoto", {
			uri: image.path,
			type: image.mime,
			name: image.path.split("/").pop()
		});

		const uploadHeadImgRes = await request.privatePost(USER_CHECKHEADIMAGE, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		console.log(JSON.stringify(uploadHeadImgRes, null, 2));
		return uploadHeadImgRes;
	}

	JMRegister = async(username, password)=> {
		await JMessage.register(username, password);
	}

	render() { 
		const { user }  = this.state;
		let now = new Date();
		const currentDate = `${ now.getFullYear() }-${ now.getMonth+1 }-${ now.getDate() }`
		return ( 
			<View style={{ backgroundColor: '#fff', flex: 1, padding: pxTOdp(30)}}>
				<Text style={ styles.title }>填写资料</Text>
				<Text style={ styles.title }>提升我的魅力</Text>
				<View style={{ marginTop: pxTOdp(20), ...styles.centerLayout, flexDirection: "row" }}>
					<TouchableOpacity onPress={ ()=> this.changeUserState("gender","男") } style={[styles.headImgBox, styles.centerLayout]}>
						<SvgUri svgXmlData={ user.gender === "男" ? boy_active : boy }  width={ styles.headImg.width }  height={ styles.headImg.height } />
					</TouchableOpacity>
					<TouchableOpacity onPress={ ()=> this.changeUserState("gender","女") } style={[styles.headImgBox, styles.centerLayout]}>
						<SvgUri  svgXmlData={ user.gender === "女" ? girl_active : girl }  width={ styles.headImg.width }  height={ styles.headImg.height } />
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: pxTOdp(50) }}>
					<Input value={ user.nickname } placeholder="设置昵称" inputStyle={ styles.inputStyle } onChangeText={ (v)=> this.changeUserState("nickname", v) }/>
				</View>
				<DatePicker style={{ width: "97%" }} androidMode="spinner" date={ user.birthday } mode="date" placeholder="设置生日" format="YYYY-MM-DD" minDate="1900-01-01" maxDate={ currentDate } confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={ datePickerStyles } onDateChange={ (v)=> this.changeUserState("birthday", v)  }/>
				<TouchableOpacity onPress={ this.showCityPicker } style={{ marginTop: pxTOdp(15) }}>
					<Input value={ "当前定位: " + user.city } inputStyle={ styles.inputStyle } disabled={ true } />
				</TouchableOpacity>
				<View style={{ width: '100%', height: pxTOdp(40), alignSelf: 'center', marginTop: pxTOdp(15) }}>
					<LNButton style={{ borderRadius: 20 }} onPress={ this.chooseHeadImg } >设置头像</LNButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	centerLayout: {
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: pxTOdp(20),
		color: "#666",
		fontWeight: "bold"
	},
	headImgBox: {
		width: pxTOdp(100),
		height:pxTOdp(100)
	},
	headImg: {
		width: pxTOdp(80),
		height: pxTOdp(80)
	},
	inputStyle: {
		color: "#666"
	}
});

const datePickerStyles = StyleSheet.create({
	// dateIcon: {
	// 	position: 'absolute',
	// 	right: 0,
	// 	bottom: 1
	// },
	dateInput: {
		marginLeft: pxTOdp(10),
		borderWidth: 0,
		borderBottomWidth: pxTOdp(1.1),
		alignItems: "flex-start",
		paddingLeft: pxTOdp(5),
		fontSize: pxTOdp(19)
	},
	placeholderText: {
		fontSize: pxTOdp(18),
		color: "#afafaf"
	}
})
 
export default Index;