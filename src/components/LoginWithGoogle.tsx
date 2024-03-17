import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import googleImage from '../assets/images/google.png';

function LoginWithGoogle(): React.JSX.Element {
  return (
    <View style={styles.mainViewStyle}>
      <TouchableOpacity style={styles.touchableOpacityStyle}>
        <View style={styles.subViewStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              source={googleImage}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.wordingViewStyle}>
            <Text style={styles.fontStyle}>Login with Google</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    alignSelf: 'center',
    borderWidth: 0.6,
    borderRadius: 6,
    width: '46%',
    height: 40,
    borderColor: 'grey',
  },
  touchableOpacityStyle: {
    width: '100%',
    height: '100%',
  },
  subViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  imageViewStyle: {
    width: '28%',
    height: '68%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageStyle: {width: '100%', height: '100%'},
  fontStyle: {fontSize: 16, color: 'black'},
  wordingViewStyle: {
    width: '70%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default LoginWithGoogle;
