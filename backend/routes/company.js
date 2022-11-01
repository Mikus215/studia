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

const router = express.Router()

router.get('/list', getCompanyList)
router.get('/filter/popular', getPopular)
router.get('/filter/best', getBestComapniesFirst)
router.post('/search', getSearchedCompany)
router.post('/comment/add/:id', cookieJwtAuth, postAddCompanyComment)
router.post('/rate/add/:id', cookieJwtAuth, addRate)
router.post('/register', cookieJwtAuth, postCreateCompany)
router.post('/panel', cookieJwtAuth, getCreatorListCompany)
router.delete('/panel/delete/:id', cookieJwtAuth, deleteCompany)
router.patch('/panel/update/:id', cookieJwtAuth, updateCompany)

export default router