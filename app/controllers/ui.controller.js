import { i18n } from '../../server.js'


export function viewController(req, res, viewId, breadcrumbs=[]) {
  const supportedLangs = ['en', 'it']
  const fallback = 'en'
  const lang = req.params.lang || fallback

  const getViewParams = function(id, lang, path) {
    const baseUrl = process.env.BASE_URL || 'https://phoebe.com'
    const canonicalUrl = `${baseUrl}${path}`
    const hreflangs = supportedLangs.map(langCode => ({
      lang: langCode,
      url: `${baseUrl}${path.startsWith(`/${lang}`) ? 
        path.replace(new RegExp(`^/${lang}`), `/${langCode}`) : 
        `/${langCode}${path}`}`
    }))
    return {
      id,
      canonicalUrl,
      hreflangs,
      lang,
      breadcrumbs
    }
  }
  
  if (!supportedLangs.includes(lang)) {
    res.redirect(req.url.replace(new RegExp(`^/${lang}`), `/${fallback}`))
  } else {
    i18n.setLocale(req, lang)
    res.render(`${viewId}/${viewId}`, getViewParams(viewId, lang, req.path))
  }
}
