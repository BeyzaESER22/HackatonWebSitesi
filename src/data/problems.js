import { COLORS } from '@/lib/constants';

export const categories = [
  {
    id: 'edu',
    title: 'Eğitimde Yenilik',
    icon: '🎓',
    color: '#F59E0B',
    description: 'Kişiselleştirilmiş öğrenme yolları, erişilebilir eğitim araçları ve yetkinlik analizi.',
    tagline: 'Tek bir müfredat herkese yetmiyor; AI öğrenciye göre büyüsün.',
    theme: 'Eğitim alanındaki sorunlar yapay zeka ile çözülmeyi bekliyor. Bu kategori; öğrencinin nereyi anlamadığını verisinden çıkarıp kişiselleştirilmiş yol çizen, açık uçlu yanıtları otomatik puanlayan, işaret diline anlık çeviri yapan ve okulu bırakma riski olan öğrencileri saptayan AI sistemleri istiyor. NLP ve adaptif öğrenme algoritmaları bu temanın merkezinde.',
    whyMatters: [
      'PISA 2022: Öğrencilerin önemli bir bölümü temel yetkinliklerin altında performans gösteriyor.',
      'EdTech (Eğitim Teknolojileri) pazarının 2030\'a kadar hızla büyümesi bekleniyor.',
      'Her öğrencinin öğrenme hızı farklıdır; fırsat eşitliği için teknolojinin erişilebilir olması kritik.'
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
