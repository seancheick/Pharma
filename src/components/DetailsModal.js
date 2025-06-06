import React from 'react';
import {
  Modal,
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Button,
  useTheme,
  ScrollView,
  Pressable,
} from '@gluestack-ui/themed-native-base';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const SCORE_COLORS = (score) => {
  if (score >= 80) return "#34C759"; // green
  if (score >= 60) return "#F1C40F"; // orange
  return "#FF3B30"; // red
};

const getSourceBadge = (source) => {
  let bg, textColor;
  switch (source) {
    case "DailyMed":
      bg = "blue.100";
      textColor = "blue.800";
      break;
    case "PubMed":
      bg = "green.100";
      textColor = "green.800";
      break;
    case "AI Summary":
      bg = "purple.100";
      textColor = "purple.800";
      break;
    case "OpenFDA":
      bg = "orange.100";
      textColor = "orange.800";
      break;
    default:
      bg = "gray.100";
      textColor = "gray.800";
  }
  return { bg, textColor };
};

export const DetailsModal = ({
  isOpen,
  onClose,
  item,
  onLike,
  onDislike,
  liked,
  disliked,
}) => {
  const { colors } = useTheme();

  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content
        entering={FadeIn}
        bg="white"
        rounded="2xl"
      >
        <IconButton
          position="absolute"
          right={2}
          top={2}
          zIndex={1}
          icon={<X color={colors.gray[600]} size={24} />}
          onPress={onClose}
        />
        
        <Modal.Header>
          <Text fontSize="xl" fontWeight="bold">
            {item.name}
          </Text>
        </Modal.Header>

        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space={4}>
              {/* Score/Rating */}
              {item.score && (
                <HStack alignItems="center" space={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Score:
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={SCORE_COLORS(item.score)}
                  >
                    {item.score}/100
                  </Text>
                </HStack>
              )}

              {/* Dosage Information */}
              {item.dosage && (
                <VStack space={1}>
                  <Text fontSize="md" fontWeight="bold" color="#4A90E2">
                    Dosage
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {item.dosage}
                  </Text>
                  {item.start && (
                    <Text color="gray.500" fontSize="xs">
                      Started: {item.start}
                    </Text>
                  )}
                </VStack>
              )}

              {/* Ingredients */}
              <VStack space={2}>
                <Text fontSize="md" fontWeight="bold" color="#4A90E2">
                  Ingredients
                </Text>
                {item.ingredients ? (
                  <VStack space={1}>
                    {item.ingredients.map((ingredient, index) => (
                      <Text key={index} color="gray.600" fontSize="sm">
                        • {ingredient}
                      </Text>
                    ))}
                  </VStack>
                ) : (
                  <Text color="gray.500" fontSize="sm">
                    Ingredients not listed for this item
                  </Text>
                )}
                {item.ingredientSource && (
                  <Badge
                    bg={getSourceBadge(item.ingredientSource).bg}
                    rounded="full"
                    _text={{ color: getSourceBadge(item.ingredientSource).textColor }}
                  >
                    {item.ingredientSource}
                  </Badge>
                )}
              </VStack>

              {/* Stack Risks */}
              {item.risks && (
                <VStack space={2}>
                  <Text fontSize="md" fontWeight="bold" color="#4A90E2">
                    Stack Risks
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {item.risks}
                  </Text>
                  {item.riskLevel && (
                    <Badge
                      bg={
                        item.riskLevel === "low"
                          ? "green.100"
                          : item.riskLevel === "medium"
                          ? "orange.100"
                          : "red.100"
                      }
                      rounded="full"
                      _text={{
                        color:
                          item.riskLevel === "low"
                            ? "green.800"
                            : item.riskLevel === "medium"
                            ? "orange.800"
                            : "red.800",
                      }}
                    >
                      {item.riskLevel.charAt(0).toUpperCase() +
                        item.riskLevel.slice(1)} Risk
                    </Badge>
                  )}
                </VStack>
              )}

              {/* Recommendations */}
              {item.recommendations && (
                <VStack space={2}>
                  <Text fontSize="md" fontWeight="bold" color="#4A90E2">
                    Recommendations
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {item.recommendations}
                  </Text>
                </VStack>
              )}

              {/* Cost */}
              {item.cost && (
                <VStack space={1}>
                  <Text fontSize="md" fontWeight="bold" color="#4A90E2">
                    Cost
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {item.cost}
                  </Text>
                </VStack>
              )}

              {/* Sources */}
              {item.sources && (
                <VStack space={2}>
                  <Text fontSize="md" fontWeight="bold" color="#4A90E2">
                    Sources
                  </Text>
                  <HStack space={1} flexWrap="wrap">
                    {item.sources.map((source, idx) => (
                      <Badge
                        key={idx}
                        bg={getSourceBadge(source).bg}
                        rounded="full"
                        m={0.5}
                        _text={{ color: getSourceBadge(source).textColor }}
                      >
                        {source}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              )}

              {/* Feedback */}
              <HStack space={2} mt={2} justifyContent="center">
                <Button
                  size="sm"
                  variant={liked ? "solid" : "outline"}
                  px={4}
                  py={2}
                  rounded="full"
                  onPress={onLike}
                >
                  👍 Helpful
                </Button>
                <Button
                  size="sm"
                  variant={disliked ? "solid" : "outline"}
                  px={4}
                  py={2}
                  rounded="full"
                  onPress={onDislike}
                >
                  👎 Not Helpful
                </Button>
              </HStack>
            </VStack>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}; 