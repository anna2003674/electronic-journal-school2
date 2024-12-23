import React from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentationWebView from '../../DocumentationWebView'; 

const DocumentationScreen = () => {
  return (
    <View style={styles.container}>
      <DocumentationWebView url="https://anna2003674.github.io/electronic-journal-documentation/" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default DocumentationScreen;
