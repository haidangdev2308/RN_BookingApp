import { View, Text, SafeAreaView, FlatList, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { data } from '../data'
import { PropertyCard } from '../components';
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { filters } from '../data'


const PlaceScreen = () => {

    const nav = useNavigation()
    const route = useRoute() // truy cập đến thông tin của màn hình trong navigation
    // {"adult": 2, "children": 0, "place": "Hyderabad", "room": 1, "selectedDate": {"endDate": "2023/07/20", "startDate": "2023/07/12"}} 
    const { place, room, children, adult, selectedDate } = route.params

    const [modalVisible, setModalVisible] = useState(false)
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const [selectedFilter, setSelectedFilter] = useState('')
    const [sortedData, setSortedData] = useState(data)

    const searchPlace = data?.filter((item) => item.place === place) // item khi search

    //thấp den cao
    const compare = (a, b) => {
        return a.newPrice - b.newPrice
    }
    //cao den thap
    const comparison = (a, b) => {
        return b.newPrice - a.newPrice
    }

    const applyFilter = (filter) => {
        hideModal()
        switch (filter) {
            case "0":
                searchPlace.map((item) => item.properties.sort(compare))
                setSortedData(searchPlace)
                break;
            case "1":
                searchPlace.map((item) => item.properties.sort(comparison))
                setSortedData(searchPlace)
                break;
            default:
                break;
        }
    }

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
                    <View className='flex-row justify-around'>
                        <TouchableOpacity
                            onPress={() => showModal()}
                            className='flex-row items-baseline gap-1 p-4'>
                            <FontAwesome name="sort" size={20} color='black' />
                            <Text>Sắp xếp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-baseline gap-1 p-4'>
                            <FontAwesome name="filter" size={20} color='black' />
                            <Text>Lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-row items-baseline gap-1 p-4'>
                            <FontAwesome5 name="map-marked-alt" size={20} color='black' />
                            <Text>Bản đồ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView>
                {
                    sortedData.map((x) => {
                        if (x.place.toLowerCase() == place.toLowerCase()) {
                            return (<Text key={x.place} className='text-black mx-5 mt-3 mb-3'>
                                {x.properties.length} chỗ nghỉ
                            </Text>)
                        }
                    })
                }

                {
                    sortedData?.filter((item) => item.place === place)
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

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => hideModal()}
                animationIn="slideInUp" // Hiệu ứng khi modal hiển thị (hiệu ứng từ phía dưới lên)
                animationOut="slideOutDown" // Hiệu ứng khi modal ẩn đi (hiệu ứng từ phía trên xuống)
                backdropOpacity={0.5}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: 350
                }}>
                    <View className="pt-[20px] px-[18px]">
                        <Text className="text-[22px] font-bold ">Chọn phòng và khách</Text>
                    </View>
                    <View className=' my-6 mx-[18px] flex-1 flex-col'>
                        {
                            filters.map((filter, index) => (
                                <TouchableOpacity onPress={() => {
                                    setSelectedFilter(filter.id)
                                }} key={index} className='mb-5 flex-row justify-between'>
                                    <Text className='text-[15px]'>{filter.filter}</Text>
                                    {
                                        selectedFilter.includes(filter.id) ?
                                            <MaterialCommunityIcons name="circle-slice-8" size={22} color={colors.button} />
                                            : <MaterialCommunityIcons name="circle-outline" size={22} color={colors.inActive} />
                                    }
                                </TouchableOpacity>
                            ))
                        }

                    </View>
                    <TouchableOpacity
                        onPress={() => applyFilter(selectedFilter)}
                        style={{
                            backgroundColor: colors.button,
                            padding: 10,
                            borderRadius: 5,
                            marginHorizontal: 50,
                            marginBottom: 25
                        }}>
                        <Text
                            className="text-white text-center font-semibold text-[18px]"
                        >Áp dụng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default PlaceScreen