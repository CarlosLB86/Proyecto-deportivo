const pool = require('../../config/db');

const getAll = async () => {
    const [result] = await pool.query('select * from events');
    return result;
}

const eventsById = async (id) => {
    const [result] = await pool.query('select * from events where id = ?', [id]);
    return result;
}

const createEvent = async ({ name, description, date, ubication, typesport, organizator }) => {
    const [result] = await pool.query('insert into events (name, description,date, ubication, typesport, organizator) values(?, ?, ?, ?, ?, ?)', [name, description, date, ubication, typesport, organizator]);
    return result.insertId;
}

const updateById = async (eventId, { name, description, date, ubication, typesport, organizator, id }) => {
    const [result] = await pool.query('UPDATE events SET name =?, description =?, date =?, ubication =?, typesport =?, organizator =? WHERE id =?', [name, description, date, ubication, typesport, organizator, eventId, id]);
    return result;
}

const deleteEvent = async (eventId) => {
    const [result] = await pool.query('delete from events where id =?', [eventId]);
    return result;
}

const getComingEvents = async () => {
    const [result] = await pool.query('select * from events where date > curdate() order by date asc');
    return result;
}

const getBySport = async (typesport) => {
    const [result] = await pool.query('select * from events where typesport =?', [typesport]);
    return result;
}

const getEventFromDate = async (from, to) => {
    const [result] = await pool.query('select * from events where date between ? and ?', [from, to]);
    return result;
}

module.exports = {
    getAll, eventsById, createEvent, updateById, deleteEvent, getComingEvents, getBySport, getEventFromDate
}