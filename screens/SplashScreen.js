// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login'); // Thay thế bằng màn hình chính của ứng dụng
        }, 1300); // Đợi 1.3 giây trước khi chuyển màn hình

        return () => clearTimeout(timer); // Clear timer khi component bị unmount
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
            <Image source={require('../assets/logo.png')}
                style={{
                    width: 300,
                    height: 130,
                    marginTop: 30,
                    alignSelf: 'center',
                }}
            />
        </View>
    );
};


export default SplashScreen;
