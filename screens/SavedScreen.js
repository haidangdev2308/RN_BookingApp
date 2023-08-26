import {
  View, Text, SafeAreaView, TouchableOpacity,
  ScrollView, TextInput, Platform, Pressable, Image, Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { savedPlaces } from '../SavedReducer';
import { collection, getDoc, doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SaveProperty } from '../components';


const SavedScreen = () => {
  // const newSaving = useSelector((state) => state.saving.saving)
  // const [saveList, setSaveList] = useState([]);

  const [oldSaveList, setOldSaveList] = useState([]);
  const [loading, setLoading] = useState(true);
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const { width, height } = Dimensions.get('window')
  const uid = auth.currentUser.uid;
  const userDocRef = doc(db, 'user', uid); 

  useEffect(() => {


    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const saveDetailsFromFirebase = docSnapshot.data().SavedList || [];
        setOldSaveList(saveDetailsFromFirebase);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe(); // Clear subscription khi component bị unmount
    };
  }, []);

  // useEffect(() => {
  //   const newCombineSaveList = [...oldSaveList, ...newSaving];
  //   console.log(oldSaveList);
  //   setSaveList(newCombineSaveList);
  // }, [oldSaveList, newSaving]);



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
          Chuyến đi sắp tới của tôi
        </Text>
      </View>
      <ScrollView className='flex-1  p-[15px]'>
        {

          loading ? (
            <View className='mt-10 flex-row justify-center items-center'>
              <Text className='mr-4'>Đang tải</Text>
              <Feather name="loader" size={24} color={colors.active} />
            </View>
          ) : oldSaveList.length > 0 && oldSaveList.map((item, index) =>
            <SaveProperty key={index} item={item} />
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default SavedScreen