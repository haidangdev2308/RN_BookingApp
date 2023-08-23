import {
    View, Text, SafeAreaView, TouchableOpacity,
    ScrollView, TextInput, Platform, Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { savedPlaces } from '../SavedReducer';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";


const ConfirmationScreen = () => {

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

    const dispatch = useDispatch()
    const uid = auth.currentUser.uid
    const confirmBooking = async () => {
        const userDocRef = doc(db, 'user', uid); // Tham chiếu đến tài liệu người dùng
        try {
            const userDocSnap = await getDoc(userDocRef); // Lấy dữ liệu tài liệu người dùng
            if (userDocSnap.exists()) {
                const existingBookingDetails = userDocSnap.data().bookingDetails || [];
                if (!Array.isArray(existingBookingDetails)) {
                    console.error('existingBookingDetails is not an array:', existingBookingDetails);
                    return;
                }
                const updatedBookingDetails = [...existingBookingDetails, route.params];

                await updateDoc(userDocRef, {
                    bookingDetails: updatedBookingDetails
                });

                dispatch(savedPlaces(route.params)); // Dispatch action để lưu thông tin đặt phòng
                console.log('Đặt phòng thành công');
                nav.navigate('Main');
            }
        } catch (error) {
            console.error('Lỗi khi đặt phòng:', error);
        }
    }

    return (
        <SafeAreaView className='flex-1'>
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
                    <Text numberOfLines={1} ellipsizeMode='tail'
                        style={{ fontSize: 20, color: 'white', fontWeight: 600 }}>
                        Xác nhận
                    </Text>
                </View>
            </View>
            <ScrollView className='p-[15px] flex-1 '>
                <View className='bg-white p-[10px] rounded' >
                    <Text numberOfLines={2} ellipsizeMode='tail' className='font-bold text-[20px]  w-[250px]'>{name}</Text>
                    <View className='flex-row mt-2 items-center'>
                        <MaterialCommunityIcons name="progress-star" size={24} color="#FFB700" />
                        <Text className='mx-1 text-[16px]'>{rating}</Text>
                        <Text>•</Text>
                        <View style={{
                            backgroundColor: '#BED9F8',
                            justifyContent: 'center',
                            padding: 5,
                            marginLeft: 4,
                            borderRadius: 8
                        }}>
                            <Text className='text-white text-[12px]'>Genius level</Text>
                        </View>
                    </View>
                    <View className='flex-row mt-[25px]'>
                        <View className=''>
                            <Text className='font-medium'>Nhận phòng</Text>
                            <Text style={{
                                fontWeight: 700,
                                color: colors.button,
                                fontSize: 15
                            }}>{startDate}</Text>
                        </View>
                        <View className=' ml-[100px]'>
                            <Text className='font-medium'>Trả Phòng</Text>
                            <Text style={{
                                fontWeight: 700,
                                color: colors.button,
                                fontSize: 15
                            }}>{endDate}</Text>
                        </View>
                    </View>
                    <View className='mt-[15px] mb-5 '>
                        <Text className='font-medium'>Số lượng phòng và khách</Text>
                        <Text style={{
                            fontWeight: 700,
                            color: colors.button,
                            fontSize: 15
                        }}>1 phòng, {adult} người lớn, {children} trẻ em</Text>
                    </View>
                    <TouchableOpacity
                        onPress={confirmBooking}
                        style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            width: 120,
                            alignItems: 'center',
                            borderRadius: 4
                        }}>
                        <Text className='font-bold text-white'>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmationScreen