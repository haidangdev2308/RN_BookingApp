import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { pixelNormalize } from '../components';

const PhotoScreen = () => {
    const nav = useNavigation()
    const route = useRoute()
    const { photos, name } = route.params

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View style={{
                backgroundColor: colors.primary,
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',

            }}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white"
                        style={{
                            padding: 12,
                            marginTop: 20,
                            marginStart: 10
                        }} />
                </TouchableOpacity>
                <View style={{
                    marginStart: 18, width: 300, marginTop: 20,
                }}>
                    <Text
                        numberOfLines={1} ellipsizeMode='tail'
                        style={{ fontSize: 16, color: 'white', fontWeight: 600, marginStart: 18, width: 300 }}>{name}</Text>
                </View>
            </View>
            <ScrollView className='flex-row flex-wrap p-[20px] flex-1'>
                {
                    photos.map((photo, index) => (
                        <View key={index} className='mr-[10px] mb-[30px]'>
                            <Image
                                style={{
                                    width: pixelNormalize(320),
                                    height: pixelNormalize(240),
                                    borderRadius: pixelNormalize(4),
                                }}
                                source={{ uri: photo.image }}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PhotoScreen