import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';
import axios from 'axios';

const DocumentationViewer = ({ url }) => {
  const [markdown, setMarkdown] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        console.log("Начало загрузки документации...");
        const response = await axios.get(url);
        console.log("Документация успешно загружена", response.data);
        setMarkdown(response.data); 
      } catch (err) {
        console.error("Ошибка при загрузке документации:", err);
        setError('Ошибка при загрузке документации');
      } finally {
        setLoading(false); 
      }
    };

    fetchMarkdown();
  }, [url]); 

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Markdown key="documentation-viewer">{markdown}</Markdown>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DocumentationViewer;
