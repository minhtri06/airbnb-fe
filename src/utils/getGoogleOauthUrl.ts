const getGoogleOauthUrl = () => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
  }

  const searchParams = new URLSearchParams(options)

  return `${baseUrl}?${searchParams.toString()}`
}

export default getGoogleOauthUrl
