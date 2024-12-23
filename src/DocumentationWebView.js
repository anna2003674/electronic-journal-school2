import React from 'react';
import { WebView } from 'react-native-webview';

const DocumentationWebView = ({ url }) => {
  return <WebView source={{ uri: url }} />;
};

export default DocumentationWebView;
