import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const STORAGE_KEY = "language"

const languages = [
  { code: "en", labelKey: "language.en" },
  { code: "ru", labelKey: "language.ru" },
  { code: "uz", labelKey: "language.uz" },
] as const

export function LanguageToggle() {
  const { t, i18n } = useTranslation("common")

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem(STORAGE_KEY, code)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 border-none font-mono text-[10px] font-bold uppercase"
        >
          {i18n.language}
          <span className="sr-only">{t("language.toggleAria")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(({ code, labelKey }) => (
          <DropdownMenuItem key={code} onClick={() => changeLanguage(code)}>
            {t(labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
