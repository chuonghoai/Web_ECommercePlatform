import { ToastProvider } from "./components/toast/toast";
import { CartProvider } from "./features/cart/contexts/CartProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;