const {prisma} = require("./common");
const {faker} = require("@faker-js/faker");

const seed = async () => {
  try {

    const numUsers = 3;
    const numPlayLists = 5;

    for(let i = 0; i < numUsers; i++){
      const user = await prisma.user.create({
        data: {
          username: faker.internet.username(),
          playlists: {
            create: Array.from({length: numPlayLists}).map(()=>({
              name: faker.music.genre(),
              description: faker.lorem.sentence(),
            })),
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

seed();