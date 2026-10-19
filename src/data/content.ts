export interface CourseItem {
  id: string;
  title: string;
  arabicTitle: string;
  level: string;
  summary: string;
  bullets: string[];
}

export const TEACHER_DATA = {
  name: "Muhammad Tariq",
  title: "Online Quran Teacher",
  qualification: "Hafiz-e-Quran",
  experience: "5 years of Quran teaching experience",
  whatsappNumber: "923336163006",
  whatsappDisplay: "+92 333 6163006",
  whatsappDefaultMessage:
    "Assalam-o-Alaikum Muhammad Tariq. I am interested in your online Quran classes. Please share the course details, fees, and available timings.",
  whatsappBaseUrl: "https://wa.me/923336163006",
  whatsappUrl:
    "https://wa.me/923336163006?text=" +
    encodeURIComponent(
      "Assalam-o-Alaikum Muhammad Tariq. I am interested in your online Quran classes. Please share the course details, fees, and available timings."
    ),
  emailPlaceholder: '',
  aboutText:
    "I am Muhammad Tariq, a Hafiz-e-Quran with five years of teaching experience. I teach Noorani Qaida, Quran Reading (Nazra), and Tajweed through structured online lessons tailored to each student's learning level.",
  teachingApproach: [
    {
      title: "Patient, Step-by-Step Guidance",
      desc: "Calm, encouraging guidance tailored to each student's individual learning pace.",
    },
    {
      title: "Attention to Correct Pronunciation",
      desc: "Careful focus on proper letter articulation (Makharij) and recitation rules.",
    },
    {
      title: "Regular Practice & Revision",
      desc: "Consistent revision of previous lessons to reinforce retention and reading confidence.",
    },
    {
      title: "Personalized Learning Support",
      desc: "One-on-one attention adapted directly to the student's current learning level.",
    },
  ],
  courses: [
    {
      id: "noorani-qaida",
      title: "Noorani Qaida",
      arabicTitle: "القاعدة النورانية",
      level: "Beginner Level",
      summary: "Learn Arabic letters, pronunciation, and letter joining with a structured beginner-friendly approach.",
      bullets: [
        "Suitable for beginners and children.",
        "Learn Arabic letters and correct sounds.",
        "Practice letter recognition and joining letters.",
        "Progress step by step toward Quran reading.",
      ],
    },
    {
      id: "nazra",
      title: "Quran Reading (Nazra)",
      arabicTitle: "تلاوة القرآن الكريم (ناظرة)",
      level: "Intermediate Level",
      summary: "Develop accurate Quran reading, fluency, and confidence through guided recitation and regular practice.",
      bullets: [
        "Learn to read the Holy Quran accurately.",
        "Practice reading fluency and clear pronunciation.",
        "Step-by-step recitation with teacher guidance.",
        "Regular revision to build confidence.",
      ],
    },
    {
      id: "tajweed",
      title: "Quran with Tajweed",
      arabicTitle: "علم التجويد وإتقان التلاوة",
      level: "All Levels",
      summary: "Learn the rules of Tajweed and improve pronunciation and recitation step by step.",
      bullets: [
        "Learn the rules of Tajweed.",
        "Focus on correct pronunciation and articulation.",
        "Improve recitation through direct teacher guidance.",
        "Continuous correction and personalized feedback.",
      ],
    },
  ] as CourseItem[],
  teachingMethod: [
    {
      step: "01",
      title: "Assess Current Level",
      desc: "Understand the student's starting point and prior reading experience.",
    },
    {
      step: "02",
      title: "Select Suitable Lessons",
      desc: "Choose an appropriate lesson plan and steady learning pace.",
    },
    {
      step: "03",
      title: "Clear Explanation",
      desc: "Break down pronunciation, rules, and letters with clear demonstrations.",
    },
    {
      step: "04",
      title: "Interactive Recitation",
      desc: "Direct reading practice during class with real-time teacher feedback.",
    },
    {
      step: "05",
      title: "Regular Revision",
      desc: "Reinforce previous lessons to build lasting accuracy and fluency.",
    },
  ],
  classInstructions: [
    "Keep a stable internet connection.",
    "Use a mobile phone, tablet, or computer.",
    "Keep the required Qaida or Quran ready.",
    "Join at the agreed class time.",
    "Complete assigned practice and revision.",
    "Follow the teacher's guidance during lessons.",
  ],
  classInfoPlaceholders: [
    { label: "Available Days", value: "Saturday to Thursday" },
    { label: "Weekly Day Off", value: "Friday — Jumma Mubarak" },
    { label: "Timezone", value: "Pakistan Standard Time (PKT, UTC+5)" },
    { label: "Morning Session", value: "After Fajr – 10:00 AM PKT" },
    { label: "Evening Session", value: "After Maghrib – 10:00 PM PKT" },
    { label: "Learning Mode", value: "1-on-1 Online Classes" },
  ],
  schedule: {
    timeZone: "Pakistan Standard Time (PKT, UTC+5)",
    weeklyOff: "Friday — Jumma Mubarak",
    morningSlot: "After Fajr – 10:00 AM PKT",
    eveningSlot: "After Maghrib – 10:00 PM PKT",
    note: "Session starting times depend on local prayer times in Pakistan. All class requests are subject to confirmation by Muhammad Tariq.",
  },
  faqs: [
    {
      q: "Who teaches the online Quran classes?",
      a: "All classes are taught directly by Muhammad Tariq, a Hafiz-e-Quran with five years of Quran teaching experience.",
    },
    {
      q: "What courses are offered?",
      a: "Three core courses are offered: Noorani Qaida (for beginners), Quran Reading (Nazra) (for reading fluency), and Quran with Tajweed (for correct pronunciation and recitation rules).",
    },
    {
      q: "What are the available class days and timings?",
      a: "Classes are available from Saturday to Thursday. Friday is the weekly day off (Jumma Mubarak). Daily teaching sessions are held in the Morning (after Fajr – 10:00 AM PKT) and Evening (after Maghrib – 10:00 PM PKT). Session starting times depend on local prayer times in Pakistan, and all schedules are confirmed directly with Muhammad Tariq.",
    },
    {
      q: "How do I apply for admission?",
      a: "You can submit the 'Start Your Quran Learning Journey' admission form on the website or message Muhammad Tariq directly on WhatsApp at +92 333 6163006.",
    },
  ],
  dailyInspirations: [
    {
      id: "insp-1",
      arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
      english: "The best among you are those who learn the Quran and teach it.",
      reference: "Sahih al-Bukhari 5027",
      theme: "The Virtue of Quran Learning",
    },
    {
      id: "insp-2",
      arabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
      english: "And recite the Quran with measured, rhythmic recitation.",
      reference: "Surah Al-Muzzammil 73:4",
      theme: "The Beauty of Tajweed",
    },
    {
      id: "insp-3",
      arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
      english: "Read in the name of your Lord who created.",
      reference: "Surah Al-Alaq 96:1",
      theme: "The Divine Call to Knowledge",
    },
    {
      id: "insp-4",
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      english: "Indeed, with hardship comes ease.",
      reference: "Surah Ash-Sharh 94:6",
      theme: "Patience and Ease",
    },
    {
      id: "insp-5",
      arabic: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
      english: "And say: My Lord, increase me in knowledge.",
      reference: "Surah Ta-Ha 20:114",
      theme: "Seeking Beneficial Knowledge",
    },
  ],
};
