export function convertCategoryTitle(cat) {
  switch (cat) {
    case 'hr':
      return 'HR + Recruiting';
    case 'frontend':
      return 'Frontend';
    default:
      return '';
  }
}