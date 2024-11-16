import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {COLORS} from '@utils/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Checkbox} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppContext} from '@contextApi/index';
import AppURL from '@restApi/AppURL';
import MyStatusBar from '@components/statusBar/MyStatusBar';
import MCIcon from '@components/icon/MCIcon';
import CustomizedAlert from '@components/alert/CustomizedAlert';
import NoInternetModal from '@components/modal/NoInternetModal';
import AuthInput from '@components/input/AuthInput';

interface Props {}

const LoginScreen: FC<Props> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {setAccessableInfo} = useAppContext();

  const [booleanStatus, setBooleanStatus] = useState({
    remember: false,
    fetch: false, //login Loading
    loginStatus: false,
    menuOpen: false,
  });

  const [asyncData, setAsyncData] = useState<any>([]);
  const [employee, setEmployee] = useState({
    id: '',
    password: '',
  });

  //animation styles for login screen navigation
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  const retrieveStoredCredentials = async () => {
    const storedDataString = await AsyncStorage.getItem('asyncInfo');
    // @ts-ignore
    const storedData = JSON.parse(storedDataString);

    setAsyncData((f: any) => storedData);

    await setEmployee(prevState => ({
      ...prevState,
      id: storedData?.asyncUsername,
      password: storedData?.asyncPassword,
    }));
  };

  const handleDeleteItem = async (index: number) => {
    const storedDataString = await AsyncStorage.getItem('asyncInfo');
    // @ts-ignore
    const storedData = JSON.parse(storedDataString);

    const updatedItems = [...storedData];
    updatedItems.splice(index, 1);

    await AsyncStorage.setItem('asyncInfo', JSON.stringify(updatedItems));
    setAsyncData(updatedItems);
  };

  const loginHandler = async (id: any, pass: any) => {
    setBooleanStatus(prevState => ({
      ...prevState,
      fetch: true,
    }));

    const data = {
      UserName: id,
      Password: pass,
    };

    try {
      const res = await axios.post(AppURL.userLogin, data);
      const loginResult = res?.data;
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate('Dashboard');
      }, 500);
      setBooleanStatus(prevState => ({
        ...prevState,
        loginStatus: false,
      }));
    } catch (err) {
      // @ts-ignore
      console.log('login Error: ', err.message);
    } finally {
      setBooleanStatus(prevState => ({
        ...prevState,
        fetch: false,
      }));
    }
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isFocused) {
      retrieveStoredCredentials();

      // DeviceInfo.getAndroidId().then(androidId => {
      //   console.log('Android ID:', androidId);
      // });
    }
  }, [isFocused]);

  const handleDataReceived = () => {
    setBooleanStatus(prevState => ({
      ...prevState,
      loginStatus: false,
    }));
  };

  return (
    <LinearGradient
      colors={[
        COLORS.snowColor,
        COLORS.snowLight70,
        COLORS.snowLight80,
        COLORS.snowLight90,
        COLORS.snowLight100,
        COLORS.snowLight100,
        COLORS.snowLight90,
        COLORS.snowLight80,
        COLORS.snowLight70,
        COLORS.snowColor,
      ]}
      style={styles.container}>
      <MyStatusBar backgroundColor={COLORS.snowColor} barStyle="dark-content" />
      <Pressable onPress={handleKeyboard}>
        <View style={styles.loginContainer}>
          <AuthInput
            inputOnTouchStart={() => {
              setBooleanStatus(prevState => ({
                ...prevState,
                loginStatus: false,
                menuOpen: true,
              }));
            }}
            inputKeyboardType={'default'}
            placeholder={'Employee Id'}
            inputLabel="Enter Employee ID"
            labelFontColor={COLORS.white}
            placeholderTextColor={COLORS.inactiveColor}
            inputBorderColor={COLORS.white}
            onChangeText={(txt: any) => {
              setEmployee(prevState => ({
                ...prevState,
                id: txt,
              }));
            }}
            value={employee?.id}
            inputFontSize={width / 30}
            labelFontSize={width > 550 ? width / 26 : width / 22}
            inputTextColor={COLORS.black}
            isRequired={false}
            iconShown={false}
          />
          {booleanStatus?.menuOpen && asyncData && asyncData.length > 0 && (
            <View
              style={{
                minHeight: 10,
                maxHeight: 100,
                borderBottomStartRadius: 7,
                borderBottomEndRadius: 7,
                backgroundColor: '#121E4499',
                // backgroundColor: 'transparent',
                padding: 5,
                top: -6,
                width: '100%',
              }}>
              <ScrollView>
                {asyncData &&
                  asyncData.length > 0 &&
                  asyncData.map((item: any, index: any) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: 2,
                        paddingHorizontal: 6,
                        backgroundColor: COLORS.snowColor,
                        borderRadius: width > 550 ? 5 : 4,
                      }}>
                      <Pressable
                        onPress={() => {
                          setEmployee(prevState => ({
                            ...prevState,
                            id: item?.asyncUsername,
                            password: item?.asyncPassword,
                          }));

                          setBooleanStatus(prevState => ({
                            ...prevState,
                            menuOpen: false,
                          }));
                        }}
                        style={{
                          width: '90%',
                          paddingVertical: 3,
                        }}>
                        <Text
                          style={[
                            styles.textStyle,
                            {
                              color: COLORS.black,
                              fontFamily: 'WorkSans-Regular',
                              fontSize: width > 650 ? width / 38 : width / 30,
                            },
                          ]}>
                          {item?.asyncUsername}
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          handleDeleteItem(index);
                        }}>
                        <MCIcon
                          name="delete"
                          size={20}
                          color={COLORS.errorColor}
                        />
                      </Pressable>
                    </View>
                  ))}
              </ScrollView>
            </View>
          )}
          <AuthInput
            inputOnTouchStart={() => {
              setBooleanStatus(prevState => ({
                ...prevState,
                menuOpen: false,
                loginStatus: false,
              }));
            }}
            inputKeyboardType={'default'}
            secureText={true}
            placeholder={'Your Password'}
            inputLabel="Enter Your Password"
            labelFontColor={COLORS.white}
            placeholderTextColor={COLORS.inactiveColor}
            inputBorderColor={COLORS.white}
            onChangeText={(txt: any) => {
              setEmployee(prevState => ({
                ...prevState,
                password: txt,
              }));
            }}
            value={employee?.password}
            inputFontSize={width / 30}
            labelFontSize={width > 550 ? width / 26 : width / 22}
            inputTextColor={COLORS.black}
            isRequired={false}
            requiredTextColor={COLORS.red}
            requiredTextSize={width / 20}
            iconShown={true}
            secureIconColor={COLORS.snowColor}
            secureIconSize={25}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              alignItems: 'center',
            }}>
            <Checkbox
              // @ts-ignore
              value={booleanStatus?.remember}
              status={booleanStatus?.remember ? 'checked' : 'unchecked'}
              onPress={() =>
                setBooleanStatus(prevState => ({
                  ...prevState,
                  remember: !booleanStatus?.remember,
                }))
              }
              color={booleanStatus?.remember ? COLORS.white : COLORS.black}
              uncheckedColor={COLORS.black}
              style={styles.checkboxStyle}
            />
            <Text
              style={[
                styles.textStyle,
                {
                  color: booleanStatus?.remember ? COLORS.white : COLORS.black,
                },
              ]}>
              Remember Me
            </Text>
          </View>

          <Pressable
            style={{
              width: width / 2,
              alignSelf: 'center',
              marginTop: width > 550 ? 30 : 20,
              elevation: 5,
            }}
            onPress={() => {
              employee?.id &&
                employee?.password &&
                loginHandler(employee?.id, employee?.password);
            }}>
            <Animated.View style={animatedStyle}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[
                  COLORS.snowColor,
                  COLORS.snowLight80,
                  COLORS.white,
                  COLORS.snowLight80,
                  COLORS.snowColor,
                ]}
                style={styles.loginButton}>
                {booleanStatus.fetch ? (
                  <ActivityIndicator
                    size={width > 550 ? 30 : 27}
                    color={COLORS.snowColor}
                  />
                ) : (
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: 'WorkSans-Regular',
                      fontSize: width > 650 ? width / 24 : width / 22,
                    }}>
                    Login
                  </Text>
                )}
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>
      </Pressable>

      <CustomizedAlert
        onPress={async () => {
          console.log('Failed to Login !');
        }}
        titleStyle={styles.alertTitleStyle}
        messageStyle={styles.alertMessageStyle}
        alertContainerStyle={styles.alertContainerStyle}
        onDataReceived={handleDataReceived}
        isAlertOpen={booleanStatus?.loginStatus}
        title="Login failed !"
        message={'Try again !'}
        // message={employee?.macAddress}
        cancel="Cancel"
        confirmText="Retry login"
      />

      <NoInternetModal />
    </LinearGradient>
  );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.snowLight80,
  },
  textStyle: {
    fontSize: 18,
    color: '#111111',
  },
  loginContainer: {
    backgroundColor: COLORS.snowColor,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
    marginHorizontal: 20,
    padding: 20,
  },
  loginButton: {
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
    paddingVertical: 10,
  },
  checkboxStyle: {
    height: 300,
    width: 30,
  },

  alertContainerStyle: {
    backgroundColor: COLORS.snowLight90,
  },
  alertTitleStyle: {
    fontFamily: 'WorkSans-SemiBold',
    textTransform: 'capitalize',
    color: COLORS.black,
    fontSize: width > 650 ? width / 30 : width / 23,
  },
  alertMessageStyle: {
    fontFamily: 'WorkSans-Regular',
    // textTransform: 'capitalize',
    color: COLORS.black,
    fontSize: width > 650 ? width / 40 : width / 28,
  },
  snackbarContainer: {
    backgroundColor: COLORS.snowLight100,
    alignSelf: 'center',
    zIndex: 1000,
    bottom: 100,
    position: 'absolute',
    width: '70%',
    borderRadius: 30,
  },
  snackbarTxtStyle: {
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    textTransform: 'capitalize',
  },
});

export default LoginScreen;
