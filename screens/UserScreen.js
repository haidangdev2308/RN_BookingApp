import {
    View, Text, SafeAreaView, TouchableOpacity,
    ScrollView, TextInput, Platform, Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isValidEmail, isValidPhoneNo, isValidName } from '../components';

const UserScreen = () => {

    const nav = useNavigation()
    const route = useRoute()
    const {
        oldPrice,
        newPrice,
        name,
        children,
        adult,
        rating,
        startDate,
        endDate,
        selectedRoom } = route.params

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [errorFirstName, setErrorFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorLastName, setErrorLastName] = useState('')

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const isValidationSuccess = () => {
        // return true 
        return email.length > 0 && firstName.length > 0 && lastName.length > 0
            && isValidEmail(email) && isValidPhoneNo(phone)
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View style={{
                height: 80,
                backgroundColor: colors.primary,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white"
                        style={{
                            padding: 12,
                            marginTop: 20,
                            marginStart: 10
                        }} />
                </TouchableOpacity>
                <View style={{
                    marginStart: 18, width: 300, marginTop: 20,
                }}>
                    <Text
                        style={{ fontSize: 20, color: 'white', fontWeight: 600 }}>
                        Điền thông tin của bạn
                    </Text>
                </View>
            </View>
            <KeyboardAwareScrollView >
                <ScrollView
                    className=' bg-white flex-1 p-[20px]'
                >
                    {/* <View className='flex-row  gap-3 items-center '>
                        <AntDesign name="exclamationcircleo" size={18} color={colors.error} />
                        <Text>
                            Vui lòng nhập tất cả thông tin của bạn bằng tiếng Anh hoặc ngôn ngữ của khách sạn.
                        </Text>
                    </View> */}
                    {/* <Pressable style={{
                        flexDirection: 'row', marginVertical: 15, gap: 6, justifyContent: 'center', padding: 20,
                        borderColor: colors.button, borderWidth: 1, borderRadius: 4

                    }}>
                        <Ionicons name="ios-person-circle-outline" size={24} color={colors.button} />
                        <Text style={{ color: colors.button, fontSize: 17, fontWeight: 700 }}>Đăng nhập để tiết kiệm</Text>
                    </Pressable> */}
                    <View className='mt-5'>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            fontWeight: 600
                        }}>Tên <Text className='text-red-500'>*</Text></Text>
                        <TextInput
                            onChangeText={(text) => {
                                setErrorFirstName(isValidName(text) ? '' : 'Vui lòng nhập tên của bạn.')
                                setFirstName(text)
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.inActive,
                                marginTop: 5,
                                padding: 10,
                                borderRadius: 4
                            }}
                        />
                        {
                            errorFirstName ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorFirstName}</Text>
                                </View> : null
                        }
                    </View>
                    <View className='mt-5'>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            fontWeight: 600
                        }}>Họ <Text className='text-red-500'>*</Text></Text>
                        <TextInput
                            onChangeText={(text) => {
                                setErrorLastName(isValidName(text) ? '' : 'Vui lòng nhập họ của bạn.')
                                setLastName(text)
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.inActive,
                                marginTop: 5,
                                padding: 10,
                                borderRadius: 4
                            }}
                        />
                        {
                            errorLastName ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorLastName}</Text>
                                </View> : null
                        }
                    </View>
                    <View className='mt-5'>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            fontWeight: 600
                        }}>Địa chỉ email <Text className='text-red-500'>*</Text></Text>
                        <TextInput
                            onChangeText={(text) => {
                                setErrorEmail(isValidEmail(text) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ.')
                                setEmail(text)
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.inActive,
                                marginTop: 5,
                                padding: 10,
                                borderRadius: 4
                            }}
                        />
                        {
                            errorEmail ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorEmail}</Text>
                                </View> : null
                        }
                    </View>
                    <View className='mt-5'>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            fontWeight: 600
                        }}>Điện thoại <Text className='text-red-500'>*</Text></Text>
                        <TextInput keyboardType={'phone-pad'}
                            onChangeText={(text) => {
                                setErrorPhone(isValidPhoneNo(text) ? '' : 'Vui lòng nhập số điện thoại của bạn.')
                                setPhone(text)
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.inActive,
                                marginTop: 5,
                                padding: 10,
                                borderRadius: 4
                            }}
                        />
                        {
                            errorPhone ?
                                <View className="h-6 mb-1">
                                    <Text className="text-red-500 text-[12px] mt-1">{errorPhone}</Text>
                                </View> : null
                        }
                    </View>
                    <View className='border-[0.3px] border-[#ccc] mt-8' />
                    <View className='my-4'>
                        <Text className='font-bold line-through text-red-500 text-[18px]'>VND {VND.format(oldPrice * adult)}</Text>
                        <Text className='font-bold text-[18px]'>VND {VND.format(newPrice * adult)}</Text>
                        <Text style={{ fontSize: 12, color: colors.inActive, }}>
                            Đã bao gồm thuế và phí
                        </Text>
                    </View>
                </ScrollView>
                <View style={{ marginVertical: 6 }}>
                    <TouchableOpacity
                        disabled={isValidationSuccess() === false}
                        onPress={() => {
                            nav.navigate('ConfirmationScreen', {
                                oldPrice: oldPrice,
                                newPrice: newPrice,
                                name: name,
                                children: children,
                                adult: adult,
                                rating: rating,
                                startDate: startDate,
                                endDate: endDate,
                            })
                        }}
                        style={{
                            backgroundColor: isValidationSuccess() == true ? '#0071C2' : colors.inActive,
                            padding: 11,
                            marginLeft: 6,
                            marginRight: 6,
                            alignItems: 'center',
                            borderRadius: 4
                        }}>
                        <Text className='font-semibold text-white text-[16px]'>Bước tiếp theo</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    )
}

export default UserScreen