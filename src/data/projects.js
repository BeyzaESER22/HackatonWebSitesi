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

export const sampleProjectId = 'sample-medai';

export const staticProjects = [
  {
    id: sampleProjectId,
    isSample: true,
    isApproved: true,
    submittedAt: '2026-04-10T12:00:00+03:00',

    title: 'MedAI — Kırsal Sağlık için Erken Tanı Asistanı',
    category: 'health',
    categoryLabel: 'Sağlık',
    shortDescription:
      'Hekime erişimin sınırlı olduğu kırsal bölgelerde, semptom anlatımından erken triaj yapan ve en yakın sağlık kuruluşuna yönlendiren AI asistanı.',
    longDescription:
      'MedAI; kullanıcının doğal dildeki semptom anlatımını analiz eder, klinik bir triaj algoritmasıyla aciliyet düzeyini sınıflandırır ve en yakın hastane / sağlık ocağına yönlendirir. Düşük bant genişlikli bölgelerde çalışabilmesi için modeller cihaz üzerinde quantize edilmiştir. Etik komite tarafından gözden geçirilen bias-audit raporuyla geliyor; doktor yerine geçmek değil, bekleme/karar süresini kısaltmak için tasarlandı.',

    team: {
      name: 'Team Aurora',
      members: [
        { name: 'Eda Yılmaz',  role: 'ML Engineer',  university: 'İstinye Üniversitesi' },
        { name: 'Mert Kara',   role: 'Backend',      university: 'Boğaziçi Üniversitesi' },
        { name: 'Ayşe Demir',  role: 'Product / UX', university: 'İstinye Üniversitesi' },
        { name: 'Burak Aslan', role: 'Mobile',       university: 'İTÜ' }
      ]
    },

    techStack: ['Gemini API', 'Flutter', 'Python', 'FastAPI', 'PostgreSQL', 'Vertex AI'],
    impact: {
      headline: 'Triaj süresi −37%',
      bullets: [
        'Pilot bölgede 2,400 kullanıcıyla 8 haftalık saha denemesi.',
        'Yanlış pozitif oranı %4.1, klinik onay ile doğrulandı.',
        'Sağlık Bakanlığı 112 entegrasyonu için protokol görüşmesi başladı.'
      ]
    },

    githubUrl: 'https://github.com/example/medai',
    demoUrl:   'https://medai-demo.example.com',
    coverColors: ['#4285F4', '#34A853'],

    image: null,

    awards: ['🏆 Örnek Showcase — Toplum Yararına AI Kategorisi']
  }
];

export function getStaticProjects() {
  return staticProjects.filter(p => p.isApproved);
}
