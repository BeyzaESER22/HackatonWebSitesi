import { z } from 'zod';

export const HackathonApplicationSchema = z.object({
  fullName:   z.string().min(2, 'Ad soyad en az 2 karakter olmalı.').max(80),
  university: z.string().min(2, 'Üniversite bilgisi gerekli.').max(120),
  department: z.string().min(2, 'Bölüm bilgisi gerekli.').max(120),
  grade:      z.enum(['prep', '1', '2', '3', '4', 'grad_recent', 'postgraduate'], {
    errorMap: () => ({ message: 'Sınıf bilgisini seçiniz.' })
  }),
  email:      z.string().email('Geçerli bir e-posta giriniz.'),
  phone:      z.string().min(10, 'Geçerli bir telefon numarası giriniz.').max(20),
  clientSubmissionId: z.string().min(8).max(120).optional(),
  teamStatus: z.enum(['has_team', 'will_form'], {
    required_error: 'Lütfen takım durumunuzu belirtin.',
  }),
  teamSize: z.enum(['2', '3', '4', '5']).optional().or(z.literal('')),
  teammatesApplied: z.enum(['yes', 'no', 'waiting']).optional().or(z.literal('')),
  source: z.enum(['instagram', 'linkedin', 'club', 'whatsapp', 'friend', 'other'], {
    errorMap: () => ({ message: 'Lütfen bizi nereden duyduğunuzu seçin.' })
  }),
  parkingNeeded: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Otopark/araç bilgisini seçiniz.' })
  }),
  licensePlate: z.string().max(20).optional().or(z.literal('')),
  kvkkNoticeAccepted: z.literal(true, {
    errorMap: () => ({ message: 'KVKK bilgilendirmesini onaylamanız gerekir.' })
  }),
  explicitConsentAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Açık rıza beyanını onaylamanız gerekir.' })
  }),
  dataRetentionAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Veri saklama bilgilendirmesini onaylamanız gerekir.' })
  })
}).superRefine((data, ctx) => {
  if (data.teamStatus === 'has_team' && !data.teamSize) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['teamSize'],
      message: 'Takım kişi sayısını seçiniz.'
    });
  }
  if (data.teamStatus === 'has_team' && !data.teammatesApplied) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['teammatesApplied'],
      message: 'Takım arkadaşlarınızın başvuru durumunu seçiniz.'
    });
  }
  if (data.parkingNeeded === 'yes' && !data.licensePlate?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['licensePlate'],
      message: 'Şahsi araçla gelecek katılımcılar için plaka bilgisi gereklidir.'
    });
  }
});

export const AttendeeRegistrationSchema = z.object({
  fullName:          z.string().min(2, 'Ad soyad en az 2 karakter olmalı.').max(80),
  email:             z.string().email('Geçerli bir e-posta giriniz.'),
  phone:             z.string().min(10, 'Geçerli bir telefon numarası giriniz.').max(20),
  university:        z.string().max(120).optional().or(z.literal('')),
  visitorProfile:    z.enum(['student', 'academic', 'professional', 'entrepreneur', 'sponsor', 'other'], {
    errorMap: () => ({ message: 'Ziyaretçi profilinizi seçiniz.' })
  }),
  daysAttending:     z.enum(['day_1','day_2','both'], {
    errorMap: () => ({ message: 'Katılım gününü seçiniz.' })
  }),
  interests: z.array(z.enum(['workshops', 'panels', 'stands', 'talks', 'demo_day', 'networking']))
    .min(1, 'En az bir ilgi alanı seçiniz.'),
  aiExperience: z.enum(['beginner', 'intermediate', 'advanced', 'not_sure'], {
    errorMap: () => ({ message: 'AI/teknoloji deneyim seviyenizi seçiniz.' })
  }),
  parkingNeeded: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Otopark/araç bilgisini seçiniz.' })
  }),
  licensePlate: z.string().max(20).optional().or(z.literal('')),
  accessibilityNeeds: z.string().max(400).optional().or(z.literal('')),
  kvkkNoticeAccepted: z.literal(true, {
    errorMap: () => ({ message: 'KVKK bilgilendirmesini onaylamanız gerekir.' })
  }),
  eventContactAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Etkinlik iletişimi bilgilendirmesini onaylamanız gerekir.' })
  }),
  rulesAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Davranış kurallarını onaylamanız gerekir.' })
  }),
  participationType: z.enum(['talks','workshops','stands','demo_day','all']).optional()
}).superRefine((data, ctx) => {
  if (data.parkingNeeded === 'yes' && !data.licensePlate?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['licensePlate'],
      message: 'Şahsi araçla gelecek ziyaretçiler için plaka bilgisi gereklidir.'
    });
  }
});

// Keep this tuple in sync with PROJECT_CATEGORIES in constants.js.
const CATEGORY_IDS = [
  'edu'
];

export const ProjectSubmissionSchema = z.object({
  title:        z.string().min(3, 'Proje adı en az 3 karakter.').max(80),
  category:     z.enum(CATEGORY_IDS, {
    errorMap: () => ({ message: 'Kategori seçiniz.' })
  }),
  shortDescription: z.string().min(20, 'En az 20 karakter.').max(200),
  longDescription:  z.string().min(50, 'En az 50 karakter.').max(2000),
  teamName:    z.string().min(2).max(80),
  teamMembers: z.string().min(2, 'En az bir ekip üyesi yazın.').max(500),
  techStack:   z.string().min(2).max(300),
  contactEmail: z.string().email(),
  githubUrl:   z.string().url('Geçerli bir GitHub URL\'si giriniz.'),
  demoUrl:     z.string().url('Geçerli bir demo URL\'si.').or(z.literal('')).optional()
});
