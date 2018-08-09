(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"Post\">\r\n    <div class=\"PostTop\">\r\n        <div class=\"User\">"
    + alias4(((helper = (helper = helpers.User || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"User","hash":{},"data":data}) : helper)))
    + "</div>\r\n <div class=\"PDate\">"
    + alias4(((helper = (helper = helpers.PDate || (depth0 != null ? depth0.PDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"PDate","hash":{},"data":data}) : helper)))
    + "</div>\r\n </div> <p class=\"PostText\">"
    + alias4(((helper = (helper = helpers.PostText || (depth0 != null ? depth0.PostText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"PostText","hash":{},"data":data}) : helper)))
    + "</p>\r\n <div class=\"PostBot\">\r\n <a class=\"PostBtn\" href=\"\">Like</a>\r\n <a class=\"PostBtn\" href=\"\">Reply</a>\r\n <span>2 days</span>\r\n <a class=\"Report\" href=\"\">Report</a>\r\n </div>\r\n </article>\n";
},"useData":true});
})();
