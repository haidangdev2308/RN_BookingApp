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
import { savedPlaces } from '../SavedReducer';
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Feather } from '@expo/vector-icons';

const SavedScreen = () => {
  return (
    <View>
      <Text>SavedScreen</Text>
    </View>
  )
}

export default SavedScreen