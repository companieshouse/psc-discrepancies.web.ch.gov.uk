const axios = require('axios');
const logger = require(`${serverRoot}/config/winston`);

/**
 * Get product related data
 */
class PscDiscrepancy {
  constructor () {
    this.server = {
      apiKey: process.env.PSC_DISCREPANCY_REPORT_SERVICE_API_KEY,
      baseUrl: process.env.PSC_DISCREPANCY_REPORT_SERVICE_BASE_URL,
      auth: {
        username: process.env.PSC_DISCREPANCY_REPORT_SERVICE_USERNAME,
        password: process.env.PSC_DISCREPANCY_REPORT_SERVICE_PASSWORD
      }
    };
    this.request = axios;
  }

  _getBaseOptions () {
    return {
      headers: {
        authorization: this.server.apiKey,
        'content-type': 'application/json',
        accept: 'application/json'
      },
      url: `${this.server.baseUrl}/psc-discrepancy-reports`,
      responseType: 'json'
    };
  }

  getReport (selfLink) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'GET',
      url: `${this.server.baseUrl}${selfLink}`
    });
    logger.info('Service request to fetch report, with payload: ', options);
    return this.request(options);
  }

  saveObligedEntityType (obligedEntityTypeId) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'POST',
      data: {
        obliged_entity_type: obligedEntityTypeId,
        status: 'INCOMPLETE'
      }
    });
    logger.info('Service request to save obliged entity type, with payload: ', options);
    return this.request(options);
  }

  saveOrganisationName (data) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'PUT',
      url: `${this.server.baseUrl}${data.selfLink}`,
      data: {
        obliged_entity_type: data.obliged_entity_type,
        obliged_entity_organisation_name: data.obliged_entity_organisation_name,
        status: 'INCOMPLETE',
        etag: data.etag
      }
    });
    logger.info('Service request to save contact name, with payload: ', options);
    return this.request(options);
  }

  saveContactName (data) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'PUT',
      url: `${this.server.baseUrl}${data.selfLink}`,
      data: {
        obliged_entity_type: data.obliged_entity_type,
        obliged_entity_organisation_name: data.obliged_entity_organisation_name,
        obliged_entity_contact_name: data.obliged_entity_contact_name,
        status: 'INCOMPLETE',
        etag: data.etag
      }
    });
    logger.info('Service request to save contact name, with payload: ', options);
    return this.request(options);
  }

  saveEmail (data) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'PUT',
      url: `${this.server.baseUrl}${data.selfLink}`,
      data: {
        obliged_entity_type: data.obliged_entity_type,
        obliged_entity_organisation_name: data.obliged_entity_organisation_name,
        obliged_entity_contact_name: data.obliged_entity_contact_name,
        obliged_entity_email: data.obliged_entity_email,
        status: 'INCOMPLETE',
        etag: data.etag
      }
    });
    logger.info('Service request to save email, with payload: ', options);
    return this.request(options);
  }

  saveCompanyNumber (data) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'PUT',
      url: `${this.server.baseUrl}${data.selfLink}`,
      data: {
        obliged_entity_type: data.obliged_entity_type,
        obliged_entity_organisation_name: data.obliged_entity_organisation_name,
        obliged_entity_contact_name: data.obliged_entity_contact_name,
        obliged_entity_email: data.obliged_entity_email,
        company_number: data.company_number,
        status: 'INCOMPLETE',
        etag: data.etag
      }
    });
    logger.info('Service request to save company number, with payload: ', options);
    return this.request(options);
  }

  saveStatus (data) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'PUT',
      url: `${this.server.baseUrl}${data.selfLink}`,
      data: {
        obliged_entity_type: data.obliged_entity_type,
        obliged_entity_organisation_name: data.obliged_entity_organisation_name,
        obliged_entity_contact_name: data.obliged_entity_contact_name,
        obliged_entity_email: data.obliged_entity_email,
        company_number: data.company_number,
        status: 'COMPLETE',
        etag: data.etag
      }
    });
    logger.info('Service request to save status, with payload: ', options);
    return this.request(options);
  }

  saveDiscrepancyDetails (data) {
    const options = Object.assign(this._getBaseOptions(), {
      method: 'POST',
      url: `${this.server.baseUrl}${data.selfLink}/discrepancies`,
      data: {
        details: data.details,
        psc_name: data.psc_name,
        psc_date_of_birth: data.psc_date_of_birth,
        psc_discrepancy_types: data.psc_discrepancy_types
      }
    });
    logger.info('Service request to save discrepancy details, with payload: ', options);
    return this.request(options);
  }
}
module.exports = PscDiscrepancy;
