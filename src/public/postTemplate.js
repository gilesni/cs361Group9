(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"user-post\">\r\n    <div class=\"image-container-size\">\r\n        <div class=\"image-container\">\r\n            <img class=\"image-source\" src=\"https://s-media-cache-ak0.pinimg.com/236x/f8/2f/59/f82f5916dfb1370c8375654408fdc450.jpg\" />\r\n        </div>\r\n    </div>\r\n    <div class=\"user-name\">\r\n        <h5>"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</h5>\r\n    </div>\r\n    <p class=\"user-text\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\r\n</article>\n";
},"useData":true});
})();
