import { View, Text, Modal } from 'react-native';
import React from 'react';

export default function CustomModal({
  modalVisible,
  setModalVisible,
  modalContent,
}) {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      {modalContent}
    </Modal>
  );
}
