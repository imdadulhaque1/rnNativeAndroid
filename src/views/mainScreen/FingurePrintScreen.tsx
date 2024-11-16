import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, Pressable} from 'react-native';
import getDataFromFingurePrint from '@utils/handler/getDataFromFingurePrint';
import {COLORS} from '@utils/COLORS';

// Type definition for the component's state
type AuthStatus = string | null; // authStatus can be a string or null

const FingurePrintScreen: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(null);

  // Check if fingerprint is available
  const checkFingerprintAvailability = async () => {
    try {
      const available = await getDataFromFingurePrint.isFingerprintAvailable();
      setAuthStatus(
        available ? 'Fingerprint available' : 'Fingerprint not available',
      );
    } catch (error) {
      setAuthStatus('Error checking availability');
    }
  };

  // Authenticate with the fingerprint
  const authenticate = async () => {
    try {
      const result = await getDataFromFingurePrint.authenticate();
      setAuthStatus(result); // Set result to authStatus
    } catch (error: any) {
      setAuthStatus(error.message); // Catch any errors and display the message
    }
  };

  console.log('authStatus: ', authStatus);

  return (
    <View style={styles.container}>
      {authStatus && <Text style={styles.statusText}>{authStatus}</Text>}

      <Pressable
        style={{
          backgroundColor: COLORS.snowLight90,
          paddingVertical: 7,
          paddingHorizontal: 15,
          borderRadius: 100,
        }}
        onPress={checkFingerprintAvailability}>
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            fontSize: 18,
            color: COLORS.black,
          }}>
          Is FingurePrint Available ?
        </Text>
      </Pressable>

      <Pressable
        style={{
          marginTop: 10,
          backgroundColor: COLORS.snowLight80,
          paddingVertical: 7,
          paddingHorizontal: 15,
          borderRadius: 100,
        }}
        onPress={authenticate}>
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            fontSize: 18,
            color: COLORS.black,
          }}>
          Authenticate with Fingerprint
        </Text>
      </Pressable>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  authButton: {
    marginTop: 10,
  },
});

export default FingurePrintScreen;
