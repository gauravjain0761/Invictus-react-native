export function getFontType(fontWeight) {
  if (fontWeight == 600) {
    return 'Poppins-SemiBold';
  } else if (fontWeight == 400) {
    return 'Poppins-Regular';
  } else if (fontWeight == 700) {
    return 'Poppins-Bold';
  } else if (fontWeight == 500) {
    return 'Poppins-Medium';
  } else if (fontWeight == 300) {
    return 'Poppins-Light';
  } else {
    return 'Poppins-Regular';
  }
}

export function commonFontStyle(fontWeight, fontSize, color) {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: actuatedNormalize(fontSize - 2),
    color: color,
    includeFontPadding: false,
  };
}

import {Dimensions, Platform, PixelRatio} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
