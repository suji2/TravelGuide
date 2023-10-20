import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import travel from '../assets/travel.json';

const RecommendScreen = () => {
    const [randomDestinations, setRandomDestinations] = useState([]); //추천된 여행지 정보 저장

    const getRandomTravel = () => { //랜덤 여행지 추천함수
        const numRecommendations = 3; //랜덤으로 3개
        const recommendations = [];

        while (recommendations.length < numRecommendations) {
            const randomIndex = Math.floor(Math.random() * travel.length);
            recommendations.push(travel[randomIndex]);
        }

        setRandomDestinations(recommendations);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>여행지 추천</Text>
            <Text style={styles.message}>
                여행을 떠나기 좋은 날입니다! 아래 버튼을 누르면 랜덤으로 3가지 여행지를 추천해 드립니다.</Text>
            <TouchableOpacity style={styles.button} onPress={getRandomTravel}>
                <Text style={styles.buttonText}>추천 여행지 보기</Text>
            </TouchableOpacity>
            {randomDestinations.length > 0 && (
                <View style={styles.destinationContainer}>
                    <Text style={styles.destinationTitle}>추천 여행지</Text>
                    {randomDestinations.map((destination, index) => (
                        <View key={index} style={styles.destinationItem}>
                            <Text style={styles.destinationName}>여행지 : {destination.name}</Text>
                            <Text style={styles.destinationAddress}>주소 : {destination.address}</Text>
                            <Text style={styles.destinationCall}>전화번호 : {destination.call}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    message: {
        fontSize: 18,
        marginBottom: 30,
        color: '#333', // 원하는 텍스트 색상
        textAlign: 'center', // 텍스트 중앙 정렬
    },
    button: {
        backgroundColor: '#87CEEB',
        padding: 10,
        borderRadius: 30,
        marginBottom: 30,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    destinationContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    destinationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    destinationItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    destinationName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    destinationAddress: {
        fontSize: 14,
        marginBottom: 5,
    },
    destinationCall: {
        fontSize: 14,
        marginBottom: 10,
    },
});

export default RecommendScreen;
