import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    Modal
} from "react-native";
import TopBarComponent from "../components/TopBarComponent";
import { metrices } from "../assets/metrices";
import FlatListScreen from "../components/FlatListComponent";
import OverlayLoader from "../components/OverlayLoader";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from 'react-native-vector-icons/Entypo';

function FlightListScreen() {

    const [flightData, setFlightData] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false)
    const flightListData = useSelector((state) => state?.FlightList?.data)

    const callingFlightLists = async () => {
        if (Array.isArray(flightListData)) {
            setFlightData(flightListData)
        }
        else {
            setFlightData([])
        }
    }
    useEffect(() => {
        callingFlightLists();
    }, [])
    let uniqueAirlines = new Set();
    flightListData.forEach((flight: { airline: string; }) => {
        uniqueAirlines.add(flight.airline);
    });
    let airLineData = Array.from(uniqueAirlines);

    const handleChange = (data: any) => {
        const arry = flightListData.slice();
        let filterdata;
        { (data == "Cheap") ? filterdata = arry.sort((A: { price: number; }, B: { price: number; }) => A.price - B.price) : null }
        { (data == 'Highest') ? filterdata = arry.sort((A: { price: number; }, B: { price: number; }) => B.price - A.price) : null }
        { (data === 'Reset') ? filterdata = flightListData : null }
        setFlightData(filterdata);
        setShowFilterModal(false)
    }

    const themeForList = {
        color: "black",
        fontSize: 14,
        fontFamily: "Roboto-Regular",
    }

    const handleChangeFlight = (value: any) => {
        const arry = flightListData.slice()
        setFlightData(arry.filter((a: { airline: any; }) => (((a.airline).toUpperCase()).localeCompare(value.toUpperCase()) === 0)));
        setShowFilterModal(false)
    }

    return (
        <SafeAreaView>
            <TopBarComponent title={"Flight Lists"} backIcon={true} />
            <View style={styles.containerList}>
                {flightData.length ?
                    <FlatListScreen list={flightData} /> : <OverlayLoader />}
            </View>
            <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles.sortContainer}>
                <Text style={styles.sortText}>SORT & FILTERS</Text>
            </TouchableOpacity>
            <Modal
                visible={showFilterModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setShowFilterModal(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.MainAlertView, { paddingBottom: 30, paddingHorizontal: 20 }]}>
                        <View style={styles.headerStyle}>
                            <Text style={{ fontSize: 20, color: 'orange' }}>Sort by price</Text>
                            <TouchableOpacity onPress={() => { setShowFilterModal(false), handleChange("Reset") }}>
                                <Entypo name="squared-cross" color="#eb2640" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.touchContainer}>
                            <TouchableOpacity onPress={() => handleChange("Cheap")} style={styles.filterButtonStyle}>
                                <Text style={styles.fliterFontStyle}>Low - High</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleChange("Highest") }} style={styles.filterButtonStyle}>
                                <Text style={styles.fliterFontStyle}>High - low</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerStyle}>
                            <Text style={{ fontSize: 20, color: 'orange' }}>Filter by airlines</Text>
                        </View>
                        <View style={styles.touchContainer}>
                            <Dropdown
                                style={{ width: "100%", backgroundColor: 'lightgrey', alignSelf: "center", borderRadius: 8, padding: 10 }}
                                placeholderStyle={{ color: 'black', fontSize: 16 }}
                                selectedTextStyle={{ color: 'black', fontSize: 16 }}
                                data={airLineData.map(airline => ({ label: airline }))}
                                dropdownPosition={"top"}
                                maxHeight={350}
                                itemTextStyle={themeForList}
                                labelField="label"
                                valueField="label"
                                onChange={item => { handleChangeFlight(item.label), setShowFilterModal(false) }}
                                placeholder={"Select Air Lines"}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    containerList: {
        width: '100%',
        height: metrices(82),
        paddingHorizontal: 10,
        paddingTop: 10
    },
    sortContainer: {
        height: metrices(8),
        padding: 10,
        backgroundColor: 'blue',
        justifyContent: "space-evenly",
        borderTopLeftRadius: 10,
        borderTopEndRadius: 10
    },
    sortText: {
        width: "50%",
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        alignSelf: "center"
    },
    centeredView: {
        flex: 1,
        alignItems: "baseline",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    headerStyle: {
        paddingHorizontal: 6,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%"
    },
    touchContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        marginTop: 10
    },
    dropText: {
        color: 'red',
        fontSize: 10
    },
    MainAlertView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        width: '100%',
    },
    header: {
        color: "black",
        padding: "4%",
        alignItems: "center",
        flexDirection: "row"
    },
    fliterFontStyle: {
        fontSize: 16,
        color: 'black',
        paddingVertical: 8,
        marginLeft: 5
    },
    filterButtonStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "48%",
        backgroundColor: 'lightGray'
    },
    filterButtonStylestop: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "30%",
        backgroundColor: 'lightGray'
    }
});
export default FlightListScreen;
