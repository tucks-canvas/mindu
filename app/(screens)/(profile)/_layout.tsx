import { Stack } from 'expo-router';

export default function ProfileViews() {

    return (
        <Stack>
            <Stack.Screen name="notifications" options={{headerShown: false}} />
            <Stack.Screen name="policy" options={{headerShown: false}} />
            <Stack.Screen name="preferences" options={{headerShown: false}} />
            <Stack.Screen name="about" options={{headerShown: false}} />
            <Stack.Screen name="listing" options={{headerShown: false}} />
            <Stack.Screen name="subscription" options={{headerShown: false}} />
            <Stack.Screen name="billinginfo" options={{headerShown: false}} />
            <Stack.Screen name="professional" options={{headerShown: false}} />
            <Stack.Screen name="faqs" options={{headerShown: false}} />
        </Stack>      
    );

};