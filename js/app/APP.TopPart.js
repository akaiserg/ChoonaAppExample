/**
 * Top module
 * @type {*}
 */
APP.TopPart= choona.extendModule(APP.Core, {

    SearchCount:0,
    /**
     *    to initialize the module
     */
	start: function(){

		var self = this;
        self.dataServer={};
        self.numberClick=0;
        self.init();
        self.subscribes();

	},


    /**
     * Events for this module
     */
    init: function(){

        var self= this;
        $( "#bt_searchList_id" ).click(function() {
            self.sb.publish('TopPart_appDomain', {
                'url':'http://api.citybik.es/v2/networks'
            });
            self.SearchCount++;

        });

    },

    /**
     *  subscriptions to another modules
     */
    subscribes:function(){

        var self=this;
        self.sb.subscribe('appDomain_to_TopPart', function(data){
            self.publishData(data);
        });

    },

    /**
     *  the Publication to broadcast  the start of the search
     * @param data: data from the service
     */
    publishData: function(data){

        var self= this;
        self.sb.publish('TopPart_dataSearch', {
            'data':data.data
        });
        self.setNumber();

    },

    /**
     * setting the numbers of searches done
     */
    setNumber: function(){

        var self= this;
        $("#numberSearch_id").html("Searches done: "+self.SearchCount);
    },

    /**
     *    to finish the module
     */
	end: function(){

        self.numberClick=0;
        $("#top_id").addClass("hide");

	}

});
