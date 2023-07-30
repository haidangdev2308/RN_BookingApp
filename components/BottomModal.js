import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const BottomModal = ({ isVisible, closeModal }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={closeModal}
            animationIn="slideInUp" // Hiệu ứng khi modal hiển thị (hiệu ứng từ phía dưới lên)
            animationOut="slideOutDown" // Hiệu ứng khi modal ẩn đi (hiệu ứng từ phía trên xuống)
            backdropOpacity={0.5}
        >
            <View style={{ backgroundColor: 'white', padding: 16 }}>
                <Text>This is the content of the BottomModal</Text>
                <TouchableOpacity onPress={closeModal}>
                    <Text>Close Modal</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default BottomModal;