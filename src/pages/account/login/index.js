import React, { Component} from 'react';
import { Text, View, StatusBar, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import { pxTOdp } from "../../../utils/stylesKits";
import validator from "../../../utils/validator.js";
import request from "../../../utils/request.js";
import { USER_LOGIN, USER_LOGIN_VERIFY } from "../../../utils/pathMap.js";
import LNButton from '../../../components/LNButton';
import Toast from '../../../utils/Toast';
import {inject,observer } from "mobx-react";

@inject("RootStore") // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据

class Index extends Component {
	state = {
		phone_number: "18665711978",
		isPhone: true,
		isShowWriteView: false,
		codeText: "",
		buttonText: "重新获取",
		isSetCountDowning: false
	}

	phoneNumberChangeText = (phone_number)=> {
		this.setState({ phone_number })
	}

	phoneNumberSubmitEditing = async()=> {
		const { phone_number } = this.state;
		const isPhone = validator.validatePhone(phone_number);
		if(!isPhone) {
			this.setState({ isPhone });
			return
		}

		// 发送请求
		/**//**//**/
		const res = await request.post(USER_LOGIN, { phone: phone_number });
		if(res.code == "10000") {
			this.setState({ isShowWriteView: true });
			this.setCountDown();
		} else {

		}
		/**//**//**//**/
	}

	onChangeCodeText = (codeText)=> {
		this.setState({ codeText });
	}

	setCountDown = ()=> {
		if(this.state.isSetCountDowning) {
			return;
		}
		this.setState({ isSetCountDowning: true });
		let seconds = 60;
		this.setState({ buttonText: `重新获取（${seconds}s）`});
		let timer = setInterval(()=> {
			seconds--;
			this.setState({ buttonText: `重新获取（${seconds}s）`});
			if(seconds === 0) {
				clearInterval(timer);
				this.setState({ buttonText: "重新获取" });
			}
		}, 1000)
	}

	getCodeAgain = ()=> {
		this.setState({ isSetCountDowning: false }); //重新获取
		this.setCountDown();
	}

	codeSubmitEditing = async()=> {
		/*
			isNew
		 */
		const { codeText, phone_number } = this.state;
		if(codeText.length != 6) {
			Toast.message("验证码不正确", 2000, "center");
			return;
		}

		const res = await request.post(USER_LOGIN_VERIFY, { 
			phone: phone_number,
			vcode: codeText
		});

		if(res.code != "10000") {
			return;
		}

		console.log(res.data.id);  // // 打印登录的用户信息

		// 存储数据
		this.props.RootStore.setUserInfo(phone_number, res.data.token, res.data.id);
		AsyncStorage.setItem("userinfo", JSON.stringify({
			phone: phone_number,
			token: res.data.token,
			userID: res.data.id 
		}));

		if(res.data.isNew) {
			// 新用户 UserInfo页面：填写完整信息
			this.props.navigation.navigate("UserInfo");
		} else {
			this.props.navigation.navigate("Tabbar");
		}
	}

	renderOriginalView = ()=> {
		const { phone_number, isPhone } = this.state;
		return <View>
			<View><Text style={{ fontSize: pxTOdp(16), color: '#999' }}>手机号登录注册</Text></View>
			<View style={{ marginTop: pxTOdp(30)}}>
				<Input
					placeholder='请输入手机号码'
					maxLength={11}
					keyboardType="phone-pad"
					value={phone_number}
					inputStyle={{ color: '#333' }}
					onChangeText={ this.phoneNumberChangeText }
					errorMessage={ isPhone ? "": "该号码不合法" }
					onSubmitEditing={ this.phoneNumberSubmitEditing }
					leftIcon={
						<Icon name='phone'	size={ pxTOdp(18) } color= "#999" />
					}
				/>
			</View>
			<View style={{ width: '85%', height: pxTOdp(40), alignSelf: 'center' }}>
				<LNButton style={{ borderRadius: 13 }} onPress={this.phoneNumberSubmitEditing}>获取验证码</LNButton>
			</View>
		</View>
	}

	renderWriteView = ()=> {
		const { phone_number, codeText, buttonText, isSetCountDowning } = this.state;
		return <View>
			<View>
				<Text style={{ fontSize: pxTOdp(25), color: '#888', fontWeight:'bold' }}>输入6位验证码</Text>
			</View>
			<View style={{ marginTop: pxTOdp(15) }}>
				<Text style={{ color: '#888' }}>已发送到+86 { phone_number }</Text>
			</View>
			<View style={{ marginTop: pxTOdp(5) }}>
				<CodeField
					value={codeText}
					onChangeText={ this.onChangeCodeText }
					onSubmitEditing={ this.codeSubmitEditing }
					cellCount={6}
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({index, symbol, isFocused}) => (
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)} />
			</View>
			<View style={{ width: '85%', height: pxTOdp(40), alignSelf: 'center', marginTop: pxTOdp(35) }}>
				<LNButton disable={ isSetCountDowning } style={{ borderRadius: 13 }} onPress={ this.getCodeAgain }>{ buttonText }</LNButton>
			</View>
		</View>
	}

	render() { 
		const { isShowWriteView } = this.state;
		return ( 
			<View>
				<StatusBar backgroundColor="transparent" translucent={true} />
				<Image 
					style={{
						width: "100%",
						height: pxTOdp(200)
					}}
					source={require("../../../res/img/tiger.jpg")} />
				<View style={{ padding: pxTOdp(20)}}> 
					{ isShowWriteView ? this.renderWriteView() : this.renderOriginalView() }
				</View>
			</View>
		 );
	}
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
		textAlign: 'center',
		color: '#4c669f'
  },
  focusCell: {
    borderColor: '#4c669f',
  },
});

export default Index;