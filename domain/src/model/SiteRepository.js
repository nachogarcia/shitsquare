const uuidV4 = require('uuid/v4');
var Site = require('./Site.js');


class SiteRepository{

  constructor (DBConnection) {
    this.DBConnection = DBConnection;
    this.DBConnection.connect();
  };

  put (site) {
    let siteData = JSON.parse(JSON.stringify(site));
    delete siteData['id'];
    siteData = JSON.stringify(siteData);

    return this.insert(site.id, siteData)
    .catch( (error) => {
      return this.update(site.id, siteData);
    });
  };

  insert (id, siteData) {
    return this.DBConnection.query('INSERT INTO sites (id, data) VALUES ($1, $2)',
      [ id, siteData ] );
  }

  update (id, siteData) {
    return this.DBConnection.query('UPDATE sites SET data = $1 WHERE id = $2',
      [ siteData, id ] );
  }

  all (){
    return this.DBConnection.query('SELECT * FROM sites').then( (result) => {
      return result.rows.map( site => {
        let siteData = site['data'];
        siteData.id = site['id'];
        return new Site(siteData);
      });
    });
  };

  getClosest (coordinate, numberOfSites) {
    return this.DBConnection.query(
    `SELECT * FROM sites
      ORDER BY
        st_setsrid(st_makepoint(
          (data -> 'coordinate' -> 'x')::text::double precision,
          (data -> 'coordinate' -> 'y')::text::double precision),
        4326)
      <-> st_setsrid(st_makepoint($1,$2),4326)
      LIMIT $3`, [ coordinate.x, coordinate.y, numberOfSites ]).then( (result) => {
      return result.rows.map( site => {
        let siteData = site['data'];
        siteData.id = site['id'];
        return new Site(siteData);
      });
    });
  };

  findById (id) {
    return this.DBConnection.query('SELECT * FROM sites where id=$1', [ id ]).then( (result) => {
      let siteData = result.rows[0]['data'];
      siteData.id = result.rows[0]['id']
      return new Site(siteData);
    });
  };

  nextSiteId () {
    return uuidV4();
  }

  nextReviewId () {
    return uuidV4();
  }
}

module.exports = SiteRepository
