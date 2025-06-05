import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  IconButton,
  Modal,
  FormControl,
  Input,
  useTheme,
  Pressable,
  Badge,
  Avatar,
  ScrollView,
} from "@gluestack-ui/themed-native-base";
import {
  Edit,
  Trash2,
  ArrowLeft,
  ChevronDown,
  Plus,
  X,
} from "lucide-react-native";
import { mockData } from "../data/mockData";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, Alert } from "react-native";

const AnimatedBox = Animated.createAnimatedComponent(Box);

// Helper function to chunk array into groups of 4
const chunkArray = (arr, size) => {
  if (!Array.isArray(arr)) return [];
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const GENDERS = ["Female", "Male", "Other"];

// Helper to filter out empty/falsy tags
const filterValidTags = (arr) =>
  Array.isArray(arr) ? arr.filter((t) => t && t.trim()) : [];

export const ProfileScreen = () => {
  const { colors } = useTheme();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [privateMode, setPrivateMode] = useState(true);
  const [user, setUser] = useState(mockData.user);
  const [editName, setEditName] = useState(user.name);
  const [editAge, setEditAge] = useState(user.age?.toString());
  const [editGoals, setEditGoals] = useState(user.goals);
  const [editConditions, setEditConditions] = useState(user.conditions);
  const [editGender, setEditGender] = useState(user.sex);
  const [goalSearch, setGoalSearch] = useState("");
  const [conditionSearch, setConditionSearch] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [customCondition, setCustomCondition] = useState("");
  const [allergies, setAllergies] = useState(
    mockData.user.allergies || ["Iodine"]
  );
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [newAllergy, setNewAllergy] = useState("");
  const [editMedModal, setEditMedModal] = useState(false);
  const [editMedIndex, setEditMedIndex] = useState(null);
  const [editMedName, setEditMedName] = useState("");
  const [editMedDosage, setEditMedDosage] = useState("");
  const [editMedType, setEditMedType] = useState("Prescription");
  const [editMedStatus, setEditMedStatus] = useState("Active");
  const [editMedStart, setEditMedStart] = useState("");
  const [editMedEnd, setEditMedEnd] = useState("");
  const [deleteMedIndex, setDeleteMedIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showMoreGoals, setShowMoreGoals] = useState(false);
  const [showMoreConditions, setShowMoreConditions] = useState(false);
  const [showMoreAllergies, setShowMoreAllergies] = useState(false);

  const toggleGoal = (goal) => {
    setEditGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };
  const toggleCondition = (cond) => {
    setEditConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const addCustomGoal = () => {
    if (customGoal && !editGoals.includes(customGoal)) {
      setEditGoals([...editGoals, customGoal]);
      setCustomGoal("");
    }
  };
  const addCustomCondition = () => {
    if (customCondition && !editConditions.includes(customCondition)) {
      setEditConditions([...editConditions, customCondition]);
      setCustomCondition("");
    }
  };
  const addAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy("");
      setShowAddAllergy(false);
    }
  };
  const removeAllergy = (allergy) => {
    setAllergies(allergies.filter((a) => a !== allergy));
  };

  const openEditMed = (item, idx) => {
    setEditMedIndex(idx);
    setEditMedName(item.name);
    setEditMedDosage(item.dosage);
    setEditMedType(item.type);
    setEditMedStatus(item.status);
    setEditMedStart(item.start);
    setEditMedEnd(item.end || "");
    setEditMedModal(true);
  };
  const saveEditMed = () => {
    const updatedStack = [...user.stack];
    updatedStack[editMedIndex] = {
      ...updatedStack[editMedIndex],
      name: editMedName,
      dosage: editMedDosage,
      type: editMedType,
      status: editMedStatus,
      start: editMedStart,
      end: editMedEnd || undefined,
    };
    setUser({ ...user, stack: updatedStack });
    setEditMedModal(false);
  };
  const openDeleteMed = (idx) => {
    setDeleteMedIndex(idx);
    setShowDeleteConfirm(true);
  };
  const confirmDeleteMed = () => {
    const updatedStack = user.stack.filter((_, idx) => idx !== deleteMedIndex);
    setUser({ ...user, stack: updatedStack });
    setShowDeleteConfirm(false);
    setDeleteMedIndex(null);
  };
  const renderProfileHeader = () => (
    <AnimatedBox
      entering={FadeIn}
      bg="white"
      p={4}
      rounded="2xl"
      shadow={2}
      mb={4}
    >
      <HStack alignItems="center" space={1}>
        <Avatar
          size="sm"
          source={{ uri: user?.photo }}
          alt={user?.name || "Guest"}
        >
          {(!user || !user.photo) && (
            <Avatar.FallbackText>G</Avatar.FallbackText>
          )}
        </Avatar>
        <VStack flex={1} space={1}>
          <Text fontSize="sm" fontWeight="bold" numberOfLines={1}>
            {privateMode ? "Private" : user?.name || "Guest"}
          </Text>
          <Text color="gray.600" fontSize="sm">
            Age: {privateMode ? "--" : user?.age || "--"}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {privateMode ? "" : user?.sex || ""}
          </Text>
        </VStack>
        <Button
          leftIcon={<Edit color={colors.white} size={20} />}
          onPress={openEditProfile}
          rounded="full"
          px={4}
          py={2}
          isDisabled={privateMode}
        >
          Edit Profile
        </Button>
      </HStack>

      {/* Health Goals Section */}
      <VStack mt={4} space={2}>
        <Text fontWeight="bold">Health Goals:</Text>
        <HStack flexWrap="wrap">
          {filterValidTags(privateMode ? [] : user?.goals).map(
            (goal, index) => (
              <Badge
                key={`goal-${index}`}
                bg="blue.100"
                rounded="full"
                m={1}
                _text={{ color: "blue.800" }}
              >
                {goal}
              </Badge>
            )
          )}
          {!privateMode &&
            (!user?.goals || filterValidTags(user.goals).length === 0) && (
              <Text color="gray.500" fontSize="sm">
                No health goals added
              </Text>
            )}
        </HStack>
      </VStack>

      {/* Health Conditions Section */}
      <VStack mt={4} space={2}>
        <Text fontWeight="bold">Health Conditions:</Text>
        <HStack flexWrap="wrap">
          {filterValidTags(privateMode ? [] : user?.conditions).map(
            (condition, index) => (
              <Badge
                key={`cond-${index}`}
                bg="orange.100"
                rounded="full"
                m={1}
                _text={{ color: "orange.800" }}
              >
                {condition}
              </Badge>
            )
          )}
          {!privateMode &&
            (!user?.conditions ||
              filterValidTags(user.conditions).length === 0) && (
              <Text color="gray.500" fontSize="sm">
                No health conditions added
              </Text>
            )}
        </HStack>
      </VStack>

      {/* Allergies Section */}
      <VStack mt={4} space={2}>
        <Text fontWeight="bold">Allergies:</Text>
        <HStack flexWrap="wrap">
          {filterValidTags(privateMode ? [] : user?.allergies).map(
            (allergy, index) => (
              <Badge
                key={`allergy-${index}`}
                bg="red.100"
                rounded="full"
                m={1}
                _text={{ color: "red.800" }}
              >
                {allergy}
              </Badge>
            )
          )}
          {!privateMode &&
            (!user?.allergies ||
              filterValidTags(user.allergies).length === 0) && (
              <Text color="gray.500" fontSize="sm">
                No allergies added
              </Text>
            )}
        </HStack>
      </VStack>
    </AnimatedBox>
  );

  const renderMedicationItem = ({ item, index }) => (
    <AnimatedBox
      entering={FadeIn}
      bg="white"
      p={3}
      rounded="lg"
      shadow={1}
      mb={2}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text fontSize="md" fontWeight="bold">
            {item.name}
          </Text>
          <Text color="gray.600" fontSize="sm">
            Dosage: {item.dosage}
          </Text>
          <Text color="gray.600" fontSize="xs">
            Start: {item.start}
          </Text>
          {item.end && (
            <Text color="gray.600" fontSize="xs">
              End: {item.end}
            </Text>
          )}
          <HStack space={1} mt={1}>
            <Badge
              bg={item.type === "Prescription" ? "primary.50" : "warning.50"}
              px={2}
              py={0.5}
              rounded="full"
            >
              <Text
                color={
                  item.type === "Prescription" ? "primary.500" : "warning.500"
                }
                fontSize="xs"
              >
                {item.type}
              </Text>
            </Badge>
            <Badge
              bg={item.status === "Active" ? "success.50" : "gray.100"}
              px={2}
              py={0.5}
              rounded="full"
            >
              <Text
                color={item.status === "Active" ? "success.500" : "gray.500"}
                fontSize="xs"
              >
                {item.status}
              </Text>
            </Badge>
          </HStack>
        </VStack>
        <HStack space={1}>
          <IconButton
            icon={<Edit color={colors.primary[500]} size={18} />}
            variant="ghost"
            size="sm"
            onPress={() => !privateMode && openEditMed(item, index)}
            isDisabled={privateMode}
          />
          <IconButton
            icon={<Trash2 color={colors.danger[500]} size={18} />}
            variant="ghost"
            size="sm"
            onPress={() => !privateMode && openDeleteMed(index)}
            isDisabled={privateMode}
          />
        </HStack>
      </HStack>
    </AnimatedBox>
  );

  const renderEditProfileModal = () => (
    <Modal
      isOpen={showEditProfile}
      onClose={() => setShowEditProfile(false)}
      size="full"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Modal.Content
          flex={1}
          width="100%"
          marginTop={0}
          marginBottom={0}
          entering={FadeIn}
          bg="white"
          rounded="2xl"
        >
          <IconButton
            position="absolute"
            left={2}
            top={2}
            zIndex={1}
            icon={<ArrowLeft color={colors.gray[600]} size={24} />}
            onPress={() => setShowEditProfile(false)}
          />
          <Modal.Header alignItems="center" justifyContent="center">
            Edit Profile
          </Modal.Header>
          <Modal.Body flex={1}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <VStack space={4} px={4}>
                {/* Name Input */}
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Enter your name"
                    fontSize="md"
                    isDisabled={privateMode}
                  />
                </FormControl>

                {/* Age Input */}
                <FormControl>
                  <FormControl.Label>Age</FormControl.Label>
                  <Input
                    value={editAge}
                    onChangeText={setEditAge}
                    keyboardType="number-pad"
                    placeholder="Enter your age"
                    fontSize="md"
                    isDisabled={privateMode}
                  />
                </FormControl>

                {/* Biological Sex Dropdown */}
                <FormControl>
                  <FormControl.Label>Biological Sex</FormControl.Label>
                  <Pressable
                    onPress={() => !privateMode && setShowGenderDropdown(true)}
                    disabled={privateMode}
                  >
                    <Box
                      borderWidth={1}
                      borderColor="gray.200"
                      rounded="lg"
                      px={4}
                      py={3}
                      opacity={privateMode ? 0.5 : 1}
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text color={editGender ? "gray.800" : "gray.400"}>
                          {editGender || "Select"}
                        </Text>
                        <ChevronDown size={20} color={colors.gray[400]} />
                      </HStack>
                    </Box>
                  </Pressable>
                  <Modal
                    isOpen={showGenderDropdown}
                    onClose={() => setShowGenderDropdown(false)}
                  >
                    <Modal.Content>
                      <Modal.Header>Select Biological Sex</Modal.Header>
                      <Modal.Body>
                        <VStack space={2}>
                          {GENDERS.map((gender) => (
                            <Pressable
                              key={gender}
                              onPress={() => {
                                setEditGender(gender);
                                setShowGenderDropdown(false);
                              }}
                            >
                              <Box
                                py={3}
                                px={4}
                                bg={
                                  editGender === gender ? "primary.50" : "white"
                                }
                              >
                                <Text
                                  color={
                                    editGender === gender
                                      ? "primary.600"
                                      : "gray.800"
                                  }
                                >
                                  {gender}
                                </Text>
                              </Box>
                            </Pressable>
                          ))}
                        </VStack>
                      </Modal.Body>
                    </Modal.Content>
                  </Modal>
                </FormControl>

                {/* Health Goals Section */}
                <FormControl>
                  <FormControl.Label>Health Goals</FormControl.Label>
                  <Input
                    value={goalSearch}
                    onChangeText={setGoalSearch}
                    placeholder="Type and press Enter to add..."
                    isDisabled={privateMode}
                    onSubmitEditing={() => {
                      const val = goalSearch.trim();
                      if (val && !editGoals.includes(val)) {
                        setEditGoals([...editGoals, val]);
                      }
                      setGoalSearch("");
                    }}
                    returnKeyType="done"
                  />
                  {/* Suggestions */}
                  {goalSearch && (
                    <Box mt={2} maxH={100} overflow="hidden">
                      <ScrollView>
                        {mockData.commonGoals
                          .filter(
                            (goal) =>
                              goal
                                .toLowerCase()
                                .includes(goalSearch.toLowerCase()) &&
                              !editGoals.includes(goal)
                          )
                          .map((goal) => (
                            <Pressable
                              key={goal}
                              onPress={() => {
                                setEditGoals([...editGoals, goal]);
                                setGoalSearch("");
                              }}
                              p={2}
                              borderBottomWidth={1}
                              borderColor="gray.100"
                            >
                              <Text>{goal}</Text>
                            </Pressable>
                          ))}
                      </ScrollView>
                    </Box>
                  )}
                  {/* Chips */}
                  <HStack flexWrap="wrap" mt={2}>
                    {filterValidTags(editGoals).map((goal) => (
                      <Badge
                        key={goal}
                        bg="blue.100"
                        px={2}
                        py={1}
                        rounded="full"
                        m={1}
                        _text={{ color: "blue.800" }}
                      >
                        {goal}
                      </Badge>
                    ))}
                  </HStack>
                </FormControl>

                {/* Health Conditions Section - Same pattern */}
                <FormControl mt={4}>
                  <FormControl.Label>Health Conditions</FormControl.Label>
                  <Input
                    value={conditionSearch}
                    onChangeText={setConditionSearch}
                    placeholder="Type and press Enter to add..."
                    isDisabled={privateMode}
                    onSubmitEditing={() => {
                      const val = conditionSearch.trim();
                      if (val && !editConditions.includes(val)) {
                        setEditConditions([...editConditions, val]);
                      }
                      setConditionSearch("");
                    }}
                    returnKeyType="done"
                  />
                  {/* Suggestions */}
                  {conditionSearch && (
                    <Box mt={2} maxH={100} overflow="hidden">
                      <ScrollView>
                        {mockData.commonConditions
                          .filter(
                            (cond) =>
                              cond
                                .toLowerCase()
                                .includes(conditionSearch.toLowerCase()) &&
                              !editConditions.includes(cond)
                          )
                          .map((cond) => (
                            <Pressable
                              key={cond}
                              onPress={() => {
                                setEditConditions([...editConditions, cond]);
                                setConditionSearch("");
                              }}
                              p={2}
                              borderBottomWidth={1}
                              borderColor="gray.100"
                            >
                              <Text>{cond}</Text>
                            </Pressable>
                          ))}
                      </ScrollView>
                    </Box>
                  )}
                  {/* Chips */}
                  <HStack flexWrap="wrap" mt={2}>
                    {filterValidTags(editConditions).map((cond) => (
                      <Badge
                        key={cond}
                        bg="orange.100"
                        px={2}
                        py={1}
                        rounded="full"
                        m={1}
                        _text={{ color: "orange.800" }}
                      >
                        {cond}
                      </Badge>
                    ))}
                  </HStack>
                </FormControl>

                {/* Known Allergies Section - Same pattern */}
                <FormControl mt={4}>
                  <FormControl.Label>Known Allergies</FormControl.Label>
                  <Input
                    value={newAllergy}
                    onChangeText={setNewAllergy}
                    placeholder="Type and press Enter to add..."
                    isDisabled={privateMode}
                    onSubmitEditing={() => {
                      const val = newAllergy.trim();
                      if (val && !allergies.includes(val)) {
                        setAllergies([...allergies, val]);
                      }
                      setNewAllergy("");
                    }}
                    returnKeyType="done"
                  />
                  {/* Chips */}
                  <HStack flexWrap="wrap" mt={2}>
                    {filterValidTags(allergies).map((allergy) => (
                      <Badge
                        key={allergy}
                        bg="red.100"
                        px={2}
                        py={1}
                        rounded="full"
                        m={1}
                        _text={{ color: "red.800" }}
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </HStack>
                </FormControl>

                {/* Guest Mode Switch */}
                <FormControl>
                  <FormControl.Label>Guest Mode</FormControl.Label>
                  <HStack space={2} alignItems="center">
                    <Switch
                      value={privateMode}
                      onValueChange={setPrivateMode}
                      trackColor={{ false: colors.gray[200], true: "#007AFF" }}
                      thumbColor={privateMode ? "white" : colors.gray[400]}
                    />
                    <Text color={privateMode ? "primary.500" : "gray.700"}>
                      {privateMode ? "On" : "Off"}
                    </Text>
                  </HStack>
                  <Text color="gray.500" fontSize="xs" mt={1}>
                    Guest mode allows you to use the app without creating an
                    account. Your data stays on your device and is not synced to
                    the cloud.
                  </Text>
                </FormControl>
              </VStack>
            </ScrollView>
          </Modal.Body>

          <Modal.Footer>
            <HStack space={2} px={4} py={2} w="100%">
              <Button
                flex={1}
                variant="outline"
                bg="#8E8E93"
                _text={{ color: "white" }}
                onPress={() => setShowEditProfile(false)}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                bg="#007AFF"
                _text={{ color: "white" }}
                onPress={() => {
                  setUser({
                    ...user,
                    name: editName,
                    age: parseInt(editAge, 10),
                    goals: editGoals,
                    conditions: editConditions,
                    allergies: allergies,
                    sex: editGender,
                  });
                  setShowEditProfile(false);
                }}
                isDisabled={privateMode}
              >
                Save
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </SafeAreaView>
    </Modal>
  );

  const renderEditMedModal = () => (
    <Modal isOpen={editMedModal} onClose={() => setEditMedModal(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Medication/Supplement</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={editMedName} onChangeText={setEditMedName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Dosage</FormControl.Label>
              <Input value={editMedDosage} onChangeText={setEditMedDosage} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Type</FormControl.Label>
              <HStack space={2} mt={2}>
                {["Prescription", "Supplement"].map((type) => (
                  <Pressable
                    key={type}
                    onPress={() => setEditMedType(type)}
                    style={{
                      backgroundColor:
                        editMedType === type ? colors.primary[100] : "white",
                      borderRadius: 16,
                      borderWidth: editMedType === type ? 2 : 1,
                      borderColor:
                        editMedType === type
                          ? colors.primary[500]
                          : colors.gray[200],
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 4,
                    }}
                  >
                    <Text
                      color={editMedType === type ? "primary.700" : "gray.700"}
                      fontWeight={editMedType === type ? "bold" : "normal"}
                    >
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormControl.Label>Status</FormControl.Label>
              <HStack space={2} mt={2}>
                {["Active", "Inactive"].map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => setEditMedStatus(status)}
                    style={{
                      backgroundColor:
                        editMedStatus === status
                          ? colors.success[100]
                          : "white",
                      borderRadius: 16,
                      borderWidth: editMedStatus === status ? 2 : 1,
                      borderColor:
                        editMedStatus === status
                          ? colors.success[500]
                          : colors.gray[200],
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 4,
                    }}
                  >
                    <Text
                      color={
                        editMedStatus === status ? "success.700" : "gray.700"
                      }
                      fontWeight={editMedStatus === status ? "bold" : "normal"}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormControl.Label>Start</FormControl.Label>
              <Input value={editMedStart} onChangeText={setEditMedStart} />
            </FormControl>
            <FormControl>
              <FormControl.Label>End</FormControl.Label>
              <Input value={editMedEnd} onChangeText={setEditMedEnd} />
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button
              flex={1}
              bg="#8E8E93"
              onPress={() => setEditMedModal(false)}
            >
              Cancel
            </Button>
            <Button flex={1} bg="#007AFF" onPress={saveEditMed}>
              Save
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  const renderDeleteConfirmModal = () => (
    <Modal
      isOpen={showDeleteConfirm}
      onClose={() => setShowDeleteConfirm(false)}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Delete Medication/Supplement</Modal.Header>
        <Modal.Body>
          <Text>Are you sure you want to delete this item?</Text>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button
              flex={1}
              bg="#8E8E93"
              onPress={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button flex={1} bg="#FF3B30" onPress={confirmDeleteMed}>
              Delete
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  // Sync edit states with user when opening edit modal
  const openEditProfile = () => {
    setEditName(user.name);
    setEditAge(user.age?.toString());
    setEditGoals(user.goals || []);
    setEditConditions(user.conditions || []);
    setEditGender(user.sex);
    setAllergies(user.allergies || []);
    setShowEditProfile(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[50] }}>
      <Box flex={1} px={4} pt={2}>
        <HStack mb={2} alignItems="center" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Profile
          </Text>
          <HStack alignItems="center" space={2}>
            <Switch
              value={privateMode}
              onValueChange={setPrivateMode}
              trackColor={{ false: colors.gray[200], true: colors.info[100] }}
              thumbColor={privateMode ? colors.info[200] : colors.gray[400]}
            />
            <Text color={privateMode ? colors.primary[500] : colors.gray[700]}>
              {privateMode ? "Private Mode: On" : "Private Mode: Off"}
            </Text>
          </HStack>
        </HStack>
        <Text color="gray.500" fontSize="xs" mb={2}>
          Private mode: Data stays on device, no cloud sync.
        </Text>
        {renderProfileHeader()}
        <HStack mb={2} alignItems="center" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Medications & Supplements
          </Text>
          <Button
            size="sm"
            variant={showInactive ? "solid" : "outline"}
            rounded="full"
            px={3}
            py={1}
            onPress={() => setShowInactive((prev) => !prev)}
            isDisabled={privateMode}
          >
            {showInactive ? "Show Active" : "Show Inactive?"}
          </Button>
        </HStack>
        <FlatList
          data={
            privateMode
              ? []
              : user.stack.filter((item) =>
                  showInactive
                    ? item.status === "Inactive"
                    : item.status === "Active"
                )
          }
          renderItem={renderMedicationItem}
          keyExtractor={(_, idx) => idx.toString()}
          showsVerticalScrollIndicator={false}
        />
        {renderEditProfileModal()}
        {renderEditMedModal()}
        {renderDeleteConfirmModal()}

        {/* Browse More Modals */}
        <Modal isOpen={showMoreGoals} onClose={() => setShowMoreGoals(false)}>
          <Modal.Content>
            <Modal.Header>Browse Health Goals</Modal.Header>
            <Modal.Body>
              <ScrollView>
                {mockData.commonGoals.map((goal) => (
                  <Pressable
                    key={goal}
                    onPress={() => {
                      if (!editGoals.includes(goal)) {
                        setEditGoals([...editGoals, goal]);
                      }
                      setShowMoreGoals(false);
                    }}
                  >
                    <Box
                      py={2}
                      px={4}
                      borderBottomWidth={1}
                      borderColor="gray.100"
                    >
                      <Text>{goal}</Text>
                    </Box>
                  </Pressable>
                ))}
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showMoreConditions}
          onClose={() => setShowMoreConditions(false)}
        >
          <Modal.Content>
            <Modal.Header>Browse Health Conditions</Modal.Header>
            <Modal.Body>
              <ScrollView>
                {mockData.commonConditions.map((condition) => (
                  <Pressable
                    key={condition}
                    onPress={() => {
                      if (!editConditions.includes(condition)) {
                        setEditConditions([...editConditions, condition]);
                      }
                      setShowMoreConditions(false);
                    }}
                  >
                    <Box
                      py={2}
                      px={4}
                      borderBottomWidth={1}
                      borderColor="gray.100"
                    >
                      <Text>{condition}</Text>
                    </Box>
                  </Pressable>
                ))}
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showMoreAllergies}
          onClose={() => setShowMoreAllergies(false)}
        >
          <Modal.Content>
            <Modal.Header>Browse Allergies</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <VStack space={2}>
                  <Input
                    value={newAllergy}
                    onChangeText={setNewAllergy}
                    placeholder="Enter new allergy"
                    InputRightElement={
                      <IconButton
                        icon={<Plus color={colors.danger[500]} size={20} />}
                        onPress={addAllergy}
                        isDisabled={!newAllergy}
                      />
                    }
                  />
                </VStack>
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    </SafeAreaView>
  );
};
