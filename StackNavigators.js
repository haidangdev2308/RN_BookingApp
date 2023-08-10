import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import {
    BookingScreen,
    HomeScreen,
    PlaceScreen,
    ProfileScreen,
    SavedScreen,
    SearchScreen,
    MapScreen,
    PropertyInfoScreen,
    RoomsScreen,
    UserScreen,
    PhotoScreen

} from './screens'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './constants';

const StackNavigators = () => {
    const tab = createBottomTabNavigator()
    const stack = createNativeStackNavigator()


    const screenOptions = ({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarBackground: () => {
            <View style={{ backgroundColor: 'white', flex: 1, }} />
        },
    })

    const BottomTab = () => {
        return <tab.Navigator screenOptions={screenOptions}>
            <tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: 'Tìm kiếm',
                tabBarLabelStyle: {
                    fontWeight: 500
                },
                tabBarIcon: ({ focused }) =>
                    focused ? <Ionicons name="md-search-circle-sharp" size={33} color={colors.primary} />
                        : <Ionicons name="md-search-circle-outline" size={33} color="black" />
            }}
            />
            <tab.Screen name='Saved' component={SavedScreen} options={{
                tabBarLabel: 'Đã lưu',
                tabBarLabelStyle: {
                    fontWeight: 500
                },
                tabBarIcon: ({ focused }) =>
                    focused ? <AntDesign name="heart" size={24} color={colors.primary} />
                        : <AntDesign name="hearto" size={24} color="black" />
            }} />
            <tab.Screen name='Bookings' component={BookingScreen} options={{
                tabBarLabel: 'Đặt chỗ',
                tabBarLabelStyle: {
                    fontWeight: 500
                },
                tabBarIcon: ({ focused }) =>
                    focused ? <Ionicons name="notifications" size={24} color={colors.primary} />
                        : <Ionicons name="notifications-outline" size={24} color="black" />
            }} />
            <tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarLabel: 'Cá nhân',
                tabBarLabelStyle: {
                    fontWeight: 500
                },
                tabBarIcon: ({ focused }) =>
                    focused ? <Ionicons name="person" size={24} color={colors.primary} />
                        : <Ionicons name="person-outline" size={24} color="black" />
            }} />
        </tab.Navigator>
    }

    return <NavigationContainer>
        <stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
            <stack.Screen name={'Main'} component={BottomTab} />
            <stack.Screen name={'SearchScreen'} component={SearchScreen} />
            <stack.Screen name={'PlaceScreen'} component={PlaceScreen} />
            <stack.Screen name={'MapScreen'} component={MapScreen} />
            <stack.Screen name={'PropertyInfoScreen'} component={PropertyInfoScreen} />
            <stack.Screen name={'RoomsScreen'} component={RoomsScreen} />
            <stack.Screen name={'UserScreen'} component={UserScreen} />
            <stack.Screen name={'PhotoScreen'} component={PhotoScreen} />
        </stack.Navigator>
    </NavigationContainer>
}

export default StackNavigators