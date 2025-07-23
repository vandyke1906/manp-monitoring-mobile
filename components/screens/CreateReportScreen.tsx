import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CreateReportScreen() {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description.');
      return;
    }

    // Simulate offline save – will be replaced with WatermelonDB
    const newReport = {
      id: Date.now().toString(),
      description,
      photoUri,
      createdAt: new Date().toISOString(),
      synced: false,
    };

    console.log('Saving locally:', newReport);
    Alert.alert('Success', 'Report saved locally (mock)');

    // Reset and go back
    setDescription('');
    setPhotoUri(null);
    navigation.goBack();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">New Report</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Pick Photo" onPress={handlePickImage} />

      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
      )}

      <View style={styles.spacer} />

      <Button title="Save Report (Offline)" onPress={handleSave} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  spacer: {
    height: 12,
  },
});
