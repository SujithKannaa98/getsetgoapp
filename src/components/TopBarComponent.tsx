import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {metrices} from '../assets/metrices';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface TopBarComponentProps {
  title: string;
  homeIcon?: boolean;
  backIcon?: boolean;
}

const TopBarComponent: React.FC<TopBarComponentProps> = ({
  title,
  homeIcon,
  backIcon,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topBarViewStyle}>
      <View style={styles.backButtonContainer}>
        {backIcon && (
          <TouchableOpacity
            style={styles.backTouchContainerStyle}
            onPress={() => navigation.goBack()}>
            <Entypo name={'chevron-left'} size={30} color={'black'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.sideIconStyle}>
        {homeIcon && (
          <TouchableOpacity
            style={styles.sideIconTouchStyle}
            onPress={() => navigation.goBack()}>
            <SimpleLineIcons name={'home'} size={30} color={'black'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarViewStyle: {
    width: '100%',
    height: metrices(10),
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: '#F2F4F9',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backButtonContainer: {
    width: '16%',
    height: '100%',
    alignItems: 'center',
  },
  backTouchContainerStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainerStyle: {
    width: '64%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
  },
  sideIconStyle: {
    width: '16%',
    height: '100%',
    alignItems: 'center',
  },
  sideIconTouchStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TopBarComponent;
