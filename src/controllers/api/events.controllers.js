const { pool } = require('../../config/db');
const { getAll: selectAll, eventsById: selectById, createEvent: postEvent, updateById, deleteEvent: removeEvent, getComingEvents: getComeEvents, getBySport: getTypeSport, getEventFromDate: getBydate } = require('../../models/api/events.model');
const { checkToken } = require('../../utils/middlewares');

const getAll = async (req, res, next) => {
    try {
        if (!req.query.type) {

            const result = await selectAll();
            res.json(result);
        }

        else {
            await getBySport(req, res, next);


        };
    } catch (error) {
        next(error);
    }
}

const eventsById = async (req, res, next) => {
    const id = req.params.eventsId
    try {
        const result = await selectById(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const createEvent = async (req, res, next) => {
    // const event = req.body;
    try {
        const result = await postEvent(req.body);
        const event = selectById(result);
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const updateEvent = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const result = await updateById(eventId, req.body);
        if (result.affectedRows !== 1) {
            return res.status(400).json({ message: 'No se ha realizado la actualización' });
        }
        const event = await selectById(eventId);
        res.json(event);
    } catch (error) {
        next(error);
    }
}

const deleteEvent = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const event = await selectById(eventId);
        await removeEvent(eventId);
        res.json(event);
    } catch (error) {
        next(error);
    }
}

const getComingEvents = async (req, res, next) => {
    try {
        const result = await getComeEvents();
        res.json(result);

    } catch (error) {
        next(error);
    }

}

const getBySport = async (req, res, next) => {
    const { type } = req.query;
    try {
        const result = await getTypeSport(type);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getEventFromDate = async (req, res, next) => {
    const { from, to } = req.query;
    try {
        const result = await getBydate(from, to);
        if (!from || !to) {
            res.status(404).json({ message: 'Las fechas deben estar bien rellenadas' });
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'Los rangos de eventos no existen' });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll, eventsById, createEvent, updateEvent, deleteEvent, getComingEvents, getBySport, getEventFromDate
}