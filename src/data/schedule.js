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
      },
      {
        time: '14:00 - 16:00',
        title: 'Festival, Stand ve Ara Öğün',
        desc: 'Stand ziyaretleri, festival alanı aktiviteleri ve ara öğün molası.',
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
  },
  {
    id: 'day-2',
    dayNumber: 17,
    dayName: 'Pazar',
    month: 'Mayıs',
    title: 'Teslim ve Kapanış',
    color: '#EA4335',
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
        time: '13:00 - 14:00',
        title: 'Veri Bilimi Paneli',
        desc: 'Kerimcan Arslan, Emre Doğan ve Emin Doğan. Konum: ANK Kongre -2.',
        accent: '#34A853'
      },
      {
        time: '14:00 - 17:00',
        title: 'Stand Etkinlikleri',
        desc: 'Katılımcılar için stand alanında sosyal ve yan etkinlikler devam eder.',
        accent: '#FBBC05'
      },
      {
        time: '17:00',
        title: 'Ödül Töreni, Kapanış Konuşması ve Veda',
        desc: 'Kazananlar açıklanır, çekiliş sonuçları ilan edilir ve etkinlik kapanışı yapılır.',
        accent: '#EA4335'
      }
    ]
  }
];

export const SCHEDULE_TBA_NOTE = '16-17 Mayıs 2026 boyunca hackathon akışı, paneller, workshoplar ve sosyal etkinlikler.';
