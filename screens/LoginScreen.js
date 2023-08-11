import {
    View, Text, SafeAreaView, TouchableOpacity, TextInput, Pressable,
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

const LoginScreen = () => {

    const nav = useNavigation()

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user
        })
    }
    // console.log(userCredentials.user.stsTokenManager.accessToken);
    // AsyncStorage.setItem(
    //     "tokenUser",
    //     userCredentials.user.stsTokenManager.accessToken,);

    // useEffect(() => {
    //     const getMyObject = async () => {
    //         try {
    //             const jsonValue = await AsyncStorage.getItem("tokenUser");
    //             console.log("jsonValue");
    //             if (jsonValue) {
    //                 nav.replace("Main");
    //             }
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     getMyObject();
    // }, [token]);

    useEffect(() => {
        try {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    nav.navigate('Main')
                }
            })

            return unsubscribe
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <SafeAreaView className='flex-1'>
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
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                setErrorPassword(isValidPassword(text) ? '' : 'Mật khẩu phải tối thiểu 5 ký tự')
                                setPassword(text)
                            }}
                            placeholder='Nhập mật khẩu của bạn'
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: 'grey',
                                marginTop: 5,
                            }}
                        />
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