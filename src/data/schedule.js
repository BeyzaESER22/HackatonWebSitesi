/**
 * Program akışı.
 *
 * Şu an netleşmiş tek nokta: 16 Mayıs 09:00 Açılış.
 * Diğer tüm satırlar belirsiz olarak işaretlenmiştir; içerik açıklandıkça
 * bu listeye eklenir. UI bu durumu otomatik olarak handle eder
 * (TBA satırı gösterir).
 */

export const schedule = [
  {
    id: 'day-1',
    dayNumber: 16,
    dayName: 'Cumartesi',
    month: 'Mayıs',
    title: 'Açılış',
    color: '#4285F4',
    items: [
      {
        time: '09:00',
        title: 'Açılış & Karşılama',
        desc: 'Kayıt, kahvaltı ve networking ile etkinliğe başlangıç.',
        accent: '#4285F4'
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 17,
    dayName: 'Pazar',
    month: 'Mayıs',
    title: 'Yakında',
    color: '#EA4335',
    items: []
  }
];

export const SCHEDULE_TBA_NOTE = 'Detaylı program akışı yakında açıklanacaktır. Etkinliğin son halini takip etmek için sosyal medyamızı izleyebilirsiniz.';
