import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {FC, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '@utils/COLORS';

interface Item {
  id: number;
  name: string;
}

const DashboardScreen: FC = () => {
  const [data, setData] = useState<{
    allData: Item[];
    checkedData: Item[];
  }>({
    allData: [
      {id: 1, name: 'Snowtex ERP'},
      {id: 2, name: 'Snowtex Payroll'},
      {id: 3, name: 'Snowtex FPC'},
      {id: 4, name: 'SaRa eCommerce'},
      {id: 5, name: 'SaRa POS'},
      {id: 6, name: 'QCC'},
      {id: 7, name: 'Snowtex Civil System'},
      {id: 8, name: 'Snowtex Cutting Info'},
    ],
    checkedData: [],
  });

  console.log('Checked Data: ', JSON.stringify(data?.checkedData, null, 2));

  const handleSingleCheck = (id: number) => {
    setData(prevData => {
      const isAlreadyChecked = prevData.checkedData.some(
        item => item.id === id,
      );

      if (isAlreadyChecked) {
        return {
          ...prevData,
          checkedData: prevData.checkedData.filter(item => item.id !== id),
        };
      } else {
        const newCheckedItem = prevData.allData.find(item => item.id === id);
        return {
          ...prevData,
          checkedData: newCheckedItem
            ? [...prevData.checkedData, newCheckedItem]
            : prevData.checkedData,
        };
      }
    });
  };

  const handleSelectAll = () => {
    setData(prevData => {
      const allChecked =
        prevData.checkedData.length === prevData.allData.length;
      return {
        ...prevData,
        checkedData: allChecked ? [] : [...prevData.allData],
      };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Snowtex Civil System</Text>

      <ScrollView
        nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View style={{marginBottom: 10, paddingHorizontal: 10}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.snowLight65,
              borderWidth: 1,
              borderColor: COLORS.black,
              minHeight: 30,
              paddingVertical: 5,
              marginTop: 10,
            }}>
            <Pressable
              onPress={handleSelectAll}
              style={{
                width: screenWidth / 5,
                borderRightColor: COLORS.white,
                borderRightWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{marginLeft: 5}}>
                <BouncyCheckbox
                  size={20}
                  fillColor={COLORS.snowLight80}
                  unFillColor={COLORS.snowLight105}
                  isChecked={data.checkedData.length === data.allData.length}
                  onPress={handleSelectAll}
                />
              </View>
              <Text style={[styles.textStyle, {left: -10}]}>All S.</Text>
            </Pressable>
            <ComView
              title="SL"
              viewWidth={40}
              isBorderShow={true}
              borderRightColor={COLORS.white}
            />
            <ComView
              title="ID"
              viewWidth={screenWidth / 7}
              isBorderShow={true}
              borderRightColor={COLORS.white}
            />
            <ComView title="Description" viewWidth={screenWidth / 2} />
          </View>
          <ScrollView
            nestedScrollEnabled={true}
            style={{
              maxHeight: screenHeight / 1.15,
            }}
            showsVerticalScrollIndicator={false}>
            {data &&
              data?.allData &&
              data?.allData?.map((item, index) => {
                const isChecked = data?.checkedData.some(
                  checkedItem => checkedItem.id === item?.id,
                );
                return (
                  <View
                    key={index}
                    style={[
                      styles.rowContainerStyle,
                      {
                        backgroundColor: isChecked
                          ? COLORS.snowLight100
                          : COLORS.white,
                      },
                    ]}>
                    <View
                      style={{
                        width: screenWidth / 5,
                        borderRightWidth: 0.5,
                        borderRightColor: COLORS.black,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          paddingVertical: 10,
                          left: 10,
                        }}>
                        <BouncyCheckbox
                          size={25}
                          fillColor={COLORS.snowLight80}
                          unFillColor={COLORS.snowLight105}
                          onPress={() => handleSingleCheck(item.id)}
                          isChecked={data.checkedData.some(
                            checkedItem => checkedItem.id === item.id,
                          )}
                        />
                      </View>
                    </View>
                    <ComView
                      title={index + 1}
                      viewWidth={40}
                      isBorderShow={true}
                      borderRightColor={COLORS.black}
                    />
                    <ComView
                      title={item?.id}
                      viewWidth={screenWidth / 7}
                      isBorderShow={true}
                      borderRightColor={COLORS.black}
                    />

                    <ComView title={item?.name} viewWidth={screenWidth / 2} />
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: screenWidth / 28,
    color: COLORS.black,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rowContainerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: COLORS.black,
    borderLeftColor: COLORS.black,
    borderRightColor: COLORS.black,
    minHeight: screenWidth / 10,
    backgroundColor: COLORS.white,
  },
});

export default DashboardScreen;

interface comViewInterface {
  title: any;
  viewWidth?: number;
  isBorderShow?: boolean;
  titleColor?: string;
  borderRightColor?: string;
}

const ComView: FC<comViewInterface> = React.memo(
  ({title, viewWidth, isBorderShow, titleColor, borderRightColor}) => {
    return (
      <View
        style={{
          width: viewWidth,
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: isBorderShow ? 0.8 : 0,
          borderRightColor: borderRightColor,
          paddingHorizontal: 3,
        }}>
        <Text style={[styles.textStyle, {color: titleColor || COLORS.black}]}>
          {title}
        </Text>
      </View>
    );
  },
);
