import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, title, className }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={`px-4 py-2 bg-blue-500 rounded-lg ${className}`}
    >
      <Text className="text-white text-center font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;