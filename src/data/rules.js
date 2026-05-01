import { COLORS } from '@/lib/constants';

export const ruleCategories = [
  {
    icon: '👥',
    color: COLORS.blue,
    title: 'Katılım & Takım',
    items: [
      'Takımlar 1-5 kişiden oluşur. Bireysel katılım da mümkündür.',
      'Türkiye\'deki herhangi bir üniversitede aktif öğrenci olan herkes başvurabilir; 18 yaş altı için yasal vasi onayı gerekir.',
      'Bir kişi yalnızca tek bir takımda yer alabilir. Mükerrer kayıt tüm ilgili takımların diskalifiye edilmesine yol açar.',
      'Etkinlik başlamadan 24 saat öncesine kadar takım kompozisyonu sistem üzerinden değiştirilebilir; sonrasında değişiklik düzenleyici onayına tabidir.',
      'Bireysel katılımcılar için etkinliğin ilk saatinde takım buluşturma oturumu düzenlenir.',
      'Düzenleyici komite, mentor kadrosu ve jüri üyeleri yarışmacı olarak katılamaz.'
    ]
  },
  {
    icon: '⚙️',
    color: COLORS.green,
    title: 'Teknik Kurallar & AI Kullanımı',
    items: [
      'Tüm uygulama kodu etkinlik süresi içinde (16 Mayıs açılış → 17 Mayıs sunum kapanışı) yazılmalıdır.',
      'Hazır şablonlar (boilerplate), UI kit\'ler ve açık kaynak kütüphaneler serbestçe kullanılabilir; her bileşen için README\'de kaynak referansı zorunludur.',
      'Etkinlik öncesi yazılmış tam ürünlerin sergilenmesi yasaktır. Repository ayarları, CI/CD ve tasarım taslakları (wireframe, mockup) önceden hazırlanabilir.',
      'Projenin çekirdek değer önerisi yapay zeka tabanlı olmalıdır; AI olmadan ürün anlamını yitirmelidir. Yalnızca ekrana eklenmiş bir chatbot AI bileşeni olarak yeterli sayılmaz.',
      'Üretken AI API\'leri (Gemini, OpenAI, Anthropic, Mistral, Hugging Face vb.), ön eğitilmiş modeller ve kendi eğittiğiniz modeller kullanılabilir.',
      'Kod yazımına yardımcı AI araçları (Cursor, Copilot, Claude Code vb.) serbesttir; bu kullanım "ürünün AI bileşeni" sayılmaz.',
      'Kullanılan modeller, promptlar ve veri kaynakları README\'de ve sunumda açıkça belirtilmelidir.'
    ]
  },
  {
    icon: '📊',
    color: COLORS.yellow,
    title: 'Veri Seti & Üçüncü Parti',
    items: [
      'Hazır kamuya açık veya lisanslı veri setleri kullanılabilir; setin adı, sürümü ve lisansı README\'de belirtilmelidir.',
      'Takım kendi veri setini oluşturabilir; toplama yöntemi, anonimleştirme ve etiketleme süreci belgelenmelidir.',
      'İnternet üzerinden site kullanım şartlarını ihlal eden veri kazıma (scraping) yasaktır.',
      'Ücretli API\'ler takımın kendi kredisi ile kullanılabilir; etkinlik tarafından sağlanan promosyon kredileri yalnızca yarışma projesi için harcanır.',
      'GPL/AGPL lisanslı bileşenler kullanılabilir; ancak proje bütününü aynı lisans altında dağıtma yükümlülüğü doğabilir. Lisans uyumluluğu takımın sorumluluğundadır.'
    ]
  },
  {
    icon: '⚖️',
    color: '#8B5CF6',
    title: 'Fikri Mülkiyet & Lisans',
    items: [
      'Üretilen tüm fikri mülkiyet hakları takım üyelerine aittir. Düzenleyici kuruluş ayrı bir hak talep etmez.',
      'Düzenleyicinin yalnızca tanıtım, basın, sosyal medya ve örnek gösterim amacıyla projenin adını, görselini ve özetini kullanma hakkı vardır (gayri münhasır, telifsiz lisans).',
      'Takım, projeyi etkinlik sonrasında ticarileştirebilir, patentleyebilir veya start-up\'a dönüştürebilir; izin alma zorunluluğu yoktur.',
      'Sponsor özel hak talepleri yalnızca takımla ayrı sözleşme imzalanması hâlinde geçerlidir; kurallar gereği zorunlu kılınmaz.',
      'Projeler, jüri değerlendirmesi sırasında erişilebilir public bir Git repository üzerinden teslim edilir; etkinlik sonrası özel\'e alınabilir.'
    ]
  },
  {
    icon: '🔐',
    color: COLORS.red,
    title: 'KVKK & Gizlilik',
    items: [
      'Demo Day\'de jüriye gerçek üçüncü kişilerin kişisel verisi sunulamaz; takım üyelerine ait veya kamuya açık örnek veri kullanılmalıdır.',
      'Bir proje kullanıcı verisi (yüz, ses, kimlik, sağlık) işliyorsa demo verisi açık rıza ile toplanmış olmalıdır.',
      'Sağlık, biyometrik ve çocuklara ait özel nitelikli kişisel verilerin işlendiği projelerde anonimleştirme ve etkinlik sonu silme zorunludur (KVKK m.6).',
      'Düzenleyici; ad, e-posta, üniversite ve etkinlik fotoğrafları gibi verileri organizasyon ve sınırlı tanıtım amacıyla işler; silme talepleri gdg@istinye.edu.tr üzerinden yapılır.',
      'KVKK ihlali oluşturan projeler diskalifiye edilir.'
    ]
  },
  {
    icon: '🤝',
    color: '#06B6D4',
    title: 'Etik & Davranış',
    items: [
      'Cinsiyet, cinsel yönelim, 18 yaş, ırk, etnik köken, din, engellilik ve yaş üzerinden ayrımcılık veya taciz yasaktır.',
      'Sözlü, yazılı veya görsel hiçbir rahatsız edici davranış kabul edilmez; ihlal hâlinde uyarı, tekrarında etkinlikten çıkarma uygulanır.',
      'Jüri üyeleri ile özel iletişim (e-posta, DM) etkinlik süresinde yasaktır; sorular ortak ortamlarda sorulmalıdır.',
      'Sponsor temsilcileri ile sponsorluk standı dışında özel lobicilik kabul edilmez.',
      'Diğer takımların çalışmasına müdahale veya donanımına zarar vermek diskalifiye sebebidir.',
      'Şikâyetler etkinlikte info-stand\'a, sonrasında gdg@istinye.edu.tr adresine iletilir; tüm bildirimler gizlilik içinde değerlendirilir.'
    ]
  },
  {
    icon: '🚫',
    color: COLORS.red,
    title: 'Diskalifiye Kriterleri',
    items: [
      'Doğrudan diskalifiye: başka bir projeden izinsiz kod kopyalama (plagiarism), etkinlik öncesi yazılmış tam ürünleri gizleyerek sunma.',
      'Doğrudan diskalifiye: jüriye yanıltıcı demo göstermek (örn. modelin çalıştığı yanılsamasını yaratan hard-coded yanıtlar).',
      'Doğrudan diskalifiye: davranış kodu ihlali (taciz, ayrımcılık), kişisel veri ihlali, telif hakkı ihlali, kötü amaçlı yazılım veya yasa dışı içerik üretimi.',
      'Uyarı + puan kesintisi: demo süresini aşma, README atıf eksikliği, etkinlik alanı kurallarına uymama.',
      'Geç teslim: her başlamış 5 dakikada toplam puanın %5\'i kesilir; 30 dakikadan fazla gecikme teslim edilmemiş sayılır.'
    ]
  },
  {
    icon: '🎤',
    color: COLORS.blue,
    title: 'Teslim & Demo Day',
    items: [
      'Public Git repository linki — kod, README, lisans, kullanılan veri seti referansları.',
      'Çalışan demo — deploy edilmiş web URL, mobil APK veya yerel çalıştırılabilir komut seti (Docker tercih edilir).',
      'Kısa video demo (en fazla 2 dk, 1080p) — projenin temel akışını gösterir; başvuru sistemine yüklenir.',
      'Sunum dosyası (PDF veya Slides) — pitch görselleri, jüriye önceden iletilir.',
      'Demo Day formatı: 5 dk pitch + 3 dk soru-cevap. Sahnede en fazla 3 üye konuşabilir.',
      'Süre dijital sayaçla yönetilir: 4. dakikada turuncu, 5. dakikada kırmızı uyarı; 5:30\'da mikrofon kapanır.',
      'Teknik aksaklıklara karşı yedek akış (ekran kaydı, yerel demo) hazırlanmalıdır; düzenleyici ek süre vermek zorunda değildir.'
    ]
  },
  {
    icon: '🏆',
    color: COLORS.yellow,
    title: 'Jüri & Ödüller',
    items: [
      'Jüri en az 5, en fazla 9 üyeden oluşur; her oy eşit ağırlıktadır, başkanın çift oy veya veto yetkisi yoktur.',
      'Bir jüri üyesi takımla doğrudan iş, akrabalık veya yakın arkadaşlık bağı varsa o takımın puanlamasından çekilir.',
      'Her kriter 1-10 arası puanlanır, kriter ağırlıkları ile çarpılır, jüri ortalaması final puanını verir.',
      'Beraberlik durumunda sırasıyla Toplumsal Etki, Teknik Yetkinlik ve Yenilikçilik puanları karşılaştırılır; eşitlik sürerse jüri kapalı oturumda tie-breaker oylaması yapar.',
      'Ana sıralama (1./2./3.) dışında özel ödül kategorileri: En İyi Sosyal Etki, En İyi Teknik Uygulama, En İyi Tasarım, İzleyici Ödülü, Sponsor Özel Ödülleri.',
      'Bir takım birden fazla ödül kazanabilir (ana sıralama + özel ödül).',
      'Para ödülleri 30 iş günü içinde takımın belirlediği hesaba transfer edilir; donanım ödülleri etkinlik gününde elden teslim edilir.'
    ]
  },
  {
    icon: '📩',
    color: '#8B5CF6',
    title: 'İtiraz & Sorumluluk',
    items: [
      'Jüri kararına itiraz, kararın açıklanmasından sonraki 2 saat içinde yazılı olarak (e-posta) yapılır.',
      'İtirazlar; jüri başkanı, organizasyon koordinatörü ve bağımsız bir akademisyenden oluşan 3 kişilik hakem heyeti tarafından 24 saat içinde sonuçlandırılır; karar kesindir.',
      'Düzenleyici, etkinlik mekânındaki değerli eşya kayıplarından sorumlu değildir.',
      'Mücbir sebep (afet, salgın, otorite kararı) hâlinde etkinlik ertelenebilir veya çevrim içi formata alınabilir; kurallar uyarlanır ve duyurulur.',
      'Düzenleyici, tükenen donanım ödüllerinin yerine eşdeğerini sağlama hakkını saklı tutar.',
      'Bu kurallar hackfest26.com\'da yayımlandığı tarihte yürürlüğe girer; etkinlik başladıktan sonra ödül ve değerlendirme kriterlerinde değişiklik yapılamaz.'
    ]
  }
];
