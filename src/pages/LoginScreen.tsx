import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  ToastAndroid,
  View,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TextInputComponent from '../components/TextInput';
import LoginWithGoogle from '../components/LoginWithGoogle';
import ButtonComponent from '../components/ButtonComponent';
import { emailPattern, passwordPattern } from '../assets/patterns/regrex';
import OverlayLoader from '../components/OverlayLoader';
import { metrices } from '../assets/metrices';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Applogo from '../assets/images/getsetgo.png';

function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLoginDetails({ email: '', password: '' });
        setError({ email: '', password: '' });
      };
    }, []),
  );
  const handleValidation = () => {
    const errors = {};
    if (!loginDetails.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(loginDetails.email)) {
      errors.email = 'Invalid email format';
    }
    if (!loginDetails.password) {
      errors.password = 'Password is required';
    } else if (!passwordPattern.test(loginDetails.password)) {
      errors.password =
        'Password should have minimum 8 characters with combination of alphabets, numbers and special characters.';
    }
    setError(errors);
    return errors;
  };

  const handleLoginFunction = async () => {
    const validation = handleValidation();
    if (Object.keys(validation).length === 0) {
      try {
        navigation.navigate('FlightList');
      } catch (error) {
        console.error('Error in login...........', error);
      }
    } else {
      console.log('Validation errors in login..........', validation);
    }
  };
  const handleEmailChange = (text: any) => {
    setLoginDetails({ ...loginDetails, email: text });
    setError({ ...error, email: '' });
  };
  return (
    <KeyboardAvoidingView style={styles.mainStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loader && <OverlayLoader />}
      <View style={styles.imgContainer}>
        <Image source={Applogo} resizeMode="contain" style={styles.imageStyle} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.subViewTwoStyle}>
          <Text style={{ fontSize: 24, color: 'black' }}>Login</Text>
          <View style={{ width: '100%' }}>
            <TextInputComponent
              placeholder={'Email'}
              style={styles.textInputStyle}
              value={loginDetails.email}
              onChangeText={handleEmailChange}
              hasError={error.email}
            />
          </View>
          <View style={{ width: '100%' }}>
            <TextInputComponent
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.textInputStyle}
              value={loginDetails.password}
              onChangeText={(text: any) => {
                setLoginDetails({ ...loginDetails, password: text });
                setError({ ...error, password: '' });
              }}
              hasError={error.password}
            />
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{ width: '40%', alignSelf: 'flex-end' }}
              >
                <Text
                  style={{ fontSize: 14, color: 'grey', alignSelf: 'flex-end' }}>
                  Forget Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ButtonComponent
            onPress={() => handleLoginFunction()}
            placeHolder={'LOGIN'}
          />
          <Text style={styles.orTextStyle}>-- OR --</Text>
          <LoginWithGoogle />
          <View style={styles.dontHaveAccStyle}>
            <Text style={{ color: 'grey' }}>Don't have an account yet? </Text>
            <TouchableOpacity
            >
              <Text style={{ color: '#FC8019' }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  imgContainer: {
    width: '100%',
    height: metrices(20),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    width: '100%',
    height: '50%',
  },
  scrollViewStyle: {
    width: '100%',
    height: metrices(80),
    backgroundColor: 'white',
  },
  subViewTwoStyle: {
    width: '100%',
    height: '100%',
    paddingVertical: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  orTextStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'grey',
  },
  dontHaveAccStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  textInputStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 54,
    paddingHorizontal: 14,
    fontSize: 16,
    color: 'black',
    borderRadius: 6,
    backgroundColor: '#F2F4F9',
  },
  errorText: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 12,
    marginLeft: 10,
    color: 'red',
  },
});

export default LoginScreen;
