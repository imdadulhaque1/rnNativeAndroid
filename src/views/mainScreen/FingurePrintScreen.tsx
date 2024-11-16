import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import getDataFromFingurePrint from '@utils/handler/getDataFromFingurePrint';
import {COLORS} from '@utils/COLORS';
import {isAvailableFingurePrint} from '@utils/handler/isAvailableFingurePrint';
import NoInternetModal from '@components/modal/NoInternetModal';

const FingurePrintScreen: React.FC = () => {
  const [fingurePrint, setFingurePrint] = useState({
    isAvailable: false,
    status: '',
  });

  useEffect(() => {
    isAvailableFingurePrint().then(res =>
      setFingurePrint(prev => ({...prev, isAvailable: res})),
    );
  }, []);

  const authenticate = async () => {
    try {
      const result = await getDataFromFingurePrint.authenticate();
      setFingurePrint(prev => ({...prev, status: result}));
    } catch (error: any) {
      setFingurePrint(prev => ({...prev, status: error?.message}));
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: fingurePrint?.isAvailable
            ? COLORS.snowLight90
            : COLORS.errorLight90,
        },
      ]}>
      {fingurePrint && (
        <Text style={styles.statusText}>{fingurePrint?.status}</Text>
      )}

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
      <NoInternetModal />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
});

export default FingurePrintScreen;
