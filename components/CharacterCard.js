import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

/**
 * Renders a character card with an image, an indicator, and a name.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {any} props.image - The image source for the character (compatible with React Native Image).
 * @param {string} props.indicatorColor - The background color for the indicator circle.
 * @param {React.ReactNode} props.indicatorContent - The content to display inside the indicator (e.g., an icon or text).
 * @param {string} [props.name] - The name of the character to display below the image.
 * @returns {JSX.Element} The rendered character card component.
 */
const CharacterCard = ({ image, indicatorColor, indicatorContent, name }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CharacterDetail", { name })}
      className="items-center"
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={image}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40, // Makes the image circular
            // backgroundColor: bgColor, // Optional: background color behind image
          }}
          resizeMode="cover"
        />
        <View
          className="absolute bottom-0 right-0 w-5 h-5 rounded-full items-center justify-center"
          style={{ backgroundColor: indicatorColor }}
        >
          {indicatorContent}
        </View>
      </View>
      {name && <Text className="mt-1 text-xs text-center">{name}</Text>}
    </TouchableOpacity>
  );
};

export default CharacterCard;
