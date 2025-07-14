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
exports.id = "app/api/reports/route";
exports.ids = ["app/api/reports/route"];
exports.modules = {

/***/ "(rsc)/./app/api/reports/route.ts":
/*!**********************************!*\
  !*** ./app/api/reports/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n\n\nasync function GET() {\n    try {\n        const pendingReports = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      SELECT * FROM reports WHERE status = 'pending'\n    `;\n        const approvedReports = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      SELECT * FROM reports WHERE status = 'approved'\n    `;\n        const rejectedReports = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      SELECT * FROM reports WHERE status = 'rejected'\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            pendingReports,\n            approvedReports,\n            rejectedReports\n        });\n    } catch (error) {\n        console.error('Database error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { authorId, authorName, scammerName, scammerId, description, images, status = 'pending' } = body;\n        const result = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      INSERT INTO reports (\n        author_id,\n        author_name,\n        scammer_name,\n        scammer_id,\n        description,\n        images,\n        status\n      ) VALUES (\n        ${authorId},\n        ${authorName},\n        ${scammerName},\n        ${scammerId},\n        ${description},\n        ${images},\n        ${status}\n      ) RETURNING *\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result[0]);\n    } catch (error) {\n        console.error('Database error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PATCH(request) {\n    try {\n        const body = await request.json();\n        const { id, status, risk } = body;\n        const result = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      UPDATE reports\n      SET status = ${status}${risk ? (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`, risk = ${risk}` : (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])``}\n      WHERE id = ${id}\n      RETURNING *\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result[0]);\n    } catch (error) {\n        console.error('Database error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlcG9ydHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDaEI7QUFFcEIsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLGlCQUFpQixNQUFNRixtREFBRyxDQUFDOztJQUVqQyxDQUFDO1FBQ0QsTUFBTUcsa0JBQWtCLE1BQU1ILG1EQUFHLENBQUM7O0lBRWxDLENBQUM7UUFDRCxNQUFNSSxrQkFBa0IsTUFBTUosbURBQUcsQ0FBQzs7SUFFbEMsQ0FBQztRQUVELE9BQU9ELHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFDdkJIO1lBQ0FDO1lBQ0FDO1FBQ0Y7SUFDRixFQUFFLE9BQU9FLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT1AscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQzdFO0FBQ0Y7QUFFTyxlQUFlQyxLQUFLQyxPQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxRQUFRTCxJQUFJO1FBQy9CLE1BQU0sRUFBRU8sUUFBUSxFQUFFQyxVQUFVLEVBQUVDLFdBQVcsRUFBRUMsU0FBUyxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sRUFBRVQsU0FBUyxTQUFTLEVBQUUsR0FBR0c7UUFFbEcsTUFBTU8sU0FBUyxNQUFNbEIsbURBQUcsQ0FBQzs7Ozs7Ozs7OztRQVVyQixFQUFFWSxTQUFTO1FBQ1gsRUFBRUMsV0FBVztRQUNiLEVBQUVDLFlBQVk7UUFDZCxFQUFFQyxVQUFVO1FBQ1osRUFBRUMsWUFBWTtRQUNkLEVBQUVDLE9BQU87UUFDVCxFQUFFVCxPQUFPOztJQUViLENBQUM7UUFFRCxPQUFPVCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDYSxNQUFNLENBQUMsRUFBRTtJQUNwQyxFQUFFLE9BQU9aLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT1AscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQzdFO0FBQ0Y7QUFFTyxlQUFlVyxNQUFNVCxPQUFnQjtJQUMxQyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxRQUFRTCxJQUFJO1FBQy9CLE1BQU0sRUFBRWUsRUFBRSxFQUFFWixNQUFNLEVBQUVhLElBQUksRUFBRSxHQUFHVjtRQUU3QixNQUFNTyxTQUFTLE1BQU1sQixtREFBRyxDQUFDOzttQkFFVixFQUFFUSxPQUFPLEVBQUVhLE9BQU9yQixtREFBRyxDQUFDLFNBQVMsRUFBRXFCLEtBQUssQ0FBQyxHQUFHckIsbURBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2xELEVBQUVvQixHQUFHOztJQUVsQixDQUFDO1FBRUQsT0FBT3JCLHFEQUFZQSxDQUFDTSxJQUFJLENBQUNhLE1BQU0sQ0FBQyxFQUFFO0lBQ3BDLEVBQUUsT0FBT1osT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsbUJBQW1CQTtRQUNqQyxPQUFPUCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxjaXJjdVxcRG93bmxvYWRzXFxzaXRlLXRheGFkc1xcYXBwXFxhcGlcXHJlcG9ydHNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCBzcWwgZnJvbSAnQC9saWIvZGInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBlbmRpbmdSZXBvcnRzID0gYXdhaXQgc3FsYFxuICAgICAgU0VMRUNUICogRlJPTSByZXBvcnRzIFdIRVJFIHN0YXR1cyA9ICdwZW5kaW5nJ1xuICAgIGA7XG4gICAgY29uc3QgYXBwcm92ZWRSZXBvcnRzID0gYXdhaXQgc3FsYFxuICAgICAgU0VMRUNUICogRlJPTSByZXBvcnRzIFdIRVJFIHN0YXR1cyA9ICdhcHByb3ZlZCdcbiAgICBgO1xuICAgIGNvbnN0IHJlamVjdGVkUmVwb3J0cyA9IGF3YWl0IHNxbGBcbiAgICAgIFNFTEVDVCAqIEZST00gcmVwb3J0cyBXSEVSRSBzdGF0dXMgPSAncmVqZWN0ZWQnXG4gICAgYDtcbiAgICBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgcGVuZGluZ1JlcG9ydHMsXG4gICAgICBhcHByb3ZlZFJlcG9ydHMsXG4gICAgICByZWplY3RlZFJlcG9ydHNcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCB7IGF1dGhvcklkLCBhdXRob3JOYW1lLCBzY2FtbWVyTmFtZSwgc2NhbW1lcklkLCBkZXNjcmlwdGlvbiwgaW1hZ2VzLCBzdGF0dXMgPSAncGVuZGluZycgfSA9IGJvZHk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzcWxgXG4gICAgICBJTlNFUlQgSU5UTyByZXBvcnRzIChcbiAgICAgICAgYXV0aG9yX2lkLFxuICAgICAgICBhdXRob3JfbmFtZSxcbiAgICAgICAgc2NhbW1lcl9uYW1lLFxuICAgICAgICBzY2FtbWVyX2lkLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgaW1hZ2VzLFxuICAgICAgICBzdGF0dXNcbiAgICAgICkgVkFMVUVTIChcbiAgICAgICAgJHthdXRob3JJZH0sXG4gICAgICAgICR7YXV0aG9yTmFtZX0sXG4gICAgICAgICR7c2NhbW1lck5hbWV9LFxuICAgICAgICAke3NjYW1tZXJJZH0sXG4gICAgICAgICR7ZGVzY3JpcHRpb259LFxuICAgICAgICAke2ltYWdlc30sXG4gICAgICAgICR7c3RhdHVzfVxuICAgICAgKSBSRVRVUk5JTkcgKlxuICAgIGA7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVzdWx0WzBdKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgY29uc3QgeyBpZCwgc3RhdHVzLCByaXNrIH0gPSBib2R5O1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3FsYFxuICAgICAgVVBEQVRFIHJlcG9ydHNcbiAgICAgIFNFVCBzdGF0dXMgPSAke3N0YXR1c30ke3Jpc2sgPyBzcWxgLCByaXNrID0gJHtyaXNrfWAgOiBzcWxgYH1cbiAgICAgIFdIRVJFIGlkID0gJHtpZH1cbiAgICAgIFJFVFVSTklORyAqXG4gICAgYDtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHRbMF0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludGVybmFsIFNlcnZlciBFcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJzcWwiLCJHRVQiLCJwZW5kaW5nUmVwb3J0cyIsImFwcHJvdmVkUmVwb3J0cyIsInJlamVjdGVkUmVwb3J0cyIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJhdXRob3JJZCIsImF1dGhvck5hbWUiLCJzY2FtbWVyTmFtZSIsInNjYW1tZXJJZCIsImRlc2NyaXB0aW9uIiwiaW1hZ2VzIiwicmVzdWx0IiwiUEFUQ0giLCJpZCIsInJpc2siXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/reports/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nvar serverless_1 = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.js\");\nif (!process.env.DATABASE_URL) {\n    throw new Error('DATABASE_URL is not set');\n}\nvar sql = (0, serverless_1.neon)(process.env.DATABASE_URL);\nexports[\"default\"] = sql;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYkEsOENBQTZDO0lBQUVHLE9BQU87QUFBSyxDQUFDLEVBQUM7QUFDN0QsSUFBSUMsZUFBZUMsbUJBQU9BLENBQUMsd0ZBQTBCO0FBQ3JELElBQUksQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEVBQUU7SUFDM0IsTUFBTSxJQUFJQyxNQUFNO0FBQ3BCO0FBQ0EsSUFBSUMsTUFBTSxDQUFDLEdBQUdOLGFBQWFPLElBQUksRUFBRUwsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0FBQ3pETixrQkFBZSxHQUFHUSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxjaXJjdVxcRG93bmxvYWRzXFxzaXRlLXRheGFkc1xcbGliXFxkYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzZXJ2ZXJsZXNzXzEgPSByZXF1aXJlKFwiQG5lb25kYXRhYmFzZS9zZXJ2ZXJsZXNzXCIpO1xuaWYgKCFwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RBVEFCQVNFX1VSTCBpcyBub3Qgc2V0Jyk7XG59XG52YXIgc3FsID0gKDAsIHNlcnZlcmxlc3NfMS5uZW9uKShwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwpO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3FsO1xuIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwic2VydmVybGVzc18xIiwicmVxdWlyZSIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9VUkwiLCJFcnJvciIsInNxbCIsIm5lb24iLCJkZWZhdWx0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Froute&page=%2Fapi%2Freports%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Froute&page=%2Fapi%2Freports%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_circu_Downloads_site_taxads_app_api_reports_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/reports/route.ts */ \"(rsc)/./app/api/reports/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/reports/route\",\n        pathname: \"/api/reports\",\n        filename: \"route\",\n        bundlePath: \"app/api/reports/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\circu\\\\Downloads\\\\site-taxads\\\\app\\\\api\\\\reports\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_circu_Downloads_site_taxads_app_api_reports_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZXBvcnRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyZXBvcnRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmVwb3J0cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNjaXJjdSU1Q0Rvd25sb2FkcyU1Q3NpdGUtdGF4YWRzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNjaXJjdSU1Q0Rvd25sb2FkcyU1Q3NpdGUtdGF4YWRzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcY2lyY3VcXFxcRG93bmxvYWRzXFxcXHNpdGUtdGF4YWRzXFxcXGFwcFxcXFxhcGlcXFxccmVwb3J0c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcmVwb3J0cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JlcG9ydHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3JlcG9ydHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxjaXJjdVxcXFxEb3dubG9hZHNcXFxcc2l0ZS10YXhhZHNcXFxcYXBwXFxcXGFwaVxcXFxyZXBvcnRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Froute&page=%2Fapi%2Freports%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@neondatabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Froute&page=%2Fapi%2Freports%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Froute.ts&appDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ccircu%5CDownloads%5Csite-taxads&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();