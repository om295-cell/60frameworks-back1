import { Request, Response } from 'express';
import { HomepageContent } from '../models/HomepageContent.js';

let inMemoryContent: any = {
  hero: {
    headlinePrefix_en: 'We Create Experiences That Make an ',
    headlinePrefix_ar: 'نصنع تجارب استثنائية تترك ',
    headlineHighlight_en: 'Impact.',
    headlineHighlight_ar: 'أثراً راسخاً.',
    subtitle_en:
      'An international creative and experiential agency engineering monumental summits, multi-sensory brand activations, and immersive spatial environments that redefine audience engagement.',
    subtitle_ar:
      'وكالة إبداعية عالمية تهندس أضخم القمم السيادية، وتفعيلات العلامات التجارية المتعددة الحواس، والبيئات المكانية الغامرة التي تعيد صياغة مفهوم التفاعل والتأثير.',
    backdropImage:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
    backdropVideo: '',
  },
  about: {
    eyebrow_en: 'ABOUT OUR AGENCY',
    eyebrow_ar: 'عن وكالتنا',
    heading_en: 'We Turn Ideas Into Experiences People Remember.',
    heading_ar: 'نحول الأفكار الملهمة إلى تجارب حية تخلد في الذاكرة.',
    para1_en:
      'We operate at the convergence of architectural spatial design, cinematic storytelling, and precision technical engineering. For over a decade, we have partnered with sovereign entities, global enterprises, and industry disruptors to create landmark physical moments.',
    para1_ar:
      'نعمل عند نقطة التقاء التصميم المعماري المكاني، والسرد القصصي السينمائي، والهندسة التقنية الدقيقة. لأكثر من عقد، تشرفنا بالشراكة مع الهيئات السيادية، وكبرى الشركات العالمية، ورواد الصناعة لتنظيم فعاليات تاريخية فارقة.',
    para2_en:
      'From multi-acre international trade pavilions to hyper-curated private leadership summits, our holistic philosophy ensures every touchpoint reinforces brand prestige, sparks emotional connection, and achieves tangible business outcomes.',
    para2_ar:
      'من الأجنحة المعمارية الضخمة في المعارض الدولية إلى القمم القيادية السيادية الحصرية، تضمن فلسفتنا الشاملة تعزيز هيبة العلامة التجارية، وبناء الروابط العاطفية، وتحقيق نتائج استثمارية ملموسة.',
    badgeText_en: 'Engineering memories that endure long after lights dim.',
    badgeText_ar: 'نهندس ذكريات تدوم طويلاً بعد انطفاء أضواء المسرح.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label_en: 'Experiences Executed', label_ar: 'فعالية كبرى منجزة', value: '520', suffix_en: '+', suffix_ar: '+' },
      { label_en: 'Global Attendees', label_ar: 'مشارك وزائر دولي', value: '2.8', suffix_en: 'M+', suffix_ar: ' مليون+' },
      { label_en: 'Client Retention Rate', label_ar: 'نسبة ولاء واستمرار العملاء', value: '99', suffix_en: '%', suffix_ar: '%' },
      { label_en: 'International Design Awards', label_ar: 'جائزة تصميم عالمية', value: '24', suffix_en: '', suffix_ar: '' },
    ],
  },
  whyUs: {
    eyebrow_en: 'WHY WORK WITH 60FRAMEWORKS',
    eyebrow_ar: 'لماذا تختار 60 فريمووركس',
    heading_en: 'Where Uncompromising Strategy Meets Creative Audacity.',
    heading_ar: 'حيث تلتقي الاستراتيجية الدقيقة بالجرأة الإبداعية.',
    subtitle_en:
      'We eliminate the traditional friction between abstract creative agencies and heavy technical production houses by unifying both into a single seamless powerhouse.',
    subtitle_ar:
      'نقضي على الفجوة التقليدية بين الوكالات الإبداعية وشركات الإنتاج الفني والتقني من خلال توحيد المنظومتين في بيت خبرة واحد متكامل.',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '',
    badgeTitle_en: '100% End-to-End Accountability',
    badgeTitle_ar: 'مسؤولية تنفيذية شاملة 100%',
    badgeDesc_en: 'Concept, spatial build, AV, showrunning & post-event audit under one roof.',
    badgeDesc_ar: 'الفكرة، البناء المعماري، الصوت والضوء، الإخراج، والتدقيق تحت سقف واحد.',
  },
  finalCta: {
    eyebrow_en: 'START YOUR NEXT DEFINING MOMENT',
    eyebrow_ar: 'ابدأ محطتك الاستثنائية القادمة',
    heading_en: "Let's Create Something Meaningful.",
    heading_ar: 'معاً نصنع تجربة تخلد في التاريخ.',
    subtitle_en:
      'Whether planning a sovereign summit, launching a category-defining brand, or constructing an architectural pavilion, our strategy team is ready.',
    subtitle_ar:
      'سواء كنت تخطط لقمة سيادية كبرى، أو إطلاق علامة تجارية رائدة، أو تشييد جناح معماري أيقوني، فريقنا الاستشاري في أتم الجاهزية لدعمك.',
    buttonText_en: 'CONNECT WITH OUR TEAM',
    buttonText_ar: 'تواصل مع فريقنا الاستشاري',
  },
};

export const getContent = async (_req: Request, res: Response): Promise<void> => {
  try {
    let content = await HomepageContent.findOne();
    if (!content) {
      try {
        content = await HomepageContent.create(inMemoryContent);
      } catch {
        // Fallback to in-memory if DB write is unavailable
        res.status(200).json({ success: true, data: inMemoryContent });
        return;
      }
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.warn('Error fetching homepage content from DB, returning in-memory content:', error);
    res.status(200).json({
      success: true,
      data: inMemoryContent,
    });
  }
};

export const updateContent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Update in-memory copy
    inMemoryContent = {
      ...inMemoryContent,
      hero: { ...inMemoryContent.hero, ...req.body.hero },
      about: { ...inMemoryContent.about, ...req.body.about },
      whyUs: { ...inMemoryContent.whyUs, ...req.body.whyUs },
      finalCta: { ...inMemoryContent.finalCta, ...req.body.finalCta },
    };

    const updateDoc: any = {};
    if (req.body.hero) updateDoc.hero = req.body.hero;
    if (req.body.about) updateDoc.about = req.body.about;
    if (req.body.whyUs) updateDoc.whyUs = req.body.whyUs;
    if (req.body.finalCta) updateDoc.finalCta = req.body.finalCta;

    const content = await HomepageContent.findOneAndUpdate(
      {},
      { $set: updateDoc },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      data: content,
      message: 'Homepage content successfully updated',
    });
  } catch (error) {
    console.warn('DB update failed, updated in-memory state:', error);
    res.status(200).json({
      success: true,
      data: inMemoryContent,
      message: 'Homepage content updated in memory',
    });
  }
};
