export const ITEM_PER_PAGE = 10

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/Dashboard/admin(.*)": ["admin"],
  "/Dashboard/student(.*)": ["student"],
  "/Dashboard/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],
  "/Dashboard/list/teachers": ["admin", "teacher"],
  "/Dashboard/list/students": ["admin", "teacher"],
  "/Dashboard/list/parents": ["admin", "teacher"],
  "/Dashboard/list/subjects": ["admin"],
  "/Dashboard/list/classes": ["admin", "teacher"],
  "/Dashboard/list/exams": ["admin", "teacher", "student", "parent"],
  // "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/Dashboard/list/results": ["admin", "teacher", "student", "parent"],
  // "/list/attendance": ["admin", "teacher", "student", "parent"],
  // "/list/events": ["admin", "teacher", "student", "parent"],
  // "/list/announcements": ["admin", "teacher", "student", "parent"],
};