import { Stack } from "expo-router";
import { PaperProvider, useTheme } from "react-native-paper";

export default function RootLayout() {
    const theme = useTheme();
    return (
        <PaperProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    statusBarStyle: theme.dark ? "light" : "dark",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: theme.colors.onPrimary,
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="[image-details]"
                    getId={({ params }) => params?.date}
                    options={{
                        headerShown: true,
                        headerTitle: "Image Details",
                    }}
                />
            </Stack>
        </PaperProvider>
    );
}
