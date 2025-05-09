import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../services/reviewsService.js';

// ✅ GET /reviews
export async function getReviews(req, res, next) {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

// ✅ GET /reviews/:id
export async function getReview(req, res, next) {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review niet gevonden' });
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
}

// ✅ POST /reviews
export async function postReview(req, res, next) {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    // 🔐 Validatie
    if (!userId || !propertyId) {
      return res.status(400).json({ error: 'userId en propertyId zijn verplicht.' });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating moet een getal zijn tussen 1 en 5.' });
    }

    const newReview = await createReview({ userId, propertyId, rating, comment });
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
}

// ✅ PUT /reviews/:id
export async function putReview(req, res, next) {
  try {
    const updatedReview = await updateReview(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review niet gevonden' });
    }
    res.json(updatedReview);
  } catch (err) {
    next(err);
  }
}

// ✅ DELETE /reviews/:id
export async function removeReview(req, res, next) {
  try {
    const deletedReview = await deleteReview(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review niet gevonden' });
    }
    res.status(200).json({ message: 'Review verwijderd' });
  } catch (err) {
    next(err);
  }
}
