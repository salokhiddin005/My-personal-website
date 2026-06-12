import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHero from "./locales/en/hero.json";
import enAbout from "./locales/en/about.json";
import enExperience from "./locales/en/experience.json";
import enSkills from "./locales/en/skills.json";
import enProjects from "./locales/en/projects.json";
import enBlog from "./locales/en/blog.json";
import enGallery from "./locales/en/gallery.json";
import enEducation from "./locales/en/education.json";
import enContact from "./locales/en/contact.json";

import ruCommon from "./locales/ru/common.json";
import ruHero from "./locales/ru/hero.json";
import ruAbout from "./locales/ru/about.json";
import ruExperience from "./locales/ru/experience.json";
import ruSkills from "./locales/ru/skills.json";
import ruProjects from "./locales/ru/projects.json";
import ruBlog from "./locales/ru/blog.json";
import ruGallery from "./locales/ru/gallery.json";
import ruEducation from "./locales/ru/education.json";
import ruContact from "./locales/ru/contact.json";

import uzCommon from "./locales/uz/common.json";
import uzHero from "./locales/uz/hero.json";
import uzAbout from "./locales/uz/about.json";
import uzExperience from "./locales/uz/experience.json";
import uzSkills from "./locales/uz/skills.json";
import uzProjects from "./locales/uz/projects.json";
import uzBlog from "./locales/uz/blog.json";
import uzGallery from "./locales/uz/gallery.json";
import uzEducation from "./locales/uz/education.json";
import uzContact from "./locales/uz/contact.json";

const resources = {
  en: {
    common: enCommon,
    hero: enHero,
    about: enAbout,
    experience: enExperience,
    skills: enSkills,
    projects: enProjects,
    blog: enBlog,
    gallery: enGallery,
    education: enEducation,
    contact: enContact,
  },
  ru: {
    common: ruCommon,
    hero: ruHero,
    about: ruAbout,
    experience: ruExperience,
    skills: ruSkills,
    projects: ruProjects,
    blog: ruBlog,
    gallery: ruGallery,
    education: ruEducation,
    contact: ruContact,
  },
  uz: {
    common: uzCommon,
    hero: uzHero,
    about: uzAbout,
    experience: uzExperience,
    skills: uzSkills,
    projects: uzProjects,
    blog: uzBlog,
    gallery: uzGallery,
    education: uzEducation,
    contact: uzContact,
  },
};

const STORAGE_KEY = "language";
const savedLanguage = localStorage.getItem(STORAGE_KEY);

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
