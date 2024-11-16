import React from 'react';
import {StatusBar} from 'react-native';

export type Props = {
  backgroundColor: any;
  barStyle: any;
};

const MyStatusBar: React.FC<Props> = ({
  backgroundColor,
  barStyle,
  ...props
}) => (
  <StatusBar
    barStyle={barStyle}
    hidden={false}
    animated={false}
    backgroundColor={backgroundColor}
    translucent={false}
    {...props}
  />
);

export default MyStatusBar;
