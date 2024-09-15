import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants';
import Button from "../components/Button";

const EditDateModal = ({ visible, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    const currentDate = date || selectedDate;
    setSelectedDate(currentDate);
  };

  const handleSave = () => {
    onSave(selectedDate);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select a date:</Text>
          <RNDateTimePicker
            testID="datePicker"
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});

export default EditDateModal;
