import { z } from 'zod';

export const HackathonApplicationSchema = z.object({
  fullName:   z.string().min(2, 'Ad soyad en az 2 karakter olmalı.').max(80),
  university: z.string().min(2, 'Üniversite bilgisi gerekli.').max(120),
  department: z.string().min(2, 'Bölüm bilgisi gerekli.').max(120),
  grade:      z.enum(['prep', '1', '2', '3', '4', '5', '6', 'grad'], {
    errorMap: () => ({ message: 'Sınıf bilgisini seçiniz.' })
  }),
  email:      z.string().email('Geçerli bir e-posta giriniz.'),
  phone:      z.string().min(10, 'Geçerli bir telefon numarası giriniz.').max(20),
  clientSubmissionId: z.string().min(8).max(120).optional(),
  teamStatus: z.enum(['has_team', 'will_form', 'individual'], {
    errorMap: () => ({ message: 'Takım durumunu seçiniz.' })
  }),
  teamSize: z.enum(['2', '3', '4', '5']).optional().or(z.literal('')),
  teammatesApplied: z.enum(['yes', 'no', 'waiting']).optional().or(z.literal('')),
  source: z.enum(['instagram', 'linkedin', 'club', 'whatsapp', 'friend', 'other'], {
    errorMap: () => ({ message: 'Lütfen bizi nereden duyduğunuzu seçin.' })
  }),
  projectIdea: z.string().max(800).optional().or(z.literal(''))
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
});

export const AttendeeRegistrationSchema = z.object({
  fullName:          z.string().min(2, 'Ad soyad en az 2 karakter olmalı.').max(80),
  email:             z.string().email('Geçerli bir e-posta giriniz.'),
  phone:             z.string().min(10, 'Geçerli bir telefon numarası giriniz.').max(20),
  university:        z.string().max(120).optional().or(z.literal('')),
  daysAttending:     z.enum(['day_1','day_2','both'], {
    errorMap: () => ({ message: 'Katılım gününü seçiniz.' })
  }),
  participationType: z.enum(['talks','workshops','stands','demo_day','all'], {
    errorMap: () => ({ message: 'İlgilendiğin etkinliği seçiniz.' })
  })
});

// Keep this tuple in sync with PROJECT_CATEGORIES in constants.js.
const CATEGORY_IDS = ['education', 'health', 'disaster', 'accessibility', 'sustainability', 'other'];

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
  githubUrl:   z.string().url('Geçerli bir GitHub URL\'si.').or(z.literal('')).optional(),
  demoUrl:     z.string().url('Geçerli bir demo URL\'si.').or(z.literal('')).optional()
});
