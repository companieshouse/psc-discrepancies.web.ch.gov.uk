const router = require('express').Router();
const logger = require(`${serverRoot}/config/winston`);
const Utility = require(`${serverRoot}/lib/Utility`);

const apiSdk = require('ch-sdk-node');

const obligedEntityTypes = require(`${serverRoot}/services/data/oe_types`);

const Validator = require(`${serverRoot}/lib/validation`);
const validator = new Validator();

const PscDiscrepancyService = require(`${serverRoot}/services/psc_discrepancy`);
const pscDiscrepancyService = new PscDiscrepancyService();

const Session = require(`${serverRoot}/lib/Session`);
let session; // eslint-disable-line no-unused-vars

const routeUtils = require(`${serverRoot}/routes/utils`);
const routeViews = 'report';

let selfLink; // eslint-disable-line no-unused-vars

router.use((req, res, next) => {
  session = new Session(req, res);
  next();
});

router.get('(/report-a-discrepancy)?', (req, res, next) => {
  logger.info(`GET request to serve index page: ${req.path}`);
  res.render(`${routeViews}/index.njk`, { title: 'Report a discrepancy about a beneficial owner on the PSC register' });
});

router.get('/report-a-discrepancy/obliged-entity/type', (req, res, next) => {
  logger.info(`GET request to render obliged entity type page: ${req.path}`);
  const viewData = {
    this_data: obligedEntityTypes,
    title: 'Obliged entity type'
  };
  res.render(`${routeViews}/oe_type.njk`, viewData);
});

router.post('/report-a-discrepancy/obliged-entity/type', (req, res, next) => {
  logger.info('POST request to save obliged entity contact type, with payload: ', req.body);
  validator.isValidObligedEntityType(req.body, Object.keys(obligedEntityTypes))
    .then(r => {
      return pscDiscrepancyService.saveObligedEntityType(req.body.obligedEntityType);
    }).then(r => {
      const o = res.locals.session;
      o.appData.initialServiceResponse = r;
      res.locals.session = o;
      return session.write(o);
    }).then(_ => {
      res.redirect(302, '/report-a-discrepancy/obliged-entity/organisation-name');
    }).catch(err => {
      const viewData = {
        this_data: obligedEntityTypes,
        this_errors: null,
        path: `${routeViews}/oe_type.njk`,
        title: 'Obliged entity type'
      };
      routeUtils.processException(err, viewData, res);
    });
});

router.get('/report-a-discrepancy/obliged-entity/organisation-name', (req, res, next) => {
  logger.info(`GET request to render obliged entity organisation name page: ${req.path}`);
  res.render(`${routeViews}/organisation_name.njk`, { title: 'Your organisation name' });
});

router.post('/report-a-discrepancy/obliged-entity/organisation-name', (req, res, next) => {
  logger.info('POST request to save obliged entity organisation name, with payload: ', req.body);
  validator.isValidOrganisationName(req.body.organisationName)
    .then(r => {
      selfLink = res.locals.session.appData.initialServiceResponse.links.self;
      return pscDiscrepancyService.getReport(selfLink);
    }).then(report => {
      const data = {
        obliged_entity_type: report.obliged_entity_type,
        obliged_entity_organisation_name: req.body.organisationName,
        etag: report.etag,
        selfLink: selfLink
      };
      return pscDiscrepancyService.saveOrganisationName(data);
    }).then(_ => {
      res.redirect(302, '/report-a-discrepancy/obliged-entity/contact-name');
    }).catch(err => {
      const viewData = {
        this_data: req.body,
        this_errors: null,
        path: `${routeViews}/organisation_name.njk`,
        title: 'Your organisation name'
      };
      routeUtils.processException(err, viewData, res);
    });
});

router.get('/report-a-discrepancy/obliged-entity/contact-name', (req, res, next) => {
  logger.info(`GET request to render obliged entity contact name page: ${req.path}`);
  res.render(`${routeViews}/contact_name.njk`, { title: 'Your contact name' });
});

router.post('/report-a-discrepancy/obliged-entity/contact-name', (req, res) => {
  logger.info('POST request to save obliged entity contact name, with payload: ', req.body);
  validator.isValidContactName(req.body.fullName)
    .then(r => {
      selfLink = res.locals.session.appData.initialServiceResponse.links.self;
      return pscDiscrepancyService.getReport(selfLink);
    }).then(report => {
      const data = {
        obliged_entity_type: report.obliged_entity_type,
        obliged_entity_organisation_name: report.obliged_entity_organisation_name,
        obliged_entity_contact_name: req.body.fullName,
        etag: report.etag,
        selfLink: selfLink
      };
      return pscDiscrepancyService.saveContactName(data);
    }).then(_ => {
      res.redirect(302, '/report-a-discrepancy/obliged-entity/email');
    }).catch(err => {
      const viewData = {
        this_data: req.body,
        this_errors: null,
        path: `${routeViews}/contact_name.njk`,
        title: 'Your contact name'
      };
      routeUtils.processException(err, viewData, res);
    });
});

router.get('/report-a-discrepancy/obliged-entity/email', (req, res, next) => {
  logger.info(`GET request to serve obliged entity email page: ${req.path}`);
  res.render(`${routeViews}/oe_email.njk`, { title: 'Your contact details' });
});

router.post('/report-a-discrepancy/obliged-entity/email', (req, res, next) => {
  logger.info('POST request to save obliged entity email, with payload: ', req.body);
  validator.isValidEmail(req.body.email)
    .then(_ => {
      selfLink = res.locals.session.appData.initialServiceResponse.links.self;
      return pscDiscrepancyService.getReport(selfLink);
    }).then(report => {
      const data = {
        obliged_entity_type: report.obliged_entity_type,
        obliged_entity_organisation_name: report.obliged_entity_organisation_name,
        obliged_entity_contact_name: report.obliged_entity_contact_name,
        obliged_entity_email: req.body.email,
        obliged_entity_telephone_number: req.body.phoneNumber.trim(),
        etag: report.etag,
        selfLink: selfLink
      };
      return pscDiscrepancyService.saveEmail(data);
    }).then(_ => {
      return res.redirect(302, '/report-a-discrepancy/company-number');
    }).catch(err => {
      const viewData = {
        this_data: req.body,
        this_errors: null,
        path: `${routeViews}/oe_email.njk`,
        title: 'Your contact details'
      };
      routeUtils.processException(err, viewData, res);
    });
});

router.get('/report-a-discrepancy/company-number', (req, res) => {
  logger.info(`GET request to serve company number page: ${req.path}`);
  res.render(`${routeViews}/company_number.njk`, { title: 'Your company number' });
});

router.post('/report-a-discrepancy/company-number', (req, res) => {
  logger.info('POST request to save company number, with payload: ', req.body);
  validator.isCompanyNumberFormatted(req.body.number)
    .then(_ => {
      selfLink = res.locals.session.appData.initialServiceResponse.links.self;
      return pscDiscrepancyService.getReport(selfLink);
    }).then(report => {
      const data = {
        obliged_entity_type: report.obliged_entity_type,
        obliged_entity_organisation_name: report.obliged_entity_organisation_name,
        obliged_entity_contact_name: report.obliged_entity_contact_name,
        obliged_entity_email: report.obliged_entity_email,
        obliged_entity_telephone_number: report.obliged_entity_telephone_number,
        company_number: req.body.number,
        etag: report.etag,
        selfLink: selfLink
      };
      return pscDiscrepancyService.saveCompanyNumber(data);
    }).then(_ => {
      res.redirect(302, '/report-a-discrepancy/psc-name');
    }).catch(err => {
      const viewData = {
        this_data: req.body,
        this_errors: null,
        path: `${routeViews}/company_number.njk`,
        title: 'Your company number'
      };
      routeUtils.processException(err, viewData, res);
    });
});

router.get('/report-a-discrepancy/psc-name', (req, res) => {
  logger.info(`GET request to serve PSC name page: ${req.path}`);
  selfLink = res.locals.session.appData.initialServiceResponse.links.self;
  const viewData = {
    title: 'PSC information',
    this_data: {},
    path: `${routeViews}/psc_name.njk`,
    //this_errors: null,
  };
  const api = apiSdk.createApiClient(process.env.CHS_API_KEY, undefined, process.env.API_URL);
  pscDiscrepancyService.getReport(selfLink)
    .then(report => {
      viewData.this_data.organisationName = report.obliged_entity_organisation_name;
      return api.companyOfficers.getCompanyOfficers(report.company_number.toUpperCase());
    }).then(officers => {
      const pscOfficers = [];
      let pscOfficer;
      const months = Utility.getMonthsOfYear();
      if (typeof officers.resource === 'undefined' || typeof officers.resource.items === 'undefined') {
        viewData.this_data.officers = [];
      } else {
        for (const o of officers.resource.items) { // eslint-disable-line no-unused-vars
          if (typeof o.resignedOn === 'undefined') {
            pscOfficer = o;
            if (typeof o.dateOfBirth === 'undefined') {
              pscOfficer.dobFormatted = 'DoB not available';
            } else {
              pscOfficer.dobFormatted = `Born ${months[o.dateOfBirth.month]} ${o.dateOfBirth.year}`;
            }
            pscOfficers.push(pscOfficer);
          }
        }
        viewData.this_data.officers = pscOfficers;
        const o = res.locals.session;
        o.appData.pscOfficers = pscOfficers;
        res.locals.session = o;
        return session.write(o);
      }
    }).then(_ => {
      res.render(viewData.path, viewData);
    }).catch(err => {
      routeUtils.processException(err, viewData, res);
    });
});

router.post('/report-a-discrepancy/psc-name', (req, res) => {
  logger.info('POST request to save PSC name, with payload: ', req.body);
  const viewData = {
    this_data: {
      officers: res.locals.session.appData.pscOfficers
    },
    this_errors: null,
    path: `${routeViews}/psc_name.njk`,
    title: 'PSC information'
  };
  validator.isValidPscName(req.body)
    .then(r => {
      const o = res.locals.session;
      o.appData.pscName = req.body.pscName;
      delete o.appData.pscOfficers;
      res.locals.session = o;
      return session.write(o);
    }).then(_ => {
      res.redirect(302, '/report-a-discrepancy/discrepancy-details');
    }).catch(err => {
      routeUtils.processException(err, viewData, res);
    });
});

router.get('/report-a-discrepancy/discrepancy-details', (req, res) => {
  logger.info(`GET request to serve discrepancy details page: ${req.path}`);
  res.render(`${routeViews}/discrepancy_details.njk`, { title: 'Discrepancy details' });
});

router.post('/report-a-discrepancy/discrepancy-details', (req, res, next) => {
  logger.info('POST request to save discrepancy details, with payload: ', req.body);
  let data = {}; // eslint-disable-line prefer-const
  validator.isTextareaNotEmpty(req.body.details)
    .then(r => {
      selfLink = res.locals.session.appData.initialServiceResponse.links.self;
      data.psc_name = res.locals.session.appData.pscName;
      data.details = req.body.details;
      data.selfLink = selfLink;
      return pscDiscrepancyService.saveDiscrepancyDetails(data);
    }).then(_ => {
      return pscDiscrepancyService.getReport(selfLink);
    }).then(report => {
      data.obliged_entity_type = report.obliged_entity_type;
      data.obliged_entity_organisation_name = report.obliged_entity_organisation_name;
      data.obliged_entity_contact_name = report.obliged_entity_contact_name;
      data.obliged_entity_email = report.obliged_entity_email;
      data.obliged_entity_telephone_number = report.obliged_entity_telephone_number;
      data.company_number = report.company_number;
      data.etag = report.etag;
      return pscDiscrepancyService.saveStatus(data);
    }).then(_ => {
      const o = res.locals.session;
      o.appData.initialServiceResponse = {};
      delete o.appData.pscName;
      res.locals.session = o;
      return session.write(o);
    }).then(_ => {
      res.redirect(302, '/report-a-discrepancy/confirmation');
    }).catch(err => {
      const viewData = {
        this_data: req.body,
        this_errors: null,
        path: `${routeViews}/discrepancy_details.njk`,
        title: 'Discrepancy details'
      };
      routeUtils.processException(err, viewData, res);
      //res.render(viewData);
    });
});

router.get('/report-a-discrepancy/confirmation', (req, res) => {
  logger.info(`GET request to serve confirmation page: ${req.path}`);
  res.render(`${routeViews}/confirmation.njk`, { title: 'PSC discrepancy submitted' });
});

router.get('/report-a-discrepancy/**', (req, res) => {
  logger.info(`GET request to show NOT FOUND page: ${req.path}`);
  res.render('_partials/error.njk');
});

module.exports = router;
