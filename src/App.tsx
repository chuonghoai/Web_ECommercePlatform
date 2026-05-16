import { ToastProvider } from "./components/toast/toast";
import AppRoutes from "./routes";
import { CartProvider } from "./features/cart/contexts/CartContext";

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