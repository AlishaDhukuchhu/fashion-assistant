import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Search as SearchIcon, Heart, User, ShoppingBag } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import AIProfileSetup from './pages/AIProfileSetup';
import AITryOn from './pages/AITryOn';
import MyCloset from './pages/MyCloset';
import SearchPage from './pages/SearchPage';
import ShopList from './pages/ShopList';
import MyBodyProfile from './pages/MyBodyProfile';
import ProfilePage from './pages/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage';
import WishlistPage from './pages/WishlistPage';
import ShippingAddressesPage from './pages/ShippingAddressesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import AddCardPage from './pages/AddCardPage';
import TrackOrderPage from './pages/TrackOrderPage';
import SettingsPage from './pages/SettingsPage';
import { ProfileProvider } from './context/ProfileContext';

import BottomNav from './components/BottomNav';
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="page-wrapper"
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  return (
    <div className="container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
          <Route path="/ai-setup" element={<PageWrapper><AIProfileSetup /></PageWrapper>} />
          <Route path="/ai-try-on" element={<PageWrapper><AITryOn /></PageWrapper>} />
          <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} />
          <Route path="/shops" element={<PageWrapper><ShopList /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
          <Route path="/body-profile" element={<PageWrapper><MyBodyProfile /></PageWrapper>} />
          <Route path="/profile/orders" element={<PageWrapper><MyOrdersPage /></PageWrapper>} />
          <Route path="/track-order/:id" element={<PageWrapper><TrackOrderPage /></PageWrapper>} />
          <Route path="/track-order" element={<PageWrapper><TrackOrderPage /></PageWrapper>} />
          <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />
          <Route path="/profile/addresses" element={<PageWrapper><ShippingAddressesPage /></PageWrapper>} />
          <Route path="/profile/payment" element={<PageWrapper><PaymentMethodsPage /></PageWrapper>} />
          <Route path="/profile/payment/add-card" element={<PageWrapper><AddCardPage /></PageWrapper>} />
          <Route path="/profile/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <AppContent />
      </Router>
    </ProfileProvider>
  );
}

export default App;
