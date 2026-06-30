// BihariBhojan — canonical menu. Single source of truth for the DB seed & UI.
// Homestyle (ghar ka khana) Bihari food, cooked fresh in Hazaribagh.
// Prices are whole rupees (₹). `image` holds an emoji used on the dish card art.
// Every item carries Hindi (nameHi / descriptionHi) for the bilingual UI.

export type MenuItem = {
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  descriptionHi: string;
  price: number;
  oldPrice?: number;
  image: string;
  isVeg: boolean;
  spiceLevel: number; // 0..3
  isBestseller?: boolean;
  isSignature?: boolean; // "homestyle special"
  rating: number;
  reviews: number;
  prepTime: number; // minutes
  serves: string;
  region?: string;
  tags: string[];
};

export type MenuCategory = {
  name: string;
  nameHi: string;
  slug: string;
  emoji: string;
  tagline: string;
  taglineHi: string;
  sortOrder: number;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    name: "Ghar ka Khana",
    nameHi: "घर का खाना",
    slug: "ghar-ka-khana",
    emoji: "🍲",
    tagline: "Everyday homestyle sabzi, just like maa makes",
    taglineHi: "रोज़ की घरेलू सब्ज़ी, बिलकुल माँ के हाथ की",
    sortOrder: 1,
    items: [
      {
        name: "Besan Aloo",
        nameHi: "बेसन आलू",
        slug: "besan-aloo",
        description:
          "Soft potatoes simmered in a light, fragrant gram-flour gravy tempered with cumin, garlic and mustard oil — pure comfort food.",
        descriptionHi:
          "नरम आलू, हल्की और महकती बेसन की तरी में पके — जीरा, लहसुन और सरसों के तेल के छौंक के साथ। बिलकुल सुकून वाला खाना।",
        price: 99,
        oldPrice: 119,
        image: "🥘",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        isSignature: true,
        rating: 4.9,
        reviews: 612,
        prepTime: 25,
        serves: "1-2",
        region: "Hazaribagh",
        tags: ["besan", "homestyle", "comfort", "ghar-ka-khana"],
      },
      {
        name: "Aloo Bhujia (Dry)",
        nameHi: "आलू भुजिया",
        slug: "aloo-bhujia",
        description:
          "Thin-sliced potatoes stir-fried dry with panch-phoran, green chilli and a hint of mustard oil. Crisp-edged and addictive.",
        descriptionHi:
          "पतले कटे आलू, पंच-फोरन, हरी मिर्च और सरसों के तेल में सूखी भुनी हुई। किनारों से करारी और बार-बार खाने का मन करे।",
        price: 89,
        image: "🍟",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        rating: 4.7,
        reviews: 388,
        prepTime: 20,
        serves: "1-2",
        region: "Hazaribagh",
        tags: ["aloo", "dry-sabzi", "homestyle"],
      },
      {
        name: "Bihari Aloo Dum",
        nameHi: "बिहारी आलू दम",
        slug: "bihari-aloo-dum",
        description:
          "Baby potatoes slow-cooked on dum in a spicy onion-tomato masala with mustard oil — rich, smoky and homely.",
        descriptionHi:
          "छोटे आलू, मसालेदार प्याज़-टमाटर की तरी में सरसों के तेल के साथ दम पर धीमे पके — गाढ़ा, धुएँदार और घरेलू स्वाद।",
        price: 119,
        image: "🥔",
        isVeg: true,
        spiceLevel: 3,
        rating: 4.7,
        reviews: 274,
        prepTime: 30,
        serves: "1-2",
        region: "Bihar",
        tags: ["aloo", "dum", "spicy"],
      },
      {
        name: "Parwal-Aloo ki Sabzi",
        nameHi: "परवल-आलू की सब्ज़ी",
        slug: "parwal-aloo-sabzi",
        description:
          "Pointed gourd and potato cooked dry with panch-phoran and turmeric — a classic Bihari seasonal favourite.",
        descriptionHi:
          "परवल और आलू, पंच-फोरन और हल्दी के साथ सूखी पकी — बिहार की एक चहेती मौसमी सब्ज़ी।",
        price: 109,
        image: "🥒",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.6,
        reviews: 196,
        prepTime: 25,
        serves: "1-2",
        region: "Bihar",
        tags: ["parwal", "seasonal", "homestyle"],
      },
      {
        name: "Kadhi Badi",
        nameHi: "कढ़ी बड़ी",
        slug: "kadhi-badi",
        description:
          "Silky gram-flour kadhi with soft fried badis, tempered with whole spices. Best ladled over hot rice.",
        descriptionHi:
          "रेशमी बेसन की कढ़ी और नरम तली बड़ियाँ, साबुत मसालों के तड़के के साथ। गरम चावल पर डालकर सबसे मज़ेदार।",
        price: 119,
        image: "🍜",
        isVeg: true,
        spiceLevel: 1,
        rating: 4.6,
        reviews: 241,
        prepTime: 25,
        serves: "1-2",
        region: "Bhojpur",
        tags: ["kadhi", "comfort"],
      },
      {
        name: "Chana Ghugni",
        nameHi: "चना घुघनी",
        slug: "chana-ghugni",
        description:
          "Slow-cooked white peas in a light homely masala with onion and ginger — protein-rich and soul-warming.",
        descriptionHi:
          "सफ़ेद मटर, प्याज़ और अदरक के हल्के घरेलू मसाले में धीमे पके — प्रोटीन से भरपूर और दिल को सुकून देने वाला।",
        price: 89,
        image: "🫛",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.6,
        reviews: 287,
        prepTime: 20,
        serves: "1",
        region: "Hazaribagh",
        tags: ["ghugni", "peas", "homestyle"],
      },
    ],
  },
  {
    name: "Litti & Chokha",
    nameHi: "लिट्टी और चोखा",
    slug: "litti-chokha",
    emoji: "🔥",
    tagline: "Roasted sattu littis, drowned in ghee",
    taglineHi: "भुने सत्तू की लिट्टी, घी में डूबी हुई",
    sortOrder: 2,
    items: [
      {
        name: "Classic Litti Chokha",
        nameHi: "क्लासिक लिट्टी चोखा",
        slug: "classic-litti-chokha",
        description:
          "Four roasted wheat balls stuffed with spiced sattu, ajwain & garlic, dunked in pure ghee and served with smoky aloo-baingan-tomato chokha.",
        descriptionHi:
          "चार भुनी आटे की लिट्टी, मसालेदार सत्तू, अजवाइन और लहसुन से भरी, शुद्ध घी में डूबी — साथ में धुएँदार आलू-बैंगन-टमाटर का चोखा।",
        price: 149,
        oldPrice: 179,
        image: "🔥",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        isSignature: true,
        rating: 4.9,
        reviews: 1240,
        prepTime: 25,
        serves: "1-2",
        region: "Magadh",
        tags: ["ghee", "smoky", "classic"],
      },
      {
        name: "Ghee-Soaked Litti (6 pcs)",
        nameHi: "घी वाली लिट्टी (6 पीस)",
        slug: "ghee-soaked-litti",
        description:
          "Half-a-dozen golden littis bathed generously in desi ghee. Comes with green chutney and a wedge of raw onion.",
        descriptionHi:
          "आधा दर्जन सुनहरी लिट्टी, देसी घी में जी भरकर डूबी। साथ में हरी चटनी और कच्चे प्याज़ का टुकड़ा।",
        price: 169,
        image: "🧈",
        isVeg: true,
        spiceLevel: 1,
        isBestseller: true,
        rating: 4.8,
        reviews: 642,
        prepTime: 25,
        serves: "2",
        region: "Magadh",
        tags: ["ghee", "vegetarian"],
      },
      {
        name: "Triple Chokha Bowl",
        nameHi: "तिहरा चोखा बाउल",
        slug: "triple-chokha-bowl",
        description:
          "Mashed roasted aloo, smoked baingan bharta & tangy tomato chokha tempered with mustard oil, garlic and green chilli.",
        descriptionHi:
          "भुना आलू, धुएँदार बैंगन भरता और चटपटा टमाटर चोखा — सरसों के तेल, लहसुन और हरी मिर्च के छौंक के साथ।",
        price: 99,
        image: "🍆",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.7,
        reviews: 174,
        prepTime: 20,
        serves: "1",
        region: "Magadh",
        tags: ["side", "smoky", "mustard-oil"],
      },
      {
        name: "Sattu Baati (4 pcs)",
        nameHi: "सत्तू बाटी (4 पीस)",
        slug: "sattu-baati",
        description:
          "Rustic baked sattu baatis with a crisp crust and soft, spiced centre — a roadside favourite from Champaran.",
        descriptionHi:
          "देहाती अंदाज़ की सत्तू बाटी, ऊपर से करारी और अंदर से नरम-मसालेदार — चंपारण की सड़क-किनारे की पसंद।",
        price: 139,
        image: "🟤",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.6,
        reviews: 211,
        prepTime: 25,
        serves: "1-2",
        region: "Champaran",
        tags: ["sattu", "baked"],
      },
    ],
  },
  {
    name: "Rice & Pulao",
    nameHi: "चावल और पुलाव",
    slug: "rice-pulao",
    emoji: "🍚",
    tagline: "Homely one-plate rice meals",
    taglineHi: "एक थाली में घरेलू चावल का खाना",
    sortOrder: 3,
    items: [
      {
        name: "Chawal Chokha",
        nameHi: "चावल चोखा",
        slug: "chawal-chokha",
        description:
          "Steaming rice paired with smoky aloo-baingan-tomato chokha and a drizzle of mustard oil — the simplest, most loved Bihari plate.",
        descriptionHi:
          "गरमागरम चावल, धुएँदार आलू-बैंगन-टमाटर चोखे और सरसों के तेल की बूँदों के साथ — सबसे सादा और सबसे चहेती बिहारी थाली।",
        price: 89,
        image: "🍚",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        isSignature: true,
        rating: 4.8,
        reviews: 521,
        prepTime: 20,
        serves: "1",
        region: "Hazaribagh",
        tags: ["rice", "chokha", "homestyle", "ghar-ka-khana"],
      },
      {
        name: "Parwal-Aloo Pulao",
        nameHi: "परवल-आलू पुलाव",
        slug: "parwal-aloo-pulao",
        description:
          "Fragrant rice cooked with pointed gourd, potato and gentle whole spices — light, homely and full of flavour.",
        descriptionHi:
          "महकता पुलाव, परवल, आलू और हल्के साबुत मसालों के साथ पका — हल्का, घरेलू और स्वाद से भरपूर।",
        price: 129,
        oldPrice: 149,
        image: "🍛",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        isSignature: true,
        rating: 4.8,
        reviews: 433,
        prepTime: 30,
        serves: "1-2",
        region: "Bihar",
        tags: ["pulao", "parwal", "homestyle"],
      },
      {
        name: "Dal Bhaat Tarkari",
        nameHi: "दाल भात तरकारी",
        slug: "dal-bhaat-tarkari",
        description:
          "Ghee-tempered arhar dal, fluffy rice and a seasonal vegetable tarkari with papad & achar. A complete homely meal.",
        descriptionHi:
          "घी के तड़के वाली अरहर दाल, खिला-खिला चावल और मौसमी तरकारी — साथ में पापड़ और अचार। पूरा घरेलू भोजन।",
        price: 149,
        image: "🥣",
        isVeg: true,
        spiceLevel: 1,
        isBestseller: true,
        rating: 4.7,
        reviews: 356,
        prepTime: 25,
        serves: "1",
        region: "Patna",
        tags: ["dal", "everyday", "thali"],
      },
      {
        name: "Jeera Rice & Aloo Dum",
        nameHi: "जीरा राइस और आलू दम",
        slug: "jeera-rice-aloo-dum",
        description:
          "Buttery cumin rice served with our spicy Bihari aloo dum — a comforting, fuss-free combo.",
        descriptionHi:
          "मक्खन-जीरे वाला चावल, हमारे मसालेदार बिहारी आलू दम के साथ — सुकून देने वाला, बेझंझट कॉम्बो।",
        price: 159,
        image: "🍚",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.6,
        reviews: 168,
        prepTime: 30,
        serves: "1",
        region: "Bihar",
        tags: ["rice", "aloo-dum", "combo"],
      },
    ],
  },
  {
    name: "Paratha & Naashta",
    nameHi: "पराठा और नाश्ता",
    slug: "paratha-naashta",
    emoji: "🫓",
    tagline: "Stuffed parathas & morning bites",
    taglineHi: "भरवाँ पराठे और सुबह का नाश्ता",
    sortOrder: 4,
    items: [
      {
        name: "Sattu Paratha (2 pcs)",
        nameHi: "सत्तू पराठा (2 पीस)",
        slug: "sattu-paratha",
        description:
          "Two stuffed sattu parathas with white butter, aloo bharta, curd and achar. Smoky, nutty and filling.",
        descriptionHi:
          "दो भरवाँ सत्तू पराठे, सफ़ेद मक्खन, आलू भरता, दही और अचार के साथ। धुएँदार, करारे और पेट भर देने वाले।",
        price: 119,
        oldPrice: 139,
        image: "🫓",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        rating: 4.8,
        reviews: 488,
        prepTime: 25,
        serves: "1",
        region: "Patna",
        tags: ["sattu", "paratha", "breakfast"],
      },
      {
        name: "Aloo Paratha (2 pcs)",
        nameHi: "आलू पराठा (2 पीस)",
        slug: "aloo-paratha",
        description:
          "Two soft parathas stuffed with spiced mashed potato, served with white butter, curd and achar.",
        descriptionHi:
          "दो नरम पराठे, मसालेदार आलू की भरावन के साथ — साथ में सफ़ेद मक्खन, दही और अचार।",
        price: 109,
        image: "🥔",
        isVeg: true,
        spiceLevel: 1,
        rating: 4.6,
        reviews: 312,
        prepTime: 20,
        serves: "1",
        region: "Hazaribagh",
        tags: ["aloo", "paratha", "breakfast"],
      },
      {
        name: "Sattu Kachori (4 pcs)",
        nameHi: "सत्तू कचौड़ी (4 पीस)",
        slug: "sattu-kachori",
        description:
          "Flaky deep-fried kachoris packed with tangy spiced sattu, served with aloo sabzi & chutney.",
        descriptionHi:
          "करारी तली कचौड़ियाँ, चटपटे मसालेदार सत्तू से भरी — साथ में आलू की सब्ज़ी और चटनी।",
        price: 99,
        image: "🥠",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.7,
        reviews: 219,
        prepTime: 25,
        serves: "1-2",
        region: "Patna",
        tags: ["fried", "sattu", "snack"],
      },
      {
        name: "Dal Pitha (6 pcs)",
        nameHi: "दाल पीठा (6 पीस)",
        slug: "dal-pitha",
        description:
          "Steamed rice-flour dumplings stuffed with spiced chana dal — Mithila's beloved 'Bihari momo'.",
        descriptionHi:
          "भाप में पके चावल-आटे के पीठे, मसालेदार चना दाल से भरे — मिथिला का चहेता 'बिहारी मोमो'।",
        price: 119,
        image: "🥟",
        isVeg: true,
        spiceLevel: 1,
        isBestseller: true,
        rating: 4.8,
        reviews: 365,
        prepTime: 30,
        serves: "1-2",
        region: "Mithila",
        tags: ["steamed", "dumpling"],
      },
      {
        name: "Ghugni Chaat",
        nameHi: "घुघनी चाट",
        slug: "ghugni-chaat",
        description:
          "Slow-cooked white peas tempered with onion, green chilli, lemon and a dust of bhuna masala.",
        descriptionHi:
          "धीमे पके सफ़ेद मटर, प्याज़, हरी मिर्च, नींबू और भुने मसाले के छिड़काव के साथ।",
        price: 79,
        image: "🫛",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.6,
        reviews: 198,
        prepTime: 15,
        serves: "1",
        region: "Patna",
        tags: ["chaat", "peas", "street"],
      },
    ],
  },
  {
    name: "Ghar ki Thali",
    nameHi: "घर की थाली",
    slug: "ghar-ki-thali",
    emoji: "🍱",
    tagline: "A full homely meal on one plate",
    taglineHi: "एक थाली में पूरा घरेलू भोजन",
    sortOrder: 5,
    items: [
      {
        name: "Homestyle Veg Thali",
        nameHi: "घरेलू वेज थाली",
        slug: "homestyle-veg-thali",
        description:
          "Dal, rice, a seasonal sabzi, besan aloo, roti, papad, achar and a sweet — the complete ghar-ka-khana spread.",
        descriptionHi:
          "दाल, चावल, मौसमी सब्ज़ी, बेसन आलू, रोटी, पापड़, अचार और एक मिठाई — पूरा घर का खाना एक थाली में।",
        price: 199,
        oldPrice: 239,
        image: "🍱",
        isVeg: true,
        spiceLevel: 2,
        isBestseller: true,
        isSignature: true,
        rating: 4.9,
        reviews: 724,
        prepTime: 30,
        serves: "1",
        region: "Hazaribagh",
        tags: ["thali", "complete-meal", "homestyle"],
      },
      {
        name: "Litti Chokha Thali",
        nameHi: "लिट्टी चोखा थाली",
        slug: "litti-chokha-thali",
        description:
          "Four ghee littis, triple chokha, green chutney, achar and a sweet. A wholesome Bihari plate.",
        descriptionHi:
          "चार घी वाली लिट्टी, तिहरा चोखा, हरी चटनी, अचार और एक मिठाई। एक भरपूर बिहारी थाली।",
        price: 219,
        image: "🔥",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.8,
        reviews: 402,
        prepTime: 30,
        serves: "1",
        region: "Magadh",
        tags: ["thali", "litti"],
      },
      {
        name: "Sattu Paratha Thali",
        nameHi: "सत्तू पराठा थाली",
        slug: "sattu-paratha-thali",
        description:
          "Two sattu parathas, white butter, aloo bharta, curd, salad and achar. Smoky, nutty and filling.",
        descriptionHi:
          "दो सत्तू पराठे, सफ़ेद मक्खन, आलू भरता, दही, सलाद और अचार। धुएँदार, करारे और पेट भर देने वाले।",
        price: 199,
        image: "🫓",
        isVeg: true,
        spiceLevel: 2,
        rating: 4.7,
        reviews: 268,
        prepTime: 25,
        serves: "1",
        region: "Patna",
        tags: ["thali", "sattu"],
      },
    ],
  },
  {
    name: "Mithai & Sharbat",
    nameHi: "मिठाई और शर्बत",
    slug: "mithai-sharbat",
    emoji: "🍯",
    tagline: "Gud, til & sattu — desi sweets and coolers",
    taglineHi: "गुड़, तिल और सत्तू — देसी मिठाई और ठंडक",
    sortOrder: 6,
    items: [
      {
        name: "Thekua (250g)",
        nameHi: "ठेकुआ (250 ग्राम)",
        slug: "thekua",
        description:
          "Crunchy ghee-and-jaggery wheat cookies pressed in wooden moulds — the taste of Chhath Puja.",
        descriptionHi:
          "घी और गुड़ की करारी गेहूँ की कुकीज़, लकड़ी के साँचों में दबाई — छठ पूजा का स्वाद।",
        price: 149,
        image: "🍪",
        isVeg: true,
        spiceLevel: 0,
        isBestseller: true,
        rating: 4.8,
        reviews: 712,
        prepTime: 20,
        serves: "box",
        region: "Magadh",
        tags: ["jaggery", "ghee", "festive"],
      },
      {
        name: "Makhana Kheer",
        nameHi: "मखाना खीर",
        slug: "makhana-kheer",
        description:
          "Slow-simmered fox-nut and milk pudding scented with cardamom, saffron & chopped nuts.",
        descriptionHi:
          "धीमे पकी मखाने और दूध की खीर, इलायची, केसर और कटे मेवों की महक के साथ।",
        price: 129,
        image: "🍮",
        isVeg: true,
        spiceLevel: 0,
        isBestseller: true,
        rating: 4.8,
        reviews: 333,
        prepTime: 25,
        serves: "1-2",
        region: "Mithila",
        tags: ["kheer", "makhana", "dessert"],
      },
      {
        name: "Malpua (4 pcs)",
        nameHi: "मालपुआ (4 पीस)",
        slug: "malpua",
        description:
          "Saffron-laced fried pancakes soaked in cardamom syrup, finished with a sprinkle of pistachio.",
        descriptionHi:
          "केसर वाले तले मालपुए, इलायची की चाशनी में डूबे — ऊपर से पिस्ता का छिड़काव।",
        price: 149,
        image: "🥞",
        isVeg: true,
        spiceLevel: 0,
        rating: 4.6,
        reviews: 158,
        prepTime: 25,
        serves: "1-2",
        region: "Mithila",
        tags: ["fried", "syrup", "festive"],
      },
      {
        name: "Sattu Sharbat (Namkeen)",
        nameHi: "सत्तू शर्बत (नमकीन)",
        slug: "sattu-sharbat-namkeen",
        description:
          "Bihar's original energy drink — roasted gram-flour whisked with water, black salt, lemon, roasted cumin & mint.",
        descriptionHi:
          "बिहार का असली एनर्जी ड्रिंक — भुना सत्तू, पानी, काला नमक, नींबू, भुना जीरा और पुदीने के साथ फेंटा हुआ।",
        price: 59,
        image: "🥤",
        isVeg: true,
        spiceLevel: 1,
        isBestseller: true,
        rating: 4.7,
        reviews: 521,
        prepTime: 10,
        serves: "1",
        region: "Bihar",
        tags: ["sattu", "cooler", "summer"],
      },
      {
        name: "Aam Panna",
        nameHi: "आम पन्ना",
        slug: "aam-panna",
        description:
          "Tangy-sweet raw mango cooler with roasted cumin, black salt and mint — beats the summer heat every time.",
        descriptionHi:
          "खट्टा-मीठा कच्चे आम का शर्बत, भुने जीरे, काले नमक और पुदीने के साथ — गर्मी को हर बार मात दे।",
        price: 69,
        image: "🥭",
        isVeg: true,
        spiceLevel: 1,
        rating: 4.6,
        reviews: 203,
        prepTime: 10,
        serves: "1",
        region: "Bihar",
        tags: ["mango", "summer"],
      },
    ],
  },
];

/** Flattened list of every dish with its category slug + names attached. */
export const allItems = menuData.flatMap((c) =>
  c.items.map((it) => ({
    ...it,
    categorySlug: c.slug,
    categoryName: c.name,
    categoryNameHi: c.nameHi,
  })),
);
