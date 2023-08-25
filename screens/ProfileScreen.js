import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Feather } from '@expo/vector-icons';
import { colors } from '../constants';
import { useDispatch } from 'react-redux';
import { savedPlaces, resetBooking } from '../BookReducer';
import { resetSaving } from '../SavedReducer';

const ProfileScreen = () => {
  const nav = useNavigation()
  const dispatch = useDispatch();

  const uid = auth.currentUser.uid; // Lấy UID của người dùng đang đăng nhập
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDocRef = doc(db, 'user', uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const { email, phone } = userData; // Lấy thông tin tên và số điện thoại
          setUserInfo({ email, phone });
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserInfo();
  }, [uid]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('refreshToken'); // Xóa refresh token từ AsyncStorage
      dispatch(resetBooking())
      dispatch(resetSaving())
      console.log('Đăng xuất thành công và xóa refresh token');
      nav.replace('Login');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white '>
      <View style={{
        height: 80,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text numberOfLines={1} ellipsizeMode='tail'
          style={{ fontSize: 20, color: 'white', fontWeight: 600, marginTop: 15 }}>
          Cá nhân
        </Text>
      </View>
      <View className='p-[15px] items-center justify-center flex-1'>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin người dùng</Text>
        {userInfo ? (
          <View>
            <Text className='mt-3'>Địa chỉ email: {userInfo.email}</Text>
            <Text className='mt-3'>Số điện thoại: {userInfo.phone}</Text>
          </View>
        ) : (
          <View className='flex-row'>
            <Text className='mr-2'>Đang tải thông tin người dùng...</Text>
            <Feather name="loader" size={24} color={colors.active} />
          </View>
        )}
        <TouchableOpacity
          onPress={handleLogout}
          className='mt-[45px] bg-[#003580] p-[15px] rounded-lg w-[160px] items-center justify-center'>
          <Text className='text-white font-bold text-[16px]'>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen