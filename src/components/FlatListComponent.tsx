import React, { useState } from "react";
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import hotelImage from '../assets/images/getsetgo.png';
import flightImg from '../assets/images/airplane_icon.png';
import moment from "moment";
import AwesomeAlert from 'react-native-awesome-alerts';
import ICChecklist from '../assets/images/ic-checklist.png';

function FlatListScreen({ list }): React.JSX.Element {

    const [awesomeAlert, setAwesomeAlert] = useState(false);
    const handlePayment = () => {
        setAwesomeAlert(!awesomeAlert);
    };

    const handleduration = (duration: any) => {
        return duration.replace("hours", "hrs").replace("minutes", "min").replace("hour", "hr");
    }

    return (
        <>
            <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.mainStyle}>
                        <TouchableOpacity onPress={handlePayment}>
                            <View style={{ flexDirection: 'row', alignItems: "center", paddingBottom: 10 }}>
                                <View style={{ width: 30, height: 30 }}>
                                    <Image
                                        source={hotelImage}
                                        resizeMode="contain"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </View>
                                <Text style={{ fontSize: 15, color: "#000", marginLeft: 12, fontWeight: 'bold' }}>{item.airline}</Text>
                                <Text style={{ color: 'grey', marginHorizontal: 10, fontSize: 12, paddingHorizontal: 8, borderRadius: 10 }}>{item.flightNumber}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                <View style={{ flexDirection: "column", alignItems: 'center', width: '24%' }}>
                                    <Text style={{ fontSize: 16, color: "black" }}>{item.origin}</Text>
                                    <Text style={{ fontSize: 12, color: "black" }}>{(moment(item.departureTime).format('hh:mm A'))}</Text>
                                </View>

                                <View style={{ flexDirection: "column", alignItems: "center" }}>
                                    <View style={{ width: 100, height: 45 }}>
                                        <Image
                                            source={flightImg}
                                            resizeMode="contain"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </View>
                                    <Text style={{ fontSize: 14, color: "gray" }}>{handleduration(item.duration)}</Text>
                                </View>

                                <View style={{ flexDirection: "column", alignItems: 'center', width: '24%' }}>
                                    <Text style={{ fontSize: 16, color: "black" }}>{item.destination}</Text>
                                    <Text style={{ fontSize: 12, color: "black" }}>{(moment(item.arrivalTime).format('hh:mm A'))}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: 'center', width: '20%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: "green" }}>₹{item.price}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%", alignItems: "center", borderTopColor: 'black', borderTopWidth: 0.5, marginTop: 8, paddingTop: 8, paddingHorizontal: 8 }}>
                                <Text style={{ fontSize: 16, color: "black" }}><Text style={{ fontSize: 14, color: "grey" }}>Gate:</Text> {item.gate}</Text>
                                <Text style={{ fontSize: 16, color: "black" }}><Text style={{ fontSize: 14, color: "grey" }}>Available Seats:</Text> {item.seatsAvailable}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <AwesomeAlert
                show={awesomeAlert}
                showProgress={false}
                closeOnTouchOutside={true}
                customView={
                    <View style={styles.alert}>
                        <Image source={ICChecklist} style={styles.alertImage} />
                        <Text style={styles.alertTitle}>Hurray!!</Text>
                        <Text style={styles.alertText}>Your flight ticket is confirmed</Text>
                    </View>
                }
            />
        </>
    )
}
const styles = StyleSheet.create({
    mainStyle: {
        width: '100%',
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    alert: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    alertImage: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 120,
        height: 120,
        marginBottom: 20,
        marginTop: 30,
    },
    alertTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 20,
        color:'black'
    },
    alertText: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 30,
        color:'black'
    },
})

export default FlatListScreen;