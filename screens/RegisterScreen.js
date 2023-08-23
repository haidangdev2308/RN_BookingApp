import {
    View, Text, SafeAreaView, TouchableOpacity,
    ScrollView, TextInput, Platform, Pressable, Alert, alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isValidEmail, isValidPassword, isValidPhoneNo } from '../components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';



const RegisterScreen = () => {

    const nav = useNavigation()

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const register = () => {
        if (!email || !password || !phone) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin', [
                {
                    text: 'thoát',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials._tokenResponse.email;
            const uid = auth.currentUser.uid;

            setDoc(doc(db, "user", `${uid}`), {
                email: user,
                phone: phone
            })
        }).catch((error) => {
            if (error.code == "auth/email-already-in-use") {
                Alert.alert('Thông báo', 'Địa chỉ mail đã được sử dụng', [
                    {
                        text: 'thoát',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else if (error.code == "auth/invalid-email") {
                Alert.alert('Thông báo', 'Địa chỉ email không chính xác', [
                    {
                        text: 'thoát',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else if (error.code == "auth/operation-not-allowed") {
                Alert.alert('Thông báo', 'dữ liệu không được cho phép', [
                    {
                        text: 'thoát',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else if (error.code == "auth/weak-password") {
                Alert.alert('Thông báo', 'Mật khẩu quá yếu, hãy nhập lại', [
                    {
                        text: 'thoát',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        });
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <KeyboardAwareScrollView >
                <View className='items-center mt-[190px]'>
                    <View className='mt-[-50px] items-center justify-center'>
                        <Text style={{ fontSize: 20, color: '#003580', fontWeight: 700 }}>Đăng Ký</Text>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 15 }}>Tạo Tài khoản mới</Text>
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
                                    setErrorPassword(isValidPassword(text) ? '' : 'Mật khẩu phải tối thiểu 5 ký tự.')
                                    setPassword(text)
                                }}
                                placeholder='Tạo mật khẩu của bạn'
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
                    <View className='mt-5 w-[300px]'>
                        <Text style={{
                            color: '#003580',
                            fontSize: 16,
                            fontWeight: 600
                        }}>Điện thoại</Text>
                        <TextInput keyboardType={'phone-pad'}
                            onChangeText={(text) => {
                                setErrorPhone(isValidPhoneNo(text) ? '' : 'Vui lòng nhập số điện thoại của bạn.')
                                setPhone(text)
                            }}
                            placeholder='Nhập số điện thoại của bạn'
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: 'grey',
                                marginTop: 5,

                            }}
                        />
                        {
                            errorPhone ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorPhone}</Text>
                                </View> : null
                        }
                    </View>
                    <TouchableOpacity onPress={register} className='mt-[45px] bg-[#003580] p-[15px] rounded-lg w-[160px] items-center justify-center'>
                        <Text className='text-white font-bold text-[16px]'>Đăng ký</Text>
                    </TouchableOpacity>
                    <View className='mt-7 flex-row items-end'>
                        <Text style={{ color: colors.inActive }}>Bạn đã có tài khoản?</Text>
                        <Pressable onPress={() => { nav.goBack() }}>
                            <Text style={{ marginStart: 5, fontWeight: 500, color: colors.primary }} >Đăng nhập</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen