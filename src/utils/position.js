import { PermissionsAndroid, Platform } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";
import Toast from "./Toast";

class Geo {
  async _init() {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    await init({
      ios: "06463e3401d029dc2e3a47f5626d5774",
      android: "06463e3401d029dc2e3a47f5626d5774"
    });
    return Promise.resolve();
  }
  async _getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
      }, reject);
    })
  }
  async _getCityByLocation() {
		Toast.showLoading("努力获取中");
    const { longitude, latitude } = await this._getCurrentPosition();
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      params: { location: `${longitude},${latitude}`, key: "48106df199b004d819e347c54e09db2c" }
		});
		Toast.hideLoading();
    return Promise.resolve(res.data); 
  }
}


export default new Geo();