export default function concatClasses(classes = []) {
  return classes.filter(c => c).join(' ');
}
