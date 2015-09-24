/* jshint ignore:start */

/* jshint ignore:end */

define('ember-showmyhomework-calendar/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].FixtureAdapter.extend({});

});
define('ember-showmyhomework-calendar/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-showmyhomework-calendar/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('ember-showmyhomework-calendar/components/full-calendar', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({
				store: null,
				modelName: null,
				controllerContent: null,
				showFullCalendar: false,
				showListCalendar: false,

				didInsertElement: function didInsertElement() {
							this.set('controllerContent', Ember['default'].ArrayController.create({
										content: null
							}));

							this.findModel(this.get('modelName'));
				},

				findModel: function findModel(modelName) {
							var controller = this.get('controllerContent');
							var results = this.store.find(modelName);
							controller.set('content', results);

							var _self = this;

							results.then(function (xhr) {
										_self.showCalendar(xhr.content);
							});
				},

				parseData: function parseData(data) {
							return $.map(data, function (item) {
										return {
													title: item.get('label'),
													date: item.get('_data.date')
										};
							});
				},

				showCalendar: function showCalendar(data) {
							var events = this.parseData(data);

							var date = new Date();
							var d = date.getDate();
							var m = date.getMonth();
							var y = date.getFullYear();

							var calendar = $('#calendar').fullCalendar({
										header: {
													right: 'prev,next',
													center: 'title',
													left: ''
										},
										defaultView: 'basicWeek',
										selectable: true,
										selectHelper: true,
										select: function select(start, end, allDay) {
													var title = prompt('Event Title:');
													if (title) {
																calendar.fullCalendar('renderEvent', {
																			title: title,
																			start: start,
																			end: end,
																			allDay: allDay
																}, true // make the event "stick"
																);
													}
													calendar.fullCalendar('unselect');
										},
										editable: true,
										eventRender: function eventRender(event, element, view) {
													element.find(".fc-content").append("<br/><b>Class</b>:" + event['class'] + "<br/><b>Teacher</b>:" + event.teacher + "<br/><b>Subject</b>:" + event.subject + "<br/>");
										},

										eventClick: function eventClick(event, jsEvent, view) {
													$.colorbox({ html: "<p><b>Title</b>:" + event.title + "<br/><b>Class</b>:" + event['class'] + "<br/><b>Teacher</b>:" + event.teacher + "<br/><b>Subject</b>:" + event.subject + "<br/></p>" });
										},
										eventSources: [
										//a full blown EventSource-Object with custom coloring
										{
													events: [{
																"id": 1,
																"title": "spelling test",
																"day": "monday",
																"class": "3D",
																"teacher": "mrs potts",
																"subject": "english",
																start: '2015-08-24'
													}],
													backgroundColor: 'violet',
													borderColor: 'green',
													textColor: 'blue',
													eventRender: function eventRender(event, element, view) {
																// if (view.name === "agendaDay") {
																element.find(".fc-event-content").append("<b>Description</b>:" + event.description);
																// }
													}
										}, {
													events: [{
																"id": 2,
																"title": "grammar",
																"day": "tuesday",
																"class": "2A",
																"teacher": "mrs potts",
																"subject": "english",
																"start": '2015-08-24'
													}],

													backgroundColor: 'violet',
													borderColor: 'pink',
													textColor: 'blue'

										}, {
													events: [{
																"id": 3,
																"title": "punctuation",
																"day": "wednesday",
																"class": "2D",
																"teacher": "mrs potts",
																"subject": "english",
																"start": '2015-08-24'
													}],

													backgroundColor: 'violet',
													borderColor: 'pink',
													textColor: 'blue'

										}, {
													events: [{
																"id": 4,
																"title": "comprehension",
																"day": "thursday",
																"class": "3D",
																"teacher": "mrs potts",
																"subject": "english",
																"start": '2015-08-25'
													}],

													backgroundColor: 'violet',
													borderColor: 'pink',
													textColor: 'blue'

										}, {
													events: [{
																"id": 5,
																"title": "algebra 101",
																"day": "friday",
																"class": "3D",
																"teacher": "mrs dorset",
																"subject": "maths",
																"start": '2015-08-25'
													}],

													backgroundColor: 'indigo',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 6,
																"title": "square roots",
																"day": "monday",
																"class": "3D",
																"teacher": "mrs dorset",
																"subject": "maths",
																"start": '2015-08-25'
													}],

													backgroundColor: 'indigo',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 7,
																"title": "green algae",
																"day": "monday",
																"class": "4P",
																"teacher": "mr land",
																"subject": "geography",
																"start": '2015-08-25'
													}],

													backgroundColor: 'blue',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 8,
																"title": "lots and lots of earthquake fun",
																"day": "tuesday",
																"class": "3P",
																"teacher": "mr land",
																"subject": "geography",
																"start": '2015-08-26'
													}],

													backgroundColor: 'blue',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 9,
																"title": "spanish grammar",
																"day": "wednesday",
																"class": "9E",
																"teacher": "mr camba",
																"subject": "spanish",
																"start": '2015-08-26'
													}],

													backgroundColor: 'green',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 10,
																"title": "french history",
																"day": "thursday",
																"class": "3D",
																"teacher": "miss lebanc",
																"subject": "french",
																"start": '2015-08-26'
													}],

													backgroundColor: 'yellow',
													borderColor: 'pink',
													textColor: 'red'

										}, {
													events: [{
																"id": 11,
																"title": "french spelling",
																"day": "friday",
																"class": "2D",
																"teacher": "miss leblanc",
																"subject": "french",
																"start": '2015-08-27'
													}],

													backgroundColor: 'yellow',
													borderColor: 'pink',
													textColor: 'red'

										}, {
													events: [{
																"id": 12,
																"title": "prussian war",
																"day": "monday",
																"class": "1B",
																"teacher": "mrs time",
																"subject": "history",
																"start": '2015-08-27'
													}],

													backgroundColor: 'orange',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 13,
																"title": "basic mechanics",
																"day": "tuesday",
																"class": "3D",
																"teacher": "dr newton",
																"subject": "physics",
																"start": '2015-08-27'
													}],

													backgroundColor: 'red',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 14,
																"title": "world war iii",
																"day": "wednesday",
																"class": "3A",
																"teacher": "mrs time",
																"subject": "history",
																"start": '2015-08-28'
													}],

													backgroundColor: 'orange',
													borderColor: 'pink',
													textColor: 'white'

										}, {
													events: [{
																"id": 15,
																"title": "the atom",
																"day": "thursday",
																"class": "3A",
																"teacher": "dr newton",
																"subject": "chemistry",
																"start": '2015-08-28'
													}],

													backgroundColor: 'purple',
													borderColor: 'pink',
													textColor: 'white'

										}]

							});

							// $('#calendar').fullCalendar({
							// 	events: events,
							// });
				}
	});

});
define('ember-showmyhomework-calendar/components/list-filter', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    list: [],
    properties: 'id',
    filterQuery: '',
    strictMatch: false,
    partial: '',

    listClass: '',
    inputClass: '',
    placeholder: 'Search...',

    filteredList: (function () {
      var props = this.get('formattedProperties');
      var query = this.get('filterQuery').trim();
      var strictMatch = this.get('strictMatch');

      if (Ember['default'].isBlank(query)) {
        return this.get('list');
      }

      return this.get('list').filter(function (object) {
        var filterMatch = false;

        props.forEach(function (prop) {
          if (strictMatch) {
            if (Ember['default'].isEqual(object.get(prop), query)) {
              filterMatch = true;
            }
          } else {
            if (isLike(object.get(prop), query)) {
              filterMatch = true;
            }
          }
        });

        return filterMatch;
      });
    }).property('list', 'filterQuery'),

    formattedProperties: (function () {
      return this.get('properties').split(' ').map(function (prop) {
        return prop.trim();
      });
    }).property('properties')
  });

  function isLike(one, two) {
    return one.toString().indexOf(two.toString()) !== -1;
  }

});
define('ember-showmyhomework-calendar/initializers/app-version', ['exports', 'ember-showmyhomework-calendar/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('ember-showmyhomework-calendar/initializers/export-application-global', ['exports', 'ember', 'ember-showmyhomework-calendar/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-showmyhomework-calendar/models/cookie', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	var cookie = DS['default'].Model.extend({
		name: DS['default'].attr('string'),
		date: DS['default'].attr('string'),

		label: (function () {
			return this.get('name');
		}).property('name')
	});

	cookie.reopenClass({
		FIXTURES: [{ id: 1, name: 'Oreo', date: moment('2015-07-03T14:00:00').toDate() }, { id: 2, name: 'Obleas', date: moment('2015-07-04T15:00:00').toDate() }, { id: 3, name: 'Cerealitas', date: moment('2015-07-15T16:00:00').toDate() }]
	});

	exports['default'] = cookie;

});
define('ember-showmyhomework-calendar/router', ['exports', 'ember', 'ember-showmyhomework-calendar/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('ember-showmyhomework-calendar/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("ShowMyHomeWork Calendar");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        var morph1 = dom.createMorphAt(fragment,4,4,contextualElement);
        inline(env, morph0, context, "full-calendar", [], {"modelName": "cookie", "store": get(env, context, "store"), "showFullCalendar": true, "showListCalendar": true});
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-showmyhomework-calendar/templates/components/full-calendar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#calendar");
          dom.setAttribute(el2,"aria-controls","calendar");
          dom.setAttribute(el2,"role","tab");
          dom.setAttribute(el2,"data-toggle","tab");
          var el3 = dom.createTextNode("Weekly Calendar");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Nav tabs ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","nav nav-tabs");
        dom.setAttribute(el2,"role","tablist");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Tab panes ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","tab-content");
        var el3 = dom.createTextNode("\n	  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"role","tabpanel");
        dom.setAttribute(el3,"class","tab-pane active");
        dom.setAttribute(el3,"id","calendar");
        var el4 = dom.createTextNode("\n    	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","calendar");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 3]),1,1);
        block(env, morph0, context, "if", [get(env, context, "view.showFullCalendar")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-showmyhomework-calendar/templates/components/list-filter', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "partial", [get(env, context, "partial")], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [2]);
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(element0,1,1);
        dom.insertBoundary(fragment, 0);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "filterQuery"), "placeholder": get(env, context, "placeholder")});
        element(env, element0, context, "bindAttr", [], {"class": get(env, context, "listClass")});
        block(env, morph1, context, "each", [get(env, context, "filteredList")], {"keyword": "listFilterObject"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-showmyhomework-calendar/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('ember-showmyhomework-calendar/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-showmyhomework-calendar/tests/components/full-calendar.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/full-calendar.js should pass jshint', function() { 
    ok(false, 'components/full-calendar.js should pass jshint.\ncomponents/full-calendar.js: line 35, col 12, Missing semicolon.\ncomponents/full-calendar.js: line 36, col 9, Missing semicolon.\ncomponents/full-calendar.js: line 31, col 14, \'$\' is not defined.\ncomponents/full-calendar.js: line 48, col 24, \'$\' is not defined.\ncomponents/full-calendar.js: line 79, col 17, \'$\' is not defined.\ncomponents/full-calendar.js: line 40, col 11, \'events\' is defined but never used.\ncomponents/full-calendar.js: line 43, col 13, \'d\' is defined but never used.\ncomponents/full-calendar.js: line 44, col 13, \'m\' is defined but never used.\ncomponents/full-calendar.js: line 45, col 13, \'y\' is defined but never used.\ncomponents/full-calendar.js: line 73, col 51, \'view\' is defined but never used.\ncomponents/full-calendar.js: line 78, col 50, \'view\' is defined but never used.\ncomponents/full-calendar.js: line 78, col 41, \'jsEvent\' is defined but never used.\ncomponents/full-calendar.js: line 98, col 63, \'view\' is defined but never used.\n\n13 errors'); 
  });

});
define('ember-showmyhomework-calendar/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-showmyhomework-calendar/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-showmyhomework-calendar/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-showmyhomework-calendar/tests/helpers/start-app', ['exports', 'ember', 'ember-showmyhomework-calendar/app', 'ember-showmyhomework-calendar/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-showmyhomework-calendar/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-showmyhomework-calendar/tests/models/cookie.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/cookie.js should pass jshint', function() { 
    ok(false, 'models/cookie.js should pass jshint.\nmodels/cookie.js: line 14, col 37, \'moment\' is not defined.\nmodels/cookie.js: line 15, col 39, \'moment\' is not defined.\nmodels/cookie.js: line 16, col 43, \'moment\' is not defined.\n\n3 errors'); 
  });

});
define('ember-showmyhomework-calendar/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-showmyhomework-calendar/tests/test-helper', ['ember-showmyhomework-calendar/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-showmyhomework-calendar/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-showmyhomework-calendar/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-showmyhomework-calendar';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-showmyhomework-calendar/tests/test-helper");
} else {
  require("ember-showmyhomework-calendar/app")["default"].create({"name":"ember-showmyhomework-calendar","version":"0.0.0.380e62cc"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-showmyhomework-calendar.map