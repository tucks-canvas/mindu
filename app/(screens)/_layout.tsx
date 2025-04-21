import { Stack } from 'expo-router';

export default function ScreenViews() {

    return (
        <Stack>
            <Stack.Screen name="home" options={{headerShown: false}} />
            <Stack.Screen name="details" options={{headerShown: false}} />
            <Stack.Screen name="chat" options={{headerShown: false}} />
            <Stack.Screen name="signin" options={{headerShown: false}} />
            <Stack.Screen name="signout" options={{headerShown: false}} />
        </Stack>      
    );
    
};