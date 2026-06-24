export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Redirect main pages.dev subdomain to www.ampstowatt.com
  if (url.hostname === 'ampstowatt.pages.dev') {
    url.hostname = 'www.ampstowatt.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
