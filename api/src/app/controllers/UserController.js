import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res
        .status(401)
        .json({ error: { message: 'User already exists.' } });
    }

    const { id, name, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
