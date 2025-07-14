/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/discord */ \"(rsc)/./node_modules/next-auth/providers/discord.js\");\n\n\nconst ADMIN_DISCORD_IDS = process.env.ADMIN_DISCORD_IDS?.split(\",\") || [];\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        (0,next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.DISCORD_CLIENT_ID,\n            clientSecret: process.env.DISCORD_CLIENT_SECRET,\n            authorization: {\n                params: {\n                    scope: \"identify email\"\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user, account }) {\n            if (account && user) {\n                console.log(\"JWT Callback - Full user object:\", JSON.stringify(user, null, 2));\n                token.accessToken = account.access_token;\n                token.id = user.id;\n                token.name = user.username || user.name || user.global_name || \"Usuário Discord\";\n                if (user.image) {\n                    token.image = user.image;\n                } else if (user.avatar) {\n                    const extension = user.avatar.startsWith('a_') ? 'gif' : 'png';\n                    token.image = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}`;\n                } else {\n                    const defaultAvatarIndex = user.discriminator === '0' || !user.discriminator ? (BigInt(user.id) >> 22n) % 6n : Number.parseInt(user.discriminator) % 5;\n                    token.image = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;\n                }\n                console.log(\"Final token:\", {\n                    id: token.id,\n                    name: token.name,\n                    image: token.image\n                });\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            session.user = {\n                ...session.user,\n                id: token.id,\n                name: token.name,\n                image: token.image,\n                isAdmin: ADMIN_DISCORD_IDS.includes(token.id)\n            };\n            console.log(\"Session callback - Final session:\", {\n                id: session.user.id,\n                name: session.user.name,\n                image: session.user.image,\n                isAdmin: session.user.isAdmin\n            });\n            return session;\n        },\n        async signIn ({ user, account, profile }) {\n            console.log(\"SignIn callback - user allowed\");\n            return true;\n        }\n    },\n    pages: {\n        signIn: \"/\",\n        error: \"/\"\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    debug: \"development\" === \"development\"\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUN5QjtBQUV6RCxNQUFNRSxvQkFBb0JDLFFBQVFDLEdBQUcsQ0FBQ0YsaUJBQWlCLEVBQUVHLE1BQU0sUUFBUSxFQUFFO0FBRXpFLE1BQU1DLFVBQVVOLGdEQUFRQSxDQUFDO0lBQ3ZCTyxXQUFXO1FBQ1ROLHVFQUFlQSxDQUFDO1lBQ2RPLFVBQVVMLFFBQVFDLEdBQUcsQ0FBQ0ssaUJBQWlCO1lBQ3ZDQyxjQUFjUCxRQUFRQyxHQUFHLENBQUNPLHFCQUFxQjtZQUMvQ0MsZUFBZTtnQkFDYkMsUUFBUTtvQkFDTkMsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVDLElBQUksRUFBRUMsT0FBTyxFQUFFO1lBQ2hDLElBQUlBLFdBQVdELE1BQU07Z0JBQ25CRSxRQUFRQyxHQUFHLENBQUMsb0NBQW9DQyxLQUFLQyxTQUFTLENBQUNMLE1BQU0sTUFBTTtnQkFFM0VELE1BQU1PLFdBQVcsR0FBR0wsUUFBUU0sWUFBWTtnQkFDeENSLE1BQU1TLEVBQUUsR0FBR1IsS0FBS1EsRUFBRTtnQkFDbEJULE1BQU1VLElBQUksR0FBR1QsS0FBS1UsUUFBUSxJQUFJVixLQUFLUyxJQUFJLElBQUlULEtBQUtXLFdBQVcsSUFBSTtnQkFFL0QsSUFBSVgsS0FBS1ksS0FBSyxFQUFFO29CQUNkYixNQUFNYSxLQUFLLEdBQUdaLEtBQUtZLEtBQUs7Z0JBQzFCLE9BQU8sSUFBSVosS0FBS2EsTUFBTSxFQUFFO29CQUN0QixNQUFNQyxZQUFZZCxLQUFLYSxNQUFNLENBQUNFLFVBQVUsQ0FBQyxRQUFRLFFBQVE7b0JBQ3pEaEIsTUFBTWEsS0FBSyxHQUFHLENBQUMsbUNBQW1DLEVBQUVaLEtBQUtRLEVBQUUsQ0FBQyxDQUFDLEVBQUVSLEtBQUthLE1BQU0sQ0FBQyxDQUFDLEVBQUVDLFdBQVc7Z0JBQzNGLE9BQU87b0JBQ0wsTUFBTUUscUJBQXFCaEIsS0FBS2lCLGFBQWEsS0FBSyxPQUFPLENBQUNqQixLQUFLaUIsYUFBYSxHQUN4RSxDQUFDQyxPQUFPbEIsS0FBS1EsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEdBQzdCVyxPQUFPQyxRQUFRLENBQUNwQixLQUFLaUIsYUFBYSxJQUFJO29CQUMxQ2xCLE1BQU1hLEtBQUssR0FBRyxDQUFDLHlDQUF5QyxFQUFFSSxtQkFBbUIsSUFBSSxDQUFDO2dCQUNwRjtnQkFFQWQsUUFBUUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDMUJLLElBQUlULE1BQU1TLEVBQUU7b0JBQ1pDLE1BQU1WLE1BQU1VLElBQUk7b0JBQ2hCRyxPQUFPYixNQUFNYSxLQUFLO2dCQUNwQjtZQUNGO1lBQ0EsT0FBT2I7UUFDVDtRQUNBLE1BQU1zQixTQUFRLEVBQUVBLE9BQU8sRUFBRXRCLEtBQUssRUFBRTtZQUM5QnNCLFFBQVFyQixJQUFJLEdBQUc7Z0JBQ2IsR0FBR3FCLFFBQVFyQixJQUFJO2dCQUNmUSxJQUFJVCxNQUFNUyxFQUFFO2dCQUNaQyxNQUFNVixNQUFNVSxJQUFJO2dCQUNoQkcsT0FBT2IsTUFBTWEsS0FBSztnQkFDbEJVLFNBQVN0QyxrQkFBa0J1QyxRQUFRLENBQUN4QixNQUFNUyxFQUFFO1lBQzlDO1lBRUFOLFFBQVFDLEdBQUcsQ0FBQyxxQ0FBcUM7Z0JBQy9DSyxJQUFJYSxRQUFRckIsSUFBSSxDQUFDUSxFQUFFO2dCQUNuQkMsTUFBTVksUUFBUXJCLElBQUksQ0FBQ1MsSUFBSTtnQkFDdkJHLE9BQU9TLFFBQVFyQixJQUFJLENBQUNZLEtBQUs7Z0JBQ3pCVSxTQUFTRCxRQUFRckIsSUFBSSxDQUFDc0IsT0FBTztZQUMvQjtZQUVBLE9BQU9EO1FBQ1Q7UUFDQSxNQUFNRyxRQUFPLEVBQUV4QixJQUFJLEVBQUVDLE9BQU8sRUFBRXdCLE9BQU8sRUFBRTtZQUNyQ3ZCLFFBQVFDLEdBQUcsQ0FBQztZQUNaLE9BQU87UUFDVDtJQUNGO0lBQ0F1QixPQUFPO1FBQ0xGLFFBQVE7UUFDUkcsT0FBTztJQUNUO0lBQ0FDLFFBQVEzQyxRQUFRQyxHQUFHLENBQUMyQyxlQUFlO0lBQ25DQyxPQUFPN0Msa0JBQXlCO0FBQ2xDO0FBRTBDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGNpcmN1XFxEb3dubG9hZHNcXHNpdGUtdGF4YWRzXFxhcHBcXGFwaVxcYXV0aFxcWy4uLm5leHRhdXRoXVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IERpc2NvcmRQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9kaXNjb3JkXCJcblxuY29uc3QgQURNSU5fRElTQ09SRF9JRFMgPSBwcm9jZXNzLmVudi5BRE1JTl9ESVNDT1JEX0lEUz8uc3BsaXQoXCIsXCIpIHx8IFtdXG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aCh7XG4gIHByb3ZpZGVyczogW1xuICAgIERpc2NvcmRQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5ESVNDT1JEX0NMSUVOVF9TRUNSRVQhLFxuICAgICAgYXV0aG9yaXphdGlvbjoge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBzY29wZTogXCJpZGVudGlmeSBlbWFpbFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIsIGFjY291bnQgfSkge1xuICAgICAgaWYgKGFjY291bnQgJiYgdXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkpXVCBDYWxsYmFjayAtIEZ1bGwgdXNlciBvYmplY3Q6XCIsIEpTT04uc3RyaW5naWZ5KHVzZXIsIG51bGwsIDIpKVxuICAgICAgICBcbiAgICAgICAgdG9rZW4uYWNjZXNzVG9rZW4gPSBhY2NvdW50LmFjY2Vzc190b2tlblxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcbiAgICAgICAgdG9rZW4ubmFtZSA9IHVzZXIudXNlcm5hbWUgfHwgdXNlci5uYW1lIHx8IHVzZXIuZ2xvYmFsX25hbWUgfHwgXCJVc3XDoXJpbyBEaXNjb3JkXCJcbiAgICAgICAgXG4gICAgICAgIGlmICh1c2VyLmltYWdlKSB7XG4gICAgICAgICAgdG9rZW4uaW1hZ2UgPSB1c2VyLmltYWdlXG4gICAgICAgIH0gZWxzZSBpZiAodXNlci5hdmF0YXIpIHtcbiAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSB1c2VyLmF2YXRhci5zdGFydHNXaXRoKCdhXycpID8gJ2dpZicgOiAncG5nJ1xuICAgICAgICAgIHRva2VuLmltYWdlID0gYGh0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F2YXRhcnMvJHt1c2VyLmlkfS8ke3VzZXIuYXZhdGFyfS4ke2V4dGVuc2lvbn1gXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdEF2YXRhckluZGV4ID0gdXNlci5kaXNjcmltaW5hdG9yID09PSAnMCcgfHwgIXVzZXIuZGlzY3JpbWluYXRvclxuICAgICAgICAgICAgPyAoQmlnSW50KHVzZXIuaWQpID4+IDIybikgJSA2blxuICAgICAgICAgICAgOiBOdW1iZXIucGFyc2VJbnQodXNlci5kaXNjcmltaW5hdG9yKSAlIDVcbiAgICAgICAgICB0b2tlbi5pbWFnZSA9IGBodHRwczovL2Nkbi5kaXNjb3JkYXBwLmNvbS9lbWJlZC9hdmF0YXJzLyR7ZGVmYXVsdEF2YXRhckluZGV4fS5wbmdgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmluYWwgdG9rZW46XCIsIHtcbiAgICAgICAgICBpZDogdG9rZW4uaWQsXG4gICAgICAgICAgbmFtZTogdG9rZW4ubmFtZSxcbiAgICAgICAgICBpbWFnZTogdG9rZW4uaW1hZ2VcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIHNlc3Npb24udXNlciA9IHtcbiAgICAgICAgLi4uc2Vzc2lvbi51c2VyLFxuICAgICAgICBpZDogdG9rZW4uaWQgYXMgc3RyaW5nLFxuICAgICAgICBuYW1lOiB0b2tlbi5uYW1lIGFzIHN0cmluZyxcbiAgICAgICAgaW1hZ2U6IHRva2VuLmltYWdlIGFzIHN0cmluZyxcbiAgICAgICAgaXNBZG1pbjogQURNSU5fRElTQ09SRF9JRFMuaW5jbHVkZXModG9rZW4uaWQgYXMgc3RyaW5nKSxcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coXCJTZXNzaW9uIGNhbGxiYWNrIC0gRmluYWwgc2Vzc2lvbjpcIiwge1xuICAgICAgICBpZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICBuYW1lOiBzZXNzaW9uLnVzZXIubmFtZSxcbiAgICAgICAgaW1hZ2U6IHNlc3Npb24udXNlci5pbWFnZSxcbiAgICAgICAgaXNBZG1pbjogc2Vzc2lvbi51c2VyLmlzQWRtaW5cbiAgICAgIH0pXG4gICAgICBcbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2lnbkluIGNhbGxiYWNrIC0gdXNlciBhbGxvd2VkXCIpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9cIixcbiAgICBlcnJvcjogXCIvXCIsIFxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbiAgZGVidWc6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIsXG59KVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH0iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJEaXNjb3JkUHJvdmlkZXIiLCJBRE1JTl9ESVNDT1JEX0lEUyIsInByb2Nlc3MiLCJlbnYiLCJzcGxpdCIsImhhbmRsZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsIkRJU0NPUkRfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiRElTQ09SRF9DTElFTlRfU0VDUkVUIiwiYXV0aG9yaXphdGlvbiIsInBhcmFtcyIsInNjb3BlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJ1c2VyIiwiYWNjb3VudCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjZXNzVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJpZCIsIm5hbWUiLCJ1c2VybmFtZSIsImdsb2JhbF9uYW1lIiwiaW1hZ2UiLCJhdmF0YXIiLCJleHRlbnNpb24iLCJzdGFydHNXaXRoIiwiZGVmYXVsdEF2YXRhckluZGV4IiwiZGlzY3JpbWluYXRvciIsIkJpZ0ludCIsIk51bWJlciIsInBhcnNlSW50Iiwic2Vzc2lvbiIsImlzQWRtaW4iLCJpbmNsdWRlcyIsInNpZ25JbiIsInByb2ZpbGUiLCJwYWdlcyIsImVycm9yIiwic2VjcmV0IiwiTkVYVEFVVEhfU0VDUkVUIiwiZGVidWciLCJHRVQiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_circu_Downloads_site_taxads_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\circu\\\\Downloads\\\\site-taxads\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_circu_Downloads_site_taxads_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNjaXJjdSU1Q0Rvd25sb2FkcyU1Q3NpdGUtdGF4YWRzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNjaXJjdSU1Q0Rvd25sb2FkcyU1Q3NpdGUtdGF4YWRzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpQztBQUM5RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcY2lyY3VcXFxcRG93bmxvYWRzXFxcXHNpdGUtdGF4YWRzXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGNpcmN1XFxcXERvd25sb2Fkc1xcXFxzaXRlLXRheGFkc1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/oidc-token-hash","vendor-chunks/preact","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();