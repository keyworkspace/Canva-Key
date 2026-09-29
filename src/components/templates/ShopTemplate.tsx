import React, { useState } from 'react';
import { SiteConfig, ProductItem, CartItem } from '../../types';
import { SHOP_PRODUCTS, IMAGES } from '../../data/templates';
import { ShoppingBag, Star, Plus, Minus, Trash2, CheckCircle2, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ShopTemplateProps {
  config: SiteConfig;
}

export const ShopTemplate: React.FC<ShopTemplateProps> = ({ config }) => {
  const [cart, setCart] = useState<CartItem[]>([
    { product: SHOP_PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 35.0;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-[#fcfaf7] text-stone-900 selection:bg-amber-100">
      {/* Announcement Bar */}
      <div className="bg-[#1b271f] text-stone-200 text-[11px] py-2 px-4 text-center font-medium">
        Tueste artesanal semanal · Envíos gratuitos en península a partir de 35 €
      </div>

      {/* Shop Header */}
      <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-emerald-950 font-display">
            {config.brandName}
          </span>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <a href="#cafes" className="hover:text-emerald-900 transition-colors">Nuestros Cafés</a>
            <a href="#origen" className="hover:text-emerald-900 transition-colors">Trazabilidad</a>
            <a href="#suscripcion" className="hover:text-emerald-900 transition-colors">Suscripción</a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Carrito</span>
            {totalCount > 0 && (
              <span className="bg-emerald-900 text-white rounded-full px-1.5 py-0.2 text-[10px] font-mono-code">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-20 border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                Microlotes Éticos &amp; Puntuación SCA &gt; 86
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-tight font-display text-balance">
                {config.tagline}
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                {config.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#cafes"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-950 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <span>{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-500 font-medium">
                <span>Comercio Directo con Caficultores</span>
                <span aria-hidden="true">·</span>
                <span>Tostado en Malasaña, Madrid</span>
                <span aria-hidden="true">·</span>
                <span>Bolsas 100% Compostables</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-4/3 bg-stone-100">
                <img
                  src={IMAGES.coffee}
                  alt="Bolsa de café de especialidad Origen Tostadores"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="cafes" className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">Catálogo Activo</div>
            <h2 className="text-3xl font-bold text-stone-900 font-display">
              Cosechas Recientes
            </h2>
          </div>
          <div className="text-xs text-stone-500">
            Todos los paquetes incluyen fecha exacta de tueste y válvula desgasificadora.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOP_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-emerald-800/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-4/3 bg-stone-100 relative overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[11px] font-semibold px-2 py-0.5 rounded text-stone-700">
                    {prod.weight}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">
                    {prod.origin}
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {prod.notes}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-stone-100 pt-4">
                <div className="text-lg font-bold text-stone-900 font-mono-code tabular-nums">
                  {prod.price.toFixed(2)} €
                </div>
                <button
                  onClick={() => addToCart(prod)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-950 hover:bg-emerald-900 rounded-md transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-stone-600">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-stone-900 text-sm mb-0.5">Envíos Rápidos en 24/48h</div>
              <p>Empaquetado en frío el mismo día de la expedición para preservar aromas volátiles.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-stone-900 text-sm mb-0.5">Garantía de Frescura</div>
              <p>Si el café no cumple tus expectativas de cata, te reembolsamos o cambiamos el paquete sin coste.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-stone-900 text-sm mb-0.5">Pago Seguro y Certificado</div>
              <p>Encriptación SSL de 256 bits compatible con Bizum, Apple Pay y tarjetas bancarias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-950" />
                <h3 className="text-base font-bold text-stone-900 font-display">Tu Cesta de Compra</h3>
                <span className="text-xs text-stone-500">({totalCount} items)</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-stone-400 hover:text-stone-800 p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Shipping progress indicator */}
              <div className="bg-emerald-50 p-3 rounded-lg text-xs text-emerald-950">
                {freeShippingLeft > 0 ? (
                  <span>Añade <strong>{freeShippingLeft.toFixed(2)} €</strong> más para conseguir envío peninsular gratis.</span>
                ) : (
                  <span className="font-semibold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Genial! Tienes los gastos de envío gratis.
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-xs text-stone-500">
                  Tu cesta está vacía actualmente.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-stone-100 pb-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md border border-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-stone-500">{item.product.weight} · {item.product.price.toFixed(2)} €</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono-code tabular-nums px-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-stone-900 font-mono-code tabular-nums">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-6 border-t border-stone-200 space-y-4 bg-stone-50">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span className="font-bold text-stone-900 font-mono-code tabular-nums">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Envío estimado</span>
                <span>{freeShippingLeft === 0 ? 'Gratuito' : '3,95 €'}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutComplete(true)}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-950 hover:bg-emerald-900 disabled:opacity-50 rounded-lg transition-colors shadow-xs"
              >
                Tramitar Pedido Seguro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">¡Pedido Simulado con Éxito!</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              En una tienda real conectada con Shopify o Stripe, este botón redirige a la pasarela de pago segura bancaria.
            </p>
            <div className="bg-stone-50 p-4 rounded-xl text-xs space-y-1 text-left font-mono-code text-stone-700">
              <div>Total procesado: <strong>{(subtotal + (freeShippingLeft === 0 ? 0 : 3.95)).toFixed(2)} €</strong></div>
              <div>Paquetes: {totalCount} unidades</div>
              <div>Tueste previsto: Próximo martes</div>
            </div>
            <button
              onClick={() => {
                setCheckoutComplete(false);
                setIsCartOpen(false);
                setCart([]);
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-950 hover:bg-emerald-900 rounded-lg"
            >
              Finalizar y Continuar Navegando
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10 bg-white text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {config.brandName}. Especialidad &amp; Sostenibilidad.</div>
          <div className="flex items-center gap-6">
            <span>{config.contactEmail}</span>
            <span>{config.contactPhone}</span>
            <span>{config.address}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
