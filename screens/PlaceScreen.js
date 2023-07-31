import { View, Text, SafeAreaView, FlatList, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { data } from '../data'
import { PropertyCard } from '../components';
import React from 'react'

const PlaceScreen = () => {

    const nav = useNavigation()
    const route = useRoute() // truy cập đến thông tin của màn hình trong navigation
    // {"adult": 2, "children": 0, "place": "Hyderabad", "room": 1, "selectedDate": {"endDate": "2023/07/20", "startDate": "2023/07/12"}} 
    const { place, room, children, adult, selectedDate } = route.params


    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View style={{
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
            }}>
                <View style={{
                    backgroundColor: colors.primary,
                    height: 80,
                }} />
                <Pressable
                    className='w-[370px] absolute top-[50px] 
                    left-[22px] z-10 border-[4px] rounded-xl
                    border-[#ffb700] flex-row  items-center'
                    style={{
                        backgroundColor: 'white',
                    }}
                >
                    <TouchableOpacity onPress={() => {
                        nav.navigate("Home", { input: place })
                    }}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" style={{ padding: 12 }} />
                    </TouchableOpacity>
                    <Text style={{ marginStart: 10 }}>{place}•{selectedDate.startDate.slice(5)}-{selectedDate.endDate.slice(5)}</Text>
                </Pressable>
                <View style={{
                    backgroundColor: 'white',
                    height: 80,
                    justifyContent: 'flex-end'
                }}>
                    <View className='flex-row justify-around mb-4'>
                        <Pressable className='flex-row items-baseline gap-1'>
                            <FontAwesome name="sort" size={20} color='black' />
                            <Text>Sắp xếp</Text>
                        </Pressable>
                        <Pressable className='flex-row items-baseline gap-1'>
                            <FontAwesome name="filter" size={20} color='black' />
                            <Text>Lọc</Text>
                        </Pressable>
                        <Pressable className='flex-row items-baseline gap-1'>
                            <FontAwesome5 name="map-marked-alt" size={20} color='black' />
                            <Text>Bản đồ</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <ScrollView>
                {
                    data.map((x) => {
                        if (x.place.toLowerCase() == place.toLowerCase()) {
                            return (<Text key={x.place} className='text-black mx-5 mt-3 mb-3'>
                                {x.properties.length} chỗ nghỉ
                            </Text>)
                        }
                    })
                }

                {
                    data?.filter((item) => item.place === place)
                        .map((item) => item.properties
                            .map((property, index) =>
                                <PropertyCard
                                    key={index}
                                    room={room}
                                    children={children}
                                    adult={adult}
                                    selectedDate={selectedDate}
                                    property={property}
                                    availableRoom={property.rooms}
                                />
                            ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlaceScreen