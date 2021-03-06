const express = require("express");
const nodemailer = require("nodemailer");
var pdf = require('html-pdf');
const Aspirante = require('../models/aspirante');
const router = express.Router();

router.post('', (req, res, next) => {
  const aspirante = new Aspirante({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    alias: req.body.alias,
    ci: req.body.ci,
    edad: req.body.edad,
    sexo: req.body.sexo,
    provincia: req.body.provincia,
    municipio: req.body.municipio,
    direccion: req.body.direccion,
    correo: req.body.correo,
    telefono: req.body.telefono,
    raza: req.body.raza,
    estatura: req.body.estatura,
    peso: req.body.peso,
    estado_civil: req.body.estado_civil,
    hijos: req.body.hijos,
    licencia: req.body.licencia,
    categoria_licencia: req.body.categoria_licencia,
    militancia: req.body.militancia,
    nivel_escolaridad: req.body.nivel_escolaridad,
    titulo_graduado: req.body.titulo_graduado,
    experiencia_laboral: req.body.experiencia_laboral,
    otros_estudios: req.body.otros_estudios,
    trayectoria_laboral: req.body.trayectoria_laboral,
    situacion_laboral: req.body.situacion_laboral,
    centro_trabajo: req.body.centro_trabajo,
    organismo_trabajo: req.body.organismo_trabajo,
    cargo_trabajo: req.body.cargo_trabajo,
    categoria_trabajo: req.body.categoria_trabajo,
    direccion_trabajo: req.body.direccion_trabajo,
    telefono_trabajo: req.body.telefono_trabajo,
    otros_oficios: req.body.otros_oficios,
    estado: req.body.estado,
    causa_eliminacion: req.body.causa_eliminacion,
    causa_no_apto: req.body.causa_no_apto,
    preseleccion: req.body.preseleccion,
    fecha_inicio_proceso_investigativo: req.body.fecha_inicio_proceso_investigativo,
    fecha_fin_proceso_investigativo: req.body.fecha_fin_proceso_investigativo,
    resultado_proceso_investigativo: req.body.resultado_proceso_investigativo,
    curriculum_vitae: req.body.curriculum_vitae,
    fecha_curriculum_vitae: req.body.fecha_curriculum_vitae,
    autobiografia: req.body.autobiografia,
    fecha_autobiografia: req.body.fecha_autobiografia,
    titulo: req.body.titulo,
    fecha_titulo: req.body.fecha_titulo,
    chequeo_medico: req.body.chequeo_medico,
    fecha_chequeo_medico: req.body.fecha_chequeo_medico,
    avales_cdr: req.body.avales_cdr,
    fecha_avales_cdr: req.body.fecha_avales_cdr,
    avales_centro_trabajo: req.body.avales_centro_trabajo,
    fecha_avales_centro_trabajo: req.body.fecha_avales_centro_trabajo,
    fotos: req.body.fotos,
    fecha_fotos: req.body.fecha_fotos,
    anexo1: req.body.anexo1,
    fecha_anexo1: req.body.fecha_anexo1,
    antecedentes: req.body.antecedentes,
    fecha_antecedentes: req.body.fecha_antecedentes,
    evaluacion_psicologica: req.body.evaluacion_psicologica,
    comite_admision: req.body.comite_admision,
    mixta: req.body.mixta,
    cargo_mixta: req.body.cargo_mixta,
    fecha_mixta: req.body.fecha_mixta,
    causa_devolucion: req.body.causa_devolucion,
    fecha_devolucion: req.body.fecha_devolucion,
  });

  aspirante.save().then(aspiranteCreado => {
    res.status(201).json({
      message: "Aspirante a??adido exitosamente",
      aspirante: {
        ...aspiranteCreado,
        id: aspiranteCreado._id,
      },
    });
  });

  var licencia = "";
  var categorias = "";
  var militancias = "";
  var trayectorias = [];

  var actividad = [];
  var centro = [];
  var desde = [];
  var hasta = [];

  var actividades = "";
  var centros = "";
  var desdes = "";
  var hastas = "";

  if(aspirante.licencia == true) {
    licencia = "Si";
  } else if(aspirante.licencia == false) {
    licencia = "No";
  }

  categorias = aspirante.categoria_licencia.replace(/,/g, ", ");
  militancias = aspirante.militancia.replace(/,/g, ", ");

  for (let i = 0; i < aspirante.trayectoria_laboral.length; i++) {
    for (let j = 0; j < aspirante.trayectoria_laboral[i].length; j++) {
      trayectorias.push(aspirante.trayectoria_laboral[i][j]);
    }
  }

  for (let i = 0; i < trayectorias.length; i++) {
    actividad.push(trayectorias[0]);
    centro.push(trayectorias[1]);
    desde.push(trayectorias[2]);
    hasta.push(trayectorias[3]);
    trayectorias.splice(0,4);
  }

  actividades = actividad.toString().replace(/,/g, "<br><br>");
  centros = centro.toString().replace(/,/g, "<br><br>");
  desdes = desde.toString().replace(/,/g, "<br><br>");
  hastas = hasta.toString().replace(/,/g, "<br><br>");

  var contenido = "<div style='margin-left: 20mm; margin-right: 20mm'>" +
                    "<p style='text-align: center; font-size: 16px; font-family: Times New Roman;'><strong>Datos Personales</strong></p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Nombre y Apellidos: </strong>" + aspirante.nombre + " " + aspirante.apellidos + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Alias: </strong>" + aspirante.alias + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Carn?? de Identidad: </strong>" + aspirante.ci + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Sexo: </strong>" + aspirante.sexo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Edad: </strong>" + aspirante.edad + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Provincia: </strong>" + aspirante.provincia + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Municipio: </strong>" + aspirante.municipio + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Direcci??n: </strong>" + aspirante.direccion + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Correo Electr??nico: </strong>" + aspirante.correo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Tel??fono(s): </strong>" + aspirante.telefono + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Color de la Piel: </strong>" + aspirante.raza + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Estado Civil: </strong>" + aspirante.estado_civil + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Cantidad de Hijos: </strong>" + aspirante.hijos + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Estatura (Metros): </strong>" + aspirante.estatura + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Peso (Kg): </strong>" + aspirante.peso + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Licencia de Conducci??n: </strong>" + licencia + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Categor??a de Licencia: </strong>" + categorias + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Organizaciones a las que Pertenece: </strong>" + militancias + "</p>" +
                  "</div>" +
                  "<br />" +
                  "<div style='margin-left: 20mm; margin-right: 20mm'>" +
                    "<p style='text-align: center; font-size: 16px; font-family: Times New Roman;'><strong>Datos Profesionales</strong></p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Nivel de Escolaridad: </strong>" + aspirante.nivel_escolaridad + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>T??tulo de Graduado: </strong>" + aspirante.titulo_graduado + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Experiencia Laboral (A??os): </strong>" + aspirante.experiencia_laboral + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Otros Estudios Realizados: </strong>" + aspirante.otros_estudios + "</p>" +
                  "</div>" +
                  "<br />" +
                  "<div style='margin-left: 20mm; margin-right: 20mm'>" +
                    "<p style='text-align: center; font-size: 16px; font-family: Times New Roman;'><strong>Datos Laborales</strong></p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Situaci??n Laboral: </strong>" + aspirante.situacion_laboral + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Centro de Trabajo : </strong>" + aspirante.centro_trabajo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Organismo : </strong>" + aspirante.organismo_trabajo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Cargo: </strong>" + aspirante.cargo_trabajo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Categor??a Ocupacional : </strong>" + aspirante.categoria_trabajo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Direcci??n: </strong>" + aspirante.direccion_trabajo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Tel??fono(s) : </strong>" + aspirante.telefono_trabajo + "</p>" +
                    "<p style='text-align: justify; font-size: 12px; font-family: Times New Roman;'><strong>Otros Oficios que Domina: </strong>" + aspirante.otros_oficios + "</p>" +
                  "</div>" +
                  "<br />" +
                  "<div style='margin-left: 20mm; margin-right: 20mm'>" +
                    "<p style='text-align: center; font-size: 16px; font-family: Times New Roman;'><strong>Trayectoria Laboral Hasta la Actualidad</strong></p>" +
                    "<table style='border: black 1px solid; margin: 0 auto;'>" +
                      "<tr>" +
                        "<th style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>Actividad Desempe??ada</th>" +
                        "<th style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>Centro de Trabajo</th>" +
                        "<th style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>Desde</th>" +
                        "<th style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>Hasta</th>" +
                      "</tr>" +
                      "<br /><br />" +
                      "<tr>" +
                        "<td style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>" + actividades + "</td>" +
                        "<td style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>" + centros + "</td>" +
                        "<td style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>" + desdes + "</td>" +
                        "<td style='border: black 1px solid; text-align: center; font-size: 12px; font-family: Times New Roman; padding-left: 10px; padding-right: 10px;'>" + hastas + "</td>" +
                      "</tr>" +
                    "</table>" +
                  "</div>"
  ;

  var options = {
    "format": 'Letter',
    "header": {
      "height": "20mm",
    },
    "footer": {
      "height": "20mm"
    },
  };

  pdf.create(contenido, options).toFile('server/documents/Planilla de ' + aspirante.nombre + ' ' + aspirante.apellidos + '.pdf', function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log("PDF Creado Exitosamente");
    }
  });

  const jConfig = {
    host: "correo.nexus.co.cu",
    port: 25,
    secure: false,
    auth: {
      type: "login",
      user: "empleadoranexus@nexus.co.cu",
      pass: "Bolsaempleadora30.",
    },
    tls: {rejectUnauthorized: false},
    debug:true
  };

  const email = {
    from: '"Bolsa Empleadora Industrias NEXUS S.A." <no-reply@nexus.co.cu>',
    to: aspirante.correo,
    subject: "??Gracias por su registro!",
    html: "<h1 style='text-align: center; font-family: Times New Roman'>??Gracias por su registro!</h1>" +
          "<p style='text-align: center; font-family: Times New Roman; font-size: 14px'>A partir de este momento usted " + aspirante.nombre + " " + aspirante.apellidos + ", forma parte de la lista de candidatos a pertenecer a la Bolsa Empleadora de Industrias NEXUS S.A.</p>" +
          "<p style='text-align: center; font-family: Times New Roman; font-size: 14px'>En caso de ser llamado para ser entrevistado por favor presentarse con los documentos que se relacionan en este correo correctamente llenados.</p>" +
          "<ol>" +
          "<li>Fotocopia Avalada del T??tulo</li>" +
          "<li>Autobiograf??a</li>" +
          "<li>Curriculum Vitae</li>" +
          "<li>Chequeo Preempleo</li>" +
          "<li>2 Avales del Centro de Trabajo Anterior</li>" +
          "<li>2 Avales del CDR</li>" +
          "<li>2 Fotos Actuales</li>" +
          "<li>Antecedentes Penales</li>" +
          "</ol>" +
          "<p style='text-align: center; font-family: Times New Roman; font-size: 14px'>Para el equipo de trabajo de la Sucursal Empleadora de Industrias NEXUS S.A. es un placer que usted nos haya escogido para obtener una nueva oportunidad laboral.</p>",
  };

  const email1 = {
    from: '"Bolsa Empleadora Industrias NEXUS S.A." <no-reply@nexus.co.cu>',
    to: "alex@nexus.co.cu",
    subject: "Planilla del aspirante " + aspirante.nombre + " " + aspirante.apellidos,
    attachments: [{
      filename: "Planilla de " + aspirante.nombre + " " + aspirante.apellidos + ".pdf",
      path: "server/documents/Planilla de " + aspirante.nombre + " " + aspirante.apellidos + ".pdf"
    }]
  };

  const createTransport = nodemailer.createTransport(jConfig);

  setTimeout(function() {
    createTransport.sendMail(email, function(error, info) {
      if(error){
        console.log("Error al enviar email");
      } else {
        console.log("Email enviado correctamente");
      }
      createTransport.close();
    });
  }, 5000);

  setTimeout(function() {
    createTransport.sendMail(email1, function(error, info) {
      if(error){
        console.log("Error al enviar email1");
      } else {
        console.log("Email1 enviado correctamente");
      }
      createTransport.close();
    });
  }, 5000);
});

router.put("/:id", (req, res, next) => {
  const aspirante = new Aspirante({
    _id: req.body.id,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    alias: req.body.alias,
    ci: req.body.ci,
    edad: req.body.edad,
    sexo: req.body.sexo,
    provincia: req.body.provincia,
    municipio: req.body.municipio,
    direccion: req.body.direccion,
    correo: req.body.correo,
    telefono: req.body.telefono,
    raza: req.body.raza,
    estatura: req.body.estatura,
    peso: req.body.peso,
    estado_civil: req.body.estado_civil,
    hijos: req.body.hijos,
    licencia: req.body.licencia,
    categoria_licencia: req.body.categoria_licencia,
    militancia: req.body.militancia,
    nivel_escolaridad: req.body.nivel_escolaridad,
    titulo_graduado: req.body.titulo_graduado,
    experiencia_laboral: req.body.experiencia_laboral,
    otros_estudios: req.body.otros_estudios,
    trayectoria_laboral: req.body.trayectoria_laboral,
    situacion_laboral: req.body.situacion_laboral,
    centro_trabajo: req.body.centro_trabajo,
    organismo_trabajo: req.body.organismo_trabajo,
    cargo_trabajo: req.body.cargo_trabajo,
    categoria_trabajo: req.body.categoria_trabajo,
    direccion_trabajo: req.body.direccion_trabajo,
    telefono_trabajo: req.body.telefono_trabajo,
    otros_oficios: req.body.otros_oficios,
    estado: req.body.estado,
    causa_eliminacion: req.body.causa_eliminacion,
    causa_no_apto: req.body.causa_no_apto,
    preseleccion: req.body.preseleccion,
    fecha_inicio_proceso_investigativo: req.body.fecha_inicio_proceso_investigativo,
    fecha_fin_proceso_investigativo: req.body.fecha_fin_proceso_investigativo,
    resultado_proceso_investigativo: req.body.resultado_proceso_investigativo,
    curriculum_vitae: req.body.curriculum_vitae,
    fecha_curriculum_vitae: req.body.fecha_curriculum_vitae,
    autobiografia: req.body.autobiografia,
    fecha_autobiografia: req.body.fecha_autobiografia,
    titulo: req.body.titulo,
    fecha_titulo: req.body.fecha_titulo,
    chequeo_medico: req.body.chequeo_medico,
    fecha_chequeo_medico: req.body.fecha_chequeo_medico,
    avales_cdr: req.body.avales_cdr,
    fecha_avales_cdr: req.body.fecha_avales_cdr,
    avales_centro_trabajo: req.body.avales_centro_trabajo,
    fecha_avales_centro_trabajo: req.body.fecha_avales_centro_trabajo,
    fotos: req.body.fotos,
    fecha_fotos: req.body.fecha_fotos,
    anexo1: req.body.anexo1,
    fecha_anexo1: req.body.fecha_anexo1,
    antecedentes: req.body.antecedentes,
    fecha_antecedentes: req.body.fecha_antecedentes,
    evaluacion_psicologica: req.body.evaluacion_psicologica,
    comite_admision: req.body.comite_admision,
    mixta: req.body.mixta,
    cargo_mixta: req.body.cargo_mixta,
    fecha_mixta: req.body.fecha_mixta,
    causa_devolucion: req.body.causa_devolucion,
    fecha_devolucion: req.body.fecha_devolucion,
  });
  Aspirante.updateOne({_id: req.params.id}, aspirante).then(result => {
    res.status(200).json({
      mensaje: "Aspirante actualizado"
    });
  });
});

router.get('', (req, res, next) => {
  Aspirante.find().then(documents => {
    res.status(200).json({
      message: "Aspirantes obtenidos exitosamente",
      aspirantes: documents
    });
  });
});

module.exports = router;
