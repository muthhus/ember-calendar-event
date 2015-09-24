import Ember from 'ember';

export default Ember.Component.extend({
  store: null,
  modelName: null,
  controllerContent: null,
  showFullCalendar: false,
  showListCalendar: false,
  
  didInsertElement: function(){
  	this.set('controllerContent', Ember.ArrayController.create({
  		content: null,
  	}));  	

    this.findModel(this.get('modelName'));
  },

  findModel: function(modelName){
  	var controller 	= this.get('controllerContent');
  	var results = this.store.find(modelName);
	controller.set('content', results);

	var _self = this;

  	results.then(function(xhr){
 	 	_self.showCalendar(xhr.content);
  	});
  },

  parseData: function(data){
  	return $.map(data, function(item){
  		return {
  			title:item.get('label'),
  			date: item.get('_data.date')
  		}
  	})
  },

  showCalendar: function(data){
  	var events = this.parseData(data);
		
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		

		var calendar = $('#calendar').fullCalendar({
			header: {
			     right   : 'prev,next',
			     center : 'title',
			     left  : '',
			    },
			defaultView: 'basicWeek',
			selectable: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
					);
				}
				calendar.fullCalendar('unselect');
			},
			editable: true,
			eventRender: function(event, element, view) {
					element.find(".fc-content")
			            .append("<br/><b>Class</b>:" + event.class +"<br/><b>Teacher</b>:" + event.teacher +"<br/><b>Subject</b>:" + event.subject+"<br/>");
				},

			eventClick: function(event, jsEvent, view) {
				$.colorbox({html:"<p><b>Title</b>:"+event.title+"<br/><b>Class</b>:" + event.class +"<br/><b>Teacher</b>:" + event.teacher +"<br/><b>Subject</b>:" + event.subject+"<br/></p>"});
			  },
			  eventSources: [
			    //a full blown EventSource-Object with custom coloring
			    {
			      events: [  
			        {
					      "id": 1,
					      "title": "spelling test",
					      "day": "monday",
					      "class": "3D",
					      "teacher": "mrs potts",
					      "subject": "english",
			          start     : '2015-08-24'
			        }
			      ],
			      backgroundColor: 'violet',
			      borderColor: 'green',
			      textColor: 'blue',
						eventRender: function(event, element, view) {
						    // if (view.name === "agendaDay") {
						        element.find(".fc-event-content")
						            .append("<b>Description</b>:" + event.description);
						    // }
						}
			    },
			    {
			      events: [  
			        {
					      "id": 2,
					      "title": "grammar",
					      "day": "tuesday",
					      "class": "2A",
					      "teacher": "mrs potts",
					      "subject": "english",
			          "start"     : '2015-08-24'
			        }
			      ],
						
			      backgroundColor: 'violet',
			      borderColor: 'pink',
			      textColor: 'blue'
						
			    },
			    {
			      events: [  
			        {
					      "id": 3,
					      "title": "punctuation",
					      "day": "wednesday",
					      "class": "2D",
					      "teacher": "mrs potts",
					      "subject": "english",
			          "start"     : '2015-08-24'
			        }
			      ],
						
			      backgroundColor: 'violet',
			      borderColor: 'pink',
			      textColor: 'blue'
						
			    },
			    {
			      events: [  
			        {
					      "id": 4,
					      "title": "comprehension",
					      "day": "thursday",
					      "class": "3D",
					      "teacher": "mrs potts",
					      "subject": "english",
			          "start"     : '2015-08-25'
			        }
			      ],
						
			      backgroundColor: 'violet',
			      borderColor: 'pink',
			      textColor: 'blue'
						
			    },
			    {
			      events: [  
			        {
					      "id": 5,
					      "title": "algebra 101",
					      "day": "friday",
					      "class": "3D",
					      "teacher": "mrs dorset",
					      "subject": "maths",
			          "start"     : '2015-08-25'
			        }
			      ],
						
			      backgroundColor: 'indigo',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 6,
					      "title": "square roots",
					      "day": "monday",
					      "class": "3D",
					      "teacher": "mrs dorset",
					      "subject": "maths",
			          "start"     : '2015-08-25'
			        }
			      ],
						
			      backgroundColor: 'indigo',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 7,
					      "title": "green algae",
					      "day": "monday",
					      "class": "4P",
					      "teacher": "mr land",
					      "subject": "geography",
			          "start"     : '2015-08-25'
			        }
			      ],
						
			      backgroundColor: 'blue',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 8,
					      "title": "lots and lots of earthquake fun",
					      "day": "tuesday",
					      "class": "3P",
					      "teacher": "mr land",
					      "subject": "geography",
			          "start"     : '2015-08-26'
			        }
			      ],
						
			      backgroundColor: 'blue',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 9,
					      "title": "spanish grammar",
					      "day": "wednesday",
					      "class": "9E",
					      "teacher": "mr camba",
					      "subject": "spanish",
			          "start"     : '2015-08-26'
			        }
			      ],
						
			      backgroundColor: 'green',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 10,
					      "title": "french history",
					      "day": "thursday",
					      "class": "3D",
					      "teacher": "miss lebanc",
					      "subject": "french",
			          "start"     : '2015-08-26'
			        }
			      ],
						
			      backgroundColor: 'yellow',
			      borderColor: 'pink',
			      textColor: 'red'
						
			    },
			    {
			      events: [  
			        {
					      "id": 11,
					      "title": "french spelling",
					      "day": "friday",
					      "class": "2D",
					      "teacher": "miss leblanc",
					      "subject": "french",
			          "start"     : '2015-08-27'
			        }
			      ],
						
			      backgroundColor: 'yellow',
			      borderColor: 'pink',
			      textColor: 'red'
						
			    },
			    {
			      events: [  
			        {
					      "id": 12,
					      "title": "prussian war",
					      "day": "monday",
					      "class": "1B",
					      "teacher": "mrs time",
					      "subject": "history",
			          "start"     : '2015-08-27'
			        }
			      ],
						
			      backgroundColor: 'orange',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 13,
					      "title": "basic mechanics",
					      "day": "tuesday",
					      "class": "3D",
					      "teacher": "dr newton",
					      "subject": "physics",
			          "start"     : '2015-08-27'
			        }
			      ],
						
			      backgroundColor: 'red',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    {
			      events: [  
			        {
					      "id": 14,
					      "title": "world war iii",
					      "day": "wednesday",
					      "class": "3A",
					      "teacher": "mrs time",
					      "subject": "history",
			          "start"     : '2015-08-28'
			        }
			      ],
						
			      backgroundColor: 'orange',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
					
					
			    {
			      events: [  
			        {
					      "id": 15,
					      "title": "the atom",
					      "day": "thursday",
					      "class": "3A",
					      "teacher": "dr newton",
					      "subject": "chemistry",
			          "start"     : '2015-08-28'
			        }
			      ],
						
			      backgroundColor: 'purple',
			      borderColor: 'pink',
			      textColor: 'white'
						
			    },
			    
			  ]

			
		});

    // $('#calendar').fullCalendar({
    // 	events: events,
    // });
  }
});
