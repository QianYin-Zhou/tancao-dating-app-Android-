import { observable, action } from "mobx";


class UserStore {
	@observable user = {};

  @action setUser(user) {
		this.user = user;
  }
}

export default new UserStore();