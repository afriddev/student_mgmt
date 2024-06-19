import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import HomeMain from "./utils/HomeMain";
import AppContext from "./utils/AppContext";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <HomeMain />
      </AppContext>
    </QueryClientProvider>
  );
}
export default App;
