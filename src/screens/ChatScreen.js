import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  FlatList,
  useTheme,
  Badge,
  Button,
} from "@gluestack-ui/themed-native-base";
import { Send } from "lucide-react-native";
import { mockData } from "../data/mockData";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const ChatScreen = () => {
  const { colors } = useTheme();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(mockData.chat_history);
  const flatListRef = useRef();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: message.trim(),
          isUser: true,
          timestamp: new Date(),
        },
        // Mock AI response for now
        {
          id: Date.now().toString() + "ai",
          text: "This is a mock AI response.",
          isUser: false,
          timestamp: new Date(),
          sources: ["DailyMed", "PubMed"],
        },
      ]);
      setMessage("");
    }
  };

  const renderTopBar = () => (
    <Box bg="white" px={4} py={3} shadow={2} zIndex={10}>
      <Text fontSize="xl" fontWeight="bold">
        AI Pharmacist
      </Text>
      <Text color="gray.600" fontSize="sm">
        Ask about drug interactions and supplement safety
      </Text>
    </Box>
  );

  const renderMessage = ({ item }) => (
    <HStack
      justifyContent={item.isUser ? "flex-end" : "flex-start"}
      alignItems="flex-start"
      mb={2}
      px={3}
    >
      <AnimatedBox
        entering={FadeIn}
        bg={item.isUser ? colors.primary[500] : "white"}
        p={3}
        rounded={item.isUser ? "2xl" : "2xl"}
        maxW="80%"
        shadow={1}
      >
        <Text color={item.isUser ? "white" : "gray.800"} fontSize="md">
          {item.text}
        </Text>
        <Text 
          color={item.isUser ? "white" : "gray.500"} 
          fontSize="xs" 
          mt={1}
          opacity={0.8}
        >
          {new Date(item.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </Text>
        {/* AI sources badges using _text for visibility */}
        {!item.isUser && item.sources && (
          <HStack space={1} mt={1} flexWrap="wrap">
            {item.sources.map((source, idx) => {
              let bg, textColor;
              if (source === "DailyMed") {
                bg = "blue.100";
                textColor = "blue.800";
              } else if (source === "PubMed") {
                bg = "green.100";
                textColor = "green.800";
              } else if (source === "AI Summary") {
                bg = "purple.100";
                textColor = "purple.800";
              } else {
                bg = "yellow.100";
                textColor = "yellow.800";
              }
              return (
                <Badge
                  key={idx}
                  bg={bg}
                  rounded="full"
                  m={0.5}
                  _text={{ color: textColor, fontSize: "xs" }}
                >
                  {source}
                </Badge>
              );
            })}
          </HStack>
        )}
      </AnimatedBox>
    </HStack>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[50] }}>
      {renderTopBar()}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Adjust offset as needed
      >
        <FlatList
          ref={flatListRef}
          data={chatHistory}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
        <HStack
          alignItems="center"
          bg="white"
          rounded="full"
          shadow={2}
          px={3}
          py={2}
          m={3}
        >
          <Input
            flex={1}
            variant="unstyled"
            placeholder="Ask about medications or supplements..."
            value={message}
            onChangeText={setMessage}
            fontSize="md"
          />
          <IconButton
            icon={<Send color={colors.primary[500]} size={24} />}
            variant="ghost"
            onPress={handleSend}
            disabled={!message.trim()}
          />
        </HStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
