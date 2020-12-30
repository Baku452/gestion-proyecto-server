const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    snip: {
        type: String,
    },
    codDNPP: {
        type: String,
    },
    codMeta: {
        type: String,
    },
    estado: {
        type: String,
    },
    costoInversion: {
        type: Number,
        default:0
    },
    funcion: {
        type: String,
    },
    ubicacion: {
        type: String,
    },
    pim: {
        type: Number
    },
    ejecucionPIM: {
        type: Number,
        default:0
    },
    saldoPIM: {
        type: Number,
        default:0
    },
    ejecutadoHasta: {
        type: Number,
    },
    saldoPorAsignar: {
        type: Number,
        default:0
    },
    ejecucionMensualFinanciera: {
        type: Number,
    },
    ejecucionMensualFinancieraPorcentaje: {
        type: Number,
    },
    ejecucionMensualFisica: {
        type: Number,
    },
    ejecucionMensualFisicaPorcentaje:{
        type:Number,
    },
    ejecucionAcumuladaFinanciera:{
        type: Number,
    },
    ejecucionAcumuladaFinancieraPorcentaje:{
        type: Number,
    },
    ejecucionAcumuladaFisica:{
        type: Number,
    },
    ejecucionAcumuladaFisicaPorcentaje:{
        type: Number,
    },
    fechaReinicio:{
        type: Date,
    },
    situacionalObras: {
        type: String,
    },
    fechaCulminacion: {
        type: Date,
    },
    fechaCulminacionReal: {
        type: Date,
    },
    modificacionesTramite:{
        type: String,
    },
    logros:{
        type: String,
    },
    coordinador:{
        type: String,
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);