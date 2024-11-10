import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "All Articles",
        write: "Write Article",
        myArticle: "My Article",
        profile: "My Profile",
        logOut: "Log Out",
        logIn: "Log In",
      },
      input: {
        title: "Title",
        description: "Description",
        createdDate: "Created Date",
        readTime: "Read Time",
        category: "Category",
        author: "Author",
        avatar: "Avatar",
        password: "Password",
        name: "name",
        placholderTitle: "Write an article title...",
        placholderDescription: "Write an article description...",
        placholderCreatData: "Write down the time to read the article...",
        creatArticleTitle: "You can create your own article on this page!",
        creatArticleDes: "Enter the data of the article",
        navigateData: "👇Here are 10 article details.👇",
        noArticle: "Your article is not available.",
        paginationText:
          "👇Click the button below to see more article information!👇",
        navigateButton1: "See more...",
        navigateButton2: "Back to top...",
        myProfile: "My Profile.",
        loading: "loading...",
        writeButton: "Add.",
        filterCategory: "Filter by Category",
        filterButton: "Filter.",
      },
    },
  },
  ru: {
    translation: {
      navbar: {
        home: "Все статьи",
        write: "Написать статью",
        myArticle: "Моя статья",
        profile: "Мой профиль",
        logOut: "Выйти",
        logIn: "Входить",
      },
      input: {
        title: "Заголовок",
        description: "Описание",
        createdDate: "Дата создания",
        readTime: "Время чтения",
        category: "Категория",
        author: "Автор",
        avatar: "Аватар",
        password: "Пароль",
        name: "Имя",
        placholderTitle: "Напишите название статьи...",
        placholderDescription: "Напишите описание статьи...",
        placholderCreatData: "Запишите время прочтения статьи...",
        creatArticleTitle: "На этой странице вы можете создать свою статью!",
        creatArticleDes: "Введите данные статьи",
        navigateData: "👇 Вот подробности 10 статей.👇",
        noArticle: "Ваша статья недоступна.",
        paginationText:
          " 👇Нажмите кнопку ниже, чтобы увидеть дополнительную информацию о статье!👇",
        navigateButton1: "Посмотреть больше...",
        navigateButton2: "Вернуться к началу...",
        myProfile: "Мой профиль.",
        loading: "Загрузка...",
        writeButton: "Добавлять",
        filterCategory: "Фильтровать по категории.",
        filterButton: "Фильтрация.",
      },
    },
  },
  uz: {
    translation: {
      navbar: {
        home: "Bosh Sahifa",
        write: "Maqola Yozish",
        myArticle: "Mening Maqolam",
        profile: "Mening Profilim",
        logOut: "Chiqish",
        logIn: "Kirish",
      },
      input: {
        title: "Sarlavha",
        description: "Tavsif",
        createdDate: "Yaratilgan sana",
        readTime: "O'qish vaqti",
        category: "Turkum",
        author: "Muallif",
        avatar: "Avatar",
        password: "Parol",
        name: "Ism",
        placholderTitle: "Maqola sarlavhasini yozing...",
        placholderDescription: "Maqola tavsifini yozing...",
        placholderCreatData: "Maqola o'qish vaqtini yozing...",
        creatArticleTitle:
          "Bu sahifada siz o'z maqolangizni yaratishingiz mumkin!",
        creatArticleDes: "Maqolaning ma'lumotlarini kiritish",
        navigateData: "👇Bu yerda 10 ta maqola ma'lumotlari bor.👇",
        noArticle: "Sizning maqolangiz mavjud emas.",
        paginationText:
          "👇Boshqa maqola ma'lumotlarini ko'rish uchun pasdagi tugmani bosin!👇",
        navigateButton1: "Ko'proq ko'rish...",
        navigateButton2: "Boshiga qaytish...",
        myProfile: "Mening Profilim.",
        loading: "Yuklanmoqda...",
        writeButton: "Qo'shish",
        filterCategory: "Turkumi bo'yicha filtirlash.",
        filterButton: "Filterlash.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
