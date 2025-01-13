const {express, prisma} = require("../common");
const router = express.Router();
const {faker} = require("@faker-js/faker");
module.exports = router;

router.get("/",(req,res) => {
  res.status(200).send("I am in user.js");
});

router.get("/users", async (req,res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/users/:id", async (req,res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        playlists: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/users/:id/playlists", async (req,res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await prisma.playlist.create({
      data: {
        name: faker.music.genre(),
        description: faker.lorem.sentence(),
        ownerId: id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

