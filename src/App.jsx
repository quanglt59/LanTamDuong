import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import Benefits from './components/Benefits';
import ProductShowcase from './components/ProductShowcase';
import ProductGrid from './components/ProductGrid';
import Trust from './components/Trust';
import OrderForm from './components/OrderForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import CustomBasketBadge from './components/CustomBasketBadge';
import FloatingContacts from './components/FloatingContacts';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customBasketItems, setCustomBasketItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Mở giỏ hàng sau khi thêm
    setIsCartOpen(true);
  };

  const handleAddToCustomBasket = (product) => {
    const existingItem = customBasketItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCustomBasketItems(customBasketItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCustomBasketItems([...customBasketItems, { ...product, quantity: 1 }]);
    }
    // KHÔNG scroll tự động khi chọn sản phẩm
  };

  const handleScrollToOrderForm = () => {
    const orderForm = document.getElementById('order');
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPreMadeBasket = (productType) => {
    // Set product trong form khi chọn giỏ quà sẵn có
    setSelectedProduct(productType);
    // Scroll to form
    setTimeout(() => {
      handleScrollToOrderForm();
    }, 100);
  };

  const handleRemoveFromCustomBasket = (productId) => {
    setCustomBasketItems(customBasketItems.filter(item => item.id !== productId));
  };

  const handleUpdateCustomBasketQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCustomBasket(productId);
      return;
    }
    
    setCustomBasketItems(customBasketItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    // Scroll to order form
    const orderForm = document.getElementById('order');
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth' });
      setIsCartOpen(false);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const customBasketItemCount = customBasketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BrandStory />
        <Benefits />
        <ProductShowcase onSelectBasket={handleSelectPreMadeBasket} />
        <ProductGrid onAddToCustomBasket={handleAddToCustomBasket} />
        <Trust />
        <OrderForm 
          customBasketItems={customBasketItems}
          onRemoveItem={handleRemoveFromCustomBasket}
          onUpdateQuantity={handleUpdateCustomBasketQuantity}
          selectedProduct={selectedProduct}
          onSelectedProductChange={setSelectedProduct}
        />
        <Testimonials />
      </main>
      <Footer />
      <CustomBasketBadge 
        itemCount={customBasketItemCount}
        onClick={handleScrollToOrderForm}
      />
      <ShoppingCart
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <FloatingContacts />
    </div>
  );
}

export default App;
