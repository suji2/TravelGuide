import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import travel from '../assets/travel.json';

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 저장
    const [matchingDestinations, setMatchingDestinations] = useState([]); //검색결과 저장

    const navigateToRecommend = () => {
        navigation.navigate('Recommend');
    };

    const searchTravel = () => { //여행지 검색 함수
        // 이상한 검색어를 체크할 정규 표현식 (예: 숫자, 특수 문자, 공백만 포함되면 이상한 검색어로 처리)
        const invalidSearch = /^[0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]+$/;

        if (searchQuery.length > 0 && !invalidSearch.test(searchQuery)) {
            const searchResults = travel.filter(destination => {
                return destination.address.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setMatchingDestinations(searchResults);
        } else {
            setMatchingDestinations([]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>여행지 찾기</Text>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="지역 이름을 입력하세요."
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={searchTravel}>
                        <Text style={styles.buttonText}>검색</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.recommendButton} onPress={navigateToRecommend}>
                        <Text style={styles.buttonText}>추천 여행지 보기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.resultContainer}>
                {matchingDestinations.length > 0 ? (
                    <Text style={styles.resultText}>검색 결과 : </Text>
                ) : (
                    <Text style={styles.resultText}>
                        {searchQuery.length === 0
                            ? ""
                            : "검색 결과가 없습니다."}
                    </Text>
                )}
                {matchingDestinations.map((destination, index) => (
                    <View key={index} style={styles.destinationItem}>
                        <Text style={styles.destinationName}>여행지 : {destination.name}</Text>
                        <Text style={styles.destinationAddress}>주소 : {destination.address}</Text>
                        <Text style={styles.destinationCall}>전화번호 : {destination.call}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2', // 배경색 추가
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 가로로 공간을 균등하게 배분
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: 'white', // 입력 필드에 배경색 추가
        borderRadius: 5, // 입력 필드 모서리 둥글게 만들기
    },
    searchButton: {
        backgroundColor: '#87CEEB',
        padding: 10,
        borderRadius: 30,
        marginRight: 7,
    },
    recommendButton: {
        backgroundColor: '#87CEEB',
        padding: 10,
        borderRadius: 30,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        flex: 1, // 스크롤이 필요할 때 화면 내에서 스크롤되도록 함
        marginTop: 10, // 결과 컨테이너의 위쪽에 간격 추가
    },
    resultText: {
        fontSize: 18,
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
        marginBottom: 5,
    },
});

export default SearchScreen;
