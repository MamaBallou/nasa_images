import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    Image as RNImage,
    StyleSheet,
} from "react-native";
import {
    Text,
    ActivityIndicator,
    useTheme,
    Switch,
    Button,
} from "react-native-paper";
import GetImagesOnDateRange from "@/domain/use_case/GetImageOnDateRange";
import ImageService from "@/data/service/ImageService";
import Image from "@/domain/model/Image";
import { useRouter } from "expo-router";
import DateFormatter from "@/utils/DateFormatter";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { MIN_DATE } from "@/constants/date-range";


var endDate = new Date();
var startDate = new Date(endDate);
startDate.setMonth(startDate.getMonth() - 1);
export default function ImageList() {
    const theme = useTheme();
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filterImage, setFilterImage] = useState<boolean>(false);
    const [minDate, setMinDate] = useState<Date>(MIN_DATE);
    const [maxDate, setMaxDate] = useState<Date>(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    var stillImagesToLoad: boolean = true;

    const router = useRouter();

    const getImages = async () => {
        console.log("getImages");
        console.log(startDate, endDate);
        if (!stillImagesToLoad) {
            return;
        }
        setLoading(true);
        try {
            const newImages = await new GetImagesOnDateRange(
                ImageService.instance
            ).execute(startDate, endDate);
            setImages((prevImages) => [...prevImages, ...newImages]);
        } catch (err) {
            setError("Error loading images");
        } finally {
            if (
                startDate.getDate() === minDate.getDate() &&
                startDate.getMonth() === minDate.getMonth() &&
                startDate.getFullYear() === minDate.getFullYear()
            ) {
                stillImagesToLoad = false;
            }
            setLoading(false);
        }
    };

    const reloadImages = () => {
        console.log("Reloading images");
        setImages([]); // Reset the images array
        endDate = new Date(maxDate);
        startDate = new Date(maxDate);
        startDate.setMonth(startDate.getMonth() - 1);
        if (startDate < minDate) {
            startDate = new Date(minDate);
        }
        stillImagesToLoad = true;
        getImages(); // Fetch new images
    };

    useEffect(() => {
        reloadImages();
    }, []);

    const handleLoadMore = () => {
        if (loading) return;
        console.log("handleLoadMore");
        console.log(startDate, endDate);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() - 1);

        startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 1);
        console.log(startDate, endDate);

        getImages();
    };

    const handleImagePress = (image: Image) => {
        router.push({
            pathname: "/image-details",
            params: { date: image.date.toISOString() },
        });
    };

    const onChangeStartDate = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined
    ) => {
        let currentDate = selectedDate || startDate;
        if (currentDate > new Date()) {
            currentDate = new Date();
        }
        if (currentDate > maxDate) {
            setMaxDate(currentDate);
        }
        setMinDate(currentDate);
        setShowStartDatePicker(false);
        reloadImages();
    };

    const onChangeEndDate = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined
    ) => {
        let currentDate: Date = selectedDate || endDate;
        if (currentDate > new Date()) {
            currentDate = new Date();
        }
        if (currentDate < minDate) {
            setMinDate(currentDate);
        }
        setMaxDate(currentDate);
        setShowEndDatePicker(false);
        reloadImages();
    };

    const DatePickers = () => {
        return (
            <View>
                <Text>Start Date:</Text>
                <Button onPress={() => setShowStartDatePicker(true)}>
                    {DateFormatter.formatDate(minDate)}
                </Button>
                {showStartDatePicker && (
                    <DateTimePicker
                        testID="startDatePicker"
                        value={minDate}
                        mode="date"
                        display="default"
                        onChange={onChangeStartDate}
                    />
                )}
                <Text>End Date:</Text>
                <Button onPress={() => setShowEndDatePicker(true)}>
                    {DateFormatter.formatDate(maxDate)}
                </Button>
                {showEndDatePicker && (
                    <DateTimePicker
                        testID="endDatePicker"
                        value={maxDate}
                        mode="date"
                        display="default"
                        onChange={onChangeEndDate}
                    />
                )}
            </View>
        );
    };

    const renderItem = ({ item }: { item: Image }) => (
        <TouchableOpacity
            onPress={() => handleImagePress(item)}
            style={styles.imageContainer}
        >
            <RNImage source={{ uri: item.url }} style={styles.image} />
            <View style={styles.dateOverlay}>
                <Text style={styles.dateText}>{item.date.toDateString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}
        >
            <Switch
                value={filterImage}
                onValueChange={(value) => {
                    console.log(value);
                    setFilterImage(value);
                    reloadImages();
                }}
            />
            {filterImage && <DatePickers />}
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
    imageContainer: {
        position: "relative",
    },
    dateOverlay: {
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
        padding: 5,
        borderRadius: 5,
    },
    dateText: {
        color: "white",
        fontSize: 14,
    },
});
