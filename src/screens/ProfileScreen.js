import React, { useState } from 'react';
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
} from '@gluestack-ui/themed-native-base';
import { Edit, Trash2 } from 'lucide-react-native';
import { mockData } from '../data/mockData';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch, Alert } from 'react-native';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const GENDERS = ["Female", "Male", "Other"];

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
  const [goalSearch, setGoalSearch] = useState('');
  const [conditionSearch, setConditionSearch] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [customCondition, setCustomCondition] = useState('');
  const [allergies, setAllergies] = useState(['Iodine']);
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');
  const [editMedModal, setEditMedModal] = useState(false);
  const [editMedIndex, setEditMedIndex] = useState(null);
  const [editMedName, setEditMedName] = useState('');
  const [editMedDosage, setEditMedDosage] = useState('');
  const [editMedType, setEditMedType] = useState('Prescription');
  const [editMedStatus, setEditMedStatus] = useState('Active');
  const [editMedStart, setEditMedStart] = useState('');
  const [editMedEnd, setEditMedEnd] = useState('');
  const [deleteMedIndex, setDeleteMedIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      setCustomGoal('');
    }
  };
  const addCustomCondition = () => {
    if (customCondition && !editConditions.includes(customCondition)) {
      setEditConditions([...editConditions, customCondition]);
      setCustomCondition('');
    }
  };
  const addAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy('');
      setShowAddAllergy(false);
    }
  };
  const removeAllergy = (allergy) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const openEditMed = (item, idx) => {
    setEditMedIndex(idx);
    setEditMedName(item.name);
    setEditMedDosage(item.dosage);
    setEditMedType(item.type);
    setEditMedStatus(item.status);
    setEditMedStart(item.start);
    setEditMedEnd(item.end || '');
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
          alt={user?.name || 'Guest'}
        >
          {(!user || !user.photo) && <Avatar.FallbackText>G</Avatar.FallbackText>}
        </Avatar>
        <VStack flex={1} space={1}>
          <Text fontSize="sm" fontWeight="bold" numberOfLines={1}>
            {privateMode ? 'Private' : user?.name || 'Guest'}
          </Text>
          <Text color="gray.600" fontSize="sm">
            Age: {privateMode ? '--' : user?.age || '--'}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {privateMode ? '' : user?.sex || ''}
          </Text>
        </VStack>
        <Button
          leftIcon={<Edit color={colors.white} size={20} />}
          onPress={() => setShowEditProfile(true)}
          rounded="full"
          px={4}
          py={2}
          isDisabled={privateMode}
        >
          Edit Profile
        </Button>
      </HStack>
      <VStack mt={4} space={2}>
        <Text fontWeight="bold">Health Goals:</Text>
        <HStack flexWrap="wrap" space={2}>
          {(privateMode ? [] : user?.goals)?.map((goal, index) => (
            <Badge key={index} bg="primary.50" px={3} py={1} rounded="full" mb={1}>
              <Text color="primary.500">{goal}</Text>
            </Badge>
          ))}
        </HStack>
      </VStack>
      <VStack mt={2} space={2}>
        <Text fontWeight="bold">Health Conditions:</Text>
        <HStack flexWrap="wrap" space={2}>
          {(privateMode ? [] : user?.conditions)?.map((condition, index) => (
            <Badge key={index} bg="warning.50" px={3} py={1} rounded="full" mb={1}>
              <Text color="warning.500">{condition}</Text>
            </Badge>
          ))}
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
          <Text color="gray.600" fontSize="sm">Dosage: {item.dosage}</Text>
          <Text color="gray.600" fontSize="xs">Start: {item.start}</Text>
          {item.end && <Text color="gray.600" fontSize="xs">End: {item.end}</Text>}
          <HStack space={1} mt={1}>
            <Badge bg={item.type === 'Prescription' ? 'primary.50' : 'warning.50'} px={2} py={0.5} rounded="full">
              <Text color={item.type === 'Prescription' ? 'primary.500' : 'warning.500'} fontSize="xs">{item.type}</Text>
            </Badge>
            <Badge bg={item.status === 'Active' ? 'success.50' : 'gray.100'} px={2} py={0.5} rounded="full">
              <Text color={item.status === 'Active' ? 'success.500' : 'gray.500'} fontSize="xs">{item.status}</Text>
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
    <Modal isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} size="full">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <VStack space={4}>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input value={editName} onChangeText={setEditName} isDisabled={privateMode} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Age</FormControl.Label>
                <Input value={editAge} onChangeText={setEditAge} keyboardType="number-pad" isDisabled={privateMode} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Sex</FormControl.Label>
                <HStack space={2} mt={2}>
                  {GENDERS.map((gender, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => setEditGender(gender)}
                      style={{
                        backgroundColor: editGender === gender ? colors.primary[100] : 'white',
                        borderRadius: 16,
                        borderWidth: editGender === gender ? 2 : 1,
                        borderColor: editGender === gender ? colors.primary[500] : colors.gray[200],
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 4,
                        opacity: privateMode ? 0.5 : 1,
                      }}
                      disabled={privateMode}
                    >
                      <Text color={editGender === gender ? colors.primary[700] : colors.gray[700]} fontWeight={editGender === gender ? 'bold' : 'normal'}>
                        {gender}
                      </Text>
                    </Pressable>
                  ))}
                </HStack>
              </FormControl>
              <FormControl>
                <FormControl.Label>Health Goals</FormControl.Label>
                <Input
                  placeholder="Browse common..."
                  value={goalSearch}
                  onChangeText={setGoalSearch}
                  isDisabled={privateMode}
                />
                <HStack flexWrap="wrap" space={2} mt={2}>
                  {mockData.common_goals.filter(goal => goal.toLowerCase().includes(goalSearch.toLowerCase())).map((goal, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => !privateMode && toggleGoal(goal)}
                      style={{ opacity: editGoals.includes(goal) ? 1 : 0.5 }}
                      disabled={privateMode}
                    >
                      <Badge bg="primary.50" px={3} py={1} rounded="full" mb={1} borderWidth={editGoals.includes(goal) ? 2 : 0} borderColor="primary.500">
                        <Text color="primary.500">{goal}</Text>
                      </Badge>
                    </Pressable>
                  ))}
                </HStack>
                <HStack flexWrap="wrap" space={2} mt={2}>
                  {editGoals.map((goal, idx) => (
                    <Badge key={idx} bg="primary.100" px={3} py={1} rounded="full" mb={1}>
                      <Text color="primary.700">{goal}</Text>
                    </Badge>
                  ))}
                </HStack>
                <HStack mt={2} space={2} alignItems="center">
                  <Input
                    flex={1}
                    placeholder="Other (add custom goal)"
                    value={customGoal}
                    onChangeText={setCustomGoal}
                    isDisabled={privateMode}
                  />
                  <Button size="sm" onPress={addCustomGoal} isDisabled={privateMode || !customGoal}>Add</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormControl.Label>Health Conditions</FormControl.Label>
                <Input
                  placeholder="Browse common..."
                  value={conditionSearch}
                  onChangeText={setConditionSearch}
                  isDisabled={privateMode}
                />
                <HStack flexWrap="wrap" space={2} mt={2}>
                  {mockData.common_conditions.filter(cond => cond.toLowerCase().includes(conditionSearch.toLowerCase())).map((cond, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => !privateMode && toggleCondition(cond)}
                      style={{ opacity: editConditions.includes(cond) ? 1 : 0.5 }}
                      disabled={privateMode}
                    >
                      <Badge bg="warning.50" px={3} py={1} rounded="full" mb={1} borderWidth={editConditions.includes(cond) ? 2 : 0} borderColor="warning.500">
                        <Text color="warning.500">{cond}</Text>
                      </Badge>
                    </Pressable>
                  ))}
                </HStack>
                <HStack flexWrap="wrap" space={2} mt={2}>
                  {editConditions.map((cond, idx) => (
                    <Badge key={idx} bg="warning.100" px={3} py={1} rounded="full" mb={1}>
                      <Text color="warning.700">{cond}</Text>
                    </Badge>
                  ))}
                </HStack>
                <HStack mt={2} space={2} alignItems="center">
                  <Input
                    flex={1}
                    placeholder="Other (add custom condition)"
                    value={customCondition}
                    onChangeText={setCustomCondition}
                    isDisabled={privateMode}
                  />
                  <Button size="sm" onPress={addCustomCondition} isDisabled={privateMode || !customCondition}>Add</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormControl.Label>Known Allergies</FormControl.Label>
                <HStack flexWrap="wrap" space={2} mt={2}>
                  {allergies.map((allergy, idx) => (
                    <Badge key={idx} bg="danger.50" px={3} py={1} rounded="full" mb={1}>
                      <HStack alignItems="center" space={1}>
                        <Text color="danger.700">{allergy}</Text>
                        <Pressable onPress={() => removeAllergy(allergy)} disabled={privateMode}>
                          <Text color="danger.700">×</Text>
                        </Pressable>
                      </HStack>
                    </Badge>
                  ))}
                </HStack>
                {showAddAllergy ? (
                  <HStack mt={2} space={2} alignItems="center">
                    <Input
                      flex={1}
                      placeholder="Add allergy"
                      value={newAllergy}
                      onChangeText={setNewAllergy}
                      isDisabled={privateMode}
                    />
                    <Button size="sm" onPress={addAllergy} isDisabled={privateMode || !newAllergy}>Add</Button>
                    <Button size="sm" variant="outline" onPress={() => setShowAddAllergy(false)}>Cancel</Button>
                  </HStack>
                ) : (
                  <Button mt={2} size="sm" onPress={() => setShowAddAllergy(true)} isDisabled={privateMode}>Add</Button>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Guest Mode</FormControl.Label>
                <HStack alignItems="center" space={2}>
                  <Switch
                    value={privateMode}
                    onValueChange={setPrivateMode}
                    trackColor={{ false: colors.gray[200], true: colors.info[50] }}
                    thumbColor={privateMode ? colors.info[100] : colors.gray[400]}
                  />
                  <Text color={privateMode ? colors.primary[500] : colors.gray[700]}>{privateMode ? 'On' : 'Off'}</Text>
                </HStack>
                <Text color="gray.500" fontSize="xs">Guest mode allows you to use the app without creating an account. Your data stays on your device and is not synced to the cloud.</Text>
              </FormControl>
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button flex={1} bg="#8E8E93" onPress={() => setShowEditProfile(false)}>
              Cancel
            </Button>
            <Button flex={1} bg="#007AFF" onPress={() => {
              setUser({
                ...user,
                name: editName,
                age: parseInt(editAge, 10),
                goals: editGoals,
                conditions: editConditions,
                sex: editGender,
              });
              setShowEditProfile(false);
            }} isDisabled={privateMode}>
              Save
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
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
                {['Prescription', 'Supplement'].map((type) => (
                  <Pressable
                    key={type}
                    onPress={() => setEditMedType(type)}
                    style={{
                      backgroundColor: editMedType === type ? colors.primary[100] : 'white',
                      borderRadius: 16,
                      borderWidth: editMedType === type ? 2 : 1,
                      borderColor: editMedType === type ? colors.primary[500] : colors.gray[200],
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 4,
                    }}
                  >
                    <Text color={editMedType === type ? 'primary.700' : 'gray.700'} fontWeight={editMedType === type ? 'bold' : 'normal'}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormControl.Label>Status</FormControl.Label>
              <HStack space={2} mt={2}>
                {['Active', 'Inactive'].map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => setEditMedStatus(status)}
                    style={{
                      backgroundColor: editMedStatus === status ? colors.success[100] : 'white',
                      borderRadius: 16,
                      borderWidth: editMedStatus === status ? 2 : 1,
                      borderColor: editMedStatus === status ? colors.success[500] : colors.gray[200],
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 4,
                    }}
                  >
                    <Text color={editMedStatus === status ? 'success.700' : 'gray.700'} fontWeight={editMedStatus === status ? 'bold' : 'normal'}>
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
            <Button flex={1} bg="#8E8E93" onPress={() => setEditMedModal(false)}>
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
    <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Delete Medication/Supplement</Modal.Header>
        <Modal.Body>
          <Text>Are you sure you want to delete this item?</Text>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            <Button flex={1} bg="#8E8E93" onPress={() => setShowDeleteConfirm(false)}>
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[50] }}>
      <Box flex={1} px={4} pt={2}>
        <HStack mb={2} alignItems="center" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">Profile</Text>
          <HStack alignItems="center" space={2}>
            <Switch
              value={privateMode}
              onValueChange={setPrivateMode}
              trackColor={{ false: colors.gray[200], true: colors.info[100] }}
              thumbColor={privateMode ? colors.info[200] : colors.gray[400]}
            />
            <Text color={privateMode ? colors.primary[500] : colors.gray[700]}>{privateMode ? 'Private Mode: On' : 'Private Mode: Off'}</Text>
          </HStack>
        </HStack>
        <Text color="gray.500" fontSize="xs" mb={2}>Private mode: Data stays on device, no cloud sync.</Text>
        {renderProfileHeader()}
        <HStack mb={2} alignItems="center" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">Medications & Supplements</Text>
          <Button
            size="sm"
            variant={showInactive ? 'solid' : 'outline'}
            rounded="full"
            px={3}
            py={1}
            onPress={() => setShowInactive((prev) => !prev)}
            isDisabled={privateMode}
          >
            {showInactive ? 'Show Active' : 'Show Inactive?'}
          </Button>
        </HStack>
        <FlatList
          data={privateMode ? [] : user.stack.filter((item) => showInactive ? item.status === 'Inactive' : item.status === 'Active')}
          renderItem={renderMedicationItem}
          keyExtractor={(_, idx) => idx.toString()}
          showsVerticalScrollIndicator={false}
        />
        {renderEditProfileModal()}
        {renderEditMedModal()}
        {renderDeleteConfirmModal()}
      </Box>
    </SafeAreaView>
  );
} 