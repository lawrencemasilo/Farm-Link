class FarmLinkFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryCopy = {...this.queryString};
  
    // Remove fields from the query
    const removeFields = ['fields', 'sort', 'search', 'limit', 'page'];
    removeFields.forEach(el => delete queryCopy[el]);
  
    let queryStr = JSON.stringify(queryCopy);
    
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  sort() {
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  searchByQuery() {
    if(this.queryString.search) {
      const searchTerm = this.queryString.search.split('-').join(' ');
      this.query = this.query.find({$text: {$search: "\""+ searchTerm +"\""}});
    }

    return this;
  }

  pagination() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skipres = (page - 1) * limit;
    
    this.query = this.query.skip(skipres).limit(limit);

    return this;
  }

}
module.exports = FarmLinkFilters;