import { View, Text, Pressable, TextInput, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import DatePicker from 'react-native-date-ranges';
import { colors } from '../constants'
import { Header } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomModal } from '../components';


const HomeScreen = () => {
  const nav = useNavigation()
  const [selectedDate, setSelectedDate] = useState()
  const [room, setRoom] = useState(1)
  const [Adult, setAdult] = useState(2)
  const [children, setChildren] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: true,
      title: 'Booking.com',
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '45%',
      },
      headerStyle: {
        backgroundColor: colors.primary,
        height: 110,
        shadowColor: 'transparent'
      },
      headerRight: () => {
        return <Ionicons name="notifications-outline" size={30} color="white" style={{ marginEnd: 12 }} />
      }
    })
  }, [])

  const customButton = (onConfirm) => (
    <Button
      onPress={onConfirm}
      style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }}
      primary
      title='Chọn ngày'
    />
  )

  return (
    <>
      <View>
        <Header />
        <View className="border-[2px] border-[#ffb700] m-6">
          <Pressable className='border-[2px] border-[#ffb700] flex-row p-3 items-center'>
            <AntDesign name="search1" size={24} color="black" />
            <TextInput style={{ marginStart: 10 }} placeholderTextColor='rgba(0,0,0,0.2)' placeholder='Nhập điểm đến của bạn' />
          </Pressable>

          <Pressable className='border-[2px] border-[#ffb700] flex-row p-3 items-center'>
            <MaterialCommunityIcons name="calendar-text-outline" size={24} color="black" />
            <DatePicker
              style={{ width: 280, height: 32, borderWidth: 0, }}
              customStyles={{
                placeholderText: { fontSize: 16, marginLeft: -18, color: 'rgba(0,0,0,0.2)' }, // placeHolder style
                headerStyle: {
                  backgroundColor: colors.primary
                },			// title container style
                headerMarkTitle: {
                  color: 'transparent',
                }, // title mark style 
                headerDateTitle: {}, // title Date style
                contentInput: {}, //content text container style
                contentText: {
                  alignItems: 'center',
                  marginRight: 'auto',
                  marginLeft: 10,
                  fontSize: 15
                }, //after selected text Style
              }} // optional 
              selectedBgColor={colors.primary}
              centerAlign // optional text will align center or not
              allowFontScaling={false} // optional
              customButton={(onConfirm) => customButton(onConfirm)}
              onConfirm={(startDate, endDate) => setSelectedDate(startDate, endDate)}
              placeholder={'Nhập thời gian muốn ở lại của bạn'}
              mode={'range'}
            />
          </Pressable>

          <Pressable
            onPress={() => showModal()}
            className='border-[2px] border-[#ffb700] flex-row p-3 items-center'>
            <Ionicons name="md-person-outline" size={24} color="black" />
            <Text style={{ marginLeft: 10, color: 'black' }}>1 phòng • 2 người lớn • 0 trẻ em</Text>
          </Pressable>

          <Pressable className='border-[2px] border-[#ffb700] bg-[#006CE4] flex-row p-3 items-center justify-center'>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Tìm</Text>
          </Pressable>
        </View>
      </View>

      <BottomModal isVisible={modalVisible} closeModal={hideModal} />
    </>
  )
}

export default HomeScreen