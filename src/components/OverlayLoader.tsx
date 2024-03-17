import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';

function OverlayLoader(): React.JSX.Element {
    return (
        <View style={styles.overlay} >
            <ActivityIndicator size='large' color={'red'} style={{ width: "50%", height: "50%" }} />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: "100%",
        height: "100%",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default OverlayLoader;
