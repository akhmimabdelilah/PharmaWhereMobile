import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('http://192.168.1.55:8090/pharmacie/');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <Text style={styles.baseText}>Pharmacies les plus proches a vous :</Text>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.push('MapDetails', item)}>
                            <View style={styles.item}>
                                <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,'+item.image }} />
                                <View style={styles.separator}>
                                    <Text style={styles.titleText}>{item.nom}</Text>
                                    <Text style={styles.baseText}>{item.adresse}</Text>
                                    
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            )}
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 90,
        height: 90,
        marginRight: 15,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    baseText: {
        fontWeight: "normal"
    },
    separator: {
        flexDirection: 'column',
    }
})

