import genders from '../constants/genders';

export default function getGenderNameFromId(id = 0) {
  return genders[id] || genders[0];
}
