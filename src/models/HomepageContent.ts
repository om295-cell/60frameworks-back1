import mongoose, { Document, Schema } from 'mongoose';

export interface IHomepageContent extends Document {
  hero: {
    headlinePrefix_en: string;
    headlinePrefix_ar: string;
    headlineHighlight_en: string;
    headlineHighlight_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    backdropImage: string;
    backdropVideo?: string;
  };
  about: {
    eyebrow_en: string;
    eyebrow_ar: string;
    heading_en: string;
    heading_ar: string;
    para1_en: string;
    para1_ar: string;
    para2_en: string;
    para2_ar: string;
    badgeText_en: string;
    badgeText_ar: string;
    image: string;
    stats: {
      label_en: string;
      label_ar: string;
      value: string;
      suffix_en: string;
      suffix_ar: string;
    }[];
  };
  whyUs: {
    eyebrow_en: string;
    eyebrow_ar: string;
    heading_en: string;
    heading_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    image: string;
    videoUrl?: string;
    badgeTitle_en: string;
    badgeTitle_ar: string;
    badgeDesc_en: string;
    badgeDesc_ar: string;
  };
  finalCta: {
    eyebrow_en: string;
    eyebrow_ar: string;
    heading_en: string;
    heading_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    buttonText_en: string;
    buttonText_ar: string;
  };
  latestEvent?: {
    eyebrow_en?: string;
    eyebrow_ar?: string;
    title_en?: string;
    title_ar?: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    imageUrl?: string;
    driveUrl?: string;
    tag_en?: string;
    tag_ar?: string;
  };
  updatedAt: Date;
}

const HomepageContentSchema = new Schema<IHomepageContent>(
  {
    hero: {
      headlinePrefix_en: { type: String, default: 'We Create Experiences That Make an ' },
      headlinePrefix_ar: { type: String, default: 'نصنع تجارب استثنائية تترك ' },
      headlineHighlight_en: { type: String, default: 'Impact.' },
      headlineHighlight_ar: { type: String, default: 'أثراً راسخاً.' },
      subtitle_en: {
        type: String,
        default:
          'An international creative and experiential agency engineering monumental summits, multi-sensory brand activations, and immersive spatial environments that redefine audience engagement.',
      },
      subtitle_ar: {
        type: String,
        default:
          'وكالة إبداعية عالمية تهندس أضخم القمم السيادية، وتفعيلات العلامات التجارية المتعددة الحواس، والبيئات المكانية الغامرة التي تعيد صياغة مفهوم التفاعل والتأثير.',
      },
      backdropImage: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
      },
      backdropVideo: { type: String, default: '' },
    },
    about: {
      eyebrow_en: { type: String, default: 'ABOUT OUR AGENCY' },
      eyebrow_ar: { type: String, default: 'عن وكالتنا' },
      heading_en: { type: String, default: 'We Turn Ideas Into Experiences People Remember.' },
      heading_ar: { type: String, default: 'نحول الأفكار الملهمة إلى تجارب حية تخلد في الذاكرة.' },
      para1_en: {
        type: String,
        default:
          'We operate at the convergence of architectural spatial design, cinematic storytelling, and precision technical engineering. For over a decade, we have partnered with sovereign entities, global enterprises, and industry disruptors to create landmark physical moments.',
      },
      para1_ar: {
        type: String,
        default:
          'نعمل عند نقطة التقاء التصميم المعماري المكاني، والسرد القصصي السينمائي، والهندسة التقنية الدقيقة. لأكثر من عقد، تشرفنا بالشراكة مع الهيئات السيادية، وكبرى الشركات العالمية، ورواد الصناعة لتنظيم فعاليات تاريخية فارقة.',
      },
      para2_en: {
        type: String,
        default:
          'From multi-acre international trade pavilions to hyper-curated private leadership summits, our holistic philosophy ensures every touchpoint reinforces brand prestige, sparks emotional connection, and achieves tangible business outcomes.',
      },
      para2_ar: {
        type: String,
        default:
          'من الأجنحة المعمارية الضخمة في المعارض الدولية إلى القمم القيادية السيادية الحصرية، تضمن فلسفتنا الشاملة تعزيز هيبة العلامة التجارية، وبناء الروابط العاطفية، وتحقيق نتائج استثمارية ملموسة.',
      },
      badgeText_en: {
        type: String,
        default: 'Engineering memories that endure long after lights dim.',
      },
      badgeText_ar: {
        type: String,
        default: 'نهندس ذكريات تدوم طويلاً بعد انطفاء أضواء المسرح.',
      },
      image: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
      },
      stats: [
        {
          label_en: { type: String, default: 'Experiences Executed' },
          label_ar: { type: String, default: 'فعالية كبرى منجزة' },
          value: { type: String, default: '520' },
          suffix_en: { type: String, default: '+' },
          suffix_ar: { type: String, default: '+' },
        },
        {
          label_en: { type: String, default: 'Global Attendees' },
          label_ar: { type: String, default: 'مشارك وزائر دولي' },
          value: { type: String, default: '2.8' },
          suffix_en: { type: String, default: 'M+' },
          suffix_ar: { type: String, default: ' مليون+' },
        },
        {
          label_en: { type: String, default: 'Client Retention Rate' },
          label_ar: { type: String, default: 'نسبة ولاء واستمرار العملاء' },
          value: { type: String, default: '99' },
          suffix_en: { type: String, default: '%' },
          suffix_ar: { type: String, default: '%' },
        },
        {
          label_en: { type: String, default: 'International Design Awards' },
          label_ar: { type: String, default: 'جائزة تصميم عالمية' },
          value: { type: String, default: '24' },
          suffix_en: { type: String, default: '' },
          suffix_ar: { type: String, default: '' },
        },
      ],
    },
    whyUs: {
      eyebrow_en: { type: String, default: 'WHY WORK WITH 60FRAMEWORKS' },
      eyebrow_ar: { type: String, default: 'لماذا تختار 60 فريمووركس' },
      heading_en: {
        type: String,
        default: 'Where Uncompromising Strategy Meets Creative Audacity.',
      },
      heading_ar: {
        type: String,
        default: 'حيث تلتقي الاستراتيجية الدقيقة بالجرأة الإبداعية.',
      },
      subtitle_en: {
        type: String,
        default:
          'We eliminate the traditional friction between abstract creative agencies and heavy technical production houses by unifying both into a single seamless powerhouse.',
      },
      subtitle_ar: {
        type: String,
        default:
          'نقضي على الفجوة التقليدية بين الوكالات الإبداعية وشركات الإنتاج الفني والتقني من خلال توحيد المنظومتين في بيت خبرة واحد متكامل.',
      },
      image: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
      },
      videoUrl: { type: String, default: '' },
      badgeTitle_en: { type: String, default: '100% End-to-End Accountability' },
      badgeTitle_ar: { type: String, default: 'مسؤولية تنفيذية شاملة 100%' },
      badgeDesc_en: {
        type: String,
        default: 'Concept, spatial build, AV, showrunning & post-event audit under one roof.',
      },
      badgeDesc_ar: {
        type: String,
        default: 'الفكرة، البناء المعماري، الصوت والضوء، الإخراج، والتدقيق تحت سقف واحد.',
      },
    },
    finalCta: {
      eyebrow_en: { type: String, default: 'START YOUR NEXT DEFINING MOMENT' },
      eyebrow_ar: { type: String, default: 'ابدأ محطتك الاستثنائية القادمة' },
      heading_en: { type: String, default: "Let's Create Something Meaningful." },
      heading_ar: { type: String, default: 'معاً نصنع تجربة تخلد في التاريخ.' },
      subtitle_en: {
        type: String,
        default:
          'Whether planning a sovereign summit, launching a category-defining brand, or constructing an architectural pavilion, our strategy team is ready.',
      },
      subtitle_ar: {
        type: String,
        default:
          'سواء كنت تخطط لقمة سيادية كبرى، أو إطلاق علامة تجارية رائدة، أو تشييد جناح معماري أيقوني، فريقنا الاستشاري في أتم الجاهزية لدعمك.',
      },
      buttonText_en: { type: String, default: 'CONNECT WITH OUR TEAM' },
      buttonText_ar: { type: String, default: 'تواصل مع فريقنا الاستشاري' },
    },
    latestEvent: {
      eyebrow_en: { type: String, default: 'LATEST EVENT' },
      eyebrow_ar: { type: String, default: 'أحدث فعالياتنا' },
      title_en: { type: String, default: 'Our Latest Event Experience' },
      title_ar: { type: String, default: 'فعاليتنا الأخيرة: تجربة استثنائية' },
      subtitle_en: {
        type: String,
        default:
          'Click the image below to view comprehensive coverage, high-definition captures, and documentation directly on Google Drive.',
      },
      subtitle_ar: {
        type: String,
        default:
          'انقر على الصورة للاطلاع على التغطية الشاملة، الصور التوثيقية، وملفات الفعالية مباشرة عبر Google Drive.',
      },
      imageUrl: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
      },
      driveUrl: { type: String, default: 'https://drive.google.com' },
      tag_en: { type: String, default: 'Exclusive Event Documentation' },
      tag_ar: { type: String, default: 'ملف التوثيق والتغطية الحصرية' },
    },
  },
  {
    timestamps: true,
  }
);

export const HomepageContent = mongoose.model<IHomepageContent>(
  'HomepageContent',
  HomepageContentSchema
);
