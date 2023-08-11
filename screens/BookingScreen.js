import {
  View, Text, SafeAreaView, TouchableOpacity,
  ScrollView, TextInput, Platform, Pressable
} from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';


const BookingScreen = () => {
  const bookings = useSelector((state) => state.booking.booking)

  return (
    <SafeAreaView className='flex-1'>
      <View style={{
        height: 80,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text numberOfLines={1} ellipsizeMode='tail'
          style={{ fontSize: 20, color: 'white', fontWeight: 600, marginTop: 15 }}>
          Đặt chỗ
        </Text>
      </View>
      <ScrollView className='flex-1 p-[15px]'>
        {
          bookings.length > 0 && bookings.map((item, index) =>
            <View key={index} className='bg-white p-[10px] rounded mb-6' >
              <Text numberOfLines={2} ellipsizeMode='tail' className='font-bold text-[20px]  w-[250px]'>{item.name}</Text>
              <View className='flex-row mt-2 items-center'>
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
              <View className='flex-row mt-[10px]'>
                <View className=''>
                  <Text className='font-medium'>Nhận phòng</Text>
                  <Text style={{
                    fontWeight: 700,
                    color: colors.button,
                    fontSize: 15
                  }}>{item.startDate}</Text>
                </View>
                <View className=' ml-[100px]'>
                  <Text className='font-medium'>Trả Phòng</Text>
                  <Text style={{
                    fontWeight: 700,
                    color: colors.button,
                    fontSize: 15
                  }}>{item.endDate}</Text>
                </View>
              </View>
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookingScreen