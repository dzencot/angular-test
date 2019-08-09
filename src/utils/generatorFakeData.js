import faker from 'faker';
import uniqid from 'uniqid';

faker.locale = 'ru';

const generateUser = () => {
  const name = faker.name.firstName();
  const lastName = faker.name.lastName();
  return { name, lastName, id: uniqid };
};

export { generateUser };
