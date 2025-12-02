import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "twrnc";
import { useTheme } from "../contexts";

const ChapterInfoBottomSheet = ({
  showInfoModal,
  setShowInfoModal,
  chapterTitle,
  chapterSummary,
  colors,
  textStyles,
}) => {
  return (
    <Modal
      isVisible={showInfoModal}
      onBackdropPress={() => setShowInfoModal(false)}
      onBackButtonPress={() => setShowInfoModal(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: colors.cardBg,
          padding: 30,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: "90%",
          height: "90%",
        }}
      >
        {/* Drag handle line */}
        <View
          style={{
            width: 50,
            height: 5,
            backgroundColor: "#888",
            borderRadius: 5,
            alignSelf: "center",
            marginBottom: 10,
          }}
        />

        {/* Close icon top right */}
        <TouchableOpacity
          onPress={() => setShowInfoModal(false)}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            padding: 6,
            backgroundColor: colors.background + "CC", // semi-transparent
            borderRadius: 14, // matches sheet radius feel
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.12,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
          }}
        >
          <Icon name="close" size={20} color={colors.primary} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              tw`text-xl font-bold mt-8 mb-4 text-center`,
              { color: colors.primary },
            ]}
          >
            {chapterTitle}
          </Text>

          <Text
            style={[
              tw`leading-6`,
              { color: colors.text, lineHeight: 26 },
              textStyles.body,
            ]}
          >
            {chapterSummary}
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ChapterInfoBottomSheet;
