"use strict";

function get_search_query(query, [...plugins]) {
  for (let [property, value] of Object.entries(query)) {
    for (const plugin of plugins) {
      const next = plugin(property, value, query);
      if (!next) return false;
    }
  }
  return query;
}

function Only_Model_Props(Model) {
  const modelProps = getModelProps(Model);
  return (property) => {
    if (!modelProps.includes(property)) {
      return false;
    }
    return true;
  }; 
}

function String_To_Regex(Model) {
  const modelStringProps = getModelProps(Model, "string");
  return (property, value, query) => {
    if (modelStringProps.includes(property)) {
      if (typeof value === "string") value = [value];
      query[property] = new RegExp(value.join("|"), "i");
    }
    return query;
  };
}

module.exports = {
  get_search_query,
  plugins : {
    Only_Model_Props,
    String_To_Regex
  }
};

function getModelProps(Model, filter_type) {
  const schema_props = Object.keys(Model.schema.obj);
  return schema_props.filter((prop) => {
    if (filter_type) {
      const propType = Model.schema.paths[prop].instance.toLowerCase();
      const is_filter_type = propType === filter_type.toLowerCase();
      return is_filter_type ? prop : null;
    }
    return prop;
  });
}
