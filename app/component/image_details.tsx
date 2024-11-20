import React from 'react';
import { View, Text, Image as RNImage, StyleSheet } from 'react-native';
import Image from '@/domain/model/Image';
import { ScrollView } from 'react-native';

const ImageDetails = ({ image }: { image: Image }) => {
    if (!image) {
        return <Text>No image data available</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{image.title}</Text>
            <RNImage source={{ uri: image.url }} style={styles.image} />
            <Text style={styles.date}>Date: {image.date.toDateString()}</Text>
            <Text style={styles.explanation}>{image.explanation}</Text>
            <Text style={styles.copyright}>Copyright: {image.copyright || 'N/A'}</Text>
            <Text style={styles.mediaType}>Media Type: {image.media_type}</Text>
            <Text style={styles.serviceVersion}>Service Version: {image.service_version}</Text>
            <Text style={styles.hdurl}>HD URL: {image.hdurl}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
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
