import { Stack } from "expo-router";
import { PaperProvider, useTheme } from "react-native-paper";

export default function RootLayout() {
    const theme = useTheme();
    return (
        <PaperProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false, statusBarStyle: theme.dark ? "light" : "dark" }}
                />
            </Stack>
        </PaperProvider>
    );
}
