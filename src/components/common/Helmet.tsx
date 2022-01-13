import { Helmet } from 'react-helmet'

export const helmets = (
  <Helmet
    title="CAFE LOCATOR"
    description="카페 로케이터"
    htmlAttributes={{ lang: 'ko' }}
    meta={[
      {
        charset: 'UTF-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
      {
        name: 'description',
        content: 'CAFE LOCATOR',
      },
      {
        name: 'og:title',
        content: 'CAFE LOCATOR',
      },
      {
        name: 'og:description',
        content: 'CAFE LOCATOR',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        content: 'http://calicafefinder.com/favicon.ico',
      },
    ]}
    link={[
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
      },
    ]}
  />
)
