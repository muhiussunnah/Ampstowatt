export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Redirect the Pages production subdomain to the canonical apex domain
  if (url.hostname === 'ampstowatt-site.pages.dev') {
    url.hostname = 'ampstowatt.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
