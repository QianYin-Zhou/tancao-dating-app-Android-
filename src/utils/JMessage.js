import JMessage from 'jmessage-react-plugin';
import Toast from "./Toast";

export default  {
	init() {
		JMessage.init({
      'appkey': 'bac3544809a9d55bc5d4611a',
      'isOpenMessageRoaming': true,
      'isProduction': false,
      'channel': '' 
    })
	},
	register(username, password) {
		return new Promise((resolve, reject)=> {
			JMessage.register({
				username,
				password
			}, resolve, reject);
		})
	},
	login(username, password) {
		return new Promise((resolve, reject)=> {
			JMessage.login({
				username,
				password
			}, resolve, reject);
		})
	},
	sendTextMessage(username, text, extras = {}) {
		return new Promise((resolve, reject)=> {
			let type = "single";
			JMessage.sendTextMessage({ type, username, text, extras }, resolve, reject);
		});
	},
	getConversations() {
		Toast.showLoading("获取中")
		return new Promise((resolve, reject)=> {
			JMessage.getConversations(res=> {
				Toast.hideLoading();
				resolve(res);
			}, reject)
		});
	},
	getHistoryMessages(username, from, limit) {
		return new Promise((resolve, reject)=> {
			JMessage.getHistoryMessages({ type: 'single', username, from, limit }, resolve, reject)
		});
	}
	
	
}