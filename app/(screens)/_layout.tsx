import { Stack } from 'expo-router';

export default function ScreenViews() {

    return (
        <Stack>
            <Stack.Screen name="(chat)" options={{headerShown: false}} />
            <Stack.Screen name="(community)" options={{headerShown: false}} />
            <Stack.Screen name="(home)" options={{headerShown: false}} />
            <Stack.Screen name="(profile)" options={{headerShown: false}} />
        </Stack>      
    );

};