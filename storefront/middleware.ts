import { Region } from '@medusajs/medusa';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:9000';
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'us';

const regionMapCache = {
  regionMap: new Map<string, Region>(),
  regionMapUpdated: Date.now(),
};

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      next: {
        revalidate: 3600,
        tags: ['regions'],
      },
    }).then((res) => res.json());

    if (!regions) {
      notFound();
    }

    // Create a map of country codes to regions.
    regions.forEach((region: Region) => {
      region.countries.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2, region);
      });
    });

    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, Region | number>
) {
  try {
    let countryCode;

    const vercelCountryCode = request.headers
      .get('x-vercel-ip-country')
      ?.toLowerCase();

    const urlCountryCode = request.nextUrl.pathname
      .split('/')[1]
      ?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode;
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode;
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION;
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value;
    }

    return countryCode;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?'
      );
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isOnboarding = searchParams.get('onboarding') === 'true';
  const onboardingCookie = request.cookies.get('_medusa_onboarding');

  const regionMap = await getRegionMap();

  const countryCode = regionMap && (await getCountryCode(request, regionMap));
  if (
    request.nextUrl.pathname === '/icons.svg' ||
    request.nextUrl.pathname === '/_next/image'
  ) {
    return;
  }

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split('/')[1].includes(countryCode);
  // check if one of the country codes is in the url

  if (urlHasCountryCode && (!isOnboarding || onboardingCookie)) {
    return request.nextUrl.pathname === `/${countryCode}`
      ? NextResponse.redirect(
          `${request.nextUrl.origin}/${countryCode}/home`,
          307
        )
      : NextResponse.next();
  }

  let response = NextResponse.redirect(request.nextUrl, 307);

  // If no country code is set, we redirect to the relevant region.
  if (!urlHasCountryCode && countryCode) {
    const redirectPath =
      request.nextUrl.pathname === '/' ? '/home' : request.nextUrl.pathname;

    response = NextResponse.redirect(
      `${request.nextUrl.origin}/${countryCode}${redirectPath}`,
      307
    );
  }

  // Set a cookie to indicate that we're onboarding. This is used to show the onboarding flow.
  if (isOnboarding) {
    response.cookies.set('_medusa_onboarding', 'true', {
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
