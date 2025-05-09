import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/usersService.js';

export async function getUsers(req, res, next) {
  try {
    const filters = {
      username: req.query.username,
      email: req.query.email,
    };

    const users = await getAllUsers(filters);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      const error = new Error('User niet gevonden');
      error.statusCode = 404;
      return next(error);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function postUser(req, res, next) {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } = req.body;

    // 🔐 Validaties
    if (!username || username.length < 3) {
      return res.status(400).json({ error: "Username is verplicht en moet minimaal 3 tekens bevatten." });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Wachtwoord is verplicht en moet minimaal 6 tekens bevatten." });
    }

    if (!name || name.length < 2) {
      return res.status(400).json({ error: "Naam is verplicht." });
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ error: "Voer een geldig e-mailadres in." });
    }

    if (!phoneNumber || phoneNumber.length < 6) {
      return res.status(400).json({ error: "Voer een geldig telefoonnummer in." });
    }

    // 👤 User aanmaken
    const newUser = await createUser({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export async function putUser(req, res, next) {
  try {
    const { username, email, name, phoneNumber } = req.body;

    if (username && username.length < 3) {
      return res.status(400).json({ error: "Username moet minimaal 3 tekens bevatten." });
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
      return res.status(400).json({ error: "Voer een geldig e-mailadres in." });
    }

    if (name && name.length < 2) {
      return res.status(400).json({ error: "Naam is te kort." });
    }

    if (phoneNumber && phoneNumber.length < 6) {
      return res.status(400).json({ error: "Ongeldig telefoonnummer." });
    }

    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}


export async function removeUser(req, res, next) {
  try {
    await deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
