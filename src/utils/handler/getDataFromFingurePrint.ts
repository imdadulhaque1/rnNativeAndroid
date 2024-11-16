import {NativeModules} from 'react-native';

// Type definition for the Native Module
interface FingerprintModuleType {
  isFingerprintAvailable(): Promise<boolean>;
  authenticate(): Promise<string>;
}

// Destructure to get FingerprintModule from NativeModules
const {FingerprintModule} = NativeModules;

// Default export with the necessary methods
export default {
  isFingerprintAvailable: (): Promise<boolean> =>
    FingerprintModule.isFingerprintAvailable(),
  authenticate: (): Promise<string> => FingerprintModule.authenticate(),
};
