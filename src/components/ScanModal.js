import React from 'react';
import {
  Modal,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  useTheme,
} from '@gluestack-ui/themed-native-base';
import { X, ThumbsUp, ThumbsDown, Barcode, Camera, Flash } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const ScanModal = ({
  isOpen,
  onClose,
  item,
  onTalkToAI,
  onAddToStack,
  liked,
  disliked,
  onLike,
  onDislike,
}) => {
  const { colors } = useTheme();

  if (!item) return null;

  // Handle color keys (adjust as per your theme structure)
  const getScoreColor = (score) => {
    if (score >= 80) return 'success.500';
    if (score >= 60) return 'warning.500';
    return 'danger.500';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              {item.name}
            </Text>
            <IconButton
              icon={<X color={colors.gray500 || '#8E8E93'} size={24} />}
              variant="ghost"
              onPress={onClose}
              accessibilityLabel="Close modal"
            />
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <AnimatedBox
              entering={FadeIn}
              bg="white"
              p={4}
              rounded="lg"
              shadow={1}
            >
              <VStack space={2}>
                {item.type === 'Supplement' && (
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text color={getScoreColor(item.score)}>
                      {item.score}/100
                    </Text>
                  </HStack>
                )}

                <Text color="gray.600">{item.risk || item.feedback}</Text>
                <Text color="gray.600">Cost: ~${item.cost}/month</Text>

                <HStack space={2}>
                  {(item.badges || []).map((badge, index) => (
                    <Box
                      key={index}
                      bg="primary.50"
                      px={3}
                      py={1}
                      rounded="full"
                    >
                      <Text color="primary.500">{badge}</Text>
                    </Box>
                  ))}
                </HStack>

                <HStack space={2} mt={2}>
                  <IconButton
                    icon={<ThumbsUp color={liked ? colors.primary500 : colors.primary300 || '#007AFF'} size={24} />}
                    variant="ghost"
                    onPress={onLike}
                    accessibilityLabel="Like"
                  />
                  <IconButton
                    icon={<ThumbsDown color={disliked ? colors.danger500 : colors.gray500 || '#8E8E93'} size={24} />}
                    variant="ghost"
                    onPress={onDislike}
                    accessibilityLabel="Dislike"
                  />
                </HStack>
              </VStack>
            </AnimatedBox>

            <HStack space={4} justifyContent="center">
              <IconButton
                icon={<Barcode color={colors.primary500 || '#007AFF'} size={24} />}
                variant="outline"
                rounded="full"
                accessibilityLabel="Barcode"
              />
              <IconButton
                icon={<Camera color={colors.primary500 || '#007AFF'} size={24} />}
                variant="outline"
                rounded="full"
                accessibilityLabel="Camera"
              />
              <IconButton
                icon={<Flash color={colors.primary500 || '#007AFF'} size={24} />}
                variant="outline"
                rounded="full"
                accessibilityLabel="Flash"
              />
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button
              variant="outline"
              flex={1}
              onPress={() => {
                if (onTalkToAI) onTalkToAI(item);
                onClose();
              }}
            >
              Talk to AI Pharmacist
            </Button>
            <Button
              flex={1}
              onPress={() => {
                if (onAddToStack) onAddToStack(item);
                onClose();
              }}
            >
              Add to Stack
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
