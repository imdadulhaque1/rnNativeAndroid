import React, {FC} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  name: string;
  size: number;
  color: string;
  borderRadius?: number;
}

const MCIcon: FC<Props> = ({name, size, color, borderRadius}) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={{borderRadius}}
    />
  );
};

export default MCIcon;
