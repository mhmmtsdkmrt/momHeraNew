import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import Button from "../components/Button";

const EditCountModal = ({ visible, onClose, onSave }) => {
  const [newCount, setNewCount] = useState('');

  const handleSave = () => {
    onSave(newCount);
    setNewCount('');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text>Enter new count:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10 }}
          value={newCount}
          onChangeText={setNewCount}
          keyboardType="numeric"
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: COLORS.disabled,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 2,
      padding: 35,
      width: "90%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

export default EditCountModal;