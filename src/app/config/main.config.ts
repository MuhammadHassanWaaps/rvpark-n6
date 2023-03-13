class cons {
  static secure = 's';
  // static domain = '127.0.0.1:8000';
  // static domain = 'rvpark.waprojects.space';
  // static domain = 'testv23.demowebsitelinks.com/rv-park/public'
  static domain = 'kjrvportal.com'

  // static domain = '127.0.0.1:8000';
  static default_part = 'api';
}

export const Config = {
  SERVICEURL: `http${cons.secure}://${cons.domain}/${cons.default_part}`,
  URL: `http${cons.secure}://${cons.domain}/`,
};

