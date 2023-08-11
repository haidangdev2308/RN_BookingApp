
import { Text, View } from 'react-native';
import StackNavigators from './StackNavigators';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {

  return (
    <>
      <Provider store={store}>
        <StackNavigators />
      </Provider>
    </>
  );
}