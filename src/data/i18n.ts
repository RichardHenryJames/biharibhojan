// BihariBhojan — bilingual dictionary (English + natural, conversational Hindi).
// Hindi is written the way leading Indian brands write it — warm and idiomatic,
// NOT a literal word-by-word translation.

export type Lang = "en" | "hi";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "हिं" },
];

// Brand / contact constants (shared across languages where it makes sense).
export const BRAND = {
  city: { en: "Hazaribagh · Jharkhand", hi: "हज़ारीबाग़ · झारखंड" },
  addressLine: {
    en: "Vishnupuri, Hazaribagh, Jharkhand 825301",
    hi: "विष्णुपुरी, हज़ारीबाग़, झारखंड 825301",
  },
  phone: "+91 99340 12345",
  email: "ghar@biharibhojan.com",
  hours: { en: "Daily · 8 AM – 10 PM", hi: "रोज़ · सुबह 8 – रात 10" },
};

type Dict = Record<string, unknown>;

export const translations: Record<Lang, Dict> = {
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      about: "Our Story",
      contact: "Contact",
      orderNow: "Order Now",
      openCart: "Open cart",
      freeDelivery: "Free delivery on orders over",
    },
    hero: {
      badge: "Now serving fresh in Hazaribagh · Home kitchen",
      titleA: "Ghar ka",
      titleHighlight: "Bihari khana",
      titleB: "delivered hot.",
      subtitle:
        "Homestyle Besan Aloo, Parwal-Aloo Pulao and Chawal-Chokha — cooked fresh in our Hazaribagh kitchen, just like maa makes it, and brought warm to your door.",
      orderNow: "Order Now",
      ourStory: "Our Story",
      ratingLabel: "happy homes fed",
      avgDelivery: "avg. delivery",
      dishesLabel: "homestyle dishes",
      acrossThalis: "across 6 thalis",
    },
    marquee: [
      "Besan Aloo",
      "Parwal-Aloo Pulao",
      "Aloo Bhujia",
      "Chawal Chokha",
      "Litti Chokha",
      "Sattu Paratha",
      "Thekua",
      "Kadhi Badi",
      "Aloo Dum",
    ],
    categories: {
      eyebrow: "Explore the kitchen",
      titleA: "Six flavours of",
      titleHighlight: "home",
      subtitle:
        "From everyday ghar-ka-khana to festive treats — every corner of a Bihari kitchen, on one menu.",
      dishes: "dishes",
    },
    bestsellers: {
      eyebrow: "Most loved",
      titleA: "This week's",
      titleHighlight: "favourites",
      viewFull: "View full menu",
    },
    features: {
      eyebrow: "Why BihariBhojan",
      titleA: "Cooked with",
      titleHighlight: "love",
      subtitle: "The little things that make our food taste like home.",
      items: [
        {
          title: "Ghar ka khana, daily",
          body: "Cooked fresh every morning in small batches — no factory, no frozen shortcuts. Just home food.",
        },
        {
          title: "Honest ingredients",
          body: "Stone-ground sattu, cold-pressed mustard oil, pure desi ghee and seasonal sabzi. Nothing artificial.",
        },
        {
          title: "Hot in 30–45 min",
          body: "Snug, leak-proof packing keeps your chokha smoky and your pulao steaming till it reaches you.",
        },
        {
          title: "Maa's own recipes",
          body: "Every dish follows a family recipe from our own kitchen in Bihar — tested by people who grew up on it.",
        },
      ],
    },
    steps: {
      eyebrow: "How it works",
      titleA: "Hot food in",
      titleHighlight: "three steps",
      subtitle: "No fuss. Just tap, and let our kitchen do the rest.",
      items: [
        {
          title: "Pick your thali",
          body: "Browse our homestyle dishes and build your plate, just the way you like it.",
        },
        {
          title: "We cook fresh",
          body: "Our kitchen fires up the tawa and handi the moment your order comes in.",
        },
        {
          title: "Delivered hot",
          body: "Fresh, ghee-touched and piping hot — at your door in well under an hour.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Loved across Hazaribagh",
      titleA: "Real homes,",
      titleHighlight: "happy plates",
      items: [
        {
          quote:
            "Tastes exactly like the khana my nani made back home. The besan aloo and chokha brought back so many memories.",
          name: "Aditya Kumar",
          place: "Vishnupuri, Hazaribagh",
        },
        {
          quote:
            "The Parwal-Aloo Pulao is unreal — light, homely and full of flavour. We order every weekend now.",
          name: "Priya Sinha",
          place: "Korrah, Hazaribagh",
        },
        {
          quote:
            "Finally proper ghar-ka-khana that isn't oily restaurant food. Sent some to my parents and they loved it.",
          name: "Rahul Verma",
          place: "Hazaribagh",
        },
      ],
    },
    cta: {
      title: "Missing home food?",
      subtitle:
        "Your warm thali is one tap away. Order now and taste home in under an hour.",
      orderNow: "Order Now",
      readStory: "Read our story",
    },
    footer: {
      blurb:
        "Bringing the warm, ghee-touched comfort of a Bihari home kitchen to your doorstep in Hazaribagh — fresh-cooked every day, just like home.",
      explore: "Explore",
      company: "Company",
      getInTouch: "Get in touch",
      fullMenu: "Full Menu",
      bulk: "Bulk & Catering",
      track: "Track Order",
      openNow: "Open now · serving till 10 PM",
      madeWith: "Made with ❤️ in Hazaribagh, Jharkhand.",
      privacy: "Privacy",
      terms: "Terms",
    },
    menu: {
      eyebrow: "The full spread",
      titleA: "Our",
      titleHighlight: "menu",
      subtitleA: "dishes, freshly cooked to order across",
      subtitleB: "categories — pick your plate and we'll fire up the tawa.",
      searchPlaceholder: "Search besan aloo, pulao, litti…",
      vegOnly: "Veg only",
      sortRecommended: "Recommended",
      sortRating: "Top rated",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      all: "All",
      dish: "dish",
      dishes: "dishes",
      in: "in",
      noResults: "No dishes found",
      noResultsHint:
        "Try a different search or clear the filters to see the full menu.",
      resetFilters: "Reset filters",
    },
    product: {
      add: "Add",
      bestseller: "Bestseller",
      signature: "Homestyle",
      serves: "Serves",
    },
    cart: {
      title: "Your Thali",
      empty: "Your thali is empty",
      emptyHint: "Add some homestyle besan aloo to get started!",
      browse: "Browse the menu",
      addMore: "Add",
      forFreeDelivery: "more for free delivery",
      freeUnlocked: "You've unlocked free delivery!",
      subtotal: "Subtotal",
      checkout: "Proceed to Checkout",
      taxesNote: "Taxes calculated at checkout",
      clear: "Clear cart",
      added: "added to cart",
    },
    common: {
      veg: "Veg",
      nonVeg: "Non-veg",
    },
    about: {
      eyebrow: "Our story",
      titleA: "Bringing",
      titleHighlight: "ghar ka khana",
      titleB: "to Hazaribagh",
      intro:
        "Not oily restaurant food. The simple, fresh, ghee-touched home cooking our mothers and grandmothers made — now delivered to your door in Hazaribagh.",
      beganEyebrow: "How it began",
      beganTitle: "Born out of a craving",
      beganP1:
        "BihariBhojan started with a simple, stubborn craving — for the besan aloo and chawal-chokha that only ever tasted right at home. We realised our neighbours in Hazaribagh shared the same longing for honest ghar ka khana.",
      beganP2:
        "So we set up a small home kitchen in Vishnupuri, cooked in tiny fresh batches, and refused to compromise on a single ingredient — the mustard oil, the sattu, the desi ghee, the seasonal sabzi.",
      beganP3:
        "Today, every order is cooked fresh on our home tawa. Whether it's a Parwal-Aloo Pulao for lunch or a box of Chhath thekua for your parents, we cook it like family — because to us, it is.",
      tasteCta: "Taste it yourself",
      cardTitle: "From a Hazaribagh kitchen",
      cardSub: "to your doorstep",
      stats: [
        { value: "27+", label: "Homestyle dishes" },
        { value: "100%", label: "Fresh, never frozen" },
        { value: "5k+", label: "Plates served" },
        { value: "4.9★", label: "Average rating" },
      ],
      regionsEyebrow: "What we cook",
      regionsTitleA: "Made fresh,",
      regionsTitleHighlight: "every single day",
      regionsSubtitle: "Honest home food, the way it's meant to be — nothing pre-made, nothing frozen.",
      regions: [
        { emoji: "🥔", region: "Everyday sabzi", dish: "Besan Aloo · Aloo Dum", note: "Light, homely curries tempered with cumin, garlic and mustard oil." },
        { emoji: "🍚", region: "Rice & pulao", dish: "Parwal-Aloo Pulao", note: "Fragrant one-plate rice meals, just like a weekday lunch at home." },
        { emoji: "🔥", region: "Litti & chokha", dish: "Litti Chokha", note: "Roasted sattu littis drowned in ghee with smoky triple chokha." },
        { emoji: "🫓", region: "Naashta", dish: "Sattu & Aloo Paratha", note: "Stuffed parathas with white butter, curd and achar." },
      ],
      valuesEyebrow: "What we stand for",
      valuesTitleA: "Three promises we",
      valuesTitleHighlight: "never break",
      values: [
        { title: "Fresh, never frozen", body: "Cooked in small batches every day on a home tawa. No factory, no reheating." },
        { title: "Honest ingredients", body: "Stone-ground sattu, cold-pressed mustard oil, pure desi ghee and seasonal sabzi. Nothing artificial." },
        { title: "Recipes from home", body: "Every dish is a family recipe, cooked by people who grew up eating it. Just like maa makes." },
      ],
    },
  },

  hi: {
    nav: {
      home: "होम",
      menu: "मेन्यू",
      about: "हमारी कहानी",
      contact: "संपर्क",
      orderNow: "अभी ऑर्डर करें",
      openCart: "कार्ट खोलें",
      freeDelivery: "इससे ऊपर के ऑर्डर पर फ्री डिलीवरी —",
    },
    hero: {
      badge: "अब हज़ारीबाग़ में ताज़ा परोसा जा रहा है · घर की रसोई",
      titleA: "घर का",
      titleHighlight: "बिहारी खाना",
      titleB: "गरमागरम, आपके दरवाज़े।",
      subtitle:
        "घर जैसा बेसन आलू, परवल-आलू पुलाव और चावल-चोखा — हमारी हज़ारीबाग़ की रसोई में रोज़ ताज़ा बनता है, बिलकुल माँ के हाथ का स्वाद, और गरमागरम आपके घर तक।",
      orderNow: "अभी ऑर्डर करें",
      ourStory: "हमारी कहानी",
      ratingLabel: "घरों ने चखा",
      avgDelivery: "औसत डिलीवरी",
      dishesLabel: "घरेलू व्यंजन",
      acrossThalis: "6 थालियों में",
    },
    marquee: [
      "बेसन आलू",
      "परवल-आलू पुलाव",
      "आलू भुजिया",
      "चावल चोखा",
      "लिट्टी चोखा",
      "सत्तू पराठा",
      "ठेकुआ",
      "कढ़ी बड़ी",
      "आलू दम",
    ],
    categories: {
      eyebrow: "रसोई की सैर करें",
      titleA: "घर के",
      titleHighlight: "छह स्वाद",
      subtitle:
        "रोज़ के घर के खाने से लेकर त्योहारी पकवानों तक — बिहारी रसोई का हर कोना, एक ही मेन्यू में।",
      dishes: "व्यंजन",
    },
    bestsellers: {
      eyebrow: "सबसे पसंदीदा",
      titleA: "इस हफ़्ते की",
      titleHighlight: "पसंद",
      viewFull: "पूरा मेन्यू देखें",
    },
    features: {
      eyebrow: "क्यों BihariBhojan",
      titleA: "बनाया गया",
      titleHighlight: "प्यार से",
      subtitle: "छोटी-छोटी बातें, जो हमारे खाने को घर जैसा स्वाद देती हैं।",
      items: [
        {
          title: "रोज़ का घर का खाना",
          body: "हर सुबह छोटे बैच में ताज़ा बनता है — न फैक्ट्री, न फ्रोज़न शॉर्टकट। बस घर का खाना।",
        },
        {
          title: "ईमानदार सामग्री",
          body: "चक्की का सत्तू, कच्ची घानी सरसों का तेल, शुद्ध देसी घी और मौसमी सब्ज़ी। कुछ भी नकली नहीं।",
        },
        {
          title: "30–45 मिनट में गरमागरम",
          body: "मज़बूत, लीक-प्रूफ़ पैकिंग आपके चोखे की महक और पुलाव की गर्मी आप तक बनाए रखती है।",
        },
        {
          title: "माँ के अपने नुस्ख़े",
          body: "हर व्यंजन हमारी अपनी बिहारी रसोई की पुश्तैनी रेसिपी से बनता है — उन्हीं हाथों से, जो इसी खाने पर पले-बढ़े।",
        },
      ],
    },
    steps: {
      eyebrow: "कैसे काम करता है",
      titleA: "गरमागरम खाना,",
      titleHighlight: "तीन कदमों में",
      subtitle: "कोई झंझट नहीं। बस टैप कीजिए, बाकी हमारी रसोई पर छोड़ दीजिए।",
      items: [
        {
          title: "अपनी थाली चुनें",
          body: "हमारे घरेलू व्यंजनों में से चुनकर अपनी थाली, अपने मन मुताबिक सजाइए।",
        },
        {
          title: "हम ताज़ा बनाते हैं",
          body: "ऑर्डर आते ही हमारी रसोई में तवा और हाँडी चढ़ जाती है।",
        },
        {
          title: "गरमागरम पहुँचाते हैं",
          body: "ताज़ा, घी से महकता और गरमागरम — एक घंटे से भी कम में आपके दरवाज़े।",
        },
      ],
    },
    testimonials: {
      eyebrow: "हज़ारीबाग़ का चहेता",
      titleA: "असली घर,",
      titleHighlight: "खुश थालियाँ",
      items: [
        {
          quote:
            "बिलकुल वही स्वाद जो मेरी नानी घर पर बनाती थीं। बेसन आलू और चोखे ने कितनी यादें ताज़ा कर दीं।",
          name: "आदित्य कुमार",
          place: "विष्णुपुरी, हज़ारीबाग़",
        },
        {
          quote:
            "परवल-आलू पुलाव लाजवाब है — हल्का, घरेलू और स्वाद से भरपूर। अब तो हर वीकेंड ऑर्डर करते हैं।",
          name: "प्रिया सिन्हा",
          place: "कोररा, हज़ारीबाग़",
        },
        {
          quote:
            "आख़िरकार सही मायने में घर का खाना, न कि तैलीय रेस्टोरेंट वाला। माँ-पापा को भेजा, उन्हें बहुत पसंद आया।",
          name: "राहुल वर्मा",
          place: "हज़ारीबाग़",
        },
      ],
    },
    cta: {
      title: "घर के खाने की याद आ रही है?",
      subtitle:
        "आपकी गरमागरम थाली बस एक टैप दूर है। अभी ऑर्डर कीजिए और एक घंटे में घर का स्वाद पाइए।",
      orderNow: "अभी ऑर्डर करें",
      readStory: "हमारी कहानी पढ़ें",
    },
    footer: {
      blurb:
        "बिहारी घर की रसोई की वही घी-महकती गरमाहट, हज़ारीबाग़ में आपके दरवाज़े तक — रोज़ ताज़ा बना, बिलकुल घर जैसा।",
      explore: "एक्सप्लोर करें",
      company: "कंपनी",
      getInTouch: "संपर्क करें",
      fullMenu: "पूरा मेन्यू",
      bulk: "बल्क और कैटरिंग",
      track: "ऑर्डर ट्रैक करें",
      openNow: "अभी खुला है · रात 10 बजे तक",
      madeWith: "हज़ारीबाग़, झारखंड में ❤️ से बनाया गया।",
      privacy: "प्राइवेसी",
      terms: "शर्तें",
    },
    menu: {
      eyebrow: "पूरा खाना",
      titleA: "हमारा",
      titleHighlight: "मेन्यू",
      subtitleA: "व्यंजन, ऑर्डर पर ताज़ा बने —",
      subtitleB: "श्रेणियों में। अपनी थाली चुनिए, हम तवा चढ़ाते हैं।",
      searchPlaceholder: "बेसन आलू, पुलाव, लिट्टी खोजें…",
      vegOnly: "सिर्फ़ वेज",
      sortRecommended: "सुझाए गए",
      sortRating: "टॉप रेटेड",
      sortPriceLow: "क़ीमत: कम से ज़्यादा",
      sortPriceHigh: "क़ीमत: ज़्यादा से कम",
      all: "सभी",
      dish: "व्यंजन",
      dishes: "व्यंजन",
      in: "—",
      noResults: "कोई व्यंजन नहीं मिला",
      noResultsHint:
        "कोई और चीज़ खोजें या फ़िल्टर हटाकर पूरा मेन्यू देखें।",
      resetFilters: "फ़िल्टर हटाएँ",
    },
    product: {
      add: "जोड़ें",
      bestseller: "बेस्टसेलर",
      signature: "घर जैसा",
      serves: "के लिए",
    },
    cart: {
      title: "आपकी थाली",
      empty: "आपकी थाली खाली है",
      emptyHint: "शुरू करने के लिए थोड़ा घरेलू बेसन आलू जोड़िए!",
      browse: "मेन्यू देखें",
      addMore: "और",
      forFreeDelivery: "जोड़ें, फ्री डिलीवरी पाएँ",
      freeUnlocked: "आपने फ्री डिलीवरी अनलॉक कर ली!",
      subtotal: "कुल",
      checkout: "चेकआउट पर जाएँ",
      taxesNote: "टैक्स चेकआउट पर जुड़ेगा",
      clear: "कार्ट खाली करें",
      added: "कार्ट में जोड़ा गया",
    },
    common: {
      veg: "वेज",
      nonVeg: "नॉन-वेज",
    },
    about: {
      eyebrow: "हमारी कहानी",
      titleA: "हज़ारीबाग़ तक",
      titleHighlight: "घर का खाना",
      titleB: "पहुँचाना",
      intro:
        "तैलीय रेस्टोरेंट वाला खाना नहीं। वही सादा, ताज़ा, घी-महकता घर का खाना जो हमारी माँ और नानी-दादी बनाती थीं — अब हज़ारीबाग़ में आपके दरवाज़े।",
      beganEyebrow: "शुरुआत कैसे हुई",
      beganTitle: "एक तलब से जन्मा",
      beganP1:
        "BihariBhojan की शुरुआत एक सादी-सी ज़िद से हुई — उस बेसन आलू और चावल-चोखे के लिए जो सिर्फ़ घर पर सही बनता था। हमें एहसास हुआ कि हज़ारीबाग़ में हमारे पड़ोसी भी सच्चे घर के खाने को तरसते हैं।",
      beganP2:
        "तो हमने विष्णुपुरी में एक छोटी-सी घरेलू रसोई खोली, छोटे ताज़े बैच में पकाया, और एक भी चीज़ पर समझौता नहीं किया — सरसों का तेल, सत्तू, देसी घी और मौसमी सब्ज़ी।",
      beganP3:
        "आज हर ऑर्डर हमारे घर के तवे पर ताज़ा बनता है। चाहे दोपहर का परवल-आलू पुलाव हो या माँ-पापा के लिए छठ का ठेकुआ — हम इसे घर जैसे बनाते हैं, क्योंकि हमारे लिए यह घर ही है।",
      tasteCta: "खुद चखिए",
      cardTitle: "हज़ारीबाग़ की रसोई से",
      cardSub: "आपके दरवाज़े तक",
      stats: [
        { value: "27+", label: "घरेलू व्यंजन" },
        { value: "100%", label: "ताज़ा, कभी फ़्रोज़न नहीं" },
        { value: "5हज़ार+", label: "थालियाँ परोसीं" },
        { value: "4.9★", label: "औसत रेटिंग" },
      ],
      regionsEyebrow: "हम क्या बनाते हैं",
      regionsTitleA: "रोज़ ताज़ा",
      regionsTitleHighlight: "बनाया गया",
      regionsSubtitle: "सच्चा घर का खाना, जैसा होना चाहिए — कुछ भी पहले से बना नहीं, कुछ भी फ़्रोज़न नहीं।",
      regions: [
        { emoji: "🥔", region: "रोज़ की सब्ज़ी", dish: "बेसन आलू · आलू दम", note: "जीरा, लहसुन और सरसों के तेल के छौंक वाली हल्की, घरेलू सब्ज़ियाँ।" },
        { emoji: "🍚", region: "चावल और पुलाव", dish: "परवल-आलू पुलाव", note: "महकते एक-थाली चावल के खाने, बिलकुल घर के दोपहर जैसे।" },
        { emoji: "🔥", region: "लिट्टी और चोखा", dish: "लिट्टी चोखा", note: "घी में डूबी भुने सत्तू की लिट्टी, धुएँदार तिहरे चोखे के साथ।" },
        { emoji: "🫓", region: "नाश्ता", dish: "सत्तू औ आलू पराठा", note: "सफ़ेद मक्खन, दही और अचार के साथ भरवाँ पराठे।" },
      ],
      valuesEyebrow: "हम किस बात पर अटल हैं",
      valuesTitleA: "तीन वादे जो हम",
      valuesTitleHighlight: "कभी नहीं तोड़ते",
      values: [
        { title: "ताज़ा, कभी फ़्रोज़न नहीं", body: "रोज़ घर के तवे पर छोटे बैच में बनता है। न फैक्ट्री, न दुबारा गरम किया हुआ।" },
        { title: "ईमानदार सामग्री", body: "चक्की का सत्तू, कच्ची घानी सरसों का तेल, शुद्ध देसी घी और मौसमी सब्ज़ी। कुछ भी नकली नहीं।" },
        { title: "घर के नुस्ख़े", body: "हर व्यंजन एक पुश्तैनी रेसिपी है, उन्हीं हाथों से जो इसी खाने पर पले-बढ़े। बिलकुल माँ के हाथ जैसा।" },
      ],
    },
  },
};
