export type Lang = "en" | "vi";
export type L<T = string> = { en: T; vi: T };

export type BrandKey = "github" | "linkedin" | "facebook" | "youtube" | "zalo";

export const profile = {
  name: { en: "Huynh Cong Tien", vi: "Huỳnh Công Tiến" } as L,
  nameLines: { en: ["Huynh Cong", "Tien"], vi: ["Huỳnh Công", "Tiến"] } as L<string[]>,
  brand: "CT9",
  email: "tienhuynh.10904@gmail.com",
  phone: "+84 966 026 561",
  phoneHref: "tel:+84966026561",
  location: { en: "Ho Chi Minh City, Vietnam", vi: "TP. Hồ Chí Minh, Việt Nam" } as L,
  mapUrl: "https://maps.app.goo.gl/MsMp4vaHZdxMUrig7",
  cvUrl: "/files/BangDiemQuaTrinh_HuynhCongTien.pdf",
  cvFileName: "BangDiemQuaTrinh_HuynhCongTien.pdf",
  socials: [
    { key: "github", label: "GitHub", href: "https://github.com/congtien30303", handle: "@congtien30303" },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/huỳnh-công-tiến-79a335377 ",
      handle: "Huỳnh Công Tiến",
    },
    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/CT9Titanium", handle: "CT9Titanium" },
    { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@ct9tv686", handle: "@ct9tv686" },
    { key: "zalo", label: "Zalo", href: "https://zalo.me/0966026561", handle: "0966 026 561" },
  ] as { key: BrandKey; label: string; href: string; handle: string }[],
};

export const mailto = (lang: Lang) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(
    lang === "vi" ? "Liên hệ từ Portfolio" : "Hello from your portfolio",
  )}&body=${encodeURIComponent(
    lang === "vi" ? "Chào Tiến, tôi muốn trao đổi về..." : "Hi Tien, I'd like to talk about...",
  )}`;

export const nav = [
  { id: "home", label: { en: "Home", vi: "Trang chủ" } },
  { id: "about", label: { en: "About", vi: "Giới thiệu" } },
  { id: "experience", label: { en: "Experience", vi: "Kinh nghiệm" } },
  { id: "skills", label: { en: "Skills", vi: "Kỹ năng" } },
  { id: "work", label: { en: "Work", vi: "Dự án" } },
  { id: "journey", label: { en: "Journey", vi: "Hành trình" } },
  { id: "contact", label: { en: "Contact", vi: "Liên hệ" } },
] as { id: string; label: L }[];

export const ui = {
  letsTalk: { en: "Let's talk", vi: "Trò chuyện" },
  hello: { en: "Hello, I am", vi: "Xin chào, tôi là" },
  iBuild: { en: "I build", vi: "Tôi xây dựng" },
  roles: {
    en: ["Internal Tools", "Web Apps", "Mobile Apps", "Back-end Systems", "Full-stack Products"],
    vi: ["Công cụ nội bộ", "Ứng dụng Web", "Ứng dụng di động", "Hệ thống Back-end", "Sản phẩm Full-stack"],
  },

heroDesc: {
  en: "I work in ERP operations, bridging business processes and technology to build practical, effective solutions. I enjoy solving real-world problems, streamlining workflows, and turning ideas into software that makes work simpler and more efficient.",
  vi: "Tôi hiện làm việc trong lĩnh vực vận hành ERP, kết nối quy trình nghiệp vụ với công nghệ để tạo ra những giải pháp thiết thực và hiệu quả. Tôi yêu thích giải quyết các vấn đề thực tế, tối ưu quy trình làm việc và biến ý tưởng thành phần mềm giúp công việc trở nên đơn giản, hiệu quả hơn."
},

  viewWork: { en: "View my work", vi: "Xem dự án" },
  downloadCv: { en: "Download CV", vi: "Tải CV" },
  scroll: { en: "Scroll to explore", vi: "Cuộn để khám phá" },
  realProjects: { en: "Real-world projects", vi: "Dự án thực tế" },

  aboutLabel: { en: "About me", vi: "Về tôi" },
  aboutTitle: { en: "Here to help build your next project.", vi: "Sẵn sàng cùng bạn xây dựng dự án tiếp theo." },
aboutText: {
  en: "I'm an IT graduate working at the intersection of business operations and software development. My experience in ERP operations has given me a practical understanding of business needs and the challenges technology can solve. Beyond my day-to-day work, I enjoy building software projects from the ground up, turning ideas into useful, reliable solutions. I'm always eager to learn, solve meaningful problems, and create products that deliver real value.",
  vi: "Tôi tốt nghiệp ngành Công nghệ Thông tin, với định hướng phát triển tại giao điểm giữa nghiệp vụ doanh nghiệp và phát triển phần mềm. Công việc vận hành ERP giúp tôi hiểu rõ hơn nhu cầu thực tế của doanh nghiệp và cách công nghệ có thể giải quyết những vấn đề trong công việc. Ngoài giờ làm, tôi yêu thích tự phát triển các dự án phần mềm từ ý tưởng đến sản phẩm hoàn chỉnh, hướng đến những giải pháp thiết thực và hữu ích. Tôi luôn sẵn sàng học hỏi, chinh phục những thử thách mới và tạo ra các sản phẩm mang lại giá trị thực tế."
},
  education: { en: "Education", vi: "Học vấn" },
  university: {
    en: "Ho Chi Minh City University of Industry and Trade",
    vi: "Trường Đại học Công Thương TP. Hồ Chí Minh",
  },
  degree: { en: "Bachelor · Information Technology", vi: "Cử nhân · Công nghệ Thông tin" },
  degreeNote: { en: "Faculty of IT · Thesis defended in 2025", vi: "Khoa CNTT · Bảo vệ khóa luận năm 2025" },
  whatIDo: { en: "What I do", vi: "Tôi làm gì" },

  experienceLabel: { en: "Experience", vi: "Kinh nghiệm" },
  experienceTitle: { en: "Where I work now.", vi: "Công việc hiện tại." },
  experienceIntro: {
    en: "Day to day I keep the ERP running; alongside that I build the integrations and tools the business needs.",
    vi: "Hằng ngày tôi vận hành hệ thống ERP; song song đó tôi xây dựng các tích hợp dữ liệu và công cụ mà doanh nghiệp cần.",
  },
  current: { en: "Current", vi: "Hiện tại" },
  beyondErp: { en: "Beyond ERP operations", vi: "Ngoài vận hành ERP" },

  skillsLabel: { en: "Skills", vi: "Kỹ năng" },
  skillsTitle: { en: "My tech arsenal.", vi: "Bộ công nghệ của tôi." },
  skillsIntro: {
    en: "The languages, frameworks and tools I use to ship products end-to-end.",
    vi: "Ngôn ngữ, framework và công cụ tôi dùng để xây dựng sản phẩm từ đầu đến cuối.",
  },
  softSkills: { en: "Soft skills", vi: "Kỹ năng mềm" },

  workLabel: { en: "Featured work", vi: "Dự án tiêu biểu" },
  workTitle: { en: "Selected projects.", vi: "Những dự án nổi bật." },
  workIntro: {
    en: "Team products and solo builds — open any card for the full case study.",
    vi: "Sản phẩm làm cùng đội nhóm và dự án cá nhân — mở từng thẻ để xem chi tiết.",
  },
  caseStudy: { en: "View case study", vi: "Xem chi tiết" },
  sourceCode: { en: "Source code", vi: "Mã nguồn" },
  liveDemo: { en: "Live demo", vi: "Demo" },
  myRole: { en: "My role", vi: "Vai trò của tôi" },
  techStack: { en: "Tech stack", vi: "Công nghệ" },
  highlights: { en: "Highlights", vi: "Điểm nổi bật" },
  gallery: { en: "Product images", vi: "Hình ảnh sản phẩm" },
  overview: { en: "Overview", vi: "Tổng quan" },
  close: { en: "Close", vi: "Đóng" },
  nextProject: { en: "Next project", vi: "Dự án tiếp theo" },

  journeyLabel: { en: "Journey", vi: "Hành trình" },
  journeyTitle: { en: "Academic activities & achievements.", vi: "Hoạt động học thuật & thành tích." },
  photos: { en: "photos", vi: "ảnh" },
  nextChapter: { en: "Next chapter", vi: "Chương tiếp theo" },
  nextChapterTitle: { en: "Your idea?", vi: "Ý tưởng của bạn?" },
  nextChapterText: {
    en: "Still learning, still building — at work and on my own. Have an idea or a project in mind? Let's build it.",
    vi: "Vẫn học hỏi và xây dựng mỗi ngày — trong công việc lẫn dự án cá nhân. Bạn có ý tưởng hay dự án nào? Cùng bắt tay nhé.",
  },

  contactLabel: { en: "Contact", vi: "Liên hệ" },
  contactTitle: { en: ["Let's work", "together!"], vi: ["Cùng nhau", "làm việc nhé!"] },
  contactText: {
    en: "I'm always excited to take on new challenges and collaborate on innovative projects. Whether you have a specific role in mind or just want to explore possibilities, I'd love to hear from you!",
    vi: "Tôi luôn hào hứng đón nhận thử thách mới và hợp tác trong các dự án sáng tạo. Dù bạn có vị trí cụ thể hay chỉ muốn trao đổi thêm, tôi rất mong được nghe từ bạn!",
  },
  getInTouch: { en: "Get in touch", vi: "Liên hệ ngay" },
  phone: { en: "Phone", vi: "Điện thoại" },
  emailLabel: { en: "Email", vi: "Email" },
  locationLabel: { en: "Location", vi: "Địa điểm" },
  callNow: { en: "Call now", vi: "Gọi ngay" },
  sendEmail: { en: "Send email", vi: "Gửi email" },
  copy: { en: "Copy", vi: "Sao chép" },
  copied: { en: "Copied!", vi: "Đã chép!" },
  viewMap: { en: "View map", vi: "Xem bản đồ" },
  followMe: { en: "Follow me", vi: "Theo dõi tôi" },
  backToTop: { en: "Back to top", vi: "Lên đầu trang" },
  localTime: { en: "Local time", vi: "Giờ địa phương" },
  builtWith: { en: "Designed & built with Next.js, Tailwind CSS & Motion", vi: "Thiết kế & phát triển với Next.js, Tailwind CSS & Motion" },
  rights: { en: "All rights reserved", vi: "Bảo lưu mọi quyền" },
  menu: { en: "Menu", vi: "Menu" },
} satisfies Record<string, L<unknown>>;

export const services: { icon: "mobile" | "server" | "layout" | "brain"; title: L; desc: L; tags: L<string[]> }[] = [
  {
    icon: "server",
    title: { en: "ERP Operations", vi: "Vận hành ERP" },
    desc: {
      en: "Understanding how the business runs and keeping its core system dependable for the people who rely on it.",
      vi: "Hiểu cách doanh nghiệp vận hành và giữ cho hệ thống cốt lõi luôn ổn định cho những người sử dụng nó.",
    },
    tags: { en: ["ERP", "User support", "Business process"], vi: ["ERP", "Hỗ trợ người dùng", "Quy trình nghiệp vụ"] },
  },
  {
    icon: "brain",
    title: { en: "Process Improvement", vi: "Tối ưu quy trình" },
    desc: {
      en: "Spotting where work is slow or repetitive, then finding a simpler, more reliable way to get it done.",
      vi: "Nhận ra những khâu chậm hoặc lặp đi lặp lại, rồi tìm cách làm đơn giản và đáng tin cậy hơn.",
    },
    tags: { en: ["Analysis", "Efficiency", "Accuracy"], vi: ["Phân tích", "Hiệu quả", "Chính xác"] },
  },
  {
    icon: "layout",
    title: { en: "Internal Tools", vi: "Công cụ nội bộ" },
    desc: {
      en: "Turning a team's everyday needs into simple tools that are easy to pick up and actually get used.",
      vi: "Biến nhu cầu hằng ngày của một đội nhóm thành những công cụ đơn giản, dễ làm quen và thực sự được sử dụng.",
    },
    tags: { en: ["Requirements", "Easy to use", "Adoption"], vi: ["Yêu cầu nghiệp vụ", "Dễ sử dụng", "Triển khai"] },
  },
  {
    icon: "mobile",
    title: { en: "Web & Mobile Apps", vi: "Ứng dụng Web & Mobile" },
    desc: {
      en: "Building apps from idea to launch with a clean, easy-to-use interface — from personal projects to team products.",
      vi: "Xây dựng ứng dụng từ ý tưởng đến khi hoàn thiện với giao diện gọn gàng, dễ dùng — từ dự án cá nhân đến sản phẩm nhóm.",
    },
    tags: { en: ["Web", "Mobile", "Idea to launch"], vi: ["Web", "Mobile", "Từ ý tưởng đến sản phẩm"] },
  },
];

export type Tech = { name: string; icon: string; invert?: boolean };

const tech = (name: string, icon: string, invert = false): Tech => ({ name, icon: `/icons/tech/${icon}.svg`, invert });

export const skillGroups: { id: string; title: L; desc: L; items: Tech[] }[] = [
  {
    id: "frameworks",
    title: { en: "Frameworks & Libraries", vi: "Framework & Thư viện" },
    desc: { en: "From mobile to server to browser.", vi: "Từ mobile, server đến trình duyệt." },
    items: [
      tech("Spring Boot", "spring"),
      tech("Flutter", "flutter"),
      tech("React", "react"),
      tech("Next.js", "nextjs", true),
      tech("Laravel", "laravel"),
      tech("GraphQL", "graphql"),
      tech("Tailwind CSS", "tailwindcss"),
      tech("Bootstrap", "bootstrap"),
    ],
  },
  {
    id: "languages",
    title: { en: "Languages", vi: "Ngôn ngữ" },
    desc: { en: "Typed, scripted and everything between.", vi: "Từ ngôn ngữ tĩnh đến kịch bản." },
    items: [
      tech("Java", "java"),
      tech("Dart", "dart"),
      tech("TypeScript", "typescript"),
      tech("JavaScript", "javascript"),
      tech("PHP", "php"),
      tech("Python", "python"),
    ],
  },
  {
    id: "databases",
    title: { en: "Databases", vi: "Cơ sở dữ liệu" },
    desc: { en: "Relational, document & cloud back-ends.", vi: "Quan hệ, NoSQL & back-end đám mây." },
    items: [
      tech("MySQL", "mysql"),
      tech("PostgreSQL", "postgresql"),
      tech("SQL Server", "microsoftsqlserver"),
      tech("Supabase", "supabase"),
      tech("MongoDB", "mongodb"),
      tech("SQLite", "sqlite"),
    ],
  },
  {
    id: "tools",
    title: { en: "Tools & Platforms", vi: "Công cụ & Nền tảng" },
    desc: { en: "The daily toolbox.", vi: "Bộ đồ nghề hằng ngày." },
    items: [
      tech("Git", "git"),
      tech("GitHub", "github", true),
      tech("Docker", "docker"),
      tech("Vercel", "vercel", true),
      tech("Firebase", "firebase"),
      tech("Postman", "postman"),
      tech("VS Code", "vscode"),
      tech("DBeaver", "dbeaver"),
      tech("Figma", "figma"),
    ],
  },
];

export const allTech = skillGroups.flatMap((g) => g.items);

export const softSkills: L<string[]> = {
  en: ["Communication", "Teamwork", "Critical thinking", "Presentation", "Scientific writing", "Fast learner"],
  vi: ["Giao tiếp", "Làm việc nhóm", "Tư duy phản biện", "Thuyết trình", "Viết báo cáo khoa học", "Học hỏi nhanh"],
};

export type Shot = { src: string; w: number; h: number };
const shot = (src: string, w: number, h: number): Shot => ({ src, w, h });

export type Project = {
  id: string;
  visual: "web-mobile" | "mobile" | "web";
  accent: string;
  type: L;
  title: L;
  summary: L;
  description: L;
  tech: string[];
  highlights: L<string[]>;
  role: L;
  award?: L;
  repo?: string;
  demo?: string;
  cover: Shot[];
  gallery: Shot[];
};

const bh = (n: number, w: number, h: number) => shot(`/images/projects/bookheaven/${n}.png`, w, h);
const todo = (n: string) => shot(`/images/projects/todo/Screenshot_${n}.png`, 1080, 2400);
const ev = (f: string, w: number, h: number) => shot(`/images/projects/event/${f}`, w, h);
const fin = (f: string, w: number, h: number) => shot(`/images/projects/ct9-finance/${f}`, w, h);

export const projects: Project[] = [
  {
    id: "ct9-finance",
    visual: "web-mobile",
    accent: "#1baf7a",
    type: { en: "Progressive web app", vi: "Ứng dụng web (PWA)" },
    title: { en: "CT9 Finance", vi: "CT9 Finance" },
    summary: {
      en: "A personal finance app that replaces my Excel budgeting workbook — log in seconds, budget, and track goals, debts and loans.",
      vi: "Ứng dụng tài chính cá nhân thay cho file Excel thu chi — ghi chép trong vài giây, lập ngân sách, theo dõi mục tiêu, nợ và cho vay.",
    },
    description: {
      en: "CT9 Finance is a personal finance web app designed to make money management simpler and more intentional. It helps users track income and expenses, manage budgets, monitor savings and debts, and make informed financial decisions through clear reports and spending insights. Built with a mobile-first experience, it supports home-screen installation, offline transaction entry and daily reminders.",
      vi: "CT9 Finance là ứng dụng quản lý tài chính cá nhân giúp việc kiểm soát dòng tiền trở nên đơn giản và chủ động hơn. Ứng dụng hỗ trợ theo dõi thu chi, lập ngân sách, quản lý tiết kiệm và các khoản nợ, đồng thời cung cấp báo cáo trực quan giúp người dùng hiểu rõ thói quen tài chính của mình. Với thiết kế ưu tiên điện thoại, CT9 hỗ trợ cài đặt như ứng dụng, ghi chép giao dịch khi mất mạng và nhắc nhở hằng ngày."
    },
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts", "PWA", "Web Push", "Vercel"],
    highlights: {
      en: [
        "Excel formulas reproduced exactly — 390 cells cross-checked, 137 unit tests on the calculation logic.",
        "Built for a daily habit: “safe to spend today”, logging streaks, one-tap quick log, recurring transactions and budget alerts at 80% / 100%.",
        "Savings funds, deposits, debts (Snowball vs Avalanche) and loans with multiple interest methods.",
        "Supabase Postgres with Row Level Security on 15 tables, Server Actions, password reset by email, CSV import / export and backup & restore.",
        "Installable PWA: offline logging with background sync, daily web-push reminders via pg_cron, light / dark theme and an onboarding tour.",
      ],
      vi: [
        "Giữ đúng công thức Excel — đối chiếu 390 ô với file gốc, 137 unit test cho phần tính toán.",
        "Thiết kế để ghi chép mỗi ngày: “hôm nay còn được chi”, chuỗi ngày ghi chép, ghi nhanh một chạm, giao dịch định kỳ và cảnh báo ngân sách 80% / 100%.",
        "Quỹ tiết kiệm, sổ tiết kiệm, nợ (Snowball và Avalanche) và cho vay với nhiều cách tính lãi.",
        "Quản lý dữ liệu bằng Supabase Postgres với Row Level Security, Server Actions, reset mật khẩu qua email, import / export CSV và backup & restore.",
        "PWA cài đặt được: ghi khi mất mạng và tự đồng bộ, nhắc ghi chép bằng web push qua pg_cron, giao diện sáng / tối và tour hướng dẫn.",
      ],
    },
    role: {
      en: "Solo project — product design, UI / UX, database schema and RLS policies, Server Actions, charts, push notifications, offline sync, tests and deployment on Vercel.",
      vi: "Dự án cá nhân: thiết kế sản phẩm, UI / UX, schema database và chính sách RLS, Server Actions, biểu đồ, thông báo đẩy, đồng bộ offline, kiểm thử và deploy lên Vercel.",
    },
    demo: "https://ct9-personal-finance.vercel.app/",
    cover: [fin("fin_1.png", 1920, 1024), fin("fin_3.jpg", 1080, 2372), fin("fin_2.jpg", 1080, 2372)],
    gallery: [
      fin("fin_4.png", 1920, 1022),
      fin("fin_1.png", 1920, 1024),
      fin("fin_3.jpg", 1080, 2372),
      fin("fin_2.jpg", 1080, 2372),
      fin("fin_5.png", 1920, 1019),
    ],
  },
  {
    id: "book-heaven",
    visual: "web-mobile",
    accent: "#f5a524",
    type: { en: "Cross-platform sales system", vi: "Hệ thống bán hàng đa nền tảng" },
    title: { en: "Book Heaven", vi: "Book Heaven" },
    summary: {
      en: "A large-scale multi-channel sales system — Web, Mobile and POS — with an AI recommendation engine.",
      vi: "Hệ thống bán hàng đa kênh quy mô lớn — Web, Mobile và POS — tích hợp AI gợi ý sản phẩm.",
    },
    description: {
      en: "A large-scale cross-platform sales system integrating multiple modules such as product management, shopping cart, checkout and order management, inventory management, revenue reporting and customer management. The system is designed to provide a smooth experience on both desktop and mobile, with a friendly and easy-to-use interface.",
      vi: "Hệ thống bán hàng đa nền tảng tích hợp nhiều module như quản lý sản phẩm, giỏ hàng, thanh toán và quản lý đơn hàng, quản lý kho, báo cáo doanh thu và quản lý khách hàng. Hệ thống được thiết kế để mang lại trải nghiệm mượt mà trên cả desktop và mobile, với giao diện thân thiện, dễ sử dụng.",
    },
    tech: ["Flutter", "Spring Boot", "Python", "React", "Next.js", "MySQL"],
    highlights: {
      en: [
        "JWT authentication, Google Sign-In (Firebase) and role-based access control.",
        "Product, cart, order, inventory, customer management and revenue reporting.",
        "AI product recommendation based on user behaviour (Deep Q-Network).",
        "Cross-platform: Web (React / Next.js), Mobile (Flutter), Back-end (Spring Boot, Python).",
        "Multi-channel sales: Web, Mobile and POS.",
      ],
      vi: [
        "Xác thực JWT, Google Sign-In (Firebase) và phân quyền RBAC.",
        "Quản lý sản phẩm, giỏ hàng, đơn hàng, kho, khách hàng và báo cáo doanh thu.",
        "AI gợi ý sản phẩm theo hành vi người dùng (Deep Q-Network).",
        "Đa nền tảng: Web (React / Next.js), Mobile (Flutter), Back-end (Spring Boot, Python).",
        "Bán hàng đa kênh: Web, Mobile và POS.",
      ],
    },
    role: {
      en: "Built the entire mobile platform from scratch — UI, responsive layout and back-end integration. Developed the DQN recommendation model on sample data, then retrained it with real user data.",
      vi: "Xây dựng toàn bộ nền tảng mobile từ đầu — UI, responsive layout và kết nối back-end. Phát triển mô hình AI gợi ý sản phẩm (DQN) từ dữ liệu mẫu, sau đó retrain với dữ liệu thực tế.",
    },
    cover: [bh(7, 1333, 662), bh(4, 455, 1004), bh(5, 440, 970)],
    gallery: [
      bh(1, 1324, 652),
      bh(2, 579, 286),
      bh(7, 1333, 662),
      bh(8, 1324, 651),
      bh(3, 444, 980),
      bh(4, 455, 1004),
      bh(5, 440, 970),
      bh(6, 493, 1088),
    ],
  },
  {
    id: "super-todo",
    visual: "mobile",
    accent: "#8b5cf6",
    type: { en: "Mobile application", vi: "Ứng dụng di động" },
    title: { en: "Super Todo-list", vi: "Super Todo-list" },
    summary: {
      en: "A task app that turns finishing work into a habit — streaks, groups and real-time progress.",
      vi: "Ứng dụng quản lý công việc biến việc hoàn thành task thành thói quen — streak, nhóm và tiến độ thời gian thực.",
    },
    description: {
      en: "A task management application that helps users organise daily work efficiently, set priorities and track progress in real time through a clean, responsive interface. It integrates a streak feature to encourage consistent task completion and habit building. Users can also create groups, assign tasks and collaborate with team members.",
      vi: "Ứng dụng quản lý công việc giúp người dùng sắp xếp công việc hằng ngày hiệu quả, đặt ưu tiên và theo dõi tiến độ theo thời gian thực với giao diện trực quan. Ứng dụng tích hợp streak để duy trì thói quen hoàn thành công việc đều đặn. Người dùng còn có thể tạo nhóm, giao việc và cộng tác với các thành viên khác.",
    },
    tech: ["Flutter", "Spring Boot", "MySQL", "REST API", "Firebase"],
    highlights: {
      en: [
        "JWT authentication, Google Sign-In (Firebase) and role-based access.",
        "Create, update and delete personal tasks.",
        "Group creation, task assignment, role management and QR join.",
        "Habit streaks with daily / weekly tracking.",
        "Dark mode, notifications, multi-language and password management.",
      ],
      vi: [
        "Xác thực JWT, Google Sign-In (Firebase), phân quyền theo vai trò.",
        "Tạo, cập nhật, xóa công việc cá nhân.",
        "Tạo nhóm, giao việc, quản lý vai trò, tham gia nhóm bằng QR.",
        "Theo dõi streak thói quen theo ngày / tuần.",
        "Dark mode, thông báo, đa ngôn ngữ, quản lý mật khẩu.",
      ],
    },
    role: {
      en: "Designed the database schema, built the REST APIs, integrated the Flutter front-end with the back-end and optimised task query performance.",
      vi: "Thiết kế schema database, xây dựng REST API, tích hợp front-end Flutter với back-end và tối ưu hiệu năng truy vấn task.",
    },
    award: { en: "2nd Prize · Tech Innovators Challenge 2025", vi: "Giải Nhì · Tech Innovators Challenge 2025" },
    cover: [todo("1749346336"), todo("1749346395"), todo("1749346458")],
    gallery: [todo("1749346336"), todo("1749346395"), todo("1749346440"), todo("1749346458")],
  },
  {
    id: "event-hub",
    visual: "web",
    accent: "#38bdf8",
    type: { en: "Web platform", vi: "Nền tảng web" },
    title: { en: "Scientific Conference Event Hub", vi: "Hệ thống Quản lý Sự kiện Hội nghị Khoa học" },
    summary: {
      en: "A centralised platform for conference registration, attendance and student records — with AI moderation.",
      vi: "Nền tảng tập trung cho đăng ký hội nghị, điểm danh và hồ sơ sinh viên — tích hợp AI kiểm duyệt.",
    },
    description: {
      en: "A centralised management platform for student records, scientific conference registration, attendance tracking and performance monitoring. The system sends reminder notifications and produces detailed reports on academic performance by semester.",
      vi: "Nền tảng quản lý tập trung cho hồ sơ sinh viên, đăng ký tham gia hội nghị khoa học, điểm danh và theo dõi kết quả. Hệ thống gửi thông báo nhắc nhở và báo cáo chi tiết điểm rèn luyện theo học kỳ.",
    },
    tech: ["Laravel", "GraphQL", "React", "Tailwind CSS", "MongoDB"],
    highlights: {
      en: [
        "JWT authentication with role-based access control (RBAC).",
        "Event registration, attendance check-in and performance tracking.",
        "Manage events, conferences, papers and venues.",
        "Reminder notifications and per-semester academic performance reports.",
        "AI content moderation blocks inappropriate language in comments and reviews.",
      ],
      vi: [
        "Xác thực JWT, phân quyền RBAC.",
        "Quản lý đăng ký sự kiện, hội thảo, điểm danh và theo dõi kết quả.",
        "Quản lý sự kiện, hội nghị, bài báo và địa điểm tổ chức.",
        "Thông báo nhắc nhở và báo cáo chi tiết điểm rèn luyện theo học kỳ.",
        "AI ngăn chặn ngôn ngữ không phù hợp trong bình luận và đánh giá sự kiện.",
      ],
    },
    role: {
      en: "Implemented the entire back-end: designed the database, built the GraphQL APIs, integrated AI content moderation and optimised query performance.",
      vi: "Triển khai toàn bộ back-end: thiết kế database, xây dựng GraphQL API, tích hợp AI kiểm duyệt nội dung và tối ưu hiệu năng truy vấn.",
    },
    repo: "https://github.com/DevTapGym",
    cover: [ev("2.jpg", 1329, 658), ev("3.png", 1326, 653), ev("4.png", 576, 482)],
    gallery: [
      ev("1.jpg", 1325, 653),
      ev("2.jpg", 1329, 658),
      ev("3.png", 1326, 653),
      ev("5.png", 1326, 661),
      ev("6.png", 1328, 664),
      ev("4.png", 576, 482),
    ],
  },
];

export type Experience = {
  id: string;
  role: L;
  period: L;
  current?: boolean;
  summary: L;
  work: { icon: "scale" | "attendance" | "qr"; title: L; desc: L; tags: string[] }[];
};

export const experience: Experience[] = [
  {
    id: "erp-operations",
    role: { en: "ERP Operations Specialist", vi: "Nhân viên nghiệp vụ vận hành ERP" },
    period: { en: "03-2026 — Present", vi: "03-2026 — Nay" },
    current: true,
    summary: {
      en: "I keep the ERP running day to day — supporting users, handling business-process issues and making sure the data in the system stays accurate. Alongside operations, I take on integration and internal-tool work for the business.",
      vi: "Tôi vận hành hệ thống ERP hằng ngày — hỗ trợ người dùng, xử lý các vấn đề nghiệp vụ và đảm bảo dữ liệu trên hệ thống luôn chính xác. Song song đó, tôi đảm nhận thêm các công việc tích hợp dữ liệu và xây dựng công cụ nội bộ.",
    },
    work: [
      {
        icon: "scale",
        title: { en: "Weighbridge data integration", vi: "Tích hợp dữ liệu trạm cân" },
        desc: {
          en: "Brought weighbridge station data into the ERP so weighing records can be tracked and reconciled in one system.",
          vi: "Đưa dữ liệu từ trạm cân vào ERP để số liệu cân được theo dõi và đối chiếu trên cùng một hệ thống.",
        },
        tags: ["ERP", "Data integration"],
      },
      {
        icon: "attendance",
        title: { en: "Multi-branch attendance sync", vi: "Kéo dữ liệu chấm công đa chi nhánh" },
        desc: {
          en: "Pulled time-attendance data from multiple branches into one central place for HR.",
          vi: "Kéo dữ liệu chấm công từ nhiều chi nhánh về một nơi tập trung, phục vụ công tác nhân sự.",
        },
        tags: ["Multi-branch", "Data sync"],
      },
      {
        icon: "qr",
        title: { en: "QR warehouse management app", vi: "Ứng dụng quản lý kho bằng QR" },
        desc: {
          en: "Built an app that manages warehouse stock with QR codes — scan to receive, issue and look up items.",
          vi: "Xây dựng ứng dụng quản lý kho bằng mã QR — quét mã để nhập, xuất và tra cứu hàng hóa.",
        },
        tags: ["QR code", "Inventory"],
      },
    ],
  },
];

export type Activity = {
  id: string;
  period: string;
  title: L;
  desc: L;
  tags: L<string[]>;
  images: string[];
  featured?: L;
};

const act = (f: string, ext = "webp") => `/images/activities/${f}.${ext}`;

export const activities: Activity[] = [
  {
    id: "workshops",
    period: "2024",
    title: { en: "Workshops & Talkshows", vi: "Hội thảo & Talkshow" },
    desc: {
      en: "Actively joined workshops and seminars to develop soft skills such as communication, teamwork and critical thinking.",
      vi: "Tích cực tham gia hội thảo và seminar để phát triển kỹ năng mềm như giao tiếp, làm việc nhóm và tư duy phản biện.",
    },
    tags: { en: ["Soft skills", "Networking"], vi: ["Kỹ năng mềm", "Kết nối"] },
    images: [act("Workshops1"), act("Workshops2")],
  },
  {
    id: "research",
    period: "2024 — 2025",
    title: { en: "Student Scientific Research", vi: "Nghiên cứu Khoa học Sinh viên" },
    desc: {
      en: "Reached the final round of the university-level research contest; presented the project before an academic committee and sharpened data analysis and scientific writing skills.",
      vi: "Vào vòng chung kết nghiên cứu khoa học cấp trường; trình bày đề tài trước hội đồng học thuật, rèn luyện kỹ năng phân tích dữ liệu và viết báo cáo khoa học.",
    },
    tags: { en: ["Research", "Final round"], vi: ["Nghiên cứu", "Vòng chung kết"] },
    images: [act("NCKH_1"), act("NCKH_2"), act("NCKH_3")],
  },
  {
    id: "tech-innovators",
    period: "2025",
    title: { en: "Tech Innovators Challenge", vi: "Tech Innovators Challenge" },
    desc: {
      en: "Won Second Prize at the Faculty of IT's flagship academic contest of 2024–2025 with a personal task management & reminder app.",
      vi: "Đạt Giải Nhì cuộc thi học thuật trọng điểm năm học 2024–2025 của Khoa CNTT với ứng dụng quản lý & nhắc nhở công việc cá nhân.",
    },
    tags: { en: ["Presentation", "Award winner"], vi: ["Thuyết trình", "Đạt giải"] },
    images: [
      act("TECH_INNOVATORS_CHALLENGE_1"),
      act("TECH_INNOVATORS_CHALLENGE_2"),
      act("TECH_INNOVATORS_CHALLENGE_3"),
      act("TECH_INNOVATORS_CHALLENGE_4"),
    ],
    featured: { en: "2nd Prize", vi: "Giải Nhì" },
  },
  {
    id: "thesis",
    period: "2025",
    title: { en: "Bachelor's Thesis Defense", vi: "Bảo vệ Khóa luận Tốt nghiệp" },
    desc: {
      en: "Successfully defended my bachelor's thesis in Information Technology — applying theory to solve practical problems with strong analytical and critical thinking.",
      vi: "Bảo vệ thành công khóa luận cử nhân ngành Công nghệ Thông tin — áp dụng lý thuyết để giải quyết bài toán thực tế với tư duy phân tích, phản biện.",
    },
    tags: { en: ["Academic", "Graduation"], vi: ["Học thuật", "Tốt nghiệp"] },
    images: [act("BVKHCN1"), act("BVKHCN2"), act("BVKHCN3")],
  },
  {
    id: "graduation",
    period: "04/2026",
    title: { en: "Graduation Ceremony", vi: "Lễ Tốt nghiệp" },
    desc: {
      en: "Officially graduated with a Bachelor's degree in Information Technology — the milestone closing four years of study, research and hands-on project work.",
      vi: "Chính thức tốt nghiệp cử nhân loại Xuất sắc ngành Công nghệ Thông tin với GPA 3.61 — cột mốc khép lại bốn năm học tập, nghiên cứu và thực hành qua các dự án thực tế.",
    },
    tags: { en: ["Graduation", "Bachelor's degree"], vi: ["Tốt nghiệp", "Cử nhân"] },
    images: [1, 2, 3, 4, 5, 6].map((n) => act(`Graduate_${n}`, "jpg")),
  },
];

export const stats: { value: number; suffix?: string; label: L }[] = [
  { value: projects.length, label: { en: "Real-world products built", vi: "Sản phẩm thực tế" } },
  { value: allTech.length, suffix: "+", label: { en: "Technologies & tools", vi: "Công nghệ & công cụ" } },
  { value: activities.length, label: { en: "Academic milestones", vi: "Hoạt động học thuật" } },
  { value: 2025, label: { en: "Thesis defended · IT", vi: "Bảo vệ khóa luận · CNTT" } },
];
