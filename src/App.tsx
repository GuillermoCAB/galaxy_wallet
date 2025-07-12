import { Provider } from "react-redux";
import { store } from "./state/store";
import { ScreenManager } from "./screens";

function App() {
  return (
    <Provider store={store}>
      <ScreenManager />
    </Provider>
  );
}

export default App;
