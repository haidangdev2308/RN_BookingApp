import {
  View, Text, SafeAreaView, TouchableOpacity,
  ScrollView, TextInput, Platform, Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { savedPlaces } from '../BookReducer';
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Feather } from '@expo/vector-icons';


const BookingScreen = () => {
  const bookings = useSelector((state) => state.booking.booking);
  const [oldBooking, setOldBooking] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ Firebase và cập nhật vào oldBooking
    const fetchOldBookings = async () => {
      try {
        setLoading(true); // Bắt đầu hiển thị "Đang tải"
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, 'user', uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const bookingDetailsFromFirebase = docSnap.data().bookingDetails || [];
          setOldBooking(bookingDetailsFromFirebase);
          setLoading(false); // Kết thúc hiển thị "Đang tải"
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ Firebase:', error);
        setLoading(false); // Kết thúc hiển thị "Đang tải" nếu có lỗi
      }
    };
    fetchOldBookings();
  }, []);

  useEffect(() => {
    // Khi cả dữ liệu từ Firebase và Redux đã được lấy, kết hợp chúng vào bookingList
    const combinedBookings = [...oldBooking, ...bookings];
    setBookingList(combinedBookings);
    console.log(combinedBookings);
  }, [oldBooking, bookings]);

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
        {loading ? (
          <View className='mt-10 flex-row justify-center items-center'>
            <Text className='mr-4'>Đang tải</Text>
            <Feather name="loader" size={24} color={colors.active} />
          </View>
        ) :
          bookingList.length > 0 && bookingList.map((item, index) =>
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