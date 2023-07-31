import { View, Text, Dimensions, Pressable, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

const PropertyCard = (props) => {

    const { room, children, adult, selectedDate, availableRoom, property } = props
    const { width, height } = Dimensions.get('window')


    return (
        <Pressable className='flex-row  p-5 '
            style={{
                borderWidth: 0.5,
                borderColor: 'rgba(0,0,0,0.1)'
            }}>
            <View >
                <Image style={{
                    height: height / 4,
                    width: width - 280,
                    borderRadius: 8,
                    resizeMode: 'cover',

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
                <Text style={{ width: 190, color: colors.inActive, marginVertical: 2 }} numberOfLines={2} ellipsizeMode='tail'>
                    {property.address}
                </Text>
                <Text className='font-semibold my-[2px]'>Giá cho 1 đêm, {adult} người lớn</Text>
            </View>
        </Pressable >
    )
}

export default PropertyCard