import express from 'express'
import { cookieJwtAuth } from '../middleware/cookieJwtAuth.js'
import {
    postCreateCompany,
    getCreatorListCompany,
    deleteCompany,
    updateCompany,
    getCompanyList,
    postAddCompanyComment,
    addRate,
    getSearchedCompany,
    getPopular,
    getBestComapniesFirst
} from '../controllers/companyController.js'

import { registerCompanyValidation } from '../middleware/registerCompanyValidation.js'
import { getCreatorListCompanyValidation } from '../middleware/getCreatorListCompanyValidation.js'
import { deleteCompanyValidation } from '../middleware/deleteCompanyValidation.js'
import { updateCompanyValidation } from '../middleware/updateCompanyValidation.js'
import { checkIdCorrect } from '../middleware/checkIdCorrect.js'
import { checkIsModerator } from '../middleware/checkIsModerator.js'

const router = express.Router()

router.get('/list', getCompanyList)
router.get('/filter/popular', getPopular)
router.get('/filter/best', getBestComapniesFirst)
router.post('/search', getSearchedCompany)
router.post('/comment/add/:id', cookieJwtAuth, checkIdCorrect, postAddCompanyComment)
router.post('/rate/add/:id', cookieJwtAuth, checkIdCorrect, addRate)
router.post('/register', cookieJwtAuth, checkIsModerator, registerCompanyValidation, postCreateCompany)
router.post('/panel', cookieJwtAuth, checkIsModerator, getCreatorListCompanyValidation, getCreatorListCompany)
router.delete('/panel/delete/:id', cookieJwtAuth, checkIdCorrect, checkIsModerator, deleteCompanyValidation, deleteCompany)
router.patch('/panel/update/:id', cookieJwtAuth, checkIdCorrect, checkIsModerator, updateCompanyValidation, updateCompany)

export default router