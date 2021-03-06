const serviceData = {
  reportDetailsGet: {
    data: {
      links: {
        self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: '3',
      obliged_entity_organisation_name: 'OrgName',
      obliged_entity_contact_name: 'matt le-matt',
      obliged_entity_email: 'm@m.com',
      company_number: '12345678',
      status: 'COMPLETE'
    }
  },
  obligedEntityTypePost: {
    data: {
      links: {
        links: {
          self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
        }
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: 'Financial institution'
    }
  },
  obligedEntityOrganisationNamePost: {
    data: {
      links: {
        links: {
          self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
        }
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: 'Financial institution',
      obliged_entity_organisation_name: 'OrgName'
    }
  },
  obligedEntityContactNamePost: {
    data: {
      links: {
        links: {
          self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
        }
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: 'Financial institution',
      obliged_entity_organisation_name: 'OrgName',
      obliged_entity_contact_name: 'matt le-matt'
    }
  },
  obligedEntityEmailPost: {
    data: {
      links: {
        links: {
          self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
        }
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: 'Financial institution',
      obliged_entity_organisation_name: 'OrgName',
      obliged_entity_contact_name: 'matt le-matt',
      obliged_entity_email: 'm@m.com'
    }
  },
  companyNumberPost: {
    data: {
      links: {
        links: {
          self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
        }
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: 'Financial institution',
      obliged_entity_organisation_name: 'OrgName',
      obliged_entity_contact_name: 'matt le-matt',
      obliged_entity_email: 'm@m.com',
      company_number: '12345678'
    }
  },
  reportStatusPost: {
    data: {
      links: {
        links: {
          self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65'
        }
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy_report#psc_discrepancy_report',
      obliged_entity_type: 'Financial institution',
      obliged_entity_organisation_name: 'OrgName',
      obliged_entity_contact_name: 'matt le-matt',
      obliged_entity_email: 'm@m.com',
      company_number: '12345678',
      status: 'COMPLETE'
    }
  },
  discrepancyDetailsPost: {
    data: {
      links: {
        self: '/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65/discrepancies/ad899747-948c-46f1-89f8-7f33b7ec5956',
        'psc-discrepancy-reports': '/psc-discrepancy-reports/cc1a2751-2eaf-4f44-bbf2-2b81d6e562a8'
      },
      etag: '29c241cf9cc104ff8d9c2d1c734d4d66969f65d2',
      kind: 'psc_discrepancy#psc_discrepancy_report',
      details: 'something here',
      psc_name: 'PSC missing',
      psc_date_of_birth: ''
    }
  }
};

module.exports = serviceData;
