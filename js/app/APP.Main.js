/**
 * Main module of the Application
 * @type {*}
 */
APP.Main=choona.extendModule(APP.Core, {
    // without template inside of the module
    /*template: '<div class="container" id="top_id"></div>' */
    /**
     *    to initialize the module
     */
	start:  function(){

        var self= this;
		self.sb.startModule({
			id:'top_id',
			module: APP.TopPart,
            config:self.config
		});
		self.sb.startModule({
			id:'leftBottom_id',
			module: APP.BottomLeftPart,
            config:self.config
		});
        self.sb.startModule({
            id:'rightBottom_id',
            module: APP.BottomRightPart,
            config:self.config
        });
        self.appInitSubscribe();

    },

    /**
     *    to finish the module
     */
	end:  function(){
	
	},

    /**
     * Subscribe to modules that get info from some service
     */
    appInitSubscribe:function(){

        var self=this;
        self.sb.subscribe('TopPart_appDomain', function(data){
            console.info(data.url);
            self.getDataService('top_id',data.url);
        });
        self.sb.subscribe('BottomRightPart_appDomain', function(data){
            self.getDataService('rightBottom_id',data.url);
        });

    },


    /**
     * Get the information from  the services
     */
    getDataService: function(id,url){

        var self= this;
        // method defined inside of APP.Core
        self.blockId(id);
        self.ajaxCall(url).then(
            function (results){
                console.info(results);
                // method defined inside of APP.Core
                self.unBlockId(id);
                switch(id){
                    case 'top_id':
                        self.returnDataTopPart(results);
                    break;
                    case 'rightBottom_id':
                        self.returnDataRightBottom(results);
                    break;
                }
            });

    },

    /**
     * Ajax call with deferred and promise
     * @param url: url service
     * @returns {*}
     */
    ajaxCall: function(url){

        var dfd= new $.Deferred()
        $.ajax({
            url: url,
            async: true,
            type: "GET",
            success: dfd.resolve
        });
        return dfd.promise();

    },


    /**
     *  Publish data for  TopPart Module
     * @param oJsonData
     */
    returnDataTopPart:function(oJsonData){

        var self= this;
        self.sb.publish('appDomain_to_TopPart', {
            'data':oJsonData
        });

    },

    /**
     * Publish data   for RightBottom Module
     * @param oJsonData
     */
    returnDataRightBottom:function(oJsonData){

        var self= this;
        self.sb.publish('appDomain_to_rightBottom', {
            'data':oJsonData
        });

    }


});
