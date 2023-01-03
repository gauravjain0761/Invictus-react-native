import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {commonFontStyle} from '../Themes/Fonts';
import Colors from '../Themes/Colors';
import {LogoLoginScreen} from '../SvgIcons/IconSvg';

export default function DashboardScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'PRE_LOADER', payload: true});
  }, []);

  return (
    <View>
      <Text style={{...commonFontStyle(600, 20, Colors.black)}}>
        DashboardScreen
      </Text>
      <LogoLoginScreen />
    </View>
  );
}
