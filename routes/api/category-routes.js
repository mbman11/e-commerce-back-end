const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product}] });
    res.status(200).json(categories); 
  } catch (err) {
  res.status(500).json({message: 'not found'});
}
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {include: [{ model: Product }] });
    if (!category){
      res.status(404).json({message: 'id not found try again'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({message: 'not found'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({message: 'no connection'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newCategory = await Category.update(req.body, { where: {id: req.params.id} });
  } catch (err) {
    res.status(500).json({ message: 'update failed'});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({where: { id: req.params.id }});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
