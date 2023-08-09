import { View, Text, SafeAreaView, ScrollView, Animated, TouchableOpacity, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react';
import { pixelNormalize } from '../components'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const PropertyInfoScreen = () => {

    const nav = useNavigation()
    const route = useRoute()
    const {
        name, rating, oldPrice, newPrice,
        photos, room, adult, children,
        selectedDate, availableRoom
    } = route.params

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [scrollY] = useState(new Animated.Value(0));

    const translateY = scrollY.interpolate({
        inputRange: [0, 100], // Tùy chỉnh khoảng cuộn để chữ hiện dần
        outputRange: [0, 1],
        extrapolate: 'clamp', // Đảm bảo giá trị output không vượt quá khoảng [0, 1]
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                backgroundColor: colors.primary,
                height: 80,
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
                <Animated.View style={{
                    opacity: translateY,
                    marginTop: 20
                }}>
                    <Text
                        numberOfLines={1} ellipsizeMode='tail'
                        style={{ fontSize: 16, color: 'white', fontWeight: 600, marginStart: 18, width: 300 }}>{name}</Text>
                </Animated.View>
            </View>
            <ScrollView
                style={{ flex: 1, padding: 16 }}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                <View className='mb-[20px] flex-row'>
                    <Text className='font-bold text-[25px] flex-1'>{name}</Text>
                    <View style={{
                        backgroundColor: colors.primary,
                        padding: 6,
                        height: 35,
                        minWidth: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5
                    }}>
                        <Text className='text-white'>{rating}</Text>
                    </View>
                </View>
                <Pressable className='flex-row flex-wrap items-center'>
                    {
                        photos.slice(0, 5).map((photo, index) => (
                            <View key={index} className='mr-[6px] mb-[10px]'>
                                <Image
                                    style={{
                                        width: 120,
                                        height: pixelNormalize(80),
                                        borderRadius: pixelNormalize(6),
                                    }}
                                    source={{ uri: photo.image }}
                                />
                            </View>
                        ))
                    }
                    <Pressable className='justify-center '>
                        <Text style={{ marginLeft: 30, color: colors.inActive }}>Xem thêm</Text>
                    </Pressable>
                </Pressable>
                <View style={{
                    borderColor: 'rgba(0,0,0,0.1)',
                    marginTop: 32,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                    borderRadius: 4
                }}>
                    <Text>Giá cho 1 đêm, {adult} người lớn</Text>
                    <Text className='font-bold text-xl'>VND {VND.format(newPrice * adult)}</Text>
                    <Text style={{
                        color: colors.inActive,
                        fontSize: 13
                    }}>Đã bao gồm thuế và phí</Text>
                </View>
                <View style={{
                    borderColor: 'rgba(0,0,0,0.1)',
                    marginTop: 32,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                    borderRadius: 4,
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
                    <MaterialCommunityIcons name="card-bulleted-off-outline" size={24} color="green" />
                    <View className='ml-3 flex-1'>
                        <Text className='font-bold text-lg mb-3 mt-[-5px]'>Không cần thẻ tín dụng</Text>
                        <Text >Một số lựa chọn không thể được đặt mà không có thẻ tín dụng</Text>
                    </View>
                </View>
                <View className='flex-row mt-[36px]'>
                    <View className=''>
                        <Text className='font-medium'>Nhận phòng</Text>
                        <Text style={{
                            fontWeight: 700,
                            color: colors.button,
                            fontSize: 15
                        }}>{selectedDate.startDate}</Text>
                    </View>
                    <View className=' ml-[100px]'>
                        <Text className='font-medium'>Trả Phòng</Text>
                        <Text style={{
                            fontWeight: 700,
                            color: colors.button,
                            fontSize: 15
                        }}>{selectedDate.endDate}</Text>
                    </View>
                </View>
                <View className='mt-[25px] mb-7 '>
                    <Text className='font-medium'>Số lượng phòng và khách</Text>
                    <Text style={{
                        fontWeight: 700,
                        color: colors.button,
                        fontSize: 15
                    }}>{room} phòng, {adult} người lớn, {children} trẻ em</Text>
                </View>
                <View className='mb-5'>
                    <Text className='font-bold text-xl mb-3 '>Những tiện nghi phổ biến nhất</Text>
                    <View className='flex-row flex-wrap '>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <Foundation name="no-smoking" size={24} color="black" />
                            <Text>Phòng không hút thuốc</Text>
                        </View>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <MaterialCommunityIcons name="microsoft-internet-explorer" size={20} color="black" />
                            <Text>Dịch vụ Internet</Text>
                        </View>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <MaterialCommunityIcons name="truck-cargo-container" size={22} color="black" />
                            <Text>Xe đưa đón sân bay</Text>
                        </View>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <FontAwesome5 name="temperature-low" size={20} color="black" />
                            <Text>Điều hoà nhiệt độ</Text>
                        </View>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <MaterialCommunityIcons name="washing-machine" size={22} color="black" />
                            <Text>Giặt ủi</Text>
                        </View>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <FontAwesome5 name="smoking" size={18} color="black" />
                            <Text>Khu vực cho phép hút thuốc</Text>
                        </View>
                        <View className='flex-row items-center gap-2 mr-3 mb-5'>
                            <MaterialIcons name="luggage" size={24} color="black" />
                            <Text>Giữ hành lý</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={{ marginVertical: 6 }}>
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate('RoomsScreen', {
                            rooms: availableRoom,
                            oldPrice: oldPrice,
                            newPrice: newPrice,
                            name: name,
                            children: children,
                            adult: adult,
                            rating: rating,
                            startDate: selectedDate.startDate,
                            endDate: selectedDate.endDate
                        })
                    }}
                    style={{
                        backgroundColor: '#0071C2',
                        padding: 11,
                        marginLeft: 6,
                        marginRight: 6,
                        alignItems: 'center'
                    }}>
                    <Text className='font-semibold text-white text-[16px]'>Xem các lựa chọn</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PropertyInfoScreen