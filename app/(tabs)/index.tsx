import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator, useTheme } from "react-native-paper";
import React, { useEffect, useState } from "react";
import GetImageUseCase from "@/domain/use_case/GetImageUseCase";
import ImageService from "@/data/service/ImageService";
import Image from "@/domain/model/Image";
import ImageDetails from "@/app/component/image-component";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
    const theme = useTheme();
    const [image, setImage] = useState<Image | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageData = await new GetImageUseCase(
                    ImageService.instance
                ).execute(new Date());
                setImage(imageData);
            } catch (err) {
                setError("Error loading image data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View
                style={{
                    ...styles.loadingContainer,
                    backgroundColor: theme.colors.background,
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    ...styles.errorContainer,
                    backgroundColor: theme.colors.background,
                }}
            >
                <Text style={styles.errorText}>Error loading image data</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}
        >
            <SafeAreaView
                style={{
                    ...styles.container,
                    backgroundColor: theme.colors.background,
                }}
            >
                <View
                    style={{
                        ...styles.container,
                        backgroundColor: theme.colors.background,
                    }}
                >
                    <ImageDetails image={image!} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
});
