/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from '@contextApi/index';

const WrappedApp = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <AppProvider>
      <App />
    </AppProvider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => WrappedApp);
