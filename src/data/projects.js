/**
 * Projects data layer.
 *
 * Bu modül iki kaynağı birleştirir:
 *   1) staticProjects — koddan gelen, organizatörlerin elle eklediği projeler
 *      (örn. örnek showcase projesi).
 *   2) /api/projects   — runtime'da yüklenen, onaylanmış kullanıcı başvuruları.
 *
 * Sample project, hiçbir başvuru olmasa bile galeri sayfasının dolu görünmesini
 * sağlar ve yarışmacılara ne tür çıktılar beklediğimizi gösteren bir referans olur.
 */

export const sampleProjectId = 'sample-lexiflow';

export const staticProjects = [
  {
    id: sampleProjectId,
    isSample: true,
    isApproved: true,
    submittedAt: '2026-05-16T09:00:00+03:00',

    title: 'LexiFlow — Disleksi Dostu AI Okuma Asistanı',
    category: 'edu',
    categoryLabel: 'Eğitim Teknolojileri',
    shortDescription:
      'Disleksili öğrenciler için metni gerçek zamanlı olarak yeniden biçimlendiren, okuma hızını ve kavramayı kişiye özel AI modeliyle optimize eden web uygulaması.',
    longDescription:
      'LexiFlow; herhangi bir web sayfasını veya ders metnini tarayıcı eklentisi aracılığıyla yakalar, Gemini API ile cümle yapısını basitleştirir, OpenDyslexic benzeri adaptif font seçimi uygular ve kullanıcının göz izleme verisinden çıkarılan okuma hızına göre kelime gruplarını dinamik olarak vurgular. Model, her oturumda kullanıcıya özgü hata paternlerini öğrenir ve müdahale stratejisini günceller. Türkçe NLP pipeline\'ı İTÜ-NLP veri setiyle ince ayar yapılmıştır.',

    team: {
      name: 'Team LexiFlow',
      members: [
        { name: 'Selin Arslan',  role: 'ML / NLP',     university: 'İstinye Üniversitesi' },
        { name: 'Can Öztürk',    role: 'Frontend',      university: 'İstinye Üniversitesi' },
        { name: 'Hira Yıldız',   role: 'UX Research',   university: 'Sabancı Üniversitesi' },
        { name: 'Emre Çelik',    role: 'Backend / API', university: 'İTÜ' }
      ]
    },

    techStack: ['Gemini API', 'React', 'Chrome Extension API', 'Python', 'FastAPI', 'Hugging Face'],
    impact: {
      headline: 'Okuma kavrama +42%',
      bullets: [
        '3 okulda 180 disleksili öğrenciyle pilot test tamamlandı.',
        'Ortalama okuma hızı 6 haftada %28 arttı, kavrama testi skoru %42 yükseldi.',
        'Milli Eğitim Bakanlığı EBA entegrasyonu için görüşmeler başlatıldı.'
      ]
    },

    githubUrl: 'https://github.com/example/lexiflow',
    demoUrl:   'https://lexiflow-demo.example.com',
    coverColors: ['#8B5CF6', '#06B6D4'],
    image: null,
    awards: ['Örnek Showcase — Eğitim Teknolojileri']
  },

  {
    id: 'sample-skillorbit',
    isSample: true,
    isApproved: true,
    submittedAt: '2026-05-16T09:05:00+03:00',

    title: 'SkillOrbit — Kariyer Yörüngesi Haritası',
    category: 'edu',
    categoryLabel: 'Eğitim Teknolojileri',
    shortDescription:
      'İş ilanlarını NLP ile analiz ederek öğrencinin mevcut yetkinlik boşluklarını tespit eden ve kişiye özel 3D kariyer yol haritası çizen interaktif platform.',
    longDescription:
      'SkillOrbit; LinkedIn ve Kariyer.net\'ten gerçek zamanlı iş ilanı verilerini çeker, Named Entity Recognition modeliyle yetkinlik isimlerini çıkarır ve öğrencinin CV\'siyle karşılaştırarak "yetkinlik uçurumunu" görselleştirir. Kullanıcı, 3D force-directed graph üzerinde sektörleri, rolleri ve yetkinlikleri gezebilir; AI asistanı hangi kursu, projeyi veya sertifikayı öncelikli alması gerektiğini kişiselleştirilmiş öğrenme yoluyla sunar.',

    team: {
      name: 'Team Orbit',
      members: [
        { name: 'Deniz Kaya',    role: 'Data / NLP',   university: 'Boğaziçi Üniversitesi' },
        { name: 'Mila Şahin',    role: 'Full-Stack',   university: 'İstinye Üniversitesi' },
        { name: 'Tarık Doğan',   role: 'Visualization', university: 'ODTÜ' },
        { name: 'Pınar Ekinci',  role: 'Product',      university: 'İstinye Üniversitesi' }
      ]
    },

    techStack: ['Gemini API', 'Next.js', 'Three.js', 'Python', 'spaCy', 'Neo4j'],
    impact: {
      headline: 'İşe alım süresi −31%',
      bullets: [
        '4.200 iş ilanı ve 12 sektör kapsayan canlı veri pipeline\'ı kuruldu.',
        'Beta test: 340 öğrencinin %78\'i 3 ay içinde hedef yetkinliği edindi.',
        'Üniversite kariyer merkezleri için toplu lisans görüşmeleri başladı.'
      ]
    },

    githubUrl: 'https://github.com/example/skillorbit',
    demoUrl:   'https://skillorbit-demo.example.com',
    coverColors: ['#F59E0B', '#34A853'],
    image: null,
    awards: ['Örnek Showcase — Eğitim Teknolojileri']
  },

  {
    id: 'sample-peersync',
    isSample: true,
    isApproved: true,
    submittedAt: '2026-05-16T09:10:00+03:00',

    title: 'PeerSync — AI Destekli Akıllı Grup Eşleştirme',
    category: 'edu',
    categoryLabel: 'Eğitim Teknolojileri',
    shortDescription:
      'Öğrencileri öğrenme stili, yetkinlik profili ve takvim uyumuna göre AI ile eşleştiren, grup dinamiklerini tahmin eden ve işbirliği kalitesini artıran platform.',
    longDescription:
      'PeerSync; öğrencilerin öğrenme stili anketi, geçmiş proje performansı ve müsaitlik takvimini çok-kriterli bir matching algoritmasıyla işler. Takım oluşturulduktan sonra GPT-4o tabanlı bir facilitator bot, haftalık check-in yaparak tıkanan noktaları tespit eder ve görev dağılımını yeniden önerir. Sosyal ağ analizi ile düşük etkileşimli üyeleri erken sapta; mentor atama kararları otomatikleştirilir.',

    team: {
      name: 'Team PeerSync',
      members: [
        { name: 'Zeynep Aydın',  role: 'AI / Backend', university: 'İstinye Üniversitesi' },
        { name: 'Kaan Polat',    role: 'Mobile',       university: 'Yıldız Teknik Üniversitesi' },
        { name: 'Leyla Güneş',   role: 'ML Engineer',  university: 'İstinye Üniversitesi' },
        { name: 'Alp Korkmaz',   role: 'DevOps',       university: 'Hacettepe Üniversitesi' }
      ]
    },

    techStack: ['Gemini API', 'Flutter', 'Django', 'PostgreSQL', 'NetworkX', 'Redis'],
    impact: {
      headline: 'Proje başarı oranı +55%',
      bullets: [
        '6 üniversitede 1.100 öğrenci ile kontrollü deney yapıldı.',
        'AI eşleştirmeli gruplar, rastgele gruplara kıyasla %55 daha yüksek proje notu aldı.',
        '3 üniversite LMS entegrasyonu için pilot anlaşma imzalandı.'
      ]
    },

    githubUrl: 'https://github.com/example/peersync',
    demoUrl:   'https://peersync-demo.example.com',
    coverColors: ['#EA4335', '#8B5CF6'],
    image: null,
    awards: ['Örnek Showcase — Eğitim Teknolojileri']
  }
];

export function getStaticProjects() {
  return staticProjects.filter(p => p.isApproved);
}
