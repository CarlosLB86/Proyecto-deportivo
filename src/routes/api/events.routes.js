const router = require('express').Router();


const { getAll, eventsById, createEvent, updateEvent, deleteEvent, getComingEvents, getEventFromDate, } = require('../../controllers/api/events.controllers');
const { checkToken } = require('../../utils/middlewares');





router.get('/', checkToken, getAll);  // en la request pones ?type=Atletismo y vas cambiando el deporte para probar todos, sino pones nada te dara todos los eventos
router.get('/date', getEventFromDate);
router.get('/upcoming', getComingEvents);
router.get('/:eventsId', checkToken, eventsById);
router.post('/', checkToken, createEvent);
router.put('/:eventId', checkToken, updateEvent)
router.delete('/:eventId', checkToken, deleteEvent);



module.exports = router;