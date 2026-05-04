import { COLORS } from '@/lib/constants';

export const ruleCategories = [
  {
    icon: '👥',
    color: COLORS.blue,
    title: 'Katılım & Takım',
    items: [
      'Türkiye\'deki herhangi bir üniversitede ön lisans, lisans veya lisansüstü programa kayıtlı aktif öğrenciler ile son 12 ay içinde mezun olmuş ve etkinlik tarihinde 18 yaşını tamamlamış kişiler katılabilir.',
      'Başvurular sadece resmi web sitesi üzerindeki form aracılığıyla alınır; etkinlik başlangıcından bir saat öncesine kadar (16 Mayıs 2026, 07:59) açıktır.',
      'Takımlar 1 ile 5 kişi arasında olmalıdır; bir katılımcı yalnızca bir takımda yer alabilir. Bireysel katılımcılar takım projeleriyle eşit şekilde değerlendirilir.',
      'Takım kompozisyonu yalnızca açılış oturumunu takip eden ilk eşleştirme saati içinde değiştirilebilir; proje geliştirme aşaması başladıktan sonra takım veya kişi değişikliği yapılamaz.',
      'İlk gün katılımı zorunludur; etkinliğin ilk gününe katılmayan katılımcılar yarışma sürecine ve takımlara dahil edilemez.',
      'Her katılımcı kendi laptopunu getirmek zorundadır; etkinlik alanında kablosuz internet, yeterli priz ve dinlenme alanı sağlanır.',
      'Takım dışından üçüncü kişilerin etkinlik süresince proje üzerinde kod yazması, tasarım veya içerik üretmesi yasaktır; tespiti halinde diskalifiye nedeni sayılır.',
      'Etkinlik tarafından atanan mentorlar tüm takımlara açıktır; mentorluk fikir alışverişi ile sınırlıdır, kod yazımına doğrudan müdahale edilmez.'
    ]
  },
  {
    icon: '⚙️',
    color: COLORS.green,
    title: 'Teknik Kurallar & AI Kullanımı',
    items: [
      'Tüm uygulama kodu etkinlik süresi içinde (16 Mayıs açılışından 17 Mayıs jüri sunum kapanışına kadar) yazılmalıdır.',
      'Hazır şablonlar, açık kaynak kütüphaneler, UI kitler ve frameworkler serbestçe kullanılabilir; ancak kullanılan her bileşen README\'de belirtilmelidir.',
      'Etkinlik öncesinde yazılmış "tam ürünlerin" az miktarda değiştirilerek sergilenmesi yasaktır; çekirdek işlevi önceden uygulayan yazılımlar tam ürün sayılır.',
      'Projenin çekirdek değer önerisi yapay zeka tabanlı olmalıdır (örn. sınıflandırma, üretim, öneri veya analiz AI olmadan anlamını yitirmelidir).',
      'Yalnızca arayüze eklenmiş bir chatbot veya yardımcı öneri kutucuğu tek başına yeterli bir AI bileşeni sayılmaz.',
      'Üretken AI API\'leri (Gemini, OpenAI, Anthropic vb.) ve açık kaynak modeller serbesttir; kod yazımına yardımcı araçların (Cursor vb.) kullanımı beyan zorunluluğu taşımaz.'
    ]
  },
  {
    icon: '📊',
    color: COLORS.yellow,
    title: 'Veri Seti & Üçüncü Parti',
    items: [
      'Sağlanan veri setleri dışında hazır (kamuya açık veya lisanslı) veri setleri kullanılabilir; setin adı ve lisansı README\'de belirtilmelidir.',
      'Takım kendi veri setini oluşturabilir; toplama, anonimleştirme ve etiketleme süreci belgelenmelidir.',
      'İnternet üzerinden izinsiz veri kazıma (scraping) ve site kullanım şartlarını ihlal eden veri kullanımı yasaktır.',
      'Ücretli API masrafları (Google Studio kredisi dışındakiler) takıma aittir; sağlanan krediler başka projelere transfer edilemez.'
    ]
  },
  {
    icon: '⚖️',
    color: '#8B5CF6',
    title: 'Fikri Mülkiyet & Lisans',
    items: [
      'Üretilen tüm fikri mülkiyet hakları takıma aittir; düzenleyici kuruluş takımdan ayrı bir hak talep etmez.',
      'Düzenleyicinin projenin adını, görsellerini ve özetini tanıtım amacıyla kullanma hakkı (gayri münhasır, telifsiz, süresiz lisans) bulunur.',
      'Takım projeyi etkinlik sonrası serbestçe ticarileştirebilir veya patentleyebilir; izin alma zorunluluğu yoktur.',
      'Projeler jüri değerlendirmesi sırasında erişilebilir bir Git repository üzerinden teslim edilmelidir; kod MIT veya Apache-2.0 gibi uyumlu bir lisansla sunulmalıdır.'
    ]
  },
  {
    icon: '🔐',
    color: COLORS.red,
    title: 'KVKK & Gizlilik',
    items: [
      'Bir proje kullanıcı verisi (yüz, ses, sağlık vb.) işliyorsa demo verisi açık rıza ile toplanmış olmalıdır.',
      'Demo Day\'de gerçek kişilerin verisi yerine takım üyelerine ait veya kamuya açık örnek veriler sunulmalıdır.',
      'Özel nitelikli veriler (sağlık, biyometrik vb.) için anonimleştirme ve etkinlik sonu silme zorunludur.',
      'Kişisel veri ihlali oluşturan projeler doğrudan diskalifiye edilir.'
    ]
  },
  {
    icon: '🤝',
    color: '#06B6D4',
    title: 'Etik & Davranış',
    items: [
      'Cinsiyet, ırk, din, yaş veya engellilik üzerinden ayrımcılık, taciz veya mobbing kesinlikle yasaktır; sorumlular diskalifiye edilir.',
      'Sözlü, yazılı veya görsel hiçbir rahatsız edici davranış kabul edilmez; ihlal halinde uyarı veya etkinlikten çıkarma uygulanır.',
      'Jüri üyeleri ile özel iletişim (e-posta, DM vb.) etkinlik süresince yasaktır.',
      'Sponsor temsilcileri ile stant dışı özel lobicilik kabul edilmez; diğer takımların çalışmasına müdahale diskalifiye sebebidir.'
    ]
  },
  {
    icon: '🚫',
    color: COLORS.red,
    title: 'Diskalifiye Kriterleri',
    items: [
      'Doğrudan nedenler: Kopyalama (plagiarism), tam ürünü gizleyerek sunma, sahtekarlık (hard-coded demo) ve davranış kodu ihlali.',
      'Doğrudan nedenler: Kişisel veri ihlali, telif hakkı ihlali, jüriye/organizasyona tehdit veya rüşvet teklifi.',
      'Uyarı + Puan Kesintisi: Demo süresini aşmak, README atıf eksikliği, alan kurallarına uymamak.',
      'Geç Teslim: Her başlayan 5 dakikada %5 puan kesilir; 30 dakikadan fazla gecikme teslim edilmemiş sayılır.'
    ]
  },
  {
    icon: '🎤',
    color: COLORS.blue,
    title: 'Teslim & Demo Day',
    items: [
      'Gerekenler: Public Git linki (kod, README, lisans), çalışan demo (URL/APK), sunum dosyası ve model/veri kaynakları listesi.',
      'Format: 5 dakika pitch (en fazla 3 konuşmacı) + 3 dakika soru-cevap.',
      'Süre yönetimi: 4. dakikada turuncu, 5. dakikada kırmızı uyarı verilir; 5:30\'da mikrofon kapanır.',
      'Yedek akış: Teknik aksaklıklara karşı ekran kaydı veya yerel demo hazır bulundurulmalıdır; ek süre garantisi yoktur.'
    ]
  },
  {
    icon: '🏆',
    color: COLORS.yellow,
    title: 'Jüri & Ödüller',
    items: [
      'Jüri Kararı: Her jüri üyesinin oyu eşittir; jüri ile iş veya akrabalık bağı olan üyeler o takımın puanlamasından çekilir.',
      'Ana Kriterler (Toplam 100 Puan): Problem Tanımı & Toplumsal Etki (15p), Teknik Uygulama Kalitesi / Mühendislik (40p), Çözüm Yeniliği & Yaklaşım (10p), MVP & Tamamlanmışlık (10p), Kullanıcı Deneyimi - UI/UX (10p), Uygulanabilirlik & Ölçek (10p), Pitch & Demo Etkisi (5p).',
      'Bonus Puanlar (Toplam +15): Gerçek Veri Üretimi (+5), Advanced AI Architecture - RAG, fine-tuning, multi-agent veya tool-use mimarisi (+10).',
      'Mühendislik Önceliği: HackFest\'26\'nın ana odağı mühendislik kalitesidir. AI araçları (Gemini, OpenAI, Cursor vb.) serbestçe kullanılabilir; ancak halüsinasyon, gizlilik, deterministiklik ve performans limitlerine bilinçli yaklaşıldığı, kod kalitesi ve sistem mimarisinin sürdürülebilir olduğu jüri tarafından aranır.',
      'Beraberlik: Sırasıyla Teknik Uygulama Kalitesi, Toplumsal Etki, Kullanıcı Deneyimi ve MVP Tamamlanmışlık puanlarına bakılır; eşitlik sürerse jüri "tie-breaker" oylaması yapar.',
      'Ödül Dağıtımı: Donanım ve ayni ödüller etkinlik gününde teslim edilir; uzaktan katılanlara ödül teslimi yapılmaz.'
    ]
  },
  {
    icon: '📩',
    color: '#8B5CF6',
    title: 'İtiraz & Sorumluluk',
    items: [
      'Jüri kararına itiraz, açıklanmasından sonraki 2 saat içinde yazılı (e-posta) olarak yapılmalıdır.',
      'İtirazlar 3 kişilik hakem heyeti tarafından 24 saat içinde sonuçlandırılır; heyet kararı kesindir.',
      'Düzenleyici, mekandaki değerli eşya kayıplarından sorumlu değildir; mücbir sebep halinde etkinlik ertelenebilir.',
      'Ödüllerin eşdeğerini sağlama hakkı saklıdır (örn. tükenen bir model yerine benzeri).'
    ]
  }
];
