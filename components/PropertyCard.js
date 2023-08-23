import { View, Text, Dimensions, Pressable, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion } from 'firebase/firestore';

const PropertyCard = (props) => {

    const [isSaved, setIsSaved] = useState(false)

    const { room, children, adult, selectedDate, availableRoom, property } = props
    const { width, height } = Dimensions.get('window')
    const saveInfo = {
        name: property.name,
        rating: property.rating,
        oldPrice: property.oldPrice,
        newPrice: property.newPrice,
        image: property.image,
        room: room,
        adult: adult,
        children: children,
        endDate: selectedDate.endDate,
        startDate: selectedDate.startDate,
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const nav = useNavigation()

    const isEqual = (object1, object2) => {
        const jsonString1 = JSON.stringify(object1);
        const jsonString2 = JSON.stringify(object2);
        return jsonString1 === jsonString2;
    };

    // Khi component mở và tải dữ liệu từ Firebase
    useEffect(() => {
        const checkIfSaved = async () => {
            const uid = auth.currentUser.uid;
            const userDocRef = doc(db, 'user', uid);

            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const savedList = userDocSnap.data().SavedList || [];
                    const isSavedInList = savedList.some(item => item.name === saveInfo.name);
                    setIsSaved(isSavedInList);
                    console.log('kiem tra trang thai luu');
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái lưu:', error);
            }
        };

        checkIfSaved();
    }, []);

    const addToSavedList = async (saveInfo) => {
        const uid = auth.currentUser.uid;

        try {
            const userDocRef = doc(db, 'user', uid);
            await updateDoc(userDocRef, {
                SavedList: arrayUnion(saveInfo),
            });
            console.log('Đã thêm chỗ nghỉ vào SavedList');
        } catch (error) {
            console.error('Lỗi khi thêm chỗ nghỉ vào SavedList:', error);
        }
    };

    const removeFromSavedList = async (saveInfo) => {
        const uid = auth.currentUser.uid;

        try {
            const userDocRef = doc(db, 'user', uid);

            await updateDoc(userDocRef, {
                SavedList: arrayRemove(saveInfo)
            });

            console.log('Đã xoá chỗ nghỉ khỏi SavedList');
        } catch (error) {
            console.error('Lỗi khi xoá chỗ nghỉ khỏi SavedList:', error);
        }
    };

    const handleSaveToggle = (saveInfo, isSaved) => {
        if (isSaved) {
            removeFromSavedList(saveInfo);
        } else {
            addToSavedList(saveInfo);
        }
    };

    return (
        <TouchableOpacity onPress={() => {
            nav.navigate('PropertyInfoScreen',
                {
                    name: property.name,
                    rating: property.rating,
                    oldPrice: property.oldPrice,
                    newPrice: property.newPrice,
                    photos: property.photos,
                    room: room,
                    adult: adult,
                    children: children,
                    selectedDate: selectedDate,
                    availableRoom: availableRoom
                }
            )
        }} className='flex-row  p-5'
            style={{
                borderWidth: 0.5,
                borderColor: 'rgba(0,0,0,0.1)'
            }}>
            <View>
                <Image style={{
                    width: width - 280,
                    borderRadius: 8,
                    resizeMode: 'cover',
                    flex: 1

                }} source={{ uri: property.image }} />
            </View>
            <View className='ml-3 flex-1 '>
                <View className='flex-row justify-between'>
                    <Text className='font-bold  w-[170px]'>{property.name}</Text>
                    <TouchableOpacity onPress={() => {
                        setIsSaved(prevIsSaved => !prevIsSaved)
                        handleSaveToggle(saveInfo, isSaved)
                    }}>
                        {
                            isSaved ? <AntDesign name="heart" size={20} color="#D4111E" />
                                : <AntDesign name="hearto" size={20} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View className='flex-row mt-1 items-center'>
                    <MaterialCommunityIcons name="progress-star" size={24} color="#FFB700" />
                    <Text className='mx-1 text-[16px]'>{property.rating}</Text>
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
                        {property.address}
                    </Text>
                </View>

                <View className='my-1 items-end'>
                    <Text style={{ fontSize: 12, }} className='font-normal'>1 phòng: 3 giường</Text>
                    <Text className='font-semibold my-[2px]'>Giá cho 1 đêm, {adult} người lớn</Text>
                    <Text className='font-normal line-through text-red-500'>VND {VND.format(property.oldPrice * adult)}</Text>
                    <Text className='font-bold text-[18px]'>VND {VND.format(property.newPrice * adult)}</Text>
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

export default PropertyCard