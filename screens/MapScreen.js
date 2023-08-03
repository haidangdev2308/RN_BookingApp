import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { colors } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const MapScreen = () => {
    const mapView = useRef(null)
    const route = useRoute()
    const nav = useNavigation()

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const coordinate = []
    const details = route.params.searchResult

        .map((item) => item.properties.map((property) =>
            coordinate.push({
                latitude: Number(property.latitude),
                longitude: Number(property.longitude)
            })
        ))

    useEffect(() => {
        mapView.current.fitToCoordinates(coordinate, {
            edgePadding: {
                top: 190,
                left: 190,
                right: 190,
                bottom: 190
            }
        })
    }, [])

    return (
        <View>
            <Pressable
                className='w-[370px] absolute top-[50px] 
                    left-[22px] z-10 border-[4px] rounded-xl
                    border-[#ffb700] flex-row  items-center'
                style={{
                    backgroundColor: 'white',
                }}
            >
                <TouchableOpacity onPress={() => {
                    nav.goBack()
                }}>
                    <AntDesign name="close" size={24} color="black" style={{ padding: 10 }} />
                </TouchableOpacity>
                <Text style={{ marginStart: 10 }}>{route.params.place}•{route?.params.selectedDate.startDate.slice(5)}-{route?.params.selectedDate.endDate.slice(5)}</Text>
            </Pressable>
            <MapView
                ref={mapView}
                style={{ width: '100%', height: '100%' }}>
                {
                    route.params.searchResult.map((item) => item.properties.map((property) => (
                        <Marker
                            key={property.id}
                            title={property.name}
                            coordinate={{
                                latitude: Number(property.latitude),
                                longitude: Number(property.longitude)
                            }}
                        >
                            <Pressable style={{
                                padding: 4,
                                backgroundColor: colors.primary,
                                borderRadius: 8,
                                borderWidth: 2,
                                borderColor: 'white'
                            }}>
                                <Text className='text-white font-bold'>VND {VND.format(property.newPrice)}</Text>
                            </Pressable>
                        </Marker>
                    )))
                }
            </MapView>
        </View>
    )
}

export default MapScreen