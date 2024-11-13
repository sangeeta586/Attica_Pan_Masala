const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController")

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(updateContact);

router.route("/:id").put(getContact);

router.route("/:id").delete(deleteContact);



module.exports = router;