import { ImageBackground } from "react-native";

const BackgroundImage = ({ overflow = "hidden", source, styles, resizeMode = "cover", height = "100%", width = "100%", children }) => {
    return (
        <ImageBackground
            source={{ uri: source }}
            style={[styles, { overflow }]}
            resizeMode={resizeMode}
        >
            {children}
        </ImageBackground>
    );
}

export default BackgroundImage;