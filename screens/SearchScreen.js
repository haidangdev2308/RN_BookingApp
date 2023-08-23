import {
    View,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { data } from '../data'
import { SearchResult } from '../components';


const SearchScreen = () => {

    const nav = useNavigation()
    const [searchInput, setSearchInput] = useState('')

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View>
                <Pressable
                    className='mx-5 mt-11 border-[4px] rounded-xl border-[#ffb700] flex-row  items-center'
                    style={{
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 5,
                        elevation: 8,
                    }}
                >
                    <TouchableOpacity onPress={() => {
                        nav.goBack()
                    }}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" style={{ padding: 12 }} />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={(text) => { setSearchInput(text) }}
                        selectionColor='black' style={{ marginStart: 10, width: 300 }}
                        placeholderTextColor={'rgba(0,0,0,0.2)'}
                        placeholder='Nhập điểm đến' />
                </Pressable>
            </View>
            <SearchResult data={data} input={searchInput} setInput={setSearchInput} />
        </SafeAreaView>
    )
}

export default SearchScreen