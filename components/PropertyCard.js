import { View, Text, Dimensions, Pressable, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import React from 'react'

const PropertyCard = (props) => {

    const { room, children, adult, selectedDate, availableRoom, property } = props
    const { width, height } = Dimensions.get('window')

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    return (
        <Pressable className='flex-row  p-5 '
            style={{
                borderWidth: 0.5,
                borderColor: 'rgba(0,0,0,0.1)'
            }}>
            <View >
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
                    <AntDesign name="hearto" size={16} color="black" />
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
        </Pressable >
    )
}

export default PropertyCard