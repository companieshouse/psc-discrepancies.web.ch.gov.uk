module.exports.responseMock = {
  cookie: () => {
    return true;
  },
  locals: {}
};

module.exports.requestMockWithSessionCookie = {
  cookies: {
    PSC_SID: 'abc123'
  }
};

module.exports.requestMockWithoutSessionCookie = {
  cookies: {}
};

module.exports.sessionStoreLoadResolves = {
  run: () => {
    return Promise.resolve({
      extract: () => {
        return { one: "two" };
      }
    });
  }
};

module.exports.sessionStoreLoadResolvesRead = {
  load: () => {
    return {
      run: () => {
        return Promise.resolve({
          extract: () => {
            return { one: "two" };
          }
        });
      }
    };
  }
};

module.exports.sessionStoreLoadRejects = {
  run: () => {
    return Promise.reject(false);
  }
};

module.exports.sessionStoreWriteResolves = {
  run: () => {
    return Promise.resolve(true);
  }
};

module.exports.sessionStoreWriteRejects = {
  load: () => {
    return {
      run: () => {
        return Promise.reject(false);
      }
    }
  }
};

module.exports.sessionData = {
  id: 'abc123',
    appData: {
      initialServiceResponse: {
        links: {
            self: "/psc-discrepancy-reports/f3cea2d7-5995-4168-a800-389e81b0bc65"
        },
        etag: "29c241cf9cc104ff8d9c2d1c734d4d66969f65d2",
        kind: "psc_discrepancy_report#psc_discrepancy_report",
        obliged_entity_contact_name: "matt le-matt"
      }
    },
    accountData: {}
};
