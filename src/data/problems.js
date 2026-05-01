import { COLORS } from '@/lib/constants';

export const categories = [
  {
    id: 'carbon',
    title: 'Karbon ve Emisyon Takibi',
    icon: '🌱',
    color: COLORS.green,
    description: 'Şehir ve sanayi ölçekli emisyon analizi ve karbon ayak izi optimizasyonu.',
    problems: [
      {
        id: 'carbon-01',
        title: 'Kentsel Emisyon Tahminleme',
        task: 'Şehir bazlı enerji ve trafik verilerini kullanarak gelecek dönem karbon salınım projeksiyonlarını oluşturacak bir ML modeli geliştirin.',
        input: ['Tarihsel enerji tüketim verileri', 'Trafik yoğunluk indeksleri', 'Hava kalitesi sensör verileri'],
        output: ['Tahminleme modeli (Python/Pickle)', 'Anlık emisyon haritası (Dashboard)', 'Politika öneri raporu'],
        evaluation: ['RMSE Skoru < 0.15', 'Görselleştirme kalitesi', 'Kullanıcı dostu dashboard'],
        githubUrl: 'https://github.com/HackFest26/carbon-prediction-kit'
      },
      {
        id: 'carbon-02',
        title: 'Sanayi Emisyon Analizörü',
        task: 'Endüstriyel sensör verilerinden anormallikleri tespit eden ve karbon sınır aşımı uyarısı veren bir sistem tasarlayın.',
        input: ['Baca gazı sensör verileri', 'Üretim hacmi logları'],
        output: ['Anomali tespit algoritması', 'Eşik değeri uyarı sistemi'],
        evaluation: ['F1-Score %90+', 'Uyarı gecikme süresi < 5 sn'],
        githubUrl: 'https://github.com/HackFest26/industry-emission-kit'
      },
      {
        id: 'carbon-03',
        title: 'Bireysel Karbon Asistanı',
        task: 'Kullanıcıların harcama ve mobilite verilerinden yola çıkarak günlük karbon ayak izini hesaplayan ve azaltma önerileri sunan bir NLP tabanlı asistan geliştirin.',
        input: ['Harcama kategorileri verisi', 'Ulaşım logları', 'Kullanıcı yaşam tarzı anket verileri'],
        output: ['Kişiselleştirilmiş öneri motoru', 'Mobil uygulama prototipi'],
        evaluation: ['Öneri alaka düzeyi', 'Kullanıcı etkileşim oranı'],
        githubUrl: 'https://github.com/HackFest26/carbon-asistant-kit'
      }
    ]
  },
  {
    id: 'waste',
    title: 'Akıllı Atık ve Döngüsel Ekonomi',
    icon: '🗑️',
    color: '#06B6D4',
    description: 'Döngüsel ekonomi için yapay zeka destekli atık yönetimi ve lojistik çözümleri.',
    problems: [
      {
        id: 'waste-01',
        title: 'AI Tabanlı Atık Sınıflandırma',
        task: 'Konveyör bant üzerindeki atıkların (kağıt, plastik, cam, metal) görüntü işleme ile gerçek zamanlı sınıflandırılmasını sağlayın.',
        input: ['Atık görsel veri seti', 'Etiketlenmiş (YOLO format) koordinatlar'],
        output: ['YOLOv8/v10 Eğitilmiş Model', 'Sınıflandırma raporu'],
        evaluation: ['mAP@.50 > 0.85', 'Inference hızı < 100ms'],
        githubUrl: 'https://github.com/HackFest26/waste-sort-ai'
      },
      {
        id: 'waste-02',
        title: 'Dinamik Toplama Optimizasyonu',
        task: 'Akıllı konteyner doluluk verilerini kullanarak çöp toplama araçları için en verimli rotayı çizen algoritmayı geliştirin.',
        input: ['Konteyner doluluk logları', 'Şehir yol ağı verisi', 'Araç kapasite bilgileri'],
        output: ['Rota optimizasyon motoru', 'Sürücü yönlendirme arayüzü'],
        evaluation: ['Kat edilen mesafe azalma oranı > %15', 'Zaman verimliliği'],
        githubUrl: 'https://github.com/HackFest26/waste-logistics-ai'
      },
      {
        id: 'waste-03',
        title: 'Geri Dönüşüm Teşvik Analitiği',
        task: 'Hane halkı geri dönüşüm alışkanlıklarını analiz ederek bölgelere göre teşvik modelleri öneren bir sistem geliştirin.',
        input: ['Bölgesel atık verileri', 'Demografik veriler', 'Sosyo-ekonomik göstergeler'],
        output: ['Tahminleyici analiz paneli', 'Kişiselleştirilmiş teşvik planı'],
        evaluation: ['Tahmin doğruluğu', 'Uygulanabilirlik skoru'],
        githubUrl: 'https://github.com/HackFest26/waste-incentive-ai'
      }
    ]
  },
  {
    id: 'mobility',
    title: 'Akıllı Ulaşım ve Mobilite (EV dahil)',
    icon: '🚇',
    color: COLORS.blue,
    description: 'Şehir içi trafik tahmini, rota optimizasyonu ve elektrikli araç şarj altyapısı çözümleri.',
    problems: [
      {
        id: 'mobility-01',
        title: 'Dinamik Trafik Sinyalizasyonu',
        task: 'Kavşaklardaki kamera verilerine dayanarak trafik ışığı sürelerini optimize eden bir RL ajanı geliştirin.',
        input: ['Simülasyon ortamı verileri', 'Araç kuyruk uzunluğu logları'],
        output: ['RL Model (Agent)', 'Bekleme süresi analiz paneli'],
        evaluation: ['Ortalama bekleme süresi iyileşme oranı > %20'],
        githubUrl: 'https://github.com/HackFest26/traffic-rl-kit'
      },
      {
        id: 'mobility-02',
        title: 'EV Şarj İstasyonu Konumlandırma',
        task: 'Şehirdeki trafik akışı ve mevcut elektrik şebeke kapasitesine göre optimal EV şarj istasyonu noktalarını belirleyin.',
        input: ['Trafik akış haritaları', 'Şebeke yük verileri', 'Mevcut istasyon lokasyonları'],
        output: ['Optimal konum haritası', 'Yatırım maliyet analizi'],
        evaluation: ['Kapsama alanı genişliği', 'Şebeke stabilite etkisi'],
        githubUrl: 'https://github.com/HackFest26/ev-location-ai'
      },
      {
        id: 'mobility-03',
        title: 'Mikro-Mobilite Talep Tahmini',
        task: 'Paylaşımlı bisiklet ve scooterların şehir içindeki gelecek saatlik talep yoğunluğunu tahmin eden bir sistem geliştirin.',
        input: ['Kullanıcı kiralama geçmişi', 'Hava durumu verileri', 'Etkinlik takvimi'],
        output: ['Talep tahmin modeli', 'Araç yeniden dağıtım rotaları'],
        evaluation: ['MAE (Mean Absolute Error) skoru', 'Araç doluluk oranı'],
        githubUrl: 'https://github.com/HackFest26/micromobility-forecast'
      }
    ]
  },
  {
    id: 'energy',
    title: 'Enerji Tüketimi ve Verimlilik',
    icon: '⚡',
    color: COLORS.yellow,
    description: 'Binalarda ve tesislerde enerji israfını önleyen kestirimci analizler ve optimizasyon sistemleri.',
    problems: [
      {
        id: 'energy-01',
        title: 'Kestirimci Enerji Tasarrufu',
        task: 'Binalardaki HVAC sistemlerinin dış hava sıcaklığına göre enerji tüketimini optimize eden model geliştirin.',
        input: ['IoT sensör verileri', 'Hava durumu API verileri'],
        output: ['Optimizasyon algoritması', 'Tasarruf paneli'],
        evaluation: ['Enerji tasarruf oranı %10+', 'Konfor endeksi'],
        githubUrl: 'https://github.com/HackFest26/hvac-optimize-ai'
      },
      {
        id: 'energy-02',
        title: 'Endüstriyel Yük Çizelgeleme',
        task: 'Fabrikaların enerji maliyetlerini düşürmek için üretim süreçlerini enerji fiyatlarının düşük olduğu saatlere kaydıran bir çizelgeleme sistemi geliştirin.',
        input: ['Enerji fiyat verileri (EPİAŞ)', 'Üretim iş emri listesi', 'Makine güç tüketim profilleri'],
        output: ['Optimal üretim takvimi', 'Maliyet projeksiyonu'],
        evaluation: ['Maliyet düşüş oranı %15+', 'Üretim aksama riski'],
        githubUrl: 'https://github.com/HackFest26/industrial-load-ai'
      },
      {
        id: 'energy-03',
        title: 'Hanehalkı Enerji Analitiği',
        task: 'Akıllı sayaç verilerinden hangi cihazın ne kadar tükettiğini (NILM) tespit eden bir model geliştirin.',
        input: ['Agrege enerji tüketim verisi (1Hz+)', 'Cihaz imza kütüphanesi'],
        output: ['Cihaz bazlı tüketim raporu', 'Anomali tespit uyarısı'],
        evaluation: ['Cihaz tanıma doğruluğu (F1)', 'Gerçek zamanlılık'],
        githubUrl: 'https://github.com/HackFest26/nilm-energy-ai'
      }
    ]
  },
  {
    id: 'renewable',
    title: 'Yenilenebilir Enerji ve Şebeke Yönetimi',
    icon: '🔋',
    color: '#8B5CF6',
    description: 'Güneş ve rüzgar enerjisi üretim tahmini, batarya yönetimi ve şebeke dengesi.',
    problems: [
      {
        id: 'renewable-01',
        title: 'Solar Verim Tahminleme',
        task: 'Bulutluluk ve radyasyon verilerini kullanarak 24 saatlik güneş paneli verim projeksiyonu oluşturun.',
        input: ['PV Panel logları', 'Bulutluluk verileri'],
        output: ['Tahmin modeli', 'Üretim paneli'],
        evaluation: ['MAPE skoru < %12'],
        githubUrl: 'https://github.com/HackFest26/solar-forecast-kit'
      },
      {
        id: 'renewable-02',
        title: 'VPP (Sanal Santral) Yönetimi',
        task: 'Dağıtık enerji kaynaklarını (güneş, batarya) tek bir merkezden yöneterek şebeke talebini karşılayan bir kontrolcü tasarlayın.',
        input: ['Üretim tahminleri', 'Anlık şebeke talebi', 'Batarya SOC (Şarj) durumları'],
        output: ['VPP yönetim algoritması', 'Dengeleme raporu'],
        evaluation: ['Talebi karşılama oranı', 'Batarya ömür koruma verimi'],
        githubUrl: 'https://github.com/HackFest26/vpp-control-ai'
      },
      {
        id: 'renewable-03',
        title: 'Rüzgar Türbini Arıza Tahmini',
        task: 'Türbin üzerindeki titreşim ve sıcaklık sensörlerinden yaklaşan mekanik arızaları önceden tahmin edin.',
        input: ['SCADA verileri', 'Arıza geçmişi logları', 'Titreşim spektrumları'],
        output: ['Kestirimci bakım modeli', 'Bakım önceliklendirme arayüzü'],
        evaluation: ['Arıza önceden haber verme süresi', 'False Alarm oranı'],
        githubUrl: 'https://github.com/HackFest26/wind-turbine-health'
      }
    ]
  },
  {
    id: 'agri',
    title: 'Tarım, Su ve Sürdürülebilirlik',
    icon: '🌾',
    color: '#10B981',
    description: 'Hassas tarım, akıllı sulama ve kırsal alanlarda kaynak yönetimi teknolojileri.',
    problems: [
      {
        id: 'agri-01',
        title: 'Hassas Sulama Zekası',
        task: 'Toprak nemi ve buharlaşma verilerini kullanarak su tüketimini minimize eden bir otonom sulama planlayıcı geliştirin.',
        input: ['Toprak nem sensör verileri', 'Hava durumu tahminleri', 'Bitki su ihtiyacı veri tabanı'],
        output: ['Haftalık sulama takvimi', 'Su tasarruf analizörü'],
        evaluation: ['Su tasarruf oranı %25+', 'Bitki stres endeksi'],
        githubUrl: 'https://github.com/HackFest26/smart-irrigation-ai'
      },
      {
        id: 'agri-02',
        title: 'Bitki Hastalık Tespiti',
        task: 'Drone veya mobil kamera görüntülerinden bitki yapraklarındaki hastalıkları ve zararlıları gerçek zamanlı tespit edin.',
        input: ['Bitki hastalıkları görsel seti', 'Sağlıklı/Hasta etiketleri'],
        output: ['Mobil teşhis modeli', 'İlaçlama bölge haritası'],
        evaluation: ['Classification Accuracy', 'Tespit hızı'],
        githubUrl: 'https://github.com/HackFest26/crop-disease-detector'
      },
      {
        id: 'agri-03',
        title: 'Hasat Zamanı Tahminleme',
        task: 'Uydu görüntüleri ve iklim verilerini analiz ederek meyve/sebze hasadı için en doğru günü tahmin edin.',
        input: ['NDVI indeks verileri', 'Sıcaklık birikim verileri (GDD)'],
        output: ['Hasat projeksiyon paneli', 'Ürün kalite tahmini'],
        evaluation: ['Tahmin sapma günü < 3 gün', 'Lojistik uyum verimi'],
        githubUrl: 'https://github.com/HackFest26/harvest-prediction-ai'
      }
    ]
  },
  {
    id: 'eco',
    title: 'Biyoçeşitlilik ve Ekosistem',
    icon: '🌿',
    color: '#22C55E',
    description: 'Doğal habitat takibi, nesli tükenmekte olan türlerin korunması ve ekolojik veri analizi.',
    problems: [
      {
        id: 'eco-01',
        title: 'Akustik Tür Tanıma',
        task: 'Ormanlık alanlardan alınan ses kayıtlarından kuş ve memeli türlerini tespit eden bir analiz modeli geliştirin.',
        input: ['Ses kayıt veri seti (.wav)', 'Tür spektrogram etiketleri'],
        output: ['Audio Classifier', 'Tür yoğunluk haritası'],
        evaluation: ['Top-3 Accuracy > %80', 'Gürültü toleransı'],
        githubUrl: 'https://github.com/HackFest26/eco-sound-ai'
      },
      {
        id: 'eco-02',
        title: 'Orman Kaybı İzleme',
        task: 'Uydu görüntülerindeki değişimlerden kaçak kesim veya orman yangını riskli bölgeleri gerçek zamanlı saptayın.',
        input: ['Çok zamanlı uydu görüntüleri', 'Arazi kullanım verileri'],
        output: ['Değişim tespit algoritması', 'Riskli bölge uyarı sistemi'],
        evaluation: ['Tespit doğruluğu (IOU)', 'Erken uyarı hızı'],
        githubUrl: 'https://github.com/HackFest26/forest-watch-ai'
      },
      {
        id: 'eco-03',
        title: 'İstilacı Tür Yayılım Modelleme',
        task: 'Ekolojik verileri kullanarak istilacı türlerin gelecek 5 yıldaki yayılım alanlarını modelleyin.',
        input: ['İklim verileri', 'Tür gözlem kayıtları', 'Bitki örtüsü haritaları'],
        output: ['Yayılım simülasyonu', 'Koruma öncelik haritası'],
        evaluation: ['Tahmin tutarlılığı (R2)', 'Simülasyon hızı'],
        githubUrl: 'https://github.com/HackFest26/invasive-species-model'
      }
    ]
  },
  {
    id: 'disaster',
    title: 'Afet Yönetimi ve Dayanıklılık',
    icon: '🚨',
    color: COLORS.red,
    description: 'Afet öncesi erken uyarı, afet anı koordinasyon ve sonrası hasar tespit sistemleri.',
    problems: [
      {
        id: 'disaster-01',
        title: 'Hızlı Hasar Tespit AI',
        task: 'Deprem veya sel sonrası çekilen hava fotoğraflarından bina hasar durumlarını (Yıkık/Ağır/Hafif) sınıflandırın.',
        input: ['Afet sonrası hava görüntüleri', 'Bina envanter verisi'],
        output: ['Hasar haritalama modeli', 'Acil müdahale öncelik listesi'],
        evaluation: ['Sınıflandırma F1-Skoru', 'Harita oluşturma süresi'],
        githubUrl: 'https://github.com/HackFest26/disaster-damage-ai'
      },
      {
        id: 'disaster-02',
        title: 'Acil Lojistik Optimizasyonu',
        task: 'Afet anında talep verilerini ve kapalı yol bilgilerini kullanarak yardım tırları için dinamik rota planlayın.',
        input: ['Kullanıcı ihtiyaç bildirimleri', 'Canlı trafik/yol durumu verisi'],
        output: ['Dinamik rota planlayıcı', 'Kaynak dağıtım dashboardu'],
        evaluation: ['Teslimat süresi minimizasyonu', 'Kaynak kullanım oranı'],
        githubUrl: 'https://github.com/HackFest26/emergency-logistics'
      },
      {
        id: 'disaster-03',
        title: 'Erken Uyarı Mesaj Analizi',
        task: 'Sosyal medya verilerinden afet anındaki panik ve gerçek bilgi akışını analiz ederek kriz merkezine özet rapor sunun.',
        input: ['Real-time sosyal medya akışı', 'Doğrulanmış resmi kaynaklar'],
        output: ['NLP özetleme ve doğrulama motoru', 'Kriz ısı haritası'],
        evaluation: ['Bilgi doğruluk oranı', 'Özetleme kalitesi'],
        githubUrl: 'https://github.com/HackFest26/crisis-info-ai'
      }
    ]
  },
  {
    id: 'edu',
    title: 'Eğitim ve Öğrenme Teknolojileri',
    icon: '🎓',
    color: '#F59E0B',
    description: 'Kişiselleştirilmiş öğrenme yolları, erişilebilir eğitim araçları ve yetkinlik analizi.',
    problems: [
      {
        id: 'edu-01',
        title: 'Kişiselleştirilmiş Öğrenme Yolu',
        task: 'Öğrencinin performans verilerinden eksik olduğu konuları saptayan ve özel müfredat öneren bir sistem tasarlayın.',
        input: ['Sınav/Ödev performans verileri', 'Konu haritası (Ontoloji)', 'Öğrenme materyalleri veri tabanı'],
        output: ['Adaptif öğrenme algoritması', 'İlerleme takip paneli'],
        evaluation: ['Başarı artış oranı', 'Öğrenci motivasyon endeksi'],
        githubUrl: 'https://github.com/HackFest26/adaptive-learning-ai'
      },
      {
        id: 'edu-02',
        title: 'Erişilebilir Eğitim Asistanı',
        task: 'Online ders videolarını anlık olarak işaret diline veya sesli betimlemeye dönüştüren yapay zeka sistemi geliştirin.',
        input: ['Video/Audio ders içerikleri', 'Türk İşaret Dili veri seti'],
        output: ['Anlık çeviri motoru', 'Erişilebilir video player'],
        evaluation: ['Çeviri doğruluk oranı (WER)', 'Gecikme süresi (Latency)'],
        githubUrl: 'https://github.com/HackFest26/accessible-edu-ai'
      },
      {
        id: 'edu-03',
        title: 'Gelecek Yetkinlik Analizörü',
        task: 'İş ilanları ve mezun verilerini analiz ederek öğrencilere hangi yetkinliklerin gelecekte kritik olacağını raporlayın.',
        input: ['LinkedIn/Kariyer ilan verileri', 'Mezun başarı hikayeleri', 'Global teknoloji trendleri'],
        output: ['Kariyer rehberlik motoru', 'Yetkinlik açığı analiz raporu'],
        evaluation: ['Trend yakalama isabeti', 'Rehberlik doğruluk oranı'],
        githubUrl: 'https://github.com/HackFest26/career-skill-ai'
      }
    ]
  },
  {
    id: 'health',
    title: 'Sağlık ve Refah Teknolojileri',
    icon: '🧠',
    color: '#EC4899',
    description: 'Mental sağlık takibi, erken tanı araçları ve koruyucu sağlık hizmetleri zekası.',
    problems: [
      {
        id: 'health-01',
        title: 'Mental Sağlık Destek Ajanı',
        task: 'Kullanıcının yazdığı metinlerden duygusal durumunu ve stres seviyesini analiz ederek önleyici öneriler sunan bir chatbot geliştirin.',
        input: ['Duygu durumu etiketli metin seti', 'Psikolojik destek protokolleri'],
        output: ['NLP duygu analizörü', 'E-terapi asistanı'],
        evaluation: ['Empati skoru', 'Duygu tanıma isabeti'],
        githubUrl: 'https://github.com/HackFest26/mental-health-ai'
      },
      {
        id: 'health-02',
        title: 'Mobil Erken Tanı Aracı',
        task: 'Akıllı telefon kamerasıyla alınan cilt/göz görüntülerinden yaygın hastalıkların risk seviyesini tahmin eden model geliştirin.',
        input: ['Medikal görüntü veri seti', 'Uzman tanısı etiketleri'],
        output: ['Görüntü tabanlı teşhis modeli', 'Doktor sevk algoritması'],
        evaluation: ['Precision/Recall oranları', 'Görüntü kalitesi toleransı'],
        githubUrl: 'https://github.com/HackFest26/mobile-diagnosis-ai'
      },
      {
        id: 'health-03',
        title: 'Kronik Hasta Takip Zekası',
        task: 'Giyilebilir teknoloji verilerinden (nabız, uyku, adım) kronik hastaların bir sonraki kriz anını (örn. şeker düşmesi) tahmin edin.',
        input: ['Zaman serisi sensör verileri', 'Klinik parametreler'],
        output: ['Kriz tahmin modeli', 'Acil durum uyarı sistemi'],
        evaluation: ['Tahmin penceresi doğruluğu', 'Yanlış alarm minimizasyonu'],
        githubUrl: 'https://github.com/HackFest26/chronic-health-ai'
      }
    ]
  }
];
