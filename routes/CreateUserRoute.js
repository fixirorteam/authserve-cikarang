const express = require("express")
const {
    createEmailAndPasword,
    createNameAndRole
} = require("../controller/CreateUser")

const router = express.Router()

router.post('/api/createemailpassword', createEmailAndPasword )
router.post('/api/createnamerole', createNameAndRole )

module.exports = router