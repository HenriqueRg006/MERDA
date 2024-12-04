import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Tabs } from "expo-router";


export default function RootLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
            height: 70,    
            backgroundColor: '#f8f8f8', 
            },
        }}> 
            <Tabs.Screen name="index" options={{
                tabBarLabel: "Início",
                tabBarLabelStyle: {fontSize: 15, color:"#252525"},
                tabBarIcon: () => (
                <FontAwesome6 name="house" size={22} color="black" />    
                ),
            }} />

            <Tabs.Screen name="menu" options={{
                tabBarLabel:"Menu",
                tabBarLabelStyle: {fontSize: 15, color:"#252525"},
                tabBarIcon: () => (
                <SimpleLineIcons name="menu" size={21} color="black" />   
                ),
            }}/> 

            <Tabs.Screen name="favoritos" options={{
                tabBarLabel:"Favoritos",
                tabBarLabelStyle: {fontSize: 15, color:"#252525"},
                tabBarIcon: () => (
                <Fontisto name="heart" size={21} color="red" />  
                ),
            }}/> 
        </Tabs>
    )
}