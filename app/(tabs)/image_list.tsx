import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    Image as RNImage,
    StyleSheet,
} from "react-native";
import { Text, ActivityIndicator, useTheme } from "react-native-paper";
import GetImagesOnDateRange from "@/domain/use_case/GetImageOnDateRange";
import ImageService from "@/data/service/ImageService";
import Image from "@/domain/model/Image";
import { useRouter } from "expo-router";
import DateFormatter from "@/utils/DateFormatter";

export default function ImageList() {
    const theme = useTheme();
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<Date>(new Date());
    let startDateTmp = new Date(endDate);
    startDateTmp.setMonth(startDateTmp.getMonth() - 1);
    const [startDate, setStartDate] = useState<Date>(startDateTmp);

    const router = useRouter();

    const getImages = async () => {
        setLoading(true);
        try {
            const newImages = await new GetImagesOnDateRange(
                ImageService.instance
            ).execute(startDate, endDate);
            setImages((prevImages) => [...prevImages, ...newImages]);
        } catch (err) {
            setError("Error loading images");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    const handleLoadMore = () => {
        endDate.setDate(startDate.getDate() - 1);
        endDate.setMonth(endDate.getMonth() - 1);
        startDate.setDate(endDate.getDate());
        startDate.setMonth(startDate.getMonth() - 1);
        setStartDate(startDate);
        setEndDate(endDate);

        getImages();
    };

    const handleImagePress = (image: Image) => {
        router.push({
            pathname: "/image-details",
            params: { date: image.date.toISOString() },
        });
    };

    const renderItem = ({ item }: { item: Image }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
            <RNImage source={{ uri: item.url }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}
        >
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => DateFormatter.formatDate(item.date)}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    error ? (
                        <View
                            style={{
                                ...styles.errorContainer,
                                backgroundColor: theme.colors.background,
                            }}
                        >
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : loading ? (
                        <View
                            style={{
                                ...styles.loadingContainer,
                                backgroundColor: theme.colors.background,
                            }}
                        >
                            <ActivityIndicator />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 10,
    },
    footer: {
        paddingVertical: 20,
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
