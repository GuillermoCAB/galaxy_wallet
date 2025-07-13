import { Provider } from "react-redux";
import { persistor, store } from "./state/store";
import { ScreenManager } from "./screens";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScreenManager />
      </PersistGate>
    </Provider>
  );
}

export default App;
