import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import * as enContent from "../content.js";
import * as esContent from "../content.es.js";
import { UI } from "./copy.js";
import {
  homePath,
  localeFromPath,
  localizeHref,
  switchLocalePath,
  withLocale,
  type Locale,
} from "../routes";

export type I18nValue = {
  locale: Locale;
  t: (typeof UI)["en"];
  content: typeof enContent | typeof esContent;
  home: string;
  localize: (href: string) => string;
  localizedPath: (path: string) => string;
  switchTo: (target: Locale) => string;
};

const LocaleContext = createContext<I18nValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const value = useMemo(() => {
    const locale = localeFromPath(location.pathname);
    return {
      locale,
      t: UI[locale],
      content: locale === "es" ? esContent : enContent,
      home: homePath(locale),
      localize: (href: string) => localizeHref(href, locale),
      localizedPath: (path: string) => withLocale(path, locale),
      switchTo: (target: Locale) => switchLocalePath(location.pathname, location.hash, target),
    };
  }, [location.hash, location.pathname]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}
