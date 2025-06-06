import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  FlatList,
  Pressable,
  useTheme,
  Button,
  Badge,
  Avatar,
  ScrollView,
} from "@gluestack-ui/themed-native-base";
import { Barcode, Search } from "lucide-react-native";
import { mockData } from "../data/mockData";
import Animated, { FadeIn } from "react-native-reanimated";
import { DetailsModal } from "../components/DetailsModal";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const SCORE_COLORS = (score) => {
  if (score >= 80) return "#34C759"; // green
  if (score >= 60) return "#F1C40F"; // orange
  return "#FF3B30"; // red
};

export const HomeScreen = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [recentScans, setRecentScans] = useState(mockData.recent_scans);
  const [feedback, setFeedback] = useState({});

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
    setShowSuggestions(false);
  };

  const handleAddToRecent = (item) => {
    setRecentScans((prev) => [
      item,
      ...prev.filter((i) => i.name !== item.name),
    ]);
  };

  const handleFeedback = (name, type) => {
    setFeedback((prev) => ({ ...prev, [name]: type }));
  };

  const renderTopBar = () => (
    <Box bg="white" px={4} py={3} shadow={2} zIndex={10}>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="#222"
        style={{ fontFamily: "System" }}
      >
        PharmaGuide
      </Text>
    </Box>
  );

  const renderSearchBar = () => (
    <Box mt={2} mb={2}>
      <HStack
        alignItems="center"
        bg="white"
        rounded="full"
        shadow={1}
        px={3}
        py={2}
      >
        <Box flex={1}>
          <Input
            variant="unstyled"
            placeholder="Search supplements/medications."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setShowSuggestions(text.length > 0);
            }}
            fontSize="md"
            InputLeftElement={
              <Box pl={2}>
                <Search color={colors.gray[500]} size={20} />
              </Box>
            }
          />
        </Box>
        <IconButton
          icon={<Barcode color="#007AFF" size={24} />}
          variant="solid"
          bg="#E6F0FF"
          rounded="full"
          ml={2}
          onPress={() => {
            setSelectedItem(mockData.recent_scans[0]);
          }}
        />
      </HStack>
      {showSuggestions && (
        <Box
          bg="white"
          rounded="lg"
          shadow={1}
          mt={1}
          position="absolute"
          left={0}
          right={0}
          zIndex={20}
        >
          {mockData.search_suggestions
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((suggestion, index) => (
              <Pressable
                key={index}
                px={4}
                py={3}
                onPress={() => {
                  const item = mockData.recent_scans.find(
                    (scan) => scan.name === suggestion
                  );
                  if (item) {
                    handleItemSelect(item);
                  }
                }}
                _pressed={{ bg: "#E6F0FF" }}
              >
                <Text>{suggestion}</Text>
              </Pressable>
            ))}
          <Pressable px={4} py={3} _pressed={{ bg: "#E6F0FF" }}>
            <Text color="#007AFF">Scan Instead</Text>
          </Pressable>
        </Box>
      )}
    </Box>
  );

  const renderHealthIQCard = () => (
    <AnimatedBox
      entering={FadeIn}
      bg="white"
      p={4}
      rounded={8}
      shadow={1}
      mb={4}
    >
      <VStack alignItems="flex-start" space={2}>
        <Text
          fontSize={18}
          fontWeight="bold"
          color="#4A90E2"
          style={{ fontFamily: "System" }}
        >
          Health IQ
        </Text>
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          pt={2}
          w="100%"
        >
          <VStack alignItems="flex-start">
            <HStack alignItems="flex-end">
              <Text
                fontSize={32}
                fontWeight="bold"
                color="#F1C40F"
                style={{ fontFamily: "System" }}
              >
                72
              </Text>
              <Text
                fontSize={20}
                color="#666"
                ml={2}
                style={{ fontFamily: "System" }}
              >
                /100
              </Text>
            </HStack>
            <Text
              color="#F1C40F"
              fontSize={14}
              mt={1}
              style={{ fontFamily: "System" }}
            >
              Needs improvement 🟠
            </Text>
          </VStack>
          <VStack alignItems="flex-end">
            <Text
              color="#4A90E2"
              fontSize={14}
              style={{ fontFamily: "System" }}
            >
              7-day scan streak 🔥
            </Text>
            <Text
              color="#4A90E2"
              fontSize={14}
              mt={1}
              style={{ fontFamily: "System" }}
            >
              Health Geek 🏆
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </AnimatedBox>
  );

  const renderRecentScans = () => (
    <VStack space={2} mb={4}>
      <Text fontSize="lg" fontWeight="bold">
        Recent Scans
      </Text>
      <FlatList
        data={recentScans}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleItemSelect(item)}>
            <AnimatedBox
              entering={FadeIn}
              bg="white"
              p={4}
              rounded="lg"
              shadow={1}
              mr={3}
              width={280}
            >
              <VStack space={2}>
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <HStack alignItems="center" space={2}>
                  <Text fontSize="md" fontWeight="bold">
                    Score:
                  </Text>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={SCORE_COLORS(item.score)}
                  >
                    {item.score}/100
                  </Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" numberOfLines={2}>
                  {item.risks}
                </Text>
                <HStack space={1} flexWrap="wrap">
                  {item.sources.map((source, idx) => (
                    <Badge
                      key={idx}
                      bg={
                        source === "DailyMed"
                          ? "blue.100"
                          : source === "PubMed"
                          ? "green.100"
                          : "purple.100"
                      }
                      rounded="full"
                      m={0.5}
                      _text={{
                        color:
                          source === "DailyMed"
                            ? "blue.800"
                            : source === "PubMed"
                            ? "green.800"
                            : "purple.800",
                      }}
                    >
                      {source}
                    </Badge>
                  ))}
                </HStack>
                <HStack space={2} mt={2} justifyContent="center">
                  <Button
                    size="xs"
                    variant={feedback[item.name] === "up" ? "solid" : "outline"}
                    px={2}
                    py={1}
                    rounded="full"
                    onPress={() => handleFeedback(item.name, "up")}
                  >
                    👍 Helpful
                  </Button>
                  <Button
                    size="xs"
                    variant={feedback[item.name] === "down" ? "solid" : "outline"}
                    px={2}
                    py={1}
                    rounded="full"
                    onPress={() => handleFeedback(item.name, "down")}
                  >
                    👎 Not Helpful
                  </Button>
                </HStack>
              </VStack>
            </AnimatedBox>
          </Pressable>
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </VStack>
  );

  const renderAlerts = () => (
    <VStack space={2} mb={4}>
      <Text fontSize="lg" fontWeight="bold">
        Recent Alerts
      </Text>
      {mockData.alerts.map((alert, index) => (
        <Pressable key={index} _pressed={{ bg: "#E6F0FF" }}>
          <AnimatedBox
            entering={FadeIn}
            bg="white"
            p={4}
            rounded="lg"
            shadow={1}
            mb={2}
          >
            <Text color="#FF3B30">⚠️ {alert.text}</Text>
          </AnimatedBox>
        </Pressable>
      ))}
    </VStack>
  );

  const renderTrending = () => (
    <VStack space={2} mb={4}>
      <Text fontSize="lg" fontWeight="bold">
        Trending
      </Text>
      <FlatList
        data={mockData.trending_items}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleItemSelect(item)}>
            <AnimatedBox
              entering={FadeIn}
              bg="white"
              p={4}
              rounded="lg"
              shadow={1}
              mr={3}
              width={280}
            >
              <VStack space={2}>
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <HStack alignItems="center" space={2}>
                  <Text fontSize="md" fontWeight="bold">
                    Score:
                  </Text>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={SCORE_COLORS(item.score)}
                  >
                    {item.score}/100
                  </Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" numberOfLines={2}>
                  {item.risks}
                </Text>
                <HStack space={1} flexWrap="wrap">
                  {item.sources.map((source, idx) => (
                    <Badge
                      key={idx}
                      bg={
                        source === "DailyMed"
                          ? "blue.100"
                          : source === "PubMed"
                          ? "green.100"
                          : "purple.100"
                      }
                      rounded="full"
                      m={0.5}
                      _text={{
                        color:
                          source === "DailyMed"
                            ? "blue.800"
                            : source === "PubMed"
                            ? "green.800"
                            : "purple.800",
                      }}
                    >
                      {source}
                    </Badge>
                  ))}
                </HStack>
                <HStack space={2} mt={2} justifyContent="center">
                  <Button
                    size="xs"
                    variant={feedback[item.name] === "up" ? "solid" : "outline"}
                    px={2}
                    py={1}
                    rounded="full"
                    onPress={() => handleFeedback(item.name, "up")}
                  >
                    👍 Helpful
                  </Button>
                  <Button
                    size="xs"
                    variant={feedback[item.name] === "down" ? "solid" : "outline"}
                    px={2}
                    py={1}
                    rounded="full"
                    onPress={() => handleFeedback(item.name, "down")}
                  >
                    👎 Not Helpful
                  </Button>
                </HStack>
              </VStack>
            </AnimatedBox>
          </Pressable>
        )}
      />
    </VStack>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[50] }}>
      {renderTopBar()}
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Box px={4}>
          {renderSearchBar()}
          {renderHealthIQCard()}
          {renderRecentScans()}
          {renderAlerts()}
          {renderTrending()}
        </Box>
      </ScrollView>
      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        item={selectedItem}
        onLike={() => handleFeedback(selectedItem?.name, "up")}
        onDislike={() => handleFeedback(selectedItem?.name, "down")}
        liked={selectedItem && feedback[selectedItem.name] === "up"}
        disliked={selectedItem && feedback[selectedItem.name] === "down"}
      />
    </SafeAreaView>
  );
};
