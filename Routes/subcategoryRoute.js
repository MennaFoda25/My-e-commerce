const express = require("express");

const {
  createSubCategory,
  getAllSubcat,
  getSubcat,
  updateSubcat,
  setCategoryIdToBody,
  deleteSubcat,
  createFilterObj
} = require("../controllers/subcategoryServices");

const {
  createSubcatVali,
  getSubcatVali,
  updateSubcategoryVali,
  deleteSubcategoryVali,
  
} = require("../utils/validators/subcategoryValidator");

//mergeParams: allows us to access parameters in other routers
//ex: we need to access catId from cat router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubcatVali, createSubCategory)
  .get(createFilterObj,getAllSubcat);

router
  .route("/:id")
  .get(getSubcatVali, getSubcat)
  .put(updateSubcategoryVali, updateSubcat)
  .delete(deleteSubcategoryVali, deleteSubcat);

module.exports = router;
