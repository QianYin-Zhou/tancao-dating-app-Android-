import axios from 'axios';
import { BASE_URI } from './pathMap.js';
import RootStore from '../mobx'
import Toast from './Toast.js'

const INSTANCE = axios.create({
	baseURL: BASE_URI
});

INSTANCE.interceptors.request.use(function (config) {
	Toast.showLoading("请求中");
	return config;
}, function (error) {
	return Promise.reject(error);
});

INSTANCE.interceptors.response.use(function (response) {
	Toast.hideLoading(); 
	return response.data;
}, function (error) {
	return Promise.reject(error);
});

export default {
	get: INSTANCE.get,
	post: INSTANCE.post,
	privateGet: (url, data = {}, options ={})=> {
		const token  = RootStore.token;
		const headers = options.headers || {};
		return INSTANCE.get(url, {
			...options,
			params: data,
			headers: {
				"Authorization": `Bearer ${ token }`,
				...headers
			}
		})
	},
	privatePost: (url, data = {}, options ={})=> {
		const token  = RootStore.token;
		const headers = options.headers || {};
		return INSTANCE.post(url, data, {
			...options,
			headers: {
				"Authorization": `Bearer ${ token }`,
				...headers
			}
		})
	}
}
