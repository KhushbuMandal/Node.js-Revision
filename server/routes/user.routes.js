const express = require ("express");
const router = express.Router();


router.route('/').get(users);
router.route('/:id').get(specificUser);
router.route('/:id')
      .post(newUser)
      .patch(updatedUser)
      .delete(deletUser);


module.exports = router;





