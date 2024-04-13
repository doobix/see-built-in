export const categoryTitleMap = {
  hr: "HR + Recruiting",
  ea: "Executive Assistant",
  frontend: "Frontend",
};

export function convertCategoryTitle(cat) {
  return categoryTitleMap[cat];
}
