import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
  // WANT TO ACCESS PRIVATE ROUTE && NOT AUTHENTICATED
  if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
    // FORCE DIRECT REQUEST TO THE /AUTH ROUTE (PUBLIC ROUTE)
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  // WANT TO ACCESS PUBLIC ROUTE && AUTHENTICATED USERS
  if (isPublicPage(request) && isAuthenticatedNextjs()) {
    // FORCE DIRECT REQUEST TO THE / ROUTE (PRIVATE ROUTE)
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
