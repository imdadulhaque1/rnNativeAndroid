import {Pressable} from 'react-native';
import React, {FC, ReactNode} from 'react';
import punchEntryStyle from '@utils/comStyle/punchEntryStyle';

interface Props {
  style?: object;
  onPress?: () => void;
  children: ReactNode;
}

const Button: FC<Props> = props => {
  return (
    <Pressable {...props} style={[punchEntryStyle.btnStyle, props.style]}>
      {props.children}
    </Pressable>
  );
};

export default Button;
