/**
 * AMPERE TO WATT CALCULATOR - Main Script
 * Complete electrical power conversion suite
 * Version: 2.0
 */

(function() {
  'use strict';

  // ===== DATABASE & CONSTANTS =====
  

  const TRANSLATIONS = {
    es: {
      'Skip to Main Content': 'Saltar al contenido principal',
      'AMPERE TO WATT': 'AMPERIOS A VATIOS',
      'Calculator': 'Calculadora',
      'All Tools': 'Todas las herramientas',
      'Units': 'Unidades',
      'Formulas': 'Fórmulas',
      'Examples': 'Ejemplos',
      'Tables': 'Tablas',
      'Power Factor': 'Factor de potencia',
      'Considerations': 'Consideraciones',
      'FAQ': 'Preguntas frecuentes',
      'Amps to Watts Calculator': 'Calculadora de amperios a vatios',
      'Live Power House Grid Circuit': 'Circuito de red de la casa en vivo',
      'Voltage': 'Voltaje',
      'Current (Amperes)': 'Corriente (amperios)',
      'Power (Watts)': 'Potencia (vatios)',
      'Circuit Type': 'Tipo de circuito',
      'Current (Amps)': 'Corriente (A)',
      'Voltage (Volts)': 'Voltaje (V)',
      'Frequency (Hz)': 'Frecuencia (Hz)',
      'REAL POWER': 'POTENCIA REAL',
      'Copy Result': 'Copiar resultado',
      'Export': 'Exportar',
      'Related Electrical Calculators': 'Calculadoras eléctricas relacionadas',
      'Quick Menu': 'Menú rápido',
      'Home': 'Inicio',
      'Amp to Watt Hours': 'Amperios a vatios-hora',
      'Volt-Amps Calculator': 'Calculadora de voltamperios',
      'Watt to Amps': 'Vatios a amperios',
      'Voltage Drop': 'Caída de voltaje',
      'Wire Gauge': 'Calibre de cable',
      'About Amps & Watts': 'Acerca de amperios y vatios',
      'Tools & Calculators': 'Herramientas y calculadoras',
      'DC Power Calculator': 'Calculadora de potencia CC',
      'AC Single-Phase Calculator': 'Calculadora CA monofásica',
      'AC Three-Phase Calculator': 'Calculadora CA trifásica',
      'Power Factor Correction': 'Corrección del factor de potencia',
      'Trust & Legal': 'Confianza y legal',
      'Terms & Conditions': 'Términos y condiciones',
      'Privacy Policy': 'Política de privacidad',
      'Cookie Policy': 'Política de cookies',
      'Disclaimer': 'Aviso legal',
      'About Us': 'Sobre nosotros',
      'Contact Us': 'Contacto',
      'Site Map': 'Mapa del sitio',
      'Cookie Preferences': 'Preferencias de cookies',
      'Available Languages:': 'Idiomas disponibles:',
      'INDEPENDENT RESOURCE': 'RECURSO INDEPENDIENTE',
      'UTILITY GRID': 'RED ELÉCTRICA',
      'TRANSFORMER': 'TRANSFORMADOR',
      'BREAKER': 'INTERRUPTOR',
      'POWER HOUSE': 'CASA',
      'REAL POWER OUTPUT': 'SALIDA DE POTENCIA REAL',
      'Ready': 'Listo',
      'Normal load': 'Carga normal',
      'High load': 'Carga alta',
      'Overload risk': 'Riesgo de sobrecarga',
      'Waiting for input': 'Esperando datos'
    },
    fr: {
      'Skip to Main Content': 'Aller au contenu principal',
      'AMPERE TO WATT': 'AMPÈRES EN WATTS',
      'Calculator': 'Calculateur',
      'All Tools': 'Tous les outils',
      'Units': 'Unités',
      'Formulas': 'Formules',
      'Examples': 'Exemples',
      'Tables': 'Tableaux',
      'Power Factor': 'Facteur de puissance',
      'Considerations': 'Considérations',
      'FAQ': 'FAQ',
      'Amps to Watts Calculator': 'Calculateur ampères en watts',
      'Live Power House Grid Circuit': 'Circuit domestique du réseau en direct',
      'Voltage': 'Tension',
      'Current (Amperes)': 'Courant (ampères)',
      'Power (Watts)': 'Puissance (watts)',
      'Circuit Type': 'Type de circuit',
      'Current (Amps)': 'Courant (A)',
      'Voltage (Volts)': 'Tension (V)',
      'Frequency (Hz)': 'Fréquence (Hz)',
      'REAL POWER': 'PUISSANCE RÉELLE',
      'Copy Result': 'Copier le résultat',
      'Export': 'Exporter',
      'Related Electrical Calculators': 'Calculateurs électriques associés',
      'Quick Menu': 'Menu rapide',
      'Home': 'Accueil',
      'Amp to Watt Hours': 'Ampères en wattheures',
      'Volt-Amps Calculator': 'Calculateur voltampères',
      'Watt to Amps': 'Watts en ampères',
      'Voltage Drop': 'Chute de tension',
      'Wire Gauge': 'Calibre de fil',
      'About Amps & Watts': 'À propos des ampères et watts',
      'Tools & Calculators': 'Outils et calculateurs',
      'DC Power Calculator': 'Calculateur de puissance CC',
      'AC Single-Phase Calculator': 'Calculateur CA monophasé',
      'AC Three-Phase Calculator': 'Calculateur CA triphasé',
      'Power Factor Correction': 'Correction du facteur de puissance',
      'Trust & Legal': 'Confiance et juridique',
      'Terms & Conditions': 'Conditions générales',
      'Privacy Policy': 'Politique de confidentialité',
      'Cookie Policy': 'Politique relative aux cookies',
      'Disclaimer': 'Avertissement',
      'About Us': 'À propos',
      'Contact Us': 'Contact',
      'Site Map': 'Plan du site',
      'Cookie Preferences': 'Préférences des cookies',
      'Available Languages:': 'Langues disponibles :',
      'INDEPENDENT RESOURCE': 'RESSOURCE INDÉPENDANTE',
      'UTILITY GRID': 'RÉSEAU',
      'TRANSFORMER': 'TRANSFORMATEUR',
      'BREAKER': 'DISJONCTEUR',
      'POWER HOUSE': 'MAISON',
      'REAL POWER OUTPUT': 'SORTIE DE PUISSANCE RÉELLE',
      'Ready': 'Prêt',
      'Normal load': 'Charge normale',
      'High load': 'Charge élevée',
      'Overload risk': 'Risque de surcharge',
      'Waiting for input': 'En attente de saisie'
    },
    de: {
      'Skip to Main Content': 'Zum Hauptinhalt springen',
      'AMPERE TO WATT': 'AMPERE IN WATT',
      'Calculator': 'Rechner',
      'All Tools': 'Alle Tools',
      'Units': 'Einheiten',
      'Formulas': 'Formeln',
      'Examples': 'Beispiele',
      'Tables': 'Tabellen',
      'Power Factor': 'Leistungsfaktor',
      'Considerations': 'Hinweise',
      'FAQ': 'FAQ',
      'Amps to Watts Calculator': 'Ampere-in-Watt-Rechner',
      'Live Power House Grid Circuit': 'Live-Stromkreis Hausnetz',
      'Voltage': 'Spannung',
      'Current (Amperes)': 'Strom (Ampere)',
      'Power (Watts)': 'Leistung (Watt)',
      'Circuit Type': 'Stromkreisart',
      'Current (Amps)': 'Strom (A)',
      'Voltage (Volts)': 'Spannung (V)',
      'Frequency (Hz)': 'Frequenz (Hz)',
      'REAL POWER': 'WIRKLEISTUNG',
      'Copy Result': 'Ergebnis kopieren',
      'Export': 'Exportieren',
      'Related Electrical Calculators': 'Verwandte Elektrorechner',
      'Quick Menu': 'Schnellmenü',
      'Home': 'Startseite',
      'Tools & Calculators': 'Tools und Rechner',
      'Trust & Legal': 'Vertrauen und Recht',
      'Terms & Conditions': 'AGB',
      'Privacy Policy': 'Datenschutzrichtlinie',
      'Cookie Policy': 'Cookie-Richtlinie',
      'Disclaimer': 'Haftungsausschluss',
      'About Us': 'Über uns',
      'Contact Us': 'Kontakt',
      'Site Map': 'Sitemap',
      'Cookie Preferences': 'Cookie-Einstellungen',
      'Available Languages:': 'Verfügbare Sprachen:',
      'UTILITY GRID': 'STROMNETZ',
      'TRANSFORMER': 'TRANSFORMATOR',
      'BREAKER': 'SCHALTER',
      'POWER HOUSE': 'HAUS',
      'REAL POWER OUTPUT': 'WIRKLEISTUNG',
      'Ready': 'Bereit',
      'Normal load': 'Normale Last',
      'High load': 'Hohe Last',
      'Overload risk': 'Überlastungsrisiko',
      'Waiting for input': 'Warte auf Eingabe'
    },
    pt: {}, hi: {}, ja: {}, ko: {}, ru: {}, zh: {}, ar: {}, pl: {}
  };

  const LANGUAGE_META = {
    en: { name: 'English', dir: 'ltr' },
    es: { name: 'Español', dir: 'ltr' },
    fr: { name: 'Français', dir: 'ltr' },
    de: { name: 'Deutsch', dir: 'ltr' },
    it: { name: 'Italiano', dir: 'ltr' },
    pt: { name: 'Português', dir: 'ltr' },
    bn: { name: 'বাংলা', dir: 'ltr' },
    hi: { name: 'हिन्दी', dir: 'ltr' },
    ja: { name: '日本語', dir: 'ltr' },
    ko: { name: '한국어', dir: 'ltr' },
    ms: { name: 'Malay', dir: 'ltr' },
    ru: { name: 'Русский', dir: 'ltr' },
    zh: { name: '中文', dir: 'ltr' },
    id: { name: 'Indonesia', dir: 'ltr' },
    ar: { name: 'العربية', dir: 'rtl' },
    bg: { name: 'Български', dir: 'ltr' },
    tr: { name: 'Türkçe', dir: 'ltr' },
    sv: { name: 'Svenska', dir: 'ltr' },
    ur: { name: 'اردو', dir: 'rtl' },
    pl: { name: 'Polski', dir: 'ltr' }
  };

  const EXTERNAL_TRANSLATION_CACHE = {};

  Object.assign(TRANSLATIONS.pt, TRANSLATIONS.es, {
    'Skip to Main Content': 'Ir para o conteúdo principal',
    'AMPERE TO WATT': 'AMPERES PARA WATTS',
    'Calculator': 'Calculadora',
    'All Tools': 'Todas as ferramentas',
    'Available Languages:': 'Idiomas disponíveis:',
    'Ready': 'Pronto',
    'Normal load': 'Carga normal',
    'High load': 'Carga alta',
    'Overload risk': 'Risco de sobrecarga',
    'Waiting for input': 'Aguardando entrada'
  });
  Object.assign(TRANSLATIONS.hi, TRANSLATIONS.es, {
    'Skip to Main Content': 'मुख्य सामग्री पर जाएँ',
    'AMPERE TO WATT': 'एम्पियर से वाट',
    'Calculator': 'कैलकुलेटर',
    'All Tools': 'सभी टूल',
    'Available Languages:': 'उपलब्ध भाषाएँ:',
    'Ready': 'तैयार',
    'Normal load': 'सामान्य लोड',
    'High load': 'अधिक लोड',
    'Overload risk': 'ओवरलोड जोखिम',
    'Waiting for input': 'इनपुट की प्रतीक्षा'
  });
  Object.assign(TRANSLATIONS.ja, TRANSLATIONS.es, {
    'Skip to Main Content': 'メインコンテンツへ移動',
    'AMPERE TO WATT': 'アンペアからワット',
    'Calculator': '計算機',
    'All Tools': 'すべてのツール',
    'Available Languages:': '利用可能な言語:',
    'Ready': '準備完了',
    'Normal load': '通常負荷',
    'High load': '高負荷',
    'Overload risk': '過負荷リスク',
    'Waiting for input': '入力待ち'
  });
  Object.assign(TRANSLATIONS.ko, TRANSLATIONS.es, {
    'Skip to Main Content': '본문으로 이동',
    'AMPERE TO WATT': '암페어를 와트로',
    'Calculator': '계산기',
    'All Tools': '모든 도구',
    'Available Languages:': '사용 가능한 언어:',
    'Ready': '준비됨',
    'Normal load': '정상 부하',
    'High load': '높은 부하',
    'Overload risk': '과부하 위험',
    'Waiting for input': '입력 대기 중'
  });
  Object.assign(TRANSLATIONS.ru, TRANSLATIONS.es, {
    'Skip to Main Content': 'Перейти к основному содержанию',
    'AMPERE TO WATT': 'АМПЕРЫ В ВАТТЫ',
    'Calculator': 'Калькулятор',
    'All Tools': 'Все инструменты',
    'Available Languages:': 'Доступные языки:',
    'Ready': 'Готово',
    'Normal load': 'Нормальная нагрузка',
    'High load': 'Высокая нагрузка',
    'Overload risk': 'Риск перегрузки',
    'Waiting for input': 'Ожидание ввода'
  });
  Object.assign(TRANSLATIONS.zh, TRANSLATIONS.es, {
    'Skip to Main Content': '跳到主要内容',
    'AMPERE TO WATT': '安培转瓦特',
    'Calculator': '计算器',
    'All Tools': '所有工具',
    'Available Languages:': '可用语言:',
    'Ready': '就绪',
    'Normal load': '正常负载',
    'High load': '高负载',
    'Overload risk': '过载风险',
    'Waiting for input': '等待输入'
  });
  Object.assign(TRANSLATIONS.ar, TRANSLATIONS.es, {
    'Skip to Main Content': 'انتقل إلى المحتوى الرئيسي',
    'AMPERE TO WATT': 'أمبير إلى واط',
    'Calculator': 'الحاسبة',
    'All Tools': 'كل الأدوات',
    'Available Languages:': 'اللغات المتاحة:',
    'Ready': 'جاهز',
    'Normal load': 'حمل طبيعي',
    'High load': 'حمل مرتفع',
    'Overload risk': 'خطر زيادة الحمل',
    'Waiting for input': 'بانتظار الإدخال'
  });
  Object.assign(TRANSLATIONS.pl, TRANSLATIONS.es, {
    'Skip to Main Content': 'Przejdź do głównej treści',
    'AMPERE TO WATT': 'AMPERY NA WATY',
    'Calculator': 'Kalkulator',
    'All Tools': 'Wszystkie narzędzia',
    'Available Languages:': 'Dostępne języki:',
    'Ready': 'Gotowe',
    'Normal load': 'Normalne obciążenie',
    'High load': 'Wysokie obciążenie',
    'Overload risk': 'Ryzyko przeciążenia',
    'Waiting for input': 'Oczekiwanie na dane'
  });


  Object.assign(TRANSLATIONS.pt, {
    'Units': 'Unidades', 'Formulas': 'Fórmulas', 'Examples': 'Exemplos', 'Tables': 'Tabelas', 'Power Factor': 'Fator de potência', 'Considerations': 'Considerações', 'FAQ': 'Perguntas frequentes', 'Amps to Watts Calculator': 'Calculadora de amperes para watts', 'Live Power House Grid Circuit': 'Circuito residencial da rede ao vivo', 'Voltage': 'Tensão', 'Current (Amperes)': 'Corrente (amperes)', 'Power (Watts)': 'Potência (watts)', 'Circuit Type': 'Tipo de circuito', 'Current (Amps)': 'Corrente (A)', 'Voltage (Volts)': 'Tensão (V)', 'Frequency (Hz)': 'Frequência (Hz)', 'REAL POWER': 'POTÊNCIA REAL', 'Copy Result': 'Copiar resultado', 'Export': 'Exportar', 'Related Electrical Calculators': 'Calculadoras elétricas relacionadas', 'Quick Menu': 'Menu rápido', 'Home': 'Início', 'Amp to Watt Hours': 'Ampères para watt-hora', 'Volt-Amps Calculator': 'Calculadora de volt-ampères', 'Watt to Amps': 'Watts para ampères', 'Voltage Drop': 'Queda de tensão', 'Wire Gauge': 'Bitola do fio', 'About Amps & Watts': 'Sobre ampères e watts', 'Tools & Calculators': 'Ferramentas e calculadoras', 'DC Power Calculator': 'Calculadora de potência CC', 'AC Single-Phase Calculator': 'Calculadora CA monofásica', 'AC Three-Phase Calculator': 'Calculadora CA trifásica', 'Power Factor Correction': 'Correção do fator de potência', 'Trust & Legal': 'Confiança e legal', 'Terms & Conditions': 'Termos e condições', 'Privacy Policy': 'Política de privacidade', 'Cookie Policy': 'Política de cookies', 'Disclaimer': 'Aviso legal', 'About Us': 'Sobre nós', 'Contact Us': 'Contato', 'Site Map': 'Mapa do site', 'Cookie Preferences': 'Preferências de cookies', 'INDEPENDENT RESOURCE': 'RECURSO INDEPENDENTE', 'UTILITY GRID': 'REDE ELÉTRICA', 'TRANSFORMER': 'TRANSFORMADOR', 'BREAKER': 'DISJUNTOR', 'POWER HOUSE': 'CASA', 'REAL POWER OUTPUT': 'SAÍDA DE POTÊNCIA REAL'
  });
  Object.assign(TRANSLATIONS.hi, {
    'Units': 'इकाइयाँ', 'Formulas': 'सूत्र', 'Examples': 'उदाहरण', 'Tables': 'तालिकाएँ', 'Power Factor': 'पावर फैक्टर', 'Considerations': 'विचार', 'FAQ': 'सामान्य प्रश्न', 'Amps to Watts Calculator': 'एम्पियर से वाट कैलकुलेटर', 'Live Power House Grid Circuit': 'लाइव पावर हाउस ग्रिड सर्किट', 'Voltage': 'वोल्टेज', 'Current (Amperes)': 'करंट (एम्पियर)', 'Power (Watts)': 'पावर (वाट)', 'Circuit Type': 'सर्किट प्रकार', 'Current (Amps)': 'करंट (A)', 'Voltage (Volts)': 'वोल्टेज (V)', 'Frequency (Hz)': 'फ्रीक्वेंसी (Hz)', 'REAL POWER': 'वास्तविक पावर', 'Copy Result': 'परिणाम कॉपी करें', 'Export': 'निर्यात', 'Related Electrical Calculators': 'संबंधित विद्युत कैलकुलेटर', 'Quick Menu': 'त्वरित मेनू', 'Home': 'होम', 'Tools & Calculators': 'टूल और कैलकुलेटर', 'Trust & Legal': 'विश्वास और कानूनी', 'Terms & Conditions': 'नियम और शर्तें', 'Privacy Policy': 'गोपनीयता नीति', 'Cookie Policy': 'कुकी नीति', 'Disclaimer': 'अस्वीकरण', 'About Us': 'हमारे बारे में', 'Contact Us': 'संपर्क करें', 'Site Map': 'साइट मैप', 'Cookie Preferences': 'कुकी प्राथमिकताएँ', 'UTILITY GRID': 'यूटिलिटी ग्रिड', 'TRANSFORMER': 'ट्रांसफॉर्मर', 'BREAKER': 'ब्रेकर', 'POWER HOUSE': 'पावर हाउस', 'REAL POWER OUTPUT': 'वास्तविक पावर आउटपुट'
  });
  Object.assign(TRANSLATIONS.ja, {
    'Units': '単位', 'Formulas': '計算式', 'Examples': '例', 'Tables': '表', 'Power Factor': '力率', 'Considerations': '注意事項', 'FAQ': 'よくある質問', 'Amps to Watts Calculator': 'アンペアからワット計算機', 'Live Power House Grid Circuit': 'ライブ住宅電力グリッド回路', 'Voltage': '電圧', 'Current (Amperes)': '電流（アンペア）', 'Power (Watts)': '電力（ワット）', 'Circuit Type': '回路タイプ', 'Current (Amps)': '電流（A）', 'Voltage (Volts)': '電圧（V）', 'Frequency (Hz)': '周波数（Hz）', 'REAL POWER': '有効電力', 'Copy Result': '結果をコピー', 'Export': 'エクスポート', 'Related Electrical Calculators': '関連電気計算機', 'Quick Menu': 'クイックメニュー', 'Home': 'ホーム', 'Tools & Calculators': 'ツールと計算機', 'Trust & Legal': '信頼と法務', 'Terms & Conditions': '利用規約', 'Privacy Policy': 'プライバシーポリシー', 'Cookie Policy': 'Cookieポリシー', 'Disclaimer': '免責事項', 'About Us': '私たちについて', 'Contact Us': 'お問い合わせ', 'Site Map': 'サイトマップ', 'Cookie Preferences': 'Cookie設定', 'UTILITY GRID': '電力網', 'TRANSFORMER': '変圧器', 'BREAKER': 'ブレーカー', 'POWER HOUSE': '住宅', 'REAL POWER OUTPUT': '有効電力出力'
  });
  Object.assign(TRANSLATIONS.ko, {
    'Units': '단위', 'Formulas': '공식', 'Examples': '예시', 'Tables': '표', 'Power Factor': '역률', 'Considerations': '고려 사항', 'FAQ': '자주 묻는 질문', 'Amps to Watts Calculator': '암페어-와트 계산기', 'Live Power House Grid Circuit': '실시간 주택 전력망 회로', 'Voltage': '전압', 'Current (Amperes)': '전류(암페어)', 'Power (Watts)': '전력(와트)', 'Circuit Type': '회로 유형', 'Current (Amps)': '전류(A)', 'Voltage (Volts)': '전압(V)', 'Frequency (Hz)': '주파수(Hz)', 'REAL POWER': '유효 전력', 'Copy Result': '결과 복사', 'Export': '내보내기', 'Related Electrical Calculators': '관련 전기 계산기', 'Quick Menu': '빠른 메뉴', 'Home': '홈', 'Tools & Calculators': '도구 및 계산기', 'Trust & Legal': '신뢰 및 법률', 'Terms & Conditions': '이용약관', 'Privacy Policy': '개인정보 처리방침', 'Cookie Policy': '쿠키 정책', 'Disclaimer': '면책 조항', 'About Us': '회사 소개', 'Contact Us': '문의하기', 'Site Map': '사이트맵', 'Cookie Preferences': '쿠키 설정', 'UTILITY GRID': '전력망', 'TRANSFORMER': '변압기', 'BREAKER': '차단기', 'POWER HOUSE': '주택', 'REAL POWER OUTPUT': '유효 전력 출력'
  });
  Object.assign(TRANSLATIONS.ru, {
    'Units': 'Единицы', 'Formulas': 'Формулы', 'Examples': 'Примеры', 'Tables': 'Таблицы', 'Power Factor': 'Коэффициент мощности', 'Considerations': 'Рекомендации', 'FAQ': 'Вопросы', 'Amps to Watts Calculator': 'Калькулятор ампер в ватты', 'Live Power House Grid Circuit': 'Схема домашней электросети', 'Voltage': 'Напряжение', 'Current (Amperes)': 'Ток (амперы)', 'Power (Watts)': 'Мощность (ватты)', 'Circuit Type': 'Тип цепи', 'Current (Amps)': 'Ток (A)', 'Voltage (Volts)': 'Напряжение (V)', 'Frequency (Hz)': 'Частота (Hz)', 'REAL POWER': 'АКТИВНАЯ МОЩНОСТЬ', 'Copy Result': 'Копировать результат', 'Export': 'Экспорт', 'Related Electrical Calculators': 'Связанные электрические калькуляторы', 'Quick Menu': 'Быстрое меню', 'Home': 'Главная', 'Tools & Calculators': 'Инструменты и калькуляторы', 'Trust & Legal': 'Доверие и право', 'Terms & Conditions': 'Условия', 'Privacy Policy': 'Политика конфиденциальности', 'Cookie Policy': 'Политика cookie', 'Disclaimer': 'Отказ от ответственности', 'About Us': 'О нас', 'Contact Us': 'Связаться', 'Site Map': 'Карта сайта', 'Cookie Preferences': 'Настройки cookie', 'UTILITY GRID': 'ЭЛЕКТРОСЕТЬ', 'TRANSFORMER': 'ТРАНСФОРМАТОР', 'BREAKER': 'АВТОМАТ', 'POWER HOUSE': 'ДОМ', 'REAL POWER OUTPUT': 'АКТИВНАЯ МОЩНОСТЬ'
  });
  Object.assign(TRANSLATIONS.zh, {
    'Units': '单位', 'Formulas': '公式', 'Examples': '示例', 'Tables': '表格', 'Power Factor': '功率因数', 'Considerations': '注意事项', 'FAQ': '常见问题', 'Amps to Watts Calculator': '安培转瓦特计算器', 'Live Power House Grid Circuit': '实时住宅电网电路', 'Voltage': '电压', 'Current (Amperes)': '电流（安培）', 'Power (Watts)': '功率（瓦特）', 'Circuit Type': '电路类型', 'Current (Amps)': '电流（A）', 'Voltage (Volts)': '电压（V）', 'Frequency (Hz)': '频率（Hz）', 'REAL POWER': '有功功率', 'Copy Result': '复制结果', 'Export': '导出', 'Related Electrical Calculators': '相关电气计算器', 'Quick Menu': '快速菜单', 'Home': '首页', 'Tools & Calculators': '工具和计算器', 'Trust & Legal': '信任与法律', 'Terms & Conditions': '条款和条件', 'Privacy Policy': '隐私政策', 'Cookie Policy': 'Cookie 政策', 'Disclaimer': '免责声明', 'About Us': '关于我们', 'Contact Us': '联系我们', 'Site Map': '网站地图', 'Cookie Preferences': 'Cookie 偏好设置', 'UTILITY GRID': '公用电网', 'TRANSFORMER': '变压器', 'BREAKER': '断路器', 'POWER HOUSE': '住宅', 'REAL POWER OUTPUT': '有功功率输出'
  });
  Object.assign(TRANSLATIONS.ar, {
    'Units': 'الوحدات', 'Formulas': 'الصيغ', 'Examples': 'أمثلة', 'Tables': 'الجداول', 'Power Factor': 'معامل القدرة', 'Considerations': 'اعتبارات', 'FAQ': 'الأسئلة الشائعة', 'Amps to Watts Calculator': 'حاسبة الأمبير إلى الواط', 'Live Power House Grid Circuit': 'دائرة شبكة المنزل المباشرة', 'Voltage': 'الجهد', 'Current (Amperes)': 'التيار (أمبير)', 'Power (Watts)': 'القدرة (واط)', 'Circuit Type': 'نوع الدائرة', 'Current (Amps)': 'التيار (A)', 'Voltage (Volts)': 'الجهد (V)', 'Frequency (Hz)': 'التردد (Hz)', 'REAL POWER': 'القدرة الحقيقية', 'Copy Result': 'نسخ النتيجة', 'Export': 'تصدير', 'Related Electrical Calculators': 'حاسبات كهربائية ذات صلة', 'Quick Menu': 'القائمة السريعة', 'Home': 'الرئيسية', 'Tools & Calculators': 'الأدوات والحاسبات', 'Trust & Legal': 'الثقة والقانون', 'Terms & Conditions': 'الشروط والأحكام', 'Privacy Policy': 'سياسة الخصوصية', 'Cookie Policy': 'سياسة ملفات تعريف الارتباط', 'Disclaimer': 'إخلاء المسؤولية', 'About Us': 'من نحن', 'Contact Us': 'اتصل بنا', 'Site Map': 'خريطة الموقع', 'Cookie Preferences': 'تفضيلات ملفات تعريف الارتباط', 'UTILITY GRID': 'شبكة الكهرباء', 'TRANSFORMER': 'محول', 'BREAKER': 'قاطع', 'POWER HOUSE': 'المنزل', 'REAL POWER OUTPUT': 'خرج القدرة الحقيقية'
  });
  Object.assign(TRANSLATIONS.pl, {
    'Units': 'Jednostki', 'Formulas': 'Wzory', 'Examples': 'Przykłady', 'Tables': 'Tabele', 'Power Factor': 'Współczynnik mocy', 'Considerations': 'Uwagi', 'FAQ': 'FAQ', 'Amps to Watts Calculator': 'Kalkulator amperów na waty', 'Live Power House Grid Circuit': 'Obwód domowej sieci zasilania', 'Voltage': 'Napięcie', 'Current (Amperes)': 'Prąd (ampery)', 'Power (Watts)': 'Moc (waty)', 'Circuit Type': 'Typ obwodu', 'Current (Amps)': 'Prąd (A)', 'Voltage (Volts)': 'Napięcie (V)', 'Frequency (Hz)': 'Częstotliwość (Hz)', 'REAL POWER': 'MOC CZYNNA', 'Copy Result': 'Kopiuj wynik', 'Export': 'Eksport', 'Related Electrical Calculators': 'Powiązane kalkulatory elektryczne', 'Quick Menu': 'Szybkie menu', 'Home': 'Strona główna', 'Tools & Calculators': 'Narzędzia i kalkulatory', 'Trust & Legal': 'Zaufanie i prawo', 'Terms & Conditions': 'Regulamin', 'Privacy Policy': 'Polityka prywatności', 'Cookie Policy': 'Polityka cookie', 'Disclaimer': 'Zastrzeżenie', 'About Us': 'O nas', 'Contact Us': 'Kontakt', 'Site Map': 'Mapa strony', 'Cookie Preferences': 'Preferencje cookie', 'UTILITY GRID': 'SIEĆ', 'TRANSFORMER': 'TRANSFORMATOR', 'BREAKER': 'WYŁĄCZNIK', 'POWER HOUSE': 'DOM', 'REAL POWER OUTPUT': 'WYJŚCIE MOCY CZYNNEJ'
  });

  const DEVICES = [
    { name: "LED Bulb", watts: 9 },
    { name: "Laptop", watts: 65 },
    { name: "Desktop PC", watts: 250 },
    { name: '55" TV', watts: 120 },
    { name: "Fridge", watts: 200 },
    { name: "Microwave", watts: 1000 },
    { name: "Coffee Maker", watts: 950 },
    { name: "Hair Dryer", watts: 1800 },
    { name: "AC Unit 1.5T", watts: 2000 },
    { name: "Water Heater", watts: 4000 },
    { name: "EV Charger L2", watts: 7200 },
    { name: "Washer", watts: 500 }
  ];

  const REF_TABLE_AMPS = [0.1, 0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 25, 30, 40, 50, 60, 100];

  const FAQ_DATA = [
    {
      q: "How do I convert amps to watts?",
      a: "For DC circuits: Watts = Amps × Volts. For AC single-phase: Watts = PF × Amps × Volts. For AC three-phase (line-to-line): Watts = √3 × PF × Amps × V(L-L) ≈ 1.732 × PF × I × V. For AC three-phase (line-to-neutral): Watts = 3 × PF × Amps × V(L-N). Always confirm your circuit type and voltage measurement before selecting the formula. The square root of 3 (≈1.732) accounts for the 120-degree phase displacement in three-phase systems."
    },
    {
      q: "How many watts is 10 amps at 120V?",
      a: "At 120V AC with unity power factor (PF=1.00), 10 amps = 1,200 watts. With PF=0.95 (typical for fluorescent lighting), 10A = 1,140W. For DC circuits, 10A × 120V = 1,200W exactly. At 240V, 10A = 2,400W. Always apply the appropriate power factor for inductive loads like motors, fluorescent ballasts, and transformers. The NEC 80% continuous load rule means a 15A circuit should not exceed 12A continuous (1,440W at 120V)."
    },
    {
      q: "What is the formula for 3-phase amps to watts?",
      a: "There are two formulas. With line-to-line voltage: P = √3 × PF × I × V(L-L) = 1.732 × PF × I × V(L-L). With line-to-neutral voltage: P = 3 × PF × I × V(L-N). The √3 factor (1.732) accounts for the 120° phase displacement between conductors. Using the wrong voltage type produces a 73% error. In a 480V three-phase system, V(L-L)=480V and V(L-N)=277V. Always verify which voltage measurement you have before calculating."
    },
    {
      q: "How do I convert amp hours to watt hours?",
      a: "Watt-hours (Wh) = Amp-hours (Ah) × Voltage (V). A 100Ah 12V battery stores 100 × 12 = 1,200Wh (1.2 kWh). For milliamp-hours (mAh), divide by 1,000 first: (mAh ÷ 1000) × V = Wh. Example: 5,000mAh at 3.7V = (5000/1000) × 3.7 = 18.5Wh. Our Amp to Watt Hours calculator above handles this automatically with efficiency considerations. This conversion is essential for solar system sizing, battery bank design, and energy storage calculations."
    },
    {
      q: "How do watts relate to amps?",
      a: "Watts and amps are related through voltage via Watt's Law: Power (W) = Current (A) × Voltage (V). For AC circuits, multiply by power factor: W = A × V × PF. Amps measure current flow rate (the quantity of electrons moving), while watts measure the rate of energy transfer (the work being done). You can have high amps with low watts at low voltage (e.g., 100A at 1V = 100W), or low amps with high watts at high voltage (e.g., 1A at 1000V = 1000W). This is why power transmission uses high voltage — to reduce current and minimize losses."
    },
    {
      q: "What are typical power factor values for common devices?",
      a: "Resistive loads (heaters, incandescent bulbs, resistive ovens): PF = 1.00 — voltage and current perfectly in phase. Fluorescent lamps with electronic ballasts: PF = 0.95. Synchronous motors: PF = 0.90 (adjustable; can be leading for PF correction). Induction motors at full load: PF = 0.85 — stator and rotor windings create inductive reactance. Induction motors at no load: PF = 0.35 — magnetizing current dominates without mechanical output. These are reference benchmarks only; always use nameplate data for precise calculations."
    },
    {
      q: "Can I convert amps to watts without voltage?",
      a: "No, this is mathematically impossible. Amperes measure the rate of electric charge flow (coulombs per second), while watts measure the rate of energy transfer (joules per second). Power equals current multiplied by voltage (P = V × I). Without knowing the voltage, you cannot determine how much energy each unit of charge carries. It's analogous to asking how much work water can do without knowing the water pressure — you know the flow rate (amps/gallons per minute) but not the pressure (volts/PSI) driving it."
    },
    {
      q: "What is the difference between real power (W), apparent power (VA), and reactive power (VAR)?",
      a: "Real Power (P) in watts (W) performs actual work — turning motors, producing heat, emitting light. Apparent Power (S) in volt-amperes (VA) is the total power drawn from the supply (V × I). Reactive Power (Q) in volt-amperes reactive (VAR) is stored and released by inductive and capacitive elements without being consumed. The power triangle relates them: S² = P² + Q², and Power Factor = P ÷ S. Generators, transformers, and UPS systems are rated in VA or kVA because they must supply apparent power regardless of load power factor."
    },
    {
      q: "What is the 80% continuous load rule for circuit breakers?",
      a: "Per NEC Section 210.19 and 210.20, circuit breakers should not be loaded beyond 80% of their rating for continuous loads (defined as loads running 3 hours or more). A 20A breaker supports 16A continuous. At 120V: 16A × 120V = 1,920W max continuous. At 240V: 16A × 240V = 3,840W. Non-continuous loads can use 100% of the breaker rating. Exceeding 80% on continuous loads causes thermal stress on the breaker trip mechanism and shortens breaker service life. This is why a 15A circuit should not exceed 1,440W continuous."
    },
    {
      q: "How do I convert milliamps (mA) to watt hours?",
      a: "First convert mA to amps by dividing by 1,000: Amps = mA ÷ 1,000. Then multiply by voltage and time: Watt-hours = Amps × Volts × Hours. Example: 500mA at 5V for 2 hours = (500/1000) × 5V × 2h = 0.5A × 5V × 2h = 5Wh. This is common for USB power banks, phone batteries, and small electronics. A 10,000mAh USB power bank at 3.7V stores (10000/1000) × 3.7 = 37Wh. Use our Amp to Watt Hours calculator tool above for instant conversions with efficiency factors."
    }
  ];

  const RESISTANCE_VALUES = {
    copper: { 14: 0.002525, 12: 0.001588, 10: 0.000999, 8: 0.000628, 6: 0.000395 },
    aluminum: { 14: 0.00408, 12: 0.00256, 10: 0.00161, 8: 0.00101, 6: 0.00064 }
  };

  // ===== INITIALIZATION =====

  function init() {
    initDeviceGrid();
    initReferenceTable();
    initFAQ();
    initLanguageButtons();
    initHeadingVisuals();
    initLiveCalculatorControls();
    if (document.getElementById('main-type')) {
      togglePFGroup();
      updateVisuals(10, 230, 0);
      calcMain();
    }
    if (document.getElementById('premium-type')) {
      togglePremiumPFGroup();
      calcPremiumWattsToAmps();
    }
    if (document.getElementById('ah-amps')) calcAmpHours();
    if (document.getElementById('va-amps')) calcVA();
    if (document.getElementById('vd-amps')) calcVoltageDrop();
    if (document.getElementById('pf-watts')) calcPF();
    if (document.getElementById('wg-amps')) calcWireGauge();
  }

  function initLiveCalculatorControls() {
    const liveIds = [
      'main-type', 'main-amps', 'main-volts', 'main-freq', 'main-pf',
      'premium-type', 'premium-watts', 'premium-volts', 'premium-freq', 'premium-pf', 'premium-efficiency',
      'ah-amps', 'ah-volts', 'ah-hours', 'ah-eff', 'ah-type',
      'va-amps', 'va-volts', 'va-type',
      'vd-amps', 'vd-volts', 'vd-dist', 'vd-gauge', 'vd-material',
      'pf-watts', 'pf-va', 'pf-volts',
      'wg-amps', 'wg-volts', 'wg-temp', 'wg-install'
    ];

    liveIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', handleLiveCalculatorInput);
      el.addEventListener('change', handleLiveCalculatorInput);
    });
  }

  function handleLiveCalculatorInput(event) {
    const id = event.target.id;
    if (id.indexOf('main-') === 0) {
      if (id === 'main-type') togglePFGroup();
      calcMain();
      return;
    }

    if (id.indexOf('premium-') === 0) {
      if (id === 'premium-type') togglePremiumPFGroup();
      calcPremiumWattsToAmps();
      return;
    }

    if (id.indexOf('ah-') === 0) calcAmpHours();
    if (id.indexOf('va-') === 0) calcVA();
    if (id.indexOf('vd-') === 0) calcVoltageDrop();
    if (id.indexOf('pf-') === 0) calcPF();
    if (id.indexOf('wg-') === 0) calcWireGauge();
  }

  // ===== LANGUAGE BUTTONS INITIALIZATION =====

  function getActiveLanguage() {
    return localStorage.getItem('preferredLanguage') || localStorage.getItem('siteLanguage') || 'en';
  }

  function loadTranslationJson(lang) {
    if (lang === 'en' || EXTERNAL_TRANSLATION_CACHE[lang]) {
      return Promise.resolve(EXTERNAL_TRANSLATION_CACHE[lang] || {});
    }
    return fetch('/translations/' + lang + '.json', { cache: 'force-cache' })
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        const phrases = data.phrases || data || {};
        TRANSLATIONS[lang] = Object.assign({}, TRANSLATIONS[lang] || {}, phrases);
        EXTERNAL_TRANSLATION_CACHE[lang] = phrases;
        return phrases;
      })
      .catch(() => ({}));
  }

  function translatePhrase(text, lang = getActiveLanguage()) {
    if (lang === 'en') return text;
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][text]) || text;
  }

  function getTranslatableTextNodes() {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, textarea, input, select, .language-buttons')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function applyLanguage(lang) {
    const selectedLang = LANGUAGE_META[lang] ? lang : 'en';
    const meta = LANGUAGE_META[selectedLang];

    document.documentElement.lang = selectedLang;
    document.documentElement.dir = meta.dir;
    document.body.classList.toggle('is-rtl', meta.dir === 'rtl');

    getTranslatableTextNodes().forEach(node => {
      if (!node.__i18nOriginal) node.__i18nOriginal = node.nodeValue;
      const original = node.__i18nOriginal;
      const trimmed = original.trim();
      if (!trimmed) return;

      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = leading + translatePhrase(trimmed, selectedLang) + trailing;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === selectedLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    localStorage.setItem('preferredLanguage', selectedLang);
    localStorage.setItem('siteLanguage', selectedLang);
    if (document.getElementById('main-type')) {
      calcMain();
    }
    const status = document.getElementById('language-status');
    if (status) {
      status.textContent = selectedLang === 'en'
        ? 'Language set to English.'
        : 'Language changed to ' + meta.name + '. Some technical formulas and legal terms may remain in English for accuracy.';
    }
  }

  function initLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    if (!langButtons.length) return;

    const languageWrap = document.querySelector('.footer-languages');
    if (languageWrap && !document.getElementById('language-status')) {
      const status = document.createElement('p');
      status.id = 'language-status';
      status.className = 'language-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      languageWrap.appendChild(status);
    }

    langButtons.forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function() {
        applyLanguage(this.getAttribute('data-lang') || 'en');
      });
    });

    switchLanguage(getActiveLanguage());
  }

  // ===== DEVICE GRID INITIALIZATION =====

  function initDeviceGrid() {
    const grid = document.getElementById('device-grid');
    if (!grid) return;

    grid.innerHTML = DEVICES.map(d =>
      `<div class="device-chip" onclick="window.loadDevice('${d.name.replace(/'/g, "\\'")}', ${d.watts})" role="listitem" tabindex="0" onkeydown="if(event.key==='Enter')window.loadDevice('${d.name.replace(/'/g, "\\'")}', ${d.watts})">
        <div class="device-name">${d.name}</div>
        <div class="device-watt">${d.watts}W</div>
      </div>`
    ).join('');
  }

  function getHeadingVisualType(text) {
    const value = text.toLowerCase();
    if (value.includes('three') || value.includes('3 phase')) return ['3P', 'three phase path'];
    if (value.includes('battery') || value.includes('12v') || value.includes('dc')) return ['DC', 'battery circuit'];
    if (value.includes('ac') || value.includes('power factor')) return ['PF', 'AC power factor'];
    if (value.includes('amp') || value.includes('current')) return ['A', 'current draw'];
    if (value.includes('watt') || value.includes('power') || value.includes('kw')) return ['W', 'power output'];
    if (value.includes('volt')) return ['V', 'voltage input'];
    if (value.includes('wire') || value.includes('breaker') || value.includes('load')) return ['LD', 'load planning'];
    return ['FX', 'formula flow'];
  }

  function initHeadingVisuals() {
    if (!document.querySelector('.mini-tool-calculator, .calculator-section, .seo-chart-visual')) return;
    const formulaNode = document.querySelector('.seo-visual-formula');
    const mainCalc = document.querySelector('.mini-tool-calculator');
    const formula = formulaNode ? formulaNode.textContent.trim() : 'W = A x V x PF';
    const volts = mainCalc && mainCalc.dataset.defaultVolts ? mainCalc.dataset.defaultVolts + ' V' : 'V';
    const selector = [
      'main .content-card h2',
      'main .content-card h3',
      'main .topic-copy h2',
      'main .topic-copy h3'
    ].join(',');

    document.querySelectorAll(selector).forEach((heading) => {
      if (
        heading.closest('.static-faq-card, .calculator-section, .premium-visual-section, .sub-calculator-section, .seo-chart-visual') ||
        (heading.nextElementSibling && heading.nextElementSibling.classList.contains('heading-technical-visual'))
      ) {
        return;
      }

      const visualType = getHeadingVisualType(heading.textContent || '');
      const tag = visualType[0];
      const label = visualType[1];
      const visual = document.createElement('button');
      visual.type = 'button';
      visual.className = 'heading-technical-visual';
      visual.setAttribute('aria-expanded', 'false');
      visual.innerHTML = `
        <span class="heading-visual-svg" aria-hidden="true">
          <svg viewBox="0 0 360 118" focusable="false">
            <rect x="16" y="28" width="76" height="52" rx="12"></rect>
            <path d="M92 54 H144"></path>
            <circle cx="162" cy="54" r="18"></circle>
            <path d="M180 54 H242"></path>
            <rect x="242" y="28" width="100" height="52" rx="12"></rect>
            <text x="54" y="59" text-anchor="middle">${tag}</text>
            <text x="162" y="59" text-anchor="middle">=</text>
            <text x="292" y="52" text-anchor="middle">RESULT</text>
            <text x="292" y="68" text-anchor="middle">${volts}</text>
          </svg>
        </span>
        <span class="heading-visual-copy">
          <strong>${label}</strong>
          <em>${formula}</em>
          <small>Tap to view the calculation path for this heading.</small>
        </span>
        <span class="heading-visual-more" aria-hidden="true">+</span>
      `;
      visual.addEventListener('click', () => {
        const expanded = visual.classList.toggle('is-expanded');
        visual.setAttribute('aria-expanded', String(expanded));
      });
      heading.insertAdjacentElement('afterend', visual);
    });
  }

  // ===== REFERENCE TABLE INITIALIZATION =====

  function initReferenceTable() {
    const table = document.getElementById('ref-table-120');
    if (!table) return;

    table.innerHTML = REF_TABLE_AMPS.map(a =>
      `<tr><td>${a} A</td><td>120 V</td><td>${a * 120} W</td></tr>`
    ).join('');
  }

  // ===== FAQ INITIALIZATION =====

  function initFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = FAQ_DATA.map((f, i) =>
      `<div class="faq-item" role="listitem">
        <button class="faq-q" onclick="window.toggleFaq(this)" aria-expanded="false" aria-controls="faq-answer-${i}">
          <span>${f.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-a" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}">
          <p>${f.a}</p>
        </div>
      </div>`
    ).join('');
  }

  // ===== UI UTILITIES =====

  function toggleFaq(btn) {
    const ans = btn.nextElementSibling;
    const isOpen = ans.classList.contains('open');

    // Close all FAQs
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
    });

    // Open clicked FAQ if wasn't open
    if (!isOpen) {
      ans.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  window.toggleFaq = toggleFaq;

  function togglePFGroup() {
    const type = document.getElementById('main-type').value;
    const pfGroup = document.getElementById('main-pf-group');

    if (type === 'dc') {
      pfGroup.style.opacity = '0.4';
      pfGroup.style.pointerEvents = 'none';
      document.getElementById('main-pf').value = '1';
    } else {
      pfGroup.style.opacity = '1';
      pfGroup.style.pointerEvents = 'auto';
      if (document.getElementById('main-pf').value === '1') {
        document.getElementById('main-pf').value = '0.85';
      }
    }
  }

  window.togglePFGroup = togglePFGroup;

  // ===== VISUAL UPDATE =====

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function updateMainRules(type, amps, volts, pf, watts) {
    const formula = type === 'dc'
      ? 'P = A x V'
      : type === 'ac1'
        ? 'P = A x V x PF'
        : 'P = 1.732 x A x V x PF';
    const breaker = Math.max(15, Math.ceil((amps || 0) / 0.8));
    const loadNote = amps > 0
      ? `Approx. continuous breaker target: ${breaker} A or larger`
      : 'Continuous loads should stay at 80% of breaker rating.';
    const safety = type === 'dc'
      ? 'DC uses direct voltage and does not need power factor.'
      : (pf < 0.8 ? 'Low PF increases apparent power and conductor current.' : 'Use RMS voltage and actual equipment power factor.');

    setText('main-rule-formula', formula);
    setText('main-rule-load', loadNote);
    setText('main-rule-safety', safety);
    setText('hero-live-output', formatPowerValue(watts));
  }

  function updatePremiumRules(type, watts, volts, pf, efficiency, amps) {
    const formula = type === 'dc'
      ? 'A = W / (V x efficiency)'
      : type === 'ac1'
        ? 'A = W / (V x PF x efficiency)'
        : 'A = W / (1.732 x V x PF x efficiency)';
    const breaker = amps > 0 ? Math.ceil(amps * 1.25) : 0;
    const breakerText = breaker
      ? `Estimated breaker minimum: ${breaker} A before code-specific rounding.`
      : 'Breaker estimate uses 125% load sizing.';
    const safety = efficiency < 0.9
      ? 'Lower efficiency raises input current and heat.'
      : 'Verify nameplate watts before final circuit sizing.';

    setText('premium-rule-formula', formula);
    setText('premium-rule-breaker', breakerText);
    setText('premium-rule-safety', safety);
  }

  function formatPowerValue(watts) {
    if (!watts || watts <= 0) return '—';
    if (watts >= 1e6) return (watts / 1e6).toFixed(2) + ' MW';
    if (watts >= 1e3) return (watts / 1e3).toFixed(2) + ' kW';
    return watts.toFixed(0) + ' W';
  }

  function getCircuitLabel(type) {
    if (type === 'dc') return 'DC Circuit';
    if (type === 'ac1') return 'AC Single-Phase';
    return 'AC Three-Phase';
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateCircuitDiagram(amps, volts, watts, type, pf) {
    const card = document.getElementById('circuit-diagram-card');
    if (!card) return;

    const safeWatts = Number.isFinite(watts) && watts > 0 ? watts : 0;
    const safeAmps = Number.isFinite(amps) && amps > 0 ? amps : 0;
    const safeVolts = Number.isFinite(volts) && volts > 0 ? volts : 0;
    const loadPct = Math.min(safeWatts / 30000, 1);
    const currentPct = Math.min(safeAmps / 50, 1);
    const status = safeWatts === 0 ? 'Waiting for input' : loadPct < 0.7 ? 'Normal load' : loadPct < 0.9 ? 'High load' : 'Overload risk';
    const statusClass = safeWatts === 0 ? 'idle' : loadPct < 0.7 ? 'normal' : loadPct < 0.9 ? 'warning' : 'danger';
    const flowSpeed = Math.max(0.65, 3.2 - (loadPct * 2.2));
    const wireWidth = (5 + currentPct * 6).toFixed(2);

    card.classList.remove('idle', 'normal', 'warning', 'danger');
    card.classList.add(statusClass);
    card.style.setProperty('--flow-speed', flowSpeed.toFixed(2) + 's');
    card.style.setProperty('--wire-width', wireWidth);
    card.style.setProperty('--house-glow', (0.25 + loadPct * 0.55).toFixed(2));

    // Keep circuit labels connected to the active footer language selection.
    setText('circuit-status', translatePhrase(status));
    setText('diagram-grid-voltage', safeVolts ? safeVolts.toFixed(1) + ' V' : '— V');
    setText('diagram-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '— A');
    setText('diagram-phase', translatePhrase(getCircuitLabel(type)));
    setText('circuit-status', status);
    setText('diagram-grid-voltage', safeVolts ? safeVolts.toFixed(1) + ' V' : '— V');
    setText('diagram-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '— A');
    setText('diagram-phase', getCircuitLabel(type));
    setText('diagram-power', formatPowerValue(safeWatts));
    setText('diagram-load', formatPowerValue(safeWatts));
    setText('diagram-pf', type === 'dc' ? 'DC mode' : 'PF ' + (pf || 1).toFixed(2));

    const breaker = document.getElementById('diagram-breaker-switch');
    if (breaker) {
      breaker.setAttribute('fill', statusClass === 'danger' ? '#ef4444' : statusClass === 'warning' ? '#f59e0b' : '#16a34a');
    }
  }

  function updateVisuals(amps, volts, watts, type = 'ac3', pf = 0.85) {
    document.getElementById('visual-voltage').textContent = volts.toFixed(1) + ' V';
    document.getElementById('visual-current').textContent = amps.toFixed(2) + ' A';
    document.getElementById('visual-power').textContent = watts > 0 ? watts.toFixed(2) + ' W' : '— W';

    const vPct = Math.min((volts / 500) * 100, 100);
    const aPct = Math.min((amps / 50) * 100, 100);
    const wPct = Math.min((watts / 30000) * 100, 100);

    document.getElementById('visual-bar-voltage').style.width = vPct + '%';
    document.getElementById('visual-bar-voltage').parentElement.setAttribute('aria-valuenow', Math.round(vPct));
    document.getElementById('visual-bar-voltage').parentElement.setAttribute('aria-label', 'Voltage level ' + Math.round(vPct) + ' percent');

    document.getElementById('visual-bar-current').style.width = aPct + '%';
    document.getElementById('visual-bar-current').parentElement.setAttribute('aria-valuenow', Math.round(aPct));
    document.getElementById('visual-bar-current').parentElement.setAttribute('aria-label', 'Current level ' + Math.round(aPct) + ' percent');

    document.getElementById('visual-bar-power').style.width = wPct + '%';
    document.getElementById('visual-bar-power').parentElement.setAttribute('aria-valuenow', Math.round(wPct));
    document.getElementById('visual-bar-power').parentElement.setAttribute('aria-label', 'Power level ' + Math.round(wPct) + ' percent');

    document.getElementById('visual-kw').textContent = watts > 0 ? (watts / 1000).toFixed(3) + ' kW' : '—';
    document.getElementById('visual-hp').textContent = watts > 0 ? (watts / 746).toFixed(3) + ' HP' : '—';
    document.getElementById('visual-btu').textContent = watts > 0 ? (watts * 3.412).toFixed(1) + ' BTU' : '—';
    updateCircuitDiagram(amps, volts, watts, type, pf);
  }

  // ===== MAIN CALCULATOR =====


  function calcMain() {
    const type = document.getElementById('main-type').value;
    const amps = parseFloat(document.getElementById('main-amps').value);
    const volts = parseFloat(document.getElementById('main-volts').value);
    const pf = parseFloat(document.getElementById('main-pf').value) || 1;
    const freq = parseFloat(document.getElementById('main-freq') ? document.getElementById('main-freq').value : 50);
    const errorEl = document.getElementById('main-error');
    const resultEl = document.getElementById('main-result');

    errorEl.removeAttribute('role');
    errorEl.style.display = 'none';

    if (!amps || !volts || amps <= 0 || volts <= 0) {
      updateVisuals(amps || 0, volts || 0, 0, type, pf);
      updateMainRules(type, amps || 0, volts || 0, pf, 0);
      resultEl.classList.remove('show');
      updateGauge(0);
      return;
    }

    if (type !== 'dc' && (pf < 0.1 || pf > 1)) {
      errorEl.textContent = 'Power factor must be between 0.1 and 1.0 for AC circuits.';
      errorEl.setAttribute('role', 'alert');
      errorEl.style.display = 'block';
      resultEl.classList.remove('show');
      updateVisuals(amps || 0, volts || 0, 0, type, pf);
      updateMainRules(type, amps || 0, volts || 0, pf, 0);
      updateGauge(0);
      return;
    }

    let watts, va, var_power;

    if (type === 'dc') {
      watts = amps * volts;
      va = watts;
      var_power = 0;
    } else if (type === 'ac1') {
      watts = amps * volts * pf;
      va = amps * volts;
      var_power = Math.sqrt(va * va - watts * watts);
    } else {
      watts = 1.732 * amps * volts * pf;
      va = 1.732 * amps * volts;
      var_power = Math.sqrt(va * va - watts * watts);
    }

    // Auto unit switching
    let displayVal = watts;
    let displayUnit = 'W';
    if (watts >= 1e6) {
      displayVal = watts / 1e6;
      displayUnit = 'MW';
    } else if (watts >= 1e3) {
      displayVal = watts / 1e3;
      displayUnit = 'kW';
    }

    // Calculate additional metrics
    const efficiency = type === 'dc' ? 100 : (pf * 100);
    const btuPerHour = watts * 3.412;
    const horsepower = watts / 745.7;

    document.getElementById('main-watt').textContent = displayVal.toFixed(3);
    document.getElementById('main-watt-unit').innerHTML = `${displayUnit} | <span id="main-va-out">${va.toFixed(2)}</span> VA | PF: <span id="main-pf-out">${(watts / va).toFixed(4)}</span> | kWh/100h: <span id="main-kwh">${(watts * 100 / 1000).toFixed(2)} kWh</span>`;

    // Update detailed results
    document.getElementById('main-va-detail').textContent = va.toFixed(2) + ' VA';
    document.getElementById('main-var-detail').textContent = var_power.toFixed(2) + ' VAR';
    document.getElementById('main-pf-detail').textContent = (watts / va).toFixed(4);
    document.getElementById('main-eff-detail').textContent = efficiency.toFixed(1) + '%';
    document.getElementById('main-btu-detail').textContent = btuPerHour.toFixed(0) + ' BTU/hr';
    document.getElementById('main-hp-detail').textContent = horsepower.toFixed(3) + ' HP';

    resultEl.classList.add('show');
    updateVisuals(amps, volts, watts, type, pf);
    updateMainRules(type, amps, volts, pf, watts);
    updateGauge(watts);
  }

  // Visual gauge for power
  function updateGauge(watts) {
    const arc = document.getElementById('main-gauge-arc');
    const label = document.getElementById('main-gauge-label');
    if (!arc || !label) return;
    // Max 20kW for gauge
    const maxW = 20000;
    const pct = Math.min(watts / maxW, 1);
    // Arc from 20,90 to 160,90 (semi-circle)
    const r = 70, cx = 90, cy = 90;
    const start = Math.PI, end = Math.PI * (1 - pct);
    const x1 = cx - r * Math.cos(start), y1 = cy - r * Math.sin(start);
    const x2 = cx - r * Math.cos(end), y2 = cy - r * Math.sin(end);
    const largeArc = pct > 0.5 ? 1 : 0;
    arc.setAttribute('d', `M20,90 A70,70 0 ${largeArc},1 ${x2},${y2}`);
    arc.setAttribute('stroke', pct < 0.7 ? '#16a34a' : pct < 0.9 ? '#f59e0b' : '#ef4444');
    label.textContent = watts >= 1e6 ? (watts/1e6).toFixed(2)+' MW' : watts >= 1e3 ? (watts/1e3).toFixed(2)+' kW' : watts.toFixed(0)+' W';
  }

  // Copy/export result
  function copyMainResult() {
    const val = document.getElementById('main-watt').textContent;
    const unit = document.getElementById('main-watt-unit').textContent;
    navigator.clipboard.writeText(`Result: ${val} ${unit}`);
    alert('Result copied!');
  }
  window.copyMainResult = copyMainResult;

  function exportMainResult() {
    const val = document.getElementById('main-watt').textContent;
    const unit = document.getElementById('main-watt-unit').textContent;
    const blob = new Blob([`Result: ${val} ${unit}`], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'amps-to-watts-result.txt';
    a.click();
  }
  window.exportMainResult = exportMainResult;

  window.calcMain = calcMain;

  function resetMain() {
    document.getElementById('main-amps').value = '10';
    document.getElementById('main-volts').value = '230';
    document.getElementById('main-pf').value = '0.85';
    document.getElementById('main-type').value = 'ac3';
    document.getElementById('main-result').classList.remove('show');
    document.getElementById('main-error').style.display = 'none';
    togglePFGroup();
    updateVisuals(10, 230, 0);
    calcMain();
  }

  window.resetMain = resetMain;

  function loadDevice(name, watts) {
    document.getElementById('main-amps').value = (watts / 230).toFixed(3);
    document.getElementById('main-volts').value = '230';
    document.getElementById('main-type').value = 'ac1';
    document.getElementById('main-pf').value = '1';
    togglePFGroup();
    calcMain();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.loadDevice = loadDevice;

  // ===== TOOL: AMP HOURS TO WATT HOURS =====

  function calcAmpHours() {
    const a = parseFloat(document.getElementById('ah-amps').value);
    const v = parseFloat(document.getElementById('ah-volts').value);
    const h = parseFloat(document.getElementById('ah-hours').value);
    const eff = parseFloat(document.getElementById('ah-eff').value) / 100;
    const type = document.getElementById('ah-type').value;

    if (!a || !v || !h || a <= 0 || v <= 0 || h <= 0) return;

    let wh = a * v * h * eff;
    if (type === 'ac1') wh *= 0.9;

    document.getElementById('ah-wh').textContent = wh.toFixed(2);
    document.getElementById('ah-kwh').textContent = (wh / 1000).toFixed(4);
    setText('visual-ah', a.toFixed(2) + ' Ah');
    setText('visual-volts', v.toFixed(1) + ' V');
    setText('visual-wh', wh.toFixed(2) + ' Wh');
    setText('battery-capacity', wh.toFixed(0) + ' Wh');
    document.getElementById('ah-result').classList.add('show');
  }

  window.calcAmpHours = calcAmpHours;

  // ===== TOOL: VOLT-AMPS =====

  function calcVA() {
    const a = parseFloat(document.getElementById('va-amps').value);
    const v = parseFloat(document.getElementById('va-volts').value);
    const t = document.getElementById('va-type').value;

    if (!a || !v || a <= 0 || v <= 0) return;

    const va = t === 'ac3' ? 1.732 * a * v : a * v;

    document.getElementById('va-val').textContent = va.toFixed(2);
    document.getElementById('va-watt').textContent = (va * 0.85).toFixed(2);
    setText('visual-amps', a.toFixed(2) + ' A');
    setText('visual-volts', v.toFixed(1) + ' V');
    setText('visual-va', va.toFixed(2) + ' VA');
    setText('diagram-current', a.toFixed(2) + ' A');
    setText('diagram-voltage', v.toFixed(1) + ' V');
    setText('diagram-va', va.toFixed(0) + ' VA');
    document.getElementById('va-result').classList.add('show');
  }

  window.calcVA = calcVA;

  // ===== TOOL: WATT TO AMPS =====

  function calcWattToAmps() {
    const w = parseFloat(document.getElementById('wa-watts').value);
    const v = parseFloat(document.getElementById('wa-volts').value);
    const pf = parseFloat(document.getElementById('wa-pf').value);
    const t = document.getElementById('wa-type').value;

    if (!w || !v || w <= 0 || v <= 0) return;

    let a;
    if (t === 'dc') {
      a = w / v;
    } else if (t === 'ac1') {
      a = w / (v * pf);
    } else {
      a = w / (1.732 * v * pf);
    }

    document.getElementById('wa-amps').textContent = a.toFixed(4);
    document.getElementById('wa-result').classList.add('show');
  }

  window.calcWattToAmps = calcWattToAmps;

  // ===== TOOL: VOLTAGE DROP =====

  function calcVoltageDrop() {
    const a = parseFloat(document.getElementById('vd-amps').value);
    const v = parseFloat(document.getElementById('vd-volts').value);
    const d = parseFloat(document.getElementById('vd-dist').value);
    const g = document.getElementById('vd-gauge').value;
    const m = document.getElementById('vd-material').value;

    if (!a || !v || !d || a <= 0 || v <= 0 || d <= 0) return;

    const resistance = RESISTANCE_VALUES[m][g] || 0.001588;
    const drop = 2 * a * resistance * d;

    document.getElementById('vd-drop').textContent = drop.toFixed(3);
    document.getElementById('vd-pct').textContent = ((drop / v) * 100).toFixed(2);
    document.getElementById('vd-end').textContent = (v - drop).toFixed(1);
    setText('vd-visual-amps', a.toFixed(2) + ' A');
    setText('vd-visual-volts', v.toFixed(1) + ' V');
    setText('vd-visual-drop', drop.toFixed(3) + ' V');
    setText('vd-diagram-drop', drop.toFixed(2) + ' V drop');
    document.getElementById('vd-result').classList.add('show');
  }

  window.calcVoltageDrop = calcVoltageDrop;

  // ===== TOOL: POWER FACTOR =====

  function calcPF() {
    const w = parseFloat(document.getElementById('pf-watts').value);
    const va = parseFloat(document.getElementById('pf-va').value);
    const v = parseFloat(document.getElementById('pf-volts').value);

    if (!w || !va || !v || w <= 0 || va <= 0 || v <= 0) return;

    const pf = w / va;
    const varVal = Math.sqrt(Math.max(0, va * va - w * w));

    document.getElementById('pf-val').textContent = pf.toFixed(4);
    document.getElementById('pf-amps').textContent = (va / v).toFixed(3);
    document.getElementById('pf-var').textContent = varVal.toFixed(2);
    setText('pf-visual-volts', v.toFixed(1) + ' V');
    setText('pf-visual-watts', w.toFixed(0) + ' W');
    setText('pf-visual-va', va.toFixed(0) + ' VA');
    setText('pf-diagram-pf', 'PF = ' + pf.toFixed(3));
    document.getElementById('pf-result').classList.add('show');
  }

  window.calcPF = calcPF;

  // ===== TOOL: WIRE GAUGE =====

  function calcWireGauge() {
    const a = parseFloat(document.getElementById('wg-amps').value);
    const v = parseFloat(document.getElementById('wg-volts').value);
    const temp = parseFloat(document.getElementById('wg-temp').value);
    const inst = document.getElementById('wg-install').value;

    if (!a || !v || a <= 0 || v <= 0) return;

    let derate = 1;
    if (temp > 30) derate *= (1 - (temp - 30) * 0.005);
    if (inst === 'conduit') derate *= 0.8;
    if (inst === 'buried') derate *= 0.7;

    const adjA = a / derate;
    let g;

    if (adjA <= 15) g = '14 AWG';
    else if (adjA <= 20) g = '12 AWG';
    else if (adjA <= 30) g = '10 AWG';
    else if (adjA <= 40) g = '8 AWG';
    else if (adjA <= 55) g = '6 AWG';
    else if (adjA <= 70) g = '4 AWG';
    else g = '2 AWG+';

    document.getElementById('wg-size').textContent = g;
    document.getElementById('wg-maxw').textContent = (a * v).toFixed(0);
    setText('wg-visual-amps', a.toFixed(2) + ' A');
    setText('wg-visual-volts', v.toFixed(1) + ' V');
    setText('wg-visual-size', g);
    setText('wg-diagram-size', g);
    document.getElementById('wg-result').classList.add('show');
  }

  window.calcWireGauge = calcWireGauge;

  // ===== LANGUAGE SWITCHER =====

  function switchLanguage(lang) {
    const code = lang || 'en';
    loadTranslationJson(code).then(() => applyLanguage(code));
  }

  window.switchLanguage = switchLanguage;

  // ===== PREMIUM WATTS TO AMPS CALCULATOR =====

  function togglePremiumPFGroup() {
    const type = document.getElementById('premium-type').value;
    const pfGroup = document.getElementById('premium-pf-group');
    const freqGroup = document.getElementById('premium-freq-group');

    if (type === 'dc') {
      pfGroup.style.display = 'none';
      freqGroup.style.display = 'none';
    } else {
      pfGroup.style.display = 'block';
      freqGroup.style.display = 'block';
    }
  }

  window.togglePremiumPFGroup = togglePremiumPFGroup;

  function calcPremiumWattsToAmps() {
    const type = document.getElementById('premium-type').value;
    const watts = parseFloat(document.getElementById('premium-watts').value);
    const volts = parseFloat(document.getElementById('premium-volts').value);
    const pf = parseFloat(document.getElementById('premium-pf').value) || 1;
    const efficiency = parseFloat(document.getElementById('premium-efficiency').value) / 100;
    const errorEl = document.getElementById('premium-error');
    const resultEl = document.getElementById('premium-result');

    errorEl.removeAttribute('role');
    errorEl.style.display = 'none';

    if (!watts || !volts || !efficiency || watts <= 0 || volts <= 0 || efficiency <= 0 || efficiency > 1) {
      updatePremiumCircuitVisuals(0, volts || 0, 0, type, pf, efficiency);
      updatePremiumRules(type, watts || 0, volts || 0, pf, efficiency, 0);
      resultEl.classList.remove('show');
      return;
    }

    if (type !== 'dc' && (pf < 0.1 || pf > 1)) {
      errorEl.textContent = 'Power factor must be between 0.1 and 1.0 for AC circuits.';
      errorEl.setAttribute('role', 'alert');
      errorEl.style.display = 'block';
      resultEl.classList.remove('show');
      updatePremiumRules(type, watts || 0, volts || 0, pf, efficiency, 0);
      return;
    }

    // Adjust watts for efficiency
    const adjustedWatts = watts / efficiency;

    let apparentAmps, realAmps;

    if (type === 'dc') {
      realAmps = adjustedWatts / volts;
      apparentAmps = realAmps;
    } else if (type === 'ac1') {
      realAmps = adjustedWatts / (volts * pf);
      apparentAmps = adjustedWatts / volts;
    } else {
      realAmps = adjustedWatts / (1.732 * volts * pf);
      apparentAmps = adjustedWatts / (1.732 * volts);
    }

    // Calculate additional premium metrics
    const voltageDrop = realAmps * 0.02; // Estimated 2% voltage drop
    const breakerSize = Math.ceil(realAmps * 1.25); // 125% of load
    const wireGauge = getRecommendedWireGauge(realAmps, volts);

    document.getElementById('premium-amps').textContent = realAmps.toFixed(3);
    document.getElementById('premium-amps-unit').innerHTML = `Amperes (A) | <span id="premium-adjusted-watts">${adjustedWatts.toFixed(2)}</span> W adjusted | Efficiency: <span id="premium-eff-out">${(efficiency * 100).toFixed(1)}</span>%`;

    // Update premium details
    document.getElementById('premium-apparent-amps').textContent = apparentAmps.toFixed(3) + ' A';
    document.getElementById('premium-real-amps').textContent = realAmps.toFixed(3) + ' A';
    document.getElementById('premium-pf-detail').textContent = pf.toFixed(3);
    document.getElementById('premium-voltage-drop').textContent = voltageDrop.toFixed(2) + ' V';
    document.getElementById('premium-breaker-size').textContent = breakerSize + ' A';
    document.getElementById('premium-wire-gauge').textContent = wireGauge;

    resultEl.classList.add('show');
    updatePremiumCircuitVisuals(watts, volts, realAmps, type, pf, efficiency);
    updatePremiumRules(type, watts, volts, pf, efficiency, realAmps);
  }

  function getRecommendedWireGauge(amps, volts) {
    // Simple wire gauge recommendation based on current
    if (amps <= 10) return '14 AWG';
    if (amps <= 15) return '12 AWG';
    if (amps <= 20) return '10 AWG';
    if (amps <= 30) return '8 AWG';
    if (amps <= 40) return '6 AWG';
    if (amps <= 55) return '4 AWG';
    if (amps <= 70) return '2 AWG';
    if (amps <= 85) return '1 AWG';
    if (amps <= 95) return '1/0 AWG';
    if (amps <= 110) return '2/0 AWG';
    if (amps <= 125) return '3/0 AWG';
    if (amps <= 145) return '4/0 AWG';
    return '250+ MCM';
  }

  function updatePremiumCircuitVisuals(watts, volts, amps, type, pf, efficiency) {
    const safeWatts = Number.isFinite(watts) && watts > 0 ? watts : 0;
    const safeVolts = Number.isFinite(volts) && volts > 0 ? volts : 0;
    const safeAmps = Number.isFinite(amps) && amps > 0 ? amps : 0;
    const safeEfficiency = Number.isFinite(efficiency) && efficiency > 0 ? efficiency : 0;
    const loadPct = Math.min(safeAmps / 50, 1);
    const powerPct = Math.min(safeWatts / 30000, 1);
    const status = safeWatts === 0 ? 'Waiting for input' : loadPct < 0.7 ? 'Normal load' : loadPct < 0.9 ? 'High load' : 'Overload risk';
    const statusClass = safeWatts === 0 ? 'idle' : loadPct < 0.7 ? 'normal' : loadPct < 0.9 ? 'warning' : 'danger';
    const flowSpeed = Math.max(0.65, 3.2 - (Math.max(loadPct, powerPct) * 2.2));
    const wireWidth = (5 + loadPct * 6).toFixed(2);
    const card = document.getElementById('premium-circuit-diagram-card');

    setText('premium-visual-power', safeWatts ? safeWatts.toFixed(0) + ' W' : '- W');
    setText('premium-visual-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');
    setText('premium-metric-voltage', safeVolts ? safeVolts + ' V' : '- V');
    setText('premium-metric-pf', type === 'dc' ? '1.0' : pf.toFixed(3));
    setText('premium-metric-phase', type === 'dc' ? 'DC' : type === 'ac1' ? '1-Ph' : '3-Ph');
    setText('premium-metric-efficiency', (safeEfficiency * 100).toFixed(1) + '%');

    if (card) {
      card.classList.remove('idle', 'normal', 'warning', 'danger');
      card.classList.add(statusClass);
      card.style.setProperty('--flow-speed', flowSpeed.toFixed(2) + 's');
      card.style.setProperty('--wire-width', wireWidth);
      card.style.setProperty('--house-glow', (0.25 + loadPct * 0.55).toFixed(2));
    }

    setText('premium-status', status);
    setText('premium-diagram-grid-voltage', safeVolts ? safeVolts.toFixed(1) + ' V' : '- V');
    setText('premium-diagram-current', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');
    setText('premium-diagram-phase', getCircuitLabel(type));
    setText('premium-diagram-load', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');
    setText('premium-diagram-power', safeAmps ? safeAmps.toFixed(2) + ' A' : '- A');

    const breaker = document.getElementById('premium-diagram-breaker-switch');
    if (breaker) {
      breaker.setAttribute('fill', statusClass === 'danger' ? '#ef4444' : statusClass === 'warning' ? '#b45309' : '#15803d');
    }
  }

  function updatePremiumVisuals(watts, volts, amps, type, pf, efficiency) {
    updatePremiumCircuitVisuals(watts, volts, amps, type, pf, efficiency);
  }

  function copyPremiumResult() {
    const val = document.getElementById('premium-amps').textContent;
    const unit = document.getElementById('premium-amps-unit').textContent;
    navigator.clipboard.writeText(`Premium Result: ${val} ${unit}`);
    alert('Premium result copied!');
  }

  function exportPremiumResult() {
    const val = document.getElementById('premium-amps').textContent;
    const unit = document.getElementById('premium-amps-unit').textContent;
    const details = Array.from(document.querySelectorAll('.premium-details .detail-value')).map(el => el.textContent).join('\n');
    const blob = new Blob([`Premium Result: ${val} ${unit}\n\nDetails:\n${details}`], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'premium-watts-to-amps-result.txt';
    a.click();
  }

  function resetPremium() {
    document.getElementById('premium-watts').value = '3000';
    document.getElementById('premium-volts').value = '230';
    document.getElementById('premium-pf').value = '0.85';
    document.getElementById('premium-efficiency').value = '95';
    document.getElementById('premium-type').value = 'ac3';
    document.getElementById('premium-result').classList.remove('show');
    document.getElementById('premium-error').style.display = 'none';
    togglePremiumPFGroup();
    updatePremiumCircuitVisuals(0, 230, 0, 'ac3', 0.85, 0.95);
  }

  window.calcPremiumWattsToAmps = calcPremiumWattsToAmps;
  window.copyPremiumResult = copyPremiumResult;
  window.exportPremiumResult = exportPremiumResult;
  window.resetPremium = resetPremium;

  // ===== INITIALIZATION ON DOM READY =====

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// Premium language selector and on-demand translation bridge
(function() {
  const languages = [
    ['en', 'English'],
    ['hi', 'Hindi'],
    ['es', 'Spanish'],
    ['ru', 'Russian'],
    ['fr', 'French'],
    ['de', 'German'],
    ['it', 'Italian'],
    ['pt', 'Portuguese'],
    ['bn', 'Bengali'],
    ['ja', 'Japanese'],
    ['ko', 'Korean'],
    ['ms', 'Malay'],
    ['pl', 'Polish'],
    ['id', 'Indonesian'],
    ['ar', 'Arabic'],
    ['bg', 'Bulgarian'],
    ['tr', 'Turkish'],
    ['sv', 'Swedish'],
    ['ur', 'Urdu']
  ];

  function getSavedLanguage() {
    return localStorage.getItem('siteLanguage') || 'en';
  }

  function getLanguageName(code) {
    const match = languages.find((item) => item[0] === code);
    return match ? match[1] : 'English';
  }

  function applyDirection(code) {
    document.documentElement.dir = ['ar', 'ur'].includes(code) ? 'rtl' : 'ltr';
  }

  function setLanguage(code, shouldReload) {
    localStorage.setItem('siteLanguage', code);
    localStorage.setItem('preferredLanguage', code);
    applyDirection(code);
    if (window.switchLanguage) window.switchLanguage(code);
    document.querySelectorAll('.premium-language-option').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.lang === code);
      button.setAttribute('aria-pressed', String(button.dataset.lang === code));
    });
    const label = document.querySelector('.premium-language-current');
    if (label) label.textContent = getLanguageName(code);
  }

  function initPremiumLanguageSelector() {
    const headerInner = document.querySelector('.premium-header-inner');
    const menuButton = document.querySelector('.premium-menu-button');
    if (!headerInner || document.querySelector('.premium-language-shell')) return;

    const savedLanguage = getSavedLanguage();
    const shell = document.createElement('div');
    shell.className = 'premium-language-shell';
    shell.innerHTML = `
      <button class="premium-language-toggle" type="button" aria-expanded="false" aria-haspopup="true" aria-label="Choose website language">
        <span class="premium-language-icon" aria-hidden="true">Aa</span>
        <span class="premium-language-current">${getLanguageName(savedLanguage)}</span>
      </button>
      <div class="premium-language-menu" role="menu" aria-label="Website language options">
        <div class="premium-language-title">Choose Language</div>
        <div class="premium-language-grid">
          ${languages.map(([code, name]) => `<button class="premium-language-option${code === savedLanguage ? ' is-active' : ''}" type="button" data-lang="${code}" role="menuitemradio" aria-pressed="${code === savedLanguage}">${name}</button>`).join('')}
        </div>
      </div>
    `;

    if (menuButton) {
      headerInner.insertBefore(shell, menuButton);
    } else {
      headerInner.appendChild(shell);
    }

    const toggle = shell.querySelector('.premium-language-toggle');
    const panel = shell.querySelector('.premium-language-menu');

    toggle.addEventListener('click', () => {
      const isOpen = shell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    shell.querySelectorAll('.premium-language-option').forEach((button) => {
      button.addEventListener('click', () => {
        setLanguage(button.dataset.lang, true);
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!shell.contains(event.target)) {
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        shell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    panel.addEventListener('click', (event) => event.stopPropagation());
    applyDirection(savedLanguage);
    if (window.switchLanguage) window.switchLanguage(savedLanguage);
  }

  function initPremiumFooterLanguages() {
    const footerInner = document.querySelector('.premium-footer-inner');
    if (!footerInner || document.querySelector('.premium-footer-language')) return;

    const savedLanguage = getSavedLanguage();
    const section = document.createElement('section');
    section.className = 'premium-footer-language';
    section.setAttribute('aria-label', 'Website language options');
    section.innerHTML = `
      <div class="footer-section-heading">Languages</div>
      <p>Choose a language for the website.</p>
      <div class="premium-footer-language-grid">
        ${languages.map(([code, name]) => `<button class="premium-language-option${code === savedLanguage ? ' is-active' : ''}" type="button" data-lang="${code}" aria-pressed="${code === savedLanguage}">${name}</button>`).join('')}
      </div>
    `;
    footerInner.appendChild(section);

    section.querySelectorAll('.premium-language-option').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang, true));
    });
  }

  function initPremiumBackToTop() {
    if (document.querySelector('.premium-back-to-top')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'premium-back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<span aria-hidden="true">^</span><strong>Top</strong>';
    document.body.appendChild(button);

    const updateButton = () => {
      button.classList.toggle('is-visible', window.scrollY > 420);
    };

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();
  }

  function initPremiumSocialShare() {
    const footerInner = document.querySelector('.premium-footer-inner');
    if (!footerInner || document.querySelector('.premium-social-share')) return;

    const pageUrl = window.location.href.split('#')[0];
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(document.title || 'Ampstowatt calculator');
    const section = document.createElement('section');
    section.className = 'premium-social-share';
    section.setAttribute('aria-label', 'Share this page');
    section.innerHTML = `
      <div class="footer-section-heading">Share</div>
      <p>Share this calculator page.</p>
      <div class="premium-social-share-grid">
        <a class="premium-social-share-button" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><span>FB</span>Facebook</a>
        <a class="premium-social-share-button" href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><span>X</span>Twitter</a>
        <button class="premium-social-share-button premium-share-copy" type="button" data-share-copy aria-label="Copy link for Instagram"><span>IG</span>Instagram</button>
      </div>
    `;
    footerInner.appendChild(section);

    const copyButton = section.querySelector('[data-share-copy]');
    if (!copyButton) return;
    copyButton.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(pageUrl);
        }
        copyButton.classList.add('is-copied');
        copyButton.lastChild.textContent = 'Copied';
        window.setTimeout(() => {
          copyButton.classList.remove('is-copied');
          copyButton.lastChild.textContent = 'Instagram';
        }, 1800);
      } catch (error) {
        copyButton.lastChild.textContent = 'Copy link';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPremiumLanguageSelector();
      initPremiumFooterLanguages();
      initPremiumBackToTop();
      initPremiumSocialShare();
    });
  } else {
    initPremiumLanguageSelector();
    initPremiumFooterLanguages();
    initPremiumBackToTop();
    initPremiumSocialShare();
  }
})();

// Premium universal navigation controller
(function() {
  function initPremiumNavigation() {
    const button = document.querySelector('.premium-menu-button');
    const nav = document.querySelector('.premium-nav');
    if (!button || !nav) return;

    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !button.contains(event.target)) {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    document.querySelectorAll('.premium-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumNavigation);
  } else {
    initPremiumNavigation();
  }
})();
