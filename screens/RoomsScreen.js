import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const RoomsScreen = () => {
    const nav = useNavigation()
    const route = useRoute()
    const { rooms,
        oldPrice,
        newPrice,
        name,
        children,
        adult,
        rating,
        startDate,
        endDate } = route.params

    const [selected, setSelected] = useState([])

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    console.log(selected);

    return (
        <SafeAreaView className='flex-1 bg-white'>
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
                <View style={{
                    marginStart: 18, width: 300, alignItems: 'flex-start',
                    marginTop: 22
                }}>
                    <Text
                        style={{ fontSize: 16, color: 'white', fontWeight: 400 }}>
                        Chọn chỗ của bạn
                    </Text>
                    <Text style={{ color: 'white' }}>{startDate.slice(5)}-{endDate.slice(5)}</Text>
                </View>
            </View>
            <ScrollView style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.06)',
                paddingVertical: 8,
                paddingHorizontal: 8
            }}>
                {
                    rooms.map((room, index) => {
                        return (
                            <Pressable key={index} style={{
                                backgroundColor: 'white',
                                marginBottom: 30,
                                borderRadius: 4,
                                padding: 16,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 4,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 10
                                }}>
                                    <Text style={{
                                        color: '#1c81c9',
                                        flex: 1,
                                        marginTop: 12,
                                        fontSize: 18,
                                        fontWeight: 700
                                    }}>{room.name}</Text>
                                    <Ionicons name="ios-information-circle-outline" size={30} color={colors.button} />
                                </View>
                                <View className='flex-row items-baseline gap-1'>
                                    <Text className='text-[12px]'>Giá cho:</Text>
                                    <Octicons name="person" size={16} color="black" />
                                </View>
                                <View className='flex-row items-baseline gap-1'>
                                    <Ionicons name="bed-outline" size={16} color="black" />
                                    <Text className='text-[12px]'>{room.bed}</Text>
                                </View>
                                <Text className='text-[12px]'>Diện tích: 40m2</Text>
                                <View className='flex-row items-center gap-1'>
                                    <MaterialCommunityIcons name="card-bulleted-off-outline" size={16} color="green" />
                                    <Text style={{
                                        color: 'green',
                                    }}>Không cần thẻ tín dụng</Text>
                                </View>
                                <View className='flex-row items-center gap-1'>
                                    <AntDesign name="check" size={16} color="green" />
                                    <Text style={{
                                        color: 'green',
                                        fontWeight: 600
                                    }}>{room.refundable}</Text>
                                </View>
                                <View className='flex-row items-center gap-1'>
                                    <AntDesign name="check" size={16} color="green" />
                                    <Text style={{
                                        color: 'green',
                                        fontWeight: 600
                                    }}>{room.payment}</Text>
                                </View>
                                <View className='flex-row items-center gap-1 flex-wrap'>
                                    <View className='flex-row items-center gap-1'>
                                        <AntDesign name="wifi" size={18} color="black" />
                                        <Text style={{
                                            fontSize: 12
                                        }}>WiFi Miễn Phí</Text>
                                    </View>
                                    <View className='flex-row items-center gap-1'>
                                        <EvilIcons name="eye" size={22} color="black" />
                                        <Text style={{
                                            fontSize: 12
                                        }}>Nhìn ra thành phố</Text>
                                    </View>
                                    <View className='flex-row items-center gap-1'>
                                        <FontAwesome name="snowflake-o" size={16} color="black" />
                                        <Text style={{
                                            fontSize: 12
                                        }}>Điều hoà không khí</Text>
                                    </View>
                                </View>
                                <View className='mt-[18px] border-[0.5px] opacity-30' />
                                <View style={{
                                    marginTop: 18
                                }}>
                                    <Text>Giá cho 1 đêm</Text>
                                    <Text className='font-bold text-lg'>VND {VND.format(newPrice)}</Text>
                                    <Text style={{
                                        color: colors.inActive,
                                        fontSize: 13
                                    }}>Đã bao gồm thuế và phí</Text>
                                </View>
                                {
                                    selected.includes(room.id) ?
                                        <Pressable style={{
                                            borderColor: colors.primary,
                                            backgroundColor: '#f0f7fb',
                                            borderWidth: 1,
                                            alignItems: 'center',
                                            paddingVertical: 12,
                                            marginTop: 15,
                                            borderRadius: 4,
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{
                                                color: colors.button,
                                                fontWeight: 700,
                                                fontSize: 16,
                                                flex: 1,
                                                marginStart: '40%'
                                            }}> ĐÃ CHỌN</Text>
                                            <AntDesign onPress={() => setSelected([])}
                                                style={{ marginRight: 10 }} name="closesquare" size={24} color="#CC0000" />
                                        </Pressable> :
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelected(room.id)
                                            }}
                                            style={{
                                                borderColor: colors.primary,
                                                borderWidth: 1,
                                                alignItems: 'center',
                                                paddingVertical: 12,
                                                marginTop: 15,
                                                borderRadius: 4
                                            }}>
                                            <Text style={{
                                                color: colors.button,
                                                fontWeight: 700,
                                                fontSize: 16,
                                            }}>CHỌN</Text>
                                        </TouchableOpacity>
                                }
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
            {
                selected.length > 0 ?
                    <View style={{ marginVertical: 6 }}>
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate('UserScreen', {
                                    oldPrice: oldPrice,
                                    newPrice: newPrice,
                                    name: name,
                                    children: children,
                                    adult: adult,
                                    rating: rating,
                                    startDate: startDate,
                                    endDate: endDate,
                                    selectedRoom: selected,
                                })
                            }}
                            style={{
                                backgroundColor: '#0071C2',
                                padding: 11,
                                marginLeft: 6,
                                marginRight: 6,
                                alignItems: 'center',
                                borderRadius: 4
                            }}>
                            <Text className='font-semibold text-white text-[16px]'>Đặt ngay</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
        </SafeAreaView>
    )
}

export default RoomsScreen