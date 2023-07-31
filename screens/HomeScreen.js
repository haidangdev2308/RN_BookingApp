import {
  View,
  Text,
  Pressable,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import DatePicker from 'react-native-date-ranges';
import { colors } from '../constants'
import { Header } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';


const HomeScreen = () => {
  const nav = useNavigation()
  const route = useRoute() // truy cập đến thông tin của màn hình trong navigation

  const [selectedDate, setSelectedDate] = useState()
  const [room, setRoom] = useState(1)
  const [adult, setAdult] = useState(2)
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

  const searchPlace = (place) => {
    if (!route.params || !selectedDate) { // nếu ko có dữ liệu từ 1 trong 2 cái
      Alert.alert('', 'Vui lòng nhập đầy đủ thông tin!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
    if (route.params && selectedDate) {
      nav.navigate("PlaceScreen", {
        place: place,
        selectedDate: selectedDate,
        room: room,
        adult: adult,
        children: children
      })
    }
  }

  return (
    <View className='bg-white flex-1'>
      <View >
        <Header />
        <ScrollView className='bg-white'>
          <View
            className="border-[3px] rounded-md border-[#ffb700] m-4 bg-white"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3,
              elevation: 5,
            }}>
            <Pressable
              onPress={() => {
                nav.navigate('SearchScreen')
              }}
              className='border-[2px] border-[#ffb700] flex-row p-3 items-center'>
              <AntDesign name="search1" size={24} color="black" />
              {
                route?.params ?
                  <Text style={{ marginStart: 10, width: 320, color: 'black' }}>{route.params.input}</Text>
                  : <Text style={{ marginStart: 10, width: 320, color: 'rgba(0,0,0,0.2)' }}>Nhập điểm đến của bạn</Text>
              }
            </Pressable>

            <Pressable className='border-[2px] border-[#ffb700] flex-row p-3 items-center'>
              <MaterialCommunityIcons name="calendar-text-outline" size={24} color="black" />
              <DatePicker
                style={{ width: 320, height: 32, borderWidth: 0, }}
                customStyles={{
                  placeholderText: { fontSize: 16, marginLeft: -18, color: 'rgba(0,0,0,0.2)' }, // placeHolder style
                  headerStyle: {
                    backgroundColor: colors.primary
                  },			// title container style
                  headerMarkTitle: {
                    color: 'transparent',
                  }, // title mark style 
                  headerDateTitle: {}, // title Date style
                  contentInput: {
                    marginLeft: 28,
                    marginRight: 'auto',
                  }, //content text container style
                  contentText: {
                    alignItems: 'center',
                    fontSize: 15,
                    marginLeft: -18
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
              <Text style={{ marginLeft: 10, color: 'black' }}>{room} phòng • {adult} người lớn • {children} trẻ em</Text>
            </Pressable>

            <View className='bg-[#ffb700] mb-[-1px]'>
              <Pressable
                onPress={() => {
                  searchPlace(route.params?.input)
                }}
                style={{ backgroundColor: colors.button }}
                className='border-[2px] rounded-md border-[#ffb700] flex-row p-3 items-center justify-center'>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Tìm</Text>
              </Pressable>
            </View>
          </View>

          <Text className='mt-10 mx-4 mb-4 font-bold text-[21px]'>Đi nhiều hơn, trả ít hơn</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal className='ml-4'>
            <Pressable style={{
              width: 240,
              height: 150,
              backgroundColor: colors.primary,
              borderRadius: 10,
              padding: 16,
              marginRight: 14
            }}>
              <Text className='font-bold text-[15px] mb-2 text-white'>Genius</Text>
              <Text className='text-white text-sm'>
                Xin chào, bạn đang là
                <Text className='font-bold'> Genius cấp 1 </Text>
                trong chương trình khách hàng thân thiết của chúng tôi
              </Text>
            </Pressable>

            <Pressable style={{
              width: 240,
              height: 150,
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: colors.button,
              borderWidth: 1,
              padding: 16,
              marginRight: 14
            }}>
              <View className='flex-row justify-between items-center'>
                <Text className='font-bold text-[15px]  text-black'>Giảm giá 10%</Text>
                <MaterialCommunityIcons name="brightness-percent" size={20} color={colors.button} />
              </View>
              <Text className='text-black text-xs mt-2'>
                Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu
              </Text>
            </Pressable>

            <Pressable style={{
              width: 240,
              height: 150,
              backgroundColor: 'rgba(0,0,0,0.03)',
              borderRadius: 10,
              borderColor: colors.inActive,
              borderWidth: 1,
              padding: 16,
              marginRight: 14
            }}>
              <View className='flex-row justify-between items-center'>
                <Text className='font-bold text-[15px] text-black'>Giảm giá 15%</Text>
                <Ionicons name="lock-closed-outline" size={20} color={colors.inActive} />
              </View>
              <Text className='text-black text-xs mt-2'>
                Hoàn tất 5 kỳ lưu trú để mở khoá Genius Cấp 2
              </Text>
            </Pressable>
          </ScrollView>

          <Image
            source={require('../assets/logo.png')}
            style={{
              width: 230,
              height: 60,
              marginTop: 30,
              alignSelf: 'center',
            }}
          ></Image>

        </ScrollView>
      </View>

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
          borderTopRightRadius: 10
        }}>
          <View className="pt-[30] px-[18px]">
            <Text className="text-[25px] font-bold ">Chọn phòng và khách</Text>
          </View>
          <View className="h-[210px] justify-evenly"
            style={{
              paddingHorizontal: 18,
            }}
          >
            <View className='flex-row  justify-between items-center '>
              <Text className='font-semibold'>Phòng</Text>
              <View className='flex-row border-[1px] border-[#868686] rounded-lg w-[130] items-center'>
                <TouchableOpacity disabled={room <= 1} onPress={() => setRoom(Math.max(1, room - 1))} className='p-[10px] rounded-lg'>
                  <AntDesign name="minus" size={24} color={room == 1 ? colors.inActive : colors.active} />
                </TouchableOpacity>
                <Text className='flex-1 text-center'>{room}</Text>
                <TouchableOpacity disabled={room >= 30} onPress={() => {
                  setRoom(Math.min(30, room + 1))
                  if (room >= adult) {
                    const newAdult = room + 1
                    setAdult(newAdult)
                  }
                }} className='p-[10px] rounded-lg'>
                  <AntDesign name="plus" size={20} color={room == 30 ? colors.inActive : colors.active} />
                </TouchableOpacity>
              </View>
            </View>
            <View className='flex-row  justify-between items-center '>
              <Text className='font-semibold'>Người lớn</Text>
              <View className='flex-row border-[1px] border-[#868686] rounded-lg w-[130] items-center'>
                <TouchableOpacity disabled={adult <= 1} onPress={() => setAdult(Math.max(1, adult - 1))}
                  className='p-[10px] rounded-lg'>
                  <AntDesign name="minus" size={24} color={adult == 1 ? colors.inActive : colors.active} />
                </TouchableOpacity>
                <Text className='flex-1 text-center'>{adult}</Text>
                <TouchableOpacity disabled={adult >= 30} onPress={() => setAdult(Math.min(30, adult + 1))}
                  className='p-[10px] rounded-lg'>
                  <AntDesign name="plus" size={20} color={adult == 30 ? colors.inActive : colors.active} />
                </TouchableOpacity>
              </View>
            </View>
            <View className='flex-row justify-between items-center '>
              <View>
                <Text className='font-semibold'>Trẻ em</Text>
                <Text className='text-[12px] text-[#868686]'>0 - 17 tuổi</Text>
              </View>
              <View className='flex-row  border-[1px]  border-[#868686] rounded-lg w-[130] items-center'>
                <TouchableOpacity disabled={children <= 0} onPress={() => setChildren(Math.max(0, children - 1))} className='p-[10px] rounded-lg'>
                  <AntDesign name="minus" size={24} color={children == 0 ? colors.inActive : colors.active} />
                </TouchableOpacity>
                <Text className='flex-1 text-center'>{children}</Text>
                <TouchableOpacity disabled={children >= 10} onPress={() => setChildren(Math.min(10, children + 1))} className='p-[10px] rounded-lg'>
                  <AntDesign name="plus" size={20} color={children == 10 ? colors.inActive : colors.active} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{
            paddingBottom: 18,
            paddingHorizontal: 18,
            paddingTop: 26,
            borderTopWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)'
          }}>
            <TouchableOpacity onPress={() => hideModal()} style={{
              backgroundColor: colors.button,
              padding: 10,
              borderRadius: 5,
            }}>
              <Text
                className="text-white text-center font-semibold text-[18px]"
              >Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default HomeScreen