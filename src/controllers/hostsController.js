import {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
} from '../services/hostsService.js';

export async function getHosts(req, res, next) {
  try {
    const filters = {
      name: req.query.name,
      email: req.query.email,
      username: req.query.username,
    };

    const hosts = await getAllHosts(filters);
    res.json(hosts);
  } catch (err) {
    next(err);
  }
}

export async function getHost(req, res, next) {
  try {
    const host = await getHostById(req.params.id);
    if (!host) {
      const error = new Error('Host niet gevonden');
      error.statusCode = 404;
      return next(error);
    }
    res.json(host);
  } catch (err) {
    next(err);
  }
}

export async function postHost(req, res, next) {
  try {
    const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

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

    // ✅ Host aanmaken
    const newHost = await createHost({
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    res.status(201).json(newHost);
  } catch (err) {
    next(err);
  }
}

export async function putHost(req, res, next) {
  try {
    const existing = await getHostById(req.params.id);
    if (!existing) {
      const error = new Error("Host bestaat niet");
      error.statusCode = 404;
      return next(error);
    }

    const updatedHost = await updateHost(req.params.id, req.body);
    res.json(updatedHost);
  } catch (err) {
    next(err);
  }
}

export async function removeHost(req, res, next) {
  try {
    const existing = await getHostById(req.params.id);
    if (!existing) {
      const error = new Error("Host bestaat niet");
      error.statusCode = 404;
      return next(error);
    }

    await deleteHost(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
