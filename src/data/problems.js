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
        current: 'Tesis bazlı raporlama manuel ve hataya açıktır.',
        task: 'Endüstriyel sensör verilerinden anormallikleri tespit eden ve karbon sınır aşımı uyarısı veren bir sistem tasarlayın.',
        input: ['Baca gazı sensör verileri', 'Üretim hacmi logları'],
        output: ['Anomali tespit algoritması', 'Eşik değeri uyarı sistemi'],
        evaluation: ['F1-Score %90+', 'Uyarı gecikme süresi < 5 sn'],
        githubUrl: 'https://github.com/HackFest26/industry-emission-kit'
      }
    ]
  },
  {
    id: 'waste',
    title: 'Akıllı Atık ve Geri Dönüşüm',
    icon: '🗑️',
    color: '#06B6D4',
    description: 'Döngüsel ekonomi için yapay zeka destekli atık yönetimi ve lojistik çözümleri.',
    problems: [
      {
        id: 'waste-01',
        title: 'AI Tabanlı Atık Sınıflandırma',
        task: 'Konveyör bant üzerindeki atıkların (kağıt, plastik, cam, metal) görüntü işleme ile gerçek zamanlı sınıflandırılmasını sağlayın.',
        input: ['640x640 Atık görsel veri seti', 'Etiketlenmiş (YOLO format) koordinatlar'],
        output: ['YOLOv8/v10 Eğitilmiş Model', 'Sınıflandırma raporu (Confusion Matrix)'],
        evaluation: ['mAP@.50 > 0.85', 'İşleme hızı (Inference) < 100ms'],
        githubUrl: 'https://github.com/HackFest26/waste-sort-ai'
      }
    ]
  },
  {
    id: 'mobility',
    title: 'Akıllı Ulaşım ve Mobilite',
    icon: '🚇',
    color: COLORS.blue,
    description: 'Şehir içi trafik tahmini, rota optimizasyonu ve toplu taşıma verimliliği.',
    problems: [
      {
        id: 'mobility-01',
        title: 'Dinamik Trafik Sinyalizasyonu',
        task: 'Kavşaklardaki kamera verilerine dayanarak trafik ışığı sürelerini optimize eden bir RL (Reinforcement Learning) ajanı geliştirin.',
        input: ['Simülasyon ortamı (SUMO/CARLA)', 'Araç kuyruk uzunluğu verileri'],
        output: ['RL Model (Agent)', 'Ortalama bekleme süresi analiz raporu'],
        evaluation: ['Bekleme süresi iyileşme oranı > %20', 'Model kararlılığı'],
        githubUrl: 'https://github.com/HackFest26/traffic-rl-kit'
      }
    ]
  },
  {
    id: 'energy',
    title: 'Enerji Tüketimi ve Verimlilik',
    icon: '⚡',
    color: COLORS.yellow,
    description: 'Binalarda ve tesislerde enerji israfını önleyen kestirimci analizler.',
    problems: [
      {
        id: 'energy-01',
        title: 'Kestirimci Enerji Tasarrufu',
        task: 'Binalardaki HVAC (ısıtma-soğutma) sistemlerinin dış hava sıcaklığına göre enerji tüketimini optimize eden model geliştirin.',
        input: ['Bina IoT sensör verileri', 'Hava durumu API verileri'],
        output: ['Optimizasyon algoritması', 'Tasarruf projeksiyonu dashboardu'],
        evaluation: ['Enerji tasarruf oranı %10+', 'Kullanıcı konfor endeksi korunumu'],
        githubUrl: 'https://github.com/HackFest26/hvac-optimize-ai'
      }
    ]
  },
  {
    id: 'renewable',
    title: 'Yenilenebilir Enerji Zekası',
    icon: '🔋',
    color: '#8B5CF6',
    description: 'Güneş ve rüzgar enerjisi üretim tahmini ve şebeke dengesi.',
    problems: [
      {
        id: 'renewable-01',
        title: 'Solar Verim Tahminleme',
        task: 'Bulutluluk ve radyasyon verilerini kullanarak 24 saatlik güneş paneli verim projeksiyonu oluşturun.',
        input: ['PV Panel logları', 'Bulutluluk oranı verileri (Satellite)'],
        output: ['Zaman serisi tahmin modeli (LSTM/Prophet)', 'Üretim Dashboardu'],
        evaluation: ['MAPE (Mean Absolute Percentage Error) < %12'],
        githubUrl: 'https://github.com/HackFest26/solar-forecast-kit'
      }
    ]
  },
  {
    id: 'eco',
    title: 'Biyoçeşitlilik ve Ekosistem',
    icon: '🌿',
    color: '#22C55E',
    description: 'Doğal habitat takibi ve türlerin yaşam alanlarının AI ile korunması.',
    problems: [
      {
        id: 'eco-01',
        title: 'Akustik Tür Tanıma',
        task: 'Ormanlık alanlardan alınan ses kayıtlarından kuş ve memeli türlerini tespit eden bir ses analiz modeli geliştirin.',
        input: ['Audio (.wav) veri seti', 'Spektrogram etiketleri'],
        output: ['Audio Classification Model', 'Tür yoğunluk haritası'],
        evaluation: ['Top-3 Accuracy > %80', 'Gürültü toleransı (Signal-to-Noise Ratio)'],
        githubUrl: 'https://github.com/HackFest26/eco-sound-ai'
      }
    ]
  }
];
