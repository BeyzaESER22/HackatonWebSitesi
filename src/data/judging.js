import { COLORS } from '@/lib/constants';

export const judgingCriteria = [
  {
    weight: '25',
    title: 'Problem Tanımı & Toplumsal Relevans',
    desc: 'Problemin kalitesini ve doğruluğunu ölçer.',
    subpoints: [
      'Problem açık, spesifik ve ölçülebilir mi?',
      'Gerçek bir ihtiyaç mı yoksa varsayım mı?',
      'Hedef kullanıcı segmenti net mi?',
      'Problem kapsamı (scope) yeterince dar mı?',
      'Mevcut alternatifler analiz edilmiş mi?'
    ],
    note: 'Çözümün kalitesi burada puanlanmaz.'
  },
  {
    weight: '20',
    title: 'Teknik Uygulama Kalitesi',
    desc: '"Nasıl yapıldı"yı ve mühendislik başarısını ölçer.',
    subpoints: [
      'Sistem mimarisi (modülerlik, sürdürülebilirlik)',
      'Kod kalitesi (okunabilirlik, organizasyon)',
      'Performans (latency, efficiency) ve Hata yönetimi',
      'AI Modeli problem için doğru seçilmiş mi?',
      'Overengineering var mı? (Basit çözüm varken karmaşıklık)'
    ],
    note: 'Fikir kalitesi veya demo başarısı burada puanlanmaz.'
  },
  {
    weight: '15',
    title: 'Çözüm Kalitesi & Yenilik',
    desc: 'Çözümün ne kadar "akıllıca" olduğunu ölçer.',
    subpoints: [
      'Mevcut alternatiflerden nasıl ayrışıyor?',
      'Yaratıcı ve özgün bir yaklaşım var mı?',
      'AI/ML gerçekten core bileşen mi yoksa süs mü?',
      'Problem ile çözüm arasında güçlü bir bağ var mı?'
    ],
    note: 'Teknik implementasyon detayları burada puanlanmaz.'
  },
  {
    weight: '15',
    title: 'Ürünleşme & Fonksiyonel MVP',
    desc: 'Kullanılabilirlik ve çalışma durumunu ölçer.',
    subpoints: [
      'Core functionality uçtan uca çalışıyor mu?',
      'Demo gerçek mi yoksa mock (sahte) mu?',
      'Edge case\'ler düşünülmüş ve sistem stabil mi?',
      'Düzgün bir kullanıcı deneyimi (UX) sunuyor mu?'
    ],
    levels: [
      '0: Sadece fikir',
      '5: Kısmi demo',
      '10: Çalışan MVP',
      '15: Ürün seviyesi UX'
    ]
  },
  {
    weight: '15',
    title: 'Uygulanabilirlik & Etki Potansiyeli',
    desc: 'Gerçek dünya etkisini ve ölçeklenebilirliği ölçer.',
    subpoints: [
      'Gerçek dünyada uygulanabilir ve ölçeklenebilir mi?',
      'Ekonomik veya operasyonel değer yaratıyor mu?',
      'Veri, maliyet ve zaman açısından gerçekçi mi?',
      'Kullanıcıların benimseme ihtimali yüksek mi?'
    ]
  },
  {
    weight: '10',
    title: 'İletişim & Demo Etkisi',
    desc: 'Pitch performansı ve anlatım gücünü ölçer.',
    subpoints: [
      'Problem → çözüm akışı net ve anlaşılır mı?',
      'Teknik derinlik doğru seviyede aktarıldı mı?',
      'Sunum ikna edici ve profesyonel mi?',
      'Zaman yönetimi başarılı mı?'
    ],
    note: 'İyi anlatım, kötü projeyi kurtarmamalıdır.'
  }
];

export const pitchGuide = [
  {
    time: '30–45 sn',
    title: 'Problem',
    goal: 'Jürinin problemi net anlaması',
    answers: [
      'Hangi problemi çözüyorsunuz?',
      'Bu problem kimleri etkiliyor?',
      'Neden önemli? (Veri veya senaryo desteği)'
    ],
    avoid: 'Çok genel ifadeler, temelsiz iddialar.'
  },
  {
    time: '45–60 sn',
    title: 'Çözüm',
    goal: 'Ne yaptığınızı net anlatmak',
    answers: [
      'Ürününüz ne yapıyor?',
      'Problemi nasıl çözüyor?',
      'En önemli 1–2 özelliği nedir?'
    ],
    focus: 'Ne yaptık değil, nasıl değer yaratıyoruz.'
  },
  {
    time: '30–45 sn',
    title: 'Neden Farklı?',
    goal: 'Yenilik ve farkı göstermek',
    answers: [
      'Mevcut çözümlerden farkınız ne?',
      'Neden bu yaklaşım daha iyi?',
      'AI burada neden gerekli?'
    ]
  },
  {
    time: '45–60 sn',
    title: 'Teknik Yaklaşım',
    goal: 'Jürinin "gerçekten yapılmış" demesi',
    answers: [
      'Sistem yüksek seviyede nasıl çalışıyor?',
      'Hangi teknolojileri kullandınız?',
      'En kritik teknik kararınız neydi?'
    ],
    proTip: 'Basit mimari diyagram, az jargon.'
  },
  {
    time: '1–2 dk',
    title: 'Demo',
    goal: 'Çalışan ürünü kanıtlamak',
    answers: [
      'Giriş / Başlangıç durumu',
      'Ana kullanım senaryosu (İşlem gösterilmeli)',
      'Sonuç ve çıktı'
    ],
    fallback: 'Mutlaka bir video kaydı hazırda tutun.'
  }
];

export const presentationMethods = [
  {
    id: 'hybrid',
    title: 'Slayt + Canlı Demo',
    flow: [
      'Slayt ile problem ve çözüm hikayesi anlatılır.',
      'Demo ile ürünün gerçekliği kanıtlanır.'
    ],
    advantage: 'Jüri hem "hikayeyi" hem "gerçeği" görür. En dengeli değerlendirme modelidir.'
  },
  {
    id: 'product-only',
    title: 'Sadece Ürün Üzerinden Sunum',
    flow: [
      'Direkt uygulama üzerinden anlatım yapılır.',
      'UI/UX akışı üzerinden problem-çözüm gösterilir.'
    ],
    advantage: 'Ürün çok güçlü ve kendi kendini açıklıyorsa (self-explanatory) tercih edilir.',
    risk: 'Sadece UI gezdirmek teknik derinliği anlatmakta eksik kalabilir.'
  }
];

export const bonusPoints = [
  { points: '+5',  title: 'Kullanıcı Arayüzü (UI)',       desc: 'Web, mobil veya desktop interface. UX akışı mantıklı ve kullanılabilir olmalı.' },
  { points: '+5',  title: 'Gerçek Veri Üretimi',          desc: 'Scraping + cleaning + labeling VEYA domain-specific veri seti oluşturma.' },
  { points: '+15', title: 'Advanced AI Usage',           desc: 'RAG pipeline, fine-tuning, multi-agent system veya tool-use mimarisi.' }
];
