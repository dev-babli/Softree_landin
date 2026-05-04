// Canonical Framer CDN asset URLs mapped per section.
// All URLs extracted from fizens.html — replace "&amp;" with "&" at use.

const decode = (s: string) => s.replace(/&amp;/g, "&");

// ============ Logo ============
export const FIZENS_LOGO = decode(
  "https://framerusercontent.com/images/jc4HJpos41KVgY76kiPyn8nwGc.svg?width=45&amp;height=46"
);

// ============ Hero ============
export const HERO_DASHBOARD = decode(
  "https://framerusercontent.com/images/jeTeBuKnPiniPEixLqRGnCCPP6U.png?width=2592&amp;height=1088"
);

// Hero trust-row avatars (3 real users)
export const HERO_AVATARS = [
  decode(
    "https://framerusercontent.com/images/8j7MtVVIDIYqwbyfPIQHrhDf2Fw.jpg?width=1200&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/z7MRh9YQt36FSbvSyGMGalLTwk.jpg?width=1200&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/DZNJOIwlYVSuOLQUYlvD9UTjnVc.jpg?width=1200&amp;height=1200"
  ),
];

// ============ Brand strip ============
export const BRAND_STRIP = decode(
  "https://framerusercontent.com/images/2PJCBW3k14Gd59z05NimgBmXjSA.png?scale-down-to=1024&amp;width=1599&amp;height=1489"
);

// ============ Features Bento ============
// Large card (Expense & Income Tracking)
export const BENTO_TRACKING_MAIN = decode(
  "https://framerusercontent.com/images/vqovzzbe2Aal0uT3daXxOyAqy0.png?width=1272&amp;height=1272"
);
// Tracking sub-widget (transactions mini)
export const BENTO_TRACKING_SUB = decode(
  "https://framerusercontent.com/images/K1dKqLkgescF2YxTRGcgcziP0.png?width=716&amp;height=414"
);
// Blue card (Smart Savings Goals)
export const BENTO_SAVINGS_MAIN = decode(
  "https://framerusercontent.com/images/L3WMq2rdRHO8rdWDG8h0cMj29Bw.png?width=1492&amp;height=848"
);
export const BENTO_SAVINGS_SUB1 = decode(
  "https://framerusercontent.com/images/UBWiwgfWh2xmwtaNFXrxv5sfWl8.png?width=1016&amp;height=268"
);
export const BENTO_SAVINGS_SUB2 = decode(
  "https://framerusercontent.com/images/3OM0YiWEo9ylwDXqB5flB3LOO0.png?width=864&amp;height=228"
);
export const BENTO_SAVINGS_SUB3 = decode(
  "https://framerusercontent.com/images/c7toDsyiBMfQikFjnKDlZEbJzYk.png?scale-down-to=512&amp;width=698&amp;height=186"
);
// Analytics card (Financial Analytics — phone mockup)
export const BENTO_ANALYTICS_SCREEN = decode(
  "https://framerusercontent.com/images/gxQmZxFYa1dUokFSYyuBGf0Zko.png?width=375&amp;height=813"
);
export const BENTO_ANALYTICS_PHONE = decode(
  "https://framerusercontent.com/images/OQeFoCnJIzw1rB9itvFvGGvY.png?scale-down-to=1024"
);
export const BENTO_ANALYTICS_ALT = decode(
  "https://framerusercontent.com/images/b3Iyt6cDu9CxsRz3ZsKERuOSYZ8.png?width=1050&amp;height=848"
);

// ============ More Features (Addition) ============
export const MORE_FEATURE_VISUAL_A = decode(
  "https://framerusercontent.com/images/JDSot5NIN3WyEkAj3NoSKPG7f0c.png?scale-down-to=1024"
);
export const MORE_FEATURE_VISUAL_B = decode(
  "https://framerusercontent.com/images/yJLaUZwB3qYDuKfwXuJj6zQvge0.png?width=842&amp;height=1817"
);

// ============ Benefit ============
export const BENEFIT_1 = decode(
  "https://framerusercontent.com/images/HjrIbMlxQF2quPYpUhzfiIHgP8.png?width=1004&amp;height=1004"
);
export const BENEFIT_2 = decode(
  "https://framerusercontent.com/images/24FuYTjAsGI1mo2CsrbzrPQjOrI.png?width=2592&amp;height=1196"
);
export const BENEFIT_3 = decode(
  "https://framerusercontent.com/images/YzGqtPqHj2h6XUH2ylGCq4FqpKQ.png?width=1004&amp;height=1004"
);
export const BENEFIT_EXTRA = decode(
  "https://framerusercontent.com/images/ve1ZuWHGv5MeaWY1McuzGwuIraI.png?width=1004&amp;height=1004"
);

// ============ How It Works (phone mockups) ============
export const HOW_STEP_1 = decode(
  "https://framerusercontent.com/images/QmYFiO3lpR1L76dddOShat9nac.png?scale-down-to=1024&amp;width=750&amp;height=1624"
);
export const HOW_STEP_2 = decode(
  "https://framerusercontent.com/images/piKX7HBe8Lur8DC1MHIYtPuDLfc.png?scale-down-to=1024&amp;width=750&amp;height=1624"
);
export const HOW_STEP_3 = decode(
  "https://framerusercontent.com/images/PYZljkgzIz3O7efSLVUNVnZbMvE.png?scale-down-to=1024&amp;width=750&amp;height=1624"
);

// ============ Testimonial avatars ============
export const TESTIMONIAL_AVATARS = [
  decode(
    "https://framerusercontent.com/images/HXFg68VsClzI802fUPSJBwvwo.png?width=960&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/vhrHZGDV6GHME64j4wHVwOSfb8.png?width=904&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/PG5vQAQIzOrDyrT8NDWpDNTPoY.png?width=840&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/i2k3rhfcECl9A5LuquZJk5g819w.jpg?width=715&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/w8tNEZ89kafk3tblQ09yNPD3Q.jpg?width=904&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/F56myjiptyImT3RnkEkGW4RL7E.png?width=904&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/j0hQWynmD8bma7u8EGeCVya3Io.png?width=904&amp;height=1200"
  ),
  decode(
    "https://framerusercontent.com/images/nQ7ZlW3LUqX2WBlLbzTadqZ2uo.png?width=1200&amp;height=1200"
  ),
];

// ============ Stars ============
export const STAR_FULL = decode(
  "https://framerusercontent.com/images/mRKWlAh4jRqGltiwLSNo70jmqQw.svg?width=17&amp;height=16"
);
export const STAR_HALF = decode(
  "https://framerusercontent.com/images/LC8hefVUQiZ19Nyv5EfbZ1CyTe8.svg?width=17&amp;height=16"
);

// ============ Blog thumbnails ============
export const BLOG_THUMBS = [
  decode(
    "https://framerusercontent.com/images/it9VhB7jvDzMA2FahvSIIpzRrbQ.png?width=832&amp;height=520"
  ),
  decode(
    "https://framerusercontent.com/images/neu8z0higfnRkUhhh9P6JLg9Yk.png?width=832&amp;height=520"
  ),
  decode(
    "https://framerusercontent.com/images/jS7dLdo55m8KoiCUcAwq3fhnA.png?width=832&amp;height=520"
  ),
  decode(
    "https://framerusercontent.com/images/F98LGBOHfFqiDXa1swrICAuDeY.png?width=832&amp;height=520"
  ),
];

// ============ FAQ ============
export const FAQ_VISUAL = decode(
  "https://framerusercontent.com/images/XQ6LLoyOyTIJyh6FLMuoUt0Npfc.png?width=2592&amp;height=1276"
);

// ============ CTA decorations ============
export const CTA_DECO_LEFT = decode(
  "https://framerusercontent.com/images/0ZLGh9qBnO3ruNsz6L77XPDlw0.png?scale-down-to=512&amp;width=701&amp;height=581"
);
export const CTA_DECO_RIGHT = decode(
  "https://framerusercontent.com/images/vUJsJuLMdO9LyQXWgwza7cnmEkA.png?scale-down-to=512&amp;width=709&amp;height=709"
);

// ============ Hero decoration SVGs ============
export const HERO_DECO_LEFT = decode(
  "https://framerusercontent.com/images/FxG4w1m6Obfb6ChCSXhqQVQO70.svg?width=197&amp;height=193"
);
export const HERO_DECO_RIGHT = decode(
  "https://framerusercontent.com/images/oYG2689X2N6hn2mMqpUNrrJUoE.svg?width=197&amp;height=193"
);

// ============ About Section decoration ============
export const ABOUT_DECO = decode(
  "https://framerusercontent.com/images/H8Sn3i5awKMl87FuwNpkm3y7XQ.svg?width=402&amp;height=394"
);
