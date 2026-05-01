import { COLORS } from '@/lib/constants';

export const categories = [
  {
    id: 'environment',
    title: 'Çevre ve İklim Krizi',
    color: COLORS.green,
    icon: '🌍',
    githubUrl: 'https://github.com/HackFest26/datasets-environment',
    problems: [
      {
        title: 'Karbon Ayak İzi ve Emisyon Takibi',
        current: 'Şehirlerde ve sanayi tesislerinde karbon ayak izinin gerçek zamanlı takibi, veri eksikliği ve analiz zorlukları nedeniyle yapılamamaktadır.',
        future: 'Kurumlar ve bireyler için erişilebilir, dinamik ve anlık veri sunan karbon analiz platformları.',
        importance: 'Veriye dayalı kararlarla emisyonların doğrudan düşürülmesini sağlar.'
      },
      {
        title: 'Akıllı Enerji Şebekeleri ve Yenilenebilir Tahmin',
        current: 'Yenilenebilir enerji üretim verilerindeki belirsizlik, şebekelerde talep-tedarik dengesinin yönetimini zorlaştırmaktadır.',
        future: 'Yapay zeka ile optimize edilmiş, üretim tahminleme kabiliyeti yüksek akıllı şebeke yönetim sistemleri.',
        importance: 'Enerji verimliliğini artırır ve fosil yakıt bağımlılığını minimize eder.'
      },
      {
        title: 'Atık Yönetimi ve Döngüsel Ekonomi',
        current: 'Atık toplama süreçlerinde verimlilik eksikliği ve geri dönüşüm verilerinin takip edilememesi ciddi bir kaynak israfına yol açmaktadır.',
        future: 'Yapay zeka tabanlı görüntü işleme ve rota optimizasyonu ile %100 takip edilebilir atık süreçleri.',
        importance: 'Şehir temizliğini optimize ederken hammadde geri kazanımını maksimize eder.'
      }
    ]
  },
  {
    id: 'accessibility',
    title: 'Erişilebilirlik ve Kapsayıcılık',
    color: COLORS.blue,
    icon: '♿',
    githubUrl: 'https://github.com/HackFest26/datasets-accessibility',
    problems: [
      {
        title: 'Engelsiz Şehir Navigasyonu',
        current: 'Fiziksel engelli bireyler için şehir içi ulaşımda karşılaşılan engellerin (basamak, bozuk yol vb.) verisi güncel ve erişilebilir değildir.',
        future: 'Engelleri gerçek zamanlı tespit eden ve alternatif rota öneren AI asistanları.',
        importance: 'Dezavantajlı bireylerin toplumsal hayata tam katılımını sağlar.'
      },
      {
        title: 'Dijital Kapsayıcılık Araçları',
        current: 'Görme veya işitme engelli bireylerin dijital içeriklere erişimindeki teknik bariyerler tam olarak aşılamamıştır.',
        future: 'İçeriği anında kişiselleştirilmiş yardımcı formatlara (ses, işaret dili vb.) dönüştüren yapay zeka sistemleri.',
        importance: 'Bilgiye erişimde fırsat eşitliği yaratır.'
      }
    ]
  },
  {
    id: 'disaster',
    title: 'Afet Yönetimi ve Dayanıklılık',
    color: COLORS.red,
    icon: '🌪️',
    githubUrl: 'https://github.com/HackFest26/datasets-disaster',
    problems: [
      {
        title: 'Erken Tahmin ve Risk Analizi',
        current: 'Doğal afet risklerinin (deprem, sel, yangın) yerel ölçekte erken tahmini için gerekli olan çevresel veri entegrasyonu yetersizdir.',
        future: 'Multimodal veri analizi ile afetleri gerçekleşmeden öngören erken uyarı sistemleri.',
        importance: 'Can kaybını önlemede ve acil müdahale hazırlığında kritik rol oynar.'
      },
      {
        title: 'Lojistik ve Kaynak Optimizasyonu',
        current: 'Afet sonrası karmaşada kaynak dağıtımı ve ihtiyaç analizinin gerçek zamanlı yapılması veri eksikliği nedeniyle yavaştır.',
        future: 'İhtiyaçları saniyeler içinde analiz edip en hızlı dağıtım rotalarını çizen lojistik zekası.',
        importance: 'Kritik yardımın doğru zamanda doğru yere ulaşmasını garantiler.'
      }
    ]
  },
  {
    id: 'health',
    title: 'Sağlık ve Refah Teknolojileri',
    color: COLORS.yellow,
    icon: '🏥',
    githubUrl: 'https://github.com/HackFest26/datasets-health',
    problems: [
      {
        title: 'Kırsal Sağlık Erişimi',
        current: 'Kırsal alanlarda uzman doktora erişim zordur ve hastalıkların erken tanısı için gerekli teknik altyapı eksiktir.',
        future: 'Uzak bölgelerde mobil cihazlarla çalışabilen, ön teşhis kabiliyetine sahip AI tanı araçları.',
        importance: 'Sağlık hizmetlerini coğrafi konumdan bağımsız kılar.'
      },
      {
        title: 'İklim Farkındalığı ve Ruh Sağlığı',
        current: 'Gençlerin iklim değişikliğine dair yaşadığı kaygı (eko-anksiyete) ve bunun ruh sağlığı üzerindeki etkilerine dair yeterli veri bulunmamaktadır.',
        future: 'Gençlerin psikolojik dayanıklılığını ölçen ve destekleyen kişiselleştirilmiş rehberlik araçları.',
        importance: 'Gelecek nesillerin toplumsal refahını ve ruhsal direncini korur.'
      }
    ]
  }
];
