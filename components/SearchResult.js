import { View, Text, FlatList, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../constants'

const SearchResult = (props) => {

    const { input, data, setInput } = props
    const nav = useNavigation()

    return (
        <View className='p-[20px]'>
            <FlatList data={data} renderItem={({ item }) => {
                if (item.place.toLowerCase().includes(input.toLowerCase())) {
                    if (input === '') return null
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setInput(item.place)
                                nav.navigate("Home", {
                                    input: item.place,
                                })
                            }}
                            className='flex-row gap-4 items-center mb-5'>
                            <View>
                                <Image className='w-[55px] h-[55px] rounded-lg' source={{ uri: item.placeImage }} />
                            </View>
                            <View>
                                <Text className='font-bold text-[15px]'>{item.place}</Text>
                                <Text className='my-1'>{item.shortDescription}</Text>
                                <Text style={{ color: colors.inActive }}>{item.properties.length} chỗ nghỉ</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            }} />
        </View>
    )
}

export default SearchResult