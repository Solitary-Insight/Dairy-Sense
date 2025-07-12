import { ArrowRight, Plus, Wifi, BarChart3 } from "lucide-react"
import {
  Heart,
  Activity,
  Milk,
  ShoppingCart,
  Users,
 
  Truck,
  MapPin,
} from "lucide-react"
export const LANG_META = {
  en: {
    label: "English",
    class: 'english',
    dir: "ltr",
    locale: "en-US"
  },
  ur: {
    label: "اردو",
    class: 'urdu',

    dir: "rtl",
    locale: "ur-PK"
  }
};


export const LANG_CONTENT = {
  en: {
    meta: LANG_META.en,
    nav: {
      home: "Home",
      features: "Features",
      request_demo: "Request Demo",
      pricing: "Pricing",
      contact: "Contact",
      login: "Login",
      register_farm: "Register Farm"
    },
    hero: {
      badge: "🌿 Empowering Smart Dairy Farming",
      heading: {
        pre: "Revolutionizing Dairy Farming with",
        highlight: "Smart Intelligence"
      },
      description:
        "From animal health to milk production — manage everything in one place. AgroSense blends technology, animal welfare, and operational efficiency for the modern dairy farm.",
      cta_primary: "Start Free Trial",
      cta_secondary: "Watch Demo",
      trust: ["ISO Certified", "Vet Approved", "Secure & Private"],
      image_alt:
        "Smart dairy farm with sensor-equipped cows in lush green pasture",
      live_monitoring: "Live Monitoring",
      status_title: "Farm Status",
      status_value: "All Systems Healthy"
    },
    features: {
      title: "Complete Farm Management Suite",
      subtitle: "Everything you need to run a modern, efficient dairy farm.",
      items: [
        {
          title: "Cattle Lifecycle Management",
          icon: Heart,
          color: "text-red-500",
          description:
            "Complete animal profiles with breed info, medical history, calving records, and real-time health monitoring via smart collars.",
        },
        {
          title: "Smart Behavior Monitoring",
          icon: Activity,
          color: "text-blue-500",
          description:
            "IMU sensors track eating, walking, resting, grazing patterns. Predict estrus periods and detect health anomalies early.",
        },
        {
          title: "Milk Production & Feed Management",
          icon: Milk,
          color: "text-yellow-500",
          description:
            "Track daily yield per animal, monitor feed consumption, and optimize nutrition with detailed analytics.",
        },
        {
          title: "Integrated Marketplace",
          icon: ShoppingCart,
          color: "text-indigo-500",
          description:
            "Buy and sell farm products, medicines, feed, and equipment. Connect with suppliers and customers directly through our platform.",
        },
        {
          title: "HR & Payroll Management",
          icon: Users,
          color: "text-purple-500",
          description:
            "Manage employee attendance, assign tasks, track performance, and handle payroll seamlessly.",
        },
        {
          title: "Dealership & Supply Chain",

          icon: Truck,
          color: "text-orange-500",
          description:
            "Integrated network for medicines, feed, and tools. Streamline procurement and inventory management.",
        },
        {
          title: "Financial Dashboard",
          icon: BarChart3,
          color: "text-green-500",
          description:
            "Comprehensive income vs expense reports, profitability insights, and accurate forecasting tools.",
        },
        {
          title: "Geo-Location Tracking",
          icon: MapPin,
          color: "text-teal-500",
          description:
            "Monitor cattle location and movement patterns with GPS-enabled smart collars for enhanced security.",
        },
      ],
    },
    technology: {
      badge: "🔬 Advanced Sensor Technology",
      title: "Smart Collar System",
      imu_active: "IMU Active",
      gpa_signal: "GPS Signal",
      temp: "22°C",
      description:
        "Our revolutionary neck-collar combines multiple sensors to provide comprehensive monitoring of your cattle's health, behavior, and location in real-time.",
      features: [
        {
          title: "IMU Sensors",
          description:
            "Advanced motion detection for activity classification and behavior analysis",
        },
        {
          title: "GPS Tracking",
          description:
            "Real-time location monitoring and movement pattern analysis",
        },
        {
          title: "Environmental Monitoring",
          description:
            "Temperature and humidity sensors for optimal animal comfort",
        },
        {
          title: "Anomaly Detection",
          description:
            "AI-powered alerts for health issues and behavioral changes",
        },
      ],
      key_capablities: "Key Capabilites",
      capabilities: [
        "Activity classification: eating, walking, resting, grazing, standing",
        "Estrus (heating) period prediction with 95% accuracy",
        "Early health anomaly detection and alerts",
        "Environmental comfort monitoring",
      ],
    },
    how_it_works: {
      title: "How AgroSense Works",
      subtitle: "Get started with AgroSense in three simple steps and transform your dairy farm management today.",

      steps: [
        {

          icon: Plus,
          color: "bg-green-500",
          title: "Add Your Farm",
          step: 'step 1',
          description: "Register your farm details, add cattle profiles, and set up your account in minutes.",
        },
        {
          title: "Connect Devices",
          icon: Wifi,
          color: "bg-blue-500",
          step: 'step 2',

          description: "Install smart collars on your cattle and connect to our monitoring system.",
        },
        {
          title: "Get Real-Time Insights",
          step: 'step 3',
          icon: BarChart3,
          color: "bg-purple-500",
          description: "Access comprehensive analytics, alerts, and recommendations on your dashboard.",
        },
      ],
      cta_title: "Ready to Get Started?",
      cta_description: "Join thousands of dairy farmers who are already using AgroSense to optimize their operations.",
      cta_primary: "Start Free Trial",
      cta_secondary: "Schedule Demo",
    },

    testimonials: {
      title: "Trusted by Dairy Farmers Worldwide",
      subtitle: "See what our customers are saying about their experience with AgroSense.",
      stats: [
        {
          value: "10,000+",
          label: "Active Cattle"
        },
        {
          value: "500+",
          label: "Dairy Farms"
        },
        {
          value: "95%",
          label: "Health Accuracy"
        },
        {
          value: "24/7",
          label: "Monitoring"
        }
      ],
      list:

        [
          {
            name: "Ahmed Hassan",
            role: "Dairy Farm Owner",
            location: "Punjab, Pakistan",
            image: "/placeholder.svg?height=80&width=80",
            rating: 5,
            quote:
              "AgroSense has revolutionized how I manage my 200-head dairy farm. The early health detection saved me thousands in veterinary costs.",
          },
          {
            name: "Dr. Sarah Khan",
            role: "Veterinarian",
            location: "Lahore, Pakistan",
            image: "/placeholder.svg?height=80&width=80",
            rating: 3,
            quote:
              "The health monitoring capabilities are impressive. I can now provide better care to my clients' cattle with real-time data.",
          },
          {
            name: "Muhammad Ali",
            role: "Farm Manager",
            location: "Karachi, Pakistan",
            image: "/placeholder.svg?height=80&width=80",
            rating: 3,
            quote:
              "The financial dashboard and milk production tracking have increased our farm's profitability by 30% in just 6 months.",
          },
        ],
    },
    pricing: {
      title: "Choose Your Plan",
      subtitle: "Flexible pricing options to fit farms of all sizes. Start with a free trial and upgrade as you grow.",
      plans: [
        {
          name: "Basic",
          price: "$49",
          period: "/month",
          description: "Perfect for small dairy farms",
          features: [
            "Up to 50 cattle",
            "Basic health monitoring",
            "Milk production tracking",
            "Mobile app access",
            "Email support",
          ],
          cta: "Start Free Trial",
        },
        {
          name: "Pro",
          price: "$99",
          period: "/month",
          description: "Ideal for medium-sized operations",
          features: [
            "Up to 200 cattle",
            "Advanced health analytics",
            "Behavior monitoring",
            "HR & Payroll management",
            "Financial dashboard",
            "Priority support",
            "API access",
          ],
          cta: "Start Free Trial",
          popularBadge: "Most Popular",
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "",
          description: "For large dairy operations",
          features: [
            "Unlimited cattle",
            "Full sensor suite",
            "Custom integrations",
            "Dedicated account manager",
            "On-site training",
            "24/7 phone support",
            "Custom reporting",
          ],
          cta: "Contact Sales",
        },
      ],
      additional: {
        trial_note: "All plans include a 30-day free trial. No credit card required.",
        benefits: [
          "✓ Cancel anytime",
          "✓ 99.9% uptime guarantee",
          "✓ Data export available",
          "✓ GDPR compliant"
        ]
      }
    },
    chat: {
      open_button_label: "Chat with us",
      initial_message: "Hi! I'm here to help you learn more about AgroSense. How can I assist you today?",
      input_placeholder: "Type your message...",
    },

    footer: {
      company_name: "AgroSense",
      tagline:
        "Empowering dairy farmers with intelligent technology for better animal welfare and operational efficiency.",
      planet_friendly: "🌱 Designed for Planet-Friendly Dairy Operations",

      quick_links: {
        title: "Quick Links",
        items: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "About Us", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Case Studies", href: "#" },
        ],
      },

      support: {
        title: "Support",
        items: [
          { label: "Help Center", href: "#" },
          { label: "Documentation", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "Contact Support", href: "#" },
          { label: "System Status", href: "#" },
        ],
      },

      contact: {
        title: "Contact",
        email: "support@agrosense.com",
        phone: "+92 300 1234567",
        location: "Lahore, Pakistan",
      },

      bottom: {
        copyright: "© 2024 AgroSense. All rights reserved.",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Cookie Policy", href: "#" },
        ],
      },
    },

    farm_registration:{
      heading:"Register Your Farm"

    }
  },

  ur: {
    meta: LANG_META.ur,
    nav: {
      home: "ابتداء",
      features: "خصوصیات",
      requestDemo: "ڈیمو کی درخواست",
      pricing: "قیمتوں کی تفصیل",
      contact: "رابطہ",
      login: "لاگ ان",
      register_farm: "فارم رجسٹر کریں"
    },
    hero: {
      badge: "🌿 جدید ڈیری فارمنگ کا بااختیار نظام",
      heading: {
        pre: "   کے ساتھ ڈیری فارمنگ میں انقلاب ",
        highlight: " مصنوعی ذہانت "
      },
      description:
        "جانوروں کی صحت سے لے کر دودھ کی پیداوار تک — ہر پہلو کا نظم ایک ہی پلیٹ فارم پر۔ ایگرو سینس جدید ٹیکنالوجی، جانوروں کی فلاح و بہبود، اور انتظامی کارکردگی کو یکجا کرتا ہے۔",
      cta_primary: "مفت آزمائشی دور شروع کریں",
      cta_secondary: "ڈیمو ملاحظہ کریں",
      trust: ["آئی ایس او تصدیق شدہ", "ویٹرنری ماہرین کی منظوری", "محفوظ و نجی"],
      image_alt:
        "جدید ڈیری فارم، جہاں گائیں سمارٹ کالرز سے لیس ہیں اور سبز چراگاہ میں چر رہی ہیں",
      live_monitoring: "براہِ راست نگرانی",
      status_title: "فارم کی موجودہ حالت",
      status_value: "تمام نظام درست طور پر فعال ہیں"
    },

    features: {
      title: "جامع فارم مینجمنٹ نظام",
      subtitle: "جدید اور موثر ڈیری فارمنگ کے لیے مکمل حل",
      items: [
        {
          title: "مویشیوں کی مکمل زندگی کا ریکارڈ",
          icon: Heart,
          color: "text-red-500",
          description:
            "ہر جانور کا تفصیلی پروفائل — نسل، طبی تاریخ، بچہ دینے کے اوقات، اور سمارٹ کالر کے ذریعے صحت کی نگرانی۔",
        },
        {
          title: "سمارٹ رویے کی نگرانی",
          icon: Activity,
          color: "text-blue-500",
          description:
            "IMU سینسر کھانے، چلنے، آرام کرنے، اور چرا کے معمولات کا جائزہ لیتے ہیں۔ حیض کی پیشگی اطلاع اور صحت کے مسائل کی جلد شناخت ممکن بناتے ہیں۔",
        },
        {
          title: "دودھ اور خوراک کا مؤثر انتظام",
          icon: Milk,
          color: "text-yellow-500",
          description:
            "روزانہ کی دودھ کی پیداوار، خوراک کی کھپت، اور غذائی بہتری کے لیے ڈیٹا پر مبنی تجزیہ فراہم کرتا ہے۔",
        },
        {
          title: "مربوط آن لائن مارکیٹ پلیس",
          icon: ShoppingCart,
          color: "text-indigo-500",
          description:
            "ادویات، خوراک، سازوسامان، اور دیگر اشیاء کی خرید و فروخت — براہ راست سپلائرز اور خریداروں سے رابطہ۔",
        },
        {
          title: "عملہ اور تنخواہوں کی مینجمنٹ",
          icon: Users,
          color: "text-purple-500",
          description:
            "حاضری، ذمہ داریوں کی تقسیم، کارکردگی کا جائزہ، اور تنخواہوں کا مکمل خودکار نظام۔",
        },
        {
          title: "ڈیلرشپ اور سپلائی چین نیٹ ورک",
          icon: Truck,
          color: "text-orange-500",
          description:
            "ادویات، خوراک، اور اوزاروں کی ترسیل کا جامع نیٹ ورک — خریداری اور اسٹاک کا منظم نظم۔",
        },
        {
          title: "مالیاتی بصیرت ڈیش بورڈ",
          icon: BarChart3,
          color: "text-green-500",
          description:
            "آمدنی اور اخراجات کی رپورٹس، منافع کی بصیرت، اور درست پیش گوئی کے آلات۔",
        },
        {
          title: "مقام اور حرکت کی GPS نگرانی",
          icon: MapPin,
          color: "text-teal-500",
          description:
            "سمارٹ کالرز کے ذریعے مویشیوں کی درست لوکیشن اور حرکت کا مسلسل ٹریکنگ سسٹم۔",
        },
      ],
    },
    technology: {
      badge: "🔬 جدید سینسر ٹیکنالوجی",
      title: "سمارٹ کالر نظام",
      imu_active: "حرکت سینسر فعال",
      gpa_signal: "GPS سگنل دستیاب",
      temp: "۲۲° درجہ حرارت",
      description:
        "ہمارا انقلابی گلے کا کالر مختلف سینسرز کو یکجا کرتا ہے تاکہ مویشیوں کی صحت، رویے اور مقام کی مکمل نگرانی ممکن ہو سکے۔",
      features: [
        {
          title: "IMU سینسرز",

          description: "جانور کے رویے اور جسمانی حرکات کو جانچنے کے لیے جدید حرکتی سینسرز",
        },
        {
          title: "GPS ٹریکنگ",
          description: "مویشیوں کی حقیقی وقت میں لوکیشن اور حرکت کے راستوں کی نگرانی",
        },
        {
          title: "ماحولیاتی نگرانی",
          description:
            "درجہ حرارت اور نمی کے سینسرز جانوروں کے آرام کے لیے",
        },
        {
          title: "بے قاعدگیوں کی شناخت",
          description:
            "صحت کے مسائل اور رویے کی تبدیلیوں کے لیے مصنوعی ذہانت پر مبنی الرٹس",
        },
      ],
      key_capablities: 'اہم خصوصیات',
      capabilities: [
        "رویے کی درجہ بندی: کھانا، چلنا، آرام کرنا، چرنا، کھڑے ہونا",
        "حیض (ایسٹرَس) کی پیش گوئی% 95 درستگی کے ساتھ",
        "صحت کی بے قاعدگیوں کی جلد شناخت اور انتباہات",
        "ماحولیاتی آرام کی نگرانی",
      ],
    },
    how_it_works: {
      title: "ایگرو سینس کیسے کام کرتا ہے؟",
      subtitle: "صرف تین آسان مراحل میں ایگرو سینس کے ساتھ جدید ڈیری فارمنگ کا آغاز کریں۔",
      steps: [
        {
          title: "اپنا فارم شامل کریں",
          step: 'پہلا مرحلہ',
          icon: Plus,
          color: "bg-green-500",

          description: "فارم کی تفصیلات درج کریں، جانوروں کی پروفائلز بنائیں، اور اپنا اکاؤنٹ سیٹ اپ کریں۔",
        },
        {
          title: "آلات کو مربوط کریں",
          step: 'دوسرا مرحلہ',
          icon: Wifi,
          color: "bg-blue-500",
          description: "جانوروں پر سمارٹ کالرز نصب کریں اور مانیٹرنگ سسٹم سے جوڑیں۔",
        },
        {
          title: "براہِ راست تجزیہ حاصل کریں",
          step: 'تیسرا مرحلہ',
          color: "bg-purple-500",
          icon: BarChart3,
          description: "ڈیش بورڈ پر مکمل تجزیاتی ڈیٹا، الرٹس اور سفارشات تک رسائی حاصل کریں۔",
        },
      ],
      cta_title: "کیا آپ تیار ہیں؟",
      cta_description: "ہزاروں ڈیری کسانوں کے ساتھ شامل ہوں جو پہلے ہی ایگرو سینس استعمال کر رہے ہیں۔",
      cta_primary: "مفت آزمائش شروع کریں",
      cta_secondary: "ڈیمو کا وقت طے کریں",
    },
    testimonials: {
      title: "دنیا بھر کے ڈیری کسانوں کا قابلِ اعتماد انتخاب",
      subtitle: "دیکھیے کہ ہمارے صارفین ایگرو سینس کے تجربے کے بارے میں کیا کہتے ہیں۔",
      stats:
        [
          {
            value: "10,000+",
            label: "فعال مویشی"
          },
          {
            value: "500+",
            label: "ڈیری فارم"
          },
          {
            value: "95٪",
            label: "صحت کی درستگی"
          },
          {
            value: "24/7",
            label: "نگرانی ہر وقت"
          }
        ]
      ,
      list:
        [
          {
            name: "احمد حسن",
            role: "ڈیری فارم مالک",
            location: "پنجاب، پاکستان",
            image: "/placeholder.svg?height=80&width=80",
            rating: 5,
            quote:
              "ایگرو سینس نے میرے 200 جانوروں کے ڈیری فارم کے نظم کو بدل کر رکھ دیا ہے۔ صحت کی جلد شناخت سے مجھے ہزاروں روپے بچانے میں مدد ملی۔",
          },
          {
            name: "ڈاکٹر سارہ خان",
            role: "ویٹرنری ڈاکٹر",
            location: "لاہور، پاکستان",
            image: "/placeholder.svg?height=80&width=80",
            rating: 4,
            quote:
              "صحت کی نگرانی کی صلاحیتیں شاندار ہیں۔ اب میں اپنے کلائنٹس کے مویشیوں کو حقیقی وقت کے ڈیٹا کی بنیاد پر بہتر نگہداشت فراہم کر سکتی ہوں۔",
          },
          {
            name: "محمد علی",
            role: "فارم مینیجر",
            location: "کراچی، پاکستان",
            image: "/placeholder.svg?height=80&width=80",
            rating: 5,
            quote:
              "مالیاتی ڈیش بورڈ اور دودھ کی پیداوار کا ٹریکنگ نظام نے صرف چھ مہینوں میں ہمارے فارم کے منافع میں 30٪ اضافہ کر دیا ہے۔",
          },
        ],
    },

    pricing: {
      title: "اپنا پلان منتخب کریں",
      subtitle: "ہر سائز کے فارمز کے لیے موزوں قیمتوں کے اختیارات۔ مفت آزمائشی مدت سے آغاز کریں اور ضرورت کے مطابق اپ گریڈ کریں۔",
      plans: [
        {
          name: "بنیادی",
          price: "$49",
          period: "/ماہ",
          description: "چھوٹے ڈیری فارم کے لیے بہترین",
          features: [
            "50 مویشیوں تک کی اجازت",
            "بنیادی صحت کی نگرانی",
            "دودھ کی پیداوار کی نگرانی",
            "موبائل ایپ تک رسائی",
            "ای میل سپورٹ",
          ],
          cta: "مفت آزمائش شروع کریں",
        },
        {
          name: "پرو",
          price: "$99",
          period: "/ماہ",
          description: "درمیانے درجے کے فارمز کے لیے مثالی",
          features: [
            "200 مویشیوں تک کی اجازت",
            "صحت کے تجزیاتی اعداد و شمار",
            "رویہ کی نگرانی",
            "عملہ اور تنخواہ کا نظم",
            "مالیاتی ڈیش بورڈ",
            "ترجیحی سپورٹ",
            "API تک رسائی",
          ],
          cta: "مفت آزمائش شروع کریں",
          popularBadge: "سب سے مقبول"
        },
        {
          name: "انٹرپرائز",
          price: "حسب ضرورت",
          period: "",
          description: "بڑے ڈیری فارمز کے لیے",
          features: [
            "لا محدود مویشیوں کی اجازت",
            "مکمل سینسر سسٹم",
            "حسب ضرورت انضمام",
            "مخصوص اکاؤنٹ منیجر",
            "سائٹ پر تربیت",
            "24/7 فون سپورٹ",
            "حسب ضرورت رپورٹس",
          ],
          cta: "سیلز ٹیم سے رابطہ کریں",
        },
      ],
      additional: {
        trial_note: "تمام پلانز میں 30 دن کی مفت آزمائش شامل ہے۔ کریڈٹ کارڈ کی ضرورت نہیں۔",
        benefits: [
          "✓ جب چاہیں منسوخ کریں",
          "✓ 99.9٪ اپ ٹائم کی ضمانت",
          "✓ ڈیٹا ایکسپورٹ دستیاب ہے",
          "✓ جی ڈی پی آر سے ہم آہنگ"
        ]
      }
    }
    ,

    chat: {
      open_button_label: "ہم سے بات کریں",
      initial_message: "سلام! میں ایگرو سینس کے بارے میں آپ کی رہنمائی کے لیے حاضر ہوں۔ آپ کی کیا مدد کر سکتا ہوں؟",
      input_placeholder: "اپنا پیغام لکھیں...",
    },
    footer: {
      company_name: "ایگرو سینس",
      tagline:
        "جدید ٹیکنالوجی کے ذریعے دودھ دینے والے جانوروں کی فلاح و بہبود اور فارم کی کارکردگی کو بہتر بنائیں۔",
      planet_friendly: "🌱 ماحول دوست ڈیری فارمنگ کے لیے تیار کردہ",

      quick_links: {
        title: "فوری روابط",
        items: [
          { label: "خصوصیات", href: "#features" },
          { label: "قیمتیں", href: "#pricing" },
          { label: "ہمارے بارے میں", href: "#" },
          { label: "بلاگ", href: "#" },
          { label: "کیس اسٹڈیز", href: "#" },
        ],
      },

      support: {
        title: "مدد",
        items: [
          { label: "مدد مرکز", href: "#" },
          { label: "دستاویزات", href: "#" },
          { label: " حوالہ API", href: "#" },
          { label: "رابطہ معاونت", href: "#" },
          { label: "سسٹم کی حیثیت", href: "#" },
        ],
      },

      contact: {
        title: "رابطہ کریں",
        email: "support@agrosense.com",
        phone: "+92 300 1234567",
        location: "لاہور، پاکستان",
      },

      bottom: {
        copyright: "© 2024 ایگرو سینس۔ جملہ حقوق محفوظ ہیں۔",
        links: [
          { label: "رازداری کی پالیسی", href: "#" },
          { label: "سروس کی شرائط", href: "#" },
          { label: "کوکی پالیسی", href: "#" },
        ],
      },
    },
  },



};
