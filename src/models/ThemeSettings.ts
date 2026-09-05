import mongoose, { Document, Schema } from 'mongoose';

export interface IThemeSettings extends Document {
  header: {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    linkHoverColor: string;
    borderColor: string;
    scrolledBackgroundColor: string;
    blurEffect: boolean;
  };
  footer: {
    backgroundColor: string;
    textColor: string;
    headingColor: string;
    linkColor: string;
    accentColor: string;
    borderColor: string;
  };
  global: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  sections: {
    hero: { backgroundColor: string; textColor: string; accentColor: string };
    about: { backgroundColor: string; textColor: string; accentColor: string };
    services: { backgroundColor: string; textColor: string; accentColor: string };
    clients: { backgroundColor: string; textColor: string; accentColor: string };
    sectors: { backgroundColor: string; textColor: string; accentColor: string };
    caseStudies: { backgroundColor: string; textColor: string; accentColor: string };
    whyUs: { backgroundColor: string; textColor: string; accentColor: string };
    testimonials: { backgroundColor: string; textColor: string; accentColor: string };
    finalCta: { backgroundColor: string; textColor: string; accentColor: string };
  };
  sectionOrder: {
    id: string;
    name: string;
    name_ar: string;
    enabled: boolean;
    order: number;
    customBackgroundColor?: string;
    customTextColor?: string;
  }[];
  updatedAt: Date;
}

export const DEFAULT_THEME_SETTINGS = {
  header: {
    backgroundColor: 'rgba(36, 36, 36, 0.85)',
    textColor: '#FFFFFF',
    linkColor: '#D1D5DB',
    linkHoverColor: '#F68621',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    scrolledBackgroundColor: 'rgba(26, 26, 26, 0.95)',
    blurEffect: true,
  },
  footer: {
    backgroundColor: '#1E1E1E',
    textColor: '#9CA3AF',
    headingColor: '#FFFFFF',
    linkColor: '#D1D5DB',
    accentColor: '#F68621',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  global: {
    primaryColor: '#F68621',
    secondaryColor: '#FFD400',
    backgroundColor: '#FFFFFF',
    textColor: '#242424',
    fontFamily: 'Plus Jakarta Sans',
  },
  sections: {
    hero: { backgroundColor: '#1A1A1A', textColor: '#FFFFFF', accentColor: '#F68621' },
    about: { backgroundColor: '#FFFFFF', textColor: '#242424', accentColor: '#F68621' },
    services: { backgroundColor: '#1A1A1A', textColor: '#FFFFFF', accentColor: '#F68621' },
    clients: { backgroundColor: '#242424', textColor: '#FFFFFF', accentColor: '#F68621' },
    sectors: { backgroundColor: '#1A1A1A', textColor: '#FFFFFF', accentColor: '#F68621' },
    caseStudies: { backgroundColor: '#1A1A1A', textColor: '#FFFFFF', accentColor: '#F68621' },
    whyUs: { backgroundColor: '#FFFFFF', textColor: '#242424', accentColor: '#F68621' },
    testimonials: { backgroundColor: '#1A1A1A', textColor: '#FFFFFF', accentColor: '#F68621' },
    finalCta: { backgroundColor: '#F68621', textColor: '#FFFFFF', accentColor: '#FFFFFF' },
  },
  sectionOrder: [
    { id: 'hero', name: 'Hero Banner', name_ar: 'الواجهة الرئيسية', enabled: true, order: 1 },
    { id: 'latestEvent', name: 'Latest Event Spotlight', name_ar: 'فعاليتنا الأخيرة ورابط الدرايف', enabled: true, order: 2 },
    { id: 'about', name: 'About Agency', name_ar: 'عن الوكالة', enabled: true, order: 3 },
    { id: 'services', name: 'Services & Capabilities', name_ar: 'الخدمات والحلول', enabled: true, order: 4 },
    { id: 'clients', name: 'Trusted Clients', name_ar: 'عملاؤنا وشركاؤنا', enabled: true, order: 5 },
    { id: 'sectors', name: 'Industry Sectors', name_ar: 'القطاعات التخصصية', enabled: true, order: 6 },
    { id: 'caseStudies', name: 'Case Studies / Stories', name_ar: 'أبرز الأعمال والفعاليات', enabled: true, order: 7 },
    { id: 'whyUs', name: 'Why 60FRAMEWORKS', name_ar: 'لماذا 60 فريمووركس', enabled: true, order: 8 },
    { id: 'testimonials', name: 'Testimonials & Impact', name_ar: 'آراء وتقييمات القادة', enabled: true, order: 9 },
    { id: 'finalCta', name: 'Final Call to Action', name_ar: 'دعوة للتواصل والشراكة', enabled: true, order: 10 },
  ],
};

const ThemeSettingsSchema = new Schema<IThemeSettings>(
  {
    header: {
      backgroundColor: { type: String, default: DEFAULT_THEME_SETTINGS.header.backgroundColor },
      textColor: { type: String, default: DEFAULT_THEME_SETTINGS.header.textColor },
      linkColor: { type: String, default: DEFAULT_THEME_SETTINGS.header.linkColor },
      linkHoverColor: { type: String, default: DEFAULT_THEME_SETTINGS.header.linkHoverColor },
      borderColor: { type: String, default: DEFAULT_THEME_SETTINGS.header.borderColor },
      scrolledBackgroundColor: { type: String, default: DEFAULT_THEME_SETTINGS.header.scrolledBackgroundColor },
      blurEffect: { type: Boolean, default: DEFAULT_THEME_SETTINGS.header.blurEffect },
    },
    footer: {
      backgroundColor: { type: String, default: DEFAULT_THEME_SETTINGS.footer.backgroundColor },
      textColor: { type: String, default: DEFAULT_THEME_SETTINGS.footer.textColor },
      headingColor: { type: String, default: DEFAULT_THEME_SETTINGS.footer.headingColor },
      linkColor: { type: String, default: DEFAULT_THEME_SETTINGS.footer.linkColor },
      accentColor: { type: String, default: DEFAULT_THEME_SETTINGS.footer.accentColor },
      borderColor: { type: String, default: DEFAULT_THEME_SETTINGS.footer.borderColor },
    },
    global: {
      primaryColor: { type: String, default: DEFAULT_THEME_SETTINGS.global.primaryColor },
      secondaryColor: { type: String, default: DEFAULT_THEME_SETTINGS.global.secondaryColor },
      backgroundColor: { type: String, default: DEFAULT_THEME_SETTINGS.global.backgroundColor },
      textColor: { type: String, default: DEFAULT_THEME_SETTINGS.global.textColor },
      fontFamily: { type: String, default: DEFAULT_THEME_SETTINGS.global.fontFamily },
    },
    sections: {
      hero: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.hero },
      about: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.about },
      services: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.services },
      clients: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.clients },
      sectors: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.sectors },
      caseStudies: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.caseStudies },
      whyUs: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.whyUs },
      testimonials: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.testimonials },
      finalCta: { type: Object, default: DEFAULT_THEME_SETTINGS.sections.finalCta },
    },
    sectionOrder: {
      type: [
        {
          id: String,
          name: String,
          name_ar: String,
          enabled: Boolean,
          order: Number,
          customBackgroundColor: String,
          customTextColor: String,
        },
      ],
      default: DEFAULT_THEME_SETTINGS.sectionOrder,
    },
  },
  {
    timestamps: true,
  }
);

export const ThemeSettings = mongoose.model<IThemeSettings>('ThemeSettings', ThemeSettingsSchema);
