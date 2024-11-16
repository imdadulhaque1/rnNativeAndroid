import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

interface BottomHalfModalProps {
  isVisible: boolean;
  onClose: () => void;
  modalAnimationIn?: any;
  modalAnimationOut?: any;
  children: ReactNode;
  modalHeight?: any;
}

const BottomHalfModal: React.FC<BottomHalfModalProps> = ({
  isVisible,
  onClose,
  modalAnimationIn = 'slideInUp',
  modalAnimationOut = 'slideOutDown',
  children,
  modalHeight = '40%', // Default height is 40% of the screen
}) => {
  //   const STATE = {laoding: false, error: false, post: {}};
  //   const [state, dispatch] = useReducer(reducer, STATE);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn={modalAnimationIn}
      animationOut={modalAnimationOut}
      animationInTiming={1500}
      animationOutTiming={1500}
      backdropOpacity={0.6}
      style={styles.modal}>
      <View style={[styles.modalContent, {height: modalHeight}]}>
        {children}
      </View>
    </Modal>
  );
};

export default BottomHalfModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
