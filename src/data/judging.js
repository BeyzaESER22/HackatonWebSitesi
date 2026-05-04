import { COLORS } from '@/lib/constants';

// =====================================================
//  JÜRİ KRİTERLERİ — Toplam: 100 puan + en fazla 15 bonus
//
//  Sayfada sadece başlık, ağırlık ve 1 satırlık özet
//  gösterilir. Detaylı rubrik için PDF Şartnameye yönlendirilir.
//  subpoints alanı PDF için referans olarak korunmuştur.
// =====================================================

export const judgingCriteria = [
  {
    weight: '15',
    title: 'Problem Tanımı & Toplumsal Etki',
    desc: 'Doğru problem mi, gerçek bir kullanıcı segmenti mi var?',
    subpoints: [
      'Problem ölçülebilir, spesifik ve dar bir kapsamda mı?',
      'Hedeflenen kullanıcı grubu net mi? (yaş, sektör, ihtiyaç)',
      'Mevcut çözüm/alternatif analizi yapılmış mı?',
      'Ölçülebilir bir toplumsal/çevresel etki tarif ediliyor mu?'
    ]
  },
  {
    weight: '40',
    title: 'Teknik Uygulama Kalitesi (Mühendislik)',
    desc: '"Nasıl yapıldı"yı ve mühendislik olgunluğunu ölçer. AI bilinçli mi kullanılmış, kod ürün kalitesinde mi?',
    subpoints: [
      'Sistem mimarisi: modülerlik, ayrım, ölçeklenebilirlik',
      'Kod kalitesi: okunabilirlik, isimlendirme, test/doğrulama izleri',
      'Performans: latency, kaynak kullanımı, kestirilebilirlik',
      'Hata yönetimi ve uç durum (edge case) dayanıklılığı',
      'AI seçimi: Modeli/yaklaşımı doğru gerekçeyle mi seçildi? Daha basit bir çözüm yeterli olur muydu?',
      'AI bilinçli kullanımı: Halüsinasyon, gizlilik, deterministiklik gibi limitlere mühendislik yanıtı var mı?',
      'Reproducibility: Repo açıldığında üçüncü bir kişi çalıştırabilir mi?'
    ],
    note: 'Bu kategori toplam puanın %40\'ıdır. Kaliteli mühendislik hackathonun ana beklentisidir.'
  },
  {
    weight: '10',
    title: 'Çözüm Yeniliği & Yaklaşım',
    desc: 'Çözümün ne kadar "akıllıca" ve özgün olduğunu ölçer.',
    subpoints: [
      'Mevcut alternatiflere göre net bir farklılaşma var mı?',
      'AI/ML çekirdek bileşen mi, yoksa süs mü?',
      'Problem ile çözüm arasında doğal bir uyum var mı?',
      'Kombinasyon, veri stratejisi veya yöntem yenilikçi mi?'
    ]
  },
  {
    weight: '10',
    title: 'MVP & Tamamlanmışlık',
    desc: 'Çalışan bir minimum viable product var mı? Demo gerçek mi?',
    subpoints: [
      'Core functionality uçtan uca çalışıyor mu?',
      'Demo gerçek mi yoksa hardcoded/mock mu?',
      'Hata, boş ve yükleme durumları düşünülmüş mü?',
      'Sistem stabil mi, demo sırasında çökme riski var mı?'
    ],
    levels: [
      '0: Sadece fikir',
      '4: Kısmi demo / mock',
      '7: Çalışan MVP',
      '10: Üretim seviyesi olgunluk'
    ]
  },
  {
    weight: '10',
    title: 'Kullanıcı Deneyimi (UI/UX)',
    desc: 'Profesyonel hackathon standardında arayüz ve etkileşim kalitesi.',
    subpoints: [
      'Bilgi mimarisi & navigasyon: Kullanıcı akışı net ve düşük sürtünmeli mi?',
      'Görsel hiyerarşi: Tipografi, kontrast, boşluk profesyonel mi?',
      'Etkileşim ve geri bildirim: Loading / empty / error / success durumları var mı?',
      'Erişilebilirlik: Klavye kullanımı, ekran okuyucu etiketleri, WCAG AA kontrast',
      'Responsive davranış: Mobil ve farklı ekran boyutlarında düzgün mü?',
      'Mikro-kopya: Buton ve hata metinleri açık, tutarlı ve sade mi?'
    ],
    note: 'Estetik tek başına yeterli değildir; kullanılabilirlik ve erişilebilirlik birlikte değerlendirilir.'
  },
  {
    weight: '10',
    title: 'Uygulanabilirlik & Ölçek',
    desc: 'Gerçek dünyada hayata geçirilebilir mi, ölçeklenebilir mi?',
    subpoints: [
      'Veri, maliyet ve operasyon gereksinimleri gerçekçi mi?',
      'Pilot sonrası ölçeklenmesinin önündeki engeller tanımlı mı?',
      'Ekonomik veya sosyal sürdürülebilirliği için bir model var mı?',
      'Kullanıcıların benimseme ihtimali ve dağıtım kanalı düşünülmüş mü?'
    ]
  },
  {
    weight: '5',
    title: 'Pitch & Demo Etkisi',
    desc: 'Anlatım netliği, ikna ve zaman yönetimi.',
    subpoints: [
      'Problem → çözüm → kanıt akışı net ve hızlı mı?',
      'Teknik derinlik doğru seviyede aktarıldı mı?',
      'Demo aksaklıklarına hazırlık (yedek video) var mı?',
      'Süre disiplinli mi?'
    ],
    note: 'İyi anlatım kötü projeyi kurtarmaz; yapay parlatmaya değil mühendislik gerçekliğine bakılır.'
  }
];

// =====================================================
//  BONUS PUANLAR — Toplam +15 puan
// =====================================================

export const bonusPoints = [
  {
    points: '+5',
    title: 'Gerçek Veri Üretimi',
    desc: 'Hazır veri seti yerine kendi domain-specific veri setini toplama, temizleme ve etiketleme süreçleri belgelendi.'
  },
  {
    points: '+10',
    title: 'Advanced AI Architecture',
    desc: 'Üretken modelin sınırlarını aşan ileri düzey kullanım: RAG pipeline, fine-tuning, multi-agent orkestrasyon, tool-use veya MLOps pipeline.'
  }
];

// =====================================================
//  PITCH REHBERİ — 5 dakikalık sunum için adımlar
//  Her adım: süre, başlık, hedef, ana sorular ve odak/risk notları.
// =====================================================

export const pitchGuide = [
  {
    time: '0:00 – 0:45',
    title: '1. Hook & Problem',
    goal: 'Jüriyi 45 saniyede problemin içine çek',
    answers: [
      'Hangi spesifik problemi çözüyorsunuz?',
      'Bu problem kimleri, ne ölçüde etkiliyor? (sayı verin)',
      'Neden şimdi? Şu anda çözülmemiş olmasının nedeni nedir?'
    ],
    focus: 'Tek bir konkret kullanıcıyı veya senaryoyu örnek üzerinden anlatın.',
    avoid: 'Genel-geçer iklim/sağlık/eğitim cümleleri ve "milyonlarca insan" tarzı soyut iddialar.'
  },
  {
    time: '0:45 – 1:30',
    title: '2. Çözüm & Değer',
    goal: 'Ürünün ne yaptığını ve neden değerli olduğunu net anlat',
    answers: [
      'Ürününüz ne yapıyor? (Tek cümle ile)',
      'Problemi nasıl çözüyor? (Ana 1-2 özellik)',
      'Kullanıcı için yarattığı somut değer nedir?'
    ],
    focus: 'Özellik listesi değil, kullanıcının kazanımı (saved time, found insight, prevented harm).',
    avoid: 'Roadmap maddeleri, "ileride yapacağız" cümleleri.'
  },
  {
    time: '1:30 – 2:15',
    title: '3. Farklılık & AI Gerekçesi',
    goal: 'Mevcut çözümlerden farkınızı ve AI\'in zorunluluğunu kanıtla',
    answers: [
      'Mevcut alternatiflerden somut farkınız ne?',
      'Burada AI olmasa çalışır mı? Eğer evetse neden AI?',
      'Neden bu yaklaşımı seçtiniz, alternatifi neydi?'
    ],
    focus: 'Bir karşılaştırma matrisi (siz vs. alternatif) tek slaytta anlaşılır.',
    avoid: '"Ilk biz yaptık" tarzı doğrulanamaz iddialar.'
  },
  {
    time: '2:15 – 3:15',
    title: '4. Teknik Yaklaşım',
    goal: 'Mühendislik gerçekliğini kanıtla',
    answers: [
      'Sistem yüksek seviyede nasıl çalışıyor? (1 mimari diyagram)',
      'Hangi modeller, kütüphaneler ve hangi gerekçeyle?',
      'En kritik mühendislik kararınız ve trade-off neydi?'
    ],
    proTip: 'Tek bir basit blok diyagram (input → model → output) jürinin %80\'ini ikna eder.',
    avoid: 'Jargon yığını, kullanılmayan teknolojileri sayma.'
  },
  {
    time: '3:15 – 4:30',
    title: '5. Canlı Demo',
    goal: 'Çalışan ürünü gerçeğin ta kendisiyle göster',
    answers: [
      'Açılış durumu (boş ekran / sample input)',
      'Ana kullanım senaryosu uçtan uca',
      'Çıktı, sonuç ve kullanıcının kazanımı'
    ],
    focus: 'Demo öncesi: dosya/sekme/yedek video önceden açık ve test edilmiş olmalı.',
    fallback: 'Mutlaka yerel video kaydı hazırda tutun; canlı demo çökerse 30 sn içinde geçin.'
  },
  {
    time: '4:30 – 5:00',
    title: '6. Kapanış & Etki',
    goal: 'Jüri aklında bir cümle bırakarak çık',
    answers: [
      'Pilot sonrası planınız ne? (1 cümle)',
      'Kim, ne zaman, nasıl benimseyebilir?',
      'Akılda kalacak tek cümlelik kapanış mesajı'
    ],
    proTip: 'Açılışta verdiğiniz konkret kullanıcıyı / sayıyı kapanışta tekrar referansla — döngüyü kapatın.',
    avoid: 'Teşekkür cümlelerinde 30 sn harcamak; kapanış cümlesi keskin olmalı.'
  }
];

// =====================================================
//  SUNUM YÖNTEMLERİ — Format seçimi
// =====================================================

export const presentationMethods = [
  {
    id: 'hybrid',
    title: 'Slayt + Canlı Demo',
    tagline: 'En güvenli ve en dengeli format. Çoğu jüri bunu bekler.',
    description: 'Slayt üzerinden problem, çözüm ve teknik anlatımı yapılır; ardından canlı demo ile ürünün gerçekliği kanıtlanır. Çoğu profesyonel hackathonda standart format budur.',
    flow: [
      '0:00–0:45 — Hook + Problem (slayt)',
      '0:45–1:30 — Çözüm + Değer (slayt)',
      '1:30–2:15 — Farklılık + AI gerekçesi (slayt)',
      '2:15–3:15 — Teknik mimari (slayt + diyagram)',
      '3:15–4:30 — Canlı demo (uygulama paylaşımı)',
      '4:30–5:00 — Kapanış (slayt)'
    ],
    advantage: 'Jüri hem hikâyeyi hem ürünü görür. Aksaklık olursa slayta dönüp anlatımı kurtarabilirsin.',
    risk: 'Slayt fazla yüklü olursa "konuşma metni okuma" havasına girer; her slaytta tek bir mesaj olmalı.',
    bestFor: ['Karmaşık teknik mimari içeren projeler', 'Kullanıcı akışının açıklama gerektirdiği ürünler', 'İlk hackathon deneyimi olan takımlar']
  },
  {
    id: 'product-first',
    title: 'Ürün Üzerinden Anlatım',
    tagline: 'Ürün kendi kendini anlatabiliyorsa en güçlü format.',
    description: 'Doğrudan uygulama üzerinden senaryo anlatılır; problem ve çözüm ürün etkileşimlerinin içinde gösterilir. Bu format ürünün "wow" faktörü yüksek olduğunda jüri üzerinde en güçlü etkiyi bırakır.',
    flow: [
      '0:00–0:30 — Hook: Ürünü açarak başla, kullanıcı senaryosu',
      '0:30–2:30 — Senaryoyu adım adım canlı yürüt (problem-çözüm in-action)',
      '2:30–3:30 — Mimariye kısa geçiş (mini diyagram veya konuşma)',
      '3:30–4:30 — İkinci senaryo veya gelişmiş özellik',
      '4:30–5:00 — Etki + kapanış cümlesi'
    ],
    advantage: 'En somut kanıt: ürün gerçekten çalışıyor. UI/UX kalitesi yüksekse Kullanıcı Deneyimi puanını da maksimize eder.',
    risk: 'Teknik derinlik atlanabilir; mimariyi en az 30 saniye anlat. İnternet/cihaz aksaklığı tüm sunumu zora sokar.',
    bestFor: ['Görsel olarak ikna edici ürünler', 'B2C uygulamalar, mobil deneyimler', 'Ürün tasarımı güçlü takımlar']
  },
  {
    id: 'story-driven',
    title: 'Hikâye Odaklı (Case Study) Pitch',
    tagline: 'Tek bir kullanıcının hikâyesi üzerinden tüm sunumu kur.',
    description: 'Bir persona, vaka veya gerçek kullanıcı senaryosu üzerinden pitch baştan sona kurulur. Yatırımcı sunumlarına yakın, duygusal ve ikna edici bir formattır; toplumsal etki kategorisinde özellikle güçlüdür.',
    flow: [
      '0:00–0:45 — Persona tanıtımı: "Ahmet 47 yaşında, bir kuru fasulye çiftçisi…"',
      '0:45–1:45 — Personanın günü/problemi (slayt + görsel)',
      '1:45–2:45 — Çözüm: Personanın ürünle nasıl etkileştiğini canlı göster',
      '2:45–3:45 — Mimari ve veri kaynaklarına geçiş',
      '3:45–4:30 — Ölçek: Aynı şey 1.000 / 100.000 Ahmet için ne anlama gelir?',
      '4:30–5:00 — Kapanış: Açılıştaki personayı tekrar referansla'
    ],
    advantage: 'Toplumsal etki kategorisinde özellikle güçlü; jüri "neden önemli" sorusunu zaten cevaplamış olur.',
    risk: 'Persona uydurulmuş hissederse güven kaybedilir — gerçek görüşme veya saha verisi referansla destekle.',
    bestFor: ['Sosyal etki / toplum yararı projeleri', 'Sağlık, eğitim, kırsal kalkınma', 'Hikâye anlatımı güçlü takımlar']
  }
];
