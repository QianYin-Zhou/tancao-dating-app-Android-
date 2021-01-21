// 设计稿的宽度 / 元素的宽度 ==== 手机屏幕 / 手机元素宽度
import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const pxTOdp = (ePx)=> screenWidth * ePx / 375;  // px转dp