export default {

	validatePhone(phone_number) {
		const reg =  /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/; ;
		return reg.test(phone_number);
	},

	parseRichText(text) {
		let finalTextArr = [];
		let rule = /(\/\{.+?\})/g;
		let emoArr = text.match(rule);
		if(emoArr === null) {
			finalTextArr.push({ text: text });
		} else {
			let textArr = text.replace(rule, "￥￥").split("￥￥");
			while(textArr.length) {
				finalTextArr.push({ text: textArr.shift() });
				if(emoArr.length) {
					finalTextArr.push({ imgKey: emoArr.shift() });
				}
			}
		}
		return finalTextArr;
	}

}