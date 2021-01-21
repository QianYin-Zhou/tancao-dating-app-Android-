import { observable, action } from "mobx";


class RootStore {
  // observable 表示数据可监控 表示是全局数据
	// @observable phone = "13828459752";
	// @observable token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI5LCJuYW1lIjoiMTM4Mjg0NTk3NTIiLCJpYXQiOjE2MDkzMTQ2ODksImV4cCI6MTYzNTIzNDY4OX0.nA7qhiDvNpiK-WfX2LyF4AucM2boMYWipyWwmdN9498";
	// @observable userID = "138284597521609314683345";
	@observable phone = "";
	@observable token = "";
	@observable userID = "";
	@observable publicPassword = "666666";

  // action行为 表示 changeName是个可以修改全局共享数据的方法
  @action setUserInfo(phone, token, userID) {
		this.phone = phone;
		this.token = token;
		this.userID = userID;
  }
}

export default new RootStore();