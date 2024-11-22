import React from "react";
import { Text, Button, useTheme } from "react-native-paper";
import Image from "@/domain/model/Image";
import { ScrollView, Image as RNImage, StyleSheet, Share } from "react-native";

const ImageDetails = ({ image }: { image: Image }) => {
    const theme = useTheme();
    if (!image) {
        return <Text>No image data available</Text>;
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this image: ${
                    image.title
                }\nDate: ${image.date.toDateString()}\nExplanation: ${
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
        <ScrollView style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <Text style={styles.title}>{image.title}</Text>
            <RNImage
                source={{ uri: image.url }}
                style={styles.image}
                loadingIndicatorSource={require("@/assets/loading.gif")}
            />
            <Text style={styles.date}>Date: {image.date.toDateString()}</Text>
            <Text style={styles.explanation}>{image.explanation}</Text>
            <Text style={styles.copyright}>
                Copyright: {image.copyright || "N/A"}
            </Text>
            <Text style={styles.mediaType}>Media Type: {image.media_type}</Text>
            <Text style={styles.serviceVersion}>
                Service Version: {image.service_version}
            </Text>
            <Text style={styles.hdurl}>HD URL: {image.hdurl}</Text>
            <Button onPress={onShare}>Share</Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
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
        fontSize: 16,
        marginBottom: 10,
    },
    mediaType: {
        fontSize: 16,
        marginBottom: 10,
    },
    serviceVersion: {
        fontSize: 16,
        marginBottom: 10,
    },
    hdurl: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default ImageDetails;
