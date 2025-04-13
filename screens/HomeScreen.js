import { View, Text } from 'react-native';
import Button from '../components/Button';  // Fixed import path

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Welcome to Home Screen</Text>
      <Button 
        title="Click Me" 
        onPress={() => alert('Button pressed!')}
        className="w-32"
      />
    </View>
  );
};

export default HomeScreen;