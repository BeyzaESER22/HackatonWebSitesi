/**
 * Program akışı.
 */

export const schedule = [
  {
    id: 'day-1',
    dayNumber: 16,
    dayName: 'Cumartesi',
    month: 'Mayıs',
    title: 'Hackathon Başlangıcı',
    color: '#4285F4',
    sections: [
      {
        id: 'hackathon',
        title: 'Hackathon Akışı',
        items: [
          {
            time: '09:00',
            title: 'Açılış, Kayıt ve Yerleşme',
            desc: 'Katılımcı kayıtları alınır, ekipler alana yerleşir ve etkinlik düzeni paylaşılır.',
            accent: '#4285F4'
          },
          {
            time: '10:00',
            title: 'Açılış Konuşması',
            desc: 'HackFest\'26 AI resmi açılışı ve yarışma öncesi bilgilendirme.',
            accent: '#34A853'
          },
          {
            time: '11:00',
            title: 'Yarışma Başlangıcı',
            desc: 'Hackathon süreci başlar; ekipler proje geliştirme çalışmalarına geçer.',
            accent: '#FBBC05'
          }
        ]
      },
      {
        id: 'side-events',
        title: 'Sosyal ve Yan Etkinlikler',
        items: [
          {
            time: '14:00 - 16:00',
            title: 'Stand Etkinlikleri',
            desc: 'Stand alanında sosyal ve yan etkinlikler.',
            accent: '#EA4335'
          },
          {
            time: '16:00',
            title: 'Workshop — Mehmet Niyazi Atlioğlu',
            desc: 'Konum: ANK 1. Kat, 102.',
            accent: '#4285F4'
          },
          {
            time: '17:00',
            title: 'Oyun Etkinliği ve Çekiliş Sonuçlarının Belirlenmesi',
            desc: 'Sosyal oyun etkinliği düzenlenir ve çekiliş sonuçları belirlenir.',
            accent: '#34A853'
          },
          {
            time: '18:00',
            title: 'Karaoke Parti — Müzik Kulübü',
            desc: 'Müzik Kulübü eşliğinde karaoke parti.',
            accent: '#FBBC05'
          },
          {
            time: '20:00',
            title: 'Açık Hava Sineması / Sitcom Dizi Gecesi — Sinema Kulübü',
            desc: 'Sinema Kulübü ile açık hava gösterimi ve sitcom dizi gecesi.',
            accent: '#EA4335'
          }
        ]
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 17,
    dayName: 'Pazar',
    month: 'Mayıs',
    title: 'Teslim ve Kapanış',
    color: '#EA4335',
    sections: [
      {
        id: 'hackathon',
        title: 'Hackathon Akışı',
        items: [
          {
            time: '09:00',
            title: 'Kapı Açılışı',
            desc: 'İkinci gün alan açılır ve ekipler son hazırlıklarına devam eder.',
            accent: '#EA4335'
          },
          {
            time: '11:00',
            title: 'Proje Teslimi ve Mentor Değerlendirmesi',
            desc: 'Projeler teslim edilir; mentor değerlendirme süreci başlar.',
            accent: '#4285F4'
          },
          {
            time: '17:00',
            title: 'Ödül Töreni, Kapanış Konuşması ve Veda',
            desc: 'Kazananlar açıklanır ve etkinlik kapanışı yapılır.',
            accent: '#EA4335'
          }
        ]
      },
      {
        id: 'side-events',
        title: 'Sosyal ve Yan Etkinlikler',
        items: [
          {
            time: '13:00 - 14:00',
            title: 'Veri Bilimi Paneli — Kerimcan Arslan, Emre Doğan ve Emin Doğan',
            desc: 'Konum: ANK Kongre -2.',
            accent: '#34A853'
          },
          {
            time: '14:00 - 17:00',
            title: 'Stand Etkinlikleri',
            desc: 'Stand alanında sosyal ve yan etkinlikler.',
            accent: '#FBBC05'
          },
          {
            time: '17:00',
            title: 'Çekiliş Sonuçlarının İlanı',
            desc: 'Çekiliş sonuçları katılımcılarla paylaşılır.',
            accent: '#EA4335'
          }
        ]
      }
    ]
  }
];

export const SCHEDULE_TBA_NOTE = '16-17 Mayıs 2026 boyunca hackathon ana akışı ile sosyal, konuşmacı, workshop ve stand etkinlikleri ayrı başlıklar altında.';
