import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={{
            backgroundColor: colors.primary,
            height: 65,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 5
        }}>
            <Pressable
                className='flex-row gap-1 py-1 px-2 border-[1px] border-white rounded-3xl bg-[#1a4fa0]'>
                <Ionicons name="ios-bed-outline" size={24} color="white" />
                <Text className="text-white font-bold text-[14px]">Lưu trú</Text>
            </Pressable>
            <Pressable
                className='flex-row gap-1 py-1  px-2 '>
                <Ionicons name="airplane-outline" size={24} color="white" />
                <Text className="text-white font-bold text-[14px]">Vé bay</Text>
            </Pressable>
            <Pressable
                className='flex-row gap-1 py-2 px-2 '>
                <AntDesign name="car" size={24} color="white" />
                <Text className="text-white font-bold text-[14px]">Thuê Xe</Text>
            </Pressable>
            <Pressable
                className='flex-row gap-1 py-1  px-2 '>
                <MaterialIcons name="local-taxi" size={24} color="white" />
                <Text className="text-white font-bold text-[14px]">Taxi</Text>
            </Pressable>
        </View>
    )
}

export default Header