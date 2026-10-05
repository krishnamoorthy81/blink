import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS, CategoryName } from '../data/products';
import { playPopSound, playRemoveSound, playSuccessSound } from '../utils/audio';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  itemsTotal: number;
  deliveryCharge: number;
  handlingCharge: number;
  nightCharge: number;
  smallCartCharge: number;
  donation: number;
  tip: number;
  grandTotal: number;
  address: string;
  paymentMethod: string;
  placedAt: number;
  status: 'confirmed' | 'packing' | 'on_the_way' | 'delivered';
}

interface CartContextType {
  cart: Record<number, number>;
  activeCategory: CategoryName;
  setActiveCategory: (cat: CategoryName) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTip: number;
  setSelectedTip: (tip: number) => void;
  donationChecked: boolean;
  setDonationChecked: (checked: boolean) => void;
  userAddress: string;
  setUserAddress: (addr: string) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPaymentOpen: boolean;
  setIsPaymentOpen: (open: boolean) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  activeOrder: PlacedOrder | null;
  setActiveOrder: (order: PlacedOrder | null) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Actions
  updateCart: (id: number, delta: number) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: string) => void;

  // Computed
  cartItems: CartItem[];
  itemsCount: number;
  itemsTotal: number;
  deliveryCharge: number;
  handlingCharge: number;
  nightCharge: number;
  smallCartCharge: number;
  donationAmount: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('blinkit_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeCategory, setActiveCategory] = useState<CategoryName>('Milk');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTip, setSelectedTip] = useState(0);
  const [donationChecked, setDonationChecked] = useState(true);
  const [userAddress, setUserAddress] = useState(() => {
    try {
      return localStorage.getItem('blinkit_address') || 'TOWER-C, Nirvana Country, Sec 50';
    } catch {
      return 'TOWER-C, Nirvana Country, Sec 50';
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('blinkit_user');
      return saved ? JSON.parse(saved) : { name: '', phone: '', isLoggedIn: false };
    } catch {
      return { name: '', phone: '', isLoggedIn: false };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeOrder, setActiveOrder] = useState<PlacedOrder | null>(null);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to storage
  useEffect(() => {
    try {
      localStorage.setItem('blinkit_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Sync address to storage
  useEffect(() => {
    try {
      localStorage.setItem('blinkit_address', userAddress);
    } catch {
      // Ignore
    }
  }, [userAddress]);

  // Sync user to storage
  useEffect(() => {
    try {
      localStorage.setItem('blinkit_user', JSON.stringify(user));
    } catch {
      // Ignore
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const updateCart = (id: number, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      const newCart = { ...prev };

      if (next <= 0) {
        delete newCart[id];
        playRemoveSound();
      } else {
        newCart[id] = next;
        if (delta > 0) {
          playPopSound();
        } else {
          playRemoveSound();
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // Convert raw cart map to items
  const cartItems: CartItem[] = Object.entries(cart)
    .map(([idStr, quantity]) => {
      const id = Number(idStr);
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product || quantity <= 0) return null;
      return { product, quantity };
    })
    .filter((item): item is CartItem => item !== null);

  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const deliveryCharge = itemsTotal > 0 ? 30 : 0;
  const handlingCharge = itemsTotal > 0 ? 5 : 0;
  const nightCharge = itemsTotal > 0 ? 15 : 0;
  const smallCartCharge = itemsTotal > 0 && itemsTotal < 100 ? 20 : 0;
  const donationAmount = donationChecked && itemsTotal > 0 ? 1 : 0;
  const tipAmount = itemsTotal > 0 ? selectedTip : 0;

  const grandTotal =
    itemsTotal +
    deliveryCharge +
    handlingCharge +
    nightCharge +
    smallCartCharge +
    donationAmount +
    tipAmount;

  const placeOrder = (paymentMethod: string) => {
    if (cartItems.length === 0) return;

    const order: PlacedOrder = {
      orderId: 'BK' + Math.floor(100000 + Math.random() * 900000),
      items: [...cartItems],
      itemsTotal,
      deliveryCharge,
      handlingCharge,
      nightCharge,
      smallCartCharge,
      donation: donationAmount,
      tip: tipAmount,
      grandTotal,
      address: userAddress,
      paymentMethod,
      placedAt: Date.now(),
      status: 'confirmed',
    };

    setActiveOrder(order);
    clearCart();
    setIsPaymentOpen(false);
    setIsCartOpen(false);
    setIsOrderTrackingOpen(true);
    playSuccessSound();
    showToast('Order Received! Your delivery is arriving in 8-10 mins.');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedTip,
        setSelectedTip,
        donationChecked,
        setDonationChecked,
        userAddress,
        setUserAddress,
        user,
        setUser,
        isCartOpen,
        setIsCartOpen,
        isPaymentOpen,
        setIsPaymentOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        selectedProduct,
        setSelectedProduct,
        activeOrder,
        setActiveOrder,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        toastMessage,
        showToast,
        updateCart,
        clearCart,
        placeOrder,
        cartItems,
        itemsCount,
        itemsTotal,
        deliveryCharge,
        handlingCharge,
        nightCharge,
        smallCartCharge,
        donationAmount,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
