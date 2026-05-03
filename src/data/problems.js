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
        githubUrl: 'https://github.com/HackFest26/carbon-prediction-kit',
        datasetUrl: 'https://www.kaggle.com/datasets/unitednations/international-greenhouse-gas-emissions'
      },
      {
        id: 'carbon-02',
        title: 'Sanayi Emisyon Analizörü',
        task: 'Endüstriyel sensör verilerinden anormallikleri tespit eden ve karbon sınır aşımı uyarısı veren bir sistem tasarlayın.',
        input: ['Baca gazı sensör verileri', 'Üretim hacmi logları'],
        output: ['Anomali tespit algoritması', 'Eşik değeri uyarı sistemi'],
        evaluation: ['F1-Score %90+', 'Uyarı gecikme süresi < 5 sn'],
        githubUrl: 'https://github.com/HackFest26/industry-emission-kit',
        datasetUrl: 'https://www.kaggle.com/datasets/sudalairajkumar/undata-country-data?select=greenhouse_gas_inventory_data_data.csv'
      },
      {
        id: 'carbon-03',
        title: 'Bireysel Karbon Asistanı',
        task: 'Kullanıcıların harcama ve mobilite verilerinden yola çıkarak günlük karbon ayak izini hesaplayan ve azaltma önerileri sunan bir NLP tabanlı asistan geliştirin.',
        input: ['Harcama kategorileri verisi', 'Ulaşım logları', 'Kullanıcı yaşam tarzı anket verileri'],
        output: ['Kişiselleştirilmiş öneri motoru', 'Mobil uygulama prototipi'],
        evaluation: ['Öneri alaka düzeyi', 'Kullanıcı etkileşim oranı'],
        githubUrl: 'https://github.com/HackFest26/carbon-asistant-kit',
        datasetUrl: 'https://www.kaggle.com/datasets/waqi786/carbon-footprint-dataset'
      },
      {
        id: 'carbon-04',
        title: 'Tedarik Zinciri Karbon Analizi',
        task: 'Ürünlerin hammadde aşamasından son kullanıcıya kadar olan karbon salınımını modelleyen bir sistem geliştirin.',
        input: ['Ürün yaşam döngüsü verileri', 'Lojistik rota verileri', 'Enerji yoğunluğu kütüphanesi'],
        output: ['LCA (Life Cycle Assessment) modeli', 'Karbon ayak izi etiketi üretici'],
        evaluation: ['Tahmin tutarlılığı', 'Veri entegrasyon hızı'],
        githubUrl: 'https://github.com/HackFest26/supply-chain-carbon',
        datasetUrl: 'https://www.kaggle.com/datasets/thedevastator/life-cycle-assessment-data-of-common-food-items'
      },
      {
        id: 'carbon-05',
        title: 'Karbon Yakalama Verimlilik Tahmini',
        task: 'Karbon yakalama tesislerinden alınan sensör verileriyle operasyonel verimliliği optimize eden bir ML modeli geliştirin.',
        input: ['Sensör basınç/sıcaklık verileri', 'Gaz kompozisyon analizleri', 'Enerji tüketim logları'],
        output: ['Verimlilik optimizasyon algoritması', 'Anomali tespit sistemi'],
        evaluation: ['Enerji verimliliği artışı %10+', 'Tahmin hassasiyeti'],
        githubUrl: 'https://github.com/HackFest26/carbon-capture-optimize',
        datasetUrl: 'https://www.kaggle.com/datasets/reihanenamdari/co2-emissions-by-vehicles'
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
        githubUrl: 'https://github.com/HackFest26/waste-sort-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification'
      },
      {
        id: 'waste-02',
        title: 'Dinamik Toplama Optimizasyonu',
        task: 'Akıllı konteyner doluluk verilerini kullanarak çöp toplama araçları için en verimli rotayı çizen algoritmayı geliştirin.',
        input: ['Konteyner doluluk logları', 'Şehir yol ağı verisi', 'Araç kapasite bilgileri'],
        output: ['Rota optimizasyon motoru', 'Sürücü yönlendirme arayüzü'],
        evaluation: ['Kat edilen mesafe azalma oranı > %15', 'Zaman verimliliği'],
        githubUrl: 'https://github.com/HackFest26/waste-logistics-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/mostafaabla/garbage-classification'
      },
      {
        id: 'waste-03',
        title: 'Geri Dönüşüm Teşvik Analitiği',
        task: 'Hane halkı geri dönüşüm alışkanlıklarını analiz ederek bölgelere göre teşvik modelleri öneren bir sistem geliştirin.',
        input: ['Bölgesel atık verileri', 'Demografik veriler', 'Sosyo-ekonomik göstergeler'],
        output: ['Tahminleyici analiz paneli', 'Kişiselleştirilmiş teşvik planı'],
        evaluation: ['Tahmin doğruluğu', 'Uygulanabilirlik skoru'],
        githubUrl: 'https://github.com/HackFest26/waste-incentive-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/techs-robots/waste-classification-data'
      },
      {
        id: 'waste-04',
        title: 'Endüstriyel Simbiyoz Eşleştirici',
        task: 'Bir fabrikanın atığını diğerinin hammaddesi olarak eşleştiren NLP/Graf tabanlı bir öneri motoru tasarlayın.',
        input: ['Fabrika atık envanterleri', 'Hammadde ihtiyaç listeleri', 'Sektörel uyumluluk matrisi'],
        output: ['Simbiyoz eşleşme motoru', 'Lojistik maliyet analizi'],
        evaluation: ['Eşleşme doğruluğu', 'Maliyet tasarruf projeksiyonu'],
        githubUrl: 'https://github.com/HackFest26/industrial-symbiosis',
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/company-bankruptcy-prediction'
      },
      {
        id: 'waste-05',
        title: 'Okyanus Plastik Kirliliği Tespiti',
        task: 'Uydu veya drone görüntüleri üzerinden su yüzeyindeki plastik kirliliğini tespit eden bir bilgisayarlı görü modeli geliştirin.',
        input: ['Multispektral uydu görüntüleri', 'Etiketlenmiş plastik yoğunluk haritaları'],
        output: ['Kirlilik tespit modeli', 'Gerçek zamanlı izleme dashboardu'],
        evaluation: ['IOU Skoru > 0.70', 'Tespit hızı'],
        githubUrl: 'https://github.com/HackFest26/ocean-plastic-detect',
        datasetUrl: 'https://www.kaggle.com/datasets/vencerlanz09/plastic-paper-garbage-bag-synthetic-images'
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
        githubUrl: 'https://github.com/HackFest26/traffic-rl-kit',
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Metro+Interstate+Traffic+Volume'
      },
      {
        id: 'mobility-02',
        title: 'EV Şarj İstasyonu Konumlandırma',
        task: 'Şehirdeki trafik akışı ve mevcut elektrik şebeke kapasitesine göre optimal EV şarj istasyonu noktalarını belirleyin.',
        input: ['Trafik akış haritaları', 'Şebeke yük verileri', 'Mevcut istasyon lokasyonları'],
        output: ['Optimal konum haritası', 'Yatırım maliyet analizi'],
        evaluation: ['Kapsama alanı genişliği', 'Şebeke stabilite etkisi'],
        githubUrl: 'https://github.com/HackFest26/ev-location-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/darpan25bajaj/electric-vehicle-population-data'
      },
      {
        id: 'mobility-03',
        title: 'Mikro-Mobilite Talep Tahmini',
        task: 'Paylaşımlı bisiklet ve scooterların şehir içindeki gelecek saatlik talep yoğunluğunu tahmin eden bir sistem geliştirin.',
        input: ['Kullanıcı kiralama geçmişi', 'Hava durumu verileri', 'Etkinlik takvimi'],
        output: ['Talep tahmin modeli', 'Araç yeniden dağıtım rotaları'],
        evaluation: ['MAE (Mean Absolute Error) skoru', 'Araç doluluk oranı'],
        githubUrl: 'https://github.com/HackFest26/micromobility-forecast',
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset'
      },
      {
        id: 'mobility-04',
        title: 'Toplu Taşıma Doluluk Tahmini',
        task: 'Otobüs ve metro duraklarındaki yolcu yoğunluğunu geçmiş verilere dayanarak tahmin edin.',
        input: ['Turnike geçiş verileri', 'Mobil sinyal yoğunluk verisi', 'Hat bazlı sefer takvimi'],
        output: ['Kapasite kullanım tahmin modeli', 'Yolcu yönlendirme API'],
        evaluation: ['Tahmin doğruluğu %85+', 'Anlık veri işleme kapasitesi'],
        githubUrl: 'https://github.com/HackFest26/transit-occupancy',
        datasetUrl: 'https://www.kaggle.com/datasets/manasgupta/pune-metro-traffic-data'
      },
      {
        id: 'mobility-05',
        title: 'Otonom Sürüş için Engel Tespiti',
        task: 'LiDAR veya kamera verileriyle yoldaki yayaları ve araçları gerçek zamanlı tespit eden bir sistem geliştirin.',
        input: ['Kamera görüntüleri', 'LiDAR nokta bulutu verisi', 'Nesne etiketleri'],
        output: ['Nesne algılama modeli', 'Güvenli sürüş koridoru planlayıcı'],
        evaluation: ['mAP@.50 > 0.90', 'Gecikme süresi < 50ms'],
        githubUrl: 'https://github.com/HackFest26/autonomous-obstacle-detect',
        datasetUrl: 'https://www.kaggle.com/datasets/sshikamaru/udacity-self-driving-car-dataset'
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
        githubUrl: 'https://github.com/HackFest26/hvac-optimize-ai',
        datasetUrl: 'https://www.kaggle.com/c/ashrae-energy-prediction'
      },
      {
        id: 'energy-02',
        title: 'Endüstriyel Yük Çizelgeleme',
        task: 'Fabrikaların enerji maliyetlerini düşürmek için üretim süreçlerini enerji fiyatlarının düşük olduğu saatlere kaydıran bir çizelgeleme sistemi geliştirin.',
        input: ['Enerji fiyat verileri (EPİAŞ)', 'Üretim iş emri listesi', 'Makine güç tüketim profilleri'],
        output: ['Optimal üretim takvimi', 'Maliyet projeksiyonu'],
        evaluation: ['Maliyet düşüş oranı %15+', 'Üretim aksama riski'],
        githubUrl: 'https://github.com/HackFest26/industrial-load-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption'
      },
      {
        id: 'energy-03',
        title: 'Hanehalkı Enerji Analitiği',
        task: 'Akıllı sayaç verilerinden hangi cihazın ne kadar tükettiğini (NILM) tespit eden bir model geliştirin.',
        input: ['Agrege enerji tüketim verisi (1Hz+)', 'Cihaz imza kütüphanesi'],
        output: ['Cihaz bazlı tüketim raporu', 'Anomali tespit uyarısı'],
        evaluation: ['Cihaz tanıma doğruluğu (F1)', 'Gerçek zamanlılık'],
        githubUrl: 'https://github.com/HackFest26/nilm-energy-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/uciml/electric-power-consumption-data-set'
      },
      {
        id: 'energy-04',
        title: 'Ticari Bina Enerji Karşılaştırması',
        task: 'Benzer binaların enerji tüketimlerini karşılaştırarak verimlilik potansiyeli en yüksek olanları belirleyin.',
        input: ['Bina envanter verisi', 'Yıllık enerji fatura logları', 'Kullanım tipi verileri'],
        output: ['Enerji skoru (Benchmarking)', 'Tasarruf yol haritası'],
        evaluation: ['Analiz kapsamı', 'Öneri alaka düzeyi'],
        githubUrl: 'https://github.com/HackFest26/building-benchmark',
        datasetUrl: 'https://www.kaggle.com/datasets/VirenD/building-energy-usage-forecasting'
      },
      {
        id: 'energy-05',
        title: 'Isı Kaybı Termal Analizörü',
        task: 'Binaların termal görüntülerinden yalıtım kusurlarını ve ısı kaçaklarını tespit eden bir AI geliştirin.',
        input: ['Termal RGB/IR görüntüler', 'Yalıtım tipi etiketleri', 'Dış ortam sıcaklık verisi'],
        output: ['Isı kaçağı segmentasyon modeli', 'Yalıtım kalite raporu'],
        evaluation: ['Segmentasyon IOU > 0.65', 'Yanlış pozitif oranı'],
        githubUrl: 'https://github.com/HackFest26/thermal-loss-detect',
        datasetUrl: 'https://github.com/m-t-f-v/Thermal-Images-of-Buildings'
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
        githubUrl: 'https://github.com/HackFest26/solar-forecast-kit',
        datasetUrl: 'https://www.kaggle.com/datasets/anikannal/solar-power-generation-data'
      },
      {
        id: 'renewable-02',
        title: 'VPP (Sanal Santral) Yönetimi',
        task: 'Dağıtık enerji kaynaklarını (güneş, batarya) tek bir merkezden yöneterek şebeke talebini karşılayan bir kontrolcü tasarlayın.',
        input: ['Üretim tahminleri', 'Anlık şebeke talebi', 'Batarya SOC (Şarj) durumları'],
        output: ['VPP yönetim algoritması', 'Dengeleme raporu'],
        evaluation: ['Talebi karşılama oranı', 'Batarya ömür koruma verimi'],
        githubUrl: 'https://github.com/HackFest26/vpp-control-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption'
      },
      {
        id: 'renewable-03',
        title: 'Rüzgar Türbini Arıza Tahmini',
        task: 'Türbin üzerindeki titreşim ve sıcaklık sensörlerinden yaklaşan mekanik arızaları önceden tahmin edin.',
        input: ['SCADA verileri', 'Arıza geçmişi logları', 'Titreşim spektrumları'],
        output: ['Kestirimci bakım modeli', 'Bakım önceliklendirme arayüzü'],
        evaluation: ['Arıza önceden haber verme süresi', 'False Alarm oranı'],
        githubUrl: 'https://github.com/HackFest26/wind-turbine-health',
        datasetUrl: 'https://www.kaggle.com/datasets/berkerisen/wind-turbine-scada-dataset'
      },
      {
        id: 'renewable-04',
        title: 'Şebeke Frekans Kararlılığı Tahmini',
        task: 'Yenilenebilir kaynakların şebekeye dahil edildiği anlarda sistem frekans değişimlerini tahmin edin.',
        input: ['Şebeke yük verileri', 'Üretim mix verisi', 'Frekans olay logları'],
        output: ['Kararlılık tahmin modeli', 'Acil yük atma algoritması'],
        evaluation: ['Tahmin isabeti %90+', 'Tepki süresi'],
        githubUrl: 'https://github.com/HackFest26/grid-stability-ai',
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Electrical+Grid+Stability+Simulated+Data+'
      },
      {
        id: 'renewable-05',
        title: 'Hidroelektrik Santral Debisi Tahmini',
        task: 'Yağış ve eriyen kar verileriyle baraj doluluk oranlarını ve üretim potansiyelini tahmin edin.',
        input: ['Meteorolojik veriler', 'Havza akış verileri', 'Tarihsel üretim logları'],
        output: ['Su debisi tahmin modeli', 'Optimal üretim planı'],
        evaluation: ['R2 Skoru > 0.80', 'Mevsimsel uyum'],
        githubUrl: 'https://github.com/HackFest26/hydro-flow-predict',
        datasetUrl: 'https://www.kaggle.com/datasets/szatkowski/era5-land-point-data'
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
        githubUrl: 'https://github.com/HackFest26/smart-irrigation-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset'
      },
      {
        id: 'agri-02',
        title: 'Bitki Hastalık Tespiti',
        task: 'Drone veya mobil kamera görüntülerinden bitki yapraklarındaki hastalıkları ve zararlıları gerçek zamanlı tespit edin.',
        input: ['Bitki hastalıkları görsel seti', 'Sağlıklı/Hasta etiketleri'],
        output: ['Mobil teşhis modeli', 'İlaçlama bölge haritası'],
        evaluation: ['Classification Accuracy', 'Tespit hızı'],
        githubUrl: 'https://github.com/HackFest26/crop-disease-detector',
        datasetUrl: 'https://www.kaggle.com/datasets/emmareid/plantvillage-dataset'
      },
      {
        id: 'agri-03',
        title: 'Hasat Zamanı Tahminleme',
        task: 'Uydu görüntüleri ve iklim verilerini analiz ederek meyve/sebze hasadı için en doğru günü tahmin edin.',
        input: ['NDVI indeks verileri', 'Sıcaklık birikim verileri (GDD)'],
        output: ['Hasat projeksiyon paneli', 'Ürün kalite tahmini'],
        evaluation: ['Tahmin sapma günü < 3 gün', 'Lojistik uyum verimi'],
        githubUrl: 'https://github.com/HackFest26/harvest-prediction-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/agriculture-dataset'
      },
      {
        id: 'agri-04',
        title: 'Toprak Verimliliği ve Gübre Önerisi',
        task: 'Toprağın NPK (Azot, Fosfor, Potasyum) değerlerine göre en uygun bitki ve gübre miktarını önerin.',
        input: ['Toprak kimyasal analiz verileri', 'Bitki gelişim logları', 'Gübre içerik kütüphanesi'],
        output: ['Optimal gübreleme algoritması', 'Ürün tavsiye motoru'],
        evaluation: ['Verim artış projeksiyonu', 'Maliyet minimizasyonu'],
        githubUrl: 'https://github.com/HackFest26/soil-fertility-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset'
      },
      {
        id: 'agri-05',
        title: 'Hayvancılık Sağlık İzleme',
        task: 'Akıllı kulak küpü sensörlerinden gelen sıcaklık ve hareket verileriyle hayvanlardaki hastalıkları erkenden tespit edin.',
        input: ['İvmeölçer ve GPS verileri', 'Sıcaklık logları', 'Klinik vaka geçmişi'],
        output: ['Erken uyarı sağlık paneli', 'Davranış analiz modeli'],
        evaluation: ['Anomali tespit doğruluğu', 'Uyarı hızı'],
        githubUrl: 'https://github.com/HackFest26/livestock-health',
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/cattle-behavior-classification-dataset'
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
        githubUrl: 'https://github.com/HackFest26/eco-sound-ai',
        datasetUrl: 'https://www.kaggle.com/c/birdclef-2023'
      },
      {
        id: 'eco-02',
        title: 'Orman Kaybı İzleme',
        task: 'Uydu görüntülerindeki değişimlerden kaçak kesim veya orman yangını riskli bölgeleri gerçek zamanlı saptayın.',
        input: ['Çok zamanlı uydu görüntüleri', 'Arazi kullanım verileri'],
        output: ['Değişim tespit algoritması', 'Riskli bölge uyarı sistemi'],
        evaluation: ['Tespit doğruluğu (IOU)', 'Erken uyarı hızı'],
        githubUrl: 'https://github.com/HackFest26/forest-watch-ai',
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Covertype'
      },
      {
        id: 'eco-03',
        title: 'İstilacı Tür Yayılım Modelleme',
        task: 'Ekolojik verileri kullanarak istilacı türlerin gelecek 5 yıldaki yayılım alanlarını modelleyin.',
        input: ['İklim verileri', 'Tür gözlem kayıtları', 'Bitki örtüsü haritaları'],
        output: ['Yayılım simülasyonu', 'Koruma öncelik haritası'],
        evaluation: ['Tahmin tutarlılığı (R2)', 'Simülasyon hızı'],
        githubUrl: 'https://github.com/HackFest26/invasive-species-model',
        datasetUrl: 'https://www.kaggle.com/datasets/vencerlanz09/wildlife-detection-images-dataset'
      },
      {
        id: 'eco-04',
        title: 'Mercan Kayalıkları Sağlık Analizi',
        task: 'Sualtı görüntülerinden mercan ağarmasını ve deniz ekosistemindeki değişimleri takip edin.',
        input: ['Sualtı kamera görüntüleri', 'Su sıcaklığı logları', 'Biyoçeşitlilik indeksleri'],
        output: ['Coral bleaching tespit modeli', 'Deniz ekosistemi sağlık indeksi'],
        evaluation: ['Sınıflandırma doğruluğu %85+', 'Anomali yakalama hızı'],
        githubUrl: 'https://github.com/HackFest26/coral-reef-health',
        datasetUrl: 'https://www.kaggle.com/datasets/vencerlanz09/coral-reef-image-classification'
      },
      {
        id: 'eco-05',
        title: 'Yaban Hayatı Koridor Optimizasyonu',
        task: 'Hayvan göç rotalarını modelleyerek otoyollarda eko-köprüler için en uygun lokasyonları belirleyin.',
        input: ['Hayvan takip (telemetri) verileri', 'Arazi topografyası', 'Yol ağları haritası'],
        output: ['Optimal koridor haritası', 'Eko-geçit yer öneri sistemi'],
        evaluation: ['Kapsama oranı', 'Çevresel etki puanı'],
        githubUrl: 'https://github.com/HackFest26/wildlife-corridor',
        datasetUrl: 'https://www.kaggle.com/datasets/vencerlanz09/wildlife-detection-images-dataset'
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
        githubUrl: 'https://github.com/HackFest26/disaster-damage-ai',
        datasetUrl: 'https://www.xview2.org/dataset'
      },
      {
        id: 'disaster-02',
        title: 'Acil Lojistik Optimizasyonu',
        task: 'Afet anında talep verilerini ve kapalı yol bilgilerini kullanarak yardım tırları için dinamik rota planlayın.',
        input: ['Kullanıcı ihtiyaç bildirimleri', 'Canlı trafik/yol durumu verisi'],
        output: ['Dinamik rota planlayıcı', 'Kaynak dağıtım dashboardu'],
        evaluation: ['Teslimat süresi minimizasyonu', 'Kaynak kullanım oranı'],
        githubUrl: 'https://github.com/HackFest26/emergency-logistics',
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/flood-prediction-dataset'
      },
      {
        id: 'disaster-03',
        title: 'Erken Uyarı Mesaj Analizi',
        task: 'Sosyal medya verilerinden afet anındaki panik ve gerçek bilgi akışını analiz ederek kriz merkezine özet rapor sunun.',
        input: ['Real-time sosyal medya akışı', 'Doğrulanmış resmi kaynaklar'],
        output: ['NLP özetleme ve doğrulama motoru', 'Kriz ısı haritası'],
        evaluation: ['Bilgi doğruluk oranı', 'Özetleme kalitesi'],
        githubUrl: 'https://github.com/HackFest26/crisis-info-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/vstepanivskyi/disaster-tweets'
      },
      {
        id: 'disaster-04',
        title: 'Sel Riski ve Taşkın Tahmini',
        task: 'Havza verileri ve yağış tahminleri ile sel riskli bölgeleri haritalayın.',
        input: ['Topografik veriler (DEM)', 'Tarihsel yağış ve debi verileri', 'Arazi kullanım haritaları'],
        output: ['Dinamik sel risk haritası', 'Tahliye öncelik algoritması'],
        evaluation: ['Tahmin doğruluğu %80+', 'Erken uyarı süresi'],
        githubUrl: 'https://github.com/HackFest26/flood-risk-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/flood-prediction-dataset'
      },
      {
        id: 'disaster-05',
        title: 'Yangın Yayılım Simülasyonu',
        task: 'Rüzgar yönü ve bitki örtüsü yoğunluğuna göre orman yangınlarının yayılım yolunu tahmin edin.',
        input: ['Hava durumu (rüzgar, nem) verileri', 'Bitki örtüsü yanıcılık indeksi', 'Uydu bazlı sıcak nokta verisi'],
        output: ['Yangın yayılım simülatörü', 'Müdahale strateji planı'],
        evaluation: ['Yayılım tahmin isabeti', 'Karar destek hızı'],
        githubUrl: 'https://github.com/HackFest26/wildfire-spread-sim',
        datasetUrl: 'https://www.kaggle.com/datasets/rtatman/wildfire-data'
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
        githubUrl: 'https://github.com/HackFest26/adaptive-learning-ai',
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Student+Performance'
      },
      {
        id: 'edu-02',
        title: 'Erişilebilir Eğitim Asistanı',
        task: 'Online ders videolarını anlık olarak işaret diline veya sesli betimlemeye dönüştüren yapay zeka sistemi geliştirin.',
        input: ['Video/Audio ders içerikleri', 'Türk İşaret Dili veri seti'],
        output: ['Anlık çeviri motoru', 'Erişilebilir video player'],
        evaluation: ['Çeviri doğruluk oranı (WER)', 'Gecikme süresi (Latency)'],
        githubUrl: 'https://github.com/HackFest26/accessible-edu-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/riiid/ednet'
      },
      {
        id: 'edu-03',
        title: 'Gelecek Yetkinlik Analizörü',
        task: 'İş ilanları ve mezun verilerini analiz ederek öğrencilere hangi yetkinliklerin gelecekte kritik olacağını raporlayın.',
        input: ['LinkedIn/Kariyer ilan verileri', 'Mezun başarı hikayeleri', 'Global teknoloji trendleri'],
        output: ['Kariyer rehberlik motoru', 'Yetkinlik açığı analiz raporu'],
        evaluation: ['Trend yakalama isabeti', 'Rehberlik doğruluk oranı'],
        githubUrl: 'https://github.com/HackFest26/career-skill-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/shivamb/netflix-shows'
      },
      {
        id: 'edu-04',
        title: 'Otomatik Ödev Değerlendirme ve Feedback',
        task: 'Öğrencilerin açık uçlu yanıtlarını NLP ile analiz ederek yapıcı geri bildirimler oluşturun.',
        input: ['Öğrenci yanıt metinleri', 'Notlandırma anahtarı (Rubric)', 'Örnek puanlanmış ödevler'],
        output: ['Puanlama motoru', 'Geri bildirim üretici (Feedback Generator)'],
        evaluation: ['İnsan notu ile korelasyon', 'Geri bildirim kalitesi'],
        githubUrl: 'https://github.com/HackFest26/auto-grading-ai',
        datasetUrl: 'https://www.kaggle.com/c/asap-aes'
      },
      {
        id: 'edu-05',
        title: 'Eğitimde Dropout Riski Tahmini',
        task: 'LMS (Öğrenme Yönetim Sistemi) etkileşim verileriyle okulu bırakma riski olan öğrencileri saptayın.',
        input: ['Sisteme giriş logları', 'İçerik tüketim süreleri', 'Demografik veriler'],
        output: ['Risk analiz dashboardu', 'Önleyici müdahale önerileri'],
        evaluation: ['Recall skoru %85+', 'Yanlış pozitif oranı'],
        githubUrl: 'https://github.com/HackFest26/dropout-prediction',
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Student+Performance'
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
        githubUrl: 'https://github.com/HackFest26/mental-health-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/praveengovi/emotions-dataset-for-nlp'
      },
      {
        id: 'health-02',
        title: 'Mobil Erken Tanı Aracı',
        task: 'Akıllı telefon kamerasıyla alınan cilt/göz görüntülerinden yaygın hastalıkların risk seviyesini tahmin eden model geliştirin.',
        input: ['Medikal görüntü veri seti', 'Uzman tanısı etiketleri'],
        output: ['Görüntü tabanlı teşhis modeli', 'Doktor sevk algoritması'],
        evaluation: ['Precision/Recall oranları', 'Görüntü kalitesi toleransı'],
        githubUrl: 'https://github.com/HackFest26/mobile-diagnosis-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia'
      },
      {
        id: 'health-03',
        title: 'Kronik Hasta Takip Zekası',
        task: 'Giyilebilir teknoloji verilerinden (nabız, uyku, adım) kronik hastaların bir sonraki kriz anını (örn. şeker düşmesi) tahmin edin.',
        input: ['Zaman serisi sensör verileri', 'Klinik parametreler'],
        output: ['Kriz tahmin modeli', 'Acil durum uyarı sistemi'],
        evaluation: ['Tahmin penceresi doğruluğu', 'Yanlış alarm minimizasyonu'],
        githubUrl: 'https://github.com/HackFest26/chronic-health-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database'
      },
      {
        id: 'health-04',
        title: 'İlaç Etkileşim ve Yan Etki Analizi',
        task: 'İlaç prospektüsleri ve hasta raporlarından olası ilaç etkileşimlerini NLP ile analiz edin.',
        input: ['İlaç prospektüs metinleri', 'Hasta semptom raporları', 'İlaç kimyasal kütüphanesi'],
        output: ['Risk analiz motoru', 'Etkileşim uyarı sistemi'],
        evaluation: ['Tespit doğruluğu', 'Klinik veri uyumu'],
        githubUrl: 'https://github.com/HackFest26/drug-interaction-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/shivanandmn/drug-side-effects-and-medical-condition-dataset'
      },
      {
        id: 'health-05',
        title: 'Yaşlılar için Düşme Tespiti',
        task: 'Giyilebilir ivmeölçer verileriyle yaşlıların düşme anını tespit eden ve acil durum sinyali gönderen sistem geliştirin.',
        input: ['İvmeölçer ve jiroskop verileri', 'Normal yaşam aktivite logları', 'Düşme vakası kayıtları'],
        output: ['Düşme tespit algoritması', 'Acil çağrı tetikleyici'],
        evaluation: ['Hassasiyet (Sensitivity) %95+', 'Gecikme < 1 sn'],
        githubUrl: 'https://github.com/HackFest26/fall-detection-ai',
        datasetUrl: 'https://www.kaggle.com/datasets/paultimothymooney/fall-detection-data-from-china'
      }
    ]
  }
];
