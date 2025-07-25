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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n\n\nasync function GET() {\n    try {\n        const pendingReports = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      SELECT * FROM reports WHERE status = 'pending'\n    `;\n        const approvedReports = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      SELECT * FROM reports WHERE status = 'approved'\n    `;\n        const rejectedReports = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      SELECT * FROM reports WHERE status = 'rejected'\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            pendingReports,\n            approvedReports,\n            rejectedReports\n        });\n    } catch (error) {\n        console.error('Database error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { authorId, authorName, scammerName, scammerId, description, images, status = 'pending' } = body;\n        if (!scammerName || !description) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: `Missing required fields: ${!scammerName ? 'scammerName ' : ''}${!description ? 'description' : ''}`.trim()\n            }, {\n                status: 400\n            });\n        }\n        const result = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      INSERT INTO reports (\n        author_id,\n        author_name,\n        scammer_name,\n        scammer_id,\n        description,\n        images,\n        status\n      ) VALUES (\n        ${authorId},\n        ${authorName},\n        ${scammerName},\n        ${scammerId},\n        ${description},\n        ${images},\n        ${status}\n      ) RETURNING *\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result[0]);\n    } catch (error) {\n        console.error('Database error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PATCH(request) {\n    try {\n        const body = await request.json();\n        const { id, status, risk } = body;\n        const result = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`\n      UPDATE reports\n      SET status = ${status}${risk ? (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])`, risk = ${risk}` : (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])``}\n      WHERE id = ${id}\n      RETURNING *\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result[0]);\n    } catch (error) {\n        console.error('Database error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlcG9ydHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDaEI7QUFFcEIsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLGlCQUFpQixNQUFNRixtREFBRyxDQUFDOztJQUVqQyxDQUFDO1FBQ0QsTUFBTUcsa0JBQWtCLE1BQU1ILG1EQUFHLENBQUM7O0lBRWxDLENBQUM7UUFDRCxNQUFNSSxrQkFBa0IsTUFBTUosbURBQUcsQ0FBQzs7SUFFbEMsQ0FBQztRQUVELE9BQU9ELHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFDdkJIO1lBQ0FDO1lBQ0FDO1FBQ0Y7SUFDRixFQUFFLE9BQU9FLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT1AscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQzdFO0FBQ0Y7QUFFTyxlQUFlQyxLQUFLQyxPQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxRQUFRTCxJQUFJO1FBQy9CLE1BQU0sRUFBRU8sUUFBUSxFQUFFQyxVQUFVLEVBQUVDLFdBQVcsRUFBRUMsU0FBUyxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sRUFBRVQsU0FBUyxTQUFTLEVBQUUsR0FBR0c7UUFFbEcsSUFBSSxDQUFDRyxlQUFlLENBQUNFLGFBQWE7WUFDOUIsT0FBT2pCLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7Z0JBQUVDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDUSxjQUFjLGlCQUFpQixLQUFLLENBQUNFLGNBQWMsZ0JBQWdCLElBQUksQ0FBQ0UsSUFBSTtZQUFHLEdBQUc7Z0JBQUVWLFFBQVE7WUFBSTtRQUNuSztRQUVBLE1BQU1XLFNBQVMsTUFBTW5CLG1EQUFHLENBQUM7Ozs7Ozs7Ozs7UUFVckIsRUFBRVksU0FBUztRQUNYLEVBQUVDLFdBQVc7UUFDYixFQUFFQyxZQUFZO1FBQ2QsRUFBRUMsVUFBVTtRQUNaLEVBQUVDLFlBQVk7UUFDZCxFQUFFQyxPQUFPO1FBQ1QsRUFBRVQsT0FBTzs7SUFFYixDQUFDO1FBRUQsT0FBT1QscURBQVlBLENBQUNNLElBQUksQ0FBQ2MsTUFBTSxDQUFDLEVBQUU7SUFDcEMsRUFBRSxPQUFPYixPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxtQkFBbUJBO1FBQ2pDLE9BQU9QLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUM3RTtBQUNGO0FBRU8sZUFBZVksTUFBTVYsT0FBZ0I7SUFDMUMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUwsSUFBSTtRQUMvQixNQUFNLEVBQUVnQixFQUFFLEVBQUViLE1BQU0sRUFBRWMsSUFBSSxFQUFFLEdBQUdYO1FBRTdCLE1BQU1RLFNBQVMsTUFBTW5CLG1EQUFHLENBQUM7O21CQUVWLEVBQUVRLE9BQU8sRUFBRWMsT0FBT3RCLG1EQUFHLENBQUMsU0FBUyxFQUFFc0IsS0FBSyxDQUFDLEdBQUd0QixtREFBRyxDQUFDLENBQUMsQ0FBQztpQkFDbEQsRUFBRXFCLEdBQUc7O0lBRWxCLENBQUM7UUFFRCxPQUFPdEIscURBQVlBLENBQUNNLElBQUksQ0FBQ2MsTUFBTSxDQUFDLEVBQUU7SUFDcEMsRUFBRSxPQUFPYixPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxtQkFBbUJBO1FBQ2pDLE9BQU9QLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGNpcmN1XFxEb3dubG9hZHNcXHNpdGUtdGF4YWRzXFxhcHBcXGFwaVxccmVwb3J0c1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHNxbCBmcm9tICdAL2xpYi9kYic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGVuZGluZ1JlcG9ydHMgPSBhd2FpdCBzcWxgXG4gICAgICBTRUxFQ1QgKiBGUk9NIHJlcG9ydHMgV0hFUkUgc3RhdHVzID0gJ3BlbmRpbmcnXG4gICAgYDtcbiAgICBjb25zdCBhcHByb3ZlZFJlcG9ydHMgPSBhd2FpdCBzcWxgXG4gICAgICBTRUxFQ1QgKiBGUk9NIHJlcG9ydHMgV0hFUkUgc3RhdHVzID0gJ2FwcHJvdmVkJ1xuICAgIGA7XG4gICAgY29uc3QgcmVqZWN0ZWRSZXBvcnRzID0gYXdhaXQgc3FsYFxuICAgICAgU0VMRUNUICogRlJPTSByZXBvcnRzIFdIRVJFIHN0YXR1cyA9ICdyZWplY3RlZCdcbiAgICBgO1xuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBwZW5kaW5nUmVwb3J0cyxcbiAgICAgIGFwcHJvdmVkUmVwb3J0cyxcbiAgICAgIHJlamVjdGVkUmVwb3J0c1xuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludGVybmFsIFNlcnZlciBFcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgIGNvbnN0IHsgYXV0aG9ySWQsIGF1dGhvck5hbWUsIHNjYW1tZXJOYW1lLCBzY2FtbWVySWQsIGRlc2NyaXB0aW9uLCBpbWFnZXMsIHN0YXR1cyA9ICdwZW5kaW5nJyB9ID0gYm9keTtcblxuICAgIGlmICghc2NhbW1lck5hbWUgfHwgIWRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBgTWlzc2luZyByZXF1aXJlZCBmaWVsZHM6ICR7IXNjYW1tZXJOYW1lID8gJ3NjYW1tZXJOYW1lICcgOiAnJ30keyFkZXNjcmlwdGlvbiA/ICdkZXNjcmlwdGlvbicgOiAnJ31gLnRyaW0oKSB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNxbGBcbiAgICAgIElOU0VSVCBJTlRPIHJlcG9ydHMgKFxuICAgICAgICBhdXRob3JfaWQsXG4gICAgICAgIGF1dGhvcl9uYW1lLFxuICAgICAgICBzY2FtbWVyX25hbWUsXG4gICAgICAgIHNjYW1tZXJfaWQsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHN0YXR1c1xuICAgICAgKSBWQUxVRVMgKFxuICAgICAgICAke2F1dGhvcklkfSxcbiAgICAgICAgJHthdXRob3JOYW1lfSxcbiAgICAgICAgJHtzY2FtbWVyTmFtZX0sXG4gICAgICAgICR7c2NhbW1lcklkfSxcbiAgICAgICAgJHtkZXNjcmlwdGlvbn0sXG4gICAgICAgICR7aW1hZ2VzfSxcbiAgICAgICAgJHtzdGF0dXN9XG4gICAgICApIFJFVFVSTklORyAqXG4gICAgYDtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHRbMF0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludGVybmFsIFNlcnZlciBFcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0gocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCB7IGlkLCBzdGF0dXMsIHJpc2sgfSA9IGJvZHk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzcWxgXG4gICAgICBVUERBVEUgcmVwb3J0c1xuICAgICAgU0VUIHN0YXR1cyA9ICR7c3RhdHVzfSR7cmlzayA/IHNxbGAsIHJpc2sgPSAke3Jpc2t9YCA6IHNxbGBgfVxuICAgICAgV0hFUkUgaWQgPSAke2lkfVxuICAgICAgUkVUVVJOSU5HICpcbiAgICBgO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdFswXSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRGF0YWJhc2UgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInNxbCIsIkdFVCIsInBlbmRpbmdSZXBvcnRzIiwiYXBwcm92ZWRSZXBvcnRzIiwicmVqZWN0ZWRSZXBvcnRzIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImF1dGhvcklkIiwiYXV0aG9yTmFtZSIsInNjYW1tZXJOYW1lIiwic2NhbW1lcklkIiwiZGVzY3JpcHRpb24iLCJpbWFnZXMiLCJ0cmltIiwicmVzdWx0IiwiUEFUQ0giLCJpZCIsInJpc2siXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/reports/route.ts\n");

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