import React from "react";
import { Text, Button, useTheme, IconButton } from "react-native-paper";
import Image from "@/domain/model/Image";
import {
    ScrollView,
    Image as RNImage,
    StyleSheet,
    Share,
    View,
    Linking,
} from "react-native";

const ImageDetails = ({ image }: { image: Image }) => {
    const theme = useTheme();
    if (!image) {
        return <Text>No image data available</Text>;
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this image from NASA:\n\n${
                    image.title
                }\nDate: ${image.date.toDateString()}\n\nExplanation: ${
                    image.explanation
                }\nHD URL: ${image.hdurl}`,
                url: image.url,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert("Error sharing image.");
        }
    };

    return (
        <ScrollView
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}
        >
            <View style={styles.header}>
                <Text selectable style={styles.title}>
                    {image.title}
                </Text>
                <IconButton
                    icon="share"
                    size={30}
                    onPress={onShare}
                    iconColor={theme.colors.primary}
                />
            </View>

            <RNImage
                source={{ uri: image.url }}
                style={styles.image}
                loadingIndicatorSource={require("@/assets/loading.gif")}
            />
            <View style={{ flexDirection: "row" }}>
                <Text selectable style={{ ...styles.date, fontWeight: "bold" }}>
                    Date:{" "}
                </Text>
                <Text selectable style={styles.date}>
                    {image.date.toDateString()}
                </Text>
            </View>
            <Text selectable style={styles.explanation}>
                {image.explanation}
            </Text>
            <View>
                <Text selectable style={styles.copyright}>
                    Copyright: {image.copyright?.trim() || "N/A"}
                </Text>
                <Text selectable style={styles.mediaType}>
                    Media Type: {image.media_type}
                </Text>
                <Text style={styles.serviceVersion}>
                    Service Version: {image.service_version}
                </Text>
                <Text
                    selectable
                    style={styles.hdurl}
                    onPress={() => Linking.openURL(image.hdurl)}
                >
                    HD URL:{" "}
                    <Text style={{ color: theme.colors.primary }}>
                        {image.hdurl}
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    image: {
        width: "100%",
        height: 300,
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        marginBottom: 10,
    },
    explanation: {
        fontSize: 16,
        marginBottom: 10,
    },
    copyright: {
        fontSize: 12,
    },
    mediaType: {
        fontSize: 12,
    },
    serviceVersion: {
        fontSize: 12,
    },
    hdurl: {
        fontSize: 12,
        marginBottom: 15,
    },
});

export default ImageDetails;
