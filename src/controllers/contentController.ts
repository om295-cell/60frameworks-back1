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
    backdropVideo: 'https://spiubsxm2vg65sdm.public.blob.vercel-storage.com/hero-video-faststart.mp4',
    impactTitle_en: 'Our Impact in Numbers',
    impactTitle_ar: 'أثرنا بالأرقام',
    impactSubtitle_en: 'Because real impact… is measured.',
    impactSubtitle_ar: 'لأن الأثر الحقيقي… يُقاس.',
    heroStats: [
      { value_en: '+XX', value_ar: '+XX', label_en: 'Projects & Campaigns', label_ar: 'مشروع وحملة' },
      { value_en: '+XXM', value_ar: '+XXM', label_en: 'Views & Reach', label_ar: 'مشاهدة ووصول' },
      { value_en: '+XX', value_ar: '+XX', label_en: 'Brands & Destinations Trusted Us', label_ar: 'علامة وجهة وثقت بنا' },
    ],
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
    badgeValue: '360°',
    badgeTitle_en: '360° Integrated Solutions',
    badgeTitle_ar: 'حلول متكاملة',
    badgeDesc_en: 'Strategy, creativity, content, production & execution; a seamless journey from concept to impact measurement.',
    badgeDesc_ar: 'استراتيجية، إبداع، محتوى، إنتاج وتنفيذ؛ تجربة متكاملة من الفكرة حتى قياس الأثر',
    pillars: [
      {
        title_en: 'Experience-First Architecture',
        title_ar: 'هندسة ترتكز على التجربة الإنسانية',
        desc_en: 'We do not view events as logistical schedules; we engineer holistic emotional journeys where every spatial, acoustic, and visual cue commands attention.',
        desc_ar: 'لا نرى الفعاليات مجرد جداول لوجستية؛ بل نهندس رحلات عاطفية متكاملة تأسر الحواس عبر كل تفصيلة مكانية وصوتية وبصرية.',
      },
      {
        title_en: 'Story-Driven Narrative Craft',
        title_ar: 'سرد قصصي سينمائي ملهم',
        desc_en: 'Grand visuals without narrative depth fade quickly. We build cinematic story arcs that connect product capabilities directly with human aspirations.',
        desc_ar: 'المشاهد البصرية الكبرى تتلاشى بدون عمق قصصي. نبني حبكات ملهمة تربط قدرات علامتك التجارية بطموحات الجمهور وتطلعاته.',
      },
      {
        title_en: 'Lasting Moments & Tangible ROI',
        title_ar: 'أثر مستدام وعائد استثماري ملموس',
        desc_en: 'Our work generates monumental earned media, high-intent investor deals, and institutional memorability that resonates long after stage lights fade.',
        desc_ar: 'تحقق فعالياتنا زخماً إعلامياً واسعاً، وصفقات استثمارية كبرى، ومكانة مؤسسية راسخة تدوم لأعوام.',
      },
      {
        title_en: 'Sovereign Protocol & B2B/B2G Mastery',
        title_ar: 'إتقان البروتوكول السيادي ومراسم الوفود',
        desc_en: 'Deep diplomatic competence, high-security orchestration, and VIP delegation protocol compliance trusted by sovereign leaders and multinational chairpersons.',
        desc_ar: 'كفاءة دبلوماسية عميقة، وإدارة أمنية عالية المستوى، والتزام صارم ببروتوكول الوفود الرسمية المعتمد لدى القيادات وصناع القرار.',
      },
    ],
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
  latestEvent: {
    eyebrow_en: 'LATEST EVENT',
    eyebrow_ar: 'أحدث فعالياتنا',
    title_en: 'Our Latest Event Experience',
    title_ar: 'فعاليتنا الأخيرة: تجربة استثنائية',
    subtitle_en:
      'Click the image below to view comprehensive coverage, high-definition captures, and documentation directly on Google Drive.',
    subtitle_ar:
      'انقر على الصورة للاطلاع على التغطية الشاملة، الصور التوثيقية، وملفات الفعالية مباشرة عبر Google Drive.',
    imageUrl: '',
    videos: [
      'https://spiubsxm2vg65sdm.public.blob.vercel-storage.com/event-video-1-faststart.mp4',
      'https://spiubsxm2vg65sdm.public.blob.vercel-storage.com/event-video-2.mp4',
      'https://spiubsxm2vg65sdm.public.blob.vercel-storage.com/event-video-3-faststart.mp4'
    ],
    videosMuted: true,
    driveUrl: 'https://drive.google.com/drive/folders/1Pxybwl41N4t3rHG4hZjudAYS17L_vCot',
    tag_en: 'Exclusive Event Documentation',
    tag_ar: 'ملف التوثيق والتغطية الحصرية',
    buttonText_en: '26th Scientific Forum | From Coverage to Impact',
    buttonText_ar: 'الملتقى العلمي 26 | من التغطية إلى الأثر',
  },
  footer: {
    desc_en:
      'A global creative & experiential agency transforming corporate summits, pavilions, and brand revelations into unforgettable human experiences.',
    desc_ar:
      'وكالة إبداعية عالمية تحول القمم والمؤتمرات الكبرى والأجنحة المعمارية والتدشينات إلى تجارب إنسانية استثنائية لا تُنسى.',
    email: 'hello@60frameworks.com',
    phone: '+966 55 307 7467',
    whatsappUrl: 'https://api.whatsapp.com/send/?phone=966553077467',
    hubs_en: 'Regional & Global Hubs: Riyadh • Dubai • London • New York',
    hubs_ar: 'المقرات الإقليمية والدولية: الرياض 🇸🇦 • دبي • لندن • نيويورك',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
    navTitle_en: 'Navigation',
    navTitle_ar: 'أقسام الموقع',
    expertiseTitle_en: 'Areas of Expertise',
    expertiseTitle_ar: 'مجالات الخبرة',
    contactTitle_en: 'Contact Us',
    contactTitle_ar: 'تواصل معنا',
    directBtnText_en: 'Direct Inquiry',
    directBtnText_ar: 'طلب استشارة فورية',
    copyright_en: '60FRAMEWORKS Experiential Marketing Group. All rights reserved.',
    copyright_ar: 'مجموعة 60 فريمووركس للتسويق التجريبي والفعاليات. جميع الحقوق محفوظة.',
    privacyText_en: 'Privacy Policy',
    privacyText_ar: 'سياسة الخصوصية',
    privacyUrl: '#',
    termsText_en: 'Terms of Engagement',
    termsText_ar: 'الشروط والأحكام',
    termsUrl: '#',
    servicesList_en:
      'Marketing & Media Campaigns\nContent Creation & Management\nVisual Production & Coverage\nBrand Experiences\nInfluencer Management\nEvents & Conferences\nBrand Identity & Creative Design\nVR & AR Technologies & Experiences',
    servicesList_ar:
      'الحملات التسويقية والإعلامية\nصناعة وإدارة المحتوى\nالإنتاج المرئي والتغطيات\nتجارب العلامات التجارية\nإدارة المؤثرين\nالفعاليات والملتقيات\nبناء الهوية والتصميم الإبداعي\nتقنيات وتجارب الواقع الافتراضي والمعزز',
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

    const contentObj: any = content.toObject ? content.toObject() : { ...content };

    // Auto-heal any broken blob storage URLs or empty event videos
    let needsDbUpdate = false;
    const patchDoc: any = {};

    if (!contentObj.hero?.backdropVideo || contentObj.hero.backdropVideo.includes('l8t8ykc5tfbkefrg')) {
      contentObj.hero = {
        ...contentObj.hero,
        backdropVideo: inMemoryContent.hero.backdropVideo,
      };
      patchDoc['hero.backdropVideo'] = inMemoryContent.hero.backdropVideo;
      needsDbUpdate = true;
    }

    if (!contentObj.latestEvent?.videos || contentObj.latestEvent.videos.length === 0 || contentObj.latestEvent.videos.some((v: string) => v.includes('l8t8ykc5tfbkefrg'))) {
      contentObj.latestEvent = {
        ...contentObj.latestEvent,
        videos: inMemoryContent.latestEvent.videos,
        driveUrl: inMemoryContent.latestEvent.driveUrl,
      };
      patchDoc['latestEvent.videos'] = inMemoryContent.latestEvent.videos;
      patchDoc['latestEvent.driveUrl'] = inMemoryContent.latestEvent.driveUrl;
      needsDbUpdate = true;
    }

    // Auto-heal footer defaults
    if (
      !contentObj.footer ||
      !contentObj.footer.email ||
      contentObj.footer.email === 'inquiries@impactagency.com' ||
      !contentObj.footer.servicesList_ar ||
      !contentObj.footer.servicesList_ar.includes('الحملات التسويقية والإعلامية')
    ) {
      contentObj.footer = {
        ...(contentObj.footer || {}),
        email: 'hello@60frameworks.com',
        contactTitle_ar: 'تواصل معنا',
        contactTitle_en: 'Contact Us',
        expertiseTitle_ar: 'مجالات الخبرة',
        expertiseTitle_en: 'Areas of Expertise',
        servicesList_ar: inMemoryContent.footer.servicesList_ar,
        servicesList_en: inMemoryContent.footer.servicesList_en,
      };
      patchDoc['footer.email'] = 'hello@60frameworks.com';
      patchDoc['footer.contactTitle_ar'] = 'تواصل معنا';
      patchDoc['footer.contactTitle_en'] = 'Contact Us';
      patchDoc['footer.expertiseTitle_ar'] = 'مجالات الخبرة';
      patchDoc['footer.expertiseTitle_en'] = 'Areas of Expertise';
      patchDoc['footer.servicesList_ar'] = inMemoryContent.footer.servicesList_ar;
      patchDoc['footer.servicesList_en'] = inMemoryContent.footer.servicesList_en;
      needsDbUpdate = true;
    }

    if (needsDbUpdate && contentObj._id) {
      HomepageContent.updateOne({ _id: contentObj._id }, { $set: patchDoc }).catch((err) => {
        console.warn('[AutoHeal] Background DB patch error:', err);
      });
    }

    res.status(200).json({
      success: true,
      data: contentObj,
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
    const mergedHero = req.body.hero
      ? {
          ...inMemoryContent.hero,
          ...req.body.hero,
          heroStats: req.body.hero.heroStats ?? inMemoryContent.hero.heroStats,
        }
      : inMemoryContent.hero;

    const mergedAbout = req.body.about
      ? {
          ...inMemoryContent.about,
          ...req.body.about,
          stats: req.body.about.stats ?? inMemoryContent.about.stats,
        }
      : inMemoryContent.about;

    inMemoryContent = {
      ...inMemoryContent,
      hero: mergedHero,
      about: mergedAbout,
      services: req.body.services ? { ...inMemoryContent.services, ...req.body.services } : inMemoryContent.services,
      clients: req.body.clients ? { ...inMemoryContent.clients, ...req.body.clients } : inMemoryContent.clients,
      sectors: req.body.sectors ? { ...inMemoryContent.sectors, ...req.body.sectors } : inMemoryContent.sectors,
      caseStudies: req.body.caseStudies ? { ...inMemoryContent.caseStudies, ...req.body.caseStudies } : inMemoryContent.caseStudies,
      testimonials: req.body.testimonials ? { ...inMemoryContent.testimonials, ...req.body.testimonials } : inMemoryContent.testimonials,
      whyUs: { ...inMemoryContent.whyUs, ...req.body.whyUs },
      finalCta: { ...inMemoryContent.finalCta, ...req.body.finalCta },
      latestEvent: {
        ...inMemoryContent.latestEvent,
        ...req.body.latestEvent,
        videos: req.body.latestEvent?.videos ?? inMemoryContent.latestEvent.videos,
      },
      footer: req.body.footer ? { ...inMemoryContent.footer, ...req.body.footer } : inMemoryContent.footer,
    };

    const updateDoc: any = {};
    if (req.body.hero) updateDoc.hero = mergedHero;
    if (req.body.about) updateDoc.about = mergedAbout;
    if (req.body.services) updateDoc.services = req.body.services;
    if (req.body.clients) updateDoc.clients = req.body.clients;
    if (req.body.sectors) updateDoc.sectors = req.body.sectors;
    if (req.body.caseStudies) updateDoc.caseStudies = req.body.caseStudies;
    if (req.body.testimonials) updateDoc.testimonials = req.body.testimonials;
    if (req.body.whyUs) updateDoc.whyUs = req.body.whyUs;
    if (req.body.finalCta) updateDoc.finalCta = req.body.finalCta;
    if (req.body.latestEvent) updateDoc.latestEvent = req.body.latestEvent;
    if (req.body.footer) updateDoc.footer = req.body.footer;

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
