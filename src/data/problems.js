import { COLORS } from '@/lib/constants';

export const categories = [
  {
    id: 'carbon',
    title: 'Karbon ve Emisyon Takibi',
    icon: '🌱',
    color: COLORS.green,
    description: 'Şehir ve sanayi ölçekli emisyon analizi ve karbon ayak izi optimizasyonu.',
    tagline: 'Görünmeyen sera gazını ölçülebilir, izlenebilir, indirilebilir veriye çevir.',
    theme: 'İklim krizinin merkezinde tek bir gerçek var: ölçemediğini yönetemezsin. Şehirler, fabrikalar ve bireyler her gün gigatonlarca CO₂ üretiyor; ama bu emisyonların büyük çoğunluğu hâlâ Excel tablolarında, yıl sonu raporlarında ya da hiç hesaplanmamış olarak duruyor. Bu kategoride; sensör verilerinden uydu görüntülerine, mali harcamalardan tedarik zinciri kayıtlarına kadar uzanan farklı veri kaynaklarını yapay zeka ile birleştirerek emisyonu gerçek zamanlı, kestirebilir ve aksiyona dönüştürülebilir hâle getirmeni bekliyoruz.',
    whyMatters: [
      'Türkiye 2053\'te net-sıfır hedefi koydu; bu hedefe ulaşmanın ilk şartı doğru ölçüm.',
      'AB Karbon Sınır Düzenleme Mekanizması (CBAM) 2026\'da tam yürürlükte; ölçemeyen şirketler ihracat dışı kalıyor.',
      'McKinsey araştırmasına göre tüketicilerin %73\'ü düşük karbonlu ürünleri tercih ediyor.'
    ],
    keyTopics: ['MRV', 'Scope 1-2-3', 'LCA', 'Karbon Muhasebesi', 'ESG'],
    problems: [
      {
        id: 'carbon-01',
        title: 'Kentsel Emisyon Tahminleme',
        task: 'Şehir bazlı enerji ve trafik verilerini kullanarak gelecek dönem karbon salınım projeksiyonlarını oluşturacak bir ML modeli geliştirin.',
        input: ['Tarihsel enerji tüketim verileri', 'Trafik yoğunluk indeksleri', 'Hava kalitesi sensör verileri'],
        output: ['Tahminleme modeli (Python/Pickle)', 'Anlık emisyon haritası (Dashboard)', 'Politika öneri raporu'],
        evaluation: ['RMSE Skoru < 0.15', 'Görselleştirme kalitesi', 'Kullanıcı dostu dashboard'],
        datasetUrl: 'https://www.kaggle.com/datasets/unitednations/international-greenhouse-gas-emissions'
      },
      {
        id: 'carbon-02',
        title: 'Sanayi Emisyon Analizörü',
        task: 'Endüstriyel sensör verilerinden anormallikleri tespit eden ve karbon sınır aşımı uyarısı veren bir sistem tasarlayın.',
        input: ['Baca gazı sensör verileri', 'Üretim hacmi logları'],
        output: ['Anomali tespit algoritması', 'Eşik değeri uyarı sistemi'],
        evaluation: ['F1-Score %90+', 'Uyarı gecikme süresi < 5 sn'],
        datasetUrl: 'https://www.kaggle.com/datasets/sudalairajkumar/undata-country-data?select=greenhouse_gas_inventory_data_data.csv'
      },
      {
        id: 'carbon-03',
        title: 'Bireysel Karbon Asistanı',
        task: 'Kullanıcıların harcama ve mobilite verilerinden yola çıkarak günlük karbon ayak izini hesaplayan ve azaltma önerileri sunan bir NLP tabanlı asistan geliştirin.',
        input: ['Harcama kategorileri verisi', 'Ulaşım logları', 'Kullanıcı yaşam tarzı anket verileri'],
        output: ['Kişiselleştirilmiş öneri motoru', 'Mobil uygulama prototipi'],
        evaluation: ['Öneri alaka düzeyi', 'Kullanıcı etkileşim oranı'],
        datasetUrl: 'https://www.kaggle.com/datasets/waqi786/carbon-footprint-dataset'
      },
      {
        id: 'carbon-04',
        title: 'Tedarik Zinciri Karbon Analizi',
        task: 'Ürünlerin hammadde aşamasından son kullanıcıya kadar olan karbon salınımını modelleyen bir sistem geliştirin.',
        input: ['Ürün yaşam döngüsü verileri', 'Lojistik rota verileri', 'Enerji yoğunluğu kütüphanesi'],
        output: ['LCA (Life Cycle Assessment) modeli', 'Karbon ayak izi etiketi üretici'],
        evaluation: ['Tahmin tutarlılığı', 'Veri entegrasyon hızı'],
        datasetUrl: 'https://www.kaggle.com/datasets/thedevastator/life-cycle-assessment-data-of-common-food-items'
      },
      {
        id: 'carbon-05',
        title: 'Karbon Yakalama Verimlilik Tahmini',
        task: 'Karbon yakalama tesislerinden alınan sensör verileriyle operasyonel verimliliği optimize eden bir ML modeli geliştirin.',
        input: ['Sensör basınç/sıcaklık verileri', 'Gaz kompozisyon analizleri', 'Enerji tüketim logları'],
        output: ['Verimlilik optimizasyon algoritması', 'Anomali tespit sistemi'],
        evaluation: ['Enerji verimliliği artışı %10+', 'Tahmin hassasiyeti'],
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
    tagline: 'Atığı çöp olmaktan çıkar; yeni bir hammadde, yeni bir gelir kaynağı yap.',
    theme: 'Doğrusal ekonomi (al, üret, kullan, at) gezegenin sınırlarını çoktan aştı. Döngüsel ekonomi ise her atığı bir başka sürecin girdisine çevirmeyi hedefliyor. Bu kategori; çöp konteynerlerindeki sınıflandırmadan, fabrika atıklarının başka fabrikalara hammadde olarak satılmasına, okyanustaki plastik kirliliğinin uydudan tespit edilmesine kadar geniş bir yelpazede çözümler arıyor. Görsel işleme, optimizasyon ve graf algoritmaları senin temel araçların olacak.',
    whyMatters: [
      'Dünyada üretilen plastiğin sadece %9\'u geri dönüştürülüyor; geri kalanı doğaya karışıyor.',
      'AB 2030\'a kadar plastik ambalajların %55\'inin geri dönüşüm zorunluluğunu getirdi.',
      'Endüstriyel simbiyoz pazarının 2030\'a kadar 50 milyar $\'ı aşması bekleniyor.'
    ],
    keyTopics: ['Computer Vision', 'YOLO Sınıflandırma', 'Rota Optimizasyonu', 'Endüstriyel Simbiyoz', 'Geri Dönüşüm'],
    problems: [
      {
        id: 'waste-01',
        title: 'AI Tabanlı Atık Sınıflandırma',
        task: 'Konveyör bant üzerindeki atıkların (kağıt, plastik, cam, metal) görüntü işleme ile gerçek zamanlı sınıflandırılmasını sağlayın.',
        input: ['Atık görsel veri seti', 'Etiketlenmiş (YOLO format) koordinatlar'],
        output: ['YOLOv8/v10 Eğitilmiş Model', 'Sınıflandırma raporu'],
        evaluation: ['mAP@.50 > 0.85', 'Inference hızı < 100ms'],
        datasetUrl: 'https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification'
      },
      {
        id: 'waste-02',
        title: 'Dinamik Toplama Optimizasyonu',
        task: 'Akıllı konteyner doluluk verilerini kullanarak çöp toplama araçları için en verimli rotayı çizen algoritmayı geliştirin.',
        input: ['Konteyner doluluk logları', 'Şehir yol ağı verisi', 'Araç kapasite bilgileri'],
        output: ['Rota optimizasyon motoru', 'Sürücü yönlendirme arayüzü'],
        evaluation: ['Kat edilen mesafe azalma oranı > %15', 'Zaman verimliliği'],
        datasetUrl: 'https://www.kaggle.com/datasets/mostafaabla/garbage-classification'
      },
      {
        id: 'waste-03',
        title: 'Geri Dönüşüm Teşvik Analitiği',
        task: 'Hane halkı geri dönüşüm alışkanlıklarını analiz ederek bölgelere göre teşvik modelleri öneren bir sistem geliştirin.',
        input: ['Bölgesel atık verileri', 'Demografik veriler', 'Sosyo-ekonomik göstergeler'],
        output: ['Tahminleyici analiz paneli', 'Kişiselleştirilmiş teşvik planı'],
        evaluation: ['Tahmin doğruluğu', 'Uygulanabilirlik skoru'],
        datasetUrl: 'https://www.kaggle.com/datasets/techs-robots/waste-classification-data'
      },
      {
        id: 'waste-04',
        title: 'Tekstil Atık Sınıflandırma & Yeniden Değerlendirme',
        task: 'Tekstil atıklarının kumaş türü, lif kompozisyonu ve renk gruplarına göre otomatik sınıflandırılmasını sağlayan; geri dönüştürülebilir/yeniden kullanılabilir/atık olarak kategorize eden bir görüntü işleme sistemi geliştirin.',
        input: ['Etiketlenmiş tekstil ürünü görselleri', 'Kumaş etiket veri seti', 'Renk paleti referansı'],
        output: ['CNN tabanlı sınıflandırma modeli', 'Yeniden kullanım öneri motoru'],
        evaluation: ['Top-1 Accuracy > %85', 'Confusion matrix dengesi'],
        datasetUrl: 'https://www.kaggle.com/datasets/agrigorev/clothing-dataset-full'
      },
      {
        id: 'waste-05',
        title: 'Okyanus Plastik Kirliliği Tespiti',
        task: 'Uydu veya drone görüntüleri üzerinden su yüzeyindeki plastik kirliliğini tespit eden bir bilgisayarlı görü modeli geliştirin.',
        input: ['Multispektral uydu görüntüleri', 'Etiketlenmiş plastik yoğunluk haritaları'],
        output: ['Kirlilik tespit modeli', 'Gerçek zamanlı izleme dashboardu'],
        evaluation: ['IOU Skoru > 0.70', 'Tespit hızı'],
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
    tagline: 'Şehri tıkayan trafiği, şarj sıralarını ve dağınık veriyi akıllı bir akışa dönüştür.',
    theme: 'İstanbul gibi mega şehirlerde bir sürücü yılda ortalama 105 saatini trafikte kaybediyor. Aynı zamanda elektrikli araçlar, paylaşımlı mikro mobilite ve toplu taşıma sistemlerinin entegrasyonu gibi karmaşık problemler birikmiş durumda. Bu kategori; trafik sinyallerini pekiştirmeli öğrenme ile dinamik kontrol etmekten otonom sürüş için engel tespitine, EV şarj istasyonu yer tahmininden mikro-mobilite talep modellemeye uzanan problemler içeriyor. Hedef: insanları daha hızlı, daha güvenli ve daha temiz hareket ettirmek.',
    whyMatters: [
      'Türkiye\'de elektrikli araç satışları son 2 yılda %170 arttı; şarj altyapısı yetişmiyor.',
      'Trafik sıkışıklığı GSYİH\'nin %3-5\'ine denk gelen bir maliyet üretiyor.',
      'Otonom araç pazarı 2030\'a kadar 2 trilyon $\'a ulaşacak.'
    ],
    keyTopics: ['Reinforcement Learning', 'Computer Vision', 'Time Series', 'Optimizasyon', 'EV Şarj Altyapısı'],
    problems: [
      {
        id: 'mobility-01',
        title: 'Dinamik Trafik Sinyalizasyonu',
        task: 'Kavşaklardaki kamera verilerine dayanarak trafik ışığı sürelerini optimize eden bir RL ajanı geliştirin.',
        input: ['Simülasyon ortamı verileri', 'Araç kuyruk uzunluğu logları'],
        output: ['RL Model (Agent)', 'Bekleme süresi analiz paneli'],
        evaluation: ['Ortalama bekleme süresi iyileşme oranı > %20'],
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Metro+Interstate+Traffic+Volume'
      },
      {
        id: 'mobility-02',
        title: 'EV Şarj İstasyonu Konumlandırma',
        task: 'Şehirdeki trafik akışı ve mevcut elektrik şebeke kapasitesine göre optimal EV şarj istasyonu noktalarını belirleyin.',
        input: ['Trafik akış haritaları', 'Şebeke yük verileri', 'Mevcut istasyon lokasyonları'],
        output: ['Optimal konum haritası', 'Yatırım maliyet analizi'],
        evaluation: ['Kapsama alanı genişliği', 'Şebeke stabilite etkisi'],
        datasetUrl: 'https://www.kaggle.com/datasets/darpan25bajaj/electric-vehicle-population-data'
      },
      {
        id: 'mobility-03',
        title: 'Mikro-Mobilite Talep Tahmini',
        task: 'Paylaşımlı bisiklet ve scooterların şehir içindeki gelecek saatlik talep yoğunluğunu tahmin eden bir sistem geliştirin.',
        input: ['Kullanıcı kiralama geçmişi', 'Hava durumu verileri', 'Etkinlik takvimi'],
        output: ['Talep tahmin modeli', 'Araç yeniden dağıtım rotaları'],
        evaluation: ['MAE (Mean Absolute Error) skoru', 'Araç doluluk oranı'],
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset'
      },
      {
        id: 'mobility-04',
        title: 'Toplu Taşıma Doluluk Tahmini',
        task: 'Otobüs ve metro duraklarındaki yolcu yoğunluğunu geçmiş verilere dayanarak tahmin edin.',
        input: ['Turnike geçiş verileri', 'Mobil sinyal yoğunluk verisi', 'Hat bazlı sefer takvimi'],
        output: ['Kapasite kullanım tahmin modeli', 'Yolcu yönlendirme API'],
        evaluation: ['Tahmin doğruluğu %85+', 'Anlık veri işleme kapasitesi'],
        datasetUrl: 'https://www.kaggle.com/datasets/manasgupta/pune-metro-traffic-data'
      },
      {
        id: 'mobility-05',
        title: 'Otonom Sürüş için Engel Tespiti',
        task: 'LiDAR veya kamera verileriyle yoldaki yayaları ve araçları gerçek zamanlı tespit eden bir sistem geliştirin.',
        input: ['Kamera görüntüleri', 'LiDAR nokta bulutu verisi', 'Nesne etiketleri'],
        output: ['Nesne algılama modeli', 'Güvenli sürüş koridoru planlayıcı'],
        evaluation: ['mAP@.50 > 0.90', 'Gecikme süresi < 50ms'],
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
    tagline: 'Tüketmediğin kilowatt-saat, en temiz enerjidir.',
    theme: 'Türkiye\'nin enerji yoğunluğu (birim GSYİH başına tüketim) AB ortalamasının %50 üstünde; yani aynı çıktıyı almak için 1.5 kat enerji yakıyoruz. Bu kategori; bina HVAC sistemlerinden fabrika üretim çizelgelerine, ev tipi sayaçlardan termal görüntülere kadar geniş bir alanda enerji israfını AI ile bulup kapatma üzerine kurulu. NILM (Non-Intrusive Load Monitoring), kestirimci kontrol ve termal görüntü segmentasyonu en aktif teknik alanlardan.',
    whyMatters: [
      'Binalar dünya genelinde enerji tüketiminin %40\'ından sorumlu.',
      'Türkiye yılda 60+ milyar TL\'lik enerji ithalatı yapıyor; verimlilik = stratejik bağımsızlık.',
      'EU Energy Efficiency Directive 2025\'te yeni yapı standardı zorunluluğu getirdi.'
    ],
    keyTopics: ['HVAC Optimizasyonu', 'NILM', 'Time Series Forecasting', 'Bina Verimliliği', 'Termal Görüntü'],
    problems: [
      {
        id: 'energy-01',
        title: 'Kestirimci Enerji Tasarrufu',
        task: 'Binalardaki HVAC sistemlerinin dış hava sıcaklığına göre enerji tüketimini optimize eden model geliştirin.',
        input: ['IoT sensör verileri', 'Hava durumu API verileri'],
        output: ['Optimizasyon algoritması', 'Tasarruf paneli'],
        evaluation: ['Enerji tasarruf oranı %10+', 'Konfor endeksi'],
        datasetUrl: 'https://www.kaggle.com/c/ashrae-energy-prediction'
      },
      {
        id: 'energy-02',
        title: 'Endüstriyel Yük Çizelgeleme',
        task: 'Fabrikaların enerji maliyetlerini düşürmek için üretim süreçlerini enerji fiyatlarının düşük olduğu saatlere kaydıran bir çizelgeleme sistemi geliştirin.',
        input: ['Enerji fiyat verileri (EPİAŞ)', 'Üretim iş emri listesi', 'Makine güç tüketim profilleri'],
        output: ['Optimal üretim takvimi', 'Maliyet projeksiyonu'],
        evaluation: ['Maliyet düşüş oranı %15+', 'Üretim aksama riski'],
        datasetUrl: 'https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption'
      },
      {
        id: 'energy-03',
        title: 'Hanehalkı Enerji Analitiği',
        task: 'Akıllı sayaç verilerinden hangi cihazın ne kadar tükettiğini (NILM) tespit eden bir model geliştirin.',
        input: ['Agrege enerji tüketim verisi (1Hz+)', 'Cihaz imza kütüphanesi'],
        output: ['Cihaz bazlı tüketim raporu', 'Anomali tespit uyarısı'],
        evaluation: ['Cihaz tanıma doğruluğu (F1)', 'Gerçek zamanlılık'],
        datasetUrl: 'https://www.kaggle.com/datasets/uciml/electric-power-consumption-data-set'
      },
      {
        id: 'energy-04',
        title: 'Ticari Bina Enerji Karşılaştırması',
        task: 'Benzer binaların enerji tüketimlerini karşılaştırarak verimlilik potansiyeli en yüksek olanları belirleyin.',
        input: ['Bina envanter verisi', 'Yıllık enerji fatura logları', 'Kullanım tipi verileri'],
        output: ['Enerji skoru (Benchmarking)', 'Tasarruf yol haritası'],
        evaluation: ['Analiz kapsamı', 'Öneri alaka düzeyi'],
        datasetUrl: 'https://www.kaggle.com/datasets/VirenD/building-energy-usage-forecasting'
      },
      {
        id: 'energy-05',
        title: 'Isı Kaybı Termal Analizörü',
        task: 'Binaların termal görüntülerinden yalıtım kusurlarını ve ısı kaçaklarını tespit eden bir AI geliştirin.',
        input: ['Termal RGB/IR görüntüler', 'Yalıtım tipi etiketleri', 'Dış ortam sıcaklık verisi'],
        output: ['Isı kaçağı segmentasyon modeli', 'Yalıtım kalite raporu'],
        evaluation: ['Segmentasyon IOU > 0.65', 'Yanlış pozitif oranı'],
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
    tagline: 'Güneş, rüzgar ve su düzensiz; AI bu kaosu kararlı bir şebekeye çevirir.',
    theme: 'Yenilenebilir kaynakların büyük zaafı kestirilemez olmaları: bulut geçer, rüzgar düşer, talep ile arz uyuşmaz. Şebeke operatörleri ise frekansı 50 Hz\'de tutmak zorunda. Bu kategori; PV verimi tahmininden rüzgar türbini arızasını önceden öngörmeye, batarya yönetiminden VPP (sanal santral) kontrolüne kadar dengeleme problemlerine odaklanır. Burada kazanan; fizik bilen, zaman serisi modelleyen ve sistem düşünebilen takımlar olacak.',
    whyMatters: [
      'Türkiye\'nin yenilenebilir kurulu gücü 2024\'te %58\'e ulaştı; entegrasyon zorlaşıyor.',
      'Bir saatlik PV tahmin hatası şebekeye saatte milyonlarca TL\'ye mal olabiliyor.',
      'Batarya pazarı 2030\'a kadar yıllık %30 büyüyor; kontrol algoritmaları kritik.'
    ],
    keyTopics: ['Time Series', 'SCADA Analitiği', 'Batarya Yönetimi', 'VPP', 'Şebeke Stabilitesi'],
    problems: [
      {
        id: 'renewable-01',
        title: 'Solar Verim Tahminleme',
        task: 'Bulutluluk ve radyasyon verilerini kullanarak 24 saatlik güneş paneli verim projeksiyonu oluşturun.',
        input: ['PV Panel logları', 'Bulutluluk verileri'],
        output: ['Tahmin modeli', 'Üretim paneli'],
        evaluation: ['MAPE skoru < %12'],
        datasetUrl: 'https://www.kaggle.com/datasets/anikannal/solar-power-generation-data'
      },
      {
        id: 'renewable-02',
        title: 'VPP (Sanal Santral) Yönetimi',
        task: 'Dağıtık enerji kaynaklarını (güneş, batarya) tek bir merkezden yöneterek şebeke talebini karşılayan bir kontrolcü tasarlayın.',
        input: ['Üretim tahminleri', 'Anlık şebeke talebi', 'Batarya SOC (Şarj) durumları'],
        output: ['VPP yönetim algoritması', 'Dengeleme raporu'],
        evaluation: ['Talebi karşılama oranı', 'Batarya ömür koruma verimi'],
        datasetUrl: 'https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption'
      },
      {
        id: 'renewable-03',
        title: 'Rüzgar Türbini Arıza Tahmini',
        task: 'Türbin üzerindeki titreşim ve sıcaklık sensörlerinden yaklaşan mekanik arızaları önceden tahmin edin.',
        input: ['SCADA verileri', 'Arıza geçmişi logları', 'Titreşim spektrumları'],
        output: ['Kestirimci bakım modeli', 'Bakım önceliklendirme arayüzü'],
        evaluation: ['Arıza önceden haber verme süresi', 'False Alarm oranı'],
        datasetUrl: 'https://www.kaggle.com/datasets/berkerisen/wind-turbine-scada-dataset'
      },
      {
        id: 'renewable-04',
        title: 'Şebeke Frekans Kararlılığı Tahmini',
        task: 'Yenilenebilir kaynakların şebekeye dahil edildiği anlarda sistem frekans değişimlerini tahmin edin.',
        input: ['Şebeke yük verileri', 'Üretim mix verisi', 'Frekans olay logları'],
        output: ['Kararlılık tahmin modeli', 'Acil yük atma algoritması'],
        evaluation: ['Tahmin isabeti %90+', 'Tepki süresi'],
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Electrical+Grid+Stability+Simulated+Data+'
      },
      {
        id: 'renewable-05',
        title: 'Hidroelektrik Santral Debisi Tahmini',
        task: 'Yağış ve eriyen kar verileriyle baraj doluluk oranlarını ve üretim potansiyelini tahmin edin.',
        input: ['Meteorolojik veriler', 'Havza akış verileri', 'Tarihsel üretim logları'],
        output: ['Su debisi tahmin modeli', 'Optimal üretim planı'],
        evaluation: ['R2 Skoru > 0.80', 'Mevsimsel uyum'],
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
    tagline: 'Daha az suyla, daha az gübre ile, daha çok ürün — hassas tarımın yapay zekası.',
    theme: 'Dünya tatlı su tüketiminin %70\'i tarıma gidiyor; ama suyun büyük kısmı buharlaşıyor ya da yanlış zamanda akıyor. Türkiye gibi yarı-kurak iklim ülkesi için bu özellikle kritik. Bu kategori; toprak nem sensörlerinden drone görüntülerine, NDVI uydu indekslerinden hayvan giyilebilirlerine kadar çiftlik ölçeğinde veriyi karara dönüştüren AI çözümlerini hedefler. Ürün veriminden hayvan refahına, gübre optimizasyonundan hasat zamanlamasına geniş bir spektrum var.',
    whyMatters: [
      'İklim değişikliği nedeniyle Türkiye\'de su stresi 2030\'a kadar %30 artacak.',
      'Hassas tarım uygulayan çiftlikler ortalama %20-30 verim artışı raporluyor.',
      'Tarımsal İHA (drone) pazarı 2030\'a kadar 18 milyar $\'a ulaşacak.'
    ],
    keyTopics: ['Hassas Tarım', 'NDVI/Multispektral', 'Görüntü İşleme', 'IoT Sensör', 'Hayvan Refahı'],
    problems: [
      {
        id: 'agri-01',
        title: 'Hassas Sulama Zekası',
        task: 'Toprak nemi ve buharlaşma verilerini kullanarak su tüketimini minimize eden bir otonom sulama planlayıcı geliştirin.',
        input: ['Toprak nem sensör verileri', 'Hava durumu tahminleri', 'Bitki su ihtiyacı veri tabanı'],
        output: ['Haftalık sulama takvimi', 'Su tasarruf analizörü'],
        evaluation: ['Su tasarruf oranı %25+', 'Bitki stres endeksi'],
        datasetUrl: 'https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset'
      },
      {
        id: 'agri-02',
        title: 'Bitki Hastalık Tespiti',
        task: 'Drone veya mobil kamera görüntülerinden bitki yapraklarındaki hastalıkları ve zararlıları gerçek zamanlı tespit edin.',
        input: ['Bitki hastalıkları görsel seti', 'Sağlıklı/Hasta etiketleri'],
        output: ['Mobil teşhis modeli', 'İlaçlama bölge haritası'],
        evaluation: ['Classification Accuracy', 'Tespit hızı'],
        datasetUrl: 'https://www.kaggle.com/datasets/emmareid/plantvillage-dataset'
      },
      {
        id: 'agri-03',
        title: 'Hasat Zamanı Tahminleme',
        task: 'Uydu görüntüleri ve iklim verilerini analiz ederek meyve/sebze hasadı için en doğru günü tahmin edin.',
        input: ['NDVI indeks verileri', 'Sıcaklık birikim verileri (GDD)'],
        output: ['Hasat projeksiyon paneli', 'Ürün kalite tahmini'],
        evaluation: ['Tahmin sapma günü < 3 gün', 'Lojistik uyum verimi'],
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/agriculture-dataset'
      },
      {
        id: 'agri-04',
        title: 'Toprak Verimliliği ve Gübre Önerisi',
        task: 'Toprağın NPK (Azot, Fosfor, Potasyum) değerlerine, sıcaklığa ve nem durumuna göre en uygun gübre tipini ve miktarını öneren bir model geliştirin.',
        input: ['Toprak NPK ve nem verileri', 'Gübre tip etiketli veri seti', 'Bitki türü ve mevsim bilgisi'],
        output: ['Sınıflandırma + miktar regresyonu modeli', 'Sahada karar destek arayüzü'],
        evaluation: ['Sınıflandırma accuracy', 'Maliyet/verim trade-off analizi'],
        datasetUrl: 'https://www.kaggle.com/datasets/gdabhishek/fertilizer-prediction'
      },
      {
        id: 'agri-05',
        title: 'Hayvancılık Sağlık İzleme',
        task: 'Akıllı kulak küpü sensörlerinden gelen sıcaklık ve hareket verileriyle hayvanlardaki hastalıkları erkenden tespit edin.',
        input: ['İvmeölçer ve GPS verileri', 'Sıcaklık logları', 'Klinik vaka geçmişi'],
        output: ['Erken uyarı sağlık paneli', 'Davranış analiz modeli'],
        evaluation: ['Anomali tespit doğruluğu', 'Uyarı hızı'],
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
    tagline: 'Yok olmadan görmek; AI ile doğanın ilk savunma hattı ol.',
    theme: 'Son 50 yılda yaban hayatı popülasyonları %69 azaldı. Korumak için önce görmek, saymak ve takip etmek gerek; ama habitatlar geniş, gözcüler az, bütçeler kısıtlı. Bu kategori; ses kayıtlarından kuş türü tanımayı, uydu görüntülerinden orman kaybı izlemeyi, sualtı kameralarından mercan sağlığı analizini ve hayvan göç koridorları modellemeyi kapsar. Bilgisayarlı görü ve akustik makine öğrenmesi, yaban hayatı koruması için en güçlü araçlar haline geldi.',
    whyMatters: [
      'WWF: 1970\'ten bu yana memeli, kuş ve balık popülasyonları ortalama %69 düştü.',
      'Doğal ekosistemler her yıl 125 trilyon $\'lık ekonomik değer sağlıyor (BM IPBES).',
      'AB Doğa Restorasyonu Yasası 2024\'te yürürlüğe girdi; izleme zorunlu hâle geldi.'
    ],
    keyTopics: ['Bioacoustics', 'Uydu Görüntü Analizi', 'Underwater Vision', 'Tür Tanıma', 'Habitat Modelleme'],
    problems: [
      {
        id: 'eco-01',
        title: 'Akustik Tür Tanıma',
        task: 'Ormanlık alanlardan alınan ses kayıtlarından kuş ve memeli türlerini tespit eden bir analiz modeli geliştirin.',
        input: ['Ses kayıt veri seti (.wav)', 'Tür spektrogram etiketleri'],
        output: ['Audio Classifier', 'Tür yoğunluk haritası'],
        evaluation: ['Top-3 Accuracy > %80', 'Gürültü toleransı'],
        datasetUrl: 'https://www.kaggle.com/c/birdclef-2023'
      },
      {
        id: 'eco-02',
        title: 'Orman Kaybı İzleme',
        task: 'Uydu görüntülerindeki değişimlerden kaçak kesim veya orman yangını riskli bölgeleri gerçek zamanlı saptayın.',
        input: ['Çok zamanlı uydu görüntüleri', 'Arazi kullanım verileri'],
        output: ['Değişim tespit algoritması', 'Riskli bölge uyarı sistemi'],
        evaluation: ['Tespit doğruluğu (IOU)', 'Erken uyarı hızı'],
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Covertype'
      },
      {
        id: 'eco-03',
        title: 'İstilacı Tür Görüntü Tespiti',
        task: 'Drone veya doğa fotoğraflarında istilacı bitki türlerini (örn. Hydrangea, Kudzu) tespit eden bir görüntü işleme modeli geliştirin; konum verisi varsa risk yoğunluk haritası üretin.',
        input: ['İstilacı tür fotoğraf veri seti', 'GPS koordinat metadatası', 'Habitat referans haritaları'],
        output: ['Sınıflandırma modeli', 'Riskli bölge yoğunluk haritası'],
        evaluation: ['ROC-AUC > 0.85', 'False positive minimizasyonu'],
        datasetUrl: 'https://www.kaggle.com/c/invasive-species-monitoring/data'
      },
      {
        id: 'eco-04',
        title: 'Mercan Kayalıkları Sağlık Analizi',
        task: 'Sualtı görüntülerinden mercan ağarmasını ve deniz ekosistemindeki değişimleri takip edin.',
        input: ['Sualtı kamera görüntüleri', 'Su sıcaklığı logları', 'Biyoçeşitlilik indeksleri'],
        output: ['Coral bleaching tespit modeli', 'Deniz ekosistemi sağlık indeksi'],
        evaluation: ['Sınıflandırma doğruluğu %85+', 'Anomali yakalama hızı'],
        datasetUrl: 'https://www.kaggle.com/datasets/vencerlanz09/coral-reef-image-classification'
      },
      {
        id: 'eco-05',
        title: 'Camera Trap ile Yaban Hayatı Sayımı',
        task: 'Doğa rezervlerine yerleştirilen kamera tuzaklarından gelen görüntülerdeki hayvan türlerini tanıyıp sayan bir sistem geliştirin. Tür çeşitliliği ve nüfus eğilimi raporu üretin.',
        input: ['Kamera tuzağı görselleri (gündüz/gece)', 'Etiketli tür veri seti', 'Zaman damgaları'],
        output: ['Çoklu sınıf detector modeli', 'Tür yoğunluk dashboard\'u'],
        evaluation: ['mAP@.50 > 0.75', 'Az örneklemli türlerde recall'],
        datasetUrl: 'https://lila.science/datasets/snapshot-serengeti'
      }
    ]
  },
  {
    id: 'disaster',
    title: 'Afet Yönetimi ve Dayanıklılık',
    icon: '🚨',
    color: COLORS.red,
    description: 'Afet öncesi erken uyarı, afet anı koordinasyon ve sonrası hasar tespit sistemleri.',
    tagline: 'Sarsıntı bittiğinde altın saat başlar — saniyeler hayat kurtarır.',
    theme: 'Türkiye, fay hatlarının üzerinde ve iklim değişikliği ile yangın-sel-kuraklık döngüsü içinde. 6 Şubat 2023 depremi; lojistik koordinasyon ve hasar tespitinin hızının kritik olduğunu acı şekilde gösterdi. Bu kategori; afet öncesi erken uyarı, afet anında kaynak yönlendirme ve sonrası hızlı hasar tespitini AI ile çözen ekipleri arıyor. Bilgisayarlı görü (drone/uydu), NLP (sosyal medya doğrulama) ve optimizasyon (lojistik) bu kategoride birbirine kesişiyor.',
    whyMatters: [
      'Bir afetten sonra ilk 72 saat kurtarma için kritik; veri gecikmesi = kayıp can.',
      'Türkiye 1939-2023 arası 76 büyük deprem yaşadı; ortalama 5 yılda bir Mw 6+.',
      '2023 orman yangınları sezonu rekor kırdı; AI tabanlı erken tespit fark yaratıyor.'
    ],
    keyTopics: ['Damage Assessment', 'NLP/Doğrulama', 'Drone & Uydu CV', 'Lojistik Optimizasyonu', 'Erken Uyarı'],
    problems: [
      {
        id: 'disaster-01',
        title: 'Hızlı Hasar Tespit AI',
        task: 'Deprem veya sel sonrası çekilen hava fotoğraflarından bina hasar durumlarını (Yıkık/Ağır/Hafif) sınıflandırın.',
        input: ['Afet sonrası hava görüntüleri', 'Bina envanter verisi'],
        output: ['Hasar haritalama modeli', 'Acil müdahale öncelik listesi'],
        evaluation: ['Sınıflandırma F1-Skoru', 'Harita oluşturma süresi'],
        datasetUrl: 'https://www.xview2.org/dataset'
      },
      {
        id: 'disaster-02',
        title: 'Acil Lojistik Rota Optimizasyonu (VRP)',
        task: 'Afet anında ihtiyaç noktaları ile depo arasındaki yardım tırları için dinamik rota planlayan bir VRP (Vehicle Routing Problem) çözücü geliştirin. Talep önceliklerine ve kapalı yollara göre yeniden planlama yapabilmeli.',
        input: ['Düğüm bazlı talep listesi (CVRP formatı)', 'OpenStreetMap yol grafı', 'Araç kapasite ve depo lokasyonları'],
        output: ['Rota optimizasyon motoru (OR-Tools / metaheuristik)', 'Gerçek zamanlı yeniden planlama API\'si', 'Kaynak dağıtım dashboard\'u'],
        evaluation: ['Toplam mesafe minimizasyonu (vs. baseline)', 'Yeniden planlama süresi < 5 sn', 'Talep karşılama oranı'],
        datasetUrl: 'http://vrp.atd-lab.inf.puc-rio.br/index.php/en/'
      },
      {
        id: 'disaster-03',
        title: 'Erken Uyarı Mesaj Analizi',
        task: 'Sosyal medya verilerinden afet anındaki panik ve gerçek bilgi akışını analiz ederek kriz merkezine özet rapor sunun.',
        input: ['Real-time sosyal medya akışı', 'Doğrulanmış resmi kaynaklar'],
        output: ['NLP özetleme ve doğrulama motoru', 'Kriz ısı haritası'],
        evaluation: ['Bilgi doğruluk oranı', 'Özetleme kalitesi'],
        datasetUrl: 'https://www.kaggle.com/datasets/vstepanivskyi/disaster-tweets'
      },
      {
        id: 'disaster-04',
        title: 'Sel Riski ve Taşkın Tahmini',
        task: 'Havza verileri ve yağış tahminleri ile sel riskli bölgeleri haritalayın.',
        input: ['Topografik veriler (DEM)', 'Tarihsel yağış ve debi verileri', 'Arazi kullanım haritaları'],
        output: ['Dinamik sel risk haritası', 'Tahliye öncelik algoritması'],
        evaluation: ['Tahmin doğruluğu %80+', 'Erken uyarı süresi'],
        datasetUrl: 'https://www.kaggle.com/datasets/fedesoriano/flood-prediction-dataset'
      },
      {
        id: 'disaster-05',
        title: 'Yangın Yayılım Simülasyonu',
        task: 'Rüzgar yönü ve bitki örtüsü yoğunluğuna göre orman yangınlarının yayılım yolunu tahmin edin.',
        input: ['Hava durumu (rüzgar, nem) verileri', 'Bitki örtüsü yanıcılık indeksi', 'Uydu bazlı sıcak nokta verisi'],
        output: ['Yangın yayılım simülatörü', 'Müdahale strateji planı'],
        evaluation: ['Yayılım tahmin isabeti', 'Karar destek hızı'],
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
    tagline: 'Tek bir müfredat herkese yetmiyor; AI öğrenciye göre büyüsün.',
    theme: 'PISA sıralamasında Türkiye OECD ortalamasının altında; aynı sınıfta 30 öğrenci, 30 farklı öğrenme hızı var ama tek bir öğretmen. Bu kategori; öğrencinin nereyi anlamadığını verisinden çıkarıp kişiselleştirilmiş yol çizen, açık uçlu yanıtları otomatik puanlayan, işaret diline anlık çeviri yapan ve dropout (okul terki) riski olan öğrencileri saptayan AI sistemleri istiyor. NLP ve adaptif öğrenme algoritmaları bu kategorinin en aktif alanları.',
    whyMatters: [
      'PISA 2022: Türk öğrencilerin %39\'u temel matematik yetkinliğinin altında.',
      'EdTech pazarı 2030\'a kadar 600 milyar $\'a ulaşacak.',
      'Türkiye\'deki yaklaşık 2.5 milyon işitme engelli vatandaş için erişilebilir eğitim hâlâ sınırlı.'
    ],
    keyTopics: ['Adaptif Öğrenme', 'NLP', 'Speech-to-Text', 'Erişilebilirlik', 'Predictive Analytics'],
    problems: [
      {
        id: 'edu-01',
        title: 'Kişiselleştirilmiş Öğrenme Yolu',
        task: 'Öğrencinin performans verilerinden eksik olduğu konuları saptayan ve özel müfredat öneren bir sistem tasarlayın.',
        input: ['Sınav/Ödev performans verileri', 'Konu haritası (Ontoloji)', 'Öğrenme materyalleri veri tabanı'],
        output: ['Adaptif öğrenme algoritması', 'İlerleme takip paneli'],
        evaluation: ['Başarı artış oranı', 'Öğrenci motivasyon endeksi'],
        datasetUrl: 'https://archive.ics.uci.edu/ml/datasets/Student+Performance'
      },
      {
        id: 'edu-02',
        title: 'Erişilebilir Eğitim Asistanı',
        task: 'Online ders videolarını anlık olarak işaret diline veya sesli betimlemeye dönüştüren yapay zeka sistemi geliştirin.',
        input: ['Video/Audio ders içerikleri', 'Türk İşaret Dili veri seti'],
        output: ['Anlık çeviri motoru', 'Erişilebilir video player'],
        evaluation: ['Çeviri doğruluk oranı (WER)', 'Gecikme süresi (Latency)'],
        datasetUrl: 'https://www.kaggle.com/datasets/riiid/ednet'
      },
      {
        id: 'edu-03',
        title: 'İş İlanlarından Gelecek Yetkinlik Analizörü',
        task: 'İş ilanı metinlerinden NLP ile yetkinlik / teknoloji isimlerini çıkartan, sektör ve zaman bazlı trendleri raporlayan bir kariyer rehberlik motoru geliştirin.',
        input: ['LinkedIn iş ilanı metinleri', 'Teknoloji & yetkinlik ontolojisi (örn. ESCO)', 'Tarih damgaları'],
        output: ['NER tabanlı yetkinlik çıkarıcı', 'Trend dashboard\'u (sektör × yetkinlik × zaman)', 'Öğrenciye yol haritası önerisi'],
        evaluation: ['NER F1-Skoru', 'Trend doğrulama (ground truth)', 'Kullanıcı testi alaka düzeyi'],
        datasetUrl: 'https://www.kaggle.com/datasets/arshkon/linkedin-job-postings'
      },
      {
        id: 'edu-04',
        title: 'Otomatik Ödev Değerlendirme ve Feedback',
        task: 'Öğrencilerin açık uçlu yanıtlarını NLP ile analiz ederek yapıcı geri bildirimler oluşturun.',
        input: ['Öğrenci yanıt metinleri', 'Notlandırma anahtarı (Rubric)', 'Örnek puanlanmış ödevler'],
        output: ['Puanlama motoru', 'Geri bildirim üretici (Feedback Generator)'],
        evaluation: ['İnsan notu ile korelasyon', 'Geri bildirim kalitesi'],
        datasetUrl: 'https://www.kaggle.com/c/asap-aes'
      },
      {
        id: 'edu-05',
        title: 'Eğitimde Dropout Riski Tahmini',
        task: 'LMS (Öğrenme Yönetim Sistemi) etkileşim verileriyle okulu bırakma riski olan öğrencileri saptayın.',
        input: ['Sisteme giriş logları', 'İçerik tüketim süreleri', 'Demografik veriler'],
        output: ['Risk analiz dashboardu', 'Önleyici müdahale önerileri'],
        evaluation: ['Recall skoru %85+', 'Yanlış pozitif oranı'],
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
    tagline: 'Doktor sıraya girmeden önce; AI cebindeki ilk uzman görüşü olsun.',
    theme: 'Türkiye\'de uzman doktora ulaşma süresi ortalama 3-6 hafta; kırsal alanlarda ise temel sağlık hizmeti bile sınırlı. Yapay zeka, doktorun yerini almıyor; onu çoğaltıyor. Bu kategori; cilt fotoğrafından hastalık riskini tahmin etmekten giyilebilir cihazlarla kronik hasta takibine, NLP tabanlı mental sağlık asistanlarından yaşlılarda düşme tespitine kadar erişilebilir, önleyici ve kişiselleştirilmiş sağlık AI çözümleri hedefler. Etik, mahremiyet ve klinik doğrulama burada özellikle kritik.',
    whyMatters: [
      'WHO: Dünya nüfusunun yaklaşık yarısı temel sağlık hizmetlerine erişemiyor.',
      'Türkiye\'de 65+ yaş nüfusu 2050\'de %22\'ye ulaşacak; kronik hasta takibi kritik hâle geliyor.',
      'Dünya Sağlık Örgütü\'ne göre depresyon küresel hastalık yükünün ilk üç sırasında.'
    ],
    keyTopics: ['Medical Imaging', 'NLP', 'Wearable Analytics', 'Erken Tanı', 'Etik AI'],
    problems: [
      {
        id: 'health-01',
        title: 'Mental Sağlık Destek Ajanı',
        task: 'Kullanıcının yazdığı metinlerden duygusal durumunu ve stres seviyesini analiz ederek önleyici öneriler sunan bir chatbot geliştirin.',
        input: ['Duygu durumu etiketli metin seti', 'Psikolojik destek protokolleri'],
        output: ['NLP duygu analizörü', 'E-terapi asistanı'],
        evaluation: ['Empati skoru', 'Duygu tanıma isabeti'],
        datasetUrl: 'https://www.kaggle.com/datasets/praveengovi/emotions-dataset-for-nlp'
      },
      {
        id: 'health-02',
        title: 'Mobil Erken Tanı Aracı',
        task: 'Akıllı telefon kamerasıyla alınan cilt/göz görüntülerinden yaygın hastalıkların risk seviyesini tahmin eden model geliştirin.',
        input: ['Medikal görüntü veri seti', 'Uzman tanısı etiketleri'],
        output: ['Görüntü tabanlı teşhis modeli', 'Doktor sevk algoritması'],
        evaluation: ['Precision/Recall oranları', 'Görüntü kalitesi toleransı'],
        datasetUrl: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia'
      },
      {
        id: 'health-03',
        title: 'Kronik Hasta Takip Zekası',
        task: 'Giyilebilir teknoloji verilerinden (nabız, uyku, adım) kronik hastaların bir sonraki kriz anını (örn. şeker düşmesi) tahmin edin.',
        input: ['Zaman serisi sensör verileri', 'Klinik parametreler'],
        output: ['Kriz tahmin modeli', 'Acil durum uyarı sistemi'],
        evaluation: ['Tahmin penceresi doğruluğu', 'Yanlış alarm minimizasyonu'],
        datasetUrl: 'https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database'
      },
      {
        id: 'health-04',
        title: 'İlaç Etkileşim ve Yan Etki Analizi',
        task: 'İlaç prospektüsleri ve hasta raporlarından olası ilaç etkileşimlerini NLP ile analiz edin.',
        input: ['İlaç prospektüs metinleri', 'Hasta semptom raporları', 'İlaç kimyasal kütüphanesi'],
        output: ['Risk analiz motoru', 'Etkileşim uyarı sistemi'],
        evaluation: ['Tespit doğruluğu', 'Klinik veri uyumu'],
        datasetUrl: 'https://www.kaggle.com/datasets/shivanandmn/drug-side-effects-and-medical-condition-dataset'
      },
      {
        id: 'health-05',
        title: 'Yaşlılar için Düşme Tespiti',
        task: 'Giyilebilir ivmeölçer verileriyle yaşlıların düşme anını tespit eden ve acil durum sinyali gönderen sistem geliştirin.',
        input: ['İvmeölçer ve jiroskop verileri', 'Normal yaşam aktivite logları', 'Düşme vakası kayıtları'],
        output: ['Düşme tespit algoritması', 'Acil çağrı tetikleyici'],
        evaluation: ['Hassasiyet (Sensitivity) %95+', 'Gecikme < 1 sn'],
        datasetUrl: 'https://www.kaggle.com/datasets/paultimothymooney/fall-detection-data-from-china'
      }
    ]
  }
];

// =====================================================
//   VERİ İŞLEME BEKLENTİLERİ
//   Yarışmacılar veri seti kullandığında jürinin Teknik
//   Uygulama Kalitesi (%40) altında aradığı işleme
//   aşamaları. Her proje için zorunlu değildir;
//   sadece dataset kullanıldığında değerlendirilir.
// =====================================================

export const dataProcessingChecklist = {
  intro: 'Her proje veri seti kullanmak zorunda değildir. Çözümün doğasına göre tamamen kural tabanlı, simülasyon, prompt engineering veya RAG ile yarışılabilir. Ancak veri seti kullanıyorsanız, jürinin Teknik Uygulama Kalitesi altında aradığı 7 aşama aşağıdadır.',
  stages: [
    {
      step: '01',
      title: 'Veri Keşfi (EDA)',
      desc: 'Sütun tipleri, dağılımlar, eksik değer oranları, aykırı değerler ve sınıf dengesi raporlanmalı. EDA notebook\'u veya kısa rapor ile sunulmalı.'
    },
    {
      step: '02',
      title: 'Temizlik & Eksik Veri',
      desc: 'Eksik değer stratejisi (imputation, drop, domain değer) gerekçeli olmalı; aykırı değerlerin yönetimi belgelenmeli.'
    },
    {
      step: '03',
      title: 'Feature Engineering',
      desc: 'Yeni özellikler türetildiyse açıklanmalı: lag/window, encoding seçimi, ölçekleme tercihi gerekçesiyle birlikte.'
    },
    {
      step: '04',
      title: 'Train / Validation / Test Ayrımı',
      desc: 'Sızıntı (leakage) olmayan, problemi temsil eden bölme. Zaman serisinde geçmiş→gelecek; dengesiz sınıflarda stratified.'
    },
    {
      step: '05',
      title: 'Veri Sızıntısı Kontrolü',
      desc: 'Gerçek dünyada elde edilemeyecek sütunlar kullanılmamalı. CV ile test arası anlamlı fark sızıntı sinyalidir.'
    },
    {
      step: '06',
      title: 'Sınıf Dengesizliği & Önyargı',
      desc: 'Class weight, oversampling veya focal loss gerekçeli kullanılmalı. Demografik / coğrafi önyargı kontrol edilmeli.'
    },
    {
      step: '07',
      title: 'Reprodüktibilite',
      desc: 'Pipeline veya notebook olarak yeniden üretilebilir olmalı: random seed, paket sürümleri ve veri sürümü kayıt altında.'
    }
  ]
};
