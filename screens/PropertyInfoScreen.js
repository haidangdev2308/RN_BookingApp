import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const PropertyInfoScreen = () => {

    const route = useRoute()

    const {
        name,rating, oldPrice, newPrice,
        photos, room, adult, children,
        selectedDate, availableRoom
    } = route.params

    return (
        <SafeAreaView>
            <Text>PropertyInfoScreen</Text>
        </SafeAreaView>
    )
}

export default PropertyInfoScreen