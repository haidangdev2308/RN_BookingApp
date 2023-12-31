import {
    View, Text, SafeAreaView, TouchableOpacity, TextInput, Pressable, Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isValidEmail, isValidPassword } from '../components';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {

    const nav = useNavigation()

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Xử lý khi đăng nhập thành công
                // AsyncStorage.setItem('refreshToken', user.refreshToken); // Lưu refresh token vào AsyncStorage
                nav.replace('Main');
            })
            .catch((error) => {

                if (error.code === 'auth/wrong-password') {
                    Alert.alert('Thông báo', 'Sai mật khẩu, hãy thử lại lần nữa!', [
                        {
                            text: 'thoát',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    console.log('Wrong password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    Alert.alert('Thông báo', 'Không tìm thấy người dùng, kiểm tra lại email của bạn', [
                        {
                            text: 'thoát',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    console.log('User not found. Please check your email.');
                } else if (error.code === 'auth/too-many-requests') {
                    Alert.alert('Thông báo', 'Tài khoản của bạn đã bị tạm thời vô hiệu hóa do có quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau một thời gian hoặc đặt lại mật khẩu của bạn.', [
                        {
                            text: 'thoát',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                } else {
                    console.error('Đã xảy ra lỗi: ', error);
                }
            });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                nav.replace('Main');
            }
        });

        return unsubscribe;
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <KeyboardAwareScrollView >
                <View className='items-center mt-[210px]'>
                    <View className='mt-[-50px] items-center justify-center'>
                        <Text style={{ fontSize: 20, color: '#003580', fontWeight: 700 }}>Đăng Nhập</Text>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 15 }}>Đăng nhập vào Tài khoản của bạn</Text>
                    </View>
                    <View className='mt-[50px] w-[300px]'>
                        <Text style={{
                            color: '#003580',
                            fontSize: 16,
                            fontWeight: 600
                        }}>Địa chỉ email</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setErrorEmail(isValidEmail(text) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ.')
                                setEmail(text)
                            }}
                            placeholder='Nhập email của bạn'
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: 'grey',
                                marginTop: 5,
                            }}
                        />
                        {
                            errorEmail ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorEmail}</Text>
                                </View> : null
                        }
                    </View>
                    <View className='mt-[30px]  w-[300px]'>
                        <Text style={{
                            color: '#003580',
                            fontSize: 16,
                            fontWeight: 600
                        }}>Mật khẩu</Text>
                        <View className='flex-row items-center'>
                            <TextInput
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={(text) => {
                                    setErrorPassword(isValidPassword(text) ? '' : 'Mật khẩu phải tối thiểu 5 ký tự')
                                    setPassword(text)
                                }}
                                placeholder='Nhập mật khẩu của bạn'
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'grey',
                                    marginTop: 5,
                                    flex: 1
                                }}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Ionicons name={isPasswordVisible ? "ios-eye" : "ios-eye-off"} size={24} color="#003580" />
                            </TouchableOpacity>
                        </View>
                        {
                            errorPassword ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorPassword}</Text>
                                </View> : null
                        }
                    </View>
                    <TouchableOpacity
                        onPress={login}
                        className='mt-[45px] bg-[#003580] p-[15px] rounded-lg w-[160px] items-center justify-center'>
                        <Text className='text-white font-bold text-[16px]'>Đăng nhập</Text>
                    </TouchableOpacity>
                    <View className='mt-7 flex-row items-end'>
                        <Text style={{ color: colors.inActive }}>Bạn chưa có tài khoản?</Text>
                        <Pressable onPress={() => { nav.navigate('Register') }}>
                            <Text style={{ marginStart: 5, fontWeight: 500, color: colors.primary }} >Đăng ký</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen