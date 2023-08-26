
import {
    View, Text, SafeAreaView, TouchableOpacity,
    ScrollView, TextInput, Platform, Pressable, Image, Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { savedPlaces } from '../SavedReducer';
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const SaveProperty = (props) => {
    const { item } = props


    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const { width, height } = Dimensions.get('window')

    const uid = auth.currentUser.uid;
    const userDocRef = doc(db, 'user', uid);

    const removeFromSavedList = async (saveInfo) => {
        await updateDoc(userDocRef, {
            SavedList: arrayRemove(saveInfo)
        });
        console.log('Đã xoá chỗ nghỉ khỏi SavedList');

    };
    return (
        <TouchableOpacity
            // onPress={() => {
            //   nav.navigate('PropertyInfoScreen',
            //     {
            //       name: item.name,
            //       rating: item.rating,
            //       oldPrice: item.oldPrice,
            //       newPrice: item.newPrice,
            //       photos: item.photos,
            //       room: item.room,
            //       adult: item.adult,
            //       children: item.children,
            //       selectedDate: item.selectedDate,
            //       availableRoom: availableRoom
            //     }
            //   )
            // }} 
            className='flex-row bg-white p-5 mb-5'
        >
            <View>
                <Image style={{
                    width: width - 280,
                    borderRadius: 8,
                    resizeMode: 'cover',
                    flex: 1

                }} source={{ uri: item.image }} />
            </View>
            <View className='ml-3 flex-1 '>
                <View className='flex-row justify-between'>
                    <Text className='font-bold  w-[170px]'>{item.name}</Text>
                    <TouchableOpacity onPress={() => {
                        removeFromSavedList(item)
                    }}>
                        <AntDesign name="heart" size={20} color="#D4111E" />
                    </TouchableOpacity>
                </View>
                <View className='flex-row mt-1 items-center'>
                    <MaterialCommunityIcons name="progress-star" size={24} color="#FFB700" />
                    <Text className='mx-1 text-[16px]'>{item.rating}</Text>
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
                <View className='flex-row'>
                    <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color={colors.inActive} />
                    <Text style={{ width: 190, color: colors.inActive, marginVertical: 2, fontSize: 12 }} numberOfLines={2} ellipsizeMode='tail'>
                        {item.address}
                    </Text>
                </View>

                <View className='my-1 items-end'>
                    <Text className='font-semibold my-[2px]'>Giá cho 1 đêm, {item.adult} người lớn</Text>
                    <Text className='font-normal line-through text-red-500'>VND {VND.format(item.oldPrice * item.adult)}</Text>
                    <Text className='font-bold text-[18px]'>VND {VND.format(item.newPrice * item.adult)}</Text>
                    <Text style={{ fontSize: 12, color: colors.inActive, }}>
                        Đã bao gồm thuế và phí
                    </Text>
                    <View className='flex-row items-center gap-1'>
                        <Entypo name="check" size={12} color="#008234" />
                        <Text className='font-bold text-[#008234]'>Huỷ miễn phí</Text>
                    </View>
                </View>
            </View>
        </ TouchableOpacity>
    )
}

export default SaveProperty