import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Text, View
} from 'react-native';
import Applogo from '../assets/images/getsetgo.png';
import { useEffect } from 'react';
import { FlightListHandler } from '../store/redux/flightList';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function SplashScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    dispatch(FlightListHandler())
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Image source={Applogo} resizeMode="contain" style={styles.imageStyle} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '50%',
    height: '50%'
  }
});

export default SplashScreen;
