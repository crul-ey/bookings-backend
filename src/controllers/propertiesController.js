import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../services/propertiesService.js';

export async function getProperties(req, res, next) {
  try {
    const filters = {
      location: req.query.location,
      pricePerNight: req.query.pricePerNight,
      amenities: req.query.amenities,
    };

    const properties = await getAllProperties(filters);
    res.json(properties);
  } catch (err) {
    next(err);
  }
}

export async function getProperty(req, res, next) {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) {
      const error = new Error('Property niet gevonden');
      error.statusCode = 404;
      return next(error);
    }
    res.json(property);
  } catch (err) {
    next(err);
  }
}

export async function postProperty(req, res, next) {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    } = req.body;

    // Validaties
    if (!title || title.length < 3) {
      return res.status(400).json({ error: "Titel is verplicht en moet minimaal 3 tekens bevatten." });
    }

    if (!description || description.length < 10) {
      return res.status(400).json({ error: "Beschrijving is verplicht en moet minimaal 10 tekens bevatten." });
    }

    if (!location) {
      return res.status(400).json({ error: "Locatie is verplicht." });
    }

    if (typeof pricePerNight !== 'number' || pricePerNight <= 0) {
      return res.status(400).json({ error: "Prijs per nacht moet een positief getal zijn." });
    }

    if (!Number.isInteger(bedroomCount) || bedroomCount < 0) {
      return res.status(400).json({ error: "Aantal slaapkamers moet een niet-negatief geheel getal zijn." });
    }

    if (!Number.isInteger(bathRoomCount) || bathRoomCount < 0) {
      return res.status(400).json({ error: "Aantal badkamers moet een niet-negatief geheel getal zijn." });
    }

    if (!Number.isInteger(maxGuestCount) || maxGuestCount < 1) {
      return res.status(400).json({ error: "Max aantal gasten moet minimaal 1 zijn." });
    }

    if (!hostId || typeof hostId !== 'string') {
      return res.status(400).json({ error: "hostId is verplicht en moet een string zijn." });
    }

    const newProperty = await createProperty({
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    });

    res.status(201).json(newProperty);
  } catch (err) {
    next(err);
  }
}

export async function putProperty(req, res, next) {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    } = req.body;

    // Validaties (optioneel per veld)
    if (title && title.length < 3) {
      return res.status(400).json({ error: "Titel moet minimaal 3 tekens bevatten." });
    }

    if (description && description.length < 10) {
      return res.status(400).json({ error: "Beschrijving moet minimaal 10 tekens bevatten." });
    }

    if (pricePerNight !== undefined && (typeof pricePerNight !== 'number' || pricePerNight <= 0)) {
      return res.status(400).json({ error: "Prijs per nacht moet een positief getal zijn." });
    }

    if (bedroomCount !== undefined && (!Number.isInteger(bedroomCount) || bedroomCount < 0)) {
      return res.status(400).json({ error: "Aantal slaapkamers moet een niet-negatief geheel getal zijn." });
    }

    if (bathRoomCount !== undefined && (!Number.isInteger(bathRoomCount) || bathRoomCount < 0)) {
      return res.status(400).json({ error: "Aantal badkamers moet een niet-negatief geheel getal zijn." });
    }

    if (maxGuestCount !== undefined && (!Number.isInteger(maxGuestCount) || maxGuestCount < 1)) {
      return res.status(400).json({ error: "Max aantal gasten moet minimaal 1 zijn." });
    }

    const updated = await updateProperty(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function removeProperty(req, res, next) {
  try {
    await deleteProperty(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
