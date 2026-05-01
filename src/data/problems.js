import { COLORS } from '@/lib/constants';

export const categories = [
  {
    id: 'carbon',
    title: 'Karbon ve Emisyon Takibi',
    color: COLORS.green,
    icon: '🌱',
    githubUrl: 'https://github.com/HackFest26/datasets-carbon',
    subTopics: ['Karbon ayak izi hesaplama', 'Kurumsal emisyon analitiği', 'Şehir bazlı karbon haritalama'],
    problem: {
      title: 'Karbon Emisyonlarının Gerçek Zamanlı İzlenememesi',
      current: 'Karbon verileri parçalı, gecikmeli ve çoğunlukla manuel raporlamaya dayalıdır; bu durum analiz doğruluğunu engeller.',
      future: 'AI destekli sistemlerle emisyonların anlık izlendiği, kaynak bazlı tahminleme yapılabildiği dinamik modeller.',
      importance: 'İklim politikalarının veriye dayalı, şeffaf ve yüksek etkili bir şekilde uygulanmasını sağlar.'
    }
  },
  {
    id: 'waste',
    title: 'Akıllı Atık ve Geri Dönüşüm Sistemleri',
    color: '#06B6D4',
    icon: '🗑️',
    githubUrl: 'https://github.com/HackFest26/datasets-waste',
    subTopics: ['Atık toplama optimizasyonu', 'Geri dönüşüm sınıflandırma AI’ları', 'Döngüsel ekonomi takibi'],
    problem: {
      title: 'Atık Yönetiminde Verimlilik Eksikliği',
      current: 'Statik rotalar, doluluk verisi eksikliği ve manuel ayrıştırma süreçleri nedeniyle atık yönetimi maliyetli ve verimsizdir.',
      future: 'Görüntü işleme ve rota optimizasyonu ile dinamik, veri odaklı ve tam otomatik atık yönetim ekosistemleri.',
      importance: 'Kaynak israfını önler, lojistik maliyetlerini düşürür ve kentsel sürdürülebilirliği maksimize eder.'
    }
  },
  {
    id: 'mobility',
    title: 'Akıllı Ulaşım ve Mobilite',
    color: COLORS.blue,
    icon: '🚇',
    githubUrl: 'https://github.com/HackFest26/datasets-mobility',
    subTopics: ['Toplu taşıma yoğunluk analizi', 'Trafik tahmin sistemleri', 'Multimodal rota optimizasyonu'],
    problem: {
      title: 'Ulaşım Verilerinin Anlık İzlenememesi',
      current: 'Toplu taşıma kullanım verileri ve trafik akışları gerçek zamanlı analiz edilememekte, bu da yoğunluk krizlerine yol açmaktadır.',
      future: 'Yapay zeka ile optimize edilmiş trafik sinyalizasyonu ve yolcu yoğunluğuna göre şekillenen dinamik sefer planları.',
      importance: 'Zaman ve yakıt tasarrufu sağlarken şehir içi mobilite stresini ve karbon salınımını azaltır.'
    }
  },
  {
    id: 'efficiency',
    title: 'Enerji Tüketimi ve Verimlilik',
    color: COLORS.yellow,
    icon: '⚡',
    githubUrl: 'https://github.com/HackFest26/datasets-efficiency',
    subTopics: ['Bina enerji analitiği', 'Endüstriyel enerji izleme', 'Kestirimci bakım modelleri'],
    problem: {
      title: 'Enerji Tüketiminin Optimize Edilememesi',
      current: 'Ev ve sanayi ölçeğinde enerji kullanımı anlık izlenemediği için pasif enerji israfı kontrol altına alınamamaktadır.',
      future: 'Akıllı AI ajanları ile tüketim modellerini analiz eden ve anlık tasarruf hamleleri yapan otonom sistemler.',
      importance: 'Enerji maliyetlerini düşürür, şebeke yükünü azaltır ve sürdürülebilir tüketim alışkanlığı kazandırır.'
    }
  },
  {
    id: 'renewable',
    title: 'Yenilenebilir Enerji ve Şebeke Yönetimi',
    color: '#8B5CF6',
    icon: '🔋',
    githubUrl: 'https://github.com/HackFest26/datasets-renewable',
    subTopics: ['Enerji üretim tahmini', 'Talep-tedarik dengesi', 'Batarya yönetim zekası'],
    problem: {
      title: 'Yenilenebilir Enerji Tahminlerinde Belirsizlik',
      current: 'Güneş ve rüzgar enerjisi üretim tahminleri düşük doğruluk oranına sahiptir, bu da şebeke kararlılığını risk altına sokar.',
      future: 'Meteorolojik veri entegrasyonu ile yüksek doğruluklu üretim tahmin modelleri ve dinamik yük dengeleme.',
      importance: 'Yenilenebilir enerji sürekliliğini artırarak fosil yakıt bağımlılığını ve şebeke kesintilerini azaltır.'
    }
  },
  {
    id: 'ev',
    title: 'Elektrikli Araç ve Şarj Altyapısı',
    color: '#0EA5E9',
    icon: '🚗',
    githubUrl: 'https://github.com/HackFest26/datasets-ev',
    subTopics: ['Şarj istasyonu konumlandırma', 'Şebeke yük tahmini', 'Menzil optimizasyonu'],
    problem: {
      title: 'Şarj Altyapısı Planlamasında Veri Eksikliği',
      current: 'Şarj istasyonları kullanıcı talebinden bağımsız, plansız ve şebeke kapasitesini zorlayacak şekilde dağıtılmıştır.',
      future: 'Kullanıcı davranışlarını ve şebeke kapasitesini analiz eden optimal konumlandırma ve akıllı şarj planlama.',
      importance: 'Elektrikli araç dönüşümünü teknik ve lojistik açıdan hızlandırarak yeşil ulaşımı destekler.'
    }
  },
  {
    id: 'agri',
    title: 'Tarım, Su ve Kırsal Sürdürülebilirlik',
    color: '#10B981',
    icon: '🌾',
    githubUrl: 'https://github.com/HackFest26/datasets-agri',
    subTopics: ['Akıllı sulama sistemleri', 'Tarımsal verim tahmini', 'Toprak sağlığı analizi'],
    problem: {
      title: 'Su ve Enerji Kullanımının Optimize Edilememesi',
      current: 'Tarımda su kaynakları ve enerji kullanımı geleneksel yöntemlerle yapıldığı için büyük oranda kaynak israfı yaşanmaktadır.',
      future: 'Hassas tarım teknolojileri ve AI destekli kaynak yönetimi ile %100 takip edilebilir ve verimli üretim.',
      importance: 'Gıda güvenliğini garantiler, su krizini önler ve kırsal kalkınmayı teknolojiyle destekler.'
    }
  },
  {
    id: 'eco',
    title: 'Biyoçeşitlilik ve Ekosistem Takibi',
    color: '#22C55E',
    icon: '🌿',
    githubUrl: 'https://github.com/HackFest26/datasets-eco',
    subTopics: ['Tür izleme ve sayım AI', 'Habitat değişim analizi', 'İstilacı tür tespiti'],
    problem: {
      title: 'Doğal Habitat Değişimlerinin Takip Edilememesi',
      current: 'Şehirleşme ve iklim değişikliğinin türler üzerindeki etkileri veri yetersizliği nedeniyle izlenememektedir.',
      future: 'Görsel ve akustik sensör verileriyle biyoçeşitlilik kaybını anlık tespit eden ve koruma öneren yapay zeka.',
      importance: 'Ekolojik dengenin korunmasını sağlar ve biyolojik çöküş riskine karşı erken aksiyon imkanı sunur.'
    }
  },
  {
    id: 'air',
    title: 'Çevresel Veri ve Hava Kalitesi İzleme',
    color: '#64748B',
    icon: '🌍',
    githubUrl: 'https://github.com/HackFest26/datasets-air',
    subTopics: ['Hava kirliliği analizi', 'Sensör veri platformları', 'Kestirimci kirlilik haritaları'],
    problem: {
      title: 'Çevresel Verilerin Gerçek Zamanlı İzlenememesi',
      current: 'Hava kalitesi ölçümleri sınırlı istasyon verilerine dayalıdır ve mikro-ölçekli kirlilik hareketleri izlenemez.',
      future: 'Düşük maliyetli sensör ağlarını yapay zeka ile birleştiren anlık ve yüksek çözünürlüklü hava kalitesi haritaları.',
      importance: 'Halk sağlığını korumak için erken uyarı sağlar ve kentsel planlamaya teknik veri sunar.'
    }
  },
  {
    id: 'social',
    title: 'Toplumsal Farkındalık ve Davranış Analitiği',
    color: '#F59E0B',
    icon: '🧠',
    githubUrl: 'https://github.com/HackFest26/datasets-social',
    subTopics: ['Gençlik farkındalık analizi', 'Tüketim davranışları', 'Eko-anksiyete ölçümleme'],
    problem: {
      title: 'Sürdürülebilir Davranışların Ölçülememesi',
      current: 'Bireysel ve toplumsal sürdürülebilirlik alışkanlıklarına dair veri eksikliği, dönüşüm stratejilerini etkisiz kılmaktadır.',
      future: 'Yapay zeka ile davranış modellerinin analiz edildiği ve toplumsal farkındalığı artıracak kişiselleştirilmiş geri bildirim sistemleri.',
      importance: 'Toplumsal dönüşümü veriyle hızlandırır ve gelecek nesillerin iklim bilincini sayısal olarak takip eder.'
    }
  }
];
