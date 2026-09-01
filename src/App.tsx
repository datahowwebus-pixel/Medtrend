import React, { useState, useEffect } from 'react';
import { Product, HeroSlide, CartItem } from './types';
import { DEFAULT_HERO_SLIDES } from './data/brandData';
import { PRODUCTS } from './data/productsData';

// Modals
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { DataSheetModal } from './components/DataSheetModal';
import { RFQModal } from './components/RFQModal';
import { FolderStructureModal } from './components/FolderStructureModal';
import { ImageManagerModal } from './components/ImageManagerModal';

// Dedicated Separate Modular Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { Showcase3DPage } from './pages/Showcase3DPage';
import { B2BWholesalePage } from './pages/B2BWholesalePage';
import { AboutPage } from './pages/AboutPage';
import { QualityCertificationsPage } from './pages/QualityCertificationsPage';
import { CatalogDataSheetsPage } from './pages/CatalogDataSheetsPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { BrandGuidelinesPage } from './pages/BrandGuidelinesPage';

export default function App() {
  // Navigation Routing State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined);
  const [trackingSearchCode, setTrackingSearchCode] = useState<string>('MT-EXP-884912');

  // Hero Slides Dynamic Configuration
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);

  // Modals Visibility
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [dataSheetProduct, setDataSheetProduct] = useState<Product | null>(null);
  const [rfqProduct, setRfqProduct] = useState<Product | null>(null);
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);
  const [isFolderGuideOpen, setIsFolderGuideOpen] = useState<boolean>(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState<boolean>(false);

  // E-Commerce Shopping Cart State with localStorage backing
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('medtrend_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed initial cart item
    return [
      {
        id: 'cart-1',
        product: PRODUCTS[0],
        selectedFinish: 'German Satin Matte',
        quantity: 2,
        customEngraving: 'ST. MARY OR-1'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('medtrend_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Scroll to top on navigation
  const handleNavigate = (tab: string, productId?: string, categorySlug?: string) => {
    setActiveTab(tab);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    finish: string,
    quantity: number,
    customEngraving?: string
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedFinish === finish &&
          item.customEngraving === customEngraving
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        product,
        selectedFinish: finish,
        quantity,
        customEngraving
      };
      return [...prev, newItem];
    });
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenRFQ = (product?: Product) => {
    setRfqProduct(product || null);
    setIsRFQOpen(true);
  };

  const handleOpen3DStudio = (product: Product) => {
    setSelectedProductId(product.id);
    setActiveTab('showcase-3d');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateHeroSlides = (updatedSlides: HeroSlide[]) => {
    setHeroSlides(updatedSlides);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FCFE] text-[#0B2838] flex flex-col font-sans selection:bg-[#B3E5FC] selection:text-[#01579B]">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        cartCount={totalCartCount}
        onNavigate={handleNavigate}
        onOpenFolderGuide={() => setIsFolderGuideOpen(true)}
        onOpenImageManager={() => setIsImageManagerOpen(true)}
        onOpenRFQ={() => handleOpenRFQ()}
      />

      {/* Main Page Rendering Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            heroSlides={heroSlides}
            onNavigate={handleNavigate}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onOpenRFQ={(p) => handleOpenRFQ(p)}
            onOpenFolderGuide={() => setIsFolderGuideOpen(true)}
            onOpenImageManager={() => setIsImageManagerOpen(true)}
            onOpen3DStudio={handleOpen3DStudio}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            initialCategorySlug={selectedCategorySlug}
            onNavigateToDetail={(id) => handleNavigate('product-detail', id)}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onOpenRFQ={(p) => handleOpenRFQ(p)}
            onOpenDataSheet={(p) => setDataSheetProduct(p)}
            onAddToCart={handleAddToCart}
            onOpen3DStudio={handleOpen3DStudio}
            onOpenFolderGuide={() => setIsFolderGuideOpen(true)}
          />
        )}

        {activeTab === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId || PRODUCTS[0].id}
            onNavigateBack={() => handleNavigate('products')}
            onNavigateToProduct={(id) => handleNavigate('product-detail', id)}
            onAddToCart={handleAddToCart}
            onOpenRFQ={(p) => handleOpenRFQ(p)}
            onOpenDataSheet={(p) => setDataSheetProduct(p)}
            onOpen3DStudio={handleOpen3DStudio}
          />
        )}

        {activeTab === 'showcase-3d' && (
          <Showcase3DPage
            initialProduct={
              selectedProductId
                ? PRODUCTS.find((p) => p.id === selectedProductId) || null
                : null
            }
            onOpenRFQ={(p) => handleOpenRFQ(p)}
            onOpenDataSheet={(p) => setDataSheetProduct(p)}
            onNavigateToDetail={(id) => handleNavigate('product-detail', id)}
          />
        )}

        {activeTab === 'b2b-wholesale' && (
          <B2BWholesalePage
            onOpenRFQ={() => handleOpenRFQ()}
            onNavigateToProducts={() => handleNavigate('products')}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenRFQ={() => handleOpenRFQ()}
            onOpenFolderGuide={() => setIsFolderGuideOpen(true)}
            onNavigateToProducts={() => handleNavigate('products')}
          />
        )}

        {activeTab === 'quality-certifications' && (
          <QualityCertificationsPage onOpenRFQ={() => handleOpenRFQ()} />
        )}

        {activeTab === 'catalog-datasheets' && (
          <CatalogDataSheetsPage
            onOpenDataSheet={(p) => setDataSheetProduct(p)}
            onOpenRFQ={(p) => handleOpenRFQ(p)}
          />
        )}

        {activeTab === 'cart-checkout' && (
          <CartCheckoutPage
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onNavigateToProducts={() => handleNavigate('products')}
            onNavigateToTracking={(code) => {
              setTrackingSearchCode(code);
              handleNavigate('order-tracking');
            }}
          />
        )}

        {activeTab === 'order-tracking' && (
          <OrderTrackingPage
            initialCode={trackingSearchCode}
            onOpenRFQ={() => handleOpenRFQ()}
          />
        )}

        {activeTab === 'brand-guidelines' && (
          <BrandGuidelinesPage
            onOpenFolderGuide={() => setIsFolderGuideOpen(true)}
            onOpenImageManager={() => setIsImageManagerOpen(true)}
          />
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenFolderGuide={() => setIsFolderGuideOpen(true)}
        onOpenRFQ={() => handleOpenRFQ()}
      />

      {/* MODALS */}
      {/* 1. Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          isOpen={true}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onNavigateToDetail={(id) => {
            setQuickViewProduct(null);
            handleNavigate('product-detail', id);
          }}
          onAddToCart={handleAddToCart}
          onOpenRFQ={(p) => {
            setQuickViewProduct(null);
            handleOpenRFQ(p);
          }}
          onOpenDataSheet={(p) => {
            setQuickViewProduct(null);
            setDataSheetProduct(p);
          }}
          onOpen3DStudio={(p) => {
            setQuickViewProduct(null);
            handleOpen3DStudio(p);
          }}
        />
      )}

      {/* 2. Technical Data Sheet (TDS) Modal */}
      {dataSheetProduct && (
        <DataSheetModal
          isOpen={true}
          product={dataSheetProduct}
          onClose={() => setDataSheetProduct(null)}
        />
      )}

      {/* 3. B2B Request for Quote (RFQ) Modal */}
      {isRFQOpen && (
        <RFQModal
          isOpen={true}
          initialProduct={rfqProduct || undefined}
          onClose={() => {
            setIsRFQOpen(false);
            setRfqProduct(null);
          }}
        />
      )}

      {/* 4. Folder Structure & Image Guide Modal */}
      <FolderStructureModal
        isOpen={isFolderGuideOpen}
        onClose={() => setIsFolderGuideOpen(false)}
      />

      {/* 5. Image & Hero Slide Reference Manager Modal */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        heroSlides={heroSlides}
        onClose={() => setIsImageManagerOpen(false)}
        onUpdateSlide={handleUpdateHeroSlides}
      />
    </div>
  );
}
