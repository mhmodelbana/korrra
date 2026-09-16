# Korrra Match Booking System

نظام حجز وإدارة مباريات كرة القدم الذكي متصل بـ Supabase.

## المميزات

- 🏆 **نظام حجز المباريات**: إنشاء وإدارة مباريات كرة القدم
- 👥 **إدارة اللاعبين**: تسجيل وإدارة حسابات اللاعبين
- 💰 **نظام تقسيم التكلفة التلقائي**: حساب حصة كل لاعب تلقائياً بناءً على عدد اللاعبين المؤكدين
- 🔐 **نظام Authentication**: تسجيل الدخول والتسجيل باستخدام Supabase Auth
- 👨‍💼 **نظام Roles**: فصل صلاحيات المستخدم العادي (Player) عن الأدمن (Admin)
- 📊 **لوحة تحكم Admin**: إدارة المباريات، الطلبات، اللاعبين، والمدفوعات
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة (Mobile & Desktop)
- 🎨 **تصميم عصري**: Dark Theme مع تأثيرات Glass Morphism

## التقنيات المستخدمة

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Fonts**: Cairo (Google Fonts)

## الهيكل

```
Korrra/
├── index.html              # الصفحة الرئيسية
├── login.html              # صفحة تسجيل الدخول
├── register.html           # صفحة التسجيل
├── dashboard.html          # لوحة تحكم المستخدم
├── matches.html            # صفحة المباريات
├── profile.html            # صفحة الملف الشخصي
├── admin/                  # صفحات الأدمن
│   ├── index.html          # لوحة تحكم الأدمن
│   ├── matches.html        # إدارة المباريات
│   ├── requests.html       # إدارة طلبات الانضمام
│   ├── players.html        # إدارة اللاعبين
│   └── payments.html       # إدارة المدفوعات
├── css/
│   └── styles.css          # ملف التنسيقات
└── js/
    ├── config.js           # إعدادات Supabase
    ├── supabase.js         # Supabase Client
    ├── auth.js             # نظام Authentication
    ├── ui.js               # مكونات UI
    └── services/           # Service Layer
        ├── match-service.js
        ├── request-service.js
        ├── profile-service.js
        └── payment-service.js
```

## الإعداد

1. **إنشاء مشروع Supabase**:
   - سجل في [Supabase](https://supabase.com)
   - أنشئ مشروع جديد
   - احصل على URL و Anon Key

2. **إعداد قاعدة البيانات**:
   - أنشئ الجداول المطلوبة في Supabase SQL Editor:
     - `profiles`
     - `matches`
     - `match_players`
     - `payments`

3. **إعداد المشروع**:
   - استبدل الـURL و Anon Key في `js/config.js`
   - تأكد من RLS Policies صحيحة

4. **إنشاء أول Admin**:
   - سجل حساب جديد
   - غيّر الـrole في جدول `profiles` إلى `admin`

## تشغيل المشروع

1. استخدم أي HTTP server محلي:
   ```bash
   python -m http.server 8080
   ```
   أو
   ```bash
   npx serve
   ```

2. افتح المتصفح على `http://localhost:8080`

## الأمان

- ✅ RLS Policies لحماية البيانات
- ✅ Admin Guard لحماية صفحات الأدمن
- ✅ Auth Guard لحماية صفحات المستخدم
- ✅ منع تعديل الـrole من الـfrontend
- ✅ منع التلاعب بطلبات الانضمام
- ✅ منع تكرار الطلبات واللاعبين

## الصلاحيات

### Player (المستخدم العادي)
- ✅ تسجيل الدخول والتسجيل
- ✅ عرض المباريات المتاحة
- ✅ تقديم طلب انضمام للمباريات
- ✅ عرض طلباته وحالته
- ✅ تعديل ملفه الشخصي
- ❌ إنشاء مباريات
- ❌ قبول/رفض الطلبات
- ❌ إدارة اللاعبين
- ❌ تعديل الـroles

### Admin (الأدمن)
- ✅ كل صلاحيات Player
- ✅ إنشاء وإدارة المباريات
- ✅ قبول/رفض طلبات الانضمام
- ✅ إدارة اللاعبين وتغيير الـroles
- ✅ إدارة المدفوعات
- ✅ عرض الإحصائيات الكاملة

## الترخيص

جميع الحقوق محفوظة © 2026 Korrra