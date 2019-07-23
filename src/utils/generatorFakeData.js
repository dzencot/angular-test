import faker from 'faker';

faker.locale = 'ru';

const generateUser = () => {
  const name = faker.name.firstName();
  const lastName = faker.name.lastName();
  return { name, lastName };
};

export { generateUser };
