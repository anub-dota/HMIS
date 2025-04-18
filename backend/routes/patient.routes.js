import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import  upload  from '../middleware/multer.js';
import { uploadProfilePhoto } from "../controllers/patientController.js";
const router = express.Router();

// TODO: Add routes for patient
import {
    FetchPatientProfile,
    fetchConsultationsByPatientId,
    getAllDoctors,
    sendFeedback,
    rescheduleConsultation,
    cancelConsultation,
    registerPatient,getDoctorById,
    getLatestPatientVital,
    getPatientVitals,
    getPatientVitalById,
    updatePatientProfile
} from '../controllers/patientController.js';

// GETs (General and Fetch Routes)
router.get('/doctors',authenticateUser, getAllDoctors); // No params, safest to be first
router.get('/profile/:patientId',authenticateUser, FetchPatientProfile); // Single param
router.get('/:patientId/consultations',authenticateUser, fetchConsultationsByPatientId);
// router.get('/:patientId/consultations', authenticateUser, fetchConsultationsByPatientId);  // Uncomment if middleware is needed
router.get('/doctors/:id',authenticateUser, getDoctorById );

// Patient vitals routes
router.get('/:patientId/vitals',authenticateUser, getPatientVitals);
router.get('/:patientId/vitals/latest',authenticateUser, getLatestPatientVital);
router.get('/:patientId/vitals/:vitalId',authenticateUser, getPatientVitalById);

// POSTs (Actions that create or send data)
router.post('/:patientId/consultations/:consultationId/feedback', authenticateUser,sendFeedback);
router.post('/register',registerPatient);
router.post("/upload-photo/:patientId", authenticateUser,upload.single("profile_pic"), uploadProfilePhoto);

// DELETE (Modify specific consultation)
router.delete("/:consultationId/cancel",authenticateUser, cancelConsultation);

// PUTs (Modify data)
router.put('/:consultationId/reschedule',authenticateUser, rescheduleConsultation);
router.put('/profile/:patientId',authenticateUser, updatePatientProfile);

export default router;