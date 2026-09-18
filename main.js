  /* ------------------ AOS ------------------ */
  AOS.init({ duration: 800, once: true, offset: 80 });

  /* ------------------ Data ------------------ */
  const REQUEST_TYPES = {
    ar: ['شراكة استراتيجية', 'استفسار عام', 'فرصة عمل', 'مورد / متعاون'],
    en: ['Strategic partnership', 'General inquiry', 'Job opportunity', 'Supplier / collaborator']
  };
  const PARTNER_SECTORS = {
    ar: ['الضيافة والمطاعم', 'السياحة والنزل', 'النقل واللوجستيك', 'التراث والزراعة', 'أخرى'],
    en: ['Hospitality & dining', 'Tourism & lodges', 'Transport & logistics', 'Heritage & agriculture', 'Other']
  };
  const PARTNER_TYPES = {
    ar: ['شراكة تجارية', 'شراكة تشغيلية', 'شراكة استثمارية', 'مورد خدمات', 'أخرى'],
    en: ['Commercial partnership', 'Operational partnership', 'Investment partnership', 'Service provider', 'Other']
  };

  function populateSelect(id, data, lang) {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = '';
    data[lang].forEach(t => {
      const o = document.createElement('option');
      o.textContent = t;
      sel.appendChild(o);
    });
  }

  /* ------------------ Language ------------------ */
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const html = document.documentElement;

   function setLang(lang) {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-lang]').forEach(el => {
      if (el.getAttribute('data-lang') === lang) {
        el.removeAttribute('hidden');
        el.style.display = ''; // يرجع للـ display الافتراضي من الـ class
      } else {
        el.setAttribute('hidden', '');
        el.style.display = 'none'; // يتجاوز أي display من الـ class
      }
    });

    document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
      el.placeholder = lang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn;
    });

    populateSelect('requestType', REQUEST_TYPES, lang);
    populateSelect('partnerSectorSelect', PARTNER_SECTORS, lang);
    populateSelect('partnerTypeSelect', PARTNER_TYPES, lang);

    langLabel.textContent = lang === 'ar' ? 'EN' : 'ع';

    const ci = document.getElementById('chatInput');
    const cie = document.getElementById('chatInputEn');
    if (ci && cie) {
      ci.placeholder = lang === 'ar' ? 'اكتب رسالتك...' : '';
      cie.placeholder = lang === 'en' ? 'Type your message...' : '';
    }

    const ltAr = document.getElementById('legalTitleAr');
    const ltEn = document.getElementById('legalTitleEn');
    if (ltAr && ltEn) {
      if (lang === 'ar') { ltAr.removeAttribute('hidden'); ltAr.style.display=''; ltEn.setAttribute('hidden',''); ltEn.style.display='none'; }
      else { ltAr.setAttribute('hidden',''); ltAr.style.display='none'; ltEn.removeAttribute('hidden'); ltEn.style.display=''; }
    }

    localStorage.setItem('sakan-lang', lang);
  }
  const savedLang = localStorage.getItem('sakan-lang') || 'ar';
  setLang(savedLang);

  langToggle.addEventListener('click', () => {
    const cur = html.getAttribute('lang');
    setLang(cur === 'ar' ? 'en' : 'ar');
    renderWelcome();
  });

  /* ------------------ Navbar ------------------ */
  const nav = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    if (window.scrollY > 500) backTop.style.display = 'flex';
    else backTop.style.display = 'none';
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ------------------ Mobile menu ------------------ */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

  /* ------------------ FAQ ------------------ */
  document.querySelectorAll('#faqList .faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('#faqList .faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ------------------ Contact form ------------------ */
  document.getElementById('mainContactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = html.getAttribute('lang');
    alert(lang === 'ar'
      ? 'تم استلام رسالتك، سنتواصل معك قريبًا بإذن الله.'
      : 'Your message has been received. We will contact you soon.');
    e.target.reset();
    populateSelect('requestType', REQUEST_TYPES, lang);
  });

  /* ------------------ Newsletter form ------------------ */
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = html.getAttribute('lang');
    alert(lang === 'ar'
      ? 'تم اشتراكك في النشرة البريدية بنجاح، شكرًا لك!'
      : 'You have successfully subscribed to our newsletter. Thank you!');
    e.target.reset();
  });

  /* ------------------ Partner Modal ------------------ */
  const partnerModal = document.getElementById('partnerModal');
  const partnerModalOverlay = document.getElementById('partnerModalOverlay');
  const openPartnerBtn = document.getElementById('openPartnerModal');
  const closePartnerBtn = document.getElementById('closePartnerModal');

  function openPartnerModal() {
    partnerModalOverlay.classList.add('open');
    partnerModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePartnerModal() {
    partnerModalOverlay.classList.remove('open');
    partnerModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openPartnerBtn?.addEventListener('click', openPartnerModal);
  closePartnerBtn?.addEventListener('click', closePartnerModal);
  partnerModalOverlay?.addEventListener('click', closePartnerModal);

  document.getElementById('partnerModalForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = html.getAttribute('lang');
    alert(lang === 'ar'
      ? 'تم استلام طلب الشراكة بنجاح، سيتواصل معك فريق تطوير الأعمال خلال 24-48 ساعة.'
      : 'Your partnership request has been received. Our business development team will contact you within 24-48 hours.');
    e.target.reset();
    populateSelect('partnerSectorSelect', PARTNER_SECTORS, lang);
    populateSelect('partnerTypeSelect', PARTNER_TYPES, lang);
    closePartnerModal();
  });

  /* ------------------ Legal Modal ------------------ */
  const legalModal = document.getElementById('legalModal');
  const legalModalOverlay = document.getElementById('legalModalOverlay');
  const closeLegalBtn = document.getElementById('closeLegalModal');
  const legalContent = document.getElementById('legalContent');
  const legalIcon = document.getElementById('legalIcon');

  const LEGAL_DATA = {
    privacy: {
      ar: {
        title: 'سياسة الخصوصية',
        icon: 'fa-shield-halved',
        content: `
          <h4>مقدمة</h4>
          <p>تلتزم <strong>مجموعة سكون</strong> بحماية خصوصيتك والحفاظ على سرية بياناتك الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي تقدمها عند زيارتك لموقعنا أو تواصلك معنا.</p>
          <h4>المعلومات التي نجمعها</h4>
          <ul>
            <li>الاسم الكامل ومعلومات الاتصال (البريد الإلكتروني، رقم الجوال).</li>
            <li>اسم الشركة أو الجهة التي تمثلها.</li>
            <li>محتوى رسائلك واستفساراتك.</li>
            <li>بيانات تقنية عن جهازك ومتصفحك لأغراض تحسين الخدمة.</li>
          </ul>
          <h4>كيف نستخدم معلوماتك</h4>
          <ul>
            <li>الرد على استفساراتك وطلبات الشراكة.</li>
            <li>تحسين خدماتنا ومنظومتنا التشغيلية.</li>
            <li>إرسال تحديثات ومعلومات عن مشاريعنا (بعد موافقتك).</li>
            <li>الامتثال للمتطلبات القانونية والتنظيمية.</li>
          </ul>
          <h4>حماية البيانات</h4>
          <p>نطبق إجراءات أمنية تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفشاء. لا نشارك بياناتك مع أطراف ثالثة إلا بموجب التزامات قانونية أو بموافقتك الصريحة.</p>
          <h4>حقوقك</h4>
          <ul>
            <li>الحق في الوصول إلى بياناتك الشخصية.</li>
            <li>الحق في تصحيح أو تحديث بياناتك.</li>
            <li>الحق في حذف بياناتك وفقًا للأنظمة المعمول بها.</li>
            <li>الحق في الاعتراض على معالجة بياناتك.</li>
          </ul>
          <h4>التواصل معنا</h4>
          <p>لأي استفسار بشأن هذه السياسة، يمكنك التواصل معنا عبر البريد الإلكتروني: <strong>info@sakangroup.sa</strong></p>
        `
      },
      en: {
        title: 'Privacy Policy',
        icon: 'fa-shield-halved',
        content: `
          <h4>Introduction</h4>
          <p><strong>Sokon Group</strong> is committed to protecting your privacy and maintaining the confidentiality of your personal data. This policy explains how we collect, use, and protect the information you provide when visiting our website or contacting us.</p>
          <h4>Information We Collect</h4>
          <ul>
            <li>Full name and contact information (email, phone).</li>
            <li>Company or entity name you represent.</li>
            <li>Content of your messages and inquiries.</li>
            <li>Technical data about your device and browser for service improvement.</li>
          </ul>
          <h4>How We Use Your Information</h4>
          <ul>
            <li>Responding to your inquiries and partnership requests.</li>
            <li>Improving our services and operational ecosystem.</li>
            <li>Sending updates and information about our projects (with your consent).</li>
            <li>Complying with legal and regulatory requirements.</li>
          </ul>
          <h4>Data Protection</h4>
          <p>We apply appropriate technical and organizational security measures to protect your data from unauthorized access, modification, or disclosure. We do not share your data with third parties except under legal obligations or with your explicit consent.</p>
          <h4>Your Rights</h4>
          <ul>
            <li>The right to access your personal data.</li>
            <li>The right to correct or update your data.</li>
            <li>The right to delete your data in accordance with applicable regulations.</li>
            <li>The right to object to the processing of your data.</li>
          </ul>
          <h4>Contact Us</h4>
          <p>For any inquiries regarding this policy, you can contact us via email: <strong>info@sakangroup.sa</strong></p>
        `
      }
    },
    terms: {
      ar: {
        title: 'الشروط والأحكام',
        icon: 'fa-file-contract',
        content: `
          <h4>قبول الشروط</h4>
          <p>باستخدامك لموقع <strong>مجموعة سكون</strong>، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام الموقع.</p>
          <h4>استخدام الموقع</h4>
          <ul>
            <li>يُمنع استخدام الموقع لأي أغراض غير قانونية أو غير مصرح بها.</li>
            <li>يُمنع محاولة الوصول غير المصرح به إلى أنظمة الموقع أو بيانات المستخدمين.</li>
            <li>يُمنع نسخ أو إعادة نشر محتوى الموقع دون إذن كتابي مسبق.</li>
          </ul>
          <h4>الملكية الفكرية</h4>
          <p>جميع المحتويات المعروضة على الموقع — بما في ذلك النصوص، الشعارات، التصاميم، والصور — هي ملك لـ <strong>مجموعة سكون</strong> أو مرخصة لها، ومحمية بموجب أنظمة الملكية الفكرية.</p>
          <h4>الشراكات والتعاقدات</h4>
          <p>تقديم طلب شراكة عبر الموقع لا يُعد التزامًا قانونيًا من أي طرف. تخضع جميع الشراكات لاتفاقيات رسمية منفصلة يتم توقيعها بين الأطراف المعنية.</p>
          <h4>حدود المسؤولية</h4>
          <p>نبذل قصارى جهدنا لضمان دقة المعلومات المعروضة، لكننا لا نتحمل أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الاعتماد على محتواه.</p>
          <h4>التعديلات</h4>
          <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. تصبح التعديلات سارية فور نشرها على الموقع. استمرارك في استخدام الموقع بعد النشر يُعد موافقة ضمنية على التعديلات.</p>
          <h4>القانون المطبق</h4>
          <p>تخضع هذه الشروط وتُفسر وفقًا لأنظمة المملكة العربية السعودية، وتختص محاكمها بالنظر في أي نزاع ينشأ عنها.</p>
        `
      },
      en: {
        title: 'Terms & Conditions',
        icon: 'fa-file-contract',
        content: `
          <h4>Acceptance of Terms</h4>
          <p>By using the <strong>Sokon Group</strong> website, you agree to comply with these terms and conditions. If you do not agree with any part of them, please do not use the site.</p>
          <h4>Website Use</h4>
          <ul>
            <li>Using the site for any illegal or unauthorized purpose is prohibited.</li>
            <li>Attempting unauthorized access to site systems or user data is prohibited.</li>
            <li>Copying or republishing site content without prior written permission is prohibited.</li>
          </ul>
          <h4>Intellectual Property</h4>
          <p>All content displayed on the site — including texts, logos, designs, and images — is the property of <strong>Sokon Group</strong> or licensed to it, and is protected under intellectual property regulations.</p>
          <h4>Partnerships & Contracts</h4>
          <p>Submitting a partnership request through the site does not constitute a legal obligation by any party. All partnerships are subject to separate formal agreements signed between the relevant parties.</p>
          <h4>Limitation of Liability</h4>
          <p>We make every effort to ensure the accuracy of the information displayed, but we assume no responsibility for any direct or indirect damages resulting from the use of the site or reliance on its content.</p>
          <h4>Amendments</h4>
          <p>We reserve the right to modify these terms at any time. Amendments become effective upon publication on the site. Your continued use of the site after publication constitutes implicit acceptance of the amendments.</p>
          <h4>Governing Law</h4>
          <p>These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, and its courts have jurisdiction over any disputes arising from them.</p>
        `
      }
    },
    cookies: {
      ar: {
        title: 'سياسة ملفات تعريف الارتباط',
        icon: 'fa-cookie-bite',
        content: `
          <h4>ما هي ملفات تعريف الارتباط؟</h4>
          <p>ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُخزَّن على جهازك عند زيارة موقعنا، وتساعدنا على تحسين تجربتك وتذكّر تفضيلاتك.</p>
          <h4>كيف نستخدمها</h4>
          <ul>
            <li><strong>ملفات ضرورية:</strong> لضمان عمل الموقع بشكل صحيح.</li>
            <li><strong>ملفات الأداء:</strong> لفهم كيفية استخدام الزوار للموقع وتحسينه.</li>
            <li><strong>ملفات التفضيلات:</strong> لتذكر لغتك المفضلة وإعداداتك.</li>
          </ul>
          <h4>التحكم في ملفات تعريف الارتباط</h4>
          <p>يمكنك التحكم في ملفات تعريف الارتباط أو حذفها من خلال إعدادات متصفحك. يرجى ملاحظة أن تعطيل بعض الملفات قد يؤثر على تجربتك في الموقع.</p>
          <h4>ملفات الطرف الثالث</h4>
          <p>قد يستخدم موقعنا خدمات طرف ثالث (مثل Google Fonts و CDN) التي قد تضع ملفات تعريف ارتباط خاصة بها. لا نتحكم في هذه الملفات وننصح بمراجعة سياسات الخصوصية لتلك الخدمات.</p>
          <h4>الموافقة</h4>
          <p>باستمرارك في استخدام موقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط وفقًا لهذه السياسة.</p>
        `
      },
      en: {
        title: 'Cookies Policy',
        icon: 'fa-cookie-bite',
        content: `
          <h4>What Are Cookies?</h4>
          <p>Cookies are small text files stored on your device when you visit our site. They help us improve your experience and remember your preferences.</p>
          <h4>How We Use Them</h4>
          <ul>
            <li><strong>Essential cookies:</strong> to ensure the site functions correctly.</li>
            <li><strong>Performance cookies:</strong> to understand how visitors use the site and improve it.</li>
            <li><strong>Preference cookies:</strong> to remember your preferred language and settings.</li>
          </ul>
          <h4>Controlling Cookies</h4>
          <p>You can control or delete cookies through your browser settings. Please note that disabling some cookies may affect your experience on the site.</p>
          <h4>Third-Party Cookies</h4>
          <p>Our site may use third-party services (such as Google Fonts and CDNs) that may set their own cookies. We do not control these cookies and recommend reviewing the privacy policies of those services.</p>
          <h4>Consent</h4>
          <p>By continuing to use our site, you consent to the use of cookies in accordance with this policy.</p>
        `
      }
    }
  };

  function openLegalModal(type) {
    const lang = html.getAttribute('lang') || 'ar';
    const data = LEGAL_DATA[type][lang];
    legalContent.innerHTML = data.content;
    legalIcon.className = 'fa-solid ' + data.icon;

    // Update titles
    const ltAr = document.getElementById('legalTitleAr');
    const ltEn = document.getElementById('legalTitleEn');
    const titles = { privacy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' }, terms: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' }, cookies: { ar: 'سياسة ملفات تعريف الارتباط', en: 'Cookies Policy' } };
    ltAr.textContent = titles[type].ar;
    ltEn.textContent = titles[type].en;
    if (lang === 'ar') { ltAr.removeAttribute('hidden'); ltEn.setAttribute('hidden',''); }
    else { ltAr.setAttribute('hidden',''); ltEn.removeAttribute('hidden'); }

    legalModalOverlay.classList.add('open');
    legalModal.classList.add('open');
    legalModal.querySelector('.modal-box') || (legalModal.scrollTop = 0);
    document.body.style.overflow = 'hidden';
  }
  function closeLegalModal() {
    legalModalOverlay.classList.remove('open');
    legalModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeLegalBtn?.addEventListener('click', closeLegalModal);
  legalModalOverlay?.addEventListener('click', closeLegalModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (partnerModal.classList.contains('open')) closePartnerModal();
      if (legalModal.classList.contains('open')) closeLegalModal();
    }
  });

  /* ------------------ Stats Counter ------------------ */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        let count = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = '+' + count;
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============================================================
     CHATBOT
     ============================================================ */
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotPanel  = document.getElementById('chatbot-panel');
  const chatClose     = document.getElementById('chatClose');
  const chatBody      = document.getElementById('chatBody');
  const chatInput     = document.getElementById('chatInput');
  const chatInputEn   = document.getElementById('chatInputEn');
  const chatSend      = document.getElementById('chatSend');

  function getLang() { return html.getAttribute('lang') || 'ar'; }

  function fmtTime() {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  function appendMsg(text, who = 'bot', options = {}) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    const time = options.noTime ? '' : `<span class="chat-time" dir="ltr">${fmtTime()}</span>`;
    div.innerHTML = text + time;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
    return div;
  }

  function showTyping() {
    if (document.getElementById('typingIndicator')) return;
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.id = 'typingIndicator';
    div.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  const KB = {
    sectors: {
      ar: 'تضم مجموعة سكون <b>8 قطاعات</b> رئيسية:<br>🍽️ المطاعم والكافيهات<br>🛋️ الديوانيات<br>🏡 النزل الريفية<br>🌾 المزارع<br>🏛️ البيوت الأثرية<br>🚌 المواصلات<br>🚚 اللوجستيك<br>🏖️ السياحة<br><br>وتُضاف كيانات جديدة باستمرار.',
      en: 'Sokon Group includes <b>8 core sectors</b>:<br>🍽️ Restaurants & Cafés<br>🛋️ Diwaniyas<br>🏡 Countryside Lodges<br>🌾 Farms<br>🏛️ Heritage Houses<br>🚌 Transport<br>🚚 Logistics<br>🏖️ Tourism<br><br>More entities are being added continuously.'
    },
    partners: {
      ar: 'لدينا تعاونات قائمة مع:<br>🏛️ <b>إمارة منطقة جازان</b><br>📊 <b>المكتب الاستراتيجي لتطوير منطقة جازان</b><br>✈️ <b>عالم السفر للسياحة</b><br><br>وهناك شراكات جديدة قيد الدراسة.',
      en: 'We currently collaborate with:<br>🏛️ <b>Jazan Emirate</b><br>📊 <b>Strategic Office for Jazan Development</b><br>✈️ <b>Alam Al Safar Tourism</b><br><br>New partnerships are under consideration.'
    },
    contact: {
      ar: 'يسعدنا تواصلك 🌿<br>📧 <b>info@sakangroup.sa</b><br>📞 <b>+966 5X XXX XXXX</b><br>📍 منطقة جازان، السعودية<br><br>أو عبّئ نموذج التواصل أسفل الصفحة.',
      en: 'We\'d love to hear from you 🌿<br>📧 <b>info@sakangroup.sa</b><br>📞 <b>+966 5X XXX XXXX</b><br>📍 Jazan Region, Saudi Arabia<br><br>Or fill out the contact form below.'
    },
    partnership: {
      ar: 'ممتاز! 🤝<br>للتقدم بطلب شراكة:<br>1️⃣ اضغط على زر «شريك استراتيجي» في الأعلى<br>2️⃣ أو عبّئ نموذج التواصل<br>3️⃣ اختر «شراكة استراتيجية»<br><br>سيتواصل معك فريق تطوير الأعمال خلال 24-48 ساعة.',
      en: 'Great! 🤝<br>To submit a partnership request:<br>1️⃣ Click "Partner with us" at the top<br>2️⃣ Or fill out the contact form<br>3️⃣ Choose "Strategic partnership"<br><br>Our business development team will contact you within 24-48 hours.'
    },
    about: {
      ar: 'مجموعة سكون منظومة مؤسسية متكاملة تضم عدة كيانات وقطاعات، تعمل على تطوير وإدارة مشاريع نوعية في منطقة جازان، مع بناء شراكات استراتيجية فاعلة مع القطاعين العام والخاص.',
      en: 'Sokon Group is an integrated institutional ecosystem of entities and sectors, developing and managing quality projects in Jazan, alongside effective strategic partnerships with public and private sectors.'
    },
    careers: {
      ar: 'نرحب بالكفاءات! 🌟<br>أرسل سيرتك الذاتية عبر نموذج التواصل واختر «فرصة عمل»، وسنعود إليك عند توفر الشاغر المناسب.',
      en: 'We welcome talent! 🌟<br>Send your CV via the contact form and choose "Job opportunity" — we\'ll get back to you when a suitable role opens.'
    },
    vision: {
      ar: 'رؤيتنا: أن نكون <b>منظومة رائدة</b> في تنمية وتطوير المشاريع النوعية بمنطقة جازان، مع أثر اقتصادي واجتماعي مستدام.',
      en: 'Our vision: to be a <b>leading ecosystem</b> developing quality projects in Jazan, with sustainable economic and social impact.'
    },
    hours: {
      ar: '⏰ أوقات العمل:<br>الأحد - الخميس: 9 ص - 6 م<br>الجمعة والسبت: حسب الطلب<br><br>الشات متاح 24/7.',
      en: '⏰ Working hours:<br>Sun - Thu: 9 AM - 6 PM<br>Fri & Sat: On demand<br><br>Chat is available 24/7.'
    }
  };

  function matchIntent(text) {
    const t = (text || '').toLowerCase().trim();
    if (!t) return null;
    if (/(sector|قطاع|قطاعات|خدمات|service|offer|تقدم|تقدّم|تقدمون|أقسام|اقسام)/i.test(t)) return 'sectors';
    if (/(vision|رؤي|رؤية|هدف|aim|mission)/i.test(t)) return 'vision';
    if (/(partner|شراكة قائمة|شركاء|تعاون|تعاونات|إمارة|امارة|عالم السفر|المكتب الاستراتيجي)/i.test(t)) return 'partners';
    if (/(أريد شراكة|ابغى شراكة|أرغب بشراكة|become partner|want to partner|i want.*partner)/i.test(t)) return 'partnership';
    if (/(contact|تواصل|اتصال|جوال|ايميل|بريد|هاتف|phone|email|whatsapp|واتس)/i.test(t)) return 'contact';
    if (/(وظيف|شاغر|career|job|cv|سيرة|توظيف)/i.test(t)) return 'careers';
    if (/(ساعات|وقت|متى|hours|time|open|مفتوح)/i.test(t)) return 'hours';
    if (/(about|من انتم|من أنتم|سكون|sakan|who are you)/i.test(t)) return 'about';
    return null;
  }

  function botReply(userText) {
    const lang = getLang();
    showTyping();
    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      hideTyping();
      const intent = matchIntent(userText);
      if (intent && KB[intent]) { appendMsg(KB[intent][lang]); return; }
      if (lang === 'ar') {
        appendMsg('شكرًا لتواصلك 🌿<br>لم أفهم سؤالك بدقة. يمكنك السؤال عن:<br>• <b>القطاعات</b> — ما هي أقسام المجموعة<br>• <b>الشراكات</b> — من نتعاون معه<br>• <b>التواصل</b> — كيف تصل إلينا<br>• <b>فرص الشراكة</b> — كيف تكون شريكًا<br>• <b>الوظائف</b> — كيف تنضم لفريقنا');
      } else {
        appendMsg('Thanks for reaching out 🌿<br>I didn\'t quite catch that. You can ask about:<br>• <b>Sectors</b> — what divisions we have<br>• <b>Partnerships</b> — who we work with<br>• <b>Contact</b> — how to reach us<br>• <b>Partnership requests</b> — how to become a partner<br>• <b>Careers</b> — how to join our team');
      }
    }, delay);
  }

  function sendMessage() {
    const lang = getLang();
    const input = lang === 'ar' ? chatInput : chatInputEn;
    const text = input.value.trim();
    if (!text) return;
    appendMsg(text, 'user');
    input.value = '';
    botReply(text);
  }

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => e.key === 'Enter' && sendMessage());
  chatInputEn.addEventListener('keydown', e => e.key === 'Enter' && sendMessage());

  document.querySelectorAll('#chatQuick button').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      const lang = getLang();
      const label = btn.querySelector(`[data-lang="${lang}"]`)?.textContent?.trim() || btn.textContent.trim();
      appendMsg(label, 'user');
      showTyping();
      setTimeout(() => { hideTyping(); if (KB[q]) appendMsg(KB[q][lang]); }, 700);
    });
  });

  function renderWelcome() {
    if (!chatBody) return;
    chatBody.innerHTML = '';
    const lang = getLang();
    const welcome = lang === 'ar'
      ? 'أهلًا بك في <b>مجموعة سكون</b> 👋<br>أنا مساعدك الذكي.<br>يمكنك السؤال عن: <b>القطاعات، الشراكات، التواصل، الوظائف، أو طلب شراكة</b>.'
      : 'Welcome to <b>Sokon Group</b> 👋<br>I\'m your smart assistant.<br>Ask me about: <b>sectors, partnerships, contact, careers, or partnership requests</b>.';
    setTimeout(() => appendMsg(welcome), 200);
    setTimeout(() => {
      appendMsg(lang === 'ar' ? 'كيف يمكنني مساعدتك اليوم؟ 🌿' : 'How can I help you today? 🌿');
    }, 900);
  }

  chatbotToggle.addEventListener('click', () => {
    const opening = !chatbotPanel.classList.contains('open');
    chatbotPanel.classList.toggle('open');
    chatbotToggle.classList.toggle('active', opening);
    if (opening && chatBody.children.length === 0) {
      renderWelcome();
      setTimeout(() => { (getLang() === 'ar' ? chatInput : chatInputEn).focus(); }, 350);
    }
  });

  chatClose.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
    chatbotToggle.classList.remove('active');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatbotPanel.classList.contains('open')) {
      chatbotPanel.classList.remove('open');
      chatbotToggle.classList.remove('active');
    }
  });