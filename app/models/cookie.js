import DS from 'ember-data';

var cookie = DS.Model.extend({
	name: DS.attr('string'),
	date: DS.attr('string'),

	label: function(){
		return this.get('name');
	}.property('name')
});

cookie.reopenClass({
	FIXTURES: [
		{id: 1, name: 'Oreo', date: moment('2015-07-03T14:00:00').toDate()},
		{id: 2, name: 'Obleas', date: moment('2015-07-04T15:00:00').toDate()},
		{id: 3, name: 'Cerealitas', date: moment('2015-07-15T16:00:00').toDate()},
	]
});

export default cookie;


