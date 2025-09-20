import { AppRegistry } from 'react-native';
import { View, StyleSheet } from 'react-native';
import App from '../src/App';
import { name as appName } from '../app.json';

// Web-specific wrapper to ensure proper styling
const WebApp = () => (
  <View style={webStyles.container}>
    <App />
  </View>
);

const webStyles = StyleSheet.create({
  container: {
    height: '100vh', // Web-specific: ensure full viewport height
    width: '100vw', // Web-specific: ensure full viewport width
  },
});

AppRegistry.registerComponent(appName, () => WebApp);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('app-root'),
});
