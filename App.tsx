import {
  Button,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {MenuProvider} from 'react-native-popup-menu';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import MainStack from '@views/navigators/MainStack';

const App = () => {
  const nav = useRef(null);
  const CustomFallback = (props: {
    error: Error;
    resetError: (event: GestureResponderEvent) => void;
  }) => (
    <View style={{margin: 50}}>
      <Text>Something happened!</Text>
      <Text style={{marginBottom: 20}}>{props.error.toString()}</Text>
      <Button onPress={props.resetError} title={'Try again'} />
    </View>
  );
  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <MenuProvider>
        <NavigationContainer ref={nav}>
          <MainStack />
          <Toast position="top" topOffset={0} />
        </NavigationContainer>
      </MenuProvider>
    </ErrorBoundary>
  );
};

export default App;
